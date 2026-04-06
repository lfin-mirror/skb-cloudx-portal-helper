---
type: flow
title: 엔트리 파일에서 로그인 페이지까지의 흐름
status: stable
version: v2.2.10
portal: user
screens:
  - App.vue
  - login/index.vue
  - login/components/Login.vue
related_docs:
  - 02-login-to-home-flow.md
  - ../term/01-ad.md
  - ../term/02-octatco.md
api_endpoints:
  - GET /v1/nauth/user/tntMain
  - GET /v1/nauth/user/tenant/exist
---

# 엔트리 파일에서 로그인 페이지까지의 흐름

사용자가 브라우저에서 user-portal에 접속했을 때, 앱이 초기화되고 로그인 페이지에 도달하기까지의 과정을 단계별로 정리한다.

## 전체 흐름 요약

```
public/index.html          ← 브라우저가 최초 로드하는 HTML
    ↓
src/main.js                ← Vue 앱 생성 & 플러그인 등록
    ↓
src/App.vue                ← 루트 컴포넌트, <router-view /> 렌더링
    ↓
src/permission.js          ← beforeEach 라우트 가드에서 토큰 확인
    ↓ (토큰 없음)
src/router/index.js        ← /:tenant/login 라우트 매칭
    ↓
src/views/login/index.vue  ← 로그인 페이지 컨테이너
    ↓
src/views/login/components/Login.vue  ← 실제 로그인 폼
```

---

## 1단계: HTML 로드 — `public/index.html`

```html
<html>
  <head>
    <script src="/js/config.js"></script>  <!-- 런타임 설정 주입 -->
  </head>
  <body>
    <div id="app"></div>  <!-- Vue 마운트 포인트 -->
  </body>
</html>
```

브라우저가 `index.html`을 받으면 `<div id="app">`이 빈 상태로 존재한다. Webpack 번들이 로드되면서 Vue 앱이 이 DOM 노드를 차지한다.

## 2단계: Vue 앱 초기화 — `src/main.js`

```javascript
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './lang'
import './permission'           // ← 라우트 가드 등록 (side effect import)
import Request from './utils/request'

Vue.prototype.$axios = Request  // Axios 인스턴스를 전역으로 등록
Vue.prototype.$moment = moment
Vue.prototype.$dayjs = dayjs
Vue.prototype.$lodash = lodash
Vue.prototype.$eventBus = new Vue()

new Vue({
  render: (h) => h(App),
  store,
  router,
  i18n,
}).$mount('#app')
```

`import './permission'`이 핵심이다. 이 줄이 실행되면서 `router.beforeEach` 가드가 등록된다. 이후 모든 라우트 전환은 이 가드를 거친다.

## 3단계: 루트 컴포넌트 — `src/App.vue`

```vue
<template>
  <div id="app" :class="$route.path.includes('/home') ? 'home' : ''">
    <router-view />
    <keylogging-install-modal />
    <keylogging-update-modal />
    <keylogging-os-unsupported-modal />
  </div>
</template>
```

`<router-view />`가 현재 라우트에 매칭된 컴포넌트를 렌더링한다. App.vue 자체는 라우팅 로직을 갖지 않고, 키로깅 방지 모달과 전역 이벤트 리스너(한글 입력 처리 등)를 관리한다.

## 4단계: 라우트 가드 — `src/permission.js`

이 파일이 **로그인 페이지 진입 여부를 결정하는 핵심 제어 지점**이다.

```javascript
// 토큰 없이 접근 가능한 경로
const whiteList = [
  '/login', '/auth-redirect',
  '/401', '/404', '/40x',
  '/500', '/50x',
  '/auth/check', '/checking',
]

router.beforeEach(async (to, from, next) => {
  if (getToken()) {
    // 토큰 있음: 로그인 페이지 접근 시 홈으로 리다이렉트
    if (to.path === '/login') {
      return next({ path: '/' })
    }
    return next()  // 그 외 보호된 경로 허용
  }

  // 토큰 없음
  if (isWhiteListed(to.path)) {
    // /login 접근 → 테넌트 정보 조회 후 /:tenant/login으로 이동
    if (to.path === '/login') {
      const tntMain = await getTntMain()
      return next({ path: `/${tntMain}/login` })
    }
    // /:tenant/login 접근 → 테넌트 존재 확인 후 진행
    if (to.path.includes('/login')) {
      await tntExists(to.params.tenant)
    }
    return next()
  }

  // 보호된 경로 → 로그인 페이지로 리다이렉트
  const resData = await tntExists(to.params.tenant)
  if (resData.tntExist) {
    return next({ path: `/${to.params.tenant}/login` })
  }
})
```

판단 흐름:

```
토큰 확인 (sessionStorage의 'Authorization' 키)
  ├── 토큰 있음 → 보호된 경로 접근 허용
  └── 토큰 없음
        ├── 화이트리스트 경로 → 통과 (로그인, 에러 페이지 등)
        └── 보호된 경로 → /:tenant/login 으로 리다이렉트
```

