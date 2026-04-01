# 인증 정책 API

리소스 경로 기준: `/v1/operation/cert`, `/v1/operation/policys/cert`

---

## 2차 인증 정책 (n2nd)

### 2차 인증 정책 목록 조회 (포털 유형별)

```
GET /v1/operation/cert/n2nd/ptalType/{ptal_type_cd}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| ptal_type_cd | string | Y | 포털 유형 코드 (`A007ADM` 관리자 / `A007USR` 사용자) |

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | 2차 인증 정책 목록 |
| data[].cert_plcy_id | string | 인증 정책 ID |
| data[].cert_plcy_nm | string | 인증 정책명 |
| data[].ptal_typ_cd | string | 포털 유형 코드 (`A007ADM` / `A007USR`) |
| data[].ptal_typ_cd_nm | string | 포털 유형 코드명 |
| data[].cert_plcy_tgt_cd | string | 인증 정책 대상 코드 (`U003S` SA 기본 / `U003B` 테넌트) |
| data[].cert_plcy_tgt_cd_nm | string | 인증 정책 대상 코드명 |
| data[].tnt_id | string | 테넌트 ID (`ADMIN` 또는 테넌트 UUID) |
| data[].tot_nw_n2nd_cert_yn | string | 전체 네트워크 2차 인증 사용 여부 (`Y`/`N`) |
| data[].tot_nw_n2nd_cert_mtd_cd | string | 전체 네트워크 2차 인증 방식 코드 (`U004SMS` / `U004OTP` / `U004EML`) |
| data[].tot_nw_n2nd_cert_mtd_cd_nm | string | 전체 네트워크 2차 인증 방식 코드명 |
| data[].tot_nw_conn_alow_yn | string | 전체 네트워크 접속 허용 여부 (`Y`/`N`) |
| data[].exc_nw_grp_id | string\|null | 예외 네트워크 그룹 ID |
| data[].exc_nw_n2nd_cert_yn | string | 예외 네트워크 2차 인증 사용 여부 (`Y`/`N`) |
| data[].exc_nw_n2nd_cert_mtd_cd | string | 예외 네트워크 2차 인증 방식 코드 |
| data[].exc_nw_conn_alow_yn | string | 예외 네트워크 접속 허용 여부 (`Y`/`N`) |
| data[].lin_rstt_usg_yn | string | 로그인 제한 사용 여부 (`T` 임시잠금 / `C` 영구잠금 / `N` 미사용) |
| data[].lin_fail_alow_cnt | string | 로그인 실패 허용 횟수 |
| data[].lin_rstt_mi_cnt | string | 로그인 제한 시간(분) |
| data[].sess_expr_mi_cnt | string | 세션 만료 시간(분) |
| data[].rest_std_dd_cnt | string | 휴면 기준 일수 |
| data[].passwd_mdfy_dd_cnt | string | 비밀번호 변경 주기(일) |
| data[].vm_rstt_cnt | string\|null | VM 재시작 횟수 (ADM 정책에서 null) |
| data[].usr_dsk_rstt_cnt | string\|null | 사용자 디스크 재시작 횟수 (ADM 정책에서 null) |
| data[].usr_dsk_max_size | string\|null | 사용자 디스크 최대 크기(GB) (ADM 정책에서 null) |
| data[].blst_usg_yn | string | 블랙리스트 사용 여부 (`Y`/`N`) |
| data[].wtst_usg_yn | string | 화이트리스트 사용 여부 (`Y`/`N`) |
| data[].group_cnt | number | 적용된 그룹 수 |
| data[].account_cnt | number | 적용된 계정 수 |
| data[].reg_id | string | 등록자 ID |
| data[].reg_ts | string | 등록 일시 |
| data[].mod_id | string | 수정자 ID |
| data[].mod_ts | string | 수정 일시 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/AdminAuthPolicyAuth.vue` | 478 |
| `views/policy/UserAuthPolicyAuth.vue` | 619 |
| `views/policy/AdminAuthPolicy.vue` | 179 |
| `views/policy/UserAuthPolicy.vue` | 174 |
| `views/policy/AdminAuthPolicySupadm.vue` | 449 |
| `views/policy/UserAuthPolicySupadm.vue` | 590 |
| `components/Form/mixins/modal_setting.js` | 68, 111 |

