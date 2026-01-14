const STELLA_DATA = {
    characters: [
        // Fire
        {
            id: 'kohaku', name: 'コハク', attr: 'fire', role: 'main', roleDesc: '高火力アタッカー',
            rarity: 'SR', baseAtk: 5800, tags: ['通常攻撃', '火力'],
            recommendedTalents: [
                { name: '騰蛇召喚', effect: '通常攻撃時、一定確率で騰蛇を生成し追撃を行う。', type: 'pink', iconUrl: 'https://img.game8.jp/11865771/504113db2adab10288bb28be47259d23.webp/original' },
                { name: '火種拡散', effect: '爆発ダメージを受けた敵に「火種」を付与し、持続ダメージを与える。', type: 'blue' }
            ]
        },
        {
            id: 'fuyuka', name: 'フユカ', attr: 'fire', role: 'main', roleDesc: '会心特化アタッカー',
            rarity: 'SSR', baseAtk: 7484, tags: ['会心', '連撃'],
            recommendedTalents: [
                { name: '延焼パンチ', effect: '通常攻撃に火属性の追加ダメージを付与。', type: 'pink', iconUrl: 'https://img.game8.jp/12007276/b3f9d25535e3a69b6313a4f87290f449.webp/original' },
                { name: 'ブレイズナックル', effect: '強力な一撃を放ち、周囲に爆発ダメージ。', type: 'pink', iconUrl: 'https://img.game8.jp/12007288/2e5e5c568b4348d5c286775ca6072239.webp/original' }
            ]
        },
        { id: 'flora', name: 'フローラ', attr: 'fire', role: 'support', roleDesc: '属性攻撃バフ', rarity: 'SR', baseAtk: 4200, recommendedTalents: [{ name: '火支援', effect: '味方全体の火属性ダメUP', type: 'pink' }] },
        { id: 'cheeshea', name: 'チーシア', attr: 'fire', role: 'balanced', roleDesc: '召喚・継続火力', rarity: 'SSR', baseAtk: 6900, recommendedTalents: [{ name: '召喚強化', effect: '召喚物の攻撃力を25%強化', type: 'pink' }] },

        // Water
        {
            id: 'chitose', name: 'チトセ', attr: 'water', role: 'main', roleDesc: '主力火力枠 (水の印)',
            rarity: 'SSR', baseAtk: 7542, tags: ['通常攻撃', '分身'],
            recommendedTalents: [
                { name: '水影の型', effect: '攻撃時、20%の確率で水影を生成し、追加ダメージ。', type: 'pink', iconUrl: 'https://img.game8.jp/11872467/137c722ab87ad6f136b457b0ed0e38c8.webp/original' },
                { name: '蛟龍の型', effect: '「水の印」の爆発ダメージが50%上昇。', type: 'pink', iconUrl: 'https://img.game8.jp/11872466/7a1e5844ea039c60de10b1ae14090acf.webp/original' }
            ]
        },
        {
            id: 'teresa', name: 'テレサ', attr: 'water', role: 'support', roleDesc: '会心バフ・印付与',
            rarity: 'SR', baseAtk: 4500,
            recommendedTalents: [
                { name: '飛水・溜力', effect: 'スキルチャージ時間を20%短縮。', type: 'pink', iconUrl: 'https://img.game8.jp/11872534/7b16d47b744fa9df6c5b5f82cc9b7eb9.webp/show' },
                { name: '濁流の誘い', effect: '敵の移動速度を低下させ、「水の印」の付与率を強化。', type: 'pink', iconUrl: 'https://img.game8.jp/11872545/14107bc4fd31c5ee96ff7635677d2062.webp/show' }
            ]
        },
        { id: 'freesia', name: 'フリージア', attr: 'water', role: 'support', roleDesc: 'シールド・火力補助', rarity: 'SSR', baseAtk: 6200 },
        { id: 'ayame', name: 'アヤメ', attr: 'water', role: 'support', roleDesc: '高速印付与', rarity: 'SR', baseAtk: 4100 },

        // Wind
        { id: 'seina', name: 'セイナ', attr: 'wind', role: 'main', roleDesc: 'チャージスキル型', rarity: 'SR', baseAtk: 5600 },
        {
            id: 'natsuka', name: 'ナツカ', attr: 'wind', role: 'balanced', roleDesc: '設置型バフ', rarity: 'SSR', baseAtk: 7100,
            recommendedTalents: [
                { name: '久遠の風華', effect: '設置領域内の味方攻撃力を強化。', type: 'pink', iconUrl: 'https://img.game8.jp/12081225/2e379708d41ad1022928e719091cfe60.webp/show' }
            ]
        },
        { id: 'anzu', name: 'アンズ', attr: 'wind', role: 'support', roleDesc: '速度バフ', rarity: 'SR', baseAtk: 3900 },
        { id: 'kanache', name: 'カナーチェ', attr: 'wind', role: 'balanced', roleDesc: '毒デバフ', rarity: 'SR', baseAtk: 4800 },

        // Light
        {
            id: 'shiya', name: 'シア', attr: 'light', role: 'main', roleDesc: 'ドローン弾幕',
            rarity: 'SSR', baseAtk: 7500,
            recommendedTalents: [
                { name: 'ドローン同期', effect: 'ドローン攻撃が本体と同期。', type: 'pink', iconUrl: 'https://img.game8.jp/11919347/5a2c168c5b1bbe02dda1f90e6ab1a193.webp/show' }
            ]
        },
        { id: 'tilia', name: 'ティリア', attr: 'light', role: 'support', roleDesc: '属性バフ', rarity: 'SR', baseAtk: 4000 },
        { id: 'nazuna', name: 'ナズナ', attr: 'earth', role: 'support', roleDesc: '回復・浄化', rarity: 'SSR', baseAtk: 6800 },

        // Dark
        {
            id: 'fielen', name: 'フィレン', attr: 'dark', role: 'main', roleDesc: '分身アタッカー',
            rarity: 'SSR', baseAtk: 7500,
            recommendedTalents: [
                { name: '影の増殖', effect: '分身の最大召喚数を+2。', type: 'pink', iconUrl: 'https://img.game8.jp/12204277/456cb1e6c41a16341dc3e1b519b81371.webp/original' }
            ]
        },
        { id: 'cozette', name: 'コゼット', attr: 'dark', role: 'support', roleDesc: '重力集敵', rarity: 'SR', baseAtk: 4300 },

        // Others
        { id: 'gray', name: 'グレイ', attr: 'earth', role: 'main', roleDesc: '地・高耐久', rarity: 'SSR', baseAtk: 7200 },
        { id: 'jinlin', name: 'ジンリン', attr: 'light', role: 'balanced', roleDesc: '鉄壁防御', rarity: 'SR', baseAtk: 5200 },
        { id: 'raal', name: 'ラール', attr: 'light', role: 'main', roleDesc: '近接突破', rarity: 'SR', baseAtk: 5900 },
        { id: 'caramel', name: 'キャラメル', attr: 'dark', role: 'main', roleDesc: '広域音圧', rarity: 'SR', baseAtk: 5400 },
        { id: 'misty', name: 'ミスティ', attr: 'dark', role: 'balanced', roleDesc: '深淵召喚', rarity: 'SSR', baseAtk: 7000 },
        { id: 'nanoha', name: 'ナノハ', attr: 'wind', role: 'main', roleDesc: '風・連射', rarity: 'SSR', baseAtk: 7300 },
        { id: 'reisen', name: 'レイセン', attr: 'earth', role: 'balanced', roleDesc: '防御支援', rarity: 'SR', baseAtk: 4900 },
        { id: 'kurunisu', name: 'クルニス', attr: 'dark', role: 'balanced', roleDesc: '耐性低下', rarity: 'SR', baseAtk: 4600 }
    ],
    recommendedTeams: [
        { id: 'water_meta', name: 'チトセ・水属性PT', members: ['chitose', 'teresa', 'freesia'], desc: '属性統一による高火力構成。' },
        { id: 'fire_meta', name: '火炎特化PT', members: ['kohaku', 'fuyuka', 'flora'], desc: '燃焼ダメージによる継続火力。' }
    ],
    towerCards: [
        { id: 'atk_up', name: '基礎攻撃強化', desc: '攻撃力25%上昇。' }
    ],
    lossRecos: {
        water: [{ name: '晴天の彩花', core: '水ダメ+15%', assist: '会心+8%', rank: 5 }],
        fire: [{ name: 'ハナビ', core: '火ダメ+15%', assist: '攻速+10%', rank: 5 }]
    }
};

if (typeof module !== 'undefined') module.exports = STELLA_DATA;
