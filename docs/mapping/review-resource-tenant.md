# Resource MS — Tenant & Security Group API 필드 대조 리포트

대조 기준일: 2026-03-31

---

## 검토 범위

| API 그룹 | 대조 대상 |
|---|---|
| `/api/v1/resource/tenants/manager` | list, detail, all, license |
| `/api/v1/resource/policies/security-group` | list, detail, rule, history, sync |

**제외**: 매핑 문서에서 미매핑으로 분류된 `tenants/manager/usehost`, `nonehost`, `ignore/:tntId`, `/:tenantId/volume (GET)` — 대조 불가.

---

## 1. `/api/v1/resource/tenants/manager` (GET) — 목록

- **fixture**: `tenant-manager-list.json`
- **Controller**: `TenantManagerController.paging()`
- **Response DTO**: `TenantManagerList`

### 결과: 불일치 — fixture 필드 대폭 누락

`TenantManagerList`는 22개 필드를 정의하지만, fixture `data[]` 항목은 6개 필드만 포함.

| 필드 | DTO | fixture | 비고 |
|---|---|---|---|
| `tnt_id` | O | O | 일치 |
| `tnt_nm` | O | O | 일치 |
| `tnt_stat_cd` | X | O | **DTO에 없는 필드** — fixture 임의 추가 |
| `dm_id` | O | O | 일치 |
| `secu_plcy_id` | X | O | **DTO에 없는 필드** — fixture 임의 추가 |
| `bkup_snap_plcy_id` | O | O | 일치 (DTO에 있음) |
| `pfrm_tnt_nm` | O | X | fixture 누락 |
| `tnt_descp` | O | X | fixture 누락 |
| `ha_auto_mng_yn` | O | X | fixture 누락 |
| `host_tnt_yn` | O | X | fixture 누락 |
| `vm_grp_usg_yn` | O | X | fixture 누락 |
| `vcpu_psb_cnt` | O | X | fixture 누락 |
| `vmm_psb_capa` | O | X | fixture 누락 |
| `tot_vm_psb_cnt` | O | X | fixture 누락 |
| `tot_vm_usg_cnt` | O | X | fixture 누락 |
| `phy_sbn_tot_cnt` | O | X | fixture 누락 |
| `phy_sbn_usg_cnt` | O | X | fixture 누락 |
| `vcpu_usg_cnt` | O | X | fixture 누락 |
| `vmm_usg_capa` | O | X | fixture 누락 |
| `rtr_cnt` | O | X | fixture 누락 |
| `img_cnt` | O | X | fixture 누락 |
| `bkup_snap_plcy_nm` | O | X | fixture 누락 |
| `volm_sched_plcy_id` | O | X | fixture 누락 |
| `l4_proxy_asg_yn` | O | X | fixture 누락 |
| `l7_proxy_asg_yn` | O | X | fixture 누락 |
| `tnt_url_id` | O | X | fixture 누락 |
| `main_tnt_yn` | O | X | fixture 누락 |
| `ad_itlk_usg_yn` | O | X | fixture 누락 |
| `octatco_usg_yn` | O | X | fixture 누락 |
| `shar_str_usg_yn` | O | X | fixture 누락 |
| `viwr_con_plcy_yn` | O | X | fixture 누락 |
| `viwr_con_cnt` | O | X | fixture 누락 |
| `netApp_interlock` | O | X | fixture 누락 |
| `email_interlock` | O | X | fixture 누락 |
| `adScript` | O | X | fixture 누락 |
| `octatco` | O | X | fixture 누락 |
| `reg_id` / `reg_conn_id` / `reg_nm` / `reg_ts` | O | X | fixture 누락 |
| `mod_id` / `mod_ts` | O | X | fixture 누락 |

