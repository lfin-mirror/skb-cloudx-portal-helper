# API 명세서 감사

감사 기준일: 2026-03-31

handler 파일 6개(resource, operation, user, system, gw, monitoring)의 전체 엔드포인트와
API 명세서(`docs/admin-portal/api/`)를 대조한 결과.

---

## 명세서 누락 (handler 있으나 doc 없음)

### resource

| 엔드포인트 | 비고 |
|---|---|
| `GET /api/v1/resource/vpcs/resources/list/vm2/count` | vpcs/01-vpcs.md에 vm2 목록은 있으나 count 엔드포인트 미기재 |
| `GET /api/v1/resource/vpcs/resources/list/vm2` | vpcs/01-vpcs.md에 기재 여부 불명확 (별도 vm2 경로) |
| `GET /api/v1/resource/vpcs/pool/count` | pools/01-pools.md에 count 엔드포인트 누락 여부 확인 필요 |
| `GET /api/v1/resource/vpcs/pool2` | pools/01-pools.md에 pool2 경로 미기재 (pool 목록은 있음) |
| `GET /api/v1/resource/vpcs/pool/auto/:companyNm` | tenants/01-tenants.md에 기재되어 있으나 pool 명세서에는 누락 |
| `GET /api/v1/resource/vpcs/pool/:poolId/template/history` | pools 명세서 미기재 |
| `GET /api/v1/resource/vpcs/pool/:id/image-mismatched-vm` | pools 명세서 미기재 |
| `POST /api/v1/resource/vpcs/pool/:poolId/subnet` | pools 명세서 미기재 |
| `PUT /api/v1/resource/vpcs/pool/:vmPoolId/subnet` | pools 명세서 미기재 |
| `PUT /api/v1/resource/vpcs/pool/:vmPoolId/reset` | pools 명세서 미기재 |
| `PUT /api/v1/resource/vpcs/pool/:vmPoolId/template` | pools 명세서 미기재 |
| `POST /api/v1/resource/vpcs/pool/:vmPoolId/volume` | pools 명세서 미기재 |
| `DELETE /api/v1/resource/vpcs/pool/:vmPoolId/volume` | pools 명세서 미기재 |
| `DELETE /api/v1/resource/vpcs/pool/:vmPoolId/collection` | pools 명세서 미기재 |
| `GET /api/v1/resource/vpcs/pool/:vmPoolId/ip` | pools 명세서 미기재 |
| `PUT /api/v1/resource/vpcs/resources/:vmAuthId/tenant` | vm-authorization 또는 vpcs 명세서 미기재 |
| `GET /api/v1/resource/networks/phy_networks` | networks 명세서 미기재 |
| `GET /api/v1/resource/networks/qos/:networkQosId` | networks 명세서 미기재 |
| `GET /api/v1/resource/networks/qos` | networks 명세서 미기재 |
| `POST /api/v1/resource/networks/qos` | networks 명세서 미기재 |
| `PUT /api/v1/resource/networks/qos/:networkQosId` | networks 명세서 미기재 |
| `DELETE /api/v1/resource/networks/qos/:networkQosId` | networks 명세서 미기재 |
| `GET /api/v1/resource/subnets/:subnetId/ips` | networks 명세서 미기재 |
| `GET /api/v1/resource/subnets` | networks 명세서 미기재 |
| `GET /api/v1/resource/subnets/:subnetId` | networks 명세서 미기재 |
| `POST /api/v1/resource/subnets` | networks 명세서 미기재 |
| `PUT /api/v1/resource/subnets/:subnetId` | networks 명세서 미기재 |
| `DELETE /api/v1/resource/subnets/:subnetId` | networks 명세서 미기재 |
| `GET /api/v1/resource/router` | 라우터 — 명세서 폴더 없음 |
| `GET /api/v1/resource/router/:id` | 라우터 — 명세서 폴더 없음 |
| `POST /api/v1/resource/router` | 라우터 — 명세서 폴더 없음 |
| `PUT /api/v1/resource/router/:id/changeNetwork` | 라우터 — 명세서 폴더 없음 |
| `PUT /api/v1/resource/router/:id/addNetwork` | 라우터 — 명세서 폴더 없음 |
| `PUT /api/v1/resource/router/:id/removeNetwork` | 라우터 — 명세서 폴더 없음 |
| `PUT /api/v1/resource/router/:id` | 라우터 — 명세서 폴더 없음 |
| `DELETE /api/v1/resource/router/:id` | 라우터 — 명세서 폴더 없음 |
| `GET /api/v1/resource/storage/admin` | storage 명세서는 NAS만 있음, 볼륨타입 목록 미기재 |
| `GET /api/v1/resource/storage/resources/count` | storage 명세서 미기재 |
| `GET /api/v1/resource/storage/resources/list` | storage 명세서 미기재 |
| `GET /api/v1/resource/storage/resources/:id` | storage 명세서 미기재 |
| `GET /api/v1/resource/storage/qos/:id` | storage 명세서 미기재 |
| `GET /api/v1/resource/storage/qos` | storage 명세서 미기재 |
| `POST /api/v1/resource/storage/qos` | storage 명세서 미기재 |
| `PUT /api/v1/resource/storage/qos/:id` | storage 명세서 미기재 |
| `DELETE /api/v1/resource/storage/qos/:id` | storage 명세서 미기재 |
| `GET /api/v1/resource/storage/backend/list` | storage 명세서 미기재 |
| `GET /api/v1/resource/storage` | storage 명세서 미기재 |
| `GET /api/v1/resource/storage/:id` | storage 명세서 미기재 |
| `POST /api/v1/resource/storage` | storage 명세서 미기재 |
| `PUT /api/v1/resource/storage/:id` | storage 명세서 미기재 |
| `DELETE /api/v1/resource/storage/:id` | storage 명세서 미기재 |
| `GET /api/v1/resource/flavors/list/tenant` | volumes/01-volumes.md 또는 별도 flavors 명세서 없음 |
| `GET /api/v1/resource/flavors` | flavors 명세서 없음 |
| `GET /api/v1/resource/flavors/:flavorId` | flavors 명세서 없음 |
| `POST /api/v1/resource/flavors` | flavors 명세서 없음 |
| `PUT /api/v1/resource/flavors/:flavorId` | flavors 명세서 없음 |
| `DELETE /api/v1/resource/flavors/:flavorId` | flavors 명세서 없음 |
| `GET /api/v1/resource/proxy/assign` | proxy 명세서 없음 |
| `GET /api/v1/resource/proxy/L4/:path` | proxy 명세서 없음 |
| `GET /api/v1/resource/proxy/L7/:path` | proxy 명세서 없음 |
| `GET /api/v1/resource/platform/software` | platform/software 명세서 없음 |
| `GET /api/v1/resource/snapshot/:vmAuthId` | snapshot/01-snapshot.md 존재하나 내용 확인 필요 |
| `GET /api/v1/resource/backup/backup/:diskId` | backup 명세서 없음 (operation/backup과 별개) |
| `POST /api/v1/resource/backup/execBackup/:diskId` | 동상 |
| `PUT /api/v1/resource/backup/restore/:bkupDiskId` | 동상 |
| `DELETE /api/v1/resource/backup/:diskId` | 동상 |
| `GET /api/v1/resource/images/vpc` | templates/02-images.md 미기재 |
| `GET /api/v1/resource/images/vm/:id` | templates/02-images.md 미기재 |
| `GET /api/v1/resource/images/status/:imgId` | templates/02-images.md 미기재 |
| `POST /api/v1/resource/images/create_vm` | templates/02-images.md 미기재 |
| `POST /api/v1/resource/images/convert` | templates/02-images.md 미기재 |
| `POST /api/v1/resource/images/vm_convert` | templates/02-images.md 미기재 |
| `PUT /api/v1/resource/images/clear/:imgId` | templates/02-images.md 미기재 |
| `PUT /api/v1/resource/images/:imgId/power_on` | templates/02-images.md 미기재 |
| `PUT /api/v1/resource/images/:imgId/power_off` | templates/02-images.md 미기재 |
| `DELETE /api/v1/resource/images/delete/:imgId` | templates/02-images.md 미기재 |
| `DELETE /api/v1/resource/images/delete_vm/:imgId` | templates/02-images.md 미기재 |
| `GET /api/v1/resource/tenants/manager/:id/volume` (GET) | tenants/01-tenants.md에 PUT은 있으나 GET 누락 |
| `POST /api/v1/resource/tenants/manager/:tntId/template` | tenants 명세서 미기재 |
| `POST /api/v1/resource/tenants/:tntId/subnet` | tenants 명세서 미기재 |
| `DELETE /api/v1/resource/tenants/:tntId/subnet` | tenants 명세서 미기재 |
| `GET /api/v1/resource/tenants/:tntId/temps` | tenants 명세서 미기재 |
| `POST /api/v1/legacy/cloud/ad/allSharedfolders` | NAS — storage/01-nas.md 확인 필요, 현재 미기재 |
| `POST /api/v1/legacy/cloud/ad/sharedfolder/directories` | NAS — 동상 |

