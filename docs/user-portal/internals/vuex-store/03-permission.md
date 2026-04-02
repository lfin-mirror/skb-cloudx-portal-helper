---
type: internal
title: permission 모듈
status: stable
version: v2.2.9
portal: user
source_files:
  - src/store/modules/permission.js
api_endpoints:
  - GET /v1/user/admin/groups/menus
---

# permission 모듈 — `store/modules/permission.js`

역할(role) 기반으로 라우트를 필터링해 사용자별 접근 가능한 메뉴를 결정한다.

## State

| 필드 | 설명 |
|------|------|
| `routers` | 기본 라우트(constantRouterMap) + 동적 라우트 |
| `addRouters` | 역할로 필터링된 동적 라우트 |
| `terminalMenuAccessUse` | 단말 접속 메뉴 접근 가능 여부 (`'Y'`/`'N'`) |

## 핵심 로직

### hasPermission(roles, route)

라우트의 `meta.id`가 사용자의 역할 메뉴 목록에 포함되는지 재귀적으로 확인한다.

### filterAsyncRouter(routes, roles)

라우트 트리를 순회하면서 `hasPermission`으로 필터링한다. 통과한 라우트의 `meta.title`에 역할 메뉴에서 가져온 메뉴명을 설정한다.

## Actions

| 액션 | 동작 |
|------|------|
| `GenerateRoutes` | `GET /v1/user/admin/groups/menus` → 역할별 메뉴 목록 조회 → `filterAsyncRouter`로 라우트 필터링 → `SET_ROUTERS` commit. 응답의 `viwr_con_plcy_yn`으로 `terminalMenuAccessUse` 설정 |
| `TerminalAccessRouteCheck` | `GET /v1/user/admin/groups/menus` → `viwr_con_plcy_yn` 값만 확인해서 단말 접속 메뉴 접근 플래그 업데이트 |
