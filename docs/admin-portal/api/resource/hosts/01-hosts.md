# 호스트 API

## 사용 화면
- [도메인/Zone](../../화면/시스템%20자원/01-도메인-Zone.md)
- [호스트/마이그레이션/HA](../../화면/시스템%20자원/02-호스트-마이그레이션-HA.md)

## 목차

- [호스트 목록/상세 조회](#호스트-목록상세-조회)
- [Zone 관리](#zone-관리)
- [대피 (Evacuate / HA)](#대피-evacuate--ha)

---

## 호스트 목록/상세 조회

### GET /v1/resource/hosts

호스트 목록 조회 (Super Admin).

**호출 위치**: `store/modules/host.js:26`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| host_nm | string | N | 호스트명 검색어 |
| sort | string | N | 정렬 기준 필드 |
| sort_type | string | N | ASC / DESC |

**응답**

배열 형태. OpenStack Hypervisor 정보를 직접 반환 (camelCase).

| 필드 | 타입 | 설명 |
|---|---|---|
| id | string | 호스트 ID (`hostId` → `id`로 JsonGetter 변환) |
| hypervisorHostName | string | 하이퍼바이저 호스트명 |
| hostIp | string | 호스트 IP |
| status | string | 호스트 상태 |
| state | string | 호스트 state |
| availabilityZone | string | 가용 Zone명 |
| vcpus | number | 총 vCPU 수 |
| vcpusUsed | number | 사용 중 vCPU 수 |
| memoryMb | number | 총 메모리 (MB) |
| memoryMbUsed | number | 사용 중 메모리 (MB) |
| localGb | number | 총 로컬 디스크 (GB) |
| localGbUsed | number | 사용 중 로컬 디스크 (GB) |
| freeDiskGb | number | 여유 디스크 (GB) |
| freeRamMb | number | 여유 메모리 (MB) |
| diskAvailableLeast | number | 최소 가용 디스크 (GB) |
| currentWorkload | number | 현재 워크로드 |
| runningVms | number | 실행 중 VM 수 |
| hypervisorType | string | 하이퍼바이저 유형 |
| hypervisorVersion | number | 하이퍼바이저 버전 |
| servers | array | 서버 목록 (null이면 미포함) |
| servers[].name | string | 서버명 |
| servers[].uuid | string | 서버 UUID |

---

### GET /v1/resource/hosts/admin

호스트 목록 조회 (Super Admin 전용).

**호출 위치**: `views/initialized/components/Host/index.vue:68`, `views/systemResource/ZoneCreate.vue:244`, `views/tenant/IndexDetail.vue:2014`, `views/monitoring/virtualpcStatistics/VirtualpcAllotment.vue:590`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| sort | string | N | 정렬 기준 필드 |
| sort_type | string | N | `asc` / `desc` |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| data | array | 호스트 배열 |
| data[].host_id | string | 호스트 ID |
| data[].host_nm | string | 호스트명 |
| data[].host_ip | string | 호스트 IP |
| data[].host_sts_cd | string | 상태 코드 (`P003NOR`: 정상) |
| data[].host_sts_cd_nm | string | 상태명 |
| data[].hyper_typ | string | 하이퍼바이저 유형 |
| data[].vcpu_tot_cnt | string | 총 vCPU 수 |
| data[].vcpu_usg_cnt | string | 사용 중 vCPU 수 |
| data[].mem_tot_capa | string | 총 메모리 (GB) |
| data[].mem_usg_capa | string | 사용 중 메모리 (GB) |
| data[].str_tot_capa | string | 총 스토리지 (GB) |
| data[].str_usg_capa | string | 사용 중 스토리지 (GB) |
| data[].allo_enable_yn | string | 할당 가능 여부 |
| data[].vm_tot_cnt | string | 총 VM 수 |
| data[].vm_usg_cnt | string | 사용 중 VM 수 |
| data[].zone_nm | string | Zone명 |
| data[].pfrm_host_id | string | 플랫폼 호스트 ID |
| data[].host_descp | string | 호스트 설명 |
| data[].reg_id | string | 등록자 ID |
| data[].reg_nm | string | 등록자명 |
| data[].reg_conn_id | string | 등록자 접속 ID |
| data[].reg_ts | string | 등록 일시 |
| data[].mod_id | string | 수정자 ID |
| data[].mod_ts | string | 수정 일시 |
| pageinfo.count | number | 총 건수 |
| pageinfo.ispaging | boolean | 페이징 여부 |

---

### GET /v1/resource/hosts/admin/{id}

호스트 상세 조회 (Super Admin).

**호출 위치**: `views/systemResource/Mixin/host.js:20`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 호스트 ID |

**응답**

DTO는 목록(`/admin`)과 동일한 `HostAdminList` 사용.

| 필드 | 타입 | 설명 |
|---|---|---|
| host_id | string | 호스트 ID |
| host_nm | string | 호스트명 |
| host_ip | string | 호스트 IP |
| host_sts_cd | string | 호스트 상태 코드 |
| host_sts_cd_nm | string | 호스트 상태명 |
| hyper_typ | string | 하이퍼바이저 유형 |
| vcpu_tot_cnt | string | 총 vCPU 수 |
| vcpu_usg_cnt | string | 사용 중 vCPU 수 |
| mem_tot_capa | string | 총 메모리 (GB) |
| mem_usg_capa | string | 사용 중 메모리 (GB) |
| str_tot_capa | string | 총 스토리지 (GB) |
| str_usg_capa | string | 사용 중 스토리지 (GB) |
| allo_enable_yn | string | 할당 가능 여부 |
| vm_tot_cnt | string | 총 VM 수 |
| vm_usg_cnt | string | 사용 중 VM 수 |
| zone_nm | string | Zone명 |
| pfrm_host_id | string | 플랫폼 호스트 ID |
| host_descp | string | 호스트 설명 |
| reg_id | string | 등록자 ID |
| reg_nm | string | 등록자명 |
| reg_conn_id | string | 등록자 접속 ID |
| reg_ts | string | 등록 일시 |
| mod_id | string | 수정자 ID |
| mod_ts | string | 수정 일시 |
| zone_assgn_yn | string | Zone 배정 여부 |
| tnt_id | string | 테넌트 ID |
| tnt_assgn_yn | string | 테넌트 배정 여부 |
| host_grp_nm | string | 호스트 그룹명 |
| ha_auto_mng_yn | string\|null | HA 자동 관리 여부 |
| mod_nm | string\|null | 수정자명 |
| mod_conn_id | string\|null | 수정자 접속 ID |

---

### GET /v1/resource/hosts/tenant

호스트 목록 조회 (Tenant Admin).

**호출 위치**: `store/modules/zone.js:85`, `views/systemResource/ZoneCreate.vue:242`, `views/systemResource/ZoneDetail.vue:240`, `components/Form/SearchFilter.vue:401`, `views/monitoring/TenantVirtualpcStatistics/VirtualpcAllotment.vue:605`

### SA/TA 차이 (Zone 생성 시 호스트 선택)

Zone 생성(`views/systemResource/ZoneCreate.vue`) 화면에서 호스트 선택 모달 호출 시 역할에 따라 엔드포인트가 달라짐.

| 조건 | 동작 |
|------|------|
| SA (tnt_id가 null/빈값) | `GET /v1/resource/hosts/admin` 호출 |
| TA (tnt_id 존재) | `GET /v1/resource/hosts/tenant` 호출 |

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| sort | string | N | 정렬 기준 필드 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

---

### GET /v1/resource/hosts/tenant/{id}

호스트 상세 조회 (Tenant Admin).

**호출 위치**: `views/systemResource/Mixin/host.js:19`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 호스트 ID |

---

### GET /v1/resource/hosts/platforms

플랫폼 호스트 목록 조회.

**호출 위치**: `components/Modals/SystemResource/HostSelectList.vue:118`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

---

## Zone 관리

### GET /v1/resource/zones

Zone 목록 조회.

**호출 위치**: `store/modules/zone.js:39`, `views/initialized/components/Zone/index.vue:67`, `views/tenant/resources/ResourceGroupDetail.vue:382`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| zone_nm | string | N | Zone명 검색어 |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| zone_nm | string | Zone명 |
| zone_descp | string | Zone 설명 |
| tnt_id | string | 테넌트 ID |
| host_grp_id | number | 호스트 그룹 ID |
| host_grp_nm | string | 호스트 그룹명 |
| maint_yn | string | 유지보수 여부 (Y/N) |
| hostIds | string[] | 소속 호스트 ID 배열 |
| hostNames | string[] | 소속 호스트명 배열 |
| public_zone_yn | string | Public Zone 여부 (Y/N) |
| hosts | array | 소속 호스트 목록 |
| hosts[].host_id | string | 호스트 ID |
| hosts[].host_nm | string | 호스트명 |
| reg_id | string | 등록자 ID |
| reg_ts | string | 등록 일시 |
| reg_nm | string | 등록자명 |
| reg_conn_id | string | 등록자 접속 ID |
| mod_id | string | 수정자 ID |
| mod_ts | string | 수정 일시 |

---

### GET /v1/resource/zones/{zoneNm}

Zone 상세 조회.

**호출 위치**: `store/modules/zone.js:65`, `components/Modals/Tenant/AvailabilityZone.vue:198`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| zoneNm | string | Y | Zone명 |

**응답**

Zone 목록과 동일한 `Zone` DTO 사용.

| 필드 | 타입 | 설명 |
|---|---|---|
| zone_nm | string | Zone명 |
| zone_descp | string | Zone 설명 |
| tnt_id | string | 테넌트 ID |
| host_grp_id | number | 호스트 그룹 ID |
| host_grp_nm | string | 호스트 그룹명 |
| maint_yn | string | 유지보수 여부 (Y/N) |
| hostIds | string[] | 소속 호스트 ID 배열 |
| hostNames | string[] | 소속 호스트명 배열 |
| public_zone_yn | string | Public Zone 여부 (Y/N) |
| hosts | array | 소속 호스트 목록 |
| hosts[].host_id | string | 호스트 ID |
| hosts[].host_nm | string | 호스트명 |
| reg_id | string | 등록자 ID |
| reg_ts | string | 등록 일시 |
| reg_nm | string | 등록자명 |
| reg_conn_id | string | 등록자 접속 ID |
| mod_id | string | 수정자 ID |
| mod_ts | string | 수정 일시 |

---

### GET /v1/resource/zones/list

Zone 목록 조회 (선택용).

**호출 위치**: `views/tenant/IndexDetail.vue:2099`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tnt_id | string | N | 테넌트 ID 필터 |

---

### GET /v1/resource/zones/list?tnt_id={tntId}

테넌트 Zone 목록 조회.

**호출 위치**: `components/Form/SearchFilter.vue:378`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tnt_id | string | Y | 테넌트 ID |

---

### GET /v1/resource/zones/platforms

플랫폼 Zone 목록 조회.

**호출 위치**: `components/Modals/Zone/ZoneSearch.vue:133`

---

### POST /v1/resource/zones

Zone 생성.

**호출 위치**: `store/modules/zone.js:110`, `components/Modals/Tenant/AvailabilityZone.vue:297`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| zone_nm | string | Y | Zone명 |
| zone_descp | string | N | Zone 설명 |
| tnt_id | string | N | 테넌트 ID |
| host_grp_id | string | N | 호스트 그룹 ID |

---

### PUT /v1/resource/zones/{zoneNm}

Zone 수정.

**호출 위치**: `store/modules/zone.js:128`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| zoneNm | string | Y | Zone명 |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| zone_descp | string | N | Zone 설명 |
| host_grp_id | string | N | 호스트 그룹 ID |

---

### DELETE /v1/resource/zones/{zoneNm}

Zone 삭제.

**호출 위치**: `store/modules/zone.js:152`, `components/Modals/Tenant/AvailabilityZone.vue:263`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| zoneNm | string | Y | Zone명 |

---

### PUT /v1/resource/zones/addHost

Zone에 호스트 추가.

**호출 위치**: `store/modules/zone.js:198`, `components/Modals/Tenant/AvailabilityZone.vue:306`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| zone_nm | string | Y | Zone명 |
| host_id | string | Y | 추가할 호스트 ID |

---

### PUT /v1/resource/zones/removeHost

Zone에서 호스트 제거.

**호출 위치**: `store/modules/zone.js:175`, `components/Modals/Tenant/AvailabilityZone.vue:233`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| zone_nm | string | Y | Zone명 |
| host_id | string | Y | 제거할 호스트 ID |

---

### PUT /v1/resource/zones/update_maint

Zone 유지보수 상태 변경.

**호출 위치**: `components/Modals/Tenant/AvailabilityZone.vue:332`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| zone_nm | string | Y | Zone명 |
| maint_yn | string | Y | 유지보수 여부 (Y/N) |

---

## 대피 (Evacuate / HA)

### GET /v1/resource/evacuate

대피(HA) 호스트 목록 조회.

**호출 위치**: `store/modules/evacuate.js:39`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| host_nm | string | N | 호스트명 검색어 |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| host_id | string | 호스트 ID |
| host_nm | string | 호스트명 |
| pfrm_host_id | string | 플랫폼 호스트 ID |
| host_ip | string | 호스트 IP |
| host_sts_cd | string | 호스트 상태 코드 |
| host_sts_cd_nm | string | 호스트 상태명 |
| host_descp | string | 호스트 설명 |
| hyper_typ | string | 하이퍼바이저 유형 |
| ha_auto_mng_yn | string | HA 자동화 여부 (Y/N) |
| evac_sts_cd | string | 대피 상태 코드 |
| evac_sts_cd_nm | string | 대피 상태명 |
| tnt_id | string | 테넌트 ID |
| dng_sts_tm | string | 위험 상태 일시 |
| evac_grp_id | string | 대피 그룹 ID |

---

### POST /v1/resource/evacuate/{host_id}

대피 수동 실행.

**호출 위치**: `store/modules/evacuate.js:45`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| host_id | string | Y | 호스트 ID |

---

### GET /v1/resource/evacuate/history

대피 이력 목록 조회.

**호출 위치**: `store/modules/evacuate.js:58`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| host_id | string | N | 호스트 ID 필터 |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| evac_grp_id | string | 대피 그룹 ID |
| host_nm | string | 호스트명 |
| evac_sts_cd | string | 대피 상태 코드 |
| evac_sts_cd_nm | string | 대피 상태명 |
| tgt_vm_cnt | number | 대피 대상 VM 수 |
| act_vm_cnt | number | 대피 실행 VM 수 |
| auto_mng_yn | string | 자동 관리 여부 (Y/N) |
| evac_stt_ts | string | 대피 시작 일시 |
| evac_done_ts | string | 대피 완료 일시 |

---

### GET /v1/resource/evacuate/history/{evacGrpId}

대피 이력 상세 조회.

**호출 위치**: `views/systemResource/Modal/haHistoryLookup.vue:126`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| evacGrpId | string | Y | 대피 그룹 ID |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| evac_grp_id | string | 대피 그룹 ID |
| host_nm | string | 호스트명 |
| vmList | array | 대피 대상 VM 목록 |
| vmList[].evac_job_no | string | 대피 작업 번호 |
| vmList[].evac_grp_id | string | 대피 그룹 ID |
| vmList[].tgt_host_nm | string | 대상 호스트명 |
| vmList[].src_host_nm | string | 소스 호스트명 |
| vmList[].tgt_vm_id | string | 대상 VM ID |
| vmList[].tgt_vm_nm | string | 대상 VM명 |
| vmList[].evac_vm_sts_cd | string | 대피 VM 상태 코드 |
| vmList[].evac_vm_sts_cd_nm | string | 대피 VM 상태명 |
| vmList[].vm_power_sts_cd | string | VM 전원 상태 코드 |
| vmList[].vm_power_sts_cd_nm | string | VM 전원 상태명 |
| vmList[].job_rslt_val | string | 작업 결과 값 |
| vmList[].job_rslt_detl | string | 작업 결과 상세 |
| vmList[].reg_ts | string | 등록 일시 |
| vmList[].mod_ts | string | 수정 일시 |

---

## 에러 코드

| HTTP 상태 | 설명 |
|---|---|
| 200 | 정상 처리 |
| 400 | 잘못된 요청 파라미터 |
| 404 | 리소스 없음 |
| 500 | 서버 오류 |