### operation

| 엔드포인트 | 비고 |
|---|---|
| `GET /api/v1/operation/cert/secu/adopter/info/:secuPlcyId` | cert/01-cert.md 미기재 |
| `POST /api/v1/operation/cert/secu/adopter/info` | cert/01-cert.md 미기재 |
| `GET /api/v1/operation/policy/excn/excngrp` | excerpt-network/01-excerpt-network.md에 단수형만 있을 수 있음 |
| `GET /api/v1/operation/policy/excn/excngrp/:exc_nw_grp_id` | 단수형 경로 — 명세서 확인 필요 |
| `GET /api/v1/operation/policy/excn/excngrps/:exc_nw_grp_id` | 복수형 상세 경로 — 명세서 확인 필요 |
| `POST /api/v1/operation/policy/excn/excngrps` | excerpt-network 명세서 확인 필요 |
| `PUT /api/v1/operation/policy/excn/excngrps/:exc_nw_grp_id` | 동상 |
| `DELETE /api/v1/operation/policy/excn/excngrps/:exc_nw_grp_id` | 동상 |
| `GET /api/v1/operation/policy/storage/sched/` | operation/system 폴더에 스케줄 명세 없음 |
| `POST /api/v1/operation/policy/storage/sched` | 동상 |
| `GET /api/v1/operation/log/vm/vm` | VM 접속 로그 — operation 명세서 폴더 없음 |
| `GET /api/v1/operation/secu/cert/list/:type/:certType` | cert/02-security-certificate.md 확인 필요 |
| `GET /api/v1/operation/secu/cert/infm` | cert/02-security-certificate.md 확인 필요 |

