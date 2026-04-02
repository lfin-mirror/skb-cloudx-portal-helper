# 앱 초기화 → 로그인 페이지 도달

admin-portal 접속 시 로그인 페이지에 도달하기까지의 흐름.

## 라우터 가드 (`permission.js`)

모든 라우트 이동 시 `router.beforeEach`에서 인증 상태 확인.

```
요청 경로 진입
  ├── 키로깅 방지 초기화 (initializeKeylogging)
  ├── 토큰 있음 (getToken())
  │   ├── 경로가 /login → / (대시보드)로 리다이렉트
  │   ├── addRouters 미생성 → GenerateRoutes dispatch → 동적 라우트 등록
  │   ├── 권한 있음 → next()
  │   └── 권한 없음 → /401
  └── 토큰 없음
      ├── whiteList 경로 → next()
      └── 그 외 → /login 리다이렉트 (redirect 쿼리 포함)
```

### whiteList

로그인 없이 접근 가능한 경로:

```javascript
const whiteList = ['/login', '/auth-redirect', '/500', '/404', '/401']
```

user-portal과 달리 `/checking`(시스템 점검), `/auth/check`(VPN 로그인) 없음.

### 키로깅 방지 초기화

`router.beforeEach` 진입 시 **매번** `initializeKeylogging()` 호출:

```
1. GET /v1/nauth/system/settings?category=admin → 키로깅 대상 여부
2. GET /v1/nauth/system/installer → 설치 파일 정보
3. store.dispatch('keylogging/initialize') → 상태 머신 시작
```

`allowUnsupportedOs`는 현재 `'Y'`로 하드코딩 (TODO 주석).

### 이미지/UI 설정 로드

`router.beforeEach` 끝에서 `images.isLoad === false`이면 `setImages` dispatch:

```
GET /v1/nauth/system/portals/ui/ADMIN/public
→ 로그인 배경/로고, Navbar 로고, Footer 저작권/문의처, 로그인 타이틀 저장
```

## 로그인 페이지 (`views/login/index.vue`)

### 화면 구성

| 영역 | 내용 |
|------|------|
| 상단 | 포털 타이틀 (`ptalLinTitle`, 기본: `'Cloud X Service Portal'`) |
| 로고 | `images.login.logo` (설정 없으면 기본 `login_logo.png`) |
| 배경 | `images.login.background` (설정 없으면 기본 `login_bg.jpg`) |
| 폼 | 아이디 + 비밀번호 + 로그인 버튼 |
| 하단 | "아이디 찾기" / "비밀번호 찾기" 링크 |
| 체크박스 | "아이디 기억하기" (`rememberMe` → localStorage 저장) |
| 에러 표시 | AGW 인증 에러 시 `errCode`/`errMsg` 파라미터로 전달된 메시지 표시 |

### 폼 유효성 검사

| 필드 | 규칙 |
|------|------|
| `acct_conn_id` | 필수, 최대 50자, `regExp.id` 패턴 (영문+숫자, 5~51자) |
| `passwd` | 필수, 최대 32자, 비밀번호 규칙 검사 |

비밀번호 규칙 (`pwdPattern`): 9자 이상, 영문+숫자+특수문자(`#?!@$%^&*-`) 3종 모두 포함.

## user-portal과의 차이

| 항목 | admin-portal | user-portal |
|------|-------------|-------------|
| 로그인 경로 | `/login` (단일) | `/:tenant/login` (테넌트별) |
| 테넌트 URL 분기 | 없음 | `tntExists()` → 테넌트 유효성 확인 후 진입 |
| 시스템 점검 | 없음 | `/checking` 페이지 |
| VPN 자동 로그인 | 없음 | `/auth/check` → Octatco VPN 연동 |
| 이미지 API | `/ADMIN/public` (고정) | `/{tntUrlId}/public` (테넌트별) |
| 키로깅 초기화 | 매 네비게이션마다 | 동일 |
