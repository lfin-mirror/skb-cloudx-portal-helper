# HTTP 인터셉터 — `src/utils/request.js`

모든 API 호출에 사용되는 Axios 인스턴스. 토큰 주입, 토큰 갱신, 에러 핸들링, 재시도 로직 담당.

## Axios 인스턴스 생성

```javascript
const service = axios.create({
  baseURL: config.VUE_APP_API_URI,  // localConfig에서 읽음
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
        || e.response.status !== 200;
  },
});
```

네트워크 에러와 200이 아닌 모든 응답에 대해 재시도. 재시도마다 타임아웃 리셋.

## 요청 인터셉터

모든 요청에 다음 헤더 주입:

| 헤더 | 값 | 비고 |
|------|-----|------|
| `X-CloudPC-Request-Poc` | `'POCADMIN'` (고정) | user-portal은 `'POCUSER'` |
| `X-CloudPC-Request-ID` | 요청별 UUID 생성 | |
| `Accept-Language` | Vuex `store.getters.language` | |
| `lang_cd` | `'A001KO'` (ko) / `'A001EN'` (en) | |
| `X-CloudPC-Request-MenuID` | `store.getters.currentMenuId` | `isFileApi`일 때 생략. 아래 메뉴 ID 설정 참고 |
| `authorization` | `getToken()` | 토큰이 있을 때만 |

### 메뉴 ID 설정 (`X-CloudPC-Request-MenuID`)

`permission.js`의 `router.beforeEach` 끝에서 `setCurrentMenuId`를 dispatch:

```javascript
if (store.getters.roles[0] === 'U001TNT') {
  store.dispatch('setCurrentMenuId', to.meta.tenantMenuId);  // T prefix
} else {
  store.dispatch('setCurrentMenuId', to.meta.id);             // A prefix
}
```

`roles[0]`으로 분기하므로 SA/TA 각각의 메뉴 ID 체계(`A`/`T`)에 맞는 값이 설정됨.

**SA→TA 전환 시 주의점:** SA가 "사용자 권한 변경"으로 TA 화면을 볼 때, `SET_TEMP_USER`가 `user.grp_typ_cd`는 `U001TNT`로 변경하지만 `sessionStorage.roles`는 `U001SUP` 그대로 유지. 따라서 `roles[0]`은 여전히 `U001SUP` → `else` 분기 → `to.meta.id` 사용. TA 전용 라우트는 `meta.id`가 `''` 또는 미정의이므로, 이 경우 `X-CloudPC-Request-MenuID` 헤더에 빈값 전달.

### 토큰 검증

인증이 필요한 요청에 토큰이 없으면 요청 취소:

```javascript
// 인증 면제 URL: /nauth 포함 또는 /v1/gw/authentications 시작
// 그 외 URL에서 토큰이 없으면:
throw new axios.Cancel('(AGW-1006) Access Token 이 없습니다.');
```

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

서버 응답이 `{ data: { data: {...} } }` 구조일 때 자동으로 한 단계 언래핑.

### 에러 응답

에러 응답에서 추출하는 구조:

```javascript
const apiError = res.data.error;  // { code, reason, comment, time }
```

### forwardCodes — 에러 핸들링 위임

요청 시 `forwardCodes` 배열을 전달하면, 해당 에러 코드는 인터셉터가 팝업을 띄우지 않고 호출자에게 에러를 그대로 reject:

```javascript
this.$axios.post('/api/...', data, {
  forwardCodes: ['AUTH-4214']  // 이 에러는 컴포넌트에서 직접 처리
});
```

### 에러 코드별 처리

| 조건 | 동작 |
|------|------|
| 타임아웃 (`ECONNABORTED`) | "응답시간이 초과되었습니다" 팝업 |
| `code=init` 포함 URL | 에러 무시 (초기화 API) |
| HTTP 404 (forwardCodes 미포함) | 디버그 모드: `/404` 이동, 프로덕션: 에러 팝업 |
| HTTP 500+ (forwardCodes 미포함) | 디버그 모드: `/500` 이동, 프로덕션: 에러 팝업 |
| `AGW-1003` / `AGW-1004` / `AGW-1005` | `FedLogOut` → 로그인 페이지 리다이렉트 + 경고 팝업 |
| `AGW-1007` | 콘솔 로그만 (대시보드 관련, 무시) |
| 기타 에러 (forwardCodes 미포함) | 에러 팝업 (`apiError.comment` 표시) |
| API 에러 모델 미정의 | 디버그 모드: `/500` 이동, 프로덕션: 안내 팝업 |

### user-portal과의 차이

| 항목 | admin-portal | user-portal |
|------|-------------|-------------|
| 에러 시 홈 이동 | 안 함 (팝업만) | 홈으로 이동 |
| 디버그 모드 분기 | `isDebug`로 에러 페이지/팝업 분기 | 없음 |
| forwardCodes 반환 | `Promise.reject(error)` | `{ errCode, errMsg }` 객체 반환 |
| AGW 인증 에러 리다이렉트 | `/login` (고정) | `/:tenant/login` (테넌트별) |
| `code=init` URL 예외 | 에러 처리 스킵 | 없음 |

## 토큰 관리 — `src/utils/auth.js`

sessionStorage 기반 토큰 저장. 브라우저 탭을 닫으면 토큰 삭제.

```javascript
const TokenKey = 'Admin-Token';

getToken()       → sessionStorage.getItem(TokenKey)
setToken(token)  → sessionStorage.setItem(TokenKey, token)
removeToken()    → sessionStorage.removeItem(TokenKey)
```

user-portal의 `TokenKey`는 `'Authorization'`.

### 역할 확인 유틸리티

```javascript
isSuperAdmin(grpTypCd)  → grpTypCd === 'U001SUP'
isTenantAdmin(grpTypCd) → grpTypCd === 'U001TNT'
```

토큰 흐름:
1. 로그인 성공 → `Login` 액션에서 `SET_TOKEN` commit
2. API 요청 → 요청 인터셉터가 `authorization` 헤더에 주입
3. API 응답 → 응답 인터셉터가 새 토큰으로 갱신
4. 로그아웃/인증 실패 → `removeToken()`으로 삭제
