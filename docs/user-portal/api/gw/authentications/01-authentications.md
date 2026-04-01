# GW 인증 API

게이트웨이 경유 로그인 및 2차 인증 API.

---

## POST `/v1/gw/authentications/`

1차 로그인 인증. 아이디/비밀번호를 검증하고 2차 인증 여부 및 계정 상태를 반환한다.

### 요청 Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_conn_id | string | Y | 사용자 아이디 |
| passwd | string | Y | 비밀번호 (최대 32자) |
| tnt_url_id | string | Y | 테넌트 URL ID (sessionStorage에서 주입) |

### 응답 Header

| 헤더 | 설명 |
|------|------|
| Authorization | 인증 토큰 (로그인 성공 시) |

### 응답 Body

| 필드 | 타입 | 설명 |
|------|------|------|
| challenge_id | string | 2차 인증용 챌린지 ID |
| acct_sts_cd | string | 계정 상태 코드 (`U013NR`: 정상, `U013SL`: 휴면, `U013IN`: 초기화) |
| acct_2nd_cert_tgt_yn | string | 2차 인증 대상 여부 (`Y`/`N`) |
| n2nd_cert_typ_cd | string | 2차 인증 수단 코드 (`U004SMS`, `U004EML`, `U004OTP`, `U004KKT`) |
| passwd_mdfy_tgt_yn | string | 초기/임시 비밀번호 변경 필요 여부 (`Y`/`N`) |
| passwd_mdfy_vlid_yn | string | 비밀번호 장기간 미변경 여부 (`Y`/`N`) |
| ad_itlk_acct_yn | string | AD 연동 계정 여부 (`Y`/`N`) |
| acct_conn_id | string | 사용자 아이디 |
| acct_id | string | 계정 내부 ID |
| acct_nm | string | 사용자 이름 |
| grp_typ_cd | string | 그룹 유형 코드 |
| tnt_url_id | string | 테넌트 URL ID |
| error | object | 에러 객체 (실패 시) |
| error.comment | string | 에러 메시지 |

### 에러 코드

| 코드 | 설명 |
|------|------|
| (errCode 필드로 반환) | 로그인 실패 시 `res.errCode` / `res.errMsg` 로 전달 |

### 로그인 후 분기

| 조건 | 동작 |
|------|------|
| `acct_2nd_cert_tgt_yn === 'Y'` + `n2nd_cert_typ_cd === 'U004SMS'` | SMS 2차 인증 화면으로 이동 |
| `acct_2nd_cert_tgt_yn === 'Y'` + `n2nd_cert_typ_cd === 'U004EML'` | 이메일 2차 인증 화면으로 이동 (SMS 컴포넌트 공용) |
| `acct_2nd_cert_tgt_yn === 'Y'` + `n2nd_cert_typ_cd === 'U004OTP'` | OTP 2차 인증 화면으로 이동 |
| `acct_2nd_cert_tgt_yn === 'Y'` + `n2nd_cert_typ_cd === 'U004KKT'` | 카카오톡 인증 화면으로 이동 (SMS 컴포넌트 공용) |
| `passwd_mdfy_tgt_yn === 'Y'` | 초기/임시 비밀번호 변경 화면으로 이동 |
| `passwd_mdfy_vlid_yn === 'Y'` + AD 미연동 | 장기 미변경 비밀번호 안내 화면으로 이동 |
| 그 외 | 홈으로 이동 (`/{tnt_url_id}/home`) |

### 호출 위치

- `views/login/components/Login.vue:218`

---

## POST `/v1/gw/authentications/2nd_cert/{tenant}/{acctConnId}/{challengeId}/{certNo}`

SMS/이메일/카카오톡 2차 인증 코드 검증.

### Path 파라미터

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| tenant | string | 테넌트 URL ID |
| acctConnId | string | 사용자 아이디 (`userAuthInfo.acct_conn_id`) |
| challengeId | string | 챌린지 ID (sessionStorage의 `challenge_id`) |
| certNo | string | 사용자가 입력한 인증번호 (숫자 최대 6자리) |

### 요청 Body

없음 (모든 파라미터는 Path로 전달).

### 응답 Header

| 헤더 | 설명 |
|------|------|
| Authorization | 인증 토큰 (검증 성공 시) |

### 응답 Body

성공 시 `res.errCode` 없음. 실패 시 에러 코드 반환.

### 에러 코드

| 코드 | 설명 |
|------|------|
| AUTH-4214 | 인증번호 불일치 |
| AUTH-4216 | 인증 세션 만료 |
| AUTH-4220 | 과도한 인증 시도로 30분 이용 제한 |

### 호출 위치

- `views/login/components/CertificationSMS.vue:270`

---

## POST `/v1/gw/authentications/2nd_cert/{tntUrlId}/{acctConnId}/{challengeId}/{otpNo}/totp`

OTP(TOTP) 2차 인증 코드 검증.

### Path 파라미터

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| tntUrlId | string | 테넌트 URL ID (sessionStorage의 `tnt_url_id`, 없으면 `'sovereignVDI'` fallback) |
| acctConnId | string | 사용자 아이디 (`userAuthInfo.acct_conn_id`) |
| challengeId | string | 챌린지 ID (sessionStorage의 `challenge_id`) |
| otpNo | string | OTP 앱에서 생성한 인증번호 (숫자 최대 6자리) |

### 요청 Body

없음 (모든 파라미터는 Path로 전달).

### 응답 Header

| 헤더 | 설명 |
|------|------|
| Authorization | 인증 토큰 (검증 성공 시) |

### 응답 Body

성공 시 `res.errCode` 없음. 실패 시 에러 코드 반환.

### 에러 코드

| 코드 | 설명 |
|------|------|
| AUTH-4214 | 인증번호 불일치 (인증 실패 메시지 표시, 화면 유지) |
| AUTH-4216 | 인증 세션 만료 (로그인 화면으로 이동) |
| AUTH-4220 | 과도한 인증 시도로 30분 이용 제한 (로그인 화면으로 이동) |

### 호출 위치

- `views/login/components/CertificationOTP.vue:116`
