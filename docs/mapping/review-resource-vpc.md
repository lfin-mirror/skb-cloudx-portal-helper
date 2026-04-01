# Resource VPC Fixture ↔ DTO 대조

Jackson 직렬화 규칙: DTO 필드명이 `snake_case`이면 JSON도 그대로 `snake_case` 출력. `camelCase` 필드는 Jackson 기본 설정 시 그대로 `camelCase` 출력 (별도 `@JsonProperty` 없는 한).

---

## /api/v1/resource/vpcs/group (GET - list)

- fixture: `vpc-group-list.json`
- Controller: `GroupController.paging()`
- DTO: `GroupList`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| `vm_grp_id` | `vm_grp_id` | OK |
| `vm_grp_nm` | `vm_grp_nm` | OK |
| `tnt_id` | `tnt_id` | OK |
| `tnt_nm` | `tnt_nm` | OK |
| `secu_plcy_id` | `secu_plcy_id` | OK |
| `secu_plcy_nm` | `secu_plcy_nm` | OK |
| `bkup_snap_plcy_id` | `bkup_snap_plcy_id` | OK |
| `bkup_snap_plcy_nm` | `bkup_snap_plcy_nm` | OK |
| `temp_id` | `temp_id` | OK |
| `temp_nm` | `temp_nm` | OK |
| `gdn_img_cre_yn` | `gdn_img_cre_yn` | OK |
| `pool_usg_cnt` | `pool_usg_cnt` | OK (DTO: String, fixture: number) |
| `tot_pool_max_vm_cnt` | `tot_pool_max_vm_cnt` | OK (DTO: String, fixture: number) |
| `network_cnt` | `network_cnt` | OK (DTO: String, fixture: number) |
| `reg_id` | `reg_id` | OK |
| `reg_conn_id` | `reg_conn_id` | OK |
| `reg_nm` | `reg_nm` | OK |
| `reg_ts` | `reg_ts` | OK |
| `mod_id` | `mod_id` | OK |
| `mod_conn_id` | `mod_conn_id` | OK |
| `mod_nm` | `mod_nm` | OK |
| `mod_ts` | `mod_ts` | OK |

### 불일치 요약

- **타입 불일치**: `pool_usg_cnt`, `tot_pool_max_vm_cnt`, `network_cnt` — DTO는 `String`이나 fixture에서 숫자(`2`, `20`, `1`)로 직렬화됨. 실제 백엔드 응답도 숫자일 가능성 있으나 DTO 선언은 `String`. mock 값도 `String`으로 통일 권장.
- 구조적 불일치 없음.

---

## /api/v1/resource/vpcs/group/:id (GET - detail)

