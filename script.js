let selectedIds = [];
let activeTowerCardIds = [];

function initSimulator() {
    renderCharGrid();
    renderTowerGrid();
    renderRecommendedTeams();
    updateUI();
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

// --- Tower Card Selection ---
function renderTowerGrid() {
    const grid = document.getElementById('tower-grid');
    grid.innerHTML = '';

    STELLA_DATA.towerCards.forEach(card => {
        const div = document.createElement('div');
        div.className = `tower-card ${activeTowerCardIds.includes(card.id) ? 'active' : ''}`;
        div.innerHTML = `<strong>${card.name}</strong><br><small>${card.desc}</small>`;
        div.onclick = () => toggleTowerCard(card.id);
        grid.appendChild(div);
    });
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

// --- UI Update & Logic ---
function updateUI() {
    for (let i = 0; i < 3; i++) {
        const slot = document.getElementById(`slot-${i}`);
        const cid = selectedIds[i];
        if (cid) {
            const char = STELLA_DATA.characters.find(c => c.id === cid);
            slot.className = `slot filled attr-${char.attr}`;
            const ins = char.recInscriptions.map(id => STELLA_DATA.inscriptions[id]);
            slot.innerHTML = `
                <div class="char-attr">${char.attr}</div>
                <h2>${char.name}</h2>
                <p><strong>${translateRole(char.role)}</strong></p>
                <div class="card-rec">
                    <strong>おすすめ素質:</strong><br>
                    <span style="color:var(--primary)">${char.recTalent}</span>
                </div>
                <div class="card-rec">
                    <small>推奨秘紋:</small>
                    <ul class="ins-list">
                        ${ins.map(n => `<li><span>${n.name}</span>: ${n.effect}</li>`).join('')}
                    </ul>
                </div>
            `;
        } else {
            slot.className = 'slot';
            slot.innerHTML = '<span>?</span>';
        }
    }

    updateTowerRecommendations();
    updateLossRecoRecommendations();

    const result = calculateFullSynergy();
    document.getElementById('score-fill').style.width = `${result.score}%`;
    document.getElementById('synergy-title').innerText = result.title;
    document.getElementById('synergy-desc').innerText = result.descSummary;

    renderAnalysis(result.details);
}

function updateTowerRecommendations() {
    const container = document.getElementById('rec-tags-container');
    container.innerHTML = '';
    if (selectedIds.length === 0) return;

    const chars = selectedIds.map(id => STELLA_DATA.characters.find(c => c.id === id));
    const charTags = new Set(chars.flatMap(c => c.tags).concat(chars.flatMap(c => c.recInscriptions)));

    const matching = STELLA_DATA.towerCards.filter(card => charTags.has(card.target));
    matching.forEach(card => {
        const span = document.createElement('span');
        span.className = 'tag-rec';
        span.innerText = card.name;
        container.appendChild(span);
    });
}

function updateLossRecoRecommendations() {
    const container = document.getElementById('lossreco-content');
    if (selectedIds.length === 0) {
        container.innerHTML = '<p style="opacity: 0.6; font-size: 0.8rem;">パーティ編成後に提案されます。</p>';
        return;
    }

    const chars = selectedIds.map(id => STELLA_DATA.characters.find(c => c.id === id));
    const mainChar = chars.find(c => c.role === 'main') || chars[0];
    const attrs = chars.map(c => c.attr);
    const attrCounts = {};
    attrs.forEach(a => attrCounts[a] = (attrCounts[a] || 0) + 1);

    const dominantAttr = Object.keys(attrCounts).reduce((a, b) => attrCounts[a] >= attrCounts[b] ? a : b);

    // Check for character-specific LossReco (from Game8)
    let recList = [];
    if (mainChar && mainChar.recLossReco) {
        // Find existing data for these names
        mainChar.recLossReco.forEach(name => {
            const found = STELLA_DATA.lossRecos[dominantAttr]?.find(lr => lr.name === name);
            if (found) recList.push(found);
            else recList.push({ name, core: '推奨装備', assist: '最適シナジー', rank: 5 });
        });
    } else {
        recList = STELLA_DATA.lossRecos[dominantAttr] || [];
    }

    container.innerHTML = recList.slice(0, 3).map(lr => `
        <div class="lossreco-item">
            <div class="lr-icon" style="background:${lr.rank === 5 ? 'var(--secondary)' : '#666'}">${lr.rank || '★'}</div>
            <div class="lr-info">
                <div class="lr-name">${lr.name}</div>
                <div class="lr-effect">${lr.core} / ${lr.assist}</div>
            </div>
        </div>
    `).join('');
}

function calculateFullSynergy() {
    if (selectedIds.length === 0) return { score: 0, title: '編成不足', descSummary: '-', details: [] };

    const chars = selectedIds.map(id => STELLA_DATA.characters.find(c => c.id === id));
    let score = 0;
    const details = [];

    // 1. Attribute
    const attrs = chars.map(c => c.attr);
    const attrCounts = {};
    attrs.forEach(a => attrCounts[a] = (attrCounts[a] || 0) + 1);
    const maxAttr = Math.max(...Object.values(attrCounts));

    if (maxAttr === 3) {
        score += 40;
        details.push({ label: '属性統一構成', content: '同属性3名。Game8推奨の安定した火力が期待できます。' });
    } else if (maxAttr === 2) {
        score += 15;
        details.push({ label: '属性準一致', content: '2名が属性一致。印の付与と発動の基本サイクルが成立。' });
    }

    // 2. Character Specific Synergy (Game8 Reference)
    const charIds = new Set(selectedIds);
    if (charIds.has('chitose') && (charIds.has('teresa') || charIds.has('freesia'))) {
        score += 20;
        details.push({ label: '水属性テンプレ編成', content: 'チトセを軸とした最強クラスの構成。通常攻撃と支援の相性が抜群。' });
    }
    if (charIds.has('shiya') && charIds.has('tilia')) {
        score += 20;
        details.push({ label: '光属性バースト編成', content: 'シアの火力をティリアのバフで極限まで高める構成。' });
    }

    // 3. Inscription & Talent Alignment
    score += 10;
    details.push({ label: 'ビルド整合性', content: '各キャラのおすすめ素質（通常型/スキル型）に合わせた秘紋選択を推奨。' });

    score = Math.min(100, score);
    let title = score >= 90 ? '神域の布陣' : score >= 70 ? '一級の連携' : score >= 40 ? '実戦レベル' : '調整中';

    return {
        score,
        title,
        descSummary: `${details.length}件のシナジーを適用中。`,
        details
    };
}

function renderAnalysis(details) {
    const container = document.getElementById('synergy-analysis-content');
    if (details.length === 0) {
        container.innerHTML = '<p class="placeholder">パーティを編成すると詳しい解析が表示されます。</p>';
        return;
    }

    container.innerHTML = details.map(d => `
        <div class="analysis-item">
            <span class="analysis-label">${d.label}</span>
            <p style="margin:0">${d.content}</p>
        </div>
    `).join('');
}

function renderRecommendedTeams() {
    const list = document.getElementById('rec-list');
    list.innerHTML = '';
    STELLA_DATA.recommendedTeams.forEach(team => {
        const div = document.createElement('div');
        div.className = `rec-card ${team.type}`;
        div.innerHTML = `<strong>${team.name}</strong><br><small>${team.desc}</small>`;
        div.onclick = () => {
            selectedIds = [...team.members];
            updateUI();
            renderCharGrid();
        };
        list.appendChild(div);
    });
}

function translateRole(role) {
    const m = { 'main': '主力', 'support': '支援', 'balanced': '均衡' };
    return m[role] || role;
}

window.onload = initSimulator;
