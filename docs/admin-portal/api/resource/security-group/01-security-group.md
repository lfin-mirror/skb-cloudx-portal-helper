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
