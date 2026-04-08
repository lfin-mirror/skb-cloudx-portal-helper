# AGENTS.md

## Project Overview

- CloudX 포털(admin-portal, user-portal)을 위한 로컬 테스트 헬퍼.
- `mock-server/`: Express 기반 mock API 서버.
- `e2e/`: Playwright E2E 테스트.
- 포털 원본 소스 수정 없이 mock 응답과 테스트로 동작 검증.

## Key Paths

- `mock-server/server.js`: mock 서버 진입점
- `mock-server/user-portal/handlers/`: user portal API 핸들러
- `mock-server/admin-portal/handlers/`: admin portal API 핸들러
- `mock-server/*/fixtures/`: 시나리오별 fixture 데이터
- `mock-server/constants.js`: SA/TA 토큰, getRoleFromToken()
- `e2e/playwright.config.js`: Playwright 설정
- `e2e/tests/`: E2E 테스트
- `docs/`: 플랫폼 문서 (화면 분석, API 명세, IA, PRD)
- `docs/CLAUDE.md`: 문서 규칙 인덱스
- `docs/admin-portal/화면/`: admin-portal 화면 문서 (43개, SA/TA 통합)
- `docs/admin-portal/api/`: admin-portal API 명세
- `docs/user-portal/`: user-portal 문서 (screen/flow/internal/concept)
- `docs/user-portal/api/`: user-portal API 명세
- `docs/ia/`: 정보 아키텍처 (메뉴 트리, 유저플로우, 데이터 관계도)
- `docs/prd.md`: 플랫폼 PRD
- `.claude/rules/`: 작업 규칙 (세부 내용)
- `.claude/skills/api-quality/`: API 품질 관리 스킬 (DTO 대조, 정합성 검증, OpenAPI 변환)
- `.claude/agents/`: API 검증 에이전트 (reviewer, fixer, openapi-gen)
- `docs/openapi-cloudx.yaml`: OpenAPI 3.0 통합 명세 (admin + user)
- `_workspace/`: 에이전트 작업 산출물 (gitignored)

## Run Commands

- 의존성 설치: `npm install`
- mock 서버 실행: `npm run mock`
- 통합 실행: `npm start`
- E2E 실행: `npm test`
- Headed 실행: `npm run test:headed`
- UI 모드: `npm run test:ui`
- 리포트 확인: `npm run report`

## Safety Notes

- 기존 사용자 변경 사항은 임의로 되돌리지 않는다.
- 관련 없는 파일은 건드리지 않는다.
- `node_modules/`와 테스트 산출물은 수정 대상에서 제외한다.
