---
type: flow
title: 로그인 → 2차 인증 → 홈 화면 진입 흐름
status: stable
version: v2.2.9
portal: user
screens:
  - login/index.vue
  - login/components/Login.vue
  - login/components/CertificationSMS.vue
  - login/components/CertificationOTP.vue
  - login/components/octatco/OctatcoLogin.vue
  - login/components/octatco/SecAuthSelect.vue
  - login/components/octatco/SecondCert.vue
  - login/components/octatco/MobileMetricCert.vue
  - login/components/octatco/PCMetricCert.vue
  - login/PasswordChange.vue
  - login/PasswordNotChangedLongTime.vue
  - login/VpnLogin.vue
  - login/VpnLoginCheck.vue
related_docs:
  - 01-entry-to-login-flow.md
  - 04-vpn-auto-login.md
  - ../term/01-ad.md
  - ../term/02-octatco.md
  - ../term/03-codes.md
api_endpoints:
  - POST /v1/gw/authentications/
  - POST /v1/nauth/auth/authentications/2nd_cert
  - POST /v1/gw/authentications/2nd_cert/{tnt_url_id}/{acct_conn_id}/{challenge_id}/{인증번호}
  - POST /v1/gw/authentications/2nd_cert/{tnt_url_id}/{acct_conn_id}/{challenge_id}/{인증번호}/totp
  - GET /v1/nauth/user/external/octatco/idcheck/{tnt_url_id}
  - POST /v1/nauth/user/external/octatco/reqToken/{tnt_url_id}
  - POST /v1/nauth/user/external/octatco/userLogin/{tnt_url_id}
  - POST /v1/nauth/user/external/octatco/loginCheck/{tnt_url_id}/{serial}
  - PUT /v1/auth/authentications/accounts/firstpassword
---

# 로그인 → 2차 인증 → 홈 화면 진입 흐름

로그인 페이지(`/:tenant/login`)에 도달한 뒤, 사용자가 인증을 거쳐 홈 화면에 진입하기까지의 과정을 다룬다.
앱 초기화부터 로그인 페이지 도달까지는 [01-entry-to-login-flow.md](./01-entry-to-login-flow.md) 참고.

## 전체 흐름 요약

```
로그인 페이지 컨테이너 (views/login/index.vue)
    ↓ visible.isForm 값으로 컴포넌트 전환
    ├── 일반 로그인 (components/Login.vue)
    │     ↓ POST /v1/gw/authentications/
    │     ├── 2차 인증 대상 → SMS/OTP/이메일/카카오톡 인증
    │     ├── 초기 비밀번호 변경 대상 → PasswordChange
    │     ├── 비밀번호 장기 미변경 → PasswordNotChangedLongTime
    │     └── 인증 완료 → authLogin() → /:tenant/home
    │
    └── Octatco 로그인 (components/octatco/OctatcoLogin.vue)
          ↓ GET /octatco/idcheck/:tenant
          ↓ SecAuthSelect (인증 수단 선택)
          ├── EMAIL/SMS/OTP → SecondCert (인증번호 입력)
          ├── 모바일 생체 → MobileMetricCert (MQTT 기반)
          └── PC 생체/FIDO → PCMetricCert (WebAuthn 기반)
                ↓ 인증 성공
                → octatcoCertificationPass() → authLogin() → /:tenant/home

VPN 자동 로그인 (/auth/check)
    ↓ VPN 장비가 브라우저를 리다이렉트
    VpnLogin.vue → VpnLoginCheck.vue
    ↓ URL 파라미터에서 acct_conn_id + onePassToken 추출
    POST /v1/nauth/user/auth/check
    ↓ 성공
    → authLogin() → /:tenant/home
```

VPN 자동 로그인의 상세는 [04-vpn-auto-login.md](./04-vpn-auto-login.md) 참고.

---

## 로그인 페이지 컨테이너 — `src/views/login/index.vue`

로그인 관련 모든 화면을 하나의 페이지 안에서 관리한다. `visible.isForm` 값에 따라 표시할 컴포넌트를 전환하는 SPA 방식이다.

