const STELLA_DATA = {
    characters: [
        // Fire
        {
            id: 'fuyuka', name: 'フユカ', attr: 'fire', role: 'main', roleDesc: '会心特化アタッカー',
            rarity: 'SSR', baseAtk: 7484, tags: ['会心', '連撃'],
            talentBuilds: [
                {
                    id: 'b1', name: '爆炎拳・通常特化', desc: '弾丸装填後の通常攻撃を最大強化する基本ビルド。',
                    cards: [
                        { name: '延焼パンチ', effect: '通常攻撃に火属性追加ダメージ。', type: 'pink', iconUrl: 'https://img.game8.jp/12007276/b3f9d25535e3a69b6313a4f87290f449.webp/original' },
                        { name: '連撃よーい！', effect: '弾丸装填数を9発に増加。', type: 'pink', iconUrl: 'https://img.game8.jp/12007288/2e5e5c568b4348d5c286775ca6072239.webp/original' },
                        { name: '追撃ファイヤー', effect: '爆炎拳の追加ダメージを50%強化。', type: 'pink' },
                        { name: 'フレアラッシュ', effect: '火属性ダメージ常時アップ。', type: 'blue' },
                        { name: '会心加速', effect: '会心発生時、攻撃速度が10%上昇。', type: 'yellow' }
                    ]
                },
                {
                    id: 'b2', name: 'ネコパンチ・会心型', desc: '単体ボス向け。爪研ぎマークで会心を連発する。',
                    cards: [
                        { name: 'ネコパンチ', effect: '敵に爪研ぎマークを付与し被会心率UP。', type: 'pink' },
                        { name: '焔の構え', effect: 'スキルダメージを大幅に強化。', type: 'pink' },
                        { name: 'ブレイズナックル', effect: '強力な一撃を放つフィニッシャー。', type: 'pink', iconUrl: 'https://img.game8.jp/12007288/2e5e5c568b4348d5c286775ca6072239.webp/original' },
                        { name: '灼熱ハート', effect: '攻撃速度とスキル威力を強化。', type: 'blue' }
                    ]
                }
            ],
            // Check script.js: It will fallback to first build if recommendedTalents is missing, 
            // but we keep recommendedTalents for compatibility with grid filters if needed.
            recommendedTalents: [
                { name: '延焼パンチ', effect: '通常攻撃強化', type: 'pink', iconUrl: 'https://img.game8.jp/12007276/b3f9d25535e3a69b6313a4f87290f449.webp/original' }
            ]
        },
        {
            id: 'kohaku', name: 'コハク', attr: 'fire', role: 'main', roleDesc: '高火力アタッカー',
            rarity: 'SR', baseAtk: 5800, tags: ['通常攻撃', '火力'],
            recommendedTalents: [
                { name: '騰蛇召喚', effect: '通常攻撃時、一定確率で騰蛇を生成し追撃を行う。', type: 'pink', iconUrl: 'https://img.game8.jp/11865771/504113db2adab10288bb28be47259d23.webp/original' },
                { name: '火種拡散', effect: '爆発ダメージを受けた敵に「火種」を付与し、持続ダメージを与える。', type: 'blue' },
                { name: '初心の型', effect: '通常攻撃のダメージを20%強化。', type: 'yellow' }
            ]
        },
        { id: 'flora', name: 'フローラ', attr: 'fire', role: 'support', roleDesc: '属性攻撃バフ', rarity: 'SR', baseAtk: 4200, recommendedTalents: [{ name: '火支援', effect: '味方全体の火属性ダメUP', type: 'pink' }, { name: '加護の型', effect: '被ダメージを10%軽減。', type: 'blue' }] },
        { id: 'cheeshea', name: 'チーシア', attr: 'fire', role: 'balanced', roleDesc: '召喚・継続火力', rarity: 'SSR', baseAtk: 6900, recommendedTalents: [{ name: '召喚強化', effect: '召喚物の攻撃力を25%強化', type: 'pink' }, { name: '共鳴の型', effect: '召喚中、自身の防御力アップ。', type: 'blue' }] },

        // Water
        {
            id: 'chitose', name: 'チトセ', attr: 'water', role: 'main', roleDesc: '主力火力枠 (水の印)',
            rarity: 'SSR', baseAtk: 7542, tags: ['通常攻撃', '分身'],
            talentBuilds: [
                {
                    id: 'b1', name: '通常・回避軸 (推奨)', desc: '回避攻撃と分身（水影）を駆使し、手数を最大化する汎用ビルド。',
                    cards: [
                        { name: '水影の型', effect: '攻撃時、20%の確率で水影を生成し追撃。', type: 'pink', iconUrl: 'https://img.game8.jp/11872467/137c722ab87ad6f136b457b0ed0e38c8.webp/original' },
                        { name: '影隠れの型', effect: '回避成功時、攻撃力UP＆追加ダメージ。', type: 'blue', iconUrl: 'https://img.game8.jp/11872476/e21dfae54256ebed6d48a6ad5a3777f8.webp/original' },
                        { name: '蛟龍の型', effect: '「水の印」爆発ダメージを50%強化。', type: 'pink', iconUrl: 'https://img.game8.jp/11872466/7a1e5844ea039c60de10b1ae14090acf.webp/original' },
                        { name: '引波の型', effect: '主力スキル発動時、通常攻撃を強化。', type: 'blue' },
                        { name: '漣撃の型', effect: '連撃数に応じて会心率最大15%UP。', type: 'blue', iconUrl: 'https://img.game8.jp/11872475/306af6731b10849ce873e48470e5f901.webp/original' }
                    ]
                },
                {
                    id: 'b2', name: '瞬間火力・滝斬型', desc: '主力スキルの回転率を高め、一撃の威力を重視する構成。',
                    cards: [
                        { name: '滝斬の型', effect: '主力スキルの必要攻撃回数を短縮し威力強化。', type: 'pink' },
                        { name: '石穿の剣舞', effect: '回避直後、次のスキルダメージを大幅UP。', type: 'pink' },
                        { name: '蛟龍の剣舞', effect: '印爆発時、周囲に範囲ダメージ。', type: 'blue' },
                        { name: '水影の型', effect: '手数を補うための分身生成。', type: 'pink', iconUrl: 'https://img.game8.jp/11872467/137c722ab87ad6f136b457b0ed0e38c8.webp/original' }
                    ]
                }
            ],
            recommendedTalents: [{ name: '水影の型', effect: '汎用火力', type: 'pink', iconUrl: 'https://img.game8.jp/11872467/137c722ab87ad6f136b457b0ed0e38c8.webp/original' }]
        },
        {
            id: 'teresa', name: 'テレサ', attr: 'water', role: 'support', roleDesc: '会心バフ・印付与',
            rarity: 'SR', baseAtk: 4500,
            recommendedTalents: [
                { name: '飛水・溜力', effect: 'スキルチャージ時間を20%短縮。', type: 'pink', iconUrl: 'https://img.game8.jp/11872534/7b16d47b744fa9df6c5b5f82cc9b7eb9.webp/show' },
                { name: '濁流の誘い', effect: '敵の移動速度を低下させ、「水の印」の付与率を強化。', type: 'pink', iconUrl: 'https://img.game8.jp/11872545/14107bc4fd31c5ee96ff7635677d2062.webp/show' },
                { name: '強化するにゃ！', effect: '主力キャラの属性ダメージを強化。', type: 'blue' }
            ]
        },
        { id: 'freesia', name: 'フリージア', attr: 'water', role: 'support', roleDesc: 'シールド・火力補助', rarity: 'SSR', baseAtk: 6200, recommendedTalents: [{ name: '絶対防御', effect: 'シールド耐久値を30%強化。', type: 'pink' }, { name: '加護の型', effect: '被ダメージを10%軽減。', type: 'blue' }] },
        { id: 'ayame', name: 'アヤメ', attr: 'water', role: 'support', roleDesc: '高速印付与', rarity: 'SR', baseAtk: 4100, recommendedTalents: [{ name: '水印自動付与', effect: '5秒ごとに自動で水中を付与。', type: 'pink' }] },

        // Wind
        { id: 'seina', name: 'セイナ', attr: 'wind', role: 'main', roleDesc: 'チャージスキル型', rarity: 'SR', baseAtk: 5600, recommendedTalents: [{ name: '重撃', effect: 'チャージ威力を25%強化。', type: 'pink' }, { name: '急所狙い', effect: '弱点へのダメージアップ。', type: 'blue' }] },
        {
            id: 'natsuka', name: 'ナツカ', attr: 'wind', role: 'balanced', roleDesc: '設置型バフ', rarity: 'SSR', baseAtk: 7100,
            recommendedTalents: [
                { name: '久遠の風華', effect: '設置領域内の味方攻撃力を強化。', type: 'pink', iconUrl: 'https://img.game8.jp/12081225/2e379708d41ad1022928e719091cfe60.webp/show' },
                { name: '天風の華', effect: '領域内の敵の防御力を10%低下。', type: 'blue', iconUrl: 'https://img.game8.jp/12081223/29f138f8e1f156942b7da02c83f88071.webp/show' }
            ]
        },
        { id: 'anzu', name: 'アンズ', attr: 'wind', role: 'support', roleDesc: '速度バフ', rarity: 'SR', baseAtk: 3900, recommendedTalents: [{ name: '追い風', effect: '味方全体の移動速度+15%。', type: 'pink' }] },
        { id: 'kanache', name: 'カナーチェ', attr: 'wind', role: 'balanced', roleDesc: '毒デバフ', rarity: 'SR', baseAtk: 4800, recommendedTalents: [{ name: '劇毒の煙', effect: '毒の持続ダメージを40%強化。', type: 'pink' }] },

        // Light
        {
            id: 'shiya', name: 'シア', attr: 'light', role: 'main', roleDesc: 'ドローン弾幕',
            rarity: 'SSR', baseAtk: 7500,
            talentBuilds: [
                {
                    id: 'b1', name: 'ドローン・弾幕展開', desc: 'ドローンの攻撃回数を最大化し、殲滅力を高める。',
                    cards: [
                        { name: 'ドローン同期', effect: 'ドローン攻撃が本体と同期。', type: 'pink', iconUrl: 'https://img.game8.jp/11919347/5a2c168c5b1bbe02dda1f90e6ab1a193.webp/show' },
                        { name: '高出力パルス', effect: 'ビームの威力を30%強化。', type: 'pink' },
                        { name: '弾幕展開', effect: 'ドローンの稼働時間を延長。', type: 'blue' }
                    ]
                }
            ],
            recommendedTalents: [
                { name: 'ドローン同期', effect: 'ドローン攻撃が本体と同期。', type: 'pink', iconUrl: 'https://img.game8.jp/11919347/5a2c168c5b1bbe02dda1f90e6ab1a193.webp/show' }
            ]
        },
        { id: 'tilia', name: 'ティリア', attr: 'light', role: 'support', roleDesc: '属性バフ', rarity: 'SR', baseAtk: 4000, recommendedTalents: [{ name: '光の恩寵', effect: '光属性ダメージ+20%。', type: 'pink' }] },
        { id: 'nazuna', name: 'ナズナ', attr: 'earth', role: 'support', roleDesc: '回復・浄化', rarity: 'SSR', baseAtk: 6800, recommendedTalents: [{ name: '大地の祈り', effect: '回復量を25%強化。', type: 'pink', iconUrl: 'https://img.game8.jp/11869739/031733d8055dc3a1cfba5361a58797a5.webp/show' }] },

        // Dark
        {
            id: 'fielen', name: 'フィレン', attr: 'dark', role: 'main', roleDesc: '分身アタッカー',
            rarity: 'SSR', baseAtk: 7500,
            talentBuilds: [
                {
                    id: 'b1', name: '影の軍勢・召喚型', desc: 'シャドウサーヴァントを大量展開し、数的優位で圧倒する。',
                    cards: [
                        { name: '影の増殖', effect: '分身の最大召喚数を+2。', type: 'pink', iconUrl: 'https://img.game8.jp/12204277/456cb1e6c41a16341dc3e1b519b81371.webp/original' },
                        { name: '幻舞のステップ', effect: '5秒ごとに自動で分身を生成。', type: 'pink' },
                        { name: '深淵の呼び声', effect: '分身消滅時に爆発ダメージ。', type: 'blue' },
                        { name: '重ね影', effect: '分身の耐久力を強化し、自爆ダメージUP。', type: 'blue' }
                    ]
                }
            ],
            recommendedTalents: [
                { name: '影の増殖', effect: '分身の最大召喚数を+2。', type: 'pink', iconUrl: 'https://img.game8.jp/12204277/456cb1e6c41a16341dc3e1b519b81371.webp/original' }
            ]
        },
        { id: 'cozette', name: 'コゼット', attr: 'dark', role: 'support', roleDesc: '重力集敵', rarity: 'SR', baseAtk: 4300, recommendedTalents: [{ name: '重力圧縮', effect: '敵の引き寄せ範囲を強化。', type: 'pink' }] },

        // Others with fallback talents
        { id: 'gray', name: 'グレイ', attr: 'earth', role: 'main', roleDesc: '地・高耐久', rarity: 'SSR', baseAtk: 7200, recommendedTalents: [{ name: '鉄壁の守り', effect: '防御力を20%強化。', type: 'pink' }] },
        { id: 'jinlin', name: 'ジンリン', attr: 'light', role: 'balanced', roleDesc: '鉄壁防御', rarity: 'SR', baseAtk: 5200, recommendedTalents: [{ name: '剛健の構え', effect: '被ダメを常時15%軽減。', type: 'pink' }] },
        { id: 'raal', name: 'ラール', attr: 'light', role: 'main', roleDesc: '近接突破', rarity: 'SR', baseAtk: 5900, recommendedTalents: [{ name: '狂戦士', effect: '残HPが低いほど攻撃力アップ。', type: 'pink' }] },
        { id: 'caramel', name: 'キャラメル', attr: 'dark', role: 'main', roleDesc: '広範囲音圧', rarity: 'SR', baseAtk: 5400, recommendedTalents: [{ name: '重低音の衝撃', effect: '音圧攻撃にスタン効果を付与。', type: 'pink' }] },
        { id: 'misty', name: 'ミスティ', attr: 'dark', role: 'balanced', roleDesc: '深淵召喚', rarity: 'SSR', baseAtk: 7000, recommendedTalents: [{ name: '魔眼の呪縛', effect: '敵の移動速度を大幅ダウン。', type: 'pink' }] },
        { id: 'nanoha', name: 'ナノハ', attr: 'wind', role: 'main', roleDesc: '風・連射', rarity: 'SSR', baseAtk: 7300, recommendedTalents: [{ name: '神速の矢', effect: '攻撃速度を30%強化。', type: 'pink' }] },
        { id: 'reisen', name: 'レイセン', attr: 'earth', role: 'balanced', roleDesc: '防御支援', rarity: 'SR', baseAtk: 4900, recommendedTalents: [{ name: '砂塵の壁', effect: '味方に土属性シールドを付与。', type: 'pink' }] },
        { id: 'kurunisu', name: 'クルニス', attr: 'dark', role: 'balanced', roleDesc: '耐性低下', rarity: 'SR', baseAtk: 4600, recommendedTalents: [{ name: '死霊の囁き', effect: '敵の全耐性を15%ダウン。', type: 'pink' }] }
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
