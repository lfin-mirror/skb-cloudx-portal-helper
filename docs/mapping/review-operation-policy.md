# Operation MS Policy API — Fixture vs DTO 필드 비교 리포트

> 작성일: 2026-03-31
> 검토 범위: 매핑 문서에서 OK 상태인 GET API 전체 (policy 및 external 관련)

---

## 범례

| 기호 | 의미 |
|------|------|
| OK | 픽스처 필드명이 DTO와 일치 |
| MISMATCH | 픽스처 필드명이 DTO와 불일치 (버그) |
| MISSING | DTO에 있는 필드가 픽스처에 없음 |
| EXTRA | DTO에 없는 필드가 픽스처에 있음 |
| STRUCT | 구조(중첩/래핑) 불일치 |

---

## 1. USB 정책 (`/api/v1/operation/policies/usb`)

### 1-1. USB Policy 목록/상세 — `UsbPolicyBase` / `UsbPolicyVO`

**fixture 파일**: `usb-policy-list.json`, `usb-policy-detail.json`
**백엔드 DTO**: `UsbPolicyBase` (목록), `UsbPolicyVO` (상세)

| 필드 | 픽스처 | DTO | 상태 |
|------|--------|-----|------|
| `usb_policy_id` | `usb_policy_id` | `@JsonProperty("usb_policy_id")` | OK |
| `usb_policy_target_code` | `usb_policy_target_code` | `@JsonProperty("usb_policy_target_code")` | OK |
| `usb_policy_name` | `usb_policy_name` | `@JsonProperty("usb_policy_name")` | OK |
| `usb_policy_auth_code` | `usb_policy_auth_code` | `@JsonProperty("usb_policy_auth_code")` | OK |
| `usb_policy_description` | `usb_policy_description` | `@JsonProperty("usb_policy_description")` | OK |
| `usb_types` | `usb_types` (null) | `@JsonProperty("usb_types")` | OK |
| `usb_vendors` | `usb_vendors` (null) | `@JsonProperty("usb_vendors")` — Java 필드명은 `usbVendorWithModels`이나 JSON key는 `usb_vendors` | OK |
| `tenant_id` | `tenant_id` | `@JsonProperty("tenant_id")` | OK |
| `reg_id` | `reg_id` | `private String reg_id` (no @JsonProperty) | OK |
| `reg_ts` | `reg_ts` | `private String reg_ts` | OK |
| `mod_id` | `mod_id` | `private String mod_id` | OK |
| `mod_ts` | `mod_ts` | `private String mod_ts` | OK |
| `reg_conn_id` | `reg_conn_id` | `UsbPolicyVO`: `private String reg_conn_id` | OK (상세만) |
| `mod_conn_id` | `mod_conn_id` | `UsbPolicyVO`: `private String mod_conn_id` | OK (상세만) |

**결론**: 필드 일치. 이상 없음.

---

### 1-2. USB Policy vpc_policies — `VpcResponseBase`

**fixture 파일**: `usb-policy-vpc-policies.json`
**백엔드 DTO**: `VpcResponseBase` (VpcController 도메인)

픽스처 필드: `secu_plcy_id`, `secu_plcy_nm`, `secu_plcy_tgt_cd`, `secu_plcy_tgt_cd_nm`, `group_cnt`, `pool_cnt`, `vm_cnt`, `reg_ts`, `mod_ts`, `reg_conn_id`, `mod_conn_id`

> 참고: 이 API(`/usb/:usb_policy_id/vpc_policies`)의 응답은 `List<VpcResponseBase>`를 직접 반환 (ResponseResult 래핑 없음). 픽스처도 배열 최상위 구조. 매핑 문서 상태 OK, 별도 VpcResponseBase 검토는 cert/secu 리뷰 범위.

---

### 1-3. USB Policy types — `UsbTypeVO`

**fixture 파일**: `usb-policy-types.json`
**백엔드 DTO**: `UsbTypeVO`

픽스처 구조: `{ "data": [ { ...UsbTypeVO fields... } ] }`

| 필드 | 픽스처 | DTO | 상태 |
|------|--------|-----|------|
| `usb_type_id` | O | `@JsonProperty("usb_type_id")` | OK |
| `usb_type_target_code` | O (null) | `@JsonProperty("usb_type_target_code")` | OK |
| `usb_type_base` | O | `@JsonProperty("usb_type_base")` | OK |
| `usb_type_meaning` | O | `@JsonProperty("usb_type_meaning")` | OK |
| `usb_type_description` | O (null) | `@JsonProperty("usb_type_description")` | OK |
| `tenant_id` | O (null) | `@JsonProperty("tenant_id")` | OK |
| `reg_id` | O | `private String reg_id` | OK |
| `reg_ts` | O | `private String reg_ts` | OK |
| `mod_id` | O | `private String mod_id` | OK |
| `mod_ts` | O | `private String mod_ts` | OK |
| `reg_conn_id` | O (null) | `private String reg_conn_id` (UsbTypeVO) | OK |
| `mod_conn_id` | O (null) | `private String mod_conn_id` (UsbTypeVO) | OK |

**결론**: 이상 없음.

---

### 1-4. USB Policy vendors — `UsbVendorWithModelVO`

**fixture 파일**: `usb-policy-vendors.json`
**백엔드 DTO**: `UsbVendorWithModelVO`

