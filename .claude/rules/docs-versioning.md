---
description: 문서 버전 관리 — frontmatter status 전환, worktree 작업 흐름
globs: docs/**/*.md
---

# 문서 버전 관리 규칙

## frontmatter status 전환

| 시점 | status | version | pending_changes |
|------|--------|---------|-----------------|
| v2 브랜치 (릴리스 기준) | `stable` | 현재 릴리스 (예: `v2.2.9`) | 없음 |
| feature 브랜치 (작업 중) | `draft` | 이전 릴리스 유지 | JIRA 티켓 + 설명 + 작성자 |
| 머지 후 v2 | `stable` | 새 릴리스 (예: `v2.3.0`) | 제거 |

## feature 브랜치에서 문서 수정 시

1. frontmatter `status`를 `draft`로 변경
2. `pending_changes`에 작업 정보 추가:
   ```yaml
   pending_changes:
     - ticket: IAADEV-1234
       description: 가상PC 네이밍 정책 추가
       author: 개발자명
   ```
3. 본문에 변경 내용 반영 (필드 추가/삭제, API 변경 등)
4. `## 변경 이력`에 기록 추가
5. 코드와 문서를 함께 커밋

## v2 머지 시

1. `status` → `stable`
2. `version` → 새 릴리스 버전
3. `pending_changes` → 제거
4. `## 변경 이력`에 최종 기록

## worktree 작업 흐름

```bash
# 작업 시작
git worktree add ../IAADEV-1234 -b feature/v2.3.0/IAADEV-1234 v2

# 작업 (각 worktree에서 Claude Code 독립 세션)
cd ../IAADEV-1234
# 코드 수정 + 문서 수정 → 함께 커밋

# 머지 후 정리
git worktree remove ../IAADEV-1234
```

브랜치 네이밍: `feature/{버전}/{JIRA-티켓}` (예: `feature/v2.3.0/IAADEV-1234`)

## 동시 수정 충돌

같은 화면 문서를 여러 feature 브랜치에서 수정한 경우:

1. 먼저 머지한 쪽이 v2에 반영
2. 나중 머지 시 conflict 발생
3. 해결 방법:
   - frontmatter: `pending_changes` 합침
   - 본문: 섹션 단위로 merge
   - 변경 이력: 양쪽 JIRA 티켓 모두 기록
