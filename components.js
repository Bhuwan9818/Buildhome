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
        <li><a href="about-us.html">About</a></li>
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
            <a class="social-icon" href="#" aria-label="LinkedIn" title="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
              </svg>
            </a>
            <a class="social-icon" href="https://www.instagram.com/dhanyashree_homes?igsh=MWFyMG00OXp6enU4dQ==" aria-label="Instagram" title="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.07 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z"/>
              </svg>
            </a>
            <a class="social-icon" href="#" aria-label="Facebook" title="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a class="social-icon" href="https://www.youtube.com/@Dhanyashree24" aria-label="YouTube" title="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136c.5-1.884.5-5.814.5-5.814s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
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
            <li><a href="#">Awards</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <ul class="footer-links">
            <li><a href="#">Luxury Apartments</a></li>
            <li><a href="#">Builder Floors</a></li>
            <li><a href="#">Villas</a></li>
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