- fixture: `vpc-group-detail.json`
- Controller: `GroupController.get()`
- DTO: `GroupDetail` extends `GroupList`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| *(GroupList 필드 전부)* | *(GroupList 필드 전부)* | OK (list와 동일) |
| `networks[].nw_id` | `GroupNetwork.nw_id` | OK |
| `networks[].nw_nm` | `GroupNetwork.nw_nm` | OK |
| `networks[].nw_typ_cd` | `GroupNetwork.nw_typ_cd` | **fixture에만 존재** |
| `networks[].nw_typ_cd_nm` | `GroupNetwork.nw_typ_cd_nm` | **fixture에만 존재** |
| - | `GroupNetwork.vm_grp_id` | **DTO에만 존재** (fixture 누락) |
| - | `GroupNetwork.tnt_id` | **DTO에만 존재** (fixture 누락) |
| - | `GroupNetwork.pool_nw_usg_cnt` | **DTO에만 존재** (fixture 누락) |
| `zones[].zone_nm` | `TenantZone.zone_nm` | OK |
| - | `TenantZone.host_grp_nm` | **DTO에만 존재** (fixture 누락) |
| - | `TenantZone.host_grp_id` | **DTO에만 존재** (fixture 누락) |
| - | `TenantZone.host_cnt` | **DTO에만 존재** (fixture 누락) |
| - | `TenantZone.vcpu_tot_cnt` | **DTO에만 존재** (fixture 누락) |
| - | `TenantZone.mem_tot_capa` | **DTO에만 존재** (fixture 누락) |
| - | `TenantZone.public_yn` | **DTO에만 존재** (fixture 누락) |
| `subnets[].sbn_id` | `SubnetDetail.sbn_id` | OK |
| `subnets[].sbn_nm` | `SubnetDetail.sbn_nm` | OK |
| `subnets[].nw_nm` | `SubnetDetail.nw_nm` | OK |
| `subnets[].cidr` | `SubnetDetail.cidr` | OK |
| `subnets[].nw_qos_plcy_nm` | `SubnetDetail.nw_qos_plcy_nm` | OK |
| - | `SubnetDetail.sbn` | **DTO에만 존재** (fixture 누락) |
| - | `SubnetDetail.gw` | **DTO에만 존재** (fixture 누락) |
| - | `SubnetDetail.dns_1` | **DTO에만 존재** (fixture 누락) |
| - | `SubnetDetail.dns_2` | **DTO에만 존재** (fixture 누락) |
| - | `SubnetDetail.sbn_descp` | **DTO에만 존재** (fixture 누락) |
| - | `SubnetDetail.nw_id` | **DTO에만 존재** (fixture 누락) |
| - | `SubnetDetail.nw_qos_plcy_id` | **DTO에만 존재** (fixture 누락) |
| - | `SubnetDetail.nw_qos_detail` | **DTO에만 존재** (fixture 누락) |
| - | `SubnetDetail.usg_use_cd` | **DTO에만 존재** (fixture 누락) |
| - | `SubnetDetail.usg_use_cd_nm` | **DTO에만 존재** (fixture 누락) |
| - | `SubnetDetail.pool_usg_cnt` | **DTO에만 존재** (fixture 누락) |
| - | `SubnetDetail.port_usg_cnt` | **DTO에만 존재** (fixture 누락) |
| - | `SubnetDetail.reg_id`, `reg_ts`, `reg_conn_id`, `reg_nm`, `mod_*` | **DTO에만 존재** (fixture 누락) |
| *(GroupList 상속 필드: pool_usg_cnt, tot_pool_max_vm_cnt, network_cnt 없음)* | `GroupList.pool_usg_cnt` 등 | **fixture에 없음** (detail에는 list 집계 필드 불필요하므로 정상일 수 있음) |

### 불일치 요약

- `networks[]`에 fixture가 포함한 `nw_typ_cd`, `nw_typ_cd_nm`은 `GroupNetwork` DTO에 없음. 실제 응답에는 없는 필드를 mock이 추가한 것.
- `networks[]`에서 `vm_grp_id`, `tnt_id`, `pool_nw_usg_cnt` 누락.
- `zones[]`는 `zone_nm`만 있고 `TenantZone`의 나머지 필드(`host_grp_nm`, `host_grp_id`, `host_cnt`, `vcpu_tot_cnt`, `mem_tot_capa`, `public_yn`) 전부 fixture 누락.
- `subnets[]`는 화면 표시용 핵심 필드만 있고 `SubnetDetail`의 대다수 필드 누락. 화면에 영향 없는 필드는 생략해도 무방하나 `nw_id`는 그룹 상세 화면에서 서브넷-네트워크 연결 표시에 사용될 수 있어 확인 필요.

---

## /api/v1/resource/vpcs/pool (GET - list) / /api/v1/resource/vpcs/pool2 (GET)