```
visible.isForm 값           컴포넌트                      용도
─────────────────────────────────────────────────────────────────────
'login'                     UserLogin                    일반 로그인 폼
'octatcoLogin'              OctatcoLogin                 Octatco 로그인 폼
'octatcoSecAuthSel'         SecAuthSelect                Octatco 2차 인증 수단 선택
'octatcoSecondCert'         SecondCert                   Octatco EMAIL/SMS/OTP 인증번호 입력
'mobileMetricCert'          MobileMetricCert             Octatco 모바일 생체 인증
'pcMetricCert'              PCMetricCert                 Octatco PC 생체/FIDO 인증
'certificationSMS'          CertificationSMS             일반 SMS/이메일/카카오톡 2차 인증
'certificationOTP'          CertificationOTP             일반 OTP 2차 인증
'findId'                    FindUserId                   아이디 찾기
'findPwd'                   FindUserPwd                  비밀번호 찾기
'passwordChange'            PasswordChange               초기/임시 비밀번호 변경
'passwordNotChangedLongTime' PasswordNotChangedLongTime  비밀번호 장기 미변경 안내
```

초기값 결정 로직 (`created` 훅):

```javascript
// sessionStorage에 octatcoUsgYn === 'true'가 저장되어 있으면 Octatco 로그인 폼 표시
// permission.js의 tntExists()에서 테넌트 정보 조회 시 이 값이 세팅됨
if (sessionStorage.getItem('octatcoUsgYn') === 'true') {
  this.visible.isForm = 'octatcoLogin';   // Octatco 로그인
} else {
  this.visible.isForm = 'login';          // 일반 로그인
}
```

컴포넌트 간 전환은 `setVisible(formCd, formNm)` 메서드로 이뤄진다. 자식 컴포넌트가 `$emit('setVisible', 'certificationSMS', '본인 인증')` 형태로 호출하면 index.vue가 `visible.isForm` 값을 바꿔 화면을 전환한다.

---

## 경로 A: 일반 로그인 — `components/Login.vue`

### 1차 인증: ID + 비밀번호

폼 데이터:

| 필드 | 값 | 출처 |
|------|-----|------|
| `acct_conn_id` | 사용자 아이디 | 직접 입력 (localStorage에 저장된 값으로 자동 채움 가능) |
| `passwd` | 비밀번호 | 직접 입력 |
| `tnt_url_id` | 테넌트 ID | sessionStorage에서 가져옴 |

`handleLogin()` 실행 시:

1. `loginValidSchema`로 폼 유효성 검사 (yup 기반)
2. `POST /v1/gw/authentications/` 호출
3. 응답 데이터의 필드에 따라 분기

### 1차 인증 후 분기

```javascript
// Login.vue handleLogin() 응답 처리 (218행~)
const data = res.data;
const token = res.headers.authorization;

// 1. challenge_id, acct_sts_cd를 sessionStorage에 저장
// 2. userAuthInfo를 Vuex store에 저장 (2차 인증에서 참조)
```

분기 조건과 이동 대상:

```
응답 데이터 확인
  │
  ├── acct_2nd_cert_tgt_yn === 'Y'  (2차 인증 대상)
  │     ├── n2nd_cert_typ_cd === 'U004SMS' → certificationSMS (SMS 인증)
  │     ├── n2nd_cert_typ_cd === 'U004EML' → certificationSMS (이메일 인증, 같은 컴포넌트 사용)
  │     ├── n2nd_cert_typ_cd === 'U004OTP' → certificationOTP (OTP 인증)
  │     └── n2nd_cert_typ_cd === 'U004KKT' → certificationSMS (카카오톡 인증, 같은 컴포넌트 사용)
  │
  ├── passwd_mdfy_tgt_yn === 'Y'  (초기/임시 비밀번호 변경 필요)
  │     → passwordChange
  │
  ├── passwd_mdfy_vlid_yn === 'Y' && ad_itlk_acct_yn !== 'Y'  (비밀번호 장기 미변경 & AD 미연동)
  │     → passwordNotChangedLongTime
  │
  └── 그 외 (정상)
        → authLogin() 호출 → 홈 화면 진입
```

### SMS/이메일/카카오톡 2차 인증 — `components/CertificationSMS.vue`

SMS, 이메일, 카카오톡 인증을 하나의 컴포넌트에서 처리한다. `n2nd_cert_typ_cd` 값에 따라 안내 문구와 발송 버튼 텍스트만 달라진다.

