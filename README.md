# skb-cloudx-portal-helper

백엔드 MS에 접근할 수 없는 로컬 환경에서 user-portal / admin-portal을 단독 실행하고, E2E 테스트를 자동화하기 위한 독립 모듈.

## 설계 배경

로컬에서 백엔드 MS(resource, operation, vid4o)에 접근할 수 없다. 포털의 API URL 설정만 mock 서버(`localhost:3000`)로 돌려서, 앱이 mock 서버를 백엔드로 인식하고 fixture 데이터를 응답받도록 한다. 포털 소스코드는 건드리지 않는 것이 원칙이다.

user-portal은 기동 시 `config/application.json` 또는 `/js/config.js`에서 API URL을 읽는다. 이 URL만 mock 서버(`localhost:3000`)로 돌리면 포털 코드는 원래 설계대로 동작하면서 mock 응답을 받는다.

## 구조

```
skb-cloudx-portal-helper/
├── package.json
├── mock-server/
│   ├── server.js              # Express 서버 (시나리오 제어 + mock API + 정적 파일 서빙)
│   ├── handlers/              # API 핸들러 (MS별 8개)
│   │   ├── gw.js              #   로그인, 2차 인증 검증
│   │   ├── nauth.js           #   테넌트, VPN, Octatco, 시스템 공개 API
│   │   ├── auth.js            #   비밀번호 확인/변경, 로그아웃
│   │   ├── resource.js        #   VPC, 스냅샷, 디스크, VM 인가
│   │   ├── user.js            #   계정, 업무 요청, 단말 접속
│   │   ├── system.js          #   공지, FAQ, QNA
│   │   ├── operation.js       #   인증/보안 정책
│   │   └── fileService.js     #   파일 업로드/다운로드
│   └── fixtures/              # 시나리오별 JSON 응답 (50+개)
│       ├── auth/              #   로그인, 2FA, 테넌트, UI 설정
│       ├── resource/          #   VPC, 스냅샷, 디스크, 풀
│       ├── user/              #   계정, 요청, 디바이스, 그룹
│       └── system/            #   공지, FAQ, QNA, 가이드, 정책
├── docs/
│   ├── CLAUDE.md              # 문서 규칙 인덱스
│   ├── prd.md                 # 플랫폼 PRD
│   ├── ia/                    # 정보 아키텍처 (메뉴 트리, 유저플로우, 데이터 관계도)
│   ├── admin-portal/
│   │   ├── 화면/              #   화면 문서 43개 (SA/TA 통합)
│   │   ├── api/               #   API 명세
│   │   ├── 개요/              #   SA/TA 메뉴 개요
│   │   ├── openstack/         #   OpenStack/VDI 배경 지식
│   │   └── internals/         #   내부 구조 분석
│   ├── user-portal/
│   │   ├── vpcinfo/           #   화면 문서 (가상PC 관련)
│   │   ├── support/           #   화면 문서 (공지/FAQ/문의)
│   │   ├── auth/              #   흐름 문서 (로그인/인증)
│   │   ├── mobile/            #   흐름 문서 (모바일)
│   │   ├── internals/         #   내부 구조 (Vuex/interceptor)
│   │   ├── term/              #   용어 (AD/Octatco/키로깅)
│   │   └── api/               #   API 명세
│   ├── term/                  #   VDI 공통 용어
│   ├── changelog/             #   버전별 변경 요약
│   └── speculation/           #   추측 문서
├── e2e/
│   ├── playwright.config.js
│   ├── helpers/
│   │   └── mock-setup.js      # portalConfig 주입, 시나리오 전환 헬퍼
│   ├── tests/
│   │   └── auth/
│   │       └── login.spec.js  # 로그인 10개 시나리오
│   ├── test-results/          # 스크린샷, 영상 (자동 생성)
│   └── report/                # Playwright HTML 리포트
└── scripts/
    └── start.sh               # mock + dev server 동시 기동
```

## 세팅

### 사전 요구사항

- Node.js 22+

### 설치

```bash
cd skb-cloudx-portal-helper
npm install
npx playwright install chromium
```

### 포털 패키지 설치

[docs/portal-setup.md](docs/portal-setup.md) 참조 (패키지 설치 + user-portal 설정).

## 사용법

### 1. 로컬 개발 — mock 서버로 백엔드 없이 개발

