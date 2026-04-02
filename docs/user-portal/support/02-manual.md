---
type: screen
title: 매뉴얼
status: stable
version: v2.2.9
portal: user
component: Manual.vue
api_endpoints:
  - GET v1/system/portals/guides
  - GET {fileService}/v1/fileService/files/{stor_file_id}
---

# 매뉴얼

각 운영체제별 Cloud PC 이용방법을 PDF 문서로 다운로드한다.

## 화면 — `views/support/Manual.vue`

데스크톱(PC Client, Thin Client)과 모바일(Mobile Client) 매뉴얼 다운로드 버튼을 제공한다.

### API

```
GET v1/system/portals/guides
  params: { ui_file_div_cd: 'A009L' }
  → 매뉴얼 배열 [{ ui_file_div_nm, ui_file_nm, stor_file_id }]
```

응답의 `ui_file_div_nm`으로 PC Client / Mobile Client / Thin Client를 구분한다.

### 다운로드

```
GET {fileService}/v1/fileService/files/{stor_file_id}
  responseType: arraybuffer
  → 파일 blob → 브라우저 다운로드
```

API 명세:
- [guides](../api/system/portals/01-guides.md)
- [file-service](../api/fileService/01-file-service.md)