픽스처 구조:
```json
{
  "data": [{
    "usb_vendor_id": "...",
    "usb_vendor_uid": "...",
    "usb_vendor_name": "...",
    "usb_model_id": "...",
    "usb_model_uid": "...",
    "usb_model_name": "...",
    "models": [...]
  }]
}
```

| 필드 | 픽스처 | DTO (`UsbVendorWithModelVO`) | 상태 |
|------|--------|------------------------------|------|
| `usb_vendor_id` | O | `@JsonProperty("usb_vendor_id")` | OK |
| `usb_vendor_uid` | O | `@JsonProperty("usb_vendor_uid")` | OK |
| `usb_vendor_name` | O | `@JsonProperty("usb_vendor_name")` | OK |
| `usb_model_id` | O | `@JsonProperty("usb_model_id")` | OK |
| `usb_model_uid` | O | `@JsonProperty("usb_model_uid")` | OK |
| `usb_model_name` | O | `@JsonProperty("usb_model_name")` | OK |
| `usb_model_target_code` | 없음 | `@JsonProperty("usb_model_target_code")` | MISSING |
| `usb_model_description` | 없음 | `@JsonProperty("usb_model_description")` | MISSING |
| `tenant_id` | 없음 | `@JsonProperty("tenant_id")` | MISSING |
| `reg_id`, `reg_ts`, `mod_id`, `mod_ts` | 없음 | 존재 | MISSING |
| `reg_conn_id`, `mod_conn_id` | 없음 | 존재 | MISSING |
| `models` | O (추가 배열) | 없음 | **EXTRA** |

**결론**: `usb-policy-vendors.json` 픽스처는 DTO(`UsbVendorWithModelVO`)의 단순화된 버전. 실 응답에는 `models` 배열이 없고 flat 구조. 픽스처에 `models` 필드가 추가되어 있고 `usb_model_target_code`, `usb_model_description`, `tenant_id` 등이 누락됨.

> **버그**: `models` 필드는 DTO에 없는 필드. 픽스처에서 제거하고 누락 필드 추가 필요.

---

### 1-5. USB Type 목록/상세 — `UsbTypeBase` / `UsbTypeVO`

**fixture 파일**: `usb-type-list.json`, `usb-type-detail.json`
**백엔드 DTO**: `UsbTypeBase` (목록), `UsbTypeVO` (상세)

목록/상세 모두 1-3과 동일 필드셋. 목록 픽스처에는 `reg_conn_id`/`mod_conn_id` 포함 (Base에는 없고 Plain/Masked에만 있음).

| 상황 | 상태 |
|------|------|
| 목록 픽스처에 `reg_conn_id`, `mod_conn_id` 포함 | 픽스처는 `UsbTypePlain`(Base + conn_id) 기준. 목록 API 반환 타입 `List<UsbTypeBase>` 선언이나 실제는 Plain/Masked 서브클래스 반환 — OK |
| 상세 픽스처 필드 | UsbTypeVO와 완전 일치 — OK |

**결론**: 이상 없음.

---

### 1-6. USB Type의 USB Policies — `UsbPolicyBase`

**fixture 파일**: `usb-type-usb-policies.json`
**백엔드 DTO**: `UsbPolicyBase`

1-1과 동일 필드 구조. `reg_conn_id`/`mod_conn_id` 포함 — Plain 서브클래스 기준.
**결론**: 이상 없음.

---

### 1-7. USB Vendor 목록/상세 — `UsbVendorBase` / `UsbVendorVO`

**fixture 파일**: `usb-vendor-list.json`, `usb-vendor-detail.json`
**백엔드 DTO**: `UsbVendorBase` (목록), `UsbVendorVO` (상세)

| 필드 | 픽스처 | DTO | 상태 |
|------|--------|-----|------|
| `usb_vendor_id` | O | `@JsonProperty("usb_vendor_id")` | OK |
| `usb_vendor_target_code` | O | `@JsonProperty("usb_vendor_target_code")` | OK |
| `usb_vendor_uid` | O | `@JsonProperty("usb_vendor_uid")` | OK |
| `usb_vendor_name` | O | `@JsonProperty("usb_vendor_name")` | OK |
| `usb_vendor_description` | O | `@JsonProperty("usb_vendor_description")` | OK |
| `tenant_id` | O | `@JsonProperty("tenant_id")` | OK |
| `reg_id`, `reg_ts`, `mod_id`, `mod_ts` | O | 존재 | OK |
| `reg_conn_id`, `mod_conn_id` | O | `UsbVendorVO` 및 Plain 서브클래스 | OK |

**결론**: 이상 없음.

---

### 1-8. USB Vendor의 USB Policies — `UsbPolicyBase`

**fixture 파일**: `usb-vendor-usb-policies.json`
**백엔드 DTO**: `UsbPolicyBase`

1-1과 동일 구조. **결론**: 이상 없음.

---

### 1-9. USB Vendor의 Models — `UsbModelBase` / (vendor 패키지: `UsbVendorWithModelBase`)

**fixture 파일**: `usb-vendor-models.json`
**백엔드 DTO**: `getUsbModelsByUsbVendor` → `ResponseResult<List<UsbModelBase>>`
실제 반환 타입은 `UsbModelBase` 서브클래스 (`UsbModelPlain` / `UsbModelMasked`)