---

### 2차 인증 정책 상세 조회

```
GET /v1/operation/cert/n2nd/info/{cert_plcy_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| cert_plcy_id | string | Y | 인증 정책 ID |

**응답**

목록 응답 필드와 동일한 구조. 추가 필드:

| 필드 | 타입 | 설명 |
|------|------|------|
| exc_nw_n2nd_cert_mtd_cd_nm | string | 예외 네트워크 2차 인증 방식 코드명 (목록에서는 null 가능, 상세에서는 값 존재) |
| reg_conn_id | string\|null | 등록자 접속 ID (마스킹) |
| mod_conn_id | string\|null | 수정자 접속 ID (마스킹) |

**mock 상세 분기 기준**

| cert_plcy_id | fixture |
|---|---|
| `312352b0-...` (SMS 2차인증) | `cert-n2nd-admin-detail.json` |
| `9ce54bed-...` (이메일 2차인증) | `cert-n2nd-admin-detail.json` |
| `29e84e6b-...` (TEST_TENANT 관리자 기본) | `cert-n2nd-admin-detail.json` |
| `50714850-...` (인증정책05) | `cert-n2nd-admin-detail.json` |
| 그 외 | `cert-n2nd-user-detail.json` |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/AdminAuthPolicyAuth.vue` | 490 |
| `views/policy/UserAuthPolicyAuth.vue` | 630 |
| `views/policy/AdminAuthPolicySupadm.vue` | 459 |
| `views/policy/UserAuthPolicySupadm.vue` | 600 |
| `components/Modals/Policy/CertificationPolicySetting.vue` | 606 |
| `components/Modals/Policy/CertificationPolicySettingFor.vue` | 601 |
| `components/Modals/Policy/ManagerCertificationPolicySetting.vue` | 529 |

---

### 2차 인증 정책 접속 계정 조회

```
GET /v1/operation/cert/n2nd/{cert_plcy_id}/acc
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| cert_plcy_id | string | Y | 인증 정책 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/AdminAuthPolicy.vue` | 345 |

---

### 2차 인증 정책 그룹 목록 조회

```
GET /v1/operation/policys/cert/n2nd
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `utils/policy.js` | 7 |
| `components/Modals/Policy/SecondCertification.vue` | 282, 292 |

---

### 2차 인증 정책 그룹 생성

```
POST /v1/operation/cert/n2nd/grps
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| cert_plcy_nm | string | Y | 인증 정책명 |
| ptal_type_cd | string | Y | 포털 유형 코드 |
| tnt_id | string | Y | 테넌트 ID |
| n2nd_auth_type_cd | string | Y | 2차 인증 유형 코드 |
| exc_nw_grp_id | string | N | 예외 네트워크 그룹 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/AdminAuthPolicyAuth.vue` | 571 |
| `views/policy/UserAuthPolicyAuth.vue` | 702 |
| `views/policy/AdminAuthPolicySupadm.vue` | 536 |
| `views/policy/UserAuthPolicySupadm.vue` | 672 |
| `components/Modals/Policy/CertificationPolicySetting.vue` | 695 |
| `components/Modals/Policy/CertificationPolicySettingFor.vue` | 675 |

---

### 2차 인증 정책 다중 생성

```
POST /v1/operation/policys/cert/n2nd/multi
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `components/Modals/Policy/SecondCertification.vue` | 353 |

---

### 2차 인증 정책 수정

```
PUT /v1/operation/cert/n2nd/info/{cert_plcy_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| cert_plcy_id | string | Y | 인증 정책 ID |

**Request Body** — 생성 바디와 동일

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/AdminAuthPolicyAuth.vue` | 582 |
| `views/policy/UserAuthPolicyAuth.vue` | 713 |
| `views/policy/AdminAuthPolicySupadm.vue` | 547 |
| `views/policy/UserAuthPolicySupadm.vue` | 683 |
| `components/Modals/Policy/CertificationPolicySetting.vue` | 708 |
| `components/Modals/Policy/ManagerCertificationPolicySetting.vue` | 674 |

