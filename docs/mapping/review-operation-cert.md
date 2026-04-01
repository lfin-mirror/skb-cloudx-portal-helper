# Operation MS Cert API — Fixture vs DTO 필드 비교 리뷰

> 작성일: 2026-03-31
> 대상: `/api/v1/operation/cert/n2nd`, `/api/v1/operation/cert/secu`, `/api/v1/operation/cert/secu/noauth`, `/api/v1/operation/secu/cert/*` (보안 인증서)
> 검토 방법: fixture JSON 필드 ↔ Java DTO 필드 직접 비교. Java 필드명은 snake_case 그대로 사용(Jackson 기본 직렬화).

---

## 1. cert/n2nd — N2ndController

### 1-1. GET ptalType list (`cert-n2nd-admin-list.json`, `cert-n2nd-user-list.json`)

**응답 DTO**: `ResponseResult<List<N2ndResponseBase>>` (실제 구체 타입: `N2ndResponsePlain`)

**DTO 필드** (`N2ndResponseBase` + `N2ndResponsePlain`):

| 필드 | 타입 | 비고 |
|------|------|------|
| cert_plcy_id | String | |
| cert_plcy_nm | String | |
| ptal_typ_cd | String | |
| ptal_typ_cd_nm | String | |
| cert_plcy_tgt_cd | String | |
| cert_plcy_tgt_cd_nm | String | |
| tot_nw_n2nd_cert_yn | String | |
| tot_nw_n2nd_cert_mtd_cd | String | |
| tot_nw_n2nd_cert_mtd_cd_nm | String | |
| tot_nw_conn_alow_yn | String | |
| exc_nw_grp_id | String | |
| exc_nw_n2nd_cert_yn | String | |
| exc_nw_n2nd_cert_mtd_cd | String | |
| exc_nw_n2nd_cert_mtd_cd_nm | String | |
| exc_nw_conn_alow_yn | String | |
| lin_rstt_usg_yn | String | |
| lin_fail_alow_cnt | String | |
| lin_rstt_mi_cnt | String | |
| sess_expr_mi_cnt | String | |
| rest_std_dd_cnt | String | |
| passwd_mdfy_dd_cnt | String | |
| vm_rstt_cnt | String | |
| usr_dsk_rstt_cnt | String | |
| usr_dsk_max_size | String | |
| blst_usg_yn | String | 기본값 "Y" |
| tnt_id | String | |
| wtst_usg_yn | String | 기본값 "Y" |
| group_cnt | int | |
| account_cnt | int | |
| reg_id | String | |
| reg_ts | String | |
| mod_id | String | |
| mod_ts | String | |
| reg_conn_id | String | `N2ndResponsePlain`에서 추가 |
| mod_conn_id | String | `N2ndResponsePlain`에서 추가 |

**Fixture 필드** (`cert-n2nd-admin-list.json` 기준):

위 DTO 필드와 전체 일치. `reg_conn_id`, `mod_conn_id` 포함.

**결과: 일치** ✓

---

### 1-2. GET info detail (`cert-n2nd-admin-detail.json`, `cert-n2nd-user-detail.json`)

**응답 DTO**: `ResponseResult<N2ndDetailVO>`

**DTO 필드** (`N2ndDetailVO`):

N2ndResponseBase 필드 전체 + `reg_conn_id`, `mod_conn_id` 포함 (직접 선언).

**Fixture 비교** (`cert-n2nd-admin-detail.json`):

| 상태 | 내용 |
|------|------|
| 일치 | 모든 n2nd 정책 필드 일치 |
| 일치 | `reg_conn_id`, `mod_conn_id` 포함 |

**결과: 일치** ✓

**Fixture 비교** (`cert-n2nd-user-detail.json`): 동일 구조, 일치. ✓

---

### 1-3. GET acc (`cert-n2nd-acc.json`)

**응답 DTO**: `ResponseResult<List<AccountMappedCertBase>>`

**DTO 필드** (`AccountMappedCertBase`):

