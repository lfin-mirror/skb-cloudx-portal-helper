# 서비스 그룹 API

리소스 경로 기준: `/v1/user/servGroup`, `/v1/user/sgList`

---

## 서비스 그룹 목록 조회

```
GET /v1/user/servGroup
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
| data | array | 서비스 그룹 목록 |
| data[].serv_grp_id | string | 서비스 그룹 ID |
| data[].serv_grp_nm | string | 서비스 그룹명 |
| data[].tnt_id | string | 테넌트 ID |
| data[].reg_ts | string | 등록 일시 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/serviceGroup.js` | 80 |
| `views/systemResource/AdScriptManage.vue` | 115 |

---

## 서비스 그룹 상세 조회

```
GET /v1/user/servGroup/{serv_grp_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| serv_grp_id | string | Y | 서비스 그룹 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/serviceGroup.js` | 89 |

---

## 서비스 그룹 간단 목록 조회 (sgList)

```
GET /v1/user/sgList
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | 서비스 그룹 목록 (경량) |
| data[].serv_grp_id | string | 서비스 그룹 ID |
| data[].serv_grp_nm | string | 서비스 그룹명 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/user.js` | 172 |
| `views/userInfo/GroupRegister.vue` | 517 |
| `components/monitoring/TenantSearchTenantAndServGroupAndUsrGroup.vue` | 136 |
| `components/monitoring/TenantSearchTenantAndServGroupAndUsrGroupSearch.vue` | 178 |
| `components/monitoring/TenantSearchTenantAndServGroupAndUsrGroupVpc.vue` | 138 |

---

## 서비스 그룹별 사용자 그룹 목록 조회

```
GET /v1/user/servGroup/usergroups
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| serv_grp_id | string | N | 서비스 그룹 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `components/monitoring/TenantSearchTenantAndServGroupAndUsrGroup.vue` | 184 |
| `components/monitoring/TenantSearchTenantAndServGroupAndUsrGroupSearch.vue` | 228 |
| `components/monitoring/TenantSearchTenantAndServGroupAndUsrGroupVpc.vue` | 189 |
| `components/monitoring/UserGroupSearch.vue` | 459 |

---

## 서비스 그룹별 사용자 목록 조회

```
GET /v1/user/servGrpUserlist
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| serv_grp_id | string | Y | 서비스 그룹 ID |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/push.js` | 255 |

---

## VM 라이선스 조회

```
GET /v1/user/servGroup/vmLicense/{vm_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| vm_id | string | Y | VM ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `components/Modals/VirtualPc/VirtualPcLicense.vue` | 191 |

---

## 메인 서비스 그룹 중복 확인

```
GET /v1/user/sgMainChk
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | Y | 테넌트 ID |
| serv_grp_id | string | N | 서비스 그룹 ID (수정 시) |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/serviceGroup/ServiceGroupCreate.vue` | 1456, 1524 |
| `views/serviceGroup/ServiceGroupDetail.vue` | 1572, 1658 |

---

## AD 연동 체크

```
GET /v1/user/adchk
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| serv_grp_id | string | Y | 서비스 그룹 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/serviceGroup/ServiceGroupDetail.vue` | 1530 |

---

## 서비스 그룹 생성

```
POST /v1/user/servGroup
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| serv_grp_nm | string | Y | 서비스 그룹명 |
| tnt_id | string | Y | 테넌트 ID |
| serv_work_mng_use_yn | string | N | 근태관리 사용 여부 (`Y`/`N`) |
| ad_itlk_yn | string | N | AD 연동 여부 (`Y`/`N`) |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/serviceGroup/ServiceGroupCreate.vue` | 1356 |

---

## 서비스 그룹 수정

```
PUT /v1/user/servGroup/{serv_grp_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| serv_grp_id | string | Y | 서비스 그룹 ID |

**Request Body** — 생성 바디와 동일

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/serviceGroup/ServiceGroupDetail.vue` | 1443 |

---

## 서비스 그룹 삭제

```
DELETE /v1/user/servGroup/{serv_grp_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| serv_grp_id | string | Y | 서비스 그룹 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/serviceGroup/ServiceGroupDetail.vue` | 1639 |

---

## 자동 초기화 (init)

### 서비스 그룹 자동 초기화 조회

```
GET /v1/user/auto/servGroup/{company_nm}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| company_nm | string | Y | 회사명 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/initialized/components/ServiceGroup/index.vue` | 63 |
| `views/initialized/components/DataSet/index.vue` | 80 |

---

### 사용자 그룹 자동 초기화 조회

```
GET /v1/user/auto/usergroups/{company_nm}
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/initialized/components/UserGroup/index.vue` | 67 |
| `views/initialized/components/DataSet/index.vue` | 83 |

---

### 사용자 매니저 자동 초기화 조회

```
GET /v1/user/auto/usermanager/{user_nm}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| user_nm | string | Y | 사용자명 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/initialized/components/UserSet/index.vue` | 60 |
| `views/initialized/components/DataSet/index.vue` | 86 |
