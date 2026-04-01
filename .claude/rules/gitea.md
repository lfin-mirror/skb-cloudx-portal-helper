---
description: Gitea 연동 작업
globs: "**"
---

# Gitea 연동 규칙

- Gitea 작업은 `curl` 기반 REST API로 처리한다.
- Base URL: `${GITEA_URL}/api/v1`
- 인증 헤더: `-H "Authorization: token ${GITEA_TOKEN}"`
- `owner/repo`는 `git remote get-url origin` 결과에서 자동 파싱한다.
- 엔드포인트와 요청/응답 스키마는 `~/.claude/gitea-api.md`를 먼저 확인한다.
