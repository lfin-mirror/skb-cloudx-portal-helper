# 블랙리스트 / 화이트리스트 (SW 차단 목록) API

## 사용 화면
- [SW 제어 정책](../../화면/정책/05-SW%20제어%20정책.md)

리소스 경로 기준: `/v1/operation/policys/swblst`

---

## SW 차단 목록 조회

```
GET /v1/operation/policys/swblst
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | SW 차단 목록 파일 목록 |
| data[].blst_file_id | string | 차단 목록 파일 ID |
| data[].att_file_nm | string | 첨부 파일명 |
| data[].tnt_id | string | 테넌트 ID |
| data[].wtst_yn | string | 화이트리스트 여부 (`Y`/`N`) |
| data[].reg_conn_id | string | 등록자 계정 |
| data[].reg_id | string | 등록자 ID |
| data[].reg_ts | string | 등록 일시 |
| data[].mod_conn_id | string | 수정자 계정 |
| data[].mod_id | string | 수정자 ID |
| data[].mod_ts | string | 수정 일시 |

**에러 코드**

| 코드 | 설명 |
|------|------|
| 400 | 잘못된 요청 파라미터 |
| 403 | 권한 없음 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/BlacklistUpload.vue` | 170 |
| `views/policy/WhitelistUpload.vue` | 154 |

---

## SW 차단 목록 파일 상세 조회

```
GET /v1/operation/policys/swblst/{blst_file_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| blst_file_id | string | Y | 차단 목록 파일 ID |

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | object | SW 차단 목록 파일 상세 |
| data.blst_file_id | string | 차단 목록 파일 ID |
| data.att_file_nm | string | 첨부 파일명 |
| data.wtst_yn | string | 화이트리스트 여부 (`Y`/`N`) |
| data.tnt_id | string | 테넌트 ID |
| data.json_data | string | 차단 목록 JSON 직렬화 문자열 |
| data.reg_id | string | 등록자 ID |
| data.reg_ts | string | 등록 일시 |
| data.mod_id | string | 수정자 ID |
| data.mod_ts | string | 수정 일시 |
| data.reg_conn_id | string | 등록자 계정 |
| data.mod_conn_id | string\|null | 수정자 계정 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/BlacklistUpload.vue` | 183 |
| `views/policy/WhitelistUpload.vue` | 168 |

---

## SW 차단 목록 다운로드

```
GET /v1/operation/policys/swblst/{blst_file_id}/downLoad
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| blst_file_id | string | Y | 차단 목록 파일 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/BlacklistUpload.vue` | 233 |
| `views/policy/WhitelistUpload.vue` | 212 |

---

## SW 차단 목록 업로드

```
POST /v1/operation/policys/swblst
```

**Request Body** (`multipart/form-data`)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| file | file | Y | CSV/텍스트 파일 |
| tnt_id | string | Y | 테넌트 ID |
| blst_typ_cd | string | Y | 차단 유형 코드 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/BlacklistUploadDetail.vue` | 436 |
| `views/policy/WhitelistUploadDetail.vue` | 377 |