픽스처 필드: `reg_id`, `reg_ts`, `mod_id`, `mod_ts`, `reg_conn_id`, `mod_conn_id`, `usb_model_id`, `usb_model_target_code`, `usb_model_uid`, `usb_model_name`, `usb_model_description`, `usb_vendor_id`, `tenant_id`

`UsbModelBase` DTO 필드: `usb_model_id`, `usb_model_target_code`, `usb_model_uid`, `usb_model_name`, `usb_model_description`, `usb_vendor_id`, `tenant_id`, `reg_id`, `reg_ts`, `mod_id`, `mod_ts`

| 상태 |
|------|
| 모든 필드 일치 — OK |
| `reg_conn_id`/`mod_conn_id` — `UsbModelBase`에 없고 Plain 서브클래스에만 있음. 픽스처에 포함 — OK (Plain 기준) |

**결론**: 이상 없음.

---

### 1-10. USB Model 목록/상세 — `UsbVendorWithModelBase` / `UsbVendorWithModelVO`

**fixture 파일**: `usb-model-list.json`, `usb-model-detail.json`
**백엔드 DTO**: `getUsbModels` → `ResponseResult<List<UsbVendorWithModelBase>>`, `getUsbModel` → `ResponseResult<UsbVendorWithModelVO>`

픽스처 필드: `reg_id`, `reg_ts`, `mod_id`, `mod_ts`, `reg_conn_id`, `mod_conn_id`, `usb_vendor_id`, `usb_vendor_uid`, `usb_vendor_name`, `usb_model_id`, `usb_model_uid`, `usb_model_name`, `usb_model_target_code`, `usb_model_description`, `tenant_id`

`UsbVendorWithModelBase` DTO 필드: 위 목록과 완전 일치 (conn_id는 Plain 서브클래스)
`UsbVendorWithModelVO` 필드: 위 목록과 완전 일치.

**결론**: 이상 없음.

---

### 1-11. USB Model의 USB Policies — `UsbPolicyBase`

**fixture 파일**: `usb-model-usb-policies.json`
1-1과 동일 구조. **결론**: 이상 없음.

---

## 2. 백업/스냅샷 정책 (`/api/v1/operation/policy/bkupsnap`)

### 2-1. 그룹 목록 — `BkupSnapPlcyBase` / `BkupSnapPlcyPlain`

**fixture 파일**: `backup-grp-list.json`
**백엔드 DTO**: `BkupSnapPlcyBase` + `BkupSnapPlcyPlain`

| 필드 | 픽스처 | DTO | 상태 |
|------|--------|-----|------|
| `bkup_snap_plcy_id` | O | O | OK |
| `bkup_snap_plcy_nm` | O | O | OK |
| `bkup_snap_plcy_tgt_cd` | O | O | OK |
| `bkup_snap_plcy_tgt_cd_nm` | O | O | OK |
| `auto_bkup_yn` | O | O | OK |
| `bkup_prid_cd` | O | O | OK |
| `bkup_prid_cd_nm` | O | O | OK |
| `bkup_set_time` | O | O | OK |
| `bkup_set_dw_cd` | O | O | OK |
| `bkup_set_dw_cd_nm` | O | O | OK |
| `bkup_set_dd` | O | O | OK |
| `max_bkup_cnt` | O | O | OK |
| `auto_snap_yn` | O | O | OK |
| `snap_prid_cd` | O | O | OK |
| `snap_prid_cd_nm` | O | O | OK |
| `snap_set_time` | O | O | OK |
| `snap_set_dw_cd` | O | O | OK |
| `snap_set_dw_cd_nm` | O | O | OK |
| `snap_set_dd` | O | O | OK |
| `max_snap_cnt` | O | O | OK |
| `tnt_id` | O | O | OK |
| `reg_id` | O | O | OK |
| `reg_ts` | O | O | OK |
| `mod_id` | O | O | OK |
| `mod_ts` | O | O | OK |
| `group_cnt` | O | O | OK |
| `pool_cnt` | O | O | OK |
| `vm_cnt` | O | O | OK |
| `reg_conn_id` | O | `BkupSnapPlcyPlain` | OK |
| `mod_conn_id` | O | `BkupSnapPlcyPlain` | OK |

**결론**: 이상 없음.

---

### 2-2. 상세 — `BkupSnapPlcyDetailVO`

**fixture 파일**: `backup-detail.json`
**백엔드 DTO**: `BkupSnapPlcyDetailVO`

`BkupSnapPlcyDetailVO`는 `BkupSnapPlcyBase`와 동일한 필드 + `reg_conn_id` / `mod_conn_id` 추가. 픽스처에 `reg_conn_id`(null), `mod_conn_id`(null) 포함.
**결론**: 이상 없음.

---

## 3. SW 블랙리스트 (`/api/v1/operation/policys/swblst`)

### 3-1. 목록 / 상세 — `SwBlstDetailVO`

**fixture 파일**: `blacklist-list.json`, `blacklist-detail.json`
**백엔드 DTO**: `SwBlstDetailVO`

`SwBlstDetailVO` 필드: `blst_file_id`, `tnt_id`, `att_file_nm`, `json_data`, `wtst_yn`, `reg_conn_id`, `reg_id`, `reg_ts`, `mod_conn_id`, `mod_id`, `mod_ts`

픽스처 필드 비교:

| 필드 | 픽스처 (`blacklist-list.json`) | DTO | 상태 |
|------|-------------------------------|-----|------|
| `blst_file_id` | O | O | OK |
| `tnt_id` | O | O | OK |
| `blst_file_nm` | O | **없음** — DTO에는 `att_file_nm` | **MISMATCH** |
| `wtst_yn` | O | O | OK |
| `sw_cnt` | O | **없음** | **EXTRA** |
| `reg_ts` | O | O | OK |
| `mod_ts` | O | O | OK |
| `reg_conn_id` | O | O | OK |
| `mod_conn_id` | O | O | OK |
| `att_file_nm` | **없음** | O | **MISSING** |
| `json_data` | 목록에 없음, 상세에 있음 | O | OK (상세만) |
| `reg_id`, `mod_id` | **없음** | O | MISSING |

**결론**:
- `blst_file_nm` (픽스처) → DTO에서는 `att_file_nm`. **픽스처 필드명 오류.**
- `sw_cnt` — DTO에 없는 필드. 프론트가 이 필드를 사용할 경우 빈 값 수신.
- `reg_id`, `mod_id` — 목록/상세 픽스처 모두 누락.

---

## 4. 예외 네트워크 그룹 (`/api/v1/operation/policy/excn`)

### 4-1. 그룹 목록 — `ExcNetworkBase` / `ExcNetworkPlain`

**fixture 파일**: `excn-grp-list.json`
**백엔드 DTO**: `ExcNetworkBase` + `ExcNetworkPlain`

픽스처 필드: `exc_nw_grp_id`, `exc_nw_grp_nm`, `exc_nw_cnt`, `reg_ts`, `mod_ts`, `reg_conn_id`, `mod_conn_id`

`ExcNetworkBase` 필드: `exc_nw_grp_id`, `exc_nw_grp_nm`, `tnt_id`, `reg_id`, `reg_ts`, `mod_id`, `mod_ts`
`ExcNetworkPlain` 추가: `reg_conn_id`, `mod_conn_id`

| 필드 | 픽스처 | DTO | 상태 |
|------|--------|-----|------|
| `exc_nw_grp_id` | O | O | OK |
| `exc_nw_grp_nm` | O | O | OK |
| `exc_nw_cnt` | O | **없음** | **EXTRA** |
| `reg_ts` | O | O | OK |
| `mod_ts` | O | O | OK |
| `reg_conn_id` | O | `ExcNetworkPlain` | OK |
| `mod_conn_id` | O | `ExcNetworkPlain` | OK |
| `tnt_id` | **없음** | O | MISSING |
| `reg_id` | **없음** | O | MISSING |
| `mod_id` | **없음** | O | MISSING |

**결론**: `exc_nw_cnt`는 DTO에 없는 집계 필드. `tnt_id`, `reg_id`, `mod_id` 누락.

---

### 4-2. 그룹 상세 — `ExcNetworkMultiVO`

**fixture 파일**: `excn-grp-detail.json`
**백엔드 DTO**: `ExcNetworkMultiVO { ExcNetworkGroupVO grpInfo; List<ExcNetworkVO> excNwInfo; }`

픽스처 구조:
```json
{
  "data": {
    "grpInfo": { "exc_nw_grp_id", "exc_nw_grp_nm", "reg_ts", "mod_ts", "reg_conn_id", "mod_conn_id" },
    "excNwInfo": [ { "exc_nw_id", "exc_nw_grp_id", "ip_addr", "subnet_mask", "reg_ts", "reg_conn_id" } ]
  }
}
```

`ExcNetworkGroupVO` 필드: `exc_nw_grp_id`, `exc_nw_grp_nm`, `tnt_id`, `reg_conn_id`, `reg_id`, `reg_ts`, `mod_conn_id`, `mod_id`, `mod_ts`

`ExcNetworkVO` 필드: `exc_nw_id`, `exc_nw_nm`, `cidr`, `bit`, `exc_nw_grp_id`, `tnt_id`, `reg_id`, `reg_ts`, `mod_id`, `mod_ts`

| grpInfo 필드 | 픽스처 | DTO | 상태 |
|------|--------|-----|------|
| `exc_nw_grp_id` | O | O | OK |
| `exc_nw_grp_nm` | O | O | OK |
| `reg_ts`, `mod_ts` | O | O | OK |
| `reg_conn_id`, `mod_conn_id` | O | O | OK |
| `tnt_id` | **없음** | O | MISSING |
| `reg_id`, `mod_id` | **없음** | O | MISSING |

| excNwInfo 필드 | 픽스처 | DTO | 상태 |
|------|--------|-----|------|
| `exc_nw_id` | O | O | OK |
| `exc_nw_grp_id` | O | O | OK |
| `reg_ts` | O | O | OK |
| `reg_conn_id` | O | **없음** (ExcNetworkVO에는 reg_conn_id 없음) | **EXTRA** |
| `ip_addr` | O | **없음** — DTO에는 `cidr` + `bit` | **MISMATCH** |
| `subnet_mask` | O | **없음** — DTO에는 `cidr` + `bit` | **MISMATCH** |
| `cidr` | **없음** | O | **MISSING** |
| `bit` | **없음** | O | **MISSING** |
| `exc_nw_nm` | **없음** | O | MISSING |
| `tnt_id`, `reg_id`, `mod_id`, `mod_ts` | **없음** | O | MISSING |

