# Resource MS 인프라 API — fixture vs DTO 필드 비교

> 비교 기준
> - Java 필드명은 snake_case 그대로 선언된 경우 JSON 직렬화 시 동일하게 출력.
> - camelCase 필드는 Jackson 기본 설정에서 snake_case로 변환되지 않으므로 camelCase 그대로 직렬화됨.
> - `@JsonProperty` / `@JsonGetter` 어노테이션이 있는 경우 해당 값이 JSON 키로 사용됨.
> - 상태: `OK` / `fixture에만 존재` / `DTO에만 존재`

---

## 1. `/api/v1/resource/hosts` — GET (HostAdminList)

fixture: `host-list.json` (data 배열 항목)
DTO: `HostAdminList`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| host_id | host_id | OK |
| host_nm | host_nm | OK |
| pfrm_host_id | pfrm_host_id | OK |
| host_descp | host_descp | OK |
| host_ip | host_ip | OK |
| host_sts_cd | host_sts_cd | OK |
| host_sts_cd_nm | host_sts_cd_nm | OK |
| hyper_typ | hyper_typ | OK |
| vcpu_tot_cnt | vcpu_tot_cnt | OK |
| vcpu_usg_cnt | vcpu_usg_cnt | OK |
| mem_tot_capa | mem_tot_capa | OK |
| mem_usg_capa | mem_usg_capa | OK |
| str_tot_capa | str_tot_capa | OK |
| str_usg_capa | str_usg_capa | OK |
| allo_enable_yn | allo_enable_yn | OK |
| vm_tot_cnt | vm_tot_cnt | OK |
| vm_usg_cnt | vm_usg_cnt | OK |
| reg_id | reg_id | OK |
| reg_nm | reg_nm | OK |
| reg_conn_id | reg_conn_id | OK |
| reg_ts | reg_ts | OK |
| mod_id | mod_id | OK |
| mod_ts | mod_ts | OK |
| zone_nm | zone_nm | OK |

> 참고: mock 매핑 문서에서 `/api/v1/resource/hosts/admin` GET → `HostAdminList`, `/api/v1/resource/hosts/tenant` GET → `HostTenantList`. fixture 파일은 두 API 모두 `host-list.json`을 공유.

---

## 2. `/api/v1/resource/hosts/admin/:id` — GET (HostAdminList 상세)

fixture: `host-detail.json` (data 객체)
DTO: `HostTenantList` (getTenant → HostTenantList; getAdmin → HostAdminList)

> 매핑 문서 기준 `host-detail.json`은 `/hosts/admin/:id`(HostAdminList)와 `/hosts/tenant/:id`(HostTenantList) 두 API에 공유 사용됨.
> `host-detail.json`에는 `HostTenantList` 필드가 포함되어 있으므로 HostTenantList 기준으로 비교.

| fixture 필드 | DTO 필드 (HostTenantList) | 상태 |
|---|---|---|
| host_id | host_id | OK |
| host_nm | host_nm | OK |
| pfrm_host_id | pfrm_host_id | OK |
| host_ip | host_ip | OK |
| hyper_typ | hyper_typ | OK |
| host_descp | host_descp | OK |
| host_sts_cd | host_sts_cd | OK |
| host_sts_cd_nm | host_sts_cd_nm | OK |
| vcpu_tot_cnt | vcpu_tot_cnt | OK |
| vcpu_usg_cnt | vcpu_usg_cnt | OK |
| mem_tot_capa | mem_tot_capa | OK |
| mem_usg_capa | mem_usg_capa | OK |
| str_tot_capa | str_tot_capa | OK |
| str_usg_capa | str_usg_capa | OK |
| vm_tot_cnt | vm_tot_cnt | OK |
| vm_usg_cnt | vm_usg_cnt | OK |
| zone_assgn_yn | zone_assgn_yn | OK |
| reg_id | reg_id | OK |
| reg_nm | reg_nm | OK |
| reg_conn_id | reg_conn_id | OK |
| reg_ts | reg_ts | OK |
| mod_id | mod_id | OK |
| mod_nm | mod_nm | OK |
| mod_conn_id | mod_conn_id | OK |
| mod_ts | mod_ts | OK |
| tnt_id | tnt_id | OK |
| tnt_assgn_yn | tnt_assgn_yn | OK |
| zone_nm | zone_nm | OK |
| host_grp_nm | host_grp_nm | OK |
| - | ha_auto_mng_yn | DTO에만 존재 |

