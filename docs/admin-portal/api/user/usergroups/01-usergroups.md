# 사용자 그룹 API

## 사용 화면
- [사용자 그룹](../../화면/사용자%20정보/01-사용자%20그룹.md)

리소스 경로 기준: `/v1/user/usergroups`

---

## 목록 조회

### 사용자 그룹 목록 조회

```
GET /v1/user/usergroups
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| serv_grp_id | string | N | 서비스 그룹 ID |
| grp_typ_cd | string | N | 그룹 유형 코드 (`U001USR` 등) |
| keyword | string | N | 검색어 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| sort | string | N | 정렬 기준 컬럼 |
| sort_type | string | N | 정렬 방향 (`ASC`/`DESC`) |
| csvYN | string | N | CSV 다운로드 여부 (`Y`) |

**응답**

래퍼: `{ data: { data: [...], pageinfo: {...} } }`

| 필드 | 타입 | 설명 |
|------|------|------|
| data.data[] | array | 사용자 그룹 목록 |
| data.data[].usr_grp_id | string | 사용자 그룹 ID |
| data.data[].usr_grp_nm | string | 사용자 그룹명 |
| data.data[].grp_typ_cd | string | 그룹 유형 코드 (`U001USR` 등) |
| data.data[].grp_typ_cd_nm | string | 그룹 유형 코드명 |
| data.data[].grp_sts_cd | string | 그룹 상태 코드 (`U002NR` 정상 등록 등) |
| data.data[].grp_sts_cd_nm | string | 그룹 상태 코드명 |
| data.data[].tnt_id | string | 테넌트 ID |
| data.data[].usr_cnt | number | 소속 사용자 수 |
| data.data[].vm_as_cnt | number | 할당 VM 수 |
| data.data[].cert_plcy_id | string | 인증 정책 ID |
| data.data[].cert_plcy_nm | string | 인증 정책명 |
| data.data[].cert_plcy_tgt_cd | string | 인증 정책 대상 코드 (`U003B` 등) |
| data.data[].cert_plcy_tgt_nm | string | 인증 정책 대상명 |
| data.data[].shar_str_usg_yn | string | 공유 스토리지 사용 여부 (`Y`/`N`) |
| data.data[].grp_fold_size | string | 그룹 폴더 크기 (MB) |
| data.data[].work_mng_use_yn | string | 근태관리 사용 여부 (`Y`/`N`) |
| data.data[].acct_mod_psb_yn | string | 계정 정보 수정 가능 여부 (`Y`/`N`) |
| data.data[].client_update_yn | string | 클라이언트 업데이트 여부 (`Y`/`N`) |
| data.data[].auto_vm_delete | string | 자동 VM 삭제 여부 (`Y`/`N`) |
| data.data[].expire_auto_delete_yn | string | 만료 자동 삭제 여부 (`Y`/`N`) |
| data.data[].dept_cd | string | 부서 코드 |
| data.data[].start_dt | string | 기간 시작일 |
| data.data[].end_dt | string | 기간 종료일 |
| data.data[].reg_nm | string | 등록자명 (마스킹) |
| data.data[].reg_ts | string | 등록 일시 |
| data.data[].reg_conn_id | string | 등록자 접속 ID (마스킹) |
| data.data[].mod_ts | string | 수정 일시 |
| data.data[].mod_conn_id | string\|null | 수정자 접속 ID (마스킹) |
| data.pageinfo.count | number | 전체 건수 |
| data.pageinfo.ispaging | boolean | 페이징 여부 |
| data.pageinfo.pageCount | number | 페이지당 항목 수 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/userGroup.js` | 23 |
| `views/userInfo/Group.vue` | 389 |
| `components/Modals/User/UserGroup.vue` | 99 |

---

### 사용자 그룹 목록 조회 (트리/확장)

```
GET /v1/user/usergroupstwo
```

