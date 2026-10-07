// Modern Korean given names (popular in birth registrations of the 2010s–2020s) with common hanja spellings.
// Characters carry the Korean gloss (훈), Hán-Việt reading and meaning tags used to link them to Vietnamese names.

export type Tag =
  | 'bright' | 'beauty' | 'jewel' | 'flower' | 'wisdom' | 'virtue' | 'luck' | 'water' | 'sky' | 'peace'
  | 'strong' | 'great' | 'joy' | 'art' | 'grace' | 'excellent' | 'wealth' | 'long' | 'season' | 'start' | 'pure';

export interface KoChar {
  /** Korean reading (original, before 두음법칙) */
  ko: string;
  /** Korean gloss, e.g. 상서 for 瑞 (상서 서) */
  hun: string;
  /** Hán-Việt reading */
  vi: string;
  /** Vietnamese meaning */
  mVi: string;
  tags: Tag[];
}

const C = (ko: string, hun: string, vi: string, mVi: string, ...tags: Tag[]): KoChar => ({ ko, hun, vi, mVi, tags });

export const KO_CHARS: Record<string, KoChar> = {
  瑞: C('서', '상서로울', 'Thụy', 'điềm lành', 'luck'),
  書: C('서', '글', 'Thư', 'sách, chữ nghĩa', 'wisdom', 'art'),
  舒: C('서', '펼', 'Thư', 'thư thái', 'peace'),
  妍: C('연', '고울', 'Nghiên', 'xinh đẹp', 'beauty'),
  娟: C('연', '예쁠', 'Quyên', 'xinh xắn', 'beauty'),
  延: C('연', '늘일', 'Diên', 'kéo dài', 'long'),
  潤: C('윤', '윤택할', 'Nhuận', 'tươi nhuận', 'water', 'grace'),
  允: C('윤', '진실로', 'Doãn', 'chân thành', 'virtue'),
  雅: C('아', '맑을', 'Nhã', 'thanh nhã', 'grace'),
  娥: C('아', '예쁠', 'Nga', 'xinh đẹp (Hằng Nga)', 'beauty', 'sky'),
  河: C('하', '물', 'Hà', 'sông', 'water'),
  夏: C('하', '여름', 'Hạ', 'mùa hè', 'season'),
  霞: C('하', '노을', 'Hà', 'ráng chiều', 'sky', 'beauty'),
  恩: C('은', '은혜', 'Ân', 'ân huệ', 'grace', 'virtue'),
  銀: C('은', '은', 'Ngân', 'bạc', 'jewel', 'wealth'),
  智: C('지', '슬기', 'Trí', 'trí tuệ', 'wisdom'),
  知: C('지', '알', 'Tri', 'hiểu biết', 'wisdom'),
  志: C('지', '뜻', 'Chí', 'ý chí', 'strong'),
  芝: C('지', '지초', 'Chi', 'cỏ chi, linh chi', 'flower'),
  安: C('안', '편안할', 'An', 'bình an', 'peace'),
  宇: C('우', '집', 'Vũ', 'vũ trụ', 'sky', 'great'),
  佑: C('우', '도울', 'Hựu', 'giúp đỡ', 'virtue', 'luck'),
  祐: C('우', '복', 'Hựu', 'phúc lành', 'luck'),
  雨: C('우', '비', 'Vũ', 'mưa', 'water'),
  友: C('우', '벗', 'Hữu', 'bạn bè', 'virtue'),
  璘: C('린', '옥빛', 'Lân', 'ánh ngọc', 'jewel', 'bright'),
  麟: C('린', '기린', 'Lân', 'kỳ lân', 'luck'),
  秀: C('수', '빼어날', 'Tú', 'ưu tú', 'excellent', 'beauty'),
  洙: C('수', '물가', 'Thù', 'bờ sông', 'water'),
  守: C('수', '지킬', 'Thủ', 'giữ gìn', 'strong'),
  裕: C('유', '넉넉할', 'Dụ', 'sung túc', 'wealth'),
  柔: C('유', '부드러울', 'Nhu', 'dịu dàng', 'grace'),
  維: C('유', '벼리', 'Duy', 'giữ gìn, nối kết', 'virtue'),
  時: C('시', '때', 'Thời', 'thời gian, thời cơ', 'luck'),
  始: C('시', '비로소', 'Thủy', 'khởi đầu', 'start'),
  施: C('시', '베풀', 'Thi', 'ban phát', 'virtue'),
  詩: C('시', '시', 'Thi', 'thơ ca', 'art'),
  彩: C('채', '채색', 'Thái', 'sắc màu', 'art', 'beauty'),
  媛: C('원', '미인', 'Viện', 'người con gái đẹp', 'beauty'),
  苑: C('원', '나라 동산', 'Uyển', 'vườn hoa', 'flower'),
  元: C('원', '으뜸', 'Nguyên', 'đứng đầu', 'great', 'start'),
  源: C('원', '근원', 'Nguyên', 'cội nguồn', 'water', 'start'),
  娜: C('나', '아리따울', 'Na', 'yểu điệu', 'beauty', 'grace'),
  多: C('다', '많을', 'Đa', 'nhiều', 'wealth'),
  藝: C('예', '재주', 'Nghệ', 'nghệ thuật', 'art'),
  睿: C('예', '슬기', 'Duệ', 'sáng suốt', 'wisdom'),
  昭: C('소', '밝을', 'Chiêu', 'sáng tỏ', 'bright'),
  素: C('소', '흴', 'Tố', 'trong trắng', 'pure'),
  律: C('률', '법칙', 'Luật', 'giai điệu, luật', 'art'),
  怡: C('이', '기쁠', 'Di', 'vui vẻ', 'joy'),
  理: C('리', '다스릴', 'Lý', 'lẽ phải', 'wisdom'),
  利: C('리', '이로울', 'Lợi', 'lợi ích', 'wealth'),
  彬: C('빈', '빛날', 'Bân', 'văn võ song toàn', 'excellent'),
  敏: C('민', '민첩할', 'Mẫn', 'nhanh nhẹn', 'wisdom'),
  旼: C('민', '화할', 'Mân', 'hòa nhã', 'peace', 'grace'),
  仁: C('인', '어질', 'Nhân', 'nhân từ', 'virtue'),
  賢: C('현', '어질', 'Hiền', 'hiền tài', 'virtue', 'wisdom'),
  炫: C('현', '밝을', 'Huyễn', 'sáng rực', 'bright'),
  珍: C('진', '보배', 'Trân', 'quý báu', 'jewel'),
  眞: C('진', '참', 'Chân', 'chân thật', 'virtue', 'pure'),
  進: C('진', '나아갈', 'Tiến', 'tiến lên', 'great'),
  美: C('미', '아름다울', 'Mỹ', 'đẹp', 'beauty'),
  世: C('세', '인간', 'Thế', 'thế gian', 'great'),
  羅: C('라', '비단', 'La', 'lụa là', 'beauty'),
  瑛: C('영', '옥빛', 'Anh', 'ánh ngọc', 'jewel', 'bright'),
  映: C('영', '비칠', 'Ánh', 'chiếu sáng', 'bright'),
  榮: C('영', '영화', 'Vinh', 'vinh quang', 'great'),
  海: C('해', '바다', 'Hải', 'biển', 'water', 'great'),
  熙: C('희', '빛날', 'Hy', 'sáng sủa', 'bright'),
  喜: C('희', '기쁠', 'Hỷ', 'vui mừng', 'joy'),
  姬: C('희', '아가씨', 'Cơ', 'người con gái đẹp', 'beauty'),
  曉: C('효', '새벽', 'Hiểu', 'bình minh', 'bright', 'start'),
  孝: C('효', '효도', 'Hiếu', 'hiếu thảo', 'virtue'),
  慧: C('혜', '슬기로울', 'Tuệ', 'trí tuệ', 'wisdom'),
  惠: C('혜', '은혜', 'Huệ', 'ân huệ', 'grace', 'virtue'),
  佳: C('가', '아름다울', 'Giai', 'tốt đẹp', 'beauty'),
  嘉: C('가', '아름다울', 'Gia', 'tốt lành', 'beauty', 'luck'),
  珠: C('주', '구슬', 'Châu', 'ngọc trai', 'jewel'),
  宙: C('주', '집', 'Trụ', 'vũ trụ', 'sky', 'great'),
  柱: C('주', '기둥', 'Trụ', 'cột trụ', 'strong'),
  周: C('주', '두루', 'Chu', 'chu toàn', 'virtue'),
  俊: C('준', '준걸', 'Tuấn', 'tuấn tú', 'excellent'),
  準: C('준', '준할', 'Chuẩn', 'chuẩn mực', 'virtue'),
  濬: C('준', '깊을', 'Tuấn', 'sâu sắc', 'water', 'wisdom'),
  道: C('도', '길', 'Đạo', 'đạo lý', 'wisdom', 'virtue'),
  濤: C('도', '물결', 'Đào', 'sóng lớn', 'water', 'strong'),
  浩: C('호', '넓을', 'Hạo', 'rộng lớn', 'water', 'great'),
  昊: C('호', '하늘', 'Hạo', 'bầu trời', 'sky', 'great'),
  建: C('건', '세울', 'Kiến', 'xây dựng', 'strong', 'great'),
  健: C('건', '굳셀', 'Kiện', 'khỏe mạnh', 'strong'),
  厚: C('후', '두터울', 'Hậu', 'dày dặn, phúc hậu', 'virtue'),
  正: C('정', '바를', 'Chính', 'ngay thẳng', 'virtue'),
  承: C('승', '이을', 'Thừa', 'kế thừa', 'virtue'),
  勝: C('승', '이길', 'Thắng', 'chiến thắng', 'strong'),
  昇: C('승', '오를', 'Thăng', 'thăng tiến', 'great', 'bright'),
  善: C('선', '착할', 'Thiện', 'thiện lương', 'virtue'),
  宣: C('선', '베풀', 'Tuyên', 'tuyên dương', 'great'),
  勳: C('훈', '공', 'Huân', 'công lao', 'great', 'strong'),
  材: C('재', '재목', 'Tài', 'nhân tài', 'excellent'),
  才: C('재', '재주', 'Tài', 'tài năng', 'excellent'),
  泰: C('태', '클', 'Thái', 'thái bình, to lớn', 'peace', 'great'),
  太: C('태', '클', 'Thái', 'to lớn', 'great'),
  晟: C('성', '밝을', 'Thịnh', 'sáng, thịnh vượng', 'bright', 'wealth'),
  成: C('성', '이룰', 'Thành', 'thành công', 'great'),
  誠: C('성', '정성', 'Thành', 'chân thành', 'virtue'),
  東: C('동', '동녘', 'Đông', 'phương đông', 'start'),
  棟: C('동', '마룻대', 'Đống', 'rường cột', 'strong'),
  尙: C('상', '숭상할', 'Thượng', 'tôn quý', 'virtue'),
  祥: C('상', '상서', 'Tường', 'điềm lành', 'luck'),
  燦: C('찬', '빛날', 'Xán', 'rực rỡ', 'bright'),
  贊: C('찬', '도울', 'Tán', 'tán trợ, giúp đỡ', 'virtue'),
  翰: C('한', '깃', 'Hàn', 'văn chương', 'art', 'wisdom'),
  韓: C('한', '나라', 'Hàn', 'Hàn Quốc', 'great'),
  奎: C('규', '별', 'Khuê', 'sao Khuê (văn chương)', 'sky', 'wisdom'),
  圭: C('규', '홀', 'Khuê', 'ngọc khuê', 'jewel'),
  陽: C('양', '볕', 'Dương', 'mặt trời', 'bright', 'sky'),
};

