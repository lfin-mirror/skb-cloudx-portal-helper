# 품질 / 호스트 / 스토리지 통계 API

---

## 품질 통계

### 지연시간 통계

```
GET /v1/management/statistics/quality/delay
```

**호출 위치**: `views/monitoring/qualityStatistics/DelayTime.vue:198`

#### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| serv_grp_id | string | N | 서비스 그룹 ID |
| usr_grp_id | string | N | 사용자 그룹 ID |
| vm_auth_id | string | N | VM 인증 ID |
| start_dt | string | N | 시작일 (`YYYY-MM-DD`) |
| end_dt | string | N | 종료일 (`YYYY-MM-DD`) |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

### 뷰어 실행 환경 통계

```
GET /v1/management/statistics/quality/environment
```

**호출 위치**: `views/monitoring/qualityStatistics/ViewerRunEnvironment.vue:156`

### 뷰어 실행 환경 그래프

```
GET /v1/management/statistics/quality/environment/graph
```

**호출 위치**: `views/monitoring/qualityStatistics/ViewerRunEnvironment.vue:183`

### 대역폭 통계

```
GET /v1/management/statistics/quality/bandwidth
```

**호출 위치**: `views/monitoring/qualityStatistics/Bandwidth.vue:206`

#### 요청 파라미터 (Query)

지연시간 통계와 동일.

---

## 호스트 통계

### 호스트 CPU 사용률

```
GET /v1/management/statistics/host/cpu
```

**호출 위치**: `views/monitoring/metering/CpuUtilization.vue:169`

#### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| zone_nm | string | N | 존 이름 |
| host_id | string | N | 호스트 ID |
| start_dt | string | N | 시작일 |
| end_dt | string | N | 종료일 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

### 호스트 메모리 사용률

```
GET /v1/management/statistics/host/memory
```

**호출 위치**: `views/monitoring/metering/MemoryUtilization.vue:168`

#### 요청 파라미터

호스트 CPU 사용률과 동일.

### 호스트 디스크 사용률

```
GET /v1/management/statistics/host/disk
```

**호출 위치**: `views/monitoring/metering/UsageDiskUtilization.vue:168`

#### 요청 파라미터

호스트 CPU 사용률과 동일.

### 호스트 네트워크 통계

```
GET /v1/management/statistics/host/network
```

**호출 위치**: `views/monitoring/networkStatistics/HostNetwork.vue:473`

#### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| zone_nm | string | N | 존 이름 |
| host_id | string | N | 호스트 ID |
| start_dt | string | N | 시작일 |
| end_dt | string | N | 종료일 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

---

## 스토리지 통계

### OS 스토리지 통계

```
GET /v1/management/statistics/storage/os
```

**호출 위치**: `views/monitoring/storageStatistics/OsStorage.vue:136`

#### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| zone_nm | string | N | 존 이름 |
| host_id | string | N | 호스트 ID |
| start_dt | string | N | 시작일 |
| end_dt | string | N | 종료일 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

### NAS 스토리지 통계

```
GET /v1/management/statistics/storage/nas
```

**호출 위치**: `views/monitoring/storageStatistics/NasStorage.vue:136`

#### 요청 파라미터

OS 스토리지 통계와 동일.

---

## 공통 보조 API

### 존 목록 조회

```
GET /v1/management/common/zones
```

**호출 위치**: `views/monitoring/metering/CpuUtilization.vue:124`, `views/monitoring/metering/MemoryUtilization.vue:124`, `views/monitoring/metering/UsageDiskUtilization.vue:124`, `views/monitoring/networkStatistics/HostNetwork.vue:175`

### 존별 호스트 목록 조회

```
GET /v1/management/common/zone/{parentValue}/hosts
```

**호출 위치**: `views/monitoring/metering/CpuUtilization.vue:119`, `views/monitoring/networkStatistics/HostNetwork.vue:170`

#### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| parentValue | string | Y | 존 이름 |

### 서비스별 오류 코드 목록

```
GET /v1/management/common/service/{parentValue}/error/code
```

**호출 위치**: `views/monitoring/logStatistics/SystemErrorStatistics.vue:142`

### 클라이언트 버전 목록

```
GET /v1/management/common/client/{parentValue}/version
```

**호출 위치**: `views/monitoring/logStatistics/ClientErrorStatistics.vue:143`

### VPC 목록 (통계 필터용)

```
GET /v1/management/common/vpcs
```

**호출 위치**: `views/monitoring/qualityStatistics/mixins/searchTargetConfig.js:34`

#### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| search_usr_grp_id | string | N | 사용자 그룹 ID |

---

## 에러 코드

공통 에러 코드 참고: `docs/admin-portal/internals/http-interceptor/02-error-codes.md`

---

## SA/TA 차이

### VirtualpcNetwork.vue — 네트워크 통계

| 구분 | API | 비고 |
|------|-----|------|
| 공통 | `GET /v1/management/statistics/vpc/network` | 가상PC 네트워크 평균값 |
| TA | `mng_tnt_grp_id`를 `search_tnt_grp_id`로 자동 주입 후 호출 | SA는 직접 선택 |

### 테넌트 전용 품질 통계 (`TenantQualityStatistics/`)

`qualityStatistics/`의 TA 전용 복제본. 동일 API 엔드포인트 사용, TA 로그인 시에만 메뉴에 노출.

| 디렉토리 | TA 분기 |
|---------|--------|
| TenantQualityStatistics/Bandwidth | TA일 때 `search_tnt_id` 자동 보정 |
| TenantQualityStatistics/DelayTime | 동일 |
