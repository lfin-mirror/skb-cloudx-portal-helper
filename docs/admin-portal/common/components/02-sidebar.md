# 사이드바

admin-portal의 좌측 네비게이션 메뉴. vue-element-admin 보일러플레이트의 사이드바 구조를 그대로 사용. user-portal은 사이드바를 제거했지만 admin-portal은 활성 상태.

## 레이아웃 내 위치

`views/layout/Layout.vue`:

```
┌─ Navbar ──────────────────────────────┐
├─ main-container ──────────────────────┤
│ ┌─ Sidebar ─┐ ┌─ AppMain ──────────┐ │
│ │ 즐겨찾기   │ │ <router-view>      │ │
│ │ 메뉴 트리  │ │                    │ │
│ │ 접기 버튼  │ │                    │ │
│ └───────────┘ └────────────────────┘ │
├─ FooterBar ───────────────────────────┤
└───────────────────────────────────────┘
```

Layout의 CSS 클래스로 사이드바 상태 반영:
- `openSidebar` — 사이드바 펼침
- `hideSidebar` — 사이드바 접힘 (아이콘만 표시)
- `withoutAnimation` — 애니메이션 없이 전환
- `mobile` — 모바일 모드 (오버레이)

## 컴포넌트 구조

```
Sidebar/index.vue
├── Item.vue          — 아이콘 + 제목 렌더링 (functional component)
├── SidebarItem.vue   — 메뉴 항목 재귀 렌더링
├── Link.vue          — 내부 링크(router-link) / 외부 링크(a) 분기
└── FixiOSBug.js      — iOS 디바이스 mouseleave 버그 우회 mixin
```

## Sidebar/index.vue — 메인 사이드바

### 데이터 소스 — `permissionRouters`

`store.getters.permissionRouters`가 사이드바에 표시할 메뉴 트리의 원본 데이터.

이 값은 두 배열의 합:

```
permissionRouters = constantRouterMap + addRouters(필터링된 asyncRouterMap)
```

#### constantRouterMap (기본 라우트)

`router/index.js`에서 정의. 역할에 관계없이 항상 등록되는 라우트. 대부분 `hidden: true`라서 사이드바에 표시 안 됨.

```javascript
const constantRouter = [
  { path: '/redirect/:path*', hidden: true },
  { path: '/login',           hidden: true },
  { path: '/initialized',     hidden: true },
  { path: '/401',             hidden: true },
  { path: '/404',             hidden: true },
  { path: '/500',             hidden: true },
  { path: '/505',             hidden: true },
  { path: '',    redirect: 'dashboard', children: [{ path: 'dashboard', meta: { id: 'A01', tenantMenuId: 'T01' } }] },
  { path: '/userInfo', hidden: true },
  { path: '/ready',    hidden: true },
]
```

유일하게 사이드바에 표시되는 것은 대시보드(`/dashboard`). 나머지는 전부 `hidden: true`.

#### asyncRouterMap (동적 라우트)

`router/index.js`에서 정의. 역할별로 필터링되어야 하는 메뉴 라우트:

```javascript
export const asyncRouterMap = [
  UserInfoManage,           // /user (T02)
  UserSupport,              // /user-support (T03)
  PortalManage,             // /portal (A04/T04)
  PolicyManage,             // /policy (A05/T05)
  ServiceManage,            // /service-manage (A06/T06)
  VirtualPcManage,          // /virtual-pc (T07)
  VirtualDiskManage,        // /virtual-disk (A14/T13)
  TenantManage,             // /tenant (A08/T08)
  TemplateManage,           // /template (A09/T09)
  SuperRealTimeMonitoring,  // /realTimeMonitoring (A15)
  SuperMonitoringManage,    // /monitoring (A11)
  TenantRealTimeMonitoring, // /realTimeMonitoring (T14)
  TenantMonitoringManage,   // /monitoring (T11)
  SystemResourceManage,     // /system-resource (A10/T10)
  AdminSetting,             // /admin-setting (A12/T12)
  { path: '*', redirect: '/404', hidden: true },
]
```

이 배열은 Router에 직접 등록되지 않고, `GenerateRoutes` 액션에서 필터링된 후 `router.addRoutes()`로 동적 등록.

#### GenerateRoutes 필터링 과정

