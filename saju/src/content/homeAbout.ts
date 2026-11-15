// Intro text on the home page. Summarizes the about and method pages so first-time readers see what the site is and how it works.
import type { Lang } from '../i18n';

interface HomeAbout {
  title: string;
  paras: string[];
  links: { to: '/about' | '/method' | '/guide'; label: string }[];
}

export const HOME_ABOUT: Record<Lang, HomeAbout> = {
  ko: {
    title: '명월은 이런 사이트입니다',
    paras: [
      '명월(明月, Minh Nguyệt)은 한국과 베트남의 음력을 한 화면에 나란히 보여 주는 무료 서비스입니다. 두 나라는 같은 원리의 음력을 쓰지만 기준 시간이 달라, 설이나 기일이 하루 어긋나는 해가 있고 드물게는 윤달 때문에 한 달까지 차이가 납니다. 한·베 가족과 커플, 두 나라를 오가며 사는 분들이 겪는 “우리 집은 어느 나라 기준이지?”라는 고민을 덜기 위해 만들었습니다.',
      '날짜는 표를 베껴 쓰지 않고 천문 계산으로 직접 구합니다. 절기와 합삭 시각은 공개 천문 계산 라이브러리로 분 단위까지 구하고, 출생 시각은 당시의 표준시와 서머타임을 반영합니다. 계산은 이용자의 브라우저 안에서 이루어지며 생년월일은 서버로 보내거나 저장하지 않습니다. 기준과 공식은 계산 방식 페이지에 공개했습니다.',
      '좋은 날 달력, 무료 사주, 한·베 궁합, 띠별 운세, 꿈해몽, 한·베 작명, 나이·제사 계산기를 제공하고, 두 나라의 명절과 풍습을 비교한 가이드 글 30편을 함께 싣고 있습니다. 사주·택일·꿈해몽은 두 나라의 전통문화로 소개하는 참고용 해설이며, 미래를 보장하는 예언이 아닙니다. 건강·법률·돈 문제는 전문가와 상의하세요.',
    ],
    links: [
      { to: '/about', label: '명월 소개' },
      { to: '/method', label: '계산 방식' },
      { to: '/guide', label: '읽을거리' },
    ],
  },
  vi: {
    title: 'Minh Nguyệt là trang như thế nào?',
    paras: [
      'Minh Nguyệt (明月) là dịch vụ miễn phí hiển thị lịch âm Hàn Quốc và Việt Nam cạnh nhau trên cùng một màn hình. Hai nước dùng cùng nguyên lý âm lịch nhưng múi giờ chuẩn khác nhau, nên có năm Tết hay ngày giỗ lệch nhau một ngày, hiếm hơn là lệch cả một tháng do tháng nhuận. Chúng tôi làm trang này để giúp các gia đình, cặp đôi Hàn – Việt và những người sống giữa hai nước đỡ băn khoăn “nhà mình nên theo lịch nước nào?”.',
      'Mỗi ngày đều được tính trực tiếp bằng thiên văn học chứ không chép từ bảng có sẵn. Thời điểm tiết khí và sóc được tính đến từng phút bằng thư viện thiên văn công khai, giờ sinh được quy đổi theo múi giờ và giờ mùa hè của thời điểm đó. Mọi phép tính chạy ngay trong trình duyệt của bạn, ngày sinh không được gửi đi hay lưu lại. Tiêu chuẩn và công thức được công bố ở trang Cách tính.',
      'Trang có lịch xem ngày tốt, lá số Tứ trụ miễn phí, xem tuổi hợp Hàn – Việt, tử vi 12 con giáp, giải mộng, đặt tên tiếng Hàn, máy tính tuổi và ngày giỗ, cùng 30 bài viết so sánh lễ Tết và phong tục hai nước. Tứ trụ, xem ngày và giải mộng được giới thiệu như văn hóa truyền thống để tham khảo, không phải lời tiên đoán chắc chắn. Với chuyện sức khỏe, pháp lý hay tiền bạc, hãy hỏi chuyên gia.',
    ],
    links: [
      { to: '/about', label: 'Giới thiệu' },
      { to: '/method', label: 'Cách tính' },
      { to: '/guide', label: 'Bài viết' },
    ],
  },
};