- fixture: `vpc-pool-list.json`
- Controller: `PoolController.paging()` / `PoolController.paging2()`
- DTO: `PoolList`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| `vm_pool_id` | `vm_pool_id` | OK |
| `vm_pool_nm` | `vm_pool_nm` | OK |
| `vm_grp_id` | `vm_grp_id` | OK |
| `vm_grp_nm` | - | **fixture에만 존재** (DTO에 `vm_grp_nm` 없음) |
| `tnt_id` | `tnt_id` | OK |
| `tnt_nm` | - | **fixture에만 존재** (DTO에 `tnt_nm` 없음) |
| `tnt_mtd_cd` | `tnt_mtd_cd` | OK |
| `tnt_mtd_cd_nm` | `tnt_mtd_cd_nm` | OK |
| `temp_id` | `temp_id` | OK |
| `temp_nm` | - | **fixture에만 존재** (DTO에 `temp_nm` 없음) |
| `vm_pool_sts_cd` | `vm_pool_sts_cd` | OK |
| `vm_pool_sts_cd_nm` | `vm_pool_sts_cd_nm` | OK |
| `fail_msg` | `fail_msg` | OK |
| `max_vm_cnt` | `max_vm_cnt` | OK (DTO: String, fixture: number) |
| `min_vm_cnt` | `min_vm_cnt` | OK (DTO: String, fixture: number) |
| `spr_vm_cnt` | `spr_vm_cnt` | OK (DTO: String, fixture: number) |
| `allo_vm_cnt` | `allo_vm_cnt` | OK (DTO: String, fixture: number) |
| `tot_vm_cnt` | `tot_vm_cnt` | OK (DTO: String, fixture: number) |
| `cre_resv_vm_cnt` | `cre_resv_vm_cnt` | OK (DTO: String, fixture: number) |
| `assign_ready_vm_cnt` | `assign_ready_vm_cnt` | OK (DTO: String, fixture: number) |
| `pool_ready_vm_cnt` | `pool_ready_vm_cnt` | OK (DTO: String, fixture: number) |
| `ad_itlk_usg_yn` | `ad_itlk_usg_yn` | OK |
| `ad_vdi_ou` | `ad_vdi_ou` | OK |
| `auto_allo_yn` | `auto_allo_yn` | OK |
| `alw_power_on_yn` | `alw_power_on_yn` | OK |
| `init_use_yn` | `init_use_yn` | OK |
| `suppl_dsk_usg_yn` | `suppl_dsk_usg_yn` | OK |
| `rset_plcy_id` | `rset_plcy_id` | OK |
| `power_mng_plcy_id` | `power_mng_plcy_id` | OK |
| `power_mng_plcy_usg_yn` | `power_mng_plcy_usg_yn` | OK |
| `zone_nm` | `zone_nm` | OK |
| `volm_typ_id` | - | **fixture에만 존재** (DTO 최상위에 `volm_typ_id` 없음) |
| `volm_typ_nm` | - | **fixture에만 존재** (DTO 최상위에 `volm_typ_nm` 없음) |
| `volm_sched_plcy_id` | `volm_sched_plcy_id` | OK |
| `secu_plcy_id` | `secu_plcy_id` | OK |
| `secu_plcy_nm` | `secu_plcy_nm` | OK |
| `bkup_snap_plcy_id` | `bkup_snap_plcy_id` | OK |
| `bkup_snap_plcy_nm` | `bkup_snap_plcy_nm` | OK |
| `reg_id` | `reg_id` | OK |
| `reg_conn_id` | `reg_conn_id` | OK |
| `reg_nm` | `reg_nm` | OK |
| `reg_ts` | `reg_ts` | OK |
| `mod_id` | `mod_id` | OK |
| `mod_conn_id` | `mod_conn_id` | OK |
| `mod_nm` | `mod_nm` | OK |
| `mod_ts` | `mod_ts` | OK |
| `volumes[].volm_typ_id` | `PoolVolumeType.volm_typ_id` | OK |
| `volumes[].volm_typ_nm` | `PoolVolumeType.volm_typ_nm` | OK |
| `volumes[].volm_qos_plcy_id` | `PoolVolumeType.volm_qos_plcy_id` | OK |
| `volumes[].volm_qos_plcy_nm` | `PoolVolumeType.volm_qos_plcy_nm` | OK |
| `volumes[].volm_qos_detail` | `PoolVolumeType.volm_qos_detail` (VolumeQosDetail) | OK (구조 일치) |
| - | `PoolVolumeType.vm_pool_id` | **DTO에만 존재** (fixture 누락) |
| - | `PoolVolumeType.volm_usg_typ` | **DTO에만 존재** (fixture 누락) |
| - | `PoolVolumeType.volm_usg_typ_nm` | **DTO에만 존재** (fixture 누락) |
| - | `PoolVolumeType.tot_capa` | **DTO에만 존재** (fixture 누락) |
| - | `PoolVolumeType.usg_capa` | **DTO에만 존재** (fixture 누락) |
| - | `PoolVolumeType.psb_capa` | **DTO에만 존재** (fixture 누락) |
| - | `PoolVolumeType.usg_ratio` | **DTO에만 존재** (fixture 누락) |
| - | `PoolList.fail_cnt` | **DTO에만 존재** (fixture 누락) |
| - | `PoolList.gdn_img_cre_yn` | **DTO에만 존재** (fixture 누락) |
| - | `PoolList.allo_enable_yn` | **DTO에만 존재** (fixture 누락) |
| - | `PoolList.os_typ_cd` | **DTO에만 존재** (fixture 누락) |
| - | `PoolList.name_rule_use_yn` | **DTO에만 존재** (fixture 누락) |
| - | `PoolList.vpc_name_rule_id` | **DTO에만 존재** (fixture 누락) |
| - | `PoolList.vpc_name_rule_nm` | **DTO에만 존재** (fixture 누락) |
| - | `PoolList.alias_rule_use_yn` | **DTO에만 존재** (fixture 누락) |
| - | `PoolList.vpc_alias_rule_id` | **DTO에만 존재** (fixture 누락) |
| - | `PoolList.vpc_alias_rule_nm` | **DTO에만 존재** (fixture 누락) |

