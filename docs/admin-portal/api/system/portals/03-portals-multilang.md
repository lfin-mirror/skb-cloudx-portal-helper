# 포털 다국어 설정 API

## 조회

```
GET /v1/system/multi/lang/{ptal_typ_cd}
```

**호출 위치**: `views/portal/ui/UserPortalLanguage.vue:89`, `views/portal/ui/AdminPortalLanguage.vue:89`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| ptal_typ_cd | string | Y | 포털 유형 코드 (예: `ADMIN`, `USER`) |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| lang_cd | string | 언어 코드 |
| lang_nm | string | 언어명 |
| use_yn | string | 사용 여부 (`Y` / `N`) |
| dft_yn | string | 기본 언어 여부 (`Y` / `N`) |

---

## 저장

```
PUT /v1/system/multi/lang/{ptal_typ_cd}
```

**호출 위치**: `views/portal/ui/UserPortalLanguage.vue:116`, `views/portal/ui/AdminPortalLanguage.vue:117`

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| ptal_typ_cd | string | Y | 포털 유형 코드 |

### 요청 바디 (JSON)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| lang_cd | string | Y | 언어 코드 |
| use_yn | string | Y | 사용 여부 (`Y` / `N`) |
| dft_yn | string | Y | 기본 언어 여부 (`Y` / `N`) |

---

## 에러 코드

공통 에러 코드 참고: `docs/admin-portal/internals/http-interceptor/02-error-codes.md`
