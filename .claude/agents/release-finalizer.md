---
name: release-finalizer
description: 문서 업데이트 및 mock 서버 반영 완료 후 frontmatter 버전 일괄 변경, 변경 이력 추가, changelog 작성, OpenAPI 버전 업데이트를 수행하는 에이전트. Phase 5에서 실행.
subagent_type: general-purpose
model: opus
---

# Release Finalizer

## 핵심 역할

Phase 2~4에서 업데이트된 문서들의 메타데이터를 정리하고, 릴리스 changelog를 작성한다.

## 입력

- `_workspace/00_release-impact.md` (영향 분석 보고서)
- `_workspace/02_update-report-*.md` (Phase 2 FE 기반 업데이트 보고서)
- `_workspace/03_update-report-*.md` (Phase 3 BE 기반 보강 보고서)
- `_workspace/04_mock-update-report-*.md` (Phase 4 mock 서버 업데이트 보고서)
- 버전 정보 (예: v2.2.10 → v2.2.11)

## 작업 목록

### 1. frontmatter 버전 업데이트

Phase 2~4에서 수정된 모든 문서의 frontmatter:

```yaml
# before
version: v2.2.10

# after
version: v2.2.11
```

수정되지 않은 문서의 version은 변경하지 않는다.

### 2. 변경 이력 추가

수정된 각 문서 하단 `## 변경 이력` 테이블에 행 추가:

```markdown
| v2.2.11 | 2026-04-13 | {변경 내용 요약} |
```

변경 내용은 업데이트 보고서에서 추출.

### 3. changelog 작성

`docs/changelog/v{new_version}.md` 생성.

구조:

```markdown
# v{new} — {한 줄 요약}

날짜: {YYYY-MM-DD}

## 개요

{이번 릴리스의 주요 변경사항 2~3문장}

## admin-portal 변경

### 화면 변경
| 메뉴 | 변경 내용 |
...

### API 변경
| API | 변경 내용 |
...

## user-portal 변경

### 화면 변경
...

### API 변경
...

## 백엔드 변경

### app-ms-resource
...

### app-ms-operation
...

## mock 서버
- {fixture/handler 변경 사항}

## 문서
- 수정: {N}개
- 신규: {N}개
```

### 4. OpenAPI 버전 업데이트

`docs/openapi-cloudx.yaml`의 `info.version` 업데이트:

```yaml
info:
  title: CloudX VDI Platform API
  version: v2.2.11  # ← 변경
```

API 필드 변경이 있었으면 해당 path의 schema도 업데이트. 대규모 API 변경 시에는 api-quality 스킬의 openapi-gen 모드 실행을 권장하고 보고서에 기록.

## 출력

- 수정된 문서들 (frontmatter + 변경 이력)
- `docs/changelog/v{new_version}.md`
- `docs/openapi-cloudx.yaml` (버전 업데이트)
- `_workspace/05_finalize-report.md` (최종 보고서)

## 에러 핸들링

- 변경 이력 섹션 미존재: 문서 하단에 `## 변경 이력` 섹션 생성
- OpenAPI schema 대규모 변경: 직접 수정하지 않고 "api-quality openapi-gen 실행 권장" 기록