> `HostAdminList` 기준 비교 시 `mod_nm`, `mod_conn_id`, `tnt_id`, `tnt_assgn_yn`, `host_grp_nm` 필드가 HostAdminList에 없고 fixture에만 존재함.

---

## 3. `/api/v1/resource/networks` — GET (NetworkDetail 목록)

fixture: `network-list.json` (data 배열 항목)
DTO: `NetworkDetail`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| nw_id | nw_id | OK |
| nw_nm | nw_nm | OK |
| usg_use_cd | usg_use_cd | OK |
| usg_use_cd_nm | usg_use_cd_nm | OK |
| nw_typ_cd | nw_typ_cd | OK |
| nw_typ_cd_nm | nw_typ_cd_nm | OK |
| nw_descp | nw_descp | OK |
| reg_id | reg_id | OK |
| reg_conn_id | reg_conn_id | OK |
| reg_nm | reg_nm | OK |
| reg_ts | reg_ts | OK |
| mod_id | mod_id | OK |
| mod_conn_id | mod_conn_id | OK |
| mod_nm | mod_nm | OK |
| mod_ts | mod_ts | OK |
| grp_usg_cnt | grp_usg_cnt | OK |
| port_usg_cnt | port_usg_cnt | OK |
| subnet_cnt | subnet_cnt | OK |
| tenants | tenants (List\<NetworkTenant\>) | OK |
| subnets | subnets (List\<SubnetDetail\>) | OK |
| nw_qos_plcy_id | nw_qos_plcy_id | OK |
| nw_qos_plcy_nm | nw_qos_plcy_nm | OK |
| nw_qos_detail | nw_qos_detail (NetworkQosDetail) | OK |

### 3-1. NetworkTenant (tenants 배열 항목)

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| tnt_id | tnt_id | OK |
| tnt_nm | tnt_nm | OK |

### 3-2. SubnetDetail (subnets 배열 항목, network-list.json 내 inline)

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| sbn_id | sbn_id | OK |
| sbn_nm | sbn_nm | OK |
| cidr | cidr | OK |
| sbn | sbn | OK |
| gw | gw | OK |
| dns_1 | dns_1 | OK |
| dns_2 | dns_2 | OK |
| sbn_descp | sbn_descp | OK |
| nw_id | nw_id | OK |
| nw_nm | nw_nm | OK |
| nw_qos_plcy_id | nw_qos_plcy_id | OK |
| nw_qos_plcy_nm | nw_qos_plcy_nm | OK |
| nw_qos_detail | nw_qos_detail | OK |
| usg_use_cd | usg_use_cd | OK |
| usg_use_cd_nm | usg_use_cd_nm | OK |
| pool_usg_cnt | pool_usg_cnt | OK |
| port_usg_cnt | port_usg_cnt | OK |
| reg_id | reg_id | OK |
| reg_ts | reg_ts | OK |
| reg_conn_id | reg_conn_id | OK |
| reg_nm | reg_nm | OK |
| mod_id | mod_id | OK |
| mod_conn_id | mod_conn_id | OK |
| mod_nm | mod_nm | OK |
| mod_ts | mod_ts | OK |

---

## 4. `/api/v1/resource/networks/:networkId` — GET (NetworkDetail 상세)

fixture: `network-detail.json` (data 객체)
DTO: `NetworkDetail`

network-list.json과 동일 구조. 모든 필드 OK.

---

## 5. `/api/v1/resource/networks` (virtual) — GET (NetworkDetail, usg_use_cd=P004V)

fixture: `network-list-virtual.json` (data 배열 항목)
DTO: `NetworkDetail`

> 이 fixture는 매우 간소화된 스텁 데이터. DTO의 모든 필드 중 일부만 포함.

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| nw_id | nw_id | OK |
| nw_nm | nw_nm | OK |
| nw_typ_cd | nw_typ_cd | OK |
| usg_use_cd | usg_use_cd | OK |
| usg_use_cd_nm | usg_use_cd_nm | OK |
| subnets | subnets | OK |
| - | nw_descp, reg_*, mod_*, grp_usg_cnt, port_usg_cnt, subnet_cnt, tenants, nw_qos_* | DTO에만 존재 (fixture 미포함, null 처리 가능) |

