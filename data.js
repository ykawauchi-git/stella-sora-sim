const STELLA_DATA = {
    characters: [
        // Fire
        {
            id: 'kohaku', name: 'コハク', attr: 'fire', role: 'main', mark: 'trigger',
            tags: ['通常攻撃', '主力スキル'],
            recInscriptions: ['fire_dmg', 'skill_boost'],
            talentBuilds: {
                b1: { name: '特化構築1: 騰蛇殲滅', desc: '騰蛇を複数生成し、通常攻撃の爆発力を最大化。', cards: ['騰蛇召喚', '連続爆破', '火種拡散', '範囲拡大', '火傷付与'] },
                b2: { name: '特化構築2: スキル連動', desc: '主力スキルの回転率を上げ、印の爆発を誘発。', cards: ['CT短縮', '爆発強化', '追撃発生', '印付与強化', '集中砲火'] }
            },
            recLossReco: ['ハナビ', '迷いを断つ拳', '白紙の航海図']
        },
        {
            id: 'fuyuka', name: 'フユカ', attr: 'fire', role: 'main', mark: 'trigger',
            tags: ['会心特化', '通常攻撃'],
            recInscriptions: ['fire_dmg', 'crit_boost'],
            talentBuilds: {
                b1: { name: '特化構築1: 会心連撃', desc: '会心発生時の追加ダメージと弾丸回収を重視。', cards: ['残影弾', '必中', '会心率UP', '弾丸強化', '高速装填'] },
                b2: { name: '特化構築2: 範囲制圧', desc: '主力スキルの範囲を広げ、多数の敵を同時に処理。', cards: ['広域爆破', '火炎地帯', '熱気持続', '属性浸食', '爆撃強化'] }
            },
            recLossReco: ['ハナビ', '迷いを断つ拳', '白紙の航海図']
        },
        { id: 'cheeshea', name: 'チーシア', attr: 'fire', role: 'balanced', mark: 'setter', tags: ['召喚'], recInscriptions: ['fire_dmg', 'mark_boost'], talentBuilds: { b1: { name: '召喚強化', desc: '召喚物の攻撃力と持続時間を強化', cards: ['増量', '威力', '耐久', '自動', '爆発'] } } },
        { id: 'flora', name: 'フローラ', attr: 'fire', role: 'support', mark: 'setter', tags: ['バフ'], recInscriptions: ['fire_dmg', 'mark_boost'], talentBuilds: { b1: { name: '全体支援', desc: 'パーティ全体の火ダメージを底上げ', cards: ['鼓舞', '加護', '増幅', '共鳴', '守護'] } } },
        { id: 'cassimila', name: 'カシミラ', attr: 'fire', role: 'balanced', mark: 'setter', tags: ['万能'], recInscriptions: ['fire_dmg', 'skill_boost'], talentBuilds: { b1: { name: '印連動', desc: '印の爆発とスキルCT短縮を狙う', cards: ['連鎖', '短縮', '爆撃', '蓄積', '浸透'] } } },
        { id: 'laal_xmas', name: 'クリスマスラール', attr: 'fire', role: 'balanced', mark: 'setter', tags: ['召喚', 'バフ'], recInscriptions: ['fire_dmg'], talentBuilds: { b1: { name: '従者支援', desc: '聖夜の従者を召喚し守りを固める', cards: ['聖夜', '降臨', '祝福', '耐性', '還元'] } } },

        // Water
        {
            id: 'chitose', name: 'チトセ', attr: 'water', role: 'main', mark: 'trigger',
            tags: ['高機動', '分身', '通常攻撃'],
            recInscriptions: ['water_dmg', 'skill_boost'],
            talentBuilds: {
                b1: { name: '特化構築1: 躍進の青兎', desc: '雪兎を強化して単体に攻撃し続ける構築。', cards: ['光の雪兎', 'スノーフォール', 'ホワイトウォール', 'シーブリザード', 'マリンスノー'] },
                b2: { name: '特化構築2: 氷影の月夜', desc: '夜兎を強化し、複数の敵にダメージを与え続ける構築。', cards: ['月の夜兎', 'ナイトフォロー', '集束ミサイル', 'ナイトパックス', 'ラピッドファイア'] }
            },
            recLossReco: ['晴天の彩花', '古池の水音', '昼下がりの雨']
        },
        { id: 'shimiao', name: 'シーミャオ', attr: 'water', role: 'main', mark: 'trigger', tags: ['通常攻撃'], recInscriptions: ['water_dmg'], talentBuilds: { b1: { name: '連撃特化', desc: '通常攻撃の段数を増やし印を発動', cards: ['流水', '激流', '加速', '追撃', '貫通'] } } },
        { id: 'freesia', name: 'フリージア', attr: 'water', role: 'support', mark: 'setter', tags: ['シールド', '回復'], recInscriptions: ['water_dmg'], talentBuilds: { b1: { name: '防御支援', desc: 'シールドの耐久値を上げ味方を守る', cards: ['堅牢', '反射', '再生', '障壁', '慈愛'] } } },
        { id: 'teresa', name: 'テレサ', attr: 'water', role: 'support', mark: 'setter', tags: ['バフ'], recInscriptions: ['water_dmg'], talentBuilds: { b1: { name: '火力支援', desc: '会心率と属性ダメージを大幅強化', cards: ['閃光', '知恵', '鋭気', '集中', '必中'] } } },
        { id: 'ayame', name: 'アヤメ', attr: 'water', role: 'support', mark: 'setter', tags: ['印付与'], recInscriptions: ['water_dmg'], talentBuilds: { b1: { name: '印回転', desc: '水印の付与頻度を極限まで高める', cards: ['霧散', '凝縮', '浸食', '飽和', '連鎖'] } } },

        // Wind
        { id: 'nanoha', name: 'ナノハ', attr: 'wind', role: 'main', mark: 'trigger', tags: ['連射'], recInscriptions: ['wind_dmg'], talentBuilds: { b1: { name: '狙撃特化', desc: '遠距離ダメージボーナスを最大化', cards: ['疾風', '精密', '貫通', '跳弾', '収束'] } } },
        { id: 'seina', name: 'セイナ', attr: 'wind', role: 'main', mark: 'trigger', tags: ['チャージ'], recInscriptions: ['wind_dmg'], talentBuilds: { b1: { name: '破壊特化', desc: 'チャージスキルの威力を極限まで上昇', cards: ['颶風', '崩壊', '暴風', '圧砕', '重圧'] } } },
        { id: 'natsuka', name: 'ナツカ', attr: 'wind', role: 'balanced', mark: 'setter', tags: ['設置'], recInscriptions: ['wind_dmg'], talentBuilds: { b1: { name: '領域展開', desc: '設置物の攻撃範囲と持続を強化', cards: ['停滞', '旋回', '攪拌', '共振', '拡大'] } } },
        { id: 'kanache', name: 'カナーチェ', attr: 'wind', role: 'balanced', mark: 'setter', tags: ['デバフ'], recInscriptions: ['wind_dmg'], talentBuilds: { b1: { name: '腐食', desc: '持続ダメージと防御ダウンを付与', cards: ['蝕み', '衰弱', '麻痺', '混乱', '毒撃'] } } },
        { id: 'anzu', name: 'アンズ', attr: 'wind', role: 'support', mark: 'setter', tags: ['速度UP'], recInscriptions: ['wind_dmg'], talentBuilds: { b1: { name: '迅速', desc: 'チーム全体の移動と攻撃速度を強化', cards: ['加速', '脱兎', '疾駆', '追い風', '飛翔'] } } },

        // Light
        { id: 'shiya', name: 'シア', attr: 'light', role: 'main', mark: 'trigger', tags: ['通常攻撃', '召喚'], recInscriptions: ['light_dmg'], talentBuilds: { b1: { name: 'ドローン', desc: 'ドローンの追撃頻度を上げる', cards: ['同期', '出力', '制御', '通信', '修復'] } } },
        { id: 'minerva', name: 'ミネルバ', attr: 'light', role: 'support', mark: 'setter', tags: ['拘束'], recInscriptions: ['light_dmg'], talentBuilds: { b1: { name: '封印', desc: '敵の行動を制限しデバフを付与', cards: ['停止', '沈黙', '虚弱', '失明', '隷属'] } } },
        { id: 'tilia', name: 'ティリア', attr: 'light', role: 'support', mark: 'setter', tags: ['バフ'], recInscriptions: ['light_dmg'], talentBuilds: { b1: { name: '裁定', desc: '属性ダメージと与ダメージを強化', cards: ['審判', '断罪', '浄化', '聖域', '覚醒'] } } },
        { id: 'jinlin', name: 'ジンリン', attr: 'light', role: 'balanced', mark: 'setter', tags: ['バリア'], recInscriptions: ['light_dmg'], talentBuilds: { b1: { name: '鉄壁', desc: 'バリアの耐久とチームの生存力を強化', cards: ['金剛', '反射', '吸収', '不屈', '再生'] } } },
        { id: 'raal', name: 'ラール', attr: 'light', role: 'main', mark: 'trigger', tags: ['近接'], recInscriptions: ['light_dmg'], talentBuilds: { b1: { name: '突進', desc: '敵への接近速度と衝突ダメージを強化', cards: ['剛力', '突風', '断撃', '猛進', '不敗'] } } },

        // Dark
        { id: 'fielen', name: 'フィレン', attr: 'dark', role: 'main', mark: 'trigger', tags: ['多段攻撃', '分身'], recInscriptions: ['dark_dmg'], talentBuilds: { b1: { name: '影の王', desc: '分身を多数展開し敵を圧倒する', cards: ['共演', '増殖', '模倣', '同調', '残響'] } } },
        { id: 'caramel', name: 'キャラメル', attr: 'dark', role: 'main', mark: 'trigger', tags: ['範囲火力'], recInscriptions: ['dark_dmg'], talentBuilds: { b1: { name: '騒音', desc: 'スピーカーの音圧で広範囲を破壊', cards: ['振動', '共鳴', '衝撃', '過熱', '破壊'] } } },
        { id: 'misty', name: 'ミスティ', attr: 'dark', role: 'balanced', mark: 'setter', tags: ['召喚'], recInscriptions: ['dark_dmg'], talentBuilds: { b1: { name: '深淵', desc: '召喚物の攻撃とSP回収効率を強化', cards: ['吸魂', '魔導', '献身', '再生', '呪縛'] } } },
        { id: 'cozette', name: 'コゼット', attr: 'dark', role: 'support', mark: 'setter', tags: ['集敵'], recInscriptions: ['dark_dmg'], talentBuilds: { b1: { name: '重力', desc: '広範囲の敵を引き寄せ無防備にする', cards: ['特異点', '圧壊', '集束', '停滞', '絶叫'] } } },
        { id: 'kurunisu', name: 'クルニス', attr: 'dark', role: 'balanced', mark: 'setter', tags: ['デバフ'], recInscriptions: ['dark_dmg'], talentBuilds: { b1: { name: '凋落', desc: '属性耐性を下げ、闇印の威力を上昇', cards: ['腐敗', '浸食', '闇夜', '恐怖', '絶望'] } } },

        // Earth
        { id: 'gray', name: 'グレイ', attr: 'earth', role: 'main', mark: 'trigger', tags: ['高耐久'], recInscriptions: ['earth_dmg'], talentBuilds: { b1: { name: '守護者', desc: '被ダメ軽減と反撃性能を強化', cards: ['岩壁', '報復', '堅忍', '根性', '金剛'] } } },
        { id: 'reisen', name: 'レイセン', attr: 'earth', role: 'balanced', mark: 'setter', tags: ['シールド'], recInscriptions: ['earth_dmg'], talentBuilds: { b1: { name: '共鳴', desc: '地属性キャラ全員の防御を底上げ', cards: ['脈動', '大地の怒り', '連帯', '安定', '結束'] } } },
        { id: 'nazuna', name: 'ナズナ', attr: 'earth', role: 'support', mark: 'setter', tags: ['回復'], recInscriptions: ['earth_dmg'], talentBuilds: { b1: { name: '恵み', desc: '回復量と状態異常解除を強化', cards: ['慈雨', '浄化', '充填', '祈り', '祝福'] } } }
    ],
    lossRecos: {
        'fire': [
            { id: 'lr_fire_1', name: 'ハナビ', core: '火属性ダメ20%', assist: '会心時に追加ダメージ', rank: 5 },
            { id: 'lr_fire_2', name: '迷いを断つ拳', core: '通常連撃速度UP', assist: '攻撃力15%UP', rank: 5 },
            { id: 'lr_fire_3', name: '白紙の航海図', core: '印ダメージ25%UP', assist: '燃焼状態の敵にボーナス', rank: 4 }
        ],
        'water': [
            { id: 'lr_water_1', name: '晴天の彩花', core: '水属性ダメ20%', assist: '通常攻撃に凍結付与', rank: 5 },
            { id: 'lr_water_2', name: '古池の水音', core: '回復量20%', assist: 'シールド展開', rank: 5 },
            { id: 'lr_water_3', name: '昼下がりの雨', core: '必殺技ダメ30%', assist: '水属性キャラのSP回収', rank: 5 }
        ],
        'wind': [
            { id: 'lr_wind_1', name: '風の便り', core: '風属性ダメ20%', assist: '回避成功時にCT短縮', rank: 5 },
            { id: 'lr_wind_2', name: '草原の調べ', core: '遠距離ダメージUP', assist: '移動速度15%UP', rank: 4 }
        ],
        'light': [
            { id: 'lr_light_1', name: '波にゆられて', core: '光属性ダメ20%', assist: '多段ヒット追撃付与', rank: 5 },
            { id: 'lr_light_2', name: '夕涼み', core: '必殺技チャージ速度UP', assist: '会心ダメージ20%UP', rank: 5 },
            { id: 'lr_light_3', name: '清浄なる祈り', core: 'バフ効果時間1.5倍', assist: '防御力UP', rank: 4 }
        ],
        'dark': [
            { id: 'lr_dark_1', name: '常闇の招待状', core: '闇属性ダメ20%', assist: '防御貫通攻撃', rank: 5 },
            { id: 'lr_dark_2', name: '影のささやき', core: '分身ダメージ30%UP', assist: 'HP吸収', rank: 5 },
            { id: 'lr_dark_3', name: '深淵の瞳', core: 'SP回収効率UP', assist: 'デバフ延長', rank: 4 }
        ],
        'earth': [
            { id: 'lr_earth_1', name: '伝説のアラシ', core: '地属性ダメ20%', assist: '岩の障壁を生成', rank: 5 },
            { id: 'lr_earth_2', name: '痛みは救済', core: '防御力を攻撃力に変換', assist: '被ダメ10%カット', rank: 5 }
        ]
    },
    inscriptions: {
        'fire_dmg': { name: '炎熱の秘紋', effect: '火属性ダメージUP' },
        'wind_dmg': { name: '嵐の秘紋', effect: '風属性ダメージUP' },
        'light_dmg': { name: '閃光の秘紋', effect: '光属性ダメージUP' },
        'dark_dmg': { name: '常闇의秘紋', effect: '闇属性ダメージUP' },
        'water_dmg': { name: '流水の秘紋', effect: '水属性ダメージUP' },
        'earth_dmg': { name: '大地の秘紋', effect: '地属性ダメージUP' },
        'mark_boost': { name: '刻印の秘紋', effect: '属性印の追撃・爆発ダメUP' },
        'skill_boost': { name: '賢者の秘紋', effect: '主力スキルダメージUP' },
        'crit_boost': { name: '会心の秘紋', effect: '会心率・会心ダメージUP' }
    },
    towerCards: [
        { id: 'tc_atk_boost', name: '会心演説', type: 'atk', target: 'crit_boost', desc: '会心率と会心ダメージを大幅に強化。' },
        { id: 'tc_skill_dmg', name: 'エネルギー暴走', type: 'atk', target: 'skill_boost', desc: '主力スキルのダメージが増加するが、CTが伸びる。' },
        { id: 'tc_mark_chain', name: '連鎖反応', type: 'synergy', target: 'mark_boost', desc: '属性印が爆発時、周囲の敵にもダメージ拡散。' },
        { id: 'tc_summon_buff', name: '従者強化', type: 'special', target: '召喚', desc: '召喚物（スピーカー、分身など）の攻撃力UP。' }
    ],
    recommendedTeams: [
        { name: '水属性・青兎連撃', members: ['chitose', 'teresa', 'ayame'], type: 'meta', desc: 'チトセの雪兎と通常連撃を最大化。属性印の回転を重視。' },
        { name: '光属性・必殺超越', members: ['shiya', 'tilia', 'minerva'], type: 'meta', desc: 'シアの火力を限界まで高める構成。拘束とバフの相性が抜群。' },
        { name: '闇属性・影の饗宴', members: ['fielen', 'misty', 'cozette'], type: 'meta', desc: 'フィレンの分身とミスティの追撃で戦場を掌握。' }
    ]
};

if (typeof module !== 'undefined') module.exports = STELLA_DATA;