---

### 2차 인증 정책 삭제

```
DELETE /v1/operation/cert/n2nd/info/{cert_plcy_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| cert_plcy_id | string | Y | 인증 정책 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/AdminAuthPolicyAuth.vue` | 619 |
| `views/policy/UserAuthPolicyAuth.vue` | 750 |
| `views/policy/AdminAuthPolicySupadm.vue` | 584 |
| `views/policy/UserAuthPolicySupadm.vue` | 720 |

---

## 관리자 인증 정책 상세 설정 (A007ADM)

### 관리자 인증 정책 설정 조회

```
GET /v1/operation/policys/cert/A007ADM/{cert_plcy_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| cert_plcy_id | string | Y | 인증 정책 ID |

**응답** — 인증/로그인/세션/비밀번호/잠금 정책 상세 필드 포함

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/admin/AdminAuthPolicyAuth.vue` | 346 |
| `views/policy/admin/AdminAuthPolicyHold.vue` | 87 |
| `views/policy/admin/AdminAuthPolicyLogin.vue` | 118 |
| `views/policy/admin/AdminAuthPolicyPassword.vue` | 82 |
| `views/policy/admin/AdminAuthPolicySession.vue` | 111 |

---

### 관리자 인증 정책 설정 수정

```
PUT /v1/operation/policys/cert/A007ADM/{cert_plcy_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| cert_plcy_id | string | Y | 인증 정책 ID |

**Request Body** — 수정할 정책 필드 포함 (탭별로 상이)

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/admin/AdminAuthPolicyAuth.vue` | 386 |
| `views/policy/admin/AdminAuthPolicyHold.vue` | 104 |
| `views/policy/admin/AdminAuthPolicyLogin.vue` | 136 |
| `views/policy/admin/AdminAuthPolicyPassword.vue` | 99 |
| `views/policy/admin/AdminAuthPolicySession.vue` | 128 |

---

## 사용자 인증 정책 상세 설정 (A007USR)

### 사용자 인증 정책 설정 조회

```
GET /v1/operation/policys/cert/A007USR/{cert_plcy_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| cert_plcy_id | string | Y | 인증 정책 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/user/UserAuthPolicyAuth.vue` | 393 |
| `views/policy/user/UserAuthPolicyHold.vue` | 87 |
| `views/policy/user/UserAuthPolicyLogin.vue` | 118 |
| `views/policy/user/UserAuthPolicyPassword.vue` | 82 |
| `views/policy/user/UserAuthPolicySession.vue` | 111 |

---

### 사용자 인증 정책 설정 수정

```
PUT /v1/operation/policys/cert/A007USR/{cert_plcy_id}
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/user/UserAuthPolicyAuth.vue` | 431 |
| `views/policy/user/UserAuthPolicyHold.vue` | 104 |
| `views/policy/user/UserAuthPolicyLogin.vue` | 136 |
| `views/policy/user/UserAuthPolicyPassword.vue` | 99 |
| `views/policy/user/UserAuthPolicySession.vue` | 128 |

---

## 보안 인증 정책 (secu)

### 보안 인증 정책 그룹 목록 조회

```
GET /v1/operation/cert/secu/grps
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| sg_grp_id | string | N | 보안 그룹 ID |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | 보안 인증 정책 목록 |
| data[].secu_plcy_id | string | 보안 인증 정책 ID |
| data[].secu_plcy_nm | string | 보안 인증 정책명 |
| data[].secu_plcy_tgt_cd | string | 정책 대상 코드 (`U006S` SA 기본 등) |
| data[].secu_plcy_tgt_cd_nm | string | 정책 대상 코드명 |
| data[].group_cnt | number | 적용된 그룹 수 |
| data[].pool_cnt | number | 적용된 풀 수 |
| data[].vm_cnt | number | 적용된 VM 수 |
| data[].reg_ts | string | 등록 일시 |
| data[].mod_ts | string | 수정 일시 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/VirtualPcAuthPolicy.vue` | 364 |
| `views/policy/VirtualPcAuthPolicySupadm.vue` | 1031 |
| `views/policy/VirtualPcNetworkPolicy.vue` | 1046 |
| `components/Modals/Policy/mixins/virtualPcPolicySetting.js` | 29 |
| `components/Form/mixins/modal_setting.js` | 24 |

