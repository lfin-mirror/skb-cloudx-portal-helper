# 업무 요청 API

## 사용 화면
- [Cloud PC 신청](../../../vpcinfo/01-vpc-req.md)
- [Cloud PC 반납](../../../vpcinfo/06-vpc-return.md)
- [단말 접속 관리](../../../vpcinfo/07-device-access.md)
- [Cloud PC 기간 연장](../../../vpcinfo/home/04-period-extension.md)
- [장애처리 신청](../../../support/06-trouble-request.md)

## GET `/v1/user/work/request`

업무 요청 목록 조회. `usr_req_div_cd` 값으로 요청 유형을 구분한다.

### 요청

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| req_acct_conn_id | string | N | 요청자 로그인 ID |
| req_acct_nm | string | N | 요청자 이름 |
| usr_req_div_cd | string | N | 요청 구분 코드. `J003USE`(PC 신청), `J003DAR`(단말 등록), `J003PET`(기간 연장), `J003RET`(반납), `J003ERR`(장애처리), `J003ACC`(계정 변경) |
| pgrs_sts_cd | string | N | 진행 상태 코드. `J001S`(신청), `J001C`(취소) |
| req_ch_cd | string | N | 요청 채널 코드. `J004USR`(사용자 포털) |
| start_num | number | N | 페이지네이션 시작 번호 |
| row_count | number | N | 조회 건수 |
| sort | string | N | 정렬 컬럼 |
| sort_type | string | N | 정렬 방향 (`asc`/`desc`) |

### 응답

배열. 항목당 필드:

| 필드 | 타입 | 설명 |
|------|------|------|
| usr_req_id | string | 업무 요청 ID (취소 PUT에 사용) |
| reg_ts | string | 등록 일시 |
| demd_tm | string | 신청 일시 |
| usr_req_div_cd | string | 요청 구분 코드 |
| usr_req_div_cd_nm | string | 요청 구분 코드명 |
| pgrs_sts_cd | string | 진행 상태 코드 |
| pgrs_sts_cd_nm | string | 진행 상태명 (예: 신청, 승인, 취소) |
| had_tm | string | 처리 일시 |
| had_detl | string | 관리자 메모 |
| demd_detl | string | 신청자 메모 |
| tnt_mtd_cd | string | 테넌트 방식 코드 (`V001DED`: 전용 PC, `V001POO`: 공용 PC) |
| tgt_vm_nm | string | 대상 VM 이름 |
| reg_id | string | 등록자 ID |

### 호출 위치

- `views/vPcInfo/VPcReqList.vue:208` — Cloud PC 신청 내역 조회 (`usr_req_div_cd: 'J003USE'`, 5건)
- `views/vPcInfo/DeviceAccMng.vue:200` — 단말 접속 정보 등록 요청 내역 (`usr_req_div_cd: 'J003DAR'`)
- `views/support/DisReqList.vue:222` — 장애처리 신청 내역 (`usr_req_div_cd: 'J003ERR'`, 5건)
- `views/vPcInfo/VPcReturn.vue:204` — Cloud PC 반납 내역 (`usr_req_div_cd: 'J003RET'`, 5건)
- `views/user/AccountSetting.vue:301` — 기간 변경 신청 여부 확인 (`pgrs_sts_cd: 'J001S'`, `usr_req_div_cd: 'J003ACC'`)

---

## GET `/v1/user/work/request/count`

업무 요청 건수 조회. GET `/v1/user/work/request`와 동일한 파라미터를 사용한다.

### 요청

**Query Parameters**

GET `/v1/user/work/request`의 필터 파라미터와 동일.

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| list_count | number | 조건에 해당하는 전체 건수 |

### 호출 위치

- `views/vPcInfo/DeviceAccMng.vue:191` — 단말 등록 요청 목록 페이지네이션을 위한 전체 건수 조회

---

## POST `/v1/user/work/request`

업무 요청 생성. `usr_req_div_cd` 값에 따라 요청 유형이 달라진다.

### 공통 필드

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usr_req_div_cd | string | Y | 요청 구분 코드 (아래 유형별 참조) |
| pgrs_sts_cd | string | Y | 진행 상태 코드. 항상 `J001S` (신청) |
| req_ch_cd | string | Y | 요청 채널. 항상 `J004USR` (사용자 포털) |
| req_acct_id | string | Y | 요청 계정 ID |
| tgt_acct_id | string | Y | 대상 계정 ID |
| demd_detl | string | N | 신청자 메모 (최대 1000자) |

---

### POST 유형 1: Cloud PC 신청 (`J003USE`)

