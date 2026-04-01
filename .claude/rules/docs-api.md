---
globs: docs/**/api/**/*.md
---

# API 명세 문서 규칙

## 폴더 구조

API 경로에서 폴더 구조 도출:

```
API 경로: /api/v1/{ms}/{feature}/{resource-id}
                   ↓      ↓
폴더 구조: api/{ms}/{feature}/
```

- `/api/v1` — 공통 prefix, 폴더 구조에 반영하지 않음
- `{ms}` — 마이크로서비스 이름 (resource, operation, gw 등)
- `{feature}` — 기능 대분류

## 파일 작성 규칙

- 같은 리소스에 대한 CRUD(GET/POST/PUT/DELETE)는 **한 파일**에 작성.
- 각 API 항목에 포함할 내용:
  - HTTP 메서드 + 경로
  - 요청 파라미터 / 바디
  - 응답 구조
  - 호출하는 프론트엔드 위치 (컴포넌트/페이지)
