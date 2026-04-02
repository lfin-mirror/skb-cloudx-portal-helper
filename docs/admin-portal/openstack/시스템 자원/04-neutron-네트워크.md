# Neutron — 네트워크, 서브넷, 라우터, QoS

admin-portal 메뉴: 시스템 자원 > 네트워크 (A1004/T1004)

## OpenStack Neutron

네트워킹 서비스. 가상 네트워크, 서브넷, 라우터, 보안 그룹, QoS 등 관리.

## 전체 구조 시각화 — 도메인부터 VM까지

```
┌─ Domain (Keystone) ─────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌─ Tenant A ─────────────────────────────────────────────────────────────┐ │
│  │  CV_TNT_M.ZONE_NM = 'Default Zone'                                    │ │
│  │                                                                        │ │
│  │  ┌─ Zone: Default Zone (Nova) ──────────────────────────────────────┐  │ │
│  │  │  Host Aggregate ID: 6                                            │  │ │
│  │  │                                                                  │  │ │
│  │  │  ┌─ compute-01 ─────────┐   ┌─ compute-02 ─────────┐           │  │ │
│  │  │  │  VM-001 (김철수 PC)  │   │  VM-003 (박지민 PC)  │           │  │ │
│  │  │  │  VM-002 (이영희 PC)  │   │                      │           │  │ │
│  │  │  └──────────────────────┘   └──────────────────────┘           │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  │  ┌─ 네트워크 (Neutron) ─────────────────────────────────────────────┐  │ │
│  │  │                                                                  │  │ │
│  │  │  가상 네트워크 A (P004V)        ┌──────────┐                     │  │ │
│  │  │  ├── 서브넷 A (192.168.1.0/24) ─┤          │                     │  │ │
│  │  │  │   ├── Port → VM-001         │  라우터   │── 물리 네트워크     │  │ │
│  │  │  │   ├── Port → VM-002         │ (External │   (P004P)           │  │ │
│  │  │  │   └── Port → VM-003         │  Gateway) │── → 외부 인터넷    │  │ │
│  │  │  │                              └──────────┘                     │  │ │
│  │  │  │  [QoS 정책: 100Mbps 제한]                                     │  │ │
│  │  │  └──────────────────────────────                                 │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  │  ┌─ 스토리지 (Cinder) ──────────────────────────────────────────────┐  │ │
│  │  │  Volume (VM-001 루트 디스크) ── Volume Type ── NetApp Backend    │  │ │
│  │  │  Volume (VM-001 개인 디스크)    [QoS: 1000 IOPS]                 │  │ │
│  │  │  Volume (VM-002 루트 디스크)                                      │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌─ Tenant B ─────────────────────────────────────────────────────────────┐ │
│  │  CV_TNT_M.ZONE_NM = 'public-zone'                                     │ │
│  │                                                                        │ │
│  │  ┌─ Zone: public-zone (Nova) ───────────────────────────────────────┐  │ │
│  │  │  Host Aggregate ID: 20                                           │  │ │
│  │  │  (호스트 없음 → VM 배치 불가)                                    │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌─ 물리 네트워크 (Provider Network, P004P) ───────────────────────────────┐│
│  │  인프라팀이 OpenStack에서 직접 구성                                      ││
│  │  /initialized 마법사에서 로컬 DB로 동기화                                ││
│  │  SA 조회만 가능 (isEditable: false)                                      ││
│  │  VLAN 기반, 물리 스위치와 직접 연결                                      ││
│  │  라우터의 External Gateway로 사용 → 외부 인터넷 접속 경로                ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
```

### 계층 요약

```
Domain (Keystone)
  └── Tenant (논리 소유 단위)
        │
        ├── [물리] Zone → Host → VM 실행
        │         (CV_TNT_M.ZONE_NM으로 연결)
        │
        ├── [네트워크] 가상 네트워크 (TA가 생성)
        │         └── 서브넷 → Port → VM에 IP 할당
        │                      └── 라우터 → 물리 네트워크 → 외부
        │
        └── [스토리지] Volume (VM 디스크)
                  └── Volume Type → Backend (NetApp)
```

### 누가 뭘 만드는가

| 리소스 | 누가 생성 | 어디서 |
|--------|----------|--------|
| Domain | 인프라팀 | OpenStack |
| 물리 네트워크 (Provider) | 인프라팀 | OpenStack → 마법사로 동기화 |
| Zone + Host 배치 | SA | admin-portal (→ OpenStack 동기화) |
| 테넌트 + Zone 할당 | SA | admin-portal |
| 가상 네트워크 + 서브넷 | TA | admin-portal (→ OpenStack 동기화) |
| 라우터 (가상↔물리 연결) | TA | admin-portal (→ OpenStack 동기화) |
| Volume Type + QoS | SA | admin-portal (→ OpenStack 동기화) |
| VM (가상 PC) | TA | admin-portal (→ OpenStack 동기화) |

### VM 중심으로 보기 — 하나의 VM이 세 영역에 걸쳐있음

위 다이어그램은 Nova/Neutron/Cinder를 영역별로 나눠 그린 것. 실제로 VM 한 대는 세 영역에 동시에 속함:

```
VM-001 (김철수의 가상 PC)
  │
  ├── [Nova - 어디서 실행?]
  │     └── compute-01 호스트의 CPU/메모리를 사용하여 실행 중
  │
  ├── [Neutron - 어떻게 통신?]
  │     └── 서브넷 A의 Port에 연결 → IP: 192.168.1.10 할당
  │         └── 라우터 → 물리 네트워크 → 외부 인터넷 접속 가능
  │
  └── [Cinder - 데이터 어디에?]
        ├── 루트 볼륨 (OS 디스크, 50GB) → NetApp Backend
        └── 개인 디스크 (추가 볼륨, 100GB) → NetApp Backend
```

