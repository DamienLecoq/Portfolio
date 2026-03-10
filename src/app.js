/* =====================================================
   app.js – Orchestrateur : charge les données et initialise
   ===================================================== */

// ── Meta (title, footer) ──────────────────────────────
function renderMeta(meta) {
    document.title = meta.title;
    document.getElementById('footer-year').textContent = meta.year;
    document.getElementById('footer-name').textContent = meta.name;
}

// ── Navigation ────────────────────────────────────────
function renderNav(meta, nav, social, cv) {
    document.getElementById('nav-initials').textContent = meta.initials;
    document.getElementById('nav-name').textContent     = meta.name;

    // Factory : lien de navigation avec underline animée
    function makeNavLink(item, extraClasses = []) {
        const a = document.createElement('a');
        a.href      = item.href;
        a.className = 'nav-link relative px-3 py-1.5 text-sm font-medium rounded-lg';
        if (extraClasses.length) a.classList.add(...extraClasses);
        a.textContent = item.label;

        const underline = document.createElement('span');
        underline.className = 'nav-underline absolute bottom-0 left-0 h-0.5 w-0 bg-cyan-400 rounded transition-all duration-300';
        a.appendChild(underline);
        return a;
    }

    // Factory : icône sociale
    function makeSocialLink(s) {
        const a = document.createElement('a');
        a.href      = s.url;
        a.className = 'social-link';
        a.setAttribute('aria-label', s.label);
        if (s.external) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
        a.innerHTML = `<i class="${s.icon}"></i>`;
        return a;
    }

    // Liens desktop
    const navDesktop = document.getElementById('nav-desktop');
    nav.forEach(item => navDesktop.appendChild(makeNavLink(item)));

    // Actions desktop : sociales + bouton CV
    const navActions = document.getElementById('nav-actions');
    social.forEach(s => navActions.appendChild(makeSocialLink(s)));

    const cvBtn = document.createElement('a');
    cvBtn.href      = cv;
    cvBtn.target    = '_blank';
    cvBtn.rel       = 'noopener noreferrer';
    cvBtn.className = 'btn-primary px-4 py-1.5 rounded-full text-sm font-medium ml-2';
    cvBtn.innerHTML = '<i class="fa-regular fa-file-pdf mr-1.5"></i>CV';
    navActions.appendChild(cvBtn);

    // Liens mobile
    const navMobile = document.getElementById('nav-mobile');
    nav.forEach(item => navMobile.appendChild(makeNavLink(item, ['w-full', 'text-center'])));

    // Sociales mobile
    const mobileSocials = document.getElementById('mobile-socials');
    social.forEach(s => mobileSocials.appendChild(makeSocialLink(s)));
}

// ── Carousel ──────────────────────────────────────────
function renderCarousel(carouselData) {
    const container = document.getElementById('carousel');

    carouselData.forEach((item, i) => {
        const img = document.createElement('img');
        img.src   = item.src;
        img.alt   = item.alt;
        img.style.cssText = 'width:100%; height:100%; object-fit:cover;';
        if (i === 0) img.classList.add('active');
        container.appendChild(img);
    });

    let index = 0;
    const images = container.querySelectorAll('img');
    setInterval(() => {
        images[index].classList.remove('active');
        index = (index + 1) % images.length;
        images[index].classList.add('active');
    }, 4500);
}

// ── Hero title ────────────────────────────────────────
function renderHero(meta) {
    document.getElementById('Title').textContent = meta.name;
}

// ── À propos ──────────────────────────────────────────
function renderAbout(about, cv) {
    const container = document.getElementById('about-content');

    const statsHTML = about.stats.map(s => `
        <div class="stat-card flex-1">
            <span class="text-2xl font-bold gradient-text">${s.value}</span>
            <span class="text-xs text-gray-500">${s.label}</span>
        </div>
    `).join('');

    const bioHTML = about.bio.map(p => `
        <p class="text-gray-300 leading-relaxed">${p}</p>
    `).join('');

    container.innerHTML = `
        <div class="flex flex-col items-center lg:flex-row lg:items-center gap-8 max-w-4xl mx-auto">
            <div class="profile-wrapper flex-shrink-0">
                <img src="${about.image}" alt="Photo de profil"
                     class="profile-img w-52 h-64 sm:w-56 sm:h-72 object-cover object-top rounded-2xl">
            </div>
            <div class="flex flex-col gap-4 max-w-xl w-full text-left">
                <span class="availability-badge self-start">
                    <span class="pulse-dot"></span>
                    ${about.availability}
                </span>
                ${bioHTML}
                <div class="flex gap-4 mt-2">
                    ${statsHTML}
                </div>
                <a href="${cv}" target="_blank" rel="noopener noreferrer"
                   class="btn-primary self-start px-6 py-2.5 rounded-full text-sm font-medium mt-2">
                    <i class="fa-regular fa-file-pdf mr-2"></i>Télécharger mon CV
                </a>
            </div>
        </div>
    `;
}

// ── Contact ───────────────────────────────────────────
function renderContact(contact) {
    // Intro
    document.getElementById('contact-intro').innerHTML = `
        <p class="text-2xl font-semibold text-white mb-2">${contact.intro}</p>
        <p class="text-gray-500 text-sm mb-10">${contact.description}</p>
    `;

    // Cartes
    const cardsEl = document.getElementById('contact-cards');
    contact.links.forEach(link => {
        const a = document.createElement('a');
        a.href      = link.url;
        a.className = `contact-card ${link.cssClass} flex items-start gap-4 p-5 w-full`;
        if (link.external) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
        a.innerHTML = `
            <div class="contact-icon"><i class="${link.icon}"></i></div>
            <div class="flex flex-col gap-0.5">
                <span class="text-xs text-gray-500 font-medium uppercase tracking-wider">${link.platform}</span>
                <span class="text-sm font-medium text-white">${link.display}</span>
                <span class="text-xs text-gray-400 mt-1">${link.cta}</span>
            </div>
            <i class="fa-solid fa-arrow-up-right contact-arrow"></i>
        `;
        cardsEl.appendChild(a);
    });

    // Téléphone
    document.getElementById('contact-phone').innerHTML = `
        <i class="fa-solid fa-phone mr-2 opacity-50"></i>
        <a href="${contact.phone.href}" class="hover:text-gray-400 transition-colors">
            ${contact.phone.display}
        </a>
    `;
}

// ── Bootstrap ─────────────────────────────────────────
fetch('./src/data.json')
    .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
    })
    .then(data => {
        renderMeta(data.meta);
        renderNav(data.meta, data.nav, data.social, data.cv);
        renderCarousel(data.hero.carousel);
        renderHero(data.meta);
        renderAbout(data.about, data.cv);
        renderContact(data.contact);
        initSkills(data.skills, data.skillCategories);
        initProjects(data.projects);
        initTyping(data.hero.typing);
        initScrollspy();
    })
    .catch(err => {
        console.error('[Portfolio] Impossible de charger data.json :', err);
    });
