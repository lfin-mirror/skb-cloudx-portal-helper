# VPN 자동 로그인 API

VPN 환경에서 원패스 토큰 기반 자동 로그인 API.

---

## POST `/v1/nauth/user/auth/check`

VPN 자동 로그인. URL 쿼리스트링의 `acct_conn_id`와 `onePassToken`으로 인증을 처리한다.

### 요청 Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acctConnId | string | Y | 사용자 아이디 (URL 쿼리스트링 `acct_conn_id`에서 추출) |
| onePassToken | string | Y | 원패스 토큰 (URL 쿼리스트링 `onePassToken`에서 추출) |

### 응답 Header

| 헤더 | 설명 |
|------|------|
| Authorization | 인증 토큰 (인증 성공 시) |

### 응답 Body

성공 시 로그인 사용자 정보 객체 반환 (로그인 API 응답과 동일한 구조).

| 필드 | 타입 | 설명 |
|------|------|------|
| tnt_nm | string | 테넌트 URL ID (sessionStorage의 `tnt_url_id`로 저장) |
| acct_sts_cd | string | 계정 상태 코드 |
| (기타 사용자 정보 필드) | | 로그인 응답과 동일 |
| error | object | 에러 객체 (실패 시) |
| error.reason | string | 에러 사유 |

### 에러 코드

| 코드 | 설명 |
|------|------|
| AUTH-4218 | 인증 실패 (서버 반환 `errMsg` 그대로 표시) |
| (기타 errCode) | `getErrMsg(errCode, errMsg)` 변환 메시지 표시 |

### 비고

- `acct_conn_id` 또는 `onePassToken` 쿼리 파라미터가 없으면 API 호출 없이 에러 팝업 표시
- 인증 성공 시 `res.data.tnt_nm`을 `tnt_url_id`로 세션에 저장하고 `/{tnt_url_id}/home`으로 이동
- 실패 시 팝업 확인 후 로그인 페이지(`/{tenant}/login`)로 이동

### 호출 위치

- `views/login/components/octatco/VpnLoginCheck.vue:121`
