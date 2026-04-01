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

**user-portal** (Node lts/jod, npm):

```bash
cd user-portal && npm install
```

**admin-portal** (Node 11.15.0, yarn):

admin-portal은 node-sass 4.x를 사용하므로 Apple Silicon Mac(M1/M2/M3)에서는 Rosetta(x86_64) 모드가 필요하다.

```bash
# Rosetta 미설치 시
softwareupdate --install-rosetta

# Node 11에 yarn 설치 (최초 1회)
arch -x86_64 zsh -c 'source ~/.nvm/nvm.sh && nvm use 11.15.0 && npm install -g yarn'

# 패키지 설치
arch -x86_64 zsh -c 'source ~/.nvm/nvm.sh && nvm use 11.15.0 && cd admin-portal && yarn install --force'
```

Intel Mac은 `arch -x86_64` 없이 직접 실행 가능.

### user-portal 설정

`user-portal/config/application.json`의 API URL을 mock 서버로 변경한다:

```json
{
  "VUE_APP_API_URI": "http://localhost:3000/api",
  "VUE_APP_REMOTE_URI": "http://localhost:3000",
  "VUE_APP_FILE_URI": "http://localhost:3000"
}
```

이 변경은 커밋하지 않는다. git에서 추적을 제외하려면:

```bash
cd user-portal
git update-index --assume-unchanged config/application.json
```

원복이 필요할 때:

```bash
git update-index --no-assume-unchanged config/application.json
git checkout config/application.json
```

## 사용법

### 1. 로컬 개발 — mock 서버로 백엔드 없이 개발

```bash
# 터미널 1: mock 서버
cd skb-cloudx-portal-helper && npm run mock

# 터미널 2: user-portal dev server
cd user-portal && npm run serve
```

브라우저에서 `http://localhost:8080/tenant1/login` 접속. dev server가 `config/application.json`을 읽어서 API 요청을 mock 서버(`localhost:3000`)로 보낸다. HMR이 동작하므로 코드 수정 시 즉시 반영된다.

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

## admin-portal 지원

### 포털 분기

mock 서버는 요청 헤더 `X-CloudPC-Request-Poc`로 포털을 구분한다:

- `POCUSER` → `user-portal/handlers/` 라우터
- `POCADMIN` → `admin-portal/handlers/` 라우터

각 포털의 axios 인터셉터가 이 헤더를 자동으로 주입하므로 별도 설정 불필요.

### SA / TA 로그인

admin-portal 로그인 시 **아이디에 따라** 역할이 결정된다:

| 아이디 입력값 | 역할 | 토큰 |
|--------------|------|------|
| `sa`, `superadmin` 등 (`sa` 포함) | Super Admin | `Bearer mock-sa-token` |
| `ta`, `tenantadmin` 등 (그 외) | Tenant Admin | `Bearer mock-ta-token` |

비밀번호는 아무 값이나 입력하면 된다.

이후 메뉴 API(`/v1/user/admin/groups/menus`)는 토큰을 보고 SA/TA 메뉴 트리를 반환한다.

### SA ↔ TA 권한 전환

`/v1/authRemake` API로 런타임에 역할을 전환한다. admin-portal의 권한 전환 모달에서 호출되며, 요청 body의 `grp_typ_cd`로 분기한다:

- `U001SUP` → SA로 전환, `Bearer mock-sa-token` 발급
- `U001TNT` → TA로 전환, `Bearer mock-ta-token` 발급

### admin-portal 핸들러 구조

```
mock-server/admin-portal/
├── handlers/
│   ├── gw.js              # 로그인 (아이디로 SA/TA 분기), 로그아웃, 권한 전환
│   ├── nauth.js           # 2차 인증, 아이디 찾기, 임시 비밀번호, 포털 UI 공개 조회
│   ├── auth.js            # 본인 확인, 비밀번호 변경
│   ├── resource.js        # VPC/호스트/네트워크/스토리지/템플릿/스냅샷/디스크/테넌트/풀/마이그레이션
│   ├── user.js            # 메뉴 목록 (SA/TA), 계정, 그룹
│   ├── system.js          # 공지/FAQ/VOC/팝업/포털UI/가이드/메뉴관리
│   ├── operation.js       # 인증정책/USB/백업/접근차단/블랙리스트/네트워크/전원/메타데이터/외부연동
│   └── monitoring.js      # 알람/감사로그/대시보드/위젯/통계
└── fixtures/              # 200+개 JSON 응답 데이터
    ├── menus-sa.json, menus-ta.json
    ├── resource/          # VPC, 호스트, 네트워크, 스토리지 등
    ├── operation/         # 정책, USB, 외부연동 등
    └── monitoring/        # 대시보드, 통계, 알람 등
```

## fixture 추가

새 API mock을 추가하려면:

1. `fixtures/` 아래에 응답 JSON 파일 생성
2. `handlers/` 해당 핸들러에 라우트 추가
3. 시나리오 분기가 필요하면 `getScenario()` 패턴 적용

API 명세는 `docs/user-portal/api/`에 정리되어 있다.