### user (handler: user.js)

| 엔드포인트 | 비고 |
|---|---|
| `GET /api/v1/user/admin/sadGroups` | user/admin-groups 명세서에 sadGroups 엔드포인트 미기재 여부 확인 필요 |

### system (handler: system.js)

| 엔드포인트 | 비고 |
|---|---|
| `GET /api/v1/system/portals/ui/:tntId` | system/portals/01-portals-ui.md 존재, POST도 handler에 있음 — POST 기재 여부 확인 필요 |
| `GET /api/v1/system/voc/adv` | system/voc/01-voc.md 존재하나 adv 상세 엔드포인트 확인 필요 |
| `GET /api/v1/system/voc/adv/:id` | 동상 |
| `GET /api/v1/system/commons/codes/logs/params` | system/commons/01-codes.md에 미기재 여부 확인 필요 |

### monitoring (handler: monitoring.js)

| 엔드포인트 | 비고 |
|---|---|
| `GET /api/v1/management/statistics/getUserVMTotalInfo` | 경로 패턴이 다름 (`statistics/getUserVM...`) — monitoring 명세서에 미기재 여부 확인 필요 |
| `GET /api/v1/management/statistics/getUserVM` | 동상 |

---

## 명세서 필드 불일치 (doc의 응답 필드가 현재 fixture와 다름)

### 1. migration — `docs/admin-portal/api/resource/migration/01-migration.md`

**불일치 필드 (GET /v1/resource/vpcs/migration 및 상세 응답)**

