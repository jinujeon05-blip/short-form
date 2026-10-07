import type { Lang } from '../i18n';

/** Names whose default conversion gives the historically used hanja (checked in names.test.ts). */
export const FAMOUS_NAMES = ['Hồ Chí Minh', 'Trần Hưng Đạo', 'Lý Long Tường', 'Võ Nguyên Giáp'] as const;

/** Most common Vietnamese surnames, roughly by frequency. */
export const TOP_SURNAMES = [
  'Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng',
  'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý', 'Đinh', 'Trịnh', 'Trương', 'Lâm',
];

interface NameGuide {
  famousTitle: string;
  famousDesc: string;
  famousNote: Record<(typeof FAMOUS_NAMES)[number], string>;
  surTitle: string;
  surDesc: string;
  colVi: string;
  colHanja: string;
  colKo: string;
  lyTitle: string;
  ly: string[];
  faqTitle: string;
  faq: { q: string; a: string }[];
}

export const NAME_GUIDE: Record<Lang, NameGuide> = {
  ko: {
    famousTitle: '베트남 유명인의 한국식 이름',
    famousDesc: '베트남 이름은 대부분 한자어라서 같은 한자를 한국 한자음으로 읽으면 한국식 이름이 됩니다. 이름을 누르면 위 변환기에서 바로 볼 수 있습니다.',
    famousNote: {
      'Hồ Chí Minh': '베트남 건국의 아버지. 한국에서는 "호찌민"으로 많이 부르지만 한자로 읽으면 호지명(胡志明)입니다.',
      'Trần Hưng Đạo': '13세기 몽골(원)의 침략을 물리친 쩐 왕조의 명장. 베트남의 이순신이라 할 만한 인물입니다.',
      'Lý Long Tường': '고려로 건너와 화산 이씨의 시조가 된 리 왕조의 왕자. 한국 이름은 이용상(李龍祥)입니다.',
      'Võ Nguyên Giáp': '디엔비엔푸 전투를 이끈 장군. 한국 한자음으로는 무원갑(武元甲)입니다.',
    },
    surTitle: '베트남 성씨, 한국 한자음으로는?',
    surDesc: '베트남 사람 열에 네 명 가까이가 쓰는 Nguyễn(阮)은 한국어로 "완"입니다. Hoàng과 Huỳnh, Vũ와 Võ는 같은 한자를 북부·남부에서 다르게 읽는 것입니다. 성의 첫소리에는 두음법칙이 적용되어 李는 "리"가 아니라 "이", 林은 "임"이 됩니다.',
    colVi: '베트남 성',
    colHanja: '한자',
    colKo: '한국 한자음',
    lyTitle: '800년 전 한국으로 온 베트남 왕자, 이용상',
    ly: [
      '1226년 베트남 리(Lý) 왕조가 쩐(Trần) 왕조로 넘어가자, 리 왕조의 왕자 Lý Long Tường(李龍祥)은 화를 피해 바다를 건너 고려 황해도 옹진에 닿았습니다.',
      '그는 몽골군의 침입 때 고려를 도와 싸웠고, 고려 왕실은 그에게 화산군(花山君)이라는 작위를 내렸습니다. 그의 후손이 오늘날 한국의 화산 이씨(花山 李氏)입니다.',
      '같은 한자 李龍祥을 베트남에서는 Lý Long Tường, 한국에서는 이용상으로 읽습니다. 한자를 함께 쓰는 두 나라의 이름 변환이 가능한 이유를 잘 보여 주는 이야기입니다. 화산 이씨 후손들은 지금도 베트남을 찾아 조상의 고향과 교류하고 있습니다.',
    ],
    faqTitle: '자주 묻는 질문',
    faq: [
      { q: '성조(dấu) 없이 입력해도 되나요?', a: '됩니다. "Nguyen Minh Anh"처럼 입력해도 가장 흔한 이름 한자를 찾아 줍니다. 다만 성조가 있으면 Hùng(雄)과 Hưng(興)처럼 헷갈리기 쉬운 이름을 더 정확히 구분합니다.' },
      { q: 'Thị, Văn은 왜 빼나요?', a: 'Thị(氏)는 여성, Văn(文)은 남성 이름에 흔히 들어가는 가운데 이름이라, 한국식 세 글자 이름으로 만들 때 보통 뺍니다. 체크를 풀면 넣어서 보여 줍니다.' },
      { q: '한자가 여러 개 나오면 어떻게 고르나요?', a: '같은 소리를 내는 한자가 여럿일 때는 후보 버튼이 나옵니다. 부모님이 지어 주신 한자를 알면 그 한자를 고르고, 모르면 뜻이 마음에 드는 한자를 고르세요.' },
      { q: '외국인 등록증이나 여권에 이 이름을 써도 되나요?', a: '공식 서류에는 여권의 로마자 이름을 그대로 써야 합니다. 이 변환은 한국 친구나 동료에게 소개하거나 애칭으로 쓰는 용도로 즐겨 주세요.' },
    ],
  },
  vi: {
    famousTitle: 'Tên tiếng Hàn của người Việt nổi tiếng',
    famousDesc: 'Phần lớn tên Việt là chữ Hán, nên đọc cùng chữ Hán theo âm Hàn là ra tên tiếng Hàn. Bấm vào tên để xem ngay ở công cụ phía trên.',
    famousNote: {
      'Hồ Chí Minh': 'Người Hàn thường gọi là “호찌민” (Hojjimin) theo cách phát âm, nhưng đọc theo chữ Hán 胡志明 thì là 호지명 (Ho Ji-myeong).',
      'Trần Hưng Đạo': 'Vị tướng đánh bại quân Mông – Nguyên thế kỷ XIII, có thể ví như Lý Thuấn Thần (이순신) của Hàn Quốc.',
      'Lý Long Tường': 'Hoàng tử nhà Lý sang Cao Ly năm 1226, trở thành thủy tổ dòng họ Lý Hoa Sơn ở Hàn Quốc. Tên Hàn: 이용상.',
      'Võ Nguyên Giáp': 'Đại tướng chỉ huy chiến dịch Điện Biên Phủ. Đọc theo âm Hàn: 무원갑 (Mu Won-gap).',
    },
    surTitle: 'Họ của bạn trong tiếng Hàn là gì?',
    surDesc: 'Họ Nguyễn (阮) — gần 4 trên 10 người Việt mang họ này — trong tiếng Hàn đọc là “완” (Wan). Hoàng/Huỳnh và Vũ/Võ là cùng một chữ Hán, chỉ khác cách đọc Bắc – Nam. Tiếng Hàn có quy tắc âm đầu: 李 đọc là “이” (I/Lee) chứ không phải “리”, 林 là “임” (Lim).',
    colVi: 'Họ',
    colHanja: 'Chữ Hán',
    colKo: 'Tiếng Hàn',
    lyTitle: 'Hoàng tử Việt sang Hàn Quốc 800 năm trước — Lý Long Tường',
    ly: [
      'Năm 1226, khi nhà Trần thay nhà Lý, hoàng tử Lý Long Tường (李龍祥) vượt biển lánh nạn và cập bến Ongjin, đất Cao Ly (Hàn Quốc ngày nay).',
      'Ông giúp Cao Ly chống quân Mông Cổ và được phong tước Hoa Sơn quân (花山君). Con cháu ông ngày nay là dòng họ Lý Hoa Sơn (화산 이씨) ở Hàn Quốc.',
      'Cùng một tên chữ Hán 李龍祥: người Việt đọc là Lý Long Tường, người Hàn đọc là 이용상 (I Yong-sang) — đó chính là lý do có thể đổi tên giữa hai nước. Đến nay, hậu duệ họ Lý Hoa Sơn vẫn thường về Việt Nam thăm quê tổ.',
    ],
    faqTitle: 'Câu hỏi thường gặp',
    faq: [
      { q: 'Gõ không dấu được không?', a: 'Được. Gõ “Nguyen Minh Anh” vẫn ra chữ Hán thường dùng nhất. Nhưng có dấu sẽ phân biệt chính xác hơn những tên dễ nhầm như Hùng (雄) và Hưng (興).' },
      { q: 'Vì sao bỏ chữ Thị, Văn?', a: 'Thị (氏) và Văn (文) là tên đệm rất phổ biến, nên khi làm tên Hàn ba chữ người ta thường bỏ đi. Bỏ chọn ô này nếu muốn giữ lại.' },
      { q: 'Một âm có nhiều chữ Hán thì chọn thế nào?', a: 'Khi có nhiều chữ cùng âm, sẽ hiện nút chọn. Nếu biết chữ Hán bố mẹ đặt thì chọn chữ đó; nếu không, hãy chọn chữ có nghĩa bạn thích.' },
      { q: 'Có dùng tên này cho giấy tờ, visa được không?', a: 'Giấy tờ chính thức phải dùng tên trên hộ chiếu. Tên tiếng Hàn này để giới thiệu với bạn bè, đồng nghiệp người Hàn hoặc làm biệt danh cho vui.' },
    ],
  },
};
