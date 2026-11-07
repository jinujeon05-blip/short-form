import type { Lang } from '../i18n';
import type { DepthText } from './depthTypes';

/** key = 띠 slug (src/engine/yearly.ts의 ANIMAL_SLUGS) */
export const YEARLY_DEPTH: Record<string, Record<Lang, DepthText>> = {
  rat: {
    ko: {
      title: `쥐띠의 타고난 흐름과 한 해 설계법`,
      sections: [
        { h: `쥐띠의 타고난 성향`, p: `쥐띠는 회의 자료에서 남들이 놓친 숫자 하나를 먼저 찾아내는 사람으로 그려집니다. 정보를 모으고 견주는 데 밝아서 기회가 보이면 발이 빠릅니다. 반면 이것저것 재다가 결정이 늦어지거나, 일을 혼자 쥐고 있다가 마감 앞에서 몰리는 버릇은 조심할 부분입니다. 자료를 어디까지 보고 정할지 기준을 미리 적어 두면 이 버릇이 한결 줄어듭니다.` },
        { h: `삼재와 쥐띠의 12년 주기`, p: `쥐띠는 신자진(원숭이·쥐·용)생 그룹이라서, 전통에서는 인묘진년, 곧 호랑이·토끼·용의 해에 들삼재·눌삼재·날삼재가 3년간 이어진다고 봅니다. 삼재는 겁낼 일이라기보다 확장을 잠시 늦추고 준비하는 기간으로 읽는 편이 쓸모가 있습니다. 쥐띠 본인의 해는 12년마다 돌아오고, 전통에서는 말띠 해를 정면으로 맞부딪치는 충(沖), 소띠 해를 짝이 맞는 육합(六合)으로 봅니다.` },
        { h: `쥐띠에게 어울리는 한 해 설계`, p: `정보에 강한 쥐띠에게는 돈과 생활 리듬을 숫자로 붙잡는 방식이 맞습니다. 월말에 30분만 내서 많이 쓴 지출 세 가지를 적고, 다음 달에 줄일 한 가지를 고르세요. 모으기는 잘하는데 쓰임을 정하지 못해 흐지부지되는 일이 줄어듭니다. 건강 쪽에서는 늦은 시간까지 화면을 보는 습관이 쌓이기 쉬우니, 잠들기 한 시간 전에 화면을 멀리하는 작은 규칙부터 시작해 보세요.` },
        { h: `1~2월에 태어났다면 쥐띠인가요, 소띠인가요?`, p: `띠 운세는 보통 음력 설을 기준으로 나눕니다. 그래서 양력 1~2월생이 그해 설날보다 앞에 태어났다면 전해의 띠입니다. 반면 사주는 설이 아니라 입춘(2월 4일 무렵)을 새해의 시작으로 삼아 두 방식의 경계가 다릅니다. 나라마다 설 날짜가 하루 이틀 다를 수 있으니, 경계에 걸린 분은 출생 연도 입력창에서 띠를 먼저 확인해 보세요.` },
      ],
    },
    vi: {
      title: `Vận trình tự nhiên và cách lập kế hoạch năm cho tuổi Tý`,
      sections: [
        { h: `Tính cách bẩm sinh của tuổi Tý`, p: `Người tuổi Tý (Chuột) là kiểu người trong buổi họp luôn tìm ra con số mà người khác bỏ sót. Họ giỏi gom thông tin và so sánh nên thấy cơ hội là ra tay rất nhanh. Ngược lại, họ hay cân nhắc quá lâu khiến quyết định chậm, hoặc ôm việc một mình rồi dồn dập sát hạn chót. Nếu ghi trước mình sẽ tìm hiểu đến mức nào thì sẽ dừng, thói quen này sẽ bớt đi nhiều.` },
        { h: `Tam Tai và chu kỳ 12 năm của tuổi Tý`, p: `Tuổi Tý thuộc nhóm Thân – Tý – Thìn. Theo truyền thống, nhóm này gặp Tam Tai ở các năm Dần, Mão, Thìn (Hổ, Mèo, Rồng), kéo dài ba năm: năm đầu, năm giữa và năm cuối. Đừng xem đây là tai họa, mà hãy coi là quãng thời gian nên chậm mở rộng và chuẩn bị kỹ. Năm tuổi của bạn quay lại sau mỗi 12 năm; truyền thống coi năm Ngọ là xung, năm Sửu là Lục hợp.` },
        { h: `Cách lập kế hoạch năm hợp với tuổi Tý`, p: `Người nhạy với thông tin như tuổi Tý hợp với cách giữ tiền bạc và nhịp sống bằng con số. Cuối tháng hãy dành 30 phút ghi ba khoản chi nhiều nhất, rồi chọn một khoản để giảm trong tháng sau. Cách này giúp tránh tình trạng tích góp giỏi nhưng không định hướng nên dùng đâu. Về sức khỏe, thói quen xem màn hình khuya dễ tích tụ, hãy bắt đầu bằng quy tắc nhỏ là rời màn hình một tiếng trước khi ngủ.` },
        { h: `Sinh tháng 1–2 thì là tuổi Tý hay tuổi Sửu?`, p: `Tử vi con giáp thường chia năm theo Tết Nguyên đán. Vì vậy người sinh tháng 1–2 dương lịch mà trước Tết thì vẫn tính theo con giáp của năm trước. Còn Tứ trụ lại lấy Lập xuân (khoảng 4/2) làm mốc đầu năm, nên ranh giới hai cách tính khác nhau. Ngày Tết của mỗi nước có thể lệch một hai ngày, nếu bạn sinh sát mốc này, hãy nhập năm sinh để kiểm tra con giáp trước.` },
      ],
    },
  },

  ox: {
    ko: {
      title: `소띠의 타고난 흐름과 한 해 설계법`,
      sections: [
        { h: `소띠의 타고난 성향`, p: `소띠는 약속 시간보다 십 분 일찍 도착해서 말없이 자리를 정리해 두는 사람으로 그려집니다. 한 번 맡은 일은 속도가 느려도 끝까지 가져가는 뚝심이 있습니다. 다만 하던 방식을 바꾸자는 제안에 일단 팔짱부터 끼거나, 서운한 일을 말하지 않고 쌓아 두다가 한꺼번에 터뜨리는 버릇은 조심할 점입니다. 불편한 점은 그날 한 문장으로만 말해 두는 연습이 도움이 됩니다.` },
        { h: `삼재와 소띠의 12년 주기`, p: `소띠는 사유축(뱀·닭·소)생 그룹입니다. 전통에서는 해자축년, 곧 돼지·쥐·소의 해에 삼재가 3년간 이어진다고 보고, 소띠 본인의 해가 그 마지막 해인 날삼재 자리에 놓입니다. 삼재가 끝나는 해는 정리하고 마무리하는 시기로 읽습니다. 또 전통에서는 쥐띠 해를 짝이 되는 육합으로, 양띠 해를 서로 부딪히는 충으로 보며 12년마다 본인의 해가 돌아옵니다.` },
        { h: `소띠에게 어울리는 한 해 설계`, p: `꾸준함이 무기인 소띠에게는 일과 돈을 틀로 묶어 두는 방법이 잘 맞습니다. 급여일 다음 날 자동이체로 저축 액수를 먼저 빼 두면 의지에 기대지 않아도 쌓입니다. 일에서는 분기에 한 번, 익숙한 방식 중 하나만 골라 다른 방법으로 해 보는 실험을 넣어 보세요. 크게 바꾸는 것이 아니라 한 가지만 달리해도 굳은 습관이 풀립니다.` },
        { h: `내 띠의 해(본명년)는 몇 살에 오나요?`, p: `띠의 해는 12년마다 돌아옵니다. 한국식 세는 나이로는 1세, 13세, 25세, 37세, 49세, 61세, 73세에 오고, 만 나이로는 0세, 12세, 24세, 36세, 48세, 60세, 72세가 됩니다. 베트남에서도 태어난 해를 한 살로 세는 방식(tuổi mụ)으로 같은 나이에 해당합니다. 본명년을 두고 전통에서는 기운이 겹치는 해로 보지만, 차분히 건강과 생활 리듬을 돌아보는 계기 정도로 삼으면 충분합니다.` },
      ],
    },
    vi: {
      title: `Vận trình tự nhiên và cách lập kế hoạch năm cho tuổi Sửu`,
      sections: [
        { h: `Tính cách bẩm sinh của tuổi Sửu`, p: `Người tuổi Sửu (Trâu) thường đến sớm mười phút và lặng lẽ sắp xếp chỗ ngồi cho mọi người. Đã nhận việc nào thì dù chậm vẫn bền bỉ làm đến cùng. Điểm cần để ý là khi ai đề nghị đổi cách làm, họ hay khoanh tay từ chối trước, hoặc giữ nỗi buồn trong lòng rồi bùng nổ một lần. Hãy tập nói điều không thoải mái ngay trong ngày, chỉ cần một câu ngắn.` },
        { h: `Tam Tai và chu kỳ 12 năm của tuổi Sửu`, p: `Tuổi Sửu thuộc nhóm Tỵ – Dậu – Sửu. Theo truyền thống, nhóm này gặp Tam Tai ở các năm Hợi, Tý, Sửu (Lợn, Chuột, Trâu) trong ba năm liên tiếp, và năm tuổi Sửu rơi đúng năm cuối của hạn. Năm cuối được hiểu là lúc khép lại, thu xếp cho xong. Truyền thống cũng coi năm Tý là Lục hợp, năm Mùi (Dê) là xung, và năm tuổi của bạn quay lại sau mỗi 12 năm.` },
        { h: `Cách lập kế hoạch năm hợp với tuổi Sửu`, p: `Sự đều đặn là sức mạnh của tuổi Sửu, nên công việc và tiền bạc hợp với cách làm theo khuôn. Hãy cài chuyển khoản tự động ngay sau ngày nhận lương để phần tiết kiệm được trích trước, không phụ thuộc ý chí. Trong công việc, mỗi quý chỉ cần chọn một cách làm quen thuộc và thử làm khác đi. Không phải đổi lớn, chỉ một điểm khác cũng đủ làm lỏng thói quen cứng nhắc.` },
        { h: `Năm tuổi của tôi rơi vào những độ tuổi nào?`, p: `Năm tuổi quay lại sau mỗi 12 năm. Tính theo tuổi mụ (sinh ra đã là một tuổi) sẽ là 1, 13, 25, 37, 49, 61, 73 tuổi; theo tuổi tây là 0, 12, 24, 36, 48, 60, 72. Truyền thống coi đây là năm khí vận chồng lên nhau. Bạn không cần lo lắng, chỉ nên xem như dịp nhìn lại sức khỏe và nhịp sống của mình.` },
      ],
    },
  },

  tiger: {
    ko: {
      title: `호랑이띠의 타고난 흐름과 한 해 설계법`,
      sections: [
        { h: `호랑이띠의 타고난 성향`, p: `호랑이띠는 어색한 회의에서 먼저 손을 들고 의견을 꺼내 분위기를 여는 사람으로 그려집니다. 맡은 사람이 있으면 끝까지 책임지려는 의리와 추진력이 강점입니다. 하지만 결정한 뒤에는 설명을 생략하기 쉽고, 다른 의견을 내 자리에 대한 도전으로 받아들이는 버릇이 있습니다. 결정을 알릴 때 이유를 한 줄만 덧붙이면 따라오는 사람이 훨씬 늘어납니다.` },
        { h: `삼재와 호랑이띠의 12년 주기`, p: `호랑이띠는 인오술(호랑이·말·개)생 그룹입니다. 전통에서는 신유술년, 곧 원숭이·닭·개의 해에 삼재가 3년간 이어진다고 봅니다. 호랑이띠는 삼재가 시작되는 해가 원숭이 해와 겹치는데, 전통에서는 이 해를 호랑이와 정면으로 맞서는 충(沖)의 해로도 봅니다. 두 가지가 겹치는 해이니 안전과 일정에 여유를 두는 준비 기간으로 읽으면 됩니다. 돼지 해는 짝이 되는 육합으로 봅니다.` },
        { h: `호랑이띠에게 어울리는 한 해 설계`, p: `에너지가 앞서는 호랑이띠에게는 일과 건강의 균형이 과제입니다. 새 일을 맡기 전에 하지 않을 일 한 가지를 먼저 정해 두면 과하게 벌이는 일이 줄어듭니다. 운동은 한꺼번에 몰아서 하기보다 주 세 번, 20분씩 정해진 요일에 하는 쪽이 오래갑니다. 몸이 보내는 피로 신호를 의욕으로 덮지 않도록 주말 하루는 일정을 비워 두세요.` },
        { h: `호랑이띠는 기가 세다는 말, 어떻게 봐야 하나요?`, p: `호랑이는 우두머리를 상징하는 동물이라 생긴 오래된 속설입니다. 명리에서 띠는 태어난 해의 지지 하나를 가리킬 뿐이어서, 성격이나 인연을 그 한 글자로 정하지 않습니다. 같은 호랑이띠라도 태어난 달과 날, 시간의 글자가 다르면 풀이도 크게 달라집니다. 기운을 앞세운다는 말은 강한 추진력을 뜻하는 비유로 받아들이고, 사람을 가늠하는 잣대로 쓰지 않는 것이 좋습니다.` },
      ],
    },
    vi: {
      title: `Vận trình tự nhiên và cách lập kế hoạch năm cho tuổi Dần`,
      sections: [
        { h: `Tính cách bẩm sinh của tuổi Dần`, p: `Người tuổi Dần (Hổ) thường là người giơ tay phát biểu trước trong buổi họp ngượng ngùng để mở không khí. Đã nhận ai thì họ có nghĩa khí và đẩy việc đến cùng, đó là điểm mạnh. Nhưng sau khi quyết định, họ dễ bỏ qua phần giải thích, và hay coi ý kiến khác là thách thức vị trí của mình. Khi thông báo quyết định, chỉ cần thêm một dòng lý do là người đi theo sẽ nhiều hơn hẳn.` },
        { h: `Tam Tai và chu kỳ 12 năm của tuổi Dần`, p: `Tuổi Dần thuộc nhóm Dần – Ngọ – Tuất. Theo truyền thống, nhóm này gặp Tam Tai ở các năm Thân, Dậu, Tuất (Khỉ, Gà, Chó), kéo dài ba năm. Với tuổi Dần, năm đầu của hạn trùng năm Thân, mà truyền thống cũng coi năm Thân là xung với Dần. Vì hai điều trùng nhau nên đây là quãng nên chừa thêm khoảng đệm về an toàn và lịch trình, chứ không phải điều phải sợ. Năm Hợi (Lợn) được xem là Lục hợp.` },
        { h: `Cách lập kế hoạch năm hợp với tuổi Dần`, p: `Năng lượng của tuổi Dần thường chạy trước, nên bài toán là giữ cân bằng giữa công việc và sức khỏe. Trước khi nhận việc mới, hãy chọn sẵn một việc sẽ không làm, để tránh ôm đồm quá mức. Tập luyện nên chia đều, ví dụ mỗi tuần ba buổi, mỗi buổi 20 phút vào ngày cố định, thay vì dồn một lần. Hãy để trống một ngày cuối tuần để tín hiệu mệt mỏi của cơ thể không bị che lấp bởi hăng hái.` },
        { h: `Tuổi Dần có “vía mạnh” thật không?`, p: `Đây là quan niệm dân gian cũ, vì Hổ là biểu tượng của vua muôn thú. Trong mệnh lý, con giáp chỉ là một Địa chi của năm sinh, không thể quyết định tính cách hay nhân duyên chỉ bằng một chữ. Cùng tuổi Dần nhưng khác tháng, ngày, giờ sinh thì cách luận cũng khác nhiều. Hãy hiểu “vía mạnh” như lời ví von về sức bật, đừng dùng nó để đánh giá một con người.` },
      ],
    },
  },

  rabbit: {
    ko: {
      title: `토끼띠의 타고난 흐름과 한 해 설계법`,
      sections: [
        { h: `토끼띠의 타고난 성향`, p: `토끼띠는 다툼이 나려는 자리에서 말투를 한 단계 낮춰 분위기를 가라앉히는 사람으로 그려집니다. 상대의 기분을 읽는 감각이 좋아 모임에서 조용한 사람을 챙기는 일이 자연스럽습니다. 그 대신 부탁을 거절하지 못해 일정이 가득 차고, 불편한 마음을 돌려 말하다가 뜻이 전달되지 않는 일이 잦습니다. 속마음은 부드럽게 하되 핵심만은 분명한 문장으로 말하는 연습이 필요합니다.` },
        { h: `삼재와 토끼띠의 12년 주기`, p: `토끼띠는 해묘미(돼지·토끼·양)생 그룹입니다. 전통에서는 사오미년, 곧 뱀·말·양의 해에 들삼재·눌삼재·날삼재가 3년간 이어진다고 봅니다. 삼재는 불안해하는 시기가 아니라, 무리한 계약이나 이동을 줄이고 마음의 짐을 정리하는 시기로 읽습니다. 12년 주기에서는 닭띠 해를 서로 부딪히는 충으로, 개띠 해를 짝이 맞는 육합으로 보는 것이 전통의 설명입니다.` },
        { h: `토끼띠에게 어울리는 한 해 설계`, p: `배려가 넘치는 토끼띠에게는 관계와 건강, 그중에서도 마음의 여유가 중요합니다. 부탁을 받으면 곧바로 답하지 말고 ‘내일 알려 드릴게요’라는 한 문장을 미리 준비해 두세요. 시간을 번 만큼 수락할 일과 거절할 일을 차분히 가를 수 있습니다. 또 일주일에 한 번은 아무에게도 맞추지 않는 혼자만의 시간을 달력에 먼저 적어 두면 지친 마음이 쌓이는 속도가 느려집니다.` },
        { h: `베트남에서는 토끼 대신 고양이띠라던데요?`, p: `맞습니다. 한국과 중국은 묘(卯)를 토끼로 읽지만 베트남에서는 Mão를 고양이(Mèo)로 부릅니다. 왜 그렇게 되었는지는 여러 설이 있을 뿐 정설은 없습니다. 중요한 점은 동물 이름과 상관없이 같은 지지 묘(卯)이니 합·충·삼합 같은 관계는 똑같이 계산된다는 것입니다. 이 사이트도 한국어 화면에서는 토끼, 베트남어 화면에서는 고양이로 표기하지만 풀이 기준은 같습니다.` },
      ],
    },
    vi: {
      title: `Vận trình tự nhiên và cách lập kế hoạch năm cho tuổi Mão`,
      sections: [
        { h: `Tính cách bẩm sinh của tuổi Mão`, p: `Người tuổi Mão (Mèo) giỏi hạ giọng một nấc để xoa dịu bầu không khí ngay khi sắp có tranh cãi. Họ đọc được tâm trạng người khác nên rất tự nhiên khi quan tâm người ít nói trong nhóm. Đổi lại, họ khó từ chối nên lịch kín mít, và hay nói vòng khi không thoải mái khiến ý không đến được người nghe. Hãy giữ giọng mềm nhưng nói rõ phần cốt lõi bằng một câu dứt khoát.` },
        { h: `Tam Tai và chu kỳ 12 năm của tuổi Mão`, p: `Tuổi Mão thuộc nhóm Hợi – Mão – Mùi. Theo truyền thống, nhóm này gặp Tam Tai ở các năm Tỵ, Ngọ, Mùi (Rắn, Ngựa, Dê) trong ba năm liên tiếp: năm đầu, năm giữa, năm cuối. Đây không phải quãng thời gian phải lo sợ, mà là lúc giảm bớt hợp đồng hay di chuyển quá sức và dọn bớt gánh nặng trong lòng. Theo chu kỳ 12 năm, truyền thống coi năm Dậu (Gà) là xung, năm Tuất (Chó) là Lục hợp.` },
        { h: `Cách lập kế hoạch năm hợp với tuổi Mão`, p: `Tuổi Mão chu đáo nên điều quan trọng là các mối quan hệ và khoảng trống cho tâm trí. Hãy chuẩn bị sẵn một câu như “Mai mình trả lời bạn nhé” mỗi khi có người nhờ vả, đừng đáp ngay. Có thêm thời gian, bạn sẽ phân loại việc nhận và việc từ chối bình tĩnh hơn. Mỗi tuần hãy ghi trước vào lịch một khoảng thời gian ở một mình, không phải chiều ai, để sự mệt mỏi không dồn lại quá nhanh.` },
        { h: `Vì sao Việt Nam là Mèo còn Hàn Quốc là Thỏ?`, p: `Đúng vậy. Hàn Quốc và Trung Quốc đọc Mão là Thỏ, còn Việt Nam gọi Mão là Mèo. Lý do có nhiều giả thuyết nhưng chưa có kết luận chắc chắn. Điều cần nhớ là dù tên con vật khác nhau, chi vẫn là Mão, nên các quan hệ hợp, xung, tam hợp tính hoàn toàn như nhau. Trang này hiển thị Thỏ ở bản tiếng Hàn và Mèo ở bản tiếng Việt, nhưng cách luận giải là một.` },
      ],
    },
  },

  dragon: {
    ko: {
      title: `용띠의 타고난 흐름과 한 해 설계법`,
      sections: [
        { h: `용띠의 타고난 성향`, p: `용띠는 발표 자리에서 큰 그림을 그려 보여 주고, 듣는 사람이 고개를 끄덕이게 만드는 사람으로 그려집니다. 스케일이 큰 일에서 힘이 나고 주변을 끌어당기는 존재감이 있습니다. 그 반면 세부 확인과 마무리에는 흥미가 식기 쉽고, 틀렸을 때 인정하는 한마디가 늦어지는 버릇은 조심할 점입니다. 큰 계획 곁에 꼼꼼한 동료를 두거나 확인표를 따로 만들면 약점이 보완됩니다.` },
        { h: `삼재와 용띠의 12년 주기`, p: `용띠는 신자진(원숭이·쥐·용)생 그룹입니다. 전통에서는 인묘진년, 곧 호랑이·토끼·용의 해에 삼재가 3년간 이어진다고 보며, 용띠 본인의 해가 마지막 해인 날삼재 자리에 놓입니다. 마지막 해는 앞선 두 해에 벌여 둔 일을 정리하는 시기로 읽습니다. 또 전통에서는 개띠 해를 서로 마주 부딪히는 충(沖), 닭띠 해를 짝이 맞는 육합으로 보며, 본인의 해는 12년마다 돌아옵니다.` },
        { h: `용띠에게 어울리는 한 해 설계`, p: `목표가 큰 용띠에게는 일과 돈을 쪼개서 보는 방식이 필요합니다. 한 해 목표를 분기별로 세 개씩 나누고, 분기가 끝날 때 한 장짜리로 정리해 보세요. 돈에서는 크게 쓰고 싶은 마음이 들 때 결제 전에 24시간을 두는 규칙이 효과적입니다. 투자나 큰 구매를 막으려는 것이 아니라 설렘과 판단을 분리하자는 뜻입니다. 정리하는 힘이 붙으면 큰 구상이 실제 결과로 이어집니다.` },
        { h: `용띠와 개띠는 충이라 피해야 하나요?`, p: `전통 명리에서 진(辰)과 술(戌)은 서로 부딪히는 진술충 관계로 설명합니다. 그렇다고 두 띠가 만나면 안 된다는 뜻은 아니며, 충에는 변화와 자극이라는 면도 함께 담겨 있습니다. 실제 관계는 두 사람의 사주 전체와 성격, 노력에 달려 있습니다. 띠 궁합은 대화를 시작하는 참고 정도로만 삼고, 친구나 직장 동료로 지내는 데에는 마음 쓰지 않아도 됩니다.` },
      ],
    },
    vi: {
      title: `Vận trình tự nhiên và cách lập kế hoạch năm cho tuổi Thìn`,
      sections: [
        { h: `Tính cách bẩm sinh của tuổi Thìn`, p: `Người tuổi Thìn (Rồng) giỏi phác ra bức tranh lớn trong buổi thuyết trình để người nghe gật đầu theo. Họ có sức mạnh khi làm việc quy mô lớn và sức hút khiến mọi người xung quanh tìm đến. Ngược lại, họ dễ nguội hứng với chi tiết, khâu kiểm tra cuối, và chậm nói lời nhận sai khi nhầm. Hãy nhờ một đồng nghiệp tỉ mỉ đứng cạnh kế hoạch lớn, hoặc tự lập bảng kiểm để bù phần yếu này.` },
        { h: `Tam Tai và chu kỳ 12 năm của tuổi Thìn`, p: `Tuổi Thìn thuộc nhóm Thân – Tý – Thìn. Theo truyền thống, nhóm này gặp Tam Tai ở các năm Dần, Mão, Thìn (Hổ, Mèo, Rồng) trong ba năm liên tiếp, và năm tuổi Thìn rơi đúng năm cuối. Năm cuối được hiểu là lúc thu xếp những việc đã mở ra ở hai năm trước. Truyền thống coi năm Tuất (Chó) là xung, năm Dậu (Gà) là Lục hợp, và năm tuổi của bạn trở lại sau mỗi 12 năm.` },
        { h: `Cách lập kế hoạch năm hợp với tuổi Thìn`, p: `Mục tiêu lớn của tuổi Thìn cần được chia nhỏ ra để theo dõi cả chuyện công việc lẫn tiền bạc. Hãy chia mục tiêu năm thành ba việc cho mỗi quý, hết quý thì tóm tắt trong một trang. Về tiền, khi muốn chi lớn, hãy đặt quy tắc chờ 24 giờ trước khi thanh toán. Không phải để cấm đầu tư hay mua sắm, mà để tách sự phấn khích khỏi phán đoán. Có sức thu xếp, ý tưởng lớn mới thành kết quả thật.` },
        { h: `Thìn và Tuất xung nhau, có nên tránh không?`, p: `Trong mệnh lý truyền thống, Thìn và Tuất được giải thích là Tương xung. Điều đó không có nghĩa hai tuổi này không được gặp nhau; xung còn mang ý nghĩa của thay đổi và kích thích. Mối quan hệ thật còn phụ thuộc cả lá số, tính cách và sự nỗ lực của hai người. Hãy coi hợp tuổi chỉ là gợi ý để bắt chuyện, còn làm bạn hay đồng nghiệp thì không cần bận tâm.` },
      ],
    },
  },

  snake: {
    ko: {
      title: `뱀띠의 타고난 흐름과 한 해 설계법`,
      sections: [
        { h: `뱀띠의 타고난 성향`, p: `뱀띠는 회의 내내 말없이 듣다가 끝에 핵심을 짚는 한마디로 판을 정리하는 사람으로 그려집니다. 겉으로 드러내지 않고 관찰한 뒤 결론을 내리기 때문에 판단이 깊습니다. 하지만 속마음을 잘 말하지 않아 오해를 사거나, 한 번 틀어진 관계를 오래 기억하는 버릇은 조심할 점입니다. 사소한 일이라도 서운한 기분이 들면 한 줄로 먼저 꺼내 보는 연습이 도움이 됩니다.` },
        { h: `삼재와 뱀띠의 12년 주기`, p: `뱀띠는 사유축(뱀·닭·소)생 그룹입니다. 전통에서는 해자축년, 곧 돼지·쥐·소의 해에 들삼재·눌삼재·날삼재가 3년간 이어진다고 봅니다. 뱀띠는 삼재의 첫해인 돼지 해가 서로 마주 부딪히는 충(沖)의 해와 겹칩니다. 그래서 전통에서는 이 해를 변화가 큰 때로 보고 미리 준비하라는 참고로 삼습니다. 원숭이 해는 짝이 되는 육합이지만 형(刑)의 뜻도 함께 가진다고 설명합니다.` },
        { h: `뱀띠에게 어울리는 한 해 설계`, p: `신중한 뱀띠에게는 일과 관계의 균형이 숙제입니다. 일에서는 한 달에 한 번 반나절을 잡아 모은 자료를 정리하는 시간을 먼저 확보해 두세요. 혼자 깊이 파고드는 힘이 결과로 보이게 됩니다. 관계에서는 주 한 번, 용건 없이 안부를 먼저 보내 보세요. 말을 아끼는 성격이 차갑게 읽히지 않도록 해 주는 작지만 확실한 방법입니다.` },
        { h: `뱀띠와 호랑이띠는 형(刑)이라 안 맞는다던데요?`, p: `전통 명리에서 인(寅)·사(巳)·신(申)은 서로 형(刑)과 해(害)가 얽힌 관계로 설명합니다. 형은 마찰이나 규칙, 절차와 관련된 기운으로 풀이되지만 해로운 결과를 뜻하는 것은 아닙니다. 마찰이 있는 만큼 서로 자극받아 성장하는 조합이라고 읽는 해석도 있습니다. 띠 하나로 사람 사이를 단정하지 말고, 대화 방식을 점검하는 참고로만 쓰세요.` },
      ],
    },
    vi: {
      title: `Vận trình tự nhiên và cách lập kế hoạch năm cho tuổi Tỵ`,
      sections: [
        { h: `Tính cách bẩm sinh của tuổi Tỵ`, p: `Người tuổi Tỵ (Rắn) lặng lẽ nghe suốt buổi họp rồi chốt lại bằng một câu trúng điểm. Họ quan sát kỹ trước khi kết luận nên nhận định thường sâu sắc. Nhưng vì ít nói điều trong lòng, họ dễ bị hiểu lầm, và có thói quen nhớ lâu một mối quan hệ từng rạn nứt. Dù là chuyện nhỏ, hãy tập nói ra một câu khi thấy buồn, thay vì để nó nằm yên.` },
        { h: `Tam Tai và chu kỳ 12 năm của tuổi Tỵ`, p: `Tuổi Tỵ thuộc nhóm Tỵ – Dậu – Sửu. Theo truyền thống, nhóm này gặp Tam Tai ở các năm Hợi, Tý, Sửu (Lợn, Chuột, Trâu) trong ba năm liên tiếp. Năm đầu của hạn là năm Hợi, trùng với năm xung của tuổi Tỵ, nên truyền thống coi đây là thời kỳ nhiều thay đổi và nên chuẩn bị sớm. Năm Thân (Khỉ) là Lục hợp nhưng cũng có ý nghĩa Tương hình trong cách giải thích cổ.` },
        { h: `Cách lập kế hoạch năm hợp với tuổi Tỵ`, p: `Tuổi Tỵ thận trọng nên bài toán là cân bằng giữa công việc và các mối quan hệ. Mỗi tháng hãy dành trước nửa buổi để sắp xếp lại tư liệu đã thu thập. Sức đào sâu một mình của bạn sẽ hiện thành kết quả nhìn thấy được. Còn trong quan hệ, mỗi tuần hãy chủ động nhắn hỏi thăm một lần, không cần lý do. Đó là cách nhỏ nhưng chắc để tính hay kiệm lời không bị đọc thành lạnh lùng.` },
        { h: `Tuổi Tỵ và tuổi Dần có thật sự xung khắc không?`, p: `Trong mệnh lý truyền thống, Dần – Tỵ – Thân được giải thích là có quan hệ Hình và Hại đan xen. Hình thường được hiểu là ma sát, quy tắc và thủ tục, nhưng không có nghĩa chắc chắn dẫn đến kết quả xấu. Cũng có cách hiểu rằng chính ma sát giúp hai bên thúc đẩy nhau trưởng thành. Đừng kết luận về mối quan hệ chỉ từ con giáp, hãy dùng nó để xem lại cách trò chuyện của mình.` },
      ],
    },
  },

  horse: {
    ko: {
      title: `말띠의 타고난 흐름과 한 해 설계법`,
      sections: [
        { h: `말띠의 타고난 성향`, p: `말띠는 생각이 끝나기도 전에 몸이 먼저 움직이는 사람으로 그려집니다. 분위기를 밝게 띄우고 처음 만난 사람과도 금방 말이 트이는 솔직함이 매력입니다. 다만 감정이 얼굴에 그대로 드러나고, 시작한 일이 많아 마무리가 뒤로 밀리며, 약속을 너무 많이 잡아 지키기 어려워지는 버릇은 조심할 점입니다. 일정표에 비는 칸을 일부러 남겨 두는 편이 좋습니다.` },
        { h: `삼재와 말띠의 12년 주기`, p: `말띠는 인오술(호랑이·말·개)생 그룹입니다. 전통에서는 신유술년, 곧 원숭이·닭·개의 해에 들삼재·눌삼재·날삼재가 3년간 이어진다고 봅니다. 삼재는 겁낼 일이 아니라 속도를 조금 늦추고 주변을 살피는 준비 기간으로 읽습니다. 12년 주기에서는 쥐띠 해를 서로 정면으로 부딪히는 충(沖), 양띠 해를 짝이 맞는 육합으로 봅니다. 말띠 본인의 해에는 불의 기운이 겹쳐 열기가 한껏 오른다고 설명합니다.` },
        { h: `말띠에게 어울리는 한 해 설계`, p: `움직임이 빠른 말띠에게는 돈과 건강의 속도 조절이 맞습니다. 돈은 장바구니에 담고 하루 묵힌 뒤 결제하는 규칙만 지켜도 충동 지출이 눈에 띄게 줄어듭니다. 건강은 격한 운동으로 시작하기보다 준비운동과 정리운동을 앞뒤로 꼭 넣고, 일주일에 쉬는 날을 하루 정해 두세요. 열정이 강한 만큼 쉬는 것도 일정에 넣어야 오래 달릴 수 있습니다.` },
        { h: `같은 말띠인데 왜 풀이가 다른가요?`, p: `띠는 12가지뿐이지만 간지는 천간 10글자와 지지 12글자를 짝지은 60가지입니다. 말띠도 갑오·병오·무오·경오·임오로 나뉘고, 같은 간지는 60년 만에 돌아옵니다. 예를 들어 1990년은 경오, 2002년은 임오, 2014년은 갑오, 2026년은 병오입니다. 여기에 태어난 달과 날, 시간이 더해져 사주가 되므로 풀이 폭이 더 커집니다. 띠 운세는 가볍게 보는 첫걸음으로 활용하세요.` },
      ],
    },
    vi: {
      title: `Vận trình tự nhiên và cách lập kế hoạch năm cho tuổi Ngọ`,
      sections: [
        { h: `Tính cách bẩm sinh của tuổi Ngọ`, p: `Người tuổi Ngọ (Ngựa) là kiểu người cơ thể đã hành động trước khi suy nghĩ kịp xong. Họ thẳng thắn, làm không khí vui lên và nói chuyện với người mới quen rất nhanh. Cần lưu ý là cảm xúc hiện hết trên mặt, nhiều việc bắt đầu nên khâu hoàn tất bị đẩy lùi, và hay hẹn quá nhiều nên khó giữ lời. Hãy cố ý chừa vài ô trống trong lịch trình của mình.` },
        { h: `Tam Tai và chu kỳ 12 năm của tuổi Ngọ`, p: `Tuổi Ngọ thuộc nhóm Dần – Ngọ – Tuất. Theo truyền thống, nhóm này gặp Tam Tai ở các năm Thân, Dậu, Tuất (Khỉ, Gà, Chó) trong ba năm liên tiếp: năm đầu, năm giữa, năm cuối. Tam Tai được hiểu là lúc nên chậm lại một chút, nhìn quanh rồi chuẩn bị. Theo chu kỳ 12 năm, năm Tý (Chuột) là xung, năm Mùi (Dê) là Lục hợp; năm tuổi của bạn được cho là hỏa khí chồng thêm nên nóng hơn thường lệ.` },
        { h: `Cách lập kế hoạch năm hợp với tuổi Ngọ`, p: `Tuổi Ngọ di chuyển nhanh nên hợp với việc điều chỉnh tốc độ của tiền bạc và sức khỏe. Chỉ cần bỏ món muốn mua vào giỏ hàng, để qua một ngày rồi mới thanh toán là chi tiêu bốc đồng giảm rõ rệt. Về sức khỏe, đừng bắt đầu bằng tập thật nặng; hãy luôn khởi động và thả lỏng, và chọn trước một ngày nghỉ mỗi tuần. Nhiệt huyết càng mạnh thì càng cần xếp việc nghỉ ngơi vào lịch mới chạy được đường dài.` },
        { h: `Cùng tuổi Ngọ mà sao cách luận lại khác nhau?`, p: `Con giáp chỉ có 12, nhưng Can Chi ghép 10 Thiên can với 12 Địa chi thành 60 tổ hợp. Tuổi Ngọ gồm Giáp Ngọ, Bính Ngọ, Mậu Ngọ, Canh Ngọ, Nhâm Ngọ, và cùng một Can Chi phải 60 năm mới trở lại. Chẳng hạn 1990 là Canh Ngọ, 2002 là Nhâm Ngọ, 2014 là Giáp Ngọ, 2026 là Bính Ngọ. Cộng thêm tháng, ngày, giờ sinh sẽ thành Tứ trụ nên cách luận càng phong phú. Tử vi con giáp chỉ là bước đầu xem nhanh.` },
      ],
    },
  },

  goat: {
    ko: {
      title: `양띠의 타고난 흐름과 한 해 설계법`,
      sections: [
        { h: `양띠의 타고난 성향`, p: `양띠는 동료의 컵이 비어 있는 것을 알아채고 말없이 채워 주는 사람으로 그려집니다. 앞에 나서기보다 곁에서 조용히 챙기는 쪽이라 믿음이 쌓이는 속도는 느려도 오래갑니다. 반면 자기 몫을 주장하지 못하고 불만을 삼키거나, 남의 눈치를 보다가 결정을 미루는 버릇은 조심할 점입니다. 내가 원하는 것을 먼저 한 줄로 써 보고 말하면 훨씬 수월합니다.` },
        { h: `삼재와 양띠의 12년 주기`, p: `양띠는 해묘미(돼지·토끼·양)생 그룹입니다. 전통에서는 사오미년, 곧 뱀·말·양의 해에 삼재가 3년간 이어진다고 보고, 양띠 본인의 해는 늘 마지막 해인 날삼재 자리에 놓입니다. 마지막 해는 앞서 벌인 일을 정리하는 시기로 읽습니다. 12년 주기에서는 소띠 해를 서로 부딪히는 충(沖), 말띠 해를 짝이 맞는 육합으로 보며, 정미년은 양띠 본인의 해에 해당합니다.` },
        { h: `양띠에게 어울리는 한 해 설계`, p: `정이 많은 양띠에게는 관계와 돈을 함께 다듬는 방법이 어울립니다. 부탁받았을 때 쓸 거절 문장을 하나 미리 만들어 두세요. 마음이 약해지는 순간에 그대로 꺼내 쓸 수 있습니다. 돈은 빌려주는 금액의 상한선을 미리 정해 두는 것이 좋습니다. 상한을 넘는 요청에는 다음 날 답하는 규칙을 더하면 관계도 지키고 부담도 줄어듭니다.` },
        { h: `양띠는 팔자가 사납다는 말이 사실인가요?`, p: `예전부터 전해 오는 속설이지만 명리학에서 근거를 찾기는 어렵습니다. 미(未)는 여름의 끝에서 만물을 익히는 흙의 기운으로 설명되고, 오히려 온화하고 인정 많은 상징으로 쓰입니다. 같은 양띠라도 태어난 달과 날, 시간에 따라 사주는 크게 달라집니다. 띠 하나로 인생을 판단하는 말은 흘려듣고, 나의 장점이 어디에 쓰이는지를 살피는 쪽이 이롭습니다.` },
      ],
    },
    vi: {
      title: `Vận trình tự nhiên và cách lập kế hoạch năm cho tuổi Mùi`,
      sections: [
        { h: `Tính cách bẩm sinh của tuổi Mùi`, p: `Người tuổi Mùi (Dê) để ý thấy ly của đồng nghiệp đã cạn và lặng lẽ rót đầy. Họ không đứng ra phía trước mà chăm sóc từ bên cạnh nên niềm tin đến chậm nhưng bền. Ngược lại, họ khó đòi phần của mình, hay nuốt bất mãn, và vì mải để ý ánh nhìn người khác nên hay trì hoãn quyết định. Hãy viết ra điều mình muốn trong một dòng trước khi nói, sẽ dễ hơn nhiều.` },
        { h: `Tam Tai và chu kỳ 12 năm của tuổi Mùi`, p: `Tuổi Mùi thuộc nhóm Hợi – Mão – Mùi. Theo truyền thống, nhóm này gặp Tam Tai ở các năm Tỵ, Ngọ, Mùi (Rắn, Ngựa, Dê) trong ba năm liên tiếp, và năm tuổi Mùi luôn là năm cuối của hạn. Năm cuối được hiểu là lúc thu xếp những việc đã mở ra trước đó. Theo chu kỳ 12 năm, truyền thống coi năm Sửu (Trâu) là xung, năm Ngọ (Ngựa) là Lục hợp; năm Đinh Mùi cũng là năm tuổi của người tuổi Mùi.` },
        { h: `Cách lập kế hoạch năm hợp với tuổi Mùi`, p: `Tuổi Mùi giàu tình cảm nên hợp với cách chỉnh cả quan hệ lẫn tiền bạc cùng lúc. Hãy chuẩn bị sẵn một câu từ chối để dùng khi bị nhờ vả. Đến lúc mềm lòng, bạn có thể lấy ra dùng ngay. Về tiền, nên đặt mức tối đa cho số tiền cho vay hay giúp đỡ. Với yêu cầu vượt mức đó, quy tắc trả lời vào ngày hôm sau vừa giữ được mối quan hệ, vừa giảm áp lực cho bạn.` },
        { h: `Người tuổi Mùi có số vất vả như lời đồn không?`, p: `Đó là lời đồn lưu truyền từ lâu, nhưng khó tìm được căn cứ trong mệnh lý. Mùi được giải thích là khí của đất cuối hạ, làm chín vạn vật, và thường là biểu tượng của sự ôn hòa, giàu tình cảm. Cùng tuổi Mùi nhưng khác tháng, ngày, giờ sinh thì lá số cũng khác rất nhiều. Hãy nghe cho qua những lời đoán cả đời bằng một con giáp, và xem điểm mạnh của mình đang dùng ở đâu.` },
      ],
    },
  },

  monkey: {
    ko: {
      title: `원숭이띠의 타고난 흐름과 한 해 설계법`,
      sections: [
        { h: `원숭이띠의 타고난 성향`, p: `원숭이띠는 고장 난 물건을 있는 재료로 뚝딱 고쳐 놓는 임기응변의 사람으로 그려집니다. 새 도구나 낯선 규칙도 빨리 익히고, 막히면 다른 길을 찾아내는 재치가 강점입니다. 다만 흥미가 식으면 하던 일을 방치하거나, 약속을 말솜씨로 넘기다가 가볍게 보이는 버릇은 조심할 점입니다. 시작할 때 끝낼 날짜를 한 번만 크게 적어 두면 신뢰가 쌓입니다.` },
        { h: `삼재와 원숭이띠의 12년 주기`, p: `원숭이띠는 신자진(원숭이·쥐·용)생 그룹입니다. 전통에서는 인묘진년, 곧 호랑이·토끼·용의 해에 들삼재·눌삼재·날삼재가 3년간 이어진다고 봅니다. 삼재의 첫해인 호랑이 해는 원숭이와 서로 부딪히는 충(沖)의 해와도 겹쳐서 전통에서는 변동이 큰 때로 설명합니다. 그런 만큼 움직이기 전에 한 번 더 살피는 준비 기간으로 삼으면 됩니다. 뱀 해는 짝이 맞는 육합으로 봅니다.` },
        { h: `원숭이띠에게 어울리는 한 해 설계`, p: `손이 빠른 원숭이띠에게는 일과 돈에서 호기심의 방향을 잡는 설계가 맞습니다. 새로 배울 것을 12주 단위로 한 가지만 정하고, 끝날 때 결과물을 하나 남겨 보세요. 돈은 부업이나 투자 정보가 눈에 들어올 때 투입할 금액을 한 달 용돈 안으로 제한하는 방식이 안전합니다. 호기심은 지키되 돌아올 수 있는 선을 먼저 그어 두자는 뜻입니다.` },
        { h: `같은 원숭이띠인데 납음오행은 왜 다른가요?`, p: `납음오행은 60갑자를 두 해씩 묶어 소리의 기운에 비유한 오행으로, 띠와는 따로 정해집니다. 1980년 경신은 석류목, 1992년 임신은 검봉금, 2004년 갑신은 천중수처럼 같은 원숭이띠라도 서로 다릅니다. 이 차이가 출생 연도별 풀이에서 올해의 납음오행과 맺는 관계가 다르게 나오는 이유입니다. 띠가 큰 줄기라면 납음은 같은 띠 안에서의 결을 나누어 보는 도구입니다.` },
      ],
    },
    vi: {
      title: `Vận trình tự nhiên và cách lập kế hoạch năm cho tuổi Thân`,
      sections: [
        { h: `Tính cách bẩm sinh của tuổi Thân`, p: `Người tuổi Thân (Khỉ) có thể sửa món đồ hỏng ngay bằng những gì có sẵn trong tay. Họ học dụng cụ mới hay quy tắc lạ rất nhanh, bí đường này thì tìm ngay đường khác. Điểm cần lưu ý là khi hết hứng, họ bỏ dở việc đang làm, hoặc lấy tài ăn nói cho qua lời hứa nên bị nhìn là hời hợt. Chỉ cần viết to ngày hoàn thành ngay lúc bắt đầu, lòng tin sẽ đầy lên.` },
        { h: `Tam Tai và chu kỳ 12 năm của tuổi Thân`, p: `Tuổi Thân thuộc nhóm Thân – Tý – Thìn. Theo truyền thống, nhóm này gặp Tam Tai ở các năm Dần, Mão, Thìn (Hổ, Mèo, Rồng) trong ba năm liên tiếp: năm đầu, năm giữa, năm cuối. Năm đầu của hạn là năm Dần, trùng với năm xung của tuổi Thân, nên truyền thống coi là thời kỳ nhiều biến động. Vì vậy hãy coi đây là quãng chuẩn bị, nhìn thêm một lần trước khi hành động. Năm Tỵ (Rắn) được xem là Lục hợp.` },
        { h: `Cách lập kế hoạch năm hợp với tuổi Thân`, p: `Người nhanh tay như tuổi Thân hợp với cách định hướng sự tò mò trong công việc và tiền bạc. Mỗi đợt 12 tuần hãy chỉ chọn một thứ để học, và khi kết thúc phải để lại một sản phẩm cụ thể. Về tiền, khi thông tin làm thêm hay đầu tư lọt vào mắt, hãy giới hạn số tiền bỏ vào trong phạm vi tiền tiêu vặt một tháng. Giữ sự tò mò, nhưng vạch trước ranh giới để còn đường quay lại.` },
        { h: `Cùng tuổi Thân mà sao Nạp âm lại khác?`, p: `Nạp âm là Ngũ hành ghép mỗi hai năm của 60 Giáp Tý và ví như khí của âm thanh, được xác định riêng với con giáp. Canh Thân 1980 là Thạch Lựu Mộc, Nhâm Thân 1992 là Kiếm Phong Kim, Giáp Thân 2004 là Tuyền Trung Thủy; cùng tuổi Thân mà mỗi năm một khác. Đó là lý do bảng luận theo năm sinh cho ra quan hệ khác nhau với Nạp âm của năm nay. Con giáp là nét lớn, còn Nạp âm giúp xem vân riêng trong cùng một tuổi.` },
      ],
    },
  },

  rooster: {
    ko: {
      title: `닭띠의 타고난 흐름과 한 해 설계법`,
      sections: [
        { h: `닭띠의 타고난 성향`, p: `닭띠는 보고서에서 오타 한 글자도 놓치지 않고 체크리스트로 일을 마무리하는 사람으로 그려집니다. 부지런하고 정돈된 걸 좋아해서 맡은 일의 완성도가 높습니다. 그러나 다른 사람의 허술한 부분이 먼저 눈에 들어와 날카로운 지적이 상처가 되거나, 내게 적용하는 높은 기준을 남에게도 요구하는 버릇은 조심할 점입니다. 지적하기 전에 잘된 부분을 먼저 말하는 순서를 지켜 보세요.` },
        { h: `삼재와 닭띠의 12년 주기`, p: `닭띠는 사유축(뱀·닭·소)생 그룹입니다. 전통에서는 해자축년, 곧 돼지·쥐·소의 해에 들삼재·눌삼재·날삼재가 3년간 이어진다고 봅니다. 삼재는 불안의 이름이 아니라 평소 미뤄 둔 정비를 해 두는 기간으로 읽으면 쓸모가 있습니다. 12년 주기에서는 토끼띠 해를 서로 부딪히는 충(沖), 용띠 해를 짝이 맞는 육합으로 보며, 닭띠 본인의 해는 12년마다 돌아옵니다.` },
        { h: `닭띠에게 어울리는 한 해 설계`, p: `기준이 높은 닭띠에게는 일과 관계에서 완벽을 조금 풀어 두는 설계가 맞습니다. 마감 직전에 한 번에 내놓기보다 80퍼센트 정도 된 상태에서 중간 공유를 하면 수정에 드는 힘이 줄어듭니다. 관계에서는 피드백을 줄 때 칭찬 한 문장을 먼저 말하는 순서를 지켜 보세요. 같은 내용도 받아들이는 사람의 표정이 달라지고, 팀이 편안하게 의견을 내게 됩니다.` },
        { h: `닭의 시간(유시)에 태어난 닭띠는 다른가요?`, p: `유시(酉時)는 오후 5시부터 7시까지의 시간입니다. 닭띠가 이 시간에 태어나면 연지와 시지에 같은 글자가 겹칩니다. 전통에서는 같은 기운이 겹쳐 그 성질이 두드러진다고 설명하지만, 이것만으로 좋고 나쁨을 정하지는 않습니다. 사주는 태어난 달과 날의 글자와 함께 전체의 균형을 보기 때문입니다. 한국과 베트남은 표준시가 2시간 다르니 출생지 시각을 기준으로 입력하세요.` },
      ],
    },
    vi: {
      title: `Vận trình tự nhiên và cách lập kế hoạch năm cho tuổi Dậu`,
      sections: [
        { h: `Tính cách bẩm sinh của tuổi Dậu`, p: `Người tuổi Dậu (Gà) không bỏ sót dù chỉ một lỗi chính tả và luôn kết thúc công việc bằng bảng kiểm. Họ siêng năng, thích sự ngăn nắp nên công việc thường hoàn thiện cao. Nhưng vì thấy chỗ sơ sài của người khác trước, lời chỉ ra có thể làm tổn thương, và họ dễ đòi người khác đạt tiêu chuẩn cao như mình. Trước khi góp ý, hãy tập khen điều làm tốt trước.` },
        { h: `Tam Tai và chu kỳ 12 năm của tuổi Dậu`, p: `Tuổi Dậu thuộc nhóm Tỵ – Dậu – Sửu. Theo truyền thống, nhóm này gặp Tam Tai ở các năm Hợi, Tý, Sửu (Lợn, Chuột, Trâu) trong ba năm liên tiếp: năm đầu, năm giữa, năm cuối. Tam Tai không phải điều đáng sợ, mà là khoảng thời gian hợp để làm nốt những việc chỉnh đốn từng trì hoãn. Theo chu kỳ 12 năm, năm Mão (Mèo, Hàn Quốc là Thỏ) là xung, năm Thìn (Rồng) là Lục hợp.` },
        { h: `Cách lập kế hoạch năm hợp với tuổi Dậu`, p: `Tuổi Dậu có tiêu chuẩn cao nên hợp với việc nới lỏng sự hoàn hảo trong công việc và quan hệ. Thay vì nộp một lần sát hạn, hãy chia sẻ khi đã xong khoảng 80% thì công sửa sẽ nhẹ hơn. Khi góp ý, hãy bắt đầu bằng một câu khen. Cùng nội dung nhưng nét mặt người nghe sẽ khác, và cả nhóm dễ nêu ý kiến hơn.` },
        { h: `Sinh vào giờ Dậu thì có gì khác không?`, p: `Giờ Dậu là từ 17 đến 19 giờ. Người tuổi Dậu sinh vào giờ này sẽ có cùng một chữ ở cả năm và giờ. Truyền thống giải thích rằng khí cùng loại chồng lên nhau nên tính chất đó nổi bật, nhưng chỉ vậy thôi thì chưa kết luận tốt hay xấu. Vì Tứ trụ còn xét chữ của tháng, ngày và sự cân bằng toàn thể. Hàn Quốc và Việt Nam chênh nhau 2 giờ múi giờ, nên hãy nhập giờ sinh theo nơi bạn sinh ra.` },
      ],
    },
  },

  dog: {
    ko: {
      title: `개띠의 타고난 흐름과 한 해 설계법`,
      sections: [
        { h: `개띠의 타고난 성향`, p: `개띠는 친구가 이사하는 날 말없이 먼저 와서 상자를 드는 사람으로 그려집니다. 한 번 한 약속은 반드시 지키려 하고, 부당한 일을 보면 참지 못하는 의리가 강점입니다. 다만 걱정이 많아 일어나지 않은 일까지 최악으로 그려 보거나, 신뢰하는 사람에게 기대가 커서 실망도 크게 받는 버릇은 조심할 점입니다. 걱정이 들 땐 실제로 일어날 일을 종이에 세 줄로 적어 보세요.` },
        { h: `삼재와 개띠의 12년 주기`, p: `개띠는 인오술(호랑이·말·개)생 그룹입니다. 전통에서는 신유술년, 곧 원숭이·닭·개의 해에 삼재가 3년간 이어진다고 보고, 개띠 본인의 해가 마지막 해인 날삼재 자리에 놓입니다. 삼재는 무서워할 대상이 아니라 마무리와 정비의 시기로 읽습니다. 12년 주기에서는 용띠 해를 서로 부딪히는 충(沖), 토끼띠 해를 짝이 맞는 육합으로 보는 것이 전통의 설명입니다.` },
        { h: `개띠에게 어울리는 한 해 설계`, p: `책임감이 큰 개띠에게는 일과 마음 건강의 균형이 중요합니다. 일에서는 맡기 전에 내가 할 일과 상대가 할 일의 경계를 한두 줄로 적어 공유해 두면 혼자 떠안는 일이 줄어듭니다. 마음은 퇴근 후 20분, 일과 무관한 활동에 쓰는 시간을 고정해 두세요. 산책이나 취미 모임처럼 책임 없이 즐기는 시간이 팽팽한 긴장을 풀어 줍니다.` },
        { h: `삼재 3년 내내 같은 강도로 조심해야 하나요?`, p: `전통에서는 첫해 들삼재, 가운데 눌삼재, 마지막 날삼재로 나누어 의미를 다르게 읽습니다. 들삼재는 시작이라 새로운 일을 벌이지 않고 준비하는 때, 눌삼재는 머무르며 버티는 때, 날삼재는 정리하고 나가는 때로 풀이합니다. 3년 내내 같은 강도로 긴장하라는 뜻이 아니며, 건강 검진이나 계약 확인처럼 평소 할 일을 챙기는 정도면 충분합니다. 다만 이는 전통적 해석이니 참고로만 삼으세요.` },
      ],
    },
    vi: {
      title: `Vận trình tự nhiên và cách lập kế hoạch năm cho tuổi Tuất`,
      sections: [
        { h: `Tính cách bẩm sinh của tuổi Tuất`, p: `Người tuổi Tuất (Chó) là người im lặng đến trước vào ngày bạn chuyển nhà và khuân hộp lên. Đã hứa là cố giữ cho bằng được, thấy chuyện bất công thì không thể làm ngơ — đó là nghĩa khí của họ. Nhưng họ hay lo xa, nghĩ cả chuyện chưa xảy ra theo hướng tệ nhất, và vì kỳ vọng lớn ở người mình tin nên thất vọng cũng lớn. Khi lo lắng, hãy viết ba dòng về điều thật sự có thể xảy ra.` },
        { h: `Tam Tai và chu kỳ 12 năm của tuổi Tuất`, p: `Tuổi Tuất thuộc nhóm Dần – Ngọ – Tuất. Theo truyền thống, nhóm này gặp Tam Tai ở các năm Thân, Dậu, Tuất (Khỉ, Gà, Chó) trong ba năm liên tiếp, và năm tuổi Tuất rơi đúng năm cuối của hạn. Tam Tai không phải điều đáng sợ, mà là quãng thời gian để khép lại và chỉnh đốn. Theo chu kỳ 12 năm, truyền thống coi năm Thìn (Rồng) là xung, năm Mão (Mèo, Hàn Quốc là Thỏ) là Lục hợp.` },
        { h: `Cách lập kế hoạch năm hợp với tuổi Tuất`, p: `Tuổi Tuất giàu trách nhiệm nên điều quan trọng là cân bằng giữa công việc và sức khỏe tinh thần. Trước khi nhận việc, hãy viết một hai dòng về phần của bạn và phần của đối phương rồi chia sẻ, sẽ bớt ôm hết một mình. Sau giờ làm, hãy cố định 20 phút cho hoạt động không liên quan công việc. Đi dạo hay câu lạc bộ sở thích, nơi không phải chịu trách nhiệm, sẽ nới lỏng sự căng thẳng.` },
        { h: `Tam Tai ba năm liền có phải lúc nào cũng phải cẩn trọng như nhau?`, p: `Truyền thống chia ba năm thành năm đầu, năm giữa và năm cuối với ý nghĩa khác nhau. Năm đầu là lúc chuẩn bị chứ chưa nên bày việc mới, năm giữa là lúc giữ vững, năm cuối là lúc khép lại và bước ra. Điều này không có nghĩa phải căng thẳng như nhau suốt ba năm; chỉ cần làm những việc thường lệ như khám sức khỏe hay kiểm tra hợp đồng là đủ. Đây là cách giải thích truyền thống, chỉ để tham khảo.` },
      ],
    },
  },

  pig: {
    ko: {
      title: `돼지띠의 타고난 흐름과 한 해 설계법`,
      sections: [
        { h: `돼지띠의 타고난 성향`, p: `돼지띠는 모임이 끝나면 밥값을 먼저 계산하고 집에 가는 길까지 챙기는 사람으로 그려집니다. 거리낌이 적고 너그러워서 사람이 모이며 주변에 편안한 기운을 줍니다. 하지만 경계가 흐려 부탁이나 책임이 쌓이기 쉽고, 편한 쪽으로 미루다 보니 해야 할 일이 뒤로 밀리는 버릇은 조심할 점입니다. 오늘 끝낼 일 한 가지를 아침에 먼저 정해 두는 것만으로도 흐름이 달라집니다.` },
        { h: `삼재와 돼지띠의 12년 주기`, p: `돼지띠는 해묘미(돼지·토끼·양)생 그룹입니다. 전통에서는 사오미년, 곧 뱀·말·양의 해에 들삼재·눌삼재·날삼재가 3년간 이어진다고 봅니다. 돼지띠는 삼재의 첫해인 뱀 해가 서로 부딪히는 충(沖)의 해와 겹쳐서 전통에서는 변화가 많은 때로 설명합니다. 그러니 겁내기보다 몸과 살림을 점검하는 시기로 읽으면 됩니다. 호랑이띠 해는 짝이 맞는 육합으로 보며, 본인의 해는 12년마다 돌아옵니다.` },
        { h: `돼지띠에게 어울리는 한 해 설계`, p: `인심이 후한 돼지띠에게는 돈과 건강을 먼저 챙기는 설계가 맞습니다. 돈은 모임과 선물에 쓰는 몫을 월 예산에 따로 한 줄 넣어 두면 마음 편히 쓰고 끝까지 남는 돈도 생깁니다. 건강은 먹는 즐거움을 줄이기보다 식사 시간을 일정하게 맞추고, 식후 15분 걷기처럼 끼워 넣기 쉬운 습관 하나만 들여 보세요. 즐거움을 없애지 않고 리듬을 잡는 방식입니다.` },
        { h: `돼지띠는 복돼지라서 재물운이 좋은가요?`, p: `돼지는 예로부터 풍요와 복을 상징하는 동물이라 이런 이야기가 생겼습니다. 하지만 이는 문화적인 상징이지 재물을 보장한다는 뜻이 아닙니다. 명리에서 재물은 오행의 균형과 시기, 개인의 노력과 습관이 함께 얽혀 풀이되는 영역이어서 띠 하나로 정하기 어렵습니다. 복돼지는 마음을 넉넉하게 먹자는 덕담으로 즐기고, 수입과 지출은 현실의 기록으로 관리하는 것이 안전합니다.` },
      ],
    },
    vi: {
      title: `Vận trình tự nhiên và cách lập kế hoạch năm cho tuổi Hợi`,
      sections: [
        { h: `Tính cách bẩm sinh của tuổi Hợi`, p: `Người tuổi Hợi (Lợn) hay là người trả tiền ăn trước khi buổi gặp kết thúc và còn lo cho cả đường về nhà. Họ ít câu nệ, rộng lượng nên mọi người tụ lại và tạo cảm giác dễ chịu. Nhưng ranh giới mờ khiến nhờ vả và trách nhiệm dễ chồng chất, và vì chọn cách dễ dàng nên việc cần làm bị đẩy lùi. Chỉ cần buổi sáng chọn trước một việc phải xong trong hôm nay, nhịp ngày sẽ khác hẳn.` },
        { h: `Tam Tai và chu kỳ 12 năm của tuổi Hợi`, p: `Tuổi Hợi thuộc nhóm Hợi – Mão – Mùi. Theo truyền thống, nhóm này gặp Tam Tai ở các năm Tỵ, Ngọ, Mùi (Rắn, Ngựa, Dê) trong ba năm liên tiếp. Năm đầu của hạn là năm Tỵ, trùng với năm xung của tuổi Hợi nên truyền thống coi là lúc nhiều thay đổi. Thay vì lo sợ, hãy xem đây là dịp kiểm tra lại sức khỏe và việc nhà cửa. Năm Dần (Hổ) được xem là Lục hợp, và năm tuổi của bạn quay lại sau mỗi 12 năm.` },
        { h: `Cách lập kế hoạch năm hợp với tuổi Hợi`, p: `Tuổi Hợi hào phóng nên hợp với việc lo tiền bạc và sức khỏe trước. Hãy thêm một dòng riêng trong ngân sách tháng cho tiệc tùng và quà tặng, bạn sẽ chi thoải mái mà vẫn còn tiền dư đến cuối tháng. Về sức khỏe, đừng bỏ niềm vui ăn uống, chỉ cần giữ giờ ăn đều đặn và tập một thói quen dễ chen vào, chẳng hạn đi bộ 15 phút sau bữa ăn. Đây là cách giữ nhịp mà không mất đi niềm vui.` },
        { h: `Tuổi Hợi là “lợn may mắn” nên số giàu có thật không?`, p: `Lợn từ xưa là biểu tượng của no đủ và phúc lộc nên mới có quan niệm này. Nhưng đó là biểu tượng văn hóa, không phải lời bảo đảm về tiền bạc. Trong mệnh lý, tiền của gắn với cân bằng Ngũ hành, thời điểm cùng nỗ lực và thói quen của mỗi người nên khó kết luận chỉ bằng con giáp. Hãy xem “lợn may mắn” như lời chúc để lòng rộng rãi, còn thu chi thì quản lý bằng ghi chép thực tế.` },
      ],
    },
  },
};
