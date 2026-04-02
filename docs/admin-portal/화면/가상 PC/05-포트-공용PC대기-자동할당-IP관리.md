---
type: screen
menu_id: [T0705, T0706, T0707, T0708]
title: 포트 / 공용 PC(대기) / 자동 할당 맵핑 / IP 관리
status: stable
version: v2.2.9
portal: admin
access: [TA]
related_menus: [T0201, T0701]
api_endpoints:
  - GET /v1/resource/port
  - PUT /v1/resource/port/{devId}
  - DELETE /v1/resource/port/{portId}
  - DELETE /v1/resource/vpcs/resources/pooled/usr_vm
  - GET /v1/resource/vpcs/auto/mapping/list
  - GET /v1/resource/vpcs/auto/mapping/info/{id}
  - GET /v1/resource/vpcs/auto/mapping/pool/{id}
  - GET /v1/resource/vpcs/auto/mapping/group/{id}
  - PUT /v1/resource/vpcs/auto/mapping/info/{id}
  - POST /v1/resource/vpcs/auto/mapping
  - DELETE /v1/resource/vpcs/auto/mapping/delete
  - GET /v1/resource/subnets
  - GET /v1/resource/subnets/{sbnId}
  - GET /v1/resource/networks
  - GET /v1/resource/networks/{nwId}
---

# 포트 / 공용 PC(대기) / 자동 할당 맵핑 / IP 관리

가상 PC 하위 메뉴 중 관련성이 높거나 내용이 적은 4개 메뉴를 통합 정리.

모두 TA 전용. `isSuperAdmin` 분기 없음.

---

## 포트 (T0705)

경로: /virtual-pc/portManage

컴포넌트: views/virtualPc/PortManagement.vue

Neutron 포트와 VM의 매핑 관리. 포트 상태 변경(사용/격리) 및 미매핑 포트 삭제.

### 필터

| 필터 | 필드 |
|------|------|
| IP | `ip` |
| VM명 | `vm_nm` |
| MAC 주소 | `mac` |
| 사용자명 | `acct_nm` |

`매핑만 표시` 체크박스: 체크 시 `mapping: 'Y'` (VM에 연결된 포트만), 미체크 시 `mapping: 'N'` (미매핑 포함).

### 테이블 컬럼

| 컬럼 | 필드 | 설명 |
|------|------|------|
| IP | `ip` | — |
| VM | `vm_nm` | — |
| 사용자명 | `acct_nm` | — |
| MAC 주소 | `mac` | — |

### 상태/관리 컬럼 분기

`매핑만 표시` 체크박스 상태(`checked`)가 1차 분기 조건:

| 조건 | 표시 |
|------|------|
| `checked` = false (미체크) | 상태 드롭다운 (USED/ISOLATION). `org_dev_id`/`dev_id` + `vm_nm` 없으면 disabled |
| `checked` = true + `vm_auth_id` 없음 (미매핑) | `제거` 버튼 |

### API

| 동작 | API | 명세 |
|------|-----|------|
| 포트 목록 | `GET /v1/resource/port` (params: `mapping`) | [명세](../../api/resource/vpcs/01-vpcs.md) |
| 포트 상태 변경 | `PUT /v1/resource/port/{devId}` (body: `{ ip, link, port_id }`) | [명세](../../api/resource/vpcs/01-vpcs.md) |
| 포트 제거 | `DELETE /v1/resource/port/{portId}` | [명세](../../api/resource/vpcs/01-vpcs.md) |

### 연관 개념

Neutron 포트 = VM의 네트워크 인터페이스. 서브넷에서 IP를 할당받아 VM에 연결.

[openstack/시스템 자원/04-neutron-네트워크.md](../../openstack/시스템%20자원/04-neutron-네트워크.md) 참고.

---

## 공용 PC 대기 (T0706)

경로: /virtual-pc/public-pc-resource

컴포넌트: views/virtualPc/PublicPcStandByResource.vue

**공용 PC(`V001POO`) 전용** 메뉴. 풀에 반환되어 대기 중인 공용 PC 관리 + 자원 회수.

전용/공용 PC 개념: [docs/term/03-virtual-pc-types.md](../../../term/03-virtual-pc-types.md) 참고.

### 연관 관계

```
사용자 로그아웃 → 공용 PC가 풀로 반환 → "대기" 상태
     │
     ▼
[공용 PC 대기] (T0706)
     ├── 대기 중인 공용 PC 목록 조회
     └── 불필요한 대기 자원 회수 (VM 반환)
```

### 필터

| 필터 | 설명 |
|------|------|
| Pool 선택 | `PublicPcPooledSection` — 공용 Pool만 표시 (`pooled_mtd_cd: 'V001POO'`) |
| 할당 상태 포함 | 체크박스. 체크 시 `alloc_yn: 'Y'`, 미체크 시 `alloc_yn: 'N'` |
| 사용자 그룹 | `usr_grp_nm` |
| 사용자명 | `acct_nm` |

