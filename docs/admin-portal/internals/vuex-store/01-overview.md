# Vuex Store 구조

`src/store/index.js`에서 18개 모듈 등록. user-portal(7개)보다 규모가 큼.

## 모듈 목록

| 모듈 | namespaced | 역할 | 상세 문서 |
|------|-----------|------|----------|
| `app` | No | UI 상태 (사이드바, 언어, 디바이스, 이미지, 페이지네이션) | [02-app.md](./02-app.md) |
| `user` | No | 인증/세션 관리, 테넌트/서비스그룹 목록 | [06-user.md](./06-user.md) |
| `permission` | No | 이중 권한 기반(Super Admin/Tenant Admin) 동적 라우트 생성 | [03-permission.md](./03-permission.md) |
| `tagsView` | No | 탭/컴포넌트 캐시 관리 | [05-tagsview-common.md](./05-tagsview-common.md) |
| `keylogging` | Yes | 키로깅 방지 에이전트 상태 머신 | [04-keylogging.md](./04-keylogging.md) |
| `common` | Yes | 범용 상태 리셋 (레거시) | [05-tagsview-common.md](./05-tagsview-common.md) |
| `visualPcCreate` | No | 가상PC 그룹/풀 생성 관리 (변수명 오타) | [07-virtual-pc-modules.md](./07-virtual-pc-modules.md) |
| `virtualPcGroup` | No | 할당된 가상PC 운영 (전원/스냅샷/디스크/예약/포트) | [07-virtual-pc-modules.md](./07-virtual-pc-modules.md) |
| `syncTimer` | No | 가상PC 화면 자동 새로고침 주기 | [07-virtual-pc-modules.md](./07-virtual-pc-modules.md) |
| `network` | No | 네트워크/서브넷/QoS CRUD | [08-infra-modules.md](./08-infra-modules.md) |
| `networkRouter` | No | 네트워크 라우터/인터페이스 관리 | [08-infra-modules.md](./08-infra-modules.md) |
| `host` | No | 호스트 목록 조회 | [08-infra-modules.md](./08-infra-modules.md) |
| `zone` | No | Zone 관리 (호스트 추가/제거) | [08-infra-modules.md](./08-infra-modules.md) |
| `evacuate` | No | 대피(HA) 목록/이력/수동 실행 | [08-infra-modules.md](./08-infra-modules.md) |
| `menuManage` | No | API/기능/메뉴 3단계 CRUD | [09-admin-modules.md](./09-admin-modules.md) |
| `serviceGroup` | No | 서비스 그룹 관리 (AD/Email/NAS 연동) | [09-admin-modules.md](./09-admin-modules.md) |
| `userGroup` | No | 사용자 그룹 트리 (lazy-loading) | [09-admin-modules.md](./09-admin-modules.md) |
| `terminalAccess` | No | 단말 접속 관리 (MAC + 디바이스 식별자) | [09-admin-modules.md](./09-admin-modules.md) |
| `push` | No | Push 메시지 발송 (등록/수정/예약취소/반복) | [09-admin-modules.md](./09-admin-modules.md) |
| `pushHistory` | No | Push 발송 이력 조회 | [09-admin-modules.md](./09-admin-modules.md) |
| `init` | No | 시스템 초기 설정 단계 관리 | [09-admin-modules.md](./09-admin-modules.md) |

## 데이터 영속성

| 저장소 | 키 |
|--------|-----|
| localStorage | `sidebarStatus`, `language`, `size`, `images`, `settings` |
| sessionStorage | `user`, `rawUser`, `name`, `avatar`, `favorites`, `roles`, `tntList` |

## 루트 Getters — `store/getters.js`

| getter | 모듈 | 용도 |
|--------|------|------|
| `sidebar` | app | 사이드바 열림/닫힘 |
| `language` | app | 현재 언어 |
| `size` | app | Element UI 컴포넌트 크기 |
| `device` | app | desktop (고정) |
| `currentMenuId` | app | 현재 활성 메뉴 ID |
| `images` | app | 로고/배경 이미지 URL |
| `copyright` | app | 하단 저작권 문구 (unescape 처리) |
| `footerInfo` | app | 하단 문의/연락처 |
| `ptalLinTitle` | app | 포털 로그인 제목 (unescape 처리) |
| `table` | app | 테이블 기본 속성 |
| `pagging`, `page_limit`, `page_size` | app | 페이지네이션 설정 |
| `token` | user | JWT 토큰 |
| `name`, `userinfo`, `rawUserinfo` | user | 사용자 정보 |
| `roles` | user | 권한 그룹 코드 (`['U001SUP']` 또는 `['U001TNT']`) |
| `favorites` | user | 즐겨찾기 메뉴 ID |
| `status` | user | 사용자 상태 |
| `setting` | user | 사용자 개인 설정 |
| `getAllTenant` | user | 전체 테넌트 목록 |
| `getServiceGrpList` | user | 서비스 그룹 목록 |
| `permissionRouters` | permission | 필터링된 라우트 |
| `addRouters` | permission | 동적 추가 라우트 |
| `networkData` | tagsView | 네트워크 생성 폼 임시 데이터 |
| `visitedViews`, `cachedViews` | tagsView | 방문 탭 / 캐시 컴포넌트 |
