# 대시보드 API

## 사용 화면
- (화면 문서 미작성)

## VPC(가상PC) 현황

### VPC 상태 조회

```
GET /v1/management/dashboard/vpc/status
```

**호출 위치**: `views/newDashboard/components/VirtualPcStatusCard.vue:293`

### VPC 수 조회

```
GET /v1/management/dashboard/vpc/count
```

**호출 위치**: `views/newDashboard/components/VirtualPcStatusSideCard.vue:58`

### VPC 사용량 조회

```
GET /v1/management/dashboard/vpc/usage
```

**호출 위치**: `views/newDashboard/components/VirtualPcStatusCard.vue:303`, `views/newDashboard/components/tenant/MainGraphsCardTnT.vue:185`

#### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| isRangeQuery | boolean | N | 범위 조회 여부 |
| tnt_id | string | N | 테넌트 ID (테넌트 필터링) |

### VPC 지연시간 Top-K

```
GET /v1/management/dashboard/vpc/latency?topk={topk}
```

**호출 위치**: `views/newDashboard/components/VirtualPcStatusCard.vue:332`

### VPC 네트워크 수신 Top-K

```
GET /v1/management/dashboard/vpc/networkrx?topk={topk}
```

**호출 위치**: `views/newDashboard/components/VirtualPcStatusCard.vue:343`

### VPC CPU Top-K

```
GET /v1/management/dashboard/vpc/cpu?topk={topk}&isNeedVpcConnection=false
```

**호출 위치**: `views/newDashboard/components/VirtualPcStatusCard.vue:354`, `views/newDashboard/components/tenant/MainGraphsCardTnT.vue:226`

### VPC 메모리 Top-K

```
GET /v1/management/dashboard/vpc/memory?topk={topk}&isNeedVpcConnection=false
```

**호출 위치**: `views/newDashboard/components/VirtualPcStatusCard.vue:370`

### VPC 디스크 Top-K

```
GET /v1/management/dashboard/vpc/disk?topk={topk}&isNeedVpcConnection=false
```

**호출 위치**: `views/newDashboard/components/VirtualPcStatusCard.vue:386`

### VM 상태 조회 (테넌트용)

```
GET /v1/management/dashboard/vm/status
```

**호출 위치**: `views/newDashboard/components/tenant/VirtualPcStatusCardTnT.vue:109`

### 사용자 수 조회 (테넌트용)

```
GET /v1/management/dashboard/user/count
```

**호출 위치**: `views/newDashboard/components/tenant/VirtualPcStatusCardTnT.vue:115`

### 사용자 통계 조회 (테넌트용)

```
GET /v1/management/dashboard/user/stats
```

**호출 위치**: `views/newDashboard/components/tenant/UserStatusCardTnT.vue:56`

---

## 서버(노드) 현황

### 노드 수 조회

```
GET /v1/management/dashboard/node/count
```

**호출 위치**: `views/newDashboard/components/ServerStatusCard.vue:291`

### 노드 CPU Top-K

```
GET /v1/management/dashboard/node/cpu?topk={topk}
```

**호출 위치**: `views/newDashboard/components/ServerStatusCard.vue:298`

### 노드 메모리 Top-K

```
GET /v1/management/dashboard/node/memory?topk={topk}
```

**호출 위치**: `views/newDashboard/components/ServerStatusCard.vue:313`

### 노드 디스크 Top-K

```
GET /v1/management/dashboard/node/disk?topk={topk}
```

**호출 위치**: `views/newDashboard/components/ServerStatusCard.vue:329`

### 노드 네트워크 수신 Top-K

```
GET /v1/management/dashboard/node/networkrx?topk={topk}
```

**호출 위치**: `views/newDashboard/components/ServerStatusCard.vue:345`

### 노드 목록 조회

```
GET /v1/management/dashboard/node/list
```

**호출 위치**: `views/monitoring/realTime/server/control/ControlList.vue:493`, `views/monitoring/realTime/components/ComputedList.vue:523`

#### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| type | string | N | 조회 유형 (`summary` 등) |
| isControlNode | boolean | N | 컨트롤 노드 포함 여부 |
| page | number | N | 페이지 번호 |
| pageSize | number | N | 페이지당 항목 수 |
| searchTypeCd | string | N | 검색 유형 코드 |
| searchTypeValue | string | N | 검색어 |

### 노드 지표별 조회 (단일 지표)