---

### 보안 인증 정책 상세 조회

```
GET /v1/operation/cert/secu/info/{cert_secu_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| cert_secu_id | string | Y | 보안 인증 정책 ID |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| secu_plcy_id | string | 보안 인증 정책 ID |
| secu_plcy_nm | string | 보안 인증 정책명 |
| secu_plcy_tgt_cd | string | 정책 대상 코드 |
| secu_plcy_tgt_cd_nm | string | 정책 대상 코드명 |
| exc_nw_grp_id | string | 예외 네트워크 그룹 ID |
| viwr_expr_usg_yn | string | 뷰어 만료 사용 여부 (`Y`/`N`) |
| viwr_expr_mi_cnt | string | 뷰어 만료 시간(분) |
| acc_blck_plcy_id | string | 접근 차단 정책 ID |
| url_rdrt_blck_plcy_id | string | URL 리다이렉션 차단 정책 ID |
| url_rdrt_disallow_plcy_id | string | URL 리다이렉션 비허용 정책 ID |
| vm_mdata_id | string | VM 메타데이터 정책 ID |
| vm_mdata_nm | string | VM 메타데이터 정책명 |
| proxy_type_cd | string | 프록시 유형 코드 |
| auto_resol_usg_yn | string | 자동 해상도 사용 여부 (`Y`/`N`) |
| wmk_usg_yn | string | 워터마크 사용 여부 (`Y`/`N`) |
| wmk_plcy | object | 워터마크 정책 상세 (미사용 시 `null`) |
| noauth_proc_blck_plcy_id | string | 미인증 처리 차단 정책 ID |
| noAuthProcBlckPlcyDetailVo | object | 미인증 처리 차단 정책 상세 (미설정 시 `null`) |
| acc_blck | array | 접근 차단 항목 목록 |
| url_blck | object | URL 차단 정보 (미설정 시 `null`) |
| pcly_cert | array | 네트워크 구간별 인증 설정 목록 |
| pcly_cert[].secu_plcy_auth_id | string | 인증 설정 ID |
| pcly_cert[].secu_plcy_id | string | 보안 인증 정책 ID |
| pcly_cert[].conn_net_cd | string | 접속 네트워크 코드 (`U005TOT` 모든 네트워크 / `U005EXC` 예외 네트워크) |
| pcly_cert[].conn_net_cd_nm | string | 접속 네트워크 코드명 |
| pcly_cert[].clb_shar_auth_cd | string | 클립보드 공유 권한 코드 |
| pcly_cert[].clb_shar_auth_cd_nm | string | 클립보드 공유 권한 코드명 |
| pcly_cert[].drag_drop_auth_cd | string | 드래그앤드롭 권한 코드 |
| pcly_cert[].drag_drop_auth_cd_nm | string | 드래그앤드롭 권한 코드명 |
| pcly_cert[].usb_plcy_id | string | USB 정책 ID |
| pcly_cert[].usb_plcy_nm | string | USB 정책명 |
| pcly_cert[].sg_grp_id | string | 보안 그룹 ID |
| pcly_cert[].url_rdrt_auth_cd | string | URL 리다이렉션 권한 코드 |
| pcly_cert[].url_rdrt_auth_cd_nm | string | URL 리다이렉션 권한 코드명 |
| pcly_cert[].prt_conn_auth_cd | string | 프린터 연결 권한 코드 |
| pcly_cert[].prt_conn_auth_cd_nm | string | 프린터 연결 권한 코드명 |
| pcly_cert[].mult_mtor_auth_cd | string | 멀티모니터 권한 코드 |
| pcly_cert[].mult_mtor_auth_cd_nm | string | 멀티모니터 권한 코드명 |
| pcly_cert[].scr_capture_yn | string | 화면 캡처 허용 여부 (`Y`/`N`) |
| pcly_cert[].reg_id | string | 등록자 ID |
| pcly_cert[].reg_ts | string | 등록 일시 |
| pcly_cert[].mod_id | string | 수정자 ID |
| pcly_cert[].mod_ts | string | 수정 일시 |
| reg_id | string | 등록자 ID |
| reg_ts | string | 등록 일시 |
| mod_id | string | 수정자 ID |
| mod_ts | string | 수정 일시 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/VirtualPcAuthPolicySupadm.vue` | 719 |
| `views/policy/VirtualPcNetworkPolicy.vue` | 744 |
| `components/Modals/Policy/VirtualPcPolicySetting.vue` | 673 |
| `components/Modals/Policy/VirtualPcPolicySettingFor.vue` | 695 |

