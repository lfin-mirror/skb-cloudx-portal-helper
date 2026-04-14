---
name: docs-release
description: 릴리스 버전 간 diff를 분석하여 화면 문서, API 명세, OpenAPI, changelog를 업데이트하는 파이프라인 오케스트레이터. 'v2.2.11 문서 업데이트', '릴리스 문서', '버전 업데이트 문서화', '경로 B', 'changelog 작성', '릴리스 반영' 요청 시 사용.
---

# Docs Release — 릴리스 문서 업데이트 오케스트레이터

코드만 머지된 릴리스의 변경사항을 분석하고, 화면 문서·API 명세·mock 서버·OpenAPI·changelog를 업데이트하는 6단계 파이프라인.

## 입력

사용자로부터 아래 정보를 받는다:

| 필수 | 항목 | 예시 |
|------|------|------|
| O | 이전 버전 | `v2.2.10` |
| O | 신규 버전 | `v2.2.11` |
| - | 업데이트 내역 (JIRA 테이블) | 있으면 Phase 1 가속 |
| - | 특정 레포만 지정 | `admin-portal만` |

버전은 git 태그 또는 브랜치명. 태그 미존재 시 브랜치 HEAD 기준.

## 에이전트

| 에이전트 | 파일 | Phase |
|---------|------|-------|
| `release-analyst` | `.claude/agents/release-analyst.md` | 0, 1 |
| `doc-updater` | `.claude/agents/doc-updater.md` | 2, 3 |
| `mock-updater` | `.claude/agents/mock-updater.md` | 4 |
| `release-finalizer` | `.claude/agents/release-finalizer.md` | 5 |

## 파이프라인

```
Phase 0: Diff 추출
  release-analyst 1개
  → 5개 레포 git diff 추출 (admin-portal, user-portal, app-ms-resource, app-ms-operation, plat-ms-vid4o)
  → _workspace/00_release-impact.md

Phase 1: 영향 분석
  release-analyst (동일 에이전트, resume)
  → 변경 파일 → 화면 문서 + API 명세 매핑
  → _workspace/00_release-impact.md 에 영향 문서 목록 추가

  ↓ 사용자 확인 게이트

Phase 2: FE 기반 문서 업데이트 (doc-updater × N, 병렬)
  - admin-screen: admin-portal 화면 문서
  - admin-api: admin-portal API 명세 (FE axios 호출 기반 1차)
  - user-screen: user-portal 화면 문서
  - user-api: user-portal API 명세 (FE axios 호출 기반 1차)
  → _workspace/02_update-report-{영역}.md

  ↓ 사용자 확인 게이트

Phase 3: BE 기반 API 명세 보강 (doc-updater × N, 병렬)
  - resource-api: app-ms-resource Controller/DTO 기반 API 명세 업데이트
  - operation-api: app-ms-operation Controller/DTO 기반 API 명세 업데이트
  → _workspace/03_update-report-{영역}.md

  ↓ 사용자 확인 게이트

Phase 3.5: API 품질 검증 (api-quality 스킬 연계)
  - dto-review: BE DTO ↔ API 명세 대조 → 불일치 수정
  - consistency: fixture ↔ 명세 ↔ OpenAPI 3-way 검증 → 동기화

  ↓ 사용자 확인 게이트

Phase 4: Mock 서버 업데이트 (mock-updater × N, 병렬)
  - admin-portal: fixture/handler 추가·수정
  - user-portal: fixture/handler 추가·수정
  → _workspace/04_mock-update-report-{포털}.md

  ↓ 사용자 확인 게이트

Phase 5: 마무리 (release-finalizer)
  → frontmatter version 업데이트
  → 변경 이력 추가
  → changelog 작성 (mock 서버 변경사항 포함)
  → OpenAPI version + schema 업데이트
  → _workspace/05_finalize-report.md
```

## Phase 2 도메인 분할 (FE 기반)

영향 분석 결과에 따라 동적으로 분할. FE 소스(Vue 컴포넌트, axios 호출)를 읽고 화면 문서와 API 명세를 1차 업데이트.

| # | 영역 | 소스 | 대상 |
|---|------|------|------|
| 1 | admin-screen | admin-portal `src/views/`, `src/components/` | 화면 문서 (`docs/admin-portal/화면/`) |
| 2 | admin-api | admin-portal `src/api/`, 컴포넌트 내 axios 호출 | API 명세 (`docs/admin-portal/api/`) |
| 3 | user-screen | user-portal `src/views/`, `src/components/` | 화면 문서 (`docs/user-portal/`) |
| 4 | user-api | user-portal `src/api/`, 컴포넌트 내 axios 호출 | API 명세 (`docs/user-portal/api/`) |

변경이 없는 영역은 스킵. 소규모(3개 미만)면 영역을 합친다.

## Phase 3 도메인 분할 (BE 기반)

Phase 2에서 1차 작성된 API 명세를 BE 소스로 보강. Controller → DTO 추적 → 응답 필드 표 정확도 향상.