### 불일치 요약

- fixture에 `vm_grp_nm`, `tnt_nm`, `temp_nm` 있으나 `PoolList` DTO에 해당 필드 없음. 화면에서 이 값들을 사용한다면 실제 응답에 포함되어야 하므로 MyBatis mapper 또는 서비스 레이어에서 추가 조회 후 주입하는 구조일 가능성이 높음. 확인 필요.
- fixture에 `volm_typ_id`, `volm_typ_nm` 최상위 필드가 있으나 `PoolList` 최상위에 해당 필드 없음 (`volumes[]` 배열 안에만 존재). 화면이 최상위에서 이 값을 읽는다면 불일치.
- `PoolVolumeType`의 `volm_usg_typ`, 용량 관련 필드(`tot_capa`, `usg_capa`, `psb_capa`, `usg_ratio`) 전부 fixture 누락.
- `PoolList`의 네이밍/별칭 정책 필드(`name_rule_use_yn`, `vpc_name_rule_id` 등) fixture 누락. 해당 필드를 사용하는 화면이 있다면 mock 응답에 추가 필요.
- **타입 불일치**: VM 카운트 관련 필드들(`max_vm_cnt`, `min_vm_cnt` 등) — DTO는 `String`, fixture는 `number`.

---

## /api/v1/resource/vpcs/pool/:vmPoolId (GET - detail)

- fixture: `vpc-pool-detail.json`
- Controller: `PoolController.get()`
- DTO: `PoolDetail` extends `PoolList`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| *(PoolList 필드)* | *(PoolList 필드)* | list와 동일한 불일치 포함 |
| `subnets[].sbn_id` | `PoolSubnet.sbn_id` | OK |
| `subnets[].sbn_nm` | `PoolSubnet.sbn_nm` | OK |
| `subnets[].nw_id` | `PoolSubnet.nw_id` | OK |
| `subnets[].nw_nm` | `PoolSubnet.nw_nm` | OK |
| `subnets[].cidr` | `PoolSubnet.cidr` | OK |
| `subnets[].nw_qos_plcy_nm` | `PoolSubnet.nw_qos_plcy_nm` | OK |
| - | `PoolSubnet.vm_pool_id` | **DTO에만 존재** (fixture 누락) |
| - | `PoolSubnet.vm_grp_id` | **DTO에만 존재** (fixture 누락) |
| - | `PoolSubnet.nw_qos_plcy_id` | **DTO에만 존재** (fixture 누락) |
| - | `PoolSubnet.nw_qos_detail` | **DTO에만 존재** (fixture 누락) |

