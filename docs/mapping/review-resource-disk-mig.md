# Fixture vs DTO 필드 비교 — disk / migration / evacuate / snapshot / backup

분석 기준일: 2026-03-31

## 범례

| 상태 | 설명 |
|------|------|
| OK | fixture 필드와 DTO 필드 일치 |
| MISMATCH | 필드명 불일치 (fixture ≠ DTO) |
| FIXTURE_ONLY | fixture에만 존재, DTO에 없음 |
| DTO_ONLY | DTO에만 존재, fixture에 없음 |
| COMPUTED | DTO getter 메서드로 계산되는 가상 필드 |

---

## 1. `GET /api/v1/resource/disk/local` 및 `GET /api/v1/resource/disk/local/add-list`

- **fixture**: `disk-local-all.json` (`data[]` 배열)
- **Controller**: `LocalDiskController.addDiskPaging()`
- **DTO**: `AddDiskList`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| `acct_conn_id` | `acct_conn_id` | OK |
| `acct_id` | `acct_id` | OK |
| `acct_nm` | `acct_nm` | OK |
| `tnt_id` | `tnt_id` | OK |
| `tnt_nm` | `tnt_nm` | OK |
| `cert_plcy_id` | `cert_plcy_id` | OK |
| `usr_grp_nm` | `usr_grp_nm` | OK |
| `vm_auth_id` | `vm_auth_id` | OK |
| `dsk_id` | `dsk_id` | OK |
| `dsk_nm` | `dsk_nm` | OK |
| `size` | `size` | OK |
| `dsk_typ_cd` | `dsk_typ_cd` | OK |
| `dsk_typ_cd_nm` | `dsk_typ_cd_nm` | OK |
| `dsk_sts_cd` | `dsk_sts_cd` | OK |
| `dsk_sts_cd_nm` | `dsk_sts_cd_nm` | OK |
| `vm_nm` | `vm_nm` | OK |
| `reg_conn_id` | `reg_conn_id` | OK |
| `reg_id` | `reg_id` | OK |
| `mod_conn_id` | `mod_conn_id` | OK |
| `mod_id` | `mod_id` | OK |
| `reg_nm` | `reg_nm` | OK |
| `reg_ts` | `reg_ts` | OK |
| `mod_ts` | `mod_ts` | OK |
| `vm_state` | `vm_state` | OK |
| `vm_allo_sts_cd` | `vm_allo_sts_cd` | OK |
| `vm_alo_sts_cd_nm` | `vm_allo_sts_cd_nm` | **MISMATCH** — fixture: `vm_alo_sts_cd_nm` (오타, `allo` → `alo`), DTO: `vm_allo_sts_cd_nm` |
| `vm_power_sts_cd` | `vm_power_sts_cd` | OK |
| `vm_power_sts_cd_nm` | `vm_power_sts_cd_nm` | OK |
| `usr_vm_conn_sts_cd` | `usr_vm_conn_sts_cd` | OK |
| `usr_vm_conn_sts_cd_nm` | `usr_vm_conn_sts_cd_nm` | OK |
| `adm_vm_conn_sts_cd` | `adm_vm_conn_sts_cd` | OK |
| `adm_vm_conn_sts_cd_nm` | `adm_vm_conn_sts_cd_nm` | OK |

**DTO에만 존재 (fixture 누락):**

| DTO 필드 | 비고 |
|---|---|
| — | 없음 |

**정리**: 필드 1개 오타 불일치. `vm_alo_sts_cd_nm` (fixture) vs `vm_allo_sts_cd_nm` (DTO).

---

## 2. `GET /api/v1/resource/disk/local/:acctId` (사용자별 디스크 목록/상세)

- **fixture**: `disk-local-list.json` (list), `disk-local-detail.json` (detail)
- **Controller**: `LocalDiskController.diskList()`
- **DTO**: `UserVmDisk` (wrapper) → 내부 `usr_disk: List<LocalDisk>`, `usr_vm: List<UserVm>`

### 2a. `disk-local-list.json` vs `UserVmDisk` + `LocalDisk`

fixture `data.usr_disk[]`의 각 항목:

| fixture 필드 | DTO 필드 (`LocalDisk`) | 상태 |
|---|---|---|
| `disk_id` | `dsk_id` | **MISMATCH** — fixture: `disk_id`, DTO: `dsk_id` |
| `disk_nm` | `dsk_nm` | **MISMATCH** — fixture: `disk_nm`, DTO: `dsk_nm` |
| `vm_auth_id` | `vm_auth_id` | OK |
| `disk_stat_cd` | `dsk_sts_cd` | **MISMATCH** — fixture: `disk_stat_cd`, DTO: `dsk_sts_cd` |
| `capa` | `size` | **MISMATCH** — fixture: `capa`, DTO: `size` |
| `subLabel` | — | **FIXTURE_ONLY** — DTO에 없는 UI 전용 필드 |
| — | `dsk_typ_cd` | DTO_ONLY |
| — | `dsk_typ_cd_nm` | DTO_ONLY |
| — | `dsk_sts_cd_nm` | DTO_ONLY |
| — | `cre_volm_id` | DTO_ONLY |
| — | `dsk_conn_yn` | DTO_ONLY |
| — | `root_volm_yn` | DTO_ONLY |
| — | `path` | DTO_ONLY |
| — | `vm_id` | DTO_ONLY |
| — | `vm_nm` | DTO_ONLY |
| — | `del_yn` | DTO_ONLY |
| — | `acct_id` | DTO_ONLY |
| — | `volm_typ_nm` | DTO_ONLY |
| — | `tnt_mtd_cd` | DTO_ONLY |
| — | `dsk_visibility_yn` | DTO_ONLY |
| — | `volm_qos_plcy_id` | DTO_ONLY |
| — | `detachBtn` (computed) | COMPUTED |
| — | `applyBtn` (computed) | COMPUTED |
| — | `deleteBtn` (computed) | COMPUTED |

`UserVmDisk` wrapper 필드:

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| — | `acct_id` | DTO_ONLY |
| — | `acct_nm` | DTO_ONLY |
| — | `acct_conn_id` | DTO_ONLY |
| — | `usr_dsk_cnt` | DTO_ONLY |
| — | `usr_dsk_rstt_cnt` | DTO_ONLY |
| — | `usr_dsk_max_size` | DTO_ONLY |
| — | `dsk_size` | DTO_ONLY |
| `usr_disk` | `usr_disk` | OK (키명 일치) |

### 2b. `disk-local-detail.json` vs `LocalDisk`

fixture `data` 단일 객체:

| fixture 필드 | DTO 필드 (`LocalDisk`) | 상태 |
|---|---|---|
| `disk_id` | `dsk_id` | **MISMATCH** — fixture: `disk_id`, DTO: `dsk_id` |
| `disk_nm` | `dsk_nm` | **MISMATCH** — fixture: `disk_nm`, DTO: `dsk_nm` |
| `disk_stat_cd` | `dsk_sts_cd` | **MISMATCH** — fixture: `disk_stat_cd`, DTO: `dsk_sts_cd` |
| `acct_id` | `acct_id` | OK |
| `vm_auth_id` | `vm_auth_id` | OK |
| `capa` | `size` | **MISMATCH** — fixture: `capa`, DTO: `size` |
| `reg_ts` | `reg_ts` | OK |

**정리**: `disk-local-list.json` / `disk-local-detail.json` 은 실서버 응답 구조와 무관한 구버전 목업 데이터. 필드명 전반이 DTO와 불일치. 실서버 응답은 `disk-local-all.json`과 동일한 구조(`dsk_id`, `dsk_nm`, `dsk_sts_cd`, `size`)를 사용할 가능성이 높음.

---

## 3. `GET /api/v1/resource/vpcs/migration` (마이그레이션 목록)

