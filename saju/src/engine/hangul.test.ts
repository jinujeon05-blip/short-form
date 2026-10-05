import { describe, expect, it } from 'vitest';
import { vietnameseToHangul } from './hangul';

const h = (s: string) => vietnameseToHangul(s).hangul;

describe('Vietnamese → Hangul (NIKL rules)', () => {
  it('common surnames', () => {
    expect(h('Nguyễn Trần Lê Phạm Hoàng Huỳnh Phan Vũ Võ Đặng Bùi Đỗ Hồ Ngô Dương Lý')).toBe(
      '응우옌 쩐 레 팜 호앙 후인 판 부 보 당 부이 도 호 응오 즈엉 리',
    );
  });
  it('given names', () => {
    expect(h('Nguyễn Thị Lan')).toBe('응우옌 티 란');
    expect(h('Trần Văn Minh')).toBe('쩐 반 민');
    expect(h('Thanh Hương')).toBe('타인 흐엉');
    expect(h('Ngọc Anh')).toBe('응옥 아인');
    expect(h('Tuấn Phát Việt Nhật Tết')).toBe('뚜언 팟 비엣 녓 뗏');
    expect(h('Xuân Thủy Giang Khoa Phúc')).toBe('쑤언 투이 장 코아 푹');
  });
  it('place names', () => {
    expect(h('Quảng Ninh')).toBe('꽝 닌');
    expect(h('Quy Nhơn')).toBe('꾸이 년');
    expect(h('Phú Quốc')).toBe('푸 꾸옥');
    expect(h('Cần Thơ')).toBe('껀 터');
    expect(h('Vũng Tàu')).toBe('붕 따우');
    expect(h('Điện Biên Phủ')).toBe('디엔 비엔 푸');
    expect(vietnameseToHangul('Hồ Chí Minh').custom).toBe('호찌민');
  });
  it('flags non-Vietnamese tokens', () => {
    expect(vietnameseToHangul('Lan 123').unknown).toEqual(['123']);
  });
});