| 필드 | 타입 |
|------|------|
| cert_plcy_id | String |
| usr_grp_id | String |
| usr_grp_nm | String |
| acct_id | String |
| ognz_nm | String |
| blng_dept_nm | String |
| acct_descp | String |
| grp_typ_cd | String |
| grp_typ_cd_nm | String |

**Fixture 필드** (`cert-n2nd-acc.json`):

```json
{ "acct_id": "...", "acct_nm": "***", "acct_conn_id": "***" }
```

**결과: 불일치** ✗

| 구분 | 내용 |
|------|------|
| Fixture에만 있음 | `acct_nm`, `acct_conn_id` |
| DTO에만 있음 | `cert_plcy_id`, `usr_grp_id`, `usr_grp_nm`, `ognz_nm`, `blng_dept_nm`, `acct_descp`, `grp_typ_cd`, `grp_typ_cd_nm` |

Fixture가 `AccountMappedCertBase` 구조를 반영하지 않고 단순화된 필드만 포함. `acct_nm`, `acct_conn_id`는 DTO에 없는 필드.

---

### 1-4. GET cert list all (`cert-n2nd-grp-list.json`)

**응답 DTO**: `ResponseResult<List<N2ndResponseBase>>`

**Fixture 필드** (`cert-n2nd-grp-list.json`):

```json
{ "cert_plcy_id": "...", "cert_plcy_nm": "...", "ptal_type_cd": "...", "tnt_id": "..." }
```

**결과: 불일치** ✗

| 구분 | 내용 |
|------|------|
| Fixture 필드명 오류 | `ptal_type_cd` → DTO는 `ptal_typ_cd` (`type` vs `typ`) |
| Fixture에 누락된 필드 | N2ndResponseBase의 나머지 26개 필드 전부 없음 |

Fixture가 목록 API용으로 극도로 축약되어 있고, 필드명 오타(`ptal_type_cd`)까지 존재.

---

### 1-5. GET cert policy detail (`cert-policy-adm-detail.json`, `cert-policy-usr-detail.json`)

**응답 DTO**: `ResponseResult<N2ndDetailVO>`

**Fixture 필드** (`cert-policy-adm-detail.json`):

```json
{
  "cert_plcy_id", "cert_plcy_nm", "ptal_type_cd", "tnt_id",
  "login_fail_cnt", "login_lock_yn", "session_timeout_min",
  "passwd_expire_day", "passwd_min_len", "passwd_complex_yn",
  "hold_day", "n2nd_auth_type_cd", "exc_nw_grp_id"
}
```

**결과: 불일치** ✗

| 구분 | 내용 |
|------|------|
| Fixture 필드명 오류 | `ptal_type_cd` → DTO는 `ptal_typ_cd` |
| Fixture에만 있는 필드 | `login_fail_cnt`, `login_lock_yn`, `session_timeout_min`, `passwd_expire_day`, `passwd_min_len`, `passwd_complex_yn`, `hold_day`, `n2nd_auth_type_cd` — DTO(`N2ndDetailVO`)에 없음 |
| DTO에만 있는 필드 | `tot_nw_n2nd_cert_yn`, `tot_nw_n2nd_cert_mtd_cd`, `lin_rstt_usg_yn`, `lin_fail_alow_cnt`, `sess_expr_mi_cnt`, `passwd_mdfy_dd_cnt` 등 실제 필드 전부 누락 |

이 두 fixture는 `N2ndDetailVO`와 완전히 다른 구조. 초기 설계 당시 임시로 만든 fixture로 보임.

---

## 2. cert/secu — VpcController

### 2-1. GET grps list (`cert-secu-grps-list.json`, `cert-secu-grps-list-ta.json`)

**응답 DTO**: `ResponseResult<List<VpcResponseBase>>` (구체 타입: `VpcResponsePlain`)

**DTO 필드** (`VpcResponseBase` + `VpcResponsePlain`):

| 필드 | 타입 |
|------|------|
| secu_plcy_id | String |
| secu_plcy_nm | String |
| secu_plcy_tgt_cd | String |
| secu_plcy_tgt_cd_nm | String |
| group_cnt | int |
| pool_cnt | int |
| vm_cnt | int |
| reg_ts | String |
| mod_ts | String |
| reg_conn_id | String | (`VpcResponsePlain` 추가) |
| mod_conn_id | String | (`VpcResponsePlain` 추가) |

