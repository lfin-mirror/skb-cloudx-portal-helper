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

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | 사용자 그룹 목록 |
| data[].usr_grp_id | string | 사용자 그룹 ID |
| data[].usr_grp_nm | string | 사용자 그룹명 |
| data[].usr_grp_full_nm | string | 사용자 그룹 전체명 (계층 포함) |
| data[].up_usr_grp_id | string\|null | 상위 그룹 ID |
| data[].usr_grp_descp | string | 그룹 설명 |
| data[].acct_cnt | number | 소속 계정 수 |
| data[].tnt_id | string | 테넌트 ID |
| data[].reg_id | string | 등록자 ID |
| data[].reg_ts | string | 등록 일시 |
| data[].mod_id | string | 수정자 ID |
| data[].mod_ts | string | 수정 일시 |
| pageinfo.count | number | 전체 건수 |
| pageinfo.ispaging | boolean | 페이징 여부 |

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
