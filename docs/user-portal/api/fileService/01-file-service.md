# 파일 서비스 API

파일서비스는 별도 서버(`FILE_URI`)에서 운영된다. 환경변수 `VUE_APP_FILE_URI`로 base URL을 설정하며, 코드에서는 `configMap.VUE_APP_FILE_URI`로 참조한다.

---

## POST `{FILE_URI}/v1/fileService/uploads`

파일 업로드. 1:1 문의 첨부파일 등록 시 사용한다. 파일을 먼저 업로드하고 반환된 `pathKey`/`fileName`을 QNA 등록/수정 API에 포함시킨다.

### 요청

**Headers**

| 헤더 | 값 |
|------|-----|
| Content-Type | `multipart/form-data` |

**Request Body (Form Data)**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| file | File | Y | 업로드할 파일. 허용 확장자: `jpg`, `jpeg`, `png`, `pdf`. 최대 25MB |
| bizCode | string | Y | 업무 코드. `A005NT` 고정 |
| share | string | Y | 공유 여부. `Y` 고정 |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| pathKey | string | 저장 파일 ID (파일 다운로드 GET 및 QNA 등록 시 `stor_file_id`로 사용) |
| fileName | string | 저장된 파일명 (`org_file_nm`으로 사용) |

### 호출 위치

- `views/support/ContactDetail.vue:291` — 1:1 문의 등록/수정 페이지에서 파일 선택 후 즉시 업로드

---

## GET `{FILE_URI}/v1/fileService/files/{storFileId}`

파일 다운로드. 응답은 바이너리 스트림이며 클라이언트에서 Blob으로 변환 후 가상 링크 클릭으로 다운로드한다.

### 요청

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| storFileId | string | Y | 저장 파일 ID (`stor_file_id` 또는 파일 업로드 응답의 `pathKey`) |

**Request Config**

| 항목 | 값 | 설명 |
|------|-----|------|
| responseType | `arraybuffer` 또는 `blob` | 다운로드 파일 유형에 따라 다름 |
| timeout | 300000 (5분) | 대용량 파일 다운로드 시 적용 (FileDownload 페이지) |

### 응답

바이너리 파일 스트림. `Content-Type` 헤더로 MIME 타입 확인.

### 호출 위치

- `views/support/FileDownload.vue:324` — 다운로드 페이지에서 클라이언트 프로그램 다운로드 (`responseType: 'arraybuffer'`, 다운로드 진행률 표시)
- `views/support/Manual.vue:218` — 매뉴얼 페이지에서 PDF 파일 다운로드 (`responseType: 'arraybuffer'`)
- `views/support/ContactList.vue:403` — 1:1 문의 목록에서 첨부 문서 파일 다운로드 (`responseType: 'blob'`, `Content-Type` 헤더 활용)