### 테이블 컬럼

| 컬럼 | 필드 | 설명 |
|------|------|------|
| 사용자 그룹 | `usr_grp_nm` | — |
| 사용자명 | `acct_nm` | — |
| VM명 | `vm_nm` | — |
| 가상 PC 상태 | `vm_power_sts_cd` | 상태 아이콘 |
| 예약 할당 시간 | `resrv_alloc_tm` | — |

### 자원 회수

체크박스로 다중 선택 후 `자원 회수` 버튼. 클릭 시 확인 팝업(`isPubPcRecall`) 표시.

조건:
- `isAllowStatus` = false (회수 가능한 상태)
- 최소 1개 이상 선택

파라미터: `vm_auth_ids` (선택한 VM 목록) + `vm_pool_id`

| 동작 | API | 명세 |
|------|-----|------|
| 자원 회수 | `DELETE /v1/resource/vpcs/resources/pooled/usr_vm` | [명세](../../api/resource/vpcs/01-vpcs.md) |

행 클릭: 없음 (상세 화면 없음)

---

## 가상 PC 자동 할당 맵핑 관리 (T0707)

경로: /virtual-pc/autoAssign

컴포넌트: views/virtualPc/AutoAssign.vue

상세: AutoAssignDetail.vue / 생성: AutoAssignCreate.vue

사용자 그룹(부서)과 PC Pool의 자동 매핑 규칙 관리. 사용자가 소속 부서에 따라 자동으로 특정 Pool의 VM을 할당받도록 설정.

### 연관 관계

```
[자동 할당 맵핑] (T0707)
     │
     │  사용자 그룹 ↔ Pool 매핑 규칙 정의
     ▼
사용자 A (영업팀) 로그인 → 영업팀 매핑 규칙 → "영업 Pool"에서 VM 자동 배정
사용자 B (개발팀) 로그인 → 개발팀 매핑 규칙 → "개발 Pool"에서 VM 자동 배정
```

### UI 레이아웃

Split Panel (상하 분할). 상단 목록 + 하단 상세/생성.

### 필터

| 필터 | 필드 |
|------|------|
| 맵핑명 | `dept_pool_map_nm` |
| 설명 | `dept_pool_map_desc` |

### 테이블 컬럼

| 컬럼 | 필드 | 설명 |
|------|------|------|
| 맵핑명 | `dept_pool_map_nm` | — |
| 설명 | `dept_pool_map_desc` | — |
| 연결 Pool 수 | `pool_cnt` | — |
| 연결 사용자그룹 수 | `ugrp_cnt` | — |
| 관리자 ID | `reg_acct_nm` | — |
| 수정 일시 | `mod_ts` | — |

### 버튼

| 버튼 | 설명 |
|------|------|
| 제거 | 선택한 맵핑 규칙 삭제 (다중 선택) |
| 새로운 등록 | 새 맵핑 규칙 생성 → `AutoAssignCreate` 패널 |

### 행 클릭 → 상세 (Split Panel)

행 클릭 시 `AutoAssignDetail` 컴포넌트가 하단에 표시. 3개 탭 구조:

#### 탭 1: 세부 정보

| 필드 | 설명 | 편집 |
|------|------|------|
| 매핑명 (`dept_pool_map_nm`) | 맵핑 규칙 이름 | 편집 모드에서 수정 가능 |
| 설명 (`dept_pool_map_desc`) | 메모 | 편집 모드에서 수정 가능 |

읽기 모드: `수정` / `삭제` 버튼. 편집 모드: `저장` / `취소` 버튼. 탭 전환 시 수정 중이면 확인 팝업.

#### 탭 2: Pool 정보

이 맵핑 규칙에 연결된 Pool 목록.

| 컬럼 | 필드 | 설명 |
|------|------|------|
| 풀명 | `vm_pool_nm` | 클릭 시 `/virtual-pc/virtual-pc-create`로 이동 |
| 할당 VM 수 | `allo_vm_cnt` / `max_vm_cnt` | — |
| CPU 코어 | `vcpu_cnt` | — |
| 메모리 (GB) | `vmm_capa / 1024` | — |
| 디스크 (GB) | `vhd_capa` | — |
| 삭제 | — | 연결 해제 |

`추가` 버튼 → `AutoAssignPopup` 모달 (type: 'pool') — Pool 다중 선택 후 연결.

#### 탭 3: 사용자 그룹 정보

이 맵핑 규칙에 연결된 사용자 그룹(부서) 목록.