`getTntMain()` — API `/v1/nauth/user/tntMain`을 호출해 기본 테넌트 ID를 가져온다.
`tntExists(tenant)` — 테넌트 존재 여부를 검증하고 키로깅 대상 여부를 설정한다.

### 테넌트 ID 획득과 저장

테넌트 ID(`tnt_url_id`)는 로그인 페이지에 도달하기 전에 확보되어야 하는 핵심 값이다. permission.js의 라우트 가드에서 두 가지 경로로 획득한다.

**경로 1: URL에서 추출** — 사용자가 `/{tenant}/login`으로 직접 접속한 경우

```
사용자가 /NOAD/login 접근
  → beforeEach에서 to.params.tenant = 'NOAD' 추출
  → tntExists('NOAD') 호출
```

**경로 2: API에서 조회** — 사용자가 `/` 또는 `/login`으로 접속한 경우

```
사용자가 / 또는 /login 접근
  → getTntMain() 호출
    → GET /v1/nauth/user/tntMain → 응답: { tnt_url_id: 'NOAD' }
    → 내부적으로 tntExists('NOAD') 호출
  → /{tnt_url_id}/login 으로 리다이렉트
```

두 경로 모두 최종적으로 `tntExists()`를 거친다. 이 함수가 테넌트 ID를 저장하고 테넌트 설정을 로드한다:

```javascript
// permission.js tntExists() (50행~)
async function tntExists(path) {
  const res = await request.get('/v1/nauth/user/tenant/exist?tnt_url_id=' + path);

  // 테넌트 ID와 AD 연동 설정을 localStorage + sessionStorage에 동시 저장
  setStorageItem('tnt_url_id', path);
  setStorageItem('adItlkUsgYn', res.data.adItlkUsgYn);  // AD 사용 여부
  setStorageItem('adModYn', res.data.adModYn);            // AD read&write 여부

  // 키로깅 방지 초기화
  await store.dispatch('keylogging/initialize', { ... });

  // Octatco MFA 사용 여부
  if (res.data?.octatcoUsgYn != null) {
    sessionStorage.setItem('octatcoUsgYn', res.data.octatcoUsgYn);
  }

  return res.data;
}
```

**저장 위치와 유실 방지 전략** (`src/utils/storage.js`):

`tnt_url_id`, `adItlkUsgYn`, `adModYn`은 `setStorageItem()`을 통해 localStorage와 sessionStorage에 동시 저장된다. sessionStorage는 탭을 닫으면 사라지므로, localStorage를 백업 저장소로 사용해 세션 유실을 방지한다. 로그인 페이지 진입 시 `restoreFromLocalStorage()`가 호출되어 localStorage에서 sessionStorage로 값을 복구한다.

```
저장 시 (setStorageItem):
  localStorage.tnt_url_id = 'NOAD'     ← 백업 (탭 닫아도 유지)
  sessionStorage.tnt_url_id = 'NOAD'   ← 실제 사용

조회 시 (getStorageItem):
  1순위: localStorage
  2순위: sessionStorage (fallback)
  3순위: configMap (apiGateway 전용)
```

이 시점에서 sessionStorage에 저장되는 테넌트 관련 값:

| 키 | 용도 | 상세 |
|---|---|---|
| `tnt_url_id` | 라우트 경로, API 호출에 사용 | 테넌트 URL ID (예: `NOAD`) |
| `adItlkUsgYn` | 비밀번호 초기화 버튼 표시 여부 | [AD 연동](../term/01-ad.md) 참고 |
| `adModYn` | AD read&write 모드 판별 | [AD 연동](../term/01-ad.md) 참고 |
| `octatcoUsgYn` | 로그인 폼 선택 (일반 vs Octatco) | [Octatco](../term/02-octatco.md) 참고 |

## 5단계: 라우트 매칭 — `src/router/index.js`

```javascript
const constantRouter = [
  // 로그인 페이지 (멀티테넌트)
  {
    path: '/:tenant/login',
    component: () => import('../views/login/index'),
    hidden: true,
  },

  // 메인 레이아웃 (로그인 후)
  {
    path: '/:tenant',
    component: Layout,
    children: [
      {
        path: 'home',
        component: () => import('../views/home/HomePage'),
        name: 'Home',
      },
    ],
  },

  // 기능별 모듈 라우트
  ...vPcInfo,   // 가상PC 관리
  Support,      // 고객지원
  ...user,      // 계정 설정

  { path: '*', component: () => import('../views/errorPage/404') },
]

export default new VueRouter({
  mode: 'history',
  routes: constantRouter,
})
```

모든 라우트는 `/:tenant` 프리픽스를 갖는다. 테넌트별로 독립된 URL 체계를 사용하므로, `tenant-a`와 `tenant-b`는 각각 `/tenant-a/login`, `/tenant-b/login`으로 접근한다.

이후 로그인 페이지 컨테이너, 1차/2차 인증, 홈 화면 진입까지의 상세 흐름은 [02-login-to-home-flow.md](./02-login-to-home-flow.md)에서 다룬다.

API 명세:
- [tenant](../api/nauth/user/01-tenant.md)
