# 테넌트 API

## 사용 화면
- [테넌트](../../화면/테넌트/01-테넌트.md)
- [서비스 (AD 스크립트)](../../화면/서비스/02-서비스.md)

## 목차

- [테넌트 목록/상세](#테넌트-목록상세)
- [테넌트 관리자 (manager)](#테넌트-관리자-manager)
- [테넌트 그룹](#테넌트-그룹)
- [테넌트 리소스 요청](#테넌트-리소스-요청)
- [테넌트 네트워크](#테넌트-네트워크)
- [테넌트 볼륨/스토리지](#테넌트-볼륨스토리지)
- [테넌트 호스트](#테넌트-호스트)
- [테넌트 가용량 (Capacity)](#테넌트-가용량-capacity)
- [도메인](#도메인)
- [AD 스크립트](#ad-스크립트)
- [초기화 (Init)](#초기화-init)

---

## 테넌트 목록/상세

### GET /v1/resource/tenants

테넌트 목록 조회.

**호출 위치**: `views/monitoring/networkStatistics/HostNetwork.vue:400`, `views/tenant/resources/ResourceGroup.vue:204`, `views/virtualPc/components/VirtualPcAssignment.vue:853`, `views/tenant/resources/RequestDetail.vue:350`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| tnt_nm | string | N | 테넌트명 검색어 |
| tnt_grp_id | string | N | 테넌트 그룹 ID 필터 |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| tnt_id | string | 테넌트 ID |
| tnt_nm | string | 테넌트명 |
| tnt_grp_id | string | 테넌트 그룹 ID |
| tnt_stat_cd | string | 테넌트 상태 코드 |

---

### GET /v1/resource/tenants/{tntId}

테넌트 상세 조회.

**호출 위치**: `utils/policy.js:69`, `views/virtualPc/components/VirtualPcAssignment.vue:874`, `views/virtualPc/components/BackupSnapshotPolicy.vue:265`, `views/virtualPc/components/VirtualPcRecovery.vue:173`, `views/tenant/resources/ResourceGroupDetail.vue:415`, `components/Modals/Policy/CertificationPolicy.vue:71`, `components/Modals/Policy/NetworkSecurityPolicy.vue:73`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tntId | string | Y | 테넌트 ID |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| tnt_id | string | 테넌트 ID |
| tnt_nm | string | 테넌트명 |
| tnt_grp_id | string | 테넌트 그룹 ID |
| secu_plcy_id | string | 보안 정책 ID |
| secu_plcy_nm | string | 보안 정책명 |
| bkup_snap_plcy_id | string | 백업/스냅샷 정책 ID |
| bkup_snap_plcy_nm | string | 백업/스냅샷 정책명 |

---

### DELETE /v1/resource/tenants/{tntId}

테넌트 삭제.

**호출 위치**: `views/tenant/resources/ResourceGroupDetail.vue:445`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tntId | string | Y | 테넌트 ID |

---

### PUT /v1/resource/tenants/{tntId}

테넌트 정보 수정.

**호출 위치**: `views/tenant/resources/ResourceGroupDetail.vue:865` (uri 참조)

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tntId | string | Y | 테넌트 ID |

**Request Body**: 수정할 테넌트 정보 필드.

---

### GET /v1/resource/tenants/packages

테넌트 패키지 목록 조회.

**호출 위치**: `views/tenant/resources/ResourceGroupDetail.vue:477`

---

## 테넌트 관리자 (manager)

### GET /v1/resource/tenants/manager

테넌트 관리자 목록 조회.

**호출 위치**: `views/tenant/Index.vue:126`, `views/systemResource/Zone.vue:155`, `views/systemResource/Domain.vue:168`, `components/monitoring/TenantSearchTenantAndServGroupAndUsrGroup.vue:102`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| tnt_nm | string | N | 테넌트명 검색어 |
| dm_id | string | N | 도메인 ID 필터 |
| sort | string | N | 정렬 기준 필드 |
| sort_type | string | N | ASC / DESC |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| tnt_id | string | 테넌트 ID |
| tnt_nm | string | 테넌트명 |
| tnt_stat_cd | string | 테넌트 상태 코드 |
| dm_id | string | 도메인 ID |
| secu_plcy_id | string | 보안 정책 ID |
| bkup_snap_plcy_id | string | 백업/스냅샷 정책 ID |

---

### GET /v1/resource/tenants/manager/list/all

테넌트 관리자 전체 목록 조회 (페이징 없음).

**호출 위치**: `components/Form/SearchFilter.vue:321`, `store/modules/serviceGroup.js:112`, `store/modules/user.js:181`, `components/monitoring/UserGroupSearch.vue:278`, `views/monitoring/elasticsearch/HostElasticsearchLog.vue:225`, `views/monitoring/logStatistics/AdminActivityLog.vue:142`, `views/adminSetting/AdminSettingDetail.vue:633`

**응답**

배열 형태 (페이징 없이 전체 반환).

---

### GET /v1/resource/tenants/manager/{id}

테넌트 관리자 상세 조회.

**호출 위치**: `store/modules/virtualPc.js:218`, `views/tenant/IndexDetail.vue:1375`, `views/adminSetting/AdminSettingDetail.vue:958`, `components/Modals/Tenant/AvailabilityZone.vue:184`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 테넌트 ID |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| tnt_id | string | 테넌트 ID |
| tnt_nm | string | 테넌트명 |
| pfrm_tnt_nm | string | 플랫폼 테넌트명 |
| dm_id | string | 도메인 ID |
| tnt_descp | string | 테넌트 설명 |
| host_tnt_yn | string | 호스트 전용 할당 (`Y` 호스트 직접 지정 / `N` Zone 자동 배치) |
| ha_auto_mng_yn | string | HA 자동 관리 여부 |
| vm_grp_usg_yn | string | VM 그룹 사용 여부 |
| vcpu_psb_cnt | string | 최대 vCPU 수 (`-1` = 무제한) |
| vmm_psb_capa | string | 최대 메모리 MB (`-1` = 무제한) |
| tot_vm_psb_cnt | string | 최대 VM 수 |
| tot_vm_usg_cnt | string | 사용 중 VM 수 |
| phy_sbn_tot_cnt | string | 물리 서브넷 총 수 |
| phy_sbn_usg_cnt | string | 물리 서브넷 사용 수 |
| vcpu_usg_cnt | string | 사용 중 vCPU 수 |
| vmm_usg_capa | string | 사용 중 메모리 MB |
| rtr_cnt | string | 라우터 수 |
| img_cnt | string | 이미지 수 |
| bkup_snap_plcy_id | string | 백업/스냅샷 정책 ID |
| bkup_snap_plcy_nm | string | 백업/스냅샷 정책명 |
| volm_sched_plcy_id | string | 볼륨 스케줄 정책 ID |
| l4_proxy_asg_yn | string | L4 프록시 할당 여부 |
| l7_proxy_asg_yn | string | L7 프록시 할당 여부 |
| tnt_url_id | string | 테넌트 URL ID |
| main_tnt_yn | string | 메인 테넌트 여부 |
| ad_itlk_usg_yn | string | AD 연동 사용 여부 |
| octatco_usg_yn | string | Octatco 사용 여부 |
| shar_str_usg_yn | string | 공유 스토리지 사용 여부 |
| viwr_con_plcy_yn | string | 뷰어 접속 정책 사용 여부 |
| viwr_con_cnt | string | 뷰어 동시 접속 수 |
| networks | array | 할당 네트워크 목록 (네트워크 + subnets 중첩) |
| templates | array | 할당 템플릿 목록 (temp_id, temp_nm, os_typ_cd 등) |
| flavors | array | 할당 Flavor 목록 (flavor_id, vcpu_cnt, vmm_capa, vhd_capa 등) |
| volumes | array | 할당 볼륨타입 목록 (volm_typ_id, tot_capa, usg_capa, volm_qos_detail 등) |
| groups | array | VM 그룹 목록 (vm_grp_id, secu_plcy_nm, temp_nm, pool_usg_cnt 등) |
| zones | array | 가용 Zone 목록 (zone_nm, host_cnt, vcpu_tot_cnt, mem_tot_capa) |
| hosts | array | 할당 호스트 목록 (host_id, host_nm, host_ip, host_sts_cd 등) |
| netApp_interlock | object | NetApp 연동 설정 (ip, port, cert_id 등) |
| email_interlock | object | 이메일 연동 설정 (smtp_host, smtp_port, protocol_type 등) |
| adScript | object | AD 스크립트 (cadno, use_yn, adscript_contents) |
| octatco | object | Octatco 연동 설정 (app_id, server_domain, did) |

---

### DELETE /v1/resource/tenants/manager/{tntId}

테넌트 관리자 삭제.

**호출 위치**: `views/tenant/IndexDetail.vue:1438`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tntId | string | Y | 테넌트 ID |

---

### PUT /v1/resource/tenants/manager/{id}/{type}

테넌트 관리자 정보 수정 (유형별).

**호출 위치**: `views/tenant/IndexDetail.vue:1903`, `views/tenant/IndexDetail.vue:2388`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 테넌트 ID |
| type | string | Y | 수정 유형 (usehost / nonehost 등) |

**Request Body**: 수정 유형에 따른 업데이트 폼.

---

### PUT /v1/resource/tenants/manager/usehost

테넌트 전용 호스트 사용 설정.

**호출 위치**: `views/tenant/IndexDetail.vue:1806`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tnt_id | string | Y | 테넌트 ID |
| host_id | string | Y | 호스트 ID |

---

### PUT /v1/resource/tenants/manager/nonehost

테넌트 전용 호스트 해제.

**호출 위치**: `views/tenant/IndexDetail.vue:1811`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tnt_id | string | Y | 테넌트 ID |

---

### PUT /v1/resource/tenants/manager/ignore/{tntId}

테넌트 무시 처리.

**호출 위치**: `views/tenant/IndexDetail.vue:1495`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tntId | string | Y | 테넌트 ID |

---

### GET /v1/resource/tenants/manager/get/license

라이선스 조회.

**호출 위치**: `views/tenant/IndexDetail.vue:1340`

---

### GET /v1/resource/tenants/manager/autoTenants/{companyNm}

회사명 기준 자동 테넌트 목록 조회.

**호출 위치**: `views/initialized/components/DataSet/index.vue:74`, `views/initialized/components/Tenant/index.vue:66`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| companyNm | string | Y | 회사명 |

---

## 테넌트 그룹

### GET /v1/resource/tenants/groups

테넌트 그룹 목록 조회.

**호출 위치**: `views/tenant/TenantGroup.vue:111`, `views/tenant/resources/ResourceGroup.vue:162`, `views/tenant/resources/ResourceGroupDetail.vue:380`, `views/template/goldenImage/GoldenImageCreateDetail.vue:466`, `views/adminSetting/TenantGroupManageDetail.vue:319`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| tnt_grp_id | string | 테넌트 그룹 ID |
| tnt_grp_nm | string | 테넌트 그룹명 |
| tnt_cnt | number | 소속 테넌트 수 |

---

### GET /v1/resource/tenants/groups/{tntGrpId}

테넌트 그룹 상세 조회.

**호출 위치**: `views/tenant/TenantGroupDetail.vue:241`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tntGrpId | string | Y | 테넌트 그룹 ID |

---

### GET /v1/resource/tenants/groups/licenses

테넌트 그룹 라이선스 목록 조회.

**호출 위치**: `views/tenant/TenantGroup.vue:140`, `views/tenant/TenantGroupDetail.vue:286`

---

### POST /v1/resource/tenants/groups/package

테넌트 그룹 패키지 추가.

**호출 위치**: `views/tenant/TenantGroupDetail.vue:315`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tnt_grp_id | string | Y | 테넌트 그룹 ID |
| package_id | string | Y | 패키지 ID |

---

### DELETE /v1/resource/tenants/groups/package

테넌트 그룹 패키지 제거.

**호출 위치**: `views/tenant/TenantGroupDetail.vue:323`

**Request Body (data)**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tnt_grp_id | string | Y | 테넌트 그룹 ID |
| package_id | string | Y | 패키지 ID |

---

## 테넌트 리소스 요청

### GET /v1/resource/tenants/resources/request/

테넌트 리소스 요청 목록 조회.

**호출 위치**: `views/tenant/resources/Request.vue:157`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| tnt_rsr_req_id | string | 리소스 요청 ID |
| tnt_id | string | 테넌트 ID |
| req_stat_cd | string | 요청 상태 코드 |
| reg_ts | string | 등록 일시 |

---

### GET /v1/resource/tenants/resources/request/{id}

테넌트 리소스 요청 상세 조회.

**호출 위치**: `views/tenant/ResourceRequestHistoriesDetail.vue:153`, `views/tenant/resources/RequestDetail.vue:291`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 리소스 요청 ID |

---

### POST /v1/resource/tenants/resources/request/

테넌트 리소스 요청 생성.

**호출 위치**: `views/tenant/resources/RequestDetail.vue:315`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tnt_id | string | Y | 테넌트 ID |
| req_capa | number | Y | 요청 용량 |
| req_descp | string | N | 요청 설명 |

---

### PUT /v1/resource/tenants/resources/request/{id}

테넌트 리소스 요청 수정 (승인/반려 포함).

**호출 위치**: `views/tenant/ResourceRequestHistoriesDetail.vue:266`, `views/tenant/resources/RequestDetail.vue:325`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 리소스 요청 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| req_stat_cd | string | N | 요청 상태 코드 (승인/반려) |
| rsn | string | N | 처리 사유 |

---

## 테넌트 네트워크

### GET /v1/resource/tenants/{tntId}/networks

테넌트 네트워크 목록 조회.

**호출 위치**: `components/Modals/Network/NetworkResourceDetail.vue:151`, `views/tenant/resources/ResourceGroupDetail.vue:692`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tntId | string | Y | 테넌트 ID |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| nw_id | string | 네트워크 ID |
| nw_nm | string | 네트워크명 |
| sbn_id | string | 서브넷 ID |

---

### POST /v1/resource/tenants/{tntId}/networks

테넌트 네트워크 등록.

**호출 위치**: `components/Modals/VirtualPc/TenantNetworkCreate.vue:114`, `views/tenant/resources/ResourceGroupDetail.vue:719`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tntId | string | Y | 테넌트 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| nw_id | string | Y | 네트워크 ID |
| sbn_id | string | N | 서브넷 ID |

---

### PUT /v1/resource/tenants/manager/{id}/network

테넌트 네트워크 배정 수정.

**호출 위치**: `views/tenant/IndexDetail.vue:2264`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 테넌트 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| nw_ids | string[] | Y | 배정할 네트워크 ID 목록 |

---

## 테넌트 볼륨/스토리지

### GET /v1/resource/tenants/manager/{tenantId}/volume

테넌트 볼륨 목록 조회.

**호출 위치**: `views/tenant/IndexDetail.vue:1717`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tenantId | string | Y | 테넌트 ID |

---

### PUT /v1/resource/tenants/manager/{id}/volume

테넌트 볼륨 배정 수정.

**호출 위치**: `views/tenant/IndexDetail.vue:2233`, `views/tenant/IndexDetail.vue:2154`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 테넌트 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| volm_typ_ids | string[] | N | 배정할 볼륨 타입 ID 목록 |

---

## 테넌트 호스트

### PUT /v1/resource/tenants/manager/{id}/host

테넌트 호스트 배정.

**호출 위치**: `views/tenant/IndexDetail.vue:2021`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 테넌트 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| host_ids | string[] | Y | 배정할 호스트 ID 목록 |

---

## 테넌트 가용량 (Capacity)

### GET /v1/resource/tenants/{tntId}/capa/platforms

테넌트 플랫폼 가용량 조회.

**호출 위치**: `components/Modals/SystemResource/ServiceGroupAdd.vue:162`, `components/Modals/Tenant/TenantResource.vue:144`, `components/Modals/Tenant/Zone.vue:164`, `views/tenant/resources/ResourceGroupDetail.vue:756`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tntId | string | Y | 테넌트 ID |

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vcpu_psb_cnt | number | Y | vCPU 가용 수 |
| vmm_psb_capa | number | Y | 메모리 가용 용량 (MB) |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| platforms | array | 가용 플랫폼 목록 |
| platforms[].host_id | string | 호스트 ID |
| platforms[].host_nm | string | 호스트명 |
| platforms[].vcpu_avail | number | 가용 vCPU 수 |
| platforms[].vmm_avail | number | 가용 메모리 (MB) |

---

## 도메인

### GET /v1/resource/domains

도메인 목록 조회.

**호출 위치**: `views/systemResource/Domain.vue:148`, `views/initialized/components/Domain/Domain.vue:68`, `views/initialized/index.vue:1067`, `views/initialized/index.vue:1173`

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| dm_id | string | 도메인 ID |
| dm_nm | string | 도메인명 |
| dm_descp | string | 도메인 설명 |

---

### GET /v1/resource/domains/list

도메인 목록 조회 (선택용).

**호출 위치**: `components/Modals/Domain/DomainSearch.vue:140`, `views/initialized/components/Domain/DomainCreate.vue:185`

---

### GET /v1/resource/domains/{id}

도메인 상세 조회.

**호출 위치**: `views/systemResource/DomainDetail.vue:89`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 도메인 ID |

---

### POST /v1/resource/domains

도메인 등록.

**호출 위치**: `views/initialized/components/Domain/DomainCreate.vue:159`, `views/systemResource/DomainDetail.vue:121`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| dm_nm | string | Y | 도메인명 |
| dm_descp | string | N | 도메인 설명 |

---

### DELETE /v1/resource/domains/{id}

도메인 삭제.

**호출 위치**: `views/systemResource/DomainDetail.vue:163`, `views/systemResource/TenantCheck.vue:348`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 도메인 ID |

---

## AD 스크립트

### GET /v1/resource/adscript/detail/{tntId}

AD 스크립트 상세 조회.

**호출 위치**: `views/systemResource/AdScriptManage.vue:133`, `views/service/ExternalLink/ExternalLinkAdLinkage.vue:663`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tntId | string | Y | 테넌트 ID |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| cadno | string | AD 스크립트 번호 |
| tnt_id | string | 테넌트 ID |
| script_content | string | 스크립트 내용 |

---

### PUT /v1/resource/adscript/{cadno}

AD 스크립트 수정.

**호출 위치**: `views/systemResource/AdScriptManage.vue:151`, `views/service/ExternalLink/ExternalLinkAdLinkage.vue:742`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| cadno | string | Y | AD 스크립트 번호 |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| script_content | string | Y | 스크립트 내용 |
| tnt_id | string | Y | 테넌트 ID |

---

## 초기화 (Init)

### GET /v1/resource/init

초기화 상태 조회.

**호출 위치**: `store/modules/init.js:66`

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| init_stat_cd | string | 초기화 상태 코드 |
| is_completed | boolean | 초기화 완료 여부 |

---

### POST /v1/resource/init

초기화 실행.

**호출 위치**: `store/modules/init.js:40`

---

### DELETE /v1/resource/init/auto/delete/{companyNm}

자동 초기화 데이터 삭제.

**호출 위치**: `views/initialized/index.vue:967`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| companyNm | string | Y | 회사명 |

---

### GET /v1/resource/vpcs/pool/auto/{companyNm}

회사명 기준 자동 Pool 조회.

**호출 위치**: `views/initialized/components/Pool/index.vue:59`, `views/initialized/components/DataSet/index.vue:77`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| companyNm | string | Y | 회사명 |

---

## 에러 코드

| HTTP 상태 | 설명 |
|---|---|
| 200 | 정상 처리 |
| 400 | 잘못된 요청 파라미터 |
| 404 | 리소스 없음 |
| 409 | 상태 충돌 (삭제 불가 등) |
| 500 | 서버 오류 |

---

## SA/TA 차이

역할 판별 기준: SA — `userinfo.tnt_id == null || tnt_id == ''` / TA — `userinfo.grp_typ_cd === 'U001TNT'`

### Index.vue — 테넌트 목록

| 구분 | 내용 |
|------|------|
| 공통 | `GET /v1/resource/tenants/manager` |
| SA | 검색 필터 노출, 등록 버튼 노출 |
| TA | 검색 필터 숨김, 등록 버튼 숨김 (UI만 다름, API 동일) |

### IndexDetail.vue — 테넌트 상세/등록

| 구분 | API | 비고 |
|------|-----|------|
| SA 전용 | `GET /v1/resource/tenants/manager/get/license` | 초기화(`init()`) 시 전체 라이선스 총합 조회 |
| 공통 | `GET /v1/resource/tenants/manager/{id}` | 테넌트 상세 조회 |
| 공통 | `DELETE /v1/resource/tenants/manager/{tnt_id}` | 테넌트 삭제 |

SA만 등록·수정·삭제 버튼 노출. TA는 읽기 전용 UI.

### ResourceGroup.vue — 리소스 그룹

| 구분 | API | 비고 |
|------|-----|------|
| 공통 | `GET /v1/resource/tenants/groups` | 테넌트 그룹 목록 |
| TA | 응답 중 `mng_tnt_grp_id` 항목을 `tnt_grp_id`로 고정 | SA는 드롭다운으로 그룹 선택 가능, TA는 자신의 관리 그룹으로 고정 |
| 공통 | `GET /v1/resource/tenants?tnt_grp_id={id}` | 테넌트 목록 |

TA일 때 그룹 선택 드롭다운 숨김 (`grp_typ_cd === 'U001TNT'` 분기).

### TenantGroupDetail.vue — 테넌트 그룹 상세

| 구분 | API | 비고 |
|------|-----|------|
| 공통 | `GET /v1/resource/tenants/groups/{tnt_grp_id}` | 그룹 상세 |
| 공통 | `GET /v1/resource/tenants/groups/licenses` | 전체 라이선스 수 조회 |
| 공통 | `POST /v1/resource/tenants/groups/package` | 신규 등록 |
| 공통 | `PUT /v1/resource/tenants/groups/package` | 수정 |

`isTenantGroup` 플래그(`grp_typ_cd === 'U001TNT'`)는 하위 컴포넌트 prop 전달용이며 API 엔드포인트 자체는 동일.
