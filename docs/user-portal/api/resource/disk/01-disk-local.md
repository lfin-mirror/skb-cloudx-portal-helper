# 개인 디스크(로컬) API

## GET `/v1/resource/disk/local/{acctId}`

계정의 개인 디스크 목록과 사용 현황, 연결 가능한 Cloud PC 목록을 반환한다.

### 요청

**Path Parameters**

| 필드 | 타입 | 설명 |
|------|------|------|
| acctId | string | 계정 ID (`sessionStorage`의 `acct_id`) |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| usr_dsk_cnt | number | 현재 사용 중인 디스크 수 |
| dsk_size | number | 현재 사용 중인 총 용량 (GB) |
| usr_dsk_rstt_cnt | number | 보유 가능 최대 디스크 수 |
| usr_dsk_max_size | number | 보유 가능 최대 총 용량 (GB) |
| usr_disk | array | 디스크 목록 |
| usr_disk[].dsk_id | string | 디스크 ID |
| usr_disk[].dsk_nm | string | 디스크 이름 |
| usr_disk[].size | number | 디스크 용량 (GB) |
| usr_disk[].acct_id | string | 계정 ID |
| usr_disk[].vm_nm | string | 연결된 Cloud PC 이름. 값이 있으면 연결됨(`isRegistered = true`). |
| usr_disk[].vm_auth_id | string | 연결된 VM 인가 ID |
| usr_vm | array | 연결 가능한 Cloud PC 목록 |
| usr_vm[].vm_nm | string | Cloud PC 이름 |
| usr_vm[].vm_auth_id | string | VM 인가 ID |

추가 가능 디스크 수: `usr_dsk_rstt_cnt - usr_dsk_cnt`
추가 가능 용량 (10GB 단위): `(usr_dsk_max_size - dsk_size) / 10`

### 호출 위치

- `views/vPcInfo/PrsDskMng.vue:175` — 페이지 진입 시 및 디스크 추가/삭제/연결/분리 후 재조회 (`getPrsDiskList`)

---

## POST `/v1/resource/disk/local`

개인 디스크를 신청한다.

### 요청

**Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_id | string | Y | 계정 ID (`sessionStorage`의 `acct_id`) |
| size | number | Y | 신청 용량 (GB, 10 단위) |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| errCode | string | 오류 코드 (존재 시 실패) |
| errMsg | string | 오류 메시지 |

성공 시 5초 딜레이 후 목록 재조회 (디스크 생성 지연 대응).

### 호출 위치

- `views/vPcInfo/PrsDskApplyPopup.vue:89` — 개인 디스크 추가 신청 팝업에서 용량 선택 후 신청하기 (`diskAddRequest`)

---

## DELETE `/v1/resource/disk/local/{dskId}`

개인 디스크를 삭제한다. 삭제 후 복구 불가.

### 요청

**Path Parameters**

| 필드 | 타입 | 설명 |
|------|------|------|
| dskId | string | 디스크 ID |

### 응답

성공/실패 여부만 확인. 완료 후 목록 재조회.

### 호출 위치

- `views/vPcInfo/PrsDskMng.vue:292` — 삭제 버튼 → 확인 팝업에서 실행 (`handlerApply`)

---

## PUT `/v1/resource/disk/local/attach`

개인 디스크를 Cloud PC에 연결한다.

### 요청

**Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_id | string | Y | 계정 ID |
| dsk_id | string | Y | 연결할 디스크 ID |
| vm_auth_id | string | Y | 연결할 VM 인가 ID |

### 응답

성공/실패 여부만 확인. 완료 후 목록 재조회.

### 호출 위치

- `views/vPcInfo/PrsDskMng.vue:231` — 디스크 행에서 Cloud PC 선택 후 적용 버튼 클릭 (`apply`)

---

## PUT `/v1/resource/disk/local/detach`

개인 디스크를 Cloud PC에서 분리한다.

### 요청

**Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_id | string | Y | 계정 ID |
| dsk_id | string | Y | 분리할 디스크 ID |
| vm_auth_id | string | Y | 분리할 VM 인가 ID |

### 응답

성공/실패 여부만 확인. 완료 후 목록 재조회.

### 호출 위치

- `views/vPcInfo/PrsDskMng.vue:248` — 연결된 디스크 행의 분리 버튼 클릭 (`split`)