**결론**:
- `excNwInfo` 항목의 IP 주소 표현 방식 불일치: 픽스처는 `ip_addr` + `subnet_mask`, DTO는 `cidr` + `bit`. **픽스처 필드명 오류.**
- `reg_conn_id`는 `ExcNetworkVO`에 없는 필드 (VO에는 없고 그룹 VO에만 있음).

---

## 5. URL 리다이렉션 차단 (`/api/v1/operation/policy/url/rdrt/disallow`)

### 5-1. 정책 목록 — `UrlRdrtDisallowBase` / `UrlRdrtDisallowPlain`

**fixture 파일**: `url-rdrt-disallow-list.json`
**백엔드 DTO**: `UrlRdrtDisallowBase` + `UrlRdrtDisallowPlain`

`UrlRdrtDisallowBase` 필드: `url_rdrt_disallow_plcy_id`, `url_rdrt_disallow_plcy_nm`, `tnt_id`, `tnt_nm`, `dm_cnt` (int), `reg_id`, `reg_ts`, `mod_id`, `mod_ts`
`UrlRdrtDisallowPlain` 추가: `reg_conn_id`, `mod_conn_id`

픽스처 필드: `url_rdrt_disallow_plcy_id`, `url_rdrt_disallow_plcy_nm`, `tnt_id`, `tnt_nm`, `dm_cnt`, `reg_id`, `reg_ts`, `mod_id`, `mod_ts`, `reg_conn_id`, `mod_conn_id`

**결론**: 이상 없음.

---

### 5-2. 정책 상세 — `UrlRdrtDisallowVO`

**fixture 파일**: `url-disallow-detail.json`
**백엔드 DTO**: `UrlRdrtDisallowVO { ...; List<UrlRdrtDisallowDmVO> dms; }`

`UrlRdrtDisallowVO` 필드: `url_rdrt_disallow_plcy_id`, `tnt_id`, `tnt_nm`, `url_rdrt_disallow_plcy_nm`, `dms`, `reg_id`, `reg_ts`, `mod_id`, `mod_ts`

`UrlRdrtDisallowDmVO` 필드: `url_rdrt_disallow_dm_id`, `dm`, `cont`, `url_rdrt_disallow_plcy_id`, `exp_dms`, `reg_id`, `reg_ts`, `mod_id`, `mod_ts`

`UrlRdrtDisallowExpDmVO` 필드: `url_rdrt_disallow_exp_dm_id`, `dm`, `cont`, `url_rdrt_disallow_dm_id`, `reg_id`, `reg_ts`, `mod_id`, `mod_ts`

픽스처의 `dms` 항목: `dm_id`, `dm`, `exp_dms`
픽스처의 `exp_dms` 항목: `exp_dm_id`, `exp_dm`

| VO 최상위 필드 | 픽스처 | DTO | 상태 |
|------|--------|-----|------|
| `url_rdrt_disallow_plcy_id` | O | O | OK |
| `url_rdrt_disallow_plcy_nm` | O | O | OK |
| `tnt_id` | O | O | OK |
| `tnt_nm` | O | O | OK |
| `reg_id`, `reg_ts`, `mod_id`, `mod_ts` | O | O | OK |
| `reg_conn_id`, `mod_conn_id` | O | **없음** (`UrlRdrtDisallowVO`에 없음) | **EXTRA** |
| `dms` | O (배열) | O | OK (구조 확인 필요) |

| dms 항목 필드 | 픽스처 | DTO (`UrlRdrtDisallowDmVO`) | 상태 |
|------|--------|------------------------------|------|
| `dm_id` | O | **없음** — DTO에는 `url_rdrt_disallow_dm_id` | **MISMATCH** |
| `dm` | O | O | OK |
| `exp_dms` | O (배열) | O | OK (구조 확인 필요) |
| `url_rdrt_disallow_dm_id` | **없음** | O | **MISSING** |
| `url_rdrt_disallow_plcy_id` | **없음** | O | MISSING |
| `cont` | **없음** | O | MISSING |
| `reg_id`, `reg_ts`, `mod_id`, `mod_ts` | **없음** | O | MISSING |

| exp_dms 항목 필드 | 픽스처 | DTO (`UrlRdrtDisallowExpDmVO`) | 상태 |
|------|--------|-------------------------------|------|
| `exp_dm_id` | O | **없음** — DTO에는 `url_rdrt_disallow_exp_dm_id` | **MISMATCH** |
| `exp_dm` | O | **없음** — DTO에는 `dm` | **MISMATCH** |
| `url_rdrt_disallow_exp_dm_id` | **없음** | O | **MISSING** |
| `dm` | **없음** | O | **MISSING** |

**결론**:
- `dms[].dm_id` → DTO는 `url_rdrt_disallow_dm_id`. **픽스처 필드명 오류.**
- `exp_dms[].exp_dm_id` → DTO는 `url_rdrt_disallow_exp_dm_id`. **픽스처 필드명 오류.**
- `exp_dms[].exp_dm` → DTO는 `dm`. **픽스처 필드명 오류.**
- 최상위에 `reg_conn_id`, `mod_conn_id` 포함 — `UrlRdrtDisallowVO`에 없는 필드.

---

## 6. 접근 차단 정책 (`/api/v1/operation/policys/acclbck`)

