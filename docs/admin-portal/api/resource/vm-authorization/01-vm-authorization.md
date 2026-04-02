# VM 보안 정책 (Security Group) API

## 사용 화면
- (화면 문서 미작성)

## 목차

- [보안 그룹 (Security Group)](#보안-그룹-security-group)
- [보안 그룹 규칙 (Rule)](#보안-그룹-규칙-rule)

---

## 보안 그룹 (Security Group)

### GET /v1/resource/policies/security-group

보안 그룹 목록 조회.

**호출 위치**: `views/policy/SecurityGroup.vue:337`, `components/Modals/Policy/mixins/virtualPcPolicySetting.js:76`, `components/Modals/Policy/VirtualPcPolicySettingFor.vue:1063`, `views/policy/VirtualPcNetworkPolicy.vue:1091`, `views/userSupport/JobWorkRequestDetail.vue:648`, `views/userInfo/JobRequestDetail.vue:554`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| secu_grp_nm | string | N | 보안 그룹명 검색어 |
| sort | string | N | 정렬 기준 필드 |
| sort_type | string | N | ASC / DESC |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| security_group_id | string | 보안 그룹 ID |
| secu_grp_nm | string | 보안 그룹명 |
| secu_grp_descp | string | 보안 그룹 설명 |
| rule_cnt | number | 규칙 수 |
| reg_ts | string | 등록 일시 |

---

### GET /v1/resource/policies/security-group/{securityGroupId}

보안 그룹 상세 조회.

**호출 위치**: `views/policy/SecurityGroupDetail.vue:594`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| securityGroupId | string | Y | 보안 그룹 ID |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| security_group_id | string | 보안 그룹 ID |
| secu_grp_nm | string | 보안 그룹명 |
| secu_grp_descp | string | 보안 그룹 설명 |
| rules | array | 규칙 목록 |
| rules[].id | string | 규칙 ID |
| rules[].direction | string | 방향 (ingress / egress) |
| rules[].protocol | string | 프로토콜 |
| rules[].port_range_min | number | 포트 범위 최소 |
| rules[].port_range_max | number | 포트 범위 최대 |
| rules[].remote_ip_prefix | string | 원격 IP 접두사 |

---

### POST /v1/resource/policies/security-group

보안 그룹 등록.

**호출 위치**: `views/policy/SecurityGroupCreate.vue:104`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| secu_grp_nm | string | Y | 보안 그룹명 |
| secu_grp_descp | string | N | 보안 그룹 설명 |

---

### PUT /v1/resource/policies/security-group/{securityGroupId}

보안 그룹 수정.

**호출 위치**: `views/policy/SecurityGroupDetail.vue:683`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| securityGroupId | string | Y | 보안 그룹 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| secu_grp_nm | string | N | 보안 그룹명 |
| secu_grp_descp | string | N | 보안 그룹 설명 |

---

### DELETE /v1/resource/policies/security-group/{id}

보안 그룹 삭제.

**호출 위치**: `views/policy/SecurityGroup.vue:359`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 보안 그룹 ID |

---

### POST /v1/resource/policies/security-group/sync

보안 그룹 동기화.

**호출 위치**: `views/policy/SecurityGroup.vue:449`

---

### GET /v1/resource/policies/security-group/{securityGroupId}/history

보안 그룹 변경 이력 조회.

**호출 위치**: `views/policy/SecurityGroupDetail.vue:833`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| securityGroupId | string | Y | 보안 그룹 ID |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| chg_ts | string | 변경 일시 |
| chg_typ_cd | string | 변경 유형 코드 |
| chg_usr_id | string | 변경 사용자 ID |
| chg_detail | string | 변경 상세 내용 |

---

## 보안 그룹 규칙 (Rule)

### GET /v1/resource/policies/security-group/{securityGroupId}/rule

보안 그룹 규칙 목록 조회.

**호출 위치**: `views/policy/SecurityGroupDetail.vue:708`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| securityGroupId | string | Y | 보안 그룹 ID |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| id | string | 규칙 ID |
| direction | string | 방향 (ingress / egress) |
| protocol | string | 프로토콜 (tcp / udp / icmp 등) |
| port_range_min | number | 포트 범위 최소 |
| port_range_max | number | 포트 범위 최대 |
| remote_ip_prefix | string | 원격 IP 접두사 (CIDR) |
| ethertype | string | 이더넷 타입 (IPv4 / IPv6) |

---

### POST /v1/resource/policies/security-group/{securityGroupId}/rule

보안 그룹 규칙 추가.

**호출 위치**: `views/policy/SecurityGroupRuleAddModal.vue:609`, `views/policy/SecurityGroupDetail.vue:642`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| securityGroupId | string | Y | 보안 그룹 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| direction | string | Y | 방향 (ingress / egress) |
| protocol | string | N | 프로토콜 (tcp / udp / icmp 등, 없으면 전체) |
| port_range_min | number | N | 포트 범위 최소 |
| port_range_max | number | N | 포트 범위 최대 |
| remote_ip_prefix | string | N | 원격 IP 접두사 (CIDR) |
| ethertype | string | N | 이더넷 타입 (기본: IPv4) |

---

### DELETE /v1/resource/policies/security-group/{securityGroupId}/rule/{ruleId}

보안 그룹 규칙 삭제.

**호출 위치**: `views/policy/SecurityGroupDetail.vue:799`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| securityGroupId | string | Y | 보안 그룹 ID |
| ruleId | string | Y | 규칙 ID |

---

## 에러 코드

| HTTP 상태 | 설명 |
|---|---|
| 200 | 정상 처리 |
| 400 | 잘못된 요청 파라미터 |
| 404 | 보안 그룹 없음 |
| 409 | VM에 적용 중인 보안 그룹 삭제 시도 |
| 500 | 서버 오류 |
