/* ═══════════════════════════
   NAV: scroll state
═══════════════════════════ */
const nav = document.getElementById('nav');

if (nav) {
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ═══════════════════════════
   NAV: mobile burger
═══════════════════════════ */
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('navMobile');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on link click
  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      mobileMenu.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ═══════════════════════════
   SCROLL REVEAL
═══════════════════════════ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

/* ═══════════════════════════
   SMOOTH ANCHOR SCROLL
═══════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
    const top = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ═══════════════════════════
   CONTACT FORM
═══════════════════════════ */
const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = form.querySelector('#contactName').value.trim();
    const email   = form.querySelector('#contactEmail').value.trim();
    const message = form.querySelector('#contactMessage').value.trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:joziansreik@gmail.com?subject=${subject}&body=${body}`;
  });
}