### 6-1. 목록 — `AccBlckBase` / `AccBlckPlain`

**fixture 파일**: `acclbck-plcys-list.json`
**백엔드 DTO**: `AccBlckBase` + `AccBlckPlain`

`AccBlckBase` 필드: `acc_blck_plcy_id`, `acc_blck_plcy_nm`, `tnt_id`, `reg_id`, `reg_ts`, `mod_id`, `mod_ts`
`AccBlckPlain` 추가: `reg_conn_id`, `mod_conn_id`

픽스처 필드: `acc_blck_plcy_id`, `acc_blck_plcy_nm`, `tnt_id`, `reg_id`, `reg_ts`, `mod_id`, `mod_ts`, `reg_conn_id`, `mod_conn_id`

**결론**: 이상 없음.

---

### 6-2. 상세 — `AccessBlockMultiVO`

**fixture 파일**: `access-control-detail.json`
**백엔드 DTO**: `AccessBlockMultiVO { AccessBlockGroupVO plcyInfo; List<AccessBlockVO> blckList; }`

픽스처 구조:
```json
{
  "data": {
    "acc_blck_plcy_id": "...",
    "acc_blck_plcy_nm": "...",
    "tnt_id": "...",
    "blck_type_cd": "...",
    "blck_ip_list": [...],
    "blck_time_stt": "...",
    "blck_time_end": "..."
  }
}
```

`AccessBlockMultiVO` 구조: `plcyInfo` (AccessBlockGroupVO) + `blckList` (List\<AccessBlockVO>)

`AccessBlockGroupVO` 필드: `acc_blck_plcy_id`, `acc_blck_plcy_nm`, `tnt_id`, `reg_id`, `reg_conn_id`, `reg_ts`, `mod_id`, `mod_conn_id`, `mod_ts`

`AccessBlockVO` 필드: `acc_blck_plcy_id`, `acc_blck_plcy_nm`, `acc_blck_serv_id`, `acc_blck_serv_nm`, `tnt_id`, `ip`, `port`, `reg_id`, `reg_ts`, `mod_id`, `mod_ts`

| 상태 |
|------|
| 픽스처는 flat 구조, DTO는 `plcyInfo` + `blckList` 중첩 구조 | **STRUCT** |
| 픽스처의 `blck_type_cd`, `blck_ip_list`, `blck_time_stt`, `blck_time_end` — DTO에 없는 필드 | **EXTRA** |
| DTO의 `plcyInfo`, `blckList` — 픽스처에 없음 | **MISSING** |

**결론**: 픽스처가 실제 DTO 구조와 완전히 다름. 픽스처는 임의 설계된 flat 구조, 백엔드는 `plcyInfo` + `blckList` 중첩 구조. **픽스처 전면 재작성 필요.**

---

## 7. 외부 연동 (`/api/v1/operation/outs/interfaces`)

### 7-1. 인터페이스 목록 — `ExtInterfaceVO`

**fixture 파일**: `external-interfaces-list.json`
**백엔드 DTO**: `ExtInterfaceVO`

`ExtInterfaceVO` 필드: `tnt_id`, `linkage_type_cd`, `linkage_type_cd_nm`, `ad_itlk_usg_yn`, `shar_str_usg_yn`, `reg_conn_id`, `reg_id`, `reg_ts`, `mod_conn_id`, `mod_id`, `mod_ts`

픽스처 필드: `ext_itlk_div_cd`, `ext_itlk_nm`, `use_yn`

| 필드 | 픽스처 | DTO | 상태 |
|------|--------|-----|------|
| `ext_itlk_div_cd` | O | **없음** — DTO에는 `linkage_type_cd` | **MISMATCH** |
| `ext_itlk_nm` | O | **없음** — DTO에는 `linkage_type_cd_nm` | **MISMATCH** |
| `use_yn` | O | **없음** — DTO에는 `ad_itlk_usg_yn`, `shar_str_usg_yn` | **MISMATCH** |
| `linkage_type_cd` | **없음** | O | **MISSING** |
| `linkage_type_cd_nm` | **없음** | O | **MISSING** |
| `ad_itlk_usg_yn` | **없음** | O | **MISSING** |
| `shar_str_usg_yn` | **없음** | O | **MISSING** |
| `tnt_id`, `reg_*`, `mod_*` | **없음** | O | MISSING |

**결론**: 픽스처 필드명이 DTO와 전혀 다름. **픽스처 전면 재작성 필요.**

---

## 8. 전원 관리 정책 (`/api/v1/operation/policys/powermgt`)

### 8-1. 상세 — `PowerMngDetailVO`

**fixture 파일**: `power-detail.json`
**백엔드 DTO**: `PowerMngDetailVO`

`PowerMngDetailVO` 필드: `power_mng_plcy_id`, `plcy_stt_dt`, `plcy_end_dt`, `power_end_time`, `power_stt_time`, `sche_type`, `week_sche`, `mons_sche`, `reg_id`, `reg_ts`, `mod_id`, `mod_ts`

픽스처 필드: `powermgt_plcy_id`, `powermgt_plcy_nm`, `tnt_id`, `auto_off_yn`, `auto_off_time`, `idle_off_min`

