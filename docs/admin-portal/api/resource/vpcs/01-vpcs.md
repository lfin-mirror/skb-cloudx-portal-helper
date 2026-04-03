# VPC (가상 PC) API

## 사용 화면
- [가상 PC 그룹](../../화면/가상%20PC/01-가상%20PC%20그룹.md)
- [가상 PC](../../화면/가상%20PC/02-가상%20PC.md)
- [가상 PC 예약](../../화면/가상%20PC/04-가상%20PC%20예약.md)
- [포트/공용PC대기/자동할당/IP관리](../../화면/가상%20PC/05-포트-공용PC대기-자동할당-IP관리.md)
- [가상 PC 원격 제어](../../화면/사용자%20지원/01-가상%20PC%20원격%20제어.md)
- [업무 처리 요청](../../화면/사용자%20지원/02-업무%20처리%20요청.md)

## 목차

- [VPC 그룹](#vpc-그룹)
- [VPC 풀](#vpc-풀)
- [VPC 리소스 (VM)](#vpc-리소스-vm)
- [VPC 번들 할당](#vpc-번들-할당)
- [VPC 자동 배정](#vpc-자동-배정)
- [VNC 콘솔](#vnc-콘솔)
- [포트 관리](#포트-관리)
- [공용 PC 대기 자원](#공용-pc-대기-자원)
- [마이그레이션](#마이그레이션)

---

## VPC 그룹

### GET /v1/resource/vpcs/group

VPC 그룹 목록 조회.

**호출 위치**: `store/modules/virtualPc.js:124`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| vm_grp_nm | string | N | 그룹명 검색어 |
| tnt_id | string | N | 테넌트 ID 필터 |

**응답**

래퍼: `{ data: [...], pageinfo: { count, ispaging }, errCode, errMsg }`

| 필드 | 타입 | 설명 |
|---|---|---|
| data[] | array | 그룹 목록 |
| pageinfo | object | 페이지 정보 |
| pageinfo.count | number | 전체 항목 수 |
| pageinfo.ispaging | boolean | 페이징 여부 |
| errCode | string\|null | 에러 코드 |
| errMsg | string\|null | 에러 메시지 |
| vm_grp_id | string | 그룹 ID |
| vm_grp_nm | string | 그룹명 |
| tnt_id | string | 테넌트 ID |
| tnt_nm | string | 테넌트명 |
| secu_plcy_id | string | 보안 정책 ID |
| secu_plcy_nm | string | 보안 정책명 |
| bkup_snap_plcy_id | string | 백업/스냅샷 정책 ID |
| bkup_snap_plcy_nm | string | 백업/스냅샷 정책명 |
| temp_id | string | 템플릿 ID |
| temp_nm | string | 템플릿명 |
| gdn_img_cre_yn | string | 골든 이미지 생성 여부 |
| pool_usg_cnt | number | 풀 사용 수량 |
| tot_pool_max_vm_cnt | number | 풀 최대 VM 수량 합계 |
| network_cnt | number | 그룹 네트워크 수 |
| reg_id | string | 등록자 ID |
| reg_conn_id | string | 등록자 접속 ID |
| reg_nm | string | 등록자명 |
| reg_ts | string | 등록 일시 |
| mod_id | string | 수정자 ID |
| mod_conn_id | string | 수정자 접속 ID |
| mod_nm | string | 수정자명 |
| mod_ts | string | 수정 일시 |

---

### GET /v1/resource/vpcs/group/{id}

VPC 그룹 상세 조회.

**호출 위치**: `store/modules/virtualPc.js:132`, `store/modules/virtualPc.js:144`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 그룹 ID |

**응답**

래퍼: `{ data: {...}, errCode, errMsg }`

그룹 목록 응답 필드 전체 + 아래 추가 필드.

| 필드 | 타입 | 설명 |
|---|---|---|
| data | object | 그룹 상세 객체 |
| errCode | string\|null | 에러 코드 |
| errMsg | string\|null | 에러 메시지 |
| networks | array | 그룹 매핑 네트워크 목록 |
| networks[].nw_id | string | 네트워크 ID |
| networks[].nw_nm | string | 네트워크명 |
| networks[].nw_typ_cd | string | 네트워크 유형 코드 |
| networks[].nw_typ_cd_nm | string | 네트워크 유형명 |
| zones | array | 테넌트 할당 ZONE 목록 |
| zones[].zone_nm | string | ZONE명 |
| subnets | array | 사용 가능 서브넷 목록 |
| subnets[].sbn_id | string | 서브넷 ID |
| subnets[].sbn_nm | string | 서브넷명 |
| subnets[].nw_nm | string | 네트워크명 |
| subnets[].cidr | string | CIDR |
| subnets[].nw_qos_plcy_nm | string | 네트워크 QoS 정책명 |

---

### POST /v1/resource/vpcs/group

VPC 그룹 등록.

**호출 위치**: `store/modules/virtualPc.js:238`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_grp_nm | string | Y | 그룹명 |
| tnt_id | string | Y | 테넌트 ID |
| temp_id | string | Y | 템플릿 ID |
| secu_plcy_id | string | N | 보안 정책 ID |
| bkup_snap_plcy_id | string | N | 백업/스냅샷 정책 ID |

---

### PUT /v1/resource/vpcs/group/{vmGrpId}

VPC 그룹 수정.

**호출 위치**: `store/modules/virtualPc.js:156`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmGrpId | string | Y | 그룹 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_grp_nm | string | N | 그룹명 |
| secu_plcy_id | string | N | 보안 정책 ID |
| bkup_snap_plcy_id | string | N | 백업/스냅샷 정책 ID |

---

### DELETE /v1/resource/vpcs/group/{vmGrpId}

VPC 그룹 삭제.

**호출 위치**: `store/modules/virtualPc.js:150`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmGrpId | string | Y | 그룹 ID |

---

### POST /v1/resource/vpcs/group/{vmGrpId}/network

VPC 그룹 네트워크 등록.

**호출 위치**: `store/modules/virtualPc.js:248`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmGrpId | string | Y | 그룹 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| nw_id | string | Y | 네트워크 ID |
| sbn_id | string | N | 서브넷 ID |

---

### DELETE /v1/resource/vpcs/group/{vmGrpId}/network

VPC 그룹 네트워크 삭제.

**호출 위치**: `store/modules/virtualPc.js:262`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmGrpId | string | Y | 그룹 ID |

**Request Body (data)**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| nw_id | string | Y | 삭제할 네트워크 ID |

---

## VPC 풀

### GET /v1/resource/vpcs/pool

VPC 풀 목록 조회.

**호출 위치**: `store/modules/virtualPc.js:167`, `store/modules/virtualPcGroup.js:130`, `views/virtualPc/components/PublicPcPooledSection.vue:125`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_grp_id | string | N | 그룹 ID 필터 |
| tnt_mtd_cd | string | N | 테넌트 방식 코드 (전용/공용 구분) |
| gdn_img_cre_yn | string | N | 골든이미지 생성 여부 (Y/N) |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답**

래퍼: `{ data: [...], pageinfo: { count, ispaging }, errCode, errMsg }`

| 필드 | 타입 | 설명 |
|---|---|---|
| data[] | array | 풀 목록 |
| pageinfo | object | 페이지 정보 |
| pageinfo.count | number | 전체 항목 수 |
| pageinfo.ispaging | boolean | 페이징 여부 |
| errCode | string\|null | 에러 코드 |
| errMsg | string\|null | 에러 메시지 |
| vm_pool_id | string | 풀 ID |
| vm_pool_nm | string | 풀명 |
| vm_grp_id | string | 그룹 ID |
| vm_grp_nm | string | 그룹명 |
| tnt_id | string | 테넌트 ID |
| tnt_nm | string | 테넌트명 |
| tnt_mtd_cd | string | 테넌트 방식 코드 |
| tnt_mtd_cd_nm | string | 테넌트 방식 코드명 |
| temp_id | string | 템플릿 ID |
| temp_nm | string | 템플릿명 |
| vm_pool_sts_cd | string | 풀 상태 코드 |
| vm_pool_sts_cd_nm | string | 풀 상태 코드명 |
| ad_itlk_usg_yn | string | AD 연동 사용 여부 |
| auto_allo_yn | string | 자동 할당 여부 |
| ad_vdi_ou | string | AD VDI OU |
| alw_power_on_yn | string | 상시 전원 여부 |
| secu_plcy_id | string | 보안 정책 ID |
| secu_plcy_nm | string | 보안 정책명 |
| bkup_snap_plcy_id | string | 백업/스냅샷 정책 ID |
| bkup_snap_plcy_nm | string | 백업/스냅샷 정책명 |
| power_mng_plcy_usg_yn | string | 전원 관리 정책 사용 여부 |
| power_mng_plcy_id | string | 전원 관리 정책 ID |
| rset_plcy_id | string | 초기화 정책 ID |
| volm_sched_plcy_id | string | 볼륨 스케줄링 정책 ID |
| suppl_dsk_usg_yn | string | 추가 디스크 사용 여부 |
| cre_resv_vm_cnt | string | 생성 예약 VM 수 |
| max_vm_cnt | string | 최대 VM 수 |
| min_vm_cnt | string | 최소 VM 수 |
| spr_vm_cnt | string | 여분 VM 수 |
| allo_vm_cnt | string | 할당 VM 수 |
| tot_vm_cnt | string | 전체 VM 수 |
| assign_ready_vm_cnt | string | 할당 준비 VM 수 |
| pool_ready_vm_cnt | string | 공용 대기 VM 수 |
| zone_nm | string | ZONE명 |
| fail_msg | string | 실패 메시지 |
| fail_cnt | string | 실패 수 |
| gdn_img_cre_yn | string | 골든 이미지 생성 여부 |
| allo_enable_yn | string | 할당 가능 여부 |
| init_use_yn | string | 초기화 여부 |
| os_typ_cd | string | OS 유형 코드 |
| name_rule_use_yn | string | 네이밍 정책 사용 여부 |
| vpc_name_rule_id | string | 네이밍 정책 ID |
| vpc_name_rule_nm | string | 네이밍 정책명 |
| alias_rule_use_yn | string | 별칭 정책 사용 여부 |
| vpc_alias_rule_id | string | 별칭 정책 ID |
| vpc_alias_rule_nm | string | 별칭 정책명 |
| volumes | array | 볼륨 타입 목록 |
| volumes[].vm_pool_id | string | 풀 ID |
| volumes[].volm_typ_id | string | 볼륨 타입 ID |
| volumes[].volm_typ_nm | string | 볼륨 타입명 |
| volumes[].volm_usg_typ | string | 볼륨 사용 타입 코드 |
| volumes[].volm_usg_typ_nm | string | 볼륨 사용 타입명 |
| volumes[].tot_capa | string | 전체 용량 |
| volumes[].usg_capa | string | 사용 용량 |
| volumes[].psb_capa | string | 잔여 용량 |
| volumes[].usg_ratio | string | 사용 비율 |
| volumes[].volm_qos_plcy_id | string | QoS 정책 ID |
| volumes[].volm_qos_plcy_nm | string | QoS 정책명 |
| volumes[].volm_qos_detail | object | QoS 정책 상세 |
| reg_id | string | 등록자 ID |
| reg_conn_id | string | 등록자 접속 ID |
| reg_nm | string | 등록자명 |
| reg_ts | string | 등록 일시 |
| mod_id | string | 수정자 ID |
| mod_conn_id | string | 수정자 접속 ID |
| mod_nm | string | 수정자명 |
| mod_ts | string | 수정 일시 |

---

### GET /v1/resource/vpcs/pool/{vmPoolId}

VPC 풀 상세 조회.

**호출 위치**: `store/modules/virtualPc.js:324`, `store/modules/virtualPc.js:401`, `views/virtualPc/VirtualPcPoolDetail.vue:1029`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmPoolId | string | Y | 풀 ID |

**응답**

래퍼: `{ data: {...}, errCode, errMsg }`

풀 목록 응답 필드 전체 + 아래 추가 필드.

| 필드 | 타입 | 설명 |
|---|---|---|
| data | object | 풀 상세 객체 |
| errCode | string\|null | 에러 코드 |
| errMsg | string\|null | 에러 메시지 |
| subnets | array | 풀 매핑 서브넷 목록 |
| subnets[].vm_pool_id | string | 풀 ID |
| subnets[].sbn_id | string | 서브넷 ID |
| subnets[].sbn_nm | string | 서브넷명 |
| subnets[].cidr | string | CIDR |
| subnets[].vm_grp_id | string | 그룹 ID |
| subnets[].nw_id | string | 네트워크 ID |
| subnets[].nw_nm | string | 네트워크명 |
| subnets[].nw_qos_plcy_id | string | 네트워크 QoS 정책 ID |
| subnets[].nw_qos_plcy_nm | string | 네트워크 QoS 정책명 |
| subnets[].nw_qos_detail | object | 네트워크 QoS 상세 |
| volumes[].volm_qos_detail.volm_qos_plcy_id | string | QoS 정책 ID |
| volumes[].volm_qos_detail.volm_qos_plcy_nm | string | QoS 정책명 |
| volumes[].volm_qos_detail.volm_typ_id | string | 볼륨 타입 ID |
| volumes[].volm_qos_detail.volm_typ_nm | string | 볼륨 타입명 |
| volumes[].volm_qos_detail.volm_qos_rule_unit_cd | string | QoS 규칙 단위 코드 |
| volumes[].volm_qos_detail.volm_qos_rule_unit_cd_nm | string | QoS 규칙 단위 코드명 |
| volumes[].volm_qos_detail.volm_read | number | 읽기 QoS |
| volumes[].volm_qos_detail.volm_read_max | number | 읽기 최대 QoS |
| volumes[].volm_qos_detail.volm_write | number | 쓰기 QoS |
| volumes[].volm_qos_detail.volm_write_max | number | 쓰기 최대 QoS |
| volumes[].volm_qos_detail.reg_id | string | 등록자 ID |
| volumes[].volm_qos_detail.reg_conn_id | string | 등록자 접속 ID |
| volumes[].volm_qos_detail.reg_nm | string | 등록자명 |
| volumes[].volm_qos_detail.reg_ts | string | 등록 일시 |
| volumes[].volm_qos_detail.mod_id | string | 수정자 ID |
| volumes[].volm_qos_detail.mod_conn_id | string | 수정자 접속 ID |
| volumes[].volm_qos_detail.mod_nm | string | 수정자명 |
| volumes[].volm_qos_detail.mod_ts | string | 수정 일시 |

---

### POST /v1/resource/vpcs/pool

VPC 풀 생성.

**호출 위치**: `store/modules/virtualPc.js:315`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_pool_nm | string | Y | 풀명 |
| vm_grp_id | string | Y | 그룹 ID |
| temp_id | string | Y | 템플릿 ID |
| suppl_dsk_usg_yn | string | N | 보조 디스크 사용 여부 (Y/N) |
| volm_typ_id | string | N | 볼륨 타입 ID |

---

### PUT /v1/resource/vpcs/pool/{vmPoolId}

VPC 풀 수정.

**호출 위치**: `store/modules/virtualPc.js:407`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmPoolId | string | Y | 풀 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_pool_nm | string | N | 풀명 |
| temp_id | string | N | 템플릿 ID |
| suppl_dsk_usg_yn | string | N | 보조 디스크 사용 여부 (Y/N) |

---

### DELETE /v1/resource/vpcs/pool/{vmPoolId}

VPC 풀 삭제.

**호출 위치**: `store/modules/virtualPc.js:419`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmPoolId | string | Y | 풀 ID |

---

### POST /v1/resource/vpcs/pool/{poolId}/subnet

풀 서브넷 등록(수정).

**호출 위치**: `store/modules/virtualPc.js:392`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| poolId | string | Y | 풀 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| sbn_id | string | Y | 서브넷 ID |

---

### PUT /v1/resource/vpcs/pool/{vmPoolId}/subnet

풀 서브넷 수정.

**호출 위치**: `views/virtualPc/VirtualPcPoolDetail.vue:1134`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmPoolId | string | Y | 풀 ID |

---

### PUT /v1/resource/vpcs/pool/{vmPoolId}/reset

풀 초기화.

**호출 위치**: `views/virtualPc/VirtualPcPoolDetail.vue:1181`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmPoolId | string | Y | 풀 ID |

---

### PUT /v1/resource/vpcs/pool/{vmPoolId}/template

풀 템플릿 변경.

**호출 위치**: `views/virtualPc/VirtualPcPoolDetail.vue:1254`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmPoolId | string | Y | 풀 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| temp_id | string | Y | 새 템플릿 ID |

---

### GET /v1/resource/vpcs/pool/{id}/image-mismatched-vm

이미지 불일치 VM 목록 조회.

**호출 위치**: `views/virtualPc/VirtualPcPoolDetail.vue:1309`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 풀 ID |

---

### POST /v1/resource/vpcs/pool/{vmPoolId}/volume

풀 볼륨 등록.

**호출 위치**: `views/virtualPc/VirtualPcPoolDetail.vue:1402`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmPoolId | string | Y | 풀 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| volm_typ_id | string | Y | 볼륨 타입 ID |

---

### DELETE /v1/resource/vpcs/pool/{vmPoolId}/volume

풀 볼륨 해제.

**호출 위치**: `views/virtualPc/VirtualPcPoolDetail.vue:1483`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmPoolId | string | Y | 풀 ID |

**Request Body (params)**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| volm_typ_id | string | Y | 볼륨 타입 ID |

---

### GET /v1/resource/vpcs/pool/{vmPoolId}/ip

풀 IP 목록 조회. 상세 명세: [풀 IP 관리](../pools/01-pools.md#풀-ip-관리)

**호출 위치**: `views/virtualPc/mixins/virtualPcGroup.js:415`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmPoolId | string | Y | 풀 ID |

---

### GET /v1/resource/vpcs/pool2

VPC 풀 목록 조회 (v2).

**호출 위치**: `views/virtualPc/VirtualPcGroup.vue:840`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답**

`{ data: [...] }` 형태. `data[]` 내부 필드는 [풀 목록 응답](#get-v1resourcevpcspool)과 동일.

---

### GET /v1/resource/vpcs/pool/auto/{companyNm}

회사명 기준 자동 배정 대상 풀 목록 조회.

**호출 위치**: (OpenAPI resource/tenants 태그)

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| companyNm | string | Y | 회사명 |

**응답**

풀 목록 응답과 동일한 구조. [풀 목록 응답](#get-v1resourcevpcspool) 참조.

---

### GET /v1/resource/vpcs/pool/count

VPC 풀 카운트 조회.

**호출 위치**: `views/virtualPc/VirtualPcGroup.vue:942`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_grp_id | string | N | 그룹 ID |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| data.total | number | 전체 풀 수 |
| data.ded_count | number | 전용 PC 풀 수 |
| data.poo_count | number | 공용 PC 풀 수 |
| data.vm_total | number | 전체 VM 수 |
| data.vm_count | number | 배정된 VM 수 |
| errCode | string\|null | 에러 코드 |
| errMsg | string\|null | 에러 메시지 |

---

### DELETE /v1/resource/vpcs/pool/{vmPoolId}/collection

자원 회수 (리소스 반납).

**호출 위치**: `store/modules/virtualPc.js:472`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmPoolId | string | Y | 풀 ID |

---

## VPC 리소스 (VM)

### GET /v1/resource/vpcs/resources

VPC 리소스(VM) 목록 조회.

**호출 위치**: `store/modules/virtualPcGroup.js:420`, `views/virtualPc/PublicVirtualPc.vue:309`, `views/virtualPc/PrivateVirtualPc.vue:216`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| tnt_id | string | N | 테넌트 ID 필터 |
| vm_pool_id | string | N | 풀 ID 필터 |
| vm_grp_id | string | N | 그룹 ID 필터 |
| vm_allo_stat_cd | string | N | 할당 상태 코드 필터 |
| vm_pwr_stat_cd | string | N | 전원 상태 코드 필터 |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| vm_auth_id | string | VM 인증 ID |
| acct_id | string | 계정 ID |
| usr_grp_id | string | 사용자 그룹 ID |
| usr_grp_nm | string | 사용자 그룹명 |
| vm_id | string | VM UUID |
| vm_nm | string | VM명 |
| vm_grp_nm | string | VM 그룹명 |
| vm_ip | string | VM IP |
| vm_als | string | VM 별칭 |
| vm_descp | string | VM 설명 |
| vm_on_ctrl_tm | string | VM 전원 제어 일시 |
| vm_vlid_stt_dt | string | VM 유효기간 시작일 |
| vm_vlid_end_dt | string | VM 유효기간 종료일 |
| rstr_sts_cd | string | 제한 상태 코드 |
| rstr_sts_cd_nm | string | 제한 상태명 |
| static_ip_usg_yn | string | 정적 IP 사용 여부 |
| vm_state | string | VM OpenStack 상태 |
| task_state | string | VM task 상태 |
| vm_allo_sts_cd | string | VM 할당 상태 코드 |
| vm_allo_sts_cd_nm | string | VM 할당 상태명 |
| vm_allo_typ_cd | string | VM 할당 유형 코드 |
| vm_allo_typ_cd_nm | string | VM 할당 유형명 |
| usr_vm_conn_sts_cd | string | 사용자-VM 접속 상태 코드 |
| usr_vm_conn_sts_cd_nm | string | 사용자-VM 접속 상태명 |
| adm_vm_conn_sts_cd | string | 관리자-VM 접속 상태 코드 |
| adm_vm_conn_sts_cd_nm | string | 관리자-VM 접속 상태명 |
| vm_power_sts_cd | string | VM 전원 상태 코드 |
| vm_power_sts_cd_nm | string | VM 전원 상태명 |
| temp_id | string | 템플릿 ID |
| temp_nm | string | 템플릿명 |
| flavor_id | string | 플레이버 ID |
| img_id | string | 이미지 ID |
| img_nm | string | 이미지명 |
| os_typ_cd | string | OS 유형 코드 |
| os_typ_cd_nm | string | OS 유형명 |
| vcpu_cnt | string | vCPU 수 |
| vmm_capa | string | 메모리 용량 (MB) |
| vhd_capa | string | 디스크 용량 (GB) |
| dsk_sum | string | 추가 디스크 합계 (GB) |
| vhd_capa_total | string | 전체 디스크 용량 (GB) |
| volm_typ_id | string | 볼륨 타입 ID |
| volm_typ_nm | string | 볼륨 타입명 |
| volm_qos_plcy_id | string | 볼륨 QoS 정책 ID |
| volm_qos_plcy_nm | string | 볼륨 QoS 정책명 |
| volm_qos_detail | object | 볼륨 QoS 상세 |
| secu_plcy_id | string | 보안 정책 ID |
| secu_plcy_nm | string | 보안 정책명 |
| bkup_snap_plcy_id | string | 백업/스냅샷 정책 ID |
| bkup_snap_plcy_nm | string | 백업/스냅샷 정책명 |
| tnt_id | string | 테넌트 ID |
| tnt_nm | string | 테넌트명 |
| tnt_mtd_cd | string | 테넌트 운영 방식 코드 |
| tnt_mtd_cd_nm | string | 테넌트 운영 방식명 |
| usr_vm_ctrl_tm | string | 사용자 VM 제어 일시 |
| vm_str_ctrl_tm | string | VM 시작 제어 일시 |
| allo_fail_msg | string | 할당 실패 메시지 |
| vm_allo_typ_static_ip_yn | string | 정적 IP 할당 여부 |
| vm_pool_id | string | 풀 ID |
| vm_pool_nm | string | 풀명 |
| suppl_dsk_usg_yn | string | 추가 디스크 사용 여부 |
| ad_itlk_usg_yn | string | AD 연동 사용 여부 |
| gdn_img_cre_yn | string | 골든 이미지 생성 여부 |
| mnt_yn | string | 유지보수 여부 |
| host_id | string | 호스트 ID |
| host_nm | string | 호스트명 |
| host_sts_cd | string | 호스트 상태 코드 |
| zone_nm | string | 존명 |
| acct_conn_id | string | 계정 로그인 ID (마스킹) |
| acct_nm | string | 계정명 (마스킹) |
| reg_id | string | 등록자 ID |
| reg_conn_id | string | 등록자 로그인 ID (마스킹) |
| reg_ts | string | 등록 일시 |
| mod_id | string | 수정자 ID |
| mod_conn_id | string | 수정자 로그인 ID (마스킹) |
| mod_ts | string | 수정 일시 |

---

### GET /v1/resource/vpcs/resources/list/vm2

VPC 리소스 목록 조회 (v2, 그룹별).

**호출 위치**: `store/modules/virtualPcGroup.js:114`, `views/virtualPc/VirtualPcGroup.vue:1191`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| vm_grp_id | string[] | N | 그룹 ID (배열, `arrayFormat: repeat`) |
| tnt_id | string | N | 테넌트 ID |

---

### GET /v1/resource/vpcs/resources/list/vm2/count

VPC 리소스 카운트 조회.

**호출 위치**: `views/virtualPc/VirtualPcGroup.vue:920`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_grp_id | string | N | 그룹 ID |

---

### GET /v1/resource/vpcs/resources/{id}

VM 상세 조회.

**호출 위치**: `store/modules/virtualPcGroup.js:140`, `store/modules/virtualPcGroup.js:155`, `views/virtualPc/PrivateVirtualPcDetail.vue:907`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | VM 인증 ID (vm_auth_id) |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| data.vm_auth_id | string | VM 인증 ID |
| data.acct_id | string | 계정 ID |
| data.acct_conn_id | string | 계정 로그인 ID (마스킹) |
| data.acct_nm | string | 계정명 (마스킹) |
| data.usr_grp_id | string | 사용자 그룹 ID |
| data.usr_grp_nm | string | 사용자 그룹명 |
| data.vm_als | string\|null | VM 별칭 |
| data.vm_vlid_stt_dt | string | VM 유효기간 시작일 |
| data.vm_vlid_end_dt | string | VM 유효기간 종료일 |
| data.tnt_mtd_cd | string | 테넌트 운영 방식 코드 |
| data.tnt_mtd_cd_nm | string | 테넌트 운영 방식명 |
| data.tnt_id | string | 테넌트 ID |
| data.tnt_nm | string | 테넌트명 |
| data.vm_pool_id | string | 풀 ID |
| data.vm_pool_nm | string | 풀명 |
| data.suppl_dsk_usg_yn | string | 보조 디스크 사용 여부 |
| data.ad_itlk_usg_yn | string | AD 연동 사용 여부 |
| data.gdn_img_cre_yn | string | 골든이미지 생성 여부 |
| data.vm_grp_nm | string | VM 그룹명 |
| data.vm_allo_sts_cd | string | VM 할당 상태 코드 |
| data.vm_allo_sts_cd_nm | string | VM 할당 상태명 |
| data.vm_allo_typ_cd | string | VM 할당 유형 코드 (`U028M` 수동, `U028A` 자동) |
| data.vm_allo_typ_cd_nm | string | VM 할당 유형명 |
| data.vm_allo_typ_static_ip_yn | string | 정적 IP 할당 여부 |
| data.rstr_sts_cd | string | 제한 상태 코드 |
| data.rstr_sts_cd_nm | string | 제한 상태명 |
| data.secu_plcy_id | string | 보안 정책 ID |
| data.secu_plcy_nm | string | 보안 정책명 |
| data.bkup_snap_plcy_id | string | 백업 스냅샷 정책 ID |
| data.bkup_snap_plcy_nm | string | 백업 스냅샷 정책명 |
| data.sort_ord | number\|null | 정렬 순서 |
| data.vm_descp | string\|null | VM 설명 |
| data.reg_id | string | 등록자 ID |
| data.reg_conn_id | string | 등록자 로그인 ID (마스킹) |
| data.reg_nm | string | 등록자명 (마스킹) |
| data.reg_ts | string | 등록 일시 |
| data.mod_id | string | 수정자 ID |
| data.mod_conn_id | string | 수정자 로그인 ID (마스킹) |
| data.mod_nm | string | 수정자명 (마스킹) |
| data.mod_ts | string | 수정 일시 |
| data.allo_fail_msg | string\|null | 할당 실패 메시지 |
| data.vm_id | string | VM UUID |
| data.vm_nm | string | VM명 |
| data.mnt_yn | string | 유지보수 여부 |
| data.ad_itlk_succ_yn | string\|null | AD 연동 성공 여부 |
| data.vcpu_cnt | string | vCPU 수 |
| data.vmm_capa | string | 메모리 용량 (MB) |
| data.vhd_capa | string | 디스크 용량 (GB) |
| data.host_id | string | 호스트 ID |
| data.host_nm | string | 호스트명 |
| data.zone_nm | string | 존명 |
| data.host_sts_cd | string | 호스트 상태 코드 |
| data.temp_id | string | 템플릿 ID |
| data.flavor_id | string | 플레이버 ID |
| data.img_id | string | 이미지 ID |
| data.vm_on_ctrl_tm | string | VM 전원 제어 일시 |
| data.vm_ip | string | VM IP 주소 |
| data.static_ip_usg_yn | string | 정적 IP 사용 여부 |
| data.os_typ_cd | string | OS 유형 코드 |
| data.os_typ_cd_nm | string | OS 유형명 |
| data.usr_vm_conn_sts_cd | string | 사용자-VM 접속 상태 코드 |
| data.usr_vm_conn_sts_cd_nm | string | 사용자-VM 접속 상태명 |
| data.adm_vm_conn_sts_cd | string | 관리자-VM 접속 상태 코드 |
| data.adm_vm_conn_sts_cd_nm | string | 관리자-VM 접속 상태명 |
| data.vm_power_sts_cd | string | VM 전원 상태 코드 |
| data.vm_power_sts_cd_nm | string | VM 전원 상태명 |
| data.vm_state | string | VM OpenStack 상태 (`active` 등) |
| data.task_state | string\|null | VM task 상태 |
| data.usr_vm_ctrl_tm | string | 사용자 VM 제어 일시 |
| data.vm_str_ctrl_tm | string | VM 시작 제어 일시 |
| data.temp_nm | string | 템플릿명 |
| data.img_nm | string | 이미지명 |
| data.vm_pool_cnt | number\|null | 풀 VM 수 |
| data.volm_typ_id | string | 볼륨 타입 ID |
| data.volm_typ_nm | string | 볼륨 타입명 |
| data.volm_qos_plcy_id | string | 볼륨 QoS 정책 ID |
| data.volm_qos_plcy_nm | string | 볼륨 QoS 정책명 |
| data.volm_qos_detail | object\|null | 볼륨 QoS 상세 |
| data.volm_qos_detail.volm_qos_plcy_id | string | 볼륨 QoS 정책 ID |
| data.volm_qos_detail.volm_qos_plcy_nm | string | 볼륨 QoS 정책명 |
| data.volm_qos_detail.volm_typ_id | string | 볼륨 타입 ID |
| data.volm_qos_detail.volm_typ_nm | string | 볼륨 타입명 |
| data.volm_qos_detail.volm_qos_rule_unit_cd | string | QoS 규칙 단위 코드 (`V018IOP` IOPS 등) |
| data.volm_qos_detail.volm_qos_rule_unit_cd_nm | string | QoS 규칙 단위명 |
| data.volm_qos_detail.volm_read | number | 읽기 제한값 |
| data.volm_qos_detail.volm_read_max | number | 읽기 최대값 |
| data.volm_qos_detail.volm_write | number | 쓰기 제한값 |
| data.volm_qos_detail.volm_write_max | number | 쓰기 최대값 |
| data.dsk_sum | string | 추가 디스크 합계 용량 (GB) |
| data.vhd_capa_total | string | 전체 디스크 용량 (GB) |
| data.ports | array | 연결된 포트 목록 |
| data.ports[].port_id | string | 포트 ID |
| data.ports[].port_nm | string | 포트명 |
| data.ports[].port_sts_val | string | 포트 상태 (`UP` / `DOWN`) |
| data.ports[].mac | string | MAC 주소 |
| data.ports[].nw_id | string | 네트워크 ID |
| data.ports[].nw_nm | string | 네트워크명 |
| data.ports[].sbn_id | string | 서브넷 ID |
| data.ports[].sbn_nm | string | 서브넷명 |
| data.ports[].cidr | string | CIDR |
| data.ports[].ip | string | IP 주소 |
| data.ports[].dev_id | string | 디바이스 ID |
| data.ports[].dev_ownr | string | 디바이스 소유자 |
| data.ports[].nw_qos_plcy_id | string\|null | 네트워크 QoS 정책 ID |
| data.ports[].port_typ_cd | string\|null | 포트 유형 코드 |
| data.network_qos | object\|null | VM 네트워크 QoS 정책 |
| data.port_qos | object\|null | VM 포트 QoS 정책 |

---

### PUT /v1/resource/vpcs/resources/{vmAuthId}

VM 정보 수정.

**호출 위치**: `views/virtualPc/PrivateVirtualPcDetail.vue:846`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmAuthId | string | Y | VM 인증 ID |

**Request Body**: 수정할 필드 포함 form 객체.

---

### PUT /v1/resource/vpcs/resources/{vmAuthId}/tenant

VM 테넌트 정보 수정.

**호출 위치**: `store/modules/virtualPcGroup.js:405`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmAuthId | string | Y | VM 인증 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tnt_id | string | Y | 변경할 테넌트 ID |

---

### PUT /v1/resource/vpcs/resources/{vmAuthId}/ip

VM IP 변경.

**호출 위치**: `components/Modals/VirtualPc/IpPool.vue:194`, `components/Modals/VirtualPc/VirtualPcPool.vue:178`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmAuthId | string | Y | VM 인증 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| ip_addr | string | Y | 변경할 IP 주소 |
| sbn_id | string | Y | 서브넷 ID |

---

### POST /v1/resource/vpcs/resources/{vmAuthId}/start

VM 시작.

**호출 위치**: `store/modules/virtualPcGroup.js:240`, `views/virtualPc/PrivateVirtualPcDetail.vue:781`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmAuthId | string | Y | VM 인증 ID |

---

### POST /v1/resource/vpcs/resources/{vmAuthId}/stop

VM 중지.

**호출 위치**: `store/modules/virtualPcGroup.js:240`, `views/virtualPc/PrivateVirtualPcDetail.vue:806`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmAuthId | string | Y | VM 인증 ID |

---

### POST /v1/resource/vpcs/resources/{vmAuthId}/restart

VM 재시작.

**호출 위치**: `store/modules/virtualPcGroup.js:246`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmAuthId | string | Y | VM 인증 ID |

---

### POST /v1/resource/vpcs/resources/{vmAuthId}/recovery

VM 복구 (초기화 - 할당 VM).

**호출 위치**: `store/modules/virtualPcGroup.js:281`, `views/virtualPc/PrivateVirtualPcDetail.vue:741`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmAuthId | string | Y | VM 인증 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| (옵션 body) | object | N | 복구 옵션 |

---

### POST /v1/resource/vpcs/resources/{vmAuthId}/initial

VM 초기화 (미할당 VM).

**호출 위치**: `store/modules/virtualPcGroup.js:281`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmAuthId | string | Y | VM 인증 ID |

---

### POST /v1/resource/vpcs/resources/{vmAuthId}/upgrade

VM 업그레이드 (사양 변경 후 적용).

**호출 위치**: `views/virtualPc/components/VirtualPcRecovery.vue:236`, `views/virtualPc/components/BackupSnapshotPolicy.vue:328`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmAuthId | string | Y | VM 인증 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| flavor_id | string | Y | 변경할 플레이버 ID |

---

### POST /v1/resource/vpcs/resources/{vmAuthId}/vm_terminate

VM 자원 회수 (강제 종료).

**호출 위치**: `store/modules/virtualPcGroup.js:218`, `components/Modals/VirtualPc/ResourceRecall.vue:145`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmAuthId | string | Y | VM 인증 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| (옵션 body) | object | N | 회수 사유 등 |

---

### GET /v1/resource/vpcs/resources/{vmAuthId}/screen_recovery

VM 화면 복구.

**호출 위치**: `store/modules/virtualPcGroup.js:262`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmAuthId | string | Y | VM 인증 ID |

---

### GET /v1/resource/vpcs/resources/{vmAuthId}/vnc_console

VNC 콘솔 URL 조회.

**호출 위치**: `components/Modals/Common/VncConsoleModal.vue:107`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmAuthId | string | Y | VM 인증 ID (vmId) |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| url | string | VNC 콘솔 URL |
| type | string | VNC 콘솔 연결 유형 |

---

### POST /v1/resource/vpcs/resources/{vmAuthId}/disk

VM 디스크 마운트.

**호출 위치**: `views/virtualPc/components/VirtualDiskDrive.vue:79`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmAuthId | string | Y | VM 인증 ID |

---

### POST /v1/resource/vpcs/resources/vm_assign

VM 유동 IP 개별 할당.

**호출 위치**: `store/modules/virtualPc.js:431`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_pool_id | string | Y | 풀 ID |
| acct_id | string | Y | 계정 ID |
| sbn_id | string | N | 서브넷 ID |

---

### POST /v1/resource/vpcs/resources/vm_appoint_assign

VM 고정 IP 개별 할당.

**호출 위치**: `store/modules/virtualPc.js:434`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_pool_id | string | Y | 풀 ID |
| acct_id | string | Y | 계정 ID |
| ip_addr | string | Y | 할당할 고정 IP |
| sbn_id | string | Y | 서브넷 ID |

---

### POST /v1/resource/vpcs/resources/vm_bundle_assign

VM 일괄 할당.

**호출 위치**: `store/modules/virtualPc.js:428`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_pool_id | string | Y | 풀 ID |
| acct_ids | string[] | Y | 계정 ID 목록 |

---

### POST /v1/resource/vpcs/resources/vm_scaleup

VM 자원 증설 (사양 업그레이드).

**호출 위치**: `store/modules/virtualPcGroup.js:193`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_auth_id | string | Y | VM 인증 ID |
| flavor_id | string | Y | 목표 플레이버 ID |

---

### POST /v1/resource/vpcs/resources/vm_scaleout

VM 스케일아웃 (골든이미지 생성용 VM 생성).

**호출 위치**: `views/virtualPc/components/VirtualPcAssignment.vue:925`, `views/template/goldenImage/GoldenImageCreateDetail.vue:581`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_pool_id | string | Y | 풀 ID |
| tnt_id | string | Y | 테넌트 ID |
| temp_id | string | Y | 템플릿 ID |

---

### POST /v1/resource/vpcs/resources/vm_bundle_secu_plcy

VM 보안 정책 일괄 적용.

**호출 위치**: `components/Modals/Policy/VirtualPcPolicySettingFor.vue:1259`, `components/Modals/Policy/VirtualPcPolicySettingFor.vue:1279`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_auth_ids | string[] | Y | VM 인증 ID 목록 |
| secu_plcy_id | string | Y | 보안 정책 ID |

---

### POST /v1/resource/vpcs/resources/vnc_conn

VNC 연결.

**호출 위치**: `components/Modals/Common/VncConsoleModal.vue:142`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_auth_id | string | Y | VM 인증 ID |
| vnc_token | string | Y | VNC 토큰 |

---

### POST /v1/resource/vpcs/resources/vnc_disconn

VNC 연결 해제.

**호출 위치**: `components/Modals/Common/VncConsoleModal.vue:161`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_auth_id | string | Y | VM 인증 ID |

---

### GET /v1/resource/vpcs/resources/pooled/user_vm

공용 PC 대기 자원 목록 조회.

**호출 위치**: `store/modules/virtualPcGroup.js:439`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_pool_id | string | N | 풀 ID 필터 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| data | array | 대기 VM 목록 |
| data[].vm_auth_id | string | VM 인증 ID |
| data[].acct_id | string | 계정 ID |
| data[].acct_nm | string | 계정명 (마스킹) |
| data[].usr_grp_nm | string | 사용자 그룹명 |
| data[].vm_id | string | VM UUID (`-` = 미할당) |
| data[].vm_nm | string | VM명 (`-` = 미할당) |
| data[].vm_power_sts_cd | string | 전원 상태 코드 (`-` = 미할당) |
| data[].vm_power_sts_cd_nm | string | 전원 상태명 (`-` = 미할당) |
| data[].resrv_alloc_tm | string | 예약 할당 일시 |
| data[].vm_pool_id | string | 풀 ID |

---

### DELETE /v1/resource/vpcs/resources/pooled/usr_vm

공용 PC 대기 자원 삭제.

**호출 위치**: `views/virtualPc/PublicPcStandByResource.vue:247`

**Request Body (data)**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_auth_ids | string[] | Y | 삭제할 VM 인증 ID 목록 |

---

## VPC 번들 할당

### GET /v1/resource/vpcs/bundle

VPC 일괄 할당 내역 목록 조회.

**호출 위치**: `store/modules/virtualPc.js:442`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_pool_id | string | Y | 풀 ID |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| req_id | string | 요청 ID |
| tnt_id | string | 테넌트 ID |
| vm_pool_id | string | 풀 ID |
| vm_pool_nm | string | 풀명 |
| suppl_dsk_usg_yn | string | 추가 디스크 사용 여부 |
| suppl_dsk_size | string | 추가 디스크 사이즈 |
| vm_vlid_stt_dt | string | VM 유효기간 시작일 |
| vm_vlid_end_dt | string | VM 유효기간 종료일 |
| secu_plcy_id | string | 보안 정책 ID |
| secu_plcy_nm | string | 보안 정책명 |
| bkup_snap_plcy_id | string | 백업/스냅샷 정책 ID |
| bkup_snap_plcy_nm | string | 백업/스냅샷 정책명 |
| reg_id | string | 등록자 ID |
| reg_conn_id | string | 등록자 접속 ID |
| reg_nm | string | 등록자명 |
| reg_ts | string | 등록 일시 |
| mod_id | string | 수정자 ID |
| mod_conn_id | string | 수정자 접속 ID |
| mod_nm | string | 수정자명 |
| mod_ts | string | 수정 일시 |

---

### GET /v1/resource/vpcs/bundle/{req_id}

VPC 일괄 할당 내역 상세 조회.

**호출 위치**: `store/modules/virtualPc.js:451`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| req_id | string | Y | 요청 ID |

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

---

### POST /v1/resource/vpcs/bundle/{reqId}/disk/create

일괄 디스크 생성.

**호출 위치**: `store/modules/virtualPc.js:460`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| reqId | string | Y | 요청 ID |

---

### POST /v1/resource/vpcs/bundle/{reqId}/disk/attach

일괄 디스크 할당.

**호출 위치**: `store/modules/virtualPc.js:466`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| reqId | string | Y | 요청 ID |

---

## VPC 자동 배정

### GET /v1/resource/vpcs/auto/mapping/list

자동 배정 목록 조회.

**호출 위치**: `views/virtualPc/AutoAssign.vue:317`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

---

### POST /v1/resource/vpcs/auto/mapping

자동 배정 생성.

**호출 위치**: `views/virtualPc/AutoAssignCreate.vue:346`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_pool_id | string | Y | 풀 ID |
| dept_cd | string | N | 부서 코드 |
| tnt_id | string | N | 테넌트 ID |

---

### DELETE /v1/resource/vpcs/auto/mapping/delete

자동 배정 삭제.

**호출 위치**: `views/virtualPc/AutoAssign.vue:412`, `views/virtualPc/AutoAssignDetail.vue:490`

**Request Body (params)**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| dept_pool_map_id | string | Y | 배정 매핑 ID |

---

### GET /v1/resource/vpcs/auto/mapping/info/{dept_pool_map_id}

자동 배정 상세 조회.

**호출 위치**: `views/virtualPc/AutoAssignDetail.vue:403`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| dept_pool_map_id | string | Y | 배정 매핑 ID |

---

### PUT /v1/resource/vpcs/auto/mapping/info/{dept_pool_map_id}

자동 배정 수정.

**호출 위치**: `views/virtualPc/AutoAssignDetail.vue:532`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| dept_pool_map_id | string | Y | 배정 매핑 ID |

---

### GET /v1/resource/vpcs/auto/mapping/pool/{dept_pool_map_id}

자동 배정 풀 목록 조회.

**호출 위치**: `views/virtualPc/AutoAssignDetail.vue:604`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| dept_pool_map_id | string | Y | 배정 매핑 ID |

---

### GET /v1/resource/vpcs/auto/mapping/group/{dept_pool_map_id}

자동 배정 그룹 목록 조회.

**호출 위치**: `views/virtualPc/AutoAssignDetail.vue:615`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| dept_pool_map_id | string | Y | 배정 매핑 ID |

---

### GET /v1/resource/vpcs/auto/mapping/{type}/list

유형별 자동 배정 목록 조회.

**호출 위치**: `views/virtualPc/components/AutoAssignPopup.vue:267`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| type | string | Y | 배정 유형 (pool / group 등) |

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| dept_pool_map_id | string | N | 배정 매핑 ID |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

---

### POST /v1/resource/vpcs/auto/mapping/{type}

유형별 자동 배정 등록.

**호출 위치**: `views/virtualPc/components/AutoAssignPopup.vue:330`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| type | string | Y | 배정 유형 |

---

### DELETE /v1/resource/vpcs/auto/mapping/{type}/delete

유형별 자동 배정 삭제.

**호출 위치**: `views/virtualPc/AutoAssignDetail.vue:657`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| type | string | Y | 배정 유형 |

**Request Body (params)**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 삭제 대상 ID |

---

## VNC 콘솔

### GET /v1/resource/vpcs/resources/{vmId}/vnc_console

VNC 콘솔 URL 조회.

**호출 위치**: `components/Modals/Common/VncConsoleModal.vue:107`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmId | string | Y | VM ID |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| url | string | VNC 콘솔 URL |
| type | string | VNC 콘솔 연결 유형 |

---

## 포트 관리

### GET /v1/resource/port

포트 목록 조회.

**호출 위치**: `store/modules/virtualPcGroup.js:453`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_auth_id | string | N | VM 인증 ID 필터 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| port_id | string | 포트 ID |
| dev_id | string | 디바이스 ID |
| mac_addr | string | MAC 주소 |
| ip_addr | string | IP 주소 |
| status | string | 포트 상태 |

---

### PUT /v1/resource/port/{devId}

포트 정보 수정.

**호출 위치**: `views/virtualPc/PortManagement.vue:200`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| devId | string | Y | 디바이스 ID |

**Request Body**: 수정할 포트 정보 객체.

---

### DELETE /v1/resource/port/{portId}

포트 삭제.

**호출 위치**: `store/modules/virtualPcGroup.js:461`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| portId | string | Y | 포트 ID |

---

## 마이그레이션

### GET /v1/resource/vpcs/migration

마이그레이션 목록 조회.

**호출 위치**: `views/systemResource/Migration.vue:206`, `views/systemResource/Migration.vue:225`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| host_id | string | N | 호스트 ID 필터 |
| mig_stat_cd | string | N | 마이그레이션 상태 코드 |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| mig_id | string | 마이그레이션 ID |
| vm_auth_id | string | VM 인증 ID |
| src_host_id | string | 원본 호스트 ID |
| dst_host_id | string | 대상 호스트 ID |
| mig_stat_cd | string | 마이그레이션 상태 코드 |

---

### GET /v1/resource/vpcs/migration/{id}

마이그레이션 상세 조회.

**호출 위치**: `views/systemResource/MigrationDetail.vue:134`, `views/systemResource/MigrationDetail.vue:152`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 마이그레이션 ID |

---

### POST /v1/resource/vpcs/migration/multi

다중 마이그레이션 실행.

**호출 위치**: `views/systemResource/MigrationCreate.vue:233`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_auth_ids | string[] | Y | 마이그레이션 대상 VM ID 목록 |
| dst_host_id | string | Y | 대상 호스트 ID |
| live_yn | string | N | 라이브 마이그레이션 여부 (Y/N) |

---

### POST /v1/resource/vpcs/migration/{mig_id}/initial

마이그레이션 초기화.

**호출 위치**: `views/systemResource/Migration.vue:252`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| mig_id | string | Y | 마이그레이션 ID |

---

## VM OS 디스크 증설

### PUT /v1/resource/vm/{vmId}/ext-root-vol

OS 디스크 증설.

**호출 위치**: `store/modules/virtualPcGroup.js:209`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmId | string | Y | VM ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| newSize | number | Y | 새 디스크 크기 (GB) |

---

## VM 배치 삭제

### PUT /v1/resource/vm/batch-delete

VM 배치 삭제.

**호출 위치**: `views/virtualPc/modals/VirtualCommonModal.vue:271`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_auth_ids | string[] | Y | 삭제 대상 VM 인증 ID 목록 |

---

## 전원 이력

### GET /v1/resource/vms/powermgt/history/detail

VM 전원 이력 상세 조회.

**호출 위치**: `views/virtualPc/components/CommonPcPowerHistory.vue:219`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_auth_id | string | Y | VM 인증 ID |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

---

### GET /v1/resource/vms/powermgt/history/{id}

VM 전원 이력 조회.

**호출 위치**: `views/virtualPc/components/CommonPcPowerHistory.vue:272`, `views/virtualPc/components/CommonPcPowerHistory.vue:280`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | VM 이력 ID |

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmPoolId | string | N | 풀 ID |
| regTs | string | N | 등록 일시 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

---

## 에러 코드

| HTTP 상태 | 설명 |
|---|---|
| 200 | 정상 처리 |
| 400 | 잘못된 요청 파라미터 |
| 404 | 리소스 없음 |
| 409 | 상태 충돌 (이미 처리 중) |
| 500 | 서버 오류 |
