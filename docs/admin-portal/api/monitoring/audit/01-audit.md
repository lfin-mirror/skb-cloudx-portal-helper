# 감사 로그 API

## 관리자 감사로그 조회

```
GET /v1/audit/auditlog/admin
```

**호출 위치**: `views/monitoring/auditLog/AdminAuditLog.vue:314`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| search_type | string | N | 검색 유형 |
| search_word | string | N | 검색어 |
| start_dt | string | N | 검색 시작일 (`YYYY-MM-DD`) |
| end_dt | string | N | 검색 종료일 (`YYYY-MM-DD`) |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| timeout | number | N | 요청 타임아웃 ms (기본값: 180000) |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| audit_id | number | 감사로그 ID (PK) |
| acct_conn_id | string | 관리자 로그인 ID |
| acct_nm | string | 관리자명 |
| api_url | string | 호출 API URL |
| http_meth_cd | string | HTTP 메서드 |
| req_param | string | 요청 파라미터 (JSON) |
| resp_cd | string | 응답 코드 |
| log_dtm | string | 로그 일시 |

---

## 사용자 감사로그 조회

```
GET /v1/audit/auditlog/user
```

**호출 위치**: `views/monitoring/auditLog/UserAuditLog.vue:323`

### 요청 파라미터 (Query)

관리자 감사로그와 동일.

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| audit_id | number | 감사로그 ID (PK) |
| acct_conn_id | string | 사용자 로그인 ID |
| acct_nm | string | 사용자명 |
| tnt_nm | string | 테넌트명 |
| api_url | string | 호출 API URL |
| http_meth_cd | string | HTTP 메서드 |
| req_param | string | 요청 파라미터 (JSON) |
| resp_cd | string | 응답 코드 |
| log_dtm | string | 로그 일시 |

---

## 감사로그 단건 상세 조회

```
GET /v1/audit/auditlog/{apiType}/{audit_id}
```

**호출 위치**: `views/monitoring/auditLog/components/CommonDetailLogModal.vue:112`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| apiType | string | Y | 로그 유형 (`admin` / `user`) |
| audit_id | number | Y | 감사로그 ID |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| audit_id | number | 감사로그 ID |
| req_param | string | 요청 파라미터 전문 (JSON) |
| resp_body | string | 응답 바디 전문 (JSON) |
| api_url | string | 호출 API URL |
| http_meth_cd | string | HTTP 메서드 |
| log_dtm | string | 로그 일시 |

---

## 에러 코드

공통 에러 코드 참고: `docs/admin-portal/internals/http-interceptor/02-error-codes.md`
