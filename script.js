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
            const x = e.clientX + 15;
            const y = e.clientY + 15;

            const boxWidth = box.offsetWidth;
            const boxHeight = box.offsetHeight;
            const winWidth = window.innerWidth;
            const winHeight = window.innerHeight;

            let left = x;
            let top = y;
            if (x + boxWidth > winWidth) left = e.clientX - boxWidth - 15;
            if (y + boxHeight > winHeight) top = e.clientY - boxHeight - 15;

            box.style.left = left + 'px';
            box.style.top = top + 'px';
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target.closest('[data-tt-title]');
        const related = e.relatedTarget ? e.relatedTarget.closest('[data-tt-title]') : null;

        if (target && target !== related) {
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

function updateUI() {
    for (let i = 0; i < 3; i++) {
        const card = document.getElementById(`slot-card-${i}`);
        const cid = selectedIds[i];
        if (cid) {
            const char = STELLA_DATA.characters.find(c => c.id === cid);
            card.querySelector('.icon-frame').innerHTML = char.name[0];
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
    renderTalentRows();
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
                    <div class="stella-card ${t.type}" 
                         data-tt-title="${t.name}" 
                         data-tt-content="${t.effect}">
                        <div class="card-header">
                            <div class="card-icon">
                                ${t.iconUrl ? `<img src="${t.iconUrl}" alt="${t.name}">` : `<span>${getFallbackIcon(t.name)}</span>`}
                            </div>
                        </div>
                        <div class="card-separator"></div>
                        <div class="card-footer">
                            <span>${t.name}</span>
                        </div>
                        <div class="star-deco tl">✦</div>
                        <div class="star-deco tr">✦</div>
                        <div class="star-deco bl">✦</div>
                        <div class="star-deco br">✦</div>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(row);
    });
}

function getFallbackIcon(name) {
    if (name.includes('攻撃') || name.includes('火力') || name.includes('型')) return '⚔️';
    if (name.includes('守') || name.includes('防御') || name.includes('壁')) return '🛡️';
    if (name.includes('支援') || name.includes('バフ') || name.includes('にゃ')) return '✨';
    if (name.includes('印')) return '💠';
    if (name.includes('ドローン')) return '🛰️';
    return '🌸';
}

function translateRole(role) {
    const m = { 'main': '主力', 'support': '支援', 'balanced': '均衡' };
    return m[role] || role;
}

function renderAnalysis(details) {
    const container = document.getElementById('synergy-analysis-content');
    if (details.length === 0) {
        container.innerHTML = '<p class="placeholder">パーティを編成すると詳しい解析が表示されます。</p>';
        return;
    }
    container.innerHTML = details.map(d => `
        <div class="analysis-item">
            <strong>${d.label}</strong>: ${d.content}
        </div>
    `).join('');
}

function updateTowerRecommendations() {
    const container = document.getElementById('rec-tags-container');
    container.innerHTML = '';
    if (selectedIds.length === 0) return;

    const allTags = new Set();
    selectedIds.forEach(id => {
        const char = STELLA_DATA.characters.find(c => c.id === id);
        if (char.tags) char.tags.forEach(t => allTags.add(t));
    });

    allTags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'rec-tag';
        span.innerText = tag;
        container.appendChild(span);
    });
}

function updateLossRecoRecommendations() {
    const container = document.getElementById('lossreco-content');
    if (selectedIds.length === 0) {
        container.innerHTML = '<p class="placeholder">パーティ編成後に提案されます。</p>';
        return;
    }

    const attrs = selectedIds.map(id => STELLA_DATA.characters.find(c => c.id === id).attr);
    const attrCounts = {};
    attrs.forEach(a => attrCounts[a] = (attrCounts[a] || 0) + 1);
    const dominantAttr = Object.keys(attrCounts).reduce((a, b) => attrCounts[a] > attrCounts[b] ? a : b);

    const recos = STELLA_DATA.lossRecos[dominantAttr] || [];
    container.innerHTML = recos.map(r => `
        <div class="lr-item">
            <div class="lr-rank">${'★'.repeat(r.rank || 5)}</div>
            <strong>${r.name}</strong><br>
            <small>${r.core} / ${r.assist}</small>
        </div>
    `).join('');
}

function calculateFullSynergy() {
    if (selectedIds.length === 0) return { score: 0, title: '編成不足', details: [] };
    const chars = selectedIds.map(id => STELLA_DATA.characters.find(c => c.id === id));
    let score = 0;
    const details = [];

    const attrs = chars.map(c => c.attr);
    const attrCounts = {};
    attrs.forEach(a => attrCounts[a] = (attrCounts[a] || 0) + 1);
    const maxAttr = Math.max(...Object.values(attrCounts));

    if (maxAttr === 3) {
        score += 40;
        details.push({ label: '属性統一', content: '同属性3名。全ダメージが大幅に強化されます。' });
    } else if (maxAttr === 2) {
        score += 15;
        details.push({ label: '属性一致', content: '2名が属性一致。基本的な属性シナジーが発生。' });
    }

    const charIds = new Set(selectedIds);
    if (charIds.has('chitose') && (charIds.has('teresa') || charIds.has('ayame'))) {
        score += 30;
        details.push({ label: '水属性テンプレ', content: 'チトセの火力を支援キャラが最大化する理想構成。' });
    }

    score = Math.min(100, score);
    let title = score >= 90 ? '神域' : score >= 60 ? '実戦級' : '調整中';
    return { score, title, details };
}

function renderRecommendedTeams() {
    const container = document.getElementById('rec-list');
    container.innerHTML = STELLA_DATA.recommendedTeams.map(t => `
        <div class="rec-team-card" onclick="loadTeam(['${t.members.join("','")}'])">
            <strong>${t.name}</strong><br>
            <small>${t.desc}</small>
        </div>
    `).join('');
}

function loadTeam(ids) {
    selectedIds = ids.slice(0, 3);
    renderCharGrid();
    updateUI();
}

function renderTowerGrid() {
    const grid = document.getElementById('tower-grid');
    grid.innerHTML = STELLA_DATA.towerCards.map(c => `
        <div class="tower-card ${activeTowerCardIds.includes(c.id) ? 'active' : ''}" onclick="toggleTowerCard('${c.id}')">
            <strong>${c.name}</strong><br><small>${c.desc}</small>
        </div>
    `).join('');
}

function toggleTowerCard(id) {
    const idx = activeTowerCardIds.indexOf(id);
    if (idx > -1) activeTowerCardIds.splice(idx, 1);
    else activeTowerCardIds.push(id);
    renderTowerGrid();
    updateUI();
}

function clearTowerCards() {
    activeTowerCardIds = [];
    renderTowerGrid();
    updateUI();
}

window.onload = initSimulator;
