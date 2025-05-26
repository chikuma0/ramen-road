// Data structure for ramen shop family tree
export interface ShopNode {
  id: string;
  name: string;
  nameRomanized: string;
  year: number;
  description: string;
  group: string;
  isOrigin?: boolean;
  val: number; // Size of node
  image?: string;
  specialties?: string[];
  location?: string;
  founder?: string;
  style?: string;
}

export interface ShopLink {
  source: string;
  target: string;
  type: string; // e.g., "inspiration", "direct", "branch"
  year?: number;
}

export interface TreeData {
  nodes: ShopNode[];
  links: ShopLink[];
}

// Actual data for the Yokohama Ie-kei Ramen family tree
export const ramenFamilyTree: TreeData = {
  nodes: [
    {
      id: "yoshimuraya",
      name: "吉村家",
      nameRomanized: "Yoshimura-ya",
      year: 1974,
      description: "The birthplace of Ie-kei Ramen, founded by Minoru Yoshimura. Known for its rich tonkotsu-shoyu broth with bold soy sauce flavor, thick noodles by Sakai Seimen, and classic toppings. The original shop operates in its own building near Yokohama Station.",
      group: "origin",
      isOrigin: true,
      val: 20,
      image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?q=80&w=2070",
      specialties: ["Ie-kei", "Thick Straight Noodles", "Tonkotsu-Shoyu"],
      location: "Yokohama",
      founder: "Minoru Yoshimura",
      style: "Original Ie-kei"
    },
    // Direct System (Yoshimura-ya direct affiliates)
    {
      id: "sugitaya",
      name: "杉田家",
      nameRomanized: "Sugita-ya",
      year: 1999,
      description: "The first official direct branch of Yoshimura-ya, opened by Tsumura Susumu at Yoshimura-ya's original location in Shin-Sugita. Features the authentic rich style of the original with official certification.",
      group: "direct",
      val: 18,
      image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=2070",
      specialties: ["Authentic Ie-kei", "Rich Broth"],
      location: "Yokohama, Isogo",
      founder: "Tsumura Susumu",
      style: "Direct Ie-kei"
    },
    {
      id: "sugitaya_chiba",
      name: "杉田家 千葉祐光店",
      nameRomanized: "Sugita-ya Chiba",
      year: 2011,
      description: "Expansion of the original Sugita-ya to Chiba city, maintaining the authentic direct lineage taste.",
      group: "direct",
      val: 15,
      image: "https://images.unsplash.com/photo-1618866536998-042c7593a06c?q=80&w=2070",
      specialties: ["Authentic Ie-kei"],
      location: "Chiba City",
      style: "Direct Ie-kei"
    },
    {
      id: "atsugiya",
      name: "厚木家",
      nameRomanized: "Atsugi-ya",
      year: 2005,
      description: "Founded by Masaki Yoshimura, the second son of Minoru Yoshimura. Serves authentic direct lineage ramen with slightly milder seasoning suited to the local area.",
      group: "direct",
      val: 16,
      image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?q=80&w=2071",
      specialties: ["Authentic Ie-kei", "Balanced Flavor"],
      location: "Atsugi, Kanagawa",
      founder: "Masaki Yoshimura",
      style: "Direct Ie-kei"
    },
    {
      id: "suehiroya",
      name: "末廣家",
      nameRomanized: "Suehiro-ya",
      year: 2013,
      description: "Direct branch opened near Rokkaku-ya. While maintaining the official direct lineage flavor, it's known for a slightly milder and balanced approach compared to the original.",
      group: "direct",
      val: 15,
      image: "https://images.unsplash.com/photo-1551881192-002e02ad3d87?q=80&w=2070",
      specialties: ["Balanced Ie-kei"],
      location: "Yokohama, Kanagawa Ward",
      style: "Direct Ie-kei"
    },
    {
      id: "kannikeya",
      name: "環2家",
      nameRomanized: "Kannike-ya",
      year: 2001,
      description: "Originally a direct branch that temporarily closed and reopened under different management, then regained direct status in 2021. Known for its strong soy sauce flavor in a rich broth.",
      group: "direct",
      val: 15,
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=1974",
      specialties: ["Bold Soy Sauce", "Rich Broth"],
      location: "Yokohama, Konan Ward",
      style: "Direct Ie-kei"
    },
    // Odo-ke Group (Former direct branch that became independent)
    {
      id: "odoya",
      name: "王道家",
      nameRomanized: "Odo-ya",
      year: 2008,
      description: "Originally one of the 'Big Four' direct branches that became independent when it introduced house-made noodles. Known for creamy, rich tonkotsu-shoyu broth and active expansion through training disciples.",
      group: "odo",
      val: 17,
      image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?q=80&w=2070",
      specialties: ["Creamy Rich Broth", "House-made Noodles"],
      location: "Kashiwa, Chiba",
      style: "Odo-style Ie-kei"
    },
    {
      id: "odo_ishii",
      name: "王道 いしい",
      nameRomanized: "Odo Ishii",
      year: 2018,
      description: "Founded by Ishii-san after training at Odo-ya. Features an intensely rich broth that rivals the direct branches, earning it status among the 'Big Four'.",
      group: "odo",
      val: 15,
      image: "https://images.unsplash.com/photo-1632709810780-b5a4343cebec?q=80&w=2025",
      specialties: ["Ultra-rich Broth"],
      location: "Kashiwa, Chiba",
      founder: "Ishii",
      style: "Odo-style Ie-kei"
    },
    {
      id: "shindoya",
      name: "神道家",
      nameRomanized: "Shindo-ya",
      year: 2016,
      description: "Descended from Odo-ya. Features one of the richest broths in the Ie-kei scene, highly popular with local customers.",
      group: "odo",
      val: 14,
      image: "https://images.unsplash.com/photo-1618866536998-042c7593a06c?q=80&w=2070",
      specialties: ["Super-rich Broth"],
      location: "Chiba City",
      style: "Odo-style Ie-kei"
    },
    {
      id: "torakichiya",
      name: "とらきち家",
      nameRomanized: "Torakichi-ya",
      year: 2020,
      description: "Originally located near Rokkaku-ya in Yokohama, creating a famous 'three-way rivalry'. Relocated to Hiratsuka in 2025. Known for maintaining a traditionally rich broth.",
      group: "odo",
      val: 14,
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=1974",
      specialties: ["Traditional Rich Broth"],
      location: "Hiratsuka, Kanagawa",
      style: "Odo-style Ie-kei"
    },
    // Classic System - Honmoku-ya lineage
    {
      id: "honmokuya",
      name: "本牧家",
      nameRomanized: "Honmoku-ya",
      year: 1976,
      description: "Originally Yoshimura-ya's second direct shop that became independent. Created a more balanced broth with better harmony between soy sauce and tonkotsu, becoming one of the 'Big Three' along with Yoshimura-ya and Rokkaku-ya.",
      group: "classic",
      val: 18,
      image: "https://images.unsplash.com/photo-1628436208452-fb0be04e1c9e?q=80&w=1974",
      specialties: ["Balanced Broth", "Classic Style"],
      location: "Yokohama, Honmoku",
      style: "Classic Ie-kei"
    },
    {
      id: "rokakuya",
      name: "六角家",
      nameRomanized: "Rokkaku-ya",
      year: 1988,
      description: "Founded by Takashi Kanto, former manager of Honmoku-ya. Named after the Rokkakubashi area, it's known for emphasizing the pork bone flavor in its rich broth. One of the 'Big Three' until its main shop closed in 2017.",
      group: "classic",
      val: 18,
      image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?q=80&w=2071",
      specialties: ["Pork-forward Broth", "Classic Style"],
      location: "Yokohama, Kanagawa Ward",
      founder: "Takashi Kanto",
      style: "Rokkaku-style Ie-kei"
    },
    {
      id: "rokakuya_totsuka",
      name: "六角家 戸塚店",
      nameRomanized: "Rokkaku-ya Totsuka",
      year: 1999,
      description: "Sister shop of the original Rokkaku-ya that survived when the main shop closed. Continues the Rokkaku tradition with rich, pork-forward broth.",
      group: "classic",
      val: 15,
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=1974",
      specialties: ["Pork-forward Broth"],
      location: "Yokohama, Totsuka",
      style: "Rokkaku-style Ie-kei"
    },
    {
      id: "dokutsuya",
      name: "洞くつ家",
      nameRomanized: "Dokutsu-ya",
      year: 1994,
      description: "A flagship sister shop of Rokkaku-ya located in Kichijoji. Famous as 'Kichijoji's popular shop' and spread the Ie-kei tradition to other parts of Japan.",
      group: "classic",
      val: 16,
      image: "https://images.unsplash.com/photo-1628436208452-fb0be04e1c9e?q=80&w=1974",
      specialties: ["Rich, Deep Broth"],
      location: "Kichijoji, Tokyo",
      style: "Rokkaku-style Ie-kei"
    },
    {
      id: "suzukiya",
      name: "寿々喜家",
      nameRomanized: "Suzuki-ya",
      year: 1990,
      description: "Founded by Suzuki-san after training at Honmoku-ya. The name is a wordplay on the founder's name. Features one of the richest broths in the Ie-kei scene, focusing on being 'perfect with rice'.",
      group: "classic",
      val: 15,
      image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=2070",
      specialties: ["Ultra-rich Broth", "Rice Pairing"],
      location: "Yokohama, Hodogaya",
      founder: "Suzuki",
      style: "Classic Ie-kei"
    },
    // Musashi System (Tokyo Ie-kei)
    {
      id: "musashiya",
      name: "武蔵家",
      nameRomanized: "Musashi-ya",
      year: 1998,
      description: "The flagship of Tokyo-style Ie-kei, located in Shin-Nakano. Reportedly has lineage from Rokkaku-ya but developed a distinct style with slightly lighter, more drinkable broth and service innovations like free rice that helped popularize Ie-kei in Tokyo.",
      group: "musashi",
      val: 17,
      image: "https://images.unsplash.com/photo-1578881089985-f9680ae56266?q=80&w=2070",
      specialties: ["Lighter Broth", "Free Rice"],
      location: "Nakano, Tokyo",
      style: "Tokyo-style Ie-kei"
    },
    {
      id: "budoya",
      name: "武道家",
      nameRomanized: "Budo-ya",
      year: 2005,
      description: "Founded by a former Musashi-ya staff member. Located in Waseda, it's famous for an intensely rich broth claiming to be 'Japan's best with rice', creating a strong following among students.",
      group: "musashi",
      val: 16,
      image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?q=80&w=2071",
      specialties: ["Ultra-rich Broth", "Perfect with Rice"],
      location: "Waseda, Tokyo",
      style: "Budo-style Ie-kei"
    },
    {
      id: "kidoya",
      name: "輝道家",
      nameRomanized: "Kido-ya",
      year: 2018,
      description: "Founded by the original owner of Budo-ya after passing that shop to a disciple. Named for 'following a shining path', it features a creamy yet clean-finishing broth.",
      group: "musashi",
      val: 14,
      image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=2070",
      specialties: ["Creamy Broth", "Clean Finish"],
      location: "Nerima, Tokyo",
      style: "Budo-style Ie-kei"
    },
    {
      id: "kotsunaya",
      name: "皇綱家",
      nameRomanized: "Kotsuna-ya",
      year: 2020,
      description: "Produced by the founder of Budo-ya near Yokohama Station. Advertised as 'the richest in Yokohama', it's gained popularity with its intense flavor profile.",
      group: "musashi",
      val: 14,
      image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?q=80&w=2070",
      specialties: ["Richest in Yokohama"],
      location: "Yokohama, Nishi Ward",
      style: "Budo-style Ie-kei"
    },
    // Ichiroku System (Capital Chains)
    {
      id: "ichirokunya",
      name: "壱六家",
      nameRomanized: "Ichiroku-ya",
      year: 1993,
      description: "Founded in Konan Ward along Route 2. While not directly trained under Yoshimura-ya, it popularized a creamier style of Ie-kei ramen and became one of the first to successfully chain Ie-kei ramen. Known for adding quail eggs as a topping.",
      group: "ichiroku",
      val: 17,
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=1974",
      specialties: ["Creamy Broth", "Quail Egg Topping"],
      location: "Yokohama, Konan Ward",
      style: "Ichiroku-style Ie-kei"
    },
    {
      id: "ichihachiya",
      name: "壱八家",
      nameRomanized: "Ichihachi-ya",
      year: 2000,
      description: "An offshoot of Ichiroku-ya, located in Yokosuka. Features the trademark creamy yet mild broth characteristic of the Ichiroku system.",
      group: "ichiroku",
      val: 14,
      image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=2070",
      specialties: ["Creamy Mild Broth"],
      location: "Yokosuka, Kanagawa",
      style: "Ichiroku-style Ie-kei"
    },
    {
      id: "machidashoten",
      name: "町田商店",
      nameRomanized: "Machida Shoten",
      year: 2008,
      description: "Founded in Machida City and expanded nationally through Gift Group. While not officially recognized by Yoshimura-ya as an authentic lineage, it played a major role in spreading Ie-kei ramen nationwide with its standardized central kitchen approach.",
      group: "capital",
      val: 16,
      image: "https://images.unsplash.com/photo-1618866536998-042c7593a06c?q=80&w=2070",
      specialties: ["Consistent Flavor", "Nationwide Chain"],
      location: "Machida, Tokyo",
      style: "Capital-Chain Ie-kei"
    },
    {
      id: "gankokuro",
      name: "頑黒",
      nameRomanized: "Gankokuro",
      year: 2010,
      description: "An unusual offshoot from the 'Ganko Ramen' lineage that adopted Ie-kei style. Despite its pitch-black appearance, the broth is not overly salty and features a deep, rich flavor.",
      group: "capital",
      val: 13,
      image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?q=80&w=2070",
      specialties: ["Black Broth", "Rich Flavor"],
      location: "Shinjuku, Tokyo",
      style: "Inspired Ie-kei"
    }
  ],
  links: [
    // Direct lineage from Yoshimura-ya
    {
      source: "yoshimuraya",
      target: "sugitaya",
      type: "direct"
    },
    {
      source: "sugitaya",
      target: "sugitaya_chiba",
      type: "direct"
    },
    {
      source: "yoshimuraya",
      target: "atsugiya",
      type: "direct"
    },
    {
      source: "yoshimuraya",
      target: "suehiroya",
      type: "direct"
    },
    {
      source: "yoshimuraya",
      target: "kannikeya",
      type: "direct"
    },
    
    // Odo-ya group
    {
      source: "yoshimuraya",
      target: "odoya",
      type: "direct"
    },
    {
      source: "odoya",
      target: "odo_ishii",
      type: "direct"
    },
    {
      source: "odoya",
      target: "shindoya",
      type: "direct"
    },
    {
      source: "odoya",
      target: "torakichiya",
      type: "direct"
    },
    
    // Classic system
    {
      source: "yoshimuraya",
      target: "honmokuya",
      type: "direct"
    },
    {
      source: "honmokuya",
      target: "rokakuya",
      type: "direct"
    },
    {
      source: "rokakuya",
      target: "rokakuya_totsuka",
      type: "direct"
    },
    {
      source: "rokakuya",
      target: "dokutsuya",
      type: "direct"
    },
    {
      source: "honmokuya",
      target: "suzukiya",
      type: "direct"
    },
    
    // Musashi system
    {
      source: "rokakuya",
      target: "musashiya",
      type: "inspiration"
    },
    {
      source: "musashiya",
      target: "budoya",
      type: "direct"
    },
    {
      source: "budoya",
      target: "kidoya",
      type: "direct"
    },
    {
      source: "budoya",
      target: "kotsunaya",
      type: "direct"
    },
    
    // Ichiroku system
    {
      source: "yoshimuraya",
      target: "ichirokunya",
      type: "inspiration"
    },
    {
      source: "ichirokunya",
      target: "ichihachiya",
      type: "direct"
    },
    {
      source: "ichirokunya",
      target: "machidashoten",
      type: "inspiration"
    },
    {
      source: "yoshimuraya",
      target: "gankokuro",
      type: "inspiration"
    }
  ]
};

