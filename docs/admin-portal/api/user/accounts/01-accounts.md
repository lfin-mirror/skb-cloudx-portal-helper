# 사용자 계정 API

## 사용 화면
- [관리자 계정](../../화면/관리자/01-관리자%20계정.md)
- [사용자](../../화면/사용자%20정보/02-사용자.md)

리소스 경로 기준: `/v1/user/accounts`

---

## 목록 조회

### 사용자 목록 조회

```
GET /v1/user/accounts
```

SA/TA 토큰에 따라 응답 데이터가 다름. SA는 슈퍼관리자 계정 목록(`accounts-sup`), TA는 일반 사용자 계정 목록(`users-list`) 반환.

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| usr_grp_id | string | N | 사용자 그룹 ID |
| acct_sts_cd | string | N | 계정 상태 코드 (`U013NR` 정상 / `U013ED` 만료 등) |
| type | string | N | 검색 유형 |
| keyword | string | N | 검색어 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| sort | string | N | 정렬 기준 컬럼 |
| sort_type | string | N | 정렬 방향 (`ASC` / `DESC`) |
| csvYN | string | N | CSV 다운로드 여부 (`Y`) |

**응답**

래퍼: `{ data: { data: [...], pageinfo: {...} } }`

| 필드 | 타입 | 설명 |
|------|------|------|
| data.data[] | array | 사용자 계정 목록 |
| data.data[].acct_id | string | 계정 ID (PK) |
| data.data[].acct_conn_id | string | 계정 로그인 ID (마스킹) |
| data.data[].acct_nm | string | 사용자명 (마스킹) |
| data.data[].email | string | 이메일 (마스킹) |
| data.data[].mob_no | string | 휴대전화 번호 (마스킹) |
| data.data[].acct_sts_cd | string | 계정 상태 코드 (`U013NR` 정상 / `U013LK` 잠김 / `U013DM` 휴면 등) |
| data.data[].acct_sts_cd_nm | string | 계정 상태명 |
| data.data[].tnt_id | string | 테넌트 ID |
| data.data[].usr_grp_id | string | 사용자 그룹 ID |
| data.data[].usr_grp_nm | string | 사용자 그룹명 |
| data.data[].ognz_nm | string | 조직명 |
| data.data[].blng_dept_nm | string | 소속 부서명 |
| data.data[].dept_cd | string | 부서 코드 |
| data.data[].cert_plcy_id | string | 인증 정책 ID |
| data.data[].cert_plcy_nm | string | 인증 정책명 |
| data.data[].cert_plcy_tgt_cd | string | 인증 정책 대상 코드 (`U020TNT` 테넌트 / `U020GRP` 그룹) |
| data.data[].cert_plcy_tgt_cd_nm | string | 인증 정책 대상 코드명 |
| data.data[].acct_vlid_stt_dt | string | 계정 유효기간 시작일 |
| data.data[].acct_vlid_end_dt | string | 계정 유효기간 종료일 |
| data.data[].ad_itlk_acct_yn | string | AD 연동 계정 여부 (`Y`/`N`) |
| data.data[].acct_conn_sts_cd | string | 접속 상태 코드 (`U014ON` 접속중 / `U014OF` 미접속) |
| data.data[].acct_conn_sts_cd_nm | string | 접속 상태명 |
| data.data[].lst_conn_tm | string | 마지막 접속 일시 |
| data.data[].passwd_err_cnt | number | 비밀번호 오류 횟수 |
| data.data[].acct_descp | string | 계정 설명 |
| data.data[].sms_recv_yn | string | SMS 수신 여부 (`Y`/`N`) |
| data.data[].email_recv_yn | string | 이메일 수신 여부 (`Y`/`N`) |
| data.data[].del_yn | string | 삭제 여부 (`Y`/`N`) |
| data.data[].expire_auto_delete_yn | string | 만료 자동 삭제 여부 (`Y`/`N`) |
| data.data[].work_mng_use_yn | string | 근태관리 사용 여부 (`Y`/`N`) |
| data.data[].client_update_yn | string | 클라이언트 업데이트 여부 (`Y`/`N`) |
| data.data[].search_list_yn | string | 검색 목록 여부 (`Y`/`N`) |
| data.data[].reg_id | string | 등록자 ID |
| data.data[].reg_ts | string | 등록 일시 |
| data.data[].mod_id | string | 수정자 ID |
| data.data[].mod_ts | string | 수정 일시 |
| data.pageinfo.count | number | 전체 건수 |
| data.pageinfo.ispaging | boolean | 페이징 여부 |
| data.pageinfo.pageCount | number | 페이지당 항목 수 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/userManage.vue` | 800 |
| `views/userInfo/TerminalAccessUserModal.vue` | 176 |
| `views/userInfo/TerminalAccessUserModal_multi.vue` | 170 |

---

### 관리자 계정 목록 조회

```
GET /v1/user/accounts/admin
```

SA/TA 토큰에 따라 응답 데이터가 다름. TA는 해당 테넌트 관리자 목록 반환.

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| keyword | string | N | 검색어 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답 필드** (TA 기준)

| 필드 | 타입 | 설명 |
|------|------|------|
| data[].acct_id | string | 계정 ID (UUID) |
| data[].acct_conn_id | string | 로그인 ID (마스킹) |
| data[].acct_nm | string | 사용자명 (마스킹) |
| data[].email | string | 이메일 (마스킹) |
| data[].mob_no | string | 휴대전화 번호 (마스킹) |
| data[].acct_sts_cd | string | 계정 상태 코드 (`U013NR` 정상 / `U013ED` 만료 / `U013SL` 휴면) |
| data[].acct_sts_cd_nm | string | 계정 상태명 |
| data[].tnt_nm | string | 테넌트명 |
| data[].tnt_id | string | 테넌트 ID |
| data[].adm_grp_id | string | 관리자 그룹 ID |
| data[].adm_grp_nm | string | 관리자 그룹명 |
| data[].acct_vlid_stt_dt | string | 유효기간 시작일 |
| data[].acct_vlid_end_dt | string | 유효기간 종료일 |
| data[].permission_yn | string | 권한 제한 여부 (`Y`/`N`) |
| data[].lst_conn_tm | string | 마지막 접속 일시 |
| data[].reg_ts | string | 등록 일시 |
| data[].passwd_err_cnt | number | 비밀번호 오류 횟수 (`-1` = 해당 없음) |
| data[].lang | string | 언어 코드 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/adminSetting/AdminSetting.vue` | 148 |
| `components/Modals/User/AdminSearch.vue` | 193 |
| `components/Modals/User/UserSearch.vue` | 192 |

