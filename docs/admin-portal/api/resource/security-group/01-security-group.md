# 접근 통제 (Security Group) API

## 사용 화면
- [네트워크 보안 정책](../../화면/정책/04-네트워크%20보안%20정책.md)
- [업무 처리 요청](../../화면/사용자%20지원/02-업무%20처리%20요청.md)

리소스 경로 기준: `/v1/resource/policies/security-group`

---

## 목록 조회

```
GET /v1/resource/policies/security-group
```

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | 접근 통제 그룹 목록 |
| data[].id | string | 접근 통제 그룹 ID (OpenStack security group ID) |
| data[].name | string | 접근 통제 그룹명 |
| data[].description | string | 접근 통제 그룹 설명 |
| data[].reg_conn_id | string | 등록자 ID |
| data[].reg_ts | string | 등록 일시 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/SecurityGroup.vue` | 332 |

---

## 상세 조회

```
GET /v1/resource/policies/security-group/{securityGroupId}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| securityGroupId | string | Y | 접근 통제 그룹 ID |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data.security_group_id | string | 접근 통제 그룹 ID |
| data.secu_grp_nm | string | 접근 통제 그룹명 |
| data.secu_grp_descp | string | 접근 통제 그룹 설명 |
| data.rules | array | 규칙 목록 |
| data.rules[].id | string | 규칙 ID |
| data.rules[].direction | string | 방향 (`ingress` / `egress`) |
| data.rules[].protocol | string\|null | 프로토콜 |
| data.rules[].port_range_min | number | 포트 범위 최소 |
| data.rules[].port_range_max | number | 포트 범위 최대 |
| data.rules[].remote_ip_prefix | string | 원격 IP 접두사 |

> 참고: 목록 응답은 OpenStack 원본 필드명(`id`, `name`, `description`)을 사용하고 상세 응답은 내부 DB 필드명(`security_group_id`, `secu_grp_nm`, `secu_grp_descp`)을 사용. 실서버 확인 후 통일 필요.

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/SecurityGroupDetail.vue` | - |

---

## Rule 목록 조회

```
GET /v1/resource/policies/security-group/{securityGroupId}/rule
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| securityGroupId | string | Y | 접근 통제 그룹 ID |

---

## Rule 생성

```
POST /v1/resource/policies/security-group/{securityGroupId}/rule
```

---

## Rule 삭제

```
DELETE /v1/resource/policies/security-group/{securityGroupId}/rule/{ruleId}
```

---

## 이력 조회

```
GET /v1/resource/policies/security-group/{securityGroupId}/history
```

---

## 생성

```
POST /v1/resource/policies/security-group
```

---

## 수정

```
PUT /v1/resource/policies/security-group/{securityGroupId}
```

---

## 삭제

```
DELETE /v1/resource/policies/security-group/{id}
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/SecurityGroup.vue` | 354 |

---

## 동기화

```
POST /v1/resource/policies/security-group/sync
```

OpenStack과 로컬 DB 간 Security Group/Rule 동기화.

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/SecurityGroup.vue` | 444 |