```bash
# 터미널 1: mock 서버
cd skb-cloudx-portal-helper && npm run mock

# 터미널 2: user-portal dev server
cd user-portal && npm run serve

# 터미널 2 (admin-portal 개발 시): admin-portal dev server
arch -x86_64 zsh -c 'source ~/.nvm/nvm.sh && nvm use 11.15.0 && cd admin-portal && yarn serve'
```

mock 서버는 요청 헤더 `X-CloudPC-Request-Poc`로 포털을 구분한다 (`POCUSER` → user-portal, `POCADMIN` → admin-portal). 각 포털의 axios 인터셉터가 이 헤더를 자동 주입하므로 별도 설정 불필요.

**user-portal**: 브라우저에서 `http://localhost:8080/tenant1/login` 접속. dev server가 `config/application.json`을 읽어서 API 요청을 mock 서버(`localhost:3000`)로 보낸다. HMR이 동작하므로 코드 수정 시 즉시 반영된다.

**admin-portal**: SA/TA 로그인, 권한 전환 등 상세 설정은 [docs/portal-setup.md](docs/portal-setup.md) 참조.

기본 상태에서는 모든 API가 `success` 시나리오로 응답한다. 아이디/비밀번호에 아무 값이나 입력해도 로그인이 성공한다. mock 서버는 입력값을 검증하지 않고 현재 설정된 시나리오의 fixture를 그대로 반환한다.

시나리오를 바꾸려면 **별도 터미널**에서 `/__control` API를 호출한다:

```
터미널 1: mock 서버 실행 중
터미널 2: user-portal dev server 실행 중
터미널 3: curl로 시나리오 전환 ← 여기서
브라우저: user-portal 화면에서 조작
```

```bash
# 로그인 실패로 전환 → 브라우저에서 로그인하면 에러 팝업 표시
curl -X POST http://localhost:3000/__control \
  -H 'Content-Type: application/json' \
  -d '{"endpoint":"/api/v1/gw/authentications/","scenario":"failed"}'

# SMS 2차 인증으로 전환 → 로그인하면 인증번호 입력 화면으로 이동
curl -X POST http://localhost:3000/__control \
  -H 'Content-Type: application/json' \
  -d '{"endpoint":"/api/v1/gw/authentications/","scenario":"2fa-sms"}'

# 정상 상태로 원복
curl -X POST http://localhost:3000/__control/reset
```

시나리오를 바꾼 뒤 브라우저에서 로그인을 시도하면 해당 분기의 화면을 확인할 수 있다.

### 2. E2E 테스트 — 코드 변경의 영향 확인

E2E 테스트는 빌드된 `dist/`를 사용한다. mock 서버가 이 디렉토리를 자동 감지해서 정적 파일로 서빙한다.

```bash
# user-portal 빌드 (최초 1회, 코드 변경 시 재빌드)
cd user-portal
npm install
npm run build
```

```bash
cd skb-cloudx-portal-helper

# mock 서버 기동 (dist/ 정적 서빙)
npm run mock

# 테스트 실행
npm test
```

테스트 결과로 통과/실패 여부와 각 시나리오의 스크린샷이 생성된다. 코드 수정 후 실행하면 기존 기능이 깨졌는지 바로 확인 가능하다.

```bash
# 브라우저 화면을 보면서 실행
npm run test:headed

# Playwright UI 모드 (단계별 디버깅)
npm run test:ui

# 로그인 테스트만
npm run test:auth

# HTML 리포트 열기
npm run report
```

## 요청 흐름

```
[로컬 개발]
브라우저 → user-portal dev server (:8080)
              → axios baseURL = http://localhost:3000/api (config/application.json)
              → mock 서버 (:3000) → fixture 응답

[E2E 테스트]
Playwright → mock 서버 (:3000)
              → /js/config.js 로드 → portalConfig 설정
              → dist/ 정적 파일 서빙
              → axios → mock 핸들러 → fixture 응답
              → 화면 검증 + 스크린샷 캡처
```

## 테스트 시나리오

### 로그인 (10개)

| 시나리오 | 검증 내용 |
|----------|-----------|
| 정상 로그인 → 홈 이동 | `/tenant1/home` URL 도달 |
| SMS 2차 인증 분기 | 인증번호 입력 화면 표시 |
| OTP 2차 인증 분기 | OTP 인증번호 입력 화면 표시 |
| 이메일 2차 인증 분기 | 인증번호 입력 화면 표시 |
| 초기 비밀번호 변경 분기 | 비밀번호 변경 화면 표시 |
| 비밀번호 장기 미변경 분기 | 비밀번호 변경 안내 표시 |
| 로그인 실패 | 에러 팝업 표시 |
| 계정 잠금 | 이용 제한 팝업 표시 |
| 아이디 미입력 | 검증 메시지 표시 |
| 비밀번호 미입력 | 검증 메시지 표시 |

