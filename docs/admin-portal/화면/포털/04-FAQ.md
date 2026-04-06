---
type: screen
menu_id: [T0403]
title: FAQ
status: stable
version: v2.2.10
portal: admin
path: /portal/faq
component: Faq.vue
access: [TA]
api_endpoints:
  - GET /v1/system/faqs
  - POST /v1/system/faqs
  - GET /v1/system/faqs/{id}
  - PUT /v1/system/faqs/{id}
  - DELETE /v1/system/faqs/{id}
---

# FAQ (T0403)

user-portal에 표시되는 FAQ CRUD 관리.

- 경로: `/portal/faq`
- 컴포넌트: `views/portal/Faq.vue`
- 등록: `views/portal/FaqCreate.vue`
- 상세/수정: `views/portal/FaqDetail.vue`

## 기능

FAQ 항목 등록, 수정, 삭제. FAQ 타입 코드(`A006`)로 카테고리 분류.

## API

| 동작 | 메서드 | 경로 | 명세 |
|------|--------|------|------|
| 목록 조회 | GET | `/v1/system/faqs` | [명세](../../api/system/faqs/01-faqs.md) |
| 등록 | POST | `/v1/system/faqs` | [명세](../../api/system/faqs/01-faqs.md) |
| 상세 조회 | GET | `/v1/system/faqs/{id}` | [명세](../../api/system/faqs/01-faqs.md) |
| 수정 | PUT | `/v1/system/faqs/{id}` | [명세](../../api/system/faqs/01-faqs.md) |
| 삭제 | DELETE | `/v1/system/faqs/{id}` | [명세](../../api/system/faqs/01-faqs.md) |

## 검색 조건

| 파라미터 | 설명 |
|---------|------|
| `type` | 검색 타입 (title / content / reg_conn_id) |
| `value` | 검색어 |
| `faq_typ_cd` | FAQ 타입 코드 (A006 공통코드에서 로드) |
| `page`, `limit` | 페이지네이션 |

## 테이블 컬럼

| 컬럼 | 필드 | 정렬 |
|------|------|------|
| FAQ 타입 | `faq_typ_cd_nm` | O |
| 제목 | `title` (unescape 처리) | O |
| 생성자 | `reg_conn_id` | O |
| 생성일시 | `reg_ts` (날짜 포맷) | O |

## user-portal 연관

admin-portal에서 등록한 FAQ → user-portal `support/FaqPage.vue`에서 조회.

| admin-portal | user-portal |
|-------------|-------------|
| FAQ 등록/수정/삭제 | FAQ 조회 (탭 필터 + 아코디언) |
| FAQ 타입 코드로 분류 | 타입별 탭 메뉴 (이용방법/장애/로그인/기타 등) |
| 검색: 제목/내용/작성자 | 검색: 제목/내용 |

동일 API 엔드포인트(`/v1/system/faqs`) 사용. user-portal은 `faq_typ_cd` 파라미터로 탭 필터링.

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|---------|
| v1.0 | 2026-03-31 | 최초 작성 |
