import type { Dream } from './types';

export const NATURE_DREAMS: Dream[] = [
  {
    slug: 'water', category: 'nature', tone: 'good', emoji: '💧',
    ko: {
      name: '물 꿈', keywords: ['물', '맑은 물', '흙탕물', '샘물'],
      summary: '물은 재물과 감정을 상징합니다. 맑고 넉넉한 물은 길몽, 흐리거나 마른 물은 걱정을 뜻합니다.',
      korea: '맑은 물이 집 안에 차오르거나 샘물이 솟는 꿈은 재물이 들어오고 마음이 편해질 꿈으로 봅니다. 흙탕물은 일이 꼬이거나 감정이 복잡하다는 뜻, 마른 우물은 돈줄이 막힐 수 있다는 뜻으로 풉니다.',
      vietnam: '베트남에서 물(nước)은 재물(tài lộc)을 뜻하는 대표적인 상징입니다. 맑은 물이 집에 흘러들면 재물이 모이고, 탁한 물은 근심이 생긴다고 봅니다.',
      cases: [
        ['맑은 물을 마시는 꿈', '건강과 마음의 평안을 얻습니다.'],
        ['집 안에 맑은 물이 차오르는 꿈', '재물이 들어오는 길몽입니다.'],
        ['흙탕물을 보는 꿈', '일이 꼬이거나 감정이 복잡합니다. 서두르지 마세요.'],
        ['샘물이 솟는 꿈', '새로운 수입원이나 아이디어가 생깁니다.'],
      ],
    },
    vi: {
      name: 'Mơ thấy nước', keywords: ['nước', 'nước trong', 'nước đục', 'giếng nước'],
      summary: 'Nước tượng trưng cho tiền bạc và cảm xúc. Nước trong, dồi dào là điềm lành; nước đục hay cạn là điềm lo.',
      korea: 'Người Hàn cho rằng nước trong dâng đầy nhà hay mạch nước phun lên là tài lộc vào, lòng thanh thản; nước đục là việc rối, cảm xúc phức tạp; giếng cạn là nguồn tiền bị tắc.',
      vietnam: 'Người Việt xem nước là biểu tượng tài lộc. Nước trong chảy vào nhà là tiền vào; nước đục là có điều phiền muộn.',
      cases: [
        ['Mơ uống nước trong', 'Sức khỏe tốt, lòng bình an.'],
        ['Mơ nước trong dâng đầy nhà', 'Tài lộc vào nhà.'],
        ['Mơ thấy nước đục', 'Việc rối ren, cảm xúc phức tạp — chậm lại.'],
        ['Mơ thấy mạch nước phun', 'Có nguồn thu hoặc ý tưởng mới.'],
      ],
    },
  },
  {
    slug: 'fire', category: 'nature', tone: 'good', emoji: '🔥',
    ko: {
      name: '불 꿈', keywords: ['불', '불나는 꿈', '집에 불', '화재'],
      summary: '불이 활활 타오르는 꿈은 한국 해몽에서 손꼽히는 길몽입니다. 일이 크게 번창하고 재물이 일어날 징조로 봅니다.',
      korea: '집에 불이 나서 활활 타오르는 꿈은 가세가 크게 일어난다는 뜻으로 풉니다. 불길이 세고 밝을수록 좋고, 불이 꺼지거나 연기만 나면 일이 흐지부지될 수 있다고 봅니다.',
      vietnam: '베트남에서도 불(lửa) 꿈은 열정과 번영을 뜻해, 크게 타오르는 불은 사업이 흥한다고 풉니다. 다만 불에 데거나 다치면 성급함을 조심하라는 뜻입니다.',
      cases: [
        ['집에 불이 나 활활 타는 꿈', '가세가 일어나고 재물이 늘어납니다.'],
        ['산에 불이 번지는 꿈', '명성이나 사업이 넓게 퍼집니다.'],
        ['불을 끄는 꿈', '문제를 수습하는 능력이 생기지만, 들어올 운을 스스로 막지 않도록 하세요.'],
        ['연기만 자욱한 꿈', '일이 흐지부지될 수 있으니 마무리에 신경 쓰세요.'],
      ],
    },
    vi: {
      name: 'Mơ thấy lửa, cháy nhà', keywords: ['lửa', 'cháy nhà', 'hỏa hoạn', 'nằm mơ thấy cháy'],
      summary: 'Lửa cháy rừng rực là một trong những giấc mơ tốt nhất theo giải mộng Hàn Quốc — báo hiệu làm ăn hưng thịnh, tiền bạc dồi dào.',
      korea: 'Người Hàn cho rằng mơ nhà cháy rực là gia đạo hưng vượng. Lửa càng to, càng sáng càng tốt; lửa tắt hay chỉ có khói là việc dễ dang dở.',
      vietnam: 'Người Việt cũng xem lửa là nhiệt huyết và thịnh vượng — lửa bùng lên là làm ăn phát đạt; nhưng bị bỏng trong mơ là lời nhắc bớt nóng vội.',
      cases: [
        ['Mơ nhà cháy rực', 'Gia đạo hưng thịnh, tiền bạc tăng.'],
        ['Mơ cháy rừng lan rộng', 'Danh tiếng hoặc công việc lan tỏa.'],
        ['Mơ dập lửa', 'Bạn xử lý được vấn đề, nhưng đừng tự chặn vận may.'],
        ['Mơ khói mù mịt', 'Việc dễ dang dở — chú ý khâu hoàn tất.'],
      ],
    },
  },
  {
    slug: 'flood', category: 'nature', tone: 'mixed', emoji: '🌊',
    ko: {
      name: '홍수 꿈', keywords: ['홍수', '물난리', '물에 잠기는 꿈', '쓰나미'],
      summary: '맑은 물이 넘치면 재물이 크게 들어오고, 흙탕물에 휩쓸리면 감당하기 힘든 일을 뜻합니다.',
      korea: '집이나 마을이 맑은 물에 잠기는 꿈은 재물과 운이 넘치게 들어온다는 길몽으로 봅니다. 반대로 흙탕물에 휩쓸리거나 떠내려가면 일이 너무 많아지거나 주변 상황에 휘둘릴 수 있다는 뜻입니다.',
      vietnam: '베트남에서 홍수(lũ lụt) 꿈은 물이 맑으면 재물이 크게 들어오고, 집이 무너지면 큰 변화를 조심하라는 뜻으로 풉니다.',
      cases: [
        ['맑은 물이 넘치는 꿈', '재물과 운이 넘치게 들어옵니다.'],
        ['흙탕물에 휩쓸리는 꿈', '일이 몰리거나 상황에 휘둘립니다. 우선순위를 정하세요.'],
        ['홍수를 피해 높은 곳에 오르는 꿈', '어려움을 피해 안전하게 자리를 잡습니다.'],
        ['물이 빠지는 꿈', '골치 아픈 일이 마무리됩니다.'],
      ],
    },
    vi: {
      name: 'Mơ thấy lũ lụt', keywords: ['lũ lụt', 'nước ngập', 'sóng thần', 'ngập nhà'],
      summary: 'Nước trong tràn ngập là tài lộc lớn; bị nước đục cuốn trôi là việc quá sức hoặc bị hoàn cảnh chi phối.',
      korea: 'Người Hàn cho rằng nhà cửa, làng xóm ngập trong nước trong là tài lộc, vận may tràn đến. Bị cuốn trôi trong nước đục là việc dồn dập hoặc bị người khác chi phối.',
      vietnam: 'Người Việt giải mơ lũ lụt nước trong là có của lớn; lũ làm sập nhà thì nên cẩn trọng với biến động lớn.',
      cases: [
        ['Mơ nước trong tràn ngập', 'Tài lộc, may mắn dồi dào.'],
        ['Mơ bị nước đục cuốn đi', 'Việc dồn dập, bị chi phối — hãy sắp xếp ưu tiên.'],
        ['Mơ chạy lên chỗ cao tránh lũ', 'Thoát khó khăn, tìm được chỗ đứng an toàn.'],
        ['Mơ nước rút', 'Việc rắc rối sắp xong.'],
      ],
    },
  },
  {
    slug: 'rain', category: 'nature', tone: 'good', emoji: '🌧️',
    ko: {
      name: '비 오는 꿈', keywords: ['비', '소나기', '비 맞는 꿈', '우산'],
      summary: '비는 막힌 것을 씻어 내고 메마른 곳을 적시는 상징입니다. 시원한 비는 길몽, 폭우와 천둥은 갑작스러운 변화를 뜻합니다.',
      korea: '농경 사회에서 단비는 풍년을 뜻했기에, 시원하게 비를 맞는 꿈은 걱정이 풀리고 일이 잘된다는 뜻입니다. 비가 그치고 해가 나면 고생 끝에 좋은 일이 온다고 봅니다.',
      vietnam: '베트남에서도 비(mưa)는 축복과 재물을 뜻하는 경우가 많습니다. 다만 폭우에 젖어 추위에 떨면 건강을 조심하라고 풉니다.',
      cases: [
        ['시원하게 비를 맞는 꿈', '근심이 씻기고 일이 순조로워집니다.'],
        ['비가 그치고 해가 뜨는 꿈', '고생 끝에 좋은 결과가 옵니다.'],
        ['폭우와 천둥이 치는 꿈', '갑작스러운 변화나 소식이 있습니다.'],
        ['비를 피해 우산을 쓰는 꿈', '도움을 받아 어려움을 피합니다.'],
      ],
    },
    vi: {
      name: 'Mơ thấy mưa', keywords: ['mưa', 'mưa to', 'dầm mưa', 'ô dù'],
      summary: 'Mưa là gột rửa điều bế tắc, tưới mát nơi khô cằn. Mưa mát lành là điềm tốt; mưa bão sấm sét là thay đổi bất ngờ.',
      korea: 'Với nhà nông, mưa đúng lúc là được mùa, nên mơ tắm mưa mát là hết lo, việc thuận. Mưa tạnh, trời hửng nắng là khổ trước sướng sau.',
      vietnam: 'Người Việt cũng thường coi mưa là phúc lộc, tiền bạc; nhưng ướt sũng, run rẩy vì mưa to thì nên giữ sức khỏe.',
      cases: [
        ['Mơ tắm mưa mát', 'Phiền muộn tan biến, mọi việc suôn sẻ.'],
        ['Mơ mưa tạnh, trời nắng', 'Khổ trước sướng sau.'],
        ['Mơ mưa bão, sấm sét', 'Có thay đổi hoặc tin tức bất ngờ.'],
        ['Mơ che ô tránh mưa', 'Được giúp đỡ để vượt khó.'],
      ],
    },
  },
  {
    slug: 'snow', category: 'nature', tone: 'good', emoji: '❄️',
    ko: {
      name: '눈 오는 꿈', keywords: ['눈', '함박눈', '눈 꿈', '눈사람'],
      summary: '하얀 눈은 깨끗한 새 출발과 풍요를 뜻합니다. 함박눈이 소복이 쌓이면 재물이 쌓이는 꿈입니다.',
      korea: '"눈이 많이 오면 풍년"이라는 말처럼 함박눈이 쌓이는 꿈은 복과 재물이 쌓인다는 길몽입니다. 눈 덮인 길을 걷는 꿈은 새로운 시작을 뜻하고, 눈보라에 갇히면 일이 잠시 멈출 수 있다는 뜻입니다.',
      vietnam: '눈을 보기 힘든 베트남에서는 눈(tuyết) 꿈을 순수함과 새로운 기회의 상징으로 봅니다. 눈이 녹으면 근심이 풀린다고 풉니다.',
      cases: [
        ['함박눈이 소복이 쌓이는 꿈', '복과 재물이 쌓입니다.'],
        ['눈 덮인 길을 걷는 꿈', '깨끗한 새 출발을 합니다.'],
        ['눈보라에 갇히는 꿈', '일이 잠시 멈출 수 있습니다. 때를 기다리세요.'],
        ['눈사람을 만드는 꿈', '즐거운 모임이나 가족의 화목을 뜻합니다.'],
      ],
    },
    vi: {
      name: 'Mơ thấy tuyết', keywords: ['tuyết', 'tuyết rơi', 'người tuyết'],
      summary: 'Tuyết trắng tượng trưng cho khởi đầu trong sạch và sự sung túc. Tuyết rơi dày là của cải tích tụ.',
      korea: 'Người Hàn có câu “tuyết nhiều thì được mùa”, nên mơ tuyết rơi dày là phúc lộc tích lũy. Đi trên đường tuyết là khởi đầu mới; kẹt trong bão tuyết là việc tạm ngưng.',
      vietnam: 'Ở Việt Nam ít thấy tuyết, nên mơ thấy tuyết thường được hiểu là sự trong sáng và cơ hội mới; tuyết tan là nỗi lo được hóa giải.',
      cases: [
        ['Mơ tuyết rơi dày', 'Phúc lộc, tiền bạc tích tụ.'],
        ['Mơ đi trên đường tuyết', 'Khởi đầu mới trong sạch.'],
        ['Mơ kẹt trong bão tuyết', 'Việc tạm dừng — chờ thời cơ.'],
        ['Mơ đắp người tuyết', 'Gia đình vui vẻ, hòa thuận.'],
      ],
    },
  },
  {
    slug: 'sun', category: 'nature', tone: 'good', emoji: '☀️',
    ko: {
      name: '해 꿈', keywords: ['해', '태양', '해돋이', '일출', '태몽'],
      summary: '떠오르는 해는 최고의 길몽 가운데 하나로, 성공·명예·귀한 자녀를 뜻합니다.',
      korea: '해가 떠오르거나 해를 품에 안는 꿈은 크게 이름을 떨치거나 귀한 자녀를 얻는 태몽으로 유명합니다. 해가 지거나 가려지면 기운이 약해지니 건강과 체면을 살피라는 뜻입니다.',
      vietnam: '베트남에서도 해(mặt trời)가 떠오르는 꿈은 출세와 밝은 앞날을 뜻합니다.',
      cases: [
        ['해가 떠오르는 꿈', '일이 크게 밝아지고 성공합니다.'],
        ['해를 품에 안는 꿈', '대표적인 태몽이자 큰 성공의 꿈입니다.'],
        ['해가 지는 꿈', '한 단계가 마무리됩니다. 무리하지 말고 정리하세요.'],
        ['해가 구름에 가리는 꿈', '잠시 앞이 안 보여도 곧 걷힙니다.'],
      ],
    },
    vi: {
      name: 'Mơ thấy mặt trời', keywords: ['mặt trời', 'bình minh', 'mặt trời mọc'],
      summary: 'Mặt trời mọc là một trong những giấc mơ tốt nhất: thành công, danh vọng, sinh con quý.',
      korea: 'Người Hàn coi mơ mặt trời mọc hay ôm mặt trời là điềm làm nên danh tiếng hoặc giấc mơ báo có con quý. Mặt trời lặn hay bị che là sức lực giảm, nên giữ gìn sức khỏe và thể diện.',
      vietnam: 'Người Việt cũng xem mặt trời mọc là điềm công danh, tương lai sáng sủa.',
      cases: [
        ['Mơ mặt trời mọc', 'Mọi việc sáng sủa, thành công.'],
        ['Mơ ôm mặt trời', 'Giấc mơ báo có con, thành công lớn.'],
        ['Mơ mặt trời lặn', 'Một giai đoạn khép lại — đừng gắng quá sức.'],
        ['Mơ mặt trời bị mây che', 'Tạm thời mờ mịt nhưng sẽ sớm sáng tỏ.'],
      ],
    },
  },
  {
    slug: 'moon', category: 'nature', tone: 'good', emoji: '🌕',
    ko: {
      name: '달 꿈', keywords: ['달', '보름달', '달 꿈', '태몽'],
      summary: '밝은 보름달은 소원 성취와 귀인, 딸을 얻는 태몽으로 알려진 길몽입니다.',
      korea: '정월대보름에 달을 보며 소원을 빌듯, 밝은 보름달 꿈은 바라던 일이 이루어진다는 뜻입니다. 달을 품는 꿈은 고운 딸을 얻는 태몽이라는 속설이 있습니다. 초승달은 시작, 그믐달은 정리의 시기를 뜻합니다.',
      vietnam: '베트남에서 달(trăng) 꿈은 가족의 화합과 행복을 뜻합니다. 중추절의 둥근 달처럼 보름달은 원만함과 재회를 상징합니다.',
      cases: [
        ['밝은 보름달을 보는 꿈', '소원이 이루어지고 귀인을 만납니다.'],
        ['달을 품에 안는 꿈', '태몽이나 큰 행운을 뜻합니다.'],
        ['초승달을 보는 꿈', '새로운 일이 조용히 시작됩니다.'],
        ['달이 구름에 가리는 꿈', '오해가 생기기 쉬우니 대화로 풀어 가세요.'],
      ],
    },
    vi: {
      name: 'Mơ thấy trăng', keywords: ['trăng', 'trăng tròn', 'mặt trăng', 'trăng rằm'],
      summary: 'Trăng rằm sáng tỏ là điềm tốt về ước nguyện thành sự thật, có quý nhân, và (theo người Hàn) giấc mơ báo sinh con gái.',
      korea: 'Như tục ngắm trăng rằm tháng Giêng để cầu nguyện, mơ thấy trăng tròn sáng là điều mong ước sẽ thành. Ôm trăng vào lòng được cho là giấc mơ báo sinh con gái xinh đẹp. Trăng non là khởi đầu, trăng tàn là lúc thu xếp.',
      vietnam: 'Với người Việt, trăng tượng trưng cho đoàn viên, hạnh phúc gia đình — như trăng rằm Trung Thu tròn đầy.',
      cases: [
        ['Mơ trăng tròn sáng', 'Ước nguyện thành, gặp quý nhân.'],
        ['Mơ ôm trăng', 'Giấc mơ báo có con hoặc may mắn lớn.'],
        ['Mơ trăng non', 'Việc mới lặng lẽ bắt đầu.'],
        ['Mơ trăng bị mây che', 'Dễ hiểu lầm — hãy trò chuyện thẳng thắn.'],
      ],
    },
  },
  {
    slug: 'mountain', category: 'nature', tone: 'good', emoji: '⛰️',
    ko: {
      name: '산 꿈', keywords: ['산', '산에 오르는 꿈', '등산', '정상'],
      summary: '산에 오르는 꿈은 목표를 향해 나아가는 모습입니다. 정상에 오르면 성공, 굴러떨어지면 무리하지 말라는 뜻입니다.',
      korea: '산은 지위와 목표를 상징해, 높은 산 정상에 오르는 꿈은 승진이나 합격 같은 큰 성취를 뜻합니다. 산이 무너지면 믿던 기반이 흔들릴 수 있으니 조심하라는 뜻으로 봅니다.',
      vietnam: '베트남에서도 산(núi)에 오르는 꿈은 노력 끝에 성공한다는 뜻이고, 산이 무너지면 의지하던 사람이나 일이 흔들린다고 풉니다.',
      cases: [
        ['산 정상에 오르는 꿈', '목표를 이루고 인정받습니다.'],
        ['산길이 험한 꿈', '과정은 힘들어도 방향은 맞습니다.'],
        ['산에서 굴러떨어지는 꿈', '무리한 계획을 점검하세요.'],
        ['산이 무너지는 꿈', '믿던 기반을 다시 점검할 때입니다.'],
      ],
    },
    vi: {
      name: 'Mơ thấy núi, leo núi', keywords: ['núi', 'leo núi', 'đỉnh núi'],
      summary: 'Leo núi trong mơ là hình ảnh bạn đang tiến tới mục tiêu: lên tới đỉnh là thành công; lăn xuống là lời nhắc đừng quá sức.',
      korea: 'Người Hàn coi núi là địa vị và mục tiêu; lên đỉnh núi cao là thăng chức, đỗ đạt; núi sụp là chỗ dựa lung lay.',
      vietnam: 'Người Việt cũng giải mơ leo núi là thành công sau nỗ lực; núi lở là người hoặc việc mình dựa vào bị lung lay.',
      cases: [
        ['Mơ lên tới đỉnh núi', 'Đạt mục tiêu, được ghi nhận.'],
        ['Mơ đường núi gập ghềnh', 'Vất vả nhưng đi đúng hướng.'],
        ['Mơ ngã lăn từ núi', 'Xem lại kế hoạch quá sức.'],
        ['Mơ núi lở', 'Cần kiểm tra lại nền tảng mình đang dựa vào.'],
      ],
    },
  },
  {
    slug: 'sea', category: 'nature', tone: 'mixed', emoji: '🌊',
    ko: {
      name: '바다 꿈', keywords: ['바다', '파도', '바닷가', '수영하는 꿈'],
      summary: '바다는 넓은 기회와 마음 상태를 비춥니다. 잔잔한 바다는 순조로움, 거친 파도는 큰 변화를 뜻합니다.',
      korea: '넓고 푸른 바다를 바라보는 꿈은 사업이나 활동 무대가 넓어진다는 뜻이고, 바다에서 헤엄치면 자신감과 추진력이 생긴다고 봅니다. 거센 파도에 휩쓸리면 감정이나 상황이 크게 흔들릴 수 있다는 신호입니다.',
      vietnam: '베트남에서도 바다(biển) 꿈은 큰 기회와 원대한 꿈을 뜻합니다. 잔잔한 바다는 평안, 성난 바다는 도전을 의미합니다.',
      cases: [
        ['잔잔한 바다를 보는 꿈', '마음이 편하고 일이 순조롭습니다.'],
        ['바다에서 헤엄치는 꿈', '자신감과 추진력이 생깁니다.'],
        ['거센 파도에 휩쓸리는 꿈', '감정이나 상황이 흔들릴 수 있습니다. 무리한 도전은 미루세요.'],
        ['배를 타고 바다로 나가는 꿈', '새로운 무대로 나아갈 기회가 옵니다.'],
      ],
    },
    vi: {
      name: 'Mơ thấy biển', keywords: ['biển', 'sóng biển', 'bãi biển', 'bơi biển'],
      summary: 'Biển phản ánh cơ hội rộng mở và trạng thái tâm lý. Biển lặng là suôn sẻ; sóng dữ là thay đổi lớn.',
      korea: 'Người Hàn cho rằng ngắm biển xanh rộng là sân chơi công việc mở rộng; bơi giữa biển là tự tin, quyết đoán; bị sóng lớn cuốn đi là cảm xúc hoặc hoàn cảnh chao đảo.',
      vietnam: 'Người Việt cũng coi biển là cơ hội lớn, hoài bão xa; biển lặng là bình yên, biển động là thử thách.',
      cases: [
        ['Mơ thấy biển lặng', 'Tâm an, việc thuận.'],
        ['Mơ bơi giữa biển', 'Tự tin và quyết đoán hơn.'],
        ['Mơ bị sóng lớn cuốn', 'Dễ chao đảo — tạm hoãn việc mạo hiểm.'],
        ['Mơ đi thuyền ra khơi', 'Cơ hội bước ra sân chơi mới.'],
      ],
    },
  },
];