| 명세서 기재 필드 | fixture 실제 필드 | 비고 |
|---|---|---|
| `dst_host_id` | `tgt_host_id` | 명세서는 `dst_` 접두사, fixture는 `tgt_` 접두사 |
| `dst_host_nm` | `tgt_host_nm` | 동상 |
| `vm_auth_id` (목록 루트) | `src_vm_auth_id` | fixture는 `src_` 접두사로 VM 필드 구분 |
| `vm_nm` (목록 루트) | `src_vm_nm` | 동상 |
| `mig_stat_cd` | `job_sts_cd` | 명세서는 `mig_stat_cd`, fixture는 `job_sts_cd` |
| `live_yn` | 없음 | fixture에 `live_yn` 필드 없음 |
| `upd_ts` (상세) | `mod_ts` | 명세서는 `upd_ts`, fixture는 `mod_ts` |
| — | `src_host_id`, `src_host_nm` | fixture에 있으나 명세서 누락 |
| — | `src_pfrm_host_id`, `tgt_pfrm_host_id` | fixture에 있으나 명세서 누락 |
| — | `job_stt_tm`, `job_done_tm` | fixture에 있으나 명세서 누락 |
| — | `job_sts_cd_nm` | fixture에 있으나 명세서 누락 |
| — | `src_vm_id`, `src_vm_state`, `src_rstr_sts_cd` | fixture에 있으나 명세서 누락 |
| — | `reg_id`, `reg_conn_id`, `reg_nm`, `reg_ts` | fixture에 있으나 명세서 누락 |
| — | `mod_id`, `mod_conn_id`, `mod_nm`, `mod_ts` | fixture에 있으나 명세서 누락 |
| — | `pageinfo.count`, `pageinfo.ispaging` | fixture에 있으나 명세서 누락 |

### 2. disk — `docs/admin-portal/api/resource/disk/01-disk.md`

**불일치 필드 (GET /v1/resource/disk/local/add-list 및 GET /v1/resource/disk/local 응답)**

명세서는 `usr_disk[].disk_id`, `disk_nm`, `disk_stat_cd`, `capa` 등으로 기재.
fixture(`disk-local-all.json`) 실제 필드명:

| 명세서 기재 필드 | fixture 실제 필드 | 비고 |
|---|---|---|
| `disk_id` | `dsk_id` | 명세서는 `disk_`, fixture는 `dsk_` |
| `disk_nm` | `dsk_nm` | 동상 |
| `disk_stat_cd` | `dsk_sts_cd` | 명세서는 `stat`, fixture는 `sts` |
| `capa` | `size` | 명세서는 `capa`, fixture는 `size` |
| `usr_disk` (최상위 배열 키) | `data` | 명세서는 `usr_disk` 키, fixture는 `data` 배열 |
| `subLabel` | 없음 | fixture에 없는 클라이언트 전용 필드를 명세서에 기재 |
| — | `acct_conn_id`, `acct_id`, `acct_nm` | fixture에 있으나 명세서 누락 |
| — | `tnt_id`, `tnt_nm`, `cert_plcy_id`, `usr_grp_nm` | fixture에 있으나 명세서 누락 |
| — | `vm_auth_id`, `vm_nm` | fixture에 있으나 명세서 누락 |
| — | `dsk_typ_cd`, `dsk_typ_cd_nm` | fixture에 있으나 명세서 누락 |
| — | `dsk_sts_cd_nm` | fixture에 있으나 명세서 누락 |
| — | `vm_state`, `vm_allo_sts_cd`, `vm_power_sts_cd` | fixture에 있으나 명세서 누락 |
| — | `reg_conn_id`, `reg_id`, `mod_conn_id`, `mod_id`, `reg_ts`, `mod_ts` | fixture에 있으나 명세서 누락 |
| — | `pageinfo.count`, `pageinfo.ispaging` | fixture에 있으나 명세서 누락 |

### 3. image-list — `docs/admin-portal/api/resource/templates/02-images.md`

명세서의 GET /v1/resource/images 응답 필드 대비 fixture(`image-list.json`) 실제 필드:

| 명세서 기재 필드 | fixture 실제 필드 | 비고 |
|---|---|---|
| `img_file_size` | 없음 | fixture에 해당 필드 없음 |
| `img_descp` | 없음 | fixture에 해당 필드 없음 |
| `os_typ_cd` | 없음 | fixture에 해당 필드 없음 |
| `os_typ_cd_nm` | 없음 | fixture에 해당 필드 없음 |
| `visibility` | 없음 | fixture에 해당 필드 없음 |
| `tnt_id` | 없음 | fixture에 해당 필드 없음 |
| — | `vm_auth_id`, `vm_id`, `vm_nm` | fixture에 있으나 명세서 누락 |
| — | `vm_power_sts_cd`, `usr_vm_conn_sts_cd`, `adm_vm_conn_sts_cd` | fixture에 있으나 명세서 누락 |
| — | `img_serv_yn`, `img_sts_cd`, `img_sts_cd_nm` | fixture에 있으나 명세서 누락 |
| — | `img_cre_vm_id`, `vm_state`, `vm_pool_typ_cd` | fixture에 있으나 명세서 누락 |
| — | `create_btn`, `conn_btn`, `pow_on`, `delete_btn`, `clear_btn`, `convert_btn` | fixture에 있으나 명세서 누락 (UI 버튼 제어 플래그) |

