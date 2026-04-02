# 스냅샷 / 백업 API

## 사용 화면
- (화면 문서 미작성)

## 목차

- [스냅샷](#스냅샷)
- [백업](#백업)

---

## 스냅샷

### GET /v1/resource/snapshot/{vmAuthId}

VM 스냅샷 목록 조회.

**호출 위치**: `store/modules/virtualPcGroup.js:368`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmAuthId | string | Y | VM 인증 ID |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| snap_list | array | 스냅샷 목록 |
| snap_list[].snap_id | string | 스냅샷 ID |
| snap_list[].snap_nm | string | 스냅샷명 |
| snap_list[].snap_stat_cd | string | 스냅샷 상태 코드 |
| snap_list[].cre_ts | string | 생성 일시 |
| snap_list[].size | number | 스냅샷 크기 |
| (meta 필드) | - | snap_list 외 메타 정보 포함 |

---

### POST /v1/resource/snapshot/execSnapshot/{vmAuthId}

VM 스냅샷 생성 실행.

**호출 위치**: `store/modules/virtualPcGroup.js:383`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmAuthId | string | Y | VM 인증 ID |

---

### PUT /v1/resource/snapshot/restore/{vmAuthId}/{snapId}

스냅샷으로 VM 복원.

**호출 위치**: `store/modules/virtualPcGroup.js:390`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmAuthId | string | Y | VM 인증 ID |
| snapId | string | Y | 복원할 스냅샷 ID |

---

### DELETE /v1/resource/snapshot

스냅샷 삭제.

**호출 위치**: `store/modules/virtualPcGroup.js:397`

**Request Body (data)**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| snap_ids | string[] | Y | 삭제할 스냅샷 ID 목록 |

---

## 백업

### GET /v1/resource/backup/backup/{diskId}

디스크 백업 목록 조회.

**호출 위치**: `store/modules/virtualPcGroup.js:321`, `views/virtualPc/components/BackupManagement.vue:201`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| diskId | string | Y | 디스크 ID |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| bkup_disk_id | string | 백업 디스크 ID |
| disk_id | string | 원본 디스크 ID |
| bkup_stat_cd | string | 백업 상태 코드 |
| bkup_size | number | 백업 크기 (GB) |
| cre_ts | string | 생성 일시 |

---

### POST /v1/resource/backup/execBackup/{diskId}

디스크 백업 실행.

**호출 위치**: `store/modules/virtualPcGroup.js:330`, `views/virtualPc/components/BackupManagement.vue:270`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| diskId | string | Y | 디스크 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| (옵션 params) | object | N | 백업 옵션 |

---

### PUT /v1/resource/backup/restore/{bkupDiskId}

백업으로 디스크 복원.

**호출 위치**: `store/modules/virtualPcGroup.js:340`, `views/virtualPc/components/BackupManagement.vue:239`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| bkupDiskId | string | Y | 백업 디스크 ID |

---

### DELETE /v1/resource/backup/{diskId}

백업 삭제.

**호출 위치**: `store/modules/virtualPcGroup.js:351`, `views/virtualPc/components/BackupManagement.vue:222`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| diskId | string | Y | 디스크 ID |

**Request Body (data)**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| bkup_disk_ids | string[] | Y | 삭제할 백업 디스크 ID 목록 |

---

## 에러 코드

| HTTP 상태 | 설명 |
|---|---|
| 200 | 정상 처리 |
| 400 | 잘못된 요청 파라미터 |
| 404 | 리소스 없음 |
| 409 | 스냅샷/백업 작업 중 상태 충돌 |
| 500 | 서버 오류 |
