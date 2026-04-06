---
type: flow
title: 반응형 UI
status: stable
version: v2.2.10
portal: user
screens:
  - layout/Layout.vue
  - layout/components/HeaderBar.vue
  - layout/components/HeaderBarMobile.vue
  - layout/mixin/ResizeHandler.js
---

# 반응형 UI

## Layout.vue — PC/모바일 분기

```vue
<div class="pc-menu"><header-bar /></div>        <!-- PC 헤더 -->
<div class="m-menu"><header-bar-mobile /></div>   <!-- 모바일 헤더 -->
```

CSS 미디어 쿼리로 `pc-menu`/`m-menu`의 `display`를 전환한다. 컴포넌트 자체는 둘 다 항상 렌더링되지만, 화면 크기에 따라 하나만 보인다.

모바일 화면에서는 반투명 배경(`drawer-bg`)이 표시되고, 탭하면 사이드바가 닫힌다.

## JS 모바일 감지 — `layout/mixin/ResizeHandler.js` (비활성 상태)

```javascript
const WIDTH = 0;   // 원본(vue-element-admin)에서는 992 또는 768
const RATIO = 3;

isMobile() {
  const rect = body.getBoundingClientRect();
  return rect.width - RATIO < WIDTH;  // rect.width < 3 일 때만 true
}
```

`WIDTH = 0`이므로 `isMobile()`이 true가 되려면 화면 너비가 3px 미만이어야 한다. 사실상 항상 false를 반환하므로 Vuex store의 `app.device`는 항상 `'desktop'`이다. `vue-element-admin` 보일러플레이트에서 가져온 코드인데, CloudX에서 `WIDTH`를 0으로 바꿔 JS 기반 모바일 분기를 의도적으로 비활성화했다.

PC/모바일 UI 전환은 이 mixin이 아니라 CSS 미디어 쿼리로 처리한다.

갤럭시 탭, 아이패드, 아이폰, 갤럭시 S, Thin Client 등 다양한 해상도의 단말에서 user-portal 웹을 열었을 때 자동으로 레이아웃이 조정되도록 CSS 미디어 쿼리 기반 반응형 최적화가 적용되어 있다.

## CSS 미디어 쿼리 브레이크포인트

SCSS 파일 전반에서 일관된 브레이크포인트 패턴을 사용한다. 주석에 PC / Tablet / Mobile로 구분되어 있다.

### 너비 기준 (주요)

| 구간 | 미디어 쿼리 | 주석 표기 | 용도 |
|------|-----------|----------|------|
| 1440px ~ | `min-width: 1440px` | PC | PC 헤더 표시, 모바일 헤더 숨김 |
| 450px ~ 1439px | `max-width: 1439px` | Tablet | PC 헤더 숨김, 모바일 헤더 표시 |
| ~ 449px | `max-width: 449px` | Mobile | 모바일 전용 미세 조정 |

핵심은 **1440px 경계**다. 이 값을 기준으로 PC 헤더(`HeaderBar`)와 모바일 헤더(`HeaderBarMobile`)가 전환된다:

```scss
// _header.scss
@media screen and (min-width: 1440px) {
  .pc-menu { display: block }
  .m-menu  { display: none }
}
@media screen and (max-width: 1439px) {
  .pc-menu { display: none }
  .m-menu  { display: block }
}
```

### 너비 기준 (중간 단계)

일부 SCSS 파일에서 Tablet 구간 내 추가 브레이크포인트를 사용한다:

| 미디어 쿼리 | 적용 파일 | 용도 |
|-----------|----------|------|
| `max-width: 880px` | `_cloudpc.scss`, `_manage_support.scss` | Cloud PC 카드/테이블 레이아웃 축소 |
| `max-width: 800px` | `_dim.scss`, `_popup.scss`, `_404.scss` | 팝업/딤 레이아웃 조정 |
| `max-width: 700px` | `_home.scss` | 홈 화면 카드 배치 변경 |
| `max-width: 690px` | `_cloudpc.scss` | Cloud PC 상세 정보 축소 |

### 높이 기준

화면 높이가 작은 기기(가로 모드 등)에 대한 대응:

| 미디어 쿼리 | 적용 파일 | 용도 |
|-----------|----------|------|
| `max-height: 822px` | `_cloudpc.scss`, `_dim.scss`, `_footer.scss` | 푸터/Cloud PC 레이아웃 축소 |
| `max-height: 800px` | `_login.scss` | 로그인 슬라이더 축소 |
| `max-height: 668px` | `_headerBarMobile.scss` | 모바일 메뉴 스크롤 활성화 |
| `max-height: 500px` | `_cloudpc.scss` | 모바일 서브메뉴 축소 |
| `max-height: 450px` | `_login.scss` | 로그인 폼 최소화 |

## 모바일 헤더 — `HeaderBarMobile.vue`

CSS 미디어 쿼리에 의해 화면 너비 1439px 이하에서 표시되는 헤더다. 햄버거 메뉴로 네비게이션을 열고 닫는 구조.

메뉴 구성:
- Cloud PC 관리 (가상PC 관련 라우트)
- 고객 지원 (공지/FAQ/매뉴얼)
- 단말 접속 정보 등록 링크
- 다크/라이트 테마 전환
- 로그아웃

PC 헤더(`HeaderBar.vue`)와 기능은 동일하지만, 레이아웃이 모바일에 맞게 재구성되어 있다. 로그인 시 사용자 정보를 API로 조회하고 `acct_conn_id`, `ad_itlk_acct_yn` 등을 sessionStorage에 저장한다.

## 반응형 SCSS 파일

| 파일 | 대상 화면 | 주요 반응형 내용 |
|------|----------|----------------|
| `_headerBarMobile.scss` | 모바일 헤더 | 햄버거 메뉴, 네비게이션 레이아웃, 높이 668px 이하 스크롤 대응 |
| `_home.scss` | 홈 화면 | PC 캐러셀/상세 정보 세로 배치, 700px 이하 카드 축소 |
| `_cloudpc.scss` | Cloud PC 관리 | 테이블 → 카드 전환, 880px/690px 중간 단계 |
| `_login.scss` | 로그인 | 슬라이더/폼 세로 배치, 높이 800px/450px 대응 |
| `_manage_support.scss` | 고객지원 | 테이블 축소, 880px 중간 단계 |
| `_popup.scss` | 팝업 | 팝업 너비 조정, 800px 이하 전체 너비 |
| `_dim.scss` | 딤(오버레이) | 800px 이하 레이아웃 조정 |
| `_forms.scss` | 폼 요소 | 입력 필드 너비, 버튼 배치 변경 |
| `_footer.scss` | 푸터 | 푸터 레이아웃 축소 |
| `_header.scss` | PC 헤더 | 1439px 이하에서 숨김 처리 |
| `_404.scss` | 에러 페이지 | 이미지/텍스트 축소 |
| `_dark-theme.scss` | 다크 테마 | 모바일 헤더 다크 모드 대응 |
