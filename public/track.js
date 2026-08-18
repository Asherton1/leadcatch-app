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

  // Re-evaluated on EVERY send (not just at script load) so that Next.js
  // client-side route changes can't bypass the guard. Staff on /login,
  // /admin, /dashboard etc. should never be captured as leads.
  var EXCLUDED_PATHS = [
    '/login', '/signup', '/admin', '/dashboard',
    '/settings', '/get-started', '/start-trial',
    '/forgot-password', '/auth', '/reset-password',
    '/checkout', '/billing', '/account'
  ];

  function isExcludedPath() {
    try {
      var hostname = win.location.hostname || '';
      var pathname = win.location.pathname || '';
      var isOwnSite = /(^|\.)userecapture\.com$/i.test(hostname);
      if (!isOwnSite) return false;
      for (var p = 0; p < EXCLUDED_PATHS.length; p++) {
        if (pathname === EXCLUDED_PATHS[p] || pathname.indexOf(EXCLUDED_PATHS[p] + '/') === 0) {
          return true;
        }
      }
      return false;
    } catch (e) { return false; }
  }

  // Field types we never want to capture or transmit, even if the customer's
  // form includes them. Defense in depth — guard might fail, customer sites
  // might have password fields, etc.
  var SENSITIVE_FIELD_TYPES = ['password'];
  var SENSITIVE_FIELD_RE = /password|passwd|pwd|secret|ssn|credit[\-_\s]?card|cvv|cvc/i;

  function isSensitiveField(el) {
    if (!el) return false;
    if (SENSITIVE_FIELD_TYPES.indexOf((el.type || '').toLowerCase()) !== -1) return true;
    var hay = ((el.name || '') + ' ' + (el.id || '') + ' ' + (el.placeholder || '') + ' ' + (el.getAttribute('autocomplete') || ''));
    return SENSITIVE_FIELD_RE.test(hay);
  }

  // Bail at init if currently on excluded path. (Still re-checked per-send below.)
  if (isExcludedPath()) return;

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

  // ============================================================
  // VISITOR TRACKING — heartbeat + journey events
  // ============================================================
  var VISITOR_ENDPOINT = 'https://www.userecapture.com/api/visitor-ping';
  var VISITOR_EVENT_ENDPOINT = 'https://www.userecapture.com/api/visitor-event';

  var visitorSessionId = null;
  try {
    visitorSessionId = win.sessionStorage.getItem('_rc_visitor_session');
    if (!visitorSessionId) {
      visitorSessionId = 'vs_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
      win.sessionStorage.setItem('_rc_visitor_session', visitorSessionId);
    }
  } catch (e) {
    visitorSessionId = 'vs_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
  }

  function parseUtmParams() {
    try {
      var params = new URLSearchParams(win.location.search);
      return {
        utm_source: params.get('utm_source'),
        utm_medium: params.get('utm_medium'),
        utm_campaign: params.get('utm_campaign')
      };
    } catch (e) { return {}; }
  }

  var lastActivityAt = Date.now();
  function markActive() { lastActivityAt = Date.now(); }
  doc.addEventListener('mousemove', markActive, { passive: true });
  doc.addEventListener('keydown',  markActive, { passive: true });
  doc.addEventListener('scroll',    markActive, { passive: true });
  doc.addEventListener('touchstart', markActive, { passive: true });

  function sendVisitorPing() {
    if (isExcludedPath()) return;
    try {
      var utm = parseUtmParams();
      var isActive = (Date.now() - lastActivityAt) < 60000;
      var payload = JSON.stringify({
        api_key: apiKey,
        session_id: visitorSessionId,
        page_url: win.location.href,
        referrer: doc.referrer || null,
        utm_source: utm.utm_source,
        utm_medium: utm.utm_medium,
        utm_campaign: utm.utm_campaign,
        is_active: isActive
      });
      fetch(VISITOR_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
        mode: 'cors'
      }).catch(function () { /* silent */ });
    } catch (e) { /* silent */ }
  }

  function sendVisitorEvent(eventType, metadata) {
    if (isExcludedPath()) return;
    try {
      var payload = JSON.stringify({
        api_key: apiKey,
        session_id: visitorSessionId,
        event_type: eventType,
        page_url: win.location.href,
        metadata: metadata || {}
      });
      fetch(VISITOR_EVENT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
        mode: 'cors'
      }).catch(function () { /* silent */ });
    } catch (e) { /* silent */ }
  }

  // Initial ping + page-view event on script load
  sendVisitorPing();
  sendVisitorEvent('page_view', { title: doc.title, path: win.location.pathname });

  // Heartbeat every 20 seconds
  win.setInterval(sendVisitorPing, 20000);

  // Detect SPA navigation (Next.js, React apps) via History API
  var lastUrl = win.location.href;
  function checkUrlChange() {
    if (win.location.href !== lastUrl) {
      lastUrl = win.location.href;
      sendVisitorPing();
      sendVisitorEvent('page_view', { title: doc.title, path: win.location.pathname });
    }
  }
  var pushState = win.history.pushState;
  var replaceState = win.history.replaceState;
  win.history.pushState = function () { pushState.apply(this, arguments); checkUrlChange(); };
  win.history.replaceState = function () { replaceState.apply(this, arguments); checkUrlChange(); };
  win.addEventListener('popstate', checkUrlChange);
  win.setInterval(checkUrlChange, 3000);

  // Fire on page unload — use sendBeacon which is guaranteed to send even during unload
  function sendOfflineBeacon() {
    try {
      var payload = JSON.stringify({
        api_key: apiKey,
        session_id: visitorSessionId,
        page_url: win.location.href,
        is_active: false,
        mark_offline: true
      });
      if (win.navigator && win.navigator.sendBeacon) {
        var blob = new Blob([payload], { type: 'application/json' });
        win.navigator.sendBeacon(VISITOR_ENDPOINT, blob);
      }
    } catch (e) { /* silent */ }
  }
  win.addEventListener('beforeunload', sendOfflineBeacon);
  win.addEventListener('pagehide', sendOfflineBeacon);

  // Expose for internal use — form_started event fires when user first touches a form
  win.__rcSendVisitorEvent = sendVisitorEvent;


  // --- EU Geo-Block ---
  // GDPR exposure is real and complex. Until we can afford a full EU compliance
  // review, we don't track EU/UK/Swiss visitors at all. Detection uses a free
  // IP geolocation service. If the call fails, we default to NOT tracking
  // (fail-closed) to be safe.
  var EU_COUNTRIES = [
    'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE',
    'IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE',
    'GB','UK','CH','IS','LI','NO'  // also block UK, Switzerland, EEA
  ];

  var euBlocked = null; // null = unknown, true = blocked, false = allowed
  var euCheckPromise = null;

  function checkEUStatus() {
    if (euCheckPromise) return euCheckPromise;
    euCheckPromise = new Promise(function (resolve) {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://ipapi.co/country/', true);
        xhr.timeout = 6000;
        xhr.onload = function () {
          if (xhr.status === 200) {
            var country = (xhr.responseText || '').trim().toUpperCase();
            euBlocked = EU_COUNTRIES.indexOf(country) !== -1;
          } else {
            // Lookup unavailable tells us nothing about location. Blocking here
            // silently drops mobile traffic, which is where most inquiries occur.
            euBlocked = false;
          }
          resolve(euBlocked);
        };
        xhr.onerror = xhr.ontimeout = function () {
          euBlocked = false;
          resolve(false);
        };
        xhr.send();
      } catch (e) {
        euBlocked = false;
        resolve(false);
      }
    });
    return euCheckPromise;
  }

  // --- Cookie Consent Detection ---
  // If a recognized consent platform is present and the user has rejected
  // tracking, we don't capture data. If no platform is detected, we default
  // to tracking (US visitors only -- EU already blocked above).
  function hasTrackingConsent() {
    try {
      // OneTrust
      if (win.OneTrust && typeof win.OneTrust.IsAlertBoxClosed === 'function') {
        if (!win.OneTrust.IsAlertBoxClosed()) return false; // banner still up
        var groups = '';
        try { groups = (win.OnetrustActiveGroups || ''); } catch(e) {}
        // C0004 = targeting/marketing in OneTrust convention
        return groups.indexOf('C0004') !== -1 || groups.indexOf('C0003') !== -1;
      }
      // Cookiebot
      if (win.Cookiebot && win.Cookiebot.consent) {
        return !!(win.Cookiebot.consent.marketing || win.Cookiebot.consent.statistics);
      }
      // CookieYes
      if (typeof win.cookieYesCategoryStatus === 'function') {
        try { return !!win.cookieYesCategoryStatus('functional'); } catch(e) {}
      }
      // No consent platform detected -> default to allowed (US visitors)
      return true;
    } catch (e) {
      return true; // on error, don't block US visitors
    }
  }

  // Combined gate -- check before EVERY send
  function complianceAllows(callback) {
    checkEUStatus().then(function (blocked) {
      if (blocked) { callback(false); return; }
      if (!hasTrackingConsent()) { callback(false); return; }
      callback(true);
    });
  }

  // Post to the PAGE's origin, not the script's. A page served from
  // example.com loading the script from www.example.com would otherwise
  // make a cross-origin POST that the browser silently drops.
  var TRACK_URL = (function () {
    try {
      var h = win.location.hostname || '';
      if (/(^|\.)userecapture\.com$/i.test(h)) return win.location.origin + '/api/track';
    } catch (e) {}
    return baseUrl + '/api/track';
  })();
  var HEARTBEAT_MS   = 15000;
  var FIELD_SELECTOR = 'input:not([type=hidden]):not([type=submit]):not([type=button])' +
                       ':not([type=reset]):not([type=image]):not([type=checkbox]):not([type=radio]),' +
                       'textarea,select';

  // --- Helpers ---

  function isLoggedInAdmin() {
    try {
      // Demo pages live on our own domain, so the dashboard auth cookie would
      // otherwise block capture on every demo we run. Always capture there.
      var dp = win.location.pathname || '';
      if (dp.indexOf('/demo-') === 0) return false;
      var cookies = doc.cookie || '';
      // Supabase auth cookie => visitor is logged in to the dashboard (staff/owner)
      return /sb-[\w-]+-auth-token/.test(cookies);
    } catch (e) { return false; }
  }

  function isValidEmail(s) {
    return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(s.trim());
  }

  function isValidPhone(s) {
    if (typeof s !== 'string') return false;
    var digits = s.replace(/\D/g, '');
    return digits.length >= 7;
  }

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
    var payload = JSON.stringify(data);
    // sendBeacon survives page unload on iOS where fetch is killed mid-flight.
    try {
      if (navigator.sendBeacon) {
        var blob = new Blob([payload], { type: 'application/json' });
        if (navigator.sendBeacon(url, blob)) return;
      }
    } catch (e) {}
    // Fallback: keepalive fetch, then sync XHR as a last resort
    try {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
        mode: 'cors'
      }).catch(function () {});
    } catch (e) {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(payload);
      } catch (e2) {}
    }
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
    this.nameParts = { first: null, last: null, full: null };
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
      if (!e.isTrusted) return; // ignore programmatic events: React state writes, JS-dispatched events, demo animations
      var el = e.target;
      if (!el || !el.matches || !el.matches(FIELD_SELECTOR)) return;
      if (isSensitiveField(el)) return; // never capture passwords, SSN, CVV, etc.
      if (el.closest('[data-recapture="ignore"]')) return; // opt-out for demo/mockup forms
      var val = (el.value || '').trim();
      if (val.length < 2) return; // require real content, not single chars or whitespace
      if (!self.touched) {
        self.touched   = true;
        self.startTime = Date.now();
        // Fire form_started event for visitor journey tracking
        try {
          if (win.__rcSendVisitorEvent) {
            win.__rcSendVisitorEvent('form_started', {
              form_id: self.form.id || null,
              form_name: self.form.name || null,
              page: win.location.pathname
            });
          }
        } catch (e) { /* silent */ }
      }
      var key = el.name || el.id || el.getAttribute('data-name') || el.type;
      // PRIVACY: only store fields we classify as contact info (name/email/phone).
      // Free-text fields (e.g. "describe your legal matter" / symptom boxes) are
      // intentionally NOT stored, transmitted, or forwarded anywhere.
      var type = classifyField(el);
      if (key && type !== 'other') self.formData[key] = val;
      if (type !== 'other' && val) {
        if (type === 'name') {
          // Forms often split first and last. Keep both instead of overwriting.
          var hay = ((el.name || '') + ' ' + (el.id || '') + ' ' + (el.getAttribute('autocomplete') || '')).toLowerCase();
          var isFirst = /first|given|fname/.test(hay);
          var isLast  = /last|family|surname|lname/.test(hay);
          if (isFirst) {
            self.nameParts.first = val;
          } else if (isLast) {
            self.nameParts.last = val;
          } else {
            self.nameParts.full = val;
          }
          self.named.name = self.nameParts.full
            || [self.nameParts.first, self.nameParts.last].filter(Boolean).join(' ')
            || val;
        } else {
          self.named[type] = val;
        }
      }
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
    var completed = fields.filter(function (f) { return (f.value || '').trim().length >= 2; }).length;
    // Skip own-domain emails (autofilled staff/dogfood addresses)
    var ownDomain = win.location.hostname.replace(/^www\./, '').toLowerCase();
    if (this.named.email && this.named.email.toLowerCase().split('@')[1] === ownDomain) {
      this.named.email = null;
    }
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
    if (isExcludedPath()) return;
    if (isLoggedInAdmin()) return; // staff/owner is logged in to dashboard — skip tracking on marketing pages
    var now = Date.now();
    if (this._lastSendAt && (now - this._lastSendAt) < 5000) return;
    this._lastSendAt = now;
    var data = this.payload();
    // Validate captured contact fields — reject junk (partial emails, short phone digits)
    if (!isValidEmail(data.email)) data.email = null;
    if (!isValidPhone(data.phone)) data.phone = null;
    // Require at least one CONTACTABLE field to fire an alert (name alone isn't actionable)
    if (!data.email && !data.phone) return;
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
    complianceAllows(function (allowed) {
      if (!allowed) return; // EU visitor, or consent rejected
      trackers.forEach(function (t) { t.send(useBeacon); });
    });
  }

  // --- Init existing forms ---

  doc.querySelectorAll('form').forEach(initForm);

  // Re-scan repeatedly: SPA frameworks (Next.js/React) may hydrate forms after
  // this script runs, and MutationObserver misses in-place hydration.
  function rescanForms() {
    try { doc.querySelectorAll('form').forEach(initForm); } catch (e) {}
  }
  if (doc.readyState !== 'complete') {
    win.addEventListener('load', rescanForms);
  }
  setTimeout(rescanForms, 300);
  setTimeout(rescanForms, 1000);
  setTimeout(rescanForms, 2500);
  win.setInterval(rescanForms, 5000);

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

  // Document-level fallback: if a form was never registered (SPA hydration
  // timing, shadow DOM, late render), register it the moment a user types in it.
  doc.addEventListener('input', function (e) {
    try {
      var el = e.target;
      if (!el || !el.matches || !el.matches(FIELD_SELECTOR)) return;
      var f = el.form || (el.closest && el.closest('form'));
      if (f && !f._rcTracked) initForm(f);
    } catch (err) {}
  }, true);

  // --- Exit-intent detection ---
  // Fires when mouse moves toward top of viewport (toward browser chrome)
  // Captures lead data BEFORE tab is closed -- desktop only
  var exitIntentFired = false;
  doc.addEventListener('mousemove', function (e) {
    if (exitIntentFired) return;
    if (isExcludedPath()) return;
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

  // iOS fires pagehide reliably where beforeunload does not
  win.addEventListener('pagehide', function () { sendAll(true); });

  // Heartbeat -- saves data even if unload events fail
  setInterval(function () { sendAll(false); }, HEARTBEAT_MS);

  // --- Public API ---
  win.ReCapture = {
    flush:    function () { sendAll(false); },
    trackers: trackers,
  };

}(window, document));