---

## 6. `/api/v1/resource/networks/qos` — GET (NetworkQosDetail 목록)

fixture: `network-qos-list.json` (data 배열 항목)
DTO: `NetworkQosDetail`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| nw_qos_plcy_id | nw_qos_plcy_id | OK |
| nw_qos_plcy_nm | nw_qos_plcy_nm | OK |
| reg_conn_id | reg_conn_id | OK |
| reg_nm | reg_nm | OK |
| reg_ts | reg_ts | OK |
| mod_conn_id | mod_conn_id | OK |
| mod_nm | mod_nm | OK |
| mod_ts | mod_ts | OK |
| rules | rules (List\<NetworkQosRules\>) | OK |
| tnt_id | tnt_id | OK |
| tnt_nm | tnt_nm | OK |

### 6-1. NetworkQosRules (rules 배열 항목)

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| nw_qos_plcy_id | nw_qos_plcy_id | OK |
| nw_qos_rule_id | nw_qos_rule_id | OK |
| direction_cd | direction_cd | OK |
| direction_cd_nm | direction_cd_nm | OK |
| max_kbps | max_kbps | OK |
| max_burst_kbps | max_burst_kbps | OK |
| reg_conn_id | reg_conn_id | OK |
| reg_ts | reg_ts | OK |
| mod_conn_id | mod_conn_id | OK |
| mod_ts | mod_ts | OK |
| - | reg_nm | DTO에만 존재 (fixture의 rules에 미포함) |
| - | mod_nm | DTO에만 존재 (fixture의 rules에 미포함) |

---

## 7. `/api/v1/resource/networks/qos/:networkQosId` — GET (NetworkQosDetail 상세)

fixture: `network-qos-detail.json` (data 객체)
DTO: `NetworkQosDetail`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| nw_qos_plcy_id | nw_qos_plcy_id | OK |
| nw_qos_plcy_nm | nw_qos_plcy_nm | OK |
| reg_conn_id | reg_conn_id | OK |
| reg_nm | reg_nm | OK |
| reg_ts | reg_ts | OK |
| mod_conn_id | mod_conn_id | OK |
| mod_nm | mod_nm | OK |
| mod_ts | mod_ts | OK |
| rules[].nw_qos_plcy_id | nw_qos_plcy_id | OK |
| rules[].nw_qos_rule_id | nw_qos_rule_id | OK |
| rules[].direction_cd | direction_cd | OK |
| rules[].direction_cd_nm | direction_cd_nm | OK |
| rules[].max_kbps | max_kbps | OK |
| rules[].max_burst_kbps | max_burst_kbps | OK |
| tnt_id | tnt_id | OK |
| tnt_nm | tnt_nm | OK |
| - (rules에 reg_*, mod_* 없음) | reg_nm, mod_nm (NetworkQosRules) | DTO에만 존재 (상세 fixture에서는 rules에 감사 필드 미포함) |

---

## 8. `/api/v1/resource/storage` — GET (CinderList 목록)

fixture: `storage-list.json` (data 배열 항목)
DTO: `CinderList`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| volm_typ_id | volm_typ_id | OK |
| volm_typ_nm | volm_typ_nm | OK |
| loc_dsk_cre_yn | loc_dsk_cre_yn | OK |
| reg_ts | reg_ts | OK |
| mod_ts | mod_ts | OK |
| reg_id | reg_id | OK |
| reg_conn_id | reg_conn_id | OK |
| reg_nm | reg_nm | OK |
| mod_id | mod_id | OK |
| mod_conn_id | mod_conn_id | OK |
| mod_nm | mod_nm | OK |
| volm_be_nm | volm_be_nm | OK |
| volm_qos_plcy_id | volm_qos_plcy_id | OK |
| volm_qos_plcy_nm | volm_qos_plcy_nm | OK |
| volm_usg_typ | volm_usg_typ | OK |
| volm_usg_typ_nm | volm_usg_typ_nm | OK |
| tot_capa | tot_capa | OK |
| usg_capa | usg_capa | OK |
| usg_ratio | usg_ratio | OK |
| bas_volm_typ_yn | bas_volm_typ_yn | OK |
| tnt_list | tnt_list (List\<AdminCinderTenant\>) | OK |
| qosDetail | qosDetail (VolumeQosDetail) | OK |

