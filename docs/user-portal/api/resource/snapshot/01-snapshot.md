# 스냅샷 API

## GET `/v1/resource/snapshot/{vmAuthId}`

선택한 VM의 스냅샷 목록과 최대 허용 개수를 반환한다.

### 요청

**Path Parameters**

| 필드 | 타입 | 설명 |
|------|------|------|
| vmAuthId | string | VM 인가 ID |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| max_snap_cnt | number | 최대 허용 스냅샷 수 |
| snap_list | array | 스냅샷 목록 |
| snap_list[].snap_id | string | 스냅샷 ID |
| snap_list[].cre_mtd_cd_nm | string | 생성 구분 코드명 (구분 컬럼 표시) |
| snap_list[].reg_ts | string | 생성 일시 |
| snap_list[].snap_sts_cd_nm | string | 스냅샷 결과 상태 코드명 |
| snap_list[].rec_sts_cd | string | 복원 상태 코드 (`V012RC`: 복원완료, `V012RI`: 복원중, `V012RF`: 복원실패, `null`: 없음) |
| snap_list[].rec_sts_cd_nm | string | 복원 상태 코드명 |

복원 진행 중인 항목(`rec_sts_cd === 'V012RI'`)이 있으면 3초 간격으로 자동 재조회.

### 호출 위치

- `views/vPcInfo/SnapshotRecovery.vue:248` — 스냅샷 조회하기 버튼 클릭 및 복원 중 자동 폴링

---

## DELETE `/v1/resource/snapshot/{snapId}`

스냅샷을 삭제한다.

### 요청

**Path Parameters**

| 필드 | 타입 | 설명 |
|------|------|------|
| snapId | string | 스냅샷 ID |

### 응답

HTTP 200 반환 시 삭제 신청 완료 팝업 표시 후 목록 재조회.

### 호출 위치

- `views/vPcInfo/SnapshotRecovery.vue:320` — 삭제 버튼 → 확인 팝업 → 삭제 실행 (`handlerRemove`)

---

## PUT `/v1/resource/snapshot/restore/{vmAuthId}/{snapId}`

스냅샷을 복원한다. VM 전원이 꺼진 상태(`V002OFC`)에서만 실행된다. 전원이 켜진 경우 경고 팝업만 표시하고 API를 호출하지 않는다.

### 요청

**Path Parameters**

| 필드 | 타입 | 설명 |
|------|------|------|
| vmAuthId | string | VM 인가 ID |
| snapId | string | 복원할 스냅샷 ID |

**Body**

없음.

### 응답

HTTP 200 반환 시 복원 시작. 이후 스냅샷 목록을 3초 간격으로 자동 폴링하여 완료 확인.

### 호출 위치

- `views/vPcInfo/SnapshotRecovery.vue:349` — 복원 버튼 → 확인 팝업 → 전원 확인 후 복원 실행 (`handlerRecovery`)

---

## POST `/v1/resource/snapshot/execSnapshot/{vmAuthId}`

스냅샷을 즉시 생성한다. 최대 개수 초과 시 가장 오래된 스냅샷을 자동 삭제 후 생성한다.

### 요청

**Path Parameters**

| 필드 | 타입 | 설명 |
|------|------|------|
| vmAuthId | string | VM 인가 ID |

**Body**

없음.

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| (array) | array | 갱신된 스냅샷 목록. `snap_list`와 동일한 구조로 추정되나 코드상 `res.data`를 `tableData`에 직접 대입. |

### 호출 위치

- `views/vPcInfo/SnapshotRecovery.vue:399` — 스냅샷 추가하기 버튼 클릭 후 확인 팝업에서 실행 (`handlerAddSnap`)