- **fixture**: `vpc-migration-list.json` (`data[]` 배열)
- **Controller**: `MigrationController.paging()`
- **DTO**: `MigrationList`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| `mig_id` | `mig_id` | OK |
| `src_host_id` | `src_host_id` | OK |
| `src_host_nm` | `src_host_nm` | OK |
| `src_pfrm_host_id` | `src_pfrm_host_id` | OK |
| `tgt_host_id` | `tgt_host_id` | OK |
| `tgt_host_nm` | `tgt_host_nm` | OK |
| `tgt_pfrm_host_id` | `tgt_pfrm_host_id` | OK |
| `mig_detl` | `mig_detl` | OK |
| `job_stt_tm` | `job_stt_tm` | OK |
| `job_done_tm` | `job_done_tm` | OK |
| `job_sts_cd` | `job_sts_cd` | OK |
| `job_sts_cd_nm` | `job_sts_cd_nm` | OK |
| `src_vm_auth_id` | `src_vm_auth_id` | OK |
| `src_vm_nm` | `src_vm_nm` | OK |
| `src_vm_id` | `src_vm_id` | OK |
| `src_vm_state` | `src_vm_state` | OK |
| `src_rstr_sts_cd` | `src_rstr_sts_cd` | OK |
| `reg_id` | `reg_id` | OK |
| `reg_conn_id` | `reg_conn_id` | OK |
| `reg_nm` | `reg_nm` | OK |
| `reg_ts` | `reg_ts` | OK |
| `mod_id` | `mod_id` | OK |
| `mod_conn_id` | `mod_conn_id` | OK |
| `mod_nm` | `mod_nm` | OK |
| `mod_ts` | `mod_ts` | OK |

**정리**: 모든 필드 일치. 불일치 없음.

---

## 4. `GET /api/v1/resource/vpcs/migration/:id` (마이그레이션 상세)

- **fixture**: `vpc-migration-detail.json` (`data` 단일 객체)
- **Controller**: `MigrationController.get()`
- **DTO**: `MigrationDetail` (extends `MigrationList` — 추가 필드 없음)

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| `mig_id` | `mig_id` | OK |
| `vm_auth_id` | — | **FIXTURE_ONLY** — DTO에 없음 (`MigrationList`에 `src_vm_auth_id`로 존재) |
| `vm_nm` | — | **FIXTURE_ONLY** — DTO에 없음 (`src_vm_nm`으로 존재) |
| `src_host_id` | `src_host_id` | OK |
| `src_host_nm` | `src_host_nm` | OK |
| `dst_host_id` | `tgt_host_id` | **MISMATCH** — fixture: `dst_host_id`, DTO: `tgt_host_id` |
| `dst_host_nm` | `tgt_host_nm` | **MISMATCH** — fixture: `dst_host_nm`, DTO: `tgt_host_nm` |
| `mig_stat_cd` | `job_sts_cd` | **MISMATCH** — fixture: `mig_stat_cd`, DTO: `job_sts_cd` |
| `live_yn` | — | **FIXTURE_ONLY** — DTO에 없음 |
| `reg_ts` | `reg_ts` | OK |
| `upd_ts` | `mod_ts` | **MISMATCH** — fixture: `upd_ts`, DTO: `mod_ts` |
| — | `src_pfrm_host_id` | DTO_ONLY |
| — | `tgt_pfrm_host_id` | DTO_ONLY |
| — | `mig_detl` | DTO_ONLY |
| — | `job_stt_tm` | DTO_ONLY |
| — | `job_done_tm` | DTO_ONLY |
| — | `job_sts_cd_nm` | DTO_ONLY |
| — | `src_vm_auth_id` | DTO_ONLY |
| — | `src_vm_nm` | DTO_ONLY |
| — | `src_vm_id` | DTO_ONLY |
| — | `src_vm_state` | DTO_ONLY |
| — | `src_rstr_sts_cd` | DTO_ONLY |
| — | `reg_id` | DTO_ONLY |
| — | `reg_conn_id` | DTO_ONLY |
| — | `reg_nm` | DTO_ONLY |
| — | `mod_id` | DTO_ONLY |
| — | `mod_conn_id` | DTO_ONLY |
| — | `mod_nm` | DTO_ONLY |

**정리**: `vpc-migration-detail.json`은 구버전 목업. DTO 필드명과 전반적으로 불일치. 실서버 응답은 list fixture(`vpc-migration-list.json`)와 동일한 필드 구조를 가짐 (`MigrationDetail extends MigrationList`). detail fixture를 list fixture 항목 중 하나로 교체해야 함.

