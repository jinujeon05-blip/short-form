// 치뱅이 & 민짬뽕 (CHIBAENGI & MINJJAMPPONG · Mỹ Đình, Hà Nội) 메뉴 데이터 — 만든 날 2026-11-23
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND (부가세 별도 — 메뉴판 "이 금액에는 VAT가 포함되어 있지 않습니다")
// 원본: 구글 지도 메뉴판 사진 10장. 사진은 구글 지도 음식 사진 + 메뉴판 속 요리 그림(확대·보정, 사용자 허락 2026-11-23)
// photos = 누르면 확대 화면에서 넘겨 보는 사진들(첫 장이 대표), photo = 대표 사진
window.RESTAURANT = {
  brand: { ko: "치뱅이 & 민짬뽕", en: "CHIBAENGI & MINJJAMPPONG" },
  phone: "0389 712 797",
  address: "TT1/Lô 26 Đ. Mỹ Đình, Khu đô thị, Từ Liêm, Hà Nội",
  mapQuery: "치뱅이 & 민짬뽕 Mỹ Đình",
  wifi: null,
  hours: "11:00 – 02:00",
};

// 장바구니·주문서 (_shared/order.js). 가게 전화번호를 Zalo로 씀 (사장님 확인 필요)
window.ORDER = { staff: "vi", currency: "₫", zalo: "0389712797" };