| # | 영역 | 소스 | 대상 |
|---|------|------|------|
| 1 | resource-api | `app-ms-resource` `rest/`, `dto/`, `vo/`, `mapper/` | `docs/*/api/resource/` |
| 2 | operation-api | `app-ms-operation` `rest/`, `dto/`, `vo/`, `mapper/` | `docs/*/api/operation/` |

Phase 2에서 API 명세 변경이 없었으면 Phase 3도 스킵.

## Phase 3.5 API 품질 검증

기존 `api-quality` 스킬을 연계하여 API 명세의 정합성을 검증.

| 모드 | 대상 | 역할 |
|------|------|------|
| dto-review | Phase 3에서 수정/생성된 API 명세 | BE DTO와 명세 필드 대조, 불일치 수정 |
| consistency | 전체 변경된 API 명세 | fixture ↔ 명세 ↔ OpenAPI 3-way 검증, 동기화 |

API 변경이 없었으면 Phase 3.5도 스킵.

## Phase 4 Mock 서버 업데이트

Phase 2~3.5에서 확정된 API 명세를 기반으로 mock-server의 fixture/handler를 동기화. 포털별로 병렬 실행.

| # | 영역 | 대상 | 작업 |
|---|------|------|------|
| 1 | admin-portal | `mock-server/admin-portal/` | fixture 추가/수정 + handler 등록/수정 + codeMap 업데이트 |
| 2 | user-portal | `mock-server/user-portal/` | fixture 추가/수정 + handler 등록/수정 |

해당 포털에 API 변경이 없으면 스킵.

## Phase 2 vs 3 역할 분리

| Phase | 소스 | 관점 | 결과 |
|-------|------|------|------|
| 2 (FE 기반) | Vue 컴포넌트, axios 호출 | 화면에서 어떤 API를 호출하는지, 요청 파라미터 | 화면 문서 `## API` 섹션, API 명세 경로/동작 |
| 3 (BE 기반) | Controller, DTO, VO, Mapper | 실제 응답 필드, 타입, 상속 체인 | API 명세 응답 필드 표, 신규 API 명세 |
| 3.5 (검증) | fixture, 명세, OpenAPI | 3자 정합성 | 불일치 수정, OpenAPI schema 반영 |
| 4 (Mock) | 확정된 API 명세 | mock-server fixture/handler 동기화 | fixture 추가/수정, handler 등록/수정 |

## 오케스트레이터 실행 로직

### Phase 0+1 실행

```python
analyst = Agent(
    subagent_type="general-purpose",
    prompt=f"""
    {release-analyst.md 내용}
    이전 버전: {old_version}
    신규 버전: {new_version}
    레포 경로: /Users/jay/skb/cloudx/
    대상 레포: admin-portal, user-portal, app-ms-resource, app-ms-operation, plat-ms-vid4o

    Phase 0: 각 레포에서 diff 추출 (FE + BE 모두)
    Phase 1: 변경 파일 → 기존 문서 매핑
    결과를 _workspace/00_release-impact.md에 작성하라.

    references/phase0-recon.md, references/phase1-impact.md 참조.
    """,
    model="opus"
)
```

### Phase 2 실행 (FE 기반, 병렬)

```python
for domain in [admin-screen, admin-api, user-screen, user-api]:
    Agent(
        subagent_type="general-purpose",
        prompt=f"""
        {doc-updater.md 내용}
        담당 영역: {domain.name}
        담당 문서: {domain.docs}
        변경 소스: {domain.fe_sources}
        버전: {old_version} → {new_version}
        references/phase2-update.md 참조.
        """,
        model="opus",
        run_in_background=True
    )
```

### Phase 3 실행 (BE 기반, 병렬)

```python
for domain in [resource-api, operation-api]:
    Agent(
        subagent_type="general-purpose",
        prompt=f"""
        {doc-updater.md 내용}
        담당 영역: {domain.name}
        담당 문서: Phase 2에서 수정/생성된 API 명세
        변경 소스: {domain.be_sources} (Controller → DTO 추적)
        버전: {old_version} → {new_version}
        references/phase3-be-api.md 참조.
        """,
        model="opus",
        run_in_background=True
    )
```

### Phase 3.5 실행 (api-quality 연계)

```python
# api-quality 스킬의 dto-review + consistency 모드를 순차 실행
# 변경된 API 명세 슬라이스만 대상
Skill("api-quality", args="dto-review 대상: Phase 3에서 수정된 API 명세")
Skill("api-quality", args="consistency 대상: 변경된 API 명세")
```

### Phase 4 실행 (Mock 서버, 병렬)

```python
for portal in [admin-portal, user-portal]:
    Agent(
        subagent_type="general-purpose",
        prompt=f"""
        {mock-updater.md 내용}
        담당 포털: {portal}
        변경된 API 명세: _workspace/02_update-report-*.md, _workspace/03_update-report-*.md에서 추출
        버전: {old_version} → {new_version}
        references/phase4-mock.md 참조.
        """,
        model="opus",
        run_in_background=True
    )
```

### Phase 5 실행

