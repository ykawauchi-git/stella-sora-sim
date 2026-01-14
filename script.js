let selectedIds = [];
let activeTowerCardIds = [];

function initSimulator() {
    renderCharGrid();
    renderTowerGrid();
    renderRecommendedTeams();
    updateUI();
    initTooltip();
}

// --- Tooltip Logic ---
function initTooltip() {
    const box = document.getElementById('tooltip-box');

    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest('[data-tt-title]');
        if (target) {
            box.querySelector('.tt-title').innerText = target.getAttribute('data-tt-title');
            box.querySelector('.tt-content').innerText = target.getAttribute('data-tt-content');
            box.classList.add('visible');
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (box.classList.contains('visible')) {
            const x = e.clientX + 20;
            const y = e.clientY + 20;

            const boxWidth = box.offsetWidth;
            const boxHeight = box.offsetHeight;
            const winWidth = window.innerWidth;
            const winHeight = window.innerHeight;

            box.style.left = (x + boxWidth > winWidth ? e.clientX - boxWidth - 20 : x) + 'px';
            box.style.top = (y + boxHeight > winHeight ? e.clientY - boxHeight - 20 : y) + 'px';
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target.closest('[data-tt-title]');
        if (target) {
            box.classList.remove('visible');
        }
    });
}

// --- Char Selection ---
function renderCharGrid() {
    const grid = document.getElementById('char-grid');
    grid.innerHTML = '';
    const sortedChars = [...STELLA_DATA.characters].sort((a, b) => a.attr.localeCompare(b.attr));
    sortedChars.forEach(char => {
        const div = document.createElement('div');
        div.className = `char-card attr-${char.attr} ${selectedIds.includes(char.id) ? 'selected' : ''}`;
        div.innerHTML = `<strong>${char.name}</strong><br><small>${translateRole(char.role)}</small>`;
        div.onclick = () => toggleCharacter(char.id);
        grid.appendChild(div);
    });
}

function toggleCharacter(id) {
    const idx = selectedIds.indexOf(id);
    if (idx > -1) selectedIds.splice(idx, 1);
    else if (selectedIds.length < 3) selectedIds.push(id);
    renderCharGrid();
    updateUI();
}

// --- UI Update & Logic ---
function updateUI() {
    // 1. Update Character Cards
    for (let i = 0; i < 3; i++) {
        const card = document.getElementById(`slot-card-${i}`);
        const cid = selectedIds[i];
        if (cid) {
            const char = STELLA_DATA.characters.find(c => c.id === cid);
            card.querySelector('.icon-frame').innerHTML = char.name[0]; // Placeholder for icon
            card.querySelector('.icon-frame').style.background = `var(--${char.attr})`;
            card.querySelector('.name').innerText = char.name;
            card.querySelector('.role-desc').innerText = char.roleDesc || '-';
        } else {
            card.querySelector('.icon-frame').innerHTML = '?';
            card.querySelector('.icon-frame').style.background = 'var(--glass)';
            card.querySelector('.name').innerText = '未選択';
            card.querySelector('.role-desc').innerText = '-';
        }
    }

    // 2. Render Talent Rows for Selected Party
    renderTalentRows();

    // 3. Update Other Panels
    updateTowerRecommendations();
    updateLossRecoRecommendations();

    const result = calculateFullSynergy();
    document.getElementById('score-fill').style.width = `${result.score}%`;
    document.getElementById('synergy-title').innerText = result.title;
    renderAnalysis(result.details);
}

function renderTalentRows() {
    const container = document.getElementById('talent-rows-container');
    container.innerHTML = '';
    if (selectedIds.length === 0) return;

    selectedIds.forEach((id, idx) => {
        const char = STELLA_DATA.characters.find(c => c.id === id);
        const talents = char.recommendedTalents || [];

        const row = document.createElement('div');
        row.className = 't-row';
        row.innerHTML = `
            <div class="t-row-label">おすすめ${char.name}素質</div>
            <div class="t-icon-list">
                ${talents.map(t => `
                    <div class="t-card-mini ${t.type}" 
                         data-tt-title="${t.name}" 
                         data-tt-content="${t.effect}">
                        <div class="t-icon-inner">${t.name.substring(0, 1)}</div>
                        <div class="t-name-label">${t.name}</div>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(row);
    });
}

// ... helper functions (updateTowerRecommendations, updateLossRecoRecommendations, etc.)
function translateRole(role) {
    const m = { 'main': '主力', 'support': '支援', 'balanced': '均衡' };
    return m[role] || role;
}

// ... remaining synergy logic ...
window.onload = initSimulator;