## 스크린샷과 영상

모든 테스트의 스크린샷이 `e2e/test-results/` 아래에 자동 저장된다.

```
e2e/test-results/
├── auth-login-정상-로그인-→-홈-이동-chromium/
│   └── test-finished-1.png
├── auth-login-SMS-2차-인증-분기-chromium/
│   └── test-finished-1.png
└── ...
```

실패한 테스트는 영상(`video.webm`)과 트레이스(`trace.zip`)도 생성된다:

```bash
npx playwright show-trace e2e/test-results/{테스트명}/trace.zip
```

트레이스 뷰어에서 단계별 스크린샷, 네트워크 로그, DOM 스냅샷을 확인할 수 있다.

## 시나리오 제어 (`/__control`)

`/__control`은 mock 서버 자체를 제어하는 관리용 엔드포인트다. 포털 앱의 API(`/api/v1/...`)와 분리하기 위해 `__` prefix를 사용한다 (Webpack의 `/__webpack_hmr`, Vite의 `/__vite_ping`과 같은 관례).

"이 엔드포인트에 다음 요청이 오면 어떤 fixture로 응답할지"를 런타임에 지정한다.

### 동작 원리

`/__control`로 시나리오를 설정하면 mock 서버 메모리에 저장된다:

```js
// server.js
app.post('/__control', (req, res) => {
  const { endpoint, scenario } = req.body;
  setScenario(endpoint, scenario);  // 메모리에 저장
});
```

각 핸들러는 요청마다 현재 시나리오를 읽어서 해당 fixture를 선택한다:

```js
// handlers/gw.js
app.post('/api/v1/gw/authentications/', (req, res) => {
  const scenario = getScenario('/api/v1/gw/authentications/'); // 'failed'
  const fixture = require(`../fixtures/auth/login-${scenario}.json`); // login-failed.json
  res.json(fixture);
});
```

설정하지 않은 엔드포인트는 기본값 `'success'`로 동작한다.

### 사용법

```bash
# 시나리오 변경
curl -X POST http://localhost:3000/__control \
  -H 'Content-Type: application/json' \
  -d '{"endpoint":"/api/v1/gw/authentications/","scenario":"2fa-sms"}'

# 로그인 시나리오 목록:
#   success, 2fa-sms, 2fa-otp, 2fa-email,
#   password-change, password-expired, dormant, failed, locked

# 전체 초기화 (모든 엔드포인트를 success로)
curl -X POST http://localhost:3000/__control/reset

# 현재 시나리오 상태 확인
curl http://localhost:3000/__control/status
```

E2E 테스트 코드에서는 헬퍼 함수를 사용한다:

```js
const { setScenario, resetScenarios } = require('../../helpers/mock-setup');

test('SMS 2차 인증', async ({ page }) => {
  await setScenario('/api/v1/gw/authentications/', '2fa-sms');
  await page.goto('/tenant1/login');
  // ...
});
```

## fixture 추가

새 API mock을 추가하려면:

1. `fixtures/` 아래에 응답 JSON 파일 생성
2. `handlers/` 해당 핸들러에 라우트 추가
3. 시나리오 분기가 필요하면 `getScenario()` 패턴 적용

## 문서

`docs/` 폴더에 플랫폼 문서가 통합 관리된다.

| 폴더 | 내용 |
|------|------|
| `docs/prd.md` | 플랫폼 PRD (목적, 대상, 핵심 기능) |
| `docs/ia/` | 정보 아키텍처 — 메뉴 트리, 유저플로우, 데이터 관계도 |
| `docs/admin-portal/화면/` | admin-portal 화면 문서 43개 (SA/TA 통합) |
| `docs/admin-portal/api/` | admin-portal API 명세 |
| `docs/user-portal/` | user-portal 문서 (화면/흐름/내부구조/용어) |
| `docs/user-portal/api/` | user-portal API 명세 |
| `docs/CLAUDE.md` | 문서 규칙 인덱스 |
| `docs/openapi-cloudx.yaml` | OpenAPI 3.0 통합 명세 (admin + user, Hoppscotch 임포트용) |

상세 규칙은 `docs/CLAUDE.md` 참조.
