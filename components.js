/**
 * Dhanyashree Homes — Shared Header & Footer Components
 * Include this file on every page. It auto-injects the nav and footer,
 * and wires up the mobile hamburger menu + desktop dropdown.
 */

(function () {
  /* ─── DETECT CURRENT PAGE ─── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const isHome = page === '' || page === 'index.html';
  const base   = isHome ? '' : 'index.html';

  /* ─── PROJECT LIST ─── */
  const projects = [
    { label: "Magnolia's of Chattarpur",    href: "magnolias-chattarpur.html"    },
    { label: "Dhanyashree Quartz",           href: "dhanyashree-quartz.html"      },
    { label: "The Aralias of Dhanyashree",   href: "aralias-of-dhanyashree.html"  },
    { label: "Dhanyashree Emporia",          href: "dhanyashree-emporia.html"     },
    { label: "Dhanyashree Midtown",          href: "dhanyashree-midtown.html"     },
  ];

  /* ─── BUILD NAV HTML ─── */
  function buildNav() {
    const dropdownItems = projects.map(p =>
      `<li><a href="${p.href}" class="dropdown-link">${p.label}</a></li>`
    ).join('');

    const mobileProjectItems = projects.map(p =>
      `<li class="mm-sub-item"><a href="${p.href}" class="mm-sub-link">${p.label}</a></li>`
    ).join('');

    const nav = document.createElement('nav');
    nav.id = 'navbar';
    nav.innerHTML = `
      <a class="nav-logo" href="${base || 'index.html'}">
        <img src="images/logo.jpeg" alt="Dhanyashree Homes" class="nav-logo-img" />
      </a>

      <!-- Desktop links -->
      <ul class="nav-links" id="navLinks">
        <li><a href="${base}#about">About</a></li>
        <li class="has-dropdown" id="desktopProjectsWrap">
          <a class="dropdown-trigger" href="${base}#projects">
            Projects <svg class="chevron-icon" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <ul class="dropdown-panel">
            ${dropdownItems}
          </ul>
        </li>
        <li><a href="${base}#why">Why Us</a></li>
        <li><a href="${base}#testimonials">Stories</a></li>
      </ul>

      <!-- Right side -->
      <div class="nav-right">
        <a href="${base}#enquiry" class="nav-cta">Enquire Now</a>
        <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>

      <!-- Mobile full-screen drawer -->
      <div class="mobile-drawer" id="mobileDrawer" aria-hidden="true">
        <button class="drawer-close" id="drawerClose" aria-label="Close menu">&times;</button>
        <nav class="drawer-nav">
          <a href="${base}#about"          class="drawer-link">About</a>

          <div class="drawer-accordion" id="drawerProjects">
            <button class="drawer-accordion-btn drawer-link" id="drawerProjectsBtn">
              Projects
              <svg class="chevron-icon" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="drawer-accordion-body" id="drawerProjectsBody">
              ${projects.map(p => `<a href="${p.href}" class="drawer-sub-link">${p.label}</a>`).join('')}
            </div>
          </div>

          <a href="${base}#why"            class="drawer-link">Why Us</a>
          <a href="${base}#testimonials"   class="drawer-link">Stories</a>
          <a href="${base}#enquiry"        class="drawer-link drawer-cta">Enquire Now</a>
        </nav>
      </div>
    `;
    return nav;
  }

  /* ─── BUILD FOOTER HTML ─── */
  function buildFooter() {
    const footer = document.createElement('footer');
    footer.innerHTML = `
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo-wrap">
            <div class="footer-logo-icon">DH</div>
            <div>
              <div class="footer-logo-name">Dhanyashree Homes</div>
              <div class="footer-logo-sub">We Build You Live</div>
            </div>
          </div>
          <div class="footer-tagline">Crafting Luxury Living Spaces Since 2009</div>
          <p class="footer-desc">Building landmark residences across Delhi NCR. Where architectural vision meets timeless craftsmanship and every home tells a story.</p>
          <div class="footer-socials">
            <a class="social-icon" href="#" aria-label="LinkedIn">in</a>
            <a class="social-icon" href="#" aria-label="Instagram">ig</a>
            <a class="social-icon" href="#" aria-label="Facebook">fb</a>
            <a class="social-icon" href="#" aria-label="YouTube">yt</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Projects</h4>
          <ul class="footer-links">
            <li><a href="magnolias-chattarpur.html">Magnolia's of Chattarpur</a></li>
            <li><a href="dhanyashree-quartz.html">Dhanyashree Quartz</a></li>
            <li><a href="aralias-of-dhanyashree.html">The Aralias Of Dhanyashree</a></li>
            <li><a href="dhanyashree-emporia.html">Dhanyashree Emporia</a></li>
            <li><a href="dhanyashree-midtown.html">Dhanyashree Midtown</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul class="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Team</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press &amp; Media</a></li>
            <li><a href="#">Awards</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <ul class="footer-links">
            <li><a href="#">Luxury Apartments</a></li>
            <li><a href="#">Builder Floors</a></li>
            <li><a href="#">Villas</a></li>
            <li><a href="#">Interior Design</a></li>
            <li><a href="#">Property Management</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copy">© 2025 <span>Dhanyashree Homes Pvt. Ltd.</span> — All rights reserved.</div>
        <div class="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">RERA Disclaimer</a>
        </div>
      </div>
    `;
    return footer;
  }

  /* ─── WIRE UP NAV BEHAVIOUR ─── */
  function initNav(nav) {
    const hamburger    = nav.querySelector('#hamburger');
    const drawer       = nav.querySelector('#mobileDrawer');
    const drawerClose  = nav.querySelector('#drawerClose');
    const accordionBtn = nav.querySelector('#drawerProjectsBtn');
    const accordionBody= nav.querySelector('#drawerProjectsBody');

    /* ── Desktop dropdown via JS (avoids CSS hover gap issues) ── */
    const desktopWrap = nav.querySelector('#desktopProjectsWrap');
    const dropPanel   = desktopWrap && desktopWrap.querySelector('.dropdown-panel');
    let dropTimeout;

    function openDrop() {
      clearTimeout(dropTimeout);
      desktopWrap.classList.add('drop-open');
    }
    function closeDrop() {
      dropTimeout = setTimeout(() => desktopWrap.classList.remove('drop-open'), 120);
    }

    if (desktopWrap && dropPanel) {
      desktopWrap.addEventListener('mouseenter', openDrop);
      desktopWrap.addEventListener('mouseleave', closeDrop);
      dropPanel.addEventListener('mouseenter', openDrop);
      dropPanel.addEventListener('mouseleave', closeDrop);
    }

    /* ── Open / close drawer ── */
    function openDrawer() {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openDrawer);
    drawerClose.addEventListener('click', closeDrawer);

    /* Close on backdrop click (outside drawer-nav) */
    drawer.addEventListener('click', e => {
      if (!e.target.closest('.drawer-nav') && !e.target.closest('.drawer-close')) closeDrawer();
    });

    /* Escape key */
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

    /* ── Mobile accordion (Projects) ── */
    accordionBtn.addEventListener('click', () => {
      const isOpen = accordionBody.classList.toggle('is-open');
      accordionBtn.classList.toggle('is-open', isOpen);
    });

    /* Close drawer on nav link click */
    drawer.querySelectorAll('.drawer-link:not(.drawer-accordion-btn), .drawer-sub-link, .drawer-cta').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    /* ── Scroll-based nav background ── */
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });
  }

  /* ─── INJECT NAV ─── */
  function injectNav() {
    const existing = document.querySelector('nav#navbar');
    if (existing) existing.remove();
    const nav = buildNav();
    document.body.insertBefore(nav, document.body.firstChild);
    initNav(nav);
  }

  /* ─── INJECT FOOTER ─── */
  function injectFooter() {
    const existing = document.querySelector('footer');
    if (existing) existing.remove();
    document.body.appendChild(buildFooter());
  }

  /* ─── INIT ─── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { injectNav(); injectFooter(); });
  } else {
    injectNav(); injectFooter();
  }
})();
