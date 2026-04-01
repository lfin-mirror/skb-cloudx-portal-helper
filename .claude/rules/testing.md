---
description: E2E 테스트 및 시나리오 검증
globs: e2e/**
---

# 테스트 규칙

## 시나리오 제어

- `/__control` API로 런타임 시나리오 전환 (예: 로그인 성공 → 2FA → 실패).
- 기본 시나리오는 `success`.
- E2E 테스트에서 `setScenario()` / `resetScenarios()`로 제어.

## Playwright 설정

- 스크린샷: 모든 테스트에서 촬영 (`screenshot: 'on'`).
- 비디오: 실패 시 보존 (`video: 'retain-on-failure'`).
- 산출물 디렉터리: `e2e/test-results/`, `e2e/videos/`, `e2e/screenshots/` — 커밋 대상 아님.

## mock 서버 변경 후 검증

- handler/fixture 변경 시 관련 시나리오가 실제로 응답되는지 확인한다.
- 가능하면 `curl`로 최소 응답 검증을 수행한다.
