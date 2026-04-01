# skb-cloudx-portal-helper

세부 규칙은 `.claude/rules/`에 분리되어 해당 파일 편집 시 자동 로드.

| 규칙 파일 | 적용 대상 | 내용 |
|----------|----------|------|
| `mock-server.md` | `mock-server/**` | fixture/handler 작업 패턴, codeMap, SA/TA 분기, 데이터 마스킹 |
| `docs-sync.md` | `mock-server/**` | fixture 변경 시 API 명세서 동기화 |
| `testing.md` | `e2e/**` | Playwright E2E, 시나리오 제어, 검증 |
| `gitea.md` | `**` | Gitea REST API 연동 |
