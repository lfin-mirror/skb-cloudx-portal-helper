# 시스템 메뉴 관리 API

## 사용 화면
- [메뉴-API-기능](../../화면/관리자/03-메뉴-API-기능.md)

## API 목록 조회

```
GET /v1/system/menu/apis
```

**호출 위치**: `store/modules/menuManage.js:96`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| search_word | string | N | 검색어 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

### 응답

배열 형태.

| 필드 | 타입 | 설명 |
|------|------|------|
| gw_uri | string | 게이트웨이 URI 패턴 |
| api_id | string | API ID |
| api_nm | string | API명 |
| ms_div_cd | string | 마이크로서비스 구분 코드 (resource / operation / user / system 등) |
| mtd | string | HTTP 메서드 (GET / POST / PUT / DELETE) |
| reg_ts | string | 등록 일시 |
| mod_ts | string | 수정 일시 |

---

## API 단건 조회

```
GET /v1/system/menu/apis/{apiId}
```

**호출 위치**: `store/modules/menuManage.js:105`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| apiId | number | Y | API ID |

---

## API 등록

```
POST /v1/system/menu/apis
```

**호출 위치**: `store/modules/menuManage.js:114`

### 요청 바디 (JSON)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| api_nm | string | Y | API명 |
| api_url | string | Y | API URL 패턴 |
| http_meth_cd | string | Y | HTTP 메서드 코드 |
| use_yn | string | Y | 사용 여부 (`Y` / `N`) |

---

## API 수정

```
PUT /v1/system/menu/apis/{apiId}
```

**호출 위치**: `store/modules/menuManage.js:131`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| apiId | number | Y | API ID |

### 요청 바디

등록과 동일.

---

## API 삭제

```
DELETE /v1/system/menu/apis/{apiId}
```

**호출 위치**: `store/modules/menuManage.js:154`

---

## 기능권한 목록 조회

```
GET /v1/system/menu/functions
```

**호출 위치**: `store/modules/menuManage.js:177`

### 응답

배열 형태.

| 필드 | 타입 | 설명 |
|------|------|------|
| func_auth_id | string | 기능권한 ID |
| func_auth_nm | string | 기능권한명 |
| menu_id | string | 연결된 메뉴 ID |
| reg_ts | string | 등록 일시 |
| mod_ts | string | 수정 일시 |

---

## 기능권한 단건 조회

```
GET /v1/system/menu/functions/{funcAuthId}
```

**호출 위치**: `store/modules/menuManage.js:188`

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| func_auth_id | string | 기능권한 ID |
| func_auth_nm | string | 기능권한명 |
| menu_id | string | 연결된 메뉴 ID |
| menu_nm | string | 연결된 메뉴명 |
| apilist | array | 매핑된 API 목록 |
| apilist[].gw_uri | string | 게이트웨이 URI 패턴 |
| apilist[].api_id | string | API ID |
| apilist[].api_nm | string | API명 |
| apilist[].ms_div_cd | string | 마이크로서비스 구분 코드 |
| apilist[].mtd | string | HTTP 메서드 |

---

## 기능권한 등록

```
POST /v1/system/menu/functions
```

**호출 위치**: `store/modules/menuManage.js:198`

---

## 기능권한 수정

```
PUT /v1/system/menu/functions/{funcAuthId}
```

**호출 위치**: `store/modules/menuManage.js:215`

---

## 기능권한 삭제

```
DELETE /v1/system/menu/functions/{funcAuthId}
```

**호출 위치**: `store/modules/menuManage.js:292`

---

## 기능권한-API 매핑 조회

```
GET /v1/system/menu/functions/{funcAuthId}/apis
```

**호출 위치**: `store/modules/menuManage.js:243`, `store/modules/menuManage.js:482`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| api_id | number | N | API ID (미매핑 조회 시 사용) |

---

## 기능권한-API 매핑 등록

```
POST /v1/system/menu/functions/{funcAuthId}/apis
```

**호출 위치**: `store/modules/menuManage.js:271`

### 요청 바디 (JSON)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| api_id_list | array | Y | 매핑할 API ID 배열 |

---

## 기능권한-API 매핑 삭제

```
DELETE /v1/system/menu/functions/{funcAuthId}/apis?api_id={apiId}
```

**호출 위치**: `store/modules/menuManage.js:243`

---

## 메뉴 단건 조회

```
GET /v1/system/menu/menus/{menuId}
```

**호출 위치**: `store/modules/menuManage.js:315`

---

## 메뉴 등록

```
POST /v1/system/menu/menus
```

**호출 위치**: `store/modules/menuManage.js:406`

---

## 메뉴 수정

```
PUT /v1/system/menu/menus/{menuId}
```

**호출 위치**: `store/modules/menuManage.js:493`

---

## 메뉴 삭제

```
DELETE /v1/system/menu/menus/{menuId}
```

**호출 위치**: `store/modules/menuManage.js:424`

---

## 메뉴-기능권한 조회 (미매핑)

```
GET /v1/system/menu/menus/{menuId}/functions?type=unmapped
```

**호출 위치**: `store/modules/menuManage.js:336`

---

## 메뉴-기능권한 매핑 등록

```
POST /v1/system/menu/menus/{menuId}/functions
```

**호출 위치**: `store/modules/menuManage.js:350`

### 요청 바디 (JSON)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| func_auth_id_list | array | Y | 매핑할 기능권한 ID 배열 |

---

## 메뉴-기능권한 매핑 삭제

```
DELETE /v1/system/menu/menus/{menuId}/functions{queryString}
```

**호출 위치**: `store/modules/menuManage.js:382`

---

## 공통코드 로그 파라미터 조회

```
GET /v1/system/commons/codes/logs/params
```

**호출 위치**: `views/monitoring/auditLog/components/CommonJsonParser.vue:163`

### 응답

감사로그 파라미터 공통코드 목록.

---

## 에러 코드

공통 에러 코드 참고: `docs/admin-portal/internals/http-interceptor/02-error-codes.md`
