# skb-cloudx-portal-helper

세부 규칙은 `.claude/rules/`에 분리되어 해당 파일 편집 시 자동 로드.

| 규칙 파일 | 적용 대상 | 내용 |
|----------|----------|------|
| `mock-server.md` | `mock-server/**` | fixture/handler 작업 패턴, codeMap, SA/TA 분기, 데이터 마스킹 |
| `docs-sync.md` | `mock-server/**` | fixture 변경 시 API 명세서 + 화면 문서 동기화 |
| `docs-writing.md` | `docs/**/*.md` | 파일명 넘버링, 중복 금지, 문체 |
| `docs-sa-ta.md` | `docs/admin-portal/화면/**/*.md` | 화면 문서 구성, SA/TA 통합, frontmatter 4타입 |
| `docs-openstack.md` | `docs/admin-portal/openstack/**` | OpenStack/VDI 지식 문서 |
| `docs-api.md` | `docs/**/api/**` | API 명세 폴더 구조, CRUD 한 파일 원칙 |
| `docs-versioning.md` | `docs/**/*.md` | frontmatter status 전환, worktree 작업 흐름 |
| `docs-release.md` | `docs/**/*.md` | 경로 B — 릴리스 기반 문서 업데이트 프로세스 |
| `testing.md` | `e2e/**` | Playwright E2E, 시나리오 제어, 검증 |
| `gitea.md` | `**` | Gitea REST API 연동 |

## 스킬

| 스킬 | 경로 | 용도 |
|------|------|------|
| `api-quality` | `.claude/skills/api-quality/skill.md` | API 품질 관리 — DTO 대조, 3-way 정합성 검증, OpenAPI 변환 |

## 에이전트

| 에이전트 | 경로 | 역할 |
|---------|------|------|
| `api-reviewer` | `.claude/agents/api-reviewer.md` | API 명세서를 DTO/fixture/OpenAPI와 대조하여 불일치 검증 |
| `api-fixer` | `.claude/agents/api-fixer.md` | 검증 보고서 기반 명세서·OpenAPI 동기화 수정 |
| `api-openapi-gen` | `.claude/agents/api-openapi-gen.md` | API 명세서 markdown → OpenAPI 3.0 YAML 변환 |
