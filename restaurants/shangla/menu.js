// 샹라(香辣)&이십사절기 XIANG LA 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진(수집 2026-11-08). 인쇄 메뉴판 menu_01·04 기준(운영 감찰관 대조 일치), 장어·짜장 포스터 menu_05·11·20.
// 벽 메뉴판(menu_12·15)을 멀리서 찍은 사진에서 읽힌 다른 가격·메뉴(배추굴소스·중화냉면 등)는 확인 안 돼 뺌(docs/todo.md)
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480)
window.RESTAURANT = {
  brand: { ko: "샹라", en: "XIANG LA" },
  phone: "0986482376",
  address: "Căn A16, Đ. Mỹ Đình / Lô DD Đ. Mễ Trì, Khu Đô Thị Mới, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "11:00 – 14:00 · 17:00 – 02:00", // 구글 지도 '오전 11:00~오후 2:00 / 오후 5:00~오전 2:00'
};

window.MENU = [
  {
    "id": "mala",
    "name": {
      "ko": "마라탕 · 마라샹궈",
      "en": "Malatang · Mala Xiang Guo",
      "zh": "麻辣烫 · 麻辣香锅",
      "ja": "麻辣湯 · 麻辣香鍋",
      "vi": "Mala"
    },
    "note": {
      "ko": "맵기 선택: 백탕(마라탕만) · 보통맛 · 매운맛 · 아주매운맛",
      "en": "Choose spice level: Plain broth (Malatang only) · Regular · Spicy · Extra Spicy",
      "zh": "可选辣度:清汤(仅麻辣烫)· 微辣 · 中辣 · 特辣",
      "ja": "辛さ選択:白湯(麻辣湯のみ)· 普通 · 辛口 · 激辛",
      "vi": "Chọn độ cay: Trắng (chỉ Canh Mala) · Cay Thường · Cay Vừa · Siêu Cay"
    },
    "items": [
      {
        "name": {
          "ko": "마라탕",
          "en": "Malatang",
          "zh": "麻辣烫",
          "ja": "麻辣湯",
          "vi": "Canh Mala"
        },
        "desc": {
          "ko": "얼얼하고 깊은 풍미의 사천식 탕",
          "en": "Sichuan-style soup with a numbing, deep flavor",
          "zh": "麻香浓郁的四川风味汤",
          "ja": "しびれる辛さと深いコクの四川風スープ",
          "vi": "Lẩu Tứ Xuyên cay tê đậm đà hương vị"
        },
        "price": 30000,
        "unit": "100g",
        "tag": "best",
        "spicy": true
      },
      {
        "name": {
          "ko": "마라샹궈",
          "en": "Mala Xiang Guo (Dry Mala Stir-fry)",
          "zh": "麻辣香锅",
          "ja": "麻辣香鍋",
          "vi": "Đồ Xào Mala"
        },
        "desc": {
          "ko": "얼얼한 향신료로 볶아낸 중독적인 맛",
          "en": "Stir-fried with numbing spices, addictively tasty",
          "zh": "用麻辣香料爆炒,让人上瘾的味道",
          "ja": "しびれるスパイスで炒めた、やみつきの味",
          "vi": "Món xào cay tê với gia vị thơm đậm vị"
        },
        "price": 50000,
        "unit": "100g",
        "spicy": true,
        "photo": "img/malaxiangguo.jpg"
      },
      {
        "name": {
          "ko": "안주 마라탕",
          "en": "Malatang (Bar Snack Size)",
          "zh": "下酒麻辣烫",
          "ja": "おつまみ麻辣湯",
          "vi": "Canh Mala (món nhậu)"
        },
        "price": 250000,
        "spicy": true
      },
      {
        "name": {
          "ko": "안주 마라샹궈",
          "en": "Mala Xiang Guo (Bar Snack Size)",
          "zh": "下酒麻辣香锅",
          "ja": "おつまみ麻辣香鍋",
          "vi": "Đồ Xào Mala (món nhậu)"
        },
        "price": 300000,
        "spicy": true
      },
      {
        "name": {
          "ko": "소고기 추가",
          "en": "Extra Beef",
          "zh": "加牛肉",
          "ja": "牛肉追加",
          "vi": "Gọi thêm thịt bò"
        },
        "price": 50000
      },
      {
        "name": {
          "ko": "양고기 추가",
          "en": "Extra Lamb",
          "zh": "加羊肉",
          "ja": "ラム肉追加",
          "vi": "Gọi thêm thịt cừu"
        },
        "price": 50000
      },
      {
        "name": {
          "ko": "마라 세트 (안주 마라탕 + 마라샹궈)",
          "en": "Mala Set (Bar Snack Malatang + Mala Xiang Guo)",
          "zh": "麻辣套餐(下酒麻辣烫 + 麻辣香锅)",
          "ja": "麻辣セット(おつまみ麻辣湯 + 麻辣香鍋)",
          "vi": "Set Mala (Canh Mala + Đồ Xào Mala)"
        },
        "desc": {
          "ko": "정가 550,000",
          "en": "List price 550,000",
          "zh": "原价 550,000",
          "ja": "定価 550,000",
          "vi": "Giá gốc 550.000"
        },
        "price": 500000,
        "spicy": true
      }
    ]
  },
  {
    "id": "dakbal",
    "name": {
      "ko": "닭발",
      "en": "Dakbal (Spicy Chicken Feet)",
      "zh": "韩式辣鸡爪",
      "ja": "タッパル(辛い鶏の足)",
      "vi": "Chân gà"
    },
    "note": {
      "ko": "뼈닭발 기준 · 무뼈닭발 +30,000 · 맵기: 매운맛 · 아주매운맛",
      "en": "Bone-in price shown · Boneless +30,000 · Spice level: Spicy · Extra Spicy",
      "zh": "以带骨鸡爪为准 · 无骨 +30,000 · 辣度:中辣 · 特辣",
      "ja": "骨付き基準 · 骨なし +30,000 · 辛さ:辛口 · 激辛",
      "vi": "Có xương · Không xương +30.000 · Độ cay: Cay Vừa · Siêu Cay"
    },
    "items": [
      {
        "name": {
          "ko": "직화닭발",
          "en": "Flame-grilled Dakbal (Chicken Feet)",
          "zh": "明火烤辣鸡爪",
          "ja": "直火焼きタッパル",
          "vi": "Chân Gà Nướng"
        },
        "price": 360000,
        "tag": "best",
        "spicy": true
      },
      {
        "name": {
          "ko": "국물닭발",
          "en": "Dakbal with Broth (Soupy Chicken Feet)",
          "zh": "带汤辣鸡爪",
          "ja": "汁ありタッパル",
          "vi": "Chân Gà Hầm"
        },
        "price": 380000,
        "tag": "best",
        "spicy": true,
        "photo": "img/dakbal.jpg"
      },
      {
        "name": {
          "ko": "사리 추가 (콩나물 · 당면 · 라면)",
          "en": "Add-ons (Bean Sprouts · Glass Noodles · Ramen)",
          "zh": "加料(豆芽 · 粉丝 · 拉面)",
          "ja": "追加具材(もやし · 春雨 · ラーメン)",
          "vi": "Thêm Giá Đỗ / Miến Hàn Quốc / Mì Tôm"
        },
        "desc": {
          "ko": "국물닭발",
          "en": "Dakbal with Broth (Soupy Chicken Feet)",
          "zh": "带汤辣鸡爪",
          "ja": "汁ありタッパル",
          "vi": "Chân Gà Hầm"
        },
        "price": 30000
      },
      {
        "name": {
          "ko": "치즈 추가",
          "en": "Extra Cheese",
          "zh": "加芝士",
          "ja": "チーズ追加",
          "vi": "Thêm Phomai"
        },
        "desc": {
          "ko": "국물닭발",
          "en": "Dakbal with Broth (Soupy Chicken Feet)",
          "zh": "带汤辣鸡爪",
          "ja": "汁ありタッパル",
          "vi": "Chân Gà Hầm"
        },
        "price": 80000
      },
      {
        "name": {
          "ko": "계란찜",
          "en": "Steamed Egg (Gyeranjjim)",
          "zh": "韩式蒸蛋",
          "ja": "韓国式茶碗蒸し",
          "vi": "Trứng Hấp"
        },
        "price": 80000
      },
      {
        "name": {
          "ko": "셀프 주먹밥",
          "en": "DIY Rice Balls (Jumeokbap)",
          "zh": "自制饭团",
          "ja": "セルフおにぎり",
          "vi": "Cơm Nắm"
        },
        "price": 60000
      },
      {
        "name": {
          "ko": "닭발 세트 1",
          "en": "Dakbal Set 1",
          "zh": "鸡爪套餐1",
          "ja": "タッパルセット1",
          "vi": "Set 1 Chân Gà"
        },
        "desc": {
          "ko": "직화닭발 + 계란찜 + 셀프 주먹밥 (정가 500,000)",
          "en": "Flame-grilled Dakbal + Steamed Egg + DIY Rice Balls (List price 500,000)",
          "zh": "明火烤辣鸡爪 + 韩式蒸蛋 + 自制饭团(原价 500,000)",
          "ja": "直火焼きタッパル + 茶碗蒸し + セルフおにぎり(定価 500,000)",
          "vi": "Chân Gà Nướng + Trứng Hấp + Cơm Nắm (giá gốc 500.000)"
        },
        "price": 460000,
        "spicy": true
      },
      {
        "name": {
          "ko": "닭발 세트 2",
          "en": "Dakbal Set 2",
          "zh": "鸡爪套餐2",
          "ja": "タッパルセット2",
          "vi": "Set 2 Chân Gà"
        },
        "desc": {
          "ko": "국물닭발 + 계란찜 + 셀프 주먹밥 (정가 520,000)",
          "en": "Dakbal with Broth + Steamed Egg + DIY Rice Balls (List price 520,000)",
          "zh": "带汤辣鸡爪 + 韩式蒸蛋 + 自制饭团(原价 520,000)",
          "ja": "汁ありタッパル + 茶碗蒸し + セルフおにぎり(定価 520,000)",
          "vi": "Chân Gà Hầm + Trứng Hấp + Cơm Nắm (giá gốc 520.000)"
        },
        "price": 480000,
        "spicy": true
      }
    ]
  },
  {
    "id": "set",
    "name": {
      "ko": "요리 세트",
      "en": "Dish Sets",
      "zh": "菜品套餐",
      "ja": "料理セット",
      "vi": "Set món"
    },
    "items": [
      {
        "name": {
          "ko": "요리 세트 1",
          "en": "Dish Set 1",
          "zh": "菜品套餐1",
          "ja": "料理セット1",
          "vi": "Set 1"
        },
        "desc": {
          "ko": "라즈지 + 어향가지 + 계란볶음밥 + 마파두부밥 (정가 800,000)",
          "en": "Laziji (Sichuan Chili Chicken) + Yuxiang Eggplant + Egg Fried Rice + Mapo Tofu Rice (List price 800,000)",
          "zh": "辣子鸡 + 鱼香茄子 + 蛋炒饭 + 麻婆豆腐饭(原价 800,000)",
          "ja": "ラーズージー + 魚香茄子 + 卵チャーハン + 麻婆豆腐丼(定価 800,000)",
          "vi": "Gà xào ớt Tứ Xuyên + Cà tím sốt cay kiểu Tứ Xuyên + Cơm chiên trứng + Cơm đậu hủ Mapo (giá gốc 800.000)"
        },
        "price": 750000
      },
      {
        "name": {
          "ko": "요리 세트 2",
          "en": "Dish Set 2",
          "zh": "菜品套餐2",
          "ja": "料理セット2",
          "vi": "Set 2"
        },
        "desc": {
          "ko": "유린기 + 공심채볶음 + 창잉터우 + 계란볶음밥 (정가 630,000)",
          "en": "Youlinji (Crispy Chicken with Tangy Sauce) + Stir-fried Water Spinach + Cangyingtou + Egg Fried Rice (List price 630,000)",
          "zh": "油淋鸡 + 蒜蓉空心菜 + 苍蝇头 + 蛋炒饭(原价 630,000)",
          "ja": "ユーリンチー + 空芯菜炒め + 蒼蠅頭 + 卵チャーハン(定価 630,000)",
          "vi": "Gà chiên sốt hành kiểu Nhật + Rau muống xào tỏi + Thịt băm xào Đài Loan + Cơm chiên trứng (giá gốc 630.000)"
        },
        "price": 590000
      },
      {
        "name": {
          "ko": "요리 세트 3",
          "en": "Dish Set 3",
          "zh": "菜品套餐3",
          "ja": "料理セット3",
          "vi": "Set 3"
        },
        "desc": {
          "ko": "순살족발 + 마라 토마토면 + 계란볶음밥 (정가 560,000)",
          "en": "Boneless Jokbal + Mala Tomato Noodles + Egg Fried Rice (List price 560,000)",
          "zh": "无骨猪蹄 + 麻辣番茄面 + 蛋炒饭(原价 560,000)",
          "ja": "骨なしチョッパル + 麻辣トマト麺 + 卵チャーハン(定価 560,000)",
          "vi": "Chân giò heo rút xương + Mì cà chua Mala + Cơm chiên trứng (giá gốc 560.000)"
        },
        "price": 520000
      }
    ]
  },
  {
    "id": "eel",
    "name": {
      "ko": "장어 특선",
      "en": "Eel Specials",
      "zh": "鳗鱼特选",
      "ja": "うなぎ特選",
      "vi": "Món lươn đặc biệt"
    },
    "items": [
      {
        "name": {
          "ko": "장어구이",
          "en": "Grilled Eel",
          "zh": "烤鳗鱼",
          "ja": "うなぎの焼き物",
          "vi": "Lươn nướng"
        },
        "desc": {
          "ko": "장어 2마리 + 계란말이 + 매쉬포테이토 · 직접 만든 특제 소스",
          "en": "2 eels + rolled omelet + mashed potatoes · House-made special sauce",
          "zh": "鳗鱼2条 + 蛋卷 + 土豆泥 · 自制特色酱汁",
          "ja": "うなぎ2尾 + だし巻き卵 + マッシュポテト · 自家製特製ソース",
          "vi": "2 con lươn + trứng cuộn + khoai tây nghiền · Sốt đặc biệt tự làm"
        },
        "price": 580000,
        "tag": "special"
      },
      {
        "name": {
          "ko": "장어덮밥",
          "en": "Eel Rice Bowl",
          "zh": "鳗鱼盖饭",
          "ja": "うな丼",
          "vi": "Cơm lươn"
        },
        "desc": {
          "ko": "장어 1마리 + 스크램블 에그",
          "en": "1 eel + scrambled eggs",
          "zh": "鳗鱼1条 + 炒蛋",
          "ja": "うなぎ1尾 + スクランブルエッグ",
          "vi": "1 con lươn + trứng bác"
        },
        "price": 340000
      }
    ]
  },
  {
    "id": "chinese",
    "name": {
      "ko": "중화 요리",
      "en": "Chinese Dishes",
      "zh": "中式菜肴",
      "ja": "中華料理",
      "vi": "Món Hoa"
    },
    "items": [
      {
        "name": {
          "ko": "라즈지",
          "en": "Laziji (Sichuan Chili Chicken)",
          "zh": "辣子鸡",
          "ja": "ラーズージー(四川風唐辛子鶏)",
          "vi": "Gà xào ớt Tứ Xuyên"
        },
        "desc": {
          "ko": "고추기름에 바삭한 튀김닭이 어우러진 요리",
          "en": "Crispy fried chicken tossed in chili oil",
          "zh": "酥脆炸鸡拌辣椒油",
          "ja": "香ばしい鶏の唐揚げをラー油で和えた料理",
          "vi": "Gà chiên giòn xào cùng ớt cay kiểu Tứ Xuyên"
        },
        "price": 260000,
        "spicy": true
      },
      {
        "name": {
          "ko": "어향새우",
          "en": "Yuxiang Shrimp (Sichuan Spicy-Sweet Shrimp)",
          "zh": "鱼香虾",
          "ja": "魚香エビ",
          "vi": "Tôm sốt cay kiểu Tứ Xuyên"
        },
        "desc": {
          "ko": "매콤달콤한 소스로 볶아낸 새우튀김",
          "en": "Fried shrimp stir-fried in a spicy-sweet sauce",
          "zh": "用香辣酸甜酱汁爆炒的炸虾",
          "ja": "甘辛いソースで炒めた揚げエビ",
          "vi": "Tôm chiên xào sốt cay ngọt đậm đà"
        },
        "price": 260000
      },
      {
        "name": {
          "ko": "어향가지",
          "en": "Yuxiang Eggplant (Sichuan Spicy-Sweet Eggplant)",
          "zh": "鱼香茄子",
          "ja": "魚香茄子",
          "vi": "Cà tím sốt cay kiểu Tứ Xuyên"
        },
        "desc": {
          "ko": "매콤달콤한 소스와 튀긴 가지 볶음",
          "en": "Fried eggplant stir-fried in a spicy-sweet sauce",
          "zh": "用香辣酸甜酱汁烧制的炸茄子",
          "ja": "甘辛いソースで炒めた揚げナス",
          "vi": "Cà tím chiên xào sốt cay ngọt thơm đậm vị"
        },
        "price": 180000,
        "tag": "best"
      },
      {
        "name": {
          "ko": "마파두부 누룽지",
          "en": "Mapo Tofu with Crispy Rice (Nurungji)",
          "zh": "麻婆豆腐锅巴",
          "ja": "麻婆豆腐おこげ",
          "vi": "Cơm cháy đậu hủ Mapo"
        },
        "desc": {
          "ko": "바삭한 누룽지와 마파두부",
          "en": "Mapo tofu with crispy scorched rice",
          "zh": "酥脆锅巴配麻婆豆腐",
          "ja": "パリパリのおこげと麻婆豆腐",
          "vi": "Cơm cháy ăn cùng đậu hủ Mapo cay tê"
        },
        "price": 240000,
        "tag": "best",
        "photo": "img/mapo.jpg"
      },
      {
        "name": {
          "ko": "공심채볶음",
          "en": "Stir-fried Water Spinach (Kongxincai)",
          "zh": "蒜蓉空心菜",
          "ja": "空芯菜の炒め物",
          "vi": "Rau muống xào tỏi"
        },
        "desc": {
          "ko": "마늘 향 가득한 아삭한 공심채",
          "en": "Crunchy water spinach full of garlic aroma",
          "zh": "蒜香浓郁、脆嫩爽口的空心菜",
          "ja": "ニンニクの香りたっぷりのシャキシャキ空芯菜",
          "vi": "Rau muống xào tỏi giòn thơm kiểu Hoa"
        },
        "price": 90000,
        "tag": "best",
        "photo": "img/kongxincai.jpg"
      },
      {
        "name": {
          "ko": "새우 공심채",
          "en": "Water Spinach with Shrimp",
          "zh": "虾仁空心菜",
          "ja": "エビと空芯菜の炒め",
          "vi": "Rau muống xào tôm"
        },
        "desc": {
          "ko": "새우와 공심채를 센 불에 볶음",
          "en": "Shrimp and water spinach stir-fried over high heat",
          "zh": "大火爆炒虾仁与空心菜",
          "ja": "エビと空芯菜を強火で炒めた一品",
          "vi": "Rau muống xào tôm thơm ngon"
        },
        "price": 120000
      },
      {
        "name": {
          "ko": "깐풍기",
          "en": "Kkanpunggi (Crispy Chicken in Spicy-Sweet Sauce)",
          "zh": "干烹鸡",
          "ja": "カンプンギ(甘辛ソースの唐揚げ)",
          "vi": "Gà chiên sốt cay ngọt"
        },
        "desc": {
          "ko": "바삭한 닭튀김에 매콤달콤 소스",
          "en": "Crispy fried chicken in a spicy-sweet sauce",
          "zh": "酥脆炸鸡裹香辣酸甜酱汁",
          "ja": "サクサクの唐揚げに甘辛ソース",
          "vi": "Gà chiên giòn phủ sốt cay ngọt hấp dẫn"
        },
        "price": 220000
      },
      {
        "name": {
          "ko": "유린기",
          "en": "Yurinki (Crispy Chicken with Tangy Sauce)",
          "zh": "油淋鸡",
          "ja": "ユーリンチー",
          "vi": "Gà chiên sốt hành kiểu Nhật"
        },
        "desc": {
          "ko": "상큼한 소스를 곁들인 닭튀김",
          "en": "Fried chicken served with a refreshing tangy sauce",
          "zh": "配清爽酱汁的炸鸡",
          "ja": "さっぱりソースを添えた鶏の唐揚げ",
          "vi": "Gà chiên giòn kèm sốt chua ngọt thanh mát"
        },
        "price": 240000,
        "tag": "best"
      },
      {
        "name": {
          "ko": "꿔바로우",
          "en": "Guobaorou (Sweet & Sour Crispy Pork)",
          "zh": "锅包肉",
          "ja": "鍋包肉(グオバオロウ)",
          "vi": "Thịt heo chiên sốt chua ngọt"
        },
        "desc": {
          "ko": "찹쌀 튀김옷이 쫀득한 탕수육",
          "en": "Sweet and sour pork with a chewy glutinous-starch coating",
          "zh": "外皮软糯有嚼劲的糖醋肉",
          "ja": "もちもち衣の酢豚",
          "vi": "Heo chiên giòn sốt chua ngọt lớp bột dẻo"
        },
        "price": 180000
      },
      {
        "name": {
          "ko": "순살족발",
          "en": "Boneless Jokbal (Braised Pork Trotters)",
          "zh": "无骨猪蹄",
          "ja": "骨なしチョッパル(豚足)",
          "vi": "Chân giò heo rút xương"
        },
        "desc": {
          "ko": "뼈를 발라 먹기 편한 부드러운 족발",
          "en": "Tender pork trotters, deboned for easy eating",
          "zh": "去骨嫩滑猪蹄,方便食用",
          "ja": "骨を取って食べやすい柔らかい豚足",
          "vi": "Chân giò heo rút xương mềm dễ ăn"
        },
        "price": 280000
      },
      {
        "name": {
          "ko": "소고기 숙주 볶음",
          "en": "Stir-fried Beef with Bean Sprouts",
          "zh": "牛肉炒豆芽",
          "ja": "牛肉ともやしの炒め物",
          "vi": "Thịt bò xào giá đỗ"
        },
        "desc": {
          "ko": "아삭한 숙주와 소고기 볶음",
          "en": "Beef stir-fried with crunchy bean sprouts",
          "zh": "牛肉与爽脆豆芽同炒",
          "ja": "シャキシャキもやしと牛肉の炒め物",
          "vi": "Thịt bò xào cùng giá đỗ giòn ngon"
        },
        "price": 180000
      },
      {
        "name": {
          "ko": "감자채볶음",
          "en": "Stir-fried Shredded Potato",
          "zh": "炒土豆丝",
          "ja": "じゃがいもの千切り炒め",
          "vi": "Khoai tây xào"
        },
        "desc": {
          "ko": "아삭한 감자채 볶음",
          "en": "Crunchy stir-fried shredded potato",
          "zh": "爽脆的炒土豆丝",
          "ja": "シャキシャキのじゃがいも千切り炒め",
          "vi": "Khoai tây sợi xào giòn nhẹ"
        },
        "price": 120000,
        "tag": "best",
        "photo": "img/potato.jpg"
      },
      {
        "name": {
          "ko": "중국만두",
          "en": "Chinese Dumplings",
          "zh": "中式包子",
          "ja": "中華まん",
          "vi": "Màn thầu Đài Loan"
        },
        "desc": {
          "ko": "육즙 가득한 중국식 만두",
          "en": "Juicy Chinese-style dumplings",
          "zh": "汁多味美的中式包子",
          "ja": "肉汁たっぷりの中華風まん",
          "vi": "Màn thầu nhân đầy đặn, đậm đà hương vị"
        },
        "price": 90000
      },
      {
        "name": {
          "ko": "창잉터우",
          "en": "Cangyingtou (Stir-fried Minced Pork)",
          "zh": "苍蝇头",
          "ja": "蒼蝿頭(ツァンインドウ)",
          "vi": "Thịt băm xào Đài Loan"
        },
        "desc": {
          "ko": "다진 고기와 채소를 볶은 대만 요리",
          "en": "Taiwanese dish of stir-fried minced meat and vegetables",
          "zh": "肉末与蔬菜同炒的台湾菜",
          "ja": "ひき肉と野菜を炒めた台湾料理",
          "vi": "Thịt băm xào rau củ kiểu Đài Loan"
        },
        "price": 180000,
        "tag": "best"
      },
      {
        "name": {
          "ko": "토마토 계란 볶음",
          "en": "Tomato & Egg Stir-fry",
          "zh": "番茄炒蛋",
          "ja": "トマトと卵の炒め物",
          "vi": "Trứng xào cà chua"
        },
        "desc": {
          "ko": "토마토와 계란을 볶은 가정식",
          "en": "Home-style stir-fry of tomato and egg",
          "zh": "番茄炒蛋家常菜",
          "ja": "トマトと卵を炒めた家庭料理",
          "vi": "Cà chua xào cùng trứng mềm thơm"
        },
        "price": 120000
      },
      {
        "name": {
          "ko": "후라이팬 두부",
          "en": "Skillet Tofu",
          "zh": "煎锅豆腐",
          "ja": "フライパン豆腐",
          "vi": "Đậu phụ rán sốt"
        },
        "desc": {
          "ko": "겉바속촉 두부 요리",
          "en": "Tofu dish, crispy outside and soft inside",
          "zh": "外酥里嫩的豆腐料理",
          "ja": "外はカリッと中はふんわりの豆腐料理",
          "vi": "Đậu hủ giòn ngoài mềm trong"
        },
        "price": 120000,
        "tag": "best",
        "photo": "img/tofu.jpg"
      },
      {
        "name": {
          "ko": "오이 무침",
          "en": "Spicy Cucumber Salad",
          "zh": "凉拌黄瓜",
          "ja": "きゅうりの和え物",
          "vi": "Dưa leo trộn cay"
        },
        "desc": {
          "ko": "새콤 매콤하게 무친 아삭한 오이",
          "en": "Crunchy cucumber tossed in a sour-spicy dressing",
          "zh": "酸辣爽脆的凉拌黄瓜",
          "ja": "甘酸っぱ辛く和えたシャキシャキきゅうり",
          "vi": "Dưa leo trộn chua cay giòn mát"
        },
        "price": 90000
      },
      {
        "name": {
          "ko": "얼음 오이",
          "en": "Iced Cucumber",
          "zh": "冰镇黄瓜",
          "ja": "氷きゅうり",
          "vi": "Dưa leo đá lạnh"
        },
        "desc": {
          "ko": "시원한 얼음과 함께 즐기는 오이무침",
          "en": "Cucumber salad served with ice",
          "zh": "配冰块食用的凉拌黄瓜",
          "ja": "氷と一緒に楽しむきゅうりの和え物",
          "vi": "Dưa leo trộn mát lạnh dùng kèm đá viên"
        },
        "price": 90000
      },
      {
        "name": {
          "ko": "화자오 크림 리소토",
          "en": "Sichuan Pepper Cream Risotto",
          "zh": "花椒奶油烩饭",
          "ja": "花椒クリームリゾット",
          "vi": "Risotto kem tiêu Tứ Xuyên"
        },
        "desc": {
          "ko": "화자오 향의 부드러운 크림 리소토",
          "en": "Creamy risotto with Sichuan pepper aroma",
          "zh": "花椒香味的顺滑奶油烩饭",
          "ja": "花椒が香るクリーミーなリゾット",
          "vi": "Risotto kem tiêu Tứ Xuyên béo thơm"
        },
        "price": 160000
      }
    ]
  },
  {
    "id": "rice",
    "name": {
      "ko": "식사 · 면",
      "en": "Rice & Noodles",
      "zh": "主食 · 面",
      "ja": "ご飯 · 麺",
      "vi": "Cơm · Mì"
    },
    "items": [
      {
        "name": {
          "ko": "계란볶음밥",
          "en": "Egg Fried Rice",
          "zh": "蛋炒饭",
          "ja": "卵チャーハン",
          "vi": "Cơm chiên trứng"
        },
        "desc": {
          "ko": "고소한 계란과 함께 볶은 볶음밥",
          "en": "Fried rice stir-fried with savory egg",
          "zh": "与香浓鸡蛋同炒的炒饭",
          "ja": "香ばしい卵と炒めたチャーハン",
          "vi": "Cơm chiên trứng thơm béo"
        },
        "price": 120000
      },
      {
        "name": {
          "ko": "새우볶음밥",
          "en": "Shrimp Fried Rice",
          "zh": "虾仁炒饭",
          "ja": "エビチャーハン",
          "vi": "Cơm chiên tôm"
        },
        "desc": {
          "ko": "새우를 넣어 고슬고슬 볶은 밥",
          "en": "Fluffy fried rice with shrimp",
          "zh": "加入虾仁炒得粒粒分明的炒饭",
          "ja": "エビ入りのパラパラチャーハン",
          "vi": "Cơm chiên tôm đậm đà hấp dẫn"
        },
        "price": 160000
      },
      {
        "name": {
          "ko": "짜장소스 추가",
          "en": "Extra Jajang Sauce",
          "zh": "加炸酱",
          "ja": "ジャジャンソース追加",
          "vi": "Thêm sốt jajang"
        },
        "desc": {
          "ko": "볶음밥에 부어 비벼 드세요",
          "en": "Pour over fried rice and mix",
          "zh": "浇在炒饭上拌着吃",
          "ja": "チャーハンにかけて混ぜてお召し上がりください",
          "vi": "Rưới sốt jajang lên cơm chiên và trộn đều"
        },
        "price": 40000
      },
      {
        "name": {
          "ko": "마라 토마토면",
          "en": "Mala Tomato Noodles",
          "zh": "麻辣番茄面",
          "ja": "麻辣トマト麺",
          "vi": "Mì cà chua Mala"
        },
        "desc": {
          "ko": "얼큰한 마라와 토마토 국물면",
          "en": "Noodles in a spicy mala and tomato broth",
          "zh": "麻辣番茄汤面",
          "ja": "麻辣とトマトの辛うまスープ麺",
          "vi": "Mì Mala cà chua cay chua đậm vị"
        },
        "price": 160000,
        "spicy": true
      },
      {
        "name": {
          "ko": "제육덮밥",
          "en": "Jeyuk Rice Bowl (Spicy Pork)",
          "zh": "韩式辣炒猪肉盖饭",
          "ja": "豚肉の辛味炒め丼(チェユクトッパプ)",
          "vi": "Cơm thịt heo cay"
        },
        "desc": {
          "ko": "매콤한 돼지고기 볶음을 올린 덮밥",
          "en": "Rice bowl topped with spicy stir-fried pork",
          "zh": "铺上香辣炒猪肉的盖饭",
          "ja": "辛い豚肉炒めをのせた丼",
          "vi": "Cơm với thịt heo xào cay"
        },
        "price": 240000,
        "spicy": true
      }
    ]
  },
  {
    "id": "korean",
    "name": {
      "ko": "한식 · 안주",
      "en": "Korean Dishes & Bar Snacks",
      "zh": "韩餐 · 下酒菜",
      "ja": "韓国料理 · おつまみ",
      "vi": "Món Hàn · Món nhậu"
    },
    "items": [
      {
        "name": {
          "ko": "직화불닭",
          "en": "Flame-grilled Fire Chicken (Bulldak)",
          "zh": "明火辣烤鸡",
          "ja": "直火焼きプルダク",
          "vi": "Gà nướng cay kiểu Hàn Quốc"
        },
        "desc": {
          "ko": "직화로 구운 매콤한 불닭",
          "en": "Spicy chicken grilled over an open flame",
          "zh": "明火烤制的香辣鸡",
          "ja": "直火で焼いた辛い鶏肉",
          "vi": "Gà nướng lửa than cay kiểu Hàn"
        },
        "price": 220000,
        "spicy": true
      },
      {
        "name": {
          "ko": "제육볶음",
          "en": "Jeyuk Bokkeum (Spicy Stir-fried Pork)",
          "zh": "韩式辣炒猪肉",
          "ja": "豚肉の辛味炒め(チェユクポックム)",
          "vi": "Thịt heo xào cay"
        },
        "desc": {
          "ko": "매콤한 양념으로 볶은 돼지고기",
          "en": "Pork stir-fried in a spicy marinade",
          "zh": "用香辣酱料炒制的猪肉",
          "ja": "辛いヤンニョムで炒めた豚肉",
          "vi": "Thịt heo xào cay đậm vị kiểu Hàn Quốc"
        },
        "price": 220000,
        "spicy": true
      },
      {
        "name": {
          "ko": "소고기 뭇국",
          "en": "Beef & Radish Soup (Muguk)",
          "zh": "牛肉萝卜汤",
          "ja": "牛肉と大根のスープ",
          "vi": "Canh bò củ cải"
        },
        "desc": {
          "ko": "시원하고 담백한 소고기 무국",
          "en": "Clean, light beef and radish soup",
          "zh": "清爽清淡的牛肉萝卜汤",
          "ja": "すっきりあっさりの牛肉大根スープ",
          "vi": "Canh bò củ cải thanh ngọt kiểu Hàn Quốc"
        },
        "price": 240000
      },
      {
        "name": {
          "ko": "오뎅탕",
          "en": "Fish Cake Soup (Odeng-tang)",
          "zh": "鱼饼汤",
          "ja": "おでん鍋",
          "vi": "Canh chả cá"
        },
        "desc": {
          "ko": "따뜻한 국물과 어묵",
          "en": "Fish cakes in a warm broth",
          "zh": "热汤配鱼饼",
          "ja": "温かいスープとおでん",
          "vi": "Lẩu chả cá nóng hổi đậm vị nước dùng"
        },
        "price": 220000
      },
      {
        "name": {
          "ko": "황태탕",
          "en": "Hwangtae-tang (Dried Pollack Soup)",
          "zh": "干明太鱼汤",
          "ja": "ファンテタン(干しスケトウダラのスープ)",
          "vi": "Canh cá khô Hwangtae"
        },
        "desc": {
          "ko": "깊고 진한 국물의 강원도 용대리 황태 해장국",
          "en": "Rich, deep hangover soup made with dried pollack from Yongdae-ri, Gangwon-do",
          "zh": "用江原道龙大里干明太鱼熬制的浓郁醒酒汤",
          "ja": "江原道龍大里産の干しスケトウダラを使った濃厚な二日酔いスープ",
          "vi": "Canh Hwangtae đậm vị thanh nóng"
        },
        "price": 240000
      },
      {
        "name": {
          "ko": "스팸 & 분홍소시지 & 계란후라이",
          "en": "Spam, Pink Sausage & Fried Egg",
          "zh": "午餐肉、粉红香肠与煎蛋",
          "ja": "スパム・ピンクソーセージ・目玉焼き",
          "vi": "Thịt jambong nướng"
        },
        "desc": {
          "ko": "스팸 · 소시지 · 계란후라이",
          "en": "Spam · Sausage · Fried Egg",
          "zh": "午餐肉 · 香肠 · 煎蛋",
          "ja": "スパム · ソーセージ · 目玉焼き",
          "vi": "Spam, xúc xích Hàn và trứng ốp la"
        },
        "price": 180000
      },
      {
        "name": {
          "ko": "떡볶이 / 로제 떡볶이",
          "en": "Tteokbokki / Rosé Tteokbokki (Spicy Rice Cakes)",
          "zh": "辣炒年糕 / 玫瑰奶油炒年糕",
          "ja": "トッポッキ / ロゼトッポッキ",
          "vi": "Tteokbokki / Tteokbokki Rosé"
        },
        "desc": {
          "ko": "매콤한 떡볶이 또는 부드러운 로제 소스",
          "en": "Spicy rice cakes or creamy rosé sauce",
          "zh": "香辣口味或顺滑的玫瑰酱口味",
          "ja": "辛いトッポッキ、またはまろやかなロゼソース",
          "vi": "Bánh gạo sốt cay hoặc sốt Rosé"
        },
        "sizes": [
          [
            "떡볶이",
            150000
          ],
          [
            "로제",
            180000
          ]
        ],
        "spicy": true
      },
      {
        "name": {
          "ko": "새우 감바스",
          "en": "Shrimp Gambas",
          "zh": "蒜香橄榄油虾",
          "ja": "エビのアヒージョ(ガンバス)",
          "vi": "Tôm sốt tỏi kiểu Tây Ban Nha"
        },
        "desc": {
          "ko": "마늘 오일에 볶은 탱글한 새우",
          "en": "Plump shrimp sautéed in garlic oil",
          "zh": "蒜香橄榄油煮鲜嫩虾仁",
          "ja": "ガーリックオイルで煮たぷりぷりのエビ",
          "vi": "Tôm tươi xào dầu ô liu và tỏi"
        },
        "price": 220000
      },
      {
        "name": {
          "ko": "치즈 감자전",
          "en": "Cheese Potato Pancake",
          "zh": "芝士土豆饼",
          "ja": "チーズじゃがいもチヂミ",
          "vi": "Bánh khoai tây phomai"
        },
        "desc": {
          "ko": "치즈를 올린 바삭한 감자전",
          "en": "Crispy potato pancake topped with cheese",
          "zh": "铺满芝士的香脆土豆饼",
          "ja": "チーズをのせたカリカリのじゃがいもチヂミ",
          "vi": "Bánh khoai tây giòn phủ phô mai"
        },
        "price": 120000,
        "tag": "best"
      },
      {
        "name": {
          "ko": "오레오 빙수",
          "en": "Oreo Bingsu (Shaved Ice)",
          "zh": "奥利奥刨冰",
          "ja": "オレオかき氷(ピンス)",
          "vi": "Bingsu Oreo"
        },
        "desc": {
          "ko": "오레오가 듬뿍 들어간 우유 빙수",
          "en": "Milk shaved ice loaded with Oreos",
          "zh": "满满奥利奥的牛奶刨冰",
          "ja": "オレオたっぷりのミルクかき氷",
          "vi": "Đá bào sữa cùng bánh Oreo"
        },
        "price": 70000
      }
    ]
  },
  {
    "id": "skewer",
    "name": {
      "ko": "꼬치",
      "en": "Skewers",
      "zh": "烤串",
      "ja": "串焼き",
      "vi": "Xiên nướng"
    },
    "items": [
      {
        "name": {
          "ko": "닭꼬치",
          "en": "Chicken Skewer",
          "zh": "烤鸡肉串",
          "ja": "鶏肉串",
          "vi": "Xiên thịt gà"
        },
        "price": 50000
      },
      {
        "name": {
          "ko": "닭간꼬치",
          "en": "Chicken Liver Skewer",
          "zh": "烤鸡肝串",
          "ja": "鶏レバー串",
          "vi": "Xiên gan gà nướng"
        },
        "price": 50000
      },
      {
        "name": {
          "ko": "염통꼬치",
          "en": "Chicken Heart Skewer",
          "zh": "烤鸡心串",
          "ja": "ハツ串",
          "vi": "Xiên tim gà"
        },
        "price": 50000
      },
      {
        "name": {
          "ko": "닭껍질꼬치",
          "en": "Chicken Skin Skewer",
          "zh": "烤鸡皮串",
          "ja": "鶏皮串",
          "vi": "Xiên da gà"
        },
        "price": 50000
      },
      {
        "name": {
          "ko": "닭날개꼬치",
          "en": "Chicken Wing Skewer",
          "zh": "烤鸡翅串",
          "ja": "手羽先串",
          "vi": "Xiên cánh gà"
        },
        "price": 50000
      },
      {
        "name": {
          "ko": "표고꼬치",
          "en": "Shiitake Mushroom Skewer",
          "zh": "烤香菇串",
          "ja": "椎茸串",
          "vi": "Xiên nấm hương"
        },
        "price": 40000
      },
      {
        "name": {
          "ko": "모듬꼬치",
          "en": "Assorted Skewers",
          "zh": "综合烤串",
          "ja": "串盛り合わせ",
          "vi": "Xiên thập cẩm"
        },
        "desc": {
          "ko": "여러 꼬치를 한 번에",
          "en": "A variety of skewers in one order",
          "zh": "一次品尝多种烤串",
          "ja": "いろいろな串を一度に",
          "vi": "Tổng hợp xiên nướng"
        },
        "price": 250000
      }
    ]
  },
  {
    "id": "drink",
    "name": {
      "ko": "주류 · 음료",
      "en": "Drinks",
      "zh": "酒水 · 饮料",
      "ja": "お酒 · ドリンク",
      "vi": "Đồ uống"
    },
    "items": [
      {
        "name": {
          "ko": "소주",
          "en": "Soju",
          "zh": "烧酒",
          "ja": "焼酎(ソジュ)",
          "vi": "Soju"
        },
        "desc": {
          "ko": "330ml · 15%",
          "en": "330ml · 15%",
          "zh": "330ml · 15%",
          "ja": "330ml · 15%",
          "vi": "330ml · 15%"
        },
        "price": 150000
      },
      {
        "name": {
          "ko": "보드카 멘",
          "en": "Vodka Men",
          "zh": "Vodka Men 伏特加",
          "ja": "ウォッカ メン",
          "vi": "Volka Men"
        },
        "desc": {
          "ko": "500ml · 29.5%",
          "en": "500ml · 29.5%",
          "zh": "500ml · 29.5%",
          "ja": "500ml · 29.5%",
          "vi": "500ml · 29.5%"
        },
        "price": 150000
      },
      {
        "name": {
          "ko": "삿포로 생맥주",
          "en": "Sapporo Draft Beer",
          "zh": "札幌生啤",
          "ja": "サッポロ生ビール",
          "vi": "Bia Sapporo"
        },
        "desc": {
          "ko": "330ml · 4.5%",
          "en": "330ml · 4.5%",
          "zh": "330ml · 4.5%",
          "ja": "330ml · 4.5%",
          "vi": "330ml · 4.5%"
        },
        "price": 60000
      },
      {
        "name": {
          "ko": "타이거",
          "en": "Tiger Beer",
          "zh": "虎牌啤酒",
          "ja": "タイガービール",
          "vi": "Tiger"
        },
        "desc": {
          "ko": "330ml · 4.5%",
          "en": "330ml · 4.5%",
          "zh": "330ml · 4.5%",
          "ja": "330ml · 4.5%",
          "vi": "330ml · 4.5%"
        },
        "price": 40000
      },
      {
        "name": {
          "ko": "칭따오 BIG",
          "en": "Tsingtao BIG",
          "zh": "青岛啤酒(大瓶)",
          "ja": "青島ビール(大)",
          "vi": "Tsingtao"
        },
        "desc": {
          "ko": "640ml · 5%",
          "en": "640ml · 5%",
          "zh": "640ml · 5%",
          "ja": "640ml · 5%",
          "vi": "640ml · 5%"
        },
        "price": 80000
      },
      {
        "name": {
          "ko": "백년호도 33%",
          "en": "Bainian Hutu 33% (Baijiu)",
          "zh": "百年糊涂 33%",
          "ja": "百年糊塗 33%",
          "vi": "Bách Niên Hồ Đồ 33%"
        },
        "sizes": [
          [
            "125ml",
            150000
          ],
          [
            "450ml",
            720000
          ]
        ]
      },
      {
        "name": {
          "ko": "백년호도 52%",
          "en": "Bainian Hutu 52% (Baijiu)",
          "zh": "百年糊涂 52%",
          "ja": "百年糊塗 52%",
          "vi": "Bách Niên Hồ Đồ 52%"
        },
        "sizes": [
          [
            "125ml",
            150000
          ],
          [
            "450ml",
            720000
          ]
        ]
      },
      {
        "name": {
          "ko": "바이윈볜 3성",
          "en": "Baiyunbian 3-Star (Baijiu)",
          "zh": "白云边 3星",
          "ja": "白雲辺 3星",
          "vi": "Bai Yun Bian 3"
        },
        "desc": {
          "ko": "500ml · 53%",
          "en": "500ml · 53%",
          "zh": "500ml · 53%",
          "ja": "500ml · 53%",
          "vi": "500ml · 53%"
        },
        "price": 850000
      },
      {
        "name": {
          "ko": "바이윈볜 4성",
          "en": "Baiyunbian 4-Star (Baijiu)",
          "zh": "白云边 4星",
          "ja": "白雲辺 4星",
          "vi": "Bai Yun Bian 4"
        },
        "desc": {
          "ko": "500ml · 53%",
          "en": "500ml · 53%",
          "zh": "500ml · 53%",
          "ja": "500ml · 53%",
          "vi": "500ml · 53%"
        },
        "price": 950000
      },
      {
        "name": {
          "ko": "이과두주",
          "en": "Erguotou (Baijiu)",
          "zh": "二锅头",
          "ja": "二鍋頭",
          "vi": "Erguotou"
        },
        "desc": {
          "ko": "125ml · 56%",
          "en": "125ml · 56%",
          "zh": "125ml · 56%",
          "ja": "125ml · 56%",
          "vi": "125ml · 56%"
        },
        "price": 140000
      },
      {
        "name": {
          "ko": "고태법 백주 분주",
          "en": "Fenjiu (Baijiu)",
          "zh": "汾酒",
          "ja": "汾酒(フェンジュ)",
          "vi": "Fen Jiu Gold"
        },
        "desc": {
          "ko": "475ml · 42%",
          "en": "475ml · 42%",
          "zh": "475ml · 42%",
          "ja": "475ml · 42%",
          "vi": "475ml · 42%"
        },
        "price": 800000
      },
      {
        "name": {
          "ko": "노주노교 두곡",
          "en": "Luzhou Laojiao Touqu (Baijiu)",
          "zh": "泸州老窖头曲",
          "ja": "瀘州老窖頭曲",
          "vi": "Luzhou Laojiao Touqu"
        },
        "desc": {
          "ko": "650ml · 55%",
          "en": "650ml · 55%",
          "zh": "650ml · 55%",
          "ja": "650ml · 55%",
          "vi": "650ml · 55%"
        },
        "price": 850000
      },
      {
        "name": {
          "ko": "마오타이",
          "en": "Maotai (Moutai)",
          "zh": "茅台",
          "ja": "茅台酒",
          "vi": "Mao Tai"
        },
        "desc": {
          "ko": "500ml · 53%",
          "en": "500ml · 53%",
          "zh": "500ml · 53%",
          "ja": "500ml · 53%",
          "vi": "500ml · 53%"
        },
        "price": 14000000
      },
      {
        "name": {
          "ko": "라이마오",
          "en": "Laimao (Baijiu)",
          "zh": "赖茅",
          "ja": "頼茅",
          "vi": "Lai Mao"
        },
        "desc": {
          "ko": "500ml · 53%",
          "en": "500ml · 53%",
          "zh": "500ml · 53%",
          "ja": "500ml · 53%",
          "vi": "500ml · 53%"
        },
        "price": 3900000
      },
      {
        "name": {
          "ko": "수정방",
          "en": "Shuijingfang (Baijiu)",
          "zh": "水井坊",
          "ja": "水井坊",
          "vi": "Shui Jing Fang"
        },
        "desc": {
          "ko": "750ml · 52%",
          "en": "750ml · 52%",
          "zh": "750ml · 52%",
          "ja": "750ml · 52%",
          "vi": "750ml · 52%"
        },
        "price": 6000000
      },
      {
        "name": {
          "ko": "연태고량주",
          "en": "Yantai Guniang (Kaoliang Liquor)",
          "zh": "烟台古酿",
          "ja": "煙台古醸(高粱酒)",
          "vi": "Yantai"
        },
        "sizes": [
          [
            "250ml",
            750000
          ],
          [
            "500ml",
            1200000
          ]
        ]
      },
      {
        "name": {
          "ko": "왕라오지",
          "en": "Wanglaoji (Herbal Tea)",
          "zh": "王老吉",
          "ja": "王老吉(ワンラオジー)",
          "vi": "Wang Lao Ji"
        },
        "price": 35000
      },
      {
        "name": {
          "ko": "코카콜라",
          "en": "Coca-Cola",
          "zh": "可口可乐",
          "ja": "コカ・コーラ",
          "vi": "Coca Cola"
        },
        "price": 20000
      },
      {
        "name": {
          "ko": "스프라이트",
          "en": "Sprite",
          "zh": "雪碧",
          "ja": "スプライト",
          "vi": "Sprite"
        },
        "price": 20000
      }
    ]
  }
];