> 참고: `storage-list.json`은 `/api/v1/resource/storage` (CinderList)와 `/api/v1/resource/storage/admin` (AdminCinderList) 두 API에 공유 사용됨. 두 DTO 필드 구성이 거의 동일하나 `AdminCinderList.basic_volm_typ_yn` vs `CinderList.bas_volm_typ_yn` 차이 존재 (아래 8-1 참고).

### 8-1. `/api/v1/resource/storage/admin` — GET (AdminCinderList 목록)

fixture: `storage-list.json` (data 배열 항목)
DTO: `AdminCinderList`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| bas_volm_typ_yn | basic_volm_typ_yn | **불일치** — fixture는 `bas_volm_typ_yn`, DTO는 `basic_volm_typ_yn` |
| 기타 공통 필드 | (CinderList와 동일) | OK |

---

## 9. `/api/v1/resource/storage/:id` — GET (CinderDetail 상세)

fixture: `storage-detail.json` (data 객체)
DTO: `CinderDetail`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| volm_typ_id | volm_typ_id | OK |
| volm_typ_nm | volm_typ_nm | OK |
| volm_be_nm | volm_be_nm | OK |
| volm_qos_plcy_id | volm_qos_plcy_id | OK |
| volm_qos_plcy_nm | volm_qos_plcy_nm | OK |
| desc | desc | OK |
| volm_usg_typ | volm_usg_typ | OK |
| volm_usg_typ_nm | volm_usg_typ_nm | OK |
| tot_capa | tot_capa | OK |
| usg_capa | usg_capa | OK |
| usg_ratio | usg_ratio | OK |
| bas_volm_typ_yn | bas_volm_typ_yn | OK |
| reg_id | reg_id | OK |
| reg_nm | reg_nm | OK |
| reg_conn_id | reg_conn_id | OK |
| reg_ts | reg_ts | OK |
| mod_id | mod_id | OK |
| mod_nm | mod_nm | OK |
| mod_conn_id | mod_conn_id | OK |
| mod_ts | mod_ts | OK |
| qosDetail | qosDetail (VolumeQosDetail) | OK |

---

## 10. `/api/v1/resource/storage/qos` — GET (VolumeQosDetail 목록)

fixture: `storage-qos-list.json` (data 배열 항목)
DTO: `VolumeQosDetail`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| volm_qos_plcy_id | volm_qos_plcy_id | OK |
| volm_qos_plcy_nm | volm_qos_plcy_nm | OK |
| volm_typ_id | volm_typ_id | OK |
| volm_typ_nm | volm_typ_nm | OK |
| volm_qos_rule_unit_cd | volm_qos_rule_unit_cd | OK |
| volm_qos_rule_unit_cd_nm | volm_qos_rule_unit_cd_nm | OK |
| volm_read | volm_read | OK |
| volm_read_max | volm_read_max | OK |
| volm_write | volm_write | OK |
| volm_write_max | volm_write_max | OK |
| reg_id | reg_id | OK |
| reg_conn_id | reg_conn_id | OK |
| reg_nm | reg_nm | OK |
| reg_ts | reg_ts | OK |
| mod_id | mod_id | OK |
| mod_conn_id | mod_conn_id | OK |
| mod_nm | mod_nm | OK |
| mod_ts | mod_ts | OK |

---

## 11. `/api/v1/resource/storage/qos/:id` — GET (VolumeQosDetail 상세)

fixture: `storage-qos-detail.json` (data 객체)
DTO: `VolumeQosDetail`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| volm_qos_plcy_id | volm_qos_plcy_id | OK |
| volm_qos_plcy_nm | volm_qos_plcy_nm | OK |
| volm_qos_rule_unit_cd | volm_qos_rule_unit_cd | OK |
| volm_read | volm_read | OK |
| volm_write | volm_write | OK |
| volm_read_max | volm_read_max | OK |
| volm_write_max | volm_write_max | OK |
| isEditable | - | **fixture에만 존재** — DTO에 `isEditable` 필드 없음 |
| - | volm_typ_id | DTO에만 존재 (fixture 미포함) |
| - | volm_typ_nm | DTO에만 존재 (fixture 미포함) |
| - | volm_qos_rule_unit_cd_nm | DTO에만 존재 (fixture 미포함) |
| - | reg_id, reg_conn_id, reg_nm, reg_ts | DTO에만 존재 (fixture 미포함) |
| - | mod_id, mod_conn_id, mod_nm, mod_ts | DTO에만 존재 (fixture 미포함) |

