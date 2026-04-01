# 공지사항 API

## GET `/v1/system/notices`

공지사항 목록 조회.

### 요청

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| noti_tgt_grp_id | string | N | 공지 대상 그룹 ID (sessionStorage `serv_grp_id`) |
| sort | string | N | 정렬 컬럼 (`reg_ts`) |
| start_num | number | N | 페이지네이션 시작 번호 |
| row_count | number | N | 조회 건수 (기본 10) |
| search_type | string | N | 검색 유형. `T`(제목), `C`(내용). 미입력 시 전체 검색 |
| search_word | string | N | 검색어 |
| order | string | N | 정렬 방향 (`asc`/`desc`) |

### 응답

배열. 항목당 필드:

| 필드 | 타입 | 설명 |
|------|------|------|
| noti_wrt_no | number | 공지사항 게시글 번호 (상세 조회 및 이전/다음 탐색에 사용) |
| title | string | 공지 제목 (HTML 이스케이프 처리됨) |
| reg_conn_id | string | 작성자 로그인 ID |
| reg_ts | string | 등록 일시 |

### 호출 위치

- `views/support/NoticeList.vue:340` — 공지사항 목록 페이지, 페이지 전환 시 조회
- `views/home/components/HomeNotice.vue:67` — 홈 화면 공지 롤링 표시용 목록 (`row_count: 5`)
- `views/home/components/HomeNotice.vue:63` — 홈 화면에서 로컬스토리지 저장용 전체 목록 조회

---

## GET `/v1/system/notices/count`

공지사항 전체 건수 조회.

### 요청

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| noti_tgt_grp_id | string | N | 공지 대상 그룹 ID |
| search_type | string | N | 검색 유형 (`T`/`C`) |
| search_word | string | N | 검색어 |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| list_count | number | 조건에 해당하는 전체 공지 건수 |

### 호출 위치

- `views/support/NoticeList.vue:377` — 목록 조회 전 전체 건수를 먼저 가져와 rowNum 계산에 사용

---

## GET `/v1/system/notices/{notiWrtNo}`

공지사항 상세 조회.

### 요청

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| notiWrtNo | number | Y | 공지사항 게시글 번호 |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| noti_wrt_no | number | 게시글 번호 |
| title | string | 제목 (HTML 이스케이프 처리됨) |
| cont | string | 본문 내용 (HTML 이스케이프 처리됨) |
| acct_nm | string | 작성자 이름 (HTML 이스케이프 처리됨) |
| reg_ts | string | 등록 일시 |
| wri_att_file_l | array | 첨부파일 목록 |
| wri_att_file_l[].att_file_loc_cd | string | 파일 위치 구분 코드 (`U`: 상단 이미지) |
| wri_att_file_l[].path | string | 파일 경로 |

### 호출 위치

- `views/support/NoticeDetail.vue:124` — 공지사항 상세 페이지 진입 시 (`$route.params.no` 사용)
