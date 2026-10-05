// Birthplaces and historical civil-time offsets (including Korean DST of 1948–60 and 1987–88).
// Offsets come from the IANA database bundled with the browser (Intl).

export interface Place {
  id: string;
  country: 'KR' | 'VN' | 'OTHER';
  ko: string;
  vi: string;
  /** IANA zone; null for fixed-offset places */
  zone: string | null;
  /** Fixed UTC offset in hours when zone is null */
  offset?: number;
  longitude: number;
}

export const PLACES: Place[] = [
  { id: 'seoul', country: 'KR', ko: '서울·경기', vi: 'Seoul', zone: 'Asia/Seoul', longitude: 126.98 },
  { id: 'incheon', country: 'KR', ko: '인천', vi: 'Incheon', zone: 'Asia/Seoul', longitude: 126.7 },
  { id: 'daejeon', country: 'KR', ko: '대전·충청', vi: 'Daejeon', zone: 'Asia/Seoul', longitude: 127.38 },
  { id: 'gwangju', country: 'KR', ko: '광주·전라', vi: 'Gwangju', zone: 'Asia/Seoul', longitude: 126.85 },
  { id: 'daegu', country: 'KR', ko: '대구·경북', vi: 'Daegu', zone: 'Asia/Seoul', longitude: 128.6 },
  { id: 'busan', country: 'KR', ko: '부산·경남', vi: 'Busan', zone: 'Asia/Seoul', longitude: 129.08 },
  { id: 'gangwon', country: 'KR', ko: '강원', vi: 'Gangwon', zone: 'Asia/Seoul', longitude: 128.2 },
  { id: 'jeju', country: 'KR', ko: '제주', vi: 'Jeju', zone: 'Asia/Seoul', longitude: 126.53 },
  // North Vietnam kept UTC+7 after 1954; Asia/Bangkok has the same offset history.
  { id: 'hanoi', country: 'VN', ko: '하노이', vi: 'Hà Nội', zone: 'Asia/Bangkok', longitude: 105.85 },
  { id: 'haiphong', country: 'VN', ko: '하이퐁', vi: 'Hải Phòng', zone: 'Asia/Bangkok', longitude: 106.68 },
  { id: 'vinh', country: 'VN', ko: '빈·북중부', vi: 'Vinh / Bắc Trung Bộ', zone: 'Asia/Bangkok', longitude: 105.68 },
  { id: 'hue', country: 'VN', ko: '후에', vi: 'Huế', zone: 'Asia/Ho_Chi_Minh', longitude: 107.59 },
  { id: 'danang', country: 'VN', ko: '다낭', vi: 'Đà Nẵng', zone: 'Asia/Ho_Chi_Minh', longitude: 108.21 },
  { id: 'nhatrang', country: 'VN', ko: '나트랑', vi: 'Nha Trang', zone: 'Asia/Ho_Chi_Minh', longitude: 109.19 },
  { id: 'hcmc', country: 'VN', ko: '호치민', vi: 'TP. Hồ Chí Minh', zone: 'Asia/Ho_Chi_Minh', longitude: 106.7 },
  { id: 'cantho', country: 'VN', ko: '껀터·메콩', vi: 'Cần Thơ / Miền Tây', zone: 'Asia/Ho_Chi_Minh', longitude: 105.78 },
];

export const getPlace = (id: string) => PLACES.find((p) => p.id === id) ?? PLACES[0];

function zoneOffsetMinutes(zone: string, utcMs: number): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: zone,
    hourCycle: 'h23',
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
  }).formatToParts(new Date(utcMs));
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'));
  return Math.round((asUtc - Math.floor(utcMs / 1000) * 1000) / 60000);
}

/** Converts a local wall-clock time at `place` to a UTC instant, plus the offset used (minutes). */
export function localToUtc(
  place: Place,
  y: number, m: number, d: number, hh: number, mm: number,
): { utcMs: number; offsetMin: number } {
  const wall = Date.UTC(y, m - 1, d, hh, mm);
  if (!place.zone) {
    const offsetMin = Math.round((place.offset ?? 0) * 60);
    return { utcMs: wall - offsetMin * 60000, offsetMin };
  }
  // Two passes handle offset changes (DST) near the instant.
  let offsetMin = zoneOffsetMinutes(place.zone, wall);
  offsetMin = zoneOffsetMinutes(place.zone, wall - offsetMin * 60000);
  return { utcMs: wall - offsetMin * 60000, offsetMin };
}
