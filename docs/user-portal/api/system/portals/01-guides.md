# 포털 가이드 파일 API

## GET `/v1/system/portals/guides`

포털 클라이언트 프로그램 및 매뉴얼 파일 목록 조회. 다운로드 페이지와 매뉴얼 페이지에서 각각 다른 파라미터로 호출한다.

### 요청

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| ui_file_div_cd | string | N | 파일 구분 코드. 매뉴얼 페이지에서 `A009L` 사용. 다운로드 페이지에서는 미전송 |

### 응답

배열. 항목당 필드:

| 필드 | 타입 | 설명 |
|------|------|------|
| ui_file_div_nm | string | 파일 구분명. 다운로드 페이지 식별값: `Windows64 Client`, `Linux64 Client`, `MacOS Client`, `Android Client`, `iOS Client`. 매뉴얼 페이지 식별값: `PC Client 매뉴얼`, `Mobile Client 매뉴얼`, `Thin Client 매뉴얼` |
| ui_file_nm | string | 파일 표시명 (다운로드 시 저장 파일명으로 사용) |
| stor_file_id | string | 파일서비스 저장 파일 ID (파일 다운로드 GET에 사용) |
| mob_url | string | 모바일 앱 스토어 URL (Android/iOS 항목에만 해당) |
| title | string | 제목 (HTML 이스케이프 처리됨) |

### 호출 위치

- `views/support/FileDownload.vue:254` — 다운로드 페이지 진입 시 (`ui_file_div_cd` 미전송)
- `views/support/Manual.vue:163` — 매뉴얼 페이지 진입 시 (`ui_file_div_cd: 'A009L'`)
