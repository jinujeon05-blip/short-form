import type { Lang } from '../i18n';

/** Korean folk lean of a conception-dream symbol (속설). */
export type Lean = 'boy' | 'girl' | 'either';

export interface TaemongSymbol {
  /** Dream page this symbol links to */
  slug: string;
  emoji: string;
  lean: Lean;
  ko: { name: string; meaning: string };
  vi: { name: string; meaning: string };
}

const S = (slug: string, emoji: string, lean: Lean, koName: string, ko: string, viName: string, vi: string): TaemongSymbol =>
  ({ slug, emoji, lean, ko: { name: koName, meaning: ko }, vi: { name: viName, meaning: vi } });

export const TAEMONG: TaemongSymbol[] = [
  S('dragon', '🐉', 'boy', '용', '하늘로 오르는 용은 크게 출세할 아이. 가장 손꼽히는 태몽입니다.', 'Rồng', 'Rồng bay lên trời: đứa trẻ sẽ thành đạt lớn — giấc mơ báo con được quý nhất.'),
  S('tiger', '🐅', 'boy', '호랑이', '용맹하고 지도력 있는 아이. 호랑이가 품에 안기면 큰 인물이 된다고 봅니다.', 'Hổ', 'Đứa trẻ dũng cảm, có tài lãnh đạo; hổ nhảy vào lòng là sẽ thành người lớn.'),
  S('sun', '☀️', 'boy', '해', '해를 품거나 삼키는 꿈은 이름을 널리 떨칠 귀한 아이.', 'Mặt trời', 'Ôm hay nuốt mặt trời: đứa con quý, danh tiếng vang xa.'),
  S('bear', '🐻', 'boy', '곰', '듬직하고 건강한 아이. 단군 신화의 웅녀처럼 끈기 있는 아이로도 풉니다.', 'Gấu', 'Đứa trẻ khỏe mạnh, vững vàng; như chuyện nàng gấu trong thần thoại Dangun.'),
  S('lion', '🦁', 'boy', '사자', '당당하고 리더십 있는 아이.', 'Sư tử', 'Đứa trẻ đường hoàng, có khí chất lãnh đạo.'),
  S('turtle', '🐢', 'boy', '거북', '오래 살고 복을 누리는 아이. 큰 거북은 아들이라는 속설이 많습니다.', 'Rùa', 'Đứa trẻ sống thọ, hưởng phúc; rùa lớn thường được nói là con trai.'),
  S('rock', '🪨', 'boy', '바위', '큰 바위를 안으면 든든하고 큰 인물이 될 아이.', 'Tảng đá', 'Ôm tảng đá lớn: đứa trẻ vững vàng, thành người lớn.'),
  S('moon', '🌕', 'girl', '달', '밝은 달을 품으면 곱고 지혜로운 딸이라는 속설이 대표적입니다.', 'Trăng', 'Ôm vầng trăng sáng: người Hàn hay nói là con gái xinh đẹp, thông minh.'),
  S('flower', '🌸', 'girl', '꽃', '활짝 핀 꽃을 꺾거나 받으면 예쁜 딸. 꽃이 클수록 귀한 아이로 봅니다.', 'Hoa', 'Hái hay được tặng hoa nở: thường là con gái xinh xắn; hoa càng to càng quý.'),
  S('butterfly', '🦋', 'girl', '나비', '고운 나비가 날아들면 예쁘고 사랑받는 딸.', 'Bướm', 'Bướm đẹp bay vào: con gái xinh, được yêu thương.'),
  S('rabbit', '🐇', 'girl', '토끼', '흰 토끼는 순하고 영리한 아이, 딸이라는 속설이 많습니다.', 'Thỏ', 'Thỏ trắng: đứa trẻ hiền, lanh lợi; thường được nói là con gái.'),
  S('gold', '💍', 'girl', '금·보석', '금가락지나 보석을 받으면 귀하게 자랄 딸. 금덩이는 재물복 있는 아이로 봅니다.', 'Vàng, đá quý', 'Được nhẫn vàng, đá quý: con gái được nâng niu; thỏi vàng là đứa trẻ có phúc tài lộc.'),
  S('lotus', '🪷', 'girl', '연꽃', '맑고 귀한 아이. 연꽃에서 다시 태어난 심청처럼 복을 타고난 아이.', 'Hoa sen', 'Đứa trẻ thanh khiết, quý giá — như cô Sim Cheong tái sinh từ hoa sen.'),
  S('snake', '🐍', 'either', '뱀', '큰 구렁이는 아들, 작고 고운 꽃뱀은 딸이라는 속설이 있습니다. 대표적인 태몽입니다.', 'Rắn', 'Người Hàn nói trăn lớn là con trai, rắn nhỏ sặc sỡ là con gái — giấc mơ báo con rất phổ biến.'),
  S('pig', '🐷', 'either', '돼지', '먹을 복·재물 복을 타고난 아이. 큰 돼지는 아들, 새끼 돼지는 딸이라고도 합니다.', 'Lợn', 'Đứa trẻ có phúc ăn, phúc tiền; lợn to là con trai, lợn con là con gái theo dân gian Hàn.'),
  S('fish', '🐟', 'either', '물고기·잉어', '큰 잉어는 아들, 작고 예쁜 물고기는 딸이라는 속설이 있습니다.', 'Cá, cá chép', 'Cá chép to là con trai, cá nhỏ đẹp là con gái theo dân gian Hàn.'),
  S('fruit', '🍑', 'either', '과일', '복숭아·사과·딸기는 딸, 밤·대추·고추는 아들이라는 속설이 있습니다.', 'Trái cây', 'Đào, táo, dâu là con gái; hạt dẻ, táo tàu, ớt là con trai theo dân gian Hàn.'),
  S('star', '⭐', 'either', '별', '빛나는 별을 받으면 총명하고 이름을 알릴 아이.', 'Ngôi sao', 'Nhận ngôi sao sáng: đứa trẻ thông minh, nổi tiếng.'),
  S('phoenix', '🔥', 'either', '봉황', '귀하고 고결한 아이. 봉(수컷)·황(암컷)이 함께 나오면 큰 경사입니다.', 'Phượng hoàng', 'Đứa trẻ cao quý; phượng (trống) và hoàng (mái) cùng xuất hiện là đại hỷ.'),
  S('crane', '🦢', 'either', '학', '품위 있고 오래 사는 아이.', 'Hạc', 'Đứa trẻ thanh cao, sống thọ.'),
  S('elephant', '🐘', 'either', '코끼리', '너그럽고 큰 그릇의 아이.', 'Voi', 'Đứa trẻ rộng lượng, có tầm vóc lớn.'),
  S('whale', '🐋', 'either', '고래', '큰 바다를 누비듯 크게 될 아이.', 'Cá voi', 'Đứa trẻ sẽ vươn xa như cá voi giữa biển lớn.'),
  S('deer', '🦌', 'either', '사슴', '온순하고 기품 있는 아이.', 'Hươu, nai', 'Đứa trẻ hiền lành, thanh lịch.'),
  S('giraffe', '🦒', 'either', '기린', '재주가 뛰어난 아이. 기린아(麒麟兒)라는 말처럼 귀하게 봅니다.', 'Hươu cao cổ (kỳ lân)', 'Đứa trẻ tài giỏi — người Hàn gọi trẻ tài là “kirin-a”.'),
  S('dolphin', '🐬', 'either', '돌고래', '밝고 총명하며 사람을 좋아하는 아이.', 'Cá heo', 'Đứa trẻ vui tươi, sáng dạ, quý người.'),
  S('squirrel', '🐿️', 'either', '다람쥐', '영리하고 재빠른 아이.', 'Sóc', 'Đứa trẻ lanh lợi, nhanh nhẹn.'),
  S('sheep', '🐑', 'either', '양', '순하고 정 많은 아이.', 'Cừu, dê', 'Đứa trẻ hiền, giàu tình cảm.'),
  S('bird', '🐦', 'either', '새', '작고 고운 새는 딸, 큰 새는 높이 날 아이로 풉니다.', 'Chim', 'Chim nhỏ đẹp là con gái, chim lớn là đứa trẻ bay cao.'),
  S('octopus', '🐙', 'either', '문어', '재주가 많고 손재주 좋은 아이.', 'Bạch tuộc', 'Đứa trẻ đa tài, khéo tay.'),
  S('mushroom', '🍄', 'either', '버섯', '쑥쑥 자라는 버섯처럼 건강하게 클 아이.', 'Nấm', 'Đứa trẻ lớn nhanh, khỏe mạnh như nấm.'),
  S('twins', '👶', 'either', '쌍둥이', '쌍둥이 꿈이나 같은 동물 두 마리는 쌍둥이·연년생 태몽으로 풀기도 합니다.', 'Song sinh', 'Mơ thấy song sinh hay hai con vật giống nhau: có khi báo sinh đôi.'),
];