---

## 12. `/api/v1/resource/storage/backend/list` — GET

fixture: `storage-backend-list.json`
DTO: `String` (List\<String\>)

| fixture | DTO | 상태 |
|---|---|---|
| `["netapp","netapp2","netapp3"]` | `List<String>` | OK — 단순 문자열 배열, 필드 비교 불필요 |

---

## 13. `/api/v1/resource/template` — GET (TemplateSimple 목록)

fixture: `template-list.json` (data 배열 항목)
DTO: `TemplateSimple`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| temp_id | temp_id | OK |
| temp_nm | temp_nm | OK |
| os_typ_cd_nm | os_typ_cd_nm | OK |
| os_typ_cd | os_typ_cd | OK |
| vcpu_cnt | vcpu_cnt | OK |
| vmm_capa | vmm_capa | OK |
| vhd_capa | vhd_capa | OK |
| img_id | img_id | OK |
| img_nm | img_nm | OK |
| sw_count | sw_count | OK |
| reg_conn_id | reg_conn_id | OK |
| reg_nm | reg_nm | OK |
| reg_ts | reg_ts | OK |

---

## 14. `/api/v1/resource/template/:id` — GET (Template 상세)

fixture: `template-detail.json` (data 객체)
DTO: `Template`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| temp_id | temp_id | OK |
| temp_nm | temp_nm | OK |
| descp | descp | OK |
| os_typ_cd | os_typ_cd | OK (JsonIgnoreProperties로 직렬화 제외되나 내부 필드로 존재) |
| os_typ_cd_nm | os_typ_cd_nm | OK |
| reg_id | reg_id | OK |
| reg_conn_id | reg_conn_id | OK |
| reg_nm | reg_nm | OK |
| reg_ts | reg_ts | OK |
| mod_id | mod_id | OK |
| mod_conn_id | mod_conn_id | OK |
| mod_nm | mod_nm | OK |
| mod_ts | mod_ts | OK |
| flavor_id | flavor_id | OK |
| img_id | img_id | OK |
| img_nm | img_nm | OK |
| img_ad_itlk_usg_yn | img_ad_itlk_usg_yn | OK |
| img_sw_l | img_sw_l | OK |
| flavor_bas_yn | flavor_bas_yn | OK |
| bas_temp_yn | bas_temp_yn | OK |
| in_tnt_id | in_tnt_id | OK |
| not_in_tnt_id | not_in_tnt_id | OK |
| flavor_m | flavor_m (Spec) | OK |
| tnt_id | tnt_id | OK |
| sw_count | sw_count | OK |

> `@JsonIgnoreProperties({"os_typ_cd"})` 선언으로 `os_typ_cd`는 직렬화 출력에서 제외됨. fixture에 `os_typ_cd`가 포함되어 있어 실제 응답과 불일치 가능성 있음.

---

## 15. `/api/v1/resource/subnets` — GET (SubnetDetail 목록)

fixture: `subnet-list.json` (data 배열 항목)
DTO: `SubnetDetail`

전체 필드 OK (섹션 3-2의 SubnetDetail 필드와 동일 구조).

---

## 16. `/api/v1/resource/subnets/:subnetId` — GET (SubnetDetail 상세)

fixture: `subnet-detail.json` (data 객체)
DTO: `SubnetDetail`

전체 필드 OK.

---

## 17. `/api/v1/resource/subnets/:subnetId/ips` — GET (SubnetIpsList)

fixture: `subnet-ip-list.json` (data 배열 항목)
DTO: `SubnetIpsList`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| ip_id | - | **fixture에만 존재** — DTO에 `ip_id` 필드 없음 |
| ip_addr | - | **fixture에만 존재** — DTO에 `ip_addr` 필드 없음 |
| ip_usg_typ_cd | - | **fixture에만 존재** — DTO에 `ip_usg_typ_cd` 필드 없음 |
| vm_auth_id | - | **fixture에만 존재** — DTO에 `vm_auth_id` 필드 없음 |
| - | able_ip | **DTO에만 존재** — fixture에 `able_ip` 필드 없음 |

