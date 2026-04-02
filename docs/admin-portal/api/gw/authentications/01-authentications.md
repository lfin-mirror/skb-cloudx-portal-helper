# GW 인증 API

## 사용 화면
- (화면 문서 미작성 — 로그인/2차 인증 흐름에서 사용)

게이트웨이(gw)를 통한 관리자 로그인, 2차 인증 검증, 초기 비밀번호 변경 API.

> **인증 토큰 불필요**: `/v1/gw/authentications` 경로는 `Authorization` 헤더 없이 호출 가능 (`request.js:54-58` 참고)

---

## POST /v1/gw/authentications/admin

### 관리자 1차 로그인

**호출 위치**: `views/login/index.vue:664`

#### 요청 바디

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| `acct_conn_id` | string | Y | 관리자 계정 ID (최대 50자) |
| `passwd` | string | Y | 비밀번호 (최대 32자, 영문+숫자+특수문자 조합 9자 이상) |

#### 응답

| 필드명 | 타입 | 설명 |
|--------|------|------|
| `acct_id` | string | 계정 고유 ID |
| `acct_nm` | string | 계정명 |
| `acct_conn_id` | string | 계정 로그인 ID |
| `grp_typ_cd` | string | 권한 그룹 코드 (`U001SUP`: 슈퍼어드민, `U001TNT`: 테넌트어드민) |
| `acct_sts_cd` | string | 계정 상태 코드 (`U013NR`: 정상, `U013SL`: 휴면) |
| `acct_2nd_cert_tgt_yn` | string | 2차 인증 대상 여부 (`Y`/`N`) |
| `n2nd_cert_typ_cd` | string | 2차 인증 방식 코드 (`U004SMS`: SMS 인증) |
| `challenge_id` | string | 2차 인증 챌린지 ID |
| `passwd_mdfy_tgt_yn` | string | 초기 비밀번호 변경 필요 여부 (`Y`/`N`) |
| `passwd_mdfy_vlid_yn` | string | 비밀번호 변경 권고 여부 (`Y`/`N`) |
| `x_real_ip` | string | 로그인 사용자의 실제 접속 IP |
| `tnt_id` | string | 테넌트 ID |
| `tnt_nm` | string | 테넌트명 |
| `vm_grp_id` | string | VM 그룹 ID |
| `serv_grp_id` | string | 서비스 그룹 ID |
| `serv_grp_nm` | string | 서비스 그룹명 |

#### 응답 헤더

| 헤더명 | 설명 |
|--------|------|
| `Authorization` | 발급된 Access Token (2차 인증 불필요 계정의 경우 즉시 발급) |

#### 로그인 후 분기

| 조건 | 다음 단계 |
|------|----------|
| `acct_2nd_cert_tgt_yn === 'Y'` + `n2nd_cert_typ_cd === 'U004SMS'` | SMS 2차 인증 화면 전환 |
| `acct_2nd_cert_tgt_yn !== 'Y'` + `passwd_mdfy_tgt_yn === 'Y'` | 초기 비밀번호 변경 화면 전환 |
| 그 외 | 정상 로그인 처리 (토큰 저장 후 대시보드 이동) |

---

## POST /v1/gw/authentications/2nd_cert/{acct_conn_id}/{challenge_id}/{code}

### 2차 인증 검증

**호출 위치**: `views/login/index.vue:768`

#### 경로 파라미터

| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| `acct_conn_id` | string | Y | 계정 로그인 ID |
| `challenge_id` | string | Y | 1차 로그인 응답의 `challenge_id` |
| `code` | string | Y | SMS로 수신한 6자리 인증 코드 |

#### 요청 바디

없음 (경로 파라미터만 사용)

#### 응답

| 필드명 | 타입 | 설명 |
|--------|------|------|
| `passwd_mdfy_tgt_yn` | string | 초기 비밀번호 변경 필요 여부 (`Y`/`N`) |
| (그 외 필드) | - | 1차 로그인 응답과 동일한 사용자 정보 |

#### 응답 헤더

| 헤더명 | 설명 |
|--------|------|
| `Authorization` | 발급된 Access Token |

#### 검증 후 분기

| 조건 | 다음 단계 |
|------|----------|
| `passwd_mdfy_tgt_yn === 'Y'` | 초기 비밀번호 변경 화면 전환 |
| 그 외 | 정상 로그인 처리 |

#### 에러 코드

| 코드 | 설명 |
|------|------|
| `AUTH-4220` | 계정 잠금 (로그인 페이지로 강제 이동) |
| `AUTH-4216` | 인증 실패 한도 초과 (로그인 페이지로 강제 이동) |

---

## PUT /v1/gw/authentications/accounts/firstpassword

### 초기 비밀번호 변경

최초 로그인 시 또는 관리자 비밀번호 초기화 후 강제 변경.

**호출 위치**: `views/login/index.vue:808`

#### 요청 바디

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| `acct_conn_id` | string | Y | 계정 로그인 ID |
| `passwd` | string | Y | 현재 비밀번호 (최대 32자) |
| `new_passwd` | string | Y | 새 비밀번호 (최대 32자, 영문+숫자+특수문자 조합 9자 이상) |
| `new_passwd_confirm` | string | Y | 새 비밀번호 확인 (최대 32자) |

#### 응답

성공 시 HTTP 200. 변경 완료 후 로그아웃 처리되며 로그인 페이지로 이동.

#### 비밀번호 규칙

- 영문(대소문자), 숫자, 특수문자(`#?!@$%^&*-`) 중 3종류 이상 조합
- 최소 9자 이상
