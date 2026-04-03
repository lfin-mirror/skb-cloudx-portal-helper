# VM 인증 (VPC Resources) API

## 사용 화면
- [마이그레이션](../../화면/시스템%20자원/02-호스트-마이그레이션-HA.md)
- [가상 PC](../../화면/가상%20PC/01-가상PC.md)

## 목차

- [VM 인증 목록](#vm-인증-목록)

---

## VM 인증 목록

### GET /v1/resource/vpcs/resources

VM 인증(사용자-VM 매핑) 목록 조회. 마이그레이션 대상 VM 선택, 가상 PC 관리 등 다수 화면에서 공용으로 호출.

**호출 위치**: `views/systemResource/MigrationCreate.vue:301`, `store/modules/vpcs.js`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| tnt_id | string | N | 테넌트 ID 필터 |
| vm_pool_id | string | N | 풀 ID 필터 |
| vm_grp_id | string | N | 그룹 ID 필터 |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| vm_auth_id | string | VM 인증 ID |
| acct_id | string | 계정 ID |
| usr_grp_id | string | 사용자 그룹 ID |
| usr_grp_nm | string | 사용자 그룹명 |
| vm_id | string\|null | VM ID |
| vm_nm | string\|null | VM명 |
| vm_grp_nm | string\|null | VM 그룹명 |
| vm_ip | string\|null | VM IP |
| vm_als | string\|null | VM 별칭 |
| vm_descp | string\|null | VM 설명 |
| vm_on_ctrl_tm | string | VM 온 제어 일시 |
| rstr_sts_cd | string | 제한 상태 코드 |
| rstr_sts_cd_nm | string | 제한 상태명 |
| vm_allo_sts_cd | string | VM 할당 상태 코드 |
| vm_allo_sts_cd_nm | string | VM 할당 상태명 |
| usr_vm_conn_sts_cd | string | 사용자 VM 접속 상태 코드 |
| usr_vm_conn_sts_cd_nm | string | 사용자 VM 접속 상태명 |
| vm_power_sts_cd | string | VM 전원 상태 코드 |
| vm_power_sts_cd_nm | string | VM 전원 상태명 |
| vcpu_cnt | string | vCPU 수 |
| vmm_capa | string | 메모리 용량 |
| vhd_capa | string | 디스크 용량 |
| tnt_id | string | 테넌트 ID |
| tnt_nm | string | 테넌트명 |
| tnt_mtd_cd | string | 테넌트 방법 코드 |
| tnt_mtd_cd_nm | string | 테넌트 방법명 |
| vm_pool_id | string | 풀 ID |
| vm_pool_nm | string | 풀명 |
| acct_conn_id | string | 계정 접속 ID |
| acct_nm | string | 계정명 |
| reg_conn_id | string | 등록자 계정 |
| mod_conn_id | string | 수정자 계정 |
| reg_ts | string | 등록 일시 |
| mod_ts | string | 수정 일시 |
| assgn_yn | string | 할당 여부 |

---

## 에러 코드

| HTTP 상태 | 설명 |
|---|---|
| 200 | 정상 처리 |
| 400 | 잘못된 요청 파라미터 |
| 404 | 리소스 없음 |
| 500 | 서버 오류 |
