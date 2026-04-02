# 단말 접속 API

## 사용 화면
- [업무요청/단말접속/사용자모니터링](../../화면/사용자%20정보/03-업무요청-단말접속-사용자모니터링.md)

리소스 경로 기준: `/v1/user/clientmac`, `/v1/user/device-identifier`

---

## MAC 주소 관리

### MAC 주소 목록 조회

```
GET /v1/user/clientmac
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| acct_id | string | N | 계정 ID |
| keyword | string | N | 검색어 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | MAC 주소 목록 |
| data[].cert_viwr_id | string | MAC 주소 레코드 ID |
| data[].acct_id | string | 계정 ID |
| data[].acct_nm | string | 사용자명 |
| data[].mac_addr | string | MAC 주소 |
| data[].viwr_con_yn | string | 뷰어 접속 허용 여부 |
| data[].usr_grp_nm | string | 사용자 그룹명 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/terminalAccess.js` | 69 |

---

### MAC 주소 상세 조회

```
GET /v1/user/clientmac/{cert_viwr_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| cert_viwr_id | string | Y | MAC 주소 레코드 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/terminalAccess.js` | 76 |

---

### MAC 주소 등록

```
POST /v1/user/clientmac
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_id | string | Y | 계정 ID |
| mac_addr | string | Y | MAC 주소 |
| viwr_con_yn | string | N | 뷰어 접속 허용 여부 (`Y`/`N`) |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/terminalAccess.js` | 82 |

---

### CSV 일괄 업로드

```
POST /v1/user/clientmac/csv
```

**Request Body** (`multipart/form-data`)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| file | file | Y | CSV 파일 |
| tnt_id | string | Y | 테넌트 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/TerminalAccessFile.vue` | 209 |

---

### MAC 주소 수정

```
PUT /v1/user/clientmac/{cert_viwr_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| cert_viwr_id | string | Y | MAC 주소 레코드 ID |

**Request Body** — 등록 바디와 동일

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/terminalAccess.js` | 88 |

---

### MAC 주소 삭제

```
DELETE /v1/user/clientmac/{cert_viwr_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| cert_viwr_id | string | Y | MAC 주소 레코드 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/terminalAccess.js` | 95 |

---

## 단말 식별자 관리

### 전체 단말 접속 목록 조회

```
GET /v1/user/device-identifier/users
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
| data | array | 단말 접속 목록 |
| data[].acct_dvc_ident_id | string | 단말 식별자 ID |
| data[].acct_id | string | 계정 ID |
| data[].acct_conn_id | string | 계정 로그인 ID (마스킹) |
| data[].acct_nm | string | 사용자명 (마스킹) |
| data[].dvc_ident_val | string | 단말 식별값 (MAC 주소 등) |
| data[].dvc_nm | string | 단말명 |
| data[].use_yn | string | 사용 여부 (`Y`/`N`) |
| data[].reg_ts | string | 등록 일시 |
| data[].mod_ts | string | 수정 일시 |
| pageinfo.count | number | 전체 건수 |
| pageinfo.ispaging | boolean | 페이징 여부 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/terminalAccess.js` | 104 |

---

### 사용자별 단말 목록 조회

```
GET /v1/user/device-identifier/{acct_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_id | string | Y | 계정 ID |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | object | 단말 식별자 상세 |
| data.acct_dvc_ident_id | string | 단말 식별자 ID |
| data.acct_id | string | 계정 ID |
| data.acct_conn_id | string | 계정 로그인 ID (마스킹) |
| data.acct_nm | string | 사용자명 (마스킹) |
| data.dvc_ident_val | string | 단말 식별값 (MAC 주소 등) |
| data.dvc_nm | string | 단말명 |
| data.use_yn | string | 사용 여부 (`Y`/`N`) |
| data.reg_ts | string | 등록 일시 |
| data.mod_ts | string | 수정 일시 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/terminalAccess.js` | 138 |

---

### 사용자별 단말 이력 조회

```
GET /v1/user/device-identifier/{acct_id}/hist
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_id | string | Y | 계정 ID |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | 단말 식별자 이력 목록 |
| data[].acct_dvc_ident_hist_id | string | 이력 ID |
| data[].acct_dvc_ident_id | string | 단말 식별자 ID |
| data[].dvc_ident_val | string | 단말 식별값 |
| data[].dvc_nm | string | 단말명 |
| data[].chg_rsn | string | 변경 사유 |
| data[].reg_ts | string | 등록 일시 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/terminalAccess.js` | 147 |

---

### 단말 식별자 등록

```
POST /v1/user/device-identifier
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_id | string | Y | 계정 ID |
| dvc_ident_val | string | Y | 단말 식별값 |
| dvc_ident_typ_cd | string | Y | 단말 식별 유형 코드 |
| use_yn | string | N | 사용 여부 (`Y`/`N`) |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/terminalAccess.js` | 169 |

---

### 단말 식별자 수정

```
PUT /v1/user/device-identifier/{acct_dvc_ident_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_dvc_ident_id | string | Y | 단말 식별자 ID |

**Request Body** — 등록 바디와 동일

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/terminalAccess.js` | 179 |

---

### 단말 이력 수정 (허용/차단)

```
PUT /v1/user/device-identifier/{acct_dvc_ident_id}/hist
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_dvc_ident_id | string | Y | 단말 식별자 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| use_yn | string | Y | 사용 여부 (`Y`/`N`) |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| acct_id | string | 처리된 계정 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/terminalAccess.js` | 158 |

---

### 단말 식별자 삭제

```
DELETE /v1/user/device-identifier/{acct_dvc_ident_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_dvc_ident_id | string | Y | 단말 식별자 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/terminalAccess.js` | 190 |
