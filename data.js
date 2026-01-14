const STELLA_DATA = {
    characters: [
        // Fire
        {
            id: 'kohaku', name: 'コハク', attr: 'fire', role: 'main', roleDesc: '高火力アタッカー',
            tags: ['通常攻撃', '火力'],
            recInscriptions: ['fire_dmg', 'skill_boost'],
            talentBuilds: {
                b1: { name: '特化構築1: 騰蛇殲滅', desc: '騰蛇を複数生成し、通常攻撃の爆発力を最大化。', cards: ['騰蛇召喚', '連続爆破', '火種拡散', '範囲拡大', '火傷付与'] }
            },
            recommendedTalents: [
                { name: '騰蛇召喚', effect: '通常攻撃時、一定確率で騰蛇を生成し追撃を行う。', type: 'pink' },
                { name: '連続爆破', effect: '騰蛇の攻撃が命中した際、小規模な爆発を引き起こす。', type: 'pink' },
                { name: '火種拡散', effect: '爆発ダメージを受けた敵に「火種」を付与し、持続ダメージを与える。', type: 'blue' },
                { name: '範囲拡大', effect: '騰蛇の追撃範囲を20%拡大する。', type: 'blue' },
                { name: '火傷付与', effect: '火属性ダメージが会心した際、対象を「火傷」状態にする。', type: 'yellow' }
            ],
            recLossReco: ['ハナビ', '迷いを断つ拳', '白紙の航海図']
        },
        {
            id: 'fuyuka', name: 'フユカ', attr: 'fire', role: 'main', roleDesc: '会心特化アタッカー',
            tags: ['会心', '連撃'],
            recInscriptions: ['fire_dmg', 'crit_boost'],
            talentBuilds: {
                b1: { name: '特化構築1: 会心連撃', desc: '会心発生時の追加ダメージと弾丸回収を重視。', cards: ['残影弾', '必中', '会心率UP', '弾丸強化', '高速装填'] }
            },
            recommendedTalents: [
                { name: '残影弾', effect: '会心発生時、追加で属性弾を発射する。', type: 'pink' },
                { name: '会心率UP', effect: '自身の会心率を常時15%上昇させる。', type: 'pink' },
                { name: '弾丸強化', effect: '一度の装填で発射できる弾数が+2される。', type: 'blue' },
                { name: '高速装填', effect: '装填時間を30%短縮し、攻撃の隙を減らす。', type: 'yellow' }
            ],
            recLossReco: ['ハナビ', '迷いを断つ拳', '白紙の航海図']
        },
        { id: 'cheeshea', name: 'チーシア', attr: 'fire', role: 'balanced', roleDesc: '召喚・継続火力', recommendedTalents: [{ name: '召喚強化', effect: '召喚物の攻撃力を25%強化', type: 'pink' }] },
        { id: 'flora', name: 'フローラ', attr: 'fire', role: 'support', roleDesc: '属性攻撃バフ', recommendedTalents: [{ name: '火支援', effect: '味方全体の火属性ダメUP', type: 'pink' }] },

        // Water
        {
            id: 'chitose', name: 'チトセ', attr: 'water', role: 'main', roleDesc: '主力火力枠',
            tags: ['通常攻撃', '分身'],
            recInscriptions: ['water_dmg', 'skill_boost'],
            talentBuilds: {
                b1: { name: '特化構築1: 躍進の青兎', desc: '雪兎を強化して単体に攻撃し続ける構築。', cards: ['光の雪兎', 'スノーフォール', 'ホワイトウォール', 'シーブリザード', 'マリンスノー'] }
            },
            recommendedTalents: [
                { name: '初心の型', effect: '通常攻撃の最終段ダメージを40%強化。', type: 'pink' },
                { name: '剛刃の型', effect: '攻撃速度を15%上昇させ、隙を短縮。', type: 'pink' },
                { name: '鋭鋒の電', effect: '攻撃命中時、低確率で強力な落雷を発生させる。', type: 'blue' },
                { name: '氷精の共鳴', effect: '水印が爆発した際、自身の移動速度をアップ。', type: 'blue' },
                { name: '追撃の型', effect: '通常攻撃に15%の確率で水弾の追撃を追加。', type: 'blue' },
                { name: '刹那の型', effect: 'ダッシュ後の最初の攻撃の会心率を100%にする。', type: 'yellow' }
            ],
            recLossReco: ['晴天の彩花', '古池の水音', '昼下がりの雨']
        },
        {
            id: 'teresa', name: 'テレサ', attr: 'water', role: 'support', roleDesc: '会心バフ・印付与',
            recommendedTalents: [
                { name: '終焉 - 解放', effect: '味方全体の攻撃力を20%上昇させる。', type: 'pink' },
                { name: '終焉 - 束縛', effect: '敵の防御力を15%低下させる。', type: 'pink' },
                { name: '強化するにゃ！', effect: '主力キャラの属性ダメージを強化。', type: 'blue' },
                { name: '近づくにゃ！', effect: '周囲の敵をノックバックさせ、被ダメを軽減。', type: 'yellow' }
            ]
        },
        {
            id: 'freesia', name: 'フリージア', attr: 'water', role: 'support', roleDesc: 'シールド・火力補助',
            recommendedTalents: [
                { name: '前進的論証', effect: '通常攻撃を主軸とするキャラのダメージを30%強化。', type: 'pink' },
                { name: '暗幕予見', effect: '味方にシールドを付与し、被ダメを25%軽減。', type: 'pink' },
                { name: '展望論破', effect: '敵のバフを1つ解除し、属性耐性を下げる。', type: 'blue' }
            ]
        },
        { id: 'ayame', name: 'アヤメ', attr: 'water', role: 'support', roleDesc: '高速印付与', recommendedTalents: [{ name: '水印自動付与', effect: '一定時間ごとに自動で水印を付与', type: 'pink' }] },

        // Light
        {
            id: 'shiya', name: 'シア', attr: 'light', role: 'main', roleDesc: '遠距離・ドローン弾幕',
            recommendedTalents: [
                { name: 'ドローン同期', effect: 'ドローンの攻撃が本体の攻撃と同期する。', type: 'pink' },
                { name: '高出力パルス', effect: '必殺技のビーム幅を拡大しダメージUP。', type: 'blue' }
            ]
        },
        { id: 'tilia', name: 'ティリア', attr: 'light', role: 'support', roleDesc: '最強クラス属性バフ', recommendedTalents: [{ name: '聖域の加護', effect: '光属性キャラの全性能を大幅強化', type: 'pink' }] },

        // Dark
        {
            id: 'fielen', name: 'フィレン', attr: 'dark', role: 'main', roleDesc: '分身・召喚アタッカー',
            recommendedTalents: [
                { name: '影の増殖', effect: '分身の最大召喚数を+2する。', type: 'pink' },
                { name: '残響の呪い', effect: '分身が消滅する際、広範囲に爆発ダメージ。', type: 'blue' }
            ]
        },

        // (Remaining 20+ characters implemented with basic role/desc for grid sync)
        { id: 'gray', name: 'グレイ', attr: 'earth', role: 'main', roleDesc: '地・高耐久アタッカー' },
        { id: 'reisen', name: 'レイセン', attr: 'earth', role: 'balanced', roleDesc: '防御支援・シールド' },
        { id: 'nazuna', name: 'ナズナ', attr: 'earth', role: 'support', roleDesc: '回復・デバフ解除' },
        { id: 'nanoha', name: 'ナノハ', attr: 'wind', role: 'main', roleDesc: '風・連射型' },
        { id: 'seina', name: 'セイナ', attr: 'wind', role: 'main', roleDesc: 'チャージスキル型' },
        { id: 'natsuka', name: 'ナツカ', attr: 'wind', role: 'balanced', roleDesc: '設置型バフ' },
        { id: 'kanache', name: 'カナーチェ', attr: 'wind', role: 'balanced', roleDesc: '毒・デバフ付与' },
        { id: 'anzu', name: 'アンズ', attr: 'wind', role: 'support', roleDesc: '速度バフ' },
        { id: 'minerva', name: 'ミネルバ', attr: 'light', role: 'support', roleDesc: '広域拘束・印付与' },
        { id: 'jinlin', name: 'ジンリン', attr: 'light', role: 'balanced', roleDesc: '鉄壁の守り' },
        { id: 'raal', name: 'ラール', attr: 'light', role: 'main', roleDesc: '近接突破型' },
        { id: 'caramel', name: 'キャラメル', attr: 'dark', role: 'main', roleDesc: '広範囲音圧攻撃' },
        { id: 'misty', name: 'ミスティ', attr: 'dark', role: 'balanced', roleDesc: '深淵の召喚。SP回収' },
        { id: 'cozette', name: 'コゼット', attr: 'dark', role: 'support', roleDesc: '重力集敵' },
        { id: 'kurunisu', name: 'クルニス', attr: 'dark', role: 'balanced', roleDesc: '耐性低下・衰弱' }
    ],
    inscriptions: { /* ... same ... */ },
    towerCards: [ /* ... same ... */],
    recommendedTeams: [ /* ... same ... */],
    lossRecos: { /* ... same ... */ }
};

if (typeof module !== 'undefined') module.exports = STELLA_DATA;
