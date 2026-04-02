# Octatco 인증 API

## 사용 화면
- [로그인 → 홈 화면 진입 흐름](../../../auth/02-login-to-home-flow.md)
- [MQTT 기반 모바일 생체 인증](../../../mobile/03-mqtt-mobile-biometric.md)

Octatco 외부 인증 연동 API. 아이디 확인 → 인증 토큰 요청 → 인증 검증 순서로 호출한다.

---

## GET `/v1/nauth/user/external/octatco/idcheck/{tntUrlId}`

Octatco 아이디 존재 여부 확인 및 사용 가능한 2차 인증 수단 목록 조회.

### Path 파라미터

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| tntUrlId | string | 테넌트 URL ID |

### 요청 Query 파라미터

| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| employeeId | string | Y | 사용자 아이디 (`acct_conn_id`) |

### 응답 Body

| 필드 | 타입 | 설명 |
|------|------|------|
| result | object | Octatco 인증 결과 객체 |
| result.code | number | 결과 코드 (`5001`: 사용자 없음 등 실패) |
| result.content | string | 결과 메시지 (실패 시 팝업으로 표시) |
| result.employeeId | string | 직원 ID |
| result.userId | string | Octatco 내부 사용자 ID |
| result.octatcoType | string | 선택된 인증 수단 |
| (기타 2차 인증 옵션 필드) | | `secondOptions`로 저장 후 인증 수단 선택 화면에 전달 |

### 에러 처리

- `result.code === 5001`: 사용자 없음, `result.content`를 팝업으로 표시하고 아이디 입력 초기화
- `res.errCode` 존재: `getErrMsg(errCode, errMsg)` 변환 메시지를 팝업으로 표시

### 호출 위치

- `views/login/components/octatco/OctatcoLogin.vue:138`

---

## POST `/v1/nauth/user/external/octatco/reqToken/{tntUrlId}`

2차 인증 토큰(인증번호) 발송 요청. SMS/이메일/OTP는 코드 발송, 모바일 생체인증은 등록 디바이스 목록 반환, PC 생체인증은 FIDO 챌린지 반환.

### Path 파라미터

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| tntUrlId | string | 테넌트 URL ID (sessionStorage의 `tnt_url_id`) |

### 요청 Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| employeeId | string | Y | 직원 ID |
| octatcoType | string | Y | 인증 수단 (`SMS`, `EMAIL`, `OTP`, `BIO`, `FIDO`) |
| userId | string | Y | Octatco 내부 사용자 ID |
| type | string | 조건부 | PC 생체인증 시 `platform`(Windows Hello) 또는 `ctap`(FIDO 보안키) |

### 응답 Body (인증 수단별)

**SMS/EMAIL/OTP 공통:**

| 필드 | 타입 | 설명 |
|------|------|------|
| status | string | `'success'`: 발송 성공 |

**모바일 생체인증 (BIO):**

| 필드 | 타입 | 설명 |
|------|------|------|
| result | array | 등록된 디바이스 목록 |
| result[].deviceId | string | 디바이스 ID |
| result[].deviceName | string | 디바이스 이름 |

**PC 생체인증 (FIDO):**

| 필드 | 타입 | 설명 |
|------|------|------|
| result.Response.challenge | string | FIDO 챌린지 (base64url) |
| result.Response.rpId | string | Relying Party ID |
| result.Response.allowCredentials | array | 허용된 자격증명 목록 |

### 에러 코드

| 코드 | 설명 |
|------|------|
| AUTH-4218 | 인증 실패 (서버 반환 `errMsg` 표시) |

### 호출 위치

- `views/login/components/octatco/SecondCert.vue:80` (SMS/EMAIL/OTP 인증번호 발송)
- `views/login/components/octatco/MobileMetricCert.vue:144` (모바일 생체인증 디바이스 목록)
- `views/login/components/octatco/PCMetricCert.vue:115` (PC 생체인증 FIDO 챌린지)

---

