export const directLineageJourney = {
  id: "direct-lineage",
  title: "直系ミッション：家系ラーメンの源流を巡る旅",
  description: "吉村家から始まる正統派家系ラーメンの直系店舗を巡り、伝統と味の秘密を体験しよう。",
  type: "free",
  lineageType: "direct",
  intro: `
    1974年、横浜で誕生した「家系ラーメン」。
    その源流である「吉村家」から直接派生した"直系"店舗は、厳しい修行と伝統を受け継ぐ正統派のみが名乗ることを許されています。
    あなたは今、家系ラーメンの真髄を探る旅に出発します。
    すべての直系店舗を巡り、知識カードを集め、伝説の証を手に入れましょう！
  `,
  shops: [
    {
      id: "yoshimuraya",
      name: "吉村家",
      location: "横浜市西区",
      story: `1974年創業、家系ラーメンの総本山。創業者・吉村実が生み出した豚骨醤油スープと太麺の組み合わせは、全国のラーメン文化に革命をもたらしました。「お客様は我が味の師なり」の精神で、今も進化を続けています。`,
      features: [
        "漆黒の器に金文字の店名",
        "醤油先行型の濃厚スープ",
        "燻製チャーシューとスモーク味玉",
        "純白の戦闘服を纏う職人"
      ],
      question: {
        text: "吉村家のラーメンの特徴はどれ？",
        options: [
          "白濁クリーミースープ",
          "醤油先行型の濃厚スープ",
          "味噌ベースのスープ",
          "細麺と魚介ダシ"
        ],
        correctAnswer: "醤油先行型の濃厚スープ"
      },
      card: {
        id: "card-yoshimuraya",
        title: "家系の原点：吉村家",
        description: "1974年創業、家系ラーメンのすべてはここから始まった。",
        imageUrl: "/images/shops/placeholder.png",
        rarity: "legendary"
      }
    },
    {
      id: "sugitaya",
      name: "杉田家",
      location: "横浜市磯子区",
      story: `直系1号店として1999年に誕生。吉村家の味と精神を忠実に受け継ぎ、地元民からも愛される存在。直系の伝統を守りつつ、独自の工夫も加えられています。`,
      features: [
        "直系1号店の誇り",
        "漆黒の器と濃厚スープ",
        "スモークチャーシュー",
        "「お客様は我が味の師なり」の精神"
      ],
      question: {
        text: "杉田家が直系1号店として大切にしていることは？",
        options: [
          "味噌スープの開発",
          "吉村家の味と精神の継承",
          "細麺の導入",
          "激辛ラーメンの提供"
        ],
        correctAnswer: "吉村家の味と精神の継承"
      },
      card: {
        id: "card-sugitaya",
        title: "直系1号店：杉田家",
        description: "吉村家の魂を受け継ぐ、直系の象徴。",
        imageUrl: "/images/shops/placeholder.png",
        rarity: "rare"
      }
    },
    {
      id: "hajimeya",
      name: "はじめ家",
      location: "富山県魚津市",
      story: `直系の中でも地方に展開した先駆け。富山の地で家系の味を広め、地元の食文化にも影響を与えました。`,
      features: [
        "地方初の直系店舗",
        "吉村家直伝のスープ",
        "地元食材との融合",
        "純白の職人服"
      ],
      question: {
        text: "はじめ家の特徴は？",
        options: [
          "地方初の直系店舗",
          "味噌ラーメン専門",
          "細麺のみ使用",
          "激辛メニューが有名"
        ],
        correctAnswer: "地方初の直系店舗"
      },
      card: {
        id: "card-hajimeya",
        title: "地方直系：はじめ家",
        description: "富山で家系の味を守り続ける直系店。",
        imageUrl: "/images/shops/placeholder.png",
        rarity: "uncommon"
      }
    },
    {
      id: "kan2ya",
      name: "環2家",
      location: "横浜市港南区・大田区蒲田",
      story: `直系の中でも特に人気の高い店舗。濃厚なスープと丁寧な仕事で、家系ファンから絶大な支持を集めています。`,
      features: [
        "濃厚な醤油豚骨スープ",
        "直系らしい黒い器",
        "スモークチャーシュー",
        "蒲田にも展開"
      ],
      question: {
        text: "環2家の人気の理由は？",
        options: [
          "濃厚な醤油豚骨スープと丁寧な仕事",
          "激辛ラーメン",
          "味噌ベースのスープ",
          "細麺の使用"
        ],
        correctAnswer: "濃厚な醤油豚骨スープと丁寧な仕事"
      },
      card: {
        id: "card-kan2ya",
        title: "人気直系：環2家",
        description: "濃厚スープと丁寧な仕事でファンを魅了。",
        imageUrl: "/images/shops/placeholder.png",
        rarity: "rare"
      }
    },
    {
      id: "atsugiya",
      name: "厚木家",
      location: "神奈川県厚木市",
      story: `吉村会長の次男が経営する直系店。家族の絆と伝統を感じる一杯が味わえます。`,
      features: [
        "吉村会長の次男経営",
        "伝統の味と家族の絆",
        "直系の証を掲げる",
        "純白の職人服"
      ],
      question: {
        text: "厚木家の特徴は？",
        options: [
          "吉村会長の次男が経営",
          "味噌ラーメン専門",
          "激辛メニューが有名",
          "細麺のみ使用"
        ],
        correctAnswer: "吉村会長の次男が経営"
      },
      card: {
        id: "card-atsugiya",
        title: "家族直系：厚木家",
        description: "家族の絆が生む伝統の味。",
        imageUrl: "/images/shops/placeholder.png",
        rarity: "uncommon"
      }
    },
    {
      id: "suehiroya",
      name: "末廣家",
      location: "横浜市神奈川区",
      story: `横浜・伯楽にある直系店。伝統を守りつつ、独自の工夫も加えた一杯が楽しめます。地元に根ざした人気店として、直系の味を広めています。`,
      features: [
        "伝統と革新のバランス",
        "直系の濃厚スープ",
        "スモークチャーシュー",
        "地元密着型の人気店"
      ],
      question: {
        text: "末廣家の特徴は？",
        options: [
          "伝統と革新のバランス",
          "味噌ラーメン専門",
          "激辛メニューが有名",
          "細麺のみ使用"
        ],
        correctAnswer: "伝統と革新のバランス"
      },
      card: {
        id: "card-suehiroya",
        title: "革新直系：末廣家",
        description: "伝統を守りつつ新しい味を追求する直系店。",
        imageUrl: "/images/shops/placeholder.png",
        rarity: "uncommon"
      }
    }
  ],
  rewards: [
    {
      type: "badge",
      name: "直系コンプリートバッジ",
      description: "すべての直系店舗を巡った証",
      imageUrl: "/images/badges/direct-lineage-complete.png"
    },
    {
      type: "certificate",
      name: "直系マスター認定証",
      description: "直系ミッションを制覇した証明書",
      imageUrl: "/images/certificates/direct-lineage-master.png"
    },
    {
      type: "card-set",
      name: "直系知識カードセット",
      description: "直系店舗の知識カードを全て集めた証",
      imageUrl: "/images/cards/direct-lineage-set.png"
    }
  ]
}; 