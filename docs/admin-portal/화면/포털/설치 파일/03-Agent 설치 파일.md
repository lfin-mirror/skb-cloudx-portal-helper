---
type: screen
menu_id: [T040603]
title: Agent 설치 파일
status: stable
version: v2.2.10
portal: admin
path: /portal/download/agent-files
component: AgentFiles.vue
access: [TA]
api_endpoints:
  - GET /v1/system/portals/guides
  - POST /v1/system/portals/guides/create
  - GET /v1/system/portals/guides/{id}
  - PUT /v1/system/portals/guides/{id}
---

# Agent 설치 파일 (T040603)

Agent 소프트웨어 설치 파일 관리.

- 경로: `/portal/download/agent-files`
- 컴포넌트: `views/portal/download/AgentFiles.vue`
- 상세/수정: `views/portal/download/AgentFilesDetail.vue`

## 기능

Agent 설치 파일 목록 조회 및 수정. 초기 설정 시 템플릿 자동 생성. 삭제 불가.

## API

| 동작 | 메서드 | 경로 | 명세 |
|------|--------|------|------|
| 목록 조회 | GET | `/v1/system/portals/guides` | [명세](../../../api/system/portals/02-portals-guides.md) |
| 초기 등록 | POST | `/v1/system/portals/guides/create` | [명세](../../../api/system/portals/02-portals-guides.md) |
| 상세 조회 | GET | `/v1/system/portals/guides/{id}` | [명세](../../../api/system/portals/02-portals-guides.md) |
| 수정 | PUT | `/v1/system/portals/guides/{id}` | [명세](../../../api/system/portals/02-portals-guides.md) |

`ui_file_div_cd = 'A009A'`인 항목만 필터링. 12개 미만이면 "초기등록" 버튼 노출.

## 테이블 컬럼

| 컬럼 | 필드 | 정렬 |
|------|------|------|
| 파일 분류 | `ui_file_div_nm` | O |
| 파일명 | `ui_file_nm` | O |
| 버전 | `ver` | O |
| 생성자 | `reg_conn_id` | O |
| 생성일시 | `reg_ts` | O |
| 수정자 | `mod_conn_id` | O |
| 수정일시 | `mod_ts` | O |

## 설치 파일 3종 공통 사항

매뉴얼(A009L), PC Client(A009P), Mobile(A009M), Agent(A009A) 모두 동일 API `/v1/system/portals/guides`를 사용하되 `ui_file_div_cd` 값으로 구분:

| 화면 | 코드 | 초기 등록 수 |
|------|------|------------|
| 매뉴얼 | `A009L` | 12개 |
| PC Client | `A009P` | 13개 |
| Mobile | `A009M` | 12개 |
| Agent | `A009A` | 12개 |

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|---------|
| v1.0 | 2026-03-31 | 최초 작성 |
