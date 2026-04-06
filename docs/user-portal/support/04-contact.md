---
type: screen
title: 1:1 문의
status: stable
version: v2.2.10
portal: user
component: ContactList.vue
api_endpoints:
  - GET v1/system/qnas/count
  - GET v1/system/qnas
  - GET v1/system/qnas/{adv_req_wrt_no}
  - DELETE v1/system/qnas/{adv_req_wrt_no}
  - POST {fileService}/v1/fileService/uploads
  - POST v1/system/qnas
  - PUT v1/system/qnas/{adv_req_wrt_no}
---

# 1:1 문의

관리자에게 1:1로 문의하고 처리 내역을 확인한다.

## 목록 — `views/support/ContactList.vue`

상단에 전체/답변완료/답변대기 건수를 표시한다. "1:1 문의하기" 버튼으로 신규 문의를 등록한다.

| 컬럼 | 내용 |
|------|------|
| 등록일 | 문의 등록 일시 |
| 문의유형 | 유형 코드명 |
| 제목 | 문의 제목 (클릭 시 펼침) |
| 문의결과 | 답변대기(`A004I`) / 답변완료(`A004E`) |
| 버튼 | 수정(답변대기만) / 삭제 |

문의를 클릭하면 아코디언으로 펼쳐지면서 질문 내용, 답변 내용, 첨부 파일(이미지/문서)을 표시한다. 첨부 문서는 다운로드 가능하다.

### API

```
GET v1/system/qnas/count → { list_count }
GET v1/system/qnas → 문의 목록 배열
  params: { start_num, row_count, sort }
GET v1/system/qnas/{adv_req_wrt_no} → 단일 문의 (첨부 파일 포함)
DELETE v1/system/qnas/{adv_req_wrt_no} → 문의 삭제
```

## 등록/수정 — `views/support/ContactDetail.vue`

| 필드 | 설명 |
|------|------|
| 문의유형 | 드롭다운: 이용방법(`A003USG`) / 장애(`A003ERR`) / 로그인(`A003LIN`) / 기타(`A003ETC`) |
| 제목 | 텍스트 입력 |
| 상세내용 | textarea (최대 1000자) |
| 파일첨부 | jpg/jpeg/png/pdf (최대 25MB) |

수정 모드는 목록에서 "수정" 버튼 클릭 시 sessionStorage(`sendItem`)로 데이터를 전달받아 폼을 채운다. 답변대기(`A004I`) 상태에서만 수정 가능하다.

### API

```
POST {fileService}/v1/fileService/uploads → 파일 업로드
  FormData: { file, bizCode: 'A005NT', share: 'Y' }
  → { pathKey, fileName }

POST v1/system/qnas → 신규 등록
  body: { adv_cont, adv_req_acct_id, adv_typ_cd, title, wrt_typ_cd: 'A012QUE', wri_att_file_l_new[] }

PUT v1/system/qnas/{adv_req_wrt_no} → 수정
  body: 동일 + wri_att_file_l_old[] (기존 파일 삭제 시)
```

API 명세:
- [qnas](../api/system/qnas/01-qnas.md)
- [file-service](../api/fileService/01-file-service.md)
