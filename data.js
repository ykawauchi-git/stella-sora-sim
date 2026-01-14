const STELLA_DATA = {
    characters: [
        // Fire
        {
            id: 'kohaku', name: 'コハク', attr: 'fire', role: 'main', mark: 'trigger',
            tags: ['通常攻撃', '主力スキル'],
            recInscriptions: ['fire_dmg', 'skill_boost'],
            talentPaths: [
                { name: '通常攻撃型', desc: '騰蛇を生成し、手数で攻めるビルド。' },
                { name: '主力スキル型', desc: 'スキルの爆発力を高めるビルド。' }
            ],
            recTalent: '通常攻撃型 (騰蛇生成)'
        },
        {
            id: 'fuyuka', name: 'フユカ', attr: 'fire', role: 'main', mark: 'trigger',
            tags: ['会心特化', '主力スキル'],
            recInscriptions: ['fire_dmg', 'crit_boost'],
            talentPaths: [
                { name: '会心強化型', desc: '会心時の追加ダメージを狙うビルド。' },
                { name: '属性共鳴型', desc: '火属性3体編成時に火力が最大化。' }
            ],
            recTalent: '会心強化型'
        },
        { id: 'cheeshea', name: 'チーシア', attr: 'fire', role: 'balanced', mark: 'setter', tags: ['召喚'], recInscriptions: ['fire_dmg', 'mark_boost'], recTalent: '召喚物強化' },
        { id: 'flora', name: 'フローラ', attr: 'fire', role: 'support', mark: 'setter', tags: ['バフ'], recInscriptions: ['fire_dmg', 'mark_boost'], recTalent: '支援バフ強化' },

        // Wind
        { id: 'nanoha', name: 'ナノハ', attr: 'wind', role: 'main', mark: 'trigger', tags: ['通常攻撃'], recInscriptions: ['wind_dmg', 'skill_boost'], recTalent: '距離ボーナス型' },
        { id: 'seina', name: 'セイナ', attr: 'wind', role: 'main', mark: 'trigger', tags: ['高威力スキル'], recInscriptions: ['wind_dmg', 'skill_boost'], recTalent: 'スキルチャージ型' },

        // Light
        { id: 'shiya', name: 'シア', attr: 'light', role: 'main', mark: 'trigger', tags: ['超高火力', '必殺技'], recInscriptions: ['light_dmg', 'crit_boost'], recTalent: '必殺技貫通型' },
        { id: 'minerva', name: 'ミネルバ', attr: 'light', role: 'support', mark: 'setter', tags: ['印付与'], recInscriptions: ['light_dmg', 'mark_boost'], recTalent: '拘束シナジー型' },
        { id: 'tilia', name: 'ティリア', attr: 'light', role: 'support', mark: 'setter', tags: ['攻撃力バフ'], recInscriptions: ['mark_boost', 'skill_boost'], recTalent: '広域バフ型' },

        // Dark
        { id: 'fielen', name: 'フィレン', attr: 'dark', role: 'main', mark: 'trigger', tags: ['分身', '多段攻撃'], recInscriptions: ['dark_dmg', 'skill_boost'], recTalent: '分身共鳴型' },
        { id: 'caramel', name: 'キャラメル', attr: 'dark', role: 'main', mark: 'trigger', tags: ['範囲火力'], recInscriptions: ['dark_dmg', 'skill_boost'], recTalent: 'スピーカー設置型' },

        // Water
        {
            id: 'chitose', name: 'チトセ', attr: 'water', role: 'main', mark: 'trigger',
            tags: ['高機動', '分身', '通常攻撃'],
            recInscriptions: ['water_dmg', 'skill_boost'],
            talentPaths: [
                { name: '通常攻撃型', desc: '騰蛇を生成し、通常攻撃の最終段で印を自動化。' },
                { name: '主力スキル型', desc: 'スキルの2段階目発動と爆発力を重視。' }
            ],
            recTalent: '通常攻撃型 (騰蛇生成)',
            recLossReco: ['晴天の彩花', '古池の水音', '一期一会']
        },
        { id: 'shimiao', name: 'シーミャオ', attr: 'water', role: 'main', mark: 'trigger', tags: ['2段階スキル'], recInscriptions: ['water_dmg', 'skill_boost'], recTalent: 'スキルバースト型' },
        { id: 'freesia', name: 'フリージア', attr: 'water', role: 'support', mark: 'setter', tags: ['回復'], recInscriptions: ['water_dmg', 'mark_boost'], recTalent: 'シールド爆発型' },
        { id: 'teresa', name: 'テレサ', attr: 'water', role: 'support', mark: 'setter', tags: ['強力バフ'], recInscriptions: ['water_dmg', 'mark_boost'], recTalent: '会心支援型' },

        // Earth
        { id: 'gray', name: 'グレイ', attr: 'earth', role: 'main', mark: 'trigger', tags: ['高耐久'], recInscriptions: ['earth_dmg', 'skill_boost'], recTalent: '耐久反撃型' },
        { id: 'reisen', name: 'レイセン', attr: 'earth', role: 'balanced', mark: 'setter', tags: ['シールド'], recInscriptions: ['earth_dmg', 'mark_boost'], recTalent: '防御支援型' },
        { id: 'nazuna', name: 'ナズナ', attr: 'earth', role: 'support', mark: 'setter', tags: ['回復'], recInscriptions: ['earth_dmg', 'mark_boost'], recTalent: 'デバフ解除型' }
    ],
    lossRecos: {
        'fire': [
            { id: 'lr_fire_1', name: '迷いを断つ拳', core: '攻撃力15%', assist: '通常連撃速度UP', rank: 5 },
            { id: 'lr_fire_2', name: 'ハナビ', core: '火属性ダメ20%', assist: '会心追撃', rank: 5 },
            { id: 'lr_fire_3', name: '白紙の航海図', core: '印ダメ25%', assist: '燃焼シナジー', rank: 4 }
        ],
        'water': [
            { id: 'lr_water_1', name: '晴天の彩花', core: '水属性ダメ20%', assist: '通常攻撃に凍結付与', rank: 5 },
            { id: 'lr_water_2', name: '古池の水音', core: '回復量20%', assist: '回復時にシールド付与', rank: 5 },
            { id: 'lr_water_3', name: '一期一会', core: 'スキル命中UP', assist: '属性ボーナス強化', rank: 5 },
            { id: 'lr_water_4', name: '蒼梧城の休日', core: 'スタミナ回復量UP', assist: '回避距離増加', rank: 4 }
        ],
        'wind': [/* simplified */],
        'light': [/* simplified */],
        'dark': [/* simplified */],
        'earth': [/* simplified */]
    },
    inscriptions: {
        'fire_dmg': { name: '炎熱の秘紋', effect: '火属性ダメージUP' },
        'wind_dmg': { name: '嵐の秘紋', effect: '風属性ダメージUP' },
        'light_dmg': { name: '閃光の秘紋', effect: '光属性ダメージUP' },
        'dark_dmg': { name: '常闇の秘紋', effect: '闇属性ダメージUP' },
        'water_dmg': { name: '流水の秘紋', effect: '水属性ダメージUP' },
        'earth_dmg': { name: '大地の秘紋', effect: '地属性ダメージUP' },
        'mark_boost': { name: '刻印の秘紋', effect: '属性印の追撃・爆発ダメUP' },
        'skill_boost': { name: '賢者の秘紋', effect: '主力スキルダメージUP' },
        'crit_boost': { name: '会心の秘紋', effect: '会心率・会心ダメージUP' }
    },
    towerCards: [
        { id: 'tc_atk_boost', name: '会心演説', type: 'atk', target: 'crit_boost', desc: '会心率と会心ダメージを大幅に強化。' },
        { id: 'tc_skill_dmg', name: 'エネルギー暴走', type: 'atk', target: 'skill_boost', desc: '主力スキルのダメージが増加するが、CTが伸びる。' },
        { id: 'tc_mark_chain', name: '連鎖反応', type: 'synergy', target: 'mark_boost', desc: '属性印が爆発時、周囲の敵にもダメージ拡散。' }
    ],
    recommendedTeams: [
        { name: '水属性・チトセ編成', members: ['chitose', 'teresa', 'freesia'], type: 'meta', desc: 'チトセの通常攻撃を最大化。テレサの会心バフと相性抜群。' }
    ]
};

if (typeof module !== 'undefined') module.exports = STELLA_DATA;