**Fixture 필드** (`cert-secu-grps-list.json`): 위 DTO 전체 필드 포함.

**결과: 일치** ✓

**Fixture** (`cert-secu-grps-list-ta.json`): 동일 구조, 일치. ✓

---

### 2-2. GET info detail (`cert-secu-info-detail.json`)

**응답 DTO**: `ResponseResult<VpcDetailVO>`

**DTO 필드** (`VpcDetailVO`):

| 필드 | 타입 |
|------|------|
| secu_plcy_id | String |
| secu_plcy_nm | String |
| secu_plcy_tgt_cd | String |
| secu_plcy_tgt_cd_nm | String |
| exc_nw_grp_id | String |
| vpc_auto_login_yn | String |
| viwr_expr_usg_yn | String |
| viwr_expr_mi_cnt | String |
| acc_blck_plcy_id | String |
| url_rdrt_blck_plcy_id | String |
| pcly_cert | List\<VpcConnNetDetailVO\> |
| url_rdrt_disallow_plcy_id | String |
| url_rdrt_disallow_to_vm_plcy_id | String |
| vm_mdata_id | String |
| proxy_type_cd | String |
| vm_mdata_nm | String |
| acc_blck | List\<VpcAccBlckDetailVO\> |
| url_blck | List\<VpcUrlBlckDetailVO\> |
| auto_resol_usg_yn | String |
| wmk_plcy | VpcWmkPlcyVO |
| wmk_usg_yn | String |
| reg_id | String |
| reg_ts | String |
| mod_id | String |
| mod_ts | String |
| noauth_proc_blck_plcy_id | String |
| noAuthProcBlckPlcyDetailVo | NoAuthProcBlckPlcyDetailVo |

**`pcly_cert` 항목** (`VpcConnNetDetailVO`): `secu_plcy_auth_id`, `secu_plcy_id`, `conn_net_cd`, `conn_net_cd_nm`, `clb_shar_auth_cd`, `clb_shar_auth_cd_nm`, `drag_drop_auth_cd`, `drag_drop_auth_cd_nm`, `usb_plcy_id`, `usb_plcy_nm`, `url_rdrt_auth_cd`, `url_rdrt_auth_cd_nm`, `url_rdrt_to_vm_auth_cd`, `url_rdrt_to_vm_auth_cd_nm`, `prt_conn_auth_cd`, `prt_conn_auth_cd_nm`, `mult_mtor_auth_cd`, `mult_mtor_auth_cd_nm`, `scr_capture_yn`, `reg_id`, `reg_ts`, `mod_id`, `mod_ts`

**Fixture 비교** (`cert-secu-info-detail.json`):

| 구분 | 내용 |
|------|------|
| Fixture에 있고 DTO에 없음 | 없음 |
| DTO에 있고 Fixture에 없음 | `vpc_auto_login_yn`, `url_rdrt_disallow_to_vm_plcy_id`, `wmk_plcy`, `wmk_usg_yn` |
| pcly_cert Fixture에만 있음 | `sg_grp_id` — `VpcConnNetDetailVO`에 없는 필드 |
| pcly_cert DTO에만 있음 | `url_rdrt_to_vm_auth_cd`, `url_rdrt_to_vm_auth_cd_nm` |

**결과: 부분 불일치** △

- `sg_grp_id`: fixture `pcly_cert` 항목에 포함되어 있으나 `VpcConnNetDetailVO`에 선언 없음. 실서버 응답에 포함되는 필드일 수 있음.
- `url_rdrt_to_vm_auth_cd`, `url_rdrt_to_vm_auth_cd_nm`: DTO에 있으나 `cert-secu-info-detail.json` fixture에 없음. `cert-secu-adopter-info.json`에는 포함.
- `wmk_usg_yn`, `wmk_plcy`: DTO에 있으나 fixture 누락.

---

### 2-3. GET adopter info (`cert-secu-adopter-info.json`)

**응답 DTO**: `ResponseResult<VpcAdptDetailVO>`

