# Nova — 호스트, Zone, 호스트 그룹

admin-portal 메뉴: 시스템 자원 > Zone(A1002), 호스트(A1003)

## OpenStack Nova

컴퓨트 서비스. VM 인스턴스의 생성, 삭제, 전원 제어, 마이그레이션 등 담당.

### Host (Compute Node, Hypervisor)

VM을 실행하는 물리 서버. `nova-compute` 서비스가 설치된 노드.

| 속성 | 설명 |
|------|------|
| `status` | `enabled` / `disabled` — 관리자가 제어하는 운영 상태 |
| `state` | `up` / `down` — 실제 서비스 가동 여부 (자동 감지) |
| `vcpus` | 총 vCPU 수 |
| `memory_mb` | 총 메모리 (MB) |
| `local_gb` | 총 로컬 디스크 (GB) |
| `running_vms` | 현재 실행 중인 VM 수 |
| `hypervisor_type` | KVM, QEMU, VMware 등 |

`status=disabled`로 설정하면 새 VM이 해당 호스트에 배치되지 않음. 기존 VM은 영향 없음.

### Availability Zone (가용 영역)

호스트를 논리적으로 묶는 그룹. 장애 격리 또는 물리적 위치 기반 분류.

```
Zone-A (데이터센터 1층)
  ├── host-01
  ├── host-02
  └── host-03

Zone-B (데이터센터 2층)
  ├── host-04
  └── host-05
```

- VM 생성 시 AZ를 지정하면 해당 Zone의 호스트에만 배치
- HA 구성: 서로 다른 AZ에 VM을 분산하여 장애 대비

### Host Aggregate (호스트 그룹)

메타데이터 기반 호스트 분류. AZ보다 세밀한 스케줄링 제어.

- AZ는 사용자에게 노출, Host Aggregate는 관리자 전용
- 하나의 Host Aggregate가 하나의 AZ에 매핑 가능
- 메타데이터로 Flavor와 매칭 (예: `ssd=true` → SSD 전용 Flavor)

### CloudX 용어 ↔ OpenStack 용어 매핑

CloudX에서는 Zone을 만들면 Host Aggregate가 같은 이름으로 자동 생성. 1:1 매핑이라 admin-portal에 "호스트 그룹" 별도 메뉴 없음 — Zone 관리 내부에 숨어있음.

```java
// ZoneController.create()
zone.setHost_grp_nm(zone.getZone_nm());  // Zone 이름 = Host Group 이름
```

실제 데이터 예시:
```json
{ "zone_nm": "Default Zone", "host_grp_nm": "Default Zone", "host_grp_id": 6 }
{ "zone_nm": "public-zone",  "host_grp_nm": "public-zone",  "host_grp_id": 20 }
```

`host_grp_id`가 OpenStack의 Host Aggregate ID. 호스트 추가/제거 API에서 이 ID 사용.

| CloudX 용어 | OpenStack 용어 | 관계 | admin-portal 메뉴 |
|------------|---------------|------|-------------------|
| Zone | Availability Zone | 1:1 | 시스템 자원 > Zone (A1002/T1002) |
| 호스트 그룹 | Host Aggregate | 1:1 (Zone과 동시 생성, 같은 이름) | 별도 메뉴 없음 (Zone 내부) |
| 호스트 | Hypervisor (Compute Node) | N:1 (Zone에 여러 호스트) | 시스템 자원 > 호스트 (A1003/T1003) |
| 가상 PC 사양 | Flavor | 1:1 | 템플릿 > 가상 PC 사양 (A0902/T0902) |

### Flavor (가상PC 사양)

VM 인스턴스의 리소스 정의.

| 속성 | 설명 |
|------|------|
| `vcpus` | 가상 CPU 수 |
| `ram` (MB) | 메모리 |
| `disk` (GB) | 루트 디스크 |
| `ephemeral` | 임시 디스크 |

CloudX에서는 "가상 PC 사양" 또는 "템플릿"의 일부로 관리.

## CloudX에서의 사용

### plat-ms-vid4o API

| 메서드 | 경로 | OpenStack API | 설명 |
|--------|------|---------------|------|
| GET | `/compute/hosts` | Nova `GET /os-hypervisors` | 호스트 목록 |
| GET | `/compute/hosts/{hostId}` | Nova `GET /os-hypervisors/{id}` | 호스트 상세 |
| GET | `/compute/host-group` | Nova `GET /os-aggregates` | 호스트 그룹(Aggregate) 목록 |
| POST | `/compute/host-group` | Nova `POST /os-aggregates` | 호스트 그룹 생성 |
| POST | `/compute/host-group/add/{id}` | Nova `POST /os-aggregates/{id}/action` | 호스트 추가 |
| GET | `/compute/spec` | Nova `GET /flavors/detail` | Flavor 목록 |

### admin-portal ↔ OpenStack 매핑

| admin-portal 화면 | OpenStack 리소스 |
|-------------------|-----------------|
| 호스트 관리 (A1003) | Hypervisor 조회 |
| Zone 관리 (A1002) | Host Aggregate + Availability Zone |
| 호스트 추가/제거 | Host Aggregate 멤버십 |

### Zone 관리의 내부 동작

**Zone 목록 조회**는 로컬 DB에서 처리 (OpenStack 미호출):

```
admin-portal GET /v1/resource/zones
  → app-ms-resource ZoneController → ZoneService
    → ZoneMapper.paging() (MariaDB)
    → plat-ms-vid4o 호출 안 함
```