```
인증번호 발송 요청
  POST /v1/nauth/auth/authentications/2nd_cert
  body: { acct_conn_id, n2nd_cert_typ_cd, tnt_url_id, challenge_id }
    ↓
인증번호 입력 폼 표시 (5분 타이머 시작)
    ↓
인증번호 검증 요청
  POST /v1/gw/authentications/2nd_cert/{tnt_url_id}/{acct_conn_id}/{challenge_id}/{인증번호}
    ↓ 성공
  certificationPass 이벤트를 index.vue로 emit
```

index.vue의 `certificationPass()` 메서드가 이벤트를 받아서 추가 분기한다:

```javascript
// index.vue certificationPass() (587행~)
certificationPass(data, pageNm) {
  if (data.userAuthInfo.passwd_mdfy_tgt_yn === 'Y' && ad_itlk_acct_yn !== 'Y') {
    // 2차 인증 통과했지만 비밀번호 변경이 필요한 경우
    → passwordChange 화면으로 전환
  } else if (data.userAuthInfo.passwd_mdfy_vlid_yn === 'Y' && ad_itlk_acct_yn !== 'Y') {
    // 비밀번호 장기 미변경
    → passwordNotChangedLongTime 화면으로 전환
  } else {
    // 정상: Login.vue의 authLogin() 호출
    this.$refs.userLogin.authLogin(userInfoData);
  }
}
```

에러 처리:

| 에러 코드 | 상황 | 동작 |
|-----------|------|------|
| `AUTH-4220` / `AUTH-4216` | 과도한 발송 또는 세션 만료 | challenge_id 삭제, 로그인 화면으로 복귀 |
| `AUTH-4219` | 유효하지 않은 전화번호 | 에러 팝업 표시, 발송 화면 유지 |
| `AUTH-4214` | 인증번호 불일치 | 에러 팝업 표시 |

### OTP 2차 인증 — `components/CertificationOTP.vue`

Google OTP 앱에서 생성한 6자리 인증번호를 입력한다. SMS와 달리 인증번호 발송 단계가 없다.

```
OTP 인증번호 입력
    ↓
POST /v1/gw/authentications/2nd_cert/{tnt_url_id}/{acct_conn_id}/{challenge_id}/{인증번호}/totp
    ↓ 성공
certificationPass 이벤트 emit → index.vue에서 분기 처리
```

OTP 키를 분실한 경우, "OTP 앱 설치 주소·인증 QR코드 메일 요청" 링크를 눌러 `POST /v1/nauth/auth/authentications/2nd_cert`로 QR코드 재발급 메일을 요청할 수 있다.

---

## 경로 B: Octatco 로그인 — `components/octatco/`

Octatco의 개념, 일반 로그인과의 차이, 지원 인증 수단은 [Octatco 용어 정의](../term/02-octatco.md) 참고.

테넌트의 `octatcoUsgYn`이 `true`일 때 이 경로를 사용한다.

### B-1. 아이디 확인 — `OctatcoLogin.vue`

```
아이디 입력 (비밀번호 없음)
    ↓
GET v1/nauth/user/external/octatco/idcheck/{tnt_url_id}?employeeId={아이디}
    ↓ 성공: result 객체에 사용 가능한 인증 수단 정보 포함
setSecondAuthOption 이벤트로 인증 옵션 전달
    ↓
→ octatcoSecAuthSel (인증 수단 선택 화면)
```

### B-2. 인증 수단 선택 — `SecAuthSelect.vue`

서버 응답의 status 필드가 `'true'`인 수단만 버튼으로 표시한다:

| secondOptions 필드 | 인증 수단 | 선택 시 이동 |
|---|---|---|
| `emailStatus` | 이메일 인증 | → `octatcoSecondCert` |
| `smsStatus` | SMS 인증 | → `octatcoSecondCert` |
| `otpStatus` | OTP 인증 | → `octatcoSecondCert` |
| `mobileAuthenticationStatus` | 모바일 생체 인증 | → `mobileMetricCert` |
| `pcAuthenticationStatus` | PC 생체 인증 | → `pcMetricCert` |
| `fidoSecurityKeyStatus` | FIDO 보안키 인증 | → `pcMetricCert` |