export type Gender = 'f' | 'm' | 'u';

export interface KoName {
  /** Two Hangul syllables as written in the name */
  name: string;
  g: Gender;
  /** Hanja spellings, most common first */
  hanja: string[];
}

const N = (name: string, g: Gender, ...hanja: string[]): KoName => ({ name, g, hanja });

/** Ordered roughly by popularity within each gender. */
export const KO_NAMES: KoName[] = [
  N('서아', 'f', '瑞雅', '舒雅'), N('하윤', 'f', '河潤', '夏允'), N('지안', 'u', '智安', '知安'), N('서윤', 'f', '瑞潤', '書允'),
  N('하은', 'f', '夏恩', '河恩'), N('아윤', 'f', '雅潤', '娥允'), N('지우', 'u', '智雨', '知祐'), N('하린', 'f', '夏璘', '河麟'),
  N('서연', 'f', '瑞妍', '書娟'), N('수아', 'f', '秀雅', '洙娥'), N('지유', 'f', '智裕', '知柔'), N('시아', 'f', '施雅', '詩雅'),
  N('아린', 'f', '雅璘', '娥麟'), N('서하', 'f', '瑞夏', '舒霞'), N('채원', 'f', '彩媛', '彩苑'), N('유나', 'f', '裕娜', '柔娜'),
  N('지아', 'f', '智雅', '芝娥'), N('윤서', 'u', '潤瑞', '允書'), N('다은', 'f', '多恩', '多銀'), N('예린', 'f', '藝璘', '睿麟'),
  N('소율', 'f', '昭律', '素律'), N('이서', 'f', '怡瑞', '怡書'), N('하율', 'f', '夏律', '河律'), N('나은', 'f', '娜恩', '娜銀'),
  N('민서', 'f', '敏瑞', '旼書'), N('서은', 'f', '瑞恩', '書銀'), N('수빈', 'u', '秀彬', '洙彬'), N('예은', 'f', '藝恩', '睿恩'),
  N('지민', 'u', '智敏', '知旼'), N('채은', 'f', '彩恩', '彩銀'), N('가은', 'f', '佳恩', '嘉銀'), N('은서', 'f', '恩瑞', '銀書'),
  N('다인', 'f', '多仁'), N('예서', 'f', '藝瑞', '睿書'), N('유진', 'u', '裕珍', '柔眞'), N('하연', 'f', '夏妍', '河娟'),
  N('소윤', 'f', '昭潤', '素允'), N('지원', 'u', '智媛', '知苑'), N('서현', 'f', '瑞賢', '書炫'), N('민지', 'f', '敏智', '旼芝'),
  N('지수', 'u', '智秀', '知洙'), N('수연', 'f', '秀妍', '洙娟'), N('예나', 'f', '藝娜', '睿娜'), N('미나', 'f', '美娜'),
  N('하나', 'f', '夏娜', '河娜'), N('유리', 'f', '裕理', '柔理'), N('소은', 'f', '昭恩', '素銀'), N('은채', 'f', '恩彩', '銀彩'),
  N('다연', 'f', '多妍', '多娟'), N('수민', 'u', '秀敏', '洙旼'), N('혜인', 'f', '慧仁', '惠仁'), N('나연', 'f', '娜妍', '娜延'),
  N('지현', 'u', '智賢', '知炫'), N('아라', 'f', '雅羅', '娥羅'), N('세아', 'f', '世雅', '世娥'), N('예원', 'f', '藝媛', '睿苑'),
  N('다현', 'f', '多賢', '多炫'), N('하영', 'f', '夏瑛', '河映'), N('수현', 'u', '秀賢', '洙炫'), N('은지', 'f', '恩智', '銀芝'),
  N('해린', 'f', '海璘', '海麟'), N('가윤', 'f', '佳潤', '嘉允'), N('희원', 'f', '熙媛', '喜苑'), N('효원', 'f', '曉媛', '孝苑'),
  N('민아', 'f', '敏雅', '旼娥'), N('주아', 'f', '珠雅', '宙娥'), N('혜원', 'f', '慧媛', '惠苑'), N('소희', 'f', '昭熙', '素姬'),
  N('지혜', 'f', '智慧'),
  N('이준', 'm', '理俊', '利準'), N('도윤', 'm', '道潤', '濤允'), N('하준', 'm', '夏俊', '河準'), N('서준', 'm', '瑞俊', '書準'),
  N('시우', 'm', '時宇', '始佑'), N('은우', 'm', '恩宇', '恩佑'), N('지호', 'm', '智浩', '知昊'), N('예준', 'm', '藝俊', '睿濬'),
  N('유준', 'm', '裕俊', '維準'), N('수호', 'm', '秀浩', '守昊'), N('도현', 'm', '道賢', '濤炫'), N('건우', 'm', '建宇', '健佑'),
  N('우진', 'm', '宇眞', '佑進'), N('선우', 'u', '善宇', '宣佑'), N('지후', 'm', '智厚', '志厚'), N('민준', 'm', '敏俊', '旼濬'),
  N('준우', 'm', '俊宇', '準佑'), N('연우', 'u', '延宇', '延祐'), N('이안', 'u', '怡安', '理安'), N('시윤', 'm', '時潤', '始允'),
  N('주원', 'm', '柱元', '周源'), N('은호', 'm', '恩浩', '銀昊'), N('현우', 'm', '賢宇', '炫佑'), N('승우', 'm', '承宇', '勝佑'),
  N('지훈', 'm', '智勳', '志勳'), N('정우', 'm', '正宇', '正佑'), N('준서', 'm', '俊瑞', '準書'), N('유찬', 'm', '裕燦', '維贊'),
  N('윤호', 'm', '潤浩', '允昊'), N('민재', 'm', '敏材', '旼才'), N('태윤', 'm', '泰潤', '太允'), N('시후', 'm', '時厚', '始厚'),
  N('도하', 'm', '道夏', '濤河'), N('민성', 'm', '敏晟', '旼成'), N('태민', 'm', '泰旼', '太敏'), N('동현', 'm', '東賢', '棟炫'),
  N('성민', 'm', '晟敏', '成旼'), N('재윤', 'm', '材潤', '才允'), N('승민', 'm', '承敏', '勝旼'), N('진우', 'm', '珍宇', '進佑'),
  N('민호', 'm', '敏浩', '旼昊'), N('준호', 'm', '俊浩', '濬昊'), N('현준', 'm', '賢俊', '炫準'), N('성현', 'm', '晟賢', '誠炫'),
  N('지성', 'm', '智晟', '志誠'), N('태현', 'm', '泰賢', '太炫'), N('재민', 'm', '材敏', '才旼'), N('우빈', 'm', '宇彬', '佑彬'),
  N('시현', 'u', '時賢', '始炫'), N('준영', 'm', '俊榮', '濬映'), N('상우', 'm', '尙宇', '祥佑'), N('은찬', 'm', '恩燦', '恩贊'),
  N('예찬', 'm', '藝燦', '睿贊'), N('지한', 'm', '智翰', '志韓'), N('서우', 'u', '瑞宇', '書佑'), N('건희', 'm', '建熙', '健喜'),
  N('규민', 'm', '奎敏', '圭旼'), N('태양', 'm', '太陽', '泰陽'), N('승현', 'm', '承賢', '昇炫'), N('주호', 'm', '宙浩', '柱昊'),
  N('선호', 'm', '善浩', '宣昊'), N('윤우', 'm', '潤宇', '允佑'), N('도훈', 'm', '道勳'), N('시훈', 'm', '時勳'),
];

