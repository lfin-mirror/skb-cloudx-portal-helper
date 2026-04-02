# 알람 수신 그룹 API

## 사용 화면
- (화면 문서 미작성)

## 목록 조회

```
GET /v1/management/receive/group
```

**호출 위치**: `views/monitoring/ReceiveManage/ReceiveGroupManage.vue:169`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| search_word | string | N | 검색어 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| alm_rcv_grp_id | number | 수신 그룹 ID (PK) |
| alm_rcv_grp_nm | string | 수신 그룹명 |
| receiver_list | array | 수신자 목록 |
| threshold_list | array | 임계치 목록 |
| reg_conn_id | string | 등록자 ID |
| reg_ts | string | 등록 일시 |

---

## 단건 조회

```
GET /v1/management/receive/group/{id}
```

**호출 위치**: `views/monitoring/ReceiveManage/ReceiveGroupManageDetail.vue:323`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | Y | 수신 그룹 ID |

### 응답

`receiver_list` 항목:

| 필드 | 타입 | 설명 |
|------|------|------|
| acct_id | number | 계정 ID |
| acct_conn_id | string | 로그인 ID |
| acct_nm | string | 계정명 |
| email | string | 이메일 |
| mob_no | string | 휴대폰 번호 |
| alm_set_id | number | 연결된 알람 설정 ID |

`threshold_list` 항목:

| 필드 | 타입 | 설명 |
|------|------|------|
| alm_thd_id | number | 임계치 ID |
| panel_id | string | Grafana 패널 ID |
| panel_nm | string | 패널명 |

---

## 등록

```
POST /v1/management/receive/group
```

**호출 위치**: `views/monitoring/ReceiveManage/ReceiveGroupManageDetail.vue:491`

### 요청 바디 (JSON)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| alm_rcv_grp_nm | string | Y | 수신 그룹명 |
| receiver_list | array | N | 수신자 목록 |
| threshold_list | array | N | 임계치 목록 |

---

## 수정

```
PUT /v1/management/receive/group/{id}
```

**호출 위치**: `views/monitoring/ReceiveManage/ReceiveGroupManageDetail.vue:473`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | Y | 수신 그룹 ID |

### 요청 바디

등록과 동일.

---

## 삭제

```
DELETE /v1/management/receive/group/{id}
```

**호출 위치**: `views/monitoring/ReceiveManage/ReceiveGroupManageDetail.vue:451`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | Y | 수신 그룹 ID |

---

## 에러 코드

공통 에러 코드 참고: `docs/admin-portal/internals/http-interceptor/02-error-codes.md`
