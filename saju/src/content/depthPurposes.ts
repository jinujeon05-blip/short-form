// Extra readable content for each good-day purpose page (/calendar/<purpose>). All wording is original.
import type { Lang } from '../i18n';
import type { Purpose } from '../engine/almanac';
import type { DepthText } from './depthTypes';

export const PURPOSE_DEPTH: Record<Purpose, Record<Lang, DepthText>> = {
  wedding: {
    ko: {
      title: `결혼 택일, 이렇게 따져 보세요`,
      sections: [
        {
          h: `결혼 날짜는 왜 따로 고를까요`,
          p: `결혼은 두 사람만의 일이 아니라 두 집안이 이어지는 일이라, 예부터 날짜를 신중하게 정했습니다. 전통 택일은 먼저 그날의 별이 황도인지 보고, 이어서 12직이 정(定)·성(成)·개(開)인지 살핍니다. 정은 마음을 정하고 자리를 잡는 날, 성은 일이 이루어지는 날, 개는 새 길이 열리는 날이라는 뜻입니다. 이 페이지도 같은 기준으로 날을 추려 보여 드립니다. 다만 최종 날짜는 두 사람과 가족의 사정이 우선입니다.`,
        },
        {
          h: `한국식 달력과 베트남식 달력은 어떻게 다른가요`,
          p: `한국과 베트남은 같은 음력이라도 초하루가 하루 어긋나는 달이 있어, 같은 날이 서로 다른 음력 날짜로 표시되기도 합니다. 베트남식으로 볼 때는 Tam Nương(음력 3·7·13·18·22·27일)과 Nguyệt Kỵ 날을 피하고, 신부의 나이로 Kim Lâu 해인지도 따집니다. 한국에서는 집안에 따라 삼재나 궁합을 보기도 해서 기준이 가족마다 다릅니다. 양가 어른이 어느 쪽 달력을 따르는지 미리 물어 두면 나중에 의견이 갈리는 일이 줄어듭니다.`,
        },
        {
          h: `날짜를 정한 뒤 준비 순서`,
          p: `날짜를 정한 뒤에는 순서대로 움직이는 편이 덜 헷갈립니다. 먼저 예식장과 사진·한복(áo dài) 같은 큰 예약을 후보 날짜 두세 개로 동시에 알아봅니다. 다음으로 양가 상견례와 혼인신고 시기를 정하고, 국제결혼이면 필요한 서류와 번역·인증에 걸리는 기간을 관할 기관에서 직접 확인하세요. 청첩장은 보통 예식 한두 달 전에 보내며, 멀리서 오는 하객이 있다면 연휴나 방학과 겹치는지도 살펴봅니다.`,
        },
        {
          h: `좋은 날로 뜬 날에 예식장이 이미 찼다면 어떻게 하나요?`,
          p: `후보를 넓히는 것이 가장 현실적입니다. 이 달력에서 좋은 날로 뜨지 않아도 흑도가 아니고 파(破)일처럼 꺼리는 직이 아니라면 무난하다고 보는 사람이 많습니다. 그날이 두 사람의 띠와 충하는지만 한 번 더 확인하고, 가족이 가장 모이기 편한 주말을 우선하세요. 전통 택일은 마음을 편하게 하려는 참고 자료이지, 모든 하객의 일정을 이기는 규칙은 아닙니다.`,
        },
      ],
    },
    vi: {
      title: `Chọn ngày cưới: nên cân nhắc những gì`,
      sections: [
        {
          h: `Vì sao phải chọn ngày cưới`,
          p: `Cưới hỏi không chỉ là chuyện của hai người mà còn là việc kết nối hai gia đình, nên từ xưa người ta rất kỹ trong việc chọn ngày. Cách xem truyền thống trước hết xem sao chủ ngày có phải hoàng đạo không, rồi xem ngày đó thuộc trực Định, Thành hay Khai. Định là lúc mọi việc ổn định, Thành là lúc việc nên duyên, Khai là lúc mở ra con đường mới. Trang này lọc ngày theo đúng tiêu chí ấy, nhưng ngày cuối cùng vẫn nên tùy hoàn cảnh hai người và gia đình.`,
        },
        {
          h: `Lịch Việt và lịch Hàn khác nhau thế nào`,
          p: `Dù cùng là âm lịch, có tháng mùng 1 của Hàn Quốc và Việt Nam lệch nhau một ngày nên cùng một ngày dương có thể ra hai ngày âm khác nhau. Theo lệ Việt Nam, người ta tránh ngày Tam Nương (3, 7, 13, 18, 22, 27 âm lịch), Nguyệt Kỵ và xem cô dâu có phạm Kim Lâu trong năm đó không. Ở Hàn Quốc, tùy gia đình mà có nhà xem Tam Tai hoặc xem tuổi hợp nên tiêu chí mỗi nhà một khác. Hỏi trước xem hai bên gia đình theo lịch nào sẽ đỡ bất đồng về sau.`,
        },
        {
          h: `Thứ tự chuẩn bị sau khi chọn được ngày`,
          p: `Có ngày rồi, bạn nên làm lần lượt cho đỡ rối. Trước hết hỏi giữ chỗ nhà hàng tiệc cưới, chụp ảnh, váy áo cho hai hoặc ba ngày dự phòng cùng lúc. Kế đến là lễ ăn hỏi, lễ vu quy hay buổi gặp mặt hai họ và thời điểm đăng ký kết hôn; nếu là hôn nhân quốc tế, hãy hỏi trực tiếp cơ quan có thẩm quyền về giấy tờ, dịch thuật, hợp pháp hóa mất bao lâu. Thiệp mời thường gửi trước một đến hai tháng, và nếu khách đi xa, nhớ xem ngày cưới có trùng kỳ nghỉ lễ không.`,
        },
        {
          h: `Ngày đẹp mà nhà hàng đã kín chỗ thì sao?`,
          p: `Cách thực tế nhất là mở rộng lựa chọn. Ngày không hiện ở đây nhưng không phải hắc đạo và không rơi vào trực Phá thì nhiều người vẫn coi là tạm ổn. Chỉ cần kiểm tra lại xem ngày đó có xung tuổi cô dâu chú rể không, rồi ưu tiên cuối tuần mà họ hàng dễ tụ họp nhất. Xem ngày chỉ là chỗ dựa tinh thần để mọi người yên tâm, không phải quy tắc đặt lên trên lịch của tất cả khách mời.`,
        },
      ],
    },
  },

  opening: {
    ko: {
      title: `개업 날짜, 이렇게 정하세요`,
      sections: [
        {
          h: `가게 문 여는 날을 따로 보는 까닭`,
          p: `장사는 손님이 들고 돈이 모이는 일이라, 처음 문을 여는 날에 "가득 찬다"는 뜻을 담고 싶어 합니다. 그래서 가득 채우는 만(滿), 자리를 잡는 정(定), 이루는 성(成), 여는 개(開)를 개업에 어울리는 직으로 꼽습니다. 여기에 황도일이 겹쳐야 후보가 됩니다. 반대로 깨뜨린다는 뜻의 파(破)와 닫는다는 뜻의 폐(閉)는 간판을 거는 날로는 꺼리는 편입니다. 이름의 뜻을 새기는 정도로 가볍게 참고하세요.`,
        },
        {
          h: `한국의 개업식과 베트남의 khai trương`,
          p: `한국에서는 개업식에 시루떡을 돌리고 고사를 지내며 이웃에 인사하는 일이 흔합니다. 베트남의 khai trương은 사자춤(múa lân)을 부르거나, 가게 안 재물신 제단(bàn thờ Thần Tài)에 향과 과일, 꽃을 올리는 집이 많습니다. 모두 새 가게의 복과 안전을 비는 마음에서 나온 풍습입니다. 베트남 달력으로 날짜를 정한다면 Tam Nương과 Nguyệt Kỵ 날은 처음부터 제외하세요.`,
        },
        {
          h: `날짜보다 먼저 챙길 개업 준비`,
          p: `날짜보다 먼저 확인할 일이 많습니다. 사업자 등록, 영업 신고나 허가, 위생·소방 점검처럼 개업 전에 끝내야 하는 절차는 나라와 업종마다 달라 해당 기관에서 직접 확인하세요. 간판과 집기, 결제 단말기 설치는 개업 일주일 전에 끝내 두고, 직원과 하루 이틀 연습 영업을 해 보면 첫날 실수가 줄어듭니다. 영업시간과 위치는 지도 앱과 SNS에 미리 올려 두면 좋습니다. 날짜가 밀리면 이 순서가 통째로 밀리니 여유 있게 잡으세요.`,
        },
        {
          h: `택일한 날 날씨가 나쁘거나 일정이 틀어지면요?`,
          p: `날씨와 상권 사정이 우선입니다. 날짜를 지키려고 무리하게 열기보다, 택일한 날에는 조용히 문을 여는 소프트 오픈을 하고 공식 행사는 다음 후보일에 하는 가게도 많습니다. 사장님 띠와 충하는 날만 피하고, 후보를 서너 개 잡아 두면 일정이 틀어져도 바로 옮길 수 있습니다. 택일은 시작하는 마음의 기준일 뿐 매출을 약속하지는 않습니다.`,
        },
      ],
    },
    vi: {
      title: `Cách chọn ngày khai trương cho cửa hàng`,
      sections: [
        {
          h: `Vì sao ngày mở cửa hàng cần được chọn riêng`,
          p: `Buôn bán là việc khách vào, tiền về, nên ngày đầu mở cửa ai cũng muốn gửi gắm ý nghĩa đầy đặn. Vì vậy các trực Mãn (đầy), Định (vững), Thành (nên) và Khai (mở) được xem là hợp với khai trương, và ngày đó phải đồng thời là ngày hoàng đạo mới lọt vào danh sách. Ngược lại, trực Phá (vỡ) và Bế (đóng) thường bị tránh khi treo bảng hiệu. Bạn chỉ cần coi đó là ý nghĩa của tên gọi để tham khảo nhẹ nhàng.`,
        },
        {
          h: `Lễ khai trương ở Việt Nam và Hàn Quốc`,
          p: `Ở Hàn Quốc, buổi khai trương hay có bánh gạo đỏ (siru-tteok), làm lễ cầu may và chào hỏi hàng xóm. Ở Việt Nam, nhiều nhà thuê múa lân, hoặc dâng hương, hoa quả lên bàn thờ Thần Tài trong cửa hàng. Cả hai phong tục đều xuất phát từ mong muốn cửa hàng mới được bình an và may mắn. Nếu chọn ngày theo lịch Việt, hãy loại ngay ngày Tam Nương và Nguyệt Kỵ ngay từ đầu.`,
        },
        {
          h: `Những việc cần lo trước cả khi chọn ngày`,
          p: `Có khá nhiều thứ phải xác nhận trước ngày mở cửa. Đăng ký kinh doanh, giấy phép, kiểm tra vệ sinh và phòng cháy chữa cháy khác nhau tùy nước và ngành nghề, bạn nên hỏi trực tiếp cơ quan phụ trách. Biển hiệu, đồ dùng và máy thanh toán nên lắp xong trước một tuần, rồi chạy thử một hai ngày với nhân viên để đỡ sai sót buổi đầu. Đăng giờ mở cửa, địa chỉ lên bản đồ và mạng xã hội từ sớm. Nếu ngày bị lùi thì cả chuỗi việc này cũng lùi theo, nên đặt lịch dư dả.`,
        },
        {
          h: `Nếu ngày đã chọn gặp trời xấu hoặc lịch bị đảo thì sao?`,
          p: `Thời tiết và tình hình khu buôn bán nên đặt lên trước. Thay vì cố giữ ngày, nhiều cửa hàng mở nhẹ nhàng vào ngày đã chọn rồi tổ chức lễ chính thức vào ngày tốt kế tiếp. Chỉ cần tránh ngày xung tuổi chủ cửa hàng và chuẩn bị ba bốn ngày dự phòng thì có đổi lịch cũng dễ. Chọn ngày là chỗ dựa tinh thần khi bắt đầu, không phải lời hứa về doanh thu.`,
        },
      ],
    },
  },

  moving: {
    ko: {
      title: `이사 날짜, 이렇게 고르세요`,
      sections: [
        {
          h: `손 없는 날은 무엇이고 황도일과 어떻게 다른가요`,
          p: `"손"은 날짜에 따라 방향을 옮겨 다니며 사람의 일을 방해한다고 믿은 귀신을 가리키는 말입니다. 손이 없는 날은 그 방해가 없다고 보는 날로, 음력 9·10·19·20·29·30일이 해당합니다. 황도일과 12직은 이와 전혀 다른 계산이라서 한 날이 손 없는 날이면서 황도일일 때도, 아닐 때도 있습니다. 이 달력은 두 기준을 따로 표시하니, 어느 쪽을 더 중시할지는 가족이 정하면 됩니다.`,
        },
        {
          h: `베트남의 nhập trạch와 한국 이사는 무엇이 다른가요`,
          p: `베트남에서는 새 집에 들어가는 nhập trạch를 큰 의례로 여겨 집주인의 나이로 Kim Lâu와 Hoang Ốc를 먼저 따집니다. Kim Lâu는 만 나이가 아니라 세는 나이(tuổi mụ)를 9로 나눈 나머지가 1·3·6·8일 때를 말합니다. 날이 정해지면 새 집에서 향을 올리고, 가족이 함께 들어가 불을 켜고 물을 끓이는 집도 있습니다. 한국은 날짜와 "손"을, 베트남은 집주인의 나이를 더 따지는 편이라고 기억하면 편합니다.`,
        },
        {
          h: `이삿날이 정해진 뒤 할 일`,
          p: `이삿짐센터 견적은 두세 곳에서 받고, 가능하면 한 달 전에 예약하세요. 손 없는 날과 월말·주말은 먼저 마감되니 후보를 넉넉히 가져가야 합니다. 전기·가스·수도·인터넷 이전과 엘리베이터·주차 사용 시간은 이사 나가는 집과 들어가는 집 관리실에 미리 확인합니다. 이삿날 아침에는 귀중품과 서류를 직접 챙기고, 새 집에서는 잠잘 자리와 주방부터 정리하면 첫날이 훨씬 수월합니다.`,
        },
        {
          h: `손 없는 날을 못 잡으면 이사를 미뤄야 하나요?`,
          p: `꼭 그렇지는 않습니다. 손 없는 날이 아니어도 황도일이면서 제·정·성·개인 날을 고르는 사람이 많고, 계약 만기와 잔금일이 이삿날을 사실상 정해 주는 경우도 흔합니다. 날짜를 바꿀 수 없다면 그날의 황도시 가운데 짐을 싣기 시작하는 시간을 고르는 정도로 충분합니다. 비용을 줄이려고 일부러 손 없는 날을 피하는 사람도 있습니다.`,
        },
      ],
    },
    vi: {
      title: `Chọn ngày chuyển nhà, nhập trạch`,
      sections: [
        {
          h: `“Ngày không có Son” là gì, khác ngày hoàng đạo ra sao?`,
          p: `“Son” (손) là tên một loại ma quỷ theo quan niệm xưa, cứ theo ngày mà đổi hướng và quấy rầy việc của con người. Ngày không có Son là ngày không bị quấy nhiễu như vậy, tức mùng 9, 10, 19, 20, 29, 30 âm lịch. Ngày hoàng đạo và thập nhị trực là cách tính hoàn toàn khác, nên có ngày vừa không có Son vừa hoàng đạo, cũng có ngày chỉ được một. Lịch Minh Nguyệt hiển thị hai tiêu chí riêng, gia đình tự quyết định coi trọng cái nào hơn.`,
        },
        {
          h: `Nhập trạch của người Việt khác chuyển nhà của người Hàn thế nào`,
          p: `Ở Việt Nam, nhập trạch là nghi lễ lớn nên người ta thường xem tuổi gia chủ có phạm Kim Lâu, Hoang Ốc hay không trước tiên. Kim Lâu tính theo tuổi mụ chứ không phải tuổi tròn: lấy tuổi mụ chia 9, dư 1, 3, 6 hoặc 8 là phạm. Khi đã có ngày, nhiều nhà thắp hương ở nhà mới, cả gia đình cùng bước vào, bật đèn và đun một ấm nước. Có thể nhớ đơn giản là người Hàn chú trọng ngày và Son, còn người Việt chú trọng tuổi gia chủ.`,
        },
        {
          h: `Việc cần làm sau khi có ngày chuyển nhà`,
          p: `Nên xin báo giá của hai ba đơn vị vận chuyển và đặt trước chừng một tháng. Ngày không có Son, cuối tháng và cuối tuần kín lịch trước nên cần chọn dư vài ngày. Hãy hỏi ban quản lý của cả nhà cũ lẫn nhà mới về điện, nước, gas, internet, giờ dùng thang máy và chỗ đỗ xe. Sáng hôm chuyển, tự tay mang theo giấy tờ và đồ quý; vào nhà mới thì dọn chỗ ngủ và gian bếp trước, ngày đầu sẽ nhẹ nhàng hơn nhiều.`,
        },
        {
          h: `Không chọn được ngày không có Son thì có phải dời không?`,
          p: `Không nhất thiết. Nhiều người chọn ngày hoàng đạo có trực Trừ, Định, Thành, Khai dù không phải ngày không có Son, và lịch hết hạn hợp đồng thuê hay ngày nhận nhà thường đã quyết định ngày chuyển rồi. Nếu không đổi được ngày, chỉ cần chọn giờ hoàng đạo gần nhất để bắt đầu khuân đồ là đủ. Cũng có người chủ động tránh ngày không có Son để tiết kiệm chi phí.`,
        },
      ],
    },
  },

  contract: {
    ko: {
      title: `계약 날짜와 서명, 이렇게 생각해 보세요`,
      sections: [
        {
          h: `계약에서 정(定)과 집(執)을 보는 이유`,
          p: `계약은 조건을 정하고 그 약속을 붙들어 두는 일입니다. 그래서 12직 가운데 확정의 뜻을 가진 정(定), 손에 쥔다는 뜻의 집(執), 결실의 성(成), 열림의 개(開)를 좋게 봅니다. 반대로 깨진다는 뜻의 파(破)일은 약속이 흔들릴 수 있다고 하여 서명을 미루는 사람이 많습니다. 다만 이런 해석은 옛사람들이 마음의 안정을 얻으려 쓴 풍습이고, 계약의 효력은 날짜가 아니라 문서의 내용과 법에 따릅니다.`,
        },
        {
          h: `한국과 베트남에서 계약 날을 보는 방식`,
          p: `베트남에서는 집이나 땅을 사고팔 때, 동업을 시작할 때 ký hợp đồng 날짜를 따져 Tam Nương과 Nguyệt Kỵ를 피하는 사람이 많습니다. 한국은 부동산 계약일을 따로 택일하는 경우가 많지 않고, 잔금·입주 일정에 맞춰 정한 뒤 이삿날에 손 없는 날을 쓰는 편입니다. 두 나라 사이에서 계약한다면 서명하는 현지 날짜와 음력이 하루 다를 수 있다는 점만 기억하세요. 계약서에 적히는 날짜는 양력이고, 택일은 그 위에 얹는 참고입니다.`,
        },
        {
          h: `서명 전에 꼭 해야 할 확인`,
          p: `서명 전에는 날짜보다 문서를 읽는 시간이 더 중요합니다. 계약서 전체를 하루 전에 받아 금액, 기간, 해지·위약 조건, 특약 사항에 표시하며 읽으세요. 모르는 용어는 서명 전에 상대에게 풀어서 설명해 달라고 하고, 금액이 크거나 낯선 분야라면 해당 분야 전문가에게 확인받는 것이 안전합니다. 외국어가 섞이면 번역본과 원문 중 어느 쪽이 기준인지 문서에 적어 두세요. 서명 뒤에는 사본을 파일과 종이로 모두 보관합니다.`,
        },
        {
          h: `서명은 꼭 좋은 시간에 해야 하나요?`,
          p: `필수는 아닙니다. 황도시는 하루 열두 시진 가운데 별이 좋다고 보는 시간대이고, 서명 시각을 여기에 맞추면 마음이 가벼워지는 정도의 의미입니다. 상대와 일정을 맞춰야 하는 계약에서는 시간이 맞지 않아도 크게 신경 쓸 일이 아닙니다. 서명 전 마지막 확인에 쓰는 시간이 오히려 더 큰 안전장치입니다. 정말 마음에 걸리면 초안 교환이나 조건 협의 같은 준비 단계를 좋은 날에 맞추는 방법도 있습니다.`,
        },
      ],
    },
    vi: {
      title: `Ngày ký hợp đồng và cách cân nhắc khi ký`,
      sections: [
        {
          h: `Vì sao xem trực Định và Chấp khi ký kết`,
          p: `Hợp đồng là việc chốt điều kiện rồi giữ chặt lời hứa. Vì thế trong thập nhị trực, Định (chốt), Chấp (nắm giữ), Thành (nên việc) và Khai (mở ra) được xem là tốt. Ngược lại, ngày trực Phá có nghĩa là vỡ nên nhiều người dời việc ký sang hôm khác. Tuy nhiên đây là tập quán để người xưa tìm sự yên tâm; hiệu lực của hợp đồng nằm ở nội dung văn bản và quy định pháp luật chứ không nằm ở ngày ký.`,
        },
        {
          h: `Cách xem ngày ký ở Việt Nam và Hàn Quốc`,
          p: `Ở Việt Nam, khi mua bán nhà đất hay bắt đầu hợp tác làm ăn, nhiều người xem ngày ký hợp đồng và tránh Tam Nương, Nguyệt Kỵ. Ở Hàn Quốc, hợp đồng bất động sản ít khi chọn ngày riêng, thường tính theo lịch thanh toán và nhận nhà, còn chuyện ngày không có Son thì dành cho việc chuyển nhà. Nếu ký giữa hai nước, chỉ cần nhớ ngày âm tại nơi ký có thể lệch một ngày. Ngày ghi trên hợp đồng là dương lịch, xem ngày chỉ là phần tham khảo thêm.`,
        },
        {
          h: `Những điều cần kiểm tra trước khi ký`,
          p: `Trước khi ký, thời gian đọc văn bản quan trọng hơn chuyện chọn ngày. Hãy xin bản đầy đủ trước một ngày, gạch chân số tiền, thời hạn, điều kiện chấm dứt hợp đồng, bồi thường và các điều khoản riêng. Thuật ngữ nào chưa hiểu thì nhờ bên kia giải thích trước khi ký; nếu số tiền lớn hay lĩnh vực xa lạ, nên nhờ chuyên gia đúng ngành xem giúp. Văn bản có nhiều ngôn ngữ thì ghi rõ bản nào là bản chuẩn. Ký xong, giữ bản sao cả dạng file lẫn bản giấy.`,
        },
        {
          h: `Có nhất thiết ký vào giờ hoàng đạo không?`,
          p: `Không bắt buộc. Giờ hoàng đạo là khung giờ trong 12 canh được coi là có sao tốt, và ký đúng giờ ấy chỉ giúp bạn thấy nhẹ lòng hơn. Với hợp đồng phải hẹn lịch với đối tác, lệch giờ cũng không cần lo lắng quá. Thời gian dành cho lần kiểm tra cuối trước khi ký mới là tấm khiên an toàn lớn hơn. Nếu vẫn băn khoăn, bạn có thể chọn ngày tốt cho bước chuẩn bị như trao đổi bản thảo hay thương lượng điều khoản.`,
        },
      ],
    },
  },

  travel: {
    ko: {
      title: `여행·출발 날짜, 이렇게 보세요`,
      sections: [
        {
          h: `먼 길을 떠나는 날의 기준`,
          p: `옛사람에게 길 떠남은 위험과 불확실이 따르는 일이어서 출발일을 따로 골랐습니다. 묵은 것을 덜어 내고 가는 제(除), 마음을 정하고 떠나는 정(定), 일을 이루고 돌아오는 성(成), 길이 열리는 개(開)를 출발에 어울린다고 봅니다. 황도일이 겹친 날 가운데 고르기 때문에 후보가 많지 않을 수 있습니다. 지금은 항공권과 휴가 일정이 날짜를 거의 정해 주니, 정해진 날이 있다면 그날의 황도시를 확인하는 정도로 활용해도 충분합니다.`,
        },
        {
          h: `베트남의 xuất hành과 한국의 설 인사`,
          p: `베트남에서는 설 연휴에 집을 나서는 xuất hành을 특히 중시해서 그해의 길한 방향과 좋은 시간, 처음 만나는 사람까지 신경 씁니다. 새해 첫 외출은 보통 절이나 사당, 친척 집으로 향하며 어른께 세뱃돈 lì xì를 받기도 합니다. 한국에서는 설에 세배를 하고 성묘를 가는 일이 비슷한 역할을 합니다. 평소 여행에서 Tam Nương 날을 피하는 사람도 있지만 지키는 정도는 집마다 달라, 가족과 상의해서 정하세요.`,
        },
        {
          h: `날짜 선택 못지않게 중요한 출발 준비`,
          p: `여행이나 출장은 날짜 선택 이상으로 준비가 안전을 좌우합니다. 여권 유효기간(많은 나라가 입국일 기준 6개월 이상을 요구합니다)과 비자, 입국 서류를 출발 한 달 전에 확인하세요. 항공권은 환불·변경 조건을 보고 산 뒤, 숙소 예약과 보험 증서를 사진으로 저장해 둡니다. 한국과 베트남을 오가는 경우 수하물 무게 제한과 반입 금지 식품 같은 항목이 항공사와 시기에 따라 다르므로 출발 직전에 다시 확인하기를 권합니다.`,
        },
        {
          h: `내 띠와 충하는 날에는 어떻게 하나요?`,
          p: `충은 그날의 지지와 내 띠의 지지가 서로 정반대에 놓인 관계를 말합니다. 예를 들어 쥐띠(子)와 말의 날(午)이 그렇습니다. 전통에서는 충하는 날 먼 길을 피하라고 했지만, 지금은 일정이 정해진 경우가 많아 "평소보다 일찍 나서고 천천히 운전한다"처럼 조심의 신호로 받아들이는 사람이 많습니다. 날씨와 교통이 실제 안전을 훨씬 크게 좌우하니, 출발 전에 그날의 기상 정보를 먼저 확인하세요.`,
        },
      ],
    },
    vi: {
      title: `Xem ngày đi xa, xuất hành`,
      sections: [
        {
          h: `Tiêu chí chọn ngày lên đường`,
          p: `Với người xưa, đi xa là việc nhiều rủi ro và bất định nên ngày khởi hành được chọn riêng. Trực Trừ (gột bỏ cái cũ để đi), Định (quyết tâm lên đường), Thành (việc xong xuôi rồi trở về) và Khai (đường mở) được coi là hợp. Vì chỉ chọn trong các ngày hoàng đạo, số ngày có thể không nhiều. Ngày nay vé máy bay và lịch nghỉ gần như đã quyết định ngày đi, nên nếu đã có ngày cố định, bạn chỉ cần xem giờ hoàng đạo trong ngày đó là đủ.`,
        },
        {
          h: `Xuất hành của người Việt và lời chúc đầu năm của người Hàn`,
          p: `Người Việt rất coi trọng xuất hành đầu năm, từ hướng tốt, giờ tốt cho đến người đầu tiên mình gặp. Lần ra khỏi nhà đầu năm thường là đến chùa, đình hay nhà họ hàng, và có thể nhận lì xì từ người lớn. Ở Hàn Quốc, việc làm lễ chúc Tết rồi đi tảo mộ có vai trò gần giống. Với những chuyến đi bình thường, có người tránh ngày Tam Nương nhưng mức độ giữ lệ mỗi nhà một khác, nên bàn với gia đình rồi quyết định.`,
        },
        {
          h: `Chuẩn bị cho chuyến đi quan trọng không kém chọn ngày`,
          p: `Với du lịch hay công tác, khâu chuẩn bị ảnh hưởng đến an toàn nhiều hơn việc chọn ngày. Hãy kiểm tra hạn hộ chiếu (nhiều nước yêu cầu còn hạn từ 6 tháng tính từ ngày nhập cảnh), visa và giấy tờ nhập cảnh trước ngày đi khoảng một tháng. Mua vé sau khi xem điều kiện hoàn, đổi vé, rồi lưu ảnh đặt phòng và giấy bảo hiểm. Trên tuyến Việt – Hàn, giới hạn hành lý và thực phẩm bị cấm mang theo khác nhau tùy hãng và thời điểm, nên kiểm tra lại sát ngày bay.`,
        },
        {
          h: `Gặp ngày xung tuổi thì nên làm gì?`,
          p: `Xung là quan hệ đối nhau giữa chi của ngày và chi của tuổi bạn, ví dụ tuổi Tý gặp ngày Ngọ. Theo truyền thống, ngày xung nên tránh đi xa, nhưng ngày nay lịch trình thường đã cố định nên nhiều người coi đó là lời nhắc cẩn thận: đi sớm hơn thường lệ và lái xe chậm hơn. Thời tiết và giao thông mới quyết định phần lớn độ an toàn, vì vậy hãy xem dự báo thời tiết trước khi lên đường.`,
        },
      ],
    },
  },

  groundbreaking: {
    ko: {
      title: `착공·동토 날짜, 이렇게 정하세요`,
      sections: [
        {
          h: `동토는 왜 날을 따로 고르나`,
          p: `집을 짓거나 크게 고칠 때 땅을 처음 파는 일을 동토(動土)라 하고, 땅을 지키는 신에게 허락을 구한다는 생각이 오래 이어져 왔습니다. 땅을 건드리는 일이라 신중하게 날을 잡았고, 12직 가운데 땅을 고르는 평(平), 터를 정하는 정(定), 일이 이루어지는 성(成), 시작이 열리는 개(開)를 어울린다고 봅니다. 황도일과 겹치는 날만 후보로 보여 드립니다. 현대 공사는 날씨와 허가 일정에 크게 좌우되니, 택일은 후보 가운데 하나를 고르는 참고로 두세요.`,
        },
        {
          h: `베트남의 động thổ와 한국의 고사`,
          p: `베트남에서는 동토 전에 집주인 나이로 Kim Lâu, Hoang Ốc, Tam Tai를 확인해, 해가 나쁘면 가족 중 다른 사람의 이름을 빌려 공사를 시작하기도 합니다. 이를 mượn tuổi라고 부릅니다. 한국에서는 터를 닦기 전에 지신께 간단히 고사를 지내는 풍습이 있고, 삼재가 든 해에는 큰 공사를 피하려는 집도 있습니다. 두 나라 모두 집안 어른의 뜻을 존중해 합의하는 일이 많습니다. 어떤 방식이든 공사업체의 일정과 맞는지부터 확인하세요.`,
        },
        {
          h: `착공 전에 정리해 둘 현실 항목`,
          p: `착공 전에 확인할 일이 많습니다. 건축·리모델링 허가나 신고가 필요한지, 이웃과 소음·먼지 문제를 어떻게 협의할지, 공사 기간에 지낼 임시 거처와 짐 보관 장소가 있는지 미리 정리해야 합니다. 시공사와는 공정표, 대금 지급 시기, 하자 보수 조건을 문서로 남기세요. 이런 절차의 구체 요건은 지역마다 달라 관할 기관과 전문가에게 확인하는 것이 안전합니다. 장마나 한겨울처럼 공사에 불리한 시기는 날짜 후보를 고를 때 함께 걸러 두면 편합니다.`,
        },
        {
          h: `착공 의식은 꼭 지내야 하나요?`,
          p: `필수가 아닙니다. 종교나 가풍에 따라 간단히 음식과 술을 올려 고사를 지내는 집도 있고, 시공팀과 가족이 모여 안전을 다짐하는 인사만 하는 집도 있습니다. 무엇을 하든 현장 안전수칙을 먼저 확인하고 첫 삽 시간이 작업 일정과 맞는지 보는 일이 더 중요합니다. 첫 삽은 상징적인 행위이니 황도시 가운데 가장 가까운 시간을 고르는 정도로 충분합니다.`,
        },
      ],
    },
    vi: {
      title: `Chọn ngày động thổ, khởi công xây dựng`,
      sections: [
        {
          h: `Vì sao động thổ phải chọn ngày riêng`,
          p: `Khi xây nhà hay sửa nhà lớn, nhát cuốc đầu tiên đào đất gọi là động thổ, và từ lâu người ta quan niệm phải xin phép vị thần cai quản đất đai. Vì động đến đất nên việc chọn ngày rất kỹ; trong thập nhị trực, Bình (san phẳng), Định (xác lập nền), Thành (nên việc) và Khai (mở đầu) được xem là hợp. Trang này chỉ liệt kê những ngày đồng thời là hoàng đạo. Công trình thời nay còn phụ thuộc nhiều vào thời tiết và giấy phép, nên xem ngày chỉ là cơ sở tham khảo để chọn trong số ngày khả thi.`,
        },
        {
          h: `Động thổ của người Việt và lễ cúng của người Hàn`,
          p: `Ở Việt Nam, trước khi động thổ người ta xem tuổi gia chủ có phạm Kim Lâu, Hoang Ốc, Tam Tai không; nếu phạm thì nhiều nhà mượn tuổi một người trong gia đình đứng tên làm nhà. Ở Hàn Quốc, trước khi san nền có lệ cúng đơn giản thần đất, và gặp năm Tam Tai có nhà tránh việc xây dựng lớn. Cả hai nước đều thường tôn trọng ý kiến người lớn trong nhà để thống nhất. Dù theo cách nào, hãy kiểm tra trước xem lịch có khớp với lịch của đơn vị thi công không.`,
        },
        {
          h: `Những việc thực tế cần rà soát trước khi khởi công`,
          p: `Trước khi khởi công có nhiều thứ cần xác nhận: công trình có cần xin phép hay thông báo không, thỏa thuận với hàng xóm về tiếng ồn và bụi thế nào, nhà tạm và nơi để đồ trong thời gian thi công ở đâu. Với nhà thầu, hãy lập văn bản về tiến độ, đợt thanh toán và điều kiện bảo hành. Yêu cầu cụ thể khác nhau theo địa phương, nên hỏi cơ quan quản lý hoặc chuyên gia cho chắc chắn. Mùa mưa kéo dài hay giữa mùa đông giá rét không thuận cho thi công, nên loại sớm khi chọn ngày dự phòng.`,
        },
        {
          h: `Có bắt buộc phải làm lễ động thổ không?`,
          p: `Không bắt buộc. Tùy tôn giáo và nếp nhà, có gia đình cúng đồ ăn, rượu và thắp hương; có nhà chỉ tụ họp với đội thi công để chúc nhau an toàn. Dù làm gì, việc xem quy tắc an toàn công trường và giờ nhát cuốc đầu có hợp tiến độ hay không còn quan trọng hơn. Nhát cuốc đầu mang tính tượng trưng, chỉ cần chọn giờ hoàng đạo gần nhất là đủ.`,
        },
      ],
    },
  },

  vehicle: {
    ko: {
      title: `차 구입·출고 날짜, 이렇게 고르세요`,
      sections: [
        {
          h: `차를 들이는 날에 수(收)를 보는 까닭`,
          p: `차는 집 다음으로 큰 살림이고 매일 몸을 맡기는 물건이라 들이는 날을 고르는 사람이 많습니다. 12직 가운데 거두어들인다는 수(收), 정해서 맞이한다는 정(定), 이룬다는 성(成), 열린다는 개(開)를 좋게 봅니다. 구입에는 계약, 대금 지급, 인수처럼 단계가 여럿 있으니 어느 단계에 날을 맞출지 가족이 먼저 합의해 두면 헷갈리지 않습니다. 이 페이지는 황도일과 이 직이 겹치는 날을 추려 보여 드립니다.`,
        },
        {
          h: `베트남의 새 차 의례와 한국의 차 고사`,
          p: `베트남에서는 새 차나 오토바이를 받으면 향과 과일을 올리고 안전을 비는 lễ cúng xe를 지내는 가정이 있습니다. 차에 붉은 천이나 복을 비는 작은 장식을 다는 경우도 있습니다. 한국에서는 새 차 앞에 막걸리와 북어, 돼지머리를 놓고 고사를 지내는 문화가 있고, 돼지머리 입에 지폐를 꽂기도 합니다. 둘 다 안전하게 오래 타기를 바라는 마음이고 형식은 집마다 다릅니다. 지금은 간단히 인사만 하는 사람도 많습니다.`,
        },
        {
          h: `인수하는 날 꼭 확인할 것`,
          p: `날짜 못지않게 실제 차량 점검이 중요합니다. 인수하는 날에는 외관 흠집, 실내 옵션, 주행거리, 부속품과 보증서를 계약 내용과 하나씩 대조하고, 이상이 있으면 서명하기 전에 말하세요. 등록과 번호판, 보험 가입은 운전을 시작하기 전에 끝나 있어야 하며 필요한 서류는 나라마다 다릅니다. 베트남에서 오토바이를 샀다면 등록증과 보험 증명을 받았는지 확인하세요. 첫 운전은 낮 시간에 익숙한 길로 짧게 다녀오는 것을 권합니다.`,
        },
        {
          h: `중고차를 살 때도 날을 보나요?`,
          p: `보는 사람이 많습니다. 중고차는 전 주인이 있다 보니 "차를 새로 맞이한다"는 뜻으로 인수일을 고르는 경우가 있습니다. 하지만 더 신경 쓸 것은 사고 이력과 정비 기록 같은 객관적인 확인입니다. 택일은 안심을 위한 의식이라 이런 확인을 대신하지 못합니다. 판매자와 일정을 맞춰야 하니 후보 날짜를 두세 개 가지고 협의하세요. 이력 확인이 끝나지 않았다면 날짜가 좋아도 서둘러 인수하지 않는 편이 낫습니다.`,
        },
      ],
    },
    vi: {
      title: `Chọn ngày mua xe, nhận xe`,
      sections: [
        {
          h: `Vì sao xem trực Thu khi đưa xe về nhà`,
          p: `Xe là tài sản lớn thứ hai sau nhà và ngày nào cũng chở cả bản thân mình, nên nhiều người chọn ngày đưa xe về. Trong thập nhị trực, Thu (thu vào), Định (đã chốt để đón), Thành (nên việc) và Khai (mở ra) được coi là tốt. Mua xe có nhiều bước như ký hợp đồng, thanh toán, nhận xe, vì vậy cả nhà nên thống nhất trước sẽ chọn ngày theo bước nào để khỏi nhầm. Trang này liệt kê những ngày vừa hoàng đạo vừa thuộc các trực nói trên.`,
        },
        {
          h: `Lễ cúng xe mới ở Việt Nam và nghi thức của người Hàn`,
          p: `Ở Việt Nam, nhiều gia đình khi nhận xe hoặc xe máy mới sẽ thắp hương, bày hoa quả và làm lễ cúng xe để cầu bình an. Có người treo thêm mảnh vải đỏ hoặc vật nhỏ cầu may trên xe. Ở Hàn Quốc có tục đặt rượu gạo makgeolli, cá khô và đầu heo trước xe mới để cúng, thậm chí cắm tiền vào miệng đầu heo. Cả hai đều mong xe đi bền, đi an toàn và hình thức mỗi nhà một khác. Ngày nay cũng nhiều người chỉ làm lễ đơn giản.`,
        },
        {
          h: `Những điều phải kiểm tra trong ngày nhận xe`,
          p: `Kiểm tra xe thực tế quan trọng không kém chuyện chọn ngày. Hôm nhận xe, hãy đối chiếu từng mục với hợp đồng: vết xước ngoài thân xe, tiện nghi bên trong, số km, phụ kiện và phiếu bảo hành; có gì lạ thì nói ra trước khi ký. Đăng ký, biển số và bảo hiểm cần xong trước khi lái, giấy tờ cần thiết mỗi nước một khác. Nếu mua xe máy ở Việt Nam, hãy xem đã nhận giấy đăng ký và giấy bảo hiểm chưa. Lần lái đầu nên đi ngắn, vào ban ngày, trên đường quen.`,
        },
        {
          h: `Mua xe cũ có cần xem ngày không?`,
          p: `Nhiều người vẫn xem. Xe cũ đã có chủ trước nên ngày nhận xe mang ý nghĩa đón chiếc xe về như mới với mình. Nhưng việc đáng để tâm hơn là kiểm tra khách quan như lịch sử tai nạn và hồ sơ bảo dưỡng. Xem ngày là nghi thức cho yên tâm, không thay thế những bước đó. Vì phải khớp lịch với người bán, hãy chuẩn bị hai ba ngày dự phòng để thương lượng. Nếu chưa kiểm tra xong lịch sử xe, dù ngày đẹp cũng đừng vội nhận.`,
        },
      ],
    },
  },

  haircut: {
    ko: {
      title: `머리 자르는 날, 이렇게 골라 보세요`,
      sections: [
        {
          h: `머리 자르는 날에도 직(職)이 있습니다`,
          p: `옛 유교 문화에서는 머리카락을 부모에게 받은 몸의 일부로 여겨 함부로 자르지 않았고, 그래서 자르는 날도 정성을 들여 보았습니다. 12직의 제(除)는 묵은 것을 덜어낸다는 뜻이라 이발에 가장 잘 어울리고, 평(平)은 고르게 한다는 뜻이라 손질에 어울립니다. 성(成)과 개(開)는 새 모습으로 새 일을 여는 때에 알맞다고 봅니다. 이 페이지는 황도일 가운데 이 직의 날을 추려 보여 드립니다.`,
        },
        {
          h: `설 직전 이발과 베트남의 금기`,
          p: `베트남에서는 설날 첫날에 머리를 감거나 자르면 복이 씻겨 나간다고 여겨 피하는 풍습이 있어서, 연말에 미리 이발소와 미용실을 찾는 사람이 많습니다. 한국에서도 설 전에 몸과 머리를 단정히 하는 것은 비슷하지만 설날 아침에 머리를 못 자르게 하는 풍습이 강하지는 않습니다. 베트남 달력으로 날을 고른다면 Tam Nương 날을 피해 보세요. 이런 풍습은 지역과 집안에 따라 달라서 가족의 방식을 따르면 됩니다.`,
        },
        {
          h: `자르기 전에 챙길 현실 팁`,
          p: `머리는 자른 뒤 하루이틀 지나야 제 모양이 잡힙니다. 펌이나 염색은 모발 상태에 따라 시간이 더 걸리니, 중요한 일정이 있다면 일주일쯤 여유를 두는 편이 안전합니다. 미용실에서는 원하는 길이와 참고 사진을 보여 주고, 두피가 예민하거나 알레르기가 있다면 시술 전에 알려 주세요. 염색 뒤 색이 빠지는 속도와 관리법도 미리 물어 두면 좋습니다. 단골 미용실은 연휴 전에 예약이 일찍 찹니다.`,
        },
        {
          h: `염색이나 펌도 이발과 같은 날을 보나요?`,
          p: `대체로 같은 기준으로 봅니다. 모양을 바꾸는 일이라 평(平)이나 성(成)일을 더 좋게 보는 사람도 있고, 상한 머리를 정리하는 이발은 제(除)일이 어울린다고 합니다. 여러 번 방문해야 하는 시술이라면 첫 방문만 택일해도 충분합니다. 시술은 모발과 두피 상태, 미용사의 설명이 우선이니 날짜가 맞는다고 무리하게 진행하지는 마세요.`,
        },
      ],
    },
    vi: {
      title: `Chọn ngày cắt tóc, làm tóc`,
      sections: [
        {
          h: `Cắt tóc cũng có ngày và trực riêng`,
          p: `Theo nếp Nho giáo xưa, mái tóc là phần cơ thể nhận từ cha mẹ nên không tùy tiện cắt, vì thế ngày cắt cũng được chọn cẩn thận. Trong thập nhị trực, Trừ nghĩa là gột bỏ cái cũ nên hợp với cắt tóc nhất, còn Bình nghĩa là làm cho đều nên hợp với việc tỉa tót. Thành và Khai được cho là hợp khi bạn muốn có diện mạo mới để mở đầu một việc mới. Trang này liệt kê những ngày hoàng đạo thuộc các trực đó.`,
        },
        {
          h: `Cắt tóc trước Tết và điều kiêng kỵ của người Việt`,
          p: `Người Việt kiêng gội đầu, cắt tóc vào mùng 1 Tết vì sợ “rửa trôi” tài lộc, nên cuối năm tiệm cắt tóc luôn đông khách. Ở Hàn Quốc, người ta cũng chỉn chu đầu tóc trước Tết nhưng ít có tục kiêng cắt tóc vào sáng mùng 1. Nếu chọn ngày theo lịch Việt, hãy tránh ngày Tam Nương. Tục này tùy vùng và tùy nhà, cứ làm theo nếp của gia đình mình là được.`,
        },
        {
          h: `Những điều thực tế nên lưu ý trước khi cắt`,
          p: `Tóc thường vào nếp sau khi cắt một hai ngày. Uốn hoặc nhuộm cần thêm thời gian tùy tình trạng tóc, nên nếu có lịch quan trọng, chừa dư khoảng một tuần sẽ an toàn hơn. Ở tiệm, hãy nói rõ độ dài mong muốn và đưa ảnh tham khảo; nếu da đầu nhạy cảm hoặc dễ dị ứng, báo trước khi làm. Cũng nên hỏi sẵn màu nhuộm phai nhanh hay chậm và cách chăm sóc. Tiệm quen thường kín lịch sớm vào dịp trước kỳ nghỉ lễ.`,
        },
        {
          h: `Nhuộm hay uốn tóc có xem ngày giống cắt tóc không?`,
          p: `Nhìn chung xem theo cùng tiêu chí. Vì là việc thay đổi kiểu dáng nên có người thích ngày trực Bình hoặc Thành hơn, còn cắt tỉa phần tóc hư thì hợp ngày trực Trừ. Nếu phải đến tiệm nhiều lần, chỉ chọn ngày cho lần đầu là đủ. Tình trạng tóc, da đầu và lời tư vấn của thợ quan trọng hơn, đừng cố làm chỉ vì ngày đẹp.`,
        },
      ],
    },
  },
};
