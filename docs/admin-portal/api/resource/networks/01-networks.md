# 네트워크 API

## 사용 화면
- [네트워크](../../화면/시스템%20자원/03-네트워크.md)
- [포트/공용PC대기/자동할당/IP관리](../../화면/가상%20PC/05-포트-공용PC대기-자동할당-IP관리.md)

## 목차

- [네트워크](#네트워크)
- [서브넷](#서브넷)
- [네트워크 QoS](#네트워크-qos)
- [라우터](#라우터)
- [IP 관리](#ip-관리)

---

## 네트워크

### GET /v1/resource/networks

네트워크 목록 조회.

**호출 위치**: `store/modules/network.js:131`, `components/Modals/Network/NetworkResource.vue:353`, `views/initialized/components/Network/index.vue:70`, `store/modules/virtualPc.js:273`, `views/systemResource/network/index.vue:119`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| nw_nm | string | N | 네트워크명 검색어 |
| usg_use_cd | string | N | 사용 용도 코드 (P004V: 가상, P004P: 물리) |
| in_vm_grp_id | string | N | 그룹 소속 네트워크 필터 |
| sort | string | N | 정렬 기준 필드 |
| sort_type | string | N | ASC / DESC |

### SA/TA 차이

| 조건 | 동작 |
|------|------|
| SA (tnt_id가 null/빈값) | `usg_use_cd=P004P` (물리 네트워크) 고정 전송 |
| TA (tnt_id 존재) | `usg_use_cd=P004V` (가상 네트워크) 고정 전송 |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| data | array | 네트워크 배열 |
| data[].nw_id | string | 네트워크 ID |
| data[].nw_nm | string | 네트워크명 |
| data[].nw_typ_cd | string | 네트워크 타입 코드 (`P008FLT`, `P008VXL` 등) |
| data[].nw_typ_cd_nm | string | 네트워크 타입명 (FLAT, vxLAN 등) |
| data[].usg_use_cd | string | 사용 용도 코드 |
| data[].usg_use_cd_nm | string | 사용 용도명 |
| data[].grp_usg_cnt | string | 그룹 사용 수 |
| data[].port_usg_cnt | string | 포트 사용 수 |
| data[].subnet_cnt | string | 서브넷 수 |
| data[].tenants | array | 소속 테넌트 목록 (`[{ tnt_id, tnt_nm }]`) |
| data[].subnets | array | 소속 서브넷 목록 |
| data[].subnets[].sbn_id | string | 서브넷 ID |
| data[].subnets[].sbn_nm | string | 서브넷명 |
| data[].subnets[].cidr | string | CIDR |
| data[].subnets[].gw | string | 게이트웨이 |
| data[].nw_qos_plcy_id | string | 네트워크 QoS 정책 ID |
| data[].nw_qos_plcy_nm | string | 네트워크 QoS 정책명 |
| data[].nw_descp | string\|null | 네트워크 설명 |
| data[].nw_qos_detail | object\|null | 네트워크 QoS 상세 정보 |
| data[].reg_id | string | 등록자 ID |
| data[].reg_conn_id | string | 등록자 접속 ID |
| data[].reg_nm | string | 등록자명 |
| data[].reg_ts | string | 등록 일시 |
| data[].mod_id | string | 수정자 ID |
| data[].mod_conn_id | string | 수정자 접속 ID |
| data[].mod_nm | string | 수정자명 |
| data[].mod_ts | string | 수정 일시 |
| pageinfo.count | string | 총 건수 |
| pageinfo.ispaging | string | 페이징 여부 |

---

### GET /v1/resource/networks/{networkId}

네트워크 상세 조회.

**호출 위치**: `store/modules/network.js:147`, `components/Modals/Network/NetworkResource.vue:389`, `views/virtualPc/components/IpManagement.vue:199`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| networkId | string | Y | 네트워크 ID |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| data.nw_id | string | 네트워크 ID |
| data.nw_nm | string | 네트워크명 |
| data.usg_use_cd | string | 사용 용도 코드 |
| data.usg_use_cd_nm | string | 사용 용도명 |
| data.nw_typ_cd | string | 네트워크 타입 코드 (`P008FLT`, `P008VXL` 등) |
| data.nw_typ_cd_nm | string | 네트워크 타입명 (FLAT, vxLAN 등) |
| data.nw_descp | string\|null | 네트워크 설명 |
| data.grp_usg_cnt | string | 그룹 사용 수 |
| data.port_usg_cnt | string | 포트 사용 수 |
| data.subnet_cnt | string | 서브넷 수 |
| data.tenants | array | 소속 테넌트 목록 |
| data.tenants[].tnt_id | string | 테넌트 ID |
| data.tenants[].tnt_nm | string | 테넌트명 |
| data.subnets | array | 소속 서브넷 목록 |
| data.subnets[].sbn_id | string | 서브넷 ID |
| data.subnets[].sbn_nm | string | 서브넷명 |
| data.subnets[].cidr | string | CIDR |
| data.subnets[].sbn | string\|null | 서브넷 주소 |
| data.subnets[].gw | string | 게이트웨이 IP |
| data.subnets[].dns_1 | string | 기본 DNS |
| data.subnets[].dns_2 | string | 보조 DNS |
| data.subnets[].sbn_descp | string\|null | 서브넷 설명 |
| data.subnets[].nw_id | string | 네트워크 ID |
| data.subnets[].nw_nm | string | 네트워크명 |
| data.subnets[].usg_use_cd | string | 사용 용도 코드 |
| data.subnets[].usg_use_cd_nm | string | 사용 용도명 |
| data.subnets[].pool_usg_cnt | string | IP 풀 사용 수 |
| data.subnets[].port_usg_cnt | string | 포트 사용 수 |
| data.subnets[].nw_qos_plcy_id | string\|null | 서브넷 QoS 정책 ID |
| data.subnets[].nw_qos_plcy_nm | string\|null | 서브넷 QoS 정책명 |
| data.subnets[].nw_qos_detail | object\|null | 서브넷 QoS 상세 |
| data.subnets[].reg_id | string | 등록자 ID |
| data.subnets[].reg_conn_id | string | 등록자 계정 ID |
| data.subnets[].reg_nm | string | 등록자명 |
| data.subnets[].reg_ts | string | 등록일시 |
| data.subnets[].mod_id | string | 수정자 ID |
| data.subnets[].mod_conn_id | string | 수정자 계정 ID |
| data.subnets[].mod_nm | string | 수정자명 |
| data.subnets[].mod_ts | string | 수정일시 |
| data.nw_qos_plcy_id | string\|null | 네트워크 QoS 정책 ID |
| data.nw_qos_plcy_nm | string\|null | 네트워크 QoS 정책명 |
| data.nw_qos_detail | object\|null | 네트워크 QoS 상세 |
| data.reg_id | string | 등록자 ID |
| data.reg_conn_id | string | 등록자 계정 ID |
| data.reg_nm | string | 등록자명 |
| data.reg_ts | string | 등록일시 |
| data.mod_id | string | 수정자 ID |
| data.mod_conn_id | string | 수정자 계정 ID |
| data.mod_nm | string | 수정자명 |
| data.mod_ts | string | 수정일시 |

---

### POST /v1/resource/networks

네트워크 등록.

**호출 위치**: `store/modules/network.js:161`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| nw_nm | string | Y | 네트워크명 |
| nw_typ_cd | string | Y | 네트워크 타입 코드 (기본값: P008VXL) |
| usg_use_cd | string | Y | 사용 용도 코드 |
| nw_descp | string | N | 네트워크 설명 |

---

### PUT /v1/resource/networks/{networkId}

네트워크 수정.

**호출 위치**: `store/modules/network.js:179`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| networkId | string | Y | 네트워크 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| nw_nm | string | N | 네트워크명 |
| nw_descp | string | N | 네트워크 설명 |

---

### DELETE /v1/resource/networks/{networkId}

네트워크 삭제.

**호출 위치**: `store/modules/network.js:197`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| networkId | string | Y | 네트워크 ID |

---

### GET /v1/resource/networks/phy_networks

물리 네트워크 목록 조회.

**호출 위치**: `views/tenant/IndexDetail.vue:2261`

---

### GET /v1/resource/networks?usg_use_cd=P004V

가상 네트워크 목록 조회 (내부 인터페이스 설정용).

**호출 위치**: `components/Modals/SystemResource/InnerInterfaceSetting.vue:91`, `components/Modals/SystemResource/NetworkSelectList.vue:98`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| usg_use_cd | string | Y | P004V 고정 |

---

## 네트워크 QoS

### GET /v1/resource/networks/qos

네트워크 QoS 목록 조회.

**호출 위치**: `store/modules/network.js:318`, `views/systemResource/network/IndexDetail.vue:436`, `views/virtualPc/components/VirtualPcDetail.vue:1088`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| nw_qos_nm | string | N | QoS 정책명 검색어 |
| sort | string | N | 정렬 기준 필드 |
| sort_type | string | N | ASC / DESC |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| data | array | QoS 정책 배열 |
| data[].nw_qos_plcy_id | string | QoS 정책 ID |
| data[].nw_qos_plcy_nm | string | QoS 정책명 |
| data[].reg_conn_id | string | 등록자 계정 ID |
| data[].reg_nm | string | 등록자명 |
| data[].reg_ts | string | 등록일시 |
| data[].mod_conn_id | string | 수정자 계정 ID |
| data[].mod_nm | string | 수정자명 |
| data[].mod_ts | string | 수정일시 |
| data[].rules | array | QoS 규칙 목록 |
| data[].rules[].nw_qos_plcy_id | string | QoS 정책 ID |
| data[].rules[].nw_qos_rule_id | string | QoS 규칙 ID |
| data[].rules[].direction_cd | string | 방향 코드 (`V017ESS`: 내보냄, `V017ISS`: 들어옴) |
| data[].rules[].direction_cd_nm | string | 방향명 |
| data[].rules[].max_kbps | number | 최대 대역폭 (kbps) |
| data[].rules[].max_burst_kbps | number | 최대 버스트 대역폭 (kbps) |
| data[].rules[].reg_conn_id | string | 등록자 계정 ID (마스킹) |
| data[].rules[].reg_nm | string | 등록자명 (마스킹) |
| data[].rules[].reg_ts | string | 등록일시 |
| data[].rules[].mod_conn_id | string | 수정자 계정 ID (마스킹) |
| data[].rules[].mod_nm | string | 수정자명 (마스킹) |
| data[].rules[].mod_ts | string | 수정일시 |
| data[].tnt_id | string\|null | 테넌트 ID |
| data[].tnt_nm | string\|null | 테넌트명 |

---

### GET /v1/resource/networks/qos/{networkQosId}

네트워크 QoS 상세 조회.

**호출 위치**: `store/modules/network.js:335`, `views/systemResource/network/NetQosDetail.vue:248`, `views/virtualPc/VirtualPcAssignment.vue:1206`, `views/virtualPc/components/VirtualPcDetail.vue:1094`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| networkQosId | string | Y | QoS 정책 ID |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| data.nw_qos_plcy_id | string | QoS 정책 ID |
| data.nw_qos_plcy_nm | string | QoS 정책명 |
| data.reg_conn_id | string | 등록자 계정 ID |
| data.reg_nm | string | 등록자명 |
| data.reg_ts | string | 등록일시 |
| data.mod_conn_id | string | 수정자 계정 ID |
| data.mod_nm | string | 수정자명 |
| data.mod_ts | string | 수정일시 |
| data.rules | array | QoS 규칙 목록 |
| data.rules[].nw_qos_plcy_id | string | QoS 정책 ID |
| data.rules[].nw_qos_rule_id | string | QoS 규칙 ID |
| data.rules[].direction_cd | string | 방향 코드 (`V017ESS`: 내보냄, `V017ISS`: 들어옴) |
| data.rules[].direction_cd_nm | string | 방향명 |
| data.rules[].max_kbps | number | 최대 대역폭 (kbps) |
| data.rules[].max_burst_kbps | number | 최대 버스트 대역폭 (kbps) |
| data.tnt_id | string\|null | 테넌트 ID |
| data.tnt_nm | string\|null | 테넌트명 |

---

### POST /v1/resource/networks/qos

네트워크 QoS 등록.

**호출 위치**: `store/modules/network.js:349`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| nw_qos_plcy_nm | string | Y | QoS 정책명 |
| rules | array | Y | QoS 규칙 목록 |
| rules[].direction_cd | string | Y | 방향 코드 (`V017ESS`: 내보냄, `V017ISS`: 들어옴) |
| rules[].max_kbps | number | Y | 최대 대역폭 (kbps) |
| rules[].max_burst_kbps | number | Y | 최대 버스트 대역폭 (kbps) |

---

### PUT /v1/resource/networks/qos/{networkQosId}

네트워크 QoS 수정.

**호출 위치**: `store/modules/network.js:366`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| networkQosId | string | Y | QoS 정책 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| nw_qos_plcy_nm | string | N | QoS 정책명 |
| rules | array | N | QoS 규칙 목록 |
| rules[].nw_qos_rule_id | string | N | 규칙 ID (기존 규칙 수정 시) |
| rules[].direction_cd | string | N | 방향 코드 |
| rules[].max_kbps | number | N | 최대 대역폭 (kbps) |
| rules[].max_burst_kbps | number | N | 최대 버스트 대역폭 (kbps) |

---

### DELETE /v1/resource/networks/qos/{networkQosId}

네트워크 QoS 삭제.

**호출 위치**: `store/modules/network.js:384`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| networkQosId | string | Y | QoS 정책 ID |

---

## 서브넷

### GET /v1/resource/subnets

서브넷 목록 조회.

**호출 위치**: `store/modules/network.js:218`, `components/Modals/Network/NetworkResource.vue:390`, `store/modules/virtualPc.js:282`, `views/initialized/components/Subnet/index.vue:70`, `views/virtualPc/components/IpManagement.vue:131`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| sbn_nm | string | N | 서브넷명 검색어 |
| nw_id | string | N | 네트워크 ID 필터 |
| in_vm_grp_id | string | N | 그룹 소속 서브넷 필터 |
| sort | string | N | 정렬 기준 필드 |
| sort_type | string | N | ASC / DESC |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| data | array | 서브넷 배열 |
| data[].sbn_id | string | 서브넷 ID |
| data[].sbn_nm | string | 서브넷명 |
| data[].cidr | string | CIDR (예: 192.168.0.0/24) |
| data[].sbn | string\|null | 서브넷 주소 |
| data[].gw | string | 게이트웨이 IP |
| data[].dns_1 | string | 기본 DNS |
| data[].dns_2 | string | 보조 DNS |
| data[].sbn_descp | string\|null | 서브넷 설명 |
| data[].nw_id | string | 네트워크 ID |
| data[].nw_nm | string | 네트워크명 |
| data[].usg_use_cd | string | 사용 용도 코드 |
| data[].usg_use_cd_nm | string | 사용 용도명 |
| data[].nw_qos_plcy_id | string\|null | QoS 정책 ID |
| data[].nw_qos_plcy_nm | string\|null | QoS 정책명 |
| data[].nw_qos_detail | object\|null | QoS 상세 (하위 구조는 QoS 상세 응답과 동일) |
| data[].pool_usg_cnt | string | IP 풀 사용 수 |
| data[].port_usg_cnt | string | 포트 사용 수 |
| data[].reg_id | string | 등록자 ID |
| data[].reg_conn_id | string | 등록자 계정 ID |
| data[].reg_nm | string | 등록자명 |
| data[].reg_ts | string | 등록일시 |
| data[].mod_id | string | 수정자 ID |
| data[].mod_conn_id | string | 수정자 계정 ID |
| data[].mod_nm | string | 수정자명 |
| data[].mod_ts | string | 수정일시 |
| pageinfo.count | string | 총 건수 |
| pageinfo.ispaging | string | 페이징 여부 |

---

### GET /v1/resource/subnets/{subnetId}

서브넷 상세 조회.

**호출 위치**: `store/modules/network.js:236`, `store/modules/virtualPc.js:296`, `components/Modals/Network/NetworkResource.vue:413`, `views/virtualPc/components/IpManagement.vue:168`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| subnetId | string | Y | 서브넷 ID |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| data.sbn_id | string | 서브넷 ID |
| data.sbn_nm | string | 서브넷명 |
| data.cidr | string | CIDR |
| data.sbn | string\|null | 서브넷 주소 |
| data.gw | string | 게이트웨이 IP |
| data.dns_1 | string | 기본 DNS |
| data.dns_2 | string | 보조 DNS |
| data.sbn_descp | string\|null | 서브넷 설명 |
| data.nw_id | string | 네트워크 ID |
| data.nw_nm | string | 네트워크명 |
| data.usg_use_cd | string | 사용 용도 코드 |
| data.usg_use_cd_nm | string | 사용 용도명 |
| data.nw_qos_plcy_id | string\|null | QoS 정책 ID |
| data.nw_qos_plcy_nm | string\|null | QoS 정책명 |
| data.nw_qos_detail | object\|null | QoS 상세 |
| data.pool_usg_cnt | string | IP 풀 사용 수 |
| data.port_usg_cnt | string | 포트 사용 수 |
| data.reg_id | string | 등록자 ID |
| data.reg_conn_id | string | 등록자 계정 ID |
| data.reg_nm | string | 등록자명 |
| data.reg_ts | string | 등록일시 |
| data.mod_id | string | 수정자 ID |
| data.mod_conn_id | string | 수정자 계정 ID |
| data.mod_nm | string | 수정자명 |
| data.mod_ts | string | 수정일시 |

---

### POST /v1/resource/subnets

서브넷 등록.

**호출 위치**: `store/modules/network.js:248`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| sbn_nm | string | Y | 서브넷명 |
| nw_id | string | Y | 네트워크 ID |
| cidr | string | Y | CIDR |
| gw | string | N | 게이트웨이 IP |
| dns_1 | string | N | 기본 DNS |
| dns_2 | string | N | 보조 DNS |
| sbn_descp | string | N | 서브넷 설명 |
| nw_qos_plcy_id | string | N | QoS 정책 ID |

---

### PUT /v1/resource/subnets/{subnetId}

서브넷 수정.

**호출 위치**: `store/modules/network.js:266`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| subnetId | string | Y | 서브넷 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| sbn_nm | string | N | 서브넷명 |
| gw | string | N | 게이트웨이 IP |
| dns_1 | string | N | 기본 DNS |
| dns_2 | string | N | 보조 DNS |
| sbn_descp | string | N | 서브넷 설명 |
| nw_qos_plcy_id | string | N | QoS 정책 ID |

---

### DELETE /v1/resource/subnets/{subnetId}

서브넷 삭제.

**호출 위치**: `store/modules/network.js:284`, `store/modules/network.js:303`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| subnetId | string | Y | 서브넷 ID |

---

## IP 관리

### GET /v1/resource/subnets/{sbnId}/ips

서브넷 IP 목록 조회.

**호출 위치**: `components/Common/CommonSelectIp.vue:140`, `components/Modals/Network/NetworkResourceDetail.vue:283`, `components/Modals/VirtualPc/IpPool.vue:166`, `components/Modals/VirtualPc/VirtualPcPool.vue:150`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| sbnId | string | Y | 서브넷 ID |

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| ip_usg_typ_cd | string | N | IP 사용 타입 코드 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| ip_id | string | IP ID |
| ip_addr | string | IP 주소 |
| ip_usg_typ_cd | string | IP 사용 타입 코드 |
| vm_auth_id | string | 할당된 VM 인증 ID |

---

### DELETE /v1/resource/tenants/{tntId}/subnet

테넌트 서브넷 삭제.

**호출 위치**: `components/Modals/Network/NetworkResourceModify.vue:399`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tntId | string | Y | 테넌트 ID |

**Request Body (param)**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| sbn_id | string | Y | 서브넷 ID |

---

### POST /v1/resource/tenants/{tntId}/subnet

테넌트 서브넷 등록.

**호출 위치**: `components/Modals/Network/NetworkResourceModify.vue:451`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tntId | string | Y | 테넌트 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| sbn_id | string | Y | 서브넷 ID |
| nw_id | string | Y | 네트워크 ID |

---

## 라우터

### GET /v1/resource/router

라우터 목록 조회.

**호출 위치**: `store/modules/nwRouter.js:46`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| data | array | 라우터 배열 |
| data[].rtr_id | string | 라우터 ID |
| data[].rtr_nm | string | 라우터명 |
| data[].rtr_descp | string\|null | 라우터 설명 |
| data[].tnt_id | string | 테넌트 ID |
| data[].tnt_nm | string\|null | 테넌트명 |
| data[].nw_id | string | 외부 네트워크 ID |
| data[].nw_nm | string | 외부 네트워크명 |
| data[].sbn_cnt | number | 연결된 서브넷 수 |
| data[].subnetList | array\|null | 연결된 서브넷 목록 (목록 조회 시 null) |
| data[].reg_id | string | 등록자 ID |
| data[].reg_conn_id | string | 등록자 계정 ID |
| data[].reg_nm | string\|null | 등록자명 |
| data[].reg_ts | string | 등록일시 |
| data[].mod_id | string | 수정자 ID |
| data[].mod_conn_id | string | 수정자 계정 ID |
| data[].mod_nm | string\|null | 수정자명 |
| data[].mod_ts | string\|null | 수정일시 |
| pageinfo.count | string | 총 건수 |
| pageinfo.ispaging | string | 페이징 여부 |

---

### GET /v1/resource/router/{id}

라우터 상세 조회.

**호출 위치**: `store/modules/nwRouter.js:58`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 라우터 ID |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| data.rtr_id | string | 라우터 ID |
| data.rtr_nm | string | 라우터명 |
| data.rtr_descp | string\|null | 라우터 설명 |
| data.tnt_id | string | 테넌트 ID |
| data.tnt_nm | string\|null | 테넌트명 |
| data.nw_id | string | 외부 네트워크 ID |
| data.nw_nm | string | 외부 네트워크명 |
| data.sbn_cnt | number | 연결된 서브넷 수 |
| data.subnetList | array | 연결된 서브넷 목록 |
| data.subnetList[].rtr_id | string\|null | 라우터 ID |
| data.subnetList[].nw_id | string | 네트워크 ID |
| data.subnetList[].nw_nm | string | 네트워크명 |
| data.subnetList[].nw_typ_cd | string | 네트워크 타입 코드 |
| data.subnetList[].usg_use_cd | string | 사용 용도 코드 |
| data.subnetList[].usg_use_cd_nm | string | 사용 용도명 |
| data.subnetList[].sbn_id | string | 서브넷 ID |
| data.subnetList[].sbn_nm | string | 서브넷명 |
| data.subnetList[].cidr | string | CIDR |
| data.subnetList[].sbn | string\|null | 서브넷 주소 |
| data.subnetList[].gw | string | 게이트웨이 IP |
| data.subnetList[].dns_1 | string | 기본 DNS |
| data.subnetList[].dns_2 | string | 보조 DNS |
| data.subnetList[].sbn_descp | string\|null | 서브넷 설명 |
| data.reg_id | string | 등록자 ID |
| data.reg_conn_id | string | 등록자 계정 ID |
| data.reg_nm | string\|null | 등록자명 |
| data.reg_ts | string | 등록일시 |
| data.mod_id | string | 수정자 ID |
| data.mod_conn_id | string | 수정자 계정 ID |
| data.mod_nm | string\|null | 수정자명 |
| data.mod_ts | string\|null | 수정일시 |

---

### POST /v1/resource/router

라우터 등록.

**호출 위치**: `store/modules/nwRouter.js:71`

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| rtr_nm | string | Y | 라우터명 |
| nw_id | string | Y | 외부 네트워크 ID |
| rtr_descp | string | N | 라우터 설명 |

---

### PUT /v1/resource/router/{id}

라우터 수정.

**호출 위치**: `store/modules/nwRouter.js:98`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 라우터 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| nw_nm | string | N | 외부 네트워크명 |

---

### DELETE /v1/resource/router/{id}

라우터 삭제.

**호출 위치**: `store/modules/nwRouter.js:84`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 라우터 ID |

---

### PUT /v1/resource/router/{id}/changeNetwork

라우터 외부 네트워크 변경.

**호출 위치**: `store/modules/nwRouter.js:112`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 라우터 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| nw_id | string | Y | 변경할 외부 네트워크 ID |

---

### PUT /v1/resource/router/{id}/addNetwork

라우터 내부 인터페이스(서브넷) 추가.

**호출 위치**: `store/modules/nwRouter.js:128`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 라우터 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| sbn_id | string | Y | 추가할 서브넷 ID |

---

### PUT /v1/resource/router/{id}/removeNetwork

라우터 내부 인터페이스(서브넷) 제거.

**호출 위치**: `store/modules/nwRouter.js:147`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 라우터 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| sbn_id | string | Y | 제거할 서브넷 ID |

---

## 에러 코드

| HTTP 상태 | 설명 |
|---|---|
| 200 | 정상 처리 |
| 400 | 잘못된 요청 파라미터 |
| 404 | 리소스 없음 |
| 409 | 상태 충돌 |
| 500 | 서버 오류 |
