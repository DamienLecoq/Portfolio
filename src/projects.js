/* =====================================================
   projects.js – Cartes projets + popup
   Appelé par app.js via initProjects(data)
   ===================================================== */

const cardsContainer    = document.getElementById('cards-container');
const secondaryProjects = document.getElementById('secondary-projects');
const showProjectButton = document.getElementById('ShowProjectButton');
const mainPage          = document.getElementById('Main-Page');

secondaryProjects.style.display   = 'none';
secondaryProjects.style.opacity   = '0';
secondaryProjects.style.transform = 'translateY(12px)';

// ── Card factory ───────────────────────────────────────
function createCard(project, isSecondary = false) {
    const card = document.createElement('div');
    card.classList.add('card', 'project-card', 'cursor-pointer');

    // ── Image wrapper + overlays ──
    const imgWrapper = document.createElement('div');
    imgWrapper.style.cssText = 'position: relative; overflow: hidden;';

    const img = document.createElement('img');
    img.src = project.image;
    img.alt = project.title;
    img.classList.add('card-banner');

    // Number badge (top-left)
    const numBadge = document.createElement('span');
    numBadge.classList.add('card-num');
    numBadge.textContent = String(project.id).padStart(2, '0');

    // Hover overlay "Voir le projet"
    const hoverHint = document.createElement('div');
    hoverHint.classList.add('hover-hint');
    hoverHint.innerHTML = `
        <span class="hover-hint-badge">
            <i class="fa-regular fa-eye"></i> Voir le projet
        </span>
    `;

    imgWrapper.appendChild(img);
    imgWrapper.appendChild(numBadge);
    imgWrapper.appendChild(hoverHint);

    // ── Card body ──
    const cardBody = document.createElement('div');
    cardBody.classList.add('p-4');

    const title = document.createElement('h3');
    title.classList.add('text-base', 'font-semibold', 'leading-snug', 'mb-1');
    title.textContent = project.title;
    cardBody.appendChild(title);

    if (!isSecondary) {
        const description = document.createElement('p');
        description.classList.add('text-sm', 'text-gray-400', 'leading-relaxed', 'mt-1', 'mb-3');
        description.innerHTML = project.shortDescription;
        cardBody.appendChild(description);
    }

    // Skill tags (animated on hover)
    const skillsContainer = document.createElement('div');
    skillsContainer.classList.add('mt-3', 'flex', 'flex-wrap', 'gap-1.5');

    project.skills.forEach(skill => {
        const tag = document.createElement('span');
        tag.classList.add(
            'skill-tag',
            'bg-gray-600/60', 'px-2', 'py-1', 'rounded',
            'flex', 'items-center', 'text-xs',
            'border', 'border-transparent'
        );

        const logo = document.createElement('img');
        logo.src = skill.logo;
        logo.alt = `Logo ${skill.name}`;
        logo.classList.add('w-3.5', 'h-3.5', 'mr-1.5', 'flex-shrink-0');

        const nameSpan = document.createElement('span');
        nameSpan.classList.add('tag-label');
        nameSpan.textContent = skill.name;

        tag.appendChild(logo);
        tag.appendChild(nameSpan);
        skillsContainer.appendChild(tag);
    });

    cardBody.appendChild(skillsContainer);
    card.appendChild(imgWrapper);
    card.appendChild(cardBody);

    card.addEventListener('click', () => openPopup(project));

    return card;
}

// ── Toggle projets secondaires (animé) ────────────────
showProjectButton.addEventListener('click', () => {
    const isHidden = secondaryProjects.style.display === 'none';

    if (isHidden) {
        secondaryProjects.style.display = 'grid';
        requestAnimationFrame(() => requestAnimationFrame(() => {
            secondaryProjects.style.opacity   = '1';
            secondaryProjects.style.transform = 'translateY(0)';
        }));
        showProjectButton.innerHTML = '<i class="fa-solid fa-eye-slash mr-2"></i>Masquer les projets';
    } else {
        secondaryProjects.style.opacity   = '0';
        secondaryProjects.style.transform = 'translateY(12px)';
        setTimeout(() => { secondaryProjects.style.display = 'none'; }, 350);
        showProjectButton.innerHTML = '<i class="fa-solid fa-grid-2 mr-2"></i>Tous les projets';
    }
});

