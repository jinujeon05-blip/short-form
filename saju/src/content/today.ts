// Text for the home "today at a glance" card. All wording is original.
import type { Lang } from '../i18n';
import type { DayLevel } from '../engine/almanac';

interface TodayText {
  title: string;
  verdict: Record<DayLevel, string>;
  good: string;
  avoid: string;
  note: string;
  timeline: string;
  timelineDesc: string;
  now: string;
  goodHour: string;
  detail: string;
  share: string;
  cardTitle: string;
  starLine: (good: boolean, star: string, officer: string) => string;
}

export const TODAY: Record<Lang, TodayText> = {
  ko: {
    title: '오늘 한눈에',
    verdict: {
      great: '크게 좋은 날 — 미뤄 둔 일을 시작하기 좋아요',
      good: '좋은 날 — 계획한 일을 차분히 진행하세요',
      normal: '무난한 날 — 평소 하던 대로가 가장 좋아요',
      bad: '조심할 날 — 큰 결정은 하루 미루세요',
    },
    good: '하면 좋은 일',
    avoid: '피할 일',
    note: '오늘의 포인트',
    timeline: '시간대별 길흉',
    timelineDesc: '금색은 황도시(좋은 시간)입니다. 중요한 연락·출발·계약은 이 시간에 맞춰 보세요.',
    now: '지금',
    goodHour: '좋은 시간',
    detail: '상세 풀이',
    share: '오늘의 운세 공유',
    cardTitle: '오늘의 음력과 길흉',
    starLine: (good, star, officer) => `${good ? '황도일' : '흑도일'}(${star}) · 12직 ${officer}`,
  },
  vi: {
    title: 'Hôm nay trong nháy mắt',
    verdict: {
      great: 'Ngày rất tốt — hợp để bắt đầu việc còn dang dở',
      good: 'Ngày tốt — cứ thong thả làm việc đã định',
      normal: 'Ngày bình thường — giữ nhịp quen thuộc là tốt nhất',
      bad: 'Ngày cần cẩn thận — việc lớn nên để sang mai',
    },
    good: 'Nên làm',
    avoid: 'Nên tránh',
    note: 'Điểm đáng chú ý',
    timeline: 'Giờ tốt xấu trong ngày',
    timelineDesc: 'Ô màu vàng là giờ hoàng đạo. Liên lạc quan trọng, xuất hành, ký kết nên chọn những giờ này.',
    now: 'Bây giờ',
    goodHour: 'Giờ tốt',
    detail: 'Luận giải chi tiết',
    share: 'Chia sẻ ngày hôm nay',
    cardTitle: 'Lịch âm và ngày tốt xấu hôm nay',
    starLine: (good, star, officer) => `Ngày ${good ? 'hoàng đạo' : 'hắc đạo'} (${star}) · Trực ${officer}`,
  },
};
