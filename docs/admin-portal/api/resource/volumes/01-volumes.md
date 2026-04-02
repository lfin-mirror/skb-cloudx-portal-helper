# 스토리지/볼륨 API

## 사용 화면
- [스토리지](../../화면/시스템%20자원/04-스토리지.md)

## 목차

- [볼륨 타입 (Storage)](#볼륨-타입-storage)
- [볼륨 리소스](#볼륨-리소스)
- [디스크 QoS](#디스크-qos)

---

## 볼륨 타입 (Storage)

### GET /v1/resource/storage

볼륨 타입 목록 조회.

**호출 위치**: `views/systemResource/storage/VolumeType.vue:200`, `store/modules/virtualPc.js:208`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| volm_typ_nm | string | N | 볼륨 타입명 검색어 |
| volm_usg_typ | string | N | 사용 타입 필터 (U034BOT, U034VPC 등, 콤마 구분) |
| not_in_vm_pool_id | string | N | 특정 풀에 미할당된 볼륨 타입만 조회 |
| sort | string | N | 정렬 기준 필드 |
| sort_type | string | N | ASC / DESC |

**응답**

배열 형태. `pageinfo` 포함.

| 필드 | 타입 | 설명 |
|---|---|---|
| volm_typ_id | string | 볼륨 타입 ID |
| volm_typ_nm | string | 볼륨 타입명 |
| volm_be_nm | string | 볼륨 백엔드명 (netapp 등) |
| volm_usg_typ | string | 사용 타입 코드 (U034BOT 등) |
| volm_usg_typ_nm | string | 사용 타입명 (겸용 등) |
| volm_qos_plcy_id | string\|null | QoS 정책 ID |
| volm_qos_plcy_nm | string | QoS 정책명 (`"-"` = 미연결) |
| tot_capa | number | 전체 용량 (GB) |
| usg_capa | number | 사용 용량 (GB) |
| usg_ratio | number | 사용률 (%) |
| bas_volm_typ_yn | string | 기본 볼륨 타입 여부 (Y/N) |
| loc_dsk_cre_yn | string | 로컬 디스크 생성 여부 (Y/N) |
| tnt_list | array | 연결된 테넌트 목록 (`tnt_id`, `tnt_nm`) |
| qosDetail | object\|null | QoS 상세 정보 (미연결 시 null) |
| reg_id | string | 등록자 ID |
| reg_conn_id | string | 등록자 접속 ID |
| reg_nm | string | 등록자명 |
| reg_ts | string | 등록 일시 |
| mod_id | string | 수정자 ID |
| mod_conn_id | string | 수정자 접속 ID |
| mod_nm | string | 수정자명 |
| mod_ts | string | 수정 일시 |

`pageinfo` 구조:

| 필드 | 타입 | 설명 |
|---|---|---|
| count | string | 전체 항목 수 |
| ispaging | string | 페이징 여부 |

`qosDetail` 구조 (연결된 QoS가 있을 때):

| 필드 | 타입 | 설명 |
|---|---|---|
| volm_qos_plcy_id | string | QoS 정책 ID |
| volm_qos_plcy_nm | string | QoS 정책명 |
| volm_typ_id | string | 볼륨 타입 ID |
| volm_typ_nm | string | 볼륨 타입명 |
| volm_qos_rule_unit_cd | string | QoS 규칙 단위 코드 |
| volm_qos_rule_unit_cd_nm | string | QoS 규칙 단위명 (IOPS 등) |
| volm_read | number | 읽기 한도 |
| volm_read_max | number | 읽기 최대 버스트 |
| volm_write | number | 쓰기 한도 |
| volm_write_max | number | 쓰기 최대 버스트 |
| reg_id / mod_id | string | 등록·수정자 ID |
| reg_ts / mod_ts | string | 등록·수정 일시 |

---

### GET /v1/resource/storage/{id}

볼륨 타입 상세 조회.

**호출 위치**: `views/systemResource/storage/VolumeTypeDetail.vue:255`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 볼륨 타입 ID |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| volm_typ_id | string | 볼륨 타입 ID |
| volm_typ_nm | string | 볼륨 타입명 |
| volm_be_nm | string | 볼륨 백엔드명 |
| volm_usg_typ | string | 사용 타입 코드 |
| volm_usg_typ_nm | string | 사용 타입명 |
| volm_qos_plcy_id | string\|null | QoS 정책 ID |
| volm_qos_plcy_nm | string\|null | QoS 정책명 |
| desc | string\|null | 설명 |
| tot_capa | number | 전체 용량 (GB) |
| usg_capa | number | 사용 용량 (GB) |
| usg_ratio | number | 사용률 (%) |
| bas_volm_typ_yn | string | 기본 볼륨 타입 여부 (Y/N) |
| qosDetail | object\|null | QoS 상세 정보 (목록 응답과 동일 구조) |
| reg_id / mod_id | string | 등록·수정자 ID |
| reg_nm / mod_nm | string\|null | 등록·수정자명 |
| reg_conn_id / mod_conn_id | string\|null | 등록·수정자 접속 ID |
| reg_ts / mod_ts | string | 등록·수정 일시 |

---

### GET /v1/resource/storage/backend/list

볼륨 백엔드 목록 조회. `storage/:id` 앞에 선언되어야 Express가 올바르게 매칭.

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| data | string[] | 백엔드명 목록 (예: `["netapp", "netapp2", "netapp3"]`) |

---

### GET /v1/resource/storage/admin

스토리지 목록 조회 (Super Admin, 테넌트 볼륨 배정용).

**호출 위치**: `components/Modals/Tenant/VolumeStorageSelect.vue:87`, `views/tenant/IndexDetail.vue:2151`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

---

### POST /v1/resource/storage

볼륨 타입 등록.

**호출 위치**: `views/systemResource/storage/VolumeTypeDetail.vue:324`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| volm_typ_nm | string | Y | 볼륨 타입명 |
| volm_be_nm | string | Y | 볼륨 백엔드명 |
| volm_usg_typ | string | Y | 사용 타입 코드 |
| volm_qos_plcy_id | string | N | QoS 정책 ID (없으면 null) |
| desc | string | N | 설명 |

---

### PUT /v1/resource/storage/{id}

볼륨 타입 수정.

**호출 위치**: `views/systemResource/storage/VolumeTypeDetail.vue:347`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 볼륨 타입 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| volm_typ_id | string | Y | 볼륨 타입 ID |
| volm_usg_typ | string | N | 사용 타입 코드 |
| volm_qos_plcy_id | string | N | QoS 정책 ID (없으면 null) |
| desc | string | N | 설명 |

---

### DELETE /v1/resource/storage/{id}

볼륨 타입 삭제.

**호출 위치**: `views/systemResource/storage/VolumeTypeDetail.vue:388`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 볼륨 타입 ID |

---

## 볼륨 리소스

### GET /v1/resource/storage/resources/count

볼륨 리소스 카운트 조회.

**호출 위치**: `views/systemResource/storage/VolumeResource.vue:240`

**응답**

배열 형태. 볼륨 타입별 할당 현황. `pageinfo` 포함.

| 필드 | 타입 | 설명 |
|---|---|---|
| volm_typ_id | string | 볼륨 타입 ID |
| volm_typ_nm | string | 볼륨 타입명 |
| volm_usg_typ | string | 사용 타입 코드 |
| volm_usg_typ_nm | string | 사용 타입명 |
| allo_vm_cnt | number | 할당된 VM 수 |
| allo_dsk_cnt | number | 할당된 디스크 수 |
| reg_id | string | 등록자 ID |
| reg_conn_id | string\|null | 등록자 접속 ID |
| reg_nm | string\|null | 등록자명 |
| reg_ts | string | 등록 일시 |
| mod_id | string | 수정자 ID |
| mod_conn_id | string\|null | 수정자 접속 ID |
| mod_nm | string\|null | 수정자명 |
| mod_ts | string | 수정 일시 |

---

### GET /v1/resource/storage/resources/list

볼륨 리소스 목록 조회.

**호출 위치**: `views/systemResource/storage/VolumeResource.vue:264`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| volm_nm | string | N | 볼륨명 검색어 |

**응답**

배열 형태. `pageinfo` 포함.

| 필드 | 타입 | 설명 |
|---|---|---|
| volm_typ_id | string | 볼륨 타입 ID |
| volm_typ_nm | string | 볼륨 타입명 |
| dsk_id | string | 디스크 ID |
| dsk_nm | string | 디스크명 |
| size | number | 용량 (GB) |
| dsk_sts_cd | string | 디스크 상태 코드 (V009USE: 사용 중, V009AVL: 사용 가능) |
| dsk_sts_cd_nm | string | 디스크 상태명 |
| path | string\|null | 마운트 경로 (미연결 시 null) |
| vm_id | string\|null | 연결된 VM ID (미연결 시 null) |
| vm_nm | string\|null | 연결된 VM명 (미연결 시 null) |
| reg_id | string | 등록자 ID |
| reg_ts | string | 등록 일시 |
| mod_id | string | 수정자 ID |
| mod_ts | string | 수정 일시 |

---

### GET /v1/resource/storage/resources/{id}

볼륨 리소스 상세 조회.

**호출 위치**: `views/systemResource/storage/VolumeResourceDetail.vue:119`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 볼륨 ID |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| volm_id | string | 볼륨 ID |
| volm_nm | string | 볼륨명 |
| volm_typ_id | string | 볼륨 타입 ID |
| volm_stat_cd | string | 볼륨 상태 코드 |
| capa | number | 용량 (GB) |
| vm_auth_id | string | 연결된 VM 인증 ID |
| reg_ts | string | 등록 일시 |

---

## 디스크 QoS

### GET /v1/resource/storage/qos

디스크 QoS 정책 목록 조회.

**호출 위치**: `views/systemResource/storage/DiskQos.vue:184`, `views/userInfo/userPersonalDiskManagement.vue:516`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| volm_qos_plcy_nm | string | N | QoS 정책명 검색어 |
| sort | string | N | 정렬 기준 필드 |
| sort_type | string | N | ASC / DESC |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| volm_qos_plcy_id | string | QoS 정책 ID |
| volm_qos_plcy_nm | string | QoS 정책명 |
| volm_typ_id | string\|null | 연결된 볼륨 타입 ID (미연결 시 null) |
| volm_typ_nm | string | 연결된 볼륨 타입명 (미연결 시 `"-"`) |
| volm_qos_rule_unit_cd | string | QoS 규칙 단위 코드 (V018IOP: IOPS, V018BAN: Bandwidth) |
| volm_qos_rule_unit_cd_nm | string | QoS 규칙 단위명 |
| volm_read | number | 읽기 한도 |
| volm_read_max | number | 읽기 최대 버스트 |
| volm_write | number | 쓰기 한도 |
| volm_write_max | number | 쓰기 최대 버스트 |
| reg_id / mod_id | string | 등록·수정자 ID |
| reg_conn_id / mod_conn_id | string | 등록·수정자 접속 ID |
| reg_nm / mod_nm | string | 등록·수정자명 |
| reg_ts / mod_ts | string | 등록·수정 일시 |

---

### GET /v1/resource/storage/qos/{id}

디스크 QoS 정책 상세 조회.

**호출 위치**: `views/systemResource/storage/DiskQosDetail.vue:124` (BASE_DISK_QOS_URI 사용)

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | QoS 정책 ID |

**응답**

목록 응답과 동일 구조.

---

### POST /v1/resource/storage/qos

디스크 QoS 정책 등록.

**호출 위치**: `views/systemResource/storage/DiskQosDetail.vue:358`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| volm_qos_plcy_nm | string | Y | QoS 정책명 |
| volm_qos_rule_unit_cd | string | Y | 규칙 단위 코드 (V018IOP / V018BAN) |
| volm_read | number | Y | 읽기 한도 |
| volm_write | number | Y | 쓰기 한도 |
| volm_read_max | number | Y | 읽기 최대 버스트 |
| volm_write_max | number | Y | 쓰기 최대 버스트 |

---

### PUT /v1/resource/storage/qos/{id}

디스크 QoS 정책 수정.

**호출 위치**: `views/systemResource/storage/DiskQosDetail.vue:379`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | QoS 정책 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| volm_qos_rule_unit_cd | string | Y | 규칙 단위 코드 |
| volm_read | number | Y | 읽기 한도 |
| volm_write | number | Y | 쓰기 한도 |
| volm_read_max | number | Y | 읽기 최대 버스트 |
| volm_write_max | number | Y | 쓰기 최대 버스트 |

---

### DELETE /v1/resource/storage/qos/{id}

디스크 QoS 정책 삭제.

**호출 위치**: `views/systemResource/storage/DiskQosDetail.vue:418`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | QoS 정책 ID |

---

## 에러 코드

| HTTP 상태 | 설명 |
|---|---|
| 200 | 정상 처리 |
| 400 | 잘못된 요청 파라미터 |
| 404 | 리소스 없음 |
| 409 | 이미 사용 중인 볼륨 타입 삭제 시도 |
| 500 | 서버 오류 |
