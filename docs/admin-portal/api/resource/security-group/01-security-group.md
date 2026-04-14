# SecurityGroup API

## 사용 화면
- (화면 문서 미작성)

## 목차

- [SecurityGroup CRUD](#securitygroup-crud)
- [Sync](#sync)
- [Rule](#rule)
- [History](#history)
- [VM SecurityGroup](#vm-securitygroup)

---

## SecurityGroup CRUD

### POST /v1/resource/policies/security-group

보안그룹 생성.

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| name | String | Y (max 255) | 보안그룹 이름 |
| description | String | N (max 255) | 보안그룹 설명 |

**응답**

SecurityGroupVo 단건. [SecurityGroupVo 참조](#securitygroupvo).

---

### GET /v1/resource/policies/security-group

보안그룹 목록 조회.

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tenantId | String | N | 테넌트 ID |
| name | String | N | 이름 (Like 검색) |
| desc | String | N | 설명 (Like 검색) |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답**

SecurityGroupVo 배열 (페이징). [SecurityGroupVo 참조](#securitygroupvo).

---

### GET /v1/resource/policies/security-group/{id}

보안그룹 단건 조회.

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | String | Y | SecurityGroup 식별키 |

**응답**

SecurityGroupVo 단건. [SecurityGroupVo 참조](#securitygroupvo).

---

### PUT /v1/resource/policies/security-group/{id}

보안그룹 수정.

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | String | Y | SecurityGroup 식별키 |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| name | String | Y (max 255) | 보안그룹 이름 |
| description | String | N (max 255) | 보안그룹 설명 |

**응답**

SecurityGroupVo 단건. [SecurityGroupVo 참조](#securitygroupvo).

---

### DELETE /v1/resource/policies/security-group/{id}

보안그룹 삭제.

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | String | Y | SecurityGroup 식별키 |

---

## Sync

### POST /v1/resource/policies/security-group/sync

OpenStack 보안그룹 전체 동기화.

**응답**

SecurityGroupSyncResultVo 단건. [SecurityGroupSyncResultVo 참조](#securitygroupsyncresultvo).

---

### POST /v1/resource/policies/security-group/{id}/sync

OpenStack 보안그룹 단일 동기화.

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | String | Y | SecurityGroup 식별키 |

**응답**

SecurityGroupSyncResultVo 단건. [SecurityGroupSyncResultVo 참조](#securitygroupsyncresultvo).

---

## Rule

### POST /v1/resource/policies/security-group/{id}/rule

보안그룹 Rule 추가.

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | String | Y | SecurityGroup 식별키 |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| description | String | N (max 255) | 설명 |
| direction | enum | Y | 방향 (`ingress` / `egress`) |
| protocol | String | N (max 40) | 프로토콜 (`tcp` / `udp` / `icmp` 등) |
| portRangeMin | Integer | N (0~65535) | 최소 포트 |
| portRangeMax | Integer | N (0~65535) | 최대 포트 |
| remoteIpPrefix | String | N (max 255) | 원격 IP 대역 (CIDR) |
| action | enum | Y | 허가/차단 (`allow` / `deny`) |
| etherType | enum | - | 자동 IPv4 |

**응답**

SecurityGroupRuleVo 단건. [SecurityGroupRuleVo 참조](#securitygrouprulevo).

---

### GET /v1/resource/policies/security-group/{id}/rule

보안그룹 Rule 목록 조회. 단건 조회도 이 엔드포인트로 처리.

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | String | Y | SecurityGroup 식별키 |

**응답**

SecurityGroupRuleVo 배열. [SecurityGroupRuleVo 참조](#securitygrouprulevo).

---

### DELETE /v1/resource/policies/security-group/{id}/rule/{ruleId}

보안그룹 Rule 삭제.

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | String | Y | SecurityGroup 식별키 |
| ruleId | String | Y | Rule 식별키 |

---

## History

### GET /v1/resource/policies/security-group/{id}/history

보안그룹 이력 조회.

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | String | Y | SecurityGroup 식별키 |

**응답**

SecurityGroupHistoryVo 배열. [SecurityGroupHistoryVo 참조](#securitygrouphistoryvo).

---

## VM SecurityGroup

### PUT /v1/resource/vm/{vmId}/security-group

VM에 적용된 보안그룹 변경.

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmId | String | Y | VM 식별키 |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| security_group | String | Y | 변경 대상 SecurityGroup 식별키 |

---

## DTO 정의

### SecurityGroupVo

| 필드 | 타입 | 설명 |
|---|---|---|
| id | String | SecurityGroup 식별키 |
| name | String | 보안그룹 이름 |
| description | String | 보안그룹 설명 |
| tenant_id | String | 테넌트 ID |
| rules | List\<SecurityGroupRuleVo\> | 적용된 Rule 목록 |
| del_yn | String | 삭제 여부 |
| reg_conn_id | String | 등록자 접속 ID |
| reg_nm | String | 등록자 명 |
| reg_ts | LocalDateTime | 등록 일시 |
| mod_conn_id | String | 수정자 접속 ID |
| mod_nm | String | 수정자 명 |
| mod_ts | LocalDateTime | 수정 일시 |

### SecurityGroupRuleVo

| 필드 | 타입 | 설명 |
|---|---|---|
| id | String | Rule 식별키 |
| tenant_id | String | 테넌트 ID |
| security_group_id | String | SecurityGroup 식별키 |
| direction | enum | 방향 (`ingress` / `egress`) |
| ethertype | enum | Ethernet Type |
| protocol | String | 프로토콜 |
| port_range_min | String | 최소 포트 |
| port_range_max | String | 최대 포트 |
| remote_ip_prefix | String | CIDR 대역 |
| remote_group_id | String | 원격 SecurityGroup ID |
| description | String | 설명 |
| action | enum | 허가/차단 (`allow` / `deny`) |
| del_yn | String | 삭제 여부 |
| reg_conn_id | String | 등록자 |
| reg_nm | String | 등록자 명 |
| reg_ts | LocalDateTime | 등록 일시 |

### SecurityGroupSyncResultVo

| 필드 | 타입 | 설명 |
|---|---|---|
| security_group_total | int | 처리된 SecurityGroup 수 |
| security_group_inserted | int | 추가된 SecurityGroup 수 |
| security_group_updated | int | 수정된 SecurityGroup 수 |
| security_group_deleted | int | 삭제된 SecurityGroup 수 |
| security_group_rule_total | int | 처리된 Rule 수 |
| security_group_rule_inserted | int | 추가된 Rule 수 |
| security_group_rule_updated | int | 수정된 Rule 수 |
| security_group_rule_deleted | int | 삭제된 Rule 수 |

### SecurityGroupHistoryVo

| 필드 | 타입 | 설명 |
|---|---|---|
| history_target | String | 대상 (`SECURITY_GROUP` / `SECURITY_GROUP_RULE`) |
| action_type | String | 액션 (`CREATE` / `UPDATE` / `DELETE` / `SYNC`) |
| security_group_id | String | SecurityGroup 식별키 |
| security_group_rule_id | String | Rule 식별키 |
| tenant_id | String | 테넌트 식별키 |
| security_group_name | String | SecurityGroup 명 |
| security_group_desc | String | SecurityGroup 설명 |
| rule_desc | String | Rule 설명 |
| rule_direction | String | Rule 방향 |
| protocol | String | 프로토콜 |
| port_range_min | Integer | 최소 포트 |
| port_range_max | Integer | 최대 포트 |
| rmt_ip_pfx | String | 원격 IP 대역 |
| rule_action | String | Rule 액션 |
| del_yn | String | 삭제 여부 |
| reg_conn_id | String | 등록자 |
| reg_ts | LocalDateTime | 등록 일시 |
| history_reg_conn_id | String | 이력 등록자 |
| history_reg_nm | String | 이력 등록자 명 |
| history_reg_ts | LocalDateTime | 이력 등록 일시 |
