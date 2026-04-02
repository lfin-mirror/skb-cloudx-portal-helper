# 업무 요청 API

## 사용 화면
- [업무요청/단말접속/사용자모니터링](../../화면/사용자%20정보/03-업무요청-단말접속-사용자모니터링.md)
- [업무 처리 요청](../../화면/사용자%20지원/02-업무%20처리%20요청.md)

리소스 경로 기준: `/v1/user/work/request`

---

## 업무 요청 목록 조회

```
GET /v1/user/work/request
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| req_ch_cd | string | N | 요청 채널 코드 |
| usr_req_div_cd | string | N | 업무 요청 구분 코드 |
| keyword | string | N | 검색어 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | 업무 요청 목록 |
| data[].usr_req_id | string | 업무 요청 ID |
| data[].usr_req_div_cd | string | 업무 요청 구분 코드 |
| data[].usr_req_div_cd_nm | string | 업무 요청 구분명 |
| data[].pgrs_sts_cd | string | 진행 상태 코드 |
| data[].pgrs_sts_cd_nm | string | 진행 상태명 |
| data[].req_ch_cd | string | 요청 채널 코드 |
| data[].req_ch_cd_nm | string | 요청 채널명 |
| data[].req_acct_conn_id | string | 요청자 로그인 ID (마스킹) |
| data[].req_acct_nm | string | 요청자명 (마스킹) |
| data[].tgt_acct_conn_id | string | 대상 계정 로그인 ID (마스킹) |
| data[].tgt_acct_nm | string | 대상 계정명 (마스킹) |
| data[].tgt_vm_auth_id | string | 대상 VM 인증 ID (할당/회수/정책변경) |
| data[].tgt_vm_nm | string | 대상 VM명 (정책변경) |
| data[].had_detl | string | 처리 상세 (할당: assigned, 회수: terminated) |
| data[].had_acct_conn_id | string | 처리자 로그인 ID (마스킹) |
| data[].had_acct_nm | string | 처리자명 (마스킹) |
| data[].tnt_mtd_cd | string | 테넌트 운영 방식 코드 |
| data[].tnt_nm | string | 테넌트명 |
| data[].mac_addr | string | MAC 주소 (단말등록) |
| data[].dvc_id | string | 디바이스 ID (단말등록) |
| data[].clnt_dvc_type | string | 클라이언트 디바이스 유형 (단말등록) |
| data[].dvc_nm | string | 디바이스명 (단말등록) |
| data[].ip_addr | string | IP 주소 (단말등록) |
| data[].demd_tm | string | 요청 일시 |
| data[].had_tm | string | 처리 일시 |
| data[].reg_ts | string | 등록 일시 |
| data[].mod_ts | string | 수정 일시 |

**에러 코드**

| 코드 | 설명 |
|------|------|
| 400 | 잘못된 요청 파라미터 |
| 403 | 권한 없음 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/JobRequest.vue` | 251 |
| `views/userSupport/JobWorkRequest.vue` | 195, 204 |
| `views/user/subComponent/vliddateEdit.vue` | 77 |

---

## 업무 요청 상세 조회

```
GET /v1/user/work/request/{usr_req_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usr_req_id | string | Y | 업무 요청 ID |

**응답**

목록 응답과 동일 구조 (단건). 추가 필드:

| 필드 | 타입 | 설명 |
|------|------|------|
| usr_req_id | string | 업무 요청 ID |
| usr_req_div_cd | string | 업무 요청 구분 코드 |
| usr_req_div_cd_nm | string | 업무 요청 구분명 |
| pgrs_sts_cd | string | 진행 상태 코드 |
| req_ch_cd | string | 요청 채널 코드 |
| req_ch_cd_nm | string | 요청 채널명 |
| req_acct_id | string | 요청자 계정 ID |
| req_acct_conn_id | string | 요청자 로그인 ID |
| req_acct_nm | string | 요청자명 |
| tgt_acct_id | string | 대상 계정 ID |
| tgt_acct_conn_id | string | 대상 계정 로그인 ID |
| tgt_acct_nm | string | 대상 계정명 |
| tgt_usr_grp_id | string | 대상 사용자 그룹 ID |
| tgt_usr_grp_nm | string | 대상 사용자 그룹명 |
| tgt_vm_auth_id | string | 대상 VM 인증 ID |
| tgt_vm_id | string | 대상 VM ID |
| tgt_vm_nm | string | 대상 VM명 |
| tgt_vm_als | string | 대상 VM 별칭 |
| had_acct_id | string | 처리자 계정 ID |
| had_acct_conn_id | string | 처리자 로그인 ID |
| had_acct_nm | string | 처리자명 |
| had_detl | string | 처리 상세 (assigned/terminated/initialed) |
| had_tm | string | 처리 일시 |
| demd_tm | string | 요청 일시 |
| demd_detl | string | 요청 상세 |
| demd_secu_plcy_id | string | 요청 보안 정책 ID |
| now_secu_plcy_id | string | 현재 보안 정책 ID |
| now_flavor_id | string | 현재 Flavor ID |
| now_vlid_stt_dt | string | 현재 유효 시작일 |
| now_vlid_end_dt | string | 현재 유효 종료일 |
| req_vlid_stt_dt | string | 요청 유효 시작일 |
| req_vlid_end_dt | string | 요청 유효 종료일 |
| tnt_mtd_cd | string | 테넌트 운영 방식 코드 |
| tnt_nm | string | 테넌트명 |
| grp_typ_cd | string | 그룹 유형 코드 |
| usr_req_flt_typ_l | array | Flavor 유형 목록 |
| vcpu_now_cnt | string | 현재 vCPU 수 |
| vcpu_req_cnt | string | 요청 vCPU 수 |
| vcpu_apply_cnt | string | 적용 vCPU 수 |
| vmm_now_capa | string | 현재 메모리 (MB) |
| vmm_req_capa | string | 요청 메모리 |
| vmm_apply_capa | string | 적용 메모리 |
| vhd_now_capa | string | 현재 디스크 용량 |
| vhdreq_capa | string | 요청 디스크 용량 |
| vhd_apply_capa | string | 적용 디스크 용량 |
| apply_flavor_id | string | 적용 Flavor ID |
| mac_addr | string | MAC 주소 (단말등록) |
| dvc_id | string | 디바이스 ID (단말등록) |
| clnt_dvc_type | string | 클라이언트 디바이스 유형 (단말등록) |
| dvc_nm | string | 디바이스명 (단말등록) |
| ip_addr | string | IP 주소 (단말등록) |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/JobRequestDetail.vue` | 612 |
| `views/userSupport/JobWorkRequestDetail.vue` | 715 |

---

## 업무 요청 생성

```
POST /v1/user/work/request
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_id | string | Y | 요청 계정 ID |
| req_ch_cd | string | Y | 요청 채널 코드 |
| usr_req_div_cd | string | Y | 업무 요청 구분 코드 |
| req_ctn | string | N | 요청 내용 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/user/subComponent/vliddateEdit.vue` | 110 |

---

## 업무 요청 수정

```
PUT /v1/user/work/request/{usr_req_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usr_req_id | string | Y | 업무 요청 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| prc_sts_cd | string | Y | 처리 상태 코드 |
| prc_ctn | string | N | 처리 내용 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/JobRequestDetail.vue` | 1056 |
| `views/userSupport/JobWorkRequestDetail.vue` | 822 |

---

## 업무 요청 삭제

```
DELETE /v1/user/work/request/{usr_req_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usr_req_id | string | Y | 업무 요청 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/user/subComponent/vliddateEdit.vue` | 151 |