## POST `/v1/nauth/user/external/octatco/userLogin/{tntUrlId}`

Octatco 인증 검증 및 로그인 처리. 인증 수단에 따라 코드/디바이스ID/FIDO 페이로드를 전달해 검증한다.

### Path 파라미터

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| tntUrlId | string | 테넌트 URL ID (sessionStorage의 `tnt_url_id`) |

### 요청 Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| userId | string | Y | Octatco 내부 사용자 ID |
| employeeId | string | Y | 직원 ID |
| octatcoType | string | Y | 인증 수단 (`SMS`, `EMAIL`, `OTP`, `BIO`, `FIDO`) |
| code | string | 조건부 | SMS/EMAIL/OTP 인증번호 |
| deviceId | string | 조건부 | 모바일 생체인증 시 선택한 디바이스 ID |
| type | string | 조건부 | PC 생체인증 시 `platform` 또는 `ctap` |
| payload | string | 조건부 | PC 생체인증 시 WebAuthn 인증 결과 JSON 문자열 |

### 응답 Header

| 헤더 | 설명 |
|------|------|
| Authorization | 인증 토큰 (SMS/EMAIL/OTP 인증 성공 시) |

### 응답 Body (SMS/EMAIL/OTP 성공)

로그인 사용자 정보 객체 (로그인 API 응답과 동일한 구조).

### 응답 Body (모바일 생체인증 성공)

| 필드 | 타입 | 설명 |
|------|------|------|
| result.topic | string | MQTT 토픽 (생체인증 결과 수신용) |

### 에러 코드

| 코드 | 설명 |
|------|------|
| AUTH-4218 | 인증번호 불일치 (화면 유지) |
| (기타 errCode) | `getErrMsg(errCode, errMsg)` 변환 메시지 + 로그인 화면으로 이동 |

### 비고

- 모바일 생체인증의 경우 응답의 `result.topic`으로 MQTT 구독 후 인증 완료 시 `/v1/nauth/user/external/octatco/loginCheck/{tntUrlId}/{serial}` 호출
- PC 생체인증의 경우 `navigator.credentials.get()`으로 WebAuthn 인증 수행 후 결과를 이 API에 전달

### 호출 위치

- `views/login/components/octatco/SecondCert.vue:167` (SMS/EMAIL/OTP 코드 검증)
- `views/login/components/octatco/MobileMetricCert.vue:196` (모바일 생체인증 push 발송)
- `views/login/components/octatco/PCMetricCert.vue:190` (PC 생체인증 FIDO 검증)

---

## GET `/v1/nauth/user/external/octatco/loginCheck/{tntUrlId}/{serial}`

모바일 생체인증 완료 후 최종 로그인 처리. MQTT를 통해 수신한 serial로 인증 결과를 확인한다.

### Path 파라미터

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| tntUrlId | string | 테넌트 URL ID (sessionStorage의 `tnt_url_id`) |
| serial | string | MQTT 토픽으로 수신한 serial 값 |

### 요청 Body (POST로 실제 호출됨)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| employeeId | string | Y | 직원 ID |

### 응답 Header

| 헤더 | 설명 |
|------|------|
| Authorization | 인증 토큰 (성공 시) |

### 응답 Body

로그인 사용자 정보 객체 (로그인 API 응답과 동일한 구조).

### 에러 코드

| 코드 | 설명 |
|------|------|
| OCTACO-1100 | 인증 시간 초과 또는 인증 거부 (재인증 화면으로 전환) |
| (기타 errCode) | `getErrMsg(errCode, errMsg)` 변환 메시지 + 로그인 화면으로 이동 |

### 비고

- MQTT 연결은 `userLogin` API 응답 후 즉시 수립, 인증 완료 시 이 API를 호출하고 MQTT 연결 종료
- 타이머 30초 경과 시 MQTT 연결 종료 및 재인증 화면으로 전환

### 호출 위치

- `views/login/components/octatco/MobileMetricCert.vue:216` (MQTT serial 수신 후 호출)
