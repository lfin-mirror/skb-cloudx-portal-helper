---
name: branch-audit-orchestrator
description: "고객사 release 브랜치와 v2 메인 라인의 관계를 분석하고 통합 전략을 도출하는 오케스트레이터. 4단계 검증 프로토콜, 3단계 리뷰 파이프라인을 적용한다. '브랜치 감사', '형상 분석', '고객사 버전 비교', '통합 분석', 'branch audit' 등의 요청 시 사용. admin-portal, user-portal 모두 지원."
---

# Branch Audit Orchestrator

고객사 release 브랜치와 v2 메인 라인의 관계를 분석하고 통합 전략을 도출하는 파이프라인.

## 실행 모드: 서브 에이전트 (파이프라인)

Phase별 순차 의존이 강하므로 서브 에이전트 모드로 실행한다. Phase 2에서만 브랜치별 팬아웃 병렬화를 적용한다.

## 입력 파라미터

사용자로부터 받아야 할 정보:
- **고객사 브랜치**: 예) `release/SBI-2.2.2`
- **v2 타겟 버전**: 예) `2.2.10`
- **대상 저장소**: 예) `/Users/jay/skb/cloudx/admin-portal` (기본값: 현재 디렉토리)
- **출력 경로**: 예) `../admin-portal-branch-history.md`

## 워크플로우

### Phase 0: 준비

1. 입력 파라미터 확인. 누락 시 사용자에게 질문.
2. `_workspace/` 디렉토리 생성
3. v2 patch-id 인덱스 빌드 (백그라운드):
   ```bash
   git log <v2타겟> --no-merges --format="%H" | while read sha; do
     git show $sha | git patch-id --stable
   done > _workspace/v2-patch-index.txt
   ```

### Phase 1: 계보 분석 (lineage-tracer)

에이전트: `.claude/agents/lineage-tracer.md`
스킬: `.claude/skills/branch-analysis/skill.md`

```
Agent(
  prompt: "저장소 <repo>에서 고객사 브랜치 <branch>와 v2 타겟 <target>의 관계를 분석하라. .claude/agents/lineage-tracer.md의 역할 정의와 .claude/skills/branch-analysis/skill.md의 분석 순서를 따르라. 결과를 _workspace/01_lineage_tree.md에 저장하라.",
  model: "opus"
)
```

산출물: `_workspace/01_lineage_tree.md`

### Phase 2: 커밋 감사 (commit-auditor x N, 병렬)

에이전트: `.claude/agents/commit-auditor.md`
스킬: `.claude/skills/commit-verification/skill.md`

Phase 1에서 식별된 분석 대상 브랜치별로 병렬 실행:

```
Agent(  // 브랜치 1
  prompt: "저장소 <repo>에서 <branch1>의 커밋을 <target>에 대해 4단계 검증하라. .claude/agents/commit-auditor.md와 .claude/skills/commit-verification/skill.md를 따르라. patch-id 인덱스: _workspace/v2-patch-index.txt. 결과를 _workspace/02_audit_<branch1>.md에 저장하라.",
  model: "opus",
  run_in_background: true
)
Agent(  // 브랜치 2
  prompt: "...",
  model: "opus",
  run_in_background: true
)
// 브랜치 N...
```

산출물: `_workspace/02_audit_{branch}.md` (브랜치별)

### Phase 3: 교차 리뷰 (cross-reviewer)

에이전트: `.claude/agents/cross-reviewer.md`

Phase 1, 2의 핵심 주장을 독립 검증:

```
Agent(
  prompt: "저장소 <repo>에서 _workspace/01_lineage_tree.md와 _workspace/02_audit_*.md의 모든 핵심 주장을 독립 검증하라. .claude/agents/cross-reviewer.md의 체크리스트를 따르라. 특히 '미반영' 판정은 4단계 프로토콜(.claude/skills/commit-verification/skill.md)을 재적용하라. 결과를 _workspace/03_review_result.md에 저장하라.",
  model: "opus"
)
```

불일치 발견 시: Phase 2를 해당 브랜치에 대해 재실행.

산출물: `_workspace/03_review_result.md`

### Phase 4: 통합 전략 도출 + 문서 작성 (report-writer)

에이전트: `.claude/agents/report-writer.md`
스킬: `.claude/skills/integration-strategy/skill.md`

```
Agent(
  prompt: "_workspace/의 모든 산출물을 읽고 최종 문서를 작성하라. .claude/agents/report-writer.md의 문서 구조를 따르라. 통합 전략은 .claude/skills/integration-strategy/skill.md의 플로차트로 판정하라. 출력 경로: <output_path>",
  model: "opus"
)
```

산출물: 사용자 지정 경로에 최종 문서

### Phase 5: 정리

1. `_workspace/` 보존 (감사 추적용)
2. 사용자에게 결과 요약:
   - 분석 대상 브랜치 수
   - 총 커밋 수 / 반영 / 미반영
   - 통합 전략 판정 (Case 번호)
   - 최종 문서 경로

## 에러 핸들링

| 에러 유형 | 대응 |
|----------|------|
| 브랜치/태그 미존재 | `git fetch --all` 후 재시도. 실패 시 사용자에게 확인 |
| patch-id 인덱스 빌드 타임아웃 | 커밋 수 제한 (`head -5000`) 후 재시도 |
| 교차 리뷰 REJECT | REJECT 사유의 해당 Phase 재실행 (1회) |
| 재실행 후에도 REJECT | 불일치 항목을 문서에 "미확정" 표기, 사용자에게 보고 |

## 테스트 시나리오

### 정상 흐름
```
입력: release/SBI-2.2.2, 2.2.10, admin-portal
기대:
  - SBI가 2.2.10의 완전한 조상 → Case 1 (merge 불필요)
  - 문서에 SBI 타임라인, 커밋 상세, 통합 전략 포함
```

### 에러 흐름
```
입력: release/NONEXISTENT, 2.2.10
기대:
  - Phase 1에서 브랜치 미존재 감지
  - fetch 후 재시도, 실패 시 사용자에게 "브랜치를 확인해주세요" 보고
```