// Group to color mapping
export const groupColors: Record<string, string> = {
  origin: "#ff4500", // Bright red-orange for Yoshimura-ya (origin)
  direct: "#ff7e3e", // Orange for direct lineage shops
  odo: "#ffa366",    // Light orange for Odo-ya group
  classic: "#ffcc00", // Yellow for classic lineage (Honmoku, Rokkaku)
  musashi: "#3385ff", // Blue for Tokyo/Musashi lineage
  ichiroku: "#66cc66", // Green for Ichiroku system
  capital: "#a366ff"  // Purple for capital chains/inspired shops
};

// Group to label mapping
export const groupLabels: Record<string, string> = {
  origin: "Origin (1974)",
  direct: "Direct Lineage (1990+)",
  odo: "Odo-ya Group (2000+)",
  classic: "Classic System (1976+)",
  musashi: "Tokyo Musashi System (1998+)",
  ichiroku: "Ichiroku System (1993+)",
  capital: "Capital Chains (2000+)"
};

// Get decade from year
export const getDecade = (year: number): string => {
  const decadeStart = Math.floor(year / 10) * 10;
  return `${decadeStart}s`;
};

// Group nodes by decade for timeline view
export const getNodesByDecade = (nodes: ShopNode[]): Record<string, ShopNode[]> => {
  return nodes.reduce((acc, node) => {
    const decade = getDecade(node.year);
    if (!acc[decade]) {
      acc[decade] = [];
    }
    acc[decade].push(node);
    return acc;
  }, {} as Record<string, ShopNode[]>);
};