---

## 5. `GET /api/v1/resource/evacuate` (Evacuate 호스트 목록)

- **fixture**: `evacuate-list.json` (`data[]` 배열)
- **Controller**: `EvacuateController.list()`
- **DTO**: `EvacuateHost`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| `host_id` | `host_id` | OK |
| `host_nm` | `host_nm` | OK |
| `evac_stat_cd` | `evac_sts_cd` | **MISMATCH** — fixture: `evac_stat_cd`, DTO: `evac_sts_cd` |
| `reg_ts` | — | **FIXTURE_ONLY** — DTO에 없음 |
| — | `pfrm_host_id` | DTO_ONLY |
| — | `host_sts_cd` | DTO_ONLY |
| — | `host_sts_cd_nm` | DTO_ONLY |
| — | `host_descp` | DTO_ONLY |
| — | `host_ip` | DTO_ONLY |
| — | `ha_auto_mng_yn` | DTO_ONLY |
| — | `hyper_typ` | DTO_ONLY |
| — | `evac_sts_cd_nm` | DTO_ONLY |
| — | `tnt_id` | DTO_ONLY |
| — | `dng_sts_tm` | DTO_ONLY |
| — | `evac_grp_id` | DTO_ONLY |

**정리**: fixture는 최소 필드만 가진 구버전 목업. `evac_stat_cd` vs `evac_sts_cd` 불일치. DTO에 있는 핵심 필드 대부분 누락.

---

## 6. `GET /api/v1/resource/evacuate/history` (Evacuate 이력 목록)

- **fixture**: `evacuate-history-list.json` (`data[]` 배열)
- **Controller**: `EvacuateController.historyList()`
- **DTO**: `EvacuateHistoryList`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| `evac_grp_id` | `evac_grp_id` | OK |
| `host_id` | — | **FIXTURE_ONLY** — DTO에 없음 |
| `host_nm` | `host_nm` | OK |
| `evac_stat_cd` | `evac_sts_cd` | **MISMATCH** — fixture: `evac_stat_cd`, DTO: `evac_sts_cd` |
| `vm_cnt` | `tgt_vm_cnt` | **MISMATCH** — fixture: `vm_cnt`, DTO: `tgt_vm_cnt` |
| `reg_ts` | — | **FIXTURE_ONLY** — DTO에 없음 |
| — | `evac_sts_cd_nm` | DTO_ONLY |
| — | `act_vm_cnt` | DTO_ONLY |
| — | `auto_mng_yn` | DTO_ONLY |
| — | `evac_stt_ts` | DTO_ONLY |
| — | `evac_done_ts` | DTO_ONLY |

**정리**: 구버전 목업. `evac_stat_cd` vs `evac_sts_cd`, `vm_cnt` vs `tgt_vm_cnt` 불일치. 여러 DTO 필드 누락.

---

## 7. `GET /api/v1/resource/evacuate/history/:evacGrpId` (Evacuate 이력 VM 목록)

- **fixture**: `evacuate-history-detail.json` (`data` 단일 객체)
- **Controller**: `EvacuateController.historyVmList()`
- **DTO**: `EvacuateHistoryVmList` (wrapper) → 내부 `vmList: List<EvacuateHistoryVmInfo>`

### EvacuateHistoryVmList wrapper 비교

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| `evac_grp_id` | `evac_grp_id` | OK |
| `host_id` | — | **FIXTURE_ONLY** — DTO에 없음 |
| `host_nm` | `host_nm` | OK |
| `evac_stat_cd` | — | **FIXTURE_ONLY** — DTO에 없음 |
| `vm_list` | `vmList` | **MISMATCH** — fixture: `vm_list` (snake_case), DTO: `vmList` (camelCase, Jackson 기본 직렬화 시 `vmList`로 출력) |

