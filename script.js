let selectedIds = [];
let activeTowerCardIds = [];
let filters = { attr: 'all', role: 'all', rarity: 'all' };

function initSimulator() {
    initFilters();
    renderCharGrid();
    renderTowerGrid();
    renderRecommendedTeams();
    updateUI();
    initTooltip();
}

function initFilters() {
    document.querySelectorAll('.filter-buttons button').forEach(btn => {
        btn.onclick = (e) => {
            const group = e.target.parentElement;
            group.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const key = e.target.getAttribute('data-key');
            const val = e.target.getAttribute('data-value');
            filters[key] = val;
            renderCharGrid();
        };
    });
}

function renderCharGrid() {
    const grid = document.getElementById('char-grid');
    grid.innerHTML = '';

    const filtered = STELLA_DATA.characters.filter(c => {
        if (filters.attr !== 'all' && c.attr !== filters.attr) return false;
        if (filters.role !== 'all' && c.role !== filters.role) return false;
        if (filters.rarity !== 'all' && c.rarity !== filters.rarity) return false;
        return true;
    }).sort((a, b) => (b.baseAtk || 0) - (a.baseAtk || 0));

    filtered.forEach(char => {
        const div = document.createElement('div');
        div.className = `char-card attr-${char.attr} ${selectedIds.includes(char.id) ? 'selected' : ''}`;
        div.innerHTML = `
            <div class="rarity-badge">${char.rarity || 'SSR'}</div>
            <strong>${char.name}</strong><br>
            <small>${translateRole(char.role)}</small>
        `;
        div.onclick = () => toggleCharacter(char.id);
        grid.appendChild(div);
    });

    if (filtered.length === 0) {
        grid.innerHTML = '<p class="placeholder">該当するキャラクターがいません</p>';
    }
}

function toggleCharacter(id) {
    const idx = selectedIds.indexOf(id);
    if (idx > -1) selectedIds.splice(idx, 1);
    else if (selectedIds.length < 3) selectedIds.push(id);
    renderCharGrid();
    updateUI();
}

function resetSimulator() {
    selectedIds = [];
    activeTowerCardIds = [];
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

    const synergy = calculateFullSynergy();
    document.getElementById('score-fill').style.width = `${synergy.score}%`;
    document.getElementById('score-text').innerText = synergy.score;
    document.getElementById('synergy-title').innerText = synergy.title;
    renderAnalysis(synergy.details);

    updateCombatPower(synergy.score);
}

