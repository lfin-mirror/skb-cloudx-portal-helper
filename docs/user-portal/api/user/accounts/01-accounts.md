# 계정 API

## GET `/v1/user/accounts/{acctId}`

계정 상세 정보 조회.

### 요청

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acctId | string | Y | 계정 ID (sessionStorage `acct_id`) |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| acct_conn_id | string | 로그인 ID |
| acct_nm | string | 계정명 |
| acct_vlid_stt_dt | string | 계정 유효 시작일 (yyyyMMdd) |
| acct_vlid_end_dt | string | 계정 유효 종료일 (yyyyMMdd) |
| usr_grp_nm | string | 사용자 그룹명 |
| serv_grp_id | string | 서비스 그룹 ID |
| ad_itlk_acct_yn | string | AD 연동 계정 여부 (`Y`/`N`) |
| tnt_url_id | string | 테넌트 URL ID |
| email | string | 이메일 주소 |
| mob_no | string | 휴대폰 번호 |
| ognz_nm | string | 조직명 |
| blng_dept_nm | string | 소속 부서명 |
| acct_descp | string | 계정 설명 |

### 호출 위치

- `views/layout/components/HeaderBar.vue:453` — 헤더 마운트 시 사용자 정보 로드, sessionStorage `user_info` 저장
- `views/layout/components/HeaderBarMobile.vue:354` — 모바일 헤더 마운트 시 동일 처리
- `views/user/AccountSetting.vue:201` — 사용자 정보 관리 페이지 진입 시 조회

---

## GET `/v1/user/accounts/usg/history`

이용 내역 목록 조회. 포털 접속, 제어, 연결, 신청/반납, 초기화, 장애처리 이력을 탭 구분으로 조회한다.

### 요청

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_id | string | Y | 계정 ID |
| usg_typ_cd | string | N | 이용 유형 코드. 비어있으면 전체 조회. `Z006A1`(포털 접속), `Z006B1`(제어), `Z006C1`(연결), `Z006D1`(신청/반납), `Z006E1`(초기화), `Z006G1`(장애처리) |
| start_num | number | N | 페이지네이션 시작 번호 (0부터, 더보기 방식으로 50씩 증가) |
| row_count | number | N | 조회 건수 (기본값 50) |
| sort | string | N | 정렬 컬럼 (`act_tm` 또는 `reg_ts`) |
| sort_type | string | N | 정렬 방향 (`asc`/`desc`) |

### 응답

배열. 항목당 필드:

| 필드 | 타입 | 설명 |
|------|------|------|
| usg_typ_cd | string | 이용 유형 코드 |
| act_tm | string | 행동 발생 시각 (`yyyy-MM-dd HH:mm:ss`) |
| act_cd_nm | string | 행동 코드명 (예: 접속, 종료) |
| ptal_typ_cd_nm | string | 포털 유형명 |
| conn_ip | string | 접속 IP 주소 |
| vm_nm | string | VM 이름 |
| tnt_mtd_cd_nm | string | 테넌트 방식 코드명 (예: 전용 PC, 공용 PC) |

### 호출 위치

- `views/vPcInfo/UsageHistory.vue:138` — 이용 내역 페이지, 탭 전환 및 더보기 버튼 클릭 시 호출
- `views/vPcInfo/SelfFailover.vue:170` — Cloud PC 초기화 페이지에서 초기화 내역 5건 조회 (`usg_typ_cd: 'Z006E1'`, `row_count: 5`)