| 필드 | 픽스처 | DTO | 상태 |
|------|--------|-----|------|
| `powermgt_plcy_id` | O | **없음** — DTO에는 `power_mng_plcy_id` | **MISMATCH** |
| `powermgt_plcy_nm` | O | **없음** | **EXTRA** |
| `tnt_id` | O | **없음** | **EXTRA** |
| `auto_off_yn` | O | **없음** | **EXTRA** |
| `auto_off_time` | O | **없음** | **EXTRA** |
| `idle_off_min` | O | **없음** | **EXTRA** |
| `power_mng_plcy_id` | **없음** | O | **MISSING** |
| `plcy_stt_dt` | **없음** | O | **MISSING** |
| `plcy_end_dt` | **없음** | O | **MISSING** |
| `power_end_time` | **없음** | O | **MISSING** |
| `power_stt_time` | **없음** | O | **MISSING** |
| `sche_type` | **없음** | O | **MISSING** |
| `week_sche` | **없음** | O | **MISSING** |
| `mons_sche` | **없음** | O | **MISSING** |

**결론**: 픽스처 필드명이 DTO와 전혀 다름. **픽스처 전면 재작성 필요.**

---

## 9. 재설정 정책 (`/api/v1/operation/policys/rset`)

### 9-1. 상세 — `RsetPlcyDetailVO`

**fixture 파일**: `rset-detail.json`
**백엔드 DTO**: `RsetPlcyDetailVO`

`RsetPlcyDetailVO` 필드: `rset_plcy_id`, `rset_plcy_cd`, `rset_end_time`, `reg_id`, `reg_ts`, `mod_id`, `mod_ts`

픽스처 필드: `rset_plcy_id`, `rset_plcy_nm`, `tnt_id`, `auto_rset_yn`, `rset_cycle_cd`

| 필드 | 픽스처 | DTO | 상태 |
|------|--------|-----|------|
| `rset_plcy_id` | O | O | OK |
| `rset_plcy_nm` | O | **없음** | **EXTRA** |
| `tnt_id` | O | **없음** | **EXTRA** |
| `auto_rset_yn` | O | **없음** | **EXTRA** |
| `rset_cycle_cd` | O | **없음** — DTO에는 `rset_plcy_cd` | **MISMATCH** |
| `rset_plcy_cd` | **없음** | O | **MISSING** |
| `rset_end_time` | **없음** | O | **MISSING** |
| `reg_id`, `reg_ts`, `mod_id`, `mod_ts` | **없음** | O | MISSING |

**결론**: `rset_plcy_id`만 일치. 나머지 필드명 불일치. **픽스처 전면 재작성 필요.**

---

## 10. VM 메타데이터 (`/api/v1/operation/policys/vm/mdata`)

### 10-1. 목록 — `VmMdataBase` / `VmMdataPlain`

**fixture 파일**: `vm-mdata-list.json`
**백엔드 DTO**: `VmMdataBase`

`VmMdataBase` 필드: `vm_mdata_id`, `vm_mdata_tgt_cd`, `vm_mdata_nm`, `tnt_id`, `mdata` (Object), `cont`, `volm_qos_plcy_id`, `reg_id`, `reg_ts`, `mod_id`, `mod_ts`

픽스처 필드: `vm_mdata_id`, `vm_mdata_tgt_cd`, `vm_mdata_nm`, `tnt_id`, `mdata`, `cont`, `volm_qos_plcy_id`, `reg_id`, `reg_ts`, `mod_id`, `mod_ts`, `reg_conn_id`, `mod_conn_id`

**결론**: 이상 없음 (`reg_conn_id`/`mod_conn_id`는 Plain 서브클래스 기준).

---

### 10-2. 상세 — `VmMdataDetailVO`

**fixture 파일**: `metadata-detail.json`
**백엔드 DTO**: `VmMdataDetailVO`

`VmMdataDetailVO` 필드: `vm_mdata_id`, `vm_mdata_tgt_cd`, `vm_mdata_nm`, `tnt_id`, `mdata`, `cont`, `volm_qos_plcy_id`, `reg_conn_id`, `reg_id`, `reg_ts`, `mod_conn_id`, `mod_id`, `mod_ts`

픽스처 필드: `vm_mdata_id`, `vm_mdata_tgt_cd` (없음), `vm_mdata_nm` (없음), `tnt_id`, `mdata_key`, `mdata_val`

| 필드 | 픽스처 | DTO | 상태 |
|------|--------|-----|------|
| `vm_mdata_id` | O | O | OK |
| `tnt_id` | O | O | OK |
| `vm_mdata_nm` | **없음** | O | MISSING |
| `vm_mdata_tgt_cd` | **없음** | O | MISSING |
| `mdata` (Object) | **없음** | O | **MISSING** |
| `mdata_key` | O | **없음** | **EXTRA** |
| `mdata_val` | O | **없음** | **EXTRA** |
| `cont`, `volm_qos_plcy_id`, `reg_*`, `mod_*` | **없음** | O | MISSING |

**결론**: 상세 픽스처가 실제 DTO 구조와 다름. `mdata`는 복잡한 JSON 객체인데 픽스처는 `mdata_key`/`mdata_val` flat 구조. **픽스처 재작성 필요.** (목록 픽스처 `vm-mdata-list.json`은 올바른 구조 사용.)

---

## 11. 스토리지 스케줄 정책 (`/api/v1/operation/policy/storage/sched`)

### 11-1. 목록 — `StorageSchedPlcyDetailVO`

