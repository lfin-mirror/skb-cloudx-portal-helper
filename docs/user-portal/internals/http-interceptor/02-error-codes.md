---
type: internal
title: HTTP 에러 코드
status: stable
version: v2.2.9
portal: user
source_files:
  - src/utils/request.js
  - src/utils/errCode.js
used_by:
  - ../../../term/03-codes.md
---

# HTTP 에러 코드

API 응답의 에러 객체 구조:

```json
{
  "error": {
    "code": "AGW-1003",
    "reason": "에러 사유",
    "comment": "사용자에게 표시할 메시지",
    "time": "2025-04-14 15:34:46.492"
  }
}
```

## API Gateway 에러 (AGW-xxxx)

`request.js` 응답 인터셉터에서 처리한다.

| 코드 | 의미 | 프론트엔드 처리 |
|------|------|---------------|
| `AGW-1003` | 토큰 만료/무효 | `FedLogOut` → 로그인 페이지 리다이렉트 |
| `AGW-1004` | 토큰 인증 실패 | `FedLogOut` → 로그인 페이지 리다이렉트 |
| `AGW-1005` | 토큰 검증 실패 | `FedLogOut` → 로그인 페이지 리다이렉트 |
| `AGW-1006` | Access Token 없음 | 요청 인터셉터에서 요청 취소 (`axios.Cancel`) |
| `AGW-1007` | Zuul 내부 서버 에러 | 콘솔 로그만 (팝업/리다이렉트 없음) |
| `AGW-1008` | 로그인 제한 (계정 차단) | 세션 클리어 → 로그인 페이지 리다이렉트 |
| `AGW-1009` | 로그인 제한 (접근 제한) | 세션 클리어 → 로그인 페이지 리다이렉트 |
| `AGW-1013` | 미등록 API 또는 권한 없음 | 코드 주석에만 존재 (현재 별도 처리 없음) |

### AGW-1003/1004/1005 처리 상세

```
에러 발생
  → store.dispatch('FedLogOut')  // 토큰 제거 + localStorage 백업 삭제
  → ConfirmPopup 표시 (apiError.comment 메시지)
  → 확인 클릭
    ├── tnt_url_id 있음 → /:tenant/login 이동
    └── tnt_url_id 없음 → /login 이동
```

### AGW-1008/1009 처리 상세

HomePage.vue와 errCode.js에서 처리한다. 홈 화면 API 호출 중 이 코드가 오면:

```
에러 발생
  → sessionStorage.clear() (apiGateway, serv_grp_id, tnt_url_id는 보존)
  → sessionStorage에 에러 메시지 저장
  → "로그인이 제한된 계정입니다" 안내
```

## 인증 에러 (AUTH-xxxx)

로그인/2차인증 과정에서 발생한다. `request.js`의 `forwardCodes`를 통해 컴포넌트로 위임되며, 각 컴포넌트나 `errCode.js`에서 처리한다.

인증 에러의 전체 목록은 [상태 코드 및 에러 코드](../../term/03-codes.md)에 정의되어 있다. 아래는 `errCode.js`에서 처리하는 Octatco 로그인 전용 에러를 포함한 전체 목록이다.

| 코드 | 의미 | 처리 |
|------|------|------|
| `AUTH-4203` | 존재하지 않는 사용자 | i18n `message.login.error.user_not_exist` |
| `AUTH-4205` | 로그인 시도 제한 횟수 초과 | 서버 메시지(`errMsg`) 그대로 표시 |
| `AUTH-4206` | 계정 정지 | i18n `message.login.error.loginSuspension` |
| `AUTH-4207` | 계정 만료 | i18n `message.login.error.loginExpire` |
| `AUTH-4209` | 사용자 조회 실패 | i18n `message.login.error.user_not_found` |
| `AUTH-4211` | 기존 비밀번호 불일치 | PasswordChange에서 직접 처리 |
| `AUTH-4214` | 인증번호 불일치 | 에러 팝업 표시 |
| `AUTH-4216` | 인증 세션 만료 | challenge_id 삭제, 로그인 화면 복귀 |
| `AUTH-4217` | 권한 없음 | i18n `message.login.error.authNotExist` |
| `AUTH-4218` | Octatco 인증 실패 | 서버 메시지(`errMsg`) 그대로 표시 |
| `AUTH-4219` | 유효하지 않은 전화번호 | 에러 팝업, 발송 화면 유지 |
| `AUTH-4220` | 과도한 인증번호 발송 (30분 제한) | 서버 메시지 표시, 이용 제한 화면 전환 |
| `AUTH-4224` | 유효하지 않은 기간 | i18n `message.login.error.invalidTerm` |
| `AUTH-4226` | 계정 상태 문제 | i18n `message.login.error.userStsFail` |
| `AUTH-4300` | 계정 없음 | 서버 메시지(`errMsg`) 그대로 표시 |

## HTTP 상태 코드 처리

`request.js` 인터셉터에서 직접 처리:

| 상태 코드 | 처리 |
|-----------|------|
| 타임아웃 (`ECONNABORTED`) | "응답시간이 초과되었습니다" 팝업 → 홈 이동 |
| 404 | `/404` 페이지 라우팅 |
| 500+ | `/500` 페이지 라우팅 |

## forwardCodes와 에러 위임

컴포넌트가 특정 에러를 직접 처리하고 싶을 때, 요청 시 `forwardCodes`를 지정한다:

```javascript
this.$axios.post('/api/...', data, {
  forwardCodes: ['AUTH-4214', 'AUTH-4220']
});
```

이 경우 인터셉터는 팝업을 띄우지 않고 `{ errCode, errMsg }` 객체를 반환한다. 컴포넌트의 `.then()` 에서 `res.errCode`로 분기 처리한다.

`forwardCodes`에 포함되지 않은 에러는 인터셉터가 기본 처리(팝업 표시 또는 리다이렉트)를 수행한다.
