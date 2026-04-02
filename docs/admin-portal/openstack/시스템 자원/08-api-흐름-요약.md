# API 흐름 요약

시스템 자원 메뉴의 전체 API 호출 경로와 OpenStack 서비스 매핑. 코드 검증 기반.

## 호출 경로

```
admin-portal (Vue)
  → app-ms-resource (Spring Boot, REST API)
    ├── 로컬 MariaDB 조회 (MyBatis mapper) ← 목록 조회 대부분
    └── RestTemplate으로 plat-ms-vid4o 호출 ← 생성/수정/삭제 시
          → OpenStack4j
            → OpenStack API (Nova, Neutron, Cinder, Keystone)
```

일부 기능은 app-ms-operation 경유:
- NAS 관리 → `app-ms-operation` → NetApp REST API
- 이메일 설정 → `app-ms-operation` → SMTP
- 정책 관리 → `app-ms-operation` → DB

## 핵심 패턴: 목록 조회 vs 생성/수정

**app-ms-resource는 이중 저장소 구조.** OpenStack에서 생성한 리소스 메타데이터를 로컬 MariaDB에도 저장. 목록 조회는 로컬 DB에서 빠르게 처리하고, 생성/수정/삭제 시에만 plat-ms-vid4o → OpenStack을 호출.

예외: **호스트 목록**은 로컬 DB 없이 항상 plat-ms-vid4o → OpenStack에서 실시간 조회 (호스트 상태가 실시간으로 변하므로).

## OpenStack 서비스별 매핑

### Keystone (Identity)

| 동작 | app-ms-resource API | 데이터 소스 | plat-ms-vid4o API | OpenStack API |
|------|-------|------------|-------|------|
| 도메인 목록 | `GET /v1/resource/domains` | **OpenStack 실시간** | `GET /identity/domains` | Keystone `GET /v3/domains` |
| 테넌트 목록 | `GET /v1/resource/tenants/manager/list/all` | **로컬 DB** | 호출 안 함 | - |
| 테넌트명→ID 변환 | (내부 호출) | **OpenStack** | `GET /identity/tenants/?tenantName=` | Keystone `GET /v3/projects` |
| 테넌트 삭제 | (내부 호출) | **OpenStack** | `DELETE /identity/tenants/{id}` | Keystone `DELETE /v3/projects/{id}` |

### Nova (Compute)

| 동작 | app-ms-resource API | 데이터 소스 | plat-ms-vid4o API | OpenStack API |
|------|-------|------------|-------|------|
| 호스트 목록 | `GET /v1/resource/hosts` | **OpenStack 실시간** | `GET /compute/hosts` | Nova `os.compute().hypervisors().detail()` |
| Zone 목록 | `GET /v1/resource/zones` | **로컬 DB** | 호출 안 함 | - |
| Zone 생성 | `POST /v1/resource/zones` | **DB + OpenStack** | `POST /compute/host-group` | Nova `os.compute().hostAggregates().create()` |
| 호스트 추가 | `PUT /v1/resource/zones/addHost` | **DB + OpenStack** | `POST /compute/host-group/add/{id}` | Nova `hostAggregates().addHost()` |
| 호스트 제거 | `PUT /v1/resource/zones/removeHost` | **DB + OpenStack** | `POST /compute/host-group/remove/{id}` | Nova `hostAggregates().removeHost()` |
| 마이그레이션 목록 | `GET /v1/resource/vpcs/migration` | **로컬 DB** | 호출 안 함 | - |
| 마이그레이션 실행 | (내부 호출) | **OpenStack** | `POST /compute/server/action/migrate/{id}` | Nova `servers().liveMigrate()` |
| HA(대피) 실행 | `POST /v1/resource/evacuate/{id}` | **DB + OpenStack** | `GET /compute/servers` + 비동기 마이그레이션 | Nova VM 조회 후 개별 live-migrate |

### Neutron (Network)

| 동작 | app-ms-resource API | 데이터 소스 | plat-ms-vid4o API | OpenStack API |
|------|-------|------------|-------|------|
| 네트워크 목록 | `GET /v1/resource/networks` | **로컬 DB** | 호출 안 함 | - |
| 네트워크 생성 | `POST /v1/resource/networks` | **DB + OpenStack** | `POST /network/networkl2` | Neutron `POST /v2.0/networks` |
| 서브넷 목록 | `GET /v1/resource/subnets` | **로컬 DB** | 호출 안 함 | - |
| 라우터 목록 | `GET /v1/resource/router` | **로컬 DB** | 호출 안 함 | - |
| QoS 목록 | `GET /v1/resource/networks/qos` | **로컬 DB** | 호출 안 함 | - |
| QoS 생성 | `POST /v1/resource/networks/qos` | **DB + OpenStack** | `POST /network/qos` + `POST /network/qos/{id}/rules` | Neutron QoS API |

### Cinder (Block Storage)

| 동작 | app-ms-resource API | 데이터 소스 | plat-ms-vid4o API | OpenStack API |
|------|-------|------------|-------|------|
| 볼륨 타입 목록 | `GET /v1/resource/storage` | **로컬 DB** | 호출 안 함 | - |
| 볼륨 타입 생성 | `POST /v1/resource/storage` | **DB + OpenStack** | `POST /volume/types` | Cinder `POST /v3/types` |
| 디스크 QoS 목록 | `GET /v1/resource/storage/qos` | **로컬 DB** | 호출 안 함 | - |
| 디스크 QoS 생성 | `POST /v1/resource/storage/qos` | **DB + OpenStack** | `POST /volume/qos-specs` + `PUT /volume/qos-specs/{id}` | Cinder QoS API |
| 볼륨 자원 목록 | `GET /v1/resource/storage/resources/list` | **로컬 DB** | 호출 안 함 | - |

### OpenStack 미경유

| admin-portal 메뉴 | API | 대상 |
|-------------------|-----|------|
| NAS | `/v1/legacy/cloud/ad/sharedfolder/directories` | NetApp (app-ms-operation 경유) |
| Proxy | `/v1/resource/proxy/{L4\|L7}/{admin\|tenant}` | CloudX 자체 관리 |
| 이메일 | `/v1/operation/outs/interfaces/email` | SMTP (app-ms-operation 경유) |

## 데이터 소스 패턴 요약

| 패턴 | 예시 | 설명 |
|------|------|------|
| **OpenStack 실시간** | 호스트 목록, 도메인 목록 | 상태가 실시간으로 변하는 리소스. 매번 OpenStack 직접 조회 |
| **로컬 DB** | Zone/네트워크/서브넷/라우터/QoS/볼륨 목록, 마이그레이션 이력 | 메타데이터가 로컬 DB에 캐싱. 빠른 조회, 페이징/검색 지원 |
| **DB + OpenStack** | Zone/네트워크/QoS/볼륨타입 생성 | OpenStack에 리소스 생성 후 로컬 DB에 메타데이터 저장. 양쪽 동기화 |

## 통신 방식

- app-ms-resource → plat-ms-vid4o: **RestTemplate** (Feign 아님). `viDriverEndpoint` 설정값 기반
- plat-ms-vid4o → OpenStack: **OpenStack4j** 3.11 라이브러리
- plat-ms-vid4o context path: `/VID4Openstack`
- 인증: `RestSupportUtil.createHeaderForDriver()`로 TenantId 헤더 주입