**DTO 필드** (`VpcAdptDetailVO`): `secu_plcy_id`, `secu_plcy_nm`, `secu_plcy_tgt_cd`, `exc_nw_grp_id`, `vpc_auto_login_yn`, `pcly_cert`(List\<VpcConnNetDetailVO\>), `reg_id`, `reg_ts`, `mod_id`, `mod_ts`

**Fixture 필드** (`cert-secu-adopter-info.json`):

- 최상위: `secu_plcy_id`, `secu_plcy_nm`, `secu_plcy_tgt_cd`, `exc_nw_grp_id`, `vpc_auto_login_yn`, `pcly_cert`, `reg_id`, `reg_ts`, `mod_id`, `mod_ts` — DTO와 일치.
- `pcly_cert` 항목에 `url_rdrt_to_vm_auth_cd`, `url_rdrt_to_vm_auth_cd_nm` 포함 → DTO(`VpcConnNetDetailVO`)에 있음. 일치.
- `pcly_cert` 항목에 `sg_grp_id` 포함 → DTO에 없음.

**결과: 부분 불일치** △

| 구분 | 내용 |
|------|------|
| pcly_cert Fixture에만 있음 | `sg_grp_id` — DTO에 없는 필드 |

---

## 3. cert/secu/noauth — NoAuthController

### 3-1. GET list (`cert-secu-noauth-list.json`)

**응답 DTO**: `ResponseResult<List<NoAuthProcBlckPlcyBase>>` (구체 타입: `NoAuthProcBlckPlcyPlain`)

**DTO 필드** (`NoAuthProcBlckPlcyBase` + `NoAuthProcBlckPlcyPlain`):

| 필드 | 타입 |
|------|------|
| noauth_proc_blck_plcy_id | String |
| noauth_proc_blck_plcy_nm | String |
| cnt | int |
| reg_ts | String |
| mod_ts | String |
| reg_conn_id | String | (`NoAuthProcBlckPlcyPlain` 추가) |
| mod_conn_id | String | (`NoAuthProcBlckPlcyPlain` 추가) |

**Fixture 비교** (`cert-secu-noauth-list.json`): 모든 필드 일치.

**결과: 일치** ✓

---

### 3-2. GET detail (`cert-secu-noauth-detail.json`)

**응답 DTO**: `ResponseResult<NoAuthProcBlckPlcyDetailVo>`

**DTO 필드** (`NoAuthProcBlckPlcyDetailVo`):

| 필드 | 타입 |
|------|------|
| noauth_proc_blck_plcy_id | String |
| noauth_proc_blck_plcy_nm | String |
| reg_id | String |
| reg_ts | String |
| mod_id | String |
| mod_ts | String |
| noauth_proc_blck | List\<NoAuthProcBlckVo\> |

**`NoAuthProcBlckVo` 필드**: `noauth_proc_blck_plcy_id`, `noauth_proc_blck_id`, `proc_nm`, `cont`, `reg_id`, `reg_ts`, `mod_id`, `mod_ts`

**Fixture 비교** (`cert-secu-noauth-detail.json`):

최상위 필드: DTO와 일치. `reg_conn_id`, `mod_conn_id` 포함 — DTO에도 있음.

`noauth_proc_blck` 항목 fixture 필드: `noauth_proc_blck_id`, `noauth_proc_blck_plcy_id`, `proc_nm`, `proc_hash`, `reg_ts`, `reg_conn_id`

**결과: 부분 불일치** △

| 구분 | 내용 |
|------|------|
| noauth_proc_blck Fixture에만 있음 | `proc_hash`, `reg_conn_id` |
| noauth_proc_blck DTO에만 있음 | `cont`, `mod_id`, `mod_ts` |

`proc_hash`: `NoAuthProcBlckVo`에 선언 없음. 실서버 응답에 있을 가능성.
`cont`: DTO에 있으나 fixture 누락.

---

### 3-3. GET blck list (`cert-secu-noauth-blck-list.json`)

**응답 DTO**: `ResponseResult<List<NoAuthProcBlckVo>>`

**Fixture 필드**: `blck_id`, `blck_ip`, `blck_ts`

**결과: 불일치** ✗

