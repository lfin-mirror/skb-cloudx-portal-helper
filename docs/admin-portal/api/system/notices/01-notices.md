# 공지사항 API

## 사용 화면
- [공지사항](../../화면/포털/03-공지사항.md)

## 목록 조회

```
GET /v1/system/notices
```

**호출 위치**: `views/portal/Notice.vue:191`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| search_type | string | N | 검색 유형 (`T`: 제목, `C`: 내용, `R`: 등록자 ID) |
| search_word | string | N | 검색어 |
| rep_yn_nm | string | N | 대표 공지 여부 (`Y` / `N`) |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| noti_wrt_no | number | 공지 번호 (PK) |
| title | string | 제목 |
| rep_yn_nm | string | 대표 공지 여부 |
| noti_meth_cd | string | 게시 방식 코드 (`U016REP`: 대표, `U016GEN`: 일반) |
| noti_tgt_cd | string | 대상 코드 |
| reg_conn_id | string | 등록자 ID |
| reg_ts | string | 등록 일시 |

---

## 단건 조회

```
GET /v1/system/notices/{id}
```

**호출 위치**: `views/portal/NoticeCreate.vue:179`, `views/portal/NoticeDetail.vue:108`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | Y | 공지 번호 |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| noti_wrt_no | number | 공지 번호 |
| title | string | 제목 |
| cont | string | 본문 (HTML) |
| noti_meth_cd | string | 게시 방식 코드 |
| noti_meth_cd_nm | string | 게시 방식 명 |
| noti_tgt_cd | string | 대상 코드 |
| noti_tgt_grp_id | string | 대상 그룹 ID |
| att_file_loc_cd | string | 첨부파일 표시 위치 (`U`: 상단, `D`: 하단) |
| wri_att_file_l | array | 첨부 파일 목록 |
| reg_conn_id | string | 등록자 ID |
| reg_ts | string | 등록 일시 |

---

## 등록

```
POST /v1/system/notices
```

**호출 위치**: `views/portal/NoticeCreate.vue:212`

### 요청 바디 (JSON)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| title | string | Y | 제목 (최대 150자) |
| cont | string | Y | 본문 (HTML, 최대 1000자) |
| noti_tgt_cd | string | Y | 대상 코드 (기본값: `U015AL`) |
| noti_meth_cd | string | Y | 게시 방식 (`U016REP`: 대표, `U016GEN`: 일반) |
| att_file_loc_cd | string | N | 첨부파일 위치 (`U` / `D`) |
| noti_done_yn | string | N | 처리 완료 여부 (기본값: `N`) |
| wri_att_file_l | array | N | 첨부 파일 목록 |
| wri_att_file_l_new | array | N | 신규 첨부 파일 |
| wri_att_file_l_old | array | N | 기존 첨부 파일 |

---

## 수정

```
PUT /v1/system/notices/{id}
```

**호출 위치**: `views/portal/NoticeCreate.vue:212`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | Y | 공지 번호 |

### 요청 바디

등록과 동일.

---

## 삭제

```
DELETE /v1/system/notices/{id}
```

**호출 위치**: `views/portal/NoticeDetail.vue:160`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | Y | 공지 번호 |

### 응답

삭제 성공 시 응답 바디 없음 (HTTP 200).

---

## 에러 코드

공통 에러 코드 참고: `docs/admin-portal/internals/http-interceptor/02-error-codes.md`

---

## SA/TA 차이

### NoticeDetail.vue — 공지 상세

| 구분 | API | 비고 |
|------|-----|------|
| 공통 | `GET /v1/system/notices/{id}` | 공지 조회 |
| 공통 | `DELETE /v1/system/notices/{id}` | 공지 삭제 |
| TA 제한 | 전체 공지(`noti_tgt_grp_id` 없음) 수정 불가 | 수정 버튼 클릭 시 경고 반환, API 미호출 |