**문제 요약**:
- `tnt_stat_cd`, `secu_plcy_id` — DTO에 존재하지 않는 필드. fixture가 임의로 추가한 값.
- 나머지 DTO 필드 대부분 fixture에서 누락. 목록 응답이 실서버와 구조적으로 다름.
- `TenantManagerList`는 목록(`paging()`)과 상세(`get()`) 모두에서 기반 클래스로 사용. 실서버 목록 응답에도 상세와 동일한 필드 구조가 반환될 가능성 있음.

---

## 2. `/api/v1/resource/tenants/manager/:id` (GET) — 상세

- **fixture**: `tenant-manager-detail.json`
- **Controller**: `TenantManagerController.get()`
- **Response DTO**: `TenantManagerDetail` (`extends TenantManagerList`)

### 결과: 대체로 일치, 일부 불일치

#### 2-1. 최상위 필드 (`TenantManagerList` 기반)

| 필드 | DTO | fixture | 비고 |
|---|---|---|---|
| `tnt_id` | O | O | 일치 |
| `tnt_nm` | O | O | 일치 |
| `pfrm_tnt_nm` | O | O | 일치 |
| `dm_id` | O | O | 일치 |
| `tnt_descp` | O | O | 일치 |
| `ha_auto_mng_yn` | O | O | 일치 |
| `host_tnt_yn` | O | O | 일치 |
| `zone_nm` | O (`@JsonIgnore`) | X | 직렬화 제외 — fixture 없어도 정상 |
| `vm_grp_usg_yn` | O | O | 일치 |
| `vcpu_psb_cnt` | O | O | 일치 |
| `vmm_psb_capa` | O | O | 일치 |
| `tot_vm_psb_cnt` | O | O | 일치 |
| `tot_vm_usg_cnt` | O | O | 일치 |
| `phy_sbn_tot_cnt` | O | O | 일치 |
| `phy_sbn_usg_cnt` | O | O | 일치 |
| `vcpu_usg_cnt` | O | O | 일치 |
| `vmm_usg_capa` | O | O | 일치 |
| `rtr_cnt` | O | O | 일치 |
| `img_cnt` | O | O | 일치 |
| `bkup_snap_plcy_id` | O | O | 일치 |
| `bkup_snap_plcy_nm` | O | O | 일치 |
| `volm_sched_plcy_id` | O | O | 일치 |
| `l4_proxy_asg_yn` | O | O | 일치 |
| `l7_proxy_asg_yn` | O | O | 일치 |
| `tnt_url_id` | O | O | 일치 |
| `main_tnt_yn` | O | O | 일치 |
| `ad_itlk_usg_yn` | O | O | 일치 |
| `octatco_usg_yn` | O | O | 일치 |
| `shar_str_usg_yn` | O | O | 일치 |
| `viwr_con_plcy_yn` | O | O | 일치 |
| `viwr_con_cnt` | O | O | 일치 |
| `reg_id` / `reg_conn_id` / `reg_nm` / `reg_ts` | O | O | 일치 |
| `mod_id` / `mod_ts` | O | O | 일치 |

#### 2-2. `netApp_interlock` (NetAppVO)

| 필드 | DTO | fixture | 비고 |
|---|---|---|---|
| `tnt_id` | O | O | 일치 |
| `cert_id` | O | O | 일치 |
| `cert_passwd_cryptval` | O | O | 일치 |
| `ip` | O | O | 일치 |
| `port` | O | O | 일치 |
| `grp_fold_cre_size` | O | O | 일치 |
| `descp` | O | O | 일치 |
| `reg_id` / `reg_ts` / `mod_id` / `mod_ts` | O | O | 일치 |

#### 2-3. `email_interlock` (EmailVO)

| 필드 | DTO | fixture | 비고 |
|---|---|---|---|
| `tnt_id` | O | O | 일치 |
| `smtp_host` | O | O | 일치 |
| `smtp_port` | O | O | 일치 |
| `from_mail` | O | O | 일치 |
| `passwd_cryptval` | O | O | 일치 |
| `enpasswd_cryptval` | O | O | 일치 |
| `protocol_type` | O | O | 일치 |
| `descp` | O | O | 일치 |
| `use_yn` | O | O | 일치 |
| `reg_id` / `reg_ts` / `mod_id` / `mod_ts` | O | O | 일치 |

