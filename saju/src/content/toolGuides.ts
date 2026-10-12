import type { Lang } from '../i18n';

export type ToolGuideId = 'saju' | 'match' | 'calendar';

interface ToolGuide {
  title: string;
  sections: { h: string; p: string }[];
  /** Related guide articles (slugs in articles.json) */
  guides: string[];
}

export const TOOL_GUIDES: Record<ToolGuideId, { guides: string[] } & Record<Lang, Omit<ToolGuide, 'guides'>>> = {
  saju: {
    guides: ['saju-basics', 'nap-am-zodiac-element', '24-solar-terms'],
    ko: {
      title: '사주팔자, 이렇게 계산하고 읽습니다',
      sections: [
        { h: '사주팔자란?', p: '태어난 해·달·날·시를 각각 천간과 지지 두 글자로 나타낸 여덟 글자입니다. 연주는 집안과 어린 시절, 월주는 부모와 사회, 일주는 나와 배우자, 시주는 자녀와 말년을 본다고 전합니다. 그중 태어난 날의 천간(일간)이 "나"를 뜻해 풀이의 중심이 됩니다.' },
        { h: '월은 음력 1일이 아니라 절기로 바뀝니다', p: '사주의 달은 음력 초하루가 아니라 입춘·경칩 같은 24절기 중 "절"을 기준으로 바뀝니다. 해가 바뀌는 기준도 설날이 아니라 입춘(2월 4일 무렵)입니다. 명월은 절기 시각을 천문 계산으로 분 단위까지 구하므로, 절기 근처에 태어난 경우 결과 화면에 경고를 함께 보여 드립니다.' },
        { h: '태어난 곳과 시간이 중요한 이유', p: '같은 시각이라도 서울과 하노이는 표준시가 2시간 다르고, 실제 해의 위치(진태양시)도 다릅니다. 출생지를 고르면 그 나라의 표준시와 서머타임(한국 1987·1988년 등)을 반영하고, "고급 설정"에서 경도에 따른 진태양시 보정과 야자시·조자시 구분도 선택할 수 있습니다.' },
        { h: '태어난 시간을 모르면?', p: '시간을 모름으로 두면 시주를 뺀 여섯 글자로 풀이합니다. 일간과 월주가 성격과 흐름의 대부분을 보여 주므로 기본 풀이는 충분히 볼 수 있습니다. 대략의 시간대(예: 새벽, 저녁)만 알아도 12시진 중 하나를 골라 보세요.' },
        { h: '풀이는 이렇게 활용하세요', p: '사주는 정해진 운명이 아니라 타고난 기질과 시기의 흐름을 비유로 읽는 전통 문화입니다. 오행이 부족하다고 나쁜 것이 아니며, 좋은 해·나쁜 해 역시 준비할 때와 나아갈 때를 생각해 보는 계기로 삼으면 좋습니다.' },
      ],
    },
    vi: {
      title: 'Lá số Tứ trụ được tính và đọc như thế nào',
      sections: [
        { h: 'Tứ trụ (Bát tự) là gì?', p: 'Là tám chữ biểu thị năm, tháng, ngày, giờ sinh bằng Thiên can và Địa chi. Trụ năm nói về gia đình, tuổi thơ; trụ tháng về cha mẹ, xã hội; trụ ngày về bản thân và vợ chồng; trụ giờ về con cái, tuổi già. Thiên can của ngày sinh (Nhật chủ) tượng trưng cho “chính mình” và là trung tâm của lá số.' },
        { h: 'Tháng đổi theo tiết khí, không theo mùng 1', p: 'Tháng trong Tứ trụ đổi theo các “tiết” trong 24 tiết khí như Lập xuân, Kinh trập, không theo mùng 1 âm lịch. Năm cũng đổi ở Lập xuân (khoảng 4/2) chứ không phải Tết. Minh Nguyệt tính thời điểm tiết khí đến từng phút, nên nếu bạn sinh sát tiết khí, kết quả sẽ có lời nhắc.' },
        { h: 'Vì sao nơi sinh và giờ sinh quan trọng', p: 'Cùng một thời điểm nhưng Seoul và Hà Nội lệch 2 giờ múi giờ, vị trí Mặt Trời thật (giờ mặt trời thực) cũng khác. Chọn nơi sinh để áp dụng múi giờ và giờ mùa hè của nước đó; trong “Cài đặt nâng cao” có thể bật hiệu chỉnh giờ mặt trời theo kinh độ và tách giờ Tý sớm – muộn.' },
        { h: 'Không biết giờ sinh thì sao?', p: 'Chọn “không biết giờ” để xem lá số sáu chữ, bỏ trụ giờ. Nhật chủ và trụ tháng đã cho thấy phần lớn tính cách và vận trình. Nếu chỉ nhớ khoảng giờ (sáng sớm, buổi tối…), hãy chọn một trong 12 canh giờ gần nhất.' },
        { h: 'Nên dùng lá số thế nào', p: 'Tứ trụ không phải định mệnh cố định mà là cách văn hóa truyền thống ví von về tính cách bẩm sinh và nhịp vận. Thiếu một hành không có nghĩa là xấu; năm tốt hay xấu cũng chỉ là gợi ý lúc nào nên chuẩn bị, lúc nào nên tiến lên.' },
      ],
    },
  },
  match: {
    guides: ['nap-am-zodiac-element', 'saju-basics', 'vietnamese-zodiac-cat'],
    ko: {
      title: '궁합 점수는 이렇게 계산합니다',
      sections: [
        { h: '100점은 다섯 가지를 더한 점수입니다', p: '두 사람의 사주에서 ① 성향(일간끼리의 관계) 25점, ② 생활·정서(일지끼리의 합·충) 25점, ③ 띠 궁합(삼합·육합·충·형·해) 20점, ④ 납음오행의 상생·상극 15점, ⑤ 서로 부족한 오행을 채워 주는 정도 15점을 더합니다. 항목마다 왜 그 점수가 나왔는지 함께 보여 드립니다.' },
        { h: '띠 궁합만 보면 안 되는 이유', p: '흔히 쥐띠와 말띠는 상극이라고 하지만, 띠는 여덟 글자 중 한 글자일 뿐입니다. 일간이 서로를 살려 주거나 부족한 오행을 채워 준다면 띠가 충돌해도 전체 궁합은 좋게 나올 수 있습니다. 반대로 띠가 잘 맞아도 생활 리듬(일지)이 부딪히면 노력이 필요하다고 봅니다.' },
        { h: '한·베 국제커플 궁합', p: '베트남은 토끼띠 대신 고양이띠(Mão), 소띠 대신 물소띠를 쓰지만 같은 십이지라 궁합 계산은 똑같습니다. 다만 두 나라의 음력 날짜가 하루 다를 수 있어, 음력 생일로 입력한다면 태어난 나라의 음력을 기준으로 하세요. 양력 생일을 넣으면 가장 정확합니다.' },
        { h: '상대 생일을 모르면 초대 링크로', p: '내 정보만 넣고 초대 링크를 보내면, 상대가 자기 생일을 넣는 순간 두 사람의 궁합이 바로 나옵니다. 입력한 정보는 링크 안에만 담기고 서버에 저장되지 않습니다.' },
        { h: '점수보다 중요한 것', p: '궁합은 서로 다른 점을 이해하는 대화의 출발점으로 즐겨 주세요. 점수가 낮은 항목은 "조심할 부분", 높은 항목은 "서로를 살려 주는 부분"으로 읽으면 관계에 실제로 도움이 됩니다.' },
      ],
    },
    vi: {
      title: 'Điểm tuổi hợp được tính như thế nào',
      sections: [
        { h: '100 điểm là tổng của năm phần', p: 'Từ lá số của hai người: ① tính cách (quan hệ hai Nhật chủ) 25 điểm, ② sinh hoạt – tình cảm (hợp, xung của chi ngày) 25 điểm, ③ con giáp (tam hợp, lục hợp, xung, hình, hại) 20 điểm, ④ Ngũ hành nạp âm tương sinh – tương khắc 15 điểm, ⑤ mức bổ sung hành còn thiếu cho nhau 15 điểm. Mỗi phần đều có giải thích vì sao.' },
        { h: 'Vì sao không chỉ xem con giáp', p: 'Người ta hay nói Tý – Ngọ xung khắc, nhưng con giáp chỉ là một trong tám chữ. Nếu Nhật chủ tương sinh hay bù hành thiếu cho nhau, tổng điểm vẫn có thể cao dù con giáp xung. Ngược lại, con giáp hợp mà chi ngày xung thì vẫn cần cố gắng trong sinh hoạt.' },
        { h: 'Xem tuổi cho cặp đôi Việt – Hàn', p: 'Việt Nam dùng tuổi Mão (mèo) thay cho thỏ, trâu thay cho bò, nhưng vẫn là 12 con giáp nên cách tính như nhau. Âm lịch hai nước có thể lệch một ngày, vì vậy nếu nhập ngày sinh âm lịch hãy dùng âm lịch của nước nơi sinh; nhập ngày dương lịch là chính xác nhất.' },
        { h: 'Không biết ngày sinh của người ấy?', p: 'Chỉ cần nhập thông tin của bạn và gửi link mời; khi người kia nhập ngày sinh, kết quả hiện ra ngay. Thông tin chỉ nằm trong đường link, không lưu trên máy chủ.' },
        { h: 'Điều quan trọng hơn điểm số', p: 'Hãy xem tuổi hợp như điểm khởi đầu để hiểu sự khác biệt của nhau. Phần điểm thấp là “điều cần lưu ý”, phần điểm cao là “điều giúp nhau tỏa sáng”.' },
      ],
    },
  },
  calendar: {
    guides: ['choosing-good-days', 'korean-vietnamese-lunar-calendar', 'mung-1-and-ram'],
    ko: {
      title: '좋은 날은 이렇게 고릅니다',
      sections: [
        { h: '두 나라의 음력을 함께 보여 드립니다', p: '한국 음력은 한국 표준시(UTC+9), 베트남 음력은 베트남 표준시(UTC+7)를 기준으로 계산해, 초하루가 하루 다른 날도 정확히 표시합니다. 그래서 같은 양력 날짜라도 한국과 베트남의 음력 날짜, 설날, 손 없는 날이 다를 수 있습니다.' },
        { h: '황도일과 12직', p: '전통 택일에서는 그날을 맡은 별이 황도(좋은 날)인지 흑도(조심할 날)인지, 그리고 건·제·만·평·정·집·파·위·성·수·개·폐의 12직 중 어떤 날인지를 봅니다. 예를 들어 "성(成)"·"개(開)"는 일을 시작하기 좋고, "파(破)"는 큰일을 피하는 날로 봅니다.' },
        { h: '한국의 손 없는 날, 베트남의 Tam Nương', p: '한국에서는 이사·개업 때 음력 9·10·19·20·29·30일의 "손 없는 날"을 찾습니다. 베트남에서는 음력 3·7·13·18·22·27일 Tam Nương과 5·14·23일 Nguyệt Kỵ를 피합니다. 명월 달력은 두 기준을 함께 표시합니다.' },
        { h: '목적별로 골라 보세요', p: '이사, 결혼, 개업, 계약, 여행, 착공, 차 구입, 머리 자르기 등 목적을 고르면 그 일에 맞는 12직과 띠별 충을 반영해 앞으로 좋은 날을 추려 드립니다. 내 띠를 넣으면 나와 충하는 날도 걸러 줍니다.' },
        { h: '택일, 이렇게 활용하세요', p: '좋은 날은 마음을 정하고 준비를 시작하는 계기로 쓰면 좋습니다. 가족 일정이나 날씨, 실제 사정을 우선하고, 날짜를 바꾸기 어렵다면 좋은 시간(황도시)을 골라 중요한 연락이나 출발을 맞춰 보세요.' },
      ],
    },
    vi: {
      title: 'Cách chọn ngày tốt',
      sections: [
        { h: 'Hiển thị song song âm lịch hai nước', p: 'Âm lịch Hàn tính theo giờ Hàn Quốc (UTC+9), âm lịch Việt theo giờ Việt Nam (UTC+7), nên những ngày mùng 1 lệch nhau cũng được hiển thị chính xác. Vì vậy cùng một ngày dương lịch, ngày âm, Tết hay ngày tốt của hai nước có thể khác nhau.' },
        { h: 'Ngày Hoàng đạo và 12 Trực', p: 'Xem ngày truyền thống dựa vào sao chủ ngày là Hoàng đạo (tốt) hay Hắc đạo (cần cẩn thận), và ngày thuộc trực nào trong 12 trực Kiến, Trừ, Mãn, Bình, Định, Chấp, Phá, Nguy, Thành, Thu, Khai, Bế. Ví dụ trực Thành, Khai tốt để khởi sự; trực Phá nên tránh việc lớn.' },
        { h: 'Tam Nương của Việt Nam, “ngày không có Son” của Hàn Quốc', p: 'Người Việt tránh ngày Tam Nương (mùng 3, 7, 13, 18, 22, 27 âm lịch) và Nguyệt Kỵ (mùng 5, 14, 23). Người Hàn khi chuyển nhà, khai trương lại tìm “ngày không có Son” (son eomneun nal) — mùng 9, 10, 19, 20, 29, 30 âm lịch. Lịch Minh Nguyệt hiển thị cả hai.' },
        { h: 'Chọn theo việc cần làm', p: 'Chọn mục đích như chuyển nhà, cưới hỏi, khai trương, ký hợp đồng, xuất hành, động thổ, mua xe, cắt tóc… để lọc những ngày tốt sắp tới theo trực phù hợp và tuổi xung. Nhập tuổi của bạn để loại cả những ngày xung với mình.' },
        { h: 'Dùng ngày tốt thế nào cho hợp lý', p: 'Hãy xem ngày tốt như dịp để quyết tâm và bắt đầu chuẩn bị. Ưu tiên lịch gia đình, thời tiết và hoàn cảnh thực tế; nếu khó đổi ngày, hãy chọn giờ hoàng đạo để liên lạc quan trọng hay xuất phát.' },
      ],
    },
  },
};