**Zone 생성**은 OpenStack Host Aggregate 생성 + 로컬 DB 저장:

```
admin-portal POST /v1/resource/zones
  → app-ms-resource ZoneService
    → Step 1: HostService.createHostGroup() → plat-ms-vid4o POST /compute/host-group
      → Nova os.compute().hostAggregates().create()
    → Step 2: ZoneMapper.create() (로컬 DB 저장)
    → Step 3: 각 호스트에 대해 HostService.addHostToHostGroup()
      → plat-ms-vid4o POST /compute/host-group/add/{id}
    → Step 4: ZoneAssignHostMapper 업데이트 (로컬 DB)
```

**호스트 추가**는 Host Aggregate에 호스트 멤버 추가 + 로컬 DB 동기화:

```
admin-portal PUT /v1/resource/zones/addHost
  → plat-ms-vid4o POST /compute/host-group/add/{aggregateId}
    → Nova POST /os-aggregates/{id}/action { add_host: hostname }
```

## 테넌트와 Zone의 매핑 — 호스트 테넌트 모드

### DB 구조 (코드 검증 기반)

테넌트 마스터 테이블(`CV_TNT_M`)에 `HOST_TNT_YN`과 `ZONE_NM` 필드 존재:

```
CV_TNT_M:
┌──────────┬───────────────┬──────────────┐
│ TNT_ID   │ ZONE_NM       │ HOST_TNT_YN  │
├──────────┼───────────────┼──────────────┤
│ 테넌트1  │ Default Zone  │ N            │
│ 테넌트2  │ public-zone   │ N            │
└──────────┴───────────────┴──────────────┘
```

### Zone 목록 조회 시 SA/TA 분기 (ZoneMapper.xml)

```java
// ZoneService.paging()
String tnt_id = LocalThread.getTnt_id();     // 현재 사용자의 tnt_id
zone.setTnt_id(tnt_id);
zone.setHostTenant("Y".equals(zoneMapper.isHostTenant(tnt_id)));  // HOST_TNT_YN 조회
```

**SA 조회** (`tnt_id = null`):
- `tnt_id` 조건 자체가 생략 → 전체 Zone 조회 (모든 Zone 표시)

**TA 조회** (`tnt_id` 존재) — `HOST_TNT_YN` 값에 따라 분기:

```xml
<if test="notEmpty(tnt_id)">
    <choose>
        <!-- 호스트 테넌트 모드 -->
        <when test="isHostTenant == true">
            AND A.TNT_ID = #{tnt_id}
        </when>
        <!-- 일반 모드 -->
        <otherwise>
            AND A.ZONE_NM = ( SELECT ZONE_NM FROM CV_TNT_M WHERE TNT_ID = #{tnt_id} )
        </otherwise>
    </choose>
</if>
```

### 호스트 테넌트 모드 (`HOST_TNT_YN = 'Y'`)

Zone 테이블(`CP_ZONE_M`)의 `TNT_ID` 필드로 직접 매칭:

```sql
WHERE A.TNT_ID = #{tnt_id}
```

- Zone이 테넌트에 물리적으로 귀속
- Zone 테이블의 `tnt_id`가 실제로 사용됨

### 일반 모드 (`HOST_TNT_YN = 'N'`)

테넌트 마스터(`CV_TNT_M`)의 `ZONE_NM`으로 매칭:

```sql
WHERE A.ZONE_NM = ( SELECT ZONE_NM FROM CV_TNT_M WHERE TNT_ID = #{tnt_id} )
```

- 테넌트 마스터에 등록된 Zone 이름으로 조인
- Zone 테이블의 `tnt_id`는 사용 안 함 (null이어도 무관)

### 실제 환경 데이터 확인

```
SA가 보는 Zone:
├── Default Zone  (CP_ZONE_M.tnt_id: 테넌트1 ID)
└── public-zone   (CP_ZONE_M.tnt_id: null)

테넌트1(TA)이 보는 Zone:
└── Default Zone  ← CV_TNT_M에서 테넌트1.ZONE_NM = 'Default Zone'

테넌트2(TA)가 보는 Zone:
└── public-zone   ← CV_TNT_M에서 테넌트2.ZONE_NM = 'public-zone'
```

public-zone은 Zone 테이블에서 `tnt_id = null`이지만, 테넌트 마스터에서 테넌트 2의 `ZONE_NM = 'public-zone'`으로 연결되어 있어 테넌트 2에게만 표시.

### 두 모드의 차이 (추측)

`HOST_TNT_YN`의 정확한 비즈니스 의미는 코드에 명시되어 있지 않아 **아래는 추측**:

| 항목 | 호스트 테넌트 (`Y`) | 일반 (`N`) |
|------|-------------------|-----------|
| 호스트 소유 | 테넌트가 물리 호스트 독점 소유 (추측) | Zone 단위로 호스트 공유 가능 (추측) |
| Zone 매핑 | `CP_ZONE_M.TNT_ID`로 직접 귀속 | `CV_TNT_M.ZONE_NM`으로 이름 매핑 |
| 자원 격리 | 물리적 격리 — 다른 테넌트의 VM이 같은 호스트에 배치 불가 (추측) | 논리적 격리 — 같은 호스트에 여러 테넌트 VM 공존 가능 (추측) |
| 적용 시나리오 | 보안 요구사항이 높은 환경 (금융/공공) (추측) | 자원 효율이 중요한 일반 환경 (추측) |
| Zone 테이블 tnt_id | 실제 사용 | 사용 안 함 (null 가능) |