#### 2-4. `adScript` (ADScriptVO)

| 필드 | DTO | fixture | 비고 |
|---|---|---|---|
| `cadno` | O | O | 일치 |
| `tnt_id` | O | O | 일치 |
| `use_yn` | O | O | 일치 |
| `adscript_contents` | O | O | 일치 |
| `reg_id` / `reg_ts` / `mod_id` / `mod_ts` | O | O | 일치 |

#### 2-5. `octatco` (OctatcoVO)

| 필드 | DTO | fixture | 비고 |
|---|---|---|---|
| `cu_octa_id` | O | O | 일치 |
| `tnt_id` | O | O | 일치 |
| `app_id` | O | O | 일치 |
| `server_domain` | O | O | 일치 |
| `did` | O | O | 일치 |
| `reg_id` / `reg_ts` / `mod_id` / `mod_ts` | O | O | 일치 |

#### 2-6. `networks[]` (NetworkDetail)

fixture의 `networks[]` 항목과 `NetworkDetail` DTO 주요 필드 대조.

| 필드 | DTO | fixture | 비고 |
|---|---|---|---|
| `nw_id` | O | O | 일치 |
| `nw_nm` | O | O | 일치 |
| `usg_use_cd` | O | O | 일치 |
| `usg_use_cd_nm` | O | O | 일치 |
| `nw_typ_cd` | O | O | 일치 |
| `nw_typ_cd_nm` | O | O | 일치 |
| `nw_descp` | O | O | 일치 |
| `reg_id` / `reg_conn_id` / `reg_nm` / `reg_ts` | O | O | 일치 |
| `mod_id` / `mod_conn_id` / `mod_nm` / `mod_ts` | O | O | 일치 |
| `grp_usg_cnt` | O | O | 일치 |
| `port_usg_cnt` | O | O | 일치 |
| `subnet_cnt` | O | O | 일치 |
| `tenants[]` | O | O | 일치 |
| `subnets[]` | O | O | 일치 (상세 필드 포함) |
| `nw_qos_plcy_id` | O | O | 일치 |
| `nw_qos_plcy_nm` | O | O | 일치 |
| `nw_qos_detail` | O | O | 일치 |

#### 2-7. `templates[]` (TenantTemplate)

| 필드 | DTO | fixture | 비고 |
|---|---|---|---|
| `temp_id` | O | O | 일치 |
| `temp_nm` | O | O | 일치 |
| `os_typ_cd` | O | O | 일치 |
| `os_typ_cd_nm` | O | O | 일치 |
| `bas_temp_yn` | O | O | 일치 |
| `flavor_id` | O | O | 일치 |
| `img_id` | O | O | 일치 |

#### 2-8. `flavors[]` (TenantSpecList)

| 필드 | DTO | fixture | 비고 |
|---|---|---|---|
| `flavor_id` | O | O | 일치 |
| `flavor_nm` | O | O | 일치 |
| `flavor_bas_yn` | O | O | 일치 |
| `vcpu_cnt` | O | O | 일치 |
| `vmm_capa` | O | O | 일치 |
| `vhd_capa` | O | O | 일치 |

#### 2-9. `volumes[]` (TenantVolume)

| 필드 | DTO | fixture | 비고 |
|---|---|---|---|
| `volm_typ_id` | O | O | 일치 |
| `volm_typ_nm` | O | O | 일치 |
| `volm_usg_typ` | O | O | 일치 |
| `volm_usg_typ_nm` | O | O | 일치 |
| `tot_capa` | O (`int`) | O (`number`) | 일치 |
| `usg_capa` | O (`int`) | O (`number`) | 일치 |
| `usg_ratio` | O (`int`) | O (`number`) | 일치 |
| `loc_dsk_cre_yn` | O | O | 일치 |
| `dsk_cre_cnt` | O | O | 일치 |
| `pool_usg_cnt` | O | O | 일치 |
| `volm_qos_plcy_id` | O | O | 일치 |
| `volm_qos_plcy_nm` | O | O | 일치 |
| `volm_qos_detail` | O | O | 일치 |

