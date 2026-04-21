/* ── Dark mode ── */
const html        = document.documentElement
const themeToggle = document.getElementById('theme-toggle')

const saved = localStorage.getItem('theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const isDark = saved === 'dark' || (!saved && prefersDark)

if (isDark) html.classList.add('dark')
updateToggleLabel()

themeToggle.addEventListener('click', () => {
  html.classList.toggle('dark')
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light')
  updateToggleLabel()
})

function updateToggleLabel() {
  const dark = html.classList.contains('dark')
  themeToggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`)
}

/* ── Navbar scroll shadow ── */
const navbar = document.getElementById('navbar')
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 16)
}, { passive: true })

/* ── Mobile menu ── */
const menuToggle  = document.getElementById('menu-toggle')
const mobileMenu  = document.getElementById('mobile-menu')

menuToggle.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open')
  menuToggle.setAttribute('aria-expanded', String(open))
  mobileMenu.setAttribute('aria-hidden', String(!open))
})

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open')
    menuToggle.setAttribute('aria-expanded', 'false')
    mobileMenu.setAttribute('aria-hidden', 'true')
  })
})

/* ── Active nav link ── */
const sections = document.querySelectorAll('main section[id]')
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a')

if (location.pathname.endsWith('lab.html')) {
  // On the Lab page: mark "Lab" active statically; skip scroll-based detection
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === 'lab.html'))
} else {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id)
        })
      }
    })
  }, { rootMargin: '-40% 0px -55% 0px' })
  sections.forEach(s => sectionObserver.observe(s))
}

/* ── Scroll-reveal ── */
const reveals = document.querySelectorAll(
  '.section-header, .about-grid, .timeline-item, .project-card, .skill-group, .lang-item, .contact-grid, .edu-grid, .lab-card'
)
reveals.forEach(el => el.classList.add('reveal'))

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      revealObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.1 })

reveals.forEach(el => revealObserver.observe(el))

/* ── Footer year ── */
document.getElementById('footer-year').textContent = new Date().getFullYear()
