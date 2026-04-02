# 로그 통계 API

## 사용 화면
- (화면 문서 미작성)

## 사용자 활동 로그

### 목록 조회

```
GET /v1/management/statistics/user/log
```

**호출 위치**: `views/monitoring/logStatistics/UserActivityLog.vue:173`, `views/monitoring/logStatistics/UserActivityLog.vue:208`

#### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| serv_grp_id | string | N | 서비스 그룹 ID |
| start_dt | string | N | 시작일 (`YYYY-MM-DD`) |
| end_dt | string | N | 종료일 (`YYYY-MM-DD`) |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

### 전체 건수 조회

```
GET /v1/management/statistics/user/log/total
```

**호출 위치**: `views/monitoring/logStatistics/UserActivityLog.vue:190`

#### 요청 파라미터

목록 조회와 동일.

---

## 관리자 활동 로그

### 목록 조회

```
GET /v1/management/statistics/admin/log
```

**호출 위치**: `views/monitoring/logStatistics/AdminActivityLog.vue:223`, `views/monitoring/logStatistics/AdminActivityLog.vue:308`

#### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| serv_grp_id | string | N | 서비스 그룹 ID |
| usr_grp_id | string | N | 사용자 그룹 ID |
| start_dt | string | N | 시작일 |
| end_dt | string | N | 종료일 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

### 전체 건수 조회

```
GET /v1/management/statistics/admin/log/total
```

**호출 위치**: `views/monitoring/logStatistics/AdminActivityLog.vue:241`

---

## 접속 이력 통계

### 기간별 목록 조회

```
GET /v1/management/statistics/connhist/byperiod/list
```

**호출 위치**: `views/monitoring/logStatistics/PeriodConnectLogList.vue:390`

#### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| start_dt | string | N | 시작일 |
| end_dt | string | N | 종료일 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

### 기간별 전체 건수 조회

```
GET /v1/management/statistics/connhist/byperiod/total
```

**호출 위치**: `views/monitoring/logStatistics/PeriodConnectLogList.vue:149` (childRequestUrl)

### 기간별 CSV 다운로드

```
GET /v1/management/statistics/connhist/byperiod/list/csv
```

**호출 위치**: `views/monitoring/logStatistics/PeriodConnectLogList.vue:272`

### 사용자별 목록 조회

```
GET /v1/management/statistics/connhist/peruser/list
```

**호출 위치**: `views/monitoring/logStatistics/ByUserPeriodConnectLogList.vue:412`

### 사용자별 전체 건수 조회

```
GET /v1/management/statistics/connhist/peruser/total
```

**호출 위치**: `views/monitoring/logStatistics/ByUserPeriodConnectLogList.vue:153` (childRequestUrl)

### 사용자별 CSV 다운로드

```
GET /v1/management/statistics/connhist/peruser/list/csv
```

**호출 위치**: `views/monitoring/logStatistics/ByUserPeriodConnectLogList.vue:280`

### 접속 이력 상세 목록

```
GET /v1/management/statistics/connhist/detail/list
```

**호출 위치**: `views/monitoring/logStatistics/components/ConnectLogListModal.vue:437`

### 접속 이력 상세 건수

```
GET /v1/management/statistics/connhist/detail/total
```

**호출 위치**: `views/monitoring/logStatistics/components/ConnectLogListModal.vue:389`

---

## 접속 현황 (실시간)

### 목록 조회

```
GET /v1/management/statistics/totalconnstat/list
```

**호출 위치**: `views/monitoring/logStatistics/UserConnectStatus.vue:199`, `views/monitoring/logStatistics/UserConnectStatus.vue:299`

### 전체 건수 조회

```
GET /v1/management/statistics/totalconnstat/total
```

**호출 위치**: `views/monitoring/logStatistics/UserConnectStatus.vue:116` (childRequestUrl)

---

## 사용자 수 통계

### 기간별 목록 조회

```
GET /v1/management/statistics/totalusers/byperiod/list
```

**호출 위치**: `views/monitoring/logStatistics/PeriodByUserCount.vue:276`

### 기간별 전체 건수 조회

```
GET /v1/management/statistics/totalusers/byperiod/total
```

**호출 위치**: `views/monitoring/logStatistics/PeriodByUserCount.vue:110` (childRequestUrl)

### 기간별 CSV 다운로드

```
GET /v1/management/statistics/totalusers/byperiod/list/csv
```

**호출 위치**: `views/monitoring/logStatistics/PeriodByUserCount.vue:179`

### 그룹별 목록 조회

```
GET /v1/management/statistics/totalusers/bygroup/list
```

**호출 위치**: `views/monitoring/logStatistics/GroupByUserCount.vue:280`

### 그룹별 전체 건수 조회

