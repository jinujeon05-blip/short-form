// Text for the per-purpose good-day pages (/calendar/<purpose>). All wording is original.
import type { Lang } from '../i18n';
import type { Purpose } from '../engine/almanac';

interface PurposeText {
  title: string;
  description: string;
  h1: string;
  intro: string;
  tips: string[];
}

interface PurposePageText {
  upcoming: string;
  upcomingDesc: string;
  none: string;
  rule: string;
  tipsTitle: string;
  more: string;
  pages: Record<Purpose, PurposeText>;
}

export const PURPOSE_TEXT: Record<Lang, PurposePageText> = {
  ko: {
    upcoming: '다가오는 좋은 날',
    upcomingDesc: '오늘부터 4개월 안에서 고른 날입니다. 위의 "내 출생 연도"를 넣으면 내 띠와 충하는 날은 빠집니다.',
    none: '조건에 맞는 날이 없습니다. 출생 연도를 지우거나 다른 달을 살펴보세요.',
    rule: '판단 기준: 황도일이면서 목적에 맞는 12직(建除滿平定執破危成收開閉)인 날. 베트남식 달력에서는 Tam Nương·Nguyệt Kỵ 날을 뺍니다.',
    tipsTitle: '알아 두면 좋은 것',
    more: '다른 목적의 좋은 날',
    pages: {
      wedding: {
        title: '결혼 좋은 날 · 2026·2027 결혼 택일, 한·베 결혼 날짜 | 명월',
        description: '황도일과 12직으로 고른 결혼하기 좋은 날을 한국식·베트남식 달력으로 보여 드립니다. 두 사람의 띠와 충하는 날을 빼고, 한·베 커플도 한 번에 확인하세요.',
        h1: '결혼하기 좋은 날 (결혼 택일)',
        intro: '전통 택일에서 결혼은 황도일 가운데 정(定)·성(成)·개(開)일을 가장 좋게 봅니다. 한국과 베트남은 음력 날짜가 하루 다를 때가 있어, 국제 커플이라면 두 달력 모두에서 무난한 날을 고르는 것이 마음 편합니다.',
        tips: [
          '신랑·신부의 출생 연도를 각각 넣어 보고, 두 사람 모두 충이 없는 날을 고르세요. 궁합 페이지에서도 두 사람에게 좋은 날을 알려 드립니다.',
          '베트남 가족이 있다면 베트남식 달력으로 바꿔 Tam Nương(음력 3·7·13·18·22·27일)과 Kim Lâu 해를 함께 확인하세요.',
          '예식장 예약은 몇 달 전에 끝나는 경우가 많으니 후보 날짜를 여러 개 잡아 두면 좋습니다.',
        ],
      },
      opening: {
        title: '개업 좋은 날 · 가게 오픈·개업식 택일 | 명월',
        description: '가게 오픈, 사무실 개업, 개업식 날짜를 고르실 때 참고하세요. 황도일 가운데 만(滿)·정(定)·성(成)·개(開)일을 한국식·베트남식 달력으로 보여 드립니다.',
        h1: '개업하기 좋은 날 (개업 택일)',
        intro: '개업은 "채우고(滿) 이루고(成) 여는(開)" 기운이 있는 날을 좋게 봅니다. 베트남에서는 khai trương 날짜를 특히 중요하게 여겨, 사장의 나이와 맞는 날·시간을 함께 고르는 경우가 많습니다.',
        tips: [
          '사장(대표)의 출생 연도를 넣어 충하는 날을 빼 보세요.',
          '오픈 당일에는 홈 화면의 "시간대별 길흉"에서 좋은 시간을 골라 첫 손님을 맞이하면 좋습니다.',
          '베트남에서는 개업 첫 손님(mở hàng)을 중요하게 여깁니다. 기분 좋은 지인을 첫 손님으로 초대하는 풍습도 있습니다.',
        ],
      },
      moving: {
        title: '이사 좋은 날 · 손 없는 날, 이사 택일 | 명월',
        description: '이사하기 좋은 날을 손 없는 날과 황도일, 12직으로 골라 드립니다. 베트남식 nhập trạch(입주) 날짜도 함께 확인하세요.',
        h1: '이사하기 좋은 날 (손 없는 날·입주 택일)',
        intro: '한국에서는 음력 9·10일, 19·20일, 29·30일인 "손 없는 날"을 이사에 가장 좋은 날로 꼽습니다. 이 페이지는 여기에 더해 황도일이면서 제(除)·정(定)·성(成)·개(開)일인 날을 골라 보여 드립니다.',
        tips: [
          '손 없는 날은 이사 수요가 몰려 비용이 오를 수 있습니다. 황도일 가운데 손 없는 날이 아닌 날도 충분히 좋은 선택입니다.',
          '베트남의 nhập trạch(입주)는 집주인 나이로 Kim Lâu·Hoang Ốc를 함께 보는 경우가 많습니다. 삼재 계산기에서 확인할 수 있습니다.',
          '이삿날 아침, 새 집에 밥솥·쌀·소금을 먼저 들이는 풍습은 한국과 베트남 모두에 비슷하게 남아 있습니다.',
        ],
      },
      contract: {
        title: '계약 좋은 날 · 부동산·사업 계약 택일 | 명월',
        description: '부동산 계약, 사업 계약, 서명하기 좋은 날을 황도일과 12직으로 골라 드립니다. 정(定)·집(執)·성(成)·개(開)일 중심으로 보여 드립니다.',
        h1: '계약하기 좋은 날 (계약 택일)',
        intro: '계약은 "정하고(定) 붙잡아(執) 이루는(成)" 날을 좋게 봅니다. 날짜만큼 중요한 것은 계약서 내용이니, 좋은 날을 고르되 조건은 꼼꼼히 확인하세요.',
        tips: [
          '중요한 서명은 그날의 좋은 시간(황도시)에 맞추면 마음이 편합니다.',
          '계약 당사자가 여러 명이라면 대표자의 출생 연도로 충하는 날을 빼 보세요.',
          '흑도일이나 파(破)일에는 계약서 검토만 하고 서명은 미루는 사람도 많습니다.',
        ],
      },
      travel: {
        title: '여행·출발 좋은 날 · 출장·이민 출국 택일 | 명월',
        description: '여행, 출장, 귀국·출국하기 좋은 날을 황도일과 12직으로 골라 드립니다. 베트남식 xuất hành 날짜도 함께 확인하세요.',
        h1: '여행·출발하기 좋은 날',
        intro: '먼 길을 떠나는 날은 제(除)·정(定)·성(成)·개(開)일을 좋게 봅니다. 베트남에서는 설 연휴 첫 외출(xuất hành)의 날짜·방향·시간을 고르는 풍습이 지금도 이어지고 있습니다.',
        tips: [
          '출발 시간은 홈 화면의 "시간대별 길흉"에서 황도시를 골라 보세요.',
          '내 띠와 충하는 날은 장거리 운전이나 비행을 피하는 사람이 많습니다.',
          '설·뗏 연휴에는 한국과 베트남 모두 이동이 몰리니 날짜를 하루 앞당기거나 미루는 것도 방법입니다.',
        ],
      },
      groundbreaking: {
        title: '착공·동토 좋은 날 · 집짓기 공사 시작일 택일 | 명월',
        description: '집짓기, 리모델링, 공사 시작(동토·기공) 날짜를 평(平)·정(定)·성(成)·개(開)일 중심으로 골라 드립니다. 베트남식 động thổ 날짜도 함께 확인하세요.',
        h1: '착공·동토하기 좋은 날 (공사 시작 택일)',
        intro: '땅을 파고 공사를 시작하는 동토(動土, động thổ)는 예부터 날짜를 가장 신중하게 고르는 일 가운데 하나입니다. 베트남에서는 집주인의 나이로 Kim Lâu·Hoang Ốc·Tam Tai를 먼저 확인하고, 해가 나쁘면 다른 가족의 이름으로 착공하기도 합니다.',
        tips: [
          '집주인의 출생 연도를 넣어 충하는 날을 빼 보세요.',
          '삼재 계산기에서 베트남 풍습을 선택하면 Kim Lâu·Hoang Ốc가 없는 "집짓기 좋은 해"를 알려 드립니다.',
          '베트남에서는 착공 날 간단한 제사(lễ động thổ)를 지내고 좋은 시간에 첫 삽을 뜹니다.',
        ],
      },
      vehicle: {
        title: '차 사기 좋은 날 · 자동차 구입·출고일 택일 | 명월',
        description: '새 차를 사거나 출고받기 좋은 날을 정(定)·성(成)·수(收)·개(開)일 중심으로 골라 드립니다. 베트남에서 많이 보는 xem ngày mua xe도 함께 확인하세요.',
        h1: '차 사기 좋은 날 (자동차 구입·출고)',
        intro: '베트남에서는 오토바이나 자동차를 살 때, 처음 몰고 나갈 때 좋은 날과 시간을 고르는 경우가 많습니다. 전통 택일에서는 물건을 들이는 수(收)일과 일을 이루는 성(成)일을 특히 좋게 봅니다.',
        tips: [
          '계약일과 출고(인수)일이 다르다면 인수하는 날을 기준으로 고르는 경우가 많습니다.',
          '처음 운전해 나가는 시간은 그날의 황도시에 맞춰 보세요.',
          '내 띠와 충하는 날에는 첫 운전을 미루는 사람이 많습니다.',
        ],
      },
      haircut: {
        title: '이발·미용 좋은 날 · 머리 자르기 좋은 날 | 명월',
        description: '머리를 자르거나 파마·염색하기 좋은 날을 제(除)일 중심으로 골라 드립니다. 베트남에서 즐겨 보는 xem ngày cắt tóc을 한국어로도 확인하세요.',
        h1: '머리 자르기 좋은 날 (이발·미용)',
        intro: '베트남에는 머리를 자르는 날도 고르는 풍습이 있어 "ngày tốt cắt tóc"을 찾는 사람이 많습니다. 12직 가운데 묵은 것을 덜어내는 제(除)일이 이발과 미용에 가장 잘 어울리는 날로 꼽힙니다.',
        tips: [
          '중요한 면접·사진 촬영·결혼식 2~3일 전에 맞춰 좋은 날을 고르면 머리도 자리를 잡습니다.',
          '설 전에 머리를 자르고 새해를 맞는 풍습은 한국과 베트남 모두에 있습니다.',
          '재미로 보는 택일이니 마음에 드는 날을 고르는 것이 가장 좋습니다.',
        ],
      },
    },
  },
  vi: {
    upcoming: 'Các ngày tốt sắp tới',
    upcomingDesc: 'Chọn trong vòng 4 tháng tới. Nhập năm sinh ở trên để loại bỏ ngày xung tuổi bạn.',
    none: 'Không có ngày phù hợp. Hãy xóa năm sinh hoặc xem tháng khác.',
    rule: 'Tiêu chí: ngày hoàng đạo và trực phù hợp với việc cần làm; theo lịch Việt Nam sẽ loại ngày Tam Nương, Nguyệt Kỵ.',
    tipsTitle: 'Nên biết',
    more: 'Xem ngày tốt cho việc khác',
    pages: {
      wedding: {
        title: 'Xem ngày cưới hỏi 2026, 2027 · Ngày tốt kết hôn | Minh Nguyệt',
        description: 'Xem ngày tốt cưới hỏi theo hoàng đạo và thập nhị trực, có lọc ngày xung tuổi cô dâu chú rể. Hỗ trợ cả lịch Việt Nam và lịch Hàn Quốc cho cặp đôi Hàn – Việt.',
        h1: 'Xem ngày tốt cưới hỏi',
        intro: 'Theo cách chọn ngày truyền thống, cưới hỏi hợp nhất với ngày hoàng đạo có trực Định, Thành, Khai. Lịch âm Hàn Quốc và Việt Nam đôi khi lệch nhau một ngày, nên cặp đôi Hàn – Việt có thể kiểm tra cả hai lịch cho yên tâm.',
        tips: [
          'Nhập năm sinh của cô dâu và chú rể lần lượt để chọn ngày không xung với cả hai. Trang Xem tuổi hợp cũng gợi ý ngày tốt cho hai người.',
          'Hãy xem thêm năm Kim Lâu theo tuổi mụ của cô dâu trong trang Tam Tai – Kim Lâu.',
          'Nhà hàng tiệc cưới thường kín lịch sớm, nên chọn sẵn vài ngày dự phòng.',
        ],
      },
      opening: {
        title: 'Xem ngày khai trương · Ngày tốt mở cửa hàng | Minh Nguyệt',
        description: 'Xem ngày tốt khai trương cửa hàng, văn phòng theo hoàng đạo và trực Mãn, Định, Thành, Khai. Có lọc ngày xung tuổi chủ cửa hàng.',
        h1: 'Xem ngày tốt khai trương',
        intro: 'Khai trương hợp với ngày mang ý nghĩa đầy đủ (Mãn), thành tựu (Thành) và mở ra (Khai). Ngoài ngày, nhiều người còn chọn giờ hoàng đạo và người mở hàng hợp tuổi.',
        tips: [
          'Nhập năm sinh của chủ cửa hàng để loại ngày xung tuổi.',
          'Ngày khai trương, hãy xem "Giờ tốt xấu trong ngày" ở trang chủ để chọn giờ đón khách đầu tiên.',
          'Người Hàn cũng có tục chọn ngày mở cửa hàng và làm lễ khai trương (개업식) với bánh gạo đỏ (시루떡).',
        ],
      },
      moving: {
        title: 'Xem ngày nhập trạch, chuyển nhà · Ngày tốt về nhà mới | Minh Nguyệt',
        description: 'Xem ngày tốt nhập trạch, chuyển nhà theo hoàng đạo và trực Trừ, Định, Thành, Khai, kèm “ngày không có Son” của người Hàn. Có lọc ngày xung tuổi gia chủ.',
        h1: 'Xem ngày tốt nhập trạch, chuyển nhà',
        intro: 'Nhập trạch (về nhà mới) hợp với ngày hoàng đạo có trực Trừ, Định, Thành, Khai. Người Hàn thì chuộng “ngày không có Son” (손 없는 날) — mùng 9, 10, 19, 20, 29, 30 âm lịch — để chuyển nhà.',
        tips: [
          'Nhiều gia đình xem thêm Kim Lâu, Hoang Ốc theo tuổi gia chủ. Bạn có thể tra trong trang Tam Tai – Kim Lâu.',
          'Theo phong tục, khi vào nhà mới nên mang theo bếp lửa (hoặc nồi cơm), gạo, muối, nước trước tiên.',
          'Các ngày “không có Son” ở Hàn Quốc thường đắt hơn vì nhiều người chuyển nhà cùng lúc.',
        ],
      },
      contract: {
        title: 'Xem ngày ký hợp đồng · Ngày tốt ký kết | Minh Nguyệt',
        description: 'Xem ngày tốt ký hợp đồng mua bán nhà đất, hợp đồng kinh doanh theo hoàng đạo và trực Định, Chấp, Thành, Khai.',
        h1: 'Xem ngày tốt ký hợp đồng',
        intro: 'Ký kết hợp với ngày mang ý nghĩa định đoạt (Định), nắm giữ (Chấp) và thành tựu (Thành). Dù vậy, nội dung hợp đồng vẫn quan trọng hơn ngày ký — hãy đọc kỹ các điều khoản.',
        tips: [
          'Có thể chọn giờ hoàng đạo trong ngày để ký những văn bản quan trọng.',
          'Nếu có nhiều bên, hãy dùng năm sinh của người đại diện để loại ngày xung.',
          'Nhiều người chỉ xem xét hợp đồng vào ngày hắc đạo hoặc trực Phá, rồi để ngày khác mới ký.',
        ],
      },
      travel: {
        title: 'Xem ngày xuất hành, đi xa · Ngày tốt đi du lịch | Minh Nguyệt',
        description: 'Xem ngày tốt xuất hành, đi du lịch, công tác, về quê hay sang Hàn Quốc theo hoàng đạo và trực Trừ, Định, Thành, Khai.',
        h1: 'Xem ngày tốt xuất hành, đi xa',
        intro: 'Ngày đi xa hợp với trực Trừ, Định, Thành, Khai. Đầu năm, người Việt vẫn giữ tục chọn ngày, giờ và hướng xuất hành để cả năm thuận lợi.',
        tips: [
          'Chọn giờ xuất hành trong mục “Giờ tốt xấu trong ngày” ở trang chủ.',
          'Ngày xung tuổi bạn nên hạn chế lái xe đường dài hoặc bay.',
          'Dịp Tết và Chuseok (Tết Trung thu Hàn Quốc) đường xá, sân bay đều đông — có thể lùi hoặc tiến một ngày.',
        ],
      },
      groundbreaking: {
        title: 'Xem ngày động thổ làm nhà · Ngày tốt khởi công | Minh Nguyệt',
        description: 'Xem ngày tốt động thổ, khởi công làm nhà, sửa nhà theo hoàng đạo và trực Bình, Định, Thành, Khai. Kết hợp xem Kim Lâu, Hoang Ốc, Tam Tai theo tuổi gia chủ.',
        h1: 'Xem ngày tốt động thổ, khởi công',
        intro: 'Động thổ là việc hệ trọng nên xưa nay được chọn ngày rất kỹ. Trước hết hãy xem năm làm nhà có phạm Kim Lâu, Hoang Ốc, Tam Tai theo tuổi gia chủ hay không; nếu phạm, nhiều gia đình mượn tuổi người khác đứng ra động thổ.',
        tips: [
          'Nhập năm sinh gia chủ để loại ngày xung tuổi.',
          'Trang Tam Tai – Kim Lâu sẽ cho bạn biết những năm hợp làm nhà trong 12 năm tới.',
          'Lễ động thổ thường làm vào giờ hoàng đạo, gia chủ cuốc nhát đầu tiên.',
        ],
      },
      vehicle: {
        title: 'Xem ngày mua xe, nhận xe · Ngày tốt mua ô tô, xe máy | Minh Nguyệt',
        description: 'Xem ngày tốt mua xe ô tô, xe máy, nhận xe mới theo hoàng đạo và trực Định, Thành, Thu, Khai. Có lọc ngày xung tuổi chủ xe.',
        h1: 'Xem ngày tốt mua xe, nhận xe',
        intro: 'Khi mua xe, người Việt thường chọn ngày nhận xe và giờ lăn bánh đầu tiên. Trực Thu (thu vào) và Thành (thành tựu) được xem là hợp nhất cho việc sắm sửa tài sản.',
        tips: [
          'Nếu ngày ký hợp đồng và ngày nhận xe khác nhau, thường lấy ngày nhận xe làm chuẩn.',
          'Chọn giờ hoàng đạo cho lần lái đầu tiên.',
          'Tránh nhận xe vào ngày xung tuổi chủ xe.',
        ],
      },
      haircut: {
        title: 'Xem ngày cắt tóc tốt · Ngày đẹp cắt tóc, làm tóc | Minh Nguyệt',
        description: 'Xem ngày tốt cắt tóc, uốn, nhuộm tóc theo trực Trừ, Bình, Thành, Khai và ngày hoàng đạo. Tham khảo trước khi phỏng vấn, chụp ảnh, cưới hỏi.',
        h1: 'Xem ngày tốt cắt tóc',
        intro: 'Trong thập nhị trực, ngày trực Trừ (loại bỏ cái cũ) được xem là hợp nhất cho cắt tóc, làm đẹp. Ngày hoàng đạo có trực Bình, Thành, Khai cũng là lựa chọn tốt.',
        tips: [
          'Cắt tóc trước phỏng vấn, chụp ảnh cưới 2–3 ngày để tóc vào nếp.',
          'Cắt tóc trước Tết để đón năm mới là phong tục chung của cả Việt Nam và Hàn Quốc.',
          'Đây là thông tin tham khảo — ngày bạn thấy vui vẻ thoải mái cũng là ngày đẹp.',
        ],
      },
    },
  },
};
