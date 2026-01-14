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

    // Sort and render ALL characters from STELLA_DATA
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
    const latestSelectId = selectedIds[selectedIds.length - 1];

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
                <div class="char-talent">
                    <strong>推奨素質:</strong><br>${char.recTalent}
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

    // Render Talent Preview for the last selected character
    renderTalentPreview(latestSelectId);

    updateTowerRecommendations();
    updateLossRecoRecommendations();

    const result = calculateFullSynergy();
    document.getElementById('score-fill').style.width = `${result.score}%`;
    document.getElementById('synergy-title').innerText = result.title;
    document.getElementById('synergy-desc').innerText = result.descSummary;

    renderAnalysis(result.details);
}

function renderTalentPreview(charId) {
    const b1Grid = document.getElementById('b1-cards');
    const b2Grid = document.getElementById('b2-cards');
    const b1Title = document.getElementById('b1-title');
    const b2Title = document.getElementById('b2-title');
    const b1Desc = document.getElementById('b1-desc');
    const b2Desc = document.getElementById('b2-desc');

    if (!charId) {
        b1Grid.innerHTML = b2Grid.innerHTML = '';
        b1Title.innerText = '特化構築1'; b2Title.innerText = '特化構築2';
        b1Desc.innerText = b2Desc.innerText = 'キャラクターを選択すると表示されます。';
        return;
    }

    const char = STELLA_DATA.characters.find(c => c.id === charId);
    if (!char || !char.talentBuilds) return;

    // Render Build 1
    const build1 = char.talentBuilds.b1;
    b1Title.innerText = build1 ? build1.name : '特化構築1';
    b1Desc.innerText = build1 ? build1.desc : '-';
    b1Grid.innerHTML = build1 ? build1.cards.map((c, idx) => `
        <div class="t-card">
            <span style="position:absolute; top:5px; left:8px; opacity:0.5; font-size:0.6rem;">${idx + 1}</span>
            ${c}
        </div>
    `).join('') : '';

    // Render Build 2
    const build2 = char.talentBuilds.b2;
    b2Title.innerText = build2 ? build2.name : '特化構築2';
    b2Desc.innerText = build2 ? build2.desc : '-';
    b2Grid.innerHTML = (build2 && build2.cards) ? build2.cards.map((c, idx) => `
        <div class="t-card">
            <span style="position:absolute; top:5px; left:8px; opacity:0.5; font-size:0.6rem;">${idx + 1}</span>
            ${c}
        </div>
    `).join('') : '';
}

// ... remaining helper functions (updateTowerRecommendations, updateLossRecoRecommendations, etc.)
// ... Ensure calculateFullSynergy details have NO "Game8" text.
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
        details.push({ label: '属性統一構成', content: '同属性3名による理想的な編成。属性ダメージボーナスが最大化されます。' });
    } else if (maxAttr === 2) {
        score += 15;
        details.push({ label: '属性準一致', content: '2名が属性一致。印の付与と発動の基本サイクルが成立。' });
    }

    // 2. Character Specific Synergy (Reference Template)
    const charIds = new Set(selectedIds);
    if (charIds.has('chitose') && (charIds.has('teresa') || charIds.has('ayame'))) {
        score += 20;
        details.push({ label: '水属性テンプレ編成', content: 'チトセの通常攻撃と支援キャバフの相性が抜群。最高クラスの継続火力。' });
    }
    if (charIds.has('shiya') && charIds.has('tilia')) {
        score += 20;
        details.push({ label: '光属性バースト編成', content: 'シアの火力をティリアのバフで極限まで高める構成。' });
    }

    score = Math.min(100, score);
    let title = score >= 90 ? '神域の布陣' : score >= 70 ? '一級の連携' : score >= 40 ? '実戦レベル' : '調整中';

    return {
        score,
        title,
        descSummary: `${details.length}件のシナジーを検出。`,
        details
    };
}
// ... rest of the file
