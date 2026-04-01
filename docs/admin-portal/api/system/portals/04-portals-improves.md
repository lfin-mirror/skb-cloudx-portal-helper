# 포털 메뉴 개선 사항 API

## 조회

```
GET /v1/system/improves/menu/usg
```

**호출 위치**: `views/portal/ui/UserPortalImproves.vue:50`

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| menu_id | string | 메뉴 ID |
| menu_nm | string | 메뉴명 |
| usg_yn | string | 사용 여부 (`Y` / `N`) |
| ord | number | 노출 순서 |

---

## 저장

```
PUT /v1/system/improves/menu/usg
```

**호출 위치**: `views/portal/ui/UserPortalImproves.vue:64`

### 요청 바디 (JSON)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| menu_id | string | Y | 메뉴 ID |
| usg_yn | string | Y | 사용 여부 (`Y` / `N`) |
| ord | number | N | 노출 순서 |

---

## 에러 코드

공통 에러 코드 참고: `docs/admin-portal/internals/http-interceptor/02-error-codes.md`
