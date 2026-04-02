# AUTH 인증 API

## 사용 화면
- (화면 문서 미작성 — 비밀번호 변경/본인 확인 기능에서 사용)

로그인된 사용자의 비밀번호 변경 및 본인 확인 API.

> **인증 토큰 필요**: `/v1/auth` 경로는 요청 헤더에 `Authorization` 토큰 필요

---

## POST /v1/auth/authentications/

### 현재 비밀번호 확인 (본인 인증)

회원정보 변경 전 현재 비밀번호로 본인 확인.

**호출 위치**: `components/Modals/Admin/CheckPW.vue:79`

#### 요청 바디

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| `acct_conn_id` | string | Y | 계정 로그인 ID (sessionStorage에서 조회) |
| `passwd` | string | Y | 현재 비밀번호 (최대 20자) |

#### 응답

HTTP 200 성공 시 회원정보 변경 페이지(`/userInfo`)로 이동.

#### 에러 코드

| 코드 | 설명 |
|------|------|
| `AUTH-4220` | 계정 잠금 |
| `AUTH-4216` | 인증 실패 한도 초과 |
| `AUTH-4217` | 인증 오류 |
| `AUTH-4209` | 기타 인증 오류 |

---

## PUT /v1/auth/authentications/accounts/password

### 비밀번호 변경

로그인 상태에서 현재 비밀번호 확인 후 새 비밀번호로 변경.

**호출 위치**: `views/user/subComponent/pwdEdit.vue:173`

#### 요청 바디

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| `acct_conn_id` | string | Y | 계정 로그인 ID (store에서 조회) |
| `passwd` | string | Y | 현재 비밀번호 (최대 32자) |
| `new_passwd` | string | Y | 새 비밀번호 (최대 32자, 비밀번호 규칙 적용) |
| `new_passwd_confirm` | string | Y | 새 비밀번호 확인 (최대 32자) |

#### 응답

| 필드명 | 타입 | 설명 |
|--------|------|------|
| (boolean) | boolean | `true` 반환 시 변경 성공 알림 표시 |

#### 비밀번호 규칙 (클라이언트 검증)

- 영문 소문자, 숫자, 특수문자(`#?!@$%^&*-`) 중 3종류 이상 조합
- 최소 8자 이상
- 현재 비밀번호와 새 비밀번호가 동일하면 오류
