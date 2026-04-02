# Keystone — 도메인과 테넌트

admin-portal 메뉴: SA > 시스템 자원 > 도메인 (A1001)

## OpenStack Keystone

OpenStack의 인증/인가 서비스. 사용자, 프로젝트, 역할, 서비스 카탈로그 관리.

### 계층 구조

```
Domain (도메인)
  └── Project (프로젝트 = 테넌트)
        ├── Users (사용자)
        ├── Roles (역할)
        └── Resources (VM, 네트워크, 볼륨 등)
```

### Domain

- Identity v3의 최상위 격리 단위
- 사용자, 프로젝트를 논리적으로 그룹핑하는 네임스페이스
- 기본 도메인: `default`
- CloudX에서는 보통 단일 도메인 사용

### Project (Tenant)

- Domain 내 리소스 격리 단위
- VM, 네트워크, 볼륨 등 모든 리소스의 소유 주체
- 쿼터(할당량)로 리소스 사용량 제한
- OpenStack에서는 Project, CloudX에서는 Tenant로 호칭

## CloudX에서의 사용

### 도메인 조회 — OpenStack 실시간 조회

```
admin-portal GET /v1/resource/domains
  → app-ms-resource DomainController → DomainService
    → RestTemplate으로 plat-ms-vid4o 호출
      → GET /VID4Openstack/identity/domains
        → IdentityController → Vid4oIdentityService
          → OpenStack4j os.identity().domains().list()
            → Keystone GET /v3/domains
```

app-ms-resource는 Feign이 아닌 **RestTemplate**으로 plat-ms-vid4o 호출. `viDriverEndpoint` 설정값(`application-local.yaml`)으로 URL 구성.

### 테넌트 목록 조회 — 로컬 DB 조회

```
admin-portal GET /v1/resource/tenants/manager/list/all
  → app-ms-resource TenantManagerController → TenantManagerService
    → MyBatis mapper로 로컬 MariaDB 직접 조회
    → plat-ms-vid4o 호출 없음
```

테넌트 메타데이터는 app-ms-resource의 로컬 DB에 저장. 목록/페이징 조회 시 OpenStack 미경유.

plat-ms-vid4o를 통해 Keystone을 호출하는 테넌트 관련 동작:
- `ResourceComponent.getTenantId()` — 테넌트 이름 → OpenStack Project ID 변환 시
- `ResourceComponent.deleteTenant()` — OpenStack에서 Project 삭제 시

### 도메인 화면 (A1001)

SA 전용 읽기 전용 뷰. 도메인 목록 + 소속 테넌트 목록 조회.

- `GET /v1/resource/domains` → 도메인 목록 (OpenStack Keystone 실시간 조회)
- `GET /v1/resource/tenants/manager?dm_id={dm_id}` → 테넌트 목록 (로컬 DB 조회)

### plat-ms-vid4o API (IdentityController)

| 메서드 | 경로 | OpenStack API | 호출 시점 |
|--------|------|---------------|----------|
| GET | `/identity/domains` | Keystone `GET /v3/domains` | 도메인 목록 조회 |
| GET | `/identity/tenants/?tenantName={name}` | Keystone `GET /v3/projects` | 테넌트명→ID 변환 |
| DELETE | `/identity/tenants/{tenantId}` | Keystone `DELETE /v3/projects/{id}` | 테넌트 삭제 |

### VO 구조

- `ListDomainOutVO`: domainId, domainName, description (OpenStack4j Domain 객체에서 매핑)
- `TenantAllList` / `TenantManagerList`: 로컬 DB 엔티티 (OpenStack VO 아님)

## 핵심 개념

| 용어 | OpenStack | CloudX |
|------|-----------|--------|
| Domain | 최상위 네임스페이스 | 도메인 (SA만 조회) |
| Project | 리소스 격리 단위 | 테넌트 (TA가 소속되는 단위) |
| Tenant Admin | - | 특정 Project에 소속된 관리자 |
| Super Admin | cloud_admin 역할 | 전체 Domain/Project 관리 |
