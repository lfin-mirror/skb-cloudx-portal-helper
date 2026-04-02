---
type: internal
title: HTTP 인터셉터
status: stable
version: v2.2.9
portal: user
source_files:
  - src/utils/request.js
  - src/utils/auth.js
---

# HTTP 인터셉터 — `src/utils/request.js`

모든 API 호출에 사용되는 Axios 인스턴스. 토큰 주입, 토큰 갱신, 에러 핸들링, 재시도 로직을 담당한다.

## Axios 인스턴스 생성

```javascript
const service = axios.create({
  baseURL: configMap.VUE_APP_API_URI,  // sessionStorage의 'apiGateway'에도 저장
  timeout: JSON.parse(process.env['VUE_APP_AXIOS_TIMEOUT']),
});
```

## 재시도 설정 (axios-retry)

```javascript
axiosRetry(service, {
  retries: JSON.parse(process.env['VUE_APP_AXIOS_RETRY']),
  shouldResetTimeout: true,
  retryCondition: (e) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(e)
        || (e.response && e.response.status !== 200);
  },
});
```

네트워크 에러와 200이 아닌 모든 응답에 대해 재시도한다. 재시도마다 타임아웃을 리셋한다.

## 요청 인터셉터

모든 요청에 다음 헤더를 주입한다:

| 헤더 | 값 | 비고 |
|------|-----|------|
| `X-CloudPC-Request-Poc` | `'POCUSER'` (고정) | |
| `X-CloudPC-Request-ID` | 요청별 UUID 생성 | |
| `Accept-Language` | Vuex `store.getters.language` | |
| `lang_cd` | `'A001KO'` (ko) / `'A001EN'` (en) | |
| `X-CloudPC-Request-MenuID` | `store.getters.currentMenuId` | `isFileApi`일 때 생략 |
| `authorization` | `getToken()` | 토큰이 있을 때만 |

### 토큰 검증

인증이 필요한 요청에 토큰이 없으면 요청을 취소한다:

```javascript
// 인증 면제 URL: /nauth 포함 또는 /v1/gw/authentications 시작
// 그 외 URL에서 토큰이 없으면:
throw new axios.Cancel('(AGW-1006) Access Token 이 없습니다.');
```

Octatco API URL도 토큰 검증을 건너뛴다.

## 응답 인터셉터

### 성공 응답

```javascript
(res) => {
  // 응답 헤더에 새 토큰이 있으면 갱신
  const token = res.headers.authorization;
  if (token) {
    store.commit('SET_TOKEN', token);
  }
  // 중첩된 data 구조 자동 언래핑
  res.data = res.data.data || res.data;
  return res;
}
```

서버 응답이 `{ data: { data: {...} } }` 구조일 때 자동으로 한 단계 벗긴다.

### 에러 응답

에러 응답에서 추출하는 구조:

```javascript
const apiError = res.data.error;  // { code, reason, comment, time }
// errCode = apiError.code     (예: 'AGW-1003')
// errMsg  = apiError.comment  (예: '세션이 만료되었습니다')
```

### forwardCodes — 에러 핸들링 위임

요청 시 `forwardCodes` 배열을 전달하면, 해당 에러 코드는 인터셉터가 팝업을 띄우지 않고 호출자에게 `{ errCode, errMsg }` 객체로 반환한다:

```javascript
this.$axios.post('/api/...', data, {
  forwardCodes: ['AUTH-4214', 'AUTH-4220']  // 이 에러는 컴포넌트에서 직접 처리
});
```

### 에러 코드별 처리

| 조건 | 동작 |
|------|------|
| 타임아웃 (`ECONNABORTED`) | "응답시간이 초과되었습니다" 팝업 → 홈으로 이동 |
| HTTP 404 | `/404` 페이지로 이동 |
| HTTP 500+ | `/500` 페이지로 이동 |
| `AGW-1003` / `AGW-1004` / `AGW-1005` | 토큰/인증 실패 → `FedLogOut` dispatch → 로그인 페이지로 이동 |
| `AGW-1007` | 콘솔 로그만 (대시보드 관련, 무시) |
| 기타 에러 (forwardCodes 포함) | `{ errCode, errMsg }` 반환, 컴포넌트에서 처리 |
| 기타 에러 (forwardCodes 미포함) | 에러 팝업 → 홈으로 이동 |

### AGW 인증 에러 시 로그인 리다이렉트

```javascript
// AGW-1003, AGW-1004, AGW-1005 처리
store.dispatch('FedLogOut');  // 토큰 제거
// tnt_url_id가 있으면 → /:tenant/login
// 없으면 → /login
```

## 토큰 관리 — `src/utils/auth.js`

sessionStorage 기반 토큰 저장. 브라우저 탭을 닫으면 토큰이 사라진다.

```javascript
const TokenKey = 'Authorization';

getToken()       → sessionStorage.getItem(TokenKey)
setToken(token)  → sessionStorage.setItem(TokenKey, token)
removeToken()    → sessionStorage.removeItem(TokenKey)
```

토큰 흐름:
1. 로그인 성공 → 응답 헤더 `authorization`에서 토큰 추출 → `SET_TOKEN` mutation
2. API 요청 → 요청 인터셉터가 `authorization` 헤더에 주입
3. API 응답 → 응답 인터셉터가 새 토큰으로 갱신
4. 로그아웃/인증 실패 → `removeToken()`으로 삭제
