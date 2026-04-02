# 인프라 도메인 모듈

시스템 리소스 관리(네트워크, 호스트, Zone, 대피) 관련 5개 모듈.

## network — `store/modules/network.js`

네트워크, 서브넷, 네트워크 QoS의 CRUD 담당.

### State

| 필드 | 설명 |
|------|------|
| `networkList` / `networkDetailData` | 네트워크 목록/상세 |
| `subnetList` / `subnetDetailData` | 서브넷 목록/상세 |
| `networkQosList` / `networkQosDetail` | 네트워크 QoS 목록/상세 |
| `networkListSearchForm` / `subnetListSearchForm` | 검색 폼 기본값 |

### 주요 Actions

| 대상 | 액션 | API |
|------|------|-----|
| 네트워크 | `getNetworkList` / `Detail` / `addNetwork` / `updateNetwork` / `removeNetwork` | `GET/POST/PUT/DELETE /v1/resource/networks` |
| 서브넷 | `getSubnetList` / `Detail` / `addSubnet` / `updateSubnet` / `removeSubnet` | `GET/POST/PUT/DELETE /v1/resource/subnets` |
| QoS | `getNetworkQosList` / `Detail` / `addNetworkQos` / `updateNetworkQos` / `removeNetworkQos` | `/v1/resource/networks/qos` |

네트워크 목록 조회 시 `tnt_id` 유무로 가상(`P004V`)/물리(`P004P`) 네트워크 분기. 물리 네트워크는 `isEditable: false`로 수정 불가 처리.

---

## networkRouter — `store/modules/nwRouter.js`

네트워크 라우터와 인터페이스(내부/외부) 관리.

### State

| 필드 | 설명 |
|------|------|
| `routerList` | 라우터 목록 |
| `routerForm` | 라우터 상세 (서브넷 목록 포함) |
| `setTabNm` | 활성 탭 이름 |

### 주요 Actions

| 액션 | API |
|------|-----|
| `getRouterList` / `Detail` / `postRouter` / `updateRouter` / `deleteRouter` | `GET/POST/PUT/DELETE /v1/resource/router` |
| `updateExtNetwork` | `PUT /v1/resource/router/{id}/changeNetwork` (외부 네트워크 변경) |
| `postSubnet` | `PUT /v1/resource/router/{id}/addNetwork` (내부 인터페이스 추가) |
| `deleteSubnet` | `PUT /v1/resource/router/{id}/removeNetwork` (내부 인터페이스 제거) |

---

## host — `store/modules/host.js`

호스트 관리. 단순한 목록 조회 모듈.

### State / Actions

| 필드 | 설명 |
|------|------|
| `hostList` | 호스트 목록 |

| 액션 | API |
|------|-----|
| `getHostList` | `GET /v1/resource/hosts` |

---

## zone — `store/modules/zone.js`

Zone 생성, 수정, 삭제, 호스트 추가/제거.

### State

| 필드 | 설명 |
|------|------|
| `zoneList` | Zone 목록 (호스트명 결합 문자열 포함) |
| `zoneDetail` | Zone 상세 (`host_list` 배열 포함) |

### 주요 Actions

| 액션 | API |
|------|-----|
| `getZoneList` / `getZoneDetail` | `GET /v1/resource/zones` |
| `postZone` / `putZone` / `deleteZone` | Zone CRUD |
| `putZoneHost` | `PUT /v1/resource/zones/addHost` (호스트 추가) |
| `putRemoveHost` | `PUT /v1/resource/zones/removeHost` (호스트 제거) |

---

## evacuate — `store/modules/evacuate.js`

호스트 장애 시 VM을 다른 호스트로 대피(HA)하는 기능의 목록 및 이력 관리.

### State

| 필드 | 설명 |
|------|------|
| `evacuateList` | 대피 대상 목록 |
| `evacuateHistoryList` | 대피 이력 목록 |

### 주요 Actions

| 액션 | API |
|------|-----|
| `getEvacuateList` | `GET /v1/resource/evacuate` |
| `manualExecution` | `POST /v1/resource/evacuate/{host_id}` (수동 대피 실행) |
| `getEvacuateHistoryList` | `GET /v1/resource/evacuate/history` |