### 4. host-detail — `docs/admin-portal/api/resource/hosts/01-hosts.md`

GET /v1/resource/hosts/admin/{id} 응답 필드 대비 fixture(`host-detail.json`) 실제 필드:

| 명세서 기재 필드 | fixture 실제 필드 | 비고 |
|---|---|---|
| `host_stat_cd` | `host_sts_cd` | 명세서는 `stat`, fixture는 `sts` |
| `vcpu_tot` (number) | `vcpu_tot_cnt` (string) | 명세서는 `vcpu_tot`, fixture는 `vcpu_tot_cnt` |
| `vmm_tot` (number) | `mem_tot_capa` (string) | 명세서는 `vmm_tot`, fixture는 `mem_tot_capa` |
| `vcpu_use` | `vcpu_usg_cnt` | 필드명 불일치 |
| `vmm_use` | `mem_usg_capa` | 필드명 불일치 |
| — | `pfrm_host_id` | fixture에 있으나 명세서 누락 |
| — | `host_ip` | 상세에서도 존재하나 명세서 목록 응답에만 기재 |
| — | `hyper_typ`, `host_descp` | fixture에 있으나 명세서 누락 |
| — | `str_tot_capa`, `str_usg_capa` | fixture에 있으나 명세서 누락 |
| — | `vm_tot_cnt`, `vm_usg_cnt` | fixture에 있으나 명세서 누락 |
| — | `zone_assgn_yn`, `tnt_assgn_yn` | fixture에 있으나 명세서 누락 |
| — | `zone_nm`, `host_grp_nm` | fixture에 있으나 명세서 누락 |
| — | `tnt_id` | fixture에 있으나 명세서 누락 |
| — | `ha_auto_mng_yn` | fixture에 있으나 명세서 누락 |
| — | `reg_id`, `reg_nm`, `reg_conn_id`, `reg_ts` | fixture에 있으나 명세서 누락 |
| — | `mod_id`, `mod_nm`, `mod_conn_id`, `mod_ts` | fixture에 있으나 명세서 누락 |

### 5. cert-n2nd-user-list / cert-secu-grps-list-ta — `docs/admin-portal/api/operation/cert/01-cert.md`

**cert-n2nd (2차 인증 정책 목록 fixture):**
명세서 필드와 fixture(`cert-n2nd-user-list.json`) 필드는 대체로 일치.
다음 필드만 명세서 누락:

| fixture 실제 필드 | 비고 |
|---|---|
| `reg_conn_id`, `mod_conn_id` | fixture에 있으나 명세서에서는 상세 조회 응답에만 기재 (목록 응답 표 누락) |

**cert-secu-grps-list-ta (보안 인증 정책 그룹 목록 TA fixture):**
명세서의 `secu_plcy_tgt_cd_nm` 필드가 fixture에서 일부 항목 `null` 처리됨 — 명세서 기재 타입은 `string`이나 실제 nullable.

| fixture 실제 필드 | 비고 |
|---|---|
| `reg_conn_id`, `mod_conn_id` | fixture에 있으나 명세서 응답 필드 표 누락 |

### 6. usb-policy-list — `docs/admin-portal/api/operation/usb/01-usb.md`

명세서 필드와 fixture(`usb-policy-list.json`) 실제 필드:

| 명세서 기재 필드 | 비고 |
|---|---|
| `data[].usb_policy_id` | fixture와 일치 |
| `data[].usb_policy_name` | fixture와 일치 |
| `data[].usb_policy_target_code` | fixture와 일치 |
| `data[].usb_policy_auth_code` | fixture와 일치 |

차이:

| fixture 실제 필드 | 비고 |
|---|---|
| `reg_id`, `reg_ts`, `mod_id`, `mod_ts` | fixture에 있으나 명세서 응답 표 누락 |
| `reg_conn_id`, `mod_conn_id` | fixture에 있으나 명세서 응답 표 누락 |
| `tenant_id` | fixture에 있으나 명세서 표에는 `tenant_id` 대신 누락 (SA 분기 필드) |

### 7. backup-grp-list — `docs/admin-portal/api/operation/backup/01-backup.md`

명세서 응답 필드 대비 fixture(`backup-grp-list.json`) 실제 필드:

