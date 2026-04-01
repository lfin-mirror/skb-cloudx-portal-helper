# 1:1 문의 API

## GET `/v1/system/qnas`

1:1 문의 목록 조회.

### 요청

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| start_num | number | N | 페이지네이션 시작 번호 |
| row_count | string | N | 조회 건수 (기본 `'10'`) |
| sort | string | N | 정렬 컬럼 (`reg_ts`) |

파라미터 없이 전체 조회 시 답변 완료/대기 건수 집계용으로도 사용한다.

### 응답

배열. 항목당 필드:

| 필드 | 타입 | 설명 |
|------|------|------|
| adv_req_wrt_no | number | 문의 게시글 번호 (상세/수정/삭제에 사용) |
| title | string | 문의 제목 |
| adv_typ_cd | string | 문의 유형 코드 |
| adv_typ_cd_nm | string | 문의 유형명 |
| adv_cont | string | 문의 내용 |
| adv_pgrs_sts_cd | string | 진행 상태 코드. `A004I`(답변 대기), `A004E`(답변 완료) |
| adv_pgrs_sts_cd_nm | string | 진행 상태명 |
| asw_cont | string | 답변 내용 |
| reg_ts | string | 등록 일시 |

### 호출 위치

- `views/support/ContactList.vue:271` — 1:1 문의 목록 페이지 (페이지네이션 포함)
- `views/support/ContactList.vue:295` — 전체 목록 조회 (파라미터 없음, 답변 완료/대기 건수 집계)

---

## GET `/v1/system/qnas/count`

1:1 문의 전체 건수 조회.

### 요청

Query Parameters 없음 (현재 로그인 사용자의 전체 문의 건수).

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| list_count | number | 전체 1:1 문의 건수 |

### 호출 위치

- `views/support/ContactList.vue:263` — 목록 페이지 로드 시 페이지네이션용 전체 건수 조회

---

## GET `/v1/system/qnas/{advReqWrtNo}`

1:1 문의 상세 조회. 목록에서 항목을 펼칠 때 첨부파일 정보를 가져온다.

### 요청

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| advReqWrtNo | number | Y | 문의 게시글 번호 |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| adv_req_wrt_no | number | 게시글 번호 |
| title | string | 제목 |
| adv_cont | string | 문의 내용 |
| asw_cont | string | 답변 내용 |
| wri_att_file_l | array | 첨부파일 목록 |
| wri_att_file_l[].stor_file_id | string | 저장 파일 ID (파일 다운로드에 사용) |
| wri_att_file_l[].org_file_nm | string | 원본 파일명 |
| wri_att_file_l[].att_file_loc_cd | string | 파일 위치 구분 코드 |

### 호출 위치

- `views/support/ContactList.vue:347` — 목록에서 항목 펼칠 때 첨부파일 로드

---

## POST `/v1/system/qnas`

1:1 문의 등록.

### 요청

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| adv_typ_cd | string | Y | 문의 유형 코드. `A003USG`(이용방법), `A003ERR`(장애), `A003LIN`(로그인), `A003ETC`(기타) |
| title | string | Y | 제목 |
| adv_cont | string | Y | 상세 내용 (최대 1000자) |
| adv_req_acct_id | string | Y | 문의 요청 계정 ID (sessionStorage `acct_id`) |
| wrt_typ_cd | string | Y | 게시글 유형 코드. `A012QUE` 고정 |
| wri_att_file_l_new | array | N | 신규 첨부파일 목록 (파일 업로드 후 반환값 사용) |
| wri_att_file_l_new[].stor_file_id | string | N | 파일서비스에서 반환된 저장 파일 ID (`pathKey`) |
| wri_att_file_l_new[].org_file_nm | string | N | 원본 파일명 (`fileName`) |
| wri_att_file_l_new[].wrt_typ_cd | string | N | `A012QUE` 고정 |
| wri_att_file_l_new[].att_file_loc_cd | string | N | `U` 고정 |
| file_path | string | N | 첨부파일 원본 파일명 (파일 첨부 시 포함) |

첨부 가능 파일 확장자: `jpg`, `jpeg`, `png`, `pdf`. 최대 25MB.

### 응답

HTTP 200 성공 시 응답 본문 없음. 성공 후 목록 페이지(`/support/contactList`)로 이동.

### 호출 위치

- `views/support/ContactDetail.vue:391` — 1:1 문의 등록 페이지 등록 버튼 클릭 시

---

## PUT `/v1/system/qnas/{advReqWrtNo}`

1:1 문의 수정. 답변 대기(`A004I`) 상태의 문의만 수정 가능.

### 요청

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| advReqWrtNo | number | Y | 수정할 문의 게시글 번호 |

**Request Body**

POST와 동일한 필드에 추가로:

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| wri_att_file_l_new | array | N | 신규/변경 첨부파일 목록 |
| wri_att_file_l_old | array | N | 기존 첨부파일 목록 (이미지 변경 시 이전 파일 정보) |

### 응답

HTTP 200 성공 시 목록 페이지로 이동.

### 호출 위치

- `views/support/ContactDetail.vue:371` — 1:1 문의 수정 페이지 저장 버튼 클릭 시

---

## DELETE `/v1/system/qnas/{advReqWrtNo}`

1:1 문의 삭제.

### 요청

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| advReqWrtNo | number | Y | 삭제할 문의 게시글 번호 |

### 응답

HTTP 200 성공 시 응답 본문 없음.

### 호출 위치

- `views/support/ContactList.vue:370` — 목록 페이지 삭제 버튼 확인 클릭 시