관리자 승인 방식으로 Cloud PC를 신청한다.

**추가 필드**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usr_req_div_cd | string | Y | `J003USE` |
| tnt_grp_id | string | Y | 테넌트 URL ID |
| usr_grp_id | string | Y | 사용자 그룹 ID |
| tnt_mtd_cd | string | Y | PC 유형. `V001DED`(개인전용 PC), `V001POO`(공용 PC) |

### 호출 위치

- `views/vPcInfo/VPcReq.vue:336` — Cloud PC 신청 팝업 (관리자 승인 할당 선택 시)

---

### POST 유형 2: 단말 접속 정보 등록 요청 (`J003DAR`)

사용자 단말 식별 정보를 등록 요청한다.

**추가 필드**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usr_req_div_cd | string | Y | `J003DAR` |
| clnt_dvc_type | string | Y | 클라이언트 종류. `Windows`, `Linux`, `Thin Client`, `MacOS`, `iOS`, `Android` |
| dvc_nm | string | Y | 단말 이름 |
| dvc_id | string | N | 단말 ID (영숫자, 하이픈만 허용. dvc_id/mac_addr/ip_addr 중 하나 이상 필수) |
| mac_addr | string | N | MAC 주소 (형식: `XX-XX-XX-XX-XX-XX`) |
| ip_addr | string | N | IP 주소 (IPv4) |

### 호출 위치

- `views/vPcInfo/DeviceAccReq.vue:546` — 단말 접속 정보 등록 요청 팝업

---

### POST 유형 3: Cloud PC 기간 연장 (`J003PET`)

사용 중인 Cloud PC의 유효 기간 연장을 신청한다.

**추가 필드**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usr_req_div_cd | string | Y | `J003PET` |
| tgt_vm_id | string | Y | 대상 VM ID |
| now_vlid_stt_dt | string | Y | 현재 유효 시작일 (yyyyMMdd) |
| now_vlid_end_dt | string | Y | 현재 유효 종료일 (yyyyMMdd) |
| req_vlid_end_dt | string | Y | 연장 요청 종료일 (yyyyMMdd) |

### 호출 위치

- `views/home/components/VPcPeriodExt.vue:98` — 홈 화면 Cloud PC 기간 연장 팝업

---

### POST 유형 4: Cloud PC 반납 (`J003RET`)

Cloud PC 사용 권한을 반납한다. `VPcReturnReq.vue`에서 POST를 수행하며 필드는 공통 필드와 동일하다.

**추가 필드**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usr_req_div_cd | string | Y | `J003RET` |
| tgt_vm_id | string | Y | 반납할 VM ID |
| tnt_mtd_cd | string | Y | PC 유형 코드 |

### 호출 위치

- `views/vPcInfo/VPcReturnReq.vue` — Cloud PC 반납 팝업

---

### POST 유형 5: 장애처리 신청 (`J003ERR`)

Cloud PC 장애 처리를 관리자에게 신청한다.

**추가 필드**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usr_req_div_cd | string | Y | `J003ERR` |
| tgt_vm_id | string | Y | 대상 VM ID |
| now_flavor_id | string | N | 현재 flavor ID |
| tnt_grp_id | string | Y | 테넌트 URL ID |
| tnt_mtd_cd | string | Y | PC 유형 코드 |
| usr_grp_id | string | Y | 사용자 그룹 ID |
| usr_req_flt_typ_l | array | N | 장애 태그 목록. 항목: `{ flt_typ_cd: string }`. 코드 예: `A015PC1`(뷰어 연결 장애), `A015PC2`(부팅 장애), `A015PG1`(윈도우 오류) 등 |

### 호출 위치

- `views/support/DisReqReg.vue:367` — 장애처리 신청 페이지

---

## PUT `/v1/user/work/request/{usrReqId}`

업무 요청 취소.

### 요청

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usrReqId | string | Y | 취소할 업무 요청 ID (`usr_req_id`) |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| pgrs_sts_cd | string | Y | `J001C` (취소) 고정 |
| had_acct_id | string | N | 처리자 계정 ID |
| had_detl | string | N | 처리 상세 내용 |
| had_tm | string | N | 처리 일시 |

### 응답

HTTP 200 성공 시 응답 본문 없음.

### 호출 위치

- `views/vPcInfo/VPcReqList.vue:256` — Cloud PC 신청 취소
- `views/vPcInfo/DeviceAccMng.vue:238` — 단말 등록 요청 취소
- `views/support/DisReqList.vue:273` — 장애처리 신청 취소
- `views/vPcInfo/VPcReturn.vue:243` — Cloud PC 반납 취소
