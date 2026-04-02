# NAUTH 인증 API

## 사용 화면
- [로그인 → 홈 화면 진입 흐름](../../../auth/02-login-to-home-flow.md)
- [아이디 찾기, 비밀번호 초기화, AD 연동](../../../auth/03-account-recovery-and-ad.md)

인증 없이 접근 가능한 인증 관련 API (2차 인증 코드 요청, 아이디 찾기, 임시 비밀번호 발급).

---

## POST `/v1/nauth/auth/authentications/2nd_cert`

2차 인증 코드 발송 요청. SMS/이메일/카카오톡/OTP QR코드를 사용자에게 발송한다.

### 요청 Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_conn_id | string | Y | 사용자 아이디 (`userAuthInfo.acct_conn_id`) |
| n2nd_cert_typ_cd | string | Y | 2차 인증 수단 코드 (`U004SMS`, `U004EML`, `U004OTP`, `U004KKT`) |
| tnt_url_id | string | Y | 테넌트 URL ID |
| challenge_id | string | Y | 챌린지 ID (sessionStorage의 `challenge_id`) |

### 응답 Body

| 필드 | 타입 | 설명 |
|------|------|------|
| result_message | string | 발송 결과 메시지 (팝업으로 표시) |

### 에러 코드

| 코드 | 설명 |
|------|------|
| AUTH-4216 | 인증 세션 만료 (challenge_id 삭제 후 로그인 화면으로 이동) |
| AUTH-4219 | 유효하지 않은 전화번호 (인증번호 발송 화면 유지) |
| AUTH-4220 | 과도한 인증번호 발송으로 30분 이용 제한 (제한 안내 화면으로 전환) |

### 비고

- OTP QR코드 재발급 요청 시에도 동일 엔드포인트 사용 (`n2nd_cert_typ_cd: 'U004OTP'`)
- 성공 시 5분 타이머 시작, 타이머 만료 시 인증번호 입력 불가

### 호출 위치

- `views/login/components/CertificationSMS.vue:218` (인증번호 발송)
- `views/login/index.vue:668` (OTP QR코드 재발급)

---

## POST `/v1/nauth/auth/authentications/accounts`

아이디 찾기. 이름과 휴대폰 번호로 등록된 아이디를 이메일로 발송한다.

### 요청 Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_nm | string | Y | 사용자 이름 |
| mob_no | string | Y | 휴대폰 번호 (`-` 제외 숫자만, 최대 12자) |
| portal_type | string | Y | 포털 유형 (`A007USR` 고정) |
| tnt_url_id | string | Y | 테넌트 URL ID (sessionStorage에서 주입) |

### 응답 Body

| 필드 | 타입 | 설명 |
|------|------|------|
| result_message | string | 처리 결과 메시지 (팝업으로 표시) |

### 에러 코드

| 코드 | 설명 |
|------|------|
| (errCode 필드로 반환) | 실패 시 `res.errMsg`를 팝업으로 표시 |

### 비고

- 성공 시 등록된 이메일로 아이디 발송 후 로그인 화면으로 이동

### 호출 위치

- `views/login/components/FindUserId.vue:122`

---

## POST `/v1/nauth/auth/authentications/temp/passwd`

임시 비밀번호 발급. 아이디/이름/휴대폰 번호 확인 후 임시 비밀번호를 이메일로 발송한다.

### 요청 Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_conn_id | string | Y | 사용자 아이디 |
| acct_nm | string | Y | 사용자 이름 |
| mob_no | string | Y | 휴대폰 번호 (`-` 제외 숫자만, 최대 11자) |
| portal_type | string | Y | 포털 유형 (`A007USR` 고정) |
| tnt_url_id | string | Y | 테넌트 URL ID (sessionStorage에서 주입) |

### 응답 Body

| 필드 | 타입 | 설명 |
|------|------|------|
| result_message | string | 처리 결과 메시지 (팝업으로 표시) |

### 에러 코드

| 코드 | 설명 |
|------|------|
| (errCode 필드로 반환) | 실패 시 `res.errMsg`를 팝업으로 표시 |

### 비고

- 성공 시 등록된 이메일로 임시 비밀번호 발송 후 로그인 화면으로 이동
- AD 연동 테넌트에서는 비밀번호 초기화 버튼 자체가 노출되지 않음 (`isAdItlkUsage` 조건)

### 호출 위치

- `views/login/components/FindUserPwd.vue:147`
