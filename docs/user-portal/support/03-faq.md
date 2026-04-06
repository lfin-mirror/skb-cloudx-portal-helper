---
type: screen
title: 자주 묻는 질문 (FAQ)
status: stable
version: v2.2.10
portal: user
component: FaqPage.vue
api_endpoints:
  - GET v1/system/faqs/count
  - GET v1/system/faqs
  - GET v1/system/faqs/{faq_wrt_no}
---

# 자주 묻는 질문 (FAQ)

이용방법, 장애 처리 등 자주 묻는 질문과 답변을 조회한다.

## 화면 — `views/support/FaqPage.vue`

### 탭 필터

| 탭 | 코드 | 설명 |
|----|------|------|
| 전체 | (없음) | 모든 FAQ |
| 이용방법 | `A006USG` | Cloud PC 사용 관련 |
| 장애 | `A006ERR` | 장애/에러 관련 |
| 로그인 | `A006LIN` | 로그인/인증 관련 |
| 기타 | `A006ETC` | 기타 |

검색 드롭다운(전체/제목/내용)과 텍스트 입력으로 추가 필터링 가능. 페이지당 10건.

### 아코디언 구조

질문을 클릭하면 해당 항목이 펼쳐지면서 답변(`asw_cont`)과 첨부 이미지가 표시된다. 이미지는 펼칠 때 개별 FAQ API를 호출해서 가져온다.

### API

```
GET v1/system/faqs/count
  params: { faq_typ_cd, search_type, search_word, ... }
  → { list_count }

GET v1/system/faqs
  params: { faq_typ_cd, search_type, search_word, sort, start_num, row_count }
  → FAQ 목록 배열

GET v1/system/faqs/{faq_wrt_no}
  → 단일 FAQ (wri_att_file_l[] 포함, 아코디언 펼칠 때 호출)
```

API 명세:
- [faqs](../api/system/faqs/01-faqs.md)
