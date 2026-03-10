/* =====================================================
   header.js – Navigation, smooth scroll, scrollspy
   ===================================================== */

const navbar     = document.getElementById('NavBar');
const mobileMenu = document.getElementById('mobile-menu');
const menuToggle = document.getElementById('menu-toggle');
const burgerIcon = document.getElementById('burger-icon');

// ── Helpers menu mobile ─────────────────────────────────
function openMenu()  {
    mobileMenu.classList.remove('hidden');
    burgerIcon.classList.replace('fa-bars', 'fa-xmark');
}
function closeMenu() {
    mobileMenu.classList.add('hidden');
    burgerIcon.classList.replace('fa-xmark', 'fa-bars');
}

// ── Smooth scroll via event delegation ─────────────────
document.addEventListener('click', e => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;

    e.preventDefault();
    closeMenu(); // fermer avant de mesurer offsetHeight (le menu est dans le header fixe)

    const offset = navbar.offsetHeight + 8;
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
});

// ── Mobile menu toggle ─────────────────────────────────
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.contains('hidden') ? openMenu() : closeMenu();
});

// ── Navbar hide/show on scroll ─────────────────────────
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    navbar.style.top = scrollY > lastScrollY && scrollY > 60 ? `-${navbar.offsetHeight}px` : '0';
    if (scrollY > lastScrollY) closeMenu();
    lastScrollY = scrollY;
}, { passive: true });

// ── Scrollspy (appelé par app.js après renderNav) ──────
function initScrollspy() {
    const navLinks = document.querySelectorAll('a.nav-link[href^="#"]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            navLinks.forEach(link => {
                link.classList.toggle('nav-active', link.getAttribute('href') === `#${id}`);
            });
        });
    }, { threshold: 0, rootMargin: '-45% 0px -45% 0px' });

    document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
}
