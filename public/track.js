;(function (win, doc) {
  'use strict';

  // ─── Bootstrap ──────────────────────────────────────────────────────────────
  // Find this script element so we can read ?key= and know our own origin.
  var scriptEl = doc.currentScript;
  if (!scriptEl) {
    // Fallback for async/deferred: find the last track.js script tag
    var all = doc.querySelectorAll('script[src]');
    for (var i = all.length - 1; i >= 0; i--) {
      if (all[i].src && all[i].src.indexOf('track.js') !== -1) {
        scriptEl = all[i];
        break;
      }
    }
  }
  if (!scriptEl) return;

  var scriptUrl, apiKey, baseUrl;
  try {
    scriptUrl = new URL(scriptEl.src);
    apiKey    = scriptUrl.searchParams.get('key');
    baseUrl   = scriptUrl.origin;  // e.g. https://leadcatch-app.vercel.app
  } catch (e) { return; }

  if (!apiKey) {
    console.warn('[LeadCatch] No API key found. Add ?key=YOUR_KEY to the script src.');
    return;
  }

  var TRACK_URL      = baseUrl + '/api/track';
  var HEARTBEAT_MS   = 15000;   // send live data every 15 s while user is active
  var FIELD_SELECTOR = 'input:not([type=hidden]):not([type=submit]):not([type=button])' +
                       ':not([type=reset]):not([type=image]):not([type=checkbox]):not([type=radio]),' +
                       'textarea,select';

  // ─── Helpers ────────────────────────────────────────────────────────────────

  function genId() {
    try { return crypto.randomUUID(); } catch (e) {}
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function deviceType() {
    return /Mobile|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
  }

  // Classify a field as name / email / phone / other
  // Checks: type attr, name attr, id, placeholder, autocomplete
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

  // ─── FormTracker ────────────────────────────────────────────────────────────

  var pageSession = genId();
  var trackerCount = 0;

  function FormTracker(form) {
    this.form      = form;
    this.sessionId = pageSession + (trackerCount > 0 ? '_' + trackerCount : '');
    this.startTime = null;
    this.touched   = false;  // has user typed anything?
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

      // First touch → start the timer
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
      // Send a final ping on submit so the record exists (status stays 'abandoned'
      // for now; you can extend this to mark 'converted' in a future version).
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
    if (!this.touched) return;  // never send if user didn't interact
    var data = this.payload();
    if (useBeacon) {
      sendBeacon(TRACK_URL, data);
    } else {
      sendFetch(TRACK_URL, data);
    }
  };

  // ─── Registry ────────────────────────────────────────────────────────────────

  var trackers = [];

  function initForm(form) {
    if (form._lcTracked) return;
    form._lcTracked = true;
    trackers.push(new FormTracker(form));
  }

  function sendAll(useBeacon) {
    trackers.forEach(function (t) { t.send(useBeacon); });
  }

  // ─── Init existing forms ─────────────────────────────────────────────────────

  doc.querySelectorAll('form').forEach(initForm);

  // Watch for forms added dynamically (SPA frameworks, lazy loaders, etc.)
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

  // ─── Abandon detection ───────────────────────────────────────────────────────

  // beforeunload fires when user navigates away or closes the tab (desktop)
  win.addEventListener('beforeunload', function () { sendAll(true); });

  // visibilitychange fires when tab is hidden — critical for mobile
  doc.addEventListener('visibilitychange', function () {
    if (doc.visibilityState === 'hidden') sendAll(true);
  });

  // Heartbeat — ensures data is saved even if unload events fail to fire
  setInterval(function () { sendAll(false); }, HEARTBEAT_MS);

  // ─── Public API (optional, for manual/custom integrations) ───────────────────
  win.LeadCatch = {
    // Force a send right now (e.g. call from a custom "Exit" button)
    flush: function () { sendAll(false); },
    // Expose tracker list for debugging
    trackers: trackers,
  };

}(window, document));