**Query Parameters** — 사용자 그룹 목록 조회와 동일

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/userGroup.js` | 45, 63 |
| `views/serviceGroup/serviceGroup/UserGroupSearch.vue` | 268 |
| `views/userInfo/components/personalDiskVolume.vue` | 112 |
| `views/userInfo/components/UpperGroup.vue` | 170 |

---

### 서비스 그룹별 사용자 그룹 목록 조회

```
GET /v1/user/servusergroups
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| serv_grp_id | string | Y | 서비스 그룹 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/serviceGroup/serviceGroup/UserGroupSearch.vue` | 180 |

---

### 그룹별 계정 목록 조회

```
GET /v1/user/groupAccounts/{usr_grp_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usr_grp_id | string | Y | 사용자 그룹 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/userGroup.js` | 73 |

---

## AD 연동 체크

### AD 연동 여부 확인

```
GET /v1/user/usergroups/adchk
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usr_grp_id | string | N | 사용자 그룹 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/Group.vue` | 607 |
| `views/userInfo/GroupDetail.vue` | 498 |
| `views/userInfo/GroupRegister.vue` | 529 |
| `views/userInfo/userManage.vue` | 1297 |

---

## 단건 조회

### 사용자 그룹 상세 조회

```
GET /v1/user/usergroups/{usr_grp_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usr_grp_id | string | Y | 사용자 그룹 ID |

**응답**

래퍼: `{ data: {...} }`

| 필드 | 타입 | 설명 |
|------|------|------|
| data.usr_grp_id | string | 사용자 그룹 ID |
| data.usr_grp_nm | string | 사용자 그룹명 |
| data.id | string | 그룹 ID (usr_grp_id와 동일) |
| data.label | string | 트리 표시용 라벨 (usr_grp_nm과 동일) |
| data.grp_typ_cd | string | 그룹 유형 코드 |
| data.grp_typ_cd_nm | string | 그룹 유형 코드명 |
| data.grp_sts_cd | string | 그룹 상태 코드 |
| data.grp_sts_cd_nm | string | 그룹 상태 코드명 |
| data.tnt_id | string | 테넌트 ID |
| data.cust_id | string | 고객 ID |
| data.descp | string | 그룹 설명 |
| data.up_usr_grp_id | string | 상위 그룹 ID |
| data.up_usr_grp_nm | string | 상위 그룹명 |
| data.up_dept_cd | string | 상위 부서 코드 |
| data.dept_cd | string | 부서 코드 |
| data.usr_cnt | number | 소속 사용자 수 |
| data.total_usr_cnt | number | 전체 사용자 수 (하위 포함) |
| data.sup_usr_cnt | number | 하위 그룹 사용자 수 |
| data.sup_grp_cnt | number | 하위 그룹 수 |
| data.vm_as_cnt | number | 할당 VM 수 |
| data.cert_plcy_id | string | 인증 정책 ID |
| data.cert_plcy_nm | string | 인증 정책명 |
| data.cert_plcy_tgt_cd | string | 인증 정책 대상 코드 (`U020TNT` 등) |
| data.cert_plcy_tgt_nm | string | 인증 정책 대상명 |
| data.shar_str_usg_yn | string | 공유 스토리지 사용 여부 |
| data.shar_str_nm | string | 공유 스토리지명 |
| data.grp_fold_size | string | 그룹 폴더 크기 (MB) |
| data.grp_fold_cre_size | number | 그룹 폴더 생성 크기 |
| data.work_mng_use_yn | string | 근태관리 사용 여부 |
| data.acct_mod_psb_yn | string | 계정 정보 수정 가능 여부 |
| data.client_update_yn | string | 클라이언트 업데이트 여부 |
| data.auto_vm_delete | string | 자동 VM 삭제 여부 |
| data.expire_auto_delete_yn | string | 만료 자동 삭제 여부 |
| data.ad_itlk_usg_yn | string | AD 연동 사용 여부 |
| data.info_reg_allow_yn | string | 정보 등록 허용 여부 |
| data.viwr_con_plcy_yn | string | 뷰어 접속 정책 여부 |
| data.tnt_viwr_con_plcy_yn | string | 테넌트 뷰어 접속 정책 여부 |
| data.tnt_un_set_yn | string | 테넌트 미설정 여부 |
| data.tot_nw_n2nd_cert_yn | string | 전체 네트워크 2차 인증 여부 |
| data.last_yn | string | 최하위 그룹 여부 |
| data.chkflag | string | 체크 플래그 (`U` 수정 등) |
| data.acct_id | string | 계정 ID |
| data.acct_sts_cd | string | 계정 상태 코드 |
| data.conn_email_info | string | 접속 이메일 정보 |
| data.grpUsers | array | 그룹 소속 사용자 목록 |
| data.usrIdslist | array | 사용자 ID 목록 |
| data.grpIdslist | array | 그룹 ID 목록 |
| data.children | array | 하위 그룹 트리 |
| data.rangeStart | string | 범위 시작 |
| data.rangeEnd | string | 범위 끝 |
| data.reg_id | string | 등록자 ID |
| data.reg_nm | string | 등록자명 (마스킹) |
| data.reg_ts | string | 등록 일시 |
| data.reg_conn_id | string | 등록자 접속 ID (마스킹) |
| data.mod_id | string | 수정자 ID |
| data.mod_ts | string | 수정 일시 |
| data.mod_conn_id | string | 수정자 접속 ID (마스킹) |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/GroupDetail.vue` | 331 (const 정의 후 사용) |

---

## 생성

### 사용자 그룹 생성

```
POST /v1/user/usergroups
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usr_grp_nm | string | Y | 사용자 그룹명 |
| tnt_id | string | Y | 테넌트 ID |
| serv_grp_id | string | Y | 서비스 그룹 ID |
| grp_typ_cd | string | N | 그룹 유형 코드 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/GroupRegister.vue` | 447 |

---

### CSV 일괄 업로드

```
POST /v1/user/usergroups/csv
```

**Request Body** (`multipart/form-data`)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| file | file | Y | CSV 파일 |
| tnt_id | string | Y | 테넌트 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/GroupUpload.vue` | 385 |

---

## 수정

### 사용자 그룹 수정

```
PUT /v1/user/usergroups/{usr_grp_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usr_grp_id | string | Y | 사용자 그룹 ID |

**Request Body** — 생성 바디와 동일 (변경할 필드만 포함)

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/GroupRegister.vue` | 471 |
| `views/userInfo/userManageDetail.vue` | 856 |

---

## 삭제

### 사용자 그룹 삭제

```
DELETE /v1/user/usergroups/{usr_grp_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usr_grp_id | string | Y | 사용자 그룹 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/Group.vue` | 462 |