window.MENU = [
  {
    "id": "chinese",
    "name": {
      "ko": "중식 메뉴",
      "en": "Chinese Menu",
      "zh": "中餐菜单",
      "ja": "中華メニュー",
      "vi": "Món Trung"
    },
    "items": [
      {
        "name": {
          "ko": "디진다 핵짬뽕",
          "en": "Extreme Spicy Jjamppong",
          "zh": "超辣炒码面",
          "ja": "激辛ちゃんぽん(ディジンダ)",
          "vi": "Mì Jjamppong siêu cay"
        },
        "price": 300000,
        "tag": "special",
        "spicy": true,
        "photo": "img/jm.jpg",
        "photos": [
          "img/jm.jpg",
          "img/j1.jpg",
          "img/j2.jpg"
        ]
      },
      {
        "name": {
          "ko": "민짬뽕",
          "en": "Min Jjamppong",
          "zh": "Min炒码面",
          "ja": "ミンちゃんぽん",
          "vi": "Mì cay Min Jjamppong"
        },
        "price": 190000,
        "tag": "best",
        "photo": "img/m1.jpg",
        "photos": [
          "img/m1.jpg"
        ]
      },
      {
        "name": {
          "ko": "학짬뽕",
          "en": "Hak Jjamppong",
          "zh": "Hak炒码面",
          "ja": "ハクちゃんぽん",
          "vi": "Mì cay Hak Jjamppong"
        },
        "desc": {
          "ko": "걸쭉한 고기육수",
          "en": "Rich, thick meat broth",
          "zh": "浓稠肉汤底",
          "ja": "とろみのある肉スープ",
          "vi": "Nước dùng thịt đậm đà"
        },
        "price": 200000,
        "spicy": true,
        "photo": "img/h1.jpg",
        "photos": [
          "img/h1.jpg"
        ]
      },
      {
        "name": {
          "ko": "짜장면",
          "en": "Black Bean Noodles",
          "zh": "炸酱面",
          "ja": "ジャジャン麺",
          "vi": "Mì tương đen"
        },
        "price": 140000,
        "tag": "best",
        "photo": "img/c1.jpg",
        "photos": [
          "img/c1.jpg",
          "img/c2.jpg"
        ]
      },
      {
        "name": {
          "ko": "불 짜장면",
          "en": "Spicy Black Bean Noodles",
          "zh": "辣炸酱面",
          "ja": "辛口ジャジャン麺",
          "vi": "Mì tương đen cay"
        },
        "price": 160000,
        "spicy": true,
        "photo": "img/bj1.jpg",
        "photos": [
          "img/bj1.jpg"
        ]
      },
      {
        "name": {
          "ko": "중화 비빔밥",
          "en": "Spicy Mixed Rice",
          "zh": "中式辣拌饭",
          "ja": "中華ビビンバ",
          "vi": "Cơm trộn Trung Hoa"
        },
        "price": 200000,
        "spicy": true,
        "photo": "img/rb1.jpg",
        "photos": [
          "img/rb1.jpg",
          "img/rb2.jpg"
        ]
      },
      {
        "name": {
          "ko": "야끼 우동 (밥)",
          "en": "Yaki Udon (Rice)",
          "zh": "炒乌冬面(米饭)",
          "ja": "焼きうどん(ご飯)",
          "vi": "Mì Udon xào (cơm)"
        },
        "price": 200000,
        "tag": "must",
        "spicy": true,
        "photo": "img/y1.jpg",
        "photos": [
          "img/y1.jpg",
          "img/y2.jpg",
          "img/y3.jpg",
          "img/y4.jpg",
          "img/y5.jpg",
          "img/y6.jpg",
          "img/y7.jpg"
        ]
      },
      {
        "name": {
          "ko": "돈까스",
          "en": "Pork Cutlet",
          "zh": "炸猪排",
          "ja": "とんかつ",
          "vi": "Thịt heo chiên xù"
        },
        "price": 180000,
        "photo": "img/dk1.jpg",
        "photos": [
          "img/dk1.jpg"
        ]
      },
      {
        "name": {
          "ko": "볶음밥",
          "en": "Fried Rice",
          "zh": "炒饭",
          "ja": "チャーハン",
          "vi": "Cơm chiên"
        },
        "price": 160000,
        "photo": "img/fr1.jpg",
        "photos": [
          "img/fr1.jpg"
        ]
      },
      {
        "name": {
          "ko": "탕수육",
          "en": "Sweet & Sour Pork",
          "zh": "糖醋肉",
          "ja": "酢豚(タンスユク)",
          "vi": "Thịt heo chiên xù sốt"
        },
        "price": 300000,
        "photo": "img/t1.jpg",
        "photos": [
          "img/t1.jpg"
        ]
      },
      {
        "name": {
          "ko": "군만두",
          "en": "Fried Dumplings",
          "zh": "煎饺",
          "ja": "焼き餃子",
          "vi": "Mandu chiên"
        },
        "price": 100000,
        "photo": "img/g1.jpg",
        "photos": [
          "img/g1.jpg"
        ]
      }
    ]
  },
  {
    "id": "wing",
    "name": {
      "ko": "윙봉 치킨",
      "en": "Wing Bong Chicken",
      "zh": "鸡翅炸鸡",
      "ja": "ウィンボンチキン",
      "vi": "Cánh gà (Wing Bong)"
    },
    "note": {
      "ko": "공급사 사정에 따라 닭 사이즈가 조금 다를 수 있어요",
      "en": "Chicken size may vary slightly depending on the supplier",
      "zh": "因供应商情况,鸡的大小可能略有不同",
      "ja": "仕入れ先の都合により、鶏のサイズが多少異なる場合があります",
      "vi": "Kích cỡ gà có thể chênh lệch nhẹ tùy nhà cung cấp"
    },
    "items": [
      {
        "name": {
          "ko": "윙봉 후라이드 치킨",
          "en": "Wing Bong Fried Chicken",
          "zh": "原味炸鸡翅",
          "ja": "ウィンボン フライドチキン",
          "vi": "Cánh gà chiên"
        },
        "sizes": [
          [
            {
              "ko": "10조각",
              "en": "10 pcs",
              "zh": "10块",
              "ja": "10個",
              "vi": "10 miếng"
            },
            200000
          ],
          [
            {
              "ko": "20조각",
              "en": "20 pcs",
              "zh": "20块",
              "ja": "20個",
              "vi": "20 miếng"
            },
            360000
          ]
        ],
        "photo": "img/wbf1.jpg",
        "photos": [
          "img/wbf1.jpg"
        ]
      },
      {
        "name": {
          "ko": "윙봉 양념 치킨",
          "en": "Wing Bong Seasoned Chicken",
          "zh": "甜辣酱鸡翅",
          "ja": "ウィンボン ヤンニョムチキン",
          "vi": "Cánh gà chiên tẩm sốt"
        },
        "sizes": [
          [
            {
              "ko": "10조각",
              "en": "10 pcs",
              "zh": "10块",
              "ja": "10個",
              "vi": "10 miếng"
            },
            220000
          ],
          [
            {
              "ko": "20조각",
              "en": "20 pcs",
              "zh": "20块",
              "ja": "20個",
              "vi": "20 miếng"
            },
            380000
          ]
        ],
        "photo": "img/wbs_m.jpg",
        "photos": [
          "img/wbs_m.jpg",
          "img/wbs1.jpg"
        ]
      },
      {
        "name": {
          "ko": "윙봉 매운맛 치킨",
          "en": "Wing Bong Spicy Chicken",
          "zh": "香辣鸡翅",
          "ja": "ウィンボン 辛口チキン",
          "vi": "Cánh gà chiên sốt cay"
        },
        "sizes": [
          [
            {
              "ko": "10조각",
              "en": "10 pcs",
              "zh": "10块",
              "ja": "10個",
              "vi": "10 miếng"
            },
            220000
          ],
          [
            {
              "ko": "20조각",
              "en": "20 pcs",
              "zh": "20块",
              "ja": "20個",
              "vi": "20 miếng"
            },
            380000
          ]
        ],
        "spicy": true,
        "photo": "img/wbp_m.jpg",
        "photos": [
          "img/wbp_m.jpg",
          "img/wbp1.jpg"
        ]
      },
      {
        "name": {
          "ko": "윙봉 반반 치킨",
          "en": "Wing Bong Half & Half Chicken",
          "zh": "鸡翅半半(原味+甜辣)",
          "ja": "ウィンボン ハーフ&ハーフ",
          "vi": "Cánh gà nửa rán nửa sốt"
        },
        "price": 380000,
        "unit": {
          "ko": "20조각",
          "en": "20 pcs",
          "zh": "20块",
          "ja": "20ピース",
          "vi": "20 miếng"
        },
        "tag": "best",
        "photo": "img/wbh2.jpg",
        "photos": [
          "img/wbh2.jpg",
          "img/wbh_m.jpg",
          "img/wbh1.jpg"
        ]
      }
    ]
  },
  {
    "id": "best",
    "name": {
      "ko": "베스트 치킨",
      "en": "Best Chicken",
      "zh": "人气炸鸡",
      "ja": "ベストチキン",
      "vi": "Gà chiên bán chạy"
    },
    "note": {
      "ko": "공급사 사정에 따라 닭 사이즈가 조금 다를 수 있어요",
      "en": "Chicken size may vary slightly depending on the supplier",
      "zh": "因供应商情况,鸡的大小可能略有不同",
      "ja": "仕入れ先の都合により、鶏のサイズが多少異なる場合があります",
      "vi": "Kích cỡ gà có thể chênh lệch nhẹ tùy nhà cung cấp"
    },
    "items": [
      {
        "name": {
          "ko": "후라이드 치킨",
          "en": "Fried Chicken",
          "zh": "原味炸鸡",
          "ja": "フライドチキン",
          "vi": "Gà rán"
        },
        "sizes": [
          [
            {
              "ko": "반 마리",
              "en": "Half",
              "zh": "半只",
              "ja": "半羽",
              "vi": "Nửa suất"
            },
            200000
          ],
          [
            {
              "ko": "한 마리",
              "en": "Whole",
              "zh": "一只",
              "ja": "1羽",
              "vi": "Một suất"
            },
            360000
          ]
        ],
        "tag": "best",
        "photo": "img/bf1.jpg",
        "photos": [
          "img/bf1.jpg"
        ]
      },
      {
        "name": {
          "ko": "양념 치킨",
          "en": "Seasoned Sweet Chicken",
          "zh": "韩式甜辣炸鸡",
          "ja": "ヤンニョムチキン",
          "vi": "Gà chiên tẩm sốt"
        },
        "sizes": [
          [
            {
              "ko": "반 마리",
              "en": "Half",
              "zh": "半只",
              "ja": "半羽",
              "vi": "Nửa suất"
            },
            220000
          ],
          [
            {
              "ko": "한 마리",
              "en": "Whole",
              "zh": "一只",
              "ja": "1羽",
              "vi": "Một suất"
            },
            380000
          ]
        ],
        "tag": "best",
        "photo": "img/bs1.jpg",
        "photos": [
          "img/bs1.jpg"
        ]
      },
      {
        "name": {
          "ko": "간장 치킨",
          "en": "Soy Sauce Chicken",
          "zh": "酱油炸鸡",
          "ja": "醤油チキン",
          "vi": "Gà chiên sốt tương"
        },
        "sizes": [
          [
            {
              "ko": "반 마리",
              "en": "Half",
              "zh": "半只",
              "ja": "半羽",
              "vi": "Nửa suất"
            },
            220000
          ],
          [
            {
              "ko": "한 마리",
              "en": "Whole",
              "zh": "一只",
              "ja": "1羽",
              "vi": "Một suất"
            },
            380000
          ]
        ],
        "photo": "img/bo1.jpg",
        "photos": [
          "img/bo1.jpg"
        ]
      },
      {
        "name": {
          "ko": "매운 간장 치킨",
          "en": "Spicy Soy Sauce Chicken",
          "zh": "香辣酱油炸鸡",
          "ja": "辛口醤油チキン",
          "vi": "Gà chiên sốt tương cay"
        },
        "sizes": [
          [
            {
              "ko": "반 마리",
              "en": "Half",
              "zh": "半只",
              "ja": "半羽",
              "vi": "Nửa suất"
            },
            220000
          ],
          [
            {
              "ko": "한 마리",
              "en": "Whole",
              "zh": "一只",
              "ja": "1羽",
              "vi": "Một suất"
            },
            380000
          ]
        ],
        "spicy": true,
        "photo": "img/bspy1.jpg",
        "photos": [
          "img/bspy1.jpg"
        ]
      },
      {
        "name": {
          "ko": "매운맛 치킨",
          "en": "Spicy Chicken",
          "zh": "香辣炸鸡",
          "ja": "辛口チキン",
          "vi": "Gà chiên sốt cay"
        },
        "sizes": [
          [
            {
              "ko": "반 마리",
              "en": "Half",
              "zh": "半只",
              "ja": "半羽",
              "vi": "Nửa suất"
            },
            220000
          ],
          [
            {
              "ko": "한 마리",
              "en": "Whole",
              "zh": "一只",
              "ja": "1羽",
              "vi": "Một suất"
            },
            380000
          ]
        ],
        "spicy": true,
        "photo": "img/bch1.jpg",
        "photos": [
          "img/bch1.jpg",
          "img/bp1.jpg"
        ]
      },
      {
        "name": {
          "ko": "반반 치킨",
          "en": "Half & Half Chicken",
          "zh": "半半炸鸡",
          "ja": "ハーフ&ハーフチキン",
          "vi": "Gà nửa rán nửa sốt"
        },
        "price": 380000,
        "unit": {
          "ko": "한 마리",
          "en": "Whole",
          "zh": "一只",
          "ja": "1羽",
          "vi": "Một suất"
        },
        "photo": "img/bh1.jpg",
        "photos": [
          "img/bh1.jpg"
        ]
      }
    ]
  },
  {
    "id": "boneless",
    "name": {
      "ko": "순살 치킨",
      "en": "Boneless Chicken",
      "zh": "无骨炸鸡",
      "ja": "骨なしチキン",
      "vi": "Gà không xương"
    },
    "items": [
      {
        "name": {
          "ko": "순살 후라이드 치킨",
          "en": "Boneless Fried Chicken",
          "zh": "无骨原味炸鸡",
          "ja": "骨なし フライドチキン",
          "vi": "Gà viên chiên"
        },
        "sizes": [
          [
            {
              "ko": "반 마리",
              "en": "Half",
              "zh": "半只",
              "ja": "半羽",
              "vi": "Nửa suất"
            },
            220000
          ],
          [
            {
              "ko": "한 마리",
              "en": "Whole",
              "zh": "一只",
              "ja": "1羽",
              "vi": "Một suất"
            },
            380000
          ]
        ]
      },
      {
        "name": {
          "ko": "순살 양념 치킨",
          "en": "Boneless Seasoned Chicken",
          "zh": "无骨甜辣炸鸡",
          "ja": "骨なし ヤンニョムチキン",
          "vi": "Gà viên tẩm sốt"
        },
        "sizes": [
          [
            {
              "ko": "반 마리",
              "en": "Half",
              "zh": "半只",
              "ja": "半羽",
              "vi": "Nửa suất"
            },
            240000
          ],
          [
            {
              "ko": "한 마리",
              "en": "Whole",
              "zh": "一只",
              "ja": "1羽",
              "vi": "Một suất"
            },
            400000
          ]
        ]
      },
      {
        "name": {
          "ko": "순살 매운맛 치킨",
          "en": "Boneless Spicy Chicken",
          "zh": "无骨香辣炸鸡",
          "ja": "骨なし 辛口チキン",
          "vi": "Gà viên sốt cay"
        },
        "sizes": [
          [
            {
              "ko": "반 마리",
              "en": "Half",
              "zh": "半只",
              "ja": "半羽",
              "vi": "Nửa suất"
            },
            240000
          ],
          [
            {
              "ko": "한 마리",
              "en": "Whole",
              "zh": "一只",
              "ja": "1羽",
              "vi": "Một suất"
            },
            400000
          ]
        ],
        "spicy": true
      },
      {
        "name": {
          "ko": "순살 반반 치킨",
          "en": "Boneless Half & Half Chicken",
          "zh": "无骨半半炸鸡",
          "ja": "骨なし ハーフ&ハーフ",
          "vi": "Gà viên nửa rán nửa sốt"
        },
        "price": 400000,
        "unit": {
          "ko": "한 마리",
          "en": "Whole",
          "zh": "一只",
          "ja": "1羽",
          "vi": "Một suất"
        }
      },
      {
        "name": {
          "ko": "순살 매운 직화구이",
          "en": "Boneless Spicy Grilled Chicken",
          "zh": "无骨香辣直火烤鸡",
          "ja": "骨なし 辛口直火焼きチキン",
          "vi": "Gà nướng than cay"
        },
        "price": 400000,
        "unit": {
          "ko": "한 마리",
          "en": "Whole",
          "zh": "一只",
          "ja": "1羽",
          "vi": "Một suất"
        },
        "spicy": true,
        "photo": "img/nbg1.jpg",
        "photos": [
          "img/nbg1.jpg"
        ]
      },
      {
        "name": {
          "ko": "순살 얼큰 마라 치킨",
          "en": "Boneless Mala Chicken",
          "zh": "无骨麻辣炸鸡",
          "ja": "骨なし マーラーチキン",
          "vi": "Gà cay Tứ Xuyên"
        },
        "price": 400000,
        "unit": {
          "ko": "한 마리",
          "en": "Whole",
          "zh": "一只",
          "ja": "1羽",
          "vi": "Một suất"
        },
        "spicy": true,
        "photo": "img/nbm1.jpg",
        "photos": [
          "img/nbm1.jpg"
        ]
      },
      {
        "name": {
          "ko": "순살 투움바 치킨",
          "en": "Boneless Toowoomba Chicken",
          "zh": "无骨图文巴奶油辣酱鸡",
          "ja": "骨なし トゥーンバチキン",
          "vi": "Gà Toowoomba"
        },
        "price": 400000,
        "unit": {
          "ko": "한 마리",
          "en": "Whole",
          "zh": "一只",
          "ja": "1羽",
          "vi": "Một suất"
        },
        "photo": "img/nbt1.jpg",
        "photos": [
          "img/nbt1.jpg"
        ]
      },
      {
        "name": {
          "ko": "순살 크림 파스타 치킨",
          "en": "Boneless Cream Pasta Chicken",
          "zh": "无骨奶油意面炸鸡",
          "ja": "骨なし クリームパスタチキン",
          "vi": "Gà kem pasta"
        },
        "price": 500000,
        "unit": {
          "ko": "한 마리",
          "en": "Whole",
          "zh": "一只",
          "ja": "1羽",
          "vi": "Một suất"
        },
        "photo": "img/nbc1.jpg",
        "photos": [
          "img/nbc1.jpg"
        ]
      }
    ]
  },
  {
    "id": "set",
    "name": {
      "ko": "세트 메뉴",
      "en": "Set Menu",
      "zh": "套餐",
      "ja": "セットメニュー",
      "vi": "Set"
    },
    "note": {
      "ko": "치뱅이·치뱅떡은 치킨 소스 변경 시 +20,000₫",
      "en": "Chibaengi & Chibaengtok: change chicken sauce +20,000₫",
      "zh": "Chibaengi·Chibaengtok 更换炸鸡酱料 +20,000₫",
      "ja": "チベンイ・チベントクはチキンソース変更 +20,000₫",
      "vi": "Chibaengi & Chibaengtok: đổi sốt gà +20.000₫"
    },
    "items": [
      {
        "name": {
          "ko": "치뱅이",
          "en": "Chibaengi",
          "zh": "Chibaengi",
          "ja": "チベンイ",
          "vi": "Chibaengi"
        },
        "desc": {
          "ko": "치킨 1마리 + 골뱅이 무침 반",
          "en": "1 chicken + half sea snail salad",
          "zh": "炸鸡1只 + 凉拌海螺(半份)",
          "ja": "チキン1羽 + ツブ貝和え(半分)",
          "vi": "1 gà chiên + 1/2 ốc trộn"
        },
        "price": 620000,
        "tag": "best",
        "photo": "img/s1.jpg",
        "photos": [
          "img/s1.jpg",
          "img/sc1.jpg"
        ]
      },
      {
        "name": {
          "ko": "치뱅떡",
          "en": "Chibaengtok",
          "zh": "Chibaengtok",
          "ja": "チベントク",
          "vi": "Chibaengtok"
        },
        "desc": {
          "ko": "치킨 1마리 + 골뱅이무침(반) + 떡볶이(반)",
          "en": "1 chicken + half sea snail salad + half tteokbokki",
          "zh": "炸鸡1只 + 凉拌海螺(半份) + 辣炒年糕(半份)",
          "ja": "チキン1羽 + ツブ貝和え(半分) + トッポッキ(半分)",
          "vi": "1 gà chiên + 1/2 ốc trộn + 1/2 tokbokki"
        },
        "price": 770000,
        "tag": "special",
        "photo": "img/s2.jpg",
        "photos": [
          "img/s2.jpg",
          "img/s3.jpg"
        ]
      },
      {
        "name": {
          "ko": "집뱅이",
          "en": "Zipbaengi",
          "zh": "Zipbaengi",
          "ja": "ジプベンイ",
          "vi": "Zipbaengi"
        },
        "desc": {
          "ko": "똥집튀김 + 골뱅이 무침",
          "en": "Fried gizzard + sea snail salad",
          "zh": "炸鸡胗 + 凉拌海螺",
          "ja": "砂肝フライ + ツブ貝和え",
          "vi": "Mề gà chiên + ốc trộn"
        },
        "price": 520000,
        "photo": "img/z1.jpg",
        "photos": [
          "img/z1.jpg",
          "img/s5.jpg"
        ]
      },
      {
        "name": {
          "ko": "치떡 셋트",
          "en": "Chitok Set",
          "zh": "炸鸡年糕套餐",
          "ja": "チキン&トッポッキセット",
          "vi": "Set Chitok"
        },
        "desc": {
          "ko": "치킨 1마리 + 떡볶이(반)",
          "en": "1 chicken + half tteokbokki",
          "zh": "炸鸡1只 + 辣炒年糕(半份)",
          "ja": "チキン1羽 + トッポッキ(半分)",
          "vi": "1 gà chiên + 1/2 tokbokki"
        },
        "price": 520000,
        "photo": "img/s6.jpg",
        "photos": [
          "img/s6.jpg"
        ]
      },
      {
        "name": {
          "ko": "떡튀 셋트",
          "en": "Tteok-Twi Set",
          "zh": "年糕炸物套餐",
          "ja": "トッポッキ&天ぷらセット",
          "vi": "Set Tokbokki & đồ chiên"
        },
        "desc": {
          "ko": "떡볶이 + 모듬튀김",
          "en": "Tteokbokki + assorted fried food",
          "zh": "辣炒年糕 + 什锦炸物",
          "ja": "トッポッキ + 揚げ物盛り合わせ",
          "vi": "Tokbokki + đồ chiên thập cẩm"
        },
        "price": 450000,
        "photo": "img/s5m.jpg",
        "photos": [
          "img/s5m.jpg"
        ]
      }
    ]
  },
  {
    "id": "tteok",
    "name": {
      "ko": "떡볶이 · 튀김",
      "en": "Tteokbokki & Fried Food",
      "zh": "辣炒年糕 · 炸物",
      "ja": "トッポッキ · 揚げ物",
      "vi": "Tokbokki & đồ chiên"
    },
    "items": [
      {
        "name": {
          "ko": "고스트 떡볶이 (보통맛 / 매운맛)",
          "en": "Ghost Tteokbokki (Regular / Very spicy)",
          "zh": "幽灵辣炒年糕(普通 / 特辣)",
          "ja": "ゴーストトッポッキ(普通 / 激辛)",
          "vi": "Bánh gạo cay Ghost (bình thường / rất cay)"
        },
        "desc": {
          "ko": "라면사리 추가 +30,000₫",
          "en": "Add ramen noodles +30,000₫",
          "zh": "加泡面 +30,000₫",
          "ja": "ラーメン追加 +30,000₫",
          "vi": "Thêm mì tôm +30.000₫"
        },
        "price": 300000,
        "tag": "best",
        "spicy": true,
        "photo": "img/tk1.jpg",
        "photos": [
          "img/tk1.jpg"
        ]
      },
      {
        "name": {
          "ko": "매콤 달콤 느끼 로제 떡볶이",
          "en": "Rose Tteokbokki",
          "zh": "香辣甜奶香玫瑰酱辣炒年糕",
          "ja": "ピリ辛甘濃厚ロゼトッポッキ",
          "vi": "Bánh gạo cay sốt rosé"
        },
        "price": 300000,
        "photo": "img/ro1.jpg",
        "photos": [
          "img/ro1.jpg"
        ]
      },
      {
        "name": {
          "ko": "모듬튀김",
          "en": "Assorted Fried Food",
          "zh": "什锦炸物",
          "ja": "揚げ物盛り合わせ",
          "vi": "Set chiên thập cẩm"
        },
        "price": 250000,
        "photo": "img/mf1.jpg",
        "photos": [
          "img/mf1.jpg"
        ]
      },
      {
        "name": {
          "ko": "게살 튀김",
          "en": "Fried Crab Meat",
          "zh": "炸蟹肉",
          "ja": "カニ身フライ",
          "vi": "Thịt ghẹ chiên"
        },
        "price": 200000,
        "unit": "8PC"
      },
      {
        "name": {
          "ko": "새우 튀김",
          "en": "Fried Shrimp",
          "zh": "炸虾",
          "ja": "エビフライ",
          "vi": "Tôm chiên"
        },
        "price": 120000,
        "unit": "5PC"
      },
      {
        "name": {
          "ko": "오징어 튀김 추가",
          "en": "Add Fried Squid",
          "zh": "加炸鱿鱼",
          "ja": "イカフライ追加",
          "vi": "Thêm mực chiên"
        },
        "price": 40000,
        "unit": "3PC"
      },
      {
        "name": {
          "ko": "김말이 추가",
          "en": "Add Fried Seaweed Rolls",
          "zh": "加紫菜卷炸物",
          "ja": "韓国のり巻き揚げ追加",
          "vi": "Thêm miến cuộn"
        },
        "price": 40000,
        "unit": "5PC"
      },
      {
        "name": {
          "ko": "고구마 튀김 추가",
          "en": "Add Fried Sweet Potato",
          "zh": "加炸红薯",
          "ja": "さつまいも揚げ追加",
          "vi": "Thêm khoai lang chiên"
        },
        "price": 30000,
        "unit": "2PC"
      }
    ]
  },
  {
    "id": "snack",
    "name": {
      "ko": "마른 안주",
      "en": "Dry Snacks",
      "zh": "干货下酒菜",
      "ja": "乾き物おつまみ",
      "vi": "Đồ nhắm khô"
    },
    "items": [
      {
        "name": {
          "ko": "반건조 오징어",
          "en": "Semi-dried Squid",
          "zh": "半干鱿鱼",
          "ja": "半乾燥スルメイカ",
          "vi": "Mực bán khô"
        },
        "price": 250000,
        "photo": "img/sn1.jpg",
        "photos": [
          "img/sn1.jpg"
        ]
      },
      {
        "name": {
          "ko": "한치 & 쥐포",
          "en": "Dried Squid & Filefish",
          "zh": "小鱿鱼干 & 马面鱼干",
          "ja": "ヤリイカ干し & カワハギ干し",
          "vi": "Mực và cá bò khô"
        },
        "price": 250000,
        "photo": "img/sn2.jpg",
        "photos": [
          "img/sn2.jpg"
        ]
      },
      {
        "name": {
          "ko": "쥐포",
          "en": "Dried Filefish",
          "zh": "马面鱼干",
          "ja": "カワハギ干し",
          "vi": "Cá bò nướng"
        },
        "price": 200000,
        "photo": "img/sn3.jpg",
        "photos": [
          "img/sn3.jpg"
        ]
      },
      {
        "name": {
          "ko": "아귀포",
          "en": "Dried Monkfish",
          "zh": "安康鱼干",
          "ja": "アンコウ干し",
          "vi": "Cá chày nướng"
        },
        "price": 200000,
        "photo": "img/sn4.jpg",
        "photos": [
          "img/sn4.jpg"
        ]
      },
      {
        "name": {
          "ko": "오다리",
          "en": "Yellow Squid Legs",
          "zh": "鱿鱼腿干",
          "ja": "イカ足の干物",
          "vi": "Râu mực đen"
        },
        "price": 200000,
        "photo": "img/sn5.jpg",
        "photos": [
          "img/sn5.jpg"
        ]
      },
      {
        "name": {
          "ko": "황도",
          "en": "Yellow Peach",
          "zh": "黄桃",
          "ja": "黄桃",
          "vi": "Đào ngâm"
        },
        "price": 200000,
        "photo": "img/sn6.jpg",
        "photos": [
          "img/sn6.jpg"
        ]
      },
      {
        "name": {
          "ko": "파인애플 샤베트",
          "en": "Pineapple Sherbet",
          "zh": "菠萝冰沙",
          "ja": "パイナップルシャーベット",
          "vi": "Kem dứa"
        },
        "price": 150000,
        "photo": "img/sn7.jpg",
        "photos": [
          "img/sn7.jpg"
        ]
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
          "ko": "참이슬",
          "en": "Chamisul",
          "zh": "真露 Chamisul",
          "ja": "チャミスル",
          "vi": "Chamisul"
        },
        "desc": {
          "ko": "살얼음 소주",
          "en": "Slushy soju",
          "zh": "冰镇烧酒",
          "ja": "シャーベット焼酎",
          "vi": "Soju đá bào"
        },
        "price": 150000
      },
      {
        "name": {
          "ko": "진로",
          "en": "Jinro",
          "zh": "Jinro",
          "ja": "ジンロ",
          "vi": "Jinro"
        },
        "desc": {
          "ko": "살얼음 소주",
          "en": "Slushy soju",
          "zh": "冰镇烧酒",
          "ja": "シャーベット焼酎",
          "vi": "Soju đá bào"
        },
        "price": 150000
      },
      {
        "name": {
          "ko": "새로",
          "en": "Saero",
          "zh": "Saero 烧酒",
          "ja": "セロ",
          "vi": "Saero"
        },
        "desc": {
          "ko": "살얼음 소주",
          "en": "Slushy soju",
          "zh": "冰镇烧酒",
          "ja": "シャーベット焼酎",
          "vi": "Soju đá bào"
        },
        "price": 150000
      },
      {
        "name": {
          "ko": "선양",
          "en": "Sunyang",
          "zh": "Sunyang",
          "ja": "ソニャン",
          "vi": "Sunyang"
        },
        "desc": {
          "ko": "살얼음 소주",
          "en": "Slushy soju",
          "zh": "冰镇烧酒",
          "ja": "シャーベット焼酎",
          "vi": "Soju đá bào"
        },
        "price": 160000
      },
      {
        "name": {
          "ko": "선양오크",
          "en": "Sunyang Oak",
          "zh": "Sunyang Oak",
          "ja": "ソニャンオーク",
          "vi": "Sunyang Oak"
        },
        "desc": {
          "ko": "살얼음 소주",
          "en": "Slushy soju",
          "zh": "冰镇烧酒",
          "ja": "シャーベット焼酎",
          "vi": "Soju đá bào"
        },
        "price": 170000
      },
      {
        "name": {
          "ko": "타이거",
          "en": "Tiger",
          "zh": "虎牌",
          "ja": "タイガー",
          "vi": "Tiger"
        },
        "desc": {
          "ko": "맥주",
          "en": "Beer",
          "zh": "啤酒",
          "ja": "ビール",
          "vi": "Bia"
        },
        "price": 60000
      },
      {
        "name": {
          "ko": "타이거 크리스탈",
          "en": "Tiger Crystal",
          "zh": "虎牌水晶",
          "ja": "タイガークリスタル",
          "vi": "Tiger Crystal"
        },
        "desc": {
          "ko": "맥주",
          "en": "Beer",
          "zh": "啤酒",
          "ja": "ビール",
          "vi": "Bia"
        },
        "price": 60000
      },
      {
        "name": {
          "ko": "사이공",
          "en": "Saigon",
          "zh": "西贡",
          "ja": "サイゴン",
          "vi": "Saigon"
        },
        "desc": {
          "ko": "맥주",
          "en": "Beer",
          "zh": "啤酒",
          "ja": "ビール",
          "vi": "Bia"
        },
        "price": 60000
      },
      {
        "name": {
          "ko": "원조 살얼음 생맥주",
          "en": "Original Slushy Draft Beer",
          "zh": "元祖冰沙生啤",
          "ja": "元祖シャーベット生ビール",
          "vi": "Bia tươi đá bào"
        },
        "desc": {
          "ko": "생맥주",
          "en": "Draft beer",
          "zh": "生啤",
          "ja": "生ビール",
          "vi": "Bia tươi"
        },
        "price": 70000,
        "tag": "best"
      },
      {
        "name": {
          "ko": "콜라 / 사이다",
          "en": "Coca / Sprite",
          "zh": "可乐 / 雪碧",
          "ja": "コーラ / サイダー",
          "vi": "Coca / Sprite"
        },
        "price": 20000
      }
    ]
  }
];
