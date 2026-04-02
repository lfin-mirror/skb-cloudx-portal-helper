# 포털 가이드 (매뉴얼 / 설치파일 / URL) API

## 사용 화면
- [매뉴얼](../../화면/포털/06-매뉴얼.md)
- [PC Client 설치 파일](../../화면/포털/설치%20파일/01-PC%20Client%20설치%20파일.md)
- [Mobile 설치 파일](../../화면/포털/설치%20파일/02-Mobile%20설치%20파일.md)
- [Agent 설치 파일](../../화면/포털/설치%20파일/03-Agent%20설치%20파일.md)

## 목록 조회

```
GET /v1/system/portals/guides
```

**호출 위치**: `views/portal/Manual.vue:169`, `views/portal/download/AgentFiles.vue:175`, `views/portal/download/ExecutableFiles.vue:182`, `views/portal/download/Url.vue:176`

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| gui_no | number | 가이드 번호 (PK) |
| ui_file_div_cd | string | 파일 구분 코드 (공통코드 A009, 예: `A009L`: 매뉴얼) |
| tnt_id | string | 테넌트 ID |
| stor_file_id | string | 저장 파일 ID |
| org_file_nm | string | 원본 파일명 |
| file_url | string | 파일 URL (URL 타입) |
| reg_ts | string | 등록 일시 |

---

## 단건 조회

```
GET /v1/system/portals/guides/{id}
```

**호출 위치**: `views/portal/ManualDetail.vue:210`, `views/portal/download/AgentFilesDetail.vue:229`, `views/portal/download/ExecutableFilesDetail.vue:241`, `views/portal/download/UrlDetail.vue:197`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | Y | 가이드 번호 |

### 응답

목록 조회 응답 필드와 동일.

---

## 등록

```
POST /v1/system/portals/guides
```

**호출 위치**: `views/portal/ManualDetail.vue:232`, `views/portal/download/AgentFilesDetail.vue:251`, `views/portal/download/ExecutableFilesDetail.vue:271`, `views/portal/download/UrlDetail.vue:218`

### 요청 바디 (JSON / multipart)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| ui_file_div_cd | string | Y | 파일 구분 코드 |
| tnt_id | string | N | 테넌트 ID |
| file_url | string | N | 파일 URL (URL 타입) |
| stor_file_id | string | N | 저장 파일 ID (파일 타입) |
| org_file_nm | string | N | 원본 파일명 |

---

## 초기 설치파일 일괄 등록

```
POST /v1/system/portals/guides/create
```

**호출 위치**: `views/portal/Manual.vue:209`, `views/portal/download/AgentFiles.vue:212`, `views/portal/download/ExecutableFiles.vue:223`, `views/portal/download/Url.vue:213`

### 요청 바디 (JSON)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| params.tnt_id | string | N | 테넌트 ID |

초기 설치파일 레코드 12개 미만일 때 기본값으로 일괄 생성.

---

## 수정 (파일 교체)

```
PUT /v1/system/portals/guides/{id}
```

**호출 위치**: `views/portal/download/ExecutableFilesDetail.vue:336`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | Y | 가이드 번호 |

### 요청 바디

등록과 동일.

---

## 삭제

```
DELETE /v1/system/portals/guides/{id}
```

**호출 위치**: `views/portal/ManualDetail.vue:184`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | Y | 가이드 번호 |

---

## 이력 조회

```
GET /v1/system/portals/guides/{id}/history
```

**호출 위치**: `views/portal/download/AgentFilesHistory.vue:94`, `views/portal/download/ExecutableFilesHistory.vue:106`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | Y | 가이드 번호 |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| hist_no | number | 이력 번호 |
| gui_no | number | 가이드 번호 |
| org_file_nm | string | 원본 파일명 |
| reg_conn_id | string | 등록자 ID |
| reg_ts | string | 등록 일시 |

---

## 에러 코드

공통 에러 코드 참고: `docs/admin-portal/internals/http-interceptor/02-error-codes.md`