**fixture 파일**: `storage-sched.json`
**백엔드 DTO**: `StorageSchedPlcyDetailVO`

`StorageSchedPlcyDetailVO` 필드: `volm_sched_plcy_id`, `volm_sched_plcy_nm`, `volm_sched_plcy_typ_cd`, `volm_sched_plcy_typ_cd_nm`, `volm_sched_plcy_tgt_cd`, `volm_sched_plcy_tgt_cd_nm`, `volm_typ_id`, `tnt_id`, `reg_id`, `reg_ts`, `mod_id`, `mod_ts`

픽스처 구조: `{ "data": { ... } }` — 단일 객체 (배열 아님)

> 참고: `getPolicies` 는 `List<StorageSchedPlcyDetailVO>` 반환. 픽스처가 배열이 아닌 단일 객체로 작성됨 — **STRUCT**.

픽스처 필드: `sched_id`, `tnt_id`, `sched_cycle_cd`, `sched_time`, `use_yn`

| 필드 | 픽스처 | DTO | 상태 |
|------|--------|-----|------|
| `sched_id` | O | **없음** — DTO에는 `volm_sched_plcy_id` | **MISMATCH** |
| `tnt_id` | O | O | OK |
| `sched_cycle_cd` | O | **없음** — DTO에는 `volm_sched_plcy_typ_cd` | **MISMATCH** |
| `sched_time` | O | **없음** | **EXTRA** |
| `use_yn` | O | **없음** | **EXTRA** |
| `volm_sched_plcy_id` | **없음** | O | **MISSING** |
| `volm_sched_plcy_nm` | **없음** | O | MISSING |
| `volm_sched_plcy_typ_cd` | **없음** | O | **MISSING** |
| `volm_sched_plcy_tgt_cd` | **없음** | O | MISSING |
| `reg_id`, `reg_ts`, `mod_id`, `mod_ts` | **없음** | O | MISSING |

**결론**: 픽스처 필드명이 DTO와 다르고, 응답 구조도 배열 아닌 단일 객체. **픽스처 전면 재작성 필요.**

---

## 종합 요약

### 이상 없음 (픽스처 ↔ DTO 일치)

| API | 픽스처 |
|-----|--------|
| USB Policy 목록/상세 | `usb-policy-list.json`, `usb-policy-detail.json` |
| USB Policy types | `usb-policy-types.json` |
| USB Type 목록/상세 | `usb-type-list.json`, `usb-type-detail.json` |
| USB Type usb_policies | `usb-type-usb-policies.json` |
| USB Vendor 목록/상세 | `usb-vendor-list.json`, `usb-vendor-detail.json` |
| USB Vendor usb_policies | `usb-vendor-usb-policies.json` |
| USB Vendor models | `usb-vendor-models.json` |
| USB Model 목록/상세 | `usb-model-list.json`, `usb-model-detail.json` |
| USB Model usb_policies | `usb-model-usb-policies.json` |
| 백업/스냅샷 그룹 목록/상세 | `backup-grp-list.json`, `backup-detail.json` |
| AccBlck 목록 | `acclbck-plcys-list.json` |
| URL 리다이렉션 차단 목록 | `url-rdrt-disallow-list.json` |
| VM 메타데이터 목록 | `vm-mdata-list.json` |

### 불일치 발견 (수정 필요)

| 픽스처 | 불일치 내용 | 심각도 |
|--------|-------------|--------|
| `usb-policy-vendors.json` | `models` 필드 추가(EXTRA), `usb_model_target_code` 등 누락 | 중 |
| `blacklist-list.json`, `blacklist-detail.json` | `blst_file_nm` → `att_file_nm`, `sw_cnt` EXTRA | 높음 |
| `excn-grp-list.json` | `exc_nw_cnt` EXTRA, `tnt_id`/`reg_id`/`mod_id` 누락 | 낮음 |
| `excn-grp-detail.json` (`excNwInfo`) | `ip_addr`/`subnet_mask` → `cidr`/`bit`, `reg_conn_id` EXTRA | 높음 |
| `url-disallow-detail.json` | `dms[].dm_id` → `url_rdrt_disallow_dm_id`, `exp_dms[].exp_dm_id` → `url_rdrt_disallow_exp_dm_id`, `exp_dms[].exp_dm` → `dm` | 높음 |
| `access-control-detail.json` | flat 구조 vs `plcyInfo`+`blckList` 중첩 구조 전면 불일치 | 높음 |
| `external-interfaces-list.json` | `ext_itlk_div_cd`/`ext_itlk_nm`/`use_yn` → `linkage_type_cd`/`linkage_type_cd_nm`/`ad_itlk_usg_yn`+`shar_str_usg_yn` | 높음 |
| `power-detail.json` | 전 필드 불일치 (DTO: `power_mng_plcy_id`, `plcy_stt_dt`, `sche_type` 등) | 높음 |
| `rset-detail.json` | `rset_cycle_cd` → `rset_plcy_cd`, `rset_end_time` 누락 등 | 높음 |
| `metadata-detail.json` | `mdata_key`/`mdata_val` → `mdata` (Object), 구조 전면 불일치 | 높음 |
| `storage-sched.json` | `sched_id` → `volm_sched_plcy_id`, `sched_cycle_cd` → `volm_sched_plcy_typ_cd`, 배열 vs 단일 객체 | 높음 |
