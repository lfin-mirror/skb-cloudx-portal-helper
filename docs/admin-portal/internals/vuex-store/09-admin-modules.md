# 관리/운영 도메인 모듈

사용자 관리, 서비스 그룹, 메뉴/API 관리, Push 메시지, 단말 접속, 초기화 기능 관련 7개 모듈.

## menuManage — `store/modules/menuManage.js`

관리자 설정 > 메뉴 관리의 API/기능/메뉴 3단계 구조 CRUD. 가장 큰 도메인 모듈 중 하나.

### State

| 필드 | 설명 |
|------|------|
| `apiManageList` / `apiManageDetail` | API 관리 목록/상세 |
| `funcManageList` / `funcManageDetail` | 기능 관리 목록/상세 |
| `funcApiList` | 기능에 매핑된 API 목록 |
| `menuFuncNoList` | 메뉴에 미매핑된 기능 목록 |
| `menuManageList` / `menuManageDetail` | 메뉴 관리 목록/상세 |
| `apiFuncList` | 기능 상세 내 API 목록 |

### 주요 Actions

| 대상 | 액션 | API |
|------|------|-----|
| API | `getApiManageList` / `Detail` / `post` / `put` / `delete` | `/v1/system/menu/apis` |
| 기능 | `getFuncManageList` / `Detail` / `post` / `put` / `delete` | `/v1/system/menu/functions` |
| 기능-API 매핑 | `postFuncApiManage` / `deleteFuncApiManage` | `/v1/system/menu/functions/{id}/apis` |
| 메뉴 | `getMenuManageList` / `post` / `put` / `delete` | `/v1/system/menu/menus`, `/v1/user/admin/groups/menu_func2` |
| 메뉴-기능 매핑 | `putMenuFuncManage` / `deleteMenuFuncManage` | `/v1/system/menu/menus/{id}/functions` |

메뉴 목록 조회 시 `mkind` 파라미터로 `super`/`tenant` 구분. 메뉴 변경 후 `GenerateRoutes` dispatch로 라우트 재생성.

---

## serviceGroup — `store/modules/serviceGroup.js`

서비스 그룹 관리. AD 연동, Email, NetApp(NAS) 연동 설정 포함.

### State

| 필드 | 설명 |
|------|------|
| `serviceGroupManageList` | 서비스 그룹 목록 |
| `serviceGroupManageDetail` | 상세 (`email_itlk_m`, `ext_usr_itlk_m`, `netApp_itlk_m` 하위 객체 포함) |
| `tenantAllList` | 전체 테넌트 목록 (select 옵션용) |

### 주요 Actions

| 액션 | API |
|------|-----|
| `getServiceGroupManageList` | `GET /v1/user/servGroup` |
| `getServiceGroupManageDetail` | `GET /v1/user/servGroup/{servGrpId}` (비밀번호 마스킹 처리) |
| `getTenantAllList` | `GET /v1/resource/tenants/manager/list/all` |

---

## userGroup — `store/modules/userGroup.js`

사용자 그룹 트리 조회. lazy-loading 방식으로 하위 그룹 로드.

### 주요 Actions

| 액션 | API | 설명 |
|------|-----|------|
| `getUserAssignGroup` | `GET /v1/user/usergroups` | 할당용 그룹 트리 (1단계) |
| `getUserGroup` | `GET /v1/user/usergroupstwo` | 그룹 트리 (1단계) |
| `getUserGroupChild` | `GET /v1/user/usergroupstwo` (parent 파라미터) | 하위 그룹 로드 |
| `getLastGroupChildUsers` | `GET /v1/user/groupAccounts/{usrGrpId}` | 말단 그룹의 사용자 목록 |

---

## terminalAccess — `store/modules/terminalAccess.js`

MAC 주소 기반 단말 접속 관리와 디바이스 식별자 기반 단말 접속 관리(신규) 두 가지 체계 공존.

### State

| 필드 | 설명 |
|------|------|
| `macAddrList` / `macAddrDetail` | MAC 주소 목록/상세 (레거시) |
| `terminalAccessList` / `Count` | 단말 접속 사용자 목록/건수 (신규) |
| `terminalDeviceList` | 사용자별 등록 디바이스 목록 |
| `terminalDeviceHistory` | 사용자별 디바이스 변경 이력 |

### 주요 Actions

| 체계 | 액션 | API |
|------|------|-----|
| MAC (레거시) | `getMacAddress` / `Detail` / `create` / `update` / `delete` | `/v1/user/clientmac` |
| 디바이스 (신규) | `getTerminalAccessList` | `GET /v1/user/device-identifier/users` |
| 디바이스 (신규) | `getTerminalDeviceList` / `History` | `GET /v1/user/device-identifier/{acctId}` |
| 디바이스 (신규) | `createTerminalDevice` / `update` / `delete` | CRUD `/v1/user/device-identifier` |

목록 조회 시 `mod_ts` 내림차순 → `acct_conn_id` 오름차순으로 프론트에서 정렬.

---

## push — `store/modules/push.js`

Push 메시지 발송 관리. 서비스 관리 > Push 메시지 관리 > Push 메시지 발송 메뉴에서 사용.

### State

| 필드 | 설명 |
|------|------|
| `pushList` | Push 메시지 목록 |
| `pushDetailData` | 상세 (수신유형, 발송채널, 예약일시) |
| `pushRepeatData` | 반복 예약 설정 (주기, 시간, 시작/종료일, 구분) |
| `userGroups` | 수신자 그룹 트리 |

### 주요 Actions

| 액션 | API |
|------|-----|
| `getPushList` | `GET /v1/pushserver/notify` (120초 타임아웃) |
| `getPushDetail` / `getPushRepeat` | `GET /v1/pushserver/notify/{pushId}` |
| `pushMessageCreate` / `Update` | `POST/PUT /v1/pushserver/notify` |
| `pushMessageSendCancel` | `DELETE /v1/pushserver/notify/{pushId}` |
| `pushReceiverRemove` | `DELETE /v1/pushserver/notify/receiver/{pushId}/{rcvrId}` |
| `updatePushRepeat` | `PUT /v1/pushserver/notify/reserved` |

---

## pushHistory — `store/modules/pushHistory.js`

Push 발송 이력 조회. 서비스 관리 > Push 메시지 관리 > Push 발송 내역 메뉴에서 사용.

### 주요 Actions

| 액션 | API |
|------|-----|
| `getPushHistory` | `GET /v1/pushserver/notify/history` (120초 타임아웃) |
| `getPushHistoryDetail` | `GET /v1/pushserver/notify/history/{pushId}` |

---

## init — `store/modules/init.js`

시스템 초기 설정(초기 구성 마법사)의 단계별 진행 상태 관리.

### State

| 필드 | 설명 |
|------|------|
| `nowStepStatus` | 현재 진행 단계 |
| `finishStepStatus` | 완료된 마지막 단계 |
| `stepJobData` | 현재 작업 상태 (`name`, `code`) |
| `apiError` | API 에러 메시지 |
| `hostList` | 호스트 목록 |

### 주요 Actions

| 액션 | API |
|------|-----|
| `stepStart` | `POST /v1/resource/init` (초기화 시작) |
| `stepIncrement` | 단계 카운트 증가 + 완료 알림 |
| `stepApiStatusAsync` | `GET /v1/resource/init` (현재 상태 조회) |