### 불일치 요약

- list 불일치 모두 동일하게 적용.
- `subnets[]`는 화면 표시 핵심 필드 위주로만 구성. `vm_pool_id`, `vm_grp_id`, `nw_qos_plcy_id`, `nw_qos_detail` 누락.

---

## /api/v1/resource/vpcs/pool/count (GET)

- fixture: `vpc-pool-count.json`
- Controller: `PoolController.getPoolCount()`
- DTO: `PoolCountVO`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| `data` (숫자 `3`) | - | **불일치** — fixture는 `data`가 단순 숫자이나 DTO는 `PoolCountVO` 객체 |

### 불일치 요약

- **심각**: fixture `vpc-pool-count.json`의 `data` 값이 `3`(단순 숫자)이나 실제 DTO `PoolCountVO`는 `total`, `ded_count`, `poo_count`, `vm_total`, `vm_count` 5개 필드를 가진 객체.
- 같은 fixture를 `/api/v1/resource/vpcs/resources/list/vm2/count`와 공유 중인데, 해당 API의 DTO `PcVm2List`도 객체형으로 단순 숫자와 불일치.
- fixture를 DTO 구조에 맞게 교체 필요.

  올바른 `vpc-pool-count.json` 구조:
  ```json
  {
    "data": {
      "total": "3",
      "ded_count": "2",
      "poo_count": "1",
      "vm_total": "25",
      "vm_count": "7"
    },
    "errCode": null,
    "errMsg": null
  }
  ```

---

## /api/v1/resource/vpcs/pool/:poolId/template/history (GET)

- fixture: `vpc-pool-template-history.json`
- Controller: `PoolController.getTemplateHistory()`
- DTO: `PageResponse<TemplateHistoryEntity>`

`TemplateHistoryEntity` 필드 (camelCase → JSON 직렬화 시 camelCase 그대로 출력):

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| `temp_id` | `templateId` | **불일치** — fixture는 `temp_id`, DTO는 `templateId` (camelCase) |
| `temp_nm` | `templateName` | **불일치** — fixture는 `temp_nm`, DTO는 `templateName` |
| `chg_ts` | `createdAt` | **불일치** — fixture는 `chg_ts`, DTO는 `createdAt` |
| `chg_usr_id` | `createdBy` | **불일치** — fixture는 `chg_usr_id`, DTO는 `createdBy` |
| - | `poolId` | **DTO에만 존재** (fixture 누락) |
| - | `flavorId` | **DTO에만 존재** (fixture 누락) |
| - | `flavorName` | **DTO에만 존재** (fixture 누락) |
| - | `imageId` | **DTO에만 존재** (fixture 누락) |
| - | `imageName` | **DTO에만 존재** (fixture 누락) |

### 불일치 요약

- **심각**: `TemplateHistoryEntity`는 camelCase 필드를 사용하므로 JSON 응답도 `templateId`, `templateName`, `createdAt`, `createdBy`로 직렬화됨. fixture는 `temp_id`, `temp_nm`, `chg_ts`, `chg_usr_id`로 다른 명명 규칙 사용. 완전 불일치.
- `poolId`, `flavorId`, `flavorName`, `imageId`, `imageName` fixture에서 누락.
- `PageResponse` 래퍼 구조도 확인 필요 (`data` 아래에 `content`/`items` 등 별도 래핑 여부).

  올바른 fixture 필드명:
  ```json
  {
    "data": [
      {
        "poolId": "...",
        "templateId": "TEMP-001",
        "templateName": "Windows 10 기본",
        "flavorId": "...",
        "flavorName": "...",
        "imageId": "...",
        "imageName": "...",
        "createdBy": "admin",
        "createdAt": "2026-01-15T09:00:00"
      }
    ]
  }
  ```