```python
Agent(
    subagent_type="general-purpose",
    prompt=f"""
    {release-finalizer.md 내용}
    버전: {old_version} → {new_version}
    날짜: {today}

    _workspace/00_release-impact.md, _workspace/02_update-report-*.md,
    _workspace/03_update-report-*.md, _workspace/04_mock-update-report-*.md를
    읽고 마무리 작업 수행.
    references/phase5-finalize.md 참조.
    """,
    model="opus"
)
```

## 데이터 전달

| 구간 | 파일 |
|------|------|
| Phase 0→1 | release-analyst 내부 (동일 에이전트) |
| Phase 1→게이트 | `_workspace/00_release-impact.md` |
| Phase 1→2 | `_workspace/00_release-impact.md` (영향 문서 목록) |
| Phase 2→게이트 | `_workspace/02_update-report-*.md` (FE 기반 업데이트 보고서) |
| Phase 2→3 | Phase 2에서 수정/생성된 API 명세 파일 |
| Phase 3→게이트 | `_workspace/03_update-report-*.md` (BE 기반 보강 보고서) |
| Phase 3→3.5 | 변경된 API 명세 목록 |
| Phase 3.5→4 | api-quality 검증/수정 결과 + 확정된 API 명세 |
| Phase 4→게이트 | `_workspace/04_mock-update-report-*.md` (mock 업데이트 보고서) |
| Phase 4→5 | Phase 4 mock 업데이트 보고서 (changelog에 반영) |
| Phase 5→사용자 | `_workspace/05_finalize-report.md` + `docs/changelog/` |

## 버그픽스 처리 원칙

화면 문서에 반영하지 않는 변경:
- UI 동작 버그픽스 (입력 오류, 스타일 보정, 커서 오작동 등)
- 기존 화면의 구조·필드·API를 변경하지 않는 수정

changelog에는 포함:
- 모든 버그픽스를 JIRA 티켓과 함께 changelog에 기록
- 영향받는 화면/기능 명시

판단 기준: 화면 문서의 필드 표·SA/TA 차이 표·API 섹션에 변경이 필요한가? 아니면 화면 문서 수정 불필요.

## 에러 핸들링

- 레포 미존재/접근 불가: 해당 레포 스킵, 보고서에 기록
- diff 없음 (모든 레포): "변경사항 없음" 보고 후 종료
- doc-updater 1개 실패: 해당 영역만 재시도, 나머지 진행
- 소스 파일 추적 불가: "수동 확인 필요"로 기록, 수정하지 않음
- Phase 3에서 BE 소스 미존재 (gateway 등): 해당 API 스킵, Phase 3.5 consistency로 보완
- OpenAPI 대규모 변경: Phase 3.5 api-quality openapi-gen 모드에서 처리
- Phase 4에서 API 명세에 응답 구조 없음: fixture 생성 불가, "수동 확인 필요" 기록
- Phase 4에서 handler 구조 파악 불가: 스킵, 보고서에 기록

## 기존 스킬과의 관계

| 스킬 | 관계 |
|------|------|
| `api-quality` (dto-review) | Phase 3.5에서 BE DTO ↔ API 명세 대조 |
| `api-quality` (consistency) | Phase 3.5에서 fixture ↔ 명세 ↔ OpenAPI 3-way 검증 |
| `api-quality` (openapi-gen) | Phase 3.5에서 API 변경이 클 때 OpenAPI 재생성 |

## 테스트 시나리오

### 정상 (소규모 릴리스)

1. Phase 0: admin-portal 3파일, app-ms-resource 2파일 변경
2. Phase 1: 화면 문서 2개, API 명세 1개 영향 → 사용자 확인
3. Phase 2: doc-updater 2개 (admin-screen + admin-api) → 문서 3개 수정
4. Phase 3: resource-api 1개 → API 명세 1개 보강
5. Phase 3.5: dto-review → 불일치 0건
6. Phase 4: mock-updater 1개 (admin-portal) → fixture 1개 수정, handler 변경 없음
7. Phase 5: version bump + changelog 작성

### 정상 (대규모 릴리스)

1. Phase 0: 5개 레포 총 50+파일 변경
2. Phase 1: 화면 문서 15개, API 명세 8개, 신규 2개 → 사용자 확인
3. Phase 2: doc-updater 4개 병렬 → 화면 문서 + API 명세 1차 업데이트
4. Phase 3: doc-updater 2개 병렬 (resource-api, operation-api) → API 명세 BE 보강
5. Phase 3.5: dto-review → 불일치 3건 수정, consistency → OpenAPI 동기화
6. Phase 4: mock-updater 2개 병렬 (admin-portal, user-portal) → fixture/handler 추가·수정
7. Phase 5: version bump + changelog + OpenAPI 재생성

### API 변경 없는 릴리스

1. Phase 0-1: FE 버그픽스만 (API 변경 없음)
2. Phase 2: admin-screen만 실행 (admin-api, user-* 스킵)
3. Phase 3: 스킵 (API 명세 변경 없음)
4. Phase 3.5: 스킵
5. Phase 4: 스킵 (API 변경 없음)
6. Phase 5: changelog만 작성 (버그픽스 기록)

### 에러 (레포 일부 미존재)

1. Phase 0: plat-ms-vid4o 디렉토리 없음 → 스킵 기록
2. 나머지 4개 레포 정상 진행