// ── Popup ──────────────────────────────────────────────
function openPopup(project) {
    document.body.style.overflow = 'hidden';

    const overlay = document.createElement('div');
    overlay.classList.add('popup-overlay');
    overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 50;
        display: flex; align-items: center; justify-content: center; padding: 1rem;
        background: rgba(0,0,0,0.72); backdrop-filter: blur(6px);
    `;

    const modal = document.createElement('div');
    modal.classList.add('popup-modal', 'popup-scroll');
    modal.style.cssText = `
        position: relative; width: 100%; max-width: 600px;
        max-height: 88vh; overflow-y: auto;
        border-radius: 1.25rem;
        background: #1a2438;
        border: 1px solid rgba(6,182,212,0.22);
        box-shadow: 0 30px 70px rgba(0,0,0,0.6), 0 0 40px rgba(6,182,212,0.07);
    `;

    // Hero image with gradient + title/date overlay
    const imgHero = document.createElement('div');
    imgHero.classList.add('popup-img-hero');
    imgHero.style.cssText = `
        position: relative; height: 220px; overflow: hidden;
        border-radius: 1.25rem 1.25rem 0 0; flex-shrink: 0;
    `;

    const heroImg = document.createElement('img');
    heroImg.src = project.image;
    heroImg.alt = project.title;
    heroImg.style.cssText = 'width:100%; height:100%; object-fit:cover; display:block;';

    const gradient = document.createElement('div');
    gradient.style.cssText = `
        position: absolute; inset: 0;
        background: linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(26,36,56,0.97) 100%);
    `;

    const titleOnImg = document.createElement('h3');
    titleOnImg.style.cssText = `
        position: absolute; bottom: 44px; left: 20px; right: 20px;
        font-size: 1.15rem; font-weight: 700; color: white; line-height: 1.35;
    `;
    titleOnImg.textContent = project.title;

    const dateBadge = document.createElement('span');
    dateBadge.style.cssText = `
        position: absolute; bottom: 16px; left: 20px;
        background: rgba(6,182,212,0.12); border: 1px solid rgba(6,182,212,0.3);
        border-radius: 9999px; padding: 2px 10px;
        font-size: 0.68rem; color: #a5f3fc; letter-spacing: 0.04em;
    `;
    dateBadge.innerHTML = `<i class="fa-regular fa-calendar mr-1"></i>${project.date}`;

    imgHero.appendChild(heroImg);
    imgHero.appendChild(gradient);
    imgHero.appendChild(titleOnImg);
    imgHero.appendChild(dateBadge);

    // Content
    const content = document.createElement('div');
    content.classList.add('popup-content');
    content.style.cssText = 'padding: 1.4rem 1.75rem 1.75rem;';

    const sep = document.createElement('div');
    sep.style.cssText = `
        height: 1px; margin-bottom: 1.2rem;
        background: linear-gradient(90deg, rgba(6,182,212,0.3), rgba(124,58,237,0.3), transparent);
    `;

    const description = document.createElement('p');
    description.style.cssText = 'color: #cbd5e1; font-size: 0.875rem; line-height: 1.75; margin-bottom: 1.4rem;';
    description.innerHTML = project.description;

    const skillsLabel = document.createElement('p');
    skillsLabel.style.cssText = `
        font-size: 0.68rem; font-weight: 700; text-transform: uppercase;
        letter-spacing: 0.1em; color: #475569; margin-bottom: 0.6rem;
    `;
    skillsLabel.textContent = 'Technologies utilisées';

    const skillsContainer = document.createElement('div');
    skillsContainer.style.cssText = 'display: flex; flex-wrap: wrap; gap: 0.5rem;';

    project.skills.forEach(skill => {
        const tag = document.createElement('span');
        tag.style.cssText = `
            display: flex; align-items: center; gap: 0.375rem;
            padding: 0.35rem 0.75rem;
            background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09);
            border-radius: 0.6rem; font-size: 0.8rem; color: #e2e8f0;
        `;

        const logo = document.createElement('img');
        logo.src = skill.logo;
        logo.alt = skill.name;
        logo.style.cssText = 'width:15px; height:15px;';

        tag.appendChild(logo);
        tag.appendChild(document.createTextNode(skill.name));
        skillsContainer.appendChild(tag);
    });

    content.appendChild(sep);
    content.appendChild(description);
    content.appendChild(skillsLabel);
    content.appendChild(skillsContainer);

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.style.cssText = `
        position: absolute; top: 12px; right: 12px;
        width: 34px; height: 34px; border-radius: 50%;
        background: rgba(0,0,0,0.55); border: 1px solid rgba(255,255,255,0.18);
        color: white; font-size: 14px; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        z-index: 10; transition: background 0.2s, transform 0.2s;
    `;
    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    closeBtn.onmouseenter = () => { closeBtn.style.background = 'rgba(220,38,38,0.75)'; closeBtn.style.transform = 'scale(1.1)'; };
    closeBtn.onmouseleave = () => { closeBtn.style.background = 'rgba(0,0,0,0.55)';      closeBtn.style.transform = 'scale(1)'; };

    const close = () => {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.18s ease';
        setTimeout(() => {
            overlay.remove();
            document.body.style.overflow = '';
            mainPage.classList.remove('blurred');
        }, 180);
    };

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', e => { if (!modal.contains(e.target)) close(); });

    const onKey = e => {
        if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); }
    };
    document.addEventListener('keydown', onKey);

    modal.appendChild(imgHero);
    modal.appendChild(content);
    modal.appendChild(closeBtn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    mainPage.classList.add('blurred');
}

// ── Rendu initial (appelé par app.js) ─────────────────
function initProjects(projects) {
    projects.slice(0, 3).forEach(p => cardsContainer.appendChild(createCard(p)));
    projects.slice(3).forEach(p  => secondaryProjects.appendChild(createCard(p, true)));
}
