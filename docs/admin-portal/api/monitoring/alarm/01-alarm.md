# 알람 설정 API

## 사용 화면
- (화면 문서 미작성)

## 목록 조회

```
GET /v1/management/alarm
```

**호출 위치**: `views/monitoring/alarm/AlarmSettings.vue:276`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| search_type | string | N | 검색 유형 (`R`: 수신자명) |
| search_word | string | N | 검색어 |
| usg_yn | string | N | 사용 여부 (`Y` / `N`) |
| alm_tgt_cd | string | N | 알람 대상 코드 |
| alm_typ_class_cd | string | N | 알람 유형 분류 코드 |
| alm_typ_cd | string | N | 알람 유형 코드 |
| start_dt | string | N | 검색 시작일 (`YYYY-MM-DD`) |
| end_dt | string | N | 검색 종료일 (`YYYY-MM-DD`) |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| alm_set_id | number | 알람 설정 ID (PK) |
| alm_tgt_cd | string | 알람 대상 코드 |
| alm_typ_class_cd | string | 알람 유형 분류 코드 |
| alm_typ_cd | string | 알람 유형 코드 |
| alm_detl | string | 알람 상세 설명 |
| alm_ptal_send_yn | string | 포털 발송 여부 (`Y` / `N`) |
| alm_sms_send_yn | string | SMS 발송 여부 (`Y` / `N`) |
| alm_email_send_yn | string | 이메일 발송 여부 (`Y` / `N`) |
| usg_yn | string | 사용 여부 (`Y` / `N`) |
| target_list | array | 수신 대상자 목록 |

---

## 단건 조회

```
GET /v1/management/alarm/{id}
```

**호출 위치**: `views/monitoring/alarm/AlarmSettingsDetail.vue:568`, `views/monitoring/ReceiveManage/ReceiverManageDetail.vue:550`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | Y | 알람 설정 ID |

### 응답

목록 조회 응답 필드와 동일. `target_list` 포함.

`target_list` 항목:

| 필드 | 타입 | 설명 |
|------|------|------|
| acct_id | number | 계정 ID |
| acct_nm | string | 계정명 |
| acct_conn_id | string | 로그인 ID |
| email | string | 이메일 |
| mob_no | string | 휴대폰 번호 |
| alm_set_id | number | 알람 설정 ID |

---

## 등록

```
POST /v1/management/alarm
```

**호출 위치**: `views/monitoring/alarm/AlarmSettingsDetail.vue:819`, `views/monitoring/ReceiveManage/ReceiverManageDetail.vue:801`

### 요청 바디 (JSON)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| alm_tgt_cd | string | Y | 알람 대상 코드 |
| alm_typ_class_cd | string | Y | 알람 유형 분류 코드 |
| alm_typ_cd | string | Y | 알람 유형 코드 |
| alm_detl | string | N | 알람 상세 설명 |
| alm_ptal_send_yn | string | Y | 포털 발송 여부 (`Y` / `N`) |
| alm_sms_send_yn | string | Y | SMS 발송 여부 (`Y` / `N`) |
| alm_email_send_yn | string | Y | 이메일 발송 여부 (`Y` / `N`) |
| usg_yn | string | Y | 사용 여부 (`Y` / `N`) |
| target_list | array | N | 수신 대상자 목록 |

---

## 수정

```
PUT /v1/management/alarm/{id}
```

**호출 위치**: `views/monitoring/alarm/AlarmSettingsDetail.vue:787`, `views/monitoring/ReceiveManage/ReceiverManageDetail.vue:769`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | Y | 알람 설정 ID |

### 요청 바디

등록과 동일.

---

## 삭제

```
DELETE /v1/management/alarm/{id}
```

**호출 위치**: `views/monitoring/alarm/AlarmSettingsDetail.vue:746`, `views/monitoring/ReceiveManage/ReceiverManageDetail.vue:728`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | Y | 알람 설정 ID |

---

## 에러 코드

공통 에러 코드 참고: `docs/admin-portal/internals/http-interceptor/02-error-codes.md`
