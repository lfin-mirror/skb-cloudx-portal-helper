# NAUTH 인증 API

## 사용 화면
- (화면 문서 미작성 — 로그인/인증 흐름에서 사용)

인증 토큰 없이 호출 가능한 인증 관련 API (`/nauth` 경로는 토큰 검증 대상 제외).

> **인증 토큰 불필요**: `/nauth` 경로는 `Authorization` 헤더 없이 호출 가능 (`request.js:54` 참고)

---

## POST /v1/nauth/auth/authentications/2nd_cert

### SMS 2차 인증 코드 발송

1차 로그인 성공 후 SMS 인증 코드 발송 요청.

**호출 위치**: `views/login/index.vue:703`

#### 요청 바디

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| `acct_conn_id` | string | Y | 계정 로그인 ID |
| `n2nd_cert_typ_cd` | string | Y | 2차 인증 방식 코드 (1차 로그인 응답값, `U004SMS`) |
| `challenge_id` | string | Y | 1차 로그인 응답의 챌린지 ID |

#### 응답

| 필드명 | 타입 | 설명 |
|--------|------|------|
| `result_message` | string | 발송 결과 메시지 (성공 알림에 표시) |

#### 에러 코드

| 코드 | 설명 |
|------|------|
| `AUTH-4220` | 계정 잠금 (로그인 페이지로 강제 이동) |
| `AUTH-4216` | 인증 실패 한도 초과 (로그인 페이지로 강제 이동) |

#### 비고

- 발송 성공 후 클라이언트에서 180초 카운트다운 시작
- 카운트다운 만료 시 인증 코드 입력 버튼 비활성화

---

## POST /v1/nauth/auth/authentications/accounts

### 아이디 찾기

이름과 휴대폰 번호로 등록된 계정 ID를 조회하여 SMS/이메일로 발송.

**호출 위치**: `views/login/index.vue:900`

#### 요청 바디

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| `acct_nm` | string | Y | 계정 이름 (최대 30자) |
| `mob_no` | string | Y | 휴대폰 번호 (최대 11자, 숫자만) |
| `portal_type` | string | Y | 포털 구분 코드 (`A007ADM`: 관리자 포털 고정값) |

#### 응답

| 필드명 | 타입 | 설명 |
|--------|------|------|
| `result_message` | string | 처리 결과 메시지 (성공 알림에 표시) |

---

## POST /v1/nauth/auth/authentications/temp/passwd

### 임시 비밀번호 발급

계정 ID, 이름, 휴대폰 번호 확인 후 임시 비밀번호를 SMS/이메일로 발송.

**호출 위치**: `views/login/index.vue:920`

#### 요청 바디

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| `acct_conn_id` | string | Y | 계정 로그인 ID (최대 50자) |
| `acct_nm` | string | Y | 계정 이름 (최대 30자) |
| `mob_no` | string | Y | 휴대폰 번호 (최대 11자, 숫자만) |
| `portal_type` | string | Y | 포털 구분 코드 (`A007ADM`: 관리자 포털 고정값) |
| `grp_typ_cd` | string | N | 그룹 유형 코드 (`U001TNT`) |

#### 응답

| 필드명 | 타입 | 설명 |
|--------|------|------|
| `result_message` | string | 처리 결과 메시지 (성공 알림에 표시) |
