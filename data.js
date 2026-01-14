const STELLA_DATA = {
    characters: [
        // Fire
        {
            id: 'kohaku', name: 'コハク', attr: 'fire', role: 'main', roleDesc: '高火力アタッカー',
            tags: ['通常攻撃', '火力'],
            recInscriptions: ['fire_dmg', 'skill_boost'],
            recommendedTalents: [
                { name: '騰蛇召喚', effect: '通常攻撃時、一定確率で騰蛇を生成し追撃を行う。', type: 'pink' },
                { name: '連続爆破', effect: '騰蛇の攻撃が命中した際、小規模な爆発を引き起こす。', type: 'pink' },
                { name: '火種拡散', effect: '爆発ダメージを受けた敵に「火種」を付与し、持続ダメージを与える。', type: 'blue' },
                { name: '火傷付与', effect: '火属性ダメージが會心した際、対象を「火傷」状態にする。', type: 'yellow' }
            ],
            recLossReco: ['ハナビ', '迷いを断つ拳', '白紙の航海図']
        },
        {
            id: 'fuyuka', name: 'フユカ', attr: 'fire', role: 'main', roleDesc: '会心特化アタッカー',
            tags: ['会心', '連撃'],
            recommendedTalents: [
                { name: '残影弾', effect: '会心発生時、追加で属性弾を発射する。', type: 'pink' },
                { name: '会心率UP', effect: '自身の会心率を常時15%上昇させる。', type: 'pink' },
                { name: '弾丸強化', effect: '一度の装填で発射できる弾数が+2される。', type: 'blue' }
            ],
            recLossReco: ['ハナビ', '迷いを断つ拳', '白紙の航海図']
        },
        { id: 'flora', name: 'フローラ', attr: 'fire', role: 'support', roleDesc: '属性攻撃バフ', recommendedTalents: [{ name: '火支援', effect: '味方全体の火属性ダメUP', type: 'pink' }] },

        // Water
        {
            id: 'chitose', name: 'チトセ', attr: 'water', role: 'main', roleDesc: '主力火力枠 (水の印)',
            tags: ['通常攻撃', '分身'],
            recommendedTalents: [
                { name: '水影の型', effect: '攻撃時、20%の確率で水影を生成し、追加ダメージ。', type: 'pink', iconUrl: 'https://img.game8.jp/11872467/137c722ab87ad6f136b457b0ed0e38c8.webp/original' },
                { name: '蛟龍の型', effect: '「水の印」の爆発ダメージが50%上昇。', type: 'pink', iconUrl: 'https://img.game8.jp/11872466/7a1e5844ea039c60de10b1ae14090acf.webp/original' },
                { name: '漣撃の型', effect: '連撃数に応じて会心率が最大15%上昇。', type: 'blue', iconUrl: 'https://img.game8.jp/11872475/306af6731b10849ce873e48470e5f901.webp/original' },
                { name: '影隠れの型', effect: '回避成功時、自身の攻撃力を10秒間20%強化。', type: 'blue', iconUrl: 'https://img.game8.jp/11872476/e21dfae54256ebed6d48a6ad5a3777f8.webp/original' }
            ],
            recLossReco: ['晴天の彩花', '古池の水音', '昼下がりの雨']
        },
        {
            id: 'teresa', name: 'テレサ', attr: 'water', role: 'support', roleDesc: '会心バフ・印付与',
            recommendedTalents: [
                { name: '飛水・溜力', effect: 'スキルチャージ時間を20%短縮。', type: 'pink', iconUrl: 'https://img.game8.jp/11872534/7b16d47b744fa9df6c5b5f82cc9b7eb9.webp/show' },
                { name: '濁流の誘い', effect: '敵の移動速度を低下させ、「水の印」の付与率を強化。', type: 'pink', iconUrl: 'https://img.game8.jp/11872545/14107bc4fd31c5ee96ff7635677d2062.webp/show' },
                { name: '強化するにゃ！', effect: '主力キャラの属性ダメージを強化。', type: 'blue' }
            ]
        },
        {
            id: 'freesia', name: 'フリージア', attr: 'water', role: 'support', roleDesc: 'シールド・火力補助',
            recommendedTalents: [
                { name: '前進的論証', effect: '通常攻撃を主軸とするキャラのダメージを30%強化。', type: 'pink' },
                { name: '暗幕予見', effect: '味方にシールドを付与し、被ダメを25%軽減。', type: 'pink' }
            ]
        },

        // Wind
        {
            id: 'seina', name: 'セイナ', attr: 'wind', role: 'main', roleDesc: 'チャージスキル型',
            recommendedTalents: [
                { name: '重撃', effect: 'チャージスキルの最大威力を25%強化。', type: 'pink' }
            ]
        },
        {
            id: 'natsuka', name: 'ナツカ', attr: 'wind', role: 'balanced', roleDesc: '設置型バフ',
            recommendedTalents: [
                { name: '久遠の風華', effect: '設置した領域内の味方の攻撃力を強化。', type: 'pink', iconUrl: 'https://img.game8.jp/12081225/2e379708d41ad1022928e719091cfe60.webp/show' },
                { name: '天風の華', effect: '領域内の敵の防御力を10%低下させる。', type: 'pink', iconUrl: 'https://img.game8.jp/12081223/29f138f8e1f156942b7da02c83f88071.webp/show' }
            ]
        },

        // Light
        {
            id: 'shiya', name: 'シア', attr: 'light', role: 'main', roleDesc: '遠距離・ドローン弾幕',
            recommendedTalents: [
                { name: 'ドローン同期', effect: 'ドローンの攻撃が本体の攻撃と同期する。', type: 'pink', iconUrl: 'https://img.game8.jp/11919347/5a2c168c5b1bbe02dda1f90e6ab1a193.webp/show' },
                { name: '光の雪兎', effect: '雪兎が敵を引き寄せ、持続ダメージを与える。', type: 'pink', iconUrl: 'https://img.game8.jp/11919336/f8684423707cc0c0f6e5c0f987a52ba8.webp/show' }
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

        // Others
        { id: 'gray', name: 'グレイ', attr: 'earth', role: 'main', roleDesc: '地・高耐久アタッカー' },
        { id: 'reisen', name: 'レイセン', attr: 'earth', role: 'balanced', roleDesc: '防御支援・シールド' },
        { id: 'nazuna', name: 'ナズナ', attr: 'earth', role: 'support', roleDesc: '回復・デバフ解除' },
        { id: 'nanoha', name: 'ナノハ', attr: 'wind', role: 'main', roleDesc: '風・連射型' },
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
    recommendedTeams: [
        { id: 'water_meta', name: 'チトセ・水属性PT', members: ['chitose', 'teresa', 'freesia'], desc: 'チトセの分身とテレサの会心バフを軸にした水属性最強構成。' },
        { id: 'fire_meta', name: '火炎特化PT', members: ['kohaku', 'fuyuka', 'flora'], desc: '持続ダメージと爆発力を兼ね備えた火属性テンプレ。' }
    ],
    towerCards: [
        { id: 'atk_up', name: '基礎攻撃強化', desc: '攻撃力が一律25%上昇する。' },
        { id: 'crit_boost', name: '会心加速', desc: '会心発生時、攻撃速度が10%上昇(最大5回)。' }
    ],
    lossRecos: {
        water: [
            { name: '晴天の彩花', core: '水属性ダメ+15%', assist: '会心率+8%', rank: 5 },
            { name: '古池の水音', core: '通常攻撃ダメ+20%', assist: 'SP回復+5%', rank: 4 }
        ],
        fire: [
            { name: 'ハナビ', core: '火属性ダメ+15%', assist: '攻撃速度+10%', rank: 5 }
        ]
    }
};

if (typeof module !== 'undefined') module.exports = STELLA_DATA;
