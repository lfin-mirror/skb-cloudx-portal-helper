# docs/ 문서 규칙

세부 규칙은 `.claude/rules/`에서 파일 패턴별 자동 로드.

| 규칙 파일 | 적용 대상 | 내용 |
|----------|----------|------|
| docs-writing.md | docs/**/*.md | 파일명 넘버링, 중복 금지, 문체 |
| docs-sa-ta.md | docs/admin-portal/화면/**/*.md | 화면 문서 구성, SA/TA 통합, frontmatter 4타입 |
| docs-openstack.md | docs/admin-portal/openstack/** | OpenStack/VDI 지식 문서 |
| docs-api.md | docs/**/api/** | API 명세 폴더 구조, CRUD 한 파일 원칙 |

## 폴더 구조

[docs/README.md](README.md) 참조.

## 문서 타입과 frontmatter

모든 문서에 YAML frontmatter 필수. `type` 필드로 4가지 문서 성격을 구분.

| type | 대상 |
|------|------|
| `screen` | 단일 화면 UI·필드·API |
| `flow` | 여러 화면의 시퀀스 |
| `internal` | 코드 아키텍처 |
| `concept` | 배경 지식·용어 |

상세 스키마는 `.claude/rules/docs-sa-ta.md` 참조.

## 버전 관리

- 문서 본문은 항상 최신 버전 기준으로 작성
- 각 문서 하단 `## 변경 이력` 섹션에 버전별 변경 기록
- 대규모 변경은 `changelog/` 폴더에 릴리스 노트
