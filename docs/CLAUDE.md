# docs/ 문서 규칙

세부 규칙은 `.claude/rules/`에서 파일 패턴별 자동 로드.

| 규칙 파일 | 적용 대상 | 내용 |
|----------|----------|------|
| docs-writing.md | docs/**/*.md | 파일명 넘버링, 중복 금지, 문체 |
| docs-sa-ta.md | docs/admin-portal/화면/**/*.md | 화면 문서 구성, SA/TA 통합, frontmatter 4타입 |
| docs-openstack.md | docs/admin-portal/openstack/** | OpenStack/VDI 지식 문서 |
| docs-api.md | docs/**/api/** | API 명세 폴더 구조, CRUD 한 파일 원칙 |

## 폴더 구조

```
docs/
├── admin-portal/
│   ├── 화면/                    ← screen 문서 (SA/TA 통합, 대메뉴별 폴더)
│   │   ├── 포털/
│   │   ├── 테넌트/
│   │   ├── 서비스/
│   │   ├── 정책/
│   │   ├── 시스템 자원/
│   │   ├── 템플릿/
│   │   ├── 가상 PC/
│   │   ├── 가상 디스크/
│   │   ├── 사용자 정보/
│   │   ├── 사용자 지원/
│   │   └── 관리자/
│   ├── 개요/                    ← SA/TA 메뉴 개요
│   ├── openstack/               ← concept (OpenStack/VDI 배경 지식)
│   ├── internals/               ← internal (내부 구조 분석)
│   ├── common/                  ← 공통 컴포넌트
│   ├── auth/                    ← 인증 흐름
│   ├── init/                    ← 초기화 흐름
│   ├── api/                     ← API 명세 (mock fixture 기반)
│   └── term/                    ← admin-portal 전용 용어
├── user-portal/
│   ├── vpcinfo/                 ← screen (가상PC 관련 화면)
│   ├── support/                 ← screen (공지/FAQ/매뉴얼/문의)
│   ├── auth/                    ← flow (로그인/인증 흐름)
│   ├── mobile/                  ← flow (모바일 앱/반응형)
│   ├── internals/               ← internal (Vuex/interceptor/router)
│   ├── term/                    ← concept (AD/Octatco/키로깅)
│   └── api/                     ← API 명세
├── term/                        ← VDI 공통 용어
├── speculation/                 ← 추측 문서
├── changelog/                   ← 버전별 변경 요약
├── ia/                          ← IA (정보 아키텍처, 메뉴 트리, 유저플로우)
├── prd.md                       ← PRD (플랫폼 목적, 대상 사용자, 핵심 기능)
├── mapping/                     ← API 매핑 분석/리뷰
└── CLAUDE.md                    ← 이 파일

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
```
