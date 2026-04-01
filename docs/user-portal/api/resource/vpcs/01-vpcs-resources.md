# VPC 리소스 API

## GET `/v1/resource/vpcs/resources`

현재 사용자에게 할당된 VPC 목록을 반환한다.

### 요청

Query Parameter 없음. 사용자 인증 토큰에서 사용자 식별.

### 응답

배열 (array of object)

| 필드 | 타입 | 설명 |
|------|------|------|
| vm_auth_id | string | VM 인가 ID |
| vm_nm | string | VM 이름 (Cloud PC ID) |
| vm_als | string | VM 별칭 |
| tnt_mtd_cd | string | 테넌트 방식 코드 (`V001DED`: 전용, `V001POO`: 공용) |
| tnt_mtd_cd_nm | string | 테넌트 방식 코드명 |
| vm_allo_sts_cd | string | VM 할당 상태 코드 (`U017DVA`: 할당됨 등) |
| vm_power_sts_cd | string | 전원 상태 코드 (`V002ONC`: 켜짐, `V002OFC`: 꺼짐 등) |
| vm_allo_typ_static_ip_yn | string | 정적 IP 여부 (`Y`/`N`) |
| acct_id | string | 계정 ID |
| usr_grp_id | string | 사용자 그룹 ID |
| tgt_vm_auth_id | string | 대상 VM 인가 ID |
| vm_id | string | VM ID |
| flavor_id | string | 플래버 ID |
| vcpu_cnt | number | vCPU 수 |
| vmm_capa | number | 메모리 용량 (MB) |
| vhd_capa | number | HDD 용량 (GB) |

### 호출 위치

- `views/vPcInfo/SnapshotRecovery.vue:241` — 드롭다운 Cloud PC 목록
- `views/vPcInfo/SelfFailover.vue:129` — 초기화 대상 PC 목록 조회
- `views/vPcInfo/SelffailoverReq.vue:153` — 초기화 팝업 PC 목록
- `views/vPcInfo/VPcReturnReq.vue:169` — 반납 팝업 PC 목록
- `views/vPcInfo/VPcReqList.vue:274` — 신청 전 현재 VM 수 확인

---

## GET `/v1/resource/vpcs/resources/{vmAuthId}`

특정 VPC의 상세 정보를 반환한다. 스냅샷 복원 전 전원 상태 확인에 사용된다.

### 요청

**Path Parameters**

| 필드 | 타입 | 설명 |
|------|------|------|
| vmAuthId | string | VM 인가 ID |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| vm_power_sts_cd | string | 전원 상태 코드 (`V002OFC`: 꺼짐, `V002ONC`: 켜짐, `V002CRR`: 오류복구중, `V002ERC`: 장애, `V002CRU`: OS업그레이드중) |
| vm_allo_typ_static_ip_yn | string | 정적 IP 여부 (`Y`/`N`) |

### 호출 위치

- `views/vPcInfo/SnapshotRecovery.vue:342` — 스냅샷 복원 전 전원 상태 확인
- `views/vPcInfo/SelffailoverReq.vue:192` — 초기화 실행 전 전원 상태 확인

---

## POST `/v1/resource/vpcs/resources/{vmAuthId}/start`

VPC 전원 ON.

### 요청

**Path Parameters**

| 필드 | 타입 | 설명 |
|------|------|------|
| vmAuthId | string | VM 인가 ID |

**Body**

없음 (빈 객체 `{}` 전송).

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| (object) | object | 성공 시 non-null 응답 객체. 내용은 사용하지 않고 null 여부만 확인. |
| error.code | string | 오류 코드 (`RESOURCE-4000`: 공용 PC 모두 사용중) |

### 호출 위치

- `views/home/components/VpcInfo.vue:899` — 전원 ON 처리 (`handlerConfirm`)

---

## POST `/v1/resource/vpcs/resources/{vmAuthId}/stop`

VPC 전원 OFF.

### 요청

**Path Parameters**

| 필드 | 타입 | 설명 |
|------|------|------|
| vmAuthId | string | VM 인가 ID |

**Body**

없음 (빈 객체 `{}` 전송).

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| (object) | object | 성공 시 non-null 응답 객체. 내용은 사용하지 않고 null 여부만 확인. |

### 호출 위치

- `views/home/components/VpcInfo.vue:856` — 전원 OFF 처리 (`handlerConfirm`)

---

## POST `/v1/resource/vpcs/resources/{vmAuthId}/restart`

