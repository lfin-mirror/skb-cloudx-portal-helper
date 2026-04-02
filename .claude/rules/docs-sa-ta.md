---
globs: docs/admin-portal/화면/**/*.md
---

# 화면 문서 규칙

## 폴더 구조

- `화면/` 하위의 폴더·파일명은 **한글**로 작성 (메뉴 트리의 `menu_nm` 기준).
- 폴더 구조는 사이드바 메뉴 트리의 대메뉴 계층을 따름.
- SA/TA 공통 메뉴는 **단일 파일에 양쪽을 모두 기술**. SA/TA 별도 파일을 만들지 않는다.

## 메뉴 트리 조회

mock 서버에서 메뉴 트리 데이터 조회:
- SA: `curl -H 'Authorization: Bearer mock-sa-token' -H 'X-CloudPC-Request-Poc: POCADMIN' http://localhost:3000/api/v1/user/admin/groups/menus`
- TA: `curl -H 'Authorization: Bearer mock-ta-token' -H 'X-CloudPC-Request-Poc: POCADMIN' http://localhost:3000/api/v1/user/admin/groups/menus`

## 화면 문서 구성

각 화면 문서에 포함할 내용:
- 메뉴 ID, 경로, 컴포넌트명
- UI 레이아웃 (폼/리스트/Split Panel 등)
- 테이블 컬럼 (필드명, 설명)
- 설정 항목 (필드명, 값, 조건부 활성화)
- SA vs TA 차이 (있는 경우)
- API 목록 (동작, 경로)
- 다른 메뉴와의 연결 관계 (있는 경우)
- **행 클릭/상세/모달** — 목록 화면뿐 아니라 행 클릭 시 열리는 상세 화면(Split Panel, 좌측 폼 등)의 폼 필드·설정 항목도 기술. 모달/팝업이 있으면 트리거 버튼, 모달 내 폼 필드, 확인 팝업 메시지 등 포함.
- **버튼 동작** — 각 버튼의 클릭 시 동작(API 호출, 모달 표시, 확인 팝업 등)과 disabled/노출 조건을 구체적으로 기술. "등록 버튼"으로만 끝내지 않고 어떤 모달이 열리는지, 어떤 API를 호출하는지까지.

## 필드명 표기

- 필드명은 **화면 라벨(i18n 기준)**을 우선 표기하고 괄호 안에 코드 필드명을 병기.
  - O: `호스트 설정 (host_tnt_yn)`
  - O: `최대 CPU 설정 (vcpu_psb_cnt)`
  - X: `host_tnt_yn` (라벨 없이 코드만)
  - X: `HOST_TNT_YN` (DB 컬럼명만)
- 화면 라벨은 컴포넌트의 `$t()` 호출이나 하드코딩된 텍스트에서 확인.
- 테이블 컬럼도 동일 — 화면에 표시되는 컬럼 헤더를 기준으로 작성.

## 메뉴 그룹핑

- 메뉴 별 파일 1개가 원칙.
- 내용이 적거나 관련된 메뉴는 하나의 파일로 통합 가능.
- 통합 시 메뉴 간 관계/차이점을 명시.
- 대메뉴 하위 메뉴가 많을 때 한 파일에 통합 정리 가능 (예: TA 시스템 자원 통합).

## SA/TA 구분 — 반드시 코드 기반으로 상세 작성

SA/TA 공통 메뉴(같은 컴포넌트를 공유하는 화면)를 문서화할 때, **반드시 컴포넌트 코드를 읽고** `isSuperAdmin` 조건 분기를 전수 조사하여 아래 내용을 빠짐없이 기술:

- 각 필드/버튼/섹션이 SA/TA에서 **편집 가능 / disabled / 비노출** 중 어디에 해당하는지 표로 정리.
- 표 구조는 `항목 | 세부 항목 | SA | TA` 4컬럼. 관련 세부 항목을 상위 항목 아래 그룹핑 (예: "호스트 설정" 아래에 사용/미사용, 제한 없음, 최대 CPU, 최대 메모리 등).
- `v-if="isSuperAdmin"` (SA에서만 노출), `v-if="!isSuperAdmin"` (TA에서만 노출), `:disabled="!isSuperAdmin"` (TA에서 disabled) 등 조건을 구분.
- SA 전용 버튼 (삭제, 설정, 추가 등)이 TA에서 비노출되는 경우 명시.
- TA 전용 섹션 (`v-if="!isSuperAdmin"`)이 있으면 별도로 기술.
- 같은 테이블이라도 SA/TA에서 보이는 컬럼이 다르면 (`v-if="isSuperAdmin"`, `v-if="!isSuperAdmin"`) 각각 정리.
- API 경로가 SA/TA에서 다르면 (예: `/admin` vs `/tenant`) 양쪽 모두 기재.
- "대충 조회만 가능"으로 끝내지 않고, **어떤 설정은 편집 가능하고 어떤 설정은 불가한지** 필드 단위로 명확히 구분.
- **분기 조건(v-if/v-show)도 세밀히 조사하여 표에 반영**. `isSuperAdmin` 외에도 데이터 값에 따라 노출/비노출되는 섹션이 있으면 `↓ **조건일 때만 노출**` 형태로 표 안에 구분선을 넣어 표기. 예: `host_tnt_yn === 'Y'`, `ad_itlk_usg_yn !== 'N'`, 특정 코드값 등.