```
GET /v1/management/statistics/totalusers/bygroup/total
```

**호출 위치**: `views/monitoring/logStatistics/GroupByUserCount.vue:113` (childRequestUrl)

### 그룹별 CSV 다운로드

```
GET /v1/management/statistics/totalusers/bygroup/list/csv
```

**호출 위치**: `views/monitoring/logStatistics/GroupByUserCount.vue:180`

---

## 사용 시간 통계

### 기간별 목록 조회

```
GET /v1/management/statistics/usagetime/byperiod/list
```

**호출 위치**: `views/monitoring/logStatistics/PeriodUserUsageTimeList.vue:294`

### 기간별 전체 건수 조회

```
GET /v1/management/statistics/usagetime/byperiod/total
```

**호출 위치**: `views/monitoring/logStatistics/PeriodUserUsageTimeList.vue:112` (childRequestUrl)

### 기간별 CSV 다운로드

```
GET /v1/management/statistics/usagetime/byperiod/list/csv
```

**호출 위치**: `views/monitoring/logStatistics/PeriodUserUsageTimeList.vue:197`

### 사용자별 목록 조회

```
GET /v1/management/statistics/usagetime/peruser/list
```

**호출 위치**: `views/monitoring/logStatistics/ByUserUsageTimeList.vue:334`

### 사용자별 전체 건수 조회

```
GET /v1/management/statistics/usagetime/peruser/total
```

**호출 위치**: `views/monitoring/logStatistics/ByUserUsageTimeList.vue:116` (childRequestUrl)

### 사용자별 CSV 다운로드

```
GET /v1/management/statistics/usagetime/peruser/list/csv
```

**호출 위치**: `views/monitoring/logStatistics/ByUserUsageTimeList.vue:233`

---

## 오류 통계

### 시스템 오류 통계 조회

```
GET /v1/management/statistics/error/system
```

**호출 위치**: `views/monitoring/logStatistics/SystemErrorStatistics.vue:188`

#### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| service_cd | string | N | 서비스 코드 |
| error_cd | string | N | 오류 코드 |
| start_dt | string | N | 시작일 |
| end_dt | string | N | 종료일 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

### 클라이언트 오류 통계 조회

```
GET /v1/management/statistics/error/client
```

**호출 위치**: `views/monitoring/logStatistics/ClientErrorStatistics.vue:207`

#### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| client_type | string | N | 클라이언트 유형 |
| client_version | string | N | 클라이언트 버전 |
| start_dt | string | N | 시작일 |
| end_dt | string | N | 종료일 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

---

## 에러 코드

공통 에러 코드 참고: `docs/admin-portal/internals/http-interceptor/02-error-codes.md`

---

## SA/TA 차이

`logStatistics/` 하위 파일별 공통 패턴: TA(`isTenant`)일 때 대상 그룹 선택 즉시 자동 검색 호출.

| 파일 | API | TA 자동검색 |
|------|-----|-----------|
| AdminActivityLog | `GET /v1/management/statistics/admin/log` / `GET /v1/management/statistics/admin/log/total` | 없음 (수동 검색; `search_grp_typ_cd` 파라미터에 현재 역할 코드 전달) |
| PeriodConnectLogList | `GET /v1/management/statistics/connhist/byperiod/list` / CSV: `GET /v1/management/statistics/connhist/byperiod/list/csv` | TA일 때 그룹 선택 즉시 자동 호출 |
| ByUserPeriodConnectLogList | `GET /v1/management/statistics/connhist/peruser/list` / CSV: `GET /v1/management/statistics/connhist/peruser/list/csv` | TA일 때 그룹 선택 시 `search_usr_grp_id` 업데이트 (실제 검색은 수동) |
| ByUserUsageTimeList | `GET /v1/management/statistics/usagetime/peruser/list` / CSV: `GET /v1/management/statistics/usagetime/peruser/list/csv` | TA일 때 자동 검색 |
| GroupByUserCount | `GET /v1/management/statistics/totalusers/bygroup/list` / CSV: `GET /v1/management/statistics/totalusers/bygroup/list/csv` | TA일 때 자동 검색 |
| PeriodByUserCount | `GET /v1/management/statistics/totalusers/byperiod/list` | TA일 때 자동 검색 |
| PeriodUserUsageTimeList | `GET /v1/management/statistics/usagetime/byperiod/list` | TA일 때 자동 검색 |
| UserConnectStatus | `GET /v1/management/statistics/totalconnstat/list` | TA일 때 자동 검색 |

AdminActivityLog: `search_grp_typ_cd` 파라미터에 현재 사용자의 `grp_typ_cd`를 항상 주입. TA일 때 `search_tnt_id`가 비어 있으면 `userinfo.tnt_id`로 자동 보정.
