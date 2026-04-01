# 서비스 통계 API

## 사용자/리소스 현황

```
GET /v1/management/statistics/user/total
```

**호출 위치**: `views/monitoring/serviceStatistics/Resource.vue:198`, `views/monitoring/TenantServiceStatistics/Resource.vue:203`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| start_dt | string | N | 시작일 |
| end_dt | string | N | 종료일 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

---

## 테넌트별 사용자 클라이언트 통계

```
GET /v1/management/statistics/user/client
```

**호출 위치**: `views/monitoring/serviceStatistics/Tenant.vue:200`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| start_dt | string | N | 시작일 |
| end_dt | string | N | 종료일 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

---

## 사용자-VPC 서비스 통계

### 목록 조회

```
GET /v1/management/statistics/user/vpc
```

**호출 위치**: `views/monitoring/serviceStatistics/UserVirtualPc.vue:192`, `views/monitoring/serviceStatistics/UserVirtualPc.vue:274`

### 전체 건수 조회

```
GET /v1/management/statistics/user/vpc/total
```

**호출 위치**: `views/monitoring/serviceStatistics/UserVirtualPc.vue:245`

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

## 브라우저 접속 통계

```
GET /v1/management/statistics/browser
```

**호출 위치**: `views/monitoring/browserAccessStatistics/BrowserAccessStatistics.vue:150`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| start_dt | string | N | 시작일 |
| end_dt | string | N | 종료일 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

---

## 업무 처리 통계

### 업무 처리 현황

```
GET /v1/management/statistics/work/handling
```

**호출 위치**: `views/monitoring/workHandleStatistics/WorkHandleStatistics.vue:207`

### 고객 지원 현황

```
GET /v1/management/statistics/work/support
```

**호출 위치**: `views/monitoring/workHandleStatistics/CustomerSupportStatistics.vue:176`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| start_dt | string | N | 시작일 |
| end_dt | string | N | 종료일 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

---

## 이메일/SMS 발송 통계

### 이메일 발송 통계

```
GET /v1/management/statistics/mailing/email
```

**호출 위치**: `views/monitoring/emailSmsStatistics/EmailSendingStatics.vue:166`

### SMS 발송 통계

```
GET /v1/management/statistics/mailing/sms
```

**호출 위치**: `views/monitoring/emailSmsStatistics/SmsSendingStatistics.vue:167`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| start_dt | string | N | 시작일 |
| end_dt | string | N | 종료일 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

---

## 월간 리포트

```
GET /v1/management/statistics/month/report
```

**호출 위치**: `views/monitoring/monthlyReport/MonthlyReport.vue:331`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| year | number | N | 연도 |
| month | number | N | 월 |
| tnt_id | string | N | 테넌트 ID |

---

## 배포/접속 현황 통계

```
GET /v1/management/statistics/deploy
```

**호출 위치**: `views/monitoring/deployConnectStatus/DeployConnectStatus.vue:177`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| start_dt | string | N | 시작일 |
| end_dt | string | N | 종료일 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

---

## 에러 코드

공통 에러 코드 참고: `docs/admin-portal/internals/http-interceptor/02-error-codes.md`

---

## SA/TA 차이

`serviceStatistics/` 하위 세 파일(UserVirtualPc, Tenant, Resource) 공통 패턴:

| 구분 | 동작 |
|------|------|
| SA | 테넌트 선택 후 수동 검색 버튼 클릭 시 조회 |
| TA | `mth_callChangeTargetOptions` 콜백에서 자동으로 `mth_callSearchSubmit` 호출 (그룹 선택 즉시 조회) |

엔드포인트는 SA/TA 동일. TA일 때 `search_tnt_grp_id` 자동 설정 코드는 주석 처리됨.

### 테넌트 전용 통계 (`TenantServiceStatistics/`)

`serviceStatistics/`의 TA 전용 복제본. 동일한 API 엔드포인트를 사용하되 TA 로그인 시에만 메뉴에 노출.

| 디렉토리 | 사용 API |
|---------|---------|
| TenantServiceStatistics/UserVirtualPc | `GET /v1/management/statistics/user/vpc/total` / `GET /v1/management/statistics/user/vpc` |
| TenantServiceStatistics/Tenant | `GET /v1/management/statistics/user/client` |
| TenantServiceStatistics/Resource | `GET /v1/management/statistics/user/total` |

공통 패턴: TA일 때 대상 선택 즉시 자동 검색. `search_tnt_id`가 비어 있으면 `userinfo.tnt_id`로 자동 보정 후 호출.
