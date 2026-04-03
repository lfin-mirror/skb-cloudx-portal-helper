# 템플릿 / 이미지 / 플레이버 API

## 사용 화면
- [템플릿](../../화면/템플릿/01-템플릿.md)
- [시스템 설정](../../화면/관리자/02-시스템%20설정.md)

## 목차

- [템플릿](#템플릿)
- [골든 이미지](#골든-이미지)
- [플레이버 (가상 PC 사양)](#플레이버-가상-pc-사양)
- [프록시](#프록시)
- [소프트웨어 버전](#소프트웨어-버전)

---

## 템플릿

### GET /v1/resource/template

템플릿 목록 조회.

**호출 위치**: `views/template/Index.vue:132`, `views/virtualPc/mixins/virtualPcGroup.js:551`, `components/Modals/Template/TemplateSearch.vue:206`, `components/Modals/Tenant/TemplateSetting.vue:176`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| temp_nm | string | N | 템플릿명 검색어 |
| sort | string | N | 정렬 기준 필드 |
| sort_type | string | N | ASC / DESC |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| temp_id | string | 템플릿 ID |
| temp_nm | string | 템플릿명 |
| os_typ_cd | string | OS 유형 코드 (`T002W64`, `T002L32` 등) |
| os_typ_cd_nm | string | OS 유형명 |
| vcpu_cnt | number | vCPU 수 |
| vmm_capa | number | 메모리 용량 (MB) |
| vhd_capa | number | 디스크 용량 (GB) |
| img_id | string | 이미지 ID |
| img_nm | string | 이미지명 |
| sw_count | number | 설치 SW 수 |
| reg_conn_id | string | 등록자 로그인 ID |
| reg_nm | string\|null | 등록자명 |
| reg_ts | string | 등록 일시 |

---

### GET /v1/resource/template/{id}

템플릿 상세 조회.

**호출 위치**: `store/modules/virtualPc.js:181`, `store/modules/virtualPc.js:330`, `views/template/IndexDetail.vue:291`, `components/Modals/Tenant/TemplateDetail.vue:121`, `views/virtualPc/components/VirtualPcAssignment.vue:903`, `views/virtualPc/components/VirtualPcRecovery.vue:195`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 템플릿 ID |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| temp_id | string | 템플릿 ID |
| temp_nm | string | 템플릿명 |
| descp | string | 템플릿 설명 |
| img_id | string | 이미지 ID |
| img_nm | string | 이미지명 |
| os_typ_cd_nm | string | OS 타입명 (os_typ_cd는 상세 응답에 포함되지 않음) |
| img_ad_itlk_usg_yn | string | 이미지 AD 연동 여부 |
| img_sw_l | array | 이미지 SW 목록 (hidden=true, 직렬화 포함) |
| sw_count | number | SW 수 |
| flavor_id | string | 플레이버 ID |
| flavor_bas_yn | string | 플레이버 기본 여부 (hidden=true) |
| bas_temp_yn | string | 기본 템플릿 여부 (Y/N) |
| flavor_m | object | 플레이버 정보 |
| flavor_m.flavor_id | string | 플레이버 ID |
| flavor_m.flavor_nm | string | 플레이버명 |
| flavor_m.vcpu_cnt | number | vCPU 수 |
| flavor_m.vmm_capa | number | 메모리 용량 (MB) |
| flavor_m.vhd_capa | number | 디스크 용량 (GB) |
| flavor_m.flavor_descp | string | 플레이버 설명 |
| flavor_m.flavor_bas_yn | string | 플레이버 기본 여부 |
| flavor_m.tpm_yn | string | TPM 여부 |
| flavor_m.reg_conn_id | string | 플레이버 등록자 접속 ID |
| flavor_m.reg_ts | string | 플레이버 등록 일시 |
| flavor_m.mod_conn_id | string | 플레이버 수정자 접속 ID |
| flavor_m.mod_ts | string | 플레이버 수정 일시 |
| flavor_m.tnt_id | string\|null | 플레이버 테넌트 ID |
| reg_id | string | 등록자 ID |
| reg_nm | string | 등록자명 |
| reg_conn_id | string | 등록자 접속 ID |
| reg_ts | string | 등록 일시 |
| mod_id | string | 수정자 ID |
| mod_ts | string | 수정 일시 |
| mod_conn_id | string | 수정자 접속 ID |
| mod_nm | string | 수정자명 |
| in_tnt_id | string\|null | 포함 테넌트 ID |
| not_in_tnt_id | string\|null | 제외 테넌트 ID |
| tnt_id | string\|null | 테넌트 ID |

---

### POST /v1/resource/template

템플릿 등록.

**호출 위치**: `views/template/IndexDetail.vue:407`, `views/virtualPc/mixins/virtualPcGroup.js:608`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| temp_nm | string | Y | 템플릿명 |
| img_id | string | Y | 이미지 ID |
| flavor_id | string | Y | 플레이버 ID |
| temp_descp | string | N | 템플릿 설명 |

---

### PUT /v1/resource/template/{id}

템플릿 수정.

**호출 위치**: `views/template/IndexDetail.vue:376`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 템플릿 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| temp_nm | string | N | 템플릿명 |
| img_id | string | N | 이미지 ID |
| flavor_id | string | N | 플레이버 ID |
| temp_descp | string | N | 템플릿 설명 |
| bas_temp_yn | string | N | 기본 템플릿 여부 (Y/N) |

### SA/TA 차이

| 조건 | 동작 |
|------|------|
| SA (grp_typ_cd === 'U001SUP') | `bas_temp_yn: 'Y'` 전송 |
| TA (grp_typ_cd === 'U001TNT') | `bas_temp_yn: 'N'` 전송 |

---

### DELETE /v1/resource/template/{id}

템플릿 삭제.

**호출 위치**: `views/template/IndexDetail.vue:453`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 템플릿 ID |

---

### PUT /v1/resource/template/{tempId}/addFlavor

템플릿에 플레이버 추가.

**호출 위치**: `components/Modals/VirtualPc/VirtualPcSpec.vue:218`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tempId | string | Y | 템플릿 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| flavor_id | string | Y | 플레이버 ID |

---

### PUT /v1/resource/template/{tempId}/addImage

템플릿에 이미지 추가.

**호출 위치**: `components/Modals/Template/GoldenImage.vue:215`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tempId | string | Y | 템플릿 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| img_id | string | Y | 이미지 ID |

---

### GET /v1/resource/vpcs/pool/{poolId}/template/history

풀 템플릿 변경 이력 조회.

**호출 위치**: `views/virtualPc/mixins/virtualPcGroup.js:669`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| poolId | string | Y | 풀 ID |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| temp_id | string | 템플릿 ID |
| temp_nm | string | 템플릿명 |
| chg_ts | string | 변경 일시 |

---

### GET /v1/resource/tenants/{tntId}/temps

테넌트 템플릿 목록 조회.

**호출 위치**: `components/Modals/Template/TemplateSearch.vue:243`, `views/tenant/resources/ResourceGroupDetail.vue:795`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tntId | string | Y | 테넌트 ID |

---

### POST /v1/resource/tenants/manager/{tntId}/template

테넌트 관리자용 템플릿 배정.

**호출 위치**: `components/Modals/Tenant/TemplateSetting.vue:235`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tntId | string | Y | 테넌트 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| temp_ids | string[] | Y | 배정할 템플릿 ID 목록 |

---

---

## 골든 이미지

### GET /v1/resource/images

골든 이미지 목록 조회.

**호출 위치**: `views/template/goldenImage/GoldenImage.vue:105`, `components/Modals/Template/GoldenImage.vue:187`, `views/initialized/components/Image/index.vue:69`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| img_nm | string | N | 이미지명 검색어 |
| sort | string | N | 정렬 기준 필드 |
| sort_type | string | N | ASC / DESC |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| img_id | string | 이미지 ID |
| img_nm | string | 이미지명 |
| img_stat_cd | string | 이미지 상태 코드 |
| os_typ_cd | string | OS 타입 코드 |
| os_typ_cd_nm | string | OS 타입명 |
| cre_ts | string | 생성 일시 |

---

### GET /v1/resource/images/{id}

골든 이미지 상세 조회.

**호출 위치**: `views/template/goldenImage/GoldenImageDetail.vue:242`, `components/Modals/Template/GoldenImage.vue:213`, `views/template/IndexDetail.vue:318`, `views/template/goldenImage/GoldenImageCreateInstance.vue:288`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 이미지 ID |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| img_id | string | 이미지 ID |
| img_nm | string | 이미지명 |
| img_stat_cd | string | 이미지 상태 코드 |
| os_typ_cd | string | OS 타입 코드 |
| img_size | number | 이미지 크기 |
| cre_ts | string | 생성 일시 |

---

### PUT /v1/resource/images/{id}

골든 이미지 정보 수정.

**호출 위치**: `views/template/goldenImage/GoldenImageDetail.vue:313`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 이미지 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| img_nm | string | N | 이미지명 |
| img_descp | string | N | 이미지 설명 |

---

### DELETE /v1/resource/images/{id}

골든 이미지 삭제.

**호출 위치**: `views/template/goldenImage/GoldenImageDetail.vue:338`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 이미지 ID |

**Request Body (data)**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| (옵션) | object | N | 삭제 사유 등 |

---

### GET /v1/resource/images/vpc

골든이미지 생성 대기 VPC 목록 조회.

**호출 위치**: `views/template/goldenImage/GoldenImageCreate.vue:412`, `views/template/goldenImage/GoldenImageCreate.vue:431`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_pool_id | string | N | 풀 ID 필터 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

---

### GET /v1/resource/images/vm/{id}

이미지 VM 상태 확인.

**호출 위치**: `views/template/goldenImage/GoldenImageCreateInstanceCheck.vue:144`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | VM 또는 이미지 ID |

---

### GET /v1/resource/images/status/{imgId}

이미지 상태 조회.

**호출 위치**: `views/template/goldenImage/GoldenImageCreate.vue:397`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| imgId | string | Y | 이미지 ID |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| img_stat_cd | string | 이미지 상태 코드 |
| progress | number | 진행률 (0-100) |

---

### POST /v1/resource/images/create_vm

골든이미지 VM 생성.

**호출 위치**: `views/template/goldenImage/GoldenImageCreateInstance.vue:320`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| img_id | string | Y | 이미지 ID |
| vm_pool_id | string | Y | 풀 ID |
| sbn_id | string | N | 서브넷 ID |

---

### POST /v1/resource/images/convert

이미지 변환 (골든이미지로 전환).

**호출 위치**: `views/template/goldenImage/modal/GoldenImageConvert.vue:102`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_auth_id | string | Y | 변환 대상 VM 인증 ID |
| img_nm | string | Y | 생성할 이미지명 |

---

### POST /v1/resource/images/vm_convert

VM 이미지 변환.

**호출 위치**: `views/virtualPc/modals/VirtualPcGoldenImageModal.vue:81`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_auth_id | string | Y | VM 인증 ID |
| img_nm | string | Y | 이미지명 |

---

### PUT /v1/resource/images/clear/{imgId}

이미지 초기화 (락 해제).

**호출 위치**: `views/template/goldenImage/GoldenImageCreate.vue:337`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| imgId | string | Y | 이미지 ID |

---

### DELETE /v1/resource/images/delete/{imgId}

이미지 삭제 (소프트 삭제).

**호출 위치**: `views/template/goldenImage/GoldenImageCreate.vue:351`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| imgId | string | Y | 이미지 ID |

---

### DELETE /v1/resource/images/delete_vm/{imgId}

이미지 VM 삭제.

**호출 위치**: `views/template/goldenImage/modal/ResourceRecall.vue:80`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| imgId | string | Y | 이미지 ID |

---

### PUT /v1/resource/images/{imgId}/power_on

이미지 VM 전원 켜기.

**호출 위치**: `views/template/goldenImage/GoldenImageCreate.vue:372`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| imgId | string | Y | 이미지 ID |

---

### PUT /v1/resource/images/{imgId}/power_off

이미지 VM 전원 끄기.

**호출 위치**: `views/template/goldenImage/GoldenImageCreate.vue:384`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| imgId | string | Y | 이미지 ID |

---

## 플레이버 (가상 PC 사양)

### GET /v1/resource/flavors

플레이버 목록 조회.

**호출 위치**: `views/template/VirtualSpec.vue:112`, `components/Modals/VirtualPc/VirtualPcSpec.vue:178`, `views/initialized/components/Flavor/index.vue:70`, `views/monitoring/virtualpcStatistics/VirtualpcAllotment.vue:520`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| flavor_nm | string | N | 플레이버명 검색어 |
| sort | string | N | 정렬 기준 필드 |
| sort_type | string | N | ASC / DESC |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| flavor_id | string | 플레이버 ID |
| flavor_nm | string | 플레이버명 |
| vcpu_cnt | number | vCPU 수 |
| vmm_capa | number | 메모리 용량 (MB) |
| vhd_capa | number | 디스크 용량 (GB) |
| flavor_descp | string | 플레이버 설명 |
| flavor_bas_yn | string | 기본 플레이버 여부 (Y/N) |
| tpm_yn | string | TPM 여부 |
| reg_conn_id | string | 등록자 접속 ID |
| reg_ts | string | 등록 일시 |
| mod_conn_id | string | 수정자 접속 ID |
| mod_ts | string | 수정 일시 |
| tnt_id | string | 테넌트 ID |

---

### GET /v1/resource/flavors/{flavorId}

플레이버 상세 조회.

**호출 위치**: `store/modules/virtualPcGroup.js:166`, `views/template/VirtualSpecDetail.vue:301`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| flavorId | string | Y | 플레이버 ID |

**응답**

목록과 동일한 `Spec` DTO 사용.

| 필드 | 타입 | 설명 |
|---|---|---|
| flavor_id | string | 플레이버 ID |
| flavor_nm | string | 플레이버명 |
| vcpu_cnt | number | vCPU 수 |
| vmm_capa | number | 메모리 용량 (MB) — 단위 치환 적용 |
| vhd_capa | number | 디스크 용량 (GB) |
| flavor_descp | string | 플레이버 설명 |
| flavor_bas_yn | string | 기본 플레이버 여부 (Y/N) |
| tpm_yn | string | TPM 여부 |
| reg_conn_id | string | 등록자 접속 ID |
| reg_ts | string | 등록 일시 |
| mod_conn_id | string | 수정자 접속 ID |
| mod_ts | string | 수정 일시 |
| tnt_id | string | 테넌트 ID |

---

### GET /v1/resource/flavors/list/tenant

테넌트용 스케일업 가능 플레이버 목록 조회.

**호출 위치**: `store/modules/virtualPcGroup.js:182`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| scaleup_flavor_id | string | Y | 기준 플레이버 ID (현재 사양 이상만 반환) |

**응답**

배열 형태 (flavorId 이상 사양의 플레이버 목록).

---

### POST /v1/resource/flavors

플레이버 등록.

**호출 위치**: `views/template/VirtualSpecDetail.vue:355`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| flavor_nm | string | Y | 플레이버명 |
| vcpu_cnt | number | Y | vCPU 수 |
| vmm_capa | number | Y | 메모리 용량 (MB) |
| vhd_capa | number | Y | 디스크 용량 (GB) |

---

### PUT /v1/resource/flavors/{flavorId}

플레이버 수정.

**호출 위치**: `views/template/VirtualSpecDetail.vue:332`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| flavorId | string | Y | 플레이버 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| flavor_nm | string | N | 플레이버명 |
| vcpu_cnt | number | N | vCPU 수 |
| vmm_capa | number | N | 메모리 용량 (MB) |
| vhd_capa | number | N | 디스크 용량 (GB) |

---

### DELETE /v1/resource/flavors/{flavorId}

플레이버 삭제.

**호출 위치**: `views/template/VirtualSpecDetail.vue:393`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| flavorId | string | Y | 플레이버 ID |

---

## 프록시

### GET /v1/resource/proxy/L4/{path}

L4 포워드 프록시 목록 조회.

**호출 위치**: `views/systemResource/proxy/ForwardProxy.vue:194`, `views/initialized/components/Proxy/index.vue:100`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| path | string | Y | 조회 경로 (`admin` 또는 `tenant`) |

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| data | array | 프록시 배열 |
| data[].proxy_id | string | 프록시 ID |
| data[].proxy_nm | string | 프록시명 |
| data[].sts_cd | string | 상태 코드 (`P013NOR`: 정상) |
| data[].sts_cd_nm | string | 상태명 |
| data[].service_ip | string | 서비스 IP |
| data[].service_min_port | string | 서비스 포트 범위 시작 |
| data[].service_max_port | string | 서비스 포트 범위 끝 |
| data[].tnt_id | string | 테넌트 ID |
| data[].tnt_nm | string | 테넌트명 |
| data[].reg_ts | string | 등록 일시 |
| pageinfo.count | string | 총 건수 |
| pageinfo.ispaging | string | 페이징 여부 |

### SA/TA 차이

| 조건 | 동작 |
|------|------|
| SA (tnt_id가 null/빈값) | `GET /v1/resource/proxy/L4/admin` 호출 |
| TA (tnt_id 존재) | `GET /v1/resource/proxy/L4/tenant` 호출 |

---

### GET /v1/resource/proxy/L7/{path}

L7 리버스 프록시 목록 조회.

**호출 위치**: `views/systemResource/proxy/ReverseProxy.vue:198`, `views/initialized/components/Proxy/index.vue:110`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| path | string | Y | 조회 경로 (`admin` 또는 `tenant`) |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| data | array | 프록시 배열 |
| data[].proxy_id | string | 프록시 ID |
| data[].proxy_nm | string | 프록시명 |
| data[].sts_cd | string | 상태 코드 (`P013NOR`: 정상) |
| data[].sts_cd_nm | string | 상태명 |
| data[].service_ip | string | 서비스 IP |
| data[].service_port | string | 서비스 포트 |
| data[].max_conn_limit | string | 최대 연결 수 |
| data[].usg_conn_cnt | string | 사용 중 연결 수 |
| data[].tnt_id | string | 테넌트 ID |
| data[].tnt_nm | string | 테넌트명 |
| data[].reg_ts | string | 등록 일시 |
| pageinfo.count | string | 총 건수 |
| pageinfo.ispaging | string | 페이징 여부 |

### SA/TA 차이

| 조건 | 동작 |
|------|------|
| SA (tnt_id가 null/빈값) | `GET /v1/resource/proxy/L7/admin` 호출 |
| TA (tnt_id 존재) | `GET /v1/resource/proxy/L7/tenant` 호출 |

---

### GET /v1/resource/proxy/assign

프록시 배정 정보 조회.

**호출 위치**: `components/Modals/Policy/VirtualPcPolicySetting.vue:837`, `components/Modals/Policy/VirtualPcPolicySettingFor.vue:860`, `views/policy/VirtualPcAuthPolicySupadm.vue:831`, `views/policy/VirtualPcNetworkPolicy.vue:722`

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| proxy_id | string | 프록시 ID |
| proxy_ip | string | 프록시 IP |
| proxy_port | number | 프록시 포트 |

---

## 소프트웨어 버전

### GET /v1/resource/platform/software

소프트웨어 버전 정보 조회.

**호출 위치**: `views/adminSetting/SwVersion.vue:79`

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| sw_nm | string | 소프트웨어 대분류명 (예: CloudX Portal, Microservice, Agent, Infrastructure) |
| sub_sw_nm | string | 소프트웨어 세부명 |
| ver | string | 버전 (예: v.2.2.9) |

---

## 에러 코드

| HTTP 상태 | 설명 |
|---|---|
| 200 | 정상 처리 |
| 400 | 잘못된 요청 파라미터 |
| 404 | 리소스 없음 |
| 409 | 이미 사용 중인 템플릿/이미지/플레이버 |
| 500 | 서버 오류 |
