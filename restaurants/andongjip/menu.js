// 안동집 박닌(Nhà hàng An Dong Jip, 한식 국밥·찜·감자탕, 박닌시 Võ Cường) 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음). 출처: 구글 지도 메뉴판 사진 16장(2026-11-11 수집, 손님이 올린 것). 가격 단위: VND. 같은 메뉴가 사진마다 다르면 높은 쪽 가격(docs/todo.md)
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480)
window.RESTAURANT = {
  brand: { ko: "안동집", en: "An Dong Jip" },
  phone: "0888 569 176",
  address: "193 Ngọc Hân Công Chúa, Khu Bồ Sơn, Võ Cường, Bắc Ninh",
  wifi: null,
  hours: "09:00 – 22:30",
};

window.MENU = [
  {
    "id": "soup",
    "name": {
      "ko": "국밥·탕",
      "en": "Rice Soups & Broths",
      "zh": "汤饭·汤类",
      "ja": "クッパ・スープ",
      "vi": "Canh cơm & Súp"
    },
    "items": [
      {
        "name": {
          "ko": "안동국밥",
          "en": "Andong Gukbap (Andong-style Beef Rice Soup)",
          "zh": "安东汤饭",
          "ja": "安東クッパ(安東風牛肉スープごはん)",
          "vi": "Cơm canh bò Andong (Andong Gukbap)"
        },
        "price": 150000,
        "tag": "best"
      },
      {
        "name": {
          "ko": "설렁탕",
          "en": "Seolleongtang (Ox Bone Soup)",
          "zh": "雪浓汤(牛骨浓汤)",
          "ja": "ソルロンタン(牛骨スープ)",
          "vi": "Canh xương bò hầm (Seolleongtang)"
        },
        "price": 170000
      },
      {
        "name": {
          "ko": "소머리국밥",
          "en": "Someori Gukbap (Beef Head Rice Soup)",
          "zh": "牛头肉汤饭",
          "ja": "牛頭クッパ(牛の頭肉スープごはん)",
          "vi": "Cơm canh đầu bò (Someori Gukbap)"
        },
        "price": 180000
      },
      {
        "name": {
          "ko": "육개장",
          "en": "Yukgaejang (Spicy Shredded Beef Soup)",
          "zh": "辣牛肉汤",
          "ja": "ユッケジャン(辛い牛肉スープ)",
          "vi": "Canh bò cay xé sợi (Yukgaejang)"
        },
        "price": 150000,
        "spicy": true
      },
      {
        "name": {
          "ko": "갈비탕",
          "en": "Galbitang (Beef Short Rib Soup)",
          "zh": "排骨汤",
          "ja": "カルビタン(牛カルビスープ)",
          "vi": "Canh sườn bò (Galbitang)"
        },
        "price": 250000
      },
      {
        "name": {
          "ko": "꼬리곰탕",
          "en": "Kkorigomtang (Oxtail Soup)",
          "zh": "牛尾汤",
          "ja": "コリコムタン(牛テールスープ)",
          "vi": "Canh đuôi bò (Kkorigomtang)"
        },
        "price": 250000
      },
      {
        "name": {
          "ko": "도가니탕",
          "en": "Doganitang (Beef Knee Cartilage Soup)",
          "zh": "牛膝骨汤",
          "ja": "ドガニタン(牛すじ・膝軟骨スープ)",
          "vi": "Canh gân sụn bò (Doganitang)"
        },
        "price": 250000
      },
      {
        "name": {
          "ko": "갱시기국(김치국밥)",
          "en": "Gaengsigi-guk (Kimchi Rice Soup)",
          "zh": "泡菜汤饭",
          "ja": "ケンシギクク(キムチクッパ)",
          "vi": "Cơm canh kim chi (Gaengsigi-guk)"
        },
        "price": 150000
      }
    ]
  },
  {
    "id": "haejang",
    "name": {
      "ko": "해장국·식사",
      "en": "Hangover Soups & Meals",
      "zh": "醒酒汤·正餐",
      "ja": "ヘジャンクク・お食事",
      "vi": "Canh giải rượu & Món ăn cơm"
    },
    "items": [
      {
        "name": {
          "ko": "황태해장국",
          "en": "Hwangtae Haejangguk (Dried Pollack Hangover Soup)",
          "zh": "干明太鱼汤",
          "ja": "ファンテヘジャンクク(干しスケトウダラのスープ)",
          "vi": "Canh cá minh thái khô giải rượu (Hwangtae Haejangguk)"
        },
        "price": 170000,
        "tag": "best"
      },
      {
        "name": {
          "ko": "뼈해장국",
          "en": "Ppyeo Haejangguk (Pork Bone Hangover Soup)",
          "zh": "骨头醒酒汤",
          "ja": "ピョヘジャンクク(豚骨ヘジャンスープ)",
          "vi": "Canh xương heo giải rượu (Ppyeo Haejangguk)"
        },
        "price": 170000
      },
      {
        "name": {
          "ko": "콩나물해장국",
          "en": "Kongnamul Haejangguk (Bean Sprout Hangover Soup)",
          "zh": "豆芽醒酒汤",
          "ja": "コンナムルヘジャンクク(豆もやしスープ)",
          "vi": "Canh giá đỗ giải rượu (Kongnamul Haejangguk)"
        },
        "price": 150000
      },
      {
        "name": {
          "ko": "순두부찌개",
          "en": "Sundubu Jjigae (Spicy Soft Tofu Stew)",
          "zh": "嫩豆腐汤",
          "ja": "スンドゥブチゲ(辛い絹豆腐鍋)",
          "vi": "Canh đậu hũ non cay (Sundubu Jjigae)"
        },
        "price": 150000,
        "spicy": true
      }
    ]
  },
  {
    "id": "noodle",
    "name": {
      "ko": "면류",
      "en": "Noodles",
      "zh": "面类",
      "ja": "麺類",
      "vi": "Các món mì & miến"
    },
    "note": {
      "ko": "냉면 곱빼기 +30,000₫ · 사리 추가 50,000₫ · 우동은 겨울철(동절기) 메뉴",
      "en": "Large portion of cold noodles +30,000₫ · Extra noodles 50,000₫ · Udon is a winter-only menu item",
      "zh": "冷面大份 +30,000₫ · 加面 50,000₫ · 乌冬面为冬季限定菜品",
      "ja": "冷麺の大盛り +30,000₫ · 麺の追加 50,000₫ · うどんは冬季限定メニュー",
      "vi": "Mì lạnh phần lớn +30,000₫ · Thêm mì 50,000₫ · Mì udon chỉ có vào mùa đông"
    },
    "items": [
      {
        "name": {
          "ko": "물냉면",
          "en": "Mul Naengmyeon (Cold Buckwheat Noodles in Broth)",
          "zh": "水冷面",
          "ja": "ムルネンミョン(スープ冷麺)",
          "vi": "Mì lạnh nước (Mul Naengmyeon)"
        },
        "price": 150000,
        "photo": "img/mul.jpg"
      },
      {
        "name": {
          "ko": "비빔냉면",
          "en": "Bibim Naengmyeon (Spicy Mixed Cold Noodles)",
          "zh": "拌冷面",
          "ja": "ビビンネンミョン(辛い和え冷麺)",
          "vi": "Mì lạnh trộn cay (Bibim Naengmyeon)"
        },
        "price": 150000,
        "spicy": true,
        "photo": "img/bibim.jpg"
      },
      {
        "name": {
          "ko": "회냉면",
          "en": "Hoe Naengmyeon (Cold Noodles with Spicy Raw Skate)",
          "zh": "生鱼片冷面",
          "ja": "フェネンミョン(刺身入り辛い冷麺)",
          "vi": "Mì lạnh cá sống trộn cay (Hoe Naengmyeon)"
        },
        "price": 160000,
        "spicy": true
      },
      {
        "name": {
          "ko": "냉모밀",
          "en": "Naengmomil (Cold Soba Noodles)",
          "zh": "冷荞麦面",
          "ja": "冷やしそば(ネンモミル)",
          "vi": "Mì soba lạnh (Naengmomil)"
        },
        "sizes": [
          [
            "보통",
            150000
          ],
          [
            "곱빼기",
            200000
          ]
        ]
      },
      {
        "name": {
          "ko": "묵사발",
          "en": "Muk Sabal (Acorn Jelly Cold Soup)",
          "zh": "橡子凉粉冷汤",
          "ja": "ムクサバル(どんぐりゼリーの冷たいスープ)",
          "vi": "Thạch đậu hạt sồi nước lạnh (Muk Sabal)"
        },
        "price": 150000
      },
      {
        "name": {
          "ko": "칼국수",
          "en": "Kalguksu (Knife-cut Noodle Soup)",
          "zh": "手擀刀切面汤",
          "ja": "カルグクス(手打ち麺のスープ)",
          "vi": "Mì cắt tay nước (Kalguksu)"
        },
        "price": 150000
      },
      {
        "name": {
          "ko": "우동(동절기)",
          "en": "Udon (Winter Only)",
          "zh": "乌冬面(冬季限定)",
          "ja": "うどん(冬季限定)",
          "vi": "Mì udon (chỉ mùa đông)"
        },
        "price": 150000
      }
    ]
  },
  {
    "id": "jjim",
    "name": {
      "ko": "찜·조림",
      "en": "Braised Dishes (Jjim & Jorim)",
      "zh": "炖菜·酱烧",
      "ja": "チム・煮付け",
      "vi": "Món hầm & kho"
    },
    "items": [
      {
        "name": {
          "ko": "아구찜",
          "en": "Agujjim (Spicy Braised Monkfish with Bean Sprouts)",
          "zh": "辣炖安康鱼",
          "ja": "アグチム(アンコウの辛い蒸し煮)",
          "vi": "Agujjim (cá monkfish hầm cay với giá đỗ)"
        },
        "sizes": [
          [
            "S",
            750000
          ],
          [
            "L",
            1050000
          ]
        ],
        "tag": "best",
        "spicy": true
      },
      {
        "name": {
          "ko": "해물찜",
          "en": "Haemuljjim (Spicy Braised Seafood)",
          "zh": "辣炖海鲜",
          "ja": "ヘムルチム(海鮮の辛い蒸し煮)",
          "vi": "Hải sản hầm cay (Haemuljjim)"
        },
        "sizes": [
          [
            "S",
            750000
          ],
          [
            "L",
            1050000
          ]
        ],
        "tag": "best",
        "spicy": true
      },
      {
        "name": {
          "ko": "코다리찜",
          "en": "Kodarijjim (Spicy Braised Semi-dried Pollack)",
          "zh": "辣炖半干明太鱼",
          "ja": "コダリチム(半干しスケトウダラの辛い煮)",
          "vi": "Cá minh thái bán khô hầm cay (Kodarijjim)"
        },
        "sizes": [
          [
            "S",
            480000
          ],
          [
            "L",
            680000
          ]
        ],
        "tag": "best",
        "spicy": true
      },
      {
        "name": {
          "ko": "안의갈비찜",
          "en": "Anui Galbijjim (Anui-style Braised Beef Short Ribs)",
          "zh": "安义炖牛排",
          "ja": "アニ式カルビチム(牛カルビの煮込み)",
          "vi": "Sườn bò hầm kiểu Anui (Anui Galbijjim)"
        },
        "sizes": [
          [
            "S",
            580000
          ],
          [
            "L",
            880000
          ]
        ],
        "tag": "must",
        "photo": "img/galbijjim.jpg"
      },
      {
        "name": {
          "ko": "안의 돼지갈비찜",
          "en": "Anui Dwaeji Galbijjim (Anui-style Braised Pork Ribs)",
          "zh": "安义炖猪排骨",
          "ja": "アニ式豚カルビチム(豚カルビの煮込み)",
          "vi": "Sườn heo hầm kiểu Anui (Anui Dwaeji Galbijjim)"
        },
        "sizes": [
          [
            "S",
            480000
          ],
          [
            "L",
            680000
          ]
        ]
      },
      {
        "name": {
          "ko": "소갈비찜",
          "en": "So Galbijjim (Braised Beef Short Ribs)",
          "zh": "炖牛排",
          "ja": "牛カルビチム(牛カルビの煮込み)",
          "vi": "Sườn bò hầm (So Galbijjim)"
        },
        "price": 880000
      },
      {
        "name": {
          "ko": "묵은지 김치찜",
          "en": "Mugeunji Kimchijjim (Braised Aged Kimchi with Pork)",
          "zh": "炖辣白菜",
          "ja": "ムグンジ・キムチチム(熟成キムチの蒸し煮)",
          "vi": "Kim chi muối chua lâu năm hầm thịt (Mugeunji Kimchijjim)"
        },
        "sizes": [
          [
            "S",
            550000
          ],
          [
            "L",
            700000
          ]
        ]
      },
      {
        "name": {
          "ko": "갈치조림",
          "en": "Galchi Jorim (Braised Hairtail)",
          "zh": "炖刀鱼",
          "ja": "カルチ煮付け(太刀魚の煮付け)",
          "vi": "Cá hố kho (Galchi Jorim)"
        },
        "sizes": [
          [
            "S",
            550000
          ],
          [
            "L",
            700000
          ]
        ]
      },
      {
        "name": {
          "ko": "고등어조림",
          "en": "Godeungeo Jorim (Braised Mackerel)",
          "zh": "炖鲐鱼",
          "ja": "サバの煮付け(コドゥンオジョリム)",
          "vi": "Cá thu kho (Godeungeo Jorim)"
        },
        "sizes": [
          [
            "S",
            550000
          ],
          [
            "L",
            700000
          ]
        ]
      }
    ]
  },
  {
    "id": "tang",
    "name": {
      "ko": "탕·전골",
      "en": "Stews & Hot Pots",
      "zh": "汤锅·火锅",
      "ja": "鍋・チョンゴル",
      "vi": "Lẩu & Canh hầm"
    },
    "note": {
      "ko": "추가: 뼈 300,000₫ · 우거지·김치·야채 100,000₫ · 만두 5개 130,000₫ · 사리 50,000₫ · 야채·고기 150,000₫",
      "en": "Add-ons: Bones 300,000₫ · Dried radish greens/kimchi/vegetables 100,000₫ · 5 dumplings 130,000₫ · Extra noodles 50,000₫ · Vegetables & meat 150,000₫",
      "zh": "加料:骨头 300,000₫ · 干菜叶/泡菜/蔬菜 100,000₫ · 饺子5个 130,000₫ · 加面 50,000₫ · 蔬菜和肉 150,000₫",
      "ja": "追加:骨 300,000₫ · ウゴジ(干し菜)・キムチ・野菜 100,000₫ · 餃子5個 130,000₫ · 麺の追加 50,000₫ · 野菜・肉 150,000₫",
      "vi": "Gọi thêm: Xương 300,000₫ · Rau cải khô/kim chi/rau 100,000₫ · 5 viên mandu 130,000₫ · Thêm mì 50,000₫ · Rau & thịt 150,000₫"
    },
    "items": [
      {
        "name": {
          "ko": "감자탕",
          "en": "Gamjatang (Spicy Pork Bone Stew with Potatoes)",
          "zh": "土豆排骨汤",
          "ja": "カムジャタン(豚の背骨とじゃがいもの辛い鍋)",
          "vi": "Lẩu xương heo khoai tây cay (Gamjatang)"
        },
        "sizes": [
          [
            "2인",
            550000
          ],
          [
            "3인",
            750000
          ],
          [
            "4인",
            850000
          ]
        ],
        "tag": "best",
        "spicy": true,
        "photo": "img/gamjatang.jpg"
      },
      {
        "name": {
          "ko": "묵은지 감자탕",
          "en": "Mugeunji Gamjatang (Pork Bone Stew with Aged Kimchi)",
          "zh": "辣白菜土豆汤",
          "ja": "ムグンジ・カムジャタン(熟成キムチ入り豚骨鍋)",
          "vi": "Lẩu xương heo kim chi muối chua (Mugeunji Gamjatang)"
        },
        "sizes": [
          [
            "2인",
            550000
          ],
          [
            "3인",
            750000
          ],
          [
            "4인",
            850000
          ]
        ],
        "spicy": true
      },
      {
        "name": {
          "ko": "고니알탕 / 동태매운탕",
          "en": "Gonial-tang (Spicy Pollack Roe & Innards Stew) / Dongtae Maeuntang (Spicy Pollack Stew)",
          "zh": "明太鱼内脏汤 / 辣明太鱼汤",
          "ja": "コニアルタン(スケトウダラの内臓・白子鍋)/ トンテメウンタン(辛いスケトウダラ鍋)",
          "vi": "Canh lòng & trứng cá minh thái cay (Gonial-tang) / Canh cá minh thái cay (Dongtae Maeuntang)"
        },
        "sizes": [
          [
            "S",
            480000
          ],
          [
            "L",
            680000
          ]
        ],
        "spicy": true
      },
      {
        "name": {
          "ko": "조기매운탕",
          "en": "Jogi Maeuntang (Spicy Yellow Croaker Stew)",
          "zh": "辣黄花鱼汤",
          "ja": "チョギメウンタン(イシモチの辛い鍋)",
          "vi": "Canh cá đù vàng cay (Jogi Maeuntang)"
        },
        "sizes": [
          [
            "S",
            480000
          ],
          [
            "L",
            680000
          ]
        ],
        "spicy": true
      },
      {
        "name": {
          "ko": "닭볶음탕",
          "en": "Dakbokkeumtang (Spicy Braised Chicken Stew)",
          "zh": "辣烧鸡汤",
          "ja": "タッポックンタン(鶏肉の辛い煮込み)",
          "vi": "Gà hầm cay (Dakbokkeumtang)"
        },
        "sizes": [
          [
            "S",
            480000
          ],
          [
            "L",
            680000
          ]
        ],
        "spicy": true
      },
      {
        "name": {
          "ko": "만두전골",
          "en": "Mandu Jeongol (Dumpling Hot Pot)",
          "zh": "饺子火锅",
          "ja": "マンドゥチョンゴル(餃子鍋)",
          "vi": "Lẩu mandu (Mandu Jeongol)"
        },
        "sizes": [
          [
            "S",
            550000
          ],
          [
            "L",
            700000
          ]
        ]
      },
      {
        "name": {
          "ko": "부대전골",
          "en": "Budae Jeongol (Army Base Hot Pot)",
          "zh": "部队火锅",
          "ja": "プデチョンゴル(部隊鍋)",
          "vi": "Lẩu thập cẩm quân đội (Budae Jeongol)"
        },
        "sizes": [
          [
            "S",
            550000
          ],
          [
            "L",
            700000
          ]
        ],
        "spicy": true
      },
      {
        "name": {
          "ko": "국수전골",
          "en": "Guksu Jeongol (Noodle Hot Pot)",
          "zh": "面条火锅",
          "ja": "クッスチョンゴル(麺入り鍋)",
          "vi": "Lẩu mì (Guksu Jeongol)"
        },
        "sizes": [
          [
            "S",
            480000
          ],
          [
            "L",
            680000
          ]
        ]
      }
    ]
  },
  {
    "id": "meat",
    "name": {
      "ko": "고기·수육·회",
      "en": "Meat, Boiled Slices & Raw Dishes",
      "zh": "肉类·白切肉·生鲜",
      "ja": "肉・ポッサム風茹で肉・刺身",
      "vi": "Thịt, thịt luộc & món gỏi sống"
    },
    "items": [
      {
        "name": {
          "ko": "홍어삼합",
          "en": "Hongeo Samhap (Fermented Skate, Pork & Kimchi Combo)",
          "zh": "斑鳐三合",
          "ja": "ホンオサムハプ(発酵エイ・茹で豚・キムチの盛り合わせ)",
          "vi": "Hongeo Samhap (cá đuối lên men, thịt heo luộc & kim chi)"
        },
        "price": 1100000,
        "tag": "best",
        "photo": "img/hongeo.jpg"
      },
      {
        "name": {
          "ko": "홍어 추가",
          "en": "Extra Hongeo (Additional Fermented Skate)",
          "zh": "加斑鳐",
          "ja": "ホンオ追加(発酵エイの追加)",
          "vi": "Thêm cá đuối lên men (Hongeo)"
        },
        "price": 400000
      },
      {
        "name": {
          "ko": "홍어 회무침",
          "en": "Hongeo Hoemuchim (Spicy Skate Sashimi Salad)",
          "zh": "辣拌斑鳐生鱼片",
          "ja": "ホンオ・フェムチム(エイの刺身の辛い和え物)",
          "vi": "Gỏi cá đuối trộn cay (Hongeo Hoemuchim)"
        },
        "price": 600000,
        "spicy": true
      },
      {
        "name": {
          "ko": "생불고기",
          "en": "Saeng Bulgogi (Fresh Marinated Beef Bulgogi)",
          "zh": "鲜烤牛肉",
          "ja": "生プルコギ(調理前の味付け牛肉)",
          "vi": "Bulgogi bò tươi (Saeng Bulgogi)"
        },
        "sizes": [
          [
            "2인",
            480000
          ],
          [
            "3~4인",
            680000
          ]
        ]
      },
      {
        "name": {
          "ko": "LA 갈비구이",
          "en": "LA Galbi (Grilled LA-style Beef Short Ribs)",
          "zh": "LA烤牛排",
          "ja": "LAカルビ焼き(LA式牛カルビ焼き)",
          "vi": "Sườn bò nướng kiểu LA (LA Galbi)"
        },
        "desc": {
          "ko": "500g",
          "en": "500g",
          "zh": "500g",
          "ja": "500g",
          "vi": "500g"
        },
        "price": 600000
      },
      {
        "name": {
          "ko": "도가니수육",
          "en": "Doganisuyuk (Boiled Beef Knee Cartilage Slices)",
          "zh": "白切牛膝骨",
          "ja": "ドガニスユク(牛すじ・膝軟骨の茹で肉)",
          "vi": "Gân sụn bò luộc (Doganisuyuk)"
        },
        "price": 700000
      },
      {
        "name": {
          "ko": "소머리수육",
          "en": "Someori Suyuk (Boiled Beef Head Slices)",
          "zh": "白切牛头肉",
          "ja": "ソモリスユク(牛の頭肉の茹で肉)",
          "vi": "Đầu bò luộc thái lát (Someori Suyuk)"
        },
        "price": 700000
      },
      {
        "name": {
          "ko": "생굴회",
          "en": "Raw Oysters (Saenggul-hoe)",
          "zh": "生蚝刺身",
          "ja": "生ガキ刺身(センググルフェ)",
          "vi": "Hàu sống (Saenggul-hoe)"
        },
        "price": 350000
      },
      {
        "name": {
          "ko": "생굴회 무침",
          "en": "Spicy Raw Oyster Salad (Saenggul-hoe Muchim)",
          "zh": "辣拌生蚝",
          "ja": "生ガキの辛い和え物(センググルフェ・ムチム)",
          "vi": "Hàu sống trộn cay (Saenggul-hoe Muchim)"
        },
        "price": 400000,
        "spicy": true
      }
    ]
  },
  {
    "id": "side",
    "name": {
      "ko": "사이드",
      "en": "Sides",
      "zh": "小吃配菜",
      "ja": "サイドメニュー",
      "vi": "Món ăn kèm"
    },
    "items": [
      {
        "name": {
          "ko": "물만두",
          "en": "Mulmandu (Boiled Dumplings)",
          "zh": "水饺",
          "ja": "水餃子(ムルマンドゥ)",
          "vi": "Mandu luộc (Mulmandu)"
        },
        "price": 150000
      },
      {
        "name": {
          "ko": "김치찐만두",
          "en": "Kimchi Jjinmandu (Steamed Kimchi Dumplings)",
          "zh": "泡菜蒸饺",
          "ja": "キムチ蒸し餃子(キムチチンマンドゥ)",
          "vi": "Mandu kim chi hấp (Kimchi Jjinmandu)"
        },
        "price": 150000
      },
      {
        "name": {
          "ko": "스팸구이",
          "en": "Spam Gui (Grilled Spam)",
          "zh": "煎午餐肉",
          "ja": "スパム焼き",
          "vi": "Spam nướng (Spam Gui)"
        },
        "price": 250000
      }
    ]
  }
];
