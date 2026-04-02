# CloudX VDI 플랫폼 문서

OpenStack 기반 VDI 플랫폼의 화면 분석, API 명세, 정보 아키텍처 문서.

## 어디서부터 읽으면 되나

| 목적 | 시작점 |
|------|--------|
| 플랫폼 전체 파악 | [PRD](prd.md) |
| 전체 흐름 (SA → TA → 사용자) | [플랫폼 개요](ia/01-platform-overview.md) |
| SA 메뉴 구조 | [SA 메뉴 트리](ia/02-admin-sa-menu-tree.md) |
| TA 메뉴 구조 | [TA 메뉴 트리](ia/03-admin-ta-menu-tree.md) |
| user-portal 메뉴 구조 | [User 메뉴 트리](ia/04-user-menu-tree.md) |
| 특정 화면의 동작 이해 | [admin-portal/화면/](admin-portal/화면/) |
| VM 라이프사이클 | [VM 유저플로우](ia/07-vm-lifecycle.md) |
| 테넌트 초기 구축 순서 | [테넌트 구축 유저플로우](ia/08-tenant-setup-flow.md) |
| 데이터 엔티티 관계 | [데이터 관계도](ia/09-data-relationship.md) |
| OpenStack 개념 이해 | [openstack/시스템 자원/](admin-portal/openstack/시스템%20자원/00-읽기-가이드.md) |
| API 명세 | [admin API](admin-portal/api/01-api-index.md) / [user API](user-portal/api/01-api-index.md) |
| VDI 용어 | [term/](term/) |

## 폴더 구조

```
docs/
├── prd.md                       ← 플랫폼 PRD
├── ia/                          ← 정보 아키텍처
│   ├── 01-platform-overview     ← 전체 흐름
│   ├── 02~04-menu-tree          ← SA/TA/User 메뉴 트리
│   ├── 05-cross-portal-flow     ← admin ↔ user 연결
│   ├── 06-policy-flow           ← 정책 유저플로우
│   ├── 07-vm-lifecycle          ← VM 라이프사이클
│   ├── 08-tenant-setup-flow     ← 테넌트 초기 구축
│   └── 09-data-relationship     ← 데이터 관계도
├── admin-portal/
│   ├── 화면/                    ← 화면 문서 43개 (SA/TA 통합)
│   ├── api/                     ← API 명세
│   ├── 개요/                    ← SA/TA 메뉴 개요
│   ├── openstack/               ← OpenStack/VDI 배경 지식
│   └── internals/               ← 내부 구조 분석
├── user-portal/
│   ├── vpcinfo/                 ← 화면 문서 (가상PC)
│   ├── support/                 ← 화면 문서 (공지/FAQ/문의)
│   ├── auth/                    ← 흐름 문서 (로그인/인증)
│   ├── mobile/                  ← 흐름 문서 (모바일)
│   ├── internals/               ← 내부 구조
│   ├── term/                    ← 용어
│   └── api/                     ← API 명세
├── term/                        ← VDI 공통 용어
├── changelog/                   ← 버전별 변경 요약
├── mapping/                     ← API 매핑 테이블
└── speculation/                 ← 추측 문서
```

## 문서 타입

모든 문서에 YAML frontmatter가 있고, `type` 필드로 성격을 구분.

| type | 대상 | 예시 |
|------|------|------|
| `screen` | 단일 화면 UI·필드·API | admin 화면 43개 + user vpcinfo/support |
| `flow` | 여러 화면의 시퀀스 | user auth/mobile |
| `internal` | 코드 아키텍처 | Vuex store, HTTP interceptor |
| `concept` | 배경 지식·용어 | AD, Octatco, OpenStack 개념 |

## SA vs TA

| 역할 | 설명 |
|------|------|
| SA (Super Admin) | 플랫폼 전체 관리. 테넌트 생성, 정책 템플릿 정의, 시스템 자원 관리 |
| TA (Tenant Admin) | 자기 테넌트 관리. 정책 생성, 가상 PC/사용자 관리, 서비스 설정 |

화면 문서에서 SA/TA 차이는 `항목 | 세부 항목 | SA | TA` 4컬럼 표로 정리.

## 문서 규칙

[CLAUDE.md](CLAUDE.md) 및 `.claude/rules/` 참조.
