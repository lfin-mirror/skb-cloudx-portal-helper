# 전원 관리 정책 API

## 사용 화면
- (화면 문서 미작성)

리소스 경로 기준: `/v1/operation/policys/powermgt`, `/v1/operation/policys/rset`

---

## 전원 관리 정책

### 전원 관리 정책 상세 조회

```
GET /v1/operation/policys/powermgt/{policy_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| policy_id | string | Y | 전원 관리 정책 ID |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| power_mng_plcy_id | string | 전원 관리 정책 ID |
| plcy_stt_dt | string | 정책 시작일 |
| plcy_end_dt | string | 정책 종료일 |
| power_stt_time | string | 전원 시작 시각 |
| power_end_time | string | 전원 종료 시각 |
| sche_type | string | 스케줄 유형 |
| week_sche | string | 주간 스케줄 |
| mons_sche | string | 월간 스케줄 |
| reg_id | string | 등록자 ID |
| reg_ts | string | 등록 일시 |
| mod_id | string | 수정자 ID |
| mod_ts | string | 수정 일시 |

**에러 코드**

| 코드 | 설명 |
|------|------|
| 404 | 정책 없음 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/virtualPc.js` | 359 |

---

### 전원 관리 정책 생성

```
POST /v1/operation/policys/powermgt
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| powermgt_plcy_nm | string | Y | 전원 관리 정책명 |
| tnt_id | string | Y | 테넌트 ID |
| auto_off_yn | string | N | 자동 종료 여부 (`Y`/`N`) |
| auto_off_time | string | N | 자동 종료 시각 |
| idle_off_min | number | N | 유휴 종료 대기 시간 (분) |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/virtualPc.js` | 304 |

---

### 전원 관리 정책 수정

```
PUT /v1/operation/policys/powermgt/{policy_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| policy_id | string | Y | 전원 관리 정책 ID |

**Request Body** — 생성 바디와 동일

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/virtualPc.js` | 369 |

---

## 재설정 정책 (rset)

### 재설정 정책 상세 조회

```
GET /v1/operation/policys/rset/{policy_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| policy_id | string | Y | 재설정 정책 ID |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| rset_plcy_id | string | 재설정 정책 ID |
| rset_plcy_cd | string | 재설정 정책 코드 |
| rset_end_time | string | 재설정 종료 시각 |
| reg_id | string | 등록자 ID |
| reg_ts | string | 등록 일시 |
| mod_id | string | 수정자 ID |
| mod_ts | string | 수정 일시 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/virtualPc.js` | 376 |

---

### 재설정 정책 생성

```
POST /v1/operation/policys/rset
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| rset_plcy_nm | string | Y | 재설정 정책명 |
| tnt_id | string | Y | 테넌트 ID |
| auto_rset_yn | string | N | 자동 재설정 여부 (`Y`/`N`) |
| rset_cycle_cd | string | N | 재설정 주기 코드 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/virtualPc.js` | 310 |

---

### 재설정 정책 수정

```
PUT /v1/operation/policys/rset/{policy_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| policy_id | string | Y | 재설정 정책 ID |

**Request Body** — 생성 바디와 동일

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `store/modules/virtualPc.js` | 385 |