비유:

```
내 노트북 한 대 = VM 한 대

  [물리] 내 책상 위에 놓여있음        = compute-01에서 실행
  [네트워크] WiFi에 연결, IP 할당됨   = 서브넷의 Port에 연결
  [스토리지] 내장 SSD + 외장 HDD      = 루트 볼륨 + 개인 디스크
```

위 다이어그램에서 Nova 영역의 VM-001과 Neutron 영역의 VM-001은 **같은 VM**. OpenStack 서비스별로 다른 측면을 관리할 뿐:
- Nova: "이 VM을 어떤 호스트에서 돌릴 것인가"
- Neutron: "이 VM에 어떤 IP를 주고 어떻게 통신시킬 것인가"
- Cinder: "이 VM의 디스크를 어디에 저장할 것인가"

## Provider Network vs Self-Service Network

### Provider Network (물리 네트워크)

- **관리자(SA)가 생성/관리**, 테넌트는 수정 불가
- 물리적 네트워크 인프라에 직접 매핑
- VLAN, flat, VXLAN 등 네트워크 유형 지원
- 외부 네트워크(인터넷 접속용)로 주로 사용
- CloudX: `usg_use_cd = 'P004P'` → SA 화면에서 "물리 네트워크"로 표시

### Self-Service Network (가상 네트워크)

- **테넌트(TA)가 생성/관리**
- VXLAN/GRE 터널링으로 테넌트 간 격리
- 내부 통신용 (외부 접근은 라우터 필요)
- CloudX: `usg_use_cd = 'P004V'` → TA 화면에서 "네트워크"로 표시

```
┌─── Provider Network (물리) ────────────┐
│  외부 인터넷 / 사내 네트워크와 직접 연결 │
│  VLAN ID로 격리                         │
│  SA만 생성/수정 가능                     │
└────────────┬───────────────────────────┘
             │ (라우터 연결)
┌────────────┴───────────────────────────┐
│  Self-Service Network (가상)            │
│  VXLAN 터널로 격리                      │
│  TA가 생성/수정 가능                     │
│  서브넷, DHCP, DNS 설정                 │
└─────────────────────────────────────────┘
```

## Subnet (서브넷)

네트워크 내 IP 주소 범위.

| 속성 | 설명 |
|------|------|
| `cidr` | IP 대역 (예: `192.168.1.0/24`) |
| `gateway_ip` | 게이트웨이 IP |
| `dns_nameservers` | DNS 서버 목록 |
| `enable_dhcp` | DHCP 자동 할당 여부 |
| `allocation_pools` | IP 할당 범위 (start/end) |

하나의 네트워크에 여러 서브넷 가능 (예: IPv4 + IPv6).

## Router (라우터)

서브넷 간 트래픽 라우팅. L3 계층.

```
┌─ 외부 네트워크 (Provider) ─┐
│                            │
│  ┌─── 라우터 ───┐          │
│  │ External GW  │──────────┘
│  │              │
│  │ Internal IF  │──── 서브넷 A (192.168.1.0/24)
│  │ Internal IF  │──── 서브넷 B (192.168.2.0/24)
│  └──────────────┘
```

- **External Gateway**: 외부 네트워크(Provider)와 연결. 인터넷 접속 경로
- **Internal Interface**: Self-Service 서브넷과 연결. 서브넷 간 라우팅
- CloudX API: `addNetwork` (내부 인터페이스 추가), `removeNetwork` (제거), `changeNetwork` (외부 게이트웨이 변경)

## QoS Policy (서비스 품질)

네트워크 대역폭 제어.

| 규칙 유형 | 설명 |
|----------|------|
| Bandwidth Limit | 최대 대역폭 제한 (kbps) + 버스트 |
| DSCP Marking | 패킷 우선순위 태깅 |
| Minimum Bandwidth | 최소 보장 대역폭 |

QoS 정책은 네트워크 또는 포트에 적용. CloudX에서는 네트워크 생성 시 QoS 정책 선택.

## Port

VM의 네트워크 인터페이스. MAC 주소와 IP 주소 할당 지점.

- VM 생성 시 네트워크를 지정하면 자동으로 Port 생성
- Fixed IP (서브넷에서 할당) + Floating IP (외부 접근용) 구조
- CloudX의 "포트 관리" (T0705)에서 조회/삭제

## app-ms-resource 데이터 소스

**목록 조회는 전부 로컬 MariaDB.** 생성/수정/삭제 시에만 plat-ms-vid4o → OpenStack 호출.

| 동작 | 데이터 소스 |
|------|-----------|
| 네트워크/서브넷/라우터/QoS 목록 | 로컬 DB (MyBatis mapper) |
| 네트워크/서브넷/라우터/QoS 생성 | DB + OpenStack (양쪽 동기화) |
| 네트워크/서브넷/라우터/QoS 수정/삭제 | DB + OpenStack |

## plat-ms-vid4o API (생성/수정/삭제 시 호출)

| 메서드 | 경로 | OpenStack API |
|--------|------|---------------|
| POST | `/network/networkl2` | Neutron `POST /v2.0/networks` |
| POST | `/network/subnet` | Neutron `POST /v2.0/subnets` |
| POST | `/network/router` | Neutron `POST /v2.0/routers` |
| POST | `/network/router/{id}/add-interfaces` | Neutron `PUT /v2.0/routers/{id}/add_router_interface` |
| POST | `/network/qos` | Neutron QoS 정책 생성 |
| POST | `/network/qos/{id}/rules` | Neutron QoS 규칙 추가 |
