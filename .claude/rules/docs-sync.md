---
description: mock-server fixture/handler 변경 시 docs 동기화
globs: mock-server/**
---

# Docs 동기화 규칙

## 변경 시 동기화 대상

mock 서버의 fixture 또는 handler를 추가/수정/삭제할 때, 해당 API 명세서도 함께 업데이트한다.

| 변경 위치 | 명세서 위치 |
|-----------|------------|
| `mock-server/user-portal/` | `/Users/jay/skb/cloudx/docs/user-portal/api/` |
| `mock-server/admin-portal/` | `/Users/jay/skb/cloudx/docs/admin-portal/api/` |

## 업데이트 범위

- fixture 필드 구조가 변경되면 → 명세서의 응답 필드 표 업데이트
- 새 API 핸들러 추가 시 → 해당 명세서 파일 + `01-api-index.md` 인덱스 테이블 추가
- 새 공통코드 그룹(codeMap) 추가 시 → 관련 기능 명세서의 "관련 공통코드" 표에 추가

## 문체

`/Users/jay/skb/cloudx/docs/CLAUDE.md`의 규칙을 따른다:
- 문장을 동사로 끝내지 않는다. 명사/단어로 끝낸다.
- 표 안의 셀도 동일.