| 컬럼 | 필드 | 설명 |
|------|------|------|
| 사용자 그룹 | `usr_grp_nm` | 클릭 시 `/user/group`으로 이동 |
| 그룹 코드 | `dept_cd` | — |
| 사용자 수 | `usr_cnt` | — |
| 삭제 | — | 연결 해제 |

`추가` 버튼 → `AutoAssignPopup` 모달 (type: 'group') — 사용자 그룹 다중 선택 후 연결.

### 신규 등록 (AutoAssignCreate)

`새로운 등록` 버튼 클릭 시 표시.

| 필드 | 설명 | 필수 |
|------|------|------|
| 매핑명 (`dept_pool_map_nm`) | 이름 (최대 40자) | O |
| 설명 (`dept_pool_map_desc`) | 메모 | X |
| Pool 목록 | `추가` 버튼 → `AutoAssignPopup` (type: 'pool') | O (최소 1개) |
| 사용자 그룹 목록 | `추가` 버튼 → `AutoAssignPopup` (type: 'group') | O (최소 1개) |

`등록` / `취소` 버튼.

### API

| 동작 | API | 명세 |
|------|-----|------|
| 맵핑 목록 | `GET /v1/resource/vpcs/auto/mapping/list` | [명세](../../api/resource/vpcs/01-vpcs.md) |
| 맵핑 상세 | `GET /v1/resource/vpcs/auto/mapping/info/{id}` | [명세](../../api/resource/vpcs/01-vpcs.md) |
| 연결 Pool 조회 | `GET /v1/resource/vpcs/auto/mapping/pool/{id}` | [명세](../../api/resource/vpcs/01-vpcs.md) |
| 연결 그룹 조회 | `GET /v1/resource/vpcs/auto/mapping/group/{id}` | [명세](../../api/resource/vpcs/01-vpcs.md) |
| 맵핑 수정 | `PUT /v1/resource/vpcs/auto/mapping/info/{id}` | [명세](../../api/resource/vpcs/01-vpcs.md) |
| 맵핑 등록 | `POST /v1/resource/vpcs/auto/mapping` | [명세](../../api/resource/vpcs/01-vpcs.md) |
| 맵핑 삭제 | `DELETE /v1/resource/vpcs/auto/mapping/delete` | [명세](../../api/resource/vpcs/01-vpcs.md) |

---

## IP 관리 (T0708)

메뉴 트리에 존재하지만 **독립 라우트 없음** — 재사용 컴포넌트로 다른 화면에 임베디드.

컴포넌트: views/virtualPc/components/IpManagement.vue + IpPool.vue

### 임베디드 위치

| 화면 | 용도 |
|------|------|
| 풀 생성 (VirtualPcPoolDetail) | Pool 생성 시 IP 할당 방식 설정 |
| PC 할당 (VirtualPcAssignment) | VM 할당 시 IP 지정 |
| 테넌트 네트워크 생성 (모달) | 네트워크 생성 시 IP 설정 |
| 골든 이미지 생성 상세 | 이미지 생성 VM에 IP 할당 |
| 전용 PC 상세 (PrivateVirtualPcDetail) | 개별 VM IP 수정 |

### 전용/공용 PC에 따른 IP 할당 방식

| 항목 | 전용 PC (`V001DED`) | 공용 PC (`V001POO`) |
|------|-------------------|-------------------|
| IP 타입 (`ip_typ_cd`) | 선택 가능 — 고정(`P006S`) 또는 동적(`P006D`) | **동적(`P006D`) 고정** (읽기 전용, "흐름방식") |
| IP 타입 드롭다운 | ↓ **nw_typ_cd = 'P008VLN'일 때만 활성** | disabled |

### 설정 항목

| 필드 | 설명 | 편집 가능 |
|------|------|----------|
| 서브넷 (`sbn_id`) | 서브넷 선택 | 드롭다운 (prop으로 disabled 제어) |
| IP 타입 (`ip_typ_cd`) | 고정/동적 | 전용 PC만 선택 가능, 공용 PC는 읽기 전용 |
| 네트워크 타입 (`nw_typ_cd`) | P008VLN / P008FLT 등 | 읽기 전용 |
| CIDR | IP 대역 | 읽기 전용 |

### API

| 동작 | API | 명세 |
|------|-----|------|
| 서브넷 목록 | `GET /v1/resource/subnets` | [명세](../../api/resource/networks/01-networks.md) |
| 서브넷 상세 | `GET /v1/resource/subnets/{sbnId}` | [명세](../../api/resource/networks/01-networks.md) |
| 네트워크 목록 | `GET /v1/resource/networks` | [명세](../../api/resource/networks/01-networks.md) |
| 네트워크 상세 | `GET /v1/resource/networks/{nwId}` | [명세](../../api/resource/networks/01-networks.md) |

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|---------|
| v1.0 | 2026-03-31 | 최초 작성 |
