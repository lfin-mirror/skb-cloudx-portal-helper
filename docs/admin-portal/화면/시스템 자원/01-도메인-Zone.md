---
type: screen
title: 도메인 / Zone
menu_id: [A1001, A1002, T1002]
status: stable
version: v2.2.10
portal: admin
path: /system-resource/domain
component: Zone.vue
component_sa: Domain.vue
access: [SA, TA]
related_menus: [A1003, T1003]
api_endpoints:
  - GET /v1/resource/domains
  - GET /v1/resource/tenants/manager
  - GET /v1/resource/zones
  - GET /v1/resource/zones/{zoneNm}
  - POST /v1/resource/zones
  - PUT /v1/resource/zones/{zoneNm}
  - DELETE /v1/resource/zones/{zoneNm}
  - PUT /v1/resource/zones/addHost
  - PUT /v1/resource/zones/removeHost
  - GET /v1/resource/hosts/admin/unassigned
  - GET /v1/resource/hosts/tenant/unassigned
---

# 도메인 / Zone

논리 구조 관련 메뉴. 도메인 → 테넌트 → Zone → 호스트 계층.

## 연관 관계

- [테넌트 관리](../테넌트/01-테넌트.md) — 테넌트에 Zone 할당
- [호스트 관리](02-호스트-마이그레이션-HA.md) — Zone에 호스트 배치
- [OpenStack Zone 개념](../../openstack/시스템%20자원/02-nova-호스트와-zone.md)

---

## 도메인 (A1001)

SA 전용 (TA 메뉴에 없음).

경로: /system-resource/domain

컴포넌트: views/systemResource/Domain.vue

도메인 및 소속 테넌트 조회. 읽기 전용.

### UI 레이아웃

Split Panel 구조:
- 좌측: 도메인 정보 카드 (도메인명, 설명)
- 우측: 소속 테넌트 목록 카드 (테넌트 방법, 테넌트명)

도메인 카드 클릭 → 우측에 해당 도메인의 테넌트 목록 표시.

### 도메인 정보 필드

| 화면 라벨 | 필드 | 비고 |
|----------|------|------|
| 도메인명 (`list.systemResource.domainName`) | `dm_nm` | |
| 설명 (`list.systemResource.domainDesc`) | `dm_descp` | |

### 테넌트 카드 필드

| 화면 라벨 | 필드 | 비고 |
|----------|------|------|
| 테넌트 방법 (`list.systemResource.tenantMethod`) | `tnt_mtd_nm` | |
| 테넌트명 (`list.systemResource.tenantName`) | `tnt_nm` | 클릭 시 테넌트 상세로 이동하지 않음 |

### API

| 동작 | 메서드 | 경로 | 명세 |
|------|--------|------|------|
| 도메인 목록 | GET | `/v1/resource/domains` | (미작성) |
| 테넌트 목록 | GET | `/v1/resource/tenants/manager?dm_id={dm_id}` | [명세](../../api/resource/tenants/01-tenants.md) |

---

## Zone (A1002, T1002)

경로: /system-resource/zone

컴포넌트: views/systemResource/Zone.vue

Zone 목록 조회 및 관리. SA/TA 공통 메뉴.

### 검색 조건

| 검색 항목 | 필드 | 비고 |
|----------|------|------|
| 유형 | 셀렉트박스 (코드 P007) | |
| Zone명 (`zone_nm`) / 호스트 (`host_nm`) | 텍스트 | 검색 타입 선택 |

### SA vs TA 차이

