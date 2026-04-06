# admin-portal Resource MS API 명세서

admin-portal에서 `/v1/resource/` 경로로 호출하는 app-ms-resource API 전체 목록.

## 문서 구조

| 디렉토리 | 설명 | 주요 엔드포인트 |
|---|---|---|
| [vpcs/](vpcs/01-vpcs.md) | VPC 그룹/풀/VM 관리, 번들 할당, 자동 배정, VNC, 포트, 마이그레이션 | `/v1/resource/vpcs/*`, `/v1/resource/port/*`, `/v1/resource/vm/*`, `/v1/resource/vms/*` |
| [hosts/](hosts/01-hosts.md) | 호스트 목록/상세, Zone 관리, 대피(HA) | `/v1/resource/hosts/*`, `/v1/resource/zones/*`, `/v1/resource/evacuate/*` |
| [networks/](networks/01-networks.md) | 네트워크, 서브넷, 네트워크 QoS, 라우터, IP | `/v1/resource/networks/*`, `/v1/resource/subnets/*`, `/v1/resource/router/*` |
| [volumes/](volumes/01-volumes.md) | 볼륨 타입, 볼륨 리소스, 디스크 QoS | `/v1/resource/storage/*` |
| [templates/](templates/01-templates.md) | 템플릿, 골든 이미지, 플레이버, 프록시 | `/v1/resource/template/*`, `/v1/resource/images/*`, `/v1/resource/flavors/*`, `/v1/resource/proxy/*` |
| [snapshot/](snapshot/01-snapshot.md) | 스냅샷, 백업 | `/v1/resource/snapshot/*`, `/v1/resource/backup/*` |
| [disk/](disk/01-disk.md) | 영구 디스크 (사용자 로컬 디스크) | `/v1/resource/disk/local/*` |
| [tenants/](tenants/01-tenants.md) | 테넌트, 테넌트 그룹, 리소스 요청, 도메인, AD 스크립트, 초기화 | `/v1/resource/tenants/*`, `/v1/resource/domains/*`, `/v1/resource/adscript/*`, `/v1/resource/init/*` |
| [vm-authorization/](vm-authorization/01-vm-authorization.md) | VM 인증 (VPC Resources) 목록 조회 | `/v1/resource/vpcs/resources` |
| [pools/](pools/01-pools.md) | 풀 IP, 템플릿 이력, 서브넷, 볼륨 배정 등 풀 부가 기능 | `/v1/resource/vpcs/pool/*` (부가 기능) |
| [migration/](migration/01-migration.md) | 마이그레이션, 대피(Evacuate/HA) | `/v1/resource/vpcs/migration/*`, `/v1/resource/evacuate/*` |

## 공통 사항

### Base URL

```
/v1/resource/
```

### 인증

모든 API는 JWT 인증 토큰 필요.

```
Authorization: Bearer {token}
```

### 공통 Query Parameters (목록 API)

| 파라미터 | 타입 | 설명 |
|---|---|---|
| page | number | 페이지 번호 (1부터 시작) |
| limit | number | 페이지당 항목 수 |
| sort | string | 정렬 기준 필드명 |
| sort_type | string | ASC / DESC |

### 공통 에러 코드

| HTTP 상태 | 설명 |
|---|---|
| 200 | 정상 처리 |
| 400 | 잘못된 요청 파라미터 |
| 401 | 인증 실패 |
| 403 | 권한 없음 |
| 404 | 리소스 없음 |
| 409 | 상태 충돌 |
| 500 | 서버 오류 |

### 관리자 유형별 API 분기

일부 API는 Super Admin / Tenant Admin에 따라 경로가 다르다.

| 유형 | 경로 예시 |
|---|---|
| Super Admin | `/v1/resource/hosts/admin`, `/v1/resource/tenants/manager` |
| Tenant Admin | `/v1/resource/hosts/tenant` |

분기 처리 위치: `views/systemResource/Mixin/host.js`

## 엔드포인트 빠른 참조

### VPC / VM

| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/v1/resource/vpcs/group` | VPC 그룹 목록 |
| POST | `/v1/resource/vpcs/group` | VPC 그룹 등록 |
| GET | `/v1/resource/vpcs/group/{id}` | VPC 그룹 상세 |
| PUT | `/v1/resource/vpcs/group/{id}` | VPC 그룹 수정 |
| DELETE | `/v1/resource/vpcs/group/{id}` | VPC 그룹 삭제 |
| GET | `/v1/resource/vpcs/pool` | VPC 풀 목록 |
| POST | `/v1/resource/vpcs/pool` | VPC 풀 생성 |
| GET | `/v1/resource/vpcs/pool/{id}` | VPC 풀 상세 |
| PUT | `/v1/resource/vpcs/pool/{id}` | VPC 풀 수정 |
| DELETE | `/v1/resource/vpcs/pool/{id}` | VPC 풀 삭제 |
| GET | `/v1/resource/vpcs/resources` | VM 목록 |
| GET | `/v1/resource/vpcs/resources/{id}` | VM 상세 |
| POST | `/v1/resource/vpcs/resources/{id}/start` | VM 시작 |
| POST | `/v1/resource/vpcs/resources/{id}/stop` | VM 중지 |
| POST | `/v1/resource/vpcs/resources/{id}/restart` | VM 재시작 |
| POST | `/v1/resource/vpcs/resources/{id}/vm_terminate` | VM 자원 회수 |
| POST | `/v1/resource/vpcs/resources/vm_assign` | VM 유동 IP 할당 |
| POST | `/v1/resource/vpcs/resources/vm_appoint_assign` | VM 고정 IP 할당 |
| POST | `/v1/resource/vpcs/resources/vm_bundle_assign` | VM 일괄 할당 |
| POST | `/v1/resource/vpcs/resources/vm_scaleup` | VM 자원 증설 |

### 네트워크

| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/v1/resource/networks` | 네트워크 목록 |
| POST | `/v1/resource/networks` | 네트워크 등록 |
| GET | `/v1/resource/networks/{id}` | 네트워크 상세 |
| PUT | `/v1/resource/networks/{id}` | 네트워크 수정 |
| DELETE | `/v1/resource/networks/{id}` | 네트워크 삭제 |
| GET | `/v1/resource/subnets` | 서브넷 목록 |
| POST | `/v1/resource/subnets` | 서브넷 등록 |
| GET | `/v1/resource/subnets/{id}` | 서브넷 상세 |
| GET | `/v1/resource/subnets/{id}/ips` | 서브넷 IP 목록 |
| GET | `/v1/resource/router` | 라우터 목록 |
| POST | `/v1/resource/router` | 라우터 등록 |

### 스토리지

| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/v1/resource/storage` | 볼륨 타입 목록 |
| POST | `/v1/resource/storage` | 볼륨 타입 등록 |
| GET | `/v1/resource/storage/{id}` | 볼륨 타입 상세 |
| PUT | `/v1/resource/storage/{id}` | 볼륨 타입 수정 |
| DELETE | `/v1/resource/storage/{id}` | 볼륨 타입 삭제 |
| GET | `/v1/resource/storage/qos` | 디스크 QoS 목록 |
| POST | `/v1/resource/storage/qos` | 디스크 QoS 등록 |

### 템플릿 / 이미지 / 플레이버

| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/v1/resource/template` | 템플릿 목록 |
| POST | `/v1/resource/template` | 템플릿 등록 |
| GET | `/v1/resource/template/{id}` | 템플릿 상세 |
| GET | `/v1/resource/images` | 이미지 목록 |
| POST | `/v1/resource/images/convert` | 이미지 변환 |
| GET | `/v1/resource/flavors` | 플레이버 목록 |
| POST | `/v1/resource/flavors` | 플레이버 등록 |

### 테넌트

| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/v1/resource/tenants` | 테넌트 목록 |
| GET | `/v1/resource/tenants/{id}` | 테넌트 상세 |
| GET | `/v1/resource/tenants/manager` | 테넌트 관리자 목록 |
| GET | `/v1/resource/tenants/manager/list/all` | 테넌트 전체 목록 |
| GET | `/v1/resource/tenants/groups` | 테넌트 그룹 목록 |
| GET | `/v1/resource/domains` | 도메인 목록 |

### 호스트 / Zone / 마이그레이션

| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/v1/resource/hosts/admin` | 호스트 목록 (Super Admin) |
| GET | `/v1/resource/hosts/tenant` | 호스트 목록 (Tenant Admin) |
| GET | `/v1/resource/zones` | Zone 목록 |
| POST | `/v1/resource/zones` | Zone 생성 |
| POST | `/v1/resource/vpcs/migration/multi` | 마이그레이션 실행 |
| GET | `/v1/resource/evacuate` | 대피 목록 |
| POST | `/v1/resource/evacuate/{host_id}` | 대피 수동 실행 |

### 스냅샷 / 백업 / 디스크

| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/v1/resource/snapshot/{vmAuthId}` | 스냅샷 목록 |
| POST | `/v1/resource/snapshot/execSnapshot/{vmAuthId}` | 스냅샷 생성 |
| PUT | `/v1/resource/snapshot/restore/{vmAuthId}/{snapId}` | 스냅샷 복원 |
| GET | `/v1/resource/backup/backup/{diskId}` | 백업 목록 |
| POST | `/v1/resource/backup/execBackup/{diskId}` | 백업 실행 |
| GET | `/v1/resource/disk/local/{acctId}` | 사용자 디스크 목록 |
| DELETE | `/v1/resource/disk/local` | 디스크 삭제 |

