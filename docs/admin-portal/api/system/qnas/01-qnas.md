# VOC / 1:1 문의 API

## 목록 조회

```
GET /v1/system/qnas
```

**호출 위치**: `views/portal/ManToMan.vue:254`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| search_type | string | N | 검색 유형 (배열, 복수 가능) |
| search_word | string | N | 검색어 (배열, 복수 가능) |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| adv_req_wrt_no | number | 문의 번호 (PK) |
| title | string | 제목 |
| adv_typ_cd_nm | string | 문의 유형명 |
| usr_grp_nm | string | 사용자 그룹명 |
| reg_conn_id | string | 등록자 ID |
| adv_req_tm | string | 문의 요청 일시 |

---

## 단건 조회

```
GET /v1/system/qnas/{id}
```

**호출 위치**: `views/portal/ManToManDetail.vue:225`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | Y | 문의 번호 |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| adv_req_wrt_no | number | 문의 번호 |
| title | string | 제목 |
| adv_typ_cd_nm | string | 문의 유형명 |
| usr_grp_nm | string | 사용자 그룹명 |
| adv_cont | string | 문의 내용 (HTML) |
| adv_req_tm | string | 문의 요청 일시 |
| adv_req_acct_conn_id | string | 문의자 로그인 ID |
| adv_req_acct_nm | string | 문의자 이름 |
| asw_cont | string | 답변 내용 (HTML) |
| asw_acct_conn_id | string | 답변자 로그인 ID |
| asw_acct_nm | string | 답변자 이름 |
| asw_reg_tm | string | 답변 등록 일시 |
| wri_att_file_l | array | 첨부 파일 목록 |
| reg_conn_id | string | 등록자 ID |

---

## 답변 등록 / 수정

```
PUT /v1/system/qnas/{id}
```

**호출 위치**: `views/portal/ManToManDetail.vue:256`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | Y | 문의 번호 |

### 요청 바디 (JSON)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| asw_cont | string | Y | 답변 본문 (HTML) |
| wrt_typ_cd | string | Y | 작성 유형 코드 (고정값: `A012ANS`) |

---

## 삭제

```
DELETE /v1/system/qnas/{id}
```

**호출 위치**: `views/portal/ManToManDetail.vue:288`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | Y | 문의 번호 |

---

## 에러 코드

공통 에러 코드 참고: `docs/admin-portal/internals/http-interceptor/02-error-codes.md`