```
GET /v1/management/dashboard/node/{type}
```

`type`: `cpu`, `memory`, `disk`, `network`, `networktx`, `networkrx`, `network/bps`, `network/summary`

**호출 위치**: `views/monitoring/realTime/components/ComputedChart.vue:475`, `views/monitoring/realTime/server/control/ChartUsage.vue:230`

#### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| topk | number | N | Top-K 수 |
| isRangeQuery | boolean | N | 범위 조회 여부 |
| isControlNode | boolean | N | 컨트롤 노드 포함 여부 |
| networkType | string | N | 네트워크 유형 |
| isAggregated | boolean | N | 집계 여부 |

---

## 스토리지 현황

### 스토리지 상태 조회

```
GET /v1/management/dashboard/storage/status
```

**호출 위치**: `views/newDashboard/components/StorageStatusCard.vue:211`, `views/monitoring/realTime/storage/index.vue:92`, `views/monitoring/realTime/storage/components/StorageSummaryCard.vue:284`

### 스토리지 사용량 조회

```
GET /v1/management/dashboard/storage/usage?isRangeQuery=true
```

**호출 위치**: `views/newDashboard/components/StorageStatusCard.vue:234`, `views/monitoring/realTime/storage/components/StorageSummaryCard.vue:320`

### 스토리지 디스크 I/O 조회

```
GET /v1/management/dashboard/storage/diskio?isRangeQuery=true
```

**호출 위치**: `views/newDashboard/components/StorageStatusCard.vue:290`, `views/monitoring/realTime/storage/components/StorageSummaryCard.vue:385`

---

## 알람 현황

### 알람 카운트 조회

```
GET /v1/management/dashboard/alarm/count
```

**호출 위치**: `views/newDashboard/components/EventStatusCard.vue:56`

### 알람 목록 조회

```
GET /v1/management/dashboard/alarm/list?topk={topk}&alertType={alertType}
```

**호출 위치**: `views/newDashboard/components/EventLogCard.vue:175`

#### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| topk | number | N | 최대 조회 건수 |
| alertType | string | N | 알람 유형 |

---

## Pod 현황

### Pod 수 조회

```
GET /v1/management/dashboard/pod/count
```

**호출 위치**: `views/newDashboard/components/PodStatusCard.vue:58`

### Pod 목록 조회

```
GET /v1/management/dashboard/pod/list
```

**호출 위치**: `views/monitoring/realTime/pod/component/TableList.vue:408`

#### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| page | number | N | 페이지 번호 |
| pageSize | number | N | 페이지당 항목 수 |
| namespace | string | N | 네임스페이스 |

### Pod 네임스페이스 목록 조회

```
GET /v1/management/dashboard/pod/namespaces
```

**호출 위치**: `views/monitoring/realTime/pod/component/TableList.vue:510`

### Pod CPU Top-5

```
GET /v1/management/dashboard/pod/cpu?isRangeQuery=true&topk=5
```

**호출 위치**: `views/monitoring/realTime/pod/component/UsageTopFive.vue:153`

### Pod 메모리 Top-5

```
GET /v1/management/dashboard/pod/memory?isRangeQuery=true&topk=5
```

**호출 위치**: `views/monitoring/realTime/pod/component/UsageTopFive.vue:72`

### Pod 지표별 조회

```
GET /v1/management/dashboard/pod/{type}
```

`type`: `cpu`, `memory`

**호출 위치**: `views/monitoring/realTime/pod/component/PodChartLine.vue:179`

---

## 네트워크 현황

### 네트워크 상태 조회

```
GET /v1/management/dashboard/network/status
```

**호출 위치**: `views/monitoring/realTime/network/index.vue:148`, `views/monitoring/realTime/components/ComputedList.vue:609`, `views/monitoring/realTime/server/compute/component/DetailUsage.vue:135`

---

## 대시보드 iframe 경로 조회

### 관리자용

```
GET /v1/management/api/dashboard/ifarmePathAdmin
```

**호출 위치**: `views/monitoring/dashboardManage/DashboardManager.vue:103`

### 테넌트용

```
GET /v1/management/api/dashboard/ifarmePath/{tenantId}
```

**호출 위치**: `views/monitoring/TenantDashboardManage/TenantDashboardManager.vue:130`

#### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tenantId | string | Y | 테넌트 ID |

---

