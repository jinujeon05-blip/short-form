// "Find a dream by how it felt": many people remember the feeling of a dream better than what they saw.
// Each feeling has its own page at /dream/feeling-<slug> with original text and a list of related dreams.
import type { Lang } from '../../i18n';

export interface FeelingText {
  /** Short chip label */
  name: string;
  /** Page heading */
  title: string;
  /** Search words: stems people type ("포근", "무서") — matched inside the query */
  words: string[];
  lead: string;
  /** Why this feeling stays after waking (modern view) */
  why: string;
  /** How Korean and Vietnamese folk readings treat dreams with this feeling */
  tradition: string;
  tips: string[];
}

export interface Feeling {
  slug: string;
  emoji: string;
  /** Dream slugs most often remembered with this feeling */
  dreams: string[];
  ko: FeelingText;
  vi: FeelingText;
}

export const FEELINGS: Feeling[] = [
  {
    slug: 'cozy',
    emoji: '🫶',
    dreams: ['hug', 'parents', 'grandparents', 'baby', 'spouse', 'house', 'bed', 'hot-spring', 'bath', 'sun', 'cooking', 'koala', 'panda', 'mountain-spirit'],
    ko: {
      name: '포근함',
      title: '포근하고 따뜻한 꿈 해몽',
      words: ['포근', '따뜻', '따듯', '아늑', '편안', '안락', '평온', '평화', '행복한', '안심', '훈훈'],
      lead: '누가 나왔는지는 흐릿한데 안긴 듯 포근했던 느낌만 또렷이 남는 꿈이 있습니다. 이런 꿈은 대개 마음이 쉴 곳을 찾고 있다는 신호로 읽힙니다.',
      why: '잠들기 전 긴장이 풀렸거나, 반대로 요즘 너무 지쳐서 마음이 스스로 위로를 만들어 낼 때 포근한 꿈을 자주 꿉니다. 어릴 적 집, 부모님, 따뜻한 물처럼 몸이 기억하는 안전한 장면이 섞여 나오는 것도 그래서입니다. 깨고 나서 아쉬운 마음이 크다면 지금 생활에 그런 쉼이 부족하다는 뜻일 수 있습니다.',
      tradition: '한국 해몽에서는 따뜻한 품에 안기거나 햇볕을 쬐는 꿈을 도와줄 사람이 나타나거나 집안이 편안해질 조짐으로 봅니다. 베트남에서도 가족이 모여 밥을 먹거나 조상이 웃는 얼굴로 나타나는 꿈을 집안이 화목하고 보살핌을 받는다는 좋은 꿈(điềm lành)으로 여깁니다.',
      tips: ['꿈에 나온 사람이 있다면 오늘 짧게라도 안부 연락을 해 보세요.', '포근했던 장면(장소·음식·사람)을 메모해 두고, 이번 주에 비슷한 쉼을 하나 실제로 만들어 보세요.', '요즘 너무 지쳐 있었다면 일정 하나를 덜어 내는 날로 삼아도 좋습니다.'],
    },
    vi: {
      name: 'Ấm áp',
      title: 'Giải mã giấc mơ ấm áp, bình yên',
      words: ['am ap', 'binh yen', 'yen binh', 'thoai mai', 'hanh phuc', 'em diu', 'an toan', 'nhe nhang'],
      lead: 'Có những giấc mơ ta không nhớ rõ đã gặp ai, chỉ nhớ cảm giác ấm áp như được ôm vào lòng. Giấc mơ như vậy thường cho thấy tâm trí đang tìm một chỗ để nghỉ ngơi.',
      why: 'Khi vừa trút được căng thẳng, hoặc ngược lại khi quá mệt mỏi, tâm trí hay tự tạo ra sự an ủi trong giấc ngủ. Vì vậy những hình ảnh an toàn mà cơ thể còn nhớ như ngôi nhà thời thơ ấu, cha mẹ, làn nước ấm thường xuất hiện. Nếu tỉnh dậy thấy tiếc nuối, có thể cuộc sống hiện tại đang thiếu những khoảng nghỉ như thế.',
      tradition: 'Người Hàn cho rằng mơ được ôm ấp hay sưởi nắng là dấu hiệu sắp có người giúp đỡ, gia đạo yên ổn. Người Việt cũng xem giấc mơ cả nhà quây quần ăn cơm hay thấy ông bà tổ tiên mỉm cười là điềm lành, gia đình hòa thuận và được che chở.',
      tips: ['Nếu trong mơ có ai đó, hôm nay hãy nhắn hỏi thăm họ một câu.', 'Ghi lại khung cảnh khiến bạn thấy ấm áp (nơi chốn, món ăn, con người) và tạo lại một khoảng nghỉ giống vậy trong tuần này.', 'Nếu dạo này quá mệt, hãy bớt một việc trong lịch hôm nay.'],
    },
  },
  {
    slug: 'excited',
    emoji: '💓',
    dreams: ['confession', 'kiss', 'lover', 'first-love', 'wedding', 'celebrity', 'gift', 'letter', 'travel', 'cherry-blossom', 'fireworks', 'birthday', 'butterfly', 'rose'],
    ko: {
      name: '설렘',
      title: '설레고 두근거린 꿈 해몽',
      words: ['설렘', '설레', '설렜', '두근', '떨림', '떨렸', '심쿵', '좋아하는', '사랑', '연애'],
      lead: '깨고 나서도 가슴이 두근거리는 꿈, 상대가 누구였는지보다 그 설렘이 더 오래 남는 꿈의 풀이입니다.',
      why: '새로운 일이나 사람을 기대하고 있을 때, 혹은 오랫동안 감정을 누르고 지냈을 때 설레는 꿈을 꾸기 쉽습니다. 꿈속 상대는 실제 그 사람이라기보다 내가 바라는 관계나 기분을 대신하는 경우가 많습니다. 그래서 별로 생각하지 않던 사람이 나와도 이상한 일이 아닙니다.',
      tradition: '한국 해몽에서 고백을 받거나 꽃을 받는 꿈은 반가운 소식, 새 인연, 일이 잘 풀릴 조짐으로 봅니다. 베트남에서도 사랑 고백이나 결혼식처럼 들뜬 꿈을 기쁜 일이 다가온다는 뜻으로 보지만, 너무 들뜬 마음에 큰 결정을 서두르지 말라는 풀이도 함께 전해집니다.',
      tips: ['꿈속 설렘이 무엇을 향했는지(사람·일·여행) 한 줄로 적어 보세요.', '미뤄 둔 연락이나 새 시작이 있다면 작은 첫걸음을 하나 정해 보세요.', '설렘이 크더라도 돈이 걸린 결정은 하루 미뤄서 다시 보세요.'],
    },
    vi: {
      name: 'Rung động',
      title: 'Giải mã giấc mơ khiến tim rung động',
      words: ['rung dong', 'hoi hop', 'xao xuyen', 'boi roi', 'tim dap', 'thinh thich', 'lang man', 'yeu'],
      lead: 'Giấc mơ khiến tim còn đập rộn ràng khi tỉnh dậy, khi cảm giác xao xuyến còn nhớ lâu hơn cả người xuất hiện trong mơ.',
      why: 'Khi đang mong chờ một điều hay một người mới, hoặc đã kìm nén cảm xúc quá lâu, ta dễ mơ thấy những cảnh khiến lòng xao xuyến. Người trong mơ thường không hẳn là chính họ mà đại diện cho mối quan hệ hay cảm giác ta đang mong muốn. Vì vậy mơ thấy người mình ít nghĩ đến cũng không có gì lạ.',
      tradition: 'Người Hàn xem mơ được tỏ tình hay được tặng hoa là dấu hiệu có tin vui, duyên mới, công việc hanh thông. Người Việt cũng cho rằng giấc mơ tỏ tình, đám cưới báo hiệu chuyện vui sắp đến, nhưng khuyên đừng vội vàng quyết định lớn khi lòng còn đang quá phấn khởi.',
      tips: ['Viết một dòng xem cảm giác rung động ấy hướng về điều gì (người, công việc, chuyến đi).', 'Nếu có lời nhắn hay khởi đầu mới đang bị trì hoãn, hãy chọn một bước nhỏ đầu tiên.', 'Dù hào hứng đến đâu, quyết định liên quan đến tiền nên để sang ngày mai xem lại.'],
    },
  },
  {
    slug: 'joy',
    emoji: '🥳',
    dreams: ['money', 'gold', 'pig', 'award', 'promotion', 'diamond', 'crown', 'rich-person', 'dragon', 'fruit', 'party', 'graduation', 'rainbow', 'poop'],
    ko: {
      name: '기쁨·횡재',
      title: '기쁘고 횡재한 기분의 꿈 해몽',
      words: ['기쁨', '기뻤', '기쁜', '횡재', '대박', '신나', '신났', '뿌듯', '로또', '당첨', '부자'],
      lead: '무언가를 얻거나 칭찬받아서 꿈속에서 크게 기뻤던 꿈. 흔히 길몽이라고 부르는 꿈들이 이 느낌과 이어집니다.',
      why: '바라던 결과를 기다리는 시기에는 꿈이 미리 그 장면을 연습하듯 보여 주기도 합니다. 시험·면접·계약을 앞두고 상을 받거나 돈을 줍는 꿈을 꾸는 것도 그래서입니다. 그만큼 그 일에 마음을 쓰고 있다는 뜻이니, 준비에 힘을 더 실어 주는 신호로 받아들이면 좋습니다.',
      tradition: '한국 해몽에서 돼지·금·똥·용처럼 재물을 뜻하는 상징이 나오고 꿈속 기분까지 좋았다면 대표적인 길몽으로 봅니다. 베트남에서도 돈이나 금을 줍는 꿈을 재물운으로 보지만, 꿈 내용을 번호로 바꿔 복권이나 lô đề에 거는 풍습은 명월에서 권하지 않습니다.',
      tips: ['좋은 꿈은 남에게 떠벌리지 않는 편이 좋다는 속설이 있습니다. 대신 조용히 적어 두세요.', '기다리던 일이 있다면 오늘 준비를 한 가지 더 해 두세요.', '복권은 즐길 수 있는 금액 안에서만, 꿈과 상관없이 정해 둔 만큼만 하세요.'],
    },
    vi: {
      name: 'Vui mừng',
      title: 'Giải mã giấc mơ vui mừng, trúng lớn',
      words: ['vui mung', 'vui ve', 'sung suong', 'trung so', 'trung lon', 'may man', 'giau', 'phan khoi', 'hanh phuc qua'],
      lead: 'Giấc mơ được thứ gì đó hay được khen ngợi khiến ta vui sướng. Nhiều giấc mơ được gọi là điềm lành đều gắn với cảm giác này.',
      why: 'Khi đang chờ một kết quả mong muốn, giấc mơ đôi khi như diễn tập trước cảnh ấy. Mơ được giải thưởng hay nhặt được tiền trước kỳ thi, buổi phỏng vấn, hợp đồng cũng vì vậy. Điều đó cho thấy bạn rất để tâm đến việc này, hãy coi đó là tín hiệu để chuẩn bị kỹ hơn.',
      tradition: 'Người Hàn coi giấc mơ có lợn, vàng, phân hay rồng, lại kèm cảm giác vui vẻ, là điềm lành tiêu biểu về tiền tài. Người Việt cũng xem mơ nhặt tiền, nhặt vàng là có lộc, nhưng Minh Nguyệt không khuyến khích đổi giấc mơ thành con số để chơi xổ số hay lô đề.',
      tips: ['Dân gian nói mơ đẹp thì đừng kể khắp nơi. Hãy lặng lẽ ghi lại.', 'Nếu đang chờ một việc, hôm nay hãy chuẩn bị thêm một điều.', 'Xổ số chỉ nên chơi trong số tiền bạn sẵn sàng mất, không tăng lên vì giấc mơ.'],
    },
  },
  {
    slug: 'relieved',
    emoji: '😮‍💨',
    dreams: ['poop', 'urine', 'bath', 'cleaning', 'rain', 'waterfall', 'swimming', 'hot-spring', 'vomit', 'water', 'sea', 'wind', 'quitting', 'running'],
    ko: {
      name: '개운함',
      title: '시원하고 개운한 꿈 해몽',
      words: ['개운', '시원', '후련', '상쾌', '홀가분', '속시원', '깨끗', '가벼운', '가벼웠'],
      lead: '무언가를 쏟아 내거나 씻어 내고 나서 속이 뻥 뚫린 듯 시원했던 꿈. 내용은 지저분해도 기분은 개운했던 꿈이 여기에 들어갑니다.',
      why: '오래 붙들고 있던 고민이 정리되기 시작하거나, 참았던 말을 하고 싶을 때 이런 꿈이 자주 나옵니다. 마음이 스스로 쌓인 것을 비워 내는 연습을 하는 셈입니다. 실제로 몸이 피곤하거나 소화가 안 될 때도 비우는 꿈을 꿀 수 있으니 컨디션도 함께 살펴보세요.',
      tradition: '한국 해몽에서는 똥·오줌을 시원하게 누거나 몸을 씻는 꿈을 근심이 풀리고 재물이 들어오는 길몽으로 봅니다. 베트남에서도 맑은 물에 씻거나 시원한 비를 맞는 꿈을 액운이 씻겨 나가고 새 출발을 한다는 뜻으로 풀이합니다.',
      tips: ['요즘 붙들고 있던 고민 하나를 종이에 적고 오늘 할 수 있는 다음 행동을 정해 보세요.', '방이나 책상 한 곳을 정리하면 꿈속 개운함을 실제로 이어 갈 수 있습니다.', '물을 충분히 마시고 몸 상태도 한번 살펴보세요.'],
    },
    vi: {
      name: 'Nhẹ nhõm',
      title: 'Giải mã giấc mơ nhẹ nhõm, sảng khoái',
      words: ['nhe nhom', 'sang khoai', 'thoai mai', 'thanh than', 'sach se', 'mat me', 'nhe long', 'trut duoc'],
      lead: 'Giấc mơ trút bỏ hay gột rửa điều gì đó rồi thấy lòng nhẹ hẳn. Dù cảnh trong mơ có hơi bẩn, cảm giác lại rất sảng khoái.',
      why: 'Khi nỗi lo ôm giữ lâu ngày bắt đầu được tháo gỡ, hoặc khi muốn nói ra điều đã kìm nén, ta hay mơ những giấc như vậy. Tâm trí đang tập buông bỏ những gì dồn nén. Khi cơ thể mệt hay khó tiêu cũng có thể mơ thấy cảnh trút bỏ, nên hãy để ý cả sức khỏe.',
      tradition: 'Người Hàn coi mơ đi vệ sinh thoải mái hay tắm rửa sạch sẽ là điềm lành, lo âu được giải tỏa và tiền tài đến. Người Việt cũng cho rằng mơ tắm nước trong hay đi dưới mưa mát là vận xui được gột sạch, chuẩn bị cho khởi đầu mới.',
      tips: ['Viết ra một nỗi lo đang ôm giữ và chọn một việc có thể làm ngay hôm nay.', 'Dọn một góc phòng hay bàn làm việc để giữ cảm giác nhẹ nhõm từ giấc mơ.', 'Uống đủ nước và để ý tình trạng cơ thể.'],
    },
  },
  {
    slug: 'free',
    emoji: '🕊️',
    dreams: ['flying', 'bird', 'sky', 'airplane', 'balloon', 'space', 'eagle', 'dragon', 'butterfly', 'crane', 'swimming', 'dolphin', 'travel', 'running'],
    ko: {
      name: '자유로움',
      title: '날아갈 듯 자유로운 꿈 해몽',
      words: ['자유', '날아갈', '하늘을', '붕뜬', '떠다니', '둥둥', '가뿐', '해방'],
      lead: '하늘을 날거나 물속을 마음대로 헤엄치며 몸이 가볍고 자유로웠던 꿈의 풀이입니다.',
      why: '자유로운 꿈은 막혀 있던 일이 풀리기 시작했거나, 지금 생활에서 벗어나고 싶은 마음이 클 때 모두 나올 수 있습니다. 꿈속에서 높이 오르며 즐거웠다면 자신감이 커지는 시기, 날다가 불안했다면 아직 확신이 부족한 시기로 보는 경우가 많습니다. 꿈을 꾸면서 꿈인 줄 아는 자각몽도 이런 장면에서 자주 생깁니다.',
      tradition: '한국 해몽에서 하늘을 높이 나는 꿈은 출세·승진·명예가 오를 조짐으로 봅니다. 베트남에서도 하늘을 나는 꿈을 뜻을 이루고 지위가 오른다는 좋은 꿈으로 보지만, 날다가 떨어지면 지나친 욕심을 경계하라는 뜻으로 풀이합니다.',
      tips: ['꿈속 자유가 무엇에서 벗어난 느낌이었는지 떠올려 보세요.', '미뤄 둔 도전이 있다면 이번 주에 할 수 있는 크기로 줄여서 시작해 보세요.', '짧은 산책이나 바깥 공기를 쐬는 시간으로 꿈의 기분을 이어 가 보세요.'],
    },
    vi: {
      name: 'Tự do',
      title: 'Giải mã giấc mơ bay bổng, tự do',
      words: ['tu do', 'bay bong', 'lo lung', 'nhe bong', 'tha hon', 'giai thoat', 'phieu dieu'],
      lead: 'Giấc mơ được bay trên trời hay bơi lội tự do dưới nước, cơ thể nhẹ bẫng và thoải mái.',
      why: 'Giấc mơ tự do có thể đến khi việc bế tắc bắt đầu được tháo gỡ, hoặc khi ta rất muốn thoát khỏi cuộc sống hiện tại. Nếu trong mơ bay cao và vui, đó thường là lúc tự tin đang tăng; nếu vừa bay vừa lo, có thể bạn vẫn còn chưa chắc chắn. Giấc mơ biết mình đang mơ (mơ sáng suốt) cũng hay xuất hiện ở những cảnh này.',
      tradition: 'Người Hàn xem mơ bay cao là điềm thăng tiến, danh vọng tăng. Người Việt cũng coi mơ bay trên trời là đạt được ước nguyện, địa vị đi lên, nhưng nếu đang bay mà rơi xuống thì nên tránh tham vọng quá đà.',
      tips: ['Nhớ lại xem cảm giác tự do ấy là thoát khỏi điều gì.', 'Nếu có thử thách đang trì hoãn, hãy thu nhỏ nó thành việc làm được trong tuần này.', 'Đi dạo hay ra ngoài hít thở để giữ cảm giác của giấc mơ.'],
    },
  },
  {
    slug: 'scared',
    emoji: '😱',
    dreams: ['ghost', 'zombie', 'darkness', 'snake', 'tiger', 'shark', 'killing', 'kidnapped', 'war', 'gun', 'knife', 'corpse', 'spider', 'centipede'],
    ko: {
      name: '무서움',
      title: '무섭고 소름 돋는 꿈 해몽',
      words: ['무서', '무섭', '공포', '소름', '오싹', '섬뜩', '겁나', '겁이', '악몽', '가위', '끔찍'],
      lead: '무엇을 봤는지는 기억이 흐려도 무서웠던 느낌, 깨고 나서도 가슴이 쿵쾅대던 느낌만 남은 꿈의 풀이입니다.',
      why: '무서운 꿈은 스트레스, 피로, 낮에 본 자극적인 영상, 불규칙한 잠과 자주 이어집니다. 잠이 얕을 때 꿈과 깨어 있는 상태가 섞여 몸이 움직이지 않는 가위눌림을 겪기도 합니다. 무서운 꿈은 대부분 마음이 위험에 대비하는 연습이라 흉한 일이 생긴다는 예고로 단정할 필요는 없습니다.',
      tradition: '한국 해몽에서는 귀신이나 맹수가 나오는 꿈도 내가 맞서거나 이기면 오히려 걱정이 풀리는 길몽으로 보고, 도망만 다니면 몸과 마음을 살피라는 뜻으로 봅니다. 베트남에서도 무서운 꿈을 꾸면 조상이나 집안일을 돌아보라는 신호로 여기며, 꿈을 낮에 이야기하면 흉한 기운이 흩어진다는 속설이 있습니다.',
      tips: ['깨자마자 불을 켜고 물 한 잔을 마시며 호흡을 천천히 고르세요.', '자기 전 1시간은 자극적인 영상과 휴대폰을 줄여 보세요.', '같은 악몽이 2주 넘게 반복되거나 잠을 거의 못 잔다면 전문가와 상담해 보세요.'],
    },
    vi: {
      name: 'Sợ hãi',
      title: 'Giải mã giấc mơ đáng sợ, ác mộng',
      words: ['so hai', 'dang so', 'ac mong', 'kinh di', 'hoang so', 'ron nguoi', 'bong de', 'khiep', 'so qua'],
      lead: 'Giấc mơ mà ta không nhớ rõ đã thấy gì, chỉ nhớ cảm giác sợ hãi và tim còn đập thình thịch khi tỉnh dậy.',
      why: 'Ác mộng thường liên quan đến căng thẳng, mệt mỏi, phim ảnh gây kích thích trong ngày và giấc ngủ thất thường. Khi ngủ không sâu, trạng thái mơ và tỉnh có thể chồng lên nhau, gây ra hiện tượng bóng đè khiến cơ thể không cử động được. Phần lớn ác mộng là cách tâm trí tập ứng phó với nguy hiểm, không nhất thiết báo trước điều xấu.',
      tradition: 'Người Hàn cho rằng mơ thấy ma hay thú dữ mà mình chống lại được thì lại là điềm lành, lo âu được giải; chỉ biết bỏ chạy thì nên chăm sóc sức khỏe và tinh thần. Người Việt hay xem ác mộng là lời nhắc nhớ đến tổ tiên, việc nhà, và tin rằng kể giấc mơ vào ban ngày sẽ làm vận xui tan đi.',
      tips: ['Khi tỉnh dậy, hãy bật đèn, uống một cốc nước và thở chậm lại.', 'Hạn chế phim ảnh kích thích và điện thoại trong 1 giờ trước khi ngủ.', 'Nếu cùng một ác mộng lặp lại hơn 2 tuần hoặc gần như không ngủ được, hãy tìm đến chuyên gia.'],
    },
  },
  {
    slug: 'chased',
    emoji: '🏃',
    dreams: ['chased', 'hiding', 'thief', 'police', 'wolf', 'zombie', 'kidnapped', 'dog', 'tiger', 'boar', 'prison', 'war', 'ghost', 'bear'],
    ko: {
      name: '쫓김',
      title: '쫓기고 도망치는 꿈 해몽',
      words: ['쫓기', '쫓겨', '쫓아', '도망', '숨었', '숨는', '피해', '달아나', '추격', '잡힐'],
      lead: '누가 쫓아왔는지는 모르겠는데 계속 도망쳤던 꿈, 다리가 안 움직여 애가 탔던 꿈의 풀이입니다.',
      why: '쫓기는 꿈은 가장 흔한 꿈 가운데 하나로, 피하고 싶은 일이나 마감, 갈등이 있을 때 자주 나옵니다. 쫓아오는 대상이 흐릿할수록 걱정의 정체가 아직 분명하지 않은 경우가 많습니다. 다리가 무겁게 느껴지는 것은 잠든 몸이 실제로 움직이지 않기 때문이라 자연스러운 현상입니다.',
      tradition: '한국 해몽에서는 쫓기다 붙잡히면 근심이 커지고, 끝까지 도망치거나 숨는 데 성공하면 어려움을 피해 간다고 봅니다. 쫓아오던 짐승이 돼지·소처럼 재물을 뜻하는 동물이면 오히려 재물이 따라온다는 풀이도 있습니다. 베트남에서는 쫓기는 꿈을 해결하지 않은 문제가 따라온다는 경고로 보고 미룬 일을 정리하라고 풉니다.',
      tips: ['요즘 미루고 있는 일 하나를 떠올리고, 10분 안에 할 수 있는 첫 단계를 해 보세요.', '꿈속에서 무엇이 쫓아왔는지 기억나면 그것이 무엇을 닮았는지 적어 보세요.', '같은 꿈이 반복되면 잠자리 시간과 카페인을 먼저 살펴보세요.'],
    },
    vi: {
      name: 'Bị đuổi',
      title: 'Giải mã giấc mơ bị đuổi, chạy trốn',
      words: ['bi duoi', 'bi ruot', 'chay tron', 'tron chay', 'tron tranh', 'an nap', 'bi bat', 'duoi theo'],
      lead: 'Giấc mơ cứ chạy mãi mà không biết ai đuổi theo, hay muốn chạy mà chân không nhấc lên được.',
      why: 'Mơ bị đuổi là một trong những giấc mơ phổ biến nhất, hay xuất hiện khi có việc muốn né tránh, hạn chót hay mâu thuẫn. Kẻ đuổi càng mờ nhạt thì nỗi lo càng chưa rõ hình dạng. Cảm giác chân nặng trĩu là vì cơ thể đang ngủ thật sự không cử động, nên đó là hiện tượng tự nhiên.',
      tradition: 'Người Hàn cho rằng bị đuổi rồi bị bắt thì lo âu tăng, còn chạy thoát hay trốn được thì vượt qua khó khăn. Nếu con vật đuổi theo là lợn hay bò, biểu tượng của tiền tài, thì lại có nghĩa là tài lộc theo đến. Người Việt xem giấc mơ bị đuổi là lời cảnh báo vấn đề chưa giải quyết đang bám theo, nên sắp xếp lại việc còn dang dở.',
      tips: ['Nghĩ đến một việc đang trì hoãn và làm bước đầu tiên trong 10 phút.', 'Nếu nhớ được thứ đuổi theo mình, hãy ghi xem nó giống với điều gì ngoài đời.', 'Nếu giấc mơ lặp lại, hãy xem lại giờ ngủ và lượng cà phê trước.'],
    },
  },
  {
    slug: 'falling',
    emoji: '🫨',
    dreams: ['falling', 'stairs', 'elevator', 'airplane', 'bridge', 'car-accident', 'earthquake', 'mountain', 'teeth', 'flying', 'ice', 'injury', 'volcano', 'flood'],
    ko: {
      name: '떨어짐·아찔함',
      title: '떨어지고 아찔한 꿈 해몽',
      words: ['떨어지', '떨어졌', '추락', '아찔', '철렁', '덜컥', '움찔', '발을헛', '헛디', '무너지', '흔들'],
      lead: '높은 데서 떨어지다가 몸이 움찔하며 깬 꿈, 발밑이 무너지는 아찔한 느낌이 남은 꿈의 풀이입니다.',
      why: '잠들 무렵 몸이 떨어지는 느낌과 함께 움찔하는 것은 아주 흔한 현상(입면 경련)으로, 피곤하거나 카페인을 많이 마신 날 더 잦습니다. 꿈 전체가 떨어지는 내용이었다면 통제하기 어려운 상황이나 기대에 못 미칠까 하는 걱정이 반영된 경우가 많습니다.',
      tradition: '한국 해몽에서 떨어지는 꿈은 지위나 계획이 흔들릴 수 있으니 조심하라는 뜻으로 보지만, 떨어진 뒤 무사히 일어나면 위기를 넘긴다고 봅니다. 아이들이 떨어지는 꿈을 꾸면 키가 크려고 그런다는 말도 오래전부터 전해집니다. 베트남에서도 높은 곳에서 떨어지는 꿈을 일이나 돈 문제에서 신중하라는 경고로 읽습니다.',
      tips: ['요즘 불안정하다고 느끼는 일(일·관계·돈)을 하나 골라 확인할 것을 정리해 보세요.', '오후 늦게는 커피를 줄이고 잠들기 전 몸을 충분히 풀어 주세요.', '중요한 결정이 있다면 한 번 더 확인하는 날로 삼으세요.'],
    },
    vi: {
      name: 'Rơi, hụt hẫng',
      title: 'Giải mã giấc mơ rơi xuống, hụt hẫng',
      words: ['roi xuong', 'te xuong', 'hut hang', 'hut chan', 'giat minh', 'chong mat', 'sup do', 'rung lac', 'nga'],
      lead: 'Giấc mơ đang rơi từ trên cao thì giật mình tỉnh dậy, hay cảm giác mặt đất dưới chân sụp đổ.',
      why: 'Cảm giác rơi và giật mình lúc vừa chợp mắt là hiện tượng rất phổ biến (giật cơ khi ngủ), xảy ra nhiều hơn khi mệt hay uống nhiều cà phê. Nếu cả giấc mơ là cảnh rơi, thường đó là nỗi lo về tình huống khó kiểm soát hay sợ không đạt kỳ vọng.',
      tradition: 'Người Hàn xem mơ rơi xuống là lời nhắc cẩn thận vì địa vị hay kế hoạch có thể lung lay, nhưng nếu rơi rồi đứng dậy an toàn thì vượt qua được khủng hoảng. Người Hàn cũng hay nói trẻ con mơ rơi là đang lớn. Người Việt xem mơ rơi từ trên cao là lời cảnh báo nên thận trọng chuyện công việc và tiền bạc.',
      tips: ['Chọn một việc đang thấy bấp bênh (công việc, quan hệ, tiền) và ghi ra những điều cần kiểm tra.', 'Bớt cà phê vào cuối chiều và thả lỏng cơ thể trước khi ngủ.', 'Nếu có quyết định quan trọng, hãy kiểm tra lại thêm một lần.'],
    },
  },
  {
    slug: 'frustrated',
    emoji: '😤',
    dreams: ['lost', 'late', 'exam', 'phone', 'elevator', 'mud', 'fog', 'prison', 'cave', 'door', 'key', 'stairs', 'road', 'debt'],
    ko: {
      name: '답답함',
      title: '답답하고 막막한 꿈 해몽',
      words: ['답답', '막막', '갑갑', '안풀', '막혔', '막히', '꽉막', '안열', '못찾', '헤매'],
      lead: '문이 안 열리고, 전화가 안 걸리고, 길을 아무리 가도 제자리인 꿈. 무엇을 했는지보다 답답했던 느낌이 남는 꿈의 풀이입니다.',
      why: '할 일은 많은데 진행이 안 되거나, 결정을 미루고 있을 때 답답한 꿈이 자주 나옵니다. 꿈속에서 전화 버튼이 안 눌리고 글자가 안 읽히는 것은 잠든 뇌가 세밀한 동작을 잘 처리하지 못해서 생기는 흔한 현상이기도 합니다.',
      tradition: '한국 해몽에서는 길을 헤매거나 문이 안 열리는 꿈을 일이 잠시 막히는 시기로 보고, 끝내 길을 찾거나 문이 열리면 막힌 일이 풀린다고 봅니다. 베트남에서도 길을 잃거나 갇히는 꿈을 방향을 다시 정하라는 신호로 보며, 서두르지 말고 주변 사람에게 도움을 구하라고 풉니다.',
      tips: ['막힌 일 하나를 아주 작은 단계로 쪼개 첫 단계만 오늘 해 보세요.', '혼자 붙잡고 있던 일이라면 믿을 만한 사람에게 한 번 물어보세요.', '해야 할 일을 적어 머릿속에서 꺼내 두면 잠이 한결 편해집니다.'],
    },
    vi: {
      name: 'Bế tắc',
      title: 'Giải mã giấc mơ bế tắc, bức bối',
      words: ['be tac', 'buc boi', 'ngot ngat', 'bi ket', 'mac ket', 'khong mo', 'khong goi', 'loay hoay', 'quanh quan', 'tac duong'],
      lead: 'Giấc mơ cửa không mở, điện thoại gọi không được, đi mãi vẫn quanh quẩn một chỗ. Cảm giác bức bối còn nhớ rõ hơn cả việc đã làm trong mơ.',
      why: 'Khi việc nhiều mà không tiến triển, hay khi đang trì hoãn một quyết định, ta hay mơ thấy cảnh bế tắc. Việc trong mơ bấm điện thoại không được hay chữ đọc không ra cũng là hiện tượng phổ biến, vì bộ não lúc ngủ khó xử lý các động tác chi tiết.',
      tradition: 'Người Hàn xem mơ lạc đường hay cửa không mở là thời kỳ công việc tạm tắc, và nếu cuối cùng tìm được đường hay mở được cửa thì việc sẽ thông. Người Việt cũng xem mơ lạc đường, bị nhốt là tín hiệu nên định hướng lại, đừng vội vàng và hãy nhờ người xung quanh giúp đỡ.',
      tips: ['Chia một việc đang tắc thành bước thật nhỏ và chỉ làm bước đầu hôm nay.', 'Nếu đang ôm việc một mình, hãy hỏi ý kiến một người đáng tin.', 'Viết ra việc cần làm để đầu óc nhẹ hơn, giấc ngủ sẽ dễ chịu hơn.'],
    },
  },
  {
    slug: 'anxious',
    emoji: '😰',
    dreams: ['exam', 'late', 'teeth', 'lost', 'interview', 'wallet', 'money', 'sick', 'injury', 'debt', 'contract', 'phone', 'watch', 'bag'],
    ko: {
      name: '불안·초조',
      title: '불안하고 초조한 꿈 해몽',
      words: ['불안', '초조', '조마조마', '걱정', '긴장', '조급', '안절부절', '마음이급', '쫓기듯', '조바심'],
      lead: '시험을 망칠 것 같고, 늦을 것 같고, 무언가 잃어버린 것 같아 내내 마음이 졸였던 꿈의 풀이입니다.',
      why: '불안한 꿈은 중요한 일을 앞두었을 때 가장 흔하게 나옵니다. 학교를 졸업한 지 오래된 사람도 시험·지각 꿈을 꾸는 것은, 평가받는 상황에 대한 긴장이 오래 기억된 장면으로 다시 나오기 때문입니다. 꿈속 불안은 현실의 준비를 점검하라는 알림 정도로 받아들이면 됩니다.',
      tradition: '한국 해몽에서 시험을 망치거나 지각하는 꿈은 실제로는 준비를 잘하라는 경계로 보고, 이빨이 빠지는 꿈은 집안 어른이나 건강을 살피라는 뜻으로 봅니다. 베트남에서도 지갑이나 물건을 잃는 꿈을 돈 관리와 약속을 꼼꼼히 하라는 경고로 풀이합니다.',
      tips: ['다가오는 일정(시험·면접·계약)의 준비물과 시간을 오늘 한 번 확인해 두세요.', '걱정을 적고 그 옆에 "지금 할 수 있는 것"을 하나씩 적어 보세요.', '불안이 낮에도 계속되고 생활이 힘들다면 전문가와 이야기해 보세요.'],
    },
    vi: {
      name: 'Lo âu',
      title: 'Giải mã giấc mơ lo âu, bồn chồn',
      words: ['lo au', 'lo lang', 'bon chon', 'thap thom', 'cang thang', 'sot ruot', 'bat an'],
      lead: 'Giấc mơ suốt từ đầu đến cuối thấp thỏm vì sợ thi trượt, sợ trễ giờ, sợ đánh mất thứ gì đó.',
      why: 'Giấc mơ lo âu thường đến nhất khi sắp có việc quan trọng. Người đã ra trường lâu vẫn mơ thi cử, đi trễ vì cảm giác căng thẳng khi bị đánh giá đã được ghi nhớ rất lâu. Hãy coi nỗi lo trong mơ như một lời nhắc kiểm tra lại sự chuẩn bị ngoài đời.',
      tradition: 'Người Hàn xem mơ thi trượt hay đi trễ thực ra là lời nhắc chuẩn bị kỹ, còn mơ rụng răng là nên quan tâm sức khỏe người lớn trong nhà. Người Việt cũng xem mơ mất ví hay đồ vật là lời cảnh báo quản lý tiền bạc và giữ lời hứa cẩn thận.',
      tips: ['Hôm nay hãy kiểm tra giấy tờ và giờ giấc cho việc sắp tới (thi, phỏng vấn, hợp đồng).', 'Viết nỗi lo ra giấy và ghi bên cạnh một việc có thể làm ngay.', 'Nếu lo âu kéo dài cả ban ngày và ảnh hưởng cuộc sống, hãy trò chuyện với chuyên gia.'],
    },
  },
  {
    slug: 'sad',
    emoji: '😢',
    dreams: ['crying', 'deceased', 'breakup', 'funeral', 'divorce', 'ex', 'lost-child', 'parents', 'grandparents', 'rain', 'leaves', 'sunset', 'first-love', 'dying'],
    ko: {
      name: '슬픔',
      title: '슬프고 눈물 나는 꿈 해몽',
      words: ['슬프', '슬픈', '슬픔', '슬펐', '눈물', '울었', '울면서', '서러', '서운', '아련', '그리움', '그리운', '보고싶'],
      lead: '꿈속에서 펑펑 울었거나, 깨고 나니 베개가 젖어 있던 꿈. 이유는 흐릿한데 슬픔과 그리움만 남은 꿈의 풀이입니다.',
      why: '낮 동안 미뤄 둔 감정이 잠든 사이에 흘러나오는 것이 슬픈 꿈입니다. 돌아가신 분, 헤어진 사람, 어린 시절처럼 다시 돌아갈 수 없는 것이 자주 나오는 것도 그래서입니다. 꿈에서 실컷 울고 나면 오히려 마음이 가벼워지는 경우도 많습니다.',
      tradition: '한국 해몽에서는 꿈에서 크게 우는 꿈을 오히려 근심이 풀리고 기쁜 일이 생길 길몽으로 봅니다. 돌아가신 분이 나와 슬펐던 꿈은 그리움의 표현이자 조상이 지켜 준다는 뜻으로도 풉니다. 베트남에서도 조상이나 돌아가신 가족이 나오면 기일이나 제사를 챙기고 향을 피우며 마음을 전하는 풍습이 있습니다.',
      tips: ['떠오르는 사람에게 하고 싶은 말을 짧게 글로 적어 보세요.', '돌아가신 분이 나왔다면 사진을 보며 좋은 기억 하나를 떠올려 보세요.', '슬픔이 오래 이어지고 일상이 힘들다면 가까운 사람이나 전문가에게 털어놓으세요.'],
    },
    vi: {
      name: 'Buồn',
      title: 'Giải mã giấc mơ buồn, khóc',
      words: ['buon', 'khoc', 'nuoc mat', 'dau long', 'nho nhung', 'tiec nuoi', 'tui than', 'xot xa', 'thuong nho', 'nho nguoi'],
      lead: 'Giấc mơ khóc nức nở, tỉnh dậy thấy gối ướt. Lý do mờ nhạt, chỉ còn lại nỗi buồn và nỗi nhớ.',
      why: 'Giấc mơ buồn là lúc những cảm xúc bị gác lại ban ngày được bộc lộ khi ngủ. Vì vậy người đã khuất, người đã chia tay hay tuổi thơ, những điều không thể quay lại, hay xuất hiện. Khóc thật nhiều trong mơ đôi khi lại giúp lòng nhẹ đi.',
      tradition: 'Người Hàn lại xem mơ khóc to là điềm lành, nỗi lo được giải và sắp có chuyện vui. Mơ thấy người đã khuất mà buồn là biểu hiện của nỗi nhớ và cũng có nghĩa tổ tiên đang che chở. Người Việt khi mơ thấy ông bà, người thân đã mất thường nhớ đến ngày giỗ, thắp nén hương để gửi tấm lòng.',
      tips: ['Viết vài dòng điều bạn muốn nói với người hiện lên trong mơ.', 'Nếu mơ thấy người đã khuất, hãy xem ảnh và nhớ lại một kỷ niệm đẹp.', 'Nếu nỗi buồn kéo dài và ảnh hưởng cuộc sống, hãy chia sẻ với người thân hoặc chuyên gia.'],
    },
  },
  {
    slug: 'angry',
    emoji: '😠',
    dreams: ['fight', 'cheating', 'enemy', 'boss', 'thief', 'mother-in-law', 'sibling', 'coworker', 'killing', 'war', 'ex', 'neighbor', 'police', 'divorce'],
    ko: {
      name: '화남·억울함',
      title: '화나고 억울한 꿈 해몽',
      words: ['화가', '화났', '화나', '분노', '억울', '짜증', '열받', '빡치', '배신', '원망', '싸웠'],
      lead: '누군가와 크게 싸우거나 배신당해 꿈속에서 화가 치밀었던 꿈, 깨고 나서도 억울함이 가라앉지 않은 꿈의 풀이입니다.',
      why: '현실에서 하지 못한 말이나 참은 감정이 꿈에서 터져 나오는 경우가 많습니다. 꿈속 상대가 실제로 잘못한 사람이 아닐 때도 많으니, 꿈만 보고 그 사람을 의심할 필요는 없습니다. 몸이 피곤하고 잠이 부족할 때 꿈속 감정도 더 날카로워집니다.',
      tradition: '한국 해몽에서 싸워서 이기는 꿈은 경쟁에서 이기고 일이 잘 풀리는 길몽, 지는 꿈은 몸을 살피라는 뜻으로 봅니다. 애인이 바람피우는 꿈은 반대로 관계가 깊어진다는 역몽으로 풀기도 합니다. 베트남에서도 다투는 꿈을 말다툼을 조심하라는 경고로 보면서, 화해하는 장면이 있으면 오해가 풀린다고 봅니다.',
      tips: ['꿈속에서 하고 싶었던 말을 종이에 그대로 적어 보세요. 보내지 않아도 됩니다.', '오늘은 중요한 대화를 서두르지 말고 감정이 가라앉은 뒤에 하세요.', '운동이나 산책으로 몸의 긴장을 먼저 풀어 주세요.'],
    },
    vi: {
      name: 'Tức giận',
      title: 'Giải mã giấc mơ tức giận, oan ức',
      words: ['tuc gian', 'gian du', 'oan uc', 'buc tuc', 'phan no', 'cai nhau', 'phan boi', 'uat uc', 'ghen'],
      lead: 'Giấc mơ cãi nhau to hay bị phản bội khiến ta giận sôi người, tỉnh dậy vẫn còn ấm ức.',
      why: 'Những lời chưa nói được hay cảm xúc bị kìm nén ngoài đời thường bùng ra trong mơ. Người trong mơ nhiều khi không phải là người có lỗi thật, nên không cần nghi ngờ họ chỉ vì giấc mơ. Khi cơ thể mệt và thiếu ngủ, cảm xúc trong mơ cũng gay gắt hơn.',
      tradition: 'Người Hàn xem mơ cãi nhau mà thắng là điềm lành, thắng trong cạnh tranh và việc thuận lợi; thua thì nên chú ý sức khỏe. Mơ người yêu ngoại tình đôi khi được giải ngược là tình cảm thêm sâu đậm. Người Việt xem giấc mơ cãi nhau là lời nhắc cẩn trọng lời nói, và nếu trong mơ có cảnh làm hòa thì hiểu lầm sẽ được hóa giải.',
      tips: ['Viết lại những điều muốn nói trong mơ ra giấy, không cần gửi đi.', 'Hôm nay đừng vội nói chuyện quan trọng, hãy đợi khi cảm xúc lắng xuống.', 'Vận động hay đi dạo để giải tỏa căng thẳng cơ thể trước.'],
    },
  },
  {
    slug: 'embarrassed',
    emoji: '😳',
    dreams: ['naked', 'late', 'exam', 'urine', 'poop', 'crowd', 'singing', 'makeup', 'teeth', 'clothes', 'school', 'interview', 'hair', 'shoes'],
    ko: {
      name: '창피함',
      title: '창피하고 민망한 꿈 해몽',
      words: ['창피', '민망', '부끄', '수치', '망신', '쪽팔', '당황'],
      lead: '사람들 앞에서 옷을 안 입었거나, 실수해서 모두가 쳐다보던 꿈. 깨고 나서도 얼굴이 화끈거렸던 꿈의 풀이입니다.',
      why: '남의 눈을 의식하거나 새 자리에서 평가받는 시기에 창피한 꿈을 자주 꿉니다. 꿈속에서 아무도 신경 쓰지 않았다면 생각보다 남들은 나를 덜 본다는 마음의 메시지로 읽기도 합니다. 준비가 덜 된 느낌, 들킬까 하는 걱정이 이런 장면으로 나타나곤 합니다.',
      tradition: '한국 해몽에서 벌거벗는 꿈은 의외로 숨겨 둔 능력이 드러나거나 근심이 벗겨지는 좋은 꿈으로 보기도 하고, 부끄러워 숨었다면 실수나 소문을 조심하라는 뜻으로 봅니다. 베트남에서도 사람들 앞에서 망신당하는 꿈은 말과 행동을 조심하라는 경고로 풀이합니다.',
      tips: ['요즘 남의 시선이 신경 쓰이는 일이 있다면 무엇인지 적어 보세요.', '발표·면접처럼 사람 앞에 서는 일이 있다면 한 번 소리 내어 연습해 보세요.', '실수한 일이 있었다면 짧게 사과하거나 바로잡고 마음에서 내려놓으세요.'],
    },
    vi: {
      name: 'Xấu hổ',
      title: 'Giải mã giấc mơ xấu hổ, ngượng ngùng',
      words: ['xau ho', 'ngai ngung', 'nguong', 'bo mat', 'mat mat', 'bi che cuoi', 'que do'],
      lead: 'Giấc mơ không mặc quần áo trước đám đông, hay mắc lỗi khiến mọi người nhìn chằm chằm. Tỉnh dậy mặt vẫn còn nóng bừng.',
      why: 'Khi để ý ánh mắt người khác hay đang ở vị trí mới bị đánh giá, ta hay mơ thấy cảnh xấu hổ. Nếu trong mơ không ai để ý, có thể đó là lời nhắn rằng người khác ít nhìn mình hơn ta nghĩ. Cảm giác chưa chuẩn bị đủ, sợ bị phát hiện thường hiện lên qua những cảnh như vậy.',
      tradition: 'Người Hàn đôi khi xem mơ trần truồng là điềm tốt, tài năng giấu kín được bộc lộ hay lo âu được cởi bỏ; còn nếu xấu hổ trốn đi thì nên cẩn thận lỗi lầm và lời đồn. Người Việt xem giấc mơ bị bẽ mặt trước đám đông là lời nhắc giữ gìn lời nói và hành động.',
      tips: ['Viết ra điều đang khiến bạn bận tâm về ánh mắt người khác.', 'Nếu sắp phải thuyết trình hay phỏng vấn, hãy tập nói thành tiếng một lần.', 'Nếu đã có lỗi gì, hãy xin lỗi ngắn gọn hoặc sửa lại rồi buông bỏ.'],
    },
  },
  {
    slug: 'lonely',
    emoji: '🍂',
    dreams: ['lost', 'stranger', 'desert', 'island', 'darkness', 'space', 'ex', 'breakup', 'deceased', 'sunset', 'fog', 'leaves', 'moon', 'lost-child'],
    ko: {
      name: '외로움',
      title: '외롭고 허전한 꿈 해몽',
      words: ['외로', '외롭', '쓸쓸', '허전', '혼자', '고독', '버려', '공허', '텅빈', '홀로'],
      lead: '아무도 없는 곳에 혼자 남겨졌거나, 아는 사람들이 나를 못 알아보던 꿈. 쓸쓸하고 허전한 느낌만 남은 꿈의 풀이입니다.',
      why: '새 환경에 적응 중이거나, 가까운 사람과 연락이 뜸해졌을 때 외로운 꿈을 자주 꿉니다. 해외에 살거나 가족과 떨어져 지내는 사람에게 특히 흔합니다. 꿈은 관계를 다시 챙길 때가 됐다는 마음의 알림이기도 합니다.',
      tradition: '한국 해몽에서 혼자 길을 헤매는 꿈은 독립하거나 새 길을 찾는 시기로 보고, 끝에 누군가를 만나면 귀인을 만난다고 봅니다. 베트남에서도 홀로 남겨지는 꿈을 가족과 친척을 더 자주 찾아보라는 뜻으로 풀이하며, 명절이나 기일에 집안이 모이는 것을 소중히 여깁니다.',
      tips: ['오랫동안 연락 못 한 사람 한 명에게 짧은 메시지를 보내 보세요.', '혼자 있는 시간이 길다면 이번 주에 사람을 만날 약속 하나를 잡아 보세요.', '외로움이 깊고 오래가면 혼자 견디지 말고 주변이나 전문가에게 이야기하세요.'],
    },
    vi: {
      name: 'Cô đơn',
      title: 'Giải mã giấc mơ cô đơn, trống trải',
      words: ['co don', 'trong trai', 'le loi', 'mot minh', 'hiu quanh', 'bo roi', 'bi bo', 'cu ki'],
      lead: 'Giấc mơ bị bỏ lại một mình ở nơi không có ai, hay người quen không nhận ra mình. Chỉ còn lại cảm giác lẻ loi, trống trải.',
      why: 'Khi đang thích nghi với môi trường mới hoặc ít liên lạc với người thân, ta hay mơ thấy mình cô đơn. Điều này đặc biệt phổ biến ở người sống xa quê hay xa gia đình. Giấc mơ cũng là lời nhắc rằng đã đến lúc chăm sóc lại các mối quan hệ.',
      tradition: 'Người Hàn xem mơ một mình lạc lối là thời kỳ tự lập, tìm con đường mới, và nếu cuối cùng gặp được ai đó thì sẽ có quý nhân. Người Việt xem giấc mơ bị bỏ lại một mình là lời nhắc nên năng về thăm gia đình, họ hàng, và trân trọng những dịp cả nhà sum họp ngày lễ, ngày giỗ.',
      tips: ['Gửi một tin nhắn ngắn cho người lâu rồi chưa liên lạc.', 'Nếu ở một mình nhiều, hãy hẹn gặp một người trong tuần này.', 'Nếu nỗi cô đơn sâu và kéo dài, đừng chịu đựng một mình, hãy chia sẻ với người xung quanh hoặc chuyên gia.'],
    },
  },
];