### B-3a. EMAIL/SMS/OTP 인증 — `SecondCert.vue`

```
마운트 시 인증번호 발송 요청 (OTP 제외)
  POST v1/nauth/user/external/octatco/reqToken/{tnt_url_id}
  body: { userId, employeeId, octatcoType }
    ↓
인증번호 입력 (5분 타이머)
    ↓
인증번호 검증
  POST v1/nauth/user/external/octatco/userLogin/{tnt_url_id}
  body: { userId, employeeId, octatcoType, code }
    ↓ 성공
응답에서 사용자 정보 + 토큰 획득
  → octatcoCertificationPass 이벤트 emit
```

### B-3b. 모바일 생체 인증 — `MobileMetricCert.vue`

MQTT를 사용한 push 기반 생체 인증이다.

```
마운트 시 디바이스 목록 요청
  POST v1/nauth/user/external/octatco/reqToken/{tnt_url_id}
    ↓
디바이스 선택 (Galaxy S23 등)
    ↓
인증 요청 (push 발송)
  POST v1/nauth/user/external/octatco/userLogin/{tnt_url_id}
  body: { userId, employeeId, octatcoType, deviceId }
    ↓
응답의 topic으로 MQTT 구독 시작 (30초 타임아웃)
    ↓ 모바일 기기에서 생체 인증 완료 → MQTT로 serial 수신
인증 결과 검증
  POST /v1/nauth/user/external/octatco/loginCheck/{tnt_url_id}/{serial}
    ↓ 성공
  → octatcoCertificationPass 이벤트 emit
```

### B-3c. PC 생체/FIDO 인증 — `PCMetricCert.vue`

WebAuthn API를 사용한 브라우저 기반 생체 인증이다. Windows Hello, 지문 인식기, FIDO 보안키 등을 지원한다.

```
마운트 시 challenge 요청
  POST v1/nauth/user/external/octatco/reqToken/{tnt_url_id}
  body: { userId, employeeId, octatcoType, type: 'platform'|'ctap' }
    ↓
응답에서 challenge, rpId, allowCredentials 추출
    ↓
navigator.credentials.get({ publicKey }) 호출
  → 브라우저가 생체 인증 UI 표시 (30초 타임아웃)
    ↓ 사용자가 지문/얼굴/보안키로 인증
응답 데이터(signature, authenticatorData 등) 서버 전송
  POST v1/nauth/user/external/octatco/userLogin/{tnt_url_id}
    ↓ 성공
  → octatcoCertificationPass 이벤트 emit
```

### B-4. Octatco 인증 완료 처리

index.vue의 `octatcoCertificationPass()`가 이벤트를 받는다:

```javascript
// index.vue octatcoCertificationPass() (614행~)
octatcoCertificationPass(data, pageNm) {
  // OctatcoLogin.vue의 authLogin() 호출
  this.$refs.octatcoLogin.authLogin({
    user: data.userAuthInfo,
    token: data.userAuthToken,
  });
}
```

일반 로그인과 달리 비밀번호 변경 분기 없이 바로 `authLogin()` → 홈 화면으로 이동한다.

---

## 비밀번호 변경 화면

### 초기/임시 비밀번호 변경 — `PasswordChange.vue`

1차 인증이나 2차 인증 후 `passwd_mdfy_tgt_yn === 'Y'`이면 이 화면으로 전환된다.

```
현재 비밀번호 + 새 비밀번호 + 새 비밀번호 확인 입력
    ↓
PUT /v1/auth/authentications/accounts/firstpassword
  body: { acct_conn_id, passwd, new_passwd, new_passwd_confirm }
    ↓ 성공
  → $router.replace('/:tenant/home') 으로 직접 이동
```

진입 시 sessionStorage에서 토큰을 임시 변수에 보관하고 삭제한다. 비밀번호 변경 성공 시에만 토큰을 복원해서 API를 호출한다. 새로고침하거나 취소하면 토큰이 없으므로 자연스럽게 로그인 화면으로 돌아간다.

### 비밀번호 장기 미변경 — `PasswordNotChangedLongTime.vue`

`passwd_mdfy_vlid_yn === 'Y'`이고 AD 미연동 계정일 때 표시된다.

