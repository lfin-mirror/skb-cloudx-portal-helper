# 비인증 시스템 API (nauth)

인증 없이 접근 가능한 공개 시스템 API.

---

## 관리자 포털 UI 공개 조회

```
GET /v1/nauth/system/portals/ui/ADMIN/public
```

**호출 위치**: `store/modules/app.js:133`

로그인 전 관리자 포털 화면 구성(배너, 배경, favicon 등)을 조회.

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| lin_img_1_basic_yn | string | 배너1 기본 이미지 사용 여부 (`Y` / `N`) |
| lin_img_1_file_id | string | 배너1 파일 ID |
| lin_img_2_file_id | string | 배너2 파일 ID |
| lin_img_3_file_id | string | 배너3 파일 ID |
| bg_img_file_id | string | 배경 이미지 파일 ID |
| favicon_file_id | string | Favicon 파일 ID |

---

## 키로깅 설정 조회

```
GET /v1/nauth/system/settings
```

**호출 위치**: `permission.js:19`

키로깅 방지 에이전트 사용 여부 조회. `category=admin` 쿼리로 호출.

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| category | string | Y | 설정 카테고리 (`admin`) |

### 응답 Body

배열. 첫 번째 요소의 `value` 사용.

| 필드 | 타입 | 설명 |
|------|------|------|
| [].settingId | string | 설정 ID |
| [].category | string | 카테고리명 (`admin`) |
| [].value | string | 설정 값 (`'true'`/`'false'`) |
| [].description | string | 설정 설명 |
| [].createdBy | string | 등록자 |
| [].createdAt | string | 등록 일시 |
| [].updatedBy | string | 수정자 |
| [].updatedAt | string | 수정 일시 |

`value === 'true'`이면 키로깅 대상 → 설치 파일 조회 API 추가 호출.

---

## 키로깅 설치 파일 정보

```
GET /v1/nauth/system/installer
```

**호출 위치**: `permission.js:29`

키로깅 에이전트 설치 파일 정보 조회. `settings` API에서 `value === 'true'`일 때만 호출.

### 응답 Body

배열. 첫 번째 요소 사용.

| 필드 | 타입 | 설명 |
|------|------|------|
| [].installer_nm | string | 설치 프로그램명 |
| [].installer_ver | string | 버전 |
| [].file_store_id | string | 다운로드 파일 ID |

---

## 에러 코드

공통 에러 코드 참고: `docs/admin-portal/internals/http-interceptor/02-error-codes.md`
