---
type: screen
menu_id: [A1208, A120801, A120802, A120803]
title: 메뉴 / API / 기능 관리
status: stable
version: v2.2.10
portal: admin
access: [SA]
related_menus: [T1202, T1201]
api_endpoints:
  - GET /v1/user/admin/groups/menu_func2?mkind={super|tenant}
  - POST /v1/system/menu/menus
  - PUT /v1/system/menu/menus/{menuId}
  - DELETE /v1/system/menu/menus/{menuId}
  - POST /v1/system/menu/menus/{menuId}/functions
  - DELETE /v1/system/menu/menus/{menuId}/functions
  - GET /v1/system/menu/apis
  - POST /v1/system/menu/apis
  - PUT /v1/system/menu/apis/{apiId}
  - DELETE /v1/system/menu/apis/{apiId}
  - GET /v1/system/menu/functions
  - POST /v1/system/menu/functions
  - PUT /v1/system/menu/functions/{funcAuthId}
  - DELETE /v1/system/menu/functions/{funcAuthId}
  - POST /v1/system/menu/functions/{funcAuthId}/apis
  - DELETE /v1/system/menu/functions/{funcAuthId}/apis
---

# 메뉴 / API / 기능 관리 (A1208)

SA 전용 (TA 메뉴에 없음). admin-portal 사이드바 메뉴의 RBAC(역할 기반 접근 제어) 체계를 관리하는 3개 화면.

## 3단계 관계

```
메뉴 (A120801)
  "사이드바에 어떤 메뉴가 보이는가"
  │
  └── 기능 (A120803)  ← N:M 매핑
        "이 메뉴에서 어떤 동작이 가능한가"
        │
        └── API (A120802)  ← N:M 매핑
              "이 기능이 어떤 API를 호출할 수 있는가"
```

### 전체 RBAC 흐름

```
SA가 정의:
  1. API 등록 → "GET /v1/resource/hosts" 같은 엔드포인트 등록
  2. 기능 생성 → "호스트 조회" 기능에 위 API 매핑
  3. 메뉴 생성 → "호스트" 메뉴에 "호스트 조회" 기능 매핑

TA가 사용:
  4. 권한 그룹 (T1202) → "운영자 그룹"에 "호스트" 메뉴 접근 권한 부여
  5. 관리자 계정 (T1201) → 계정에 "운영자 그룹" 할당
  6. 해당 계정 로그인 → 사이드바에 "호스트" 메뉴 표시 → API 호출 가능
```

---

## 메뉴 관리 (A120801)

경로: /admin-setting/menu/menu-manage

컴포넌트: views/adminSetting/MenuManage.vue / MenuManageDetail.vue

사이드바 메뉴 트리뷰 CRUD. 3뎁스까지 허용. "Super Admin" / "Tenant Admin" 선택으로 각각 독립된 트리 관리.

| 동작 | API | 명세 |
|------|-----|------|
| 트리 조회 | `GET /v1/user/admin/groups/menu_func2?mkind={super\|tenant}` | [명세](../../api/user/admin-groups/01-admin-groups.md) |
| 등록 | `POST /v1/system/menu/menus` | [명세](../../api/system/menu/01-menu.md) |
| 수정 | `PUT /v1/system/menu/menus/{menuId}` | [명세](../../api/system/menu/01-menu.md) |
| 삭제 | `DELETE /v1/system/menu/menus/{menuId}` | [명세](../../api/system/menu/01-menu.md) |
| 기능 추가 | `POST /v1/system/menu/menus/{menuId}/functions` | [명세](../../api/system/menu/01-menu.md) |
| 기능 제거 | `DELETE /v1/system/menu/menus/{menuId}/functions` | [명세](../../api/system/menu/01-menu.md) |

---

## API 관리 (A120802)

경로: /admin-setting/menu/api-menu-manage

컴포넌트: views/adminSetting/ApiManage.vue / ApiManageDetail.vue

| 컬럼 | 필드 | 설명 |
|------|------|------|
| API 그룹 | `ms_div_cd` | MS 구분 (A032 코드) |
| API ID | `api_id` | 자동 생성 |
| HTTP 메서드 | `mtd` | GET / POST / PUT / DELETE |
| API명 | `api_nm` | 표시 이름 |
| Gateway URI | `gw_uri` | 실제 API 경로 |

| 동작 | API | 명세 |
|------|-----|------|
| 목록 | `GET /v1/system/menu/apis` | [명세](../../api/system/menu/01-menu.md) |
| 등록 | `POST /v1/system/menu/apis` | [명세](../../api/system/menu/01-menu.md) |
| 수정 | `PUT /v1/system/menu/apis/{apiId}` | [명세](../../api/system/menu/01-menu.md) |
| 삭제 | `DELETE /v1/system/menu/apis/{apiId}` | [명세](../../api/system/menu/01-menu.md) |

---

## 기능 관리 (A120803)

경로: /admin-setting/menu/func-menu-manage

컴포넌트: views/adminSetting/FunctionManage.vue / FunctionManageDetail.vue

| 컬럼 | 필드 |
|------|------|
| 기능 ID | `func_auth_id` |
| 기능명 | `func_auth_nm` |
| 생성자 | `reg_conn_id` |
| 생성일 | `reg_ts` |

| 동작 | API | 명세 |
|------|-----|------|
| 목록 | `GET /v1/system/menu/functions` | [명세](../../api/system/menu/01-menu.md) |
| 등록 | `POST /v1/system/menu/functions` | [명세](../../api/system/menu/01-menu.md) |
| 수정 | `PUT /v1/system/menu/functions/{funcAuthId}` | [명세](../../api/system/menu/01-menu.md) |
| 삭제 | `DELETE /v1/system/menu/functions/{funcAuthId}` | [명세](../../api/system/menu/01-menu.md) |
| API 추가 | `POST /v1/system/menu/functions/{funcAuthId}/apis` | [명세](../../api/system/menu/01-menu.md) |
| API 제거 | `DELETE /v1/system/menu/functions/{funcAuthId}/apis` | [명세](../../api/system/menu/01-menu.md) |

---

## TA 권한 그룹(T1202)과의 관계

```
[SA 영역]                              [TA 영역]
메뉴-기능-API 정의 (A1208)      →      권한 그룹 (T1202)
                                         └── 메뉴별 접근 권한 설정
                                               └── 관리자 계정 (T1201)에 할당
```

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|---------|
| v1.0 | 2026-03-31 | 최초 작성 |