#### 2-10. `groups[]` (GroupList)

fixture의 `groups[]` 항목은 `GroupList` DTO 기반. 주요 필드 일치 확인.

| 필드 | fixture | 비고 |
|---|---|---|
| `vm_grp_id` | O | |
| `vm_grp_nm` | O | |
| `tnt_id` / `tnt_nm` | O | |
| `secu_plcy_id` / `secu_plcy_nm` | O | |
| `bkup_snap_plcy_id` / `bkup_snap_plcy_nm` | O | |
| `temp_id` / `temp_nm` | O | |
| `gdn_img_cre_yn` | O | |
| `pool_usg_cnt` / `tot_pool_max_vm_cnt` / `network_cnt` | O | |
| `reg_*` / `mod_*` | O | |

#### 2-11. `zones[]` (TenantZone)

| 필드 | DTO | fixture | 비고 |
|---|---|---|---|
| `zone_nm` | O | O | 일치 |
| `host_grp_nm` | O | O | 일치 |
| `host_grp_id` | O | O | 일치 |
| `host_cnt` | O | O | 일치 |
| `vcpu_tot_cnt` | O | O | 일치 |
| `mem_tot_capa` | O | O | 일치 |
| `public_yn` | O | O | 일치 |

#### 2-12. `hosts[]` (HostTenantList)

| 필드 | DTO | fixture | 비고 |
|---|---|---|---|
| `host_id` | O | O | 일치 |
| `host_nm` | O | O | 일치 |
| `pfrm_host_id` | O | O | 일치 |
| `host_ip` | O | O | 일치 |
| `hyper_typ` | O | O | 일치 |
| `host_descp` | O | O | 일치 |
| `host_sts_cd` / `host_sts_cd_nm` | O | O | 일치 |
| `vcpu_tot_cnt` / `vcpu_usg_cnt` | O | O | 일치 |
| `mem_tot_capa` / `mem_usg_capa` | O | O | 일치 |
| `str_tot_capa` / `str_usg_capa` | O | O | 일치 |
| `vm_tot_cnt` / `vm_usg_cnt` | O | O | 일치 |
| `zone_assgn_yn` | O | O | 일치 |
| `reg_id` / `reg_nm` / `reg_conn_id` / `reg_ts` | O | O | 일치 |
| `mod_id` / `mod_nm` / `mod_conn_id` / `mod_ts` | O | O | 일치 |
| `tnt_id` | O | O | 일치 |
| `tnt_assgn_yn` | O | O | 일치 |
| `zone_nm` | O | O | 일치 |
| `host_grp_nm` | O | O | 일치 |
| `ha_auto_mng_yn` | O | O | 일치 |

---

## 3. `/api/v1/resource/tenants/manager/list/all` (GET) — 전체 목록

- **fixture**: `tenant-manager-all.json`
- **Controller**: `TenantManagerController.list()`
- **Response DTO**: `TenantAllList`

### 결과: 불일치 — fixture에 DTO에 없는 필드 없음, 역방향 누락

`TenantAllList`는 `tnt_id`, `tnt_nm`, `dm_id` 3개 필드만 정의.

| 필드 | DTO | fixture | 비고 |
|---|---|---|---|
| `tnt_id` | O | O | 일치 |
| `tnt_nm` | O | O | 일치 |
| `dm_id` | O | X | **fixture 누락** |

`dm_id`가 DTO에는 있으나 fixture `data[]` 항목에 없음.

---

## 4. `/api/v1/resource/tenants/manager/get/license` (GET) — 라이선스

- **fixture**: `tenant-license.json`
- **Controller**: `TenantManagerController.license()`
- **Response DTO**: `TenantLicense`