## 공통 응답 필드 (지표 API)

| 필드 | 타입 | 설명 |
|------|------|------|
| metric | object | 지표 메타정보 (이름, 레이블) |
| values | array | 시계열 데이터 `[[timestamp, value], ...]` |
| value | array | 단일 값 `[timestamp, value]` |

---

## 에러 코드

공통 에러 코드 참고: `docs/admin-portal/internals/http-interceptor/02-error-codes.md`

---

## SA/TA 차이

### dashboard/index.vue

| 구분 | API | 비고 |
|------|-----|------|
| 공통 | `GET /v1/user/widget` | 위젯 목록 조회 |
| 공통 | `GET /v1/user/widget/account?use_yn=Y` | 사용자 위젯 설정 조회 |
| SA | 첫 번째 위젯(사용자 접속 현황)의 `detail_uri`를 `/monitoring/service-statistics/resource`로 지정 | TA는 해당 처리 없음 |

### newDashboard/components/EventLogCard.vue

| 구분 | API | 비고 |
|------|-----|------|
| 공통 | `GET /v1/management/dashboard/alarm/list?topk={n}&alertType={codes}` | 이벤트 로그 조회 |
| TA | 필터 초기값(`filterCheckbox.L`)을 `tenantFilterSet.L`로 교체 | SA는 기본 필터셋 사용 |
| SA | 더보기 클릭 시 `/realTimeMonitoring/receive-manage/receive-alarm-history` 이동 | |
| TA | 더보기 클릭 시 `/realTimeMonitoring/tenant-alarm/alarm-histories` 이동 | |

### newDashboard/components/EventStatusCard.vue

| 구분 | API | 비고 |
|------|-----|------|
| 공통 | `GET /v1/management/dashboard/alarm/count` | 알림 심각/경고 수 조회 |
| SA | 클릭 시 `/realTimeMonitoring/receive-manage/receive-alarm-history` 이동 | |
| TA | 클릭 시 `/realTimeMonitoring/tenant-alarm/alarm-histories` 이동 | |

---

## 패널 설정

### GET `/v1/management/dashboard/panel/{acctId}/list`

사용자별 대시보드 패널 배치 설정 조회.

**경로 파라미터**

| 필드 | 타입 | 설명 |
|------|------|------|
| acctId | string | 계정 ID |

**응답 Body**

배열. 각 항목:

| 필드 | 타입 | 설명 |
|------|------|------|
| panel_board_id | string | 패널 고유 ID |
| component | string | 매핑 코드 (EVTSTAT, EVTLOG, VPSSC, SRVSTAT, STGSTAT 등) |
| display_yn | string | 표시 여부 (`Y`/`N`) |
| order | number | 정렬 순서 |
| position | string | 배치 위치 (`L`/`R`) |
| title | string | 패널 제목 |

**호출 위치**: `views/newDashboard/index.vue:292`

### PUT `/v1/management/dashboard/panel/{acctId}`

패널 배치 설정 저장.

**호출 위치**: `views/newDashboard/index.vue` (패널 순서/표시 변경 시)

---

## 스토리지 OSD TOP5

### GET `/v1/management/dashboard/storage/usage/osd`

스토리지 OSD 사용량 TOP5 조회.

**요청 파라미터 (Query)**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| topk | number | N | 상위 N건 (기본 5) |

**응답 Body**

| 필드 | 타입 | 설명 |
|------|------|------|
| threshold | array | `[0]`에 `{ critical, warning, caution }` 임계치 |
| metrics | array | `[{ name, value, labels: { unitNm } }]` |

**호출 위치**: `views/newDashboard/components/StorageStatusCard.vue`

---

## 알람 뱃지 (Navbar)

### GET `/v1/management/statistics/service/alarmconform/count`

Navbar 알람 아이콘 뱃지 숫자. 응답은 숫자(String/Number).

**호출 위치**: `components/Alarms/index.vue:88`

### GET `/v1/management/statistics/service/alarmconform`

알람 뱃지 클릭 시 표시할 알람 목록.

**응답 Body**

배열. 각 항목:

| 필드 | 타입 | 설명 |
|------|------|------|
| alarm_id | string | 알람 ID |
| alarm_nm | string | 알람명 |
| alarm_level | string | 심각도 (critical, warning) |
| reg_ts | string | 발생 시각 |

**호출 위치**: `components/Alarms/index.vue:101`
