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
| acct_conn_id | string | 사용자 접속 ID |
| acct_id | string | 사용자 ID |
| acct_nm | string | 사용자명 |
| vm_auth_id | string | VM 인증 ID |
| vm_id | string | VM ID |
| vm_nm | string | VM명 |
| max_snap_cnt | number | 최대 스냅샷 수 |
| snap_list | array | 스냅샷 목록 |
| snap_list[].snap_id | string | 스냅샷 ID |
| snap_list[].vm_id | string | VM ID |
| snap_list[].cre_mtd_cd | string | 생성 방식 코드 |
| snap_list[].cre_mtd_cd_nm | string | 생성 방식명 |
| snap_list[].snap_sts_cd | string | 스냅샷 상태 코드 |
| snap_list[].snap_sts_cd_nm | string | 스냅샷 상태명 |
| snap_list[].rec_usg_yn | string | 복원 사용 여부 |
| snap_list[].rec_sts_cd | string | 복원 상태 코드 |
| snap_list[].rec_sts_cd_nm | string | 복원 상태명 |
| snap_list[].del_yn | string | 삭제 여부 |
| snap_list[].reg_ts | string | 등록 일시 |
| snap_list[].mod_ts | string | 수정 일시 |

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
| bkup_dsk_id | string | 백업 디스크 ID |
| bkup_tgt_dsk_id | string | 백업 대상 디스크 ID |
| bkup_tgt_dsk_nm | string | 백업 대상 디스크명 |
| bkup_dsk_nm | string | 백업 디스크명 |
| max_bkup_cnt | string | 최대 백업 수 |
| bkup_snap_id | string | 백업용 스냅샷 ID |
| job_sts_val | string | 작업 상태 값 |
| org_dsk_id | string | 원본 디스크 ID |
| cre_mtd_cd | string | 생성 방식 코드 |
| cre_mtd_cd_nm | string | 생성 방식명 |
| bkup_dsk_sts_cd | string | 백업 디스크 상태 코드 |
| bkup_dsk_sts_cd_nm | string | 백업 디스크 상태명 |
| rec_sts_cd | string | 복원 상태 코드 |
| rec_sts_cd_nm | string | 복원 상태명 |
| reg_ts | string | 등록 일시 |
| mod_ts | string | 수정 일시 |

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
