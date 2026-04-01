# VPC 통계 API

## 가상PC 배정 현황

```
GET /v1/management/statistics/vpc/allocation
```

**호출 위치**: `views/monitoring/virtualpcStatistics/VirtualpcAllotment.vue:629`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| host_id | string | N | 호스트 ID |
| start_dt | string | N | 시작일 (`YYYY-MM-DD`) |
| end_dt | string | N | 종료일 (`YYYY-MM-DD`) |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| host_nm | string | 호스트명 |
| vpc_nm | string | VPC명 |
| cpu_total | number | CPU 전체 |
| cpu_used | number | CPU 사용량 |
| mem_total | number | 메모리 전체 |
| mem_used | number | 메모리 사용량 |

---

## 가상PC 사용 현황

### 목록 조회

```
GET /v1/management/statistics/vpc/usage
```

**호출 위치**: `views/monitoring/virtualpcStatistics/VirtualpcUsage.vue:258`, `views/monitoring/virtualpcStatistics/VirtualpcUsage.vue:367`

#### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| start_dt | string | N | 시작일 |
| end_dt | string | N | 종료일 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

### 전체 건수 조회

```
GET /v1/management/statistics/vpc/usage/total
```

**호출 위치**: `views/monitoring/virtualpcStatistics/VirtualpcUsage.vue:318`

---

## 동시 접속 VPC 통계

```
GET /v1/management/statistics/vpc/connection
```

**호출 위치**: `views/monitoring/virtualpcStatistics/SimultaneousVirtualpc.vue:211`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| start_dt | string | N | 시작일 |
| end_dt | string | N | 종료일 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

---

## 접속 시도 VPC 통계

```
GET /v1/management/statistics/vpc/connection/attempt
```

**호출 위치**: `views/monitoring/virtualpcStatistics/ConnectAttemptVirtualpc.vue:270`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| serv_grp_id | string | N | 서비스 그룹 ID |
| usr_grp_id | string | N | 사용자 그룹 ID |
| start_dt | string | N | 시작일 |
| end_dt | string | N | 종료일 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

---

## 미접속 VPC 통계

```
GET /v1/management/statistics/vpc/nonconnection
```

**호출 위치**: `views/monitoring/virtualpcStatistics/NonConnectVirtualpc.vue:181`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

---

## VPC 네트워크 통계

```
GET /v1/management/statistics/vpc/network
```

**호출 위치**: `views/monitoring/networkStatistics/VirtualpcNetwork.vue:548`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| vm_auth_id | string | N | VM 인증 ID |
| start_dt | string | N | 시작일 |
| end_dt | string | N | 종료일 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

---

## 사용자-VPC 조회

```
GET /v1/management/statistics/getUserVM
```

**호출 위치**: `views/monitoring/virtualpcStatistics/UserVirtualPcLookup.vue:185`, `views/monitoring/virtualpcStatistics/UserVirtualPcLookup.vue:264`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_conn_id | string | N | 사용자 로그인 ID |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

## 사용자-VPC 전체 정보 조회

```
GET /v1/management/statistics/getUserVMTotalInfo
```

**호출 위치**: `views/monitoring/virtualpcStatistics/UserVirtualPcLookup.vue:254`

---

## 에러 코드

공통 에러 코드 참고: `docs/admin-portal/internals/http-interceptor/02-error-codes.md`

---

## SA/TA 차이

`virtualpcStatistics/` 하위 파일별 TA 분기:

| 파일 | API | TA 분기 내용 |
|------|-----|------------|
| VirtualpcUsage | `GET /v1/management/statistics/vpc/usage/total` / `GET /v1/management/statistics/vpc/usage` | TA일 때 대상 선택 즉시 자동 검색 호출 |
| VirtualpcAllotment | 동일 엔드포인트 구조 | TA일 때 자동 검색 |
| SimultaneousVirtualpc | `GET /v1/management/statistics/vpc/connection` | TA일 때 자동 검색 |
| ConnectAttemptVirtualpc | `GET /v1/management/statistics/vpc/connection/attempt` | TA일 때 자동 검색 |
| NonConnectVirtualpc | `GET /v1/management/statistics/vpc/nonconnection` | TA일 때 자동 검색; 유저그룹명 조회 `GET /v1/user/servGroup/usergroups?tnt_id={id}` 추가 호출 |

### VirtualpcNetwork.vue

| 구분 | API | 비고 |
|------|-----|------|
| 공통 | `GET /v1/management/statistics/vpc/network` | 가상PC 네트워크 평균값 |
| TA | `mng_tnt_grp_id`를 `search_tnt_grp_id`로 자동 주입 후 호출 | SA는 직접 선택 |

### 테넌트 전용 통계 (`TenantVirtualpcStatistics/`)

`virtualpcStatistics/`의 TA 전용 복제본. 동일한 API 엔드포인트를 사용하되 TA 로그인 시에만 메뉴에 노출.

| 디렉토리 | 사용 API |
|---------|---------|
| TenantVirtualpcStatistics/SimultaneousVirtualpc | `GET /v1/management/statistics/vpc/connection` |
| TenantVirtualpcStatistics/NonConnectVirtualpc | `GET /v1/management/statistics/vpc/nonconnection` / `GET /v1/user/usergroups/?usr_grp_id={id}` |
| TenantVirtualpcStatistics/VirtualpcUsage | `GET /v1/management/statistics/vpc/usage` |
| TenantVirtualpcStatistics/VirtualpcAllotment | 동일 구조 |

공통 패턴: TA일 때 대상 선택 즉시 자동 검색. `search_tnt_id`가 비어 있으면 `userinfo.tnt_id`로 자동 보정 후 호출.
