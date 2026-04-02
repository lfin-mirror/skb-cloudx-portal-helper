# 포털 UI 설정 API

## 사용 화면
- [관리자 UI](../../화면/포털/01-관리자%20UI.md)
- [사용자 UI](../../화면/포털/02-사용자%20UI.md)

## 조회

```
GET /v1/system/portals/ui/{tntId}
```

**호출 위치**: `views/portal/ui/UserPortal.vue:158`, `views/portal/ui/UserPortalDetail.vue:172`, `views/portal/ui/AdminPortal.vue:150`, `views/portal/ui/AdminPortalDetail.vue:128`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tntId | string | Y | 테넌트 ID 또는 서비스 그룹 ID |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| tnt_id | string | 테넌트 ID |
| lin_img_1_basic_yn | string | 배너1 기본 이미지 사용 여부 (`Y` / `N`) |
| lin_img_1_file_id | string | 배너1 파일 ID |
| lin_img_2_file_id | string | 배너2 파일 ID |
| lin_img_3_file_id | string | 배너3 파일 ID |
| bg_img_file_id | string | 배경 이미지 파일 ID |
| favicon_file_id | string | Favicon 파일 ID |

---

## 저장

```
POST /v1/system/portals/ui/{tntId}
```

**호출 위치**: `views/portal/ui/UserPortalDetail.vue:189`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tntId | string | Y | 테넌트 ID |

### 요청 바디 (JSON)

포털 UI 설정 폼 전체 (배너, 배경, favicon 파일 ID 및 초기화 플래그 포함).

---

## 에러 코드

공통 에러 코드 참고: `docs/admin-portal/internals/http-interceptor/02-error-codes.md`
