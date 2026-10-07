import type { Dream } from './types';

export const PEOPLE_DREAMS: Dream[] = [
  {
    slug: 'teeth', category: 'people', tone: 'bad', emoji: '🦷',
    ko: {
      name: '이빨 빠지는 꿈', keywords: ['이빨', '이가 빠지는 꿈', '치아', '이 빠지는 꿈'],
      summary: '한국과 베트남 모두에서 대표적인 흉몽으로 꼽히지만, 실제로는 걱정이나 변화에 대한 불안을 비추는 경우가 많습니다.',
      korea: '전통적으로 이는 가족을 상징해, 이가 빠지면 가까운 사람에게 우환이 생긴다고 풀었습니다. 위니는 윗사람, 아랫니는 아랫사람이라는 속설도 있습니다. 요즘은 외모나 일에 대한 스트레스, 큰 변화를 앞둔 불안이 꿈에 나타난 것으로 보기도 합니다.',
      vietnam: '베트남에서도 이가 빠지는 꿈(mơ thấy rụng răng)은 집안 어른의 건강을 걱정하는 꿈으로 풀이합니다. 다만 피가 나지 않으면 큰 일이 아니라고 보기도 합니다.',
      cases: [
        ['앞니가 빠지는 꿈', '가까운 가족의 건강이나 내 체면에 대한 걱정을 뜻합니다.'],
        ['피를 흘리며 이가 빠지는 꿈', '마음고생이 큰 상태입니다. 무리한 일정은 줄이세요.'],
        ['빠진 이를 손에 쥐는 꿈', '잃는 것이 있어도 다시 회복할 수 있다는 뜻으로 봅니다.'],
        ['새 이가 나는 꿈', '새로운 시작이나 회복을 뜻하는 좋은 꿈입니다.'],
      ],
    },
    vi: {
      name: 'Mơ thấy rụng răng', keywords: ['rụng răng', 'gãy răng', 'nằm mơ rụng răng', 'răng'],
      summary: 'Cả ở Hàn Quốc và Việt Nam, đây đều được xem là giấc mơ không lành; nhưng thực tế nó thường phản ánh lo âu hoặc sắp có thay đổi.',
      korea: 'Theo quan niệm xưa của người Hàn, răng tượng trưng cho người thân; rụng răng là người nhà gặp chuyện — răng trên là bề trên, răng dưới là bề dưới. Ngày nay nhiều người xem đó là biểu hiện căng thẳng về ngoại hình, công việc hay một thay đổi lớn.',
      vietnam: 'Người Việt cũng giải mơ rụng răng là điềm lo cho sức khỏe ông bà, cha mẹ. Có người cho rằng nếu không chảy máu thì không đáng lo.',
      cases: [
        ['Mơ rụng răng cửa', 'Lo lắng cho người thân hoặc thể diện của bản thân.'],
        ['Mơ rụng răng chảy máu', 'Bạn đang rất mệt mỏi — hãy giảm bớt áp lực.'],
        ['Mơ cầm chiếc răng rụng', 'Dù mất mát nhưng sẽ hồi phục được.'],
        ['Mơ mọc răng mới', 'Điềm tốt về khởi đầu mới, hồi phục.'],
      ],
    },
  },
  {
    slug: 'deceased', category: 'people', tone: 'mixed', emoji: '🕯️',
    ko: {
      name: '돌아가신 분 꿈', keywords: ['죽은 사람', '돌아가신 할머니', '조상', '돌아가신 부모님'],
      summary: '돌아가신 가족이 나오는 꿈은 대개 그리움과 보살핌의 메시지로 봅니다. 밝은 얼굴이면 길몽, 어두우면 조심하라는 뜻입니다.',
      korea: '조상이 밝게 웃거나 무언가를 건네주면 집안에 경사나 재물이 생긴다고 봅니다. 조상이 슬퍼하거나 화를 내면 건강과 집안일을 살피라는 경고로 풀었습니다. 제사나 성묘를 앞두고 자주 꾸는 꿈이기도 합니다.',
      vietnam: '베트남에서는 돌아가신 분을 꿈에서 보는 것을 흔히 좋은 징조(lộc)로 봅니다. 조상이 돌보아 준다고 믿기 때문에, 제사(giỗ) 무렵 꾸는 꿈은 정성을 들이라는 뜻으로 받아들입니다.',
      cases: [
        ['조상이 웃으며 나타나는 꿈', '집안에 경사나 도움이 생긴다는 길몽입니다.'],
        ['돌아가신 분이 돈이나 물건을 주는 꿈', '재물이나 기회가 들어옵니다.'],
        ['돌아가신 분이 슬퍼하는 꿈', '가족의 건강과 집안일을 살피라는 뜻입니다.'],
        ['돌아가신 분과 함께 어딘가 가는 꿈', '전통적으로 조심하라는 꿈으로 봅니다. 무리하지 말고 쉬세요.'],
      ],
    },
    vi: {
      name: 'Mơ thấy người đã khuất', keywords: ['người chết', 'người thân đã mất', 'ông bà đã mất', 'mơ thấy người chết'],
      summary: 'Mơ thấy người thân đã mất thường là lời nhắn nhủ về nỗi nhớ và sự che chở. Gương mặt tươi vui là điềm tốt; buồn bã là lời nhắc cẩn thận.',
      korea: 'Người Hàn tin rằng tổ tiên mỉm cười hay trao cho mình thứ gì là nhà sắp có tin vui hoặc tài lộc; tổ tiên buồn hay giận là lời nhắc chăm lo sức khỏe, việc nhà. Giấc mơ này hay đến trước ngày giỗ, tảo mộ.',
      vietnam: 'Người Việt thường coi mơ thấy người đã khuất là điềm có lộc, vì tin tổ tiên phù hộ. Mơ vào dịp giỗ là lời nhắc thắp hương, sửa soạn chu đáo.',
      cases: [
        ['Mơ ông bà mỉm cười', 'Gia đình có tin vui hoặc được giúp đỡ.'],
        ['Mơ người đã mất cho tiền, cho đồ', 'Tài lộc hoặc cơ hội sắp đến.'],
        ['Mơ người đã mất buồn bã', 'Hãy quan tâm sức khỏe và việc nhà.'],
        ['Mơ đi cùng người đã mất', 'Quan niệm xưa cho là nên cẩn thận, nghỉ ngơi, đừng quá sức.'],
      ],
    },
  },
  {
    slug: 'baby', category: 'people', tone: 'good', emoji: '👶',
    ko: {
      name: '아기 꿈', keywords: ['아기', '아기 안는 꿈', '갓난아기'],
      summary: '아기는 새로운 시작과 희망을 뜻합니다. 건강한 아기를 안으면 일이 새로 시작되거나 기쁜 소식이 옵니다.',
      korea: '아기를 안는 꿈은 새 일이나 계획이 시작된다는 뜻이고, 웃는 아기는 기쁜 소식을 상징합니다. 다만 우는 아기를 달래는 꿈은 신경 쓸 일이 생긴다는 뜻으로 봅니다. 태몽과는 구별해, 아기 자체보다 동물·과일이 나오는 꿈을 태몽으로 보는 편입니다.',
      vietnam: '베트남에서도 아기(em bé) 꿈은 새로운 기회와 행운을 뜻합니다. 아기가 웃으면 집안이 화목해지고, 울면 작은 걱정이 생긴다고 봅니다.',
      cases: [
        ['아기를 안는 꿈', '새로운 일이나 계획이 시작됩니다.'],
        ['웃는 아기를 보는 꿈', '반가운 소식이나 경사가 있습니다.'],
        ['우는 아기를 달래는 꿈', '챙겨야 할 일이 생깁니다. 차분히 하나씩 처리하세요.'],
        ['아기가 걷는 꿈', '시작한 일이 제 궤도에 오릅니다.'],
      ],
    },
    vi: {
      name: 'Mơ thấy em bé', keywords: ['em bé', 'trẻ sơ sinh', 'bế em bé', 'nằm mơ thấy em bé'],
      summary: 'Em bé tượng trưng cho khởi đầu mới và hy vọng. Bế một em bé khỏe mạnh là sắp có việc mới hoặc tin vui.',
      korea: 'Người Hàn cho rằng bế em bé là có kế hoạch mới bắt đầu; em bé cười là tin vui; dỗ em bé khóc là có việc cần lo. Người Hàn phân biệt với “giấc mơ báo có thai” (태몽), thường là mơ thấy con vật hay trái cây hơn là em bé.',
      vietnam: 'Người Việt cũng coi mơ thấy em bé là cơ hội và may mắn mới; em bé cười là gia đình hòa thuận, em bé khóc là có chút lo toan.',
      cases: [
        ['Mơ bế em bé', 'Có việc mới hoặc kế hoạch mới.'],
        ['Mơ em bé cười', 'Tin vui hoặc chuyện mừng.'],
        ['Mơ dỗ em bé khóc', 'Có việc cần chăm lo — giải quyết từng bước.'],
        ['Mơ em bé tập đi', 'Việc mới bắt đầu đã vào guồng.'],
      ],
    },
  },
  {
    slug: 'pregnancy', category: 'people', tone: 'good', emoji: '🤰',
    ko: {
      name: '임신하는 꿈', keywords: ['임신', '임신 꿈', '배가 부른 꿈', '태몽'],
      summary: '임신하는 꿈은 실제 임신보다 무언가를 "품고 키우는" 상황, 곧 새 계획이나 재물의 결실을 뜻하는 경우가 많습니다.',
      korea: '내가 임신하는 꿈은 오래 준비한 일이 결실을 맺거나 재물이 늘어날 징조로 봅니다. 남자가 꾸어도 같은 의미입니다. 실제 태몽은 보통 동물, 과일, 보석 같은 상징이 나오는 꿈을 말합니다.',
      vietnam: '베트남에서도 임신하는 꿈(mơ thấy mang thai)은 새로운 일이 무르익고 재물이 들어올 징조로 봅니다.',
      cases: [
        ['내가 임신하는 꿈', '준비한 일이 결실을 맺습니다.'],
        ['배가 크게 부른 꿈', '재물이나 성과가 커집니다.'],
        ['다른 사람이 임신한 꿈', '주변 사람에게 경사가 생기거나 도움을 받습니다.'],
        ['출산하는 꿈', '오랜 고민이 끝나고 새 출발을 합니다.'],
      ],
    },
    vi: {
      name: 'Mơ thấy mang thai', keywords: ['mang thai', 'có bầu', 'nằm mơ thấy có bầu', 'sinh con'],
      summary: 'Mơ mang thai thường không phải báo có thai thật, mà là đang “ấp ủ” một kế hoạch hay một khoản tài lộc sắp thành.',
      korea: 'Người Hàn cho rằng mơ mình mang thai là việc chuẩn bị lâu sắp thành, của cải tăng thêm — kể cả khi người mơ là nam giới. Giấc mơ báo có thai thật (태몽) thường là mơ thấy con vật, trái cây, đá quý.',
      vietnam: 'Người Việt cũng giải mơ mang thai là việc mới đã chín muồi, tiền bạc sắp vào.',
      cases: [
        ['Mơ mình mang thai', 'Việc đã chuẩn bị sắp có kết quả.'],
        ['Mơ bụng to', 'Tài lộc, thành quả lớn dần.'],
        ['Mơ người khác mang thai', 'Người quanh bạn có tin vui hoặc bạn được giúp đỡ.'],
        ['Mơ sinh con', 'Kết thúc nỗi lo lâu nay, bắt đầu chặng mới.'],
      ],
    },
  },
  {
    slug: 'wedding', category: 'people', tone: 'mixed', emoji: '💍',
    ko: {
      name: '결혼하는 꿈', keywords: ['결혼', '결혼식', '웨딩드레스', '결혼 꿈'],
      summary: '결혼하는 꿈은 새로운 관계나 계약, 인생의 전환점을 뜻합니다. 분위기가 밝으면 길몽입니다.',
      korea: '결혼식은 두 가지가 하나로 합쳐지는 상징이라, 동업·계약·새 직장처럼 무언가와 손잡게 될 일을 뜻합니다. 예로부터 자신의 결혼식 꿈을 오히려 조심하라는 꿈으로 보는 지역도 있어, 꿈속 분위기를 함께 봅니다.',
      vietnam: '베트남에서는 결혼하는 꿈(mơ thấy đám cưới)을 좋은 인연이나 기쁜 일의 징조로 보지만, 남의 결혼식에서 우는 꿈은 서운한 일이 생긴다고 풀기도 합니다.',
      cases: [
        ['내가 결혼하는 꿈', '새 관계나 계약, 전환점이 다가옵니다.'],
        ['모르는 사람과 결혼하는 꿈', '예상하지 못한 협력자나 기회를 만납니다.'],
        ['결혼식이 엉망이 되는 꿈', '준비 중인 일의 세부 사항을 다시 점검하세요.'],
        ['친구의 결혼식에 가는 꿈', '주변에 좋은 소식이 생깁니다.'],
      ],
    },
    vi: {
      name: 'Mơ thấy đám cưới', keywords: ['đám cưới', 'kết hôn', 'váy cưới', 'mơ mình cưới'],
      summary: 'Mơ kết hôn thường nói về mối quan hệ mới, hợp đồng hay bước ngoặt trong đời. Không khí vui vẻ là điềm tốt.',
      korea: 'Với người Hàn, đám cưới là sự kết hợp nên giấc mơ này báo sắp hợp tác, ký kết hay nhận việc mới. Có nơi lại xem mơ mình cưới là điềm nên thận trọng, vì vậy cần xem bầu không khí trong mơ.',
      vietnam: 'Người Việt thường xem mơ đám cưới là có duyên lành, chuyện vui; nhưng khóc trong đám cưới người khác thì có thể gặp chuyện buồn lòng.',
      cases: [
        ['Mơ mình kết hôn', 'Sắp có quan hệ mới, hợp đồng hay bước ngoặt.'],
        ['Mơ cưới người lạ', 'Gặp người hợp tác hoặc cơ hội bất ngờ.'],
        ['Mơ đám cưới hỏng', 'Hãy rà soát lại chi tiết công việc đang chuẩn bị.'],
        ['Mơ đi đám cưới bạn', 'Xung quanh có tin vui.'],
      ],
    },
  },
  {
    slug: 'ex', category: 'people', tone: 'mixed', emoji: '💔',
    ko: {
      name: '전 애인 꿈', keywords: ['전 남친', '전 여친', '헤어진 사람', '옛 연인'],
      summary: '전 애인이 나오는 꿈은 그 사람보다 "그때의 나"와 정리되지 않은 감정을 비추는 경우가 많습니다.',
      korea: '전통 해몽에는 없지만, 요즘은 지난 관계에서 배운 것을 돌아보거나 지금의 관계·일에서 비슷한 감정을 느낄 때 꾼다고 봅니다. 꿈속에서 편하게 이야기하면 마음이 정리되고 있다는 뜻입니다.',
      vietnam: '베트남에서도 전 애인(người yêu cũ) 꿈은 아직 남은 미련이나 지금 관계에 대한 불안을 뜻한다고 봅니다.',
      cases: [
        ['전 애인과 다시 사귀는 꿈', '과거의 좋은 기억이나 안정감을 그리워하고 있습니다.'],
        ['전 애인과 다투는 꿈', '정리되지 않은 감정이 남아 있습니다.'],
        ['전 애인이 결혼하는 꿈', '마음속에서 그 관계가 완전히 정리되고 있다는 뜻입니다.'],
        ['전 애인과 웃으며 헤어지는 꿈', '새로운 인연을 맞을 준비가 되었습니다.'],
      ],
    },
    vi: {
      name: 'Mơ thấy người yêu cũ', keywords: ['người yêu cũ', 'ny cũ', 'mơ thấy người cũ'],
      summary: 'Giấc mơ về người yêu cũ thường phản ánh “con người mình lúc ấy” và những cảm xúc chưa được khép lại, hơn là về người đó.',
      korea: 'Giải mộng truyền thống của người Hàn không nói về điều này, nhưng ngày nay người ta cho rằng nó xuất hiện khi bạn đang nhìn lại bài học cũ hoặc gặp cảm xúc tương tự trong mối quan hệ, công việc hiện tại.',
      vietnam: 'Người Việt cũng cho rằng mơ thấy người yêu cũ là còn chút vương vấn hoặc đang bất an với mối quan hệ hiện tại.',
      cases: [
        ['Mơ quay lại với người cũ', 'Bạn nhớ cảm giác bình yên của ngày trước.'],
        ['Mơ cãi nhau với người cũ', 'Còn cảm xúc chưa được giải tỏa.'],
        ['Mơ người cũ kết hôn', 'Trong lòng bạn đang thật sự khép lại chuyện cũ.'],
        ['Mơ chia tay trong vui vẻ', 'Bạn đã sẵn sàng cho duyên mới.'],
      ],
    },
  },
  {
    slug: 'celebrity', category: 'people', tone: 'good', emoji: '🌟',
    ko: {
      name: '연예인 꿈', keywords: ['연예인', '아이돌', '유명인', '배우'],
      summary: '연예인이나 유명인이 나오는 꿈은 인기, 인정받고 싶은 마음, 뜻밖의 행운을 뜻하는 길몽으로 많이 봅니다.',
      korea: '대통령이나 유명인과 만나는 꿈은 귀인의 도움이나 명예를 얻을 꿈으로 풀이해 왔고, 요즘은 연예인 꿈도 같은 맥락에서 봅니다. 연예인과 친하게 지내는 꿈은 주목받을 일이 생긴다는 뜻입니다.',
      vietnam: '베트남에서도 유명인(người nổi tiếng)을 만나는 꿈은 인정을 받거나 좋은 기회가 온다는 뜻으로 봅니다.',
      cases: [
        ['연예인과 대화하는 꿈', '내 의견이 주목받거나 인정받습니다.'],
        ['연예인과 사진을 찍는 꿈', '기억에 남을 좋은 일이 생깁니다.'],
        ['대통령을 만나는 꿈', '윗사람의 도움이나 큰 기회를 얻는 길몽입니다.'],
        ['연예인에게 무시당하는 꿈', '인정받고 싶은 마음이 크다는 뜻입니다. 조급해하지 마세요.'],
      ],
    },
    vi: {
      name: 'Mơ thấy người nổi tiếng', keywords: ['người nổi tiếng', 'ca sĩ', 'thần tượng', 'idol'],
      summary: 'Mơ thấy người nổi tiếng thường là điềm tốt về danh tiếng, mong muốn được công nhận và may mắn bất ngờ.',
      korea: 'Người Hàn xưa nay giải mơ gặp tổng thống hay người có danh là được quý nhân giúp, có danh dự; nay mơ thấy idol, diễn viên cũng hiểu theo cách đó. Thân thiết với ngôi sao trong mơ là sắp được chú ý.',
      vietnam: 'Người Việt cũng xem mơ gặp người nổi tiếng là sắp được công nhận hoặc có cơ hội tốt.',
      cases: [
        ['Mơ trò chuyện với người nổi tiếng', 'Ý kiến của bạn được chú ý, được ghi nhận.'],
        ['Mơ chụp ảnh cùng ngôi sao', 'Có kỷ niệm vui đáng nhớ.'],
        ['Mơ gặp lãnh đạo, nguyên thủ', 'Quý nhân giúp đỡ, cơ hội lớn.'],
        ['Mơ bị ngôi sao làm ngơ', 'Bạn rất muốn được công nhận — đừng nóng vội.'],
      ],
    },
  },
  {
    slug: 'blood', category: 'people', tone: 'mixed', emoji: '🩸',
    ko: {
      name: '피 꿈', keywords: ['피', '피 흘리는 꿈', '코피', '피 꿈 해몽'],
      summary: '꿈속의 피는 무섭게 느껴지지만, 한국 해몽에서는 재물과 생명력을 뜻하는 길몽으로 보는 경우가 많습니다.',
      korea: '피를 많이 흘리거나 몸에 피가 묻는 꿈은 재물이 들어오거나 막혔던 일이 풀린다는 뜻으로 풀이합니다. 코피가 나는 꿈도 재물운으로 봅니다. 다만 다른 사람이 피를 흘리며 괴로워하면 그 사람의 건강을 살피라는 뜻입니다.',
      vietnam: '베트남에서는 피(máu) 꿈을 행운과 재물로 보는 해석과, 건강을 조심하라는 해석이 함께 있습니다. 피가 깨끗하고 붉을수록 좋게 봅니다.',
      cases: [
        ['피를 많이 흘리는 꿈', '재물이 들어오거나 막힌 일이 풀립니다.'],
        ['옷에 피가 묻는 꿈', '뜻밖의 수입이나 기회가 생깁니다.'],
        ['코피가 나는 꿈', '재물운이 오는 꿈으로 봅니다.'],
        ['다른 사람이 피를 흘리는 꿈', '그 사람의 건강이나 사정을 살펴보세요.'],
      ],
    },
    vi: {
      name: 'Mơ thấy máu', keywords: ['máu', 'chảy máu', 'chảy máu mũi', 'nằm mơ thấy máu'],
      summary: 'Máu trong mơ trông đáng sợ, nhưng giải mộng Hàn Quốc thường coi đó là điềm tài lộc và sức sống.',
      korea: 'Người Hàn cho rằng mơ chảy nhiều máu hay máu dính người là tiền bạc vào, việc bế tắc được khai thông; chảy máu mũi cũng là tài lộc. Nhưng nếu người khác chảy máu đau đớn thì nên quan tâm sức khỏe người đó.',
      vietnam: 'Người Việt có cả hai cách giải: máu là may mắn, tiền bạc; hoặc là lời nhắc giữ gìn sức khỏe. Máu càng đỏ tươi càng tốt.',
      cases: [
        ['Mơ chảy nhiều máu', 'Tiền vào hoặc việc khó được giải quyết.'],
        ['Mơ máu dính quần áo', 'Có khoản thu hay cơ hội bất ngờ.'],
        ['Mơ chảy máu mũi', 'Điềm tài lộc theo người Hàn.'],
        ['Mơ người khác chảy máu', 'Hãy hỏi thăm sức khỏe, hoàn cảnh người đó.'],
      ],
    },
  },
  {
    slug: 'hair', category: 'people', tone: 'mixed', emoji: '💇',
    ko: {
      name: '머리카락 꿈', keywords: ['머리 자르는 꿈', '머리카락 빠지는 꿈', '삭발', '머리 꿈'],
      summary: '머리카락은 기운과 체면을 뜻합니다. 스스로 다듬으면 새 출발, 뭉텅이로 빠지면 걱정과 피로를 뜻합니다.',
      korea: '머리를 자르는 꿈은 묵은 일을 정리하고 새로 시작한다는 뜻이고, 머리가 길고 윤기 나면 운이 좋아진다고 봅니다. 머리카락이 많이 빠지는 꿈은 기운이 떨어졌거나 걱정이 많다는 신호로 풉니다.',
      vietnam: '베트남에서 머리를 자르는 꿈(mơ thấy cắt tóc)은 근심을 털어내고 새 출발을 한다는 뜻으로 보지만, 남이 억지로 자르면 손해를 조심하라고 풉니다.',
      cases: [
        ['내가 머리를 자르는 꿈', '묵은 일을 정리하고 새 출발합니다.'],
        ['머리카락이 길고 윤기 나는 꿈', '건강과 운이 좋아집니다.'],
        ['머리카락이 뭉텅이로 빠지는 꿈', '피로와 걱정이 쌓였습니다. 충분히 쉬세요.'],
        ['남이 내 머리를 억지로 자르는 꿈', '내 몫을 빼앗기지 않도록 조심하세요.'],
      ],
    },
    vi: {
      name: 'Mơ thấy cắt tóc, rụng tóc', keywords: ['cắt tóc', 'rụng tóc', 'cạo đầu', 'tóc dài'],
      summary: 'Tóc tượng trưng cho khí lực và thể diện. Tự cắt tóc là khởi đầu mới; tóc rụng từng mảng là lo âu, mệt mỏi.',
      korea: 'Người Hàn cho rằng mơ cắt tóc là dọn dẹp chuyện cũ để bắt đầu lại; tóc dài óng mượt là vận đang lên; tóc rụng nhiều là khí lực suy, nhiều lo lắng.',
      vietnam: 'Người Việt giải mơ cắt tóc là trút bỏ phiền muộn, bắt đầu mới; nhưng bị người khác cắt tóc ép buộc thì nên đề phòng thiệt thòi.',
      cases: [
        ['Mơ tự cắt tóc', 'Khép lại chuyện cũ, khởi đầu mới.'],
        ['Mơ tóc dài óng mượt', 'Sức khỏe và vận may tốt lên.'],
        ['Mơ rụng tóc từng mảng', 'Bạn đang mệt mỏi, lo âu — hãy nghỉ ngơi.'],
        ['Mơ bị người khác cắt tóc', 'Cẩn thận bị lấy mất phần của mình.'],
      ],
    },
  },
  {
    slug: 'poop', category: 'people', tone: 'good', emoji: '💩',
    ko: {
      name: '똥꿈', keywords: ['똥', '대변', '똥 밟는 꿈', '화장실 꿈'],
      summary: '한국에서 돼지꿈과 함께 손꼽히는 재물 길몽입니다. 똥을 만지거나 뒤집어쓸수록 큰 재물이 들어온다고 봅니다.',
      korea: '옛 농가에서 거름은 곧 수확이었기 때문에, 똥은 재물과 풍요를 상징하게 되었습니다. 똥을 밟거나 몸에 묻는 꿈, 화장실이 넘치는 꿈 모두 돈이 들어올 꿈으로 풉니다. 반대로 똥을 닦아 내거나 버리면 들어올 재물을 놓친다고 봅니다.',
      vietnam: '베트남에서도 똥(phân) 꿈은 대체로 재물운으로 풀이합니다. 다만 더러워서 불쾌한 기분이 강했다면 구설을 조심하라는 해석도 있습니다.',
      cases: [
        ['똥을 밟는 꿈', '뜻밖의 재물이 생기는 꿈입니다.'],
        ['똥이 몸에 묻는 꿈', '큰 재물운이 들어옵니다.'],
        ['화장실에 똥이 가득한 꿈', '재물이 넘칠 만큼 들어온다고 봅니다.'],
        ['똥을 닦아 내는 꿈', '들어올 재물을 놓칠 수 있으니 기회를 잘 살피세요.'],
      ],
    },
    vi: {
      name: 'Mơ thấy phân', keywords: ['phân', 'giẫm phải phân', 'nhà vệ sinh', 'cứt'],
      summary: 'Ở Hàn Quốc, đây là giấc mơ tài lộc nổi tiếng ngang với mơ thấy lợn. Càng dính nhiều phân càng nhiều tiền.',
      korea: 'Với nhà nông xưa, phân bón là mùa màng, nên phân trở thành biểu tượng của cải. Giẫm phải phân, phân dính người, nhà vệ sinh tràn đầy đều là điềm tiền vào. Ngược lại lau sạch hay vứt bỏ phân là để lỡ tài lộc.',
      vietnam: 'Người Việt cũng thường giải mơ thấy phân là có tài lộc; nhưng nếu cảm giác ghê sợ, bực bội thì nên cẩn thận thị phi.',
      cases: [
        ['Mơ giẫm phải phân', 'Có khoản tiền bất ngờ.'],
        ['Mơ phân dính người', 'Tài lộc lớn đến.'],
        ['Mơ nhà vệ sinh đầy phân', 'Tiền bạc dồi dào.'],
        ['Mơ lau sạch phân', 'Coi chừng bỏ lỡ cơ hội kiếm tiền.'],
      ],
    },
  },
];
