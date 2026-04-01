# 사용자 위젯 대시보드 API

관리자 포털 구버전 대시보드에서 사용하는 위젯 구성 API.

---

## 위젯 목록 조회

```
GET /v1/user/widget
```

**호출 위치**: `views/dashboard/index.vue:180`

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| widget_id | number | 위젯 ID |
| widget_nm | string | 위젯명 |
| widget_typ | string | 위젯 유형 |
| use_yn | string | 사용 여부 (`Y` / `N`) |

---

## 계정별 위젯 구성 조회

```
GET /v1/user/widget/account
```

**호출 위치**: `views/dashboard/index.vue:239`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| use_yn | string | N | 사용 여부 필터 (기본값: `Y`) |

### 응답

계정에 설정된 위젯 배치 정보 목록.

| 필드 | 타입 | 설명 |
|------|------|------|
| widget_id | number | 위젯 ID |
| widget_nm | string | 위젯명 |
| ord | number | 노출 순서 |
| use_yn | string | 사용 여부 |

---

## 계정별 위젯 구성 저장

```
POST /v1/user/widget/account
```

**호출 위치**: `views/dashboard/index.vue:331`

### 요청 바디 (JSON)

위젯 배치 정보 배열.

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| widget_id | number | Y | 위젯 ID |
| ord | number | Y | 노출 순서 |
| use_yn | string | Y | 사용 여부 (`Y` / `N`) |

---

## 에러 코드

공통 에러 코드 참고: `docs/admin-portal/internals/http-interceptor/02-error-codes.md`
