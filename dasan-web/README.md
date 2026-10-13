# DASAN 웹사이트 · 웹앱

다산무역서비스(DASAN TRADE AND SERVICE CO., LTD.)의 채용·파트너 모집 사이트입니다. Next.js로 만들었고, 베트남어와 한국어를 지원합니다.

## 페이지

| 주소 | 내용 |
|---|---|
| `/vi`, `/ko` | 회사소개 홈 (신뢰 지표, 한·베 파트너십, 법적 서류, 고객사, 채용, 약속, 절차, FAQ, 연락처) |
| `/vi/jobs`, `/vi/jobs/{id}` | 채용공고 목록과 상세 |
| `/vi/apply` | 구직자 지원 폼 (`?job=공고ID`, `?ref=파트너코드`를 붙이면 미리 채워짐) |
| `/ko/business` | 한국 기업용 인력 의뢰 안내와 의뢰 폼 |
| `/ko/sorting` | 전자부품 선별(Sorting) 대행 안내와 의뢰 폼 |
| `/vi/partner` | 다산 채용파트너 모집 안내와 신청 폼 (신청하면 파트너 코드 `DSxxxx` 발급) |
| `/admin` | 관리자: 기업 의뢰·지원자·채용파트너·채용공고 관리, 상태/메모, Excel(CSV) 내보내기 |

채용파트너가 소개한 근로자가 지원서에 파트너 코드를 넣으면 관리자 화면의 파트너 목록에 소개 인원과 출근 인원이 집계됩니다. 이 숫자로 수수료를 정산할 수 있습니다.

## Vercel 배포 방법

1. Vercel에서 **Add New → Project**를 누르고 이 GitHub 저장소를 선택합니다.
2. **Root Directory**를 `dasan-web`으로 지정합니다. Framework는 Next.js로 자동 인식됩니다.
3. **Environment Variables**에 다음 값을 넣습니다.
   - `ADMIN_PASSWORD`: 관리자 비밀번호 (길고 추측하기 어렵게)
   - `SESSION_SECRET`: 32자 이상의 임의 문자열
4. 데이터 저장소를 연결합니다. 프로젝트의 **Storage** 탭에서 **Upstash → Redis**(무료 플랜 가능)를 만들고 이 프로젝트에 연결합니다. `KV_REST_API_URL`과 `KV_REST_API_TOKEN`이 자동으로 추가됩니다.
   - ⚠ 이 단계를 빼면 지원서가 저장되지 않습니다. 관리자 화면 상단에 노란 경고가 보이면 연결이 안 된 상태입니다.
5. **Deploy**를 누른 뒤, **Settings → Domains**에서 구입한 도메인을 연결합니다. 현재 도메인은 `dasanhr.com`입니다(아래 '도메인' 참고).

## 로컬 실행

```bash
cd dasan-web
cp .env.example .env.local   # 값 채우기
npm install
npm run dev                  # http://localhost:3000
```

Redis 설정이 없으면 `.data/db.json` 파일에 저장합니다. 개발용이며, 이 폴더는 git에 올라가지 않습니다.

## 문구 수정

사이트의 모든 문구(베트남어/한국어)는 `lib/i18n.ts` 한 파일에 있습니다. 회사 정보(주소, 허가번호)는 같은 파일의 `COMPANY`, 연락처는 `VN_CONTACTS`(베트남어 담당, 위에서부터 표시 순서)와 `KR_CONTACT`(한국어 담당)에 있습니다.

## 개인정보

지원 폼과 파트너 폼은 개인정보 수집·이용 동의를 받은 경우에만 접수합니다(베트남 개인정보보호 시행령 13/2023/NĐ-CP 대응). 관리자 비밀번호는 두 대표만 알고 있어야 합니다.

## 도메인 (dasanhr.com)

- 메인 주소는 `https://dasanhr.com`이고, `www.dasanhr.com`은 `dasanhr.com`으로 자동 이동합니다.
- 도메인은 **Vercel에서 구매**했습니다(2026년 10월, 1년, 자동 갱신 켜짐). DNS도 Vercel이 관리하므로 따로 설정할 것이 없고, HTTPS 인증서도 자동으로 발급·갱신됩니다.
- 갱신 상태와 결제 카드는 Vercel → **Domains**(https://vercel.com/jinwoo8/~/domains)와 **Settings → Billing**에서 확인합니다. 결제 카드가 만료되면 자동 갱신이 실패하니 카드 정보를 최신으로 유지하세요.
- 연결 상태는 프로젝트의 **Settings → Domains**에서 확인합니다(초록색 체크면 정상).

## 운영·유지보수 체크리스트

| 주기 | 할 일 |
|---|---|
| 매일 | `/admin`에서 새 기업 의뢰·지원자·파트너 신청 확인, 상태와 메모 업데이트 |
| 수시 | 채용공고 등록·마감 (`/admin` → 채용공고 탭) |
| 매월 | 파트너별 소개·출근 인원 확인 후 수수료 정산, CSV 백업 다운로드 |
| 매년 | `dasanhr.com` 자동 갱신 결제 확인, 관리자 비밀번호 변경 |

- **관리자 비밀번호 변경**: Vercel → **Settings → Environment Variables**에서 `ADMIN_PASSWORD`를 바꾸고 다시 배포(**Deployments → 최신 배포 → Redeploy**)합니다.
- **문구·연락처 수정**: `lib/i18n.ts`를 고친 뒤 GitHub에 올리고 배포합니다. 사진은 `public/images`에 같은 이름으로 덮어쓰면 됩니다.
- **장애 확인**: Vercel → **Deployments**에서 최신 배포가 `Ready`인지, **Logs**에 오류가 없는지 봅니다. 문제가 생기면 이전 배포의 **⋯ → Promote to Production**으로 즉시 되돌릴 수 있습니다.
- **데이터 저장소**: 지원서·의뢰는 Upstash Redis에 저장됩니다. Vercel → **Storage**에서 사용량을 볼 수 있고, 무료 한도를 넘으면 유료 전환 안내가 옵니다.
