# FAQ API

## 사용 화면
- [FAQ](../../화면/포털/04-FAQ.md)

## 목록 조회

```
GET /v1/system/faqs
```

**호출 위치**: `views/portal/Faq.vue:192`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| search_type | string | N | 검색 유형 (`T`: 제목, `C`: 내용, `R`: 등록자 ID) |
| search_word | string | N | 검색어 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| faq_wrt_no | number | FAQ 번호 (PK) |
| title | string | 제목 |
| faq_typ_cd | string | FAQ 유형 코드 (공통코드 A006) |
| post_yn | string | 게시 여부 (`Y` / `N`) |
| reg_conn_id | string | 등록자 ID |
| reg_ts | string | 등록 일시 |

---

## 단건 조회

```
GET /v1/system/faqs/{id}
```

**호출 위치**: `views/portal/FaqCreate.vue:205`, `views/portal/FaqDetail.vue:90`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | Y | FAQ 번호 |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| faq_wrt_no | number | FAQ 번호 |
| title | string | 제목 |
| faq_typ_cd | string | 유형 코드 |
| asw_cont | string | 답변 본문 (HTML) |
| att_file_loc_cd | string | 첨부파일 위치 (`U`: 상단, `D`: 하단) |
| post_yn | string | 게시 여부 |
| wri_att_file_l | array | 첨부 파일 목록 |
| reg_conn_id | string | 등록자 ID |
| reg_ts | string | 등록 일시 |

---

## 등록

```
POST /v1/system/faqs
```

**호출 위치**: `views/portal/FaqCreate.vue:237`

### 요청 바디 (JSON)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| title | string | Y | 제목 (최대 150자) |
| faq_typ_cd | string | Y | 유형 코드 (공통코드 A006) |
| asw_cont | string | Y | 답변 본문 (HTML, 최대 1000자) |
| att_file_loc_cd | string | N | 첨부파일 위치 (`U` / `D`, 기본값: `U`) |
| post_yn | string | N | 게시 여부 (기본값: `Y`) |
| wri_att_file_l_new | array | N | 신규 첨부 파일 |
| wri_att_file_l_old | array | N | 기존 첨부 파일 |

---

## 수정

```
PUT /v1/system/faqs/{id}
```

**호출 위치**: `views/portal/FaqCreate.vue:237`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | Y | FAQ 번호 |

### 요청 바디

등록과 동일.

---

## 삭제

```
DELETE /v1/system/faqs/{id}
```

**호출 위치**: `views/portal/FaqDetail.vue:117`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | Y | FAQ 번호 |

---

## 에러 코드

공통 에러 코드 참고: `docs/admin-portal/internals/http-interceptor/02-error-codes.md`
