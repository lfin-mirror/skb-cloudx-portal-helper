# 알람 수신 임계치 API

## 목록 조회

```
GET /v1/management/receive/threshold
```

**호출 위치**: `views/monitoring/ReceiveManage/ReceiveAlarmThreshold.vue:176`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| search_word | string | N | 검색어 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| alm_thd_id | number | 임계치 ID (PK) |
| panel_id | string | Grafana 패널 ID |
| panel_nm | string | 패널명 |
| thd_val | number | 임계치 값 |
| thd_unit | string | 임계치 단위 |
| reg_conn_id | string | 등록자 ID |
| reg_ts | string | 등록 일시 |

---

## 단건 조회

```
GET /v1/management/receive/threshold/{id}
```

**호출 위치**: `views/monitoring/ReceiveManage/ReceiveAlarmThresholdDetail.vue:251`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | Y | 임계치 ID |

---

## 등록

```
POST /v1/management/receive/threshold
```

**호출 위치**: `views/monitoring/ReceiveManage/ReceiveAlarmThresholdDetail.vue:317`

### 요청 바디 (JSON)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| panel_id | string | Y | Grafana 패널 ID |
| panel_nm | string | Y | 패널명 |
| thd_val | number | Y | 임계치 값 |
| thd_unit | string | N | 임계치 단위 |

---

## 수정

```
PUT /v1/management/receive/threshold/{id}
```

**호출 위치**: `views/monitoring/ReceiveManage/ReceiveAlarmThresholdDetail.vue:299`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | Y | 임계치 ID |

### 요청 바디

등록과 동일.

---

## 삭제

```
DELETE /v1/management/receive/threshold/{id}
```

**호출 위치**: `views/monitoring/ReceiveManage/ReceiveAlarmThresholdDetail.vue:277`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | Y | 임계치 ID |

---

## 수신 이력 조회

```
GET /v1/management/receive/histories
```

**호출 위치**: `views/monitoring/ReceiveManage/ReceiveAlarmHistory.vue:115`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| start_dt | string | N | 검색 시작일 |
| end_dt | string | N | 검색 종료일 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| alm_rcv_hist_id | number | 수신 이력 ID |
| panel_id | string | 패널 ID |
| panel_nm | string | 패널명 |
| thd_val | number | 임계치 값 |
| curr_val | number | 현재 측정값 |
| alm_occ_dtm | string | 발생 일시 |

---

## 수신자 목록 조회

```
GET /v1/management/receive/receiver
```

**호출 위치**: `views/monitoring/ReceiveManage/ReceiverManage.vue:142`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| search_word | string | N | 검색어 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| acct_id | number | 계정 ID |
| acct_nm | string | 계정명 |
| acct_conn_id | string | 로그인 ID |
| email | string | 이메일 |
| mob_no | string | 휴대폰 번호 |

---

## 에러 코드

공통 에러 코드 참고: `docs/admin-portal/internals/http-interceptor/02-error-codes.md`
