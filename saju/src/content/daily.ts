// Text for the daily zodiac fortune pages. All wording is original.
import type { Lang } from '../i18n';
import type { Relation } from '../engine/fortune';

type Level = 1 | 2 | 3 | 4 | 5;

interface DailyText {
  indexTitle: string;
  indexDesc: string;
  zodiacTitle: (animal: string) => string;
  zodiacDesc: (animal: string) => string;
  dateLine: (y: number, m: number, d: number, wd: string, lunar: string) => string;
  yesterday: string;
  today: string;
  tomorrow: string;
  ranking: string;
  dayPillar: string;
  relation: Record<Relation, string>;
  health: Record<Level, string>;
  luckyHours: string;
  cautionHour: string;
  luckyColor: string;
  luckyNumber: string;
  luckyDirection: string;
  week: string;
  byYear: string;
  yearLabel: (y: number) => string;
  lines: [string[], string[], string[]];
  detail: string;
  others: string;
  yearlyCta: string;
  homeLink: string;
  disclaimer: string;
}

export const DAILY: Record<Lang, DailyText> = {
  ko: {
    indexTitle: '오늘의 띠별 운세',
    indexDesc: '매일 바뀌는 12띠 운세 순위와 띠별·출생연도별 오늘의 운세를 무료로 확인하세요. 오늘의 일진과 내 띠의 합·충 관계로 풀이합니다.',
    zodiacTitle: (a) => `오늘의 ${a}띠 운세`,
    zodiacDesc: (a) => `${a}띠 오늘의 운세: 총운, 애정·재물·일·건강운, 행운의 시간과 색, 출생연도별 한 줄 운세, 일주일 흐름까지 매일 새로 풀어 드립니다.`,
    dateLine: (y, m, d, wd, lunar) => `${y}년 ${m}월 ${d}일 (${wd}) · 음력 ${lunar}`,
    yesterday: '← 어제',
    today: '오늘',
    tomorrow: '내일 →',
    ranking: '오늘의 띠별 운세 순위',
    dayPillar: '오늘의 일진',
    relation: {
      sixHarmony: '오늘의 일진과 육합(六合)을 이룹니다. 사람 운이 따르는 날입니다.',
      threeHarmony: '오늘의 일진과 삼합(三合)으로 손발이 맞습니다. 함께하는 일이 잘 풀립니다.',
      same: '오늘은 내 띠와 같은 지지의 날입니다. 내 페이스를 지키면 무난합니다.',
      neutral: '오늘의 일진과 특별한 합·충이 없습니다. 평소대로가 가장 좋습니다.',
      harm: '오늘의 일진과 해(害)가 있어 작은 오해가 생기기 쉽습니다.',
      punish: '오늘의 일진과 형(刑)이 있어 규칙과 절차를 잘 지켜야 합니다.',
      clash: '오늘의 일진과 충(沖)하는 날입니다. 이동과 큰 결정은 신중하게 하세요.',
    },
    health: {
      5: '몸이 가볍고 컨디션이 좋습니다. 가벼운 운동을 시작하기 좋아요.',
      4: '활력이 있는 날, 규칙적인 식사만 챙기면 충분합니다.',
      3: '무리하지 않으면 무난합니다. 물을 자주 마시세요.',
      2: '피로가 쌓이기 쉽습니다. 일찍 쉬는 것이 좋습니다.',
      1: '다치거나 체하기 쉬운 날, 운전과 과식을 조심하세요.',
    },
    luckyHours: '행운의 시간',
    cautionHour: '조심할 시간',
    luckyColor: '행운의 색',
    luckyNumber: '행운의 숫자',
    luckyDirection: '좋은 방향',
    week: '앞으로 7일 흐름',
    byYear: '출생연도별 오늘의 운세',
    yearLabel: (y) => `${String(y).slice(2)}년생`,
    lines: [
      [
        '말 한마디가 오해를 부를 수 있으니 한 템포 쉬어 가세요.',
        '서두르면 놓치는 것이 생깁니다. 확인 또 확인.',
        '지출이 늘기 쉬운 날, 지갑을 닫아 두세요.',
        '오늘은 부탁보다 거절이 필요한 날입니다.',
        '몸이 보내는 신호를 무시하지 마세요.',
        '약속 시간과 장소를 한 번 더 확인하세요.',
        '남의 일에 끼어들면 손해가 납니다.',
        '큰 결정은 내일로 미루는 것이 이득입니다.',
      ],
      [
        '평소 하던 일을 꾸준히 하면 성과가 보입니다.',
        '오랜 친구에게 안부를 전하면 좋은 소식이 옵니다.',
        '정리하지 못한 일을 마무리하기 좋은 날입니다.',
        '작은 친절이 돌아오는 하루입니다.',
        '계획을 세우기 좋은 날, 메모를 남겨 두세요.',
        '가족과의 대화에서 힌트를 얻습니다.',
        '무리하지 않으면 무난하게 지나갑니다.',
        '산책이 생각을 정리해 줍니다.',
      ],
      [
        '기다리던 연락이 옵니다. 반갑게 받으세요.',
        '뜻밖의 수입이나 선물이 생깁니다.',
        '윗사람의 도움으로 일이 쉽게 풀립니다.',
        '새로운 시작에 좋은 날, 망설이지 마세요.',
        '귀인을 만나는 날, 먼저 손을 내미세요.',
        '노력한 만큼 인정받습니다.',
        '마음먹은 일이 술술 풀립니다.',
        '좋은 사람과의 식사가 행운을 부릅니다.',
      ],
    ],
    detail: '자세히 보기',
    others: '다른 띠 오늘의 운세',
    yearlyCta: '2027 신년운세 보기',
    homeLink: '띠별 운세 자세히 보기',
    disclaimer: '띠별 운세는 오늘의 일진과 띠의 합·충 관계에 따른 재미·참고용 풀이입니다.',
  },
  vi: {
    indexTitle: 'Tử vi hôm nay 12 con giáp',
    indexDesc: 'Xem tử vi hằng ngày miễn phí: bảng xếp hạng 12 con giáp, vận trình theo từng tuổi và năm sinh. Luận theo can chi ngày và quan hệ hợp – xung với tuổi của bạn.',
    zodiacTitle: (a) => `Tử vi hôm nay tuổi ${a}`,
    zodiacDesc: (a) => `Tử vi hằng ngày tuổi ${a}: tổng quan, tình cảm, tài lộc, công việc, sức khỏe, giờ tốt, màu may mắn, luận theo năm sinh và xu hướng 7 ngày tới.`,
    dateLine: (y, m, d, wd, lunar) => `${wd}, ${d}/${m}/${y} · Âm lịch ${lunar}`,
    yesterday: '← Hôm qua',
    today: 'Hôm nay',
    tomorrow: 'Ngày mai →',
    ranking: 'Xếp hạng tử vi hôm nay',
    dayPillar: 'Can chi ngày',
    relation: {
      sixHarmony: 'Ngày này Lục hợp với tuổi bạn — có quý nhân, nhân duyên tốt.',
      threeHarmony: 'Ngày này Tam hợp với tuổi bạn — làm việc nhóm thuận lợi.',
      same: 'Ngày trùng chi với tuổi bạn — giữ nhịp riêng là ổn.',
      neutral: 'Ngày không hợp không xung — cứ bình thường là tốt nhất.',
      harm: 'Ngày Tương hại với tuổi bạn — dễ có hiểu lầm nhỏ.',
      punish: 'Ngày Tương hình với tuổi bạn — nên làm đúng quy trình, giấy tờ.',
      clash: 'Ngày xung với tuổi bạn — cẩn thận khi đi lại, việc lớn nên cân nhắc.',
    },
    health: {
      5: 'Cơ thể nhẹ nhõm, tinh thần sảng khoái. Hợp để bắt đầu tập thể dục.',
      4: 'Tràn đầy năng lượng, chỉ cần ăn uống điều độ.',
      3: 'Không quá sức thì mọi việc ổn. Nhớ uống đủ nước.',
      2: 'Dễ mệt mỏi, nên nghỉ ngơi sớm.',
      1: 'Dễ va chạm hay đau bụng — cẩn thận khi lái xe và ăn uống.',
    },
    luckyHours: 'Giờ tốt',
    cautionHour: 'Giờ cần cẩn thận',
    luckyColor: 'Màu may mắn',
    luckyNumber: 'Số may mắn',
    luckyDirection: 'Hướng tốt',
    week: 'Xu hướng 7 ngày tới',
    byYear: 'Tử vi hôm nay theo năm sinh',
    yearLabel: (y) => `Sinh năm ${y}`,
    lines: [
      [
        'Một câu nói vô tình dễ gây hiểu lầm — chậm lại một nhịp.',
        'Vội vàng dễ sót việc, hãy kiểm tra kỹ.',
        'Dễ chi tiêu quá tay, nên giữ chặt ví.',
        'Hôm nay nên biết từ chối hơn là nhận lời.',
        'Đừng bỏ qua tín hiệu mệt mỏi của cơ thể.',
        'Xác nhận lại giờ hẹn và địa điểm.',
        'Xen vào chuyện người khác dễ thiệt thòi.',
        'Việc lớn nên để sang ngày mai.',
      ],
      [
        'Kiên trì việc quen thuộc sẽ thấy kết quả.',
        'Hỏi thăm bạn cũ sẽ nhận tin vui.',
        'Ngày tốt để hoàn tất việc còn dang dở.',
        'Một việc tốt nhỏ sẽ được đền đáp.',
        'Hợp lên kế hoạch, hãy ghi chú lại.',
        'Trò chuyện với gia đình mang lại gợi ý hay.',
        'Không quá sức thì mọi việc êm xuôi.',
        'Đi dạo giúp đầu óc thông thoáng.',
      ],
      [
        'Tin nhắn mong chờ sẽ đến — hãy vui vẻ đón nhận.',
        'Có khoản thu hoặc món quà bất ngờ.',
        'Được cấp trên giúp đỡ, việc dễ dàng hơn.',
        'Ngày tốt để khởi đầu, đừng ngần ngại.',
        'Gặp quý nhân — hãy chủ động bắt chuyện.',
        'Công sức bỏ ra được ghi nhận xứng đáng.',
        'Việc dự định trôi chảy như ý.',
        'Bữa ăn với người tốt mang lại may mắn.',
      ],
    ],
    detail: 'Xem chi tiết',
    others: 'Tử vi hôm nay các tuổi khác',
    yearlyCta: 'Xem tử vi 2027',
    homeLink: 'Xem chi tiết tử vi hôm nay',
    disclaimer: 'Tử vi hằng ngày luận theo can chi ngày và quan hệ hợp – xung của con giáp, chỉ mang tính tham khảo, giải trí.',
  },
};
