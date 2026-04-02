# 접근 통제 정책 API

## 사용 화면
- [네트워크 보안 정책](../../화면/정책/04-네트워크%20보안%20정책.md)
- [가상 PC 정책](../../화면/정책/02-가상%20PC%20정책.md)

리소스 경로 기준: `/v1/operation/policys/acclbck`

---

## 접근 차단 정책 목록 조회

```
GET /v1/operation/policys/acclbck/plcys/
```

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | 접근 차단 정책 목록 |
| data[].acc_blck_plcy_id | string | 접근 차단 정책 ID |
| data[].acc_blck_plcy_nm | string | 접근 차단 정책명 |
| data[].tnt_id | string | 테넌트 ID |
| data[].reg_ts | string | 등록 일시 |
| data[].mod_ts | string | 수정 일시 |

**에러 코드**

| 코드 | 설명 |
|------|------|
| 400 | 잘못된 요청 파라미터 |
| 403 | 권한 없음 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/AccessBlock.vue` | 130 |
| `views/policy/VirtualPcAuthPolicySupadm.vue` | 801 |
| `views/policy/VirtualPcNetworkPolicy.vue` | 830 |
| `components/Modals/Policy/VirtualPcPolicySetting.vue` | 1106 |
| `components/Modals/Policy/VirtualPcPolicySettingFor.vue` | 1106 |
| `components/Modals/Policy/mixins/virtualPcPolicySetting.js` | 116 |

---

## 접근 차단 정책 상세 조회

```
GET /v1/operation/policys/acclbck/plcys/{acc_blck_plcy_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acc_blck_plcy_id | string | Y | 접근 차단 정책 ID |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| acc_blck_plcy_id | string | 접근 차단 정책 ID |
| acc_blck_plcy_nm | string | 접근 차단 정책명 |
| tnt_id | string | 테넌트 ID |
| blck_type_cd | string | 차단 유형 코드 |
| blck_ip_list | array | 차단 IP 목록 |
| blck_time_stt | string | 차단 시작 시각 |
| blck_time_end | string | 차단 종료 시각 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/AccessBlockSetting.vue` | 220 |
| `views/policy/VirtualPcAuthPolicySupadm.vue` | 979 |
| `views/policy/VirtualPcNetworkPolicy.vue` | 993 |
| `components/Modals/Policy/VirtualPcPolicySetting.vue` | 878 |
| `components/Modals/Policy/VirtualPcPolicySettingFor.vue` | 962 |

---

## 접근 차단 정책 생성

```
POST /v1/operation/policys/acclbck/plcys
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acc_blck_plcy_nm | string | Y | 접근 차단 정책명 |
| tnt_id | string | Y | 테넌트 ID |
| blck_type_cd | string | Y | 차단 유형 코드 |
| blck_ip_list | array | N | 차단 IP 목록 |
| blck_time_stt | string | N | 차단 시작 시각 |
| blck_time_end | string | N | 차단 종료 시각 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/AccessBlockSetting.vue` | 258 |

---

## 접근 차단 정책 수정

```
PUT /v1/operation/policys/acclbck/plcys/{acc_blck_plcy_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acc_blck_plcy_id | string | Y | 접근 차단 정책 ID |

**Request Body** — 생성 바디와 동일

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/AccessBlockSetting.vue` | 270 |

---

## 접근 차단 정책 삭제

```
DELETE /v1/operation/policys/acclbck/plcys/{acc_blck_plcy_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acc_blck_plcy_id | string | Y | 접근 차단 정책 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/AccessBlockSetting.vue` | 294 |

---

## 정책 설정 (개별 정책 뷰)

```
uri: '/v1/operation/policys/acclbck/plcy/'
```

> `CommonMultiModal` 공통 모달에서 동적으로 사용하는 URI.

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/AccessBlockSetting.vue` | 182 |