| 구분 | 내용 |
|------|------|
| Fixture에만 있음 | `blck_id`, `blck_ip`, `blck_ts` |
| DTO에만 있음 | `noauth_proc_blck_plcy_id`, `noauth_proc_blck_id`, `proc_nm`, `cont`, `reg_id`, `reg_ts`, `mod_id`, `mod_ts` |

Fixture가 `NoAuthProcBlckVo` 구조와 완전히 다름. IP 차단 목록처럼 보이는 임시 데이터로, DTO 필드를 반영하지 않음.

---

## 4. secu/cert — ScertController (보안 인증서)

### 4-1. GET cert list (`cert-cloudpc-ca.json`, `cert-cloudpc-server.json`, `cert-infra-ca.json`, `cert-infra-server.json`, `cert-spice-ca.json`, `cert-spice-server.json`)

**응답 DTO**: `ResponseResult<List<CertificateInfo>>`

**DTO 필드** (`CertificateInfo`):

| 필드 | 타입 |
|------|------|
| ca_typ_cd | String |
| secret_name | String |
| namespace | String |
| version | String |
| serial_number | String |
| signature_algorithm | String |
| issuer | String |
| subject | String |
| valid_start | LocalDateTime (직렬화: "yyyy-MM-dd HH:mm:ss") |
| valid_end | LocalDateTime (직렬화: "yyyy-MM-dd HH:mm:ss") |

**Fixture 비교** (`cert-cloudpc-ca.json` 대표):

```json
{"ca_typ_cd":"M006PV","secret_name":"ci-handler-cert","namespace":"cloudpc","version":"3",
 "serial_number":"...","signature_algorithm":"SHA256withRSA","issuer":"...","subject":"...",
 "valid_start":"2025-10-17 17:54:18","valid_end":"2035-10-15 17:54:18"}
```

모든 필드 일치. `valid_start`, `valid_end` 날짜 형식도 DTO `@JsonFormat` 패턴과 일치.

**결과: 일치** ✓

---

### 4-2. GET expiry list (`cert-infm-list.json`)

**응답 DTO**: `ResponseResult<List<ScertExpiryListVO>>`

**DTO 필드** (`ScertExpiryListVO`):

| 필드 | 타입 |
|------|------|
| scert_infm_no | String |
| infm_tm | String |
| infm_typ_cd | String |
| infm_typ_cd_nm | String |
| scert_typ_cd | String |
| scert_typ_cd_nm | String |
| host_id | String |
| host_nm | String |
| vlid_stt_dt | String |
| vlid_end_dt | String |
| scert_ver | String |
| isur_nm | String |
| reg_id | String |
| reg_ts | String |
| mod_id | String |
| mod_ts | String |

**Fixture 비교** (`cert-infm-list.json`): 모든 필드 일치.

**결과: 일치** ✓

---

## 5. 전체 요약

| API | fixture 파일 | 결과 | 비고 |
|-----|-------------|------|------|
| GET /cert/n2nd/ptalType/:type (admin) | cert-n2nd-admin-list.json | ✓ 일치 | |
| GET /cert/n2nd/ptalType/:type (user) | cert-n2nd-user-list.json | ✓ 일치 | |
| GET /cert/n2nd/info/:id (admin) | cert-n2nd-admin-detail.json | ✓ 일치 | |
| GET /cert/n2nd/info/:id (user) | cert-n2nd-user-detail.json | ✓ 일치 | |
| GET /cert/n2nd/:id/acc | cert-n2nd-acc.json | ✗ 불일치 | fixture 필드가 DTO(`AccountMappedCertBase`)와 다름 |
| GET /policys/cert/n2nd (all) | cert-n2nd-grp-list.json | ✗ 불일치 | 필드 대부분 누락, `ptal_type_cd` 오타 |
| GET /policys/cert/A007ADM/:id | cert-policy-adm-detail.json | ✗ 불일치 | 완전히 다른 구조 (구버전 설계) |
| GET /policys/cert/A007USR/:id | cert-policy-usr-detail.json | ✗ 불일치 | 완전히 다른 구조 (구버전 설계) |
| GET /cert/secu/grps (SA) | cert-secu-grps-list.json | ✓ 일치 | |
| GET /cert/secu/grps (TA) | cert-secu-grps-list-ta.json | ✓ 일치 | |
| GET /cert/secu/info/:id | cert-secu-info-detail.json | △ 부분 불일치 | `sg_grp_id` fixture에만 있음; `wmk_usg_yn` 등 DTO에만 있음 |
| GET /cert/secu/adopter/info/:id | cert-secu-adopter-info.json | △ 부분 불일치 | `sg_grp_id` fixture에만 있음 |
| GET /cert/secu/noauth | cert-secu-noauth-list.json | ✓ 일치 | |
| GET /cert/secu/noauth/:id | cert-secu-noauth-detail.json | △ 부분 불일치 | `proc_hash` fixture에만; `cont` DTO에만 |
| GET /cert/secu/noauth/:id/blck | cert-secu-noauth-blck-list.json | ✗ 불일치 | fixture 구조가 DTO와 완전히 다름 |
| GET /secu/cert/list/:type/:certType | cert-{type}-{certType}.json | ✓ 일치 | |
| GET /secu/cert/infm | cert-infm-list.json | ✓ 일치 | |