export const FEELING_SLUGS = FEELINGS.map((f) => f.slug);
export const feelingPath = (slug: string) => `/dream/feeling-${slug}` as const;
export const feelingBySlug = (slug: string) => FEELINGS.find((f) => f.slug === slug);
/** Feelings whose list includes this dream, for links from a dream page */
export const feelingsOfDream = (dreamSlug: string) => FEELINGS.filter((f) => f.dreams.includes(dreamSlug));

const fold = (s: string) => s.toLowerCase().replace(/đ/g, 'd').normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC').replace(/[^\p{L}\p{N}]+/gu, '');

/** Feelings matching a typed query such as "포근한 꿈", "무서운", "mơ thấy sợ hãi". */
export function searchFeelings(query: string, lang: Lang): Feeling[] {
  const q = fold(query.replace(/(꿈|해몽|nằm mơ thấy|mơ thấy|giấc mơ)/gi, ''));
  if (q.length < 2) return [];
  const hit = (f: Feeling) =>
    [f.ko, f.vi].some((t) =>
      [t.name, ...t.words].some((w) => {
        const fw = fold(w);
        return fw.length >= 2 && (q.includes(fw) || (q.length >= (lang === 'vi' ? 4 : 2) && fw.startsWith(q)));
      }),
    );
  return FEELINGS.filter(hit);
}