## 연관 관계 기술

- 화면 문서 작성 시 해당 메뉴와 연관된 **다른 화면 메뉴**, **OpenStack/인프라 개념**, **테넌트 설정 항목** 등의 관계를 명시.
- 단순 링크가 아니라, 각 메뉴가 어떤 역할(정의/할당/운영 등)을 담당하는지 구분하여 기술.
- 연관 관계가 있으면 계층 다이어그램이나 비유를 함께 작성하여 이해를 도움.

## 단일 파일 내 SA/TA 기술

- SA/TA 공통 메뉴는 하나의 파일에서 기술. 공통 부분을 먼저 쓰고, `## SA vs TA 차이` 섹션에 4컬럼 표로 차이를 정리.
- SA 전용 메뉴(TA에 없음)는 파일 상단에 `SA 전용 (TA 메뉴에 없음)` 명시.
- TA 전용 메뉴(SA에 없음)는 파일 상단에 `TA 전용 (SA 메뉴에 없음)` 명시.

## 개요 문서

- `개요/` 폴더에 `00-SA 메뉴 개요.md`, `00-TA 메뉴 개요.md` 배치.
- 개요 문서에는 대메뉴별 문서 링크 + 핵심 한 줄 요약 + 미작성 메뉴 목록.

## frontmatter

모든 문서 최상단에 YAML frontmatter 필수. `---`로 감싸서 본문 앞에 배치.
`type` 필드로 문서 성격을 구분하고, 타입별로 스키마가 다르다.

### 전 타입 공통 필수 필드

| 필드 | 설명 |
|------|------|
| `type` | `screen` / `flow` / `internal` / `concept` |
| `title` | 문서 제목 |
| `status` | `stable` / `draft` / `planned` |
| `version` | 반영 버전 (예: `v2.2.9`) |

### type: screen (화면 문서)

admin-portal은 SA/TA 구분, user-portal은 구분 없음.

admin 추가 필수: `portal: admin`, `menu_id`, `access`
user 추가 필수: `portal: user`

선택: `path`, `component` / `component_sa` / `component_ta`, `tags`, `related_menus`, `api_endpoints`, `pending_changes`

```yaml
# admin-portal
---
type: screen
menu_id: [A0503, T0503]
title: 가상 PC 정책
status: stable
version: v2.2.9
portal: admin
path: /policy/virtual-pc-auth-policy
component_sa: VirtualPcAuthPolicySupadm.vue
component_ta: VirtualPcAuthPolicy.vue
access: [SA, TA]
api_endpoints:
  - GET /v1/operation/cert/secu/grps
---

# user-portal
---
type: screen
title: Cloud PC 신청
status: stable
version: v2.2.9
portal: user
path: /:tenant/vpcinfo/vpc-req
component: VPcReqList.vue
api_endpoints:
  - GET /v1/user/work/request
---
```

### type: flow (흐름 문서)

여러 화면을 관통하는 시퀀스. 추가 필수: `portal`
선택: `screens`, `related_docs`, `api_endpoints`

### type: internal (내부 구조 문서)

코드 아키텍처 설명. 추가 필수: `portal`, `source_files`
선택: `used_by`

### type: concept (용어/개념 문서)

배경 지식. 추가 필수: `tags`
선택: `related_screens`

### status 전환 규칙

- v2 브랜치: 항상 `status: stable`
- feature 브랜치: `status: draft` + `pending_changes` 추가
- 머지 시: `status: stable`로 변경, `version` 업데이트, `pending_changes` 제거

## 변경 이력

- 모든 화면 문서 하단에 `## 변경 이력` 섹션 필수.
- 형식: `| 버전 | 날짜 | 변경 내용 |`
