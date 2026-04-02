# 예외 네트워크 그룹 API

## 사용 화면
- [네트워크 보안 정책](../../화면/정책/04-네트워크%20보안%20정책.md)
- [업무 처리 요청](../../화면/사용자%20지원/02-업무%20처리%20요청.md)

리소스 경로 기준: `/v1/operation/policy/excn`

---

## 예외 네트워크 그룹 목록 조회

```
GET /v1/operation/policy/excn/excngrp
```

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | 예외 네트워크 그룹 목록 |
| data[].exc_nw_grp_id | string | 예외 네트워크 그룹 ID |
| data[].exc_nw_grp_nm | string | 예외 네트워크 그룹명 |
| data[].tnt_id | string | 테넌트 ID |

**에러 코드**

| 코드 | 설명 |
|------|------|
| 403 | 권한 없음 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/ExcerptNetwork.vue` | 123 |
| `components/Modals/Network/ExcerptNetworkSetting.vue` | 125 |

---

## 예외 네트워크 그룹 상세 조회

```
GET /v1/operation/policy/excn/excngrps/{exc_nw_grp_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| exc_nw_grp_id | string | Y | 예외 네트워크 그룹 ID |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| exc_nw_grp_id | string | 예외 네트워크 그룹 ID |
| exc_nw_grp_nm | string | 예외 네트워크 그룹명 |
| tnt_id | string | 테넌트 ID |
| ip_list | array | 예외 IP 목록 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/ExcerptNetworkSetting.vue` | 215 |
| `components/Modals/Network/ExcerptNetworkSetting.vue` | 143 |

---

## 예외 네트워크 그룹 단건 조회 (인증 정책 연결용)

```
GET /v1/operation/policy/excn/excngrp/{exc_nw_grp_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| exc_nw_grp_id | string | Y | 예외 네트워크 그룹 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/AdminAuthPolicyAuth.vue` | 505 |
| `views/policy/UserAuthPolicyAuth.vue` | 645 |
| `views/policy/VirtualPcAuthPolicySupadm.vue` | 779 |
| `views/policy/VirtualPcNetworkPolicy.vue` | 808 |
| `components/Common/CommonSelectList.vue` | 312, 370 |
| `components/Modals/Policy/VirtualPcPolicySetting.vue` | 723 |
| `components/Modals/Policy/VirtualPcPolicySettingFor.vue` | 745 |

---

## 예외 네트워크 그룹 생성

```
POST /v1/operation/policy/excn/excngrps
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| exc_nw_grp_nm | string | Y | 예외 네트워크 그룹명 |
| tnt_id | string | Y | 테넌트 ID |
| ip_list | array | N | 예외 IP 목록 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/ExcerptNetworkSetting.vue` | 257 |

---

## 예외 네트워크 그룹 수정

```
PUT /v1/operation/policy/excn/excngrps/{exc_nw_grp_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| exc_nw_grp_id | string | Y | 예외 네트워크 그룹 ID |

**Request Body** — 생성 바디와 동일

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/ExcerptNetworkSetting.vue` | 269 |

---

## 예외 네트워크 그룹 삭제

```
DELETE /v1/operation/policy/excn/excngrps/{exc_nw_grp_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| exc_nw_grp_id | string | Y | 예외 네트워크 그룹 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/ExcerptNetworkSetting.vue` | 293 |

---

## 예외 네트워크 단건 설정

```
uri: '/v1/operation/policy/excn/excnw/'
```

> `CommonMultiModal` 공통 모달에서 동적으로 사용.

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/ExcerptNetworkSetting.vue` | 177 |