> **불일치 심각** — fixture와 DTO가 완전히 다른 구조. DTO `SubnetIpsList`는 `able_ip` 단일 필드만 있으나, fixture는 IP 사용 현황 목록 구조.

---

## 18. `/api/v1/resource/router` — GET (RouterDetail 목록)

fixture: `router-list.json` (data 배열 항목)
DTO: `RouterDetail`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| rtr_id | rtr_id | OK |
| rtr_nm | rtr_nm | OK |
| rtr_descp | rtr_descp | OK |
| tnt_id | tnt_id | OK |
| tnt_nm | tnt_nm | OK |
| reg_id | reg_id | OK |
| reg_ts | reg_ts | OK |
| reg_nm | reg_nm | OK |
| reg_conn_id | reg_conn_id | OK |
| mod_id | mod_id | OK |
| mod_ts | mod_ts | OK |
| mod_nm | mod_nm | OK |
| mod_conn_id | mod_conn_id | OK |
| sbn_cnt | sbn_cnt | OK |
| nw_nm | nw_nm | OK |
| nw_id | nw_id | OK |
| subnetList | subnetList (List\<RouterSubnet\>) | OK |

---

## 19. `/api/v1/resource/router/:id` — GET (RouterDetail 상세)

fixture: `router-detail.json` (data 객체)
DTO: `RouterDetail`

RouterDetail 상위 필드 모두 OK.

### RouterSubnet (subnetList 배열 항목)

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| rtr_id | rtr_id | OK |
| nw_id | nw_id | OK |
| sbn_id | sbn_id | OK |
| nw_nm | nw_nm | OK |
| usg_use_cd | usg_use_cd | OK |
| usg_use_cd_nm | usg_use_cd_nm | OK |
| nw_typ_cd | nw_typ_cd | OK |
| sbn_nm | sbn_nm | OK |
| cidr | cidr | OK |
| sbn | sbn | OK |
| gw | gw | OK |
| dns_1 | dns_1 | OK |
| dns_2 | dns_2 | OK |
| sbn_descp | sbn_descp | OK |

---

## 20. `/api/v1/resource/flavors` — GET (Spec 목록)

fixture: `flavor-list.json` (data 배열 항목)
DTO: `Spec`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| flavor_id | flavor_id | OK |
| flavor_nm | flavor_nm | OK |
| vcpu_cnt | vcpu_cnt | OK |
| vmm_capa | vmm_capa | OK |
| vhd_capa | vhd_capa | OK |
| - | flavor_descp | DTO에만 존재 (fixture 미포함) |
| - | flavor_bas_yn | DTO에만 존재 (fixture 미포함) |
| - | tpm_yn | DTO에만 존재 (fixture 미포함) |
| - | reg_conn_id, reg_ts | DTO에만 존재 (fixture 미포함) |
| - | mod_conn_id, mod_ts | DTO에만 존재 (fixture 미포함) |
| - | tnt_id | DTO에만 존재 (fixture 미포함) |

> fixture가 최소한의 필드만 포함. 실서버 응답에는 DTO 전체 필드가 포함될 것으로 예상.

---

## 21. `/api/v1/resource/flavors/:flavorId` — GET (Spec 상세)

fixture: `flavor-detail.json` (data 객체)
DTO: `Spec`

`flavor-list.json`과 동일하게 fixture에 최소 필드만 포함. `flavor-detail.json`은 `flavor_id`, `flavor_nm`, `vcpu_cnt`, `vmm_capa`, `vhd_capa` 5개 필드만 있고 나머지 DTO 필드는 미포함.

---

## 22. `/api/v1/resource/images` — GET (GoldenImageList 목록)