---

### 보안 인증 정책 미인증 목록 조회

```
GET /v1/operation/cert/secu/noauth
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/VirtualPcAuthPolicySupadm.vue` | 636 |
| `views/policy/VirtualPcNetworkPolicy.vue` | 632 |
| `views/policy/mixins/unlicensed.js` | 62 |
| `components/Modals/Policy/VirtualPcPolicySetting.vue` | 745 |
| `components/Modals/Policy/VirtualPcPolicySettingFor.vue` | 769 |

---

### 보안 인증 정책 미인증 상세 조회

```
GET /v1/operation/cert/secu/noauth/{blck_plcy_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| blck_plcy_id | string | Y | 차단 정책 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/components/UnlicensedManageModal.vue` | 379 |

---

### 보안 인증 정책 미인증 차단 목록 조회

```
GET /v1/operation/cert/secu/noauth/{blck_plcy_id}/blck
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/VirtualPcAuthPolicySupadm.vue` | 644, 656, 769 |
| `views/policy/VirtualPcNetworkPolicy.vue` | 640, 652, 798 |

---

### 보안 인증 정책 중복명 확인

```
GET /v1/operation/cert/secu/noauth/dup-check
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/mixins/unlicensedDetail.js` | 73 |

---

### 보안 인증 정책 그룹 생성

```
POST /v1/operation/cert/secu/grps
POST /v1/operation/cert/secu/grp
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| cert_secu_nm | string | Y | 보안 인증 정책명 |
| tnt_id | string | Y | 테넌트 ID |
| exc_nw_grp_id | string | N | 예외 네트워크 그룹 ID |
| blck_plcy_id | string | N | 차단 정책 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/VirtualPcNetworkPolicy.vue` | 1232 |
| `views/policy/VirtualPcAuthPolicySupadm.vue` | 1159 |
| `components/Modals/Policy/VirtualPcPolicySetting.vue` | 1124 |
| `components/Modals/Policy/VirtualPcPolicySettingFor.vue` | 1254 |
| `views/tenant/IndexDetail.vue` | 1826 |

---

### 보안 인증 정책 미인증 등록/수정/삭제

```
POST   /v1/operation/cert/secu/noauth
PUT    /v1/operation/cert/secu/noauth
DELETE /v1/operation/cert/secu/noauth
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/mixins/unlicensedDetail.js` | 71–75 |

---

### 보안 인증 정책 수정

```
PUT /v1/operation/cert/secu/info/{cert_secu_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| cert_secu_id | string | Y | 보안 인증 정책 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/VirtualPcAuthPolicySupadm.vue` | 1185 |
| `views/policy/VirtualPcNetworkPolicy.vue` | 1260 |
| `components/Modals/Policy/VirtualPcPolicySetting.vue` | 1164 |

---

### 보안 인증 정책 삭제

```
DELETE /v1/operation/cert/secu/info/{cert_secu_id}
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/VirtualPcAuthPolicySupadm.vue` | 885 |
| `views/policy/VirtualPcNetworkPolicy.vue` | 890 |

---

