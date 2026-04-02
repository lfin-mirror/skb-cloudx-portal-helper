# FAQ API

## 사용 화면
- [자주 묻는 질문 (FAQ)](../../../support/03-faq.md)

## GET `/v1/system/faqs`

FAQ 목록 조회.

### 요청

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| sort | string | N | 정렬 컬럼 (`reg_ts`) |
| start_num | number | N | 페이지네이션 시작 번호 |
| row_count | number | N | 조회 건수 (기본 10) |
| faq_typ_cd | string | N | FAQ 유형 코드. `A006USG`(이용 방법), `A006ERR`(장애), `A006LIN`(로그인), `A006ETC`(기타). 미입력 시 전체 |
| search_type | string | N | 검색 유형. `T`(제목), `C`(내용). 미입력 시 전체 |
| search_word | string | N | 검색어 |

### 응답

배열. 항목당 필드:

| 필드 | 타입 | 설명 |
|------|------|------|
| faq_wrt_no | number | FAQ 게시글 번호 (상세 조회에 사용) |
| title | string | 질문 제목 |
| faq_typ_cd_nm | string | FAQ 유형명 |
| asw_cont | string | 답변 내용 (HTML 이스케이프 처리됨) |

### 호출 위치

- `views/support/FaqPage.vue:311` — FAQ 목록 페이지 진입 및 탭/검색 변경 시

---

## GET `/v1/system/faqs/count`

FAQ 전체 건수 조회.

### 요청

**Query Parameters**

GET `/v1/system/faqs`의 필터 파라미터와 동일.

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| list_count | number | 조건에 해당하는 전체 FAQ 건수 |

### 호출 위치

- `views/support/FaqPage.vue:301` — 목록 조회와 동시에 전체 건수 조회 (페이지네이션용)

---

## GET `/v1/system/faqs/{faqWrtNo}`

FAQ 상세 조회. 목록에서 항목을 펼칠 때 첨부 이미지 파일 정보를 가져온다.

### 요청

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| faqWrtNo | number | Y | FAQ 게시글 번호 |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| faq_wrt_no | number | 게시글 번호 |
| title | string | 질문 제목 |
| asw_cont | string | 답변 내용 |
| wri_att_file_l | array | 첨부파일 목록 |
| wri_att_file_l[].stor_file_id | string | 저장 파일 ID |
| wri_att_file_l[].org_file_nm | string | 원본 파일명 |

### 호출 위치

- `views/support/FaqPage.vue:262` — FAQ 목록에서 항목 펼칠 때 첨부 이미지 로드