### `vm_list[]` 각 항목 vs `EvacuateHistoryVmInfo`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| `vm_auth_id` | — | **FIXTURE_ONLY** — DTO에 없음 (`tgt_vm_id`만 존재) |
| `vm_nm` | `tgt_vm_nm` | **MISMATCH** — fixture: `vm_nm`, DTO: `tgt_vm_nm` |
| `dst_host_id` | — | **FIXTURE_ONLY** — DTO에 없음 |
| `evac_result_cd` | `evac_vm_sts_cd` | **MISMATCH** — fixture: `evac_result_cd`, DTO: `evac_vm_sts_cd` |
| — | `evac_job_no` | DTO_ONLY |
| — | `evac_grp_id` | DTO_ONLY |
| — | `tgt_host_nm` | DTO_ONLY |
| — | `src_host_nm` | DTO_ONLY |
| — | `tgt_vm_id` | DTO_ONLY |
| — | `evac_vm_sts_cd_nm` | DTO_ONLY |
| — | `vm_power_sts_cd` | DTO_ONLY |
| — | `vm_power_sts_cd_nm` | DTO_ONLY |
| — | `job_rslt_val` | DTO_ONLY |
| — | `job_rslt_detl` | DTO_ONLY |
| — | `reg_ts` | DTO_ONLY |
| — | `mod_ts` | DTO_ONLY |

**정리**: fixture는 구버전 목업. wrapper의 `vm_list` vs DTO의 `vmList` 불일치 (Jackson `@JsonProperty` 미지정 시 camelCase 출력). VM 항목 필드 전반이 DTO와 불일치.

---

## 8. `GET /api/v1/resource/snapshot/:vmAuthId` (스냅샷 목록)

- **fixture**: `snapshot-list.json` (`data` 객체)
- **Controller**: `SnapshotController.snapshotList()`
- **DTO**: `SnapshotMngInfo` (wrapper) → 내부 `snap_list: List<SnapshotInfo>`

### SnapshotMngInfo wrapper 비교

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| `snap_list` | `snap_list` | OK |
| `total` | — | **FIXTURE_ONLY** — DTO에 없음 |
| — | `acct_conn_id` | DTO_ONLY |
| — | `acct_id` | DTO_ONLY |
| — | `acct_nm` | DTO_ONLY |
| — | `vm_auth_id` | DTO_ONLY |
| — | `vm_id` | DTO_ONLY |
| — | `vm_nm` | DTO_ONLY |
| — | `max_snap_cnt` | DTO_ONLY |

### `snap_list[]` 각 항목 vs `SnapshotInfo`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| `snap_id` | `snap_id` | OK |
| `snap_nm` | — | **FIXTURE_ONLY** — DTO에 없음 |
| `snap_stat_cd` | `snap_sts_cd` | **MISMATCH** — fixture: `snap_stat_cd`, DTO: `snap_sts_cd` |
| `cre_ts` | `reg_ts` | **MISMATCH** — fixture: `cre_ts`, DTO: `reg_ts` |
| `size` | — | **FIXTURE_ONLY** — DTO에 없음 |
| — | `vm_id` | DTO_ONLY |
| — | `cre_mtd_cd` | DTO_ONLY |
| — | `cre_mtd_cd_nm` | DTO_ONLY |
| — | `snap_sts_cd_nm` | DTO_ONLY |
| — | `rec_usg_yn` | DTO_ONLY |
| — | `rec_sts_cd` | DTO_ONLY |
| — | `rec_sts_cd_nm` | DTO_ONLY |
| — | `del_yn` | DTO_ONLY |
| — | `mod_ts` | DTO_ONLY |

**정리**: fixture는 구버전 목업. `snap_stat_cd` vs `snap_sts_cd`, `cre_ts` vs `reg_ts` 불일치. DTO 핵심 필드 다수 누락.

---

## 9. `GET /api/v1/resource/backup/backup/:diskId` (백업 목록)

- **fixture**: `backup-list.json` (`data[]` 배열)
- **Controller**: `BackupController.dskList()`
- **DTO**: `List<BackupInfo>` 직접 반환 (wrapper 없음)

