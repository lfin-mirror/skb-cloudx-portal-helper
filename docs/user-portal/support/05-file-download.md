---
type: screen
title: 다운로드
status: stable
version: v2.2.9
portal: user
component: FileDownload.vue
api_endpoints:
  - GET v1/system/portals/guides
  - GET {fileService}/v1/fileService/files/{stor_file_id}
---

# 다운로드

PC 및 Mobile OS 환경에 맞는 Cloud PC Client 프로그램을 다운로드한다.

## 화면 — `views/support/FileDownload.vue`

### 데스크톱 클라이언트

| 플랫폼 | 다운로드 방식 |
|------|----------|
| Windows 64bit | 파일 직접 다운로드 |
| MacOS (Beta) | 파일 직접 다운로드 |
| Linux 64bit | 코드상 주석 처리 (현재 비활성) |
| 키로깅 방지 에이전트 | 코드상 주석 처리 (현재 비활성, Vuex keylogging 모듈의 installerInfo로 대체) |

다운로드 진행률을 표시하며, Axios의 `onDownloadProgress`로 퍼센트를 계산한다. 타임아웃은 300초.

### 모바일 클라이언트

| 플랫폼 | 다운로드 방식 |
|------|----------|
| Android | Google Play Store 링크 (`window.open(url)`) |
| iOS | Apple App Store 링크 (`window.open(url)`) |

파일을 직접 다운로드하지 않고 앱 스토어 페이지를 연다.

### API

```
GET v1/system/portals/guides
  → 다운로드 목록 배열 [{ ui_file_div_nm, ui_file_nm, stor_file_id, mob_url }]
  ui_file_div_nm으로 Windows64/Linux64/MacOS/Android/iOS 구분

GET {fileService}/v1/fileService/files/{stor_file_id}
  responseType: arraybuffer, timeout: 300000
  onDownloadProgress로 진행률 추적
  → 파일 blob → 브라우저 다운로드
```

API 명세:
- [guides](../api/system/portals/01-guides.md)
- [file-service](../api/fileService/01-file-service.md)