VPC 재시작.

### 요청

**Path Parameters**

| 필드 | 타입 | 설명 |
|------|------|------|
| vmAuthId | string | VM 인가 ID |

**Body**

없음 (빈 객체 `{}` 전송).

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| (object) | object | 성공 시 non-null 응답 객체. 내용은 사용하지 않고 null 여부만 확인. |

### 호출 위치

- `views/home/components/VpcInfo.vue:965` — 재시작 처리 (`handlerReboot`)

---

## POST `/v1/resource/vpcs/resources/{vmAuthId}/recovery`

Self-failover 오류 복구 (정적 IP 할당 VM용). 전원이 켜진 상태에서 강제 종료 후 복구하거나, 꺼진 상태에서 바로 복구한다.

### 요청

**Path Parameters**

| 필드 | 타입 | 설명 |
|------|------|------|
| vmAuthId | string | VM 인가 ID |

**Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| user_workset_yn | string | Y | 사용자 워크셋 여부. 항상 `"Y"` |

### 응답

성공/실패 여부만 확인 (HTTP 상태 코드 기준).

### 호출 위치

- `views/vPcInfo/SelffailoverReq.vue:242` — `vm_allo_typ_static_ip_yn === 'Y'`인 경우 호출

---

## POST `/v1/resource/vpcs/resources/{vmAuthId}/initial`

Self-failover 초기화 (동적 IP 할당 VM용).

### 요청

**Path Parameters**

| 필드 | 타입 | 설명 |
|------|------|------|
| vmAuthId | string | VM 인가 ID |

**Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| user_workset_yn | string | Y | 사용자 워크셋 여부. 항상 `"Y"` |

### 응답

성공/실패 여부만 확인 (HTTP 상태 코드 기준).

### 호출 위치

- `views/vPcInfo/SelffailoverReq.vue:244` — `vm_allo_typ_static_ip_yn !== 'Y'`인 경우 호출

---

## PUT `/v1/resource/vpcs/resources/{vmAuthId}/user`

VM 별칭 수정 또는 목록 정렬 순서 변경.

### 요청

**Path Parameters**

| 필드 | 타입 | 설명 |
|------|------|------|
| vmAuthId | string | VM 인가 ID |

**Body** (별칭 수정 시)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| vm_als | string | Y | 변경할 별칭. 최대 20자. 공백 trim 처리. |

**Body** (순서 변경 시)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| sort_ord | number | Y | 변경 후 인덱스 (0-based) |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| vm_als | string | 저장된 별칭 (별칭 수정 시 사용) |

### 호출 위치

- `views/home/components/VPcNameEditPopup.vue:213` — 별칭 저장
- `views/home/components/VPcNameEditPopup.vue:259` — 드래그 순서 변경

---

## GET `/v1/resource/vpcs/auto/mapping/user/pool/list`

즉시 할당 가능한 VM Pool 목록 조회.

### 요청

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_mtd_cd | string | Y | 테넌트 방식 코드 (`V001DED`: 전용) |
| auto_allo_yn | string | Y | 자동 할당 여부. 항상 `"Y"` |

### 응답

배열 (array of object)

| 필드 | 타입 | 설명 |
|------|------|------|
| vm_pool_id | string | Pool ID |
| vm_pool_nm | string | Pool 이름 |
| vcpu_cnt | number | vCPU 수 |
| vmm_capa | number | 메모리 용량 (MB). UI에서 `/1024`하여 GB로 표시. |
| os_name | string | OS 이름 |

### 호출 위치

- `views/vPcInfo/VPcReq.vue:431` — 즉시 할당 선택 시 Pool 목록 로드

---

## POST `/v1/resource/vpcs/resources/vm_auto_assign`

즉시 할당 방식으로 VM 자동 배정 신청.

### 요청

**Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| vm_pool_id | string | Y | 선택한 Pool ID |
| vm_vlid_stt_dt | string | Y | 유효 시작일 (`YYYYMMDD`) |
| vm_vlid_end_dt | string | Y | 유효 종료일. 항상 `"29990101"` |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| errCode | string | 오류 코드 (존재 시 실패) |
| errMsg | string | 오류 메시지 |

성공 시 응답 데이터가 있으면 완료 팝업 표시.

### 호출 위치

- `views/vPcInfo/VPcReq.vue:350` — Cloud PC 신청 팝업에서 즉시 할당 선택 후 신청하기