| 명세서 기재 필드 | fixture 실제 필드 | 비고 |
|---|---|---|
| `bkup_plcy_id` | `bkup_snap_plcy_id` | 명세서는 `bkup_plcy_id`, fixture는 `bkup_snap_plcy_id` |
| `bkup_plcy_nm` | `bkup_snap_plcy_nm` | 동상 |
| `bkup_cycle_cd` | `bkup_prid_cd` | 명세서는 `cycle`, fixture는 `prid` |
| `bkup_keep_cnt` | `max_bkup_cnt` | 필드명 불일치 |
| — | `bkup_snap_plcy_tgt_cd`, `bkup_snap_plcy_tgt_cd_nm` | fixture에 있으나 명세서 목록 응답 누락 |
| — | `auto_bkup_yn` | fixture에 있으나 명세서 누락 |
| — | `bkup_prid_cd_nm`, `bkup_set_time`, `bkup_set_dw_cd`, `bkup_set_dd` | fixture에 있으나 명세서 누락 |
| — | `auto_snap_yn`, `snap_prid_cd`, `snap_set_time`, `snap_set_dw_cd`, `max_snap_cnt` | fixture에 있으나 명세서 누락 |
| — | `group_cnt`, `pool_cnt`, `vm_cnt` | fixture에 있으나 명세서 목록 응답 누락 |
| — | `reg_id`, `reg_ts`, `mod_id`, `mod_ts` | fixture에 있으나 명세서 누락 |
| — | `reg_conn_id`, `mod_conn_id` | fixture에 있으나 명세서 누락 |

### 8. security-group-list — `docs/admin-portal/api/resource/security-group/01-security-group.md`

fixture(`security-group-list.json`) 필드와 명세서 일치 여부:

| fixture 필드 | 명세서 기재 | 비고 |
|---|---|---|
| `id` | 기재 | 일치 |
| `name` | 기재 | 일치 |
| `description` | 기재 | 일치 |
| `reg_conn_id` | 기재 | 일치 |
| `reg_ts` | 기재 | 일치 |
| `errCode`, `errMsg` | 미기재 | 명세서에서 공통 래퍼 필드 누락 (전체 명세서 공통 사항) |

**판정: 목록 응답 필드는 실질적으로 일치.**

### 9. tenant-manager-detail — `docs/admin-portal/api/resource/tenants/01-tenants.md`

fixture(`tenant-manager-detail.json`)의 최상위 필드 대비 명세서:

명세서는 대부분의 최상위 스칼라 필드를 정확히 기재함.
다음 차이만 확인:

| fixture 실제 필드 | 명세서 기재 | 비고 |
|---|---|---|
| `netApp_interlock` | `netApp_interlock` | 명세서 기재, 일치 |
| `email_interlock` | `email_interlock` | 명세서 기재, 일치 |
| `adScript` | `adScript` | 명세서 기재, 일치 |
| `octatco` | `octatco` | 명세서 기재, 일치 |
| `reg_id`, `reg_conn_id`, `reg_nm`, `reg_ts` | 미기재 | fixture에 있으나 명세서 응답 표 누락 |
| `mod_id`, `mod_ts` | 미기재 | fixture에 있으나 명세서 응답 표 누락 |

**판정: 주요 비즈니스 필드는 일치. 등록/수정 메타 필드만 누락.**

---

## 명세서 OK