| 항목 | 세부 항목 | SA | TA |
|------|----------|----|----|
| **범위** | — | 전체 Zone 관리 | 자기 테넌트 Zone만 |
| **등록 버튼** | — | `v-if="isSuperAdmin"` — N모드에서 Zone 추가 | `v-if="!isSuperAdmin"` — Y모드에서 Availability Zone 추가 |
| **호스트 추가/제거** | — | 가능 | 가능 |
| **Zone 삭제** | — | 가능 | 가능 |
| **Zone 상세 편집** | `form.tnt_id` 조건 | 편집 가능 (자기 Zone) | `form.tnt_id`가 자기 테넌트인 경우만 편집 가능 |
| | ↓ **TA: host_tnt_yn 값에 따라 조회 쿼리 분기** | | |
| **TA Zone 조회** | `host_tnt_yn = 'N'` (일반) | — | `CV_TNT_M.ZONE_NM`으로 이름 매핑된 Zone만 표시 |
| | `host_tnt_yn = 'Y'` (호스트 테넌트) | — | `CP_ZONE_M.TNT_ID`로 직접 귀속된 Zone만 표시 |

### 테이블 컬럼

| 화면 라벨 | 필드 | 정렬 |
|----------|------|------|
| Zone명 (`list.systemResource.zoneName`) | `zone_nm` | O |
| 호스트 (`list.systemResource.host`) | `hostNames` (결합 문자열) | O |
| 생성자 (`list.common.creator`) | `reg_conn_id` | O |
| 생성일시 (`list.common.createDate`) | `reg_ts` | O |

### 행 클릭 → Zone 상세 (ZoneDetail)

| 필드 | 설명 | 편집 |
|------|------|------|
| Zone명 (`zone_nm`) | Zone 이름 | disabled |
| 호스트 목록 (`host_list`) | 테이블: 호스트명, IP, vCPU, 메모리, 스토리지, Zone | 추가/제거로 관리 |
| 설명 (`zone_descp`) | textarea | 편집 가능 |

### 버튼 동작

| 버튼 | 노출 조건 | 클릭 시 동작 |
|------|----------|------------|
| **호스트 설정** | 상세 화면 내 | CommonMultiModal로 미할당 호스트 선택 → `PUT /v1/resource/zones/addHost` |
| **제거** (호스트 행) | 상세 화면 내 | 확인 팝업 → `PUT /v1/resource/zones/removeHost` |
| **수정** | 상세 화면 하단 | `PUT /v1/resource/zones/{zoneNm}` |
| **삭제** | 상세 화면 하단 | 확인 팝업 → `DELETE /v1/resource/zones/{zoneNm}` |

### Zone 등록 (ZoneCreate)

| 필드 | 설명 | 필수 |
|------|------|------|
| Zone명 (`zone_nm`) | Zone 이름 | 필수 |
| 호스트 선택 (`host_list`) | CommonMultiModal로 미할당 호스트 선택 | 필수 |
| 설명 (`zone_descp`) | textarea | — |

미할당 호스트 조회 API 분기:
- SA: `GET /v1/resource/hosts/admin/unassigned`
- TA: `GET /v1/resource/hosts/tenant/unassigned`

### API

| 동작 | API | 명세 |
|------|-----|------|
| 목록 조회 | `GET /v1/resource/zones` | (미작성) |
| 상세 조회 | `GET /v1/resource/zones/{zoneNm}` | (미작성) |
| 생성 | `POST /v1/resource/zones` | (미작성) |
| 수정 | `PUT /v1/resource/zones/{zoneNm}` | (미작성) |
| 삭제 | `DELETE /v1/resource/zones/{zoneNm}` | (미작성) |
| 호스트 추가 | `PUT /v1/resource/zones/addHost` | (미작성) |
| 호스트 제거 | `PUT /v1/resource/zones/removeHost` | (미작성) |
| 미할당 호스트 (SA) | `GET /v1/resource/hosts/admin/unassigned` | [명세](../../api/resource/hosts/01-hosts.md) |
| 미할당 호스트 (TA) | `GET /v1/resource/hosts/tenant/unassigned` | [명세](../../api/resource/hosts/01-hosts.md) |

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|---------|
| v1.1 | 2026-04-01 | 화면 라벨(i18n) 병기, 검색 조건, 행 클릭 상세, 버튼 동작, Zone 등록 폼, 연관 관계 추가 |
| v1.0 | 2026-03-31 | 최초 작성 |