/** Meaning tags of common Vietnamese given-name syllables (tone marks kept). */
export const VI_TAGS: Record<string, Tag[]> = {
  minh: ['bright', 'wisdom'], quang: ['bright'], huy: ['bright'], 'ánh': ['bright'], 'nhật': ['bright', 'sky'], 'dương': ['bright', 'sky'],
  'hiển': ['bright', 'great'], 'chiêu': ['bright'], 'hy': ['bright', 'joy'], 'thần': ['bright'],
  anh: ['excellent', 'flower'], 'tú': ['excellent', 'beauty'], 'tuấn': ['excellent'], 'kiệt': ['excellent'], 'khôi': ['excellent'], 'tài': ['excellent'],
  'ngọc': ['jewel'], 'châu': ['jewel'], 'trân': ['jewel'], 'bích': ['jewel'], 'ngân': ['jewel', 'wealth'], kim: ['jewel', 'wealth'], 'bảo': ['jewel'],
  'quỳnh': ['jewel', 'flower'], linh: ['jewel', 'luck'], 'lâm': ['strong'],
  hoa: ['flower', 'beauty'], lan: ['flower', 'grace'], mai: ['flower'], 'cúc': ['flower'], 'đào': ['flower', 'beauty'], 'liên': ['flower', 'pure'],
  'huệ': ['flower', 'grace'], 'hương': ['flower'], sen: ['flower', 'pure'], 'hồng': ['flower'], 'phương': ['flower', 'beauty'], 'thảo': ['flower', 'virtue'],
  'trí': ['wisdom'], 'tuệ': ['wisdom'], 'thông': ['wisdom'], khoa: ['wisdom'], 'triết': ['wisdom'], 'mẫn': ['wisdom'], 'duệ': ['wisdom'],
  'hiền': ['virtue', 'grace'], 'nhân': ['virtue'], 'nghĩa': ['virtue'], 'đức': ['virtue'], 'thiện': ['virtue'], 'hiếu': ['virtue'],
  trung: ['virtue'], 'tín': ['virtue'], 'thục': ['virtue', 'grace'], trinh: ['virtue', 'pure'], 'tâm': ['virtue', 'peace'],
  'phúc': ['luck'], 'phước': ['luck'], 'lộc': ['luck', 'wealth'], 'tường': ['luck'], 'cát': ['luck'], 'khánh': ['luck', 'joy'], 'hạnh': ['luck', 'joy'],
  'thụy': ['luck'], 'thủy': ['water'],
  'hà': ['water'], giang: ['water'], 'hải': ['water', 'great'], 'tuyền': ['water'], 'uyên': ['water', 'wisdom'],
  'vân': ['sky'], 'thiên': ['sky', 'great'], 'nguyệt': ['sky', 'bright'], 'hằng': ['sky', 'beauty'], 'tuyết': ['pure'], 'băng': ['pure'],
  an: ['peace'], 'bình': ['peace'], 'yên': ['peace'], 'hòa': ['peace'], 'ninh': ['peace'], 'thái': ['peace', 'great'], khang: ['peace', 'strong'], 'nhàn': ['peace'],
  'hùng': ['strong'], 'cường': ['strong'], 'dũng': ['strong'], 'mạnh': ['strong'], 'kiên': ['strong'], 'thắng': ['strong'], 'lực': ['strong'],
  phong: ['strong'], long: ['strong', 'luck'], 'sơn': ['strong'], 'vũ': ['strong', 'sky'], 'võ': ['strong'],
  vinh: ['great'], 'quốc': ['great'], 'hưng': ['great', 'wealth'], 'thịnh': ['great', 'wealth'], 'đạt': ['great'], 'thành': ['great', 'virtue'],
  'toàn': ['great'], 'vĩ': ['great'], 'quân': ['great'], 'nguyên': ['start', 'great'],
  vy: ['beauty', 'flower'], vi: ['beauty', 'flower'], 'mỹ': ['beauty'], my: ['beauty'], nga: ['beauty', 'sky'], 'kiều': ['beauty'], 'diễm': ['beauty'],
  trang: ['beauty', 'grace'], 'xuân': ['season', 'joy'], thu: ['season'], 'hạ': ['season'], 'đông': ['season', 'start'],
  'hân': ['joy'], 'lạc': ['joy'], 'duyên': ['grace'], 'nhã': ['grace'], dung: ['grace', 'beauty'], 'uyển': ['grace'], 'như': ['grace'],
  nhi: ['grace'], 'thơ': ['art'], 'thư': ['art', 'wisdom'], 'văn': ['art'], 'cầm': ['art'], 'thùy': ['grace'], nhung: ['grace'],
  'yến': ['joy'], oanh: ['art', 'joy'], 'trâm': ['grace'], 'quyên': ['beauty'], ly: ['pure'], 'hoài': ['long'], 'vĩnh': ['long'],
  'trường': ['long'], gia: ['wealth', 'peace'], 'khải': ['great', 'joy'], 'phát': ['wealth'], 'tiến': ['great'], 'mây': ['sky'],
};
