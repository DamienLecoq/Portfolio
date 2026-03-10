/* =====================================================
   skills.js – Grille de compétences + filtres
   Appelé par app.js via initSkills(skills, skillCategories)
   ===================================================== */

const skillsGrid      = document.getElementById('skills-grid');
const filterContainer = document.getElementById('filter-buttons');

// Maps color name → Tailwind classes + dot hex
const colorMeta = {
    red:    { border: 'border-b-red-400',    glow: 'glow-red',    bg: 'bg-red-400/20',    dot: '#f87171' },
    blue:   { border: 'border-b-blue-400',   glow: 'glow-blue',   bg: 'bg-blue-400/20',   dot: '#60a5fa' },
    yellow: { border: 'border-b-yellow-400', glow: 'glow-yellow', bg: 'bg-yellow-400/20', dot: '#facc15' },
    purple: { border: 'border-b-purple-400', glow: 'glow-purple', bg: 'bg-purple-400/20', dot: '#c084fc' },
    zinc:   { border: 'border-b-zinc-400',   glow: 'glow-zinc',   bg: 'bg-zinc-400/20',   dot: '#a1a1aa' },
};

// category id → color string (populated in initSkills)
let categoryColorMap = {};

function renderSkills(skills) {
    skillsGrid.style.opacity = '0';

    setTimeout(() => {
        skillsGrid.innerHTML = '';

        skills.forEach(skill => {
            const color = categoryColorMap[skill.category] || null;
            const meta  = color ? colorMeta[color] : { border: '', glow: '' };

            const card = document.createElement('div');
            card.classList.add('card', 'p-4', 'border-b-4', 'cursor-default');
            if (meta.border) card.classList.add(meta.border);
            if (meta.glow)   card.classList.add(meta.glow);
            card.innerHTML = `
                <div class="flex items-center gap-3">
                    <img src="${skill.logo}" alt="Logo ${skill.name}" class="w-8 h-8 flex-shrink-0">
                    <h3 class="text-sm font-semibold">${skill.name}</h3>
                </div>
            `;

            skillsGrid.appendChild(card);
        });

        skillsGrid.style.opacity = '1';
    }, 200);
}

function setActiveFilter(activeBtn) {
    filterContainer.querySelectorAll('.filter-button').forEach(btn => {
        btn.classList.remove(
            'border-b-4',
            'border-b-red-400', 'border-b-blue-400', 'border-b-yellow-400',
            'border-b-purple-400', 'border-b-zinc-400',
            'bg-red-400/20', 'bg-blue-400/20', 'bg-yellow-400/20',
            'bg-purple-400/20', 'bg-zinc-400/20', 'bg-gray-600'
        );
        btn.classList.add('bg-gray-700');
        // Dot inactif → opacité réduite
        const dot = btn.querySelector('span');
        if (dot) dot.style.opacity = '0.7';
    });

    activeBtn.classList.remove('bg-gray-700');
    const color = activeBtn.dataset.color;
    if (color && colorMeta[color]) {
        activeBtn.classList.add('border-b-4', colorMeta[color].border, colorMeta[color].bg);
    } else {
        activeBtn.classList.add('bg-gray-600');
    }
    // Dot actif → pleine opacité
    const activeDot = activeBtn.querySelector('span');
    if (activeDot) activeDot.style.opacity = '1';
}

function initSkills(skillsData, skillCategories) {
    // Build category → color map
    skillCategories.forEach(cat => {
        if (cat.color) categoryColorMap[cat.id] = cat.color;
    });

    // Generate filter buttons dynamically
    skillCategories.forEach(cat => {
        const btn = document.createElement('button');
        btn.classList.add(
            'filter-button', 'bg-gray-700', 'text-sm',
            'text-gray-300', 'font-medium', 'px-4', 'py-1.5', 'cursor-pointer',
            'flex', 'items-center', 'gap-1.5'
        );
        btn.dataset.category = cat.id;
        if (cat.color) btn.dataset.color = cat.color;

        // Dot coloré permanent (sauf "Tout")
        if (cat.color && colorMeta[cat.color]) {
            const dot = document.createElement('span');
            dot.style.cssText = `
                width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
                background: ${colorMeta[cat.color].dot}; opacity: 0.7;
                transition: opacity 0.2s ease;
            `;
            btn.appendChild(dot);
        }

        btn.appendChild(document.createTextNode(cat.label));
        filterContainer.appendChild(btn);
    });

    const allButtons = filterContainer.querySelectorAll('.filter-button');

    // Initial render with all skills, "All" active
    renderSkills(skillsData);
    setActiveFilter(allButtons[0]);

    // Click handlers
    allButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            const filtered = category === 'All'
                ? skillsData
                : skillsData.filter(s => s.category === category);

            renderSkills(filtered);
            setActiveFilter(btn);
        });
    });
}