---

## 6. 수정 필요 fixture 목록

### 즉시 수정 필요

| fixture 파일 | 문제 | 권장 조치 |
|-------------|------|----------|
| `cert-n2nd-acc.json` | `acct_nm`, `acct_conn_id`는 `AccountMappedCertBase` DTO에 없음. `cert_plcy_id`, `usr_grp_id`, `usr_grp_nm`, `ognz_nm`, `blng_dept_nm`, `acct_descp`, `grp_typ_cd`, `grp_typ_cd_nm` 누락 | DTO 구조에 맞게 재작성 |
| `cert-secu-noauth-blck-list.json` | `blck_id`, `blck_ip`, `blck_ts` 필드 — `NoAuthProcBlckVo`에 없음 | DTO 필드(`noauth_proc_blck_id`, `proc_nm`, `cont` 등)로 재작성 |

### 필드명 오타 수정 필요

| fixture 파일 | 오타 필드 | 정확한 필드명 |
|-------------|----------|-------------|
| `cert-n2nd-grp-list.json` | `ptal_type_cd` | `ptal_typ_cd` |
| `cert-policy-adm-detail.json` | `ptal_type_cd` | `ptal_typ_cd` |
| `cert-policy-usr-detail.json` | `ptal_type_cd` | `ptal_typ_cd` |

### 구버전 구조 교체 필요

| fixture 파일 | 문제 | 권장 조치 |
|-------------|------|----------|
| `cert-n2nd-grp-list.json` | 극도로 축약된 4개 필드만 있고 나머지 N2ndResponseBase 필드 누락 | `cert-n2nd-admin-list.json` 구조를 참고해 재작성 |
| `cert-policy-adm-detail.json` | `login_fail_cnt`, `login_lock_yn`, `session_timeout_min` 등 구버전 필드 — `N2ndDetailVO`에 없음 | `cert-n2nd-admin-detail.json` 구조로 교체 |
| `cert-policy-usr-detail.json` | 동일 문제 | `cert-n2nd-user-detail.json` 구조로 교체 |

### 확인 후 처리 (실서버 동작 불명확)

| fixture 파일 | 필드 | 비고 |
|-------------|------|------|
| `cert-secu-info-detail.json` | `sg_grp_id` (pcly_cert 내) | `VpcConnNetDetailVO`에 없으나 실서버 응답에 있을 가능성. 코드 재확인 필요 |
| `cert-secu-adopter-info.json` | `sg_grp_id` (pcly_cert 내) | 동일 |
| `cert-secu-info-detail.json` | `wmk_usg_yn`, `wmk_plcy` | DTO에 있으나 fixture 누락. 실서버에서 반환 가능성 높음 — fixture에 추가 권장 |
| `cert-secu-noauth-detail.json` | `proc_hash` (noauth_proc_blck 내) | DTO에 없으나 실서버 응답에 있을 수 있음. `cont` 필드도 fixture에 추가 권장 |