## VPC 보안 인증 정책

### VPC 인증 정책 목록 조회

```
GET /v1/operation/policys/cert/vpc
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `utils/policy.js` | 36 |
| `components/Modals/Policy/CertificationPolicy.vue` | 66 |
| `components/Modals/Policy/NetworkSecurityPolicy.vue` | 68 |
| `components/Modals/Policy/VirtualPcNetworkSecurityPolicy.vue` | 69 |
| `views/policy/mixin/PolicyHandler.js` | 10 |

---

### VPC 인증 정책 상세 조회

```
GET /v1/operation/policys/{policy_id}/cert/vpc/
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| policy_id | string | Y | 정책 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/components/TenantSecurityPolicy.vue` | 198 |
| `views/policy/components/InputSecurityPolicy.vue` | 397 |
| `views/policy/VirtualSecurityPolicy.vue` | 203 |
| `views/policy/ViewerAuthPolicyDetail.vue` | 129 |

---

### VPC 인증 정책 생성

```
POST /v1/operation/policys/cert/vpc
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | Y | 테넌트 ID |
| cert_plcy_nm | string | Y | 인증 정책명 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `components/Modals/Policy/CertificationPolicy.vue` | 143 |
| `components/Modals/Policy/NetworkSecurityPolicy.vue` | 145 |
| `views/policy/mixin/PolicyHandler.js` | 101 |

---

### VPC 인증 정책 수정

```
PUT /v1/operation/policys/{policy_id}/cert/vpc/
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/components/TenantSecurityPolicy.vue` | 291 |
| `views/policy/components/InputSecurityPolicy.vue` | 490 |
| `views/policy/VirtualSecurityPolicy.vue` | 296 |
| `views/policy/ViewerAuthPolicyDetail.vue` | 153 |

---

## SA/TA 차이

### AdminAuthPolicy.vue — 관리자 인증 정책 목록

| 구분 | 파라미터 | 비고 |
|------|---------|------|
| SA | `cert_plcy_tgt_cd=U003S` | |
| TA | `cert_plcy_tgt_cd=U003B` | |
| 공통 | `GET /v1/operation/cert/n2nd/ptalType/A007ADM` | 파라미터만 다름 |

응답 중 `cert_plcy_tgt_cd === 'U003S'` 항목은 클라이언트에서 필터링 제거.

### AdminAuthPolicySupadm.vue — 관리자 인증 정책 상세 (SA 뷰)

| 구분 | API | 비고 |
|------|-----|------|
| SA | `cert_plcy_tgt_cd=U003S`로 `GET /v1/operation/cert/n2nd/ptalType/A007ADM` 호출 | |
| 공통 | `GET /v1/operation/cert/n2nd/info/{id}` | 상세 조회 |
| SA 제외 | `exc_nw_grp_id`를 저장 파라미터에서 제외 | SA는 예외네트워크 설정 불가 |
| 공통 | `POST /v1/operation/cert/n2nd/grps` / `PUT /v1/operation/cert/n2nd/grps` | 등록/수정 |

### UserAuthPolicy.vue — 사용자 인증 정책 목록

| 구분 | 파라미터 | 비고 |
|------|---------|------|
| SA | `cert_plcy_tgt_cd=U003S` | |
| TA | `cert_plcy_tgt_cd=U003B` | |
| 공통 | `GET /v1/operation/cert/n2nd/ptalType/A007USR` | 파라미터만 다름 |

### UserAuthPolicySupadm.vue — 사용자 인증 정책 상세 (SA 뷰)

| 구분 | API | 비고 |
|------|-----|------|
| SA | `cert_plcy_tgt_cd=U003S`로 `GET /v1/operation/cert/n2nd/ptalType/A007USR` 호출 | |
| 공통 | `GET /v1/operation/cert/n2nd/info/{id}` | 상세 조회 |
| SA 제외 | `exc_nw_grp_id`를 저장 파라미터에서 제외 | |
| 공통 | `POST /v1/operation/cert/n2nd/grps` / `PUT /v1/operation/cert/n2nd/grps` | |
