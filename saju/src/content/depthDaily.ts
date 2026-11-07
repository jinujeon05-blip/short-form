import type { Lang } from '../i18n';
import type { DepthText } from './depthTypes';

/** key = 띠 slug (src/engine/yearly.ts의 ANIMAL_SLUGS) */
export const DAILY_DEPTH: Record<string, Record<Lang, DepthText>> = {
  rat: {
    ko: {
      title: '쥐띠 일일 운세, 이렇게 읽어 보세요',
      sections: [
        { h: '눈치 빠른 쥐띠의 하루', p: `쥐띠는 눈치가 빠르고 정보에 밝다고 전해집니다. 회의 전에 분위기부터 살피고, 장을 볼 때도 어느 가게가 싼지 머릿속에 지도를 그리는 모습이 그렇습니다. 그래서 오늘 운세에 말조심 같은 문구가 보이는 날엔 빠른 판단이 오히려 말실수로 번질 수 있다고 읽습니다. 순탄한 날엔 모아 둔 정보를 꺼내 쓰기 좋습니다. 한 줄 문구를 하루의 속도 조절 신호로 삼아 보세요.` },
        { h: '소와 합, 말과 충이 하루에 뜻하는 것', p: `쥐띠의 육합은 소띠, 삼합은 용띠·원숭이띠이고 충은 말띠입니다. 오늘의 일진이 소(축)일 때는 사람 운이 따르는 날로 읽어, 미뤄 둔 부탁이나 인사를 건네기에 좋다고 봅니다. 용·원숭이 일진이면 여럿이 손발을 맞추는 일이 편합니다. 말(오) 일진은 충이라 일정이 틀어지거나 마음이 들뜨기 쉬운 날로 보니, 이동과 큰 결정은 한 번 더 확인하는 쪽이 낫습니다.` },
        { h: '자시에 깨어 있는 쥐띠의 시간 감각', p: `쥐띠의 시진은 밤 11시부터 새벽 1시까지인 자시입니다. 밤에 생각이 또렷해지는 사람이 많은 것도 이 때문이라고들 말합니다. 반대로 정오 전후인 오시(11~13시)는 충하는 시간대라, 중요한 계약 서명이나 감정이 실린 대화는 이 시간을 피해 오전 일찍이나 오후 늦게로 옮겨 보세요. 밤 11시를 넘겨 일하기보다 그 전에 접는 쪽이 다음 날 운세를 읽기에도 편합니다.` },
        { h: '운세가 안 좋다고 나오면 하루 종일 조심해야 하나요?', p: `그렇지 않습니다. 일일 운세는 오늘의 일진과 내 띠의 관계 하나를 바탕으로 한 가벼운 참고입니다. 충이 있는 날도 하루 종일 위태롭다는 뜻이 아니라, 평소보다 확인을 한 번 더 하라는 신호 정도로 보면 됩니다. 쥐띠는 꼼꼼히 챙기는 편이니 약속 시간·메시지 수신인·결제 금액 같은 작은 것만 점검하고, 나머지는 평소대로 보내셔도 무방합니다.` },
      ],
    },
    vi: {
      title: 'Cách đọc vận thế hằng ngày của tuổi Tý',
      sections: [
        { h: 'Một ngày của người tuổi Tý nhanh nhạy', p: `Người tuổi Tý được cho là nhạy bén và rành thông tin. Trước cuộc họp họ thường dò không khí trước, đi chợ cũng nhớ sẵn quán nào rẻ. Vì vậy khi vận thế hôm nay nhắc “cẩn thận lời nói”, phản xạ quá nhanh dễ thành lỡ lời. Ngày suôn sẻ lại là lúc nên dùng những thông tin đã tích lũy. Hãy xem câu ngắn ấy như đèn hiệu để chỉnh nhịp cho cả ngày.` },
        { h: 'Hợp với Sửu, xung với Ngọ: nghĩa là gì cho một ngày', p: `Lục hợp của Tý là Sửu, tam hợp là Thìn và Thân, còn xung là Ngọ. Khi nhật thần hôm nay là Sửu, người ta cho là có quý nhân, hợp để nhờ vả hoặc hỏi thăm điều còn dang dở. Ngày Thìn hay Thân thì làm việc nhóm khá ăn ý. Ngày Ngọ là ngày xung, lịch dễ lệch và tâm trí dễ xốn xang, nên đi lại hay quyết định lớn hãy kiểm tra thêm một lần.` },
        { h: 'Giờ Tý và cảm giác thời gian của tuổi Tý', p: `Giờ của tuổi Tý là giờ Tý, từ 23 giờ đến 1 giờ sáng. Nhiều người tuổi này tỉnh táo hơn vào ban đêm cũng vì thế, theo cách nói dân gian. Ngược lại, giờ Ngọ (11–13 giờ) xung với giờ Tý, nên việc ký kết quan trọng hoặc cuộc nói chuyện nhiều cảm xúc hãy dời sang sáng sớm hay chiều muộn. Thay vì thức quá 23 giờ để làm việc, nên dừng trước đó để hôm sau đọc vận thế cũng nhẹ đầu hơn.` },
        { h: 'Vận thế báo xấu thì có phải thận trọng cả ngày không?', p: `Không hẳn. Vận thế hằng ngày chỉ dựa vào quan hệ giữa nhật thần hôm nay và tuổi của bạn, nên chỉ là tham khảo nhẹ. Ngày xung không có nghĩa cả ngày bất ổn, mà là lời nhắc kiểm tra thêm một lần so với thường lệ. Người tuổi Tý vốn tỉ mỉ, chỉ cần rà lại giờ hẹn, người nhận tin nhắn, số tiền thanh toán; phần còn lại cứ sinh hoạt như mọi ngày.` },
      ],
    },
  },
  ox: {
    ko: {
      title: '소띠 일일 운세, 이렇게 읽어 보세요',
      sections: [
        { h: '꾸준한 소띠가 하루를 쓰는 법', p: `소띠는 한번 정한 일을 끝까지 하는 끈기와 성실함으로 알려져 있습니다. 출근길이 늘 같고 점심 메뉴도 잘 안 바꾸는 모습이 그렇습니다. 그래서 오늘 운세가 평범하다고 나오는 날은 오히려 소띠에게 맞는 날로 읽습니다. 새로운 시도보다 밀린 정리와 마무리에 힘을 쓰면 편합니다. 다만 고집이 센 날로 풀이되면 상대 의견을 한 번 끝까지 들어 보세요.` },
        { h: '쥐와 합, 양과 충이 하루에 뜻하는 것', p: `소띠의 육합은 쥐띠이고, 삼합은 뱀띠·닭띠, 충은 양띠입니다. 쥐(자) 일진은 서로 끌어 주는 날로 보아 협업이나 도움 요청에 알맞다고 전해집니다. 뱀·닭 일진은 계획한 일이 순서대로 풀리는 날로 읽습니다. 양(미) 일진은 충이라 마음이 서로 어긋나기 쉬우니, 평소처럼 밀어붙이기보다 상대 속도를 맞춰 보세요. 감정 섞인 말은 하루 미루는 편이 낫습니다.` },
        { h: '새벽 축시를 아는 소띠의 시간표', p: `소띠의 시진은 새벽 1시~3시 축시입니다. 대부분 잠든 시간이니, 소띠에게는 이른 아침 컨디션이 하루 운을 좌우한다고들 말합니다. 하루를 짤 때는 오전 일찍 중요한 일을 앞에 두고, 충하는 미시(오후 1~3시)에는 점심 직후의 졸음과 겹치기 쉬우니 가벼운 업무나 이동을 배치해 보세요. 늦은 밤 작업은 줄이고 일정한 시각에 하루를 닫는 습관이 소띠에게 어울립니다.` },
        { h: '운세가 날마다 달라지는 이유는 무엇인가요?', p: `하루의 지지(일진)가 열두 가지로 돌아가며 바뀌기 때문입니다. 일진이 12일에 한 번씩 같은 지지로 돌아오므로, 소띠에게 쥐 일진이나 양 일진도 정기적으로 찾아옵니다. 즉 운세가 변한 것은 내가 달라져서가 아니라 기준이 되는 날의 글자가 달라져서입니다. 이 원리를 알면 좋은 날에 들뜨거나 나쁜 날에 위축되기보다, 오늘은 어떤 날인지 가볍게 읽고 넘기기 쉬워집니다.` },
      ],
    },
    vi: {
      title: 'Cách đọc vận thế hằng ngày của tuổi Sửu',
      sections: [
        { h: 'Cách người tuổi Sửu dùng một ngày', p: `Tuổi Sửu nổi tiếng bền bỉ và chăm chỉ, đã định việc gì là làm đến cùng. Đường đi làm ít khi đổi, bữa trưa cũng ít thay món. Vì thế ngày vận thế được báo là bình thường lại hợp với người tuổi Sửu. Hãy dồn sức dọn dẹp việc tồn đọng và hoàn tất thay vì thử cái mới. Nếu hôm nay được nhắc là dễ cố chấp, hãy nghe ý người kia hết câu rồi mới đáp.` },
        { h: 'Hợp với Tý, xung với Mùi: nghĩa là gì cho một ngày', p: `Lục hợp của Sửu là Tý, tam hợp là Tỵ và Dậu, xung là Mùi. Ngày Tý được xem là ngày nâng đỡ lẫn nhau, hợp để phối hợp hoặc mở lời nhờ giúp. Ngày Tỵ hay Dậu, việc đã định thường đi theo đúng trình tự. Ngày Mùi là ngày xung, tâm ý dễ lệch nhau; thay vì cứ đẩy tới như mọi khi, hãy theo nhịp đối phương và để những lời nặng cảm xúc sang hôm sau.` },
        { h: 'Giờ Sửu và thời khóa biểu của người tuổi Sửu', p: `Giờ của tuổi Sửu là giờ Sửu, 1–3 giờ sáng, lúc đa số đã ngủ. Vì vậy người ta hay nói trạng thái buổi sáng sớm quyết định phần lớn nhịp ngày của tuổi này. Khi lên kế hoạch, hãy xếp việc quan trọng vào đầu buổi sáng. Giờ Mùi (13–15 giờ) xung với giờ Sửu và dễ trùng lúc buồn ngủ sau bữa trưa, nên dành cho việc nhẹ hoặc di chuyển. Bớt làm khuya, đóng ngày vào một giờ cố định sẽ hợp với tuổi Sửu.` },
        { h: 'Vì sao vận thế đổi mỗi ngày?', p: `Vì địa chi của ngày (nhật thần) quay vòng qua mười hai con giáp. Cứ 12 ngày nhật thần lại trở về cùng một chi, nên ngày Tý hay ngày Mùi cũng đến với tuổi Sửu đều đặn. Nghĩa là vận thế đổi không phải vì bạn thay đổi, mà vì chữ của ngày làm chuẩn đã khác. Hiểu vậy, bạn sẽ ít phấn khích quá mức ngày tốt hay chùn bước ngày xấu, mà chỉ đọc nhẹ xem hôm nay là ngày thế nào rồi tiếp tục.` },
      ],
    },
  },
  tiger: {
    ko: {
      title: '호랑이띠 일일 운세, 이렇게 읽어 보세요',
      sections: [
        { h: '추진력 강한 호랑이띠의 하루', p: `호랑이띠는 결단이 빠르고 앞장서기를 좋아한다고 전해집니다. 팀에서 아무도 안 나설 때 먼저 손을 들고, 약속 장소도 대개 먼저 정해 버리는 모습입니다. 그래서 오늘 운세가 활기찬 날로 나오면 미뤄 둔 첫 단추를 끼우기 좋다고 읽습니다. 반대로 신중하라는 문구가 보이는 날엔 앞서가는 마음을 반 걸음만 늦춰 보세요. 호랑이띠에게는 속도를 줄이는 것이 가장 큰 조심입니다.` },
        { h: '돼지와 합, 원숭이와 충이 하루에 뜻하는 것', p: `호랑이띠의 육합은 돼지띠, 삼합은 말띠·개띠, 충은 원숭이띠입니다. 돼지(해) 일진은 부드럽게 도움이 오는 날로 보아 부탁이나 화해에 좋다고 전해집니다. 말·개 일진은 뜻이 맞는 사람과 일이 빨리 풀리는 날입니다. 원숭이(신) 일진은 충이라 기세가 부딪히기 쉬우니 논쟁이나 급한 이동을 줄이세요. 이런 날엔 이기려 하기보다 한발 물러서는 쪽이 하루가 조용합니다.` },
        { h: '인시의 호랑이띠가 시간을 나누는 법', p: `호랑이띠의 시진은 새벽 3시~5시 인시로, 하루가 막 열리는 때입니다. 그래서 호랑이띠는 아침 시작이 좋아야 하루가 풀린다고들 합니다. 일정은 오전에 몰아 중요한 결정을 앞쪽에 두세요. 충하는 신시(오후 3~5시)는 피로가 쌓이고 의견이 부딪히기 쉬운 시간대로 읽으니, 이때는 회의보다 정리·이동 같은 부드러운 일이 어울립니다. 해 질 녘에 무리하게 마무리 짓지 마세요.` },
        { h: '충이 있는 날에는 중요한 약속을 미뤄야 하나요?', p: `꼭 그렇지는 않습니다. 충은 변동이 생기기 쉽다는 뜻이지 일이 틀어진다는 선고가 아닙니다. 이미 잡힌 약속이라면 그대로 가되, 시간 여유를 넉넉히 두고 상대에게 한 번 더 확인하는 정도면 충분합니다. 새로 정하는 자리라면 가능한 한 합이 드는 날로 옮기는 것도 방법입니다. 다만 일정을 고를 수 있을 때의 이야기이니, 운세 때문에 꼭 필요한 일까지 미룰 필요는 없습니다.` },
      ],
    },
    vi: {
      title: 'Cách đọc vận thế hằng ngày của tuổi Dần',
      sections: [
        { h: 'Một ngày của người tuổi Dần quyết đoán', p: `Người tuổi Dần được cho là dứt khoát và thích đi đầu. Khi cả nhóm im lặng, họ là người giơ tay trước; chỗ hẹn thường cũng do họ chốt. Vì thế ngày vận thế báo tràn đầy sinh khí là lúc hợp để làm bước đầu của việc đã hoãn. Còn khi lời nhắc là nên thận trọng, hãy chậm nửa bước. Với tuổi Dần, hạ bớt tốc độ chính là cách cẩn thận lớn nhất.` },
        { h: 'Hợp với Hợi, xung với Thân: nghĩa là gì cho một ngày', p: `Lục hợp của Dần là Hợi, tam hợp là Ngọ và Tuất, xung là Thân. Ngày Hợi được xem là ngày sự giúp đỡ đến nhẹ nhàng, hợp để nhờ vả hoặc làm hòa. Ngày Ngọ hay Tuất, người hợp ý dễ cùng làm việc nhanh gọn. Ngày Thân là ngày xung, khí thế dễ va chạm nên bớt tranh luận và việc đi lại gấp. Những hôm đó, lùi một bước thường khiến cả ngày yên ả hơn là cố thắng.` },
        { h: 'Giờ Dần: cách người tuổi Dần chia thời gian', p: `Giờ của tuổi Dần là giờ Dần, 3–5 giờ sáng, lúc ngày vừa mở. Vì thế người ta nói tuổi Dần khởi đầu buổi sáng tốt thì cả ngày thông suốt. Hãy dồn lịch vào buổi sáng, đặt quyết định quan trọng ở phía trước. Giờ Thân (15–17 giờ) xung với giờ Dần, là lúc mệt tích tụ và ý kiến dễ va nhau, nên hợp với việc mềm như sắp xếp, di chuyển hơn là họp. Chiều tà đừng cố chốt mọi thứ cho xong.` },
        { h: 'Ngày xung có nên dời cuộc hẹn quan trọng không?', p: `Không nhất thiết. Xung nghĩa là dễ có biến động chứ không phải lời tuyên án rằng việc sẽ hỏng. Cuộc hẹn đã chốt thì cứ đi, chỉ cần chừa thêm thời gian và nhắn xác nhận với đối phương một lần. Nếu đang chọn lịch mới, dời sang ngày hợp cũng là một cách. Nhưng đó chỉ là khi bạn có quyền chọn; đừng vì vận thế mà hoãn những việc thật sự cần làm.` },
      ],
    },
  },
  rabbit: {
    ko: {
      title: '토끼띠 일일 운세, 이렇게 읽어 보세요',
      sections: [
        { h: '섬세한 토끼띠가 하루를 보내는 방식', p: `토끼띠는 분위기에 예민하고 사람 사이를 부드럽게 잇는다고 전해집니다. 메신저 답장에 쓰는 말투를 고르고, 모임에서 소외된 사람을 먼저 챙기는 모습이 그렇습니다. 그래서 운세에 감정 소모를 조심하라는 문구가 나오는 날엔 남의 기분까지 떠안지 않는 것이 포인트입니다. 평온한 날엔 미뤄 둔 연락이나 정리를 하기 좋습니다. 예민함은 좋은 날 장점이 되고 힘든 날엔 쉼표가 필요하다는 신호입니다.` },
        { h: '개와 합, 닭과 충이 하루에 뜻하는 것', p: `토끼띠의 육합은 개띠, 삼합은 양띠·돼지띠, 충은 닭띠입니다. 개(술) 일진은 믿을 만한 사람과 마음이 통하는 날로 읽어 고민 상담이나 약속 잡기에 좋다고 봅니다. 양·돼지 일진은 분위기가 부드럽게 흘러 협업이 편한 날입니다. 닭(유) 일진은 충이라 말 한마디가 날카롭게 들리기 쉬우니, 메시지는 보내기 전에 한 번 읽어 보고 농담의 수위도 낮추세요.` },
        { h: '묘시의 아침형 토끼띠를 위한 시간 계획', p: `토끼띠의 시진은 아침 5시~7시 묘시입니다. 해가 막 떠오르는 때라 조용한 아침 시간이 토끼띠의 집중력을 지켜 준다고들 합니다. 중요한 글쓰기나 판단은 오전에 하세요. 충하는 유시(오후 5~7시)는 퇴근 무렵 피로와 사람의 소음이 겹치는 때라 신경이 곤두서기 쉽다고 읽습니다. 이 시간엔 큰 말다툼이 날 대화를 피하고, 걷기나 저녁 준비처럼 손을 쓰는 일로 감정을 가라앉혀 보세요.` },
        { h: '입춘 전에 태어나면 띠가 달라지나요? 어느 쪽을 봐야 하죠?', p: `명리에서는 설날이 아니라 입춘(2월 4일 무렵)을 한 해의 시작으로 봅니다. 그래서 1~2월 초에 태어난 분은 달력상의 띠와 사주의 띠가 다를 수 있습니다. 이 페이지는 일반적으로 쓰는 띠를 기준으로 하니, 입춘 이전 출생이라면 앞 해의 띠 운세도 함께 읽어 보세요. 정확히 알고 싶다면 사주 계산 도구에서 생년월일을 넣어 확인하는 편이 빠릅니다.` },
      ],
    },
    vi: {
      title: 'Cách đọc vận thế hằng ngày của tuổi Mão (mèo)',
      sections: [
        { h: 'Người tuổi Mão tinh tế trải qua một ngày', p: `Tuổi Mão (mèo) được cho là nhạy với bầu không khí và khéo nối mọi người lại với nhau. Họ cân nhắc giọng điệu khi trả lời tin nhắn, và để ý người đang lạc lõng trong buổi gặp. Nên khi vận thế nhắc đừng hao tổn cảm xúc, điều quan trọng là không ôm luôn tâm trạng của người khác. Ngày êm ả hợp để nhắn tin cho người lâu chưa liên lạc hoặc dọn dẹp. Sự nhạy cảm là điểm mạnh ngày tốt, và là lời báo cần nghỉ ngày nặng nề.` },
        { h: 'Hợp với Tuất, xung với Dậu: nghĩa là gì cho một ngày', p: `Lục hợp của Mão là Tuất, tam hợp là Mùi và Hợi, xung là Dậu. Ngày Tuất được xem là ngày hợp ý với người đáng tin, hợp để tâm sự hoặc hẹn gặp. Ngày Mùi hay Hợi không khí trôi mượt, làm việc chung dễ chịu. Ngày Dậu là ngày xung, một câu nói dễ nghe gắt hơn ý định, nên hãy đọc lại tin nhắn trước khi gửi và bớt đùa quá đà.` },
        { h: 'Giờ Mão và kế hoạch thời gian cho người dậy sớm', p: `Giờ của tuổi Mão là giờ Mão, 5–7 giờ sáng, lúc mặt trời vừa lên. Người ta nói buổi sáng yên tĩnh giữ được sự tập trung của tuổi này. Việc viết lách hay quyết định quan trọng nên làm buổi sáng. Giờ Dậu (17–19 giờ) xung với giờ Mão: mệt cuối ngày chồng lên tiếng ồn người qua lại nên dễ căng thần kinh. Lúc đó tránh những cuộc nói chuyện dễ thành cãi vã, hãy dùng việc tay chân như đi bộ hay nấu bữa tối để dịu lại.` },
        { h: 'Sinh trước Lập xuân thì tuổi có khác không? Xem theo bên nào?', p: `Trong mệnh lý, năm bắt đầu từ Lập xuân (khoảng 4/2) chứ không phải Tết. Vì vậy người sinh đầu năm dương lịch hay trước Tết có thể có tuổi trên lịch khác tuổi trong lá số. Trang này theo cách tính tuổi thông thường, nên nếu bạn sinh trước Lập xuân, hãy đọc thêm vận thế của tuổi năm trước. Muốn biết chính xác, nhập ngày sinh vào công cụ tính Tứ trụ sẽ nhanh hơn.` },
      ],
    },
  },
  dragon: {
    ko: {
      title: '용띠 일일 운세, 이렇게 읽어 보세요',
      sections: [
        { h: '존재감 큰 용띠의 하루 장면', p: `용띠는 포부가 크고 눈에 띄는 자리를 마다하지 않는다고 전해집니다. 발표 자리에서 목소리가 먼저 커지고, 모임에서 자연스럽게 중심이 되는 모습입니다. 오늘 운세가 좋으면 그 기운을 밀고 나가기 좋지만, 조심하라는 날에는 말이 크게 들려 부담을 줄 수 있다고 읽습니다. 용띠에게는 큰 그림을 말하기 전에 오늘 할 구체적인 한 가지를 정해 두는 습관이 도움이 됩니다.` },
        { h: '닭과 합, 개와 충이 하루에 뜻하는 것', p: `용띠의 육합은 닭띠, 삼합은 쥐띠·원숭이띠, 충은 개띠입니다. 닭(유) 일진은 서로 맞물려 일이 정리되는 날로 보아 협상이나 마무리에 좋다고 전해집니다. 쥐·원숭이 일진은 재치 있는 사람과 어울려 일이 술술 풀리는 날로 읽습니다. 개(술) 일진은 충이라 자존심 부딪힘이 생기기 쉬우니, 옳고 그름을 따지기보다 상대의 체면을 살려 주는 말투가 하루를 지켜 줍니다.` },
        { h: '진시의 용띠가 오전을 쓰는 법', p: `용띠의 시진은 아침 7시~9시 진시로, 출근길과 하루의 첫 업무가 겹칩니다. 그래서 용띠는 오전에 기세를 타는 편이라고들 하니 가장 무거운 일을 이때 놓아 보세요. 충하는 술시(저녁 7~9시)는 하루가 느슨해지며 말이 길어지기 쉬운 때입니다. 이 시간에 큰 지출이나 감정 섞인 결정은 피하고, 하루를 돌아보며 내일 할 일 한 줄을 적는 정도로 마무리하면 좋습니다.` },
        { h: '출생연도별 한 줄 운세는 띠 운세와 어떻게 다른가요?', p: `띠 운세는 같은 띠 전체가 공유하는 큰 흐름이고, 출생연도별 한 줄은 같은 용띠 안에서 해마다 달라지는 간지 조합을 더해 표현을 나눈 것입니다. 예를 들어 같은 용띠여도 출생 해의 천간이 다르면 한 줄이 다를 수 있습니다. 다만 둘 다 가벼운 참고용이라 서로 모순돼 보여도 어느 쪽이 맞는지 따지기보다, 오늘 하루 마음가짐을 고르는 힌트로 두 가지를 함께 읽으시면 됩니다.` },
      ],
    },
    vi: {
      title: 'Cách đọc vận thế hằng ngày của tuổi Thìn (rồng)',
      sections: [
        { h: 'Khung cảnh một ngày của người tuổi Thìn nổi bật', p: `Tuổi Thìn (rồng) được cho là hoài bão lớn và không ngại đứng ở vị trí dễ thấy. Khi thuyết trình, giọng họ lên trước; trong buổi gặp họ tự nhiên thành trung tâm. Ngày vận thế tốt là lúc thuận đà tiến lên, còn ngày được nhắc thận trọng, lời lớn có thể thành áp lực cho người nghe. Với tuổi Thìn, trước khi nói chuyện bức tranh lớn, hãy chọn sẵn một việc cụ thể cho hôm nay.` },
        { h: 'Hợp với Dậu, xung với Tuất: nghĩa là gì cho một ngày', p: `Lục hợp của Thìn là Dậu, tam hợp là Tý và Thân, xung là Tuất. Ngày Dậu được xem là ngày mọi việc khớp nhau và gọn lại, hợp để thương lượng hay kết thúc việc. Ngày Tý hay Thân gặp người lanh lợi nên việc trôi chảy. Ngày Tuất là ngày xung, lòng tự trọng dễ va chạm; thay vì phân đúng sai, giữ thể diện cho đối phương trong lời nói sẽ bảo vệ cả ngày của bạn.` },
        { h: 'Giờ Thìn: cách dùng buổi sáng của tuổi Thìn', p: `Giờ của tuổi Thìn là giờ Thìn, 7–9 giờ sáng, trùng giờ đi làm và việc đầu ngày. Người ta bảo tuổi này lên đà vào buổi sáng, nên hãy đặt việc nặng nhất vào lúc đó. Giờ Tuất (19–21 giờ) xung với giờ Thìn, là lúc ngày chùng xuống và dễ nói dài. Tránh chi tiêu lớn hay quyết định theo cảm xúc vào giờ này; chỉ cần nhìn lại ngày và ghi một dòng cho việc ngày mai là đủ.` },
        { h: 'Câu vận thế theo năm sinh khác gì vận thế theo tuổi?', p: `Vận thế theo tuổi là dòng chảy chung của cả con giáp, còn câu theo năm sinh thêm tổ hợp can chi khác nhau của từng năm trong cùng tuổi Thìn để diễn đạt khác đi. Cùng là Thìn nhưng Thiên can năm sinh khác thì câu có thể khác. Cả hai đều chỉ mang tính tham khảo nhẹ, nếu thấy chúng không giống nhau thì không cần phân xử bên nào đúng, hãy đọc cùng lúc như gợi ý để chọn tâm thế cho hôm nay.` },
      ],
    },
  },
  snake: {
    ko: {
      title: '뱀띠 일일 운세, 이렇게 읽어 보세요',
      sections: [
        { h: '깊이 생각하는 뱀띠의 하루', p: `뱀띠는 말수가 적어도 속으로 깊이 따져 보는 사람이라고 전해집니다. 새 제안을 받으면 바로 답하지 않고 하루 이틀 곱씹어 보고, 사람을 사귈 때도 충분히 지켜본 뒤 마음을 엽니다. 그래서 오늘 운세에서 결정을 서두르지 말라는 날은 뱀띠에게 무리가 없습니다. 오히려 직관이 맞아떨어진다는 날에는 미뤄 둔 판단을 가볍게 내려 보세요. 신중함이 때로 기회를 놓치는 이유가 되기도 합니다.` },
        { h: '원숭이와 합, 돼지와 충이 하루에 뜻하는 것', p: `뱀띠의 육합은 원숭이띠, 삼합은 소띠·닭띠, 충은 돼지띠입니다. 원숭이(신) 일진은 재치 있는 도움이 오는 날로 읽어 아이디어를 나누기에 좋다고 봅니다. 소·닭 일진은 차분하고 믿음직한 흐름이라 마감이나 정리 일이 잘 풀립니다. 돼지(해) 일진은 충이라 마음속 계산과 현실이 어긋나기 쉬우니, 속으로만 판단하지 말고 의도를 한 번 말로 확인해 보세요. 오해가 줄어듭니다.` },
        { h: '사시의 뱀띠가 오전과 저녁을 나누는 법', p: `뱀띠의 시진은 오전 9시~11시 사시입니다. 오전 중반에 집중력이 오른다고들 하니 생각을 요하는 일을 이 시간대에 놓아 보세요. 충하는 해시(밤 9~11시)는 하루의 피로가 쌓이고 생각이 꼬리를 무는 시간으로 읽습니다. 밤늦게 결론을 내리면 아침에 달라 보일 수 있으니, 중요한 판단은 해시를 넘기기 전에 적어만 두고 다음 날 사시에 다시 열어 보는 방식이 뱀띠에게 어울립니다.` },
        { h: '행운의 색이나 숫자는 꼭 따라야 하나요?', p: `따르지 않아도 됩니다. 행운의 색과 숫자는 하루의 분위기를 상징적으로 정리한 장식에 가깝습니다. 옷이나 소품에 색을 가볍게 맞추면 기분 전환이 되는 정도로 쓰시고, 그 때문에 일정이나 돈 쓰는 방식을 바꿀 필요는 없습니다. 뱀띠처럼 숙고하는 분은 숫자에 의미를 너무 붙이다 생각이 길어질 수 있으니, 오늘의 한 줄 문구를 중심으로 읽고 나머지는 재미로 곁들이세요.` },
      ],
    },
    vi: {
      title: 'Cách đọc vận thế hằng ngày của tuổi Tỵ (rắn)',
      sections: [
        { h: 'Một ngày của người tuổi Tỵ hay suy nghĩ sâu', p: `Người tuổi Tỵ (rắn) được cho là ít nói nhưng cân nhắc rất kỹ trong lòng. Nhận được lời đề nghị mới, họ không đáp ngay mà ngẫm một hai hôm; kết bạn cũng quan sát đủ lâu rồi mới mở lòng. Vì vậy ngày vận thế dặn đừng vội quyết lại hợp với họ. Còn khi được nhắc rằng trực giác đúng, hãy mạnh dạn chốt phán đoán đã hoãn. Thận trọng đôi lúc cũng là lý do bỏ lỡ cơ hội.` },
        { h: 'Hợp với Thân, xung với Hợi: nghĩa là gì cho một ngày', p: `Lục hợp của Tỵ là Thân, tam hợp là Sửu và Dậu, xung là Hợi. Ngày Thân được xem là ngày có sự giúp đỡ lanh lợi, hợp để trao đổi ý tưởng. Ngày Sửu hay Dậu, nhịp điệu điềm đạm đáng tin nên việc chốt hạn hay dọn dẹp thuận lợi. Ngày Hợi là ngày xung, tính toán trong đầu dễ lệch với thực tế; đừng chỉ tự phán đoán trong lòng mà hãy nói ra ý định để xác nhận. Hiểu lầm sẽ ít đi.` },
        { h: 'Giờ Tỵ: cách tuổi Tỵ chia buổi sáng và buổi tối', p: `Giờ của tuổi Tỵ là giờ Tỵ, 9–11 giờ sáng. Người ta nói sự tập trung lên cao vào giữa buổi sáng, nên hãy đặt việc cần suy nghĩ vào lúc này. Giờ Hợi (21–23 giờ) xung với giờ Tỵ: mệt cả ngày dồn lại, suy nghĩ cứ vòng vo. Kết luận lúc đêm khuya có thể sáng hôm sau trông khác, vì thế quyết định quan trọng nên chỉ ghi lại trước giờ Hợi rồi mở ra xem lại vào giờ Tỵ hôm sau, cách ấy hợp với tuổi Tỵ.` },
        { h: 'Màu hay con số may mắn có nhất định phải theo không?', p: `Không bắt buộc. Màu và số may mắn gần như món trang trí tóm tắt không khí của ngày theo cách tượng trưng. Bạn có thể chọn áo hay phụ kiện hợp màu cho vui, nhưng không cần vì thế mà đổi lịch hay cách tiêu tiền. Người hay cân nhắc như tuổi Tỵ dễ gán ý nghĩa quá nhiều cho con số rồi nghĩ mãi, nên hãy lấy câu nhận định chính của hôm nay làm trọng tâm, phần còn lại xem như thêm chút thú vị.` },
      ],
    },
  },
  horse: {
    ko: {
      title: '말띠 일일 운세, 이렇게 읽어 보세요',
      sections: [
        { h: '활동적인 말띠의 하루를 옮기면', p: `말띠는 가만히 있기보다 움직일 때 힘이 나고 솔직하고 시원시원하다고 전해집니다. 점심시간에 산책하러 나가고, 마음에 안 드는 일은 표정으로 먼저 드러나는 모습입니다. 그래서 운세에서 이동·결정을 조심하라는 날엔 일정을 줄이기보다 순서를 바꿔 보세요. 가벼운 일을 먼저 처리하고 큰 판단은 오후로 미루는 식입니다. 좋은 날에는 그 활력으로 미룬 연락을 해치우면 좋습니다.` },
        { h: '양과 합, 쥐와 충이 하루에 뜻하는 것', p: `말띠의 육합은 양띠, 삼합은 호랑이띠·개띠, 충은 쥐띠입니다. 양(미) 일진은 마음이 편안해지고 서로 이해해 주는 날로 읽어 가까운 사람과 시간을 보내기 좋다고 봅니다. 호랑이·개 일진은 의욕이 같은 방향으로 모이는 날입니다. 쥐(자) 일진은 충이라 분주함 속에 방향이 흔들리기 쉬우니, 해야 할 일 세 가지만 적어 두고 나머지는 내려놓으세요. 급한 마음이 실수를 부릅니다.` },
        { h: '오시의 한낮에 서 있는 말띠의 시간표', p: `말띠의 시진은 낮 11시~13시 오시로, 해가 가장 높은 때입니다. 말띠는 점심 무렵 기운이 정점이라고들 하니 중요한 만남이나 발표를 이 앞뒤로 두세요. 충하는 자시(밤 11시~새벽 1시)는 하루 중 가장 쉬어야 하는 시간이라 말띠가 늦도록 깨어 있으면 다음 날 리듬이 흔들리기 쉽습니다. 밤 11시 전에 화면을 끄는 습관이 말띠의 낮 활력을 지키는 가장 쉬운 방법입니다.` },
        { h: '오늘 운세가 좋은 날 큰 결정을 해도 되나요?', p: `좋은 날은 마음이 가볍고 사람 운이 따른다는 참고일 뿐, 큰 결정을 대신 보증해 주지는 않습니다. 말띠는 기분이 오르면 결정을 서두르는 경향이 있으니, 운세가 좋다는 이유만으로 계약·큰 지출을 정하지 말고 하룻밤 두었다가 다음 날 같은 생각인지 확인해 보세요. 운세는 시작할 용기를 주는 정도로 쓰고, 금액이나 조건은 직접 따져 보는 것이 안전합니다.` },
      ],
    },
    vi: {
      title: 'Cách đọc vận thế hằng ngày của tuổi Ngọ (ngựa)',
      sections: [
        { h: 'Một ngày của người tuổi Ngọ năng động', p: `Tuổi Ngọ (ngựa) được cho là có sức khi vận động hơn là ngồi yên, thẳng thắn và dứt khoát. Giờ nghỉ trưa đi dạo, việc không vừa ý thì nét mặt lộ ra trước. Nên khi vận thế dặn thận trọng di chuyển và quyết định, đừng cắt bớt lịch mà hãy đổi thứ tự: làm việc nhẹ trước, dời phán đoán lớn sang chiều. Ngày tốt thì dùng nhiệt huyết ấy để trả lời những liên lạc còn nợ.` },
        { h: 'Hợp với Mùi, xung với Tý: nghĩa là gì cho một ngày', p: `Lục hợp của Ngọ là Mùi, tam hợp là Dần và Tuất, xung là Tý. Ngày Mùi được xem là ngày lòng nhẹ nhõm, hiểu nhau, hợp để ở bên người thân. Ngày Dần hay Tuất, ý chí cùng dồn về một hướng. Ngày Tý là ngày xung, giữa bận rộn dễ lạc hướng; hãy ghi ra ba việc phải làm, còn lại buông bớt. Nóng vội mới là thứ dễ gây sai sót.` },
        { h: 'Giờ Ngọ giữa trưa và thời khóa biểu của tuổi Ngọ', p: `Giờ của tuổi Ngọ là giờ Ngọ, 11–13 giờ trưa, khi mặt trời lên cao nhất. Người ta nói tuổi này đạt sung sức quanh bữa trưa, nên hãy đặt cuộc gặp hay buổi trình bày quan trọng gần khung này. Giờ Tý (23 giờ đến 1 giờ sáng) xung với giờ Ngọ và là lúc cần nghỉ nhất; thức khuya dễ làm nhịp hôm sau xô lệch. Tắt màn hình trước 23 giờ là cách đơn giản nhất để giữ sức cho buổi trưa.` },
        { h: 'Ngày vận thế tốt có nên quyết việc lớn không?', p: `Ngày tốt chỉ là gợi ý rằng lòng nhẹ và có quý nhân, không đảm bảo thay cho một quyết định lớn. Người tuổi Ngọ khi hứng thường chốt vội, nên đừng ký hợp đồng hay chi khoản lớn chỉ vì vận thế tốt; hãy để qua đêm rồi xem hôm sau còn nghĩ như vậy không. Dùng vận thế để có thêm dũng khí bắt đầu, còn số tiền và điều kiện thì tự mình cân nhắc sẽ an toàn hơn.` },
      ],
    },
  },
  goat: {
    ko: {
      title: '양띠 일일 운세, 이렇게 읽어 보세요',
      sections: [
        { h: '온화한 양띠가 하루를 지내는 모습', p: `양띠는 온화하고 배려심이 깊다고 전해집니다. 점심 메뉴를 고를 때 남의 의견부터 묻고, 부탁을 받으면 거절 못 해 일을 떠안기도 합니다. 그래서 오늘 운세에 부탁보다 거절이 필요한 날이라는 문구가 보이면 양띠에게 특히 의미가 큽니다. 부드러운 사람은 하루를 마칠 때 자기 몫의 시간이 남아 있는지 돌아보는 것이 좋습니다. 좋은 날엔 그 다정함이 일을 풀어 주는 열쇠가 됩니다.` },
        { h: '말과 합, 소와 충이 하루에 뜻하는 것', p: `양띠의 육합은 말띠, 삼합은 토끼띠·돼지띠, 충은 소띠입니다. 말(오) 일진은 활기찬 사람의 도움을 받는 날로 읽어, 소극적이던 일에 힘이 붙는다고 봅니다. 토끼·돼지 일진은 분위기가 부드러워 대화가 잘 통합니다. 소(축) 일진은 충이라 고집과 고집이 맞서기 쉬우니, 양보하는 마음이 쌓이기 전에 가볍게 의견을 먼저 말하세요. 참다가 터지는 것보다 일찍 말하는 편이 하루가 편합니다.` },
        { h: '미시의 양띠를 위한 오후 감각', p: `양띠의 시진은 오후 1시~3시 미시로, 점심 후 느긋해지는 때입니다. 이때 몸이 처지는 양띠가 많다고 하니 이 시간엔 가벼운 대화나 정리처럼 부담 적은 일이 어울립니다. 충하는 축시(새벽 1~3시)는 깊이 자야 하는 때라, 잠을 설치면 그 영향이 양띠에게 더 크게 남는다고들 말합니다. 중요한 일은 오전 늦게나 오후 늦게로 두고, 밤에는 일찍 불을 끄는 쪽이 양띠의 하루 리듬에 맞습니다.` },
        { h: '일진과 형·해가 나오는 날은 충과 어떻게 다른가요?', p: `충은 정면으로 부딪히는 관계라 변동이 크다고 읽고, 해(害)는 은근히 어긋나는 관계라 작은 오해가 쌓이기 쉬운 날로 봅니다. 형(刑)은 규칙과 절차를 어기면 문제가 생기기 쉬운 날입니다. 즉 충은 큰 결정과 이동 쪽, 해는 말과 감정 쪽, 형은 서류·약속 쪽을 살피라는 뜻입니다. 양띠는 특히 해의 날에 말을 삼키지 말고 짧게라도 표현해 두면 오해가 줄어듭니다.` },
      ],
    },
    vi: {
      title: 'Cách đọc vận thế hằng ngày của tuổi Mùi (dê)',
      sections: [
        { h: 'Người tuổi Mùi hiền hòa trải qua một ngày', p: `Tuổi Mùi (dê) được cho là hiền hòa và chu đáo. Chọn món trưa thì hỏi ý người khác trước, bị nhờ vả khó từ chối nên hay ôm việc. Vì thế khi vận thế nói hôm nay cần từ chối hơn là nhờ vả, câu ấy đặc biệt có ý nghĩa với tuổi Mùi. Người dịu dàng nên nhìn lại cuối ngày xem còn thời gian cho riêng mình không. Ngày tốt, sự ân cần ấy là chìa khóa gỡ việc.` },
        { h: 'Hợp với Ngọ, xung với Sửu: nghĩa là gì cho một ngày', p: `Lục hợp của Mùi là Ngọ, tam hợp là Mão và Hợi, xung là Sửu. Ngày Ngọ được xem là ngày nhận sự giúp đỡ của người năng động, việc vốn rụt rè có thêm sức. Ngày Mão hay Hợi, không khí mềm mại nên trò chuyện dễ hiểu nhau. Ngày Sửu là ngày xung, cái cứng đầu dễ chạm cái cứng đầu; hãy nói ý mình nhẹ nhàng sớm, trước khi sự nhường nhịn dồn lại. Nói sớm thì cả ngày dễ chịu hơn là nhịn đến lúc bùng nổ.` },
        { h: 'Giờ Mùi: cảm giác buổi chiều của tuổi Mùi', p: `Giờ của tuổi Mùi là giờ Mùi, 13–15 giờ, lúc thư thái sau bữa trưa. Nhiều người tuổi này thấy người uể oải vào giờ ấy, nên hợp với việc nhẹ như trò chuyện, sắp xếp. Giờ Sửu (1–3 giờ sáng) xung với giờ Mùi và là lúc phải ngủ sâu; nếu mất ngủ, người ta nói ảnh hưởng với tuổi Mùi để lại rõ hơn. Việc quan trọng nên đặt cuối buổi sáng hoặc chiều muộn, còn buổi tối tắt đèn sớm sẽ hợp nhịp ngày của tuổi Mùi.` },
        { h: 'Ngày có hình, hại khác gì ngày xung?', p: `Xung là quan hệ đối đầu trực diện nên được đọc là nhiều biến động; hại là quan hệ lệch lạc âm thầm, ngày dễ tích những hiểu lầm nhỏ. Hình là ngày dễ có chuyện nếu trái quy tắc và thủ tục. Tóm lại: xung nhắc đi lại và quyết định lớn, hại nhắc lời nói và cảm xúc, hình nhắc giấy tờ và lịch hẹn. Tuổi Mùi vào ngày hại đừng nuốt lời vào trong, nói ngắn gọn thôi cũng giảm hiểu lầm.` },
      ],
    },
  },
  monkey: {
    ko: {
      title: '원숭이띠 일일 운세, 이렇게 읽어 보세요',
      sections: [
        { h: '재치 있는 원숭이띠의 하루', p: `원숭이띠는 머리 회전이 빠르고 호기심이 많다고 전해집니다. 새 앱이나 도구를 먼저 써 보고, 막힌 일도 다른 방법을 찾아 돌아가는 모습입니다. 그래서 운세가 활발한 날은 아이디어를 실행으로 옮기기에 좋다고 읽습니다. 반대로 산만함을 조심하라는 날엔 하던 일을 마무리하기 전까지 새 탭을 열지 않는 규칙이 도움이 됩니다. 재주가 많은 만큼 오늘 끝낼 일을 하나만 정해 두세요.` },
        { h: '뱀과 합, 호랑이와 충이 하루에 뜻하는 것', p: `원숭이띠의 육합은 뱀띠, 삼합은 쥐띠·용띠, 충은 호랑이띠입니다. 뱀(사) 일진은 차분한 사람의 조언이 힘이 되는 날로 읽습니다. 쥐·용 일진은 사람들과 어울려 뜻밖의 연결이 생기는 날로 봅니다. 호랑이(인) 일진은 충이라 의견 충돌이나 일정 급변이 생기기 쉬우니 임기응변에 자신 있어도 한 번 더 확인하세요. 재치로 넘기려다 오히려 일이 커질 수 있습니다.` },
        { h: '신시의 원숭이띠가 오후를 쓰는 방법', p: `원숭이띠의 시진은 오후 3시~5시 신시로, 오후 업무가 속도를 내는 때입니다. 이 시간에 아이디어가 잘 나온다고들 하니 기획이나 정리를 여기에 두세요. 충하는 인시(새벽 3~5시)는 이른 새벽이라 깨어 있기보다 숙면하는 편이 좋다고 읽습니다. 새벽까지 영상이나 검색으로 시간을 보내면 다음 날 신시 집중력이 떨어질 수 있으니, 잠드는 시각을 일정하게 두는 것이 원숭이띠에게 가장 좋은 준비입니다.` },
        { h: '일주일 흐름은 얼마나 믿고 계획해도 되나요?', p: `일주일 흐름은 앞으로 7일 일진과 내 띠의 관계를 미리 계산한 것이라 어떤 날이 합이고 어떤 날이 충인지 가늠하는 용도로 쓰기 좋습니다. 그렇다고 일정을 거기에 맞춰 통째로 바꿀 필요는 없습니다. 이미 정해진 일은 그대로 두고, 고를 수 있는 날만 합이 드는 날로 조정하는 정도면 충분합니다. 원숭이띠는 계획을 자주 바꾸는 편이니 이 흐름을 메모해 두고 쓰시면 됩니다.` },
      ],
    },
    vi: {
      title: 'Cách đọc vận thế hằng ngày của tuổi Thân (khỉ)',
      sections: [
        { h: 'Một ngày của người tuổi Thân lanh lợi', p: `Người tuổi Thân (khỉ) được cho là đầu óc nhanh và tò mò. Họ thử ứng dụng mới trước, gặp việc bí thì tìm đường vòng khác. Nên ngày vận thế sôi nổi là lúc hợp để đưa ý tưởng vào thực hiện. Còn khi được nhắc cẩn thận sự phân tán, quy tắc không mở thêm tab mới cho đến khi xong việc đang làm sẽ giúp ích. Giỏi nhiều thứ thì càng nên chọn một việc phải xong trong hôm nay.` },
        { h: 'Hợp với Tỵ, xung với Dần: nghĩa là gì cho một ngày', p: `Lục hợp của Thân là Tỵ, tam hợp là Tý và Thìn, xung là Dần. Ngày Tỵ được xem là ngày lời khuyên của người điềm tĩnh thành chỗ dựa. Ngày Tý hay Thìn, giao du rộng nên dễ có mối nối bất ngờ. Ngày Dần là ngày xung, dễ bất đồng ý kiến hoặc lịch thay đổi đột ngột, dù ứng biến giỏi cũng nên kiểm tra thêm. Định xoay xở bằng tài khéo lại có thể làm việc to ra.` },
        { h: 'Giờ Thân: cách tuổi Thân dùng buổi chiều', p: `Giờ của tuổi Thân là giờ Thân, 15–17 giờ, lúc công việc buổi chiều tăng tốc. Người ta nói ý tưởng hay nảy ra vào giờ này, nên đặt việc lập kế hoạch và sắp xếp vào đây. Giờ Dần (3–5 giờ sáng) xung với giờ Thân; đó là lúc nên ngủ say hơn là thức. Thức đến sáng xem video hay lướt tìm kiếm có thể làm giờ Thân hôm sau kém tập trung, nên giữ giờ đi ngủ đều đặn là sự chuẩn bị tốt nhất cho tuổi Thân.` },
        { h: 'Xu hướng 7 ngày có đáng tin để lên kế hoạch không?', p: `Xu hướng 7 ngày là phần tính trước quan hệ giữa nhật thần các ngày tới với tuổi của bạn, tiện để hình dung ngày nào hợp, ngày nào xung. Nhưng không cần đổi cả lịch theo đó. Việc đã định cứ giữ nguyên, chỉ những ngày bạn tự chọn được thì nghiêng về ngày hợp là đủ. Người tuổi Thân hay đổi kế hoạch, cứ ghi chú xu hướng này lại để dùng khi cần.` },
      ],
    },
  },
  rooster: {
    ko: {
      title: '닭띠 일일 운세, 이렇게 읽어 보세요',
      sections: [
        { h: '꼼꼼한 닭띠가 하루를 움직이는 법', p: `닭띠는 부지런하고 세부를 놓치지 않는 성격으로 알려져 있습니다. 출근 전에 가방을 한 번 더 확인하고, 문서의 오타를 먼저 찾아내는 모습입니다. 그래서 운세에 확인하라는 문구가 나오면 평소보다 한 번 덜 걱정해도 되는 일에도 시간을 쓸 수 있습니다. 좋은 날에는 평소 미뤄 둔 정리를 해내기 좋고, 말하는 방식이 직설적으로 들릴 수 있으니 하루 한 번은 칭찬을 먼저 건네 보세요.` },
        { h: '용과 합, 토끼와 충이 하루에 뜻하는 것', p: `닭띠의 육합은 용띠, 삼합은 소띠·뱀띠, 충은 토끼띠입니다. 용(진) 일진은 의욕 있는 사람과 호흡이 맞는 날로 읽어 함께하는 일이 순조롭다고 봅니다. 소·뱀 일진은 계획대로 착실히 쌓이는 날입니다. 토끼(묘) 일진은 충이라 사소한 지적이 감정싸움으로 번지기 쉬우니, 옳은 말이라도 순서와 말투를 한 번 다듬으세요. 고치는 것보다 먼저 들어 주는 쪽이 하루를 편하게 합니다.` },
        { h: '유시, 해 질 녘의 닭띠 시간 감각', p: `닭띠의 시진은 오후 5시~7시 유시로, 해가 지는 퇴근 무렵입니다. 하루 일을 정리하고 마감하는 데 감각이 좋다고들 하니 보고서나 정산을 이 시간대에 두세요. 충하는 묘시(아침 5~7시)는 이른 아침이라 닭띠가 서두르기 쉬운 때입니다. 아침에 허둥대면 하루 종일 확인할 거리가 늘어나므로 전날 저녁에 가방과 옷, 일정을 준비해 두는 것이 닭띠에게는 가장 현실적인 대비가 됩니다.` },
        { h: '띠 순위가 낮은 날 어떻게 보내면 좋을까요?', p: `순위는 열두 띠를 오늘 일진과의 관계로 가볍게 나열한 것이라 낮다고 해서 나쁜 하루가 된다는 뜻이 아닙니다. 순위가 낮은 날엔 새로운 도전보다 이미 하던 일을 마무리하고, 평소 하지 않던 무리한 일정은 줄이면 충분합니다. 닭띠는 정리를 좋아하니 서랍이나 파일 정리처럼 눈에 보이는 성과가 나는 일로 하루를 채워 보세요. 순위가 높은 날에도 방심하지 않고 평소대로 하면 됩니다.` },
      ],
    },
    vi: {
      title: 'Cách đọc vận thế hằng ngày của tuổi Dậu (gà)',
      sections: [
        { h: 'Cách người tuổi Dậu tỉ mỉ vận hành một ngày', p: `Tuổi Dậu (gà) nổi tiếng chăm chỉ và không bỏ sót chi tiết. Trước khi ra khỏi nhà họ kiểm tra lại túi, và là người tìm ra lỗi chính tả trong tài liệu đầu tiên. Khi vận thế nhắc kiểm tra lại, đôi khi họ tốn thời gian vào cả những việc không cần lo thêm. Ngày tốt hợp để dọn nốt việc còn dở; lời nói có thể nghe thẳng nên mỗi ngày hãy khen ai đó một lần trước khi góp ý.` },
        { h: 'Hợp với Thìn, xung với Mão: nghĩa là gì cho một ngày', p: `Lục hợp của Dậu là Thìn, tam hợp là Sửu và Tỵ, xung là Mão. Ngày Thìn được xem là ngày ăn ý với người nhiều nhiệt huyết, việc làm chung suôn sẻ. Ngày Sửu hay Tỵ, mọi thứ tích lũy đều đặn theo kế hoạch. Ngày Mão là ngày xung, một lời nhận xét nhỏ dễ thành cãi vã; dù đúng, hãy chỉnh lại thứ tự và giọng điệu. Lắng nghe trước khi sửa sẽ làm ngày nhẹ nhàng hơn.` },
        { h: 'Giờ Dậu: cảm giác thời gian lúc hoàng hôn', p: `Giờ của tuổi Dậu là giờ Dậu, 17–19 giờ, lúc tan làm khi mặt trời lặn. Người ta nói tuổi này khéo tổng kết và đóng việc, nên đặt báo cáo hay quyết toán vào giờ này. Giờ Mão (5–7 giờ sáng) xung với giờ Dậu, là lúc người tuổi Dậu dễ vội. Buổi sáng cuống thì cả ngày thêm việc phải kiểm tra, nên chuẩn bị túi, quần áo và lịch từ tối hôm trước là cách ứng phó thực tế nhất.` },
        { h: 'Ngày con giáp xếp hạng thấp nên trải qua thế nào?', p: `Bảng xếp hạng chỉ là cách sắp nhẹ mười hai con giáp theo quan hệ với nhật thần hôm nay, nên hạng thấp không có nghĩa ngày xấu. Ngày hạng thấp, chỉ cần hoàn tất việc đang làm hơn là thử thách mới, và bớt lịch dày hơn thường lệ. Tuổi Dậu thích sắp xếp, hãy lấp ngày bằng việc cho kết quả nhìn thấy được như dọn ngăn kéo hay tập tin. Ngày hạng cao cũng không chủ quan, cứ sinh hoạt như thường.` },
      ],
    },
  },
  dog: {
    ko: {
      title: '개띠 일일 운세, 이렇게 읽어 보세요',
      sections: [
        { h: '의리 있는 개띠의 하루', p: `개띠는 의리와 책임감이 강하고 정직하다고 전해집니다. 친구가 부르면 일정을 쪼개서라도 가고, 맡은 일은 끝까지 챙기는 모습입니다. 그래서 오늘 운세가 사람 운이 좋다고 나오는 날엔 그 신뢰가 일로 이어지기 좋습니다. 다만 손해 보는 부탁까지 다 받아 주면 지치니, 힘든 날엔 내 일부터 하고 돕겠다고 말해 두세요. 의리와 무리는 다르다는 것을 하루 한 번 떠올려 보셔도 좋습니다.` },
        { h: '토끼와 합, 용과 충이 하루에 뜻하는 것', p: `개띠의 육합은 토끼띠, 삼합은 호랑이띠·말띠, 충은 용띠입니다. 토끼(묘) 일진은 마음이 통하고 안정되는 날로 읽어 속마음을 나누기 좋다고 봅니다. 호랑이·말 일진은 활기찬 사람들과 함께 일이 빨리 진행되는 날입니다. 용(진) 일진은 충이라 자존심과 주도권이 부딪히기 쉬우니, 상대가 앞서가도 일단 지켜보세요. 의심이 커지는 날이기도 하니 확인 없이 속단하지 않는 것이 좋습니다.` },
        { h: '술시, 저녁에 힘이 나는 개띠의 일정', p: `개띠의 시진은 저녁 7시~9시 술시로, 하루가 느슨하게 정리되는 때입니다. 가족이나 가까운 사람과 시간을 보내면 기운이 채워진다고들 하니 중요한 대화나 모임은 저녁에 두어도 좋습니다. 충하는 진시(아침 7~9시)는 출근길로 몸과 마음이 아직 덜 풀린 때입니다. 이 시간엔 어려운 협의를 피하고 이메일 확인이나 오늘 할 일 목록 정리처럼 부담 없는 일부터 시작하면 하루가 부드럽게 열립니다.` },
        { h: '연인·가족과 띠가 충이면 그날 만나지 말아야 하나요?', p: `그럴 필요는 없습니다. 띠의 충은 오래 함께하는 관계 전체를 가르는 기준이 아니라 오늘의 일진과 내 띠를 비교한 일일 참고입니다. 가족이나 연인의 띠가 용띠여서 걱정된다면, 그날은 중요한 협의나 말다툼 소지가 있는 주제만 피하고 식사나 산책처럼 편한 시간을 함께하면 됩니다. 오히려 서로 조심하는 마음이 생겨 관계에 도움이 되기도 합니다. 운세보다 서로의 사정이 먼저입니다.` },
      ],
    },
    vi: {
      title: 'Cách đọc vận thế hằng ngày của tuổi Tuất (chó)',
      sections: [
        { h: 'Một ngày của người tuổi Tuất trọng nghĩa', p: `Tuổi Tuất (chó) được cho là trọng nghĩa, có trách nhiệm và thật thà. Bạn gọi là họ chia lịch để đến, việc nhận rồi thì lo đến cùng. Vì thế ngày vận thế báo quý nhân tốt, lòng tin ấy dễ chuyển thành công việc. Có điều nhận hết mọi lời nhờ thiệt thòi sẽ mệt, nên hôm nặng nề cứ nói trước là làm xong việc mình rồi mới giúp. Mỗi ngày nhớ một lần rằng nghĩa khí khác với cố quá sức.` },
        { h: 'Hợp với Mão, xung với Thìn: nghĩa là gì cho một ngày', p: `Lục hợp của Tuất là Mão, tam hợp là Dần và Ngọ, xung là Thìn. Ngày Mão được xem là ngày lòng thông suốt và yên ổn, hợp để tâm sự. Ngày Dần hay Ngọ, cùng người năng động nên việc tiến nhanh. Ngày Thìn là ngày xung, lòng tự trọng và quyền chủ động dễ va nhau; dù đối phương đi trước cũng cứ quan sát đã. Đây cũng là ngày lòng nghi dễ lớn, nên đừng kết luận khi chưa xác nhận.` },
        { h: 'Giờ Tuất: lịch trình của người tuổi Tuất khỏe vào buổi tối', p: `Giờ của tuổi Tuất là giờ Tuất, 19–21 giờ, lúc ngày được thu xếp thong thả. Người ta nói ở bên gia đình hay người thân thì tuổi này nạp lại sức, nên cuộc trò chuyện hay buổi gặp quan trọng đặt buổi tối cũng được. Giờ Thìn (7–9 giờ sáng) xung với giờ Tuất, khi người còn chưa tỉnh hẳn trên đường đi làm. Lúc này tránh việc bàn bạc khó, bắt đầu bằng việc nhẹ như xem thư hay lập danh sách việc hôm nay để ngày mở ra êm hơn.` },
        { h: 'Nếu tuổi của người yêu hay gia đình xung thì hôm đó có nên tránh gặp không?', p: `Không cần. Xung giữa các con giáp không phải thước đo cả mối quan hệ lâu dài, mà chỉ là tham khảo hằng ngày khi so nhật thần hôm nay với tuổi bạn. Nếu lo vì người thân tuổi Thìn, hôm đó chỉ cần tránh bàn việc nặng hay chủ đề dễ cãi, còn bữa ăn hay đi dạo thì cứ bên nhau. Đôi khi sự để ý lẫn nhau còn có ích cho mối quan hệ. Hoàn cảnh của nhau luôn quan trọng hơn vận thế.` },
      ],
    },
  },
  pig: {
    ko: {
      title: '돼지띠 일일 운세, 이렇게 읽어 보세요',
      sections: [
        { h: '너그러운 돼지띠가 하루를 보내는 모습', p: `돼지띠는 너그럽고 복스러우며 순수하다고 전해집니다. 친구에게 밥을 사 주면서 계산서는 개의치 않고, 사람의 말을 쉽게 믿는 편이기도 합니다. 그래서 운세에 지출이나 약속 확인이 필요하다는 날엔 이 선한 면이 틈이 되지 않도록 한 번 더 살피세요. 순탄한 날엔 사람들과 먹고 쉬며 에너지를 채우기 좋습니다. 하루의 좋은 기운을 내 몫으로 남겨 두는 것도 돼지띠에게는 연습이 필요합니다.` },
        { h: '호랑이와 합, 뱀과 충이 하루에 뜻하는 것', p: `돼지띠의 육합은 호랑이띠, 삼합은 토끼띠·양띠, 충은 뱀띠입니다. 호랑이(인) 일진은 추진력 있는 사람이 이끌어 주는 날로 읽어, 망설이던 일에 용기가 붙는다고 봅니다. 토끼·양 일진은 온화한 흐름이라 대화가 부드럽고 협업이 편합니다. 뱀(사) 일진은 충이라 상대의 속뜻을 놓치기 쉬우니 좋은 말만 믿지 말고 조건을 한 번 더 물어보세요. 너그러움은 지키되 확인은 놓지 마세요.` },
        { h: '해시, 밤에 편안해지는 돼지띠의 하루 마무리', p: `돼지띠의 시진은 밤 9시~11시 해시로, 하루를 닫고 쉬는 때입니다. 이 시간에 휴식을 충분히 취하는 것이 돼지띠의 기운을 지킨다고들 하니 야식이나 화면보다 조용한 정리로 하루를 닫아 보세요. 충하는 사시(오전 9~11시)는 하루 업무가 한창인 때로, 돼지띠에게는 서둘러야 하는 느낌이 부담일 수 있습니다. 오전 중 중요한 일은 전날 밤에 준비해 두고, 오전에는 한 가지씩 차분히 처리하는 것이 좋습니다.` },
        { h: '운세는 몇 시에 보는 것이 좋은가요?', p: `정해진 시간은 없고, 하루를 시작하기 전 아침이나 전날 밤이 무난합니다. 운세는 일진이 하루 단위로 바뀌니 미리 알고 일정을 가볍게 조정하는 용도로 쓰기 좋습니다. 돼지띠는 마음이 말랑해 문구에 쉽게 영향받는 편이니, 하루 중 여러 번 확인하기보다 한 번만 읽고 오늘의 마음가짐 한 가지만 가져가세요. 나쁜 문구가 나와도 너무 오래 곱씹지 않는 것이 좋습니다.` },
      ],
    },
    vi: {
      title: 'Cách đọc vận thế hằng ngày của tuổi Hợi (lợn)',
      sections: [
        { h: 'Người tuổi Hợi rộng lượng trải qua một ngày', p: `Tuổi Hợi (lợn) được cho là rộng lượng, phúc hậu và trong sáng. Mời bạn bè ăn mà không để ý hóa đơn, cũng dễ tin lời người khác. Vì thế khi vận thế nhắc kiểm tra chi tiêu hay lịch hẹn, hãy soát thêm một lần để cái tốt ấy không thành kẽ hở. Ngày êm ả hợp để ăn nghỉ cùng mọi người cho đầy năng lượng. Giữ lại một phần khí tốt của ngày cho chính mình cũng là điều tuổi Hợi cần tập.` },
        { h: 'Hợp với Dần, xung với Tỵ: nghĩa là gì cho một ngày', p: `Lục hợp của Hợi là Dần, tam hợp là Mão và Mùi, xung là Tỵ. Ngày Dần được xem là ngày có người quyết đoán dẫn dắt, việc còn do dự có thêm dũng khí. Ngày Mão hay Mùi, dòng chảy hiền hòa nên trò chuyện và làm chung dễ chịu. Ngày Tỵ là ngày xung, dễ bỏ sót ẩn ý của đối phương; đừng chỉ tin lời hay mà hãy hỏi lại điều kiện. Cứ rộng lượng, nhưng đừng buông việc xác nhận.` },
        { h: 'Giờ Hợi: kết thúc ngày thư thái của người tuổi Hợi', p: `Giờ của tuổi Hợi là giờ Hợi, 21–23 giờ, lúc khép ngày và nghỉ ngơi. Người ta nói nghỉ đủ vào giờ này giữ được khí của tuổi Hợi, nên thay vì ăn khuya hay nhìn màn hình, hãy khép ngày bằng việc sắp xếp yên tĩnh. Giờ Tỵ (9–11 giờ sáng) xung với giờ Hợi, khi công việc đang cao điểm và cảm giác phải gấp có thể là gánh nặng. Việc quan trọng buổi sáng hãy chuẩn bị từ đêm trước, và buổi sáng làm từng việc một cho bình tĩnh.` },
        { h: 'Nên xem vận thế vào lúc mấy giờ?', p: `Không có giờ cố định; buổi sáng trước khi bắt đầu ngày hoặc tối hôm trước là hợp lý. Vận thế đổi theo nhật thần từng ngày nên dùng để biết trước và chỉnh nhẹ lịch. Người tuổi Hợi lòng mềm, dễ bị câu chữ tác động, vì thế đừng kiểm tra nhiều lần trong ngày, đọc một lần và mang theo một tâm thế cho hôm nay là đủ. Dù gặp câu không tốt cũng đừng nghĩ ngợi quá lâu.` },
      ],
    },
  },
};