---

### 슈퍼관리자 계정 목록 조회

```
GET /v1/user/accounts/sup
```

**Query Parameters** — 관리자 계정 목록 조회와 동일

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|------|------|------|
| acct_id | string | 계정 ID (PK) |
| acct_conn_id | string | 계정 로그인 ID |
| acct_nm | string | 사용자명 (마스킹) |
| acct_sts_cd | string | 계정 상태 코드 (`U013NR` 정상 / `U013ED` 만료 / `U013LK` 잠김 / `U013ST` 정지 / `U013SL` 휴면) |
| acct_sts_cd_nm | string | 계정 상태명 |
| mob_no | string | 휴대전화 번호 (마스킹) |
| email | string | 이메일 (마스킹) |
| acct_vlid_stt_dt | string | 계정 유효기간 시작일 |
| acct_vlid_end_dt | string | 계정 유효기간 종료일 |
| lst_conn_tm | string | 마지막 접속 일시 (`-` = 미접속) |
| passwd_err_cnt | number | 비밀번호 오류 횟수 (`-1` = 해당 없음) |
| lang | string | 언어 코드 (`A001KO` 등) |
| reg_ts | string | 등록 일시 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/adminSetting/AdminSetting.vue` | 150 |
| `components/Modals/User/SuperAdminSearch.vue` | 197 |

---

### 테넌트 매니저 계정 목록 조회

```
GET /v1/user/accounts/manager
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| keyword | string | N | 검색어 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/adminSetting/TenantGroupManage.vue` | 162 |
| `components/Modals/Policy/VirtualPcPolicyApplyItem.vue` | 89 |
| `views/serviceGroup/serviceGroup/ServiceGroupManager.vue` | 125 |
| `views/userInfo/components/VirtualPcPoolSelect.vue` | 101 |

---

## 단건 조회

### 사용자 계정 상세 조회

```
GET /v1/user/accounts/{acct_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_id | string | Y | 계정 ID |

**응답**

래퍼: `{ data: {...} }`

| 필드 | 타입 | 설명 |
|------|------|------|
| data.acct_id | string | 계정 ID |
| data.acct_conn_id | string | 로그인 ID (마스킹) |
| data.acct_nm | string | 사용자명 (마스킹) |
| data.acct_passwd | string | 비밀번호 (마스킹) |
| data.email | string | 이메일 (마스킹) |
| data.mob_no | string | 휴대전화 번호 (마스킹) |
| data.acct_sts_cd | string | 계정 상태 코드 |
| data.acct_sts_cd_nm | string | 계정 상태명 |
| data.tnt_id | string | 테넌트 ID |
| data.usr_grp_id | string | 사용자 그룹 ID |
| data.usr_grp_nm | string | 사용자 그룹명 |
| data.usr_grp_full_nm | string | 사용자 그룹 전체명 |
| data.ognz_nm | string | 조직명 |
| data.blng_dept_nm | string | 소속 부서명 |
| data.dept_cd | string | 부서 코드 |
| data.cert_plcy_id | string | 인증 정책 ID |
| data.cert_plcy_nm | string | 인증 정책명 |
| data.cert_plcy_tgt_cd | string | 인증 정책 대상 코드 |
| data.cert_plcy_tgt_cd_nm | string | 인증 정책 대상 코드명 |
| data.acct_vlid_stt_dt | string | 유효기간 시작일 |
| data.acct_vlid_end_dt | string | 유효기간 종료일 |
| data.ad_itlk_acct_yn | string | AD 연동 계정 여부 (`Y`/`N`) |
| data.acct_conn_sts_cd | string | 접속 상태 코드 |
| data.acct_conn_sts_cd_nm | string | 접속 상태명 |
| data.lst_conn_tm | string | 마지막 접속 일시 |
| data.passwd_err_cnt | number | 비밀번호 오류 횟수 |
| data.passwd_mod_dt | string | 비밀번호 변경일 |
| data.acct_descp | string | 계정 설명 |
| data.sms_recv_yn | string | SMS 수신 여부 (`Y`/`N`) |
| data.email_recv_yn | string | 이메일 수신 여부 (`Y`/`N`) |
| data.del_yn | string | 삭제 여부 (`Y`/`N`) |
| data.expire_auto_delete_yn | string | 만료 자동 삭제 여부 (`Y`/`N`) |
| data.work_mng_use_yn | string | 근태관리 사용 여부 (`Y`/`N`) |
| data.client_update_yn | string | 클라이언트 업데이트 여부 (`Y`/`N`) |
| data.search_list_yn | string | 검색 목록 여부 (`Y`/`N`) |
| data.vm_as_cnt | number | 할당 VM 수 |
| data.conn_ip | string | 접속 IP |
| data.shar_str_usg_yn | string | 공유 스토리지 사용 여부 (`Y`/`N`) |
| data.grp_fold_size | number | 그룹 폴더 크기 (MB) |
| data.priv_fold_size | number | 개인 폴더 크기 (MB) |
| data.info_reg_allow_yn | string | 정보 등록 허용 여부 (`Y`/`N`) |
| data.reg_nm | string | 등록자명 (마스킹) |
| data.reg_ts | string | 등록 일시 |
| data.reg_id | string | 등록자 ID |
| data.reg_conn_id | string | 등록자 접속 ID (마스킹) |
| data.mod_nm | string | 수정자명 (마스킹) |
| data.mod_ts | string | 수정 일시 |
| data.mod_id | string | 수정자 ID |
| data.mod_conn_id | string | 수정자 접속 ID (마스킹) |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/userManageDetail.vue` | 706 |
| `views/layout/components/Navbar.vue` | 250 |
| `views/user/subComponent/userEdit.vue` | 186 |

---

### 관리자 계정 상세 조회

```
GET /v1/user/accounts/{acct_id}/admin
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_id | string | Y | 계정 ID |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| acct_id | string | 계정 ID |
| acct_conn_id | string | 로그인 ID |
| acct_nm | string | 사용자명 |
| acct_sts_cd | string | 계정 상태 코드 |
| acct_sts_cd_nm | string | 계정 상태명 |
| email | string | 이메일 |
| mob_no | string | 휴대전화 번호 |
| sms_recv_yn | string | SMS 수신 여부 (`Y`/`N`) |
| email_recv_yn | string | 이메일 수신 여부 (`Y`/`N`) |
| cert_plcy_id | string | 인증 정책 ID |
| cert_plcy_nm | string | 인증 정책명 |
| cert_plcy_tgt_cd | string | 인증 정책 대상 코드 (`U003S` 등) |
| cert_plcy_tgt_cd_nm | string | 인증 정책 대상명 |
| adm_grp_id | string | 관리자 그룹 ID (`supadm` = 슈퍼관리자) |
| adm_grp_nm | string | 관리자 그룹명 |
| acct_vlid_stt_dt | string | 유효기간 시작일 |
| acct_vlid_end_dt | string | 유효기간 종료일 |
| permission_yn | string | 권한 제한 여부 (`Y`/`N`) |
| permission_reason | string | 권한 제한 사유 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/adminSetting/AdminSettingDetail.vue` | 657 |
| `views/user/userInfo.vue` | 237 |

---

### 테넌트 매니저 계정 상세 조회

```
GET /v1/user/accounts/{acct_id}/manager
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_id | string | Y | 계정 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/adminSetting/TenantGroupManageDetail.vue` | 342 |

---

## 중복 검사

### 아이디 중복 검사

```
GET /v1/user/accounts/idcheck
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_conn_id | string | Y | 확인할 로그인 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/adminSetting/AdminSettingDetail.vue` | 981 |

---

## 인코딩 조회

### 이름 인코딩 조회

```
GET /v1/user/accounts/encodename
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/initialized/index.vue` | 1041 |
| `views/user/userInfo.vue` | 207 |

---

### 이메일 인코딩 조회

```
GET /v1/user/accounts/encodemail
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/user/userInfo.vue` | 217 |

---

### 전화번호 인코딩 조회

```
GET /v1/user/accounts/encodetel
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/user/userInfo.vue` | 227 |

---

## 접속 IP

### 접속 허용 IP 목록 조회

```
GET /v1/user/accounts/{acct_id}/conn_ip
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_id | string | Y | 계정 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/login/index.vue` | 936 |
| `views/user/subComponent/ipEdit.vue` | 151 |

---

### 접속 허용 IP 수정

```
PUT /v1/user/accounts/{acct_id}/conn_ip
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_id | string | Y | 계정 ID |

**Request Body** — IP 주소 배열 (`array<string>`)

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/login/index.vue` | 961 |
| `views/user/subComponent/ipEdit.vue` | 191 |

---

## 생성

### 사용자 계정 생성

```
POST /v1/user/accounts
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_conn_id | string | Y | 로그인 ID |
| acct_nm | string | Y | 사용자명 |
| email | string | Y | 이메일 |
| mob_no | string | N | 휴대전화 번호 |
| tnt_id | string | Y | 테넌트 ID |
| usr_grp_id | string | Y | 사용자 그룹 ID |
| cert_plcy_id | string | N | 인증 정책 ID |
| acct_vlid_stt_dt | string | N | 유효기간 시작일 |
| acct_vlid_end_dt | string | N | 유효기간 종료일 |
| pool_id | string | N | 가상PC 풀 ID |
| auto_drive_assign | string | N | 드라이브 자동 할당 여부 (`Y`/`N`) |
| auto_vm_assign | string | N | VM 자동 할당 여부 (`Y`/`N`) |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/userManageDetail.vue` | 784 |

---

### 관리자 계정 생성

```
POST /v1/user/accounts/admin
```

**Request Body** — 사용자 계정 생성과 동일 구조

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/adminSetting/AdminSettingDetail.vue` | 717 |

---

### CSV 일괄 업로드

```
POST /v1/user/accounts/csv
```

**Request Body** (`multipart/form-data`)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| file | file | Y | CSV 파일 |
| tnt_id | string | Y | 테넌트 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/userUpload.vue` | 251 |

---

## 수정

### 사용자 계정 수정

```
PUT /v1/user/accounts/{acct_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_id | string | Y | 계정 ID |

**Request Body** — 생성 바디와 동일 (변경할 필드만 포함)

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/userManageDetail.vue` | 808 |
| `views/user/subComponent/userEdit.vue` | 216 |

---

### 관리자 계정 수정

```
PUT /v1/user/accounts/{acct_id}/admin
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_id | string | Y | 계정 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/adminSetting/AdminSettingDetail.vue` | 1051 |
| `views/initialized/index.vue` | 1285 |

---

### 테넌트 매니저 계정 생성/수정

```
POST /v1/user/accounts/manager
PUT  /v1/user/accounts/{acct_id}/manager
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | Y | 테넌트 ID |
| acct_id | string | Y | 계정 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/adminSetting/TenantGroupManageDetail.vue` | 369, 372 |

---

## 삭제

### 사용자 계정 삭제 (다중)

```
DELETE /v1/user/accounts
```

**Request Body** — 삭제할 계정 배열

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| [].acct_id | string | Y | 계정 ID |
| [].tnt_id | string | Y | 테넌트 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/userManage.vue` | 781 |

---

### 테넌트 매니저 삭제

```
DELETE /v1/user/accounts/{acct_id}/manager
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_id | string | Y | 계정 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/adminSetting/TenantGroupManageDetail.vue` | 404 |

---

## 비밀번호

### 비밀번호 초기화

```
GET /v1/user/accounts/password/init/{acct_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_id | string | Y | 계정 ID |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| success | string | 처리 결과 (`Y`/`N`) |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/userManageDetail.vue` | 677 |

---

## 즐겨찾기

### 즐겨찾기 계정 조회

```
GET /v1/user/accounts/favorite
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/user.js` | 116 |

---

### 즐겨찾기 계정 등록

```
POST /v1/user/accounts/favorite
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_id | string | Y | 즐겨찾기 등록할 계정 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/user.js` | 153 |

---

## 기타

### 계정 상태 일괄 변경

```
POST /v1/user/usersStsCd
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_ids | array | Y | 변경할 계정 ID 목록 |
| acct_sts_cd | string | Y | 변경할 상태 코드 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `components/Modals/Policy/StatusSettingFor.vue` | 126 |

---

### 인증 정책 일괄 변경

```
POST /v1/user/usersUpdatePlcyId
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_ids | array | Y | 변경할 계정 ID 목록 |
| cert_plcy_id | string | Y | 변경할 인증 정책 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `components/Modals/Policy/CertificationPolicySettingFor.vue` | 681, 699 |

---

### 사용자 그룹 멤버 기간 수정

```
PUT /v1/user/userUpdateGroupMembers
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usr_grp_id | string | Y | 사용자 그룹 ID |
| members | array | Y | 멤버 및 기간 목록 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/GroupPeriod.vue` | 198 |