---

## /api/v1/resource/vpcs/pool/:id/image-mismatched-vm (GET)

- fixture: `vpc-image-mismatched.json`
- Controller: `PoolController.getMismatchedVm()`
- DTO: `PageResponse<VMStatusEntity>`

`VMStatusEntity` 필드 (camelCase):

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| `vm_auth_id` | `vmId` | **불일치** — fixture는 `vm_auth_id`, DTO는 `vmId` |
| `vm_nm` | `vmName` | **불일치** — fixture는 `vm_nm`, DTO는 `vmName` |
| `cur_img_id` | - | **fixture에만 존재** (DTO에 없음) |
| `tgt_img_id` | - | **fixture에만 존재** (DTO에 없음) |
| - | `vmPoolTypeCode` | **DTO에만 존재** (fixture 누락) |
| - | `userConnectStatusCode` | **DTO에만 존재** (fixture 누락) |
| - | `adminConnectStatusCode` | **DTO에만 존재** (fixture 누락) |

### 불일치 요약

- **심각**: `VMStatusEntity`도 camelCase 필드. JSON 응답은 `vmId`, `vmName`, `vmPoolTypeCode`, `userConnectStatusCode`, `adminConnectStatusCode`.
- fixture의 `vm_auth_id`는 `vmId`와 필드 의미도 다름 (vm_auth_id vs vmId).
- fixture의 `cur_img_id`, `tgt_img_id`는 DTO에 없는 필드.
- fixture를 DTO 구조로 전면 교체 필요.

---

## /api/v1/resource/vpcs/pool/:vmPoolId/ip (GET)

- fixture: `vpc-pool-ip-list.json`
- Controller: **미매핑** (mapping doc에 "미매핑" 표기)
- DTO: 없음

DTO 기준 비교 불가. fixture 필드만 기록:

| fixture 필드 | 비고 |
|---|---|
| `ip_id` | - |
| `ip_addr` | - |
| `ip_usg_typ_cd` | - |
| `vm_auth_id` | - |
| `acct_id` | - |

---

## /api/v1/resource/vpcs/resources (GET - list)

- fixture: `vpc-resources-list.json`
- Controller: `PcController.paging()`
- DTO: `List<PcListBase>` (실제 구현체: `PcList` 상속 기반)

`PcList` 기준 (fixture의 대표 필드 대조):

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| `vm_auth_id` | `vm_auth_id` | OK |
| `acct_id` | `acct_id` | OK |
| `usr_grp_id` | `usr_grp_id` | OK |
| `usr_grp_nm` | `usr_grp_nm` | OK |
| `vm_id` | `vm_id` | OK |
| `vm_nm` | `vm_nm` | OK |
| `vm_grp_nm` | `vm_grp_nm` | OK |
| `vm_ip` | `vm_ip` | OK |
| `vm_als` | `vm_als` | OK |
| `vm_descp` | `vm_descp` | OK |
| `vm_on_ctrl_tm` | `vm_on_ctrl_tm` | OK |
| `rstr_sts_cd` | `rstr_sts_cd` | OK |
| `rstr_sts_cd_nm` | `rstr_sts_cd_nm` | OK |
| `vm_allo_sts_cd` | `vm_allo_sts_cd` | OK |
| `vm_allo_sts_cd_nm` | `vm_allo_sts_cd_nm` | OK |
| `usr_vm_conn_sts_cd` | `usr_vm_conn_sts_cd` | OK |
| `usr_vm_conn_sts_cd_nm` | `usr_vm_conn_sts_cd_nm` | OK |
| `vm_power_sts_cd` | `vm_power_sts_cd` | OK |
| `vm_power_sts_cd_nm` | `vm_power_sts_cd_nm` | OK |
| `vcpu_cnt` | `vcpu_cnt` | OK |
| `vmm_capa` | `vmm_capa` | OK |
| `vhd_capa` | `vhd_capa` | OK |
| `tnt_id` | `tnt_id` | OK |
| `tnt_nm` | `tnt_nm` | OK |
| `tnt_mtd_cd` | `tnt_mtd_cd` | OK |
| `tnt_mtd_cd_nm` | `tnt_mtd_cd_nm` | OK |
| `vm_pool_id` | `vm_pool_id` | OK |
| `vm_pool_nm` | `vm_pool_nm` | OK |
| `acct_conn_id` | `acct_conn_id` | OK |
| `acct_nm` | `acct_nm` | OK |
| `reg_conn_id` | `reg_conn_id` | OK |
| `mod_conn_id` | `mod_conn_id` | OK |
| `reg_ts` | `reg_ts` | OK |
| `mod_ts` | `mod_ts` | OK |