interface TaemongText {
  eyebrow: string;
  title: string;
  lead: string;
  filters: Record<'all' | Lean, string>;
  leanTag: Record<Lean, string>;
  more: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  disclaimer: string;
  toNaming: string;
  toDream: string;
}

export const TAEMONG_TEXT: Record<Lang, TaemongText> = {
  ko: {
    eyebrow: '胎夢 · GIẤC MƠ BÁO CON',
    title: '태몽 모음 · 아들 태몽, 딸 태몽 속설과 베트남 풀이',
    lead: '용, 호랑이, 뱀, 돼지, 꽃, 달… 대표적인 태몽 31가지를 한 번에 정리했습니다. 한국에서 전해지는 아들·딸 속설과 베트남에서는 어떻게 보는지도 함께 확인하세요.',
    filters: { all: '전체', boy: '아들 속설', girl: '딸 속설', either: '둘 다' },
    leanTag: { boy: '아들 속설', girl: '딸 속설', either: '아들·딸 모두' },
    more: '자세히 →',
    faqTitle: '태몽, 이런 게 궁금해요',
    faq: [
      { q: '태몽은 꼭 엄마가 꾸나요?', a: '아닙니다. 아빠, 할머니, 이모, 가까운 친구가 대신 꾸기도 합니다. 한국에서는 "누가 꿨든 그 집 아이의 태몽"으로 보아, 가족 중 누군가가 꾼 특별한 꿈을 태몽으로 여깁니다.' },
      { q: '언제 꾸나요?', a: '임신 직전부터 임신 초기에 많이 꾼다고 합니다. 임신 사실을 알기 전에 꾼 생생한 꿈을 나중에 태몽이었다고 떠올리는 경우가 많습니다.' },
      { q: '아들·딸을 정말 맞히나요?', a: '태몽의 아들·딸 구분은 옛날부터 전해지는 속설일 뿐, 의학적으로 아이의 성별과는 관계가 없습니다. 같은 용꿈을 꾸고 딸을 낳는 경우도 아주 흔합니다. 재미로, 아이에게 들려줄 이야기로 간직하세요.' },
      { q: '태몽을 사고팔 수 있나요?', a: '한국에는 좋은 꿈을 사는 풍습이 있습니다. 삼국유사에는 문희가 언니 보희의 꿈을 비단 치마를 주고 사서 김춘추와 혼인해 왕비가 되었다는 이야기가 전합니다. 지금도 좋은 태몽을 꾼 사람에게 "그 꿈 나한테 팔아"라고 농담하곤 합니다.' },
      { q: '태몽이 없으면 안 좋은가요?', a: '전혀 그렇지 않습니다. 태몽을 기억하지 못하는 경우가 훨씬 많습니다. 태몽이 없다고 아이의 복이 줄어드는 것은 아닙니다.' },
      { q: '베트남에도 태몽이 있나요?', a: '베트남에서도 임신 전후의 꿈을 "giấc mơ báo mộng có thai(아이를 알리는 꿈)"라고 부르며 의미를 찾습니다. 용·호랑이처럼 힘센 동물은 아들, 꽃·달처럼 고운 것은 딸이라는 비슷한 속설이 있어, 한·베 가정에서 양가 어른들과 함께 이야기 나누기 좋은 주제입니다.' },
    ],
    disclaimer: '태몽 풀이와 아들·딸 구분은 전통 속설에 따른 재미·참고용입니다. 아이의 성별이나 미래를 예측하지 않습니다.',
    toNaming: '👶 한·베 아기 이름도 미리 검사해 보세요 →',
    toDream: '꿈해몽 200가지 전체 보기 →',
  },
  vi: {
    eyebrow: '胎夢 · GIẤC MƠ BÁO CON',
    title: 'Giấc mơ báo có thai · Mơ thấy gì sinh con trai, con gái?',
    lead: 'Rồng, hổ, rắn, lợn, hoa, trăng… 31 giấc mơ báo con phổ biến nhất, kèm quan niệm dân gian Hàn Quốc về con trai – con gái và cách người Việt hiểu.',
    filters: { all: 'Tất cả', boy: 'Con trai', girl: 'Con gái', either: 'Cả hai' },
    leanTag: { boy: 'Dân gian: con trai', girl: 'Dân gian: con gái', either: 'Trai hay gái đều được' },
    more: 'Xem thêm →',
    faqTitle: 'Những câu hỏi thường gặp',
    faq: [
      { q: 'Chỉ người mẹ mới mơ giấc mơ báo con?', a: 'Không. Người cha, bà, dì hay bạn thân cũng có thể mơ thay. Người Hàn gọi đó là “taemong” (태몽) và tin rằng ai mơ thì đó vẫn là giấc mơ của đứa bé trong nhà.' },
      { q: 'Thường mơ vào lúc nào?', a: 'Hay gặp ngay trước khi có thai hoặc những tuần đầu thai kỳ. Nhiều người chỉ nhận ra đó là giấc mơ báo con khi biết mình mang thai.' },
      { q: 'Có đoán đúng con trai hay con gái không?', a: 'Việc phân biệt trai – gái chỉ là quan niệm dân gian, không liên quan đến giới tính thật của em bé về mặt y học. Mơ thấy rồng mà sinh con gái là chuyện rất bình thường. Hãy giữ giấc mơ như một kỷ niệm để kể cho con nghe.' },
      { q: 'Có thể “mua” giấc mơ không?', a: 'Người Hàn có tục mua giấc mơ đẹp. Sách Tam quốc di sự kể cô Munhui đổi chiếc váy lụa lấy giấc mơ của chị gái, rồi lấy Kim Chunchu và trở thành hoàng hậu. Đến nay người Hàn vẫn đùa “bán giấc mơ đó cho tôi đi”.' },
      { q: 'Không có giấc mơ báo con thì sao?', a: 'Hoàn toàn không sao. Phần lớn mọi người không nhớ hay không có giấc mơ như vậy, và điều đó không làm phúc phần của bé ít đi.' },
      { q: 'Người Việt có quan niệm này không?', a: 'Có. Người Việt cũng tìm ý nghĩa giấc mơ báo mộng có thai; dân gian thường nói mơ thấy rồng, hổ là con trai, mơ thấy hoa, trăng là con gái — rất giống người Hàn. Đây là chủ đề thú vị để gia đình Việt – Hàn cùng trò chuyện với ông bà hai bên.' },
    ],
    disclaimer: 'Giải mộng và việc đoán con trai – con gái chỉ dựa trên quan niệm dân gian, để tham khảo cho vui; không dự đoán giới tính hay tương lai của em bé.',
    toNaming: '👶 Kiểm tra trước tên cho bé Việt – Hàn →',
    toDream: 'Xem tất cả 200 giấc mơ →',
  },
};