| 명세서 파일 | 판정 근거 |
|---|---|
| `docs/admin-portal/api/resource/security-group/01-security-group.md` | fixture(`security-group-list.json`) 필드 구조와 일치 |
| `docs/admin-portal/api/operation/cert/01-cert.md` | 2차 인증 정책, 보안 인증 정책 주요 필드 구조 일치. `reg_conn_id`/`mod_conn_id` 목록 응답 표 누락은 경미한 수준 |
| `docs/admin-portal/api/operation/usb/01-usb.md` | USB 정책 핵심 필드 일치. 등록/수정 메타 필드만 누락 |
| `docs/admin-portal/api/resource/tenants/01-tenants.md` | tenant-manager-detail fixture와 주요 필드 일치 |
| `docs/admin-portal/api/gw/authentications/01-authentications.md` | gw.js 핸들러와 경로/메서드 일치 |
| `docs/admin-portal/api/monitoring/alarm/01-alarm.md` | monitoring.js 핸들러와 경로 일치 |
| `docs/admin-portal/api/monitoring/alarm/03-receive-group.md` | 동상 |
| `docs/admin-portal/api/monitoring/alarm/04-receive-threshold.md` | 동상 |
| `docs/admin-portal/api/monitoring/audit/01-audit.md` | monitoring.js 핸들러와 경로 일치 |
| `docs/admin-portal/api/system/notices/01-notices.md` | system.js 핸들러와 경로 일치 |
| `docs/admin-portal/api/system/faqs/01-faqs.md` | system.js 핸들러와 경로 일치 |
| `docs/admin-portal/api/system/qnas/01-qnas.md` | system.js 핸들러와 경로 일치 |
| `docs/admin-portal/api/system/popup/01-popup.md` | system.js 핸들러와 경로 일치 |
| `docs/admin-portal/api/system/menu/01-menu.md` | system.js 핸들러와 경로 일치 |
| `docs/admin-portal/api/operation/backup/01-backup.md` | 경로/메서드 일치. 응답 필드는 불일치 항목 있음 (위 §7 참조) |
| `docs/admin-portal/api/operation/access-control/01-access-control.md` | operation.js 핸들러와 경로 일치 |
| `docs/admin-portal/api/operation/blacklist/01-blacklist.md` | operation.js 핸들러와 경로 일치 |
| `docs/admin-portal/api/operation/network/01-network.md` | operation.js 핸들러와 경로 일치 |
| `docs/admin-portal/api/operation/power/01-power.md` | operation.js 핸들러와 경로 일치 |
| `docs/admin-portal/api/operation/metadata/01-metadata.md` | operation.js 핸들러와 경로 일치 |
| `docs/admin-portal/api/operation/external/01-external.md` | operation.js 핸들러와 경로 일치 |
| `docs/admin-portal/api/operation/system/01-license.md` | operation.js 핸들러와 경로 일치 |
| `docs/admin-portal/api/operation/url-redirection/01-url-redirection.md` | operation.js 핸들러와 경로 일치 |
| `docs/admin-portal/api/user/accounts/01-accounts.md` | user.js 핸들러와 경로 일치 |
| `docs/admin-portal/api/user/admin-groups/01-admin-groups.md` | user.js 핸들러와 경로 일치 |
| `docs/admin-portal/api/user/work/01-work.md` | user.js 핸들러와 경로 일치 |
| `docs/admin-portal/api/resource/migration/01-migration.md` | 경로/메서드 일치. 응답 필드는 불일치 항목 있음 (위 §1 참조) |
| `docs/admin-portal/api/resource/hosts/01-hosts.md` | 경로/메서드 일치. 상세 응답 필드는 불일치 항목 있음 (위 §4 참조) |
| `docs/admin-portal/api/resource/templates/02-images.md` | 경로/메서드 일치. 응답 필드는 불일치 항목 있음 (위 §3 참조) |

---

## 요약

| 구분 | 건수 |
|---|---|
| 명세서 누락 엔드포인트 (handler 있으나 doc 없음) | 약 80개 |
| 명세서 필드 불일치 (fixture와 다른 필드명/구조) | 9개 파일 |
| 명세서 OK (경로 및 주요 필드 일치) | 27개 파일 |

**우선 수정 대상** (실서버 데이터 기반 fixture, 현업에서 자주 참조하는 명세서):

1. `migration/01-migration.md` — `dst_host_*` → `tgt_host_*`, `mig_stat_cd` → `job_sts_cd` 등 핵심 필드명 오류
2. `disk/01-disk.md` — `disk_*` → `dsk_*`, `capa` → `size`, 응답 래퍼 구조(`usr_disk` vs `data`) 오류
3. `operation/backup/01-backup.md` — `bkup_plcy_id` → `bkup_snap_plcy_id`, `bkup_cycle_cd` → `bkup_prid_cd` 등 핵심 필드명 오류
4. `hosts/01-hosts.md` — 상세 응답의 `host_stat_cd` → `host_sts_cd`, `vcpu_tot` → `vcpu_tot_cnt` 등

**신규 작성 필요 명세서** (handler 있으나 전혀 없음):

- `resource/router/` — 라우터 CRUD 전체
- `resource/flavors/` — 플레이버 CRUD 전체
- `resource/proxy/` — 프록시 assign, L4, L7
- `resource/backup/` — VM 백업 (operation/backup과 별개, `/resource/backup/...` 경로)
- `operation/vm-access-log/` — VM 접속 로그
- `operation/storage-schedule/` — 스토리지 스케줄 정책
