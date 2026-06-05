/**
 * Dhanyashree Homes — Project Enquiry Popup
 * Include on every project page (after components.js).
 *
 * Usage:
 *   <button onclick="openEnquiryPopup('Project Name')">Enquire Now</button>
 *   — OR —
 *   <a href="#" class="enquiry-trigger" data-project="Project Name">Enquire Now</a>
 */

(function () {
  'use strict';

  const PHP_ENDPOINT = 'submit_enquiry.php'; // relative path — adjust if needed

  /* ─── CSS ─────────────────────────────────────────────────────── */
  const css = `
    /* Overlay */
    #eq-overlay {
      position: fixed; inset: 0; z-index: 99999;
      background: rgba(13, 6, 2, 0.82);
      backdrop-filter: blur(6px);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; visibility: hidden;
      transition: opacity .3s ease, visibility .3s ease;
      padding: 20px;
    }
    #eq-overlay.eq-open { opacity: 1; visibility: visible; }

    /* Modal box */
    #eq-modal {
      background: #1c1008;
      border: 1px solid rgba(201,139,74,.2);
      border-radius: 6px;
      width: 100%; max-width: 540px;
      max-height: 90vh;
      overflow-y: auto;
      transform: translateY(28px) scale(.97);
      transition: transform .35s cubic-bezier(.4,0,.2,1);
      position: relative;
    }
    #eq-overlay.eq-open #eq-modal {
      transform: translateY(0) scale(1);
    }

    /* Modal header */
    #eq-modal .eq-head {
      background: linear-gradient(135deg, #c98b4a 0%, #a86e35 100%);
      padding: 24px 28px 20px;
      position: relative;
    }
    #eq-modal .eq-head .eq-eyebrow {
      font-size: 9px; letter-spacing: 4px; text-transform: uppercase;
      color: rgba(28,16,8,.7); margin-bottom: 4px;
    }
    #eq-modal .eq-head h3 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 22px; font-weight: 400;
      color: #1c1008; margin: 0;
      line-height: 1.2;
    }
    #eq-modal .eq-head .eq-project-tag {
      display: inline-block;
      background: rgba(28,16,8,.15);
      color: #1c1008;
      font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
      padding: 4px 12px; border-radius: 2px; margin-top: 8px;
    }
    /* Close button */
    #eq-close {
      position: absolute; top: 14px; right: 16px;
      width: 32px; height: 32px;
      background: rgba(28,16,8,.2); border: none; border-radius: 50%;
      cursor: pointer; color: #1c1008; font-size: 18px; line-height: 32px;
      text-align: center; transition: background .2s;
      display: flex; align-items: center; justify-content: center;
    }
    #eq-close:hover { background: rgba(28,16,8,.35); }

    /* Form area */
    #eq-modal .eq-body { padding: 28px; }

    /* Form grid — matches site style */
    .eq-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
    }
    .eq-group {
      position: relative; grid-column: span 1;
    }
    .eq-group.full { grid-column: span 2; }
    .eq-input, .eq-select, .eq-textarea {
      width: 100%; background: rgba(255,255,255,.04);
      border: 1px solid rgba(201,139,74,.15);
      color: #e8ddd3; font-family: 'Montserrat', sans-serif;
      font-size: 13px; padding: 18px 16px 8px;
      outline: none; border-radius: 3px; box-sizing: border-box;
      transition: border-color .25s;
      -webkit-appearance: none; appearance: none;
    }
    .eq-textarea { min-height: 90px; resize: vertical; padding-top: 22px; }
    .eq-input:focus, .eq-select:focus, .eq-textarea:focus {
      border-color: #c98b4a;
    }
    .eq-select option { background: #1c1008; color: #e8ddd3; }
    .eq-label {
      position: absolute; top: 13px; left: 16px;
      font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
      color: rgba(201,139,74,.7); pointer-events: none;
      transition: all .25s;
    }
    .eq-input:focus ~ .eq-label,
    .eq-input:not(:placeholder-shown) ~ .eq-label,
    .eq-select:focus ~ .eq-label,
    .eq-textarea:focus ~ .eq-label,
    .eq-textarea:not(:placeholder-shown) ~ .eq-label {
      top: 5px; font-size: 7px; letter-spacing: 1.5px; color: #c98b4a;
    }
    /* Submit button */
    .eq-submit {
      width: 100%; margin-top: 8px;
      background: #c98b4a; color: #1c1008; border: none;
      padding: 14px 24px; cursor: pointer;
      font-family: 'Montserrat', sans-serif;
      font-size: 10px; font-weight: 600;
      letter-spacing: 3px; text-transform: uppercase;
      border-radius: 3px;
      transition: background .25s, opacity .25s;
      position: relative; overflow: hidden;
    }
    .eq-submit:hover { background: #daa05a; }
    .eq-submit:disabled { opacity: .6; cursor: not-allowed; }
    /* Message states */
    .eq-msg {
      margin-top: 14px; font-size: 12px; text-align: center;
      line-height: 1.7; display: none;
    }
    .eq-msg.show { display: block; }
    .eq-msg.success { color: #6ecb6e; }
    .eq-msg.error   { color: #e07070; }
    /* Required asterisk note */
    .eq-note {
      font-size: 10px; color: rgba(201,139,74,.5);
      margin-top: 12px; text-align: center;
    }
    /* Spinner */
    .eq-spinner {
      display: inline-block; width: 14px; height: 14px;
      border: 2px solid rgba(28,16,8,.3);
      border-top-color: #1c1008;
      border-radius: 50%;
      animation: eq-spin .7s linear infinite;
      vertical-align: middle; margin-right: 6px;
    }
    @keyframes eq-spin { to { transform: rotate(360deg); } }

    /* Mobile */
    @media (max-width: 540px) {
      .eq-grid { grid-template-columns: 1fr; }
      .eq-group.full { grid-column: span 1; }
      #eq-modal .eq-head { padding: 20px 20px 16px; }
      #eq-modal .eq-body { padding: 20px; }
    }
  `;

  /* ─── INJECT STYLES ─────────────────────────────────────────── */
  function injectStyles() {
    if (document.getElementById('eq-styles')) return;
    const s = document.createElement('style');
    s.id = 'eq-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ─── BUILD MODAL HTML ──────────────────────────────────────── */
  function buildModal() {
    if (document.getElementById('eq-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'eq-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'eq-title');

    overlay.innerHTML = `
      <div id="eq-modal">
        <div class="eq-head">
          <button id="eq-close" aria-label="Close enquiry form">&times;</button>
          <div class="eq-eyebrow">Project Enquiry</div>
          <h3 id="eq-title">Request More Information</h3>
          <span class="eq-project-tag" id="eq-project-tag">Project</span>
        </div>
        <div class="eq-body">
          <div class="eq-grid">
            <div class="eq-group">
              <input class="eq-input" type="text" id="eq-name" name="name" placeholder=" " required autocomplete="name">
              <label class="eq-label" for="eq-name">Full Name *</label>
            </div>
            <div class="eq-group">
              <input class="eq-input" type="tel" id="eq-phone" name="phone" placeholder=" " required autocomplete="tel">
              <label class="eq-label" for="eq-phone">Phone Number *</label>
            </div>
            <div class="eq-group full">
              <input class="eq-input" type="email" id="eq-email" name="email" placeholder=" " autocomplete="email">
              <label class="eq-label" for="eq-email">Email Address</label>
            </div>
            <div class="eq-group">
              <select class="eq-select" id="eq-budget" name="budget">
                <option value="" disabled selected></option>
                <option>₹1 Cr — ₹3 Cr</option>
                <option>₹3 Cr — ₹6 Cr</option>
                <option>₹6 Cr — ₹10 Cr</option>
                <option>₹10 Cr+</option>
              </select>
              <label class="eq-label" for="eq-budget">Budget Range</label>
            </div>
            <div class="eq-group">
              <select class="eq-select" id="eq-visit" name="visit">
                <option value="" disabled selected></option>
                <option>This week</option>
                <option>Next week</option>
                <option>This month</option>
                <option>Just exploring</option>
              </select>
              <label class="eq-label" for="eq-visit">Site Visit</label>
            </div>
            <div class="eq-group full">
              <textarea class="eq-textarea" id="eq-message" name="message" placeholder=" "></textarea>
              <label class="eq-label" for="eq-message">Message (optional)</label>
            </div>
          </div>
          <button class="eq-submit" id="eq-btn" type="button">Send Enquiry →</button>
          <div class="eq-msg" id="eq-msg"></div>
          <p class="eq-note">* Required fields. We respect your privacy.</p>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Wire up events
    document.getElementById('eq-close').addEventListener('click', closePopup);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closePopup();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePopup();
    });
    document.getElementById('eq-btn').addEventListener('click', submitEnquiry);
  }

  /* ─── OPEN / CLOSE ──────────────────────────────────────────── */
  function openEnquiryPopup(projectName) {
    injectStyles();
    buildModal();

    const overlay = document.getElementById('eq-overlay');
    const tag = document.getElementById('eq-project-tag');
    if (tag) tag.textContent = projectName || 'This Project';

    // Store project name for submission
    overlay.dataset.project = projectName || '';

    // Reset form
    resetForm();

    // Open
    overlay.classList.add('eq-open');
    document.body.style.overflow = 'hidden';

    // Focus first input
    setTimeout(() => {
      const first = document.getElementById('eq-name');
      if (first) first.focus();
    }, 350);
  }

  function closePopup() {
    const overlay = document.getElementById('eq-overlay');
    if (!overlay) return;
    overlay.classList.remove('eq-open');
    document.body.style.overflow = '';
  }

  function resetForm() {
    ['eq-name', 'eq-phone', 'eq-email', 'eq-budget', 'eq-visit', 'eq-message'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = el.tagName === 'SELECT' ? '' : '';
    });
    const btn = document.getElementById('eq-btn');
    if (btn) { btn.textContent = 'Send Enquiry →'; btn.disabled = false; }
    const msg = document.getElementById('eq-msg');
    if (msg) { msg.textContent = ''; msg.className = 'eq-msg'; }
  }

  /* ─── SUBMIT ────────────────────────────────────────────────── */
  function submitEnquiry() {
    const overlay = document.getElementById('eq-overlay');
    const btn = document.getElementById('eq-btn');
    const msgEl = document.getElementById('eq-msg');

    const name    = (document.getElementById('eq-name').value    || '').trim();
    const phone   = (document.getElementById('eq-phone').value   || '').trim();
    const email   = (document.getElementById('eq-email').value   || '').trim();
    const budget  = (document.getElementById('eq-budget').value  || '').trim();
    const visit   = (document.getElementById('eq-visit').value   || '').trim();
    const message = (document.getElementById('eq-message').value || '').trim();
    const project = overlay.dataset.project || '';

    // Client-side validation
    if (!name) { showMsg('Please enter your full name.', 'error'); return; }
    if (!phone || phone.replace(/[\s\-+]/g,'').length < 7) {
      showMsg('Please enter a valid phone number.', 'error'); return;
    }

    // Loading state
    btn.innerHTML = '<span class="eq-spinner"></span>Sending…';
    btn.disabled = true;
    msgEl.className = 'eq-msg';

    const formData = new FormData();
    formData.append('name',    name);
    formData.append('phone',   phone);
    formData.append('email',   email);
    formData.append('budget',  budget);
    formData.append('project', project);
    formData.append('message', (visit ? 'Site visit: ' + visit + (message ? '\n' + message : '') : message));

    fetch(PHP_ENDPOINT, { method: 'POST', body: formData })
      .then(res => {
        if (!res.ok) throw new Error('Server error ' + res.status);
        return res.json();
      })
      .then(data => {
        if (data.success) {
          btn.innerHTML = '✓ Enquiry Sent!';
          btn.style.background = 'rgba(201,139,74,.25)';
          btn.style.color = '#c98b4a';
          showMsg(data.message || "We've received your enquiry and will be in touch shortly.", 'success');
          // Auto-close after 3s
          setTimeout(closePopup, 3200);
        } else {
          btn.textContent = 'Send Enquiry →';
          btn.disabled = false;
          showMsg(data.message || 'Something went wrong. Please try again.', 'error');
        }
      })
      .catch(() => {
        btn.textContent = 'Send Enquiry →';
        btn.disabled = false;
        showMsg('Network error. Please check your connection and try again.', 'error');
      });
  }

  function showMsg(text, type) {
    const el = document.getElementById('eq-msg');
    if (!el) return;
    el.textContent = text;
    el.className = 'eq-msg show ' + type;
  }

  /* ─── AUTO-WIRE .enquiry-trigger LINKS ──────────────────────── */
  function wireAutoTriggers() {
    document.querySelectorAll('.enquiry-trigger, [data-enquiry]').forEach(el => {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        openEnquiryPopup(this.dataset.project || this.dataset.enquiry || '');
      });
    });
  }

  /* ─── EXPOSE GLOBAL ─────────────────────────────────────────── */
  window.openEnquiryPopup = openEnquiryPopup;

  /* ─── INIT ──────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireAutoTriggers);
  } else {
    wireAutoTriggers();
  }
})();