export const FEELING_UI: Record<Lang, {
  heading: string;
  matched: string;
  why: string;
  tradition: string;
  dreams: string;
  tips: string;
  others: string;
  ofDream: string;
  back: string;
  desc: (name: string) => string;
}> = {
  ko: {
    heading: '느낌으로 찾기',
    matched: '이런 느낌의 꿈이었나요?',
    why: '이런 느낌이 남는 이유',
    tradition: '한국과 베트남에서는 이렇게 봅니다',
    dreams: '이 느낌과 자주 이어지는 꿈',
    tips: '깨어난 뒤 해 볼 일',
    others: '다른 느낌으로 찾기',
    ofDream: '이 꿈과 이어지는 느낌',
    back: '← 꿈해몽 전체 보기',
    desc: (n) => `꿈 내용은 흐릿하고 ${n}만 남았나요? 이런 느낌이 남는 이유, 한국·베트남 해몽, 자주 이어지는 꿈 14가지와 깨어난 뒤 해 볼 일을 정리했습니다.`,
  },
  vi: {
    heading: 'Tìm theo cảm giác',
    matched: 'Giấc mơ của bạn có cảm giác này không?',
    why: 'Vì sao cảm giác này còn đọng lại?',
    tradition: 'Quan niệm của người Hàn và người Việt',
    dreams: 'Những giấc mơ hay đi kèm cảm giác này',
    tips: 'Nên làm gì sau khi tỉnh dậy',
    others: 'Tìm theo cảm giác khác',
    ofDream: 'Cảm giác thường đi kèm giấc mơ này',
    back: '← Xem tất cả giấc mơ',
    desc: (n) => `Không nhớ rõ giấc mơ, chỉ nhớ cảm giác ${n.toLowerCase()}? Giải thích vì sao, quan niệm Hàn – Việt, 14 giấc mơ hay gặp và việc nên làm sau khi tỉnh dậy.`,
  },
};
