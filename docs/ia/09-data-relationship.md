# CloudX VDI 데이터 관계도

주요 데이터 엔티티 간 소속/포함 관계와 OpenStack 리소스 매핑.

## 전체 관계도

```
도메인 (Domain)
  └── 테넌트 (Tenant) ─────────────────────────── OpenStack: Keystone Project
        │
        ├── Zone ──── 호스트 (Host)                OpenStack: Nova Availability Zone / Hypervisor
        │
        ├── 네트워크 (Network)                     OpenStack: Neutron Network
        │     ├── 서브넷 (Subnet)                  OpenStack: Neutron Subnet
        │     └── QoS 정책 (Network QoS)           OpenStack: Neutron QoS Policy
        │
        ├── 라우터 (Router)                        OpenStack: Neutron Router
        │     ├── External GW ── 물리 네트워크
        │     └── Internal IF ── 서브넷 (1개 이상)
        │
        ├── 볼륨 타입 (Volume Type)                OpenStack: Cinder Volume Type
        │     └── 디스크 QoS                       OpenStack: Cinder QoS Specs
        │
        ├── 템플릿 (Template) = Flavor + Image
        │     ├── 가상 PC 사양 (Flavor)            OpenStack: Nova Flavor
        │     └── 베이스 이미지 (Image)             OpenStack: Glance Image
        │
        ├── 사용자 그룹 (User Group)
        │     └── 사용자 (User)
        │
        ├── 정책
        │     ├── 가상 PC 정책 (보안/접근/USB/워터마크 등)
        │     └── 백업/스냅샷 정책
        │
        └── 가상 PC 그룹 (VM Group)
              └── 풀 (Pool) ── 전용 또는 공용
                    └── VM (가상 PC)               OpenStack: Nova Server
                          ├── 볼륨 (Volume)        OpenStack: Cinder Volume
                          └── Port (자동 생성)      OpenStack: Neutron Port
```

---

## 엔티티별 관계 상세

### 도메인 → 테넌트

- 관계: 1:N (도메인 하위에 여러 테넌트)
- 관리 화면: [도메인/Zone](../admin-portal/화면/시스템%20자원/01-도메인-Zone.md) (A1001)
- 도메인은 최상위 논리 그룹. SA 전용 읽기 전용 화면.
- 테넌트가 모든 리소스의 소유 주체 — Zone, 네트워크, 스토리지, 사용자, VM이 전부 테넌트에 귀속.

### 테넌트 → Zone → 호스트

- 관계: 테넌트 1:N Zone, Zone 1:N 호스트
- 관리 화면: [테넌트](../admin-portal/화면/테넌트/01-테넌트.md) (A0802), [도메인/Zone](../admin-portal/화면/시스템%20자원/01-도메인-Zone.md) (A1002)
- OpenStack: Nova Availability Zone, Hypervisor
- `host_tnt_yn` 설정에 따라 할당 방식 분기:

| `host_tnt_yn` | 모드 | 호스트 배치 |
|----------------|------|-----------|
| `Y` | 호스트 사용 | 테넌트에 특정 호스트 직접 지정. VM은 해당 호스트에서만 생성 |
| `N` | 호스트 미사용 | Zone 단위 할당. 플랫폼이 Zone 내 호스트 자동 배치 |

### 테넌트 → 네트워크 → 서브넷 → 라우터

- 관계: 테넌트 1:N 네트워크, 네트워크 1:N 서브넷, 라우터 N:M 서브넷
- 관리 화면: [네트워크](../admin-portal/화면/시스템%20자원/03-네트워크.md) (A1004)
- OpenStack: Neutron Network / Subnet / Router / Port

```
물리 네트워크 (SA 조회, P004P)        Neutron Provider Network
  │
  │  External Gateway
  ▼
라우터 (TA 생성)                     Neutron Router
  │
  │  Internal Interface
  ▼
가상 네트워크 (TA 생성, P004V)        Neutron Network
  └── 서브넷 (IP 대역 정의)           Neutron Subnet
        └── Port (VM 연결 시 자동)    Neutron Port → VM
```

- 네트워크 QoS: 네트워크에 적용, 해당 네트워크의 모든 Port(VM)에 대역폭 제한 적용.

### 테넌트 → 볼륨 타입 → 디스크 QoS

- 관계: 테넌트 N:M 볼륨 타입 (테넌트 상세에서 할당), 볼륨 타입 1:1 디스크 QoS
- 관리 화면: [스토리지](../admin-portal/화면/시스템%20자원/04-스토리지.md) (A1005)
- OpenStack: Cinder Volume Type / QoS Specs