| fixture 필드 | DTO 필드 (`BackupInfo`) | 상태 |
|---|---|---|
| `bkup_disk_id` | `bkup_dsk_id` | **MISMATCH** — fixture: `bkup_disk_id`, DTO: `bkup_dsk_id` |
| `disk_id` | `bkup_tgt_dsk_id` | **MISMATCH** — fixture: `disk_id`, DTO: `bkup_tgt_dsk_id` (의미상 백업 대상 디스크 ID) |
| `bkup_stat_cd` | `bkup_dsk_sts_cd` | **MISMATCH** — fixture: `bkup_stat_cd`, DTO: `bkup_dsk_sts_cd` |
| `bkup_size` | — | **FIXTURE_ONLY** — DTO에 없음 |
| `cre_ts` | `reg_ts` | **MISMATCH** — fixture: `cre_ts`, DTO: `reg_ts` |
| — | `bkup_tgt_dsk_nm` | DTO_ONLY |
| — | `bkup_dsk_nm` | DTO_ONLY |
| — | `max_bkup_cnt` | DTO_ONLY |
| — | `bkup_snap_id` | DTO_ONLY |
| — | `job_sts_val` | DTO_ONLY |
| — | `org_dsk_id` | DTO_ONLY |
| — | `cre_mtd_cd` | DTO_ONLY |
| — | `cre_mtd_cd_nm` | DTO_ONLY |
| — | `bkup_dsk_sts_cd_nm` | DTO_ONLY |
| — | `rec_sts_cd` | DTO_ONLY |
| — | `rec_sts_cd_nm` | DTO_ONLY |
| — | `mod_ts` | DTO_ONLY |

**정리**: fixture는 구버전 목업. 전반적으로 필드명 불일치 및 DTO 필드 다수 누락.

---

## 종합 요약

| API | fixture 파일 | 불일치 수 | 상태 |
|---|---|---|---|
| `GET /disk/local` (add-list) | `disk-local-all.json` | 1 (오타) | 양호 — `vm_alo_sts_cd_nm` 오타 수정 필요 |
| `GET /disk/local/:acctId` (list) | `disk-local-list.json` | 다수 | **교체 필요** — 구버전 목업, 필드명 전반 불일치 |
| `GET /disk/local/:acctId` (detail) | `disk-local-detail.json` | 다수 | **교체 필요** — 구버전 목업, 필드명 전반 불일치 |
| `GET /vpcs/migration` | `vpc-migration-list.json` | 0 | OK |
| `GET /vpcs/migration/:id` | `vpc-migration-detail.json` | 다수 | **교체 필요** — 구버전 목업 (`MigrationDetail`은 `MigrationList`와 동일 구조) |
| `GET /evacuate` | `evacuate-list.json` | 다수 | **교체 필요** — 구버전 목업, 핵심 필드 누락 |
| `GET /evacuate/history` | `evacuate-history-list.json` | 다수 | **교체 필요** — 구버전 목업, 필드명 불일치 |
| `GET /evacuate/history/:evacGrpId` | `evacuate-history-detail.json` | 다수 | **교체 필요** — 구버전 목업, vm_list 구조 불일치 |
| `GET /snapshot/:vmAuthId` | `snapshot-list.json` | 다수 | **교체 필요** — 구버전 목업, 필드명 불일치 |
| `GET /backup/backup/:diskId` | `backup-list.json` | 다수 | **교체 필요** — 구버전 목업, 필드명 전반 불일치 |

### 주요 패턴

- **`disk-local-all.json` 패턴이 정합 기준**: `disk-local-all.json`은 실서버 응답 기반으로 작성되어 DTO와 거의 완벽히 일치. 나머지 fixture들은 초기 목업 시점에 작성된 구버전 데이터.
- **공통 불일치 패턴**:
  - `*_stat_cd` → DTO는 `*_sts_cd` 사용
  - `cre_ts` → DTO는 `reg_ts` 사용
  - `upd_ts` → DTO는 `mod_ts` 사용
  - `dst_*` → DTO는 `tgt_*` 사용
  - `disk_*` → DTO는 `dsk_*` 사용
- **`EvacuateHistoryVmList.vmList`**: Jackson 기본 직렬화 시 `vmList`(camelCase) 출력. 프론트엔드에서 `vm_list`로 접근 중이라면 `@JsonProperty("vm_list")` 어노테이션 필요 여부 확인 권장.
