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

`request.js` 응답 인터셉터에서 처리.

| 코드 | 의미 | 프론트엔드 처리 |
|------|------|---------------|
| `AGW-1003` | 토큰 만료/무효 | `FedLogOut` → `/login` 리다이렉트 + 경고 팝업 |
| `AGW-1004` | 토큰 인증 실패 | `FedLogOut` → `/login` 리다이렉트 + 경고 팝업 |
| `AGW-1005` | 토큰 검증 실패 | `FedLogOut` → `/login` 리다이렉트 + 경고 팝업 |
| `AGW-1006` | Access Token 없음 | 요청 인터셉터에서 요청 취소 (`axios.Cancel`) |
| `AGW-1007` | Zuul 내부 서버 에러 | 콘솔 로그만 (팝업/리다이렉트 없음) |

### AGW-1003/1004/1005 처리 상세

```
에러 발생
  → store.dispatch('FedLogOut')  // 토큰 제거
  → Notification.warning 표시 (apiError.comment 메시지)
  → /login 페이지 이동 (현재 경로가 /dashboard가 아니면 redirect 쿼리 추가)
```

user-portal과 달리 테넌트별 경로 분기 없이 단일 `/login`으로 리다이렉트.

## HTTP 상태 코드 처리

`request.js` 인터셉터에서 직접 처리:

| 상태 코드 | 디버그 모드 (`VUE_APP_DEBUG=true`) | 프로덕션 모드 |
|-----------|----------------------------------|-------------|
| 타임아웃 (`ECONNABORTED`) | 에러 팝업 | 에러 팝업 |
| 404 | `/404` 페이지 라우팅 | 에러 팝업 |
| 500+ | `/500` 페이지 라우팅 | 에러 팝업 |

## forwardCodes와 에러 위임

컴포넌트가 특정 에러를 직접 처리할 때, 요청 시 `forwardCodes` 지정:

```javascript
this.$axios.post('/api/...', data, {
  forwardCodes: ['AUTH-4214']
});
```

`forwardCodes`에 포함된 에러 코드 발생 시 인터셉터가 팝업 없이 `Promise.reject(apiError)`로 전달. 컴포넌트의 `.catch()`에서 처리.

`forwardCodes`에 미포함된 에러는 인터셉터 기본 처리(팝업 표시).
