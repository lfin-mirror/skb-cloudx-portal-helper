# 근태 관리 API

리소스 경로 기준: `/v1/user/worktime`

---

## 근태 설정 목록 조회

```
GET /v1/user/worktime/cfg
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usr_grp_id | string | N | 사용자 그룹 ID |
| tnt_id | string | N | 테넌트 ID |
| work_typ_cd | string | N | 근태 유형 코드 |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | 근태 설정 목록 |
| data[].work_cfg_id | string | 근태 설정 ID |
| data[].usr_grp_id | string | 사용자 그룹 ID |
| data[].work_typ_cd | string | 근태 유형 코드 |
| data[].work_stt_tm | string | 근무 시작 시간 |
| data[].work_end_tm | string | 근무 종료 시간 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/workManage/mixins/normalWorkSetting.js` | 158 |
| `views/userInfo/workManage/mixins/overWorkSetting.js` | 105 |

---

## 근태 설정 상세 조회

```
GET /v1/user/worktime/cfg/{work_cfg_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| work_cfg_id | string | Y | 근태 설정 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/workManage/components/workManageDetail.vue` | 169 |

---

## 근태 설정 수정

```
PUT /v1/user/worktime/cfg/{work_cfg_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| work_cfg_id | string | Y | 근태 설정 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| work_stt_tm | string | N | 근무 시작 시간 |
| work_end_tm | string | N | 근무 종료 시간 |
| work_typ_cd | string | N | 근태 유형 코드 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/workManage/components/workManageDetail.vue` | 239 |

---

## 긴급 사용 시간 목록 조회

```
GET /v1/user/worktime/er
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usr_grp_id | string | N | 사용자 그룹 ID |
| tnt_id | string | N | 테넌트 ID |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | 긴급 사용 시간 목록 |
| data[].work_er_id | string | 긴급 사용 ID |
| data[].acct_id | string | 계정 ID |
| data[].acct_nm | string | 사용자명 |
| data[].er_stt_ts | string | 긴급 사용 시작 일시 |
| data[].er_end_ts | string | 긴급 사용 종료 일시 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/workManage/mixins/urgentWorkManage.js` | 163 |
| `views/userInfo/components/urgentUseTimeResetModal.vue` | 204 |

---

## 긴급 사용 시간 등록/수정

```
POST /v1/user/worktime/er
PUT  /v1/user/worktime/er/{work_er_id}
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_id | string | Y | 계정 ID |
| er_stt_ts | string | Y | 긴급 사용 시작 일시 |
| er_end_ts | string | Y | 긴급 사용 종료 일시 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/workManage/mixins/urgentWorkManage.js` | 183 |

---

## 긴급 사용 시간 초기화

```
PUT /v1/user/worktime/er/reset
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_id | string | Y | 초기화할 계정 ID |
| usr_grp_id | string | N | 사용자 그룹 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/userInfo/components/urgentUseTimeResetModal.vue` | 240 |
