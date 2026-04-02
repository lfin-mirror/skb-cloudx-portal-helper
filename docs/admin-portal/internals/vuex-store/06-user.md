# user 모듈 — `store/modules/user.js`

인증, 세션, 테넌트/서비스그룹 관리 담당. namespaced 아님.

## State

| 필드 | 초기값 | 영속성 | 설명 |
|------|--------|--------|------|
| `user` | sessionStorage `user` | sessionStorage | 로그인 사용자 정보 객체 |
| `rawUser` | sessionStorage `rawUser` | sessionStorage | 마스킹 전 원본 사용자 정보 |
| `token` | `getToken()` | sessionStorage `Admin-Token` | JWT 토큰 |
| `name` | sessionStorage `name` | sessionStorage | 사용자 이름 |
| `avatar` | sessionStorage `avatar` | sessionStorage | 프로필 이미지 |
| `favorites` | sessionStorage `favorites` | sessionStorage | 즐겨찾기 메뉴 ID 배열 |
| `roles` | sessionStorage `roles` | sessionStorage | 권한 코드 배열 (`['U001SUP']` 또는 `['U001TNT']`) |
| `setting` | localStorage `settings` | localStorage | 사용자 개인 설정 |
| `host_tnt_yn` | `''` | - | 호스트 테넌트 여부 |
| `serviceGrpList` | `[]` | - | 선택된 테넌트의 서비스 그룹 목록 |
| `tntList` | `[]` | - | 전체 테넌트 목록 |

## Actions

### 인증

| 액션 | 동작 |
|------|------|
| `Login` | 사용자 정보, 이름, 역할, 토큰을 state에 저장 + `GET /v1/user/accounts/favorite`로 즐겨찾기 조회 |
| `LogOut` | `GET /v1/logout` 호출 → 모든 state 초기화 + `removeToken()` |
| `FedLogOut` | 서버 호출 없이 토큰만 제거 (인증 에러 시 사용) |

### 즐겨찾기

| 액션 | 동작 |
|------|------|
| `SetFavorites` | `POST /v1/user/accounts/favorite` → 메뉴 즐겨찾기 토글. 응답의 `usg_yn`으로 state 업데이트 |

### 테넌트 전환

| 액션 | 동작 |
|------|------|
| `getAuthUpdate` | `POST /v1/authRemake` → 테넌트 전환 시 사용자 정보 갱신 (`tnt_id`, `vm_grp_id`, `serv_grp_id`, `grp_typ_cd` 등) |
| `getTenantServiceGroup` | `GET /v1/user/sgList?tnt_id={tntId}` → 테넌트 소속 서비스 그룹 목록 조회 |
| `getAllTenant` | `GET /v1/resource/tenants/manager/list/all` → 전체 테넌트 목록 조회 |

### user-portal과의 차이

| 항목 | admin-portal | user-portal |
|------|-------------|-------------|
| 테넌트 전환 | `getAuthUpdate`로 동적 전환 | URL 경로(`/:tenant`)로 결정 |
| `tntList` | 전체 테넌트 목록 보관 | 없음 |
