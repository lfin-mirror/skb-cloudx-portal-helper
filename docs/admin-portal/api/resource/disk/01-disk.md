# 영구 디스크 API

## 사용 화면
- [가상 디스크](../../화면/가상%20디스크/01-가상%20디스크.md)

## 목차

- [로컬 디스크 (사용자 영구 디스크)](#로컬-디스크-사용자-영구-디스크)

---

## 로컬 디스크 (사용자 영구 디스크)

### GET /v1/resource/disk/local/{acctId}

사용자 영구 디스크 목록 조회.

**호출 위치**: `store/modules/virtualPcGroup.js:303`, `views/virtualPc/components/BackupManagement.vue:180`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| acctId | string | Y | 계정 ID |

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| acct_id | string | 계정 ID |
| acct_nm | string | 계정명 |
| acct_conn_id | string | 계정 연결 ID |
| usr_dsk_cnt | number | 보유 디스크 수 |
| usr_dsk_rstt_cnt | number | 디스크 복원 횟수 |
| usr_dsk_max_size | number | 디스크 최대 허용 용량 (GB) |
| dsk_size | number | 현재 사용 용량 합계 (GB) |
| usr_disk | array | 사용자 디스크 목록 |
| usr_disk[].dsk_id | string | 디스크 ID |
| usr_disk[].dsk_nm | string | 디스크명 |
| usr_disk[].cre_volm_id | string | 생성 볼륨 ID |
| usr_disk[].dsk_typ_cd | string | 디스크 유형 코드 |
| usr_disk[].dsk_typ_cd_nm | string | 디스크 유형명 |
| usr_disk[].dsk_sts_cd | string | 디스크 상태 코드 |
| usr_disk[].dsk_sts_cd_nm | string | 디스크 상태명 |
| usr_disk[].dsk_conn_yn | string | VM 연결 여부 (Y/N) |
| usr_disk[].root_volm_yn | string | 루트 볼륨 여부 (Y/N) |
| usr_disk[].size | number | 용량 (GB) |
| usr_disk[].path | string | 경로 |
| usr_disk[].vm_id | string | 연결된 VM ID |
| usr_disk[].vm_nm | string | 연결된 VM명 |
| usr_disk[].del_yn | string | 삭제 여부 (Y/N) |
| usr_disk[].acct_id | string | 계정 ID |
| usr_disk[].vm_auth_id | string | 연결된 VM 인증 ID |
| usr_disk[].volm_typ_nm | string | 볼륨 유형명 |
| usr_disk[].tnt_mtd_cd | string | 테넌트 마운트 코드 |
| usr_disk[].dsk_visibility_yn | string | 디스크 노출 여부 (Y/N) |
| usr_disk[].volm_qos_plcy_id | string | 볼륨 QoS 정책 ID |
| usr_vm | array | 사용자 VM 목록 |

---

### GET /v1/resource/disk/local/add-list

영구 디스크 추가 목록 조회.

**호출 위치**: `views/virtualDisk/mixins/index.js:299`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| acct_id | string | N | 계정 ID 필터 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| acct_conn_id | string | 계정 연결 ID |
| acct_id | string | 계정 ID |
| acct_nm | string | 계정명 |
| tnt_id | string | 테넌트 ID |
| tnt_nm | string | 테넌트명 |
| cert_plcy_id | string | 인증 정책 ID |
| usr_grp_nm | string | 사용자 그룹명 |
| vm_auth_id | string | VM 인증 ID |
| dsk_id | string | 디스크 ID |
| dsk_nm | string | 디스크명 |
| size | string | 용량 (GB) |
| dsk_typ_cd | string | 디스크 유형 코드 |
| dsk_typ_cd_nm | string | 디스크 유형명 |
| dsk_sts_cd | string | 디스크 상태 코드 |
| dsk_sts_cd_nm | string | 디스크 상태명 |
| vm_nm | string | 연결된 VM명 |
| reg_conn_id | string | 등록자 계정 |
| reg_id | string | 등록자 ID |
| mod_conn_id | string | 수정자 계정 |
| mod_id | string | 수정자 ID |
| reg_nm | string | 등록자명 |
| reg_ts | string | 등록 일시 |
| mod_ts | string | 수정 일시 |
| vm_state | string | VM 상태 |
| vm_allo_sts_cd | string | VM 할당 상태 코드 |
| vm_allo_sts_cd_nm | string | VM 할당 상태명 |
| vm_power_sts_cd | string | VM 전원 상태 코드 |
| vm_power_sts_cd_nm | string | VM 전원 상태명 |
| usr_vm_conn_sts_cd | string | 사용자 VM 연결 상태 코드 |
| usr_vm_conn_sts_cd_nm | string | 사용자 VM 연결 상태명 |
| adm_vm_conn_sts_cd | string | 관리자 VM 연결 상태 코드 |
| adm_vm_conn_sts_cd_nm | string | 관리자 VM 연결 상태명 |

---

### GET /v1/resource/disk/local (목록)

영구 디스크 전체 목록 조회.

**호출 위치**: `views/virtualDisk/VirtualDiskManage.vue:183` (url 객체 내 참조)

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| acct_id | string | N | 계정 ID 필터 |

---

### GET /v1/resource/disk/local/{diskId} (상세)

영구 디스크 상세 조회.

**호출 위치**: `views/virtualDisk/VirtualDiskManage.vue:186` (url 객체 내 참조)

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| diskId | string | Y | 디스크 ID |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| dsk_id | string | 디스크 ID |
| dsk_nm | string | 디스크명 |
| cre_volm_id | string | 생성 볼륨 ID |
| dsk_typ_cd | string | 디스크 유형 코드 |
| dsk_typ_cd_nm | string | 디스크 유형명 |
| dsk_sts_cd | string | 디스크 상태 코드 |
| dsk_sts_cd_nm | string | 디스크 상태명 |
| dsk_conn_yn | string | VM 연결 여부 (Y/N) |
| root_volm_yn | string | 루트 볼륨 여부 (Y/N) |
| size | number | 용량 (GB) |
| path | string | 경로 |
| vm_id | string | 연결된 VM ID |
| vm_nm | string | 연결된 VM명 |
| del_yn | string | 삭제 여부 (Y/N) |
| acct_id | string | 계정 ID |
| vm_auth_id | string | 연결된 VM 인증 ID |
| volm_typ_nm | string | 볼륨 유형명 |
| tnt_mtd_cd | string | 테넌트 마운트 코드 |
| dsk_visibility_yn | string | 디스크 노출 여부 (Y/N) |
| volm_qos_plcy_id | string | 볼륨 QoS 정책 ID |

---

### DELETE /v1/resource/disk/local

영구 디스크 삭제.

**호출 위치**: `views/virtualDisk/mixins/index.js:339`

**Request Body (data)**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| disk_ids | string[] | Y | 삭제할 디스크 ID 목록 |

---

### POST /v1/resource/disk/local/add-detach

영구 디스크 분리.

**호출 위치**: `views/virtualDisk/mixins/index.js:382` (uri 참조)

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| disk_id | string | Y | 디스크 ID |
| vm_auth_id | string | Y | 현재 연결된 VM 인증 ID |

---

### POST /v1/resource/disk/local/add-delete

영구 디스크 추가 삭제.

**호출 위치**: `views/virtualDisk/mixins/index.js:411` (uri 참조)

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| disk_ids | string[] | Y | 삭제할 디스크 ID 목록 |

---

## 에러 코드

| HTTP 상태 | 설명 |
|---|---|
| 200 | 정상 처리 |
| 400 | 잘못된 요청 파라미터 |
| 404 | 디스크 없음 |
| 409 | VM에 연결된 디스크 삭제 시도 등 상태 충돌 |
| 500 | 서버 오류 |
