---
type: screen
title: 공지사항
status: stable
version: v2.2.10
portal: user
component: NoticeList.vue
api_endpoints:
  - GET v1/system/notices/count
  - GET v1/system/notices
  - GET /v1/system/notices/{noti_wrt_no}
---

# 공지사항

Cloud PC 정기 점검, 업데이트 등 공지 사항을 조회한다.

## 목록 — `views/support/NoticeList.vue`

검색 드롭다운(전체/제목/내용)과 텍스트 입력으로 필터링한다. 페이지당 10건.

| 컬럼 | 내용 |
|------|------|
| No. | 행 번호 |
| 제목 | 공지 제목 (클릭 시 상세 이동) |
| 작성자 | 등록자 ID |
| 등록일 | 등록 일시 |

### API

```
GET v1/system/notices/count
  params: { noti_tgt_grp_id, search_type, search_word }
  → { list_count }

GET v1/system/notices
  params: { noti_tgt_grp_id, sort, start_num, row_count, search_type, search_word }
  → 공지 목록 배열
```

검색 조건과 현재 페이지를 sessionStorage(`notice_params`, `currentPage`)에 저장해서, 상세에서 돌아왔을 때 이전 위치를 복원한다.

## 상세 — `views/support/NoticeDetail.vue`

공지 제목, 작성자, 등록일, 본문(HTML), 첨부 이미지를 표시한다. 이전/다음 공지 네비게이션을 제공한다.

### API

```
GET /v1/system/notices/{noti_wrt_no}
  → { title, acct_nm, reg_ts, cont, wri_att_file_l[] }
```

첨부 이미지는 `wri_att_file_l` 배열의 `att_file_loc_cd`와 `path`로 표시한다. 본문의 `&lt;`, `&gt;`는 HTML 태그로 복원 후 `v-html`로 렌더링한다.

API 명세:
- [notices](../api/system/notices/01-notices.md)