### 결과: 불일치 — fixture 필드명이 DTO와 전혀 다름

| 필드 | DTO | fixture | 비고 |
|---|---|---|---|
| `max_vm_psb_cnt` | O | X | **fixture 누락** |
| `tnt_cnt` | O | X | **fixture 누락** |
| `tot_vm_psb_cnt` | O | X | **fixture 누락** |
| `vcpu_psb_cnt` | O | X | **fixture 누락** |
| `vmm_psb_capa` | O | X | **fixture 누락** |
| `total_license` | X | O | **DTO에 없는 필드** — fixture 임의 정의 |
| `used_license` | X | O | **DTO에 없는 필드** — fixture 임의 정의 |
| `available_license` | X | O | **DTO에 없는 필드** — fixture 임의 정의 |

**문제 요약**: fixture가 임의로 `total_license` / `used_license` / `available_license` 를 만들었으나 실제 DTO는 `max_vm_psb_cnt` / `tnt_cnt` / `tot_vm_psb_cnt` / `vcpu_psb_cnt` / `vmm_psb_capa` 구조. 완전히 다른 스키마.

---

## 5. `/api/v1/resource/policies/security-group/**` — 보안 그룹 전체

- **매핑 문서 분류**: 미매핑
- **app-ms-resource**: SecurityGroup 관련 Controller 없음 (grep 결과 0건)
- **app-ms-operation**: SecurityGroup 관련 Controller 없음 (grep 결과 0건)

fixture 파일은 존재하나 대응하는 백엔드 DTO를 찾을 수 없어 필드 대조 불가.

| API | fixture | Controller | 결과 |
|---|---|---|---|
| GET `/security-group` | `security-group-list.json` | 미발견 | 미매핑 — 대조 불가 |
| GET `/security-group/:id` | `security-group-detail.json` | 미발견 | 미매핑 — 대조 불가 |
| GET `/security-group/:id/rule` | `security-group-rules.json` | 미발견 | 미매핑 — 대조 불가 |
| GET `/security-group/:id/history` | `security-group-history.json` | 미발견 | 미매핑 — 대조 불가 |

**참고**: fixture `security-group-list.json`의 `data[]` 항목은 `id`, `name`, `description`, `reg_conn_id`, `reg_ts` 구조를 사용하나, 이 프로젝트의 다른 리소스 fixture와 비교하면 `id`/`name` 같은 camelCase-free 단순 필드명이 이질적. 실서버 응답 구조 확인 후 fixture 재작성 필요.

---

## 종합 요약

| API | 매핑 상태 | 대조 결과 |
|---|---|---|
| `GET /tenants/manager` (목록) | OK | **불일치** — fixture에 없는 필드 2개(`tnt_stat_cd`, `secu_plcy_id`), DTO 필드 대부분 누락 |
| `GET /tenants/manager/:id` (상세) | OK | **대체로 일치** — 최상위 및 모든 하위 배열 필드 정상 |
| `GET /tenants/manager/list/all` (전체 목록) | OK | **부분 불일치** — `dm_id` fixture 누락 |
| `GET /tenants/manager/get/license` (라이선스) | OK | **불일치** — fixture 필드명이 DTO와 완전히 다름 |
| `GET /policies/security-group/**` (보안 그룹) | 미매핑 | 대조 불가 |

### 수정 우선순위

1. **높음** — `tenant-license.json`: DTO 필드(`max_vm_psb_cnt`, `tnt_cnt`, `tot_vm_psb_cnt`, `vcpu_psb_cnt`, `vmm_psb_capa`)로 전면 교체.
2. **높음** — `tenant-manager-list.json`: `tnt_stat_cd`, `secu_plcy_id` 제거. DTO에 맞춰 누락 필드 추가.
3. **낮음** — `tenant-manager-all.json`: `dm_id` 필드 각 항목에 추가.
4. **보류** — security-group fixture: 백엔드 컨트롤러 확인 후 재작성.