```
"장기간 동안 비밀번호가 변경되지 않았습니다" 안내
    ├── [변경하기] → passwordChange 화면으로 전환
    └── [다음에 하기] → Login dispatch 후 홈 화면 이동
```

"다음에 하기"를 선택하면 index.vue에서 전달받은 `tmpUserInfo`(user + token)로 Vuex Login을 실행하고 `/:tenant/home`으로 이동한다.

---

## 홈 화면 진입 — `authLogin()` → `nextRouter()`

일반 로그인과 Octatco 로그인 모두 최종적으로 `authLogin()` → `nextRouter()`를 거친다.

### authLogin() — Vuex 상태 저장

```javascript
// Login.vue authLogin() (358행~) / OctatcoLogin.vue authLogin() (223행~)
authLogin(data) {
  this.$store.dispatch('Login', {
    user: data.user,
    token: data.token,
  }).then(() => {
    // 아이디 저장 체크 시 localStorage에 기록
    if (this.option.rememberMe) {
      localStorage.rememberMe = this.model.login.acct_conn_id;
    }
    this.nextRouter();
  });
}
```

Vuex `Login` 액션이 실행하는 mutation:

| mutation | 저장 위치 | 값 |
|---|---|---|
| `SET_USER` | sessionStorage.user | 사용자 전체 정보 (JSON) |
| `SET_TOKEN` | sessionStorage.Authorization | JWT 토큰 |
| `SET_NAME` | sessionStorage.name | 사용자 이름 (acct_nm) |
| `SET_ROLES` | sessionStorage.roles | 권한 그룹 (grp_typ_cd) |
| `SET_ACCT_CONN_ID` | sessionStorage.acct_conn_id | 로그인 아이디 |
| `SET_ACCT_ID` | sessionStorage.acct_id | 계정 ID |
| `SET_USR_GRP_ID` | sessionStorage.userGrpId | 사용자 그룹 ID |
| `SET_CONN_NET_CD` | sessionStorage.connNetCd | 접속 네트워크 코드 |
| `SET_CERT_PLCY_ID` | sessionStorage.certPlcyId | 인증 정책 ID |

### nextRouter() — 라우트 결정

```javascript
// Login.vue nextRouter() (378행~)
nextRouter() {
  let path = '/' + sessionStorage.getItem('tnt_url_id') + '/home';

  const user = this.userData;

  if (user.acct_sts_cd === 'U013IN') {
    path = '/initialized';   // 초기화 상태 계정
  } else {
    if (this.$route.query && this.$route.query.redirect) {
      path = '/';            // redirect 파라미터 무시하고 홈으로
    }
  }
  this.$router.replace(path);
}
```

`$router.replace(path)` 호출 → permission.js `beforeEach`에서 토큰 확인 → 통과 → `Layout.vue` 렌더링 → `HomePage.vue` 표시.

---

## 토큰 관리

### 저장소 — `src/utils/auth.js`

```javascript
const TokenKey = 'Authorization'

export function getToken()    { return sessionStorage.getItem(TokenKey) }
export function setToken(token) { return sessionStorage.setItem(TokenKey, token) }
export function removeToken() { return sessionStorage.removeItem(TokenKey) }
```

### HTTP 인터셉터 — `src/utils/request.js`

요청 시: `config.headers['authorization'] = getToken()`
응답 시: 헤더에 새 토큰이 오면 `sessionStorage.setItem('Authorization', response.headers['authorization'])`로 갱신.
401 응답: 토큰 제거 후 로그인 페이지로 리다이렉트.

---

## 참조

- [상태 코드 및 에러 코드](../term/03-codes.md) — `acct_sts_cd`, `n2nd_cert_typ_cd`, `AUTH-xxxx` 에러 코드
- [AD 연동](../term/01-ad.md) — `ad_itlk_acct_yn` 등 AD 관련 설정값
- [Octatco](../term/02-octatco.md) — Octatco 개념, 인증 수단

API 명세:
- [gw-authentications](../api/gw/authentications/01-authentications.md)
- [nauth-authentications](../api/nauth/auth/01-authentications.md)
- [octatco](../api/nauth/user/03-octatco.md)
- [auth-authentications](../api/auth/authentications/01-authentications.md)
