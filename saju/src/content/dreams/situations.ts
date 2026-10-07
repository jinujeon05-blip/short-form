import type { Dream } from './types';

export const SITUATION_DREAMS: Dream[] = [
  {
    slug: 'money', category: 'situation', tone: 'mixed', emoji: '💰',
    ko: {
      name: '돈 꿈', keywords: ['돈 줍는 꿈', '돈 받는 꿈', '지폐', '동전', '돈 잃어버리는 꿈'],
      summary: '돈 꿈은 생각과 달리 해석이 갈립니다. 큰돈을 받으면 실제로는 책임이나 걱정이 따른다는 풀이도 있습니다.',
      korea: '전통 해몽에서는 지폐를 주우면 근심거리가 생긴다고 보는 경우도 있고, 동전을 주우면 작은 구설이 생긴다고 풉니다. 반면 남에게 돈을 받거나 돈다발을 안으면 실제 재물이 들어온다는 길몽으로 봅니다. 돈을 잃어버리는 꿈은 오히려 걱정이 사라진다고 풀기도 합니다.',
      vietnam: '베트남에서는 돈(tiền) 꿈을 대체로 재물운으로 봅니다. 돈을 줍는 꿈은 뜻밖의 수입, 돈을 잃는 꿈은 지출을 조심하라는 뜻입니다.',
      cases: [
        ['돈다발을 받는 꿈', '실제 재물이나 기회가 들어오는 길몽입니다.'],
        ['길에서 지폐를 줍는 꿈', '맡게 될 책임이나 걱정이 생길 수 있습니다.'],
        ['동전을 줍는 꿈', '작은 말다툼이나 잔걱정을 조심하세요.'],
        ['돈을 잃어버리는 꿈', '근심이 덜어지거나, 지출을 조심하라는 뜻입니다.'],
      ],
    },
    vi: {
      name: 'Mơ thấy tiền', keywords: ['tiền', 'nhặt được tiền', 'mất tiền', 'được cho tiền'],
      summary: 'Giấc mơ về tiền có nhiều cách giải. Theo người Hàn, được nhiều tiền đôi khi lại là phải gánh thêm trách nhiệm.',
      korea: 'Giải mộng Hàn Quốc có cách hiểu khá thú vị: nhặt tiền giấy có thể là sắp có việc phải lo; nhặt tiền xu là dễ có thị phi nhỏ. Nhưng được người khác đưa tiền hay ôm cả xấp tiền thì là tài lộc thật. Mất tiền trong mơ lại có khi là bớt được nỗi lo.',
      vietnam: 'Người Việt thường xem mơ thấy tiền là điềm tài lộc: nhặt được tiền là có khoản thu bất ngờ, mất tiền là nên cẩn thận chi tiêu.',
      cases: [
        ['Mơ được cho cả xấp tiền', 'Tài lộc hoặc cơ hội thật sự đến.'],
        ['Mơ nhặt tiền giấy ngoài đường', 'Có thể phải nhận thêm trách nhiệm, việc lo.'],
        ['Mơ nhặt tiền xu', 'Cẩn thận lời qua tiếng lại.'],
        ['Mơ mất tiền', 'Bớt được lo âu, hoặc nên dè chừng chi tiêu.'],
      ],
    },
  },
  {
    slug: 'falling', category: 'situation', tone: 'bad', emoji: '🪂',
    ko: {
      name: '떨어지는 꿈', keywords: ['높은 데서 떨어지는 꿈', '추락', '낭떠러지', '추락하는 꿈'],
      summary: '높은 곳에서 떨어지는 꿈은 불안과 통제력을 잃을까 하는 걱정을 비춥니다. 땅에 무사히 닿으면 걱정이 기우라는 뜻입니다.',
      korea: '옛말에 "떨어지는 꿈을 꾸면 키가 큰다"고 할 만큼 성장기에는 흔한 꿈입니다. 어른이 꾸면 지위나 계획이 흔들릴까 하는 불안을 뜻하며, 떨어지다 날아오르면 위기를 기회로 바꾼다고 봅니다.',
      vietnam: '베트남에서도 떨어지는 꿈(mơ thấy rơi từ trên cao)은 일이나 관계에서 자신감을 잃은 상태를 뜻한다고 봅니다.',
      cases: [
        ['낭떠러지에서 떨어지는 꿈', '큰 결정을 앞두고 불안합니다. 계획을 한 번 더 점검하세요.'],
        ['떨어지다 잠에서 깨는 꿈', '피로와 긴장이 쌓였다는 신호입니다.'],
        ['떨어졌는데 다치지 않는 꿈', '걱정한 일이 생각보다 잘 풀립니다.'],
        ['떨어지다 날아오르는 꿈', '위기를 기회로 바꾸는 길몽입니다.'],
      ],
    },
    vi: {
      name: 'Mơ thấy rơi từ trên cao', keywords: ['rơi từ trên cao', 'ngã', 'rơi xuống vực', 'rơi tự do'],
      summary: 'Mơ rơi từ trên cao phản ánh lo lắng, sợ mất kiểm soát. Tiếp đất an toàn là nỗi lo không đáng có.',
      korea: 'Người Hàn có câu “mơ rơi là đang cao lớn”, vì trẻ con hay mơ như vậy. Người lớn mơ thấy thì đó là nỗi lo về địa vị, kế hoạch; đang rơi mà bay lên được là biến nguy thành cơ.',
      vietnam: 'Người Việt cũng cho rằng mơ rơi từ trên cao là đang thiếu tự tin trong công việc hoặc chuyện tình cảm.',
      cases: [
        ['Mơ rơi xuống vực', 'Lo lắng trước quyết định lớn — kiểm tra lại kế hoạch.'],
        ['Mơ đang rơi thì tỉnh dậy', 'Dấu hiệu mệt mỏi, căng thẳng tích tụ.'],
        ['Mơ rơi mà không bị thương', 'Việc lo lắng sẽ ổn hơn bạn nghĩ.'],
        ['Mơ đang rơi thì bay lên', 'Điềm tốt: biến khó khăn thành cơ hội.'],
      ],
    },
  },
  {
    slug: 'chased', category: 'situation', tone: 'bad', emoji: '🏃',
    ko: {
      name: '쫓기는 꿈', keywords: ['쫓기는 꿈', '도망가는 꿈', '누군가 쫓아오는 꿈', '귀신 꿈'],
      summary: '누군가에게 쫓기는 꿈은 미뤄 둔 일이나 피하고 싶은 문제가 있다는 신호입니다.',
      korea: '쫓아오는 대상이 사람이면 대인 관계의 부담, 동물이면 일이나 돈의 압박을 뜻한다고 봅니다. 끝내 잡히지 않고 도망치면 위기를 넘기고, 맞서 싸워 이기면 오히려 큰 성취를 얻는다고 풉니다.',
      vietnam: '베트남에서도 쫓기는 꿈(mơ bị truy đuổi)은 스트레스와 해결하지 못한 문제를 뜻하며, 숨어서 피하면 시간이 해결해 준다고 봅니다.',
      cases: [
        ['모르는 사람에게 쫓기는 꿈', '정체를 모를 불안이 있습니다. 걱정을 적어 정리해 보세요.'],
        ['짐승에게 쫓기는 꿈', '일이나 돈의 압박을 느끼고 있습니다.'],
        ['끝까지 도망치는 꿈', '위기를 무사히 넘깁니다.'],
        ['맞서 싸워 이기는 꿈', '문제를 정면으로 해결해 성취를 얻습니다.'],
      ],
    },
    vi: {
      name: 'Mơ bị truy đuổi', keywords: ['bị đuổi', 'chạy trốn', 'bị người lạ đuổi', 'ma đuổi'],
      summary: 'Mơ bị ai đó đuổi theo là dấu hiệu bạn đang né tránh một việc hay một vấn đề.',
      korea: 'Người Hàn cho rằng bị người đuổi là áp lực trong quan hệ; bị thú đuổi là áp lực công việc, tiền bạc. Chạy thoát được là qua khỏi nguy; quay lại đối mặt và thắng là đạt được thành tựu lớn.',
      vietnam: 'Người Việt cũng xem đây là giấc mơ của căng thẳng và việc chưa giải quyết; trốn được thì thời gian sẽ gỡ rối.',
      cases: [
        ['Mơ bị người lạ đuổi', 'Có nỗi lo mơ hồ — thử viết ra để sắp xếp.'],
        ['Mơ bị thú dữ đuổi', 'Áp lực công việc, tiền bạc.'],
        ['Mơ chạy thoát', 'Qua được cơn nguy.'],
        ['Mơ quay lại chiến đấu và thắng', 'Đối mặt trực diện và thành công.'],
      ],
    },
  },
  {
    slug: 'exam', category: 'situation', tone: 'mixed', emoji: '📝',
    ko: {
      name: '시험 보는 꿈', keywords: ['시험', '시험 망치는 꿈', '수능 꿈', '지각하는 꿈'],
      summary: '시험 꿈은 평가받는 상황에 대한 긴장을 뜻합니다. 졸업한 지 오래돼도 중요한 일을 앞두면 자주 꿉니다.',
      korea: '답을 술술 쓰면 준비한 일이 잘 풀리고, 문제를 못 풀거나 시험에 늦으면 준비가 부족하다고 느끼는 마음을 비춘다고 봅니다. 합격 발표를 보는 꿈은 실제 좋은 소식의 징조로 풉니다.',
      vietnam: '베트남에서도 시험 꿈(mơ thấy đi thi)은 압박감의 표현으로, 시험에 붙으면 승진이나 성공의 징조로 봅니다.',
      cases: [
        ['답을 술술 쓰는 꿈', '준비한 일이 순조롭게 풀립니다.'],
        ['시험에 늦는 꿈', '일정과 준비물을 다시 점검하세요.'],
        ['문제를 하나도 못 푸는 꿈', '부담이 크다는 뜻입니다. 범위를 나눠 준비하세요.'],
        ['합격 발표를 보는 꿈', '좋은 소식이 찾아옵니다.'],
      ],
    },
    vi: {
      name: 'Mơ thấy đi thi', keywords: ['đi thi', 'thi trượt', 'thi đỗ', 'đi thi muộn'],
      summary: 'Mơ đi thi phản ánh sự căng thẳng khi bị đánh giá. Dù đã ra trường lâu, trước việc quan trọng người ta vẫn hay mơ thấy.',
      korea: 'Người Hàn cho rằng làm bài trôi chảy là việc chuẩn bị sẽ thuận; không làm được bài hay đi thi muộn là cảm giác chưa chuẩn bị đủ; xem bảng báo đỗ là sắp có tin vui thật.',
      vietnam: 'Người Việt cũng xem mơ đi thi là áp lực; thi đỗ trong mơ là điềm thăng tiến, thành công.',
      cases: [
        ['Mơ làm bài trôi chảy', 'Việc đã chuẩn bị sẽ suôn sẻ.'],
        ['Mơ đi thi muộn', 'Hãy kiểm tra lại lịch trình, giấy tờ.'],
        ['Mơ không làm được bài', 'Áp lực lớn — chia nhỏ việc để chuẩn bị.'],
        ['Mơ xem kết quả thi đỗ', 'Sắp có tin vui.'],
      ],
    },
  },
  {
    slug: 'house', category: 'situation', tone: 'good', emoji: '🏠',
    ko: {
      name: '집 꿈', keywords: ['새집', '이사 꿈', '집 짓는 꿈', '집이 무너지는 꿈'],
      summary: '집은 나 자신과 가정을 상징합니다. 새집으로 이사하거나 집을 넓히는 꿈은 생활이 나아질 길몽입니다.',
      korea: '크고 밝은 새집으로 이사하는 꿈은 형편이 나아지거나 새 출발을 한다는 뜻입니다. 집을 짓는 꿈은 기반을 다지는 시기, 집이 무너지거나 물이 새면 건강과 가정을 돌보라는 뜻으로 풉니다.',
      vietnam: '베트남에서도 새집(nhà mới) 꿈은 생활이 안정되고 번창한다는 뜻이며, 집을 짓는 꿈은 재물이 쌓이는 징조로 봅니다.',
      cases: [
        ['넓은 새집으로 이사하는 꿈', '형편이 나아지고 새 출발을 합니다.'],
        ['집을 짓는 꿈', '기반을 다지는 시기입니다. 꾸준히 쌓아 가세요.'],
        ['집이 무너지는 꿈', '건강과 가정을 돌보라는 신호입니다.'],
        ['낯선 집에서 길을 잃는 꿈', '새 환경에 적응하는 중입니다. 서두르지 마세요.'],
      ],
    },
    vi: {
      name: 'Mơ thấy nhà mới, chuyển nhà', keywords: ['nhà mới', 'chuyển nhà', 'xây nhà', 'nhà sập'],
      summary: 'Ngôi nhà tượng trưng cho bản thân và gia đình. Dọn vào nhà mới rộng rãi là điềm cuộc sống khá lên.',
      korea: 'Người Hàn cho rằng chuyển vào nhà mới sáng sủa là hoàn cảnh khá hơn, khởi đầu mới; xây nhà là giai đoạn gây dựng nền móng; nhà sập hay dột là lời nhắc chăm lo sức khỏe và gia đình.',
      vietnam: 'Người Việt cũng xem mơ nhà mới là cuộc sống ổn định, phát đạt; mơ xây nhà là của cải tích lũy.',
      cases: [
        ['Mơ chuyển vào nhà mới rộng', 'Hoàn cảnh khá lên, khởi đầu mới.'],
        ['Mơ xây nhà', 'Giai đoạn gây dựng — cứ bền bỉ.'],
        ['Mơ nhà sập', 'Hãy quan tâm sức khỏe và gia đình.'],
        ['Mơ lạc trong ngôi nhà lạ', 'Đang thích nghi môi trường mới — đừng vội.'],
      ],
    },
  },
  {
    slug: 'dying', category: 'situation', tone: 'good', emoji: '⚰️',
    ko: {
      name: '내가 죽는 꿈', keywords: ['죽는 꿈', '내가 죽는 꿈', '죽음', '임종'],
      summary: '무섭지만 대표적인 "반대로 해석하는" 꿈입니다. 내가 죽는 꿈은 묵은 것이 끝나고 새로 태어난다는 길몽입니다.',
      korea: '한국 해몽에서 죽음은 끝이 아니라 새 출발을 뜻해, 내가 죽는 꿈은 고민이 해결되거나 새로운 운이 열린다는 뜻으로 봅니다. 자기 장례식을 보거나 관에 들어가는 꿈도 재물과 명예가 들어오는 꿈으로 풉니다.',
      vietnam: '베트남에서도 자신이 죽는 꿈(mơ thấy mình chết)은 나쁜 일이 끝나고 좋은 변화가 온다는 뜻으로 풀이하는 경우가 많습니다.',
      cases: [
        ['내가 죽는 꿈', '고민이 끝나고 새로운 운이 열립니다.'],
        ['내 장례식을 보는 꿈', '주변의 인정을 받거나 명예가 생깁니다.'],
        ['관에 들어가는 꿈', '재물이 들어오는 꿈으로 봅니다.'],
        ['죽었다가 살아나는 꿈', '재기와 회복을 뜻하는 길몽입니다.'],
      ],
    },
    vi: {
      name: 'Mơ thấy mình chết', keywords: ['mình chết', 'cái chết', 'lâm chung', 'mơ thấy chết'],
      summary: 'Đáng sợ nhưng đây là giấc mơ “giải ngược” điển hình: mơ mình chết là chuyện cũ kết thúc, bắt đầu cuộc sống mới.',
      korea: 'Trong giải mộng Hàn Quốc, cái chết là khởi đầu mới chứ không phải kết thúc: mơ mình chết là nỗi lo được giải, vận mới mở ra. Thấy đám tang của mình hay nằm trong quan tài cũng là điềm có tiền tài, danh dự.',
      vietnam: 'Người Việt cũng thường giải mơ thấy mình chết là điều xấu qua đi, sắp có thay đổi tốt.',
      cases: [
        ['Mơ thấy mình chết', 'Nỗi lo kết thúc, vận may mới mở ra.'],
        ['Mơ thấy đám tang của mình', 'Được mọi người công nhận, có danh dự.'],
        ['Mơ nằm trong quan tài', 'Điềm tiền tài theo người Hàn.'],
        ['Mơ chết đi sống lại', 'Điềm hồi phục, làm lại từ đầu.'],
      ],
    },
  },
  {
    slug: 'flying', category: 'situation', tone: 'good', emoji: '🕊️',
    ko: {
      name: '하늘을 나는 꿈', keywords: ['나는 꿈', '날아다니는 꿈', '하늘', '공중에 뜨는 꿈'],
      summary: '하늘을 자유롭게 나는 꿈은 해방감과 성취, 지위 상승을 뜻하는 길몽입니다.',
      korea: '높이 날수록 이름을 떨치거나 원하는 자리에 오른다고 봅니다. 나는 것이 힘들거나 자꾸 떨어지면 아직 준비가 덜 되었다는 뜻, 비행기를 타는 꿈은 새로운 무대로 나아갈 기회를 뜻합니다.',
      vietnam: '베트남에서도 하늘을 나는 꿈(mơ thấy bay)은 자유와 성공, 근심에서 벗어나는 것을 뜻합니다.',
      cases: [
        ['하늘 높이 자유롭게 나는 꿈', '원하던 자리에 오르고 이름을 떨칩니다.'],
        ['낮게 겨우 나는 꿈', '방향은 맞지만 힘을 더 길러야 합니다.'],
        ['날다가 떨어지는 꿈', '자신감이 흔들립니다. 계획을 단단히 하세요.'],
        ['비행기를 타는 꿈', '새로운 무대나 해외와 관련된 기회가 옵니다.'],
      ],
    },
    vi: {
      name: 'Mơ thấy mình bay', keywords: ['bay', 'bay trên trời', 'bay lơ lửng', 'mơ bay'],
      summary: 'Bay tự do trên trời là điềm tốt về sự giải thoát, thành công và địa vị thăng tiến.',
      korea: 'Người Hàn cho rằng bay càng cao càng nổi danh, đạt được vị trí mong muốn; bay khó khăn hay cứ rơi xuống là chưa chuẩn bị đủ; đi máy bay là cơ hội bước ra sân chơi mới.',
      vietnam: 'Người Việt cũng giải mơ bay là tự do, thành công và thoát khỏi lo âu.',
      cases: [
        ['Mơ bay cao tự do', 'Đạt vị trí mong muốn, nổi danh.'],
        ['Mơ bay thấp chật vật', 'Đúng hướng nhưng cần thêm sức.'],
        ['Mơ đang bay thì rơi', 'Sự tự tin lung lay — củng cố kế hoạch.'],
        ['Mơ đi máy bay', 'Cơ hội mới, có thể liên quan nước ngoài.'],
      ],
    },
  },
  {
    slug: 'gold', category: 'situation', tone: 'good', emoji: '🪙',
    ko: {
      name: '금 꿈', keywords: ['금', '금반지', '금목걸이', '보석', '태몽'],
      summary: '금과 보석은 재물, 명예, 귀한 자녀를 뜻하는 길몽입니다. 받거나 줍는 꿈이 특히 좋습니다.',
      korea: '금반지나 금목걸이를 받는 꿈은 좋은 인연이나 재물을 얻는다는 뜻이고, 금덩이를 줍는 꿈은 큰 재물운으로 봅니다. 보석이나 금붙이를 품는 꿈은 귀한 자녀를 얻는 태몽으로도 꼽힙니다.',
      vietnam: '베트남에서 금(vàng)은 결혼 예물에도 쓰이는 귀한 재물이라, 금을 받는 꿈은 결혼이나 재물운이 오는 꿈으로 풉니다.',
      cases: [
        ['금반지를 받는 꿈', '좋은 인연이나 약속이 생깁니다.'],
        ['금덩이를 줍는 꿈', '큰 재물운이 들어옵니다.'],
        ['보석을 품는 꿈', '태몽이나 귀한 기회를 뜻합니다.'],
        ['금을 잃어버리는 꿈', '소중한 것을 잘 지키라는 뜻입니다. 지출을 점검하세요.'],
      ],
    },
    vi: {
      name: 'Mơ thấy vàng', keywords: ['vàng', 'nhẫn vàng', 'dây chuyền vàng', 'đá quý'],
      summary: 'Vàng và đá quý là điềm tốt về tiền tài, danh dự và con cái quý. Được cho hay nhặt được vàng càng tốt.',
      korea: 'Người Hàn cho rằng được tặng nhẫn, dây chuyền vàng là có duyên lành hoặc tài lộc; nhặt được vàng thỏi là vận tiền lớn; ôm đá quý, vàng là giấc mơ báo có con quý.',
      vietnam: 'Với người Việt, vàng là của quý, còn là lễ vật cưới hỏi, nên mơ được vàng là sắp có tin cưới hoặc tài lộc.',
      cases: [
        ['Mơ được tặng nhẫn vàng', 'Có duyên lành hoặc lời hứa tốt.'],
        ['Mơ nhặt được vàng', 'Tài lộc lớn.'],
        ['Mơ ôm đá quý', 'Giấc mơ báo có con hoặc cơ hội quý.'],
        ['Mơ mất vàng', 'Giữ gìn những thứ quý giá, xem lại chi tiêu.'],
      ],
    },
  },
  {
    slug: 'car-accident', category: 'situation', tone: 'bad', emoji: '🚗',
    ko: {
      name: '교통사고 꿈', keywords: ['교통사고', '차 사고 꿈', '운전하는 꿈', '브레이크 고장'],
      summary: '교통사고 꿈은 계획이 엇나갈까 하는 불안이나 너무 빠르게 달리고 있다는 신호입니다.',
      korea: '내가 운전하다 사고가 나면 일을 너무 서두르고 있다는 뜻, 브레이크가 듣지 않으면 통제가 어려운 상황에 대한 걱정을 비춘다고 봅니다. 사고가 났는데 다치지 않으면 위기를 무사히 넘긴다고 풉니다.',
      vietnam: '베트남에서도 교통사고 꿈(mơ thấy tai nạn giao thông)은 실제 이동이나 큰 결정에서 조심하라는 경고로 받아들입니다.',
      cases: [
        ['내가 운전하다 사고 나는 꿈', '일을 너무 서두르고 있습니다. 속도를 늦추세요.'],
        ['브레이크가 듣지 않는 꿈', '통제하기 어려운 일이 있습니다. 도움을 청하세요.'],
        ['사고가 났지만 무사한 꿈', '위기를 무사히 넘깁니다.'],
        ['다른 사람의 사고를 보는 꿈', '주변 사람의 사정을 살피고 운전과 이동을 조심하세요.'],
      ],
    },
    vi: {
      name: 'Mơ thấy tai nạn giao thông', keywords: ['tai nạn', 'tai nạn xe', 'đâm xe', 'mất phanh'],
      summary: 'Mơ tai nạn xe là nỗi lo kế hoạch đi chệch hướng, hoặc dấu hiệu bạn đang “chạy” quá nhanh.',
      korea: 'Người Hàn cho rằng tự lái mà gặp tai nạn là đang quá vội vàng; xe mất phanh là lo lắng về điều khó kiểm soát; gặp tai nạn mà không sao là vượt qua nguy hiểm.',
      vietnam: 'Người Việt cũng xem đây là lời nhắc cẩn thận khi đi lại hoặc khi đưa ra quyết định lớn.',
      cases: [
        ['Mơ tự lái và gặp tai nạn', 'Bạn đang quá vội — hãy chậm lại.'],
        ['Mơ xe mất phanh', 'Có việc khó kiểm soát — hãy nhờ người giúp.'],
        ['Mơ gặp tai nạn mà không sao', 'Vượt qua nguy hiểm an toàn.'],
        ['Mơ thấy người khác bị tai nạn', 'Quan tâm người xung quanh, cẩn thận khi đi lại.'],
      ],
    },
  },
];
