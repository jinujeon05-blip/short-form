// Extra sections for the most searched dreams: a modern (psychological) reading and practical tips.
// Original wording. Folk readings stay in the Dream entries; this adds everyday context.
import type { Lang } from '../../i18n';

export interface DreamDeepText {
  /** Why people tend to have this dream, from a modern point of view */
  why: string;
  /** What to do after the dream */
  tips: string[];
}

export const DREAM_DEEP: Record<string, Record<Lang, DreamDeepText>> = {
  pig: {
    ko: {
      why: '돼지꿈은 한국인에게 너무 유명해서, 경제적인 기대나 걱정이 클 때 더 자주 떠오르고 더 잘 기억되는 꿈이기도 합니다. 월급날, 계약, 이직처럼 돈과 관련된 일을 앞두고 있다면 그 기대가 꿈에 반영되었을 수 있습니다.',
      tips: ['꿈을 핑계로 큰돈을 거는 대신, 미뤄 둔 저축이나 가계부 정리를 시작하는 계기로 삼아 보세요.', '복권을 산다면 부담 없는 금액으로 재미 삼아만 즐기세요.', '돼지가 나가는 꿈이었다면 이번 달 지출 목록을 한 번 점검해 보세요.'],
    },
    vi: {
      why: 'Ở Hàn Quốc, giấc mơ thấy lợn nổi tiếng đến mức khi đang mong đợi hay lo lắng về tiền bạc, người ta càng dễ mơ và dễ nhớ giấc mơ này. Nếu bạn sắp nhận lương, ký hợp đồng hay đổi việc, có thể kỳ vọng ấy đã đi vào giấc mơ.',
      tips: ['Thay vì “chơi lớn” vì giấc mơ, hãy coi đây là dịp bắt đầu tiết kiệm hoặc ghi chép chi tiêu.', 'Nếu mua vé số, chỉ nên mua với số tiền nhỏ để vui.', 'Nếu mơ lợn chạy ra khỏi nhà, hãy xem lại các khoản chi trong tháng.'],
    },
  },
  snake: {
    ko: {
      why: '뱀은 사람이 본능적으로 경계하는 동물이라, 꿈에서는 긴장이나 변화의 상징으로 자주 나타납니다. 새로운 관계, 이사, 임신처럼 삶이 크게 바뀌는 시기에 뱀꿈을 꾸었다는 사람이 많고, 한국에서는 태몽으로도 유명합니다.',
      tips: ['뱀이 무섭게 느껴졌다면 요즘 신경 쓰이는 사람이나 일이 있는지 적어 보세요.', '임신을 준비 중이라면 태몽일 수 있으니 날짜와 장면을 메모해 두세요.', '뱀에게 물리는 꿈은 흉몽이 아니라 길몽으로 보는 경우가 많으니 지나치게 걱정하지 마세요.'],
    },
    vi: {
      why: 'Rắn là loài vật con người cảnh giác theo bản năng, nên trong mơ thường tượng trưng cho sự căng thẳng hoặc thay đổi. Nhiều người mơ thấy rắn khi cuộc sống có biến chuyển lớn như mối quan hệ mới, chuyển nhà, mang thai; ở Hàn, rắn còn là giấc mơ báo con nổi tiếng.',
      tips: ['Nếu thấy sợ, hãy viết ra người hoặc việc đang khiến bạn bận tâm gần đây.', 'Nếu đang chuẩn bị có con, đó có thể là giấc mơ báo con — hãy ghi lại ngày và khung cảnh.', 'Mơ bị rắn cắn thường được xem là điềm tốt, không cần quá lo lắng.'],
    },
  },
  dragon: {
    ko: {
      why: '용은 현실에 없는 상상의 동물이라, 큰 목표나 성공에 대한 바람이 클 때 꿈에 등장하곤 합니다. 시험, 승진, 창업처럼 도약을 앞둔 시기에 용꿈을 꾸었다는 이야기가 많습니다.',
      tips: ['좋은 기운을 받았다고 생각하고 미뤄 둔 도전을 시작해 보세요.', '태몽으로 꾸었다면 아이에게 들려줄 수 있도록 기록해 두세요.', '용이 떨어지거나 다친 꿈이었다면 무리한 계획을 한 번 점검해 보세요.'],
    },
    vi: {
      why: 'Rồng là linh vật tưởng tượng, nên thường xuất hiện trong mơ khi ta mang khát vọng lớn về thành công. Nhiều người kể đã mơ thấy rồng trước kỳ thi, khi sắp thăng chức hay khởi nghiệp.',
      tips: ['Hãy coi đó là động lực để bắt đầu thử thách bạn đã trì hoãn.', 'Nếu là giấc mơ báo con, hãy ghi lại để sau này kể cho con nghe.', 'Nếu rồng rơi xuống hoặc bị thương, hãy xem lại kế hoạch có quá sức không.'],
    },
  },
  tiger: {
    ko: {
      why: '호랑이는 힘과 권위의 상징이라, 윗사람이나 강한 상대를 의식하고 있을 때, 혹은 스스로 더 당당해지고 싶을 때 꿈에 나타나기 쉽습니다. 쫓기는 꿈이라면 부담스러운 일에 대한 압박감이 반영된 것일 수 있습니다.',
      tips: ['호랑이와 맞서거나 길들였다면 자신감을 갖고 중요한 일을 밀고 나가 보세요.', '쫓기기만 했다면 요즘 부담이 되는 일을 작은 단계로 나눠 보세요.', '태몽이라면 장면을 자세히 기록해 두세요.'],
    },
    vi: {
      why: 'Hổ tượng trưng cho sức mạnh và quyền uy, nên dễ xuất hiện khi bạn đang để ý đến cấp trên hay đối thủ mạnh, hoặc khi muốn bản thân mạnh mẽ hơn. Nếu bị hổ đuổi, đó có thể là áp lực từ việc đang gánh vác.',
      tips: ['Nếu bạn đối mặt hoặc thuần phục được hổ, hãy tự tin theo đuổi việc quan trọng.', 'Nếu chỉ bị đuổi, hãy chia việc đang đè nặng thành từng bước nhỏ.', 'Nếu là giấc mơ báo con, hãy ghi lại chi tiết.'],
    },
  },
  dog: {
    ko: {
      why: '개는 가장 가까운 반려동물이라, 꿈속의 개는 친구나 가족, 동료처럼 가까운 관계를 비추는 경우가 많습니다. 반려견을 키운다면 단순히 낮 동안의 기억이 꿈으로 이어진 것일 수도 있습니다. 한국에서 “개꿈”이 ‘의미 없는 꿈’을 뜻하는 것도 이 때문입니다.',
      tips: ['개가 반갑게 다가왔다면 연락이 뜸했던 친구에게 안부를 전해 보세요.', '개에게 물렸다면 가까운 사람과의 오해가 없는지 돌아보세요.', '반려견이 아픈 꿈이었다면 건강검진 날짜를 확인해 보는 것도 좋습니다.'],
    },
    vi: {
      why: 'Chó là thú cưng gần gũi nhất, nên chó trong mơ thường phản chiếu các mối quan hệ thân thiết như bạn bè, gia đình, đồng nghiệp. Nếu bạn nuôi chó, có khi đó chỉ là ký ức ban ngày đi vào giấc mơ — người Hàn còn gọi giấc mơ vô nghĩa là “giấc mơ chó” (개꿈).',
      tips: ['Nếu chó vui vẻ chạy đến, hãy nhắn hỏi thăm người bạn lâu ngày không liên lạc.', 'Nếu bị chó cắn, hãy xem có hiểu lầm nào với người thân không.', 'Nếu mơ chó cưng bị ốm, nhân dịp này kiểm tra lịch khám cho nó.'],
    },
  },
  cat: {
    ko: {
      why: '고양이는 독립적이고 속을 알기 어려운 동물이라, 꿈에서는 겉과 속이 다른 관계나 내 안의 예민함을 비추는 경우가 많습니다. 최근 누군가의 진심이 궁금하거나, 스스로 혼자만의 시간이 필요하다고 느낄 때 꿀 수 있습니다.',
      tips: ['고양이가 할퀴었다면 요즘 신경 쓰이는 인간관계를 정리해 보세요.', '고양이가 편안히 안겼다면 나를 위한 휴식 시간을 가져 보세요.', '베트남에는 토끼띠 대신 고양이띠(Mão)가 있으니, 가족 중 토끼띠가 있다면 베트남식으로는 고양이띠라고 알려 줘도 재미있습니다.'],
    },
    vi: {
      why: 'Mèo độc lập và khó đoán, nên trong mơ thường phản chiếu mối quan hệ “trong ngoài bất nhất” hoặc sự nhạy cảm bên trong bạn. Giấc mơ này có thể đến khi bạn băn khoăn về lòng thật của ai đó, hoặc cần thời gian riêng cho mình.',
      tips: ['Nếu bị mèo cào, hãy sắp xếp lại các mối quan hệ khiến bạn mệt mỏi.', 'Nếu mèo nằm yên trong lòng, hãy dành thời gian nghỉ ngơi cho bản thân.', 'Người Việt còn liên tưởng đến tuổi Mão (mèo) — thử nghĩ xem trong nhà ai tuổi Mão.'],
    },
  },
  fish: {
    ko: {
      why: '물고기는 물속에서 자유롭게 움직이는 생명이라, 기회나 새로운 시작, 그리고 임신의 상징으로 자주 해석됩니다. 실제로 태몽 가운데 잉어나 큰 물고기 꿈이 매우 흔합니다.',
      tips: ['물고기를 잡았다면 망설이던 기회를 잡아 볼 시기로 생각해 보세요.', '물고기가 죽어 있었다면 지친 몸과 마음을 먼저 돌보세요.', '임신을 준비 중이라면 태몽으로 기록해 두세요.'],
    },
    vi: {
      why: 'Cá bơi tự do trong nước, nên thường tượng trưng cho cơ hội, khởi đầu mới và cả việc mang thai. Trong các giấc mơ báo con ở Hàn, mơ thấy cá chép hay cá lớn rất phổ biến.',
      tips: ['Nếu bắt được cá, có thể đã đến lúc nắm lấy cơ hội bạn còn chần chừ.', 'Nếu thấy cá chết, hãy chăm sóc cơ thể và tinh thần đang mệt mỏi.', 'Nếu đang mong con, hãy ghi lại như một giấc mơ báo con.'],
    },
  },
  rat: {
    ko: {
      why: '쥐는 작지만 영리하고 재빠른 동물이라, 꿈에서는 자잘한 걱정이나 몰래 새어 나가는 돈, 혹은 부지런함을 상징합니다. 사소한 일이 계속 신경 쓰일 때 쥐꿈을 꾸는 경우가 많습니다.',
      tips: ['쥐가 곡식을 먹었다면 정기 결제나 새는 지출이 없는지 확인해 보세요.', '쥐를 잡았다면 미뤄 둔 작은 일들을 하나씩 처리해 보세요.', '쥐띠 가족이 있다면 안부를 묻는 계기로 삼아 보세요.'],
    },
    vi: {
      why: 'Chuột nhỏ nhưng lanh lợi, nên trong mơ thường tượng trưng cho những lo lắng vụn vặt, tiền bạc âm thầm hao hụt, hoặc sự chăm chỉ. Người ta hay mơ thấy chuột khi bị nhiều việc nhỏ làm phiền.',
      tips: ['Nếu chuột ăn lúa gạo, hãy kiểm tra các khoản thanh toán định kỳ, chi tiêu rò rỉ.', 'Nếu bắt được chuột, hãy giải quyết từng việc nhỏ đang tồn đọng.', 'Nếu trong nhà có người tuổi Tý, đây là dịp hỏi thăm.'],
    },
  },
  teeth: {
    ko: {
      why: '이빨이 빠지는 꿈은 세계적으로 가장 흔한 꿈 중 하나입니다. 심리학에서는 외모나 평판에 대한 걱정, 통제력을 잃을 것 같은 불안, 중요한 변화 앞의 긴장과 연결해 보곤 합니다. 실제로 잠잘 때 이를 갈거나 치아가 불편하면 이런 꿈을 꾸기도 합니다.',
      tips: ['한국 속설처럼 가족 건강이 걱정된다면 부모님께 안부 전화를 드려 보세요.', '최근 큰 발표나 면접처럼 평가받는 일이 있다면 준비 계획을 세워 보세요.', '같은 꿈이 반복되고 턱이 아프다면 치과에서 이갈이 여부를 확인해 보세요.'],
    },
    vi: {
      why: 'Mơ rụng răng là một trong những giấc mơ phổ biến nhất thế giới. Tâm lý học thường liên hệ nó với nỗi lo về ngoại hình, danh tiếng, cảm giác mất kiểm soát, hoặc căng thẳng trước thay đổi lớn. Nghiến răng khi ngủ hay đau răng thật cũng có thể gây ra giấc mơ này.',
      tips: ['Nếu lo cho sức khỏe người thân như quan niệm dân gian, hãy gọi điện hỏi thăm bố mẹ.', 'Nếu sắp có buổi thuyết trình hay phỏng vấn, hãy lập kế hoạch chuẩn bị.', 'Nếu mơ lặp lại và đau hàm, hãy đi nha sĩ kiểm tra tật nghiến răng.'],
    },
  },
  deceased: {
    ko: {
      why: '돌아가신 분이 나오는 꿈은 그리움이나 미처 하지 못한 말, 혹은 기일·명절처럼 그분을 떠올리게 되는 시기와 관련이 깊습니다. 중요한 결정을 앞두고 “그분이라면 어떻게 했을까” 하는 마음이 꿈으로 나타나기도 합니다.',
      tips: ['기일이 다가온다면 날짜를 확인하고 가족과 추모 계획을 이야기해 보세요.', '그분께 하고 싶었던 말을 짧게 적어 보는 것도 마음을 정리하는 데 도움이 됩니다.', '슬픔이 오래 이어져 일상이 힘들다면 가까운 사람이나 상담가에게 이야기하세요.'],
    },
    vi: {
      why: 'Mơ thấy người đã khuất thường gắn với nỗi nhớ, những lời chưa kịp nói, hoặc thời điểm gợi nhớ người ấy như ngày giỗ, ngày Tết. Trước quyết định quan trọng, suy nghĩ “nếu là ông bà, cha mẹ thì sẽ làm gì” cũng có thể đi vào giấc mơ.',
      tips: ['Nếu sắp đến ngày giỗ, hãy xem lại ngày và bàn với gia đình việc cúng giỗ.', 'Viết ngắn gọn những điều muốn nói với người đã khuất giúp lòng nhẹ nhõm hơn.', 'Nếu nỗi buồn kéo dài ảnh hưởng cuộc sống, hãy chia sẻ với người thân hoặc chuyên gia tư vấn.'],
    },
  },
  baby: {
    ko: {
      why: '아기는 새로 시작되는 일, 아직 작지만 키워 나갈 계획, 혹은 보살핌이 필요한 내 마음을 상징하는 경우가 많습니다. 새 프로젝트나 새 관계를 시작했을 때, 또는 주변에 출산 소식이 있을 때 자주 꾸게 됩니다.',
      tips: ['요즘 시작한 일이 있다면 그것을 꾸준히 ‘돌보는’ 계획을 세워 보세요.', '아기가 울었다면 나 자신이 지쳐 있지 않은지 돌아보세요.', '임신을 준비 중이라면 태몽일 수 있으니 기록해 두세요.'],
    },
    vi: {
      why: 'Em bé thường tượng trưng cho việc mới bắt đầu, kế hoạch còn nhỏ cần nuôi dưỡng, hoặc phần tâm hồn cần được chăm sóc. Giấc mơ này hay đến khi bạn vừa bắt đầu dự án hay mối quan hệ mới, hoặc khi xung quanh có người sinh con.',
      tips: ['Nếu vừa bắt đầu việc gì, hãy lên kế hoạch “chăm sóc” nó đều đặn.', 'Nếu em bé khóc, hãy xem chính mình có đang kiệt sức không.', 'Nếu đang mong con, đó có thể là giấc mơ báo con — hãy ghi lại.'],
    },
  },
  pregnancy: {
    ko: {
      why: '임신하는 꿈은 실제 임신과 관계없이 새로운 아이디어나 계획이 마음속에서 자라고 있음을 나타낸다고 보는 시각이 많습니다. 실제로 임신을 기다리거나 걱정하는 시기라면 그 마음이 그대로 꿈에 반영되기도 합니다.',
      tips: ['마음속에 품고 있는 계획이 있다면 구체적인 일정으로 적어 보세요.', '임신 가능성이 걱정된다면 꿈보다 검사로 확인하는 것이 가장 정확합니다.', '남성이 꾼 임신 꿈도 새로운 책임이나 역할을 앞두고 꾸는 경우가 많습니다.'],
    },
    vi: {
      why: 'Dù không liên quan đến việc mang thai thật, mơ mình có thai thường được hiểu là một ý tưởng hay kế hoạch mới đang lớn dần trong lòng. Nếu bạn đang mong chờ hoặc lo lắng về chuyện có thai, tâm trạng ấy cũng đi thẳng vào giấc mơ.',
      tips: ['Nếu đang ấp ủ kế hoạch, hãy viết nó thành lịch trình cụ thể.', 'Nếu lo lắng có thai hay không, que thử hay xét nghiệm chính xác hơn giấc mơ.', 'Nam giới mơ mình có thai cũng thường là khi sắp gánh vai trò, trách nhiệm mới.'],
    },
  },
  wedding: {
    ko: {
      why: '결혼은 두 사람이 하나가 되는 큰 변화라, 꿈에서는 인생의 전환점이나 새로운 약속, 계약을 상징하는 경우가 많습니다. 실제 결혼을 앞두고 있다면 설렘과 부담이 함께 꿈으로 나오는 것이 자연스럽습니다.',
      tips: ['결혼을 준비 중이라면 양가 일정과 준비 목록을 한 번 정리해 보세요.', '새 직장, 계약 같은 ‘약속’을 앞두고 있다면 조건을 꼼꼼히 확인하세요.', '모르는 사람과 결혼하는 꿈은 새로운 나의 모습을 받아들이는 과정으로 보기도 합니다.'],
    },
    vi: {
      why: 'Kết hôn là thay đổi lớn khi hai người thành một, nên trong mơ thường tượng trưng cho bước ngoặt cuộc đời, lời hứa hay hợp đồng mới. Nếu bạn thật sự sắp cưới, việc vừa hồi hộp vừa áp lực hiện vào giấc mơ là chuyện bình thường.',
      tips: ['Nếu đang chuẩn bị cưới, hãy sắp xếp lại lịch của hai bên gia đình và danh sách việc cần làm.', 'Nếu sắp có “cam kết” như việc làm mới, hợp đồng, hãy đọc kỹ điều khoản.', 'Mơ cưới người lạ đôi khi được xem là quá trình chấp nhận một phiên bản mới của chính mình.'],
    },
  },
  ex: {
    ko: {
      why: '전 애인 꿈은 그 사람이 그리워서라기보다, 그 시절의 나나 끝맺지 못한 감정을 떠올리는 경우가 많습니다. 새로운 연애를 시작했거나 비슷한 상황을 겪을 때, 또는 SNS에서 우연히 소식을 본 뒤에 꾸기 쉽습니다.',
      tips: ['꿈을 꿨다고 바로 연락하기보다 하루 이틀 마음을 정리할 시간을 가지세요.', '그 시절에 배운 점을 적어 보면 지금 관계에 도움이 됩니다.', '현재 연인이 있다면 꿈 이야기로 불필요한 오해를 만들지 않는 것이 좋습니다.'],
    },
    vi: {
      why: 'Mơ thấy người yêu cũ thường không hẳn vì còn nhớ người đó, mà vì nhớ lại chính mình thời ấy hoặc cảm xúc chưa khép lại. Dễ mơ khi vừa bắt đầu mối tình mới, gặp hoàn cảnh tương tự, hay tình cờ thấy tin tức của họ trên mạng xã hội.',
      tips: ['Đừng vội nhắn tin sau giấc mơ; hãy cho mình một hai ngày để sắp xếp cảm xúc.', 'Viết ra những điều học được từ mối tình cũ sẽ giúp ích cho mối quan hệ hiện tại.', 'Nếu đang có người yêu, không nên kể giấc mơ theo cách gây hiểu lầm.'],
    },
  },
  blood: {
    ko: {
      why: '피는 생명력과 강한 감정을 상징합니다. 한국 전통 해몽에서는 피를 재물로 보아 길몽으로 풀이하는 경우가 많지만, 현대적으로는 큰 감정 소모나 건강에 대한 신경 쓰임이 반영된 꿈으로 보기도 합니다.',
      tips: ['피를 흠뻑 뒤집어쓴 꿈은 전통적으로 길몽이니 너무 걱정하지 마세요.', '최근 감정적으로 크게 소모된 일이 있다면 휴식 시간을 꼭 만드세요.', '실제 출혈이나 건강 증상이 있다면 꿈과 상관없이 병원에서 확인하세요.'],
    },
    vi: {
      why: 'Máu tượng trưng cho sinh lực và cảm xúc mạnh. Giải mộng truyền thống Hàn thường xem máu là tiền tài, điềm tốt; còn theo cách nhìn hiện đại, đây có thể là dấu hiệu bạn đang hao tổn cảm xúc hoặc bận tâm về sức khỏe.',
      tips: ['Mơ dính đầy máu theo truyền thống là điềm tốt, đừng quá lo.', 'Nếu gần đây cảm xúc bị tiêu hao nhiều, hãy dành thời gian nghỉ ngơi.', 'Nếu thực sự có triệu chứng chảy máu hay sức khỏe bất thường, hãy đi khám dù có mơ hay không.'],
    },
  },
  hair: {
    ko: {
      why: '머리카락은 외모와 자신감, 그리고 기운을 상징합니다. 머리카락이 빠지거나 잘리는 꿈은 나이 듦이나 외모에 대한 걱정, 무언가를 잃을 것 같은 불안과 연결되기 쉽고, 스스로 머리를 자르는 꿈은 변화하고 싶은 마음으로 보기도 합니다.',
      tips: ['변화를 원한다면 작은 것부터 바꿔 보세요. 헤어스타일도 좋은 시작입니다.', '스트레스가 많다면 수면과 식사 리듬부터 챙기세요.', '실제로 탈모가 심해졌다면 피부과 상담을 받아 보세요.'],
    },
    vi: {
      why: 'Tóc tượng trưng cho ngoại hình, sự tự tin và sinh khí. Mơ rụng tóc hay bị cắt tóc dễ gắn với nỗi lo tuổi tác, ngoại hình, cảm giác sắp mất điều gì; còn tự cắt tóc thường được xem là mong muốn thay đổi.',
      tips: ['Nếu muốn thay đổi, hãy bắt đầu từ việc nhỏ — kiểu tóc mới cũng là khởi đầu tốt.', 'Nếu căng thẳng nhiều, hãy ưu tiên giấc ngủ và bữa ăn đều đặn.', 'Nếu thật sự rụng tóc nhiều, hãy đến bác sĩ da liễu.'],
    },
  },
  poop: {
    ko: {
      why: '똥꿈은 더럽지만 한국에서는 대표적인 재물 길몽입니다. 현대적으로는 쌓인 것을 비워 내고 싶은 마음, 해결하지 못한 일을 정리하고 싶은 욕구로 보기도 합니다. 실제로 장이 불편할 때 꾸는 경우도 있습니다.',
      tips: ['재물운이 온다는 꿈이니, 이번 기회에 통장과 지출을 정리해 보세요.', '마음에 쌓인 일이 있다면 오늘 하나만 골라 마무리해 보세요.', '소화가 불편하다면 식습관을 점검해 보세요.'],
    },
    vi: {
      why: 'Mơ thấy phân tuy bẩn nhưng ở Hàn lại là điềm tài lộc tiêu biểu. Theo cách nhìn hiện đại, đây còn là mong muốn “xả” những gì tích tụ, giải quyết việc còn dang dở. Đôi khi đó chỉ là do bụng bạn đang khó chịu.',
      tips: ['Đã là điềm tài lộc, hãy nhân dịp sắp xếp lại tài khoản và chi tiêu.', 'Nếu có việc tồn đọng, hôm nay hãy chọn một việc để hoàn thành.', 'Nếu tiêu hóa không tốt, hãy xem lại thói quen ăn uống.'],
    },
  },
  cheating: {
    ko: {
      why: '연인이 바람피우는 꿈은 실제 외도의 예고라기보다 관계에서 느끼는 불안, 소외감, 혹은 내가 충분히 사랑받고 있는지에 대한 걱정이 반영된 경우가 많습니다. 내가 바람피우는 꿈은 현재 생활에서 부족하다고 느끼는 것이 있다는 신호로 보기도 합니다.',
      tips: ['꿈 내용을 그대로 따지기보다 “요즘 조금 서운했다”처럼 감정을 솔직히 이야기해 보세요.', '두 사람만의 시간을 일부러 만들어 보세요.', '불안이 계속된다면 그 원인이 관계인지 나의 피로인지 구분해 보세요.'],
    },
    vi: {
      why: 'Mơ người yêu ngoại tình thường không phải điềm báo thật, mà phản ánh cảm giác bất an, bị bỏ rơi, hay nỗi lo mình chưa được yêu đủ. Mơ chính mình ngoại tình đôi khi là tín hiệu có điều gì đó bạn thấy thiếu trong cuộc sống hiện tại.',
      tips: ['Thay vì chất vấn theo giấc mơ, hãy nói thật cảm xúc như “dạo này em hơi buồn”.', 'Chủ động tạo thời gian riêng cho hai người.', 'Nếu bất an kéo dài, hãy phân biệt nguyên nhân là mối quan hệ hay do bạn đang mệt mỏi.'],
    },
  },
  ghost: {
    ko: {
      why: '귀신 꿈은 정체를 알 수 없는 불안이나 해결되지 않은 걱정을 형상화한 경우가 많습니다. 공포 영화를 본 날, 몸이 피곤하거나 잠자리가 바뀐 날에도 자주 꾸며, 가위눌림과 함께 나타나기도 합니다.',
      tips: ['자기 전 무서운 영상이나 휴대폰 사용을 줄여 보세요.', '막연한 걱정이 있다면 종이에 적어 구체화하면 불안이 줄어듭니다.', '가위눌림이 잦다면 수면 자세와 수면 시간을 점검하세요.'],
    },
    vi: {
      why: 'Mơ thấy ma thường là hình ảnh hóa của nỗi bất an không rõ nguồn gốc hay lo lắng chưa giải quyết. Dễ mơ vào hôm xem phim kinh dị, khi cơ thể mệt hay ngủ chỗ lạ, đôi khi kèm theo hiện tượng “bóng đè”.',
      tips: ['Hạn chế xem phim kinh dị hay dùng điện thoại trước khi ngủ.', 'Viết nỗi lo mơ hồ ra giấy để cụ thể hóa sẽ giúp bớt bất an.', 'Nếu thường bị bóng đè, hãy xem lại tư thế và thời gian ngủ.'],
    },
  },
  naked: {
    ko: {
      why: '사람들 앞에서 벌거벗은 꿈은 준비가 덜 된 채 평가받을 것 같은 불안, 숨기고 싶은 약점이 드러날까 하는 걱정과 연결되는 대표적인 꿈입니다. 반대로 부끄러움 없이 편안했다면 솔직해지고 싶은 마음으로 보기도 합니다.',
      tips: ['발표나 면접이 다가온다면 예상 질문을 미리 정리해 보세요.', '혼자 감추고 있는 고민이 있다면 믿을 만한 사람에게 털어놓아 보세요.', '꿈에서 편안했다면 나다움을 드러낼 기회로 삼아 보세요.'],
    },
    vi: {
      why: 'Mơ mình trần truồng trước đám đông là giấc mơ tiêu biểu của nỗi lo bị đánh giá khi chưa chuẩn bị đủ, hay sợ điểm yếu bị lộ ra. Ngược lại, nếu thấy thoải mái, đó có thể là mong muốn sống thật với bản thân.',
      tips: ['Nếu sắp thuyết trình, phỏng vấn, hãy chuẩn bị trước các câu hỏi có thể gặp.', 'Nếu đang giấu một nỗi lo, hãy thử chia sẻ với người bạn tin tưởng.', 'Nếu trong mơ thấy thoải mái, hãy coi đó là dịp thể hiện con người thật của mình.'],
    },
  },
  'lost-child': {
    ko: {
      why: '아이를 잃어버리는 꿈은 부모라면 누구나 한 번쯤 꾸는 꿈으로, 아이를 지키고 싶은 마음과 바쁜 일상 속 죄책감이 반영된 경우가 많습니다. 아이가 없는 사람에게는 소중한 계획이나 꿈을 놓치고 있다는 불안으로 해석되기도 합니다.',
      tips: ['요즘 아이와 함께한 시간이 적었다면 짧게라도 단둘이 시간을 가져 보세요.', '아이에게 미아 방지 연락처를 알려 주는 등 실제 안전 수칙을 점검해 보세요.', '놓치고 있는 계획이 떠오른다면 다시 일정에 넣어 보세요.'],
    },
    vi: {
      why: 'Mơ lạc mất con là giấc mơ gần như cha mẹ nào cũng từng gặp, phản ánh mong muốn bảo vệ con và cảm giác áy náy vì cuộc sống bận rộn. Với người chưa có con, nó có thể là nỗi lo đang để vuột mất kế hoạch, ước mơ quý giá.',
      tips: ['Nếu dạo này ít thời gian bên con, hãy dành dù chỉ một chút thời gian riêng với con.', 'Xem lại các quy tắc an toàn thực tế như dạy con nhớ số điện thoại của bố mẹ.', 'Nếu nghĩ ra kế hoạch đang bỏ quên, hãy đưa nó trở lại lịch trình.'],
    },
  },
  water: {
    ko: {
      why: '물은 감정과 무의식을 상징하는 대표적인 이미지입니다. 맑고 잔잔한 물은 마음이 안정된 상태, 흙탕물이나 거친 물결은 복잡한 감정이나 스트레스를 비추는 것으로 보는 경우가 많습니다.',
      tips: ['맑은 물이었다면 지금의 흐름을 믿고 계획을 이어 가세요.', '흙탕물이었다면 마음을 어지럽히는 일을 하나씩 정리해 보세요.', '물을 충분히 마시고 있는지도 한번 챙겨 보세요.'],
    },
    vi: {
      why: 'Nước là hình ảnh tiêu biểu của cảm xúc và tiềm thức. Nước trong, lặng thường phản chiếu tâm trạng ổn định; nước đục, sóng dữ phản chiếu cảm xúc rối bời hay căng thẳng.',
      tips: ['Nếu nước trong, hãy tin vào dòng chảy hiện tại và tiếp tục kế hoạch.', 'Nếu nước đục, hãy lần lượt giải quyết những việc khiến lòng rối.', 'Cũng nên xem mình đã uống đủ nước mỗi ngày chưa.'],
    },
  },
  fire: {
    ko: {
      why: '불은 열정과 분노, 그리고 변화의 에너지를 동시에 상징합니다. 한국 전통 해몽에서는 활활 타는 불을 번창의 길몽으로 보지만, 현대적으로는 억눌린 화나 급한 마음이 반영된 꿈으로 보기도 합니다.',
      tips: ['불이 시원하게 탔다면 열정을 쏟을 일을 정해 추진해 보세요.', '불을 끄느라 애썼다면 최근 화가 쌓인 일이 없는지 돌아보세요.', '꿈을 계기로 집 안의 가스, 전기 안전을 한 번 점검하는 것도 좋습니다.'],
    },
    vi: {
      why: 'Lửa vừa tượng trưng cho đam mê, giận dữ, vừa là năng lượng thay đổi. Giải mộng truyền thống Hàn xem lửa cháy rực là điềm hưng thịnh; theo cách nhìn hiện đại, đó có thể là cơn giận bị dồn nén hay sự nóng vội.',
      tips: ['Nếu lửa cháy rực rỡ, hãy chọn một việc để dồn hết đam mê.', 'Nếu bạn vất vả dập lửa, hãy xem có chuyện gì khiến mình tức giận gần đây không.', 'Nhân giấc mơ, hãy kiểm tra an toàn gas, điện trong nhà.'],
    },
  },
  flood: {
    ko: {
      why: '홍수 꿈은 감당하기 벅찬 일이나 감정이 한꺼번에 밀려오는 느낌과 연결됩니다. 일이 몰리는 시기, 큰 변화가 겹친 시기에 자주 꾸며, 전통적으로는 재물이 크게 들어오는 꿈으로 풀이하기도 합니다.',
      tips: ['해야 할 일을 목록으로 적고 우선순위를 정해 보세요.', '혼자 감당하기 어렵다면 도움을 요청하는 것도 능력입니다.', '우기에는 실제 침수 대비와 안전 정보를 확인해 두세요.'],
    },
    vi: {
      why: 'Mơ lũ lụt gắn với cảm giác công việc hay cảm xúc ập đến cùng lúc, vượt sức chịu đựng. Hay mơ khi việc dồn dập hoặc nhiều thay đổi lớn chồng lên nhau; theo truyền thống, nó còn được xem là điềm tiền tài đổ về.',
      tips: ['Hãy liệt kê việc cần làm và sắp xếp thứ tự ưu tiên.', 'Nếu quá sức, biết nhờ giúp đỡ cũng là một năng lực.', 'Mùa mưa, hãy chuẩn bị phòng ngập và theo dõi thông tin an toàn.'],
    },
  },
  moon: {
    ko: {
      why: '달은 차고 기우는 모습 때문에 감정의 변화, 여성성, 그리고 소망을 상징합니다. 보름달은 무언가가 완성되거나 이루어지는 느낌, 초승달은 새로운 시작을 비추는 것으로 보는 경우가 많습니다. 한국에서는 태몽으로도 자주 등장합니다.',
      tips: ['보름달이었다면 마무리 단계에 있는 일에 힘을 실어 보세요.', '초승달이었다면 새로 시작하고 싶은 일을 하나 정해 보세요.', '실제 달의 모양이 궁금하다면 오늘의 음력 날짜를 확인해 보세요.'],
    },
    vi: {
      why: 'Mặt trăng tròn khuyết nên tượng trưng cho sự thay đổi cảm xúc, nữ tính và ước nguyện. Trăng tròn thường gợi cảm giác điều gì đó sắp trọn vẹn, trăng non gợi khởi đầu mới. Ở Hàn, trăng còn hay xuất hiện trong giấc mơ báo con.',
      tips: ['Nếu là trăng tròn, hãy dồn sức cho việc đang ở giai đoạn hoàn thành.', 'Nếu là trăng non, hãy chọn một việc mới muốn bắt đầu.', 'Muốn biết hình dạng trăng thật hôm nay, hãy xem ngày âm lịch.'],
    },
  },
  money: {
    ko: {
      why: '돈 꿈은 경제적인 걱정이나 기대가 클 때 자주 꿉니다. 한국 전통 해몽에서는 돈을 줍는 꿈보다 돈을 잃거나 주는 꿈을 오히려 길하게 보는 등 뒤집어 풀이하는 경우도 많아, 꿈속 상황을 잘 떠올려 보는 것이 중요합니다.',
      tips: ['이번 달 고정 지출과 저축 목표를 숫자로 적어 보세요.', '돈을 빌려주거나 보증을 서야 할 일이 있다면 신중히 결정하세요.', '돈 걱정이 잠을 방해할 정도라면 가까운 사람이나 재무 상담을 통해 계획을 세워 보세요.'],
    },
    vi: {
      why: 'Người ta hay mơ thấy tiền khi đang lo lắng hoặc kỳ vọng nhiều về tài chính. Giải mộng truyền thống Hàn đôi khi hiểu ngược — mất tiền hay cho tiền lại là điềm tốt hơn nhặt được tiền — nên hãy nhớ kỹ tình huống trong mơ.',
      tips: ['Hãy viết rõ bằng con số các khoản chi cố định và mục tiêu tiết kiệm tháng này.', 'Nếu có việc cho vay hay đứng ra bảo lãnh, hãy cân nhắc kỹ.', 'Nếu lo tiền đến mất ngủ, hãy lập kế hoạch cùng người thân hoặc chuyên gia tài chính.'],
    },
  },
  falling: {
    ko: {
      why: '떨어지는 꿈은 이빨 빠지는 꿈과 함께 가장 흔한 꿈입니다. 통제력을 잃는 듯한 불안, 지위나 관계가 흔들릴 것 같은 걱정과 연결되며, 잠들 무렵 몸이 움찔하며 깨는 ‘입면 경련’과 함께 나타나기도 합니다.',
      tips: ['요즘 불안한 일이 있다면 내가 통제할 수 있는 부분부터 정리해 보세요.', '카페인과 늦은 밤 휴대폰 사용을 줄이면 잠들 때 움찔하는 일이 줄어듭니다.', '떨어지다 날아올랐다면 위기를 기회로 바꾸는 꿈으로 보기도 합니다.'],
    },
    vi: {
      why: 'Mơ rơi từ trên cao cùng với mơ rụng răng là những giấc mơ phổ biến nhất. Nó gắn với cảm giác mất kiểm soát, lo vị trí hay mối quan hệ bị lung lay, và đôi khi đi kèm hiện tượng giật mình khi vừa chợp mắt.',
      tips: ['Nếu đang lo lắng, hãy bắt đầu từ những phần mình kiểm soát được.', 'Giảm cà phê và dùng điện thoại khuya sẽ bớt bị giật mình khi ngủ.', 'Nếu đang rơi mà bay lên được, đó được xem là giấc mơ biến nguy thành cơ.'],
    },
  },
  chased: {
    ko: {
      why: '쫓기는 꿈은 피하고 싶은 일이나 감정이 있을 때 꾸는 대표적인 꿈입니다. 마감, 갚아야 할 돈, 미뤄 둔 대화처럼 마주하기 싫은 일이 쫓아오는 존재로 나타나곤 합니다.',
      tips: ['나를 쫓던 것이 무엇이었는지, 현실의 어떤 일과 닮았는지 적어 보세요.', '미뤄 둔 일 가운데 가장 작은 것부터 오늘 시작해 보세요.', '꿈에서 돌아서서 맞섰다면 문제를 정면으로 해결할 힘이 있다는 뜻으로 보기도 합니다.'],
    },
    vi: {
      why: 'Mơ bị truy đuổi là giấc mơ tiêu biểu khi có việc hay cảm xúc bạn muốn né tránh. Hạn chót, khoản nợ, cuộc nói chuyện bị trì hoãn… thường hiện thành kẻ đuổi theo trong mơ.',
      tips: ['Hãy viết ra thứ đuổi theo mình là gì, giống với việc gì ngoài đời.', 'Bắt đầu ngay hôm nay từ việc nhỏ nhất trong những việc bị trì hoãn.', 'Nếu trong mơ bạn quay lại đối mặt, đó được xem là bạn có sức giải quyết vấn đề trực diện.'],
    },
  },
  exam: {
    ko: {
      why: '시험 꿈은 학교를 졸업한 지 오래된 사람도 자주 꿉니다. 현실에서 평가받는 상황, 준비가 부족하다고 느끼는 일이 있을 때 익숙한 ‘시험’의 모습으로 나타나는 것입니다. 실제 시험을 앞두고 있다면 긴장의 자연스러운 반영입니다.',
      tips: ['준비가 부족하다고 느끼는 일을 하나 골라 작은 계획을 세워 보세요.', '시험을 앞두고 있다면 마지막 주는 새로운 공부보다 복습과 수면에 집중하세요.', '시험을 잘 본 꿈이었다면 자신감을 가져도 좋습니다.'],
    },
    vi: {
      why: 'Người đã ra trường lâu vẫn hay mơ đi thi. Khi ngoài đời có tình huống bị đánh giá hay việc cảm thấy chưa chuẩn bị đủ, nó hiện ra dưới hình ảnh quen thuộc là kỳ thi. Nếu bạn sắp thi thật, đó là phản ánh tự nhiên của sự căng thẳng.',
      tips: ['Chọn một việc bạn thấy chưa chuẩn bị đủ và lập kế hoạch nhỏ cho nó.', 'Nếu sắp thi, tuần cuối nên tập trung ôn lại và ngủ đủ thay vì học bài mới.', 'Nếu trong mơ làm bài tốt, hãy tự tin lên.'],
    },
  },
  house: {
    ko: {
      why: '집은 나 자신과 가족, 그리고 안정감을 상징하는 대표적인 꿈 이미지입니다. 새집이나 넓은 집은 성장과 변화를, 무너지거나 낡은 집은 몸의 피로나 생활의 불안을 비춘다고 보는 경우가 많습니다. 이사를 앞두고 있다면 그 기대와 걱정이 그대로 반영되기도 합니다.',
      tips: ['이사나 집 계약을 앞두고 있다면 일정과 서류를 한 번 더 확인하세요.', '집이 무너지는 꿈이었다면 건강과 휴식부터 챙겨 보세요.', '모르는 방을 발견하는 꿈은 새로운 재능이나 가능성으로 풀이하기도 합니다.'],
    },
    vi: {
      why: 'Ngôi nhà là hình ảnh tiêu biểu cho bản thân, gia đình và cảm giác an toàn. Nhà mới, nhà rộng thường phản chiếu sự trưởng thành, thay đổi; nhà sập, nhà cũ phản chiếu sự mệt mỏi hay bất an trong cuộc sống. Nếu bạn sắp chuyển nhà, kỳ vọng và lo lắng cũng hiện vào giấc mơ.',
      tips: ['Nếu sắp chuyển nhà hay ký hợp đồng nhà, hãy kiểm tra lại lịch và giấy tờ.', 'Nếu mơ nhà sập, hãy ưu tiên sức khỏe và nghỉ ngơi.', 'Mơ phát hiện căn phòng lạ thường được hiểu là tài năng, khả năng mới.'],
    },
  },
  dying: {
    ko: {
      why: '내가 죽는 꿈은 무섭지만, 한국 전통 해몽에서는 오히려 다시 태어나는 길몽으로 봅니다. 심리적으로도 한 시기가 끝나고 새로운 단계로 넘어가는 변화, 오래된 습관이나 관계를 정리하고 싶은 마음과 연결하는 경우가 많습니다.',
      tips: ['끝내고 싶은 습관이나 관계가 있다면 이번을 정리의 계기로 삼아 보세요.', '새로 시작할 일을 하나 정해 보세요.', '죽음에 대한 생각이 꿈 밖에서도 계속 떠오르고 힘들다면 꼭 주변이나 전문 상담 기관에 도움을 요청하세요.'],
    },
    vi: {
      why: 'Mơ thấy mình chết thật đáng sợ, nhưng giải mộng truyền thống Hàn lại xem đây là điềm tốt, như được “tái sinh”. Về tâm lý, nó thường gắn với việc một giai đoạn khép lại để bước sang giai đoạn mới, hay mong muốn rũ bỏ thói quen, mối quan hệ cũ.',
      tips: ['Nếu có thói quen hay mối quan hệ muốn chấm dứt, hãy coi đây là dịp để dứt khoát.', 'Chọn một việc mới để bắt đầu.', 'Nếu ý nghĩ về cái chết cứ lặp lại cả khi thức và khiến bạn khổ sở, hãy tìm sự giúp đỡ từ người thân hoặc cơ quan tư vấn tâm lý.'],
    },
  },
  flying: {
    ko: {
      why: '하늘을 나는 꿈은 자유롭고 싶은 마음, 현실의 제약에서 벗어나고 싶은 바람과 연결됩니다. 높이 시원하게 날았다면 자신감이 커진 상태, 잘 날지 못하고 허우적댔다면 하고 싶은 일이 막혀 답답한 상태로 보기도 합니다.',
      tips: ['시원하게 날았다면 미뤄 둔 도전을 시작해 보세요.', '잘 날지 못했다면 나를 붙잡고 있는 현실의 제약을 하나씩 적어 보세요.', '짧은 여행이나 산책으로 답답함을 풀어 주는 것도 좋습니다.'],
    },
    vi: {
      why: 'Mơ bay trên trời gắn với khát khao tự do, muốn thoát khỏi giới hạn của thực tại. Bay cao, thoải mái thường phản chiếu sự tự tin; bay chật vật phản chiếu cảm giác bế tắc khi việc muốn làm bị cản trở.',
      tips: ['Nếu bay thoải mái, hãy bắt đầu thử thách đã trì hoãn.', 'Nếu bay chật vật, hãy viết ra những giới hạn đang níu chân mình.', 'Một chuyến đi ngắn hay đi dạo cũng giúp giải tỏa cảm giác bí bách.'],
    },
  },
  gold: {
    ko: {
      why: '금은 변하지 않는 가치를 상징해, 인정받고 싶은 마음이나 소중한 것을 지키고 싶은 마음이 꿈에 나타난 것으로 보기도 합니다. 한국에서는 태몽으로 금반지, 금덩이 꿈이 자주 이야기됩니다.',
      tips: ['요즘 노력한 일이 있다면 스스로 작은 보상을 주세요.', '귀중품이나 중요한 서류의 보관 상태를 확인해 보세요.', '태몽으로 꾸었다면 기록해 두세요.'],
    },
    vi: {
      why: 'Vàng tượng trưng cho giá trị bền vững, nên giấc mơ có thể phản ánh mong muốn được công nhận hay giữ gìn điều quý giá. Ở Hàn, mơ nhẫn vàng, thỏi vàng cũng hay được kể như giấc mơ báo con.',
      tips: ['Nếu gần đây bạn đã nỗ lực, hãy tự thưởng cho mình một món nhỏ.', 'Kiểm tra lại nơi cất đồ quý giá và giấy tờ quan trọng.', 'Nếu là giấc mơ báo con, hãy ghi lại.'],
    },
  },
  'car-accident': {
    ko: {
      why: '교통사고 꿈은 일이 너무 빠르게 진행되거나 통제할 수 없다는 느낌, 충돌이 예상되는 갈등을 반영하는 경우가 많습니다. 운전을 자주 하거나 최근 사고 소식을 접했다면 그 기억이 꿈으로 이어진 것일 수 있습니다.',
      tips: ['요즘 너무 서두르고 있지 않은지, 일정에 여유를 두어 보세요.', '갈등이 있는 사람과는 감정이 가라앉은 뒤 대화하세요.', '오토바이·자동차를 탄다면 헬멧, 안전벨트를 다시 한번 챙기세요.'],
    },
    vi: {
      why: 'Mơ tai nạn giao thông thường phản ánh cảm giác mọi việc diễn ra quá nhanh, mất kiểm soát, hoặc mâu thuẫn sắp “va chạm”. Nếu bạn lái xe thường xuyên hay vừa đọc tin tai nạn, ký ức ấy có thể đi vào giấc mơ.',
      tips: ['Xem mình có đang quá vội vàng không, hãy để lịch trình thoáng hơn.', 'Với người đang có mâu thuẫn, hãy nói chuyện khi cảm xúc đã lắng xuống.', 'Nếu đi xe máy, ô tô, hãy kiểm tra lại mũ bảo hiểm và dây an toàn.'],
    },
  },
  shoes: {
    ko: {
      why: '신발은 내가 걸어가는 길, 곧 진로와 사회적 위치, 그리고 함께하는 사람을 상징합니다. 신발을 잃어버리는 꿈은 방향을 잃은 느낌이나 관계의 변화에 대한 걱정, 새 신발은 새로운 출발로 보는 경우가 많습니다.',
      tips: ['진로 고민이 있다면 앞으로 1년의 방향을 한 줄로 적어 보세요.', '신발을 잃어버렸다면 가까운 관계에 서운한 점이 없는지 살펴보세요.', '새 신발을 신었다면 새로운 시작을 응원받는 꿈으로 생각하세요.'],
    },
    vi: {
      why: 'Đôi giày tượng trưng cho con đường mình đi — hướng nghiệp, vị trí xã hội và người đồng hành. Mơ mất giày thường là cảm giác lạc hướng hay lo mối quan hệ thay đổi; giày mới là khởi đầu mới.',
      tips: ['Nếu đang băn khoăn hướng đi, hãy viết một câu về định hướng cho năm tới.', 'Nếu mất giày, hãy xem mối quan hệ thân thiết có điều gì khiến mình buồn không.', 'Nếu đi giày mới, hãy coi đó là lời cổ vũ cho khởi đầu mới.'],
    },
  },
  late: {
    ko: {
      why: '지각하는 꿈은 일정에 쫓기거나 기회를 놓칠까 걱정될 때 자주 꿉니다. 할 일이 많아 시간 관리가 버겁다고 느끼는 시기의 대표적인 스트레스 꿈입니다.',
      tips: ['다음 주 일정을 미리 적고 여유 시간을 끼워 넣어 보세요.', '알람을 하나 더 맞추는 것만으로도 불안이 줄어듭니다.', '놓칠까 걱정되는 기회가 있다면 마감일을 확인해 두세요.'],
    },
    vi: {
      why: 'Mơ đi trễ thường đến khi bạn bị lịch trình dí hoặc sợ bỏ lỡ cơ hội. Đây là giấc mơ căng thẳng tiêu biểu khi có quá nhiều việc và khó quản lý thời gian.',
      tips: ['Viết trước lịch tuần tới và chừa khoảng trống dự phòng.', 'Chỉ cần đặt thêm một báo thức cũng giúp bớt lo.', 'Nếu sợ lỡ cơ hội nào đó, hãy kiểm tra hạn chót.'],
    },
  },
  kiss: {
    ko: {
      why: '키스하는 꿈은 친밀감과 애정에 대한 바람, 혹은 누군가와 더 가까워지고 싶은 마음을 비춥니다. 꿈속 상대가 의외의 사람이라도 그 사람에 대한 감정이라기보다 그 사람이 가진 어떤 면을 닮고 싶은 마음으로 보기도 합니다.',
      tips: ['연인이 있다면 표현을 조금 더 해 보세요.', '의외의 상대였다면 그 사람의 어떤 점이 떠오르는지 생각해 보세요.', '외로움이 크다면 친구나 가족과 함께하는 시간을 늘려 보세요.'],
    },
    vi: {
      why: 'Mơ hôn phản chiếu mong muốn được gần gũi, yêu thương, hoặc muốn thân thiết hơn với ai đó. Dù người trong mơ là người bất ngờ, đó có thể không phải tình cảm với họ mà là mong muốn có được một nét nào đó ở họ.',
      tips: ['Nếu đang có người yêu, hãy thể hiện tình cảm nhiều hơn một chút.', 'Nếu là người bất ngờ, hãy nghĩ xem điều gì ở họ khiến bạn nhớ đến.', 'Nếu thấy cô đơn, hãy dành thêm thời gian với bạn bè, gia đình.'],
    },
  },
  fight: {
    ko: {
      why: '싸우는 꿈은 현실에서 표현하지 못한 화나 갈등, 혹은 내 안의 두 가지 마음이 부딪히는 상태를 비춥니다. 한국 전통 해몽에서는 싸워서 이기는 꿈을 일이 잘 풀리는 길몽으로 보기도 합니다.',
      tips: ['꿈속 상대와 실제로 불편한 일이 있다면 차분하게 대화할 기회를 만들어 보세요.', '운동이나 산책으로 쌓인 긴장을 풀어 주세요.', '결정을 못 내리고 있는 일이 있다면 장단점을 적어 비교해 보세요.'],
    },
    vi: {
      why: 'Mơ đánh nhau phản chiếu cơn giận, mâu thuẫn chưa nói ra ngoài đời, hoặc hai luồng suy nghĩ trong lòng đang xung đột. Giải mộng truyền thống Hàn còn xem mơ đánh thắng là điềm mọi việc hanh thông.',
      tips: ['Nếu ngoài đời có chuyện khó chịu với người trong mơ, hãy tìm dịp nói chuyện bình tĩnh.', 'Tập thể dục hay đi bộ để giải tỏa căng thẳng tích tụ.', 'Nếu đang phân vân một quyết định, hãy viết ra ưu nhược điểm để so sánh.'],
    },
  },
  crying: {
    ko: {
      why: '우는 꿈은 현실에서 참고 있던 감정이 꿈에서 풀려나는 경우가 많습니다. 그래서 한국 전통 해몽에서도 크게 우는 꿈을 오히려 근심이 풀리는 길몽으로 봅니다. 꿈에서 실컷 울고 나면 개운하게 깨는 사람도 많습니다.',
      tips: ['요즘 참고 있는 감정이 있다면 믿을 만한 사람에게 이야기해 보세요.', '일기를 쓰거나 음악을 들으며 감정을 풀어 주는 시간을 가져 보세요.', '슬픈 기분이 2주 이상 계속된다면 전문가와 상담해 보세요.'],
    },
    vi: {
      why: 'Mơ khóc thường là khi cảm xúc bị kìm nén ngoài đời được giải tỏa trong giấc mơ. Vì thế giải mộng truyền thống Hàn xem khóc to là điềm tốt, mọi lo âu sắp được tháo gỡ. Nhiều người khóc thỏa trong mơ rồi tỉnh dậy thấy nhẹ nhõm.',
      tips: ['Nếu đang kìm nén cảm xúc, hãy chia sẻ với người bạn tin tưởng.', 'Dành thời gian viết nhật ký hay nghe nhạc để giải tỏa cảm xúc.', 'Nếu buồn bã kéo dài hơn 2 tuần, hãy tìm đến chuyên gia tư vấn.'],
    },
  },
  sick: {
    ko: {
      why: '아픈 꿈은 실제 몸의 피로나 작은 불편이 꿈에 반영된 경우가 많고, 돌봄을 받고 싶은 마음이나 쉬고 싶은 마음을 나타내기도 합니다. 한국 전통 해몽에서는 아픈 꿈을 오히려 건강해지는 꿈으로 풀이하기도 합니다.',
      tips: ['수면 시간과 식사를 점검하고, 오늘은 일찍 쉬어 보세요.', '미뤄 둔 건강검진이 있다면 예약해 두세요.', '꿈에 나온 증상이 실제로도 있다면 꿈과 관계없이 병원에서 확인하세요.'],
    },
    vi: {
      why: 'Mơ bị ốm thường phản ánh sự mệt mỏi hay khó chịu nhỏ của cơ thể thật, hoặc mong muốn được chăm sóc, được nghỉ ngơi. Giải mộng truyền thống Hàn đôi khi còn hiểu ngược: mơ ốm là sắp khỏe ra.',
      tips: ['Xem lại giờ ngủ, bữa ăn và hôm nay hãy nghỉ sớm.', 'Nếu đang trì hoãn khám sức khỏe định kỳ, hãy đặt lịch.', 'Nếu triệu chứng trong mơ có thật, hãy đi khám dù có mơ hay không.'],
    },
  },
};
