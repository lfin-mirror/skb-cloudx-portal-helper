# 관리자 그룹 (메뉴/권한) API

## 사용 화면
- [권한 그룹](../../화면/관리자/04-권한%20그룹.md)
- [메뉴-API-기능](../../화면/관리자/03-메뉴-API-기능.md)

리소스 경로 기준: `/v1/user/admin/groups`

---

## 목록 조회

### 관리자 그룹 목록 조회

```
GET /v1/user/admin/groups
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| keyword | string | N | 검색어 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | 관리자 그룹 목록 |
| data[].admin_grp_id | string | 관리자 그룹 ID |
| data[].admin_grp_nm | string | 관리자 그룹명 |
| data[].tnt_id | string | 테넌트 ID |
| data[].reg_ts | string | 등록 일시 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/adminSetting/GroupAdminSetting.vue` | 110 |

---

### 슈퍼관리자 그룹 목록 조회

```
GET /v1/user/admin/sadGroups
```

**응답 필드**

| 필드 | 타입 | 설명 |
|------|------|------|
| data[].adm_grp_id | string | 관리자 그룹 ID |
| data[].adm_grp_nm | string | 관리자 그룹명 |
| data[].tnt_id | string | 테넌트 ID |
| data[].reg_ts | string | 등록 일시 |
| data[].reg_nm | string | 등록자명 (마스킹) |
| data[].reg_conn_id | string | 등록자 로그인 ID (마스킹) |
| data[].mod_ts | string | 수정 일시 |
| data[].mod_nm | string | 수정자명 (마스킹 또는 `-`) |
| data[].mod_conn_id | string | 수정자 로그인 ID (마스킹) |
| data[].lang | string | 언어 코드 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/adminSetting/AdminSettingDetail.vue` | 607 |

---

### 메뉴 목록 조회 (권한 할당용)

```
GET /v1/user/admin/groups/menus
```

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | 메뉴 트리 목록 |
| data[].menu_id | string | 메뉴 ID |
| data[].menu_nm | string | 메뉴명 |
| data[].parent_menu_id | string | 상위 메뉴 ID |
| data[].sort_ord | number | 정렬 순서 |
| data[].use_yn | string | 사용 여부 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/permission.js` | 62, 83 |

---

### 메뉴 기능 목록 조회

```
GET /v1/user/admin/groups/menu_func
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/adminSetting/GroupAdminSettingDetail.vue` | 308 |
| `views/serviceGroup/serviceGroup/UserGroupShareFolderSetting.vue` | 170 |

---

### 메뉴 기능 목록 조회 (타입 필터)

```
GET /v1/user/admin/groups/menu_func2
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| mkind | string | Y | 관리자 종류 (`super` → SA 트리, `tenant` → TA 트리) |

**응답**

배열 형태. 재귀 트리 구조.

| 필드 | 타입 | 설명 |
|------|------|------|
| menu_id | string | 메뉴 ID |
| menu_nm | string | 메뉴명 |
| menuList | array | 하위 메뉴 목록 (동일 구조 재귀) |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/menuManage.js` | 449 |
| `components/Modals/Admin/MenuSelectList.vue` | 118 |

---

### 역할 초기화 전체 조회

```
GET /v1/user/admin/groups/role/initall
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/adminSetting/GroupAdminSetting.vue` | 140 |

---

## 단건 조회

### 관리자 그룹 상세 조회

```
GET /v1/user/admin/groups/{admin_grp_id}
```

TA 전용. SA는 해당 없음. mock에서 `grpId`별 fixture 분기.

| grpId | 그룹명 | fixture |
|-------|--------|---------|
| `a67c2a1c-...` | 전체 권한 | `admin-group-detail-ta.json` |
| `b31107bb-...` | 기본권한그룹 | `admin-group-detail-ta-default.json` |

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| admin_grp_id | string | Y | 관리자 그룹 ID |

**응답 필드**

| 필드 | 타입 | 설명 |
|------|------|------|
| data.adm_grp_id | string | 관리자 그룹 ID |
| data.adm_grp_nm | string | 관리자 그룹명 |
| data.tnt_id | string | 테넌트 ID |
| data.reg_id | string | 등록자 ID |
| data.reg_ts | string | 등록 일시 |
| data.mod_id | string | 수정자 ID |
| data.mod_ts | string | 수정 일시 |
| data.lang | string | 언어 코드 |
| data.grp_menu_m | array | 그룹에 할당된 메뉴 권한 트리 (120개 메뉴) |
| data.grp_menu_m[].menu_id | string | 메뉴 ID |
| data.grp_menu_m[].menu_nm | string | 메뉴명 |
| data.grp_menu_m[].menu_mng_nm | string | 메뉴 관리명 (영문) |
| data.grp_menu_m[].menu_level | string | 메뉴 깊이 (0=루트, 1=대메뉴, 2=중메뉴, 3=소메뉴, 4=하위) |
| data.grp_menu_m[].up_menu_id | string | 상위 메뉴 ID (루트는 null) |
| data.grp_menu_m[].usg_yn | string | 사용 여부 |
| data.grp_menu_m[].viwr_con_plcy_yn | string | 뷰어 접속 정책 여부 |
| data.grp_menu_m[].usr_grp_id | string | 권한 그룹 ID |
| data.grp_menu_m[].menu_func_l | array | 메뉴별 기능 권한 목록 |
| data.grp_menu_m[].menu_func_l[].func_auth_id | string | 기능 권한 ID |
| data.grp_menu_m[].menu_func_l[].menu_id | string | 소속 메뉴 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/adminSetting/GroupAdminSettingDetail.vue` | 164 |

---

## 생성

### 관리자 그룹 생성

```
POST /v1/user/admin/groups
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| admin_grp_nm | string | Y | 관리자 그룹명 |
| tnt_id | string | Y | 테넌트 ID |
| menu_ids | array | N | 할당할 메뉴 ID 목록 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/adminSetting/GroupAdminSettingDetail.vue` | 218 |

---

## 수정

### 관리자 그룹 수정

```
PUT /v1/user/admin/groups/{admin_grp_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| admin_grp_id | string | Y | 관리자 그룹 ID |

**Request Body** — 생성 바디와 동일

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/adminSetting/GroupAdminSettingDetail.vue` | 218 |

---

## 삭제

### 관리자 그룹 삭제

```
DELETE /v1/user/admin/groups/{admin_grp_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| admin_grp_id | string | Y | 관리자 그룹 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/adminSetting/GroupAdminSettingDetail.vue` | 257 |
