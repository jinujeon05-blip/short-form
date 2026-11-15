// Extra reading text for the three list (hub) pages: dream index, daily fortune index, yearly fortune index.
// All wording is original. Reference-only tone; no guarantees, no gambling-related content.
import type { Lang } from '../i18n';
import type { DepthText } from './depthTypes';

export const HUB_DEPTH: Record<'dream' | 'daily' | 'fortune', Record<Lang, DepthText>> = {
  dream: {
    ko: {
      title: `꿈해몽을 읽는 방법과 이 목록의 쓰임새`,
      sections: [
        {
          h: `꿈해몽은 어떤 문화인가`,
          p: `해몽은 꿈을 미래를 맞히는 장치가 아니라 삶의 분위기를 읽는 이야기로 다루어 온 문화입니다. 한국에서는 돼지꿈이나 용꿈처럼 상징 하나에 길흉을 붙이는 속설이 오래 전해졌고, 베트남에서는 같은 꿈도 가족과 조상, 집안일과 엮어 풀이하는 경우가 많습니다. 그래서 같은 동물이 나와도 두 나라의 설명 결이 다릅니다. 이 사이트는 두 풀이를 나란히 보여 주되, 어느 쪽도 정답으로 단정하지 않습니다. 두 나라의 시선을 비교해 보는 재미로 읽어 주세요.`,
        },
        {
          h: `꿈 목록 보는 법`,
          p: `목록은 동물, 사람·몸, 자연, 상황·물건 네 갈래로 나뉘어 있습니다. 먼저 꿈에서 가장 또렷했던 대상이 어느 갈래에 가까운지 고른 뒤 이름을 눌러 보세요. 같은 뱀이라도 집 안에서 만났는지, 물을 건너다 만났는지, 물렸는지에 따라 뜻이 갈립니다. 그래서 각 꿈 페이지에는 상황별 풀이가 따로 있습니다. 찾는 꿈이 없으면 검색창에 단어 하나만 넣어 비슷한 꿈부터 살펴보세요.`,
        },
        {
          h: `길몽·조심·상황따라 표시의 뜻`,
          p: `꿈마다 붙은 길몽, 조심, 상황따라 표시는 전통 풀이에서 해당 꿈이 대체로 어느 쪽으로 읽혔는지 알려 주는 안내일 뿐입니다. 길몽이라고 좋은 일이 약속되는 것은 아니고, 조심이라고 나쁜 일이 생긴다는 뜻도 아닙니다. 오히려 상황따라 표시가 가장 많은 이유는 꿈의 뜻이 장면과 꾼 사람의 처지에 따라 달라지기 때문입니다. 표시는 한 줄 요약으로만 보고, 본문의 장면별 설명을 함께 읽어 주세요.`,
        },
        {
          h: `꿈을 기억해 두는 요령`,
          p: `꿈은 깨고 나서 몇 분 안에 빠르게 흐려집니다. 눈을 뜨자마자 휴대폰 메모장에 누가 나왔는지, 어디였는지, 어떤 장면이 제일 선명했는지를 단어로 적어 두세요. 그때 느낀 감정, 이를테면 무서움이나 홀가분함도 한 단어로 남기면 좋습니다. 줄거리를 매끄럽게 쓸 필요는 없습니다. 나중에 목록에서 같은 대상을 찾아 읽어 보면 어느 장면이 내 하루와 닿아 있는지 스스로 짚어 보기 쉬워집니다.`,
        },
        {
          h: `같은 꿈을 반복해서 꾸면 어떻게 읽나`,
          p: `같은 꿈이 되풀이되면 전통 풀이에서는 마음에 걸린 일이 있다는 신호로 보기도 합니다. 요즘 시각으로는 잠들기 전의 긴장이나 피로, 반복되는 걱정이 꿈의 소재로 올라온 것이라고 이해하는 편이 자연스럽습니다. 반복 횟수에 특별한 의미를 두기보다 요즘 잠은 충분한지, 신경 쓰이는 일은 무엇인지 돌아보는 계기로 삼으세요. 참고로 이 사이트는 베트남의 꿈 번호(lô đề) 같은 도박과 이어지는 풀이는 제공하지 않습니다.`,
        },
      ],
    },
    vi: {
      title: `Cách đọc giải mộng và cách dùng danh sách giấc mơ này`,
      sections: [
        {
          h: `Giải mộng là một nét văn hóa như thế nào`,
          p: `Giải mộng từ lâu không phải để đoán trước tương lai mà là cách người ta đọc “không khí” của cuộc sống qua giấc mơ. Ở Hàn Quốc, nhiều quan niệm gắn một biểu tượng với điềm lành hoặc dữ, như mơ thấy lợn hay rồng. Ở Việt Nam, cùng một giấc mơ thường được nối với gia đình, tổ tiên và chuyện trong nhà. Vì vậy cùng một con vật, hai nước vẫn có cách giải khác nhau. Minh Nguyệt đặt hai cách giải cạnh nhau và không coi cách nào là đáp án duy nhất.`,
        },
        {
          h: `Cách tra cứu trong danh sách giấc mơ`,
          p: `Danh sách chia thành bốn nhóm: con vật, con người và cơ thể, thiên nhiên, tình huống và đồ vật. Hãy chọn nhóm gần nhất với hình ảnh rõ nhất trong giấc mơ rồi bấm vào tên. Cùng là con rắn, nhưng gặp trong nhà, gặp khi lội qua sông hay bị rắn cắn thì ý nghĩa khác nhau, nên mỗi trang đều có phần giải theo từng tình huống. Nếu chưa thấy giấc mơ cần tìm, bạn cứ gõ một từ khóa vào ô tìm kiếm để xem những giấc mơ gần giống trước.`,
        },
        {
          h: `Ý nghĩa của nhãn Điềm lành, Nên cẩn thận, Tùy tình huống`,
          p: `Các nhãn Điềm lành, Nên cẩn thận và Tùy tình huống chỉ cho biết giấc mơ ấy thường được hiểu nghiêng về hướng nào trong quan niệm truyền thống. Điềm lành không có nghĩa là chắc chắn gặp may, và Nên cẩn thận cũng không có nghĩa là sẽ gặp chuyện xấu. Nhãn Tùy tình huống xuất hiện nhiều nhất vì ý nghĩa của giấc mơ thay đổi theo từng cảnh và hoàn cảnh người mơ. Bạn nên xem nhãn như một dòng tóm tắt, rồi đọc phần giải theo từng cảnh bên dưới.`,
        },
        {
          h: `Mẹo ghi nhớ giấc mơ`,
          p: `Giấc mơ phai rất nhanh, chỉ vài phút sau khi thức dậy là đã mờ đi. Vừa mở mắt, hãy ghi vào ghi chú điện thoại vài từ: ai xuất hiện, ở đâu, cảnh nào rõ nhất. Cảm xúc lúc đó, như sợ hãi hay nhẹ nhõm, cũng nên ghi bằng một từ. Bạn không cần viết thành câu chuyện trọn vẹn. Sau này tra đúng hình ảnh ấy trong danh sách, bạn sẽ dễ tự nhận ra cảnh nào có liên quan đến những ngày gần đây của mình.`,
        },
        {
          h: `Mơ lặp lại một giấc mơ thì sao`,
          p: `Theo quan niệm truyền thống, giấc mơ lặp lại có thể là dấu hiệu trong lòng đang có điều canh cánh. Theo cách nhìn hiện đại, đó thường là sự căng thẳng, mệt mỏi hoặc nỗi lo kéo dài trước khi ngủ hiện lên thành hình ảnh. Đừng gán ý nghĩa đặc biệt cho số lần mơ, mà hãy xem đó là lúc nhìn lại giấc ngủ gần đây và việc đang khiến mình bận tâm. Cũng xin lưu ý: Minh Nguyệt không giải “con số” lô đề từ giấc mơ vì liên quan đến cờ bạc.`,
        },
      ],
    },
  },
  daily: {
    ko: {
      title: `오늘의 띠별 운세는 이렇게 읽습니다`,
      sections: [
        {
          h: `오늘의 운세는 무엇을 보고 계산하나`,
          p: `이 목록의 운세는 그날의 일진, 곧 하루에 붙는 간지와 내 띠의 지지가 어떤 관계인지를 기준으로 합니다. 전통 명리에서 지지끼리는 육합, 삼합처럼 서로 어울리는 관계와 충, 형, 해처럼 부딪치거나 어긋나는 관계로 나뉩니다. 오늘 일진이 내 띠와 합을 이루면 손발이 맞는 날로, 충이 들어 있으면 이동과 큰 결정을 한 번 더 살피는 날로 읽습니다. 관계가 없으면 평소대로 보내는 날입니다.`,
        },
        {
          h: `순위표를 읽을 때 알아둘 점`,
          p: `순위표는 열두 띠를 그날의 관계에 따라 한 줄로 세운 것입니다. 윗자리에 있다고 하루가 반드시 순탄하다는 뜻은 아니고, 아랫자리라고 조심만 해야 하는 것도 아닙니다. 순위가 한 칸 차이인 띠들은 풀이의 결이 거의 같다고 보셔도 됩니다. 순위가 날마다 바뀌는 까닭은 일진이 하루에 하나씩 넘어가기 때문입니다. 그래서 어제의 순위는 오늘과 이어지지 않으니, 한 번의 순위에 일희일비하지 않는 편이 좋습니다.`,
        },
        {
          h: `출생연도별 풀이가 따로 있는 이유`,
          p: `같은 쥐띠라도 1984년생과 1996년생은 태어난 해의 천간이 다릅니다. 천간에는 오행이 배어 있어서, 띠가 같아도 타고난 기운의 바탕이 갑목인지 병화인지에 따라 오늘의 일진과 부딪히는 방식이 조금씩 달라진다고 봅니다. 그래서 띠별 풀이 아래에 출생연도별 한 줄 풀이를 따로 두었습니다. 내 띠 페이지에서 태어난 해를 찾아 함께 읽으면 같은 띠 안에서도 미묘한 차이를 확인할 수 있습니다.`,
        },
        {
          h: `하루를 점검하는 신호로 쓰는 법`,
          p: `운세를 결과를 기다리는 예언이 아니라 하루를 점검하는 신호로 쓰면 부담이 훨씬 줄어듭니다. 충이 든 날이라면 중요한 약속의 시간과 장소를 다시 확인하고, 해가 든 날이라면 말을 한 번 더 고르는 식입니다. 지출이 늘기 쉽다는 풀이가 보이면 결제 전에 잠깐 멈춰 보세요. 이렇게 운세 한 줄을 일정, 말, 돈을 살피는 알림으로 바꿔 두면, 맞고 틀림을 따지지 않아도 하루를 차분하게 시작하는 데 도움이 됩니다.`,
        },
        {
          h: `운세가 매번 다르게 나오는 이유`,
          p: `자주 받는 질문이 어제와 오늘 운세가 왜 이렇게 다르냐는 것입니다. 답은 단순합니다. 내 띠는 그대로지만 날마다 일진이 바뀌고, 풀이는 그날의 일진과 내 띠가 맺는 관계에서 나오기 때문입니다. 같은 날 같은 띠를 다시 열면 같은 풀이가 나옵니다. 하루 사이에 운이 오르내린다는 뜻이 아니라, 읽는 기준이 되는 날이 달라졌다는 뜻입니다. 전통 명리에 기댄 참고용 풀이이므로 가볍게 읽어 주세요.`,
        },
      ],
    },
    vi: {
      title: `Cách đọc tử vi hôm nay theo 12 con giáp`,
      sections: [
        {
          h: `Tử vi hôm nay được tính dựa vào đâu`,
          p: `Tử vi trong danh sách này dựa trên nhật thần của ngày, tức Can Chi gắn với từng ngày, và quan hệ của nó với Địa chi tuổi của bạn. Trong mệnh lý truyền thống, các Địa chi có quan hệ hòa hợp như Lục hợp, Tam hợp, và quan hệ va chạm hay lệch nhau như Xung, Hình, Hại. Ngày hợp tuổi thường được hiểu là ngày thuận tay thuận chân. Ngày có Xung là ngày nên xem kỹ chuyện đi lại và quyết định lớn. Nếu không có quan hệ đặc biệt, đó là một ngày bình thường.`,
        },
        {
          h: `Lưu ý khi đọc bảng xếp hạng`,
          p: `Bảng xếp hạng sắp 12 con giáp thành một hàng theo quan hệ với ngày hôm nay. Đứng trên cao không có nghĩa là cả ngày sẽ suôn sẻ, còn đứng dưới cũng không có nghĩa là chỉ cần lo lắng. Hai tuổi hơn kém nhau một bậc thì lời luận gần như cùng sắc thái. Thứ hạng đổi mỗi ngày vì nhật thần chuyển sang ngày mới. Hạng của hôm qua không nối tiếp hôm nay, nên bạn đừng quá vui hay buồn chỉ vì một lần xem bảng xếp hạng.`,
        },
        {
          h: `Vì sao có lời luận riêng theo năm sinh`,
          p: `Cùng tuổi Tý nhưng người sinh năm 1984 và 1996 có Thiên can của năm sinh khác nhau. Thiên can mang Ngũ hành riêng, nên dù cùng con giáp, nền năng lượng bẩm sinh là Giáp Mộc hay Bính Hỏa sẽ khiến cách va chạm với nhật thần mỗi ngày hơi khác. Vì thế bên dưới phần luận theo con giáp, chúng tôi thêm một dòng luận riêng cho từng năm sinh. Bạn hãy tìm năm sinh của mình trong trang tuổi để thấy những khác biệt nhỏ trong cùng một con giáp.`,
        },
        {
          h: `Dùng tử vi để rà soát một ngày`,
          p: `Nếu coi tử vi là tín hiệu để rà soát chứ không phải lời tiên đoán, bạn sẽ thấy nhẹ lòng hơn nhiều. Ngày có Xung thì kiểm tra lại giờ giấc và địa điểm của cuộc hẹn quan trọng. Ngày có Hại thì cân nhắc lời nói thêm một lần. Khi thấy dòng nhắc chi tiêu dễ tăng, hãy dừng lại một nhịp trước khi thanh toán. Biến một dòng tử vi thành lời nhắc về lịch trình, lời nói và tiền bạc giúp bạn bắt đầu ngày mới bình tĩnh hơn, không cần bận tâm đúng hay sai.`,
        },
        {
          h: `Vì sao mỗi lần xem lại ra kết quả khác`,
          p: `Một câu hỏi rất hay gặp là sao tử vi hôm qua và hôm nay khác nhau đến vậy. Lý do khá đơn giản: tuổi của bạn không đổi nhưng nhật thần đổi mỗi ngày, mà lời luận được rút ra từ quan hệ giữa nhật thần ấy và tuổi của bạn. Mở lại cùng một ngày, cùng một con giáp thì sẽ ra cùng một lời luận. Điều đó không có nghĩa vận may lên xuống trong một ngày, mà là ngày làm mốc để đọc đã khác. Đây là lời luận tham khảo dựa trên mệnh lý truyền thống, bạn cứ đọc nhẹ nhàng.`,
        },
      ],
    },
  },
  fortune: {
    ko: {
      title: `신년 띠별 운세를 읽기 전에 알아둘 것`,
      sections: [
        {
          h: `신년 운세는 무엇을 보는가`,
          p: `신년 운세는 그 해에 붙는 간지와 내 띠의 관계, 그리고 해의 오행이 어떻게 흐르는지를 함께 봅니다. 2027년은 정미년(丁未年)으로, 천간 정은 촛불 같은 불이고 지지 미는 여름의 뜨거운 흙입니다. 불과 흙이 겹쳐 따뜻하게 쌓이는 기운이 두드러지는 해라고 읽습니다. 열두 띠는 이 해의 지지와 합을 이루는지, 충이나 해를 이루는지에 따라 풀이가 갈립니다. 띠마다 다른 한 해의 분위기를 가늠하는 참고 자료로 보시면 됩니다.`,
        },
        {
          h: `설이 아니라 입춘으로 띠를 나누는 이유`,
          p: `띠를 설날 기준으로 나누는 것이 일반적인 관습이지만, 명리학에서는 한 해의 시작을 입춘(2월 4일 무렵)으로 잡습니다. 입춘이 24절기의 첫 절기이고, 간지가 절기를 따라 바뀌기 때문입니다. 그래서 1월과 2월 초에 태어난 분은 설을 지났는지, 입춘을 지났는지에 따라 띠가 다르게 읽힐 수 있습니다. 이런 경우에는 이 사이트의 안내와 함께 음력 생일과 입춘 날짜를 확인해 두 가지 띠 풀이를 모두 읽어 보세요.`,
        },
        {
          h: `월별 운세가 절기를 기준으로 하는 이유`,
          p: `월별 운세의 한 달은 양력 1일에서 말일까지가 아니라 절기에서 다음 절기까지입니다. 명리에서는 달의 간지가 입춘, 경칩, 청명 같은 절기를 지나며 바뀐다고 보기 때문입니다. 그래서 여기서 말하는 1월은 입춘 무렵에 시작해 경칩 무렵에 끝납니다. 달력의 날짜와 몇 주쯤 어긋나므로, 월별 풀이를 읽을 때는 해당 달이 언제 시작하는지 함께 확인하는 것이 좋습니다. 큰 흐름만 보는 용도로 부담 없이 활용해 주세요.`,
        },
        {
          h: `삼재를 겁내지 않고 읽는 법`,
          p: `삼재는 열두 띠를 신자진, 사유축, 인오술, 해묘미 네 묶음으로 나누고, 묶음마다 세 해에 걸쳐 조심하라고 전해 온 시기입니다. 들어가는 해, 머무는 해, 나가는 해의 세 단계로 부르기도 합니다. 겁낼 일이라기보다 무리한 확장과 큰 결정을 한 번 더 점검하라는 옛 사람들의 안전장치에 가깝습니다. 건강검진을 받고 계약서를 꼼꼼히 읽는 해로 삼으면 충분합니다. 내 띠가 어느 해에 해당하는지는 각 띠 페이지에서 확인하세요.`,
        },
        {
          h: `한 해를 쓰는 법`,
          p: `신년 운세는 한 해의 결과를 미리 알려 주는 글이 아니라, 계획을 점검할 때 곁에 두는 참고 자료입니다. 연초에 한 번 읽고 올해 서두를 일과 쉬어 갈 일을 가늠해 보세요. 풀이에서 조심하라는 대목은 건강, 관계, 지출처럼 평소에도 돌볼 부분을 일깨우는 신호로 받아들이면 됩니다. 좋다고 한 대목에 기대 준비를 건너뛰거나, 나쁘다고 한 대목에 겁먹어 도전을 접을 필요는 없습니다. 결정은 언제나 내 상황과 판단이 우선입니다.`,
        },
      ],
    },
    vi: {
      title: `Điều cần biết trước khi xem tử vi năm mới theo con giáp`,
      sections: [
        {
          h: `Tử vi năm mới xem những gì`,
          p: `Tử vi năm mới xem Can Chi của năm, quan hệ của nó với từng con giáp và dòng chảy Ngũ hành của năm đó. Năm 2027 là năm Đinh Mùi: Đinh là lửa nhỏ như ngọn nến, Mùi là đất nóng giữa hè. Lửa và đất chồng lên nhau tạo cảm giác ấm áp, tích lũy dần. Mỗi con giáp được luận khác nhau tùy theo hợp, xung hay hại với Địa chi của năm. Bạn có thể xem đây là tài liệu tham khảo để hình dung không khí chung của cả năm với tuổi của mình.`,
        },
        {
          h: `Vì sao chia con giáp theo Lập xuân chứ không theo Tết`,
          p: `Thông thường người ta tính con giáp theo Tết, nhưng trong mệnh lý, năm mới bắt đầu từ Lập xuân, khoảng ngày 4 tháng 2 dương lịch. Lập xuân là tiết khí đầu tiên trong 24 tiết khí, và Can Chi đổi theo tiết khí. Vì vậy người sinh vào tháng 1 hoặc đầu tháng 2 có thể được luận theo hai con giáp khác nhau, tùy đã qua Tết hay đã qua Lập xuân. Nếu thuộc trường hợp này, hãy đối chiếu ngày sinh âm lịch với ngày Lập xuân rồi đọc cả hai trang con giáp.`,
        },
        {
          h: `Vì sao vận từng tháng tính theo tiết khí`,
          p: `Một tháng trong phần vận từng tháng không phải từ mùng 1 đến cuối tháng dương lịch, mà là từ tiết khí này đến tiết khí kế tiếp. Trong mệnh lý, Can Chi của tháng đổi khi qua các tiết như Lập xuân, Kinh trập, Thanh minh. Vì thế tháng 1 ở đây bắt đầu quanh Lập xuân và kết thúc quanh Kinh trập. Mốc này lệch với lịch thường vài tuần, nên khi đọc hãy xem thêm tháng đó bắt đầu từ ngày nào. Bạn chỉ nên dùng phần này để nắm xu hướng chung, đừng quá bận tâm từng ngày.`,
        },
        {
          h: `Đọc Tam Tai mà không lo sợ`,
          p: `Tam Tai chia 12 con giáp thành bốn nhóm: Thân Tý Thìn, Tỵ Dậu Sửu, Dần Ngọ Tuất và Hợi Mão Mùi. Mỗi nhóm có ba năm mà người xưa dặn nên thận trọng, thường gọi là năm vào, năm giữa và năm ra. Đó không phải điều đáng sợ, mà giống một cách người xưa nhắc nhau kiểm tra lại các kế hoạch mở rộng và quyết định lớn. Bạn chỉ cần coi đó là năm đi khám sức khỏe và đọc hợp đồng kỹ hơn. Tuổi của bạn rơi vào năm nào, hãy xem ở trang từng con giáp.`,
        },
        {
          h: `Cách dùng tử vi cả năm`,
          p: `Tử vi năm mới không phải bài báo cho biết trước kết quả của cả năm, mà là tài liệu để bên cạnh khi bạn rà soát kế hoạch. Đầu năm hãy đọc một lần, thử nghĩ việc nào nên làm sớm và việc nào nên chậm lại. Những chỗ được nhắc cần thận trọng có thể coi là lời nhắc chăm sóc sức khỏe, các mối quan hệ hay chi tiêu, vốn nên để ý quanh năm. Đừng vì lời tốt mà bỏ qua chuẩn bị, cũng đừng vì lời xấu mà bỏ cuộc. Quyết định cuối cùng luôn dựa vào hoàn cảnh và phán đoán của bạn.`,
        },
      ],
    },
  },
};
