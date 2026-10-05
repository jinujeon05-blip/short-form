// Hanja shared by Korean and Vietnamese (Hán-Việt) names.
// Format per line: hanja|Korean reading (original, before 두음법칙)|Hán-Việt reading|뜻|nghĩa|role
// role: s = surname, g = given name, sg = both.

const RAW = `
阮|완|Nguyễn|완(성씨)|họ Nguyễn|s
陳|진|Trần|베풀다|bày, xưa|sg
黎|려|Lê|검다·많은 사람|đen, đông đúc|s
范|범|Phạm|본보기|khuôn phép|s
黃|황|Hoàng|누렇다|vàng|sg
黃|황|Huỳnh|누렇다|vàng|s
潘|반|Phan|물 이름|họ Phan|s
武|무|Vũ|굳세다|võ, mạnh mẽ|sg
武|무|Võ|굳세다|võ, mạnh mẽ|s
鄧|등|Đặng|나라 이름|họ Đặng|s
裴|배|Bùi|옷이 치렁하다|họ Bùi|s
杜|두|Đỗ|팥배나무|cây đỗ|s
胡|호|Hồ|오랑캐·어찌|họ Hồ|s
吳|오|Ngô|나라 이름|họ Ngô|s
楊|양|Dương|버드나무|cây dương liễu|sg
李|리|Lý|오얏나무|cây mận|s
丁|정|Đinh|장정|người trưởng thành|s
鄭|정|Trịnh|나라 이름|họ Trịnh|s
段|단|Đoàn|층계|đoạn|s
林|림|Lâm|수풀|rừng|sg
梅|매|Mai|매화|hoa mai|sg
張|장|Trương|베풀다|giương, mở|s
高|고|Cao|높다|cao|sg
梁|량|Lương|들보|xà nhà|s
蘇|소|Tô|되살아나다|sống lại|s
何|하|Hà|어찌|họ Hà|s
謝|사|Tạ|감사하다|cảm tạ|s
郭|곽|Quách|성곽|thành ngoài|s
蔡|채|Thái|나라 이름|họ Thái|s
周|주|Châu|두루|khắp, chu toàn|s
周|주|Chu|두루|khắp, chu toàn|sg
劉|류|Lưu|죽이다·성씨|họ Lưu|s
金|김|Kim|쇠·금|vàng, kim loại|s
趙|조|Triệu|나라 이름|họ Triệu|s
孫|손|Tôn|손자|cháu|s
王|왕|Vương|임금|vua|sg
許|허|Hứa|허락하다|cho phép|s
馮|풍|Phùng|성씨|họ Phùng|s
莫|막|Mạc|없다|chớ, không|s
曾|증|Tăng|일찍|từng|s
陸|륙|Lục|뭍|đất liền|s
喬|교|Kiều|높다|cao|sg
陶|도|Đào|질그릇|đồ gốm|s
嚴|엄|Nghiêm|엄하다|nghiêm|s
尹|윤|Doãn|다스리다|cai quản|s
申|신|Thân|펴다|duỗi, trình bày|s
羅|라|La|벌이다|lưới, bày ra|s
葉|엽|Diệp|잎|lá|sg
呂|려|Lữ|음률|họ Lữ|s
呂|려|Lã|음률|họ Lã|s
徐|서|Từ|천천히|thong thả|s
石|석|Thạch|돌|đá|sg
朱|주|Chu|붉다|đỏ thắm|s
姜|강|Khương|성씨|họ Khương|s
蕭|소|Tiêu|쑥|cỏ ngải|s
白|백|Bạch|희다|trắng|sg
關|관|Quan|관문|cửa ải|s
韓|한|Hàn|나라 이름|nước Hàn|sg
侯|후|Hầu|제후|tước hầu|s
袁|원|Viên|옷이 길다|họ Viên|s
顏|안|Nhan|얼굴|dung nhan|s
閔|민|Mẫn|성씨·근심하다|họ Mẫn|s
文|문|Văn|글월|văn chương|sg
甘|감|Cam|달다|ngọt|s
康|강|Khang|편안하다|khỏe mạnh, yên vui|sg
朴|박|Phác|순박하다|chất phác|s
崔|최|Thôi|높다|cao vút|s
權|권|Quyền|권세|quyền|s
安|안|An|편안하다|bình an|sg
宋|송|Tống|나라 이름|nhà Tống|s
柳|류|Liễu|버들|cây liễu|s
兪|유|Du|대답하다|họ Du|s
全|전|Toàn|온전하다|toàn vẹn|sg
田|전|Điền|밭|ruộng|s
洪|홍|Hồng|넓다·큰물|nước lớn|s
南|남|Nam|남녘|phương nam|sg
沈|심|Thẩm|가라앉다|họ Thẩm|s
盧|로|Lư|밥그릇|họ Lư|s
河|하|Hà|강|sông|sg
成|성|Thành|이루다|thành công|sg
車|차|Xa|수레|xe|s
禹|우|Vũ|하우씨|vua Vũ|s
具|구|Cụ|갖추다|đầy đủ|s
池|지|Trì|못|ao|s
卞|변|Biện|성씨|họ Biện|s
元|원|Nguyên|으뜸|đầu tiên|sg
千|천|Thiên|일천|nghìn|s
方|방|Phương|모·방향|phương hướng|sg
孔|공|Khổng|구멍|họ Khổng|s
玄|현|Huyền|검다·오묘하다|huyền diệu|sg
咸|함|Hàm|다·모두|đều, tất cả|s
廉|렴|Liêm|청렴하다|liêm khiết|s
秋|추|Thu|가을|mùa thu|sg
都|도|Đô|도읍|kinh đô|s
薛|설|Tiết|성씨|họ Tiết|s
馬|마|Mã|말|ngựa|s
吉|길|Cát|길하다|tốt lành|sg
魏|위|Ngụy|나라 이름|nước Ngụy|s
延|연|Diên|늘이다|kéo dài|sg
表|표|Biểu|겉|bên ngoài|s
明|명|Minh|밝다|sáng|sg
奇|기|Kỳ|기이하다|kỳ lạ|sg
琴|금|Cầm|거문고|đàn|s
玉|옥|Ngọc|구슬|ngọc|sg
印|인|Ấn|도장|con dấu|s
孟|맹|Mạnh|맏이|anh cả|sg
卓|탁|Trác|높다|cao vượt|s
魚|어|Ngư|물고기|cá|s
殷|은|Ân|성하다|thịnh|s
龍|룡|Long|용|rồng|sg
南宮|남궁|Nam Cung|남궁(복성)|họ Nam Cung|s
諸葛|제갈|Gia Cát|제갈(복성)|họ Gia Cát|s
鮮于|선우|Tiên Vu|선우(복성)|họ Tiên Vu|s
皇甫|황보|Hoàng Phủ|황보(복성)|họ Hoàng Phủ|s
獨孤|독고|Độc Cô|독고(복성)|họ Độc Cô|s
司空|사공|Tư Không|사공(복성)|họ Tư Không|s
氏|씨|Thị|성씨(여성 중간 이름)|tên đệm nữ|g
英|영|Anh|꽃부리·뛰어나다|anh tài, tinh hoa|g
映|영|Ánh|비치다|ánh sáng chiếu|g
寶|보|Bảo|보배|báu vật|g
保|보|Bảo|지키다|bảo vệ|g
平|평|Bình|평평하다|bình yên|g
珠|주|Châu|구슬|ngọc trai|g
芝|지|Chi|지초|cỏ chi thơm|g
枝|지|Chi|가지|cành|g
強|강|Cường|굳세다|mạnh mẽ|g
勇|용|Dũng|날래다|dũng cảm|g
容|용|Dung|얼굴·받아들이다|dung mạo, bao dung|g
維|유|Duy|벼리|giữ gìn|g
陽|양|Dương|볕|ánh mặt trời|g
達|달|Đạt|통달하다|thành đạt|g
德|덕|Đức|덕|đức hạnh|g
江|강|Giang|강|sông|g
霞|하|Hà|노을|ráng chiều|g
海|해|Hải|바다|biển|g
幸|행|Hạnh|다행|hạnh phúc|g
杏|행|Hạnh|살구|hoa mơ|g
恆|항|Hằng|항상|bền lâu|g
姮|항|Hằng|항아(달의 선녀)|chị Hằng|g
孝|효|Hiếu|효도|hiếu thảo|g
賢|현|Hiền|어질다|hiền tài|g
和|화|Hòa|화목하다|hòa thuận|g
花|화|Hoa|꽃|hoa|g
華|화|Hoa|빛나다|lộng lẫy|g
皇|황|Hoàng|임금|hoàng đế|g
雄|웅|Hùng|수컷·뛰어나다|anh hùng|g
興|흥|Hưng|일으키다|hưng thịnh|g
香|향|Hương|향기|hương thơm|g
輝|휘|Huy|빛나다|rực rỡ|g
慶|경|Khánh|경사|vui mừng|g
科|과|Khoa|과목|khoa bảng|g
魁|괴|Khôi|으뜸|đứng đầu|g
堅|견|Kiên|굳다|kiên định|g
金|금|Kim|쇠·금|vàng|g
蘭|란|Lan|난초|hoa lan|g
靈|령|Linh|신령|linh thiêng|g
玲|령|Linh|옥 소리|tiếng ngọc|g
美|미|Mỹ|아름답다|đẹp|g
美|미|My|아름답다|đẹp|g
嵋|미|My|산 이름|núi Nga Mi|g
仁|인|Nhân|어질다|nhân ái|g
兒|아|Nhi|아이|đứa trẻ|g
絨|융|Nhung|가는 베|nhung mềm|g
風|풍|Phong|바람|gió|g
峰|봉|Phong|봉우리|đỉnh núi|g
福|복|Phúc|복|phúc lành|g
芳|방|Phương|꽃답다|hương thơm|g
光|광|Quang|빛|ánh sáng|g
君|군|Quân|임금|bậc quân tử|g
軍|군|Quân|군사|quân đội|g
瓊|경|Quỳnh|옥|ngọc quỳnh|g
山|산|Sơn|산|núi|g
心|심|Tâm|마음|tâm hồn|g
新|신|Tân|새롭다|mới|g
清|청|Thanh|맑다|trong sạch|g
青|청|Thanh|푸르다|xanh|g
城|성|Thành|성|thành trì|g
草|초|Thảo|풀|cỏ|g
勝|승|Thắng|이기다|chiến thắng|g
盛|성|Thịnh|성하다|thịnh vượng|g
水|수|Thủy|물|nước|g
翠|취|Thúy|푸르다|xanh biếc|g
進|진|Tiến|나아가다|tiến lên|g
莊|장|Trang|씩씩하다·단정하다|trang nghiêm|g
妝|장|Trang|단장하다|trang điểm|g
智|지|Trí|슬기|trí tuệ|g
忠|충|Trung|충성|trung thành|g
中|중|Trung|가운데|ở giữa|g
秀|수|Tú|빼어나다|tuấn tú|g
俊|준|Tuấn|준걸|tuấn kiệt|g
浚|준|Tuấn|깊게 하다|khơi sâu|g
松|송|Tùng|소나무|cây tùng|g
淵|연|Uyên|못·깊다|sâu thẳm|g
鴛|원|Uyên|원앙|chim uyên ương|g
雲|운|Vân|구름|mây|g
越|월|Việt|넘다|vượt qua|g
榮|영|Vinh|영화|vinh quang|g
薇|미|Vy|장미|hoa vi|g
薇|미|Vi|장미|hoa vi|g
韋|위|Vy|가죽|họ Vi|g
春|춘|Xuân|봄|mùa xuân|g
燕|연|Yến|제비|chim yến|g
厚|후|Hậu|두텁다|nhân hậu|g
顯|현|Hiển|나타나다|hiển vinh|g
懷|회|Hoài|품다|hoài bão|g
紅|홍|Hồng|붉다|đỏ|g
鴻|홍|Hồng|큰 기러기|chim hồng|g
凱|개|Khải|개선하다|khải hoàn|g
祿|록|Lộc|녹봉·복|lộc|g
倫|륜|Luân|인륜|luân thường|g
娥|아|Nga|예쁘다|người đẹp|g
義|의|Nghĩa|옳다|nghĩa khí|g
原|원|Nguyên|근원|nguồn gốc|g
日|일|Nhật|해·날|mặt trời|g
如|여|Như|같다|như ý|g
鶯|앵|Oanh|꾀꼬리|chim oanh|g
發|발|Phát|피다·일으키다|phát đạt|g
鳳|봉|Phượng|봉황|chim phượng|g
國|국|Quốc|나라|đất nước|g
貴|귀|Quý|귀하다|quý giá|g
才|재|Tài|재주|tài năng|g
財|재|Tài|재물|tiền tài|g
泰|태|Thái|크다·편안하다|thái bình|g
善|선|Thiện|착하다|lương thiện|g
聰|총|Thông|총명하다|thông minh|g
書|서|Thư|글|sách|g
舒|서|Thư|펴다|thư thái|g
信|신|Tín|믿다|chữ tín|g
簪|잠|Trâm|비녀|cây trâm|g
哲|철|Triết|밝다|triết lý|g
重|중|Trọng|무겁다|coi trọng|g
祥|상|Tường|상서롭다|cát tường|g
威|위|Uy|위엄|uy nghiêm|g
雨|우|Vũ|비|mưa|g
宇|우|Vũ|집·우주|vũ trụ|g
世|세|Thế|세상|thế gian|g
伯|백|Bá|맏이|bậc trưởng|g
功|공|Công|공로|công lao|g
戰|전|Chiến|싸우다|chiến đấu|g
定|정|Định|정하다|ổn định|g
廷|정|Đình|조정|triều đình|g
有|유|Hữu|있다|có|g
友|우|Hữu|벗|bạn hữu|g
碧|벽|Bích|푸르다|xanh biếc|g
菊|국|Cúc|국화|hoa cúc|g
桃|도|Đào|복숭아|hoa đào|g
藍|람|Lam|쪽빛|xanh lam|g
璃|리|Ly|유리|lưu ly|g
雅|아|Nhã|맑다·우아하다|thanh nhã|g
慧|혜|Tuệ|슬기롭다|trí tuệ|g
惠|혜|Huệ|은혜|ân huệ|g
奎|규|Khuê|별 이름|sao Khuê|g
閨|규|Khuê|안방|khuê các|g
桂|계|Quế|계수나무|cây quế|g
霜|상|Sương|서리|sương|g
仙|선|Tiên|신선|tiên|g
靜|정|Tịnh|고요하다|yên tĩnh|g
珍|진|Trân|보배|trân quý|g
貞|정|Trinh|곧다|trinh tiết|g
偉|위|Vỹ|훌륭하다|vĩ đại|g
緣|연|Duyên|인연|duyên|g
欣|흔|Hân|기뻐하다|hân hoan|g
卿|경|Khanh|벼슬|khanh tướng|g
琪|기|Kỳ|옥|ngọc quý|g
詩|시|Thơ|시|thơ|g
詩|시|Thi|시|thơ|g
垂|수|Thùy|드리우다|rủ xuống|g
竹|죽|Trúc|대나무|cây trúc|g
泉|천|Tuyền|샘|suối|g
丹|단|Đan|붉다|đỏ son|g
好|호|Hảo|좋다|tốt đẹp|g
軒|헌|Hiên|집|hiên nhà|g
恩|은|Ân|은혜|ân nghĩa|g
柏|백|Bách|측백나무|cây bách|g
景|경|Cảnh|볕·경치|phong cảnh|g
名|명|Danh|이름|danh tiếng|g
蝶|접|Điệp|나비|bướm|g
謙|겸|Khiêm|겸손하다|khiêm tốn|g
力|력|Lực|힘|sức lực|g
利|리|Lợi|이롭다|lợi ích|g
娟|연|Quyên|예쁘다|xinh đẹp|g
生|생|Sinh|나다|sinh ra|g
韶|소|Thiều|아름답다|tươi đẹp|g
順|순|Thuận|순하다|thuận hòa|g
宣|선|Tuyên|베풀다|tuyên bố|g
意|의|Ý|뜻|ý nghĩa|g
言|언|Ngôn|말씀|lời nói|g
珂|가|Kha|옥 이름|ngọc kha|g
大|대|Đại|크다|lớn|g
良|량|Lương|어질다|lương thiện|g
長|장|Trường|길다|lâu dài|g
圓|원|Viên|둥글다|tròn đầy|g
一|일|Nhất|하나|thứ nhất|g
嘉|가|Gia|아름답다|tốt đẹp|g
家|가|Gia|집|gia đình|g
冬|동|Đông|겨울|mùa đông|g
東|동|Đông|동녘|phương đông|g
夏|하|Hạ|여름|mùa hè|g
月|월|Nguyệt|달|trăng|g
天|천|Thiên|하늘|trời|g
冰|빙|Băng|얼음|băng|g
嬌|교|Kiều|아리땁다|kiều diễm|g
艷|염|Diễm|곱다|diễm lệ|g
麗|려|Lệ|곱다|mỹ lệ|g
蓮|련|Liên|연꽃|hoa sen|g
鸞|란|Loan|난새|chim loan|g
雪|설|Tuyết|눈|tuyết|g
閑|한|Nhàn|한가하다|nhàn nhã|g
銀|은|Ngân|은|bạc|g
敏|민|Mẫn|민첩하다|mẫn tiệp|g
富|부|Phú|부유하다|giàu có|g
飛|비|Phi|날다|bay|g
登|등|Đăng|오르다|đăng quang|g
傑|걸|Kiệt|뛰어나다|hào kiệt|g
豪|호|Hào|호걸|hào hiệp|g
俠|협|Hiệp|의협|hiệp sĩ|g
協|협|Hiệp|화합하다|hiệp lực|g
禮|례|Lễ|예도|lễ nghĩa|g
文|문|Văn|글월|văn chương|g
珉|민|Mân|옥돌|ngọc mân|g
旻|민|Mân|하늘|bầu trời thu|g
民|민|Dân|백성|nhân dân|g
準|준|Chuẩn|준하다|chuẩn mực|g
瑞|서|Thụy|상서롭다|điềm lành|g
序|서|Tự|차례|thứ tự|g
志|지|Chí|뜻|ý chí|g
知|지|Tri|알다|hiểu biết|g
祐|우|Hựu|돕다|phù hộ|g
允|윤|Doãn|진실로|đúng thật|g
潤|윤|Nhuận|윤택하다|tươi nhuận|g
道|도|Đạo|길|đạo lý|g
度|도|Độ|법도|chừng mực|g
藝|예|Nghệ|재주|nghệ thuật|g
洙|수|Thù|물 이름|sông Thù|g
眞|진|Chân|참|chân thật|g
振|진|Chấn|떨치다|chấn hưng|g
鎭|진|Trấn|진압하다|trấn giữ|g
晉|진|Tấn|나아가다|tiến lên|g
永|영|Vĩnh|길다|vĩnh cửu|g
泳|영|Vịnh|헤엄치다|bơi|g
熙|희|Hy|빛나다|rạng rỡ|g
姬|희|Cơ|아가씨|người đẹp|g
喜|희|Hỷ|기쁘다|vui mừng|g
星|성|Tinh|별|ngôi sao|g
聖|성|Thánh|성스럽다|thánh thiện|g
浩|호|Hạo|넓다|bao la|g
皓|호|Hạo|희다·밝다|sáng trắng|g
在|재|Tại|있다|ở, tại|g
載|재|Tải|싣다|chở|g
建|건|Kiến|세우다|xây dựng|g
健|건|Kiện|굳세다|khỏe mạnh|g
時|시|Thời|때|thời gian|g
裕|유|Dụ|넉넉하다|sung túc|g
柔|유|Nhu|부드럽다|dịu dàng|g
彩|채|Thái|채색|sắc màu|g
昭|소|Chiêu|밝다|sáng tỏ|g
素|소|Tố|본디·희다|mộc mạc|g
多|다|Đa|많다|nhiều|g
麟|린|Lân|기린|kỳ lân|g
璘|린|Lân|옥빛|ánh ngọc|g
娜|나|Na|아리땁다|thướt tha|g
承|승|Thừa|잇다|kế thừa|g
尙|상|Thượng|숭상하다|tôn trọng|g
相|상|Tương|서로|cùng nhau|g
正|정|Chính|바르다|chính trực|g
晶|정|Tinh|맑다|trong suốt|g
京|경|Kinh|서울|kinh đô|g
敬|경|Kính|공경하다|tôn kính|g
勳|훈|Huân|공훈|công huân|g
赫|혁|Hách|빛나다|hiển hách|g
錫|석|Tích|주석|thiếc|g
碩|석|Thạc|크다|to lớn|g
漢|한|Hán|한나라|nhà Hán|g
律|률|Luật|법칙|luật lệ|g
姸|연|Nghiên|곱다|xinh đẹp|g
然|연|Nhiên|그러하다|tự nhiên|g
彬|빈|Bân|빛나다|văn nhã|g
斌|빈|Bân|빛나다|văn võ song toàn|g
圭|규|Khuê|홀|ngọc khuê|g
源|원|Nguyên|근원|nguồn|g
媛|원|Viện|미녀|người đẹp|g
遠|원|Viễn|멀다|xa|g
願|원|Nguyện|원하다|ước nguyện|g
燦|찬|Xán|빛나다|xán lạn|g
讚|찬|Tán|기리다|tán dương|g
範|범|Phạm|법|mô phạm|g
煥|환|Hoán|빛나다|rực rỡ|g
歡|환|Hoan|기쁘다|hân hoan|g
子|자|Tử|아들|con|g
淑|숙|Thục|맑다|hiền thục|g
植|식|Thực|심다|trồng|g
根|근|Căn|뿌리|gốc rễ|g
基|기|Cơ|터|nền móng|g
宰|재|Tể|재상|tể tướng|g
炫|현|Huyễn|밝다|rực sáng|g
津|진|Tân|나루|bến đò|g
秦|진|Tần|나라 이름|nhà Tần|g
震|진|Chấn|우레·떨치다|sấm, chấn động|g
昱|욱|Dục|햇빛 밝다|ánh nắng rực rỡ|g
旭|욱|Húc|아침 해|mặt trời mọc|g
煜|욱|Dục|빛나다|chói lọi|g
郁|욱|Úc|향기롭다·성하다|thơm ngát|g
泫|현|Huyễn|물 깊다·이슬 빛나다|nước sâu, giọt sương|g
鉉|현|Huyễn|솥귀|quai đỉnh|g
玹|현|Huyền|옥돌|ngọc huyền|g
炅|경|Quýnh|빛나다|sáng rực|g
炯|형|Quýnh|밝다|sáng sủa|g
亨|형|Hanh|형통하다|hanh thông|g
衡|형|Hành|저울·평형|cân bằng|g
馨|형|Hinh|향기|hương thơm xa|g
晟|성|Thịnh|밝다·성하다|rực rỡ|g
誠|성|Thành|정성|thành thật|g
昇|승|Thăng|오르다|thăng tiến|g
炳|병|Bỉnh|밝다|sáng rõ|g
秉|병|Bỉnh|잡다·지키다|giữ gìn|g
棟|동|Đống|용마루·기둥|cột trụ|g
桐|동|Đồng|오동나무|cây ngô đồng|g
斗|두|Đẩu|말·북두성|sao Bắc Đẩu|g
守|수|Thủ|지키다|giữ gìn|g
壽|수|Thọ|목숨·장수|trường thọ|g
樹|수|Thụ|나무|cây|g
淳|순|Thuần|순박하다|thuần hậu|g
舜|순|Thuấn|순임금|vua Thuấn|g
湜|식|Thực|물 맑다|nước trong|g
暎|영|Ánh|비치다|chiếu sáng|g
瑛|영|Anh|옥빛|ánh ngọc|g
寧|녕|Ninh|편안하다|an ninh|g
叡|예|Duệ|밝다·슬기롭다|sáng suốt|g
睿|예|Duệ|슬기롭다|thông tuệ|g
完|완|Hoàn|완전하다|hoàn thiện|g
婉|완|Uyển|순하다·예쁘다|dịu dàng|g
堯|요|Nghiêu|요임금|vua Nghiêu|g
鎔|용|Dung|녹이다·거푸집|đúc|g
溶|용|Dung|녹다·넓다|hòa tan, bao la|g
佑|우|Hựu|돕다|phù trợ|g
侑|유|Hựu|권하다·돕다|giúp đỡ|g
胤|윤|Dận|자손|con cháu|g
誾|은|Ngân|온화하다|ôn hòa|g
宜|의|Nghi|마땅하다|thích hợp|g
益|익|Ích|더하다|lợi ích|g
寅|인|Dần|범·공경하다|kính cẩn|g
慈|자|Từ|사랑|từ bi|g
哉|재|Tai|어조사·비롯하다|bắt đầu|g
禎|정|Trinh|상서롭다|điềm lành|g
庭|정|Đình|뜰|sân nhà|g
婷|정|Đình|예쁘다|xinh đẹp|g
鍾|종|Chung|쇠북·모으다|chuông|g
宗|종|Tông|마루·근본|tông, gốc|g
柱|주|Trụ|기둥|cột trụ|g
宙|주|Trụ|집·우주|vũ trụ|g
埈|준|Tuấn|높다|cao|g
峻|준|Tuấn|높다·준엄하다|cao ngất|g
駿|준|Tuấn|준마|ngựa tốt|g
昌|창|Xương|창성하다|xương thịnh|g
彰|창|Chương|드러나다|rõ ràng|g
采|채|Thái|캐다·풍채|phong thái|g
澈|철|Triệt|맑다|trong suốt|g
喆|철|Triết|밝다|sáng suốt|g
澤|택|Trạch|못·은혜|ân trạch|g
太|태|Thái|크다|to lớn|g
弼|필|Bật|돕다|phò tá|g
翰|한|Hàn|글·날개|văn chương|g
憲|헌|Hiến|법|hiến pháp|g
弘|홍|Hoằng|넓다|rộng lớn|g
晃|황|Hoảng|밝다|sáng chói|g
希|희|Hy|바라다|hy vọng|g
禧|희|Hy|복|phúc lành|g
薰|훈|Huân|향풀·향기|cỏ thơm|g
訓|훈|Huấn|가르치다|dạy dỗ|g
揆|규|Quỹ|헤아리다|đo lường|g
奭|석|Thích|크다·성하다|lớn lao|g
始|시|Thủy|비롯하다|khởi đầu|g
乾|건|Càn|하늘|trời|g
昊|호|Hạo|하늘|bầu trời|g
晧|호|Hạo|밝다|sáng|g
鎬|호|Cảo|호경(서울 이름)|đất Hạo Kinh|g
玟|민|Mân|옥돌|ngọc mân|g
`;

export type Role = 's' | 'g';

export interface HanjaEntry {
  h: string;
  ko: string;
  vi: string;
  mKo: string;
  mVi: string;
  roles: Role[];
}

export const HANJA: HanjaEntry[] = RAW.trim()
  .split('\n')
  .map((line) => {
    const [h, ko, vi, mKo, mVi, role] = line.split('|');
    return { h, ko, vi, mKo, mVi, roles: role.split('') as Role[] };
  });
