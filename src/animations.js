/* =====================================================
   animations.js – Typing effect, particles, scroll reveal
   ===================================================== */

// ── Typing effect (initialisé par app.js) ─────────────
const subTitle  = document.getElementById('SubTitle');
let typingRoles = [];
let roleIndex   = 0;
let charIndex   = 0;
let isDeleting  = false;

function type() {
    const current = typingRoles[roleIndex];

    subTitle.textContent = isDeleting
        ? current.slice(0, --charIndex)
        : current.slice(0, ++charIndex);

    let delay = isDeleting ? 55 : 95;

    if (!isDeleting && charIndex === current.length) {
        delay = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex  = (roleIndex + 1) % typingRoles.length;
        delay      = 350;
    }

    setTimeout(type, delay);
}

function initTyping(roles) {
    typingRoles = roles;
    type();
}


// ── Floating particles ─────────────────────────────────
const particlesContainer = document.getElementById('particles-container');

function createParticle() {
    const p        = document.createElement('div');
    const size     = Math.random() * 5 + 2;
    const duration = Math.random() * 10 + 8;
    const left     = Math.random() * 100;
    const delay    = Math.random() * 6;
    const isCyan   = Math.random() > 0.5;

    p.classList.add('particle');
    p.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${left}%; bottom: 0;
        animation-duration: ${duration}s; animation-delay: ${delay}s;
        background: ${isCyan ? 'rgba(6,182,212,0.2)' : 'rgba(167,139,250,0.18)'};
    `;

    particlesContainer.appendChild(p);
    setTimeout(() => p.remove(), (duration + delay) * 1000);
}

for (let i = 0; i < 18; i++) createParticle();
setInterval(createParticle, 900);


// ── Scroll reveal ──────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