function updateCombatPower(synergyScore) {
    const powerEl = document.getElementById('power-value');
    if (selectedIds.length === 0) {
        powerEl.innerText = '0';
        return;
    }

    const chars = selectedIds.map(id => STELLA_DATA.characters.find(c => c.id === id));

    // 1. Base Power from ATK
    let basePower = chars.reduce((sum, c) => sum + (c.baseAtk || 5000), 0);

    // 2. Rarity Bonus
    let rarityMult = 1.0;
    const ssrCount = chars.filter(c => c.rarity === 'SSR').length;
    rarityMult += (ssrCount * 0.05);

    // 3. Synergy Multiplier
    let synergyMult = 1.0 + (synergyScore / 100) * 0.5; // Up to 50% boost from synergy

    // 4. Talent Optimization Score
    let talentScore = 0;
    chars.forEach(c => {
        if (c.recommendedTalents && c.recommendedTalents.some(t => t.iconUrl)) {
            talentScore += 0.03; // +3% for having verified high-tier talents
        }
    });

    const finalPower = Math.floor(basePower * rarityMult * synergyMult * (1 + talentScore));

    // Animate counter
    animateValue(powerEl, parseInt(powerEl.innerText), finalPower, 800);
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Store selected build ID for each character: { charId: buildId }
let selectedBuilds = {};

function renderTalentRows() {
    const container = document.getElementById('talent-rows-container');
    container.innerHTML = '';
    if (selectedIds.length === 0) return;

    selectedIds.forEach((id, idx) => {
        const char = STELLA_DATA.characters.find(c => c.id === id);
        let talents = [];
        let buildSelectorHTML = '';

        // Check if character has specialized builds
        if (char.talentBuilds && char.talentBuilds.length > 0) {
            // Default to first build if not selected
            if (!selectedBuilds[id]) {
                selectedBuilds[id] = char.talentBuilds[0].id;
            }

            const activeBuild = char.talentBuilds.find(b => b.id === selectedBuilds[id]) || char.talentBuilds[0];
            talents = activeBuild.cards;

            // Create selector dropdown/tabs
            buildSelectorHTML = `
                <div class="build-selector">
                    <select onchange="switchBuild('${id}', this.value)">
                        ${char.talentBuilds.map(b => `
                            <option value="${b.id}" ${b.id === activeBuild.id ? 'selected' : ''}>
                                ${b.name}
                            </option>
                        `).join('')}
                    </select>
                    <div class="build-desc">${activeBuild.desc}</div>
                </div>
            `;
        } else {
            // Fallback to recommendedTalents
            talents = char.recommendedTalents || [];
        }

        const row = document.createElement('div');
        row.className = 't-row';
        row.innerHTML = `
            <div class="t-row-info">
                <div class="t-row-label">おすすめ${char.name}素質</div>
                ${buildSelectorHTML}
            </div>
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

function switchBuild(charId, buildId) {
    selectedBuilds[charId] = buildId;
    renderTalentRows();
    updateUI(); // Re-calculate power score based on new build optimization (optional feature)
}

function getFallbackIcon(name) {
    if (name.includes('攻撃') || name.includes('火力') || name.includes('型')) return '⚔️';
    if (name.includes('守') || name.includes('防御') || name.includes('壁')) return '🛡️';
    if (name.includes('支援') || name.includes('バフ') || name.includes('にゃ')) return '✨';
    return '🌸';
}

function calculateFullSynergy() {
    if (selectedIds.length === 0) return { score: 0, title: '編成を選択してください', details: [] };
    const chars = selectedIds.map(id => STELLA_DATA.characters.find(c => c.id === id));
    let score = 20; // Base score for 3-man party
    const details = [];

    // Attribute Synergy
    const attrs = chars.map(c => c.attr);
    const attrCounts = {};
    attrs.forEach(a => attrCounts[a] = (attrCounts[a] || 0) + 1);
    const maxAttr = Math.max(...Object.values(attrCounts));

    if (maxAttr === 3) {
        score += 50;
        details.push({ label: '属性統一', content: '同属性3名。全ダメージ+40%の極大ボーナス。' });
    } else if (maxAttr === 2) {
        score += 20;
        details.push({ label: '属性共鳴', content: '2名が属性一致。攻撃力に補正がかかります。' });
    }

    // Role Synergy
    const roles = chars.map(c => c.role);
    const mainCount = roles.filter(r => r === 'main').length;
    const supportCount = roles.filter(r => r === 'support').length;

    if (mainCount === 1 && supportCount >= 1) {
        score += 20;
        details.push({ label: '理想構成', content: '主力1：支援2。ハイパーキャリー編成で安定。' });
    }

    // Specific Meta synergy
    const charIds = new Set(selectedIds);
    if (charIds.has('chitose') && (charIds.has('teresa') || charIds.has('ayame'))) {
        score += 10;
        details.push({ label: '水影テンプレ', content: '分身と水印の爆発力が高まります。' });
    }

    score = Math.min(100, score);
    let title = score >= 90 ? 'SSS: 神域' : score >= 70 ? 'SS: 最強クラス' : score >= 40 ? 'S: 実戦向き' : 'A: 調整中';
    return { score, title, details };
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
        <div class="analysis-item" style="margin-bottom:10px; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:5px;">
            <strong style="color:var(--primary)">${d.label}</strong>: <span style="font-size:0.85rem">${d.content}</span>
        </div>
    `).join('');
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

function updateTowerRecommendations() {
    const container = document.getElementById('rec-tags-container');
    container.innerHTML = '';
    if (selectedIds.length === 0) return;
    ['通常攻撃', '属性ダメ加算', 'シールド'].forEach(t => {
        const span = document.createElement('span');
        span.className = 'rec-tag';
        span.innerText = t;
        container.appendChild(span);
    });
}

function updateLossRecoRecommendations() {
    const container = document.getElementById('lossreco-content');
    if (selectedIds.length === 0) {
        container.innerHTML = '<p class="placeholder">パーティ編成後に提案されます。</p>';
        return;
    }
    const char = STELLA_DATA.characters.find(c => c.id === selectedIds[0]);
    const recos = STELLA_DATA.lossRecos[char.attr] || [];
    container.innerHTML = recos.map(r => `
        <div class="lr-item"><strong>${r.name}</strong><br><small>${r.core} / ${r.assist}</small></div>
    `).join('');
}

function renderRecommendedTeams() {
    const container = document.getElementById('rec-list');
    container.innerHTML = STELLA_DATA.recommendedTeams.map(t => `
        <div class="rec-team-card" onclick="loadTeam(['${t.members.join("','")}'])">
            <strong>${t.name}</strong><br><small>${t.desc}</small>
        </div>
    `).join('');
}

function loadTeam(ids) {
    selectedIds = ids.slice(0, 3);
    renderCharGrid();
    updateUI();
}

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
            let left = e.clientX + 15;
            let top = e.clientY + 15;
            if (left + 250 > window.innerWidth) left = e.clientX - 265;
            if (top + box.offsetHeight > window.innerHeight) top = e.clientY - box.offsetHeight - 15;
            box.style.left = left + 'px';
            box.style.top = top + 'px';
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('[data-tt-title]') && (!e.relatedTarget || !e.relatedTarget.closest('[data-tt-title]'))) {
            box.classList.remove('visible');
        }
    });
}

window.onload = initSimulator;
