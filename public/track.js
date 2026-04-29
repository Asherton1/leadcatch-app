;(function (win, doc) {
  'use strict';

  var scriptEl = doc.currentScript;
  if (!scriptEl) {
    var all = doc.querySelectorAll('script[src]');
    for (var i = all.length - 1; i >= 0; i--) {
      if (all[i].src && all[i].src.indexOf('track.js') !== -1) {
        scriptEl = all[i];
        break;
      }
    }
  }
  if (!scriptEl) return;

  // Skip ReCapture's own admin/auth pages — staff typing into login/dashboard forms
  // should never be captured as leads. This guard runs only when track.js is loaded
  // on userecapture.com itself; client sites are unaffected.
  try {
    var hostname = win.location.hostname || '';
    var pathname = win.location.pathname || '';
    var isOwnSite = /(^|\.)userecapture\.com$/i.test(hostname);
    var EXCLUDED_PATHS = [
      '/login', '/signup', '/admin', '/dashboard',
      '/settings', '/get-started'
    ];
    if (isOwnSite) {
      for (var p = 0; p < EXCLUDED_PATHS.length; p++) {
        if (pathname === EXCLUDED_PATHS[p] || pathname.indexOf(EXCLUDED_PATHS[p] + '/') === 0) {
          return;
        }
      }
    }
  } catch (e) { /* if URL parsing fails, allow tracking */ }

  var scriptUrl, apiKey, baseUrl;
  try {
    scriptUrl = new URL(scriptEl.src);
    apiKey    = scriptUrl.searchParams.get('key');
    baseUrl   = scriptUrl.origin;
  } catch (e) { return; }

  if (!apiKey) {
    console.warn('[ReCapture] No API key found. Add ?key=YOUR_KEY to the script src.');
    return;
  }

  var TRACK_URL      = baseUrl + '/api/track';
  var HEARTBEAT_MS   = 15000;
  var FIELD_SELECTOR = 'input:not([type=hidden]):not([type=submit]):not([type=button])' +
                       ':not([type=reset]):not([type=image]):not([type=checkbox]):not([type=radio]),' +
                       'textarea,select';

  // --- Helpers ---

  function genId() {
    try { return crypto.randomUUID(); } catch (e) {}
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function deviceType() {
    return /Mobile|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
  }

  var CLASSIFY = [
    { key: 'email', type: 'email', re: /e[\-_]?mail/i },
    { key: 'phone', type: 'tel',   re: /phone|mobile|cell|tel(?:ephone)?/i },
    { key: 'name',  type: null,    re: /\bname\b|full[\-_\s]?name|first[\-_\s]?name|last[\-_\s]?name/i },
  ];

  function classifyField(el) {
    var hay = [
      el.type || '',
      el.name || '',
      el.id   || '',
      el.placeholder || '',
      el.getAttribute('autocomplete') || '',
    ].join(' ');
    for (var i = 0; i < CLASSIFY.length; i++) {
      var c = CLASSIFY[i];
      if ((c.type && el.type === c.type) || c.re.test(hay)) return c.key;
    }
    return 'other';
  }

  function sendBeacon(url, data) {
    try {
      var blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      navigator.sendBeacon(url, blob);
    } catch (e) {}
  }

  function sendFetch(url, data) {
    try {
      fetch(url, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      }).catch(function () {});
    } catch (e) {}
  }

  // --- FormTracker ---

  var pageSession = genId();
  var trackerCount = 0;

  function FormTracker(form) {
    this.form      = form;
    this.sessionId = pageSession + (trackerCount > 0 ? '_' + trackerCount : '');
    this.startTime = null;
    this.touched   = false;
    this.submitted = false;
    this.named     = { name: null, email: null, phone: null };
    this.formData  = {};
    trackerCount++;
    this._attach();
  }

  FormTracker.prototype._getFields = function () {
    return Array.from(this.form.querySelectorAll(FIELD_SELECTOR));
  };

  FormTracker.prototype._attach = function () {
    var self = this;

    function onInput(e) {
      var el = e.target;
      if (!el || !el.matches || !el.matches(FIELD_SELECTOR)) return;
      if (!self.touched) {
        self.touched   = true;
        self.startTime = Date.now();
      }
      var val = (el.value || '').trim();
      var key = el.name || el.id || el.getAttribute('data-name') || el.type;
      if (key) self.formData[key] = val;
      var type = classifyField(el);
      if (type !== 'other' && val) self.named[type] = val;
    }

    this.form.addEventListener('input',  onInput);
    this.form.addEventListener('change', onInput);

    this.form.addEventListener('submit', function () {
      self.submitted = true;
      self.send(false);
    });
  };

  FormTracker.prototype.payload = function () {
    var fields    = this._getFields();
    var completed = fields.filter(function (f) { return (f.value || '').trim().length > 0; }).length;
    return {
      api_key:          apiKey,
      session_id:       this.sessionId,
      name:             this.named.name,
      email:            this.named.email,
      phone:            this.named.phone,
      fields_completed: completed,
      total_fields:     fields.length,
      time_on_form:     this.startTime ? Math.round((Date.now() - this.startTime) / 1000) : 0,
      device_type:      deviceType(),
      form_data:        this.formData,
    };
  };

  FormTracker.prototype.send = function (useBeacon) {
    if (!this.touched) return;
    var data = this.payload();
    if (useBeacon) {
      sendBeacon(TRACK_URL, data);
    } else {
      sendFetch(TRACK_URL, data);
    }
  };

  // --- Registry ---

  var trackers = [];

  function initForm(form) {
    if (form._rcTracked) return;
    form._rcTracked = true;
    trackers.push(new FormTracker(form));
  }

  function sendAll(useBeacon) {
    trackers.forEach(function (t) { t.send(useBeacon); });
  }

  // --- Init existing forms ---

  doc.querySelectorAll('form').forEach(initForm);

  if (win.MutationObserver) {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        m.addedNodes.forEach(function (node) {
          if (node.nodeType !== 1) return;
          if (node.tagName === 'FORM') { initForm(node); return; }
          if (node.querySelectorAll) {
            node.querySelectorAll('form').forEach(initForm);
          }
        });
      });
    });
    observer.observe(doc.body || doc.documentElement, { childList: true, subtree: true });
  }

  // --- Exit-intent detection ---
  // Fires when mouse moves toward top of viewport (toward browser chrome)
  // Captures lead data BEFORE tab is closed -- desktop only
  var exitIntentFired = false;
  doc.addEventListener('mousemove', function (e) {
    if (exitIntentFired) return;
    if (e.clientY < 20) {
      exitIntentFired = true;
      sendAll(false);
      setTimeout(function () { exitIntentFired = false; }, 3000);
    }
  });

  // --- Abandon detection ---

  // beforeunload: user navigates away or closes tab
  win.addEventListener('beforeunload', function () { sendAll(true); });

  // visibilitychange: tab hidden -- critical for mobile
  doc.addEventListener('visibilitychange', function () {
    if (doc.visibilityState === 'hidden') sendAll(true);
  });

  // Heartbeat -- saves data even if unload events fail
  setInterval(function () { sendAll(false); }, HEARTBEAT_MS);

  // --- Public API ---
  win.ReCapture = {
    flush:    function () { sendAll(false); },
    trackers: trackers,
  };

}(window, document));