### 불일치 요약

- 주요 표시 필드 일치. 다만 fixture에 없고 DTO에만 있는 필드 다수:
  - `vm_vlid_stt_dt`, `vm_vlid_end_dt`, `static_ip_usg_yn`, `vm_state`, `task_state`
  - `vm_allo_typ_cd`, `vm_allo_typ_cd_nm`, `adm_vm_conn_sts_cd`, `adm_vm_conn_sts_cd_nm`
  - `temp_id`, `temp_nm`, `flavor_id`, `img_id`, `img_nm`, `os_typ_cd`, `os_typ_cd_nm`
  - `dsk_sum`, `vhd_capa_total`, `volm_*`, `secu_plcy_*`, `bkup_snap_*`
  - `host_id`, `host_nm`, `host_sts_cd`, `zone_nm`, `mnt_yn`, `gdn_img_cre_yn`
  - `reg_id`, `reg_nm`, `mod_id`, `mod_nm`, `allo_fail_msg` 등
- 화면 표시에 필요한 필드 위주로만 fixture 구성됨. 사용하는 화면 컴포넌트에서 추가 필드 접근 시 `undefined` 반환으로 UI 오류 가능성.

---

## /api/v1/resource/vpcs/resources/:id (GET - detail)

- fixture: `vpc-resource-detail.json`
- Controller: `PcController.get()`
- DTO: `PcDetail` extends `PcList`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| `vm_auth_id` | `vm_auth_id` | OK |
| `vm_nm` | `vm_nm` | OK |
| `tnt_id` | `tnt_id` | OK |
| `vm_pool_id` | `vm_pool_id` | OK |
| `vm_pwr_stat_cd` | - | **fixture에만 존재** — DTO에 없음 (`vm_power_sts_cd`가 올바른 필드명) |
| `vm_allo_stat_cd` | - | **fixture에만 존재** — DTO에 없음 (`vm_allo_sts_cd`가 올바른 필드명) |
| `vmm_capa` | `vmm_capa` | OK (DTO: String, fixture: number) |
| `vcpu_cnt` | `vcpu_cnt` | OK (DTO: String, fixture: number) |
| `flavor_id` | `flavor_id` | OK |
| - | `PcDetail.ports` | **DTO에만 존재** (fixture 누락) |
| - | `PcDetail.network_qos` | **DTO에만 존재** (fixture 누락) |
| - | `PcDetail.port_qos` | **DTO에만 존재** (fixture 누락) |
| - | *(PcList 전체 필드)* | 대부분 **DTO에만 존재** (fixture에서 매우 적은 필드만 포함) |

### 불일치 요약

- **심각**: fixture가 매우 빈약. `vm_pwr_stat_cd`, `vm_allo_stat_cd`는 DTO의 올바른 필드명(`vm_power_sts_cd`, `vm_allo_sts_cd`)과 다름. 화면에서 전원/할당 상태 표시 시 필드명 불일치로 항상 `undefined`.
- `PcList`의 거의 모든 필드가 fixture에서 누락. 상세 화면 렌더링에 문제 발생 가능.
- fixture를 `vpc-resources-list.json`의 항목 구조 기반으로 확장하고, `ports`, `network_qos`, `port_qos` 추가 필요.

