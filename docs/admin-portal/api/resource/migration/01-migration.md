# 마이그레이션 / 대피 API

## 사용 화면
- [호스트/마이그레이션/HA](../../화면/시스템%20자원/02-호스트-마이그레이션-HA.md)

## 목차

- [마이그레이션 (Migration)](#마이그레이션-migration)
- [대피 (Evacuate / HA)](#대피-evacuate--ha)

> **참고**: 대피(Evacuate) API는 호스트 기반 HA 기능으로, 상세 내용은 `/hosts/01-hosts.md`에도 기술되어 있다.

---

## 마이그레이션 (Migration)

### GET /v1/resource/vpcs/migration

마이그레이션 목록 조회.

**호출 위치**: `views/systemResource/Migration.vue:206`, `views/systemResource/Migration.vue:225`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| host_id | string | N | 호스트 ID 필터 |
| job_sts_cd | string | N | 작업 상태 코드 |
| src_vm_auth_id | string | N | 원본 VM 인증 ID 필터 |
| sort | string | N | 정렬 기준 필드 |
| sort_type | string | N | ASC / DESC |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| mig_id | string | 마이그레이션 ID |
| src_host_id | string | 원본 호스트 ID |
| src_host_nm | string | 원본 호스트명 |
| src_pfrm_host_id | string | 원본 플랫폼 호스트 ID |
| tgt_host_id | string | 대상 호스트 ID |
| tgt_host_nm | string | 대상 호스트명 |
| tgt_pfrm_host_id | string | 대상 플랫폼 호스트 ID |
| mig_detl | string | 마이그레이션 상세 메시지 |
| job_stt_tm | string | 작업 시작 일시 |
| job_done_tm | string | 작업 완료 일시 |
| job_sts_cd | string | 작업 상태 코드 |
| job_sts_cd_nm | string | 작업 상태명 |
| src_vm_auth_id | string | 원본 VM 인증 ID |
| src_vm_nm | string | 원본 VM명 |
| src_vm_id | string | 원본 VM ID |
| src_vm_state | string | 원본 VM 상태 |
| src_rstr_sts_cd | string | 원본 VM 제한 상태 코드 |
| reg_id | string | 등록자 ID |
| reg_conn_id | string | 등록자 계정 |
| reg_nm | string | 등록자명 |
| reg_ts | string | 등록 일시 |
| mod_id | string | 수정자 ID |
| mod_conn_id | string | 수정자 계정 |
| mod_nm | string | 수정자명 |
| mod_ts | string | 수정 일시 |

---

### GET /v1/resource/vpcs/migration/{id}

마이그레이션 상세 조회.

**호출 위치**: `views/systemResource/MigrationDetail.vue:134`, `views/systemResource/MigrationDetail.vue:152`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 마이그레이션 ID |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| mig_id | string | 마이그레이션 ID |
| src_host_id | string | 원본 호스트 ID |
| src_host_nm | string | 원본 호스트명 |
| src_pfrm_host_id | string | 원본 플랫폼 호스트 ID |
| tgt_host_id | string | 대상 호스트 ID |
| tgt_host_nm | string | 대상 호스트명 |
| tgt_pfrm_host_id | string | 대상 플랫폼 호스트 ID |
| mig_detl | string | 마이그레이션 상세 메시지 |
| job_stt_tm | string | 작업 시작 일시 |
| job_done_tm | string | 작업 완료 일시 |
| job_sts_cd | string | 작업 상태 코드 |
| job_sts_cd_nm | string | 작업 상태명 |
| src_vm_auth_id | string | 원본 VM 인증 ID |
| src_vm_nm | string | 원본 VM명 |
| src_vm_id | string | 원본 VM ID |
| src_vm_state | string | 원본 VM 상태 |
| src_rstr_sts_cd | string | 원본 VM 제한 상태 코드 |
| reg_id | string | 등록자 ID |
| reg_conn_id | string | 등록자 계정 |
| reg_nm | string | 등록자명 |
| reg_ts | string | 등록 일시 |
| mod_id | string | 수정자 ID |
| mod_conn_id | string | 수정자 계정 |
| mod_nm | string | 수정자명 |
| mod_ts | string | 수정 일시 |

---

### POST /v1/resource/vpcs/migration/multi

다중 VM 마이그레이션 실행.

**호출 위치**: `views/systemResource/MigrationCreate.vue:233`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vm_auth_ids | string[] | Y | 마이그레이션 대상 VM 인증 ID 목록 |
| tgt_host_id | string | Y | 대상 호스트 ID |
| live_yn | string | N | 라이브 마이그레이션 여부 (Y/N, 기본: N) |

---

### POST /v1/resource/vpcs/migration/{mig_id}/initial

마이그레이션 초기화 (실패 상태 리셋).

**호출 위치**: `views/systemResource/Migration.vue:252`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| mig_id | string | Y | 마이그레이션 ID |

---

### GET /v1/resource/vpcs/resources (마이그레이션 대상 VM 선택용)

마이그레이션 대상 VM 목록 조회 (URI 재사용).

**호출 위치**: `views/systemResource/MigrationCreate.vue:301` (uri 참조)

> `/v1/resource/vpcs/resources` 공통 엔드포인트를 마이그레이션 대상 VM 선택에 활용함.
> 상세 스펙은 `vpcs/01-vpcs.md`의 [GET /v1/resource/vpcs/resources](#) 참조.

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
| evac_stat_cd | string | 대피 상태 코드 |
| reg_ts | string | 등록 일시 |

---

### POST /v1/resource/evacuate/{host_id}

대피 수동 실행.

**호출 위치**: `store/modules/evacuate.js:45`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| host_id | string | Y | 대피를 실행할 호스트 ID |

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
| host_id | string | 호스트 ID |
| host_nm | string | 호스트명 |
| evac_stat_cd | string | 대피 상태 코드 |
| vm_cnt | number | 대피된 VM 수 |
| reg_ts | string | 등록 일시 |

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
| host_id | string | 호스트 ID |
| host_nm | string | 호스트명 |
| evac_stat_cd | string | 대피 상태 코드 |
| vm_list | array | 대피된 VM 목록 |
| vm_list[].vm_auth_id | string | VM 인증 ID |
| vm_list[].vm_nm | string | VM명 |
| vm_list[].dst_host_id | string | 대피 목적지 호스트 ID |
| vm_list[].evac_result_cd | string | 대피 결과 코드 |

---

## 에러 코드

| HTTP 상태 | 설명 |
|---|---|
| 200 | 정상 처리 |
| 400 | 잘못된 요청 파라미터 |
| 404 | 리소스 없음 |
| 409 | 마이그레이션/대피 진행 중 중복 요청 |
| 500 | 서버 오류 (OpenStack 통신 실패 포함) |
