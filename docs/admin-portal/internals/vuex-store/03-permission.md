# permission 모듈 — `store/modules/permission.js`

역할(role) 기반 라우트 필터링으로 관리자별 접근 가능 메뉴 결정. admin-portal의 핵심 특징은 Super Admin과 Tenant Admin의 이중 메뉴 ID 체계.

## State

| 필드 | 설명 |
|------|------|
| `routers` | 기본 라우트(constantRouterMap) + 동적 라우트 |
| `addRouters` | 역할로 필터링된 동적 라우트 |
| `terminalMenuAccessUse` | 단말 접속 메뉴 접근 가능 여부 (`'Y'`/`'N'`) |

## 이중 메뉴 ID 체계

라우트 meta에 두 종류의 메뉴 ID 병존:

| 필드 | prefix | 대상 | 예시 |
|------|--------|------|------|
| `meta.id` | `A` | Super Admin | `A0501`, `A0701` |
| `meta.tenantMenuId` | `T` | Tenant Admin | `T0501`, `T0701` |

서버 API(`/v1/user/admin/groups/menus`) 반환 메뉴 목록의 `menu_id` 첫 글자(`A` 또는 `T`)로 ID 체계 결정.

## 핵심 로직

### hasPermission(route, roles)

```javascript
const menuType = roles[0].menu_id  // 'A' 또는 'T'
if (menuType === 'A') {
  metaId = route.meta.id           // Super Admin용 ID
} else {
  metaId = route.meta.tenantMenuId // Tenant Admin용 ID
}
return roles.some(role => role.menu_id === metaId)
```

### filterAsyncRouter(routes, roles)

라우트 트리 순회:
1. `hasPermission`으로 접근 가능 여부 확인
2. 통과한 라우트의 `meta.title`에 서버 메뉴명(`menu_nm`) 설정
3. 하위 라우트에 대해 재귀 호출

### 같은 경로에 다른 컴포넌트

일부 메뉴는 같은 path에 Super Admin용과 Tenant Admin용 컴포넌트가 각각 정의. `meta.id`만 있는 라우트는 Super Admin 전용, `meta.tenantMenuId`만 있는 라우트는 Tenant Admin 전용.

```javascript
// policyManage.js 예시
{ path: 'user-auth-policy', component: UserAuthPolicySupadm, meta: { id: 'A0501' } },
{ path: 'user-auth-policy', component: UserAuthPolicy,       meta: { tenantMenuId: 'T0501' } },
```

`filterAsyncRouter`가 역할에 맞지 않는 라우트를 걸러내므로, 실제로는 한쪽만 등록.

## Actions

| 액션 | 동작 |
|------|------|
| `GenerateRoutes` | `GET /v1/user/admin/groups/menus` → 역할별 메뉴 목록 조회 → `filterAsyncRouter`로 라우트 필터링 → `SET_ROUTERS` commit. 응답의 `viwr_con_plcy_yn`으로 `terminalMenuAccessUse` 설정 |
| `TerminalAccessRouteCheck` | `GET /v1/user/admin/groups/menus` → `viwr_con_plcy_yn` 값만 확인, 단말 접속 메뉴 접근 플래그 업데이트 |

## user-portal과의 차이

| 항목 | admin-portal | user-portal |
|------|-------------|-------------|
| 메뉴 ID 체계 | 이중 (`meta.id` + `meta.tenantMenuId`) | 단일 (`meta.id`) |
| 역할 | `U001SUP` (Super Admin) / `U001TNT` (Tenant Admin) | 일반 사용자 |
| 메뉴명 설정 | 서버 응답의 `menu_nm`으로 동적 설정 | 동일 |
| 같은 path 복수 라우트 | 역할별 다른 컴포넌트 | 없음 |