```
1. GET /v1/user/admin/groups/menus 호출
   → 서버가 현재 세션의 역할에 따라 메뉴 목록 반환
   → SA: [{ menu_id: 'A', ... }, { menu_id: 'A01', ... }, { menu_id: 'A0401', ... }, ...]
   → TA: [{ menu_id: 'T', ... }, { menu_id: 'T01', ... }, { menu_id: 'T0201', ... }, ...]

2. filterAsyncRouter(asyncRouterMap, data) 호출
   → asyncRouterMap의 각 라우트를 순회

3. hasPermission(route, roles) 판단:
   → roles[0].menu_id 첫 글자로 SA/TA 구분
     - 'A' → route.meta.id 사용    (예: 'A0501')
     - 'T' → route.meta.tenantMenuId 사용 (예: 'T0501')
   → 서버 응답에 해당 menu_id가 있으면 통과, 없으면 제거
   → meta가 없는 라우트(catch-all 등)는 무조건 통과

4. 통과한 라우트의 meta.title에 서버 menu_nm 설정:
   → route.meta.title = roles.find(r => r.menu_id === id).menu_nm
   → 이 값이 사이드바에 표시되는 메뉴 이름

5. children이 있으면 재귀적으로 filterAsyncRouter 호출
   → 하위 메뉴도 같은 방식으로 필터링

6. SET_ROUTERS mutation:
   state.addRouters = filteredRoutes
   state.routers = constantRouterMap.concat(filteredRoutes)
   → permissionRouters getter = state.routers
```

#### 예시: SA 로그인 시

서버 응답에 `A0401`(관리자 UI)은 있고 `T0401`(사용자 UI)은 없음.

```
PortalManage 라우트:
  path: '/portal', meta: { id: 'A04', tenantMenuId: 'T04' }
  children:
    - { path: 'admin', meta: { id: 'A0401' } }        → A0401이 서버 응답에 있음 → 통과
    - { path: 'user',  meta: { tenantMenuId: 'T0401' } } → meta.id 없음(빈값) → 서버 응답에 없음 → 제거
    - { path: 'notice', meta: { id: 'A0402', tenantMenuId: 'T0402' } } → A0402 확인 → 통과
```

결과: SA 사이드바에 "관리자 UI", "공지사항"은 표시, "사용자 UI"는 미표시.

#### 예시: TA 로그인 시

서버 응답에 `T0401`은 있고 `A0401`은 없음.

```
같은 PortalManage 라우트:
  children:
    - { path: 'admin', meta: { id: 'A0401' } }        → meta.tenantMenuId 없음 → 제거
    - { path: 'user',  meta: { tenantMenuId: 'T0401' } } → T0401이 서버 응답에 있음 → 통과
    - { path: 'notice', meta: { id: 'A0402', tenantMenuId: 'T0402' } } → T0402 확인 → 통과
```

결과: TA 사이드바에 "사용자 UI", "공지사항"은 표시, "관리자 UI"는 미표시.

#### viwr_con_plcy_yn (단말접속 메뉴 접근 플래그)

서버 응답에서 `viwr_con_plcy_yn`이 `'Y'` 또는 `'N'`인 항목을 찾아 `terminalMenuAccessUse` state에 저장. 단말 접속 메뉴(`T0204`)의 접근 가능 여부를 별도 관리.

### 렌더링 구조

```vue
<el-menu :default-active="$route.path" :collapse="isCollapse" :unique-opened="true" mode="vertical">
  <!-- 1. 즐겨찾기 영역 -->
  <template v-if="favorites">
    <!-- 펼침 상태: router-link 직접 나열 (별 아이콘) -->
    <!-- 접힘 상태: SidebarItem으로 드롭다운 -->
  </template>

  <!-- 2. 메뉴 트리 -->
  <sidebar-item
    v-for="route in permissionRouters"
    v-if="!route.hidden && route.children"
    :item="route"
    :base-path="route.path"
  />
</el-menu>

<!-- 3. 접기/펼치기 토글 버튼 -->
```

### el-menu 주요 설정

| 속성 | 값 | 설명 |
|------|-----|------|
| `default-active` | `$route.path` | 현재 경로에 해당하는 메뉴 항목 활성화 |
| `collapse` | `!sidebar.opened` | 사이드바 접힘 시 아이콘 모드 |
| `unique-opened` | `true` | 하나의 서브메뉴만 동시에 펼침 |
| `mode` | `vertical` | 세로 배치 |
| `show-timeout` | `200` | 서브메뉴 표시 딜레이(ms) |

### 즐겨찾기

`store.getters.favorites` — 사용자가 즐겨찾기한 메뉴 ID 배열. `findRouters()` 함수가 `permissionRouters` 트리에서 해당 ID의 라우트를 찾아 평탄화(flat).

- 사이드바 펼침 상태: 별(star) 아이콘과 함께 `router-link`로 직접 나열
- 사이드바 접힘 상태: `SidebarItem`으로 드롭다운 메뉴 표시
- 즐겨찾기가 없으면 영역 숨김 (`v-if="favorites"`)
- 즐겨찾기 등록/해제: `user` 스토어의 `SetFavorites` 액션 → `POST /v1/user/accounts/favorite`

### 접기/펼치기 토글