fixture: `image-list.json` (data 배열 항목)
DTO: `GoldenImageList`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| vm_auth_id | - | **fixture에만 존재** — GoldenImageList에 없음 |
| vm_id | - | **fixture에만 존재** — GoldenImageList에 없음 |
| vm_nm | - | **fixture에만 존재** — GoldenImageList에 없음 |
| vm_power_sts_cd | - | **fixture에만 존재** — GoldenImageList에 없음 |
| vm_power_sts_cd_nm | - | **fixture에만 존재** — GoldenImageList에 없음 |
| usr_vm_conn_sts_cd | - | **fixture에만 존재** — GoldenImageList에 없음 |
| usr_vm_conn_sts_cd_nm | - | **fixture에만 존재** — GoldenImageList에 없음 |
| adm_vm_conn_sts_cd | - | **fixture에만 존재** — GoldenImageList에 없음 |
| adm_vm_conn_sts_cd_nm | - | **fixture에만 존재** — GoldenImageList에 없음 |
| img_id | img_id | OK |
| img_serv_yn | - | **fixture에만 존재** — GoldenImageList에 없음 |
| img_sts_cd | - | **fixture에만 존재** — GoldenImageList에 없음 |
| img_sts_cd_nm | - | **fixture에만 존재** — GoldenImageList에 없음 |
| reg_id | reg_id | OK |
| reg_nm | reg_nm | OK |
| reg_conn_id | reg_conn_id | OK |
| reg_ts | reg_ts | OK |
| mod_id | mod_id | OK |
| mod_nm | mod_nm | OK |
| mod_conn_id | mod_conn_id | OK |
| mod_ts | mod_ts | OK |
| img_cre_tm | img_cre_tm | OK |
| vm_state | - | **fixture에만 존재** — GoldenImageList에 없음 |
| vm_pool_typ_cd | - | **fixture에만 존재** — GoldenImageList에 없음 |
| img_cre_vm_id | - | **fixture에만 존재** — GoldenImageList에 없음 |
| img_nm | img_nm | OK |
| create_btn | - | **fixture에만 존재** — GoldenImageList에 없음 |
| conn_btn | - | **fixture에만 존재** — GoldenImageList에 없음 |
| pow_on | - | **fixture에만 존재** — GoldenImageList에 없음 |
| delete_btn | - | **fixture에만 존재** — GoldenImageList에 없음 |
| clear_btn | - | **fixture에만 존재** — GoldenImageList에 없음 |
| convert_btn | - | **fixture에만 존재** — GoldenImageList에 없음 |
| - | img_file_size | DTO에만 존재 |
| - | img_descp | DTO에만 존재 |
| - | sw_nm, sw_typ_cd, sw_typ_cd_nm | DTO에만 존재 |
| - | os_typ_cd, os_typ_cd_nm | DTO에만 존재 |
| - | ad_itlk_usg_yn | DTO에만 존재 |
| - | tnt_id | DTO에만 존재 |
| - | visibility | DTO에만 존재 |

> **불일치 심각** — `image-list.json`은 `GoldenImageList`가 아닌 VM 상태 정보가 포함된 복합 구조. `GoldenImageController.list()`가 실제로 반환하는 타입과 fixture의 구조가 크게 다름. fixture가 골든이미지 관리 VM 화면용 복합 DTO를 반영하는 것으로 추정.

---

## 23. `/api/v1/resource/images/:id` — GET (GoldenImageDetail 상세)

fixture: `image-detail.json` (data 객체)
DTO: `GoldenImageDetail`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| img_id | img_id | OK |
| img_nm | img_nm | OK |
| img_descp | img_descp | OK |
| img_cre_tm | img_cre_tm | OK |
| img_file_size | img_file_size | OK |
| os_typ_cd | os_typ_cd | OK |
| os_typ_cd_nm | os_typ_cd_nm | OK |
| img_serv_yn | img_serv_yn | OK |
| img_sts_cd | img_sts_cd | OK |
| img_sts_cd_nm | img_sts_cd_nm | OK |
| init_cre_yn | init_cre_yn | OK |
| img_sw_l | img_sw_l | OK |
| reg_id | reg_id | OK |
| reg_nm | reg_nm | OK |
| reg_conn_id | reg_conn_id | OK |
| reg_ts | reg_ts | OK |
| mod_id | mod_id | OK |
| mod_nm | mod_nm | OK |
| mod_conn_id | mod_conn_id | OK |
| mod_ts | mod_ts | OK |
| tnt_id | tnt_id | OK |
| img_cre_vm_id | img_cre_vm_id | OK |
| visibility | visibility | OK |

---

## 24. `/api/v1/resource/images/status/:imgId` — GET (GoldenImageVmStatus)