---

## /api/v1/resource/vpcs/resources/list/vm2 (GET)

- fixture: `vpc-resources-list.json` (resources list와 공유)
- Controller: `PcController.listVm2()`
- DTO: `List<PcVm2ListBase>`

`PcVm2ListBase` vs fixture(PcList 구조):

| 상태 | 비고 |
|---|---|
| fixture 구조가 `PcList` 기반 | `PcVm2ListBase`는 별도 필드셋 (`assgn_yn`, `bandWidth`, `latency`, `host_tnt_yn`, `vm_grp_id` 등 포함) |
| fixture에 없는 `PcVm2ListBase` 전용 필드 | `assgn_yn`, `bandWidth`, `latency`, `host_tnt_yn`, `vm_grp_id` |
| fixture에 있고 `PcVm2ListBase`에 없는 필드 | `usr_grp_id`, `usr_grp_nm`, `vm_als`, `vm_descp`, `vm_on_ctrl_tm`, `rstr_sts_cd*`, `secu_plcy_*`, `bkup_snap_*`, `tnt_mtd_*`, `acct_conn_id`, `acct_nm` 등 |

### 불일치 요약

- `vpc-resources-list.json`을 두 API(`/resources`, `/resources/list/vm2`)가 공유하나 DTO 구조가 다름. `/resources/list/vm2` 전용 fixture를 분리하여 `PcVm2ListBase` 필드 구조로 작성 필요.

---

## /api/v1/resource/vpcs/resources/list/vm2/count (GET)

- fixture: `vpc-pool-count.json` (pool count와 공유)
- Controller: `PcController.listVm2Count()`
- DTO: `PcVm2List`

`PcVm2List` 필드: `PcVm2ListBase` 전체 + `acct_conn_id`, `acct_nm`

| fixture 값 | DTO | 상태 |
|---|---|---|
| `data: 3` (단순 숫자) | `PcVm2List` 객체 | **불일치** — fixture는 단순 숫자, DTO는 VM 목록 객체 |

### 불일치 요약

- **심각**: fixture `vpc-pool-count.json`(`data: 3`)을 공유하나 `PcVm2List`는 카운트가 아닌 VM 정보 객체. API 이름이 `listVm2Count`이지만 DTO가 `PcVm2List`인 것으로 볼 때 단순 카운트 숫자가 아닌 별도 데이터 구조일 가능성. 별도 fixture 필요.

---

## 전체 불일치 요약

| 분류 | 해당 API | 심각도 |
|---|---|---|
| fixture `data`가 단순 숫자인데 DTO는 객체 | `/pool/count`, `/resources/list/vm2/count` | 높음 |
| DTO camelCase vs fixture snake_case 필드명 불일치 | `/pool/template/history`, `/pool/image-mismatched-vm` | 높음 |
| fixture 필드명이 DTO와 다름 (`vm_pwr_stat_cd` 등) | `/resources/:id` (detail) | 높음 |
| 두 API가 같은 fixture 공유하나 DTO 구조 다름 | `/resources` + `/resources/list/vm2`, `/pool/count` + `/resources/list/vm2/count` | 높음 |
| fixture에 DTO에 없는 필드 포함 (`vm_grp_nm`, `tnt_nm`, `temp_nm` 등 PoolList) | `/pool` list | 중간 |
| fixture에 DTO에 없는 필드 포함 (`nw_typ_cd` 등 GroupNetwork) | `/group/:id` detail | 낮음 |
| DTO 필드 다수 fixture 누락 (화면에서 미사용 필드) | 전반 | 낮음 |
| DTO String vs fixture number 타입 불일치 (VM 카운트 필드들) | `/group` list, `/pool` list/detail | 낮음 |