사이드바 하단의 토글 아이콘. `sidebar.opened`를 직접 변경. Vuex `app` 모듈의 `sidebar.opened` 상태와 `localStorage.sidebarStatus`에 동기화.

## SidebarItem.vue — 메뉴 항목 재귀 렌더링

라우트 트리를 재귀적으로 순회하며 메뉴 렌더링. vue-element-admin의 핵심 로직.

### 렌더링 분기

```
route.hidden === true → 렌더링 안 함

보이는 자식이 1개 (또는 0개) && alwaysShow 아님
  → 단일 메뉴 항목 (el-menu-item)
  → 아이콘 + 제목 표시

보이는 자식이 2개 이상 또는 alwaysShow
  → 서브메뉴 (el-submenu)
  → 자식을 재귀적으로 SidebarItem 렌더링
```

### hasOneShowingChild(children, parent)

`hidden: true`가 아닌 자식 수를 세서:
- 1개 → `onlyOneChild`에 저장, `true` 반환 → 서브메뉴 없이 단일 항목으로 표시
- 0개 → 부모 자체를 `onlyOneChild`로 설정, `noShowingChildren: true`
- 2개 이상 → `false` → `el-submenu`으로 렌더링

### 중첩(nest) 메뉴

`isNest` prop이 `true`면 `nest-menu` CSS 클래스 적용. 3단계 이상 깊이의 메뉴에서 들여쓰기 스타일 적용.

## Item.vue — 아이콘 + 제목

functional component. `icon`과 `title` prop을 받아 SVG 아이콘과 `<span>` 텍스트를 렌더링.

```javascript
render(h, context) {
  const { icon, title } = context.props
  const nodes = []
  if (icon) nodes.push(<svg-icon icon-class={icon} />)
  if (title) nodes.push(<span slot="title">{title}</span>)
  return nodes
}
```

아이콘은 `src/icons/svg/` 폴더의 SVG 파일명으로 참조 (svg-sprite-loader). 라우트 `meta.icon` 값이 SVG 파일명과 매핑.

## Link.vue — 링크 분기

`to` prop의 URL이 외부 링크(`http://`, `mailto:`, `tel:`)인지 판단:
- 외부 → `<a href="..." target="_blank" rel="noopener">`
- 내부 → `<router-link :to="...">`

모니터링 메뉴의 Kibana URL 등 외부 링크를 사이드바에서 직접 열 수 있게 처리.

## 사이드바 열림/닫힘 상태

### Vuex 상태

`store/modules/app.js`:

```javascript
sidebar: {
  opened: !+localStorage.getItem('sidebarStatus'),  // '1'이면 닫힘, '0' 또는 없으면 열림
  withoutAnimation: false
}
```

### 토글 방법

| 방법 | 동작 |
|------|------|
| 사이드바 하단 토글 아이콘 | `sidebar.opened` 직접 변경 |
| Navbar 햄버거 버튼 | 사이트맵 모달 토글 (사이드바 토글 아님) |
| 모바일에서 라우트 변경 | `closeSideBar` dispatch |

### ResizeHandler mixin

`Layout.vue`에 믹스인. `window.resize` 이벤트 감지:

```javascript
const WIDTH = 0   // vue-element-admin 원본은 992, admin-portal은 0으로 비활성화
const RATIO = 3
```

`WIDTH = 0`이므로 `isMobile()`은 항상 `false` → 모바일 모드 전환 사실상 비활성화. 브라우저 폭에 관계없이 데스크톱 모드 유지.

## 메뉴 트리 구성 흐름

```
1. 로그인 성공
2. 첫 라우트 이동 → permission.js beforeEach
3. addRouters.length === 0 → GenerateRoutes dispatch
4. GET /v1/user/admin/groups/menus
   → SA: menu_id가 'A' prefix인 메뉴 목록 반환
   → TA: menu_id가 'T' prefix인 메뉴 목록 반환
5. filterAsyncRouter(asyncRouterMap, data)
   → 라우트 트리에서 서버 메뉴 목록에 있는 항목만 필터
   → meta.title에 서버의 menu_nm 설정 (사이드바 표시 이름)
6. router.addRoutes(filteredRoutes)
7. store.state.permission.routers에 저장
8. Sidebar가 permissionRouters getter로 접근 → 메뉴 렌더링
```

### 메뉴 숨김 조건

| 조건 | 결과 |
|------|------|
| `route.hidden === true` | SidebarItem에서 렌더링 제외 |
| `!route.children` | Sidebar index.vue의 `v-if`에서 제외 |
| `meta.id` 또는 `meta.tenantMenuId`가 서버 메뉴 목록에 없음 | filterAsyncRouter에서 제거 |
| `alwaysShow` 없고 보이는 자식이 1개 | 서브메뉴 없이 단일 항목으로 표시 |