fixture: `image-status.json` (data 객체)
DTO: `GoldenImageVmStatus`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| img_stat_cd | - | **fixture에만 존재** — DTO에 `img_stat_cd` 없음 |
| progress | - | **fixture에만 존재** — DTO에 `progress` 없음 |
| - | vm_id | **DTO에만 존재** |
| - | vm_status | **DTO에만 존재** |
| - | vm_status_msg | **DTO에만 존재** |

> **불일치 심각** — fixture와 DTO가 완전히 다른 구조. `image-status.json`은 이미지 상태 코드/진행률 구조이나 `GoldenImageVmStatus`는 VM 생성 상태 구조.

---

## 25. `/api/v1/resource/zones` — GET (Zone 목록)

fixture: `zone-list.json` (data 배열 항목)
DTO: `Zone`

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| zone_nm | zone_nm | OK |
| zone_descp | zone_descp | OK |
| tnt_id | tnt_id | OK |
| host_grp_id | host_grp_id | OK |
| hosts | hosts (List\<HostTenantList\>) | OK |
| - | host_grp_nm | DTO에만 존재 (fixture 미포함) |
| - | maint_yn | DTO에만 존재 (fixture 미포함) |
| - | hostIds, hostNames | DTO에만 존재 (fixture 미포함) |
| - | reg_id, reg_ts, mod_id, mod_ts | DTO에만 존재 (fixture 미포함) |
| - | reg_nm, reg_conn_id | DTO에만 존재 (fixture 미포함) |
| - | public_zone_yn | DTO에만 존재 (fixture 미포함) |

### hosts 배열 항목 비교 (HostTenantList)

| fixture 필드 | DTO 필드 | 상태 |
|---|---|---|
| host_id | host_id | OK |
| host_nm | host_nm | OK |

> zone-list.json의 hosts는 최소 필드(host_id, host_nm)만 포함.

---

## 26. `/api/v1/resource/zones/:zoneNm` — GET (Zone 상세)

fixture: `zone-detail.json` (data 객체)
DTO: `Zone`

zone-list.json과 동일한 최소 구조. 동일 불일치 사항 적용.

---

## 요약 — 불일치 항목

| API | fixture | DTO | 불일치 유형 | 영향도 |
|---|---|---|---|---|
| `/storage/admin` GET | `bas_volm_typ_yn` | `basic_volm_typ_yn` | 필드명 불일치 | 중 — 프론트엔드에서 `bas_volm_typ_yn` 참조 시 DTO `basic_volm_typ_yn` 값이 전달되지 않음 |
| `/storage/qos/:id` GET | `isEditable` | (없음) | fixture에만 존재 | 낮음 — DTO에서 제공하지 않는 프론트 전용 계산 필드로 추정 |
| `/storage/qos/:id` GET | (없음) | `volm_typ_id`, `volm_typ_nm`, `volm_qos_rule_unit_cd_nm`, 감사 필드 | DTO에만 존재 | 낮음 — fixture가 간소화된 스텁 |
| `/subnets/:id/ips` GET | `ip_id`, `ip_addr`, `ip_usg_typ_cd`, `vm_auth_id` | `able_ip` | 구조 완전 불일치 | 높음 — fixture 교체 또는 DTO 확인 필요 |
| `/images` GET | VM 상태 복합 필드 다수 | `GoldenImageList` 필드와 불일치 | 구조 불일치 | 높음 — 실제 응답 DTO 재확인 필요 |
| `/images/status/:imgId` GET | `img_stat_cd`, `progress` | `vm_id`, `vm_status`, `vm_status_msg` | 구조 완전 불일치 | 높음 — fixture 교체 또는 DTO 확인 필요 |
| `/template/:id` GET | `os_typ_cd` 포함 | `@JsonIgnoreProperties({"os_typ_cd"})` 로 직렬화 제외 | 직렬화 제외 필드 fixture에 포함 | 낮음 — 응답에서 `os_typ_cd`가 누락되므로 fixture 수정 검토 |
| `/hosts/admin/:id` GET (HostAdminList 기준) | `mod_nm`, `mod_conn_id`, `tnt_id`, `tnt_assgn_yn`, `host_grp_nm` | HostAdminList에 없음 | fixture에만 존재 | 중 — fixture가 HostTenantList 구조를 사용 중 |