```
Backend (NetApp 등 물리 장비)
  └── 볼륨 타입 (프로필 정의)         Cinder Volume Type
        ├── 디스크 QoS (SA 전용)     Cinder QoS Specs
        └── 볼륨 (디스크 인스턴스)    Cinder Volume → VM에 연결
```

- 디스크 QoS는 SA 전용 메뉴(A100502)에서 CRUD. 볼륨 타입에 연결은 VolumeTypeDetail에서 셀렉트로 수행.
- 볼륨 타입을 테넌트에 할당하는 것은 [테넌트 상세](../admin-portal/화면/테넌트/01-테넌트.md)의 "볼륨 타입 설정" 섹션에서 수행.

### 테넌트 → 사용자 그룹 → 사용자

- 관계: 테넌트 1:N 사용자 그룹, 사용자 그룹 1:N 사용자
- 관리 화면: [사용자 그룹](../admin-portal/화면/사용자%20정보/01-사용자%20그룹.md) (T0201)
- 사용자 그룹 = 부서/팀 단위. 그룹별 인증 정책, 근태 관리, 공유 폴더 설정.
- 사용자 그룹은 계층 구조 지원 (`up_usr_grp_nm` 상위 그룹).

### 테넌트 → 정책

- 관계: 테넌트 1:N 정책 (정책 유형별로 여러 개 생성 가능)
- 관리 화면: [가상 PC 정책](../admin-portal/화면/정책/02-가상%20PC%20정책.md) (A0503)

가상 PC 정책은 하위 정책들을 하나로 묶는 허브:

```
가상 PC 정책 (허브)
  ├── 가상 PC 보안 정책 (클립보드/파일전송/USB/프린터/모니터/화면캡쳐)
  │     └── 예외 네트워크 그룹 참조 (A050601)
  ├── 접근 차단 정책 (A050602)
  ├── URL Redirection 금지 정책 (A050606)
  ├── 미라이선스 정책 (A050607)
  ├── Metadata 정책 (A050608)
  ├── USB 정책 (A050609)
  ├── 보안 그룹 (A050611)
  └── Proxy 서버 정책
```

### 템플릿 = Flavor + Image

- 관계: 템플릿 N:1 Flavor, 템플릿 N:1 Image
- 관리 화면: [템플릿](../admin-portal/화면/템플릿/01-템플릿.md) (A0901)
- OpenStack: Nova Flavor + Glance Image

```
가상 PC 사양 (Flavor)                Nova Flavor
  "CPU 4코어, 메모리 8GB, 디스크 50GB"
  │
  └── 조합 → 템플릿 (Template)
  │             "Win10-Standard"
  ┌── 조합 ─┘
  │
베이스 이미지 (Image)                Glance Image
  "Windows 10 OS 이미지"
```

- 템플릿은 테넌트 상세의 "템플릿 관리" 섹션에서 테넌트에 할당.

### 가상 PC 그룹 → 풀 → VM

- 관계: 그룹 1:N 풀, 풀 1:N VM
- 관리 화면: [가상 PC 그룹](../admin-portal/화면/가상%20PC/01-가상%20PC%20그룹.md) (T0701), [가상 PC](../admin-portal/화면/가상%20PC/02-가상%20PC.md) (T0702)
- OpenStack: Nova Server (VM)

```
가상 PC 그룹
  │  그룹 레벨 설정: 템플릿, 네트워크, 가상 PC 정책, 백업/스냅샷 정책
  │
  ├── 풀 A (전용 PC, V001DED)
  │     풀 레벨 설정: Zone, 서브넷, 볼륨 타입, IP 할당, 전원 정책
  │     ├── VM-001 → 사용자 A (고정 할당)
  │     └── VM-002 → 사용자 B (고정 할당)
  │
  └── 풀 B (공용 PC, V001POO)
        풀 레벨 설정: Zone, 서브넷, 볼륨 타입, 대기 자원, 초기화 정책
        ├── VM-003 (대기 중, 풀에서 자동 배정)
        └── VM-004 (대기 중)
```

| 풀 유형 | 코드 | 할당 방식 | 고유 설정 |
|---------|------|----------|----------|
| 전용 | `V001DED` | 사용자 고정 할당 | 전원 정책, IP 고정/동적 선택 |
| 공용 | `V001POO` | 풀에서 자동 배정 | 초기화 정책, IP 동적 고정 |

---

## VM 생성 시 참조하는 엔티티 전체 흐름

VM 한 대가 생성될 때 관여하는 모든 엔티티:

```
[테넌트]
  ├── [가상 PC 그룹]
  │     ├── 템플릿 ─── Flavor (CPU/RAM/Disk) + Image (OS)
  │     ├── 가상 PC 정책 (보안/USB/워터마크/접근차단 등)
  │     └── 백업/스냅샷 정책
  │
  ├── [풀]
  │     ├── Zone → 호스트 (VM 배치 위치)
  │     ├── 서브넷 → 네트워크 → 라우터 → 물리 네트워크 (네트워크 경로)
  │     └── 볼륨 타입 → Backend (디스크 저장 위치)
  │
  └── [사용자 그룹] → [사용자] → VM 할당
```

### OpenStack 리소스 매핑 요약

| CloudX 엔티티 | OpenStack 리소스 | 서비스 |
|---------------|-----------------|--------|
| 도메인 | Domain | Keystone |
| 테넌트 | Project | Keystone |
| Zone | Availability Zone | Nova |
| 호스트 | Hypervisor / Compute Node | Nova |
| VM (가상 PC) | Server | Nova |
| Flavor (가상 PC 사양) | Flavor | Nova |
| Image (베이스 이미지) | Image | Glance |
| 물리 네트워크 | Provider Network | Neutron |
| 가상 네트워크 | Network | Neutron |
| 서브넷 | Subnet | Neutron |
| 라우터 | Router | Neutron |
| Port | Port | Neutron |
| 네트워크 QoS | QoS Policy | Neutron |
| 볼륨 타입 | Volume Type | Cinder |
| 볼륨 (디스크) | Volume | Cinder |
| 디스크 QoS | QoS Specs | Cinder |

### CloudX 자체 엔티티 (OpenStack 매핑 없음)

| 엔티티 | 설명 |
|--------|------|
| 가상 PC 그룹 | VM 프로비저닝 설정 묶음 |
| 풀 (Pool) | VM 생성/배치 단위 (전용/공용) |
| 사용자 그룹 | 부서/팀 단위 사용자 묶음 |
| 가상 PC 정책 | 보안/접근/USB 등 정책 허브 |
| 백업/스냅샷 정책 | 자동 백업 스케줄 |
| 템플릿 | Flavor + Image 조합 (CloudX 레벨 추상화) |
| 네트워크 스토리지 (NAS) | Netapp 공유 폴더 |

---

## 관계 카디널리티 요약

| 관계 | 카디널리티 | 비고 |
|------|-----------|------|
| 도메인 → 테넌트 | 1:N | |
| 테넌트 → Zone | 1:N | `host_tnt_yn`에 따라 할당 방식 분기 |
| Zone → 호스트 | 1:N | 호스트는 하나의 Zone에만 소속 |
| 테넌트 → 가상 네트워크 | 1:N | TA가 생성 |
| 네트워크 → 서브넷 | 1:N | |
| 라우터 → 서브넷 (Internal IF) | 1:N | |
| 라우터 → 물리 네트워크 (External GW) | N:1 | |
| 네트워크 → 네트워크 QoS | N:1 | 네트워크에 QoS 적용 |
| 테넌트 → 볼륨 타입 | N:M | 테넌트 상세에서 할당/해제 |
| 볼륨 타입 → 디스크 QoS | 1:1 | VolumeTypeDetail에서 연결 |
| 볼륨 타입 → 볼륨 | 1:N | |
| 템플릿 → Flavor | N:1 | |
| 템플릿 → Image | N:1 | |
| 테넌트 → 사용자 그룹 | 1:N | |
| 사용자 그룹 → 사용자 | 1:N | 계층 구조 지원 |
| 테넌트 → 가상 PC 그룹 | 1:N | |
| 가상 PC 그룹 → 풀 | 1:N | |
| 풀 → VM | 1:N | 전용/공용 분기 |
| VM → 사용자 | N:1 | 전용 PC는 고정, 공용 PC는 자동 배정 |
| VM → 볼륨 | 1:N | OS 디스크 + 개인 디스크 |
| VM → Port → 서브넷 | 1:1:N | Port 자동 생성, IP 할당 |
| 가상 PC 그룹 → 템플릿 | N:1 | 그룹 레벨에서 선택 |
| 가상 PC 그룹 → 가상 PC 정책 | N:1 | 그룹 레벨에서 선택 |
| 가상 PC 그룹 → 백업/스냅샷 정책 | N:1 | 그룹 레벨에서 선택 |
| 풀 → Zone | N:1 | 풀 레벨에서 선택 |
| 풀 → 서브넷 | N:M | 풀 레벨에서 선택 |
| 풀 → 볼륨 타입 | N:1 | 풀 레벨에서 선택 |
