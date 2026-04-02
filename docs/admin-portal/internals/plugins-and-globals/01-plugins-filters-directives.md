# 플러그인, 필터, 디렉티브

`main.js`에서 등록되는 전역 플러그인, 필터, 디렉티브 정리.

## 플러그인 — `src/plugins/`

### codes.js — 공통 코드 조회

`Vue.prototype.$codes`로 전역 접근 가능한 공통 코드 관리 유틸리티.

서버에서 조회한 코드를 `sessionStorage.codes`에 캐싱하여 중복 API 호출 방지.

| 메서드 | 동작 |
|--------|------|
| `getYN(yes, no)` | `[{ label, value: 'Y' }, { label, value: 'N' }]` 배열 반환. i18n 키로 라벨 생성 |
| `get(key)` | 단일 코드 그룹 조회. 캐시에 있으면 즉시 반환, 없으면 `GET /v1/system/commons/codes?cd_grp_id={key}&usg_yn=Y` 호출 후 캐싱 |
| `gets(keys)` | 복수 코드 그룹 일괄 조회. 캐시에 없는 키만 API 호출, `qs.stringify`로 배열 파라미터 직렬화 |

반환 형식: `{ [key]: [{ label: '코드명', value: '코드값' }, ...] }`

### global_mixin.js — 전역 믹스인

`Vue.mixin()`으로 모든 컴포넌트에 주입되는 공통 로직.

#### computed

| 이름 | 반환값 |
|------|--------|
| `isSuperAdmin` | `tnt_id`가 없으면 `true` (Super Admin 여부) |
| `isDetail` | `this.id`가 비어있지 않으면 `true` (상세 페이지 여부) |

#### methods

| 메서드 | 용도 |
|--------|------|
| `isDataEmpty(obj)` | `lodash.isEmpty` 래퍼. 비어있으면 `true` |
| `isTenantCheck(tnt_id)` | Super Admin이 테넌트를 선택하지 않았으면 경고 alert 표시, `false` 반환 |
| `selectedTenantPopupFuncSearch(key, tenantId)` | Super Admin이 선택한 테넌트 ID를 팝업 검색 조건에 추가 |
| `specificStateReset({ moduleName, keyName })` | `common/resetState` dispatch로 특정 스토어 state 초기화 |
| `call_commonSingleCode(code)` | `$codes.gets([code])` 래퍼 |
| `env_common_code(codename)` | `process.env[codename]` 래퍼 |
| `storGetterTenantId()` | 현재 로그인 사용자의 `tnt_id` 반환 |
| `changeTenantFormReset(tenantId, form)` | Super Admin 테넌트 변경 시 폼 초기화 + `tnt_id` 재설정 |

#### watch

`visible.form` 변경 시 Super Admin이면 `SearchFilter` 컴포넌트의 테넌트 선택 드롭다운 disabled 토글.

#### data

| 이름 | 값 |
|------|-----|
| `defTableClass` | `'el-data-table'` |
| `defTableLineClass` | `process.env.VUE_APP_TABLE_LINE_STYLE` |

## 필터 — `src/filters/index.js`

`main.js`에서 `Vue.filter()`로 전역 등록. 템플릿에서 `{{ value | filterName }}` 형태로 사용.

| 필터 | 동작 |
|------|------|
| `numberFormatter(num, digits)` | 큰 숫자를 SI 접미사로 축약 (k, M, G, T 등) |
| `toCurrency(num)` | 천 단위 콤마 추가 (`1234` → `1,234`) |
| `toDate(date)` | `YYYY-MM-DD` 포맷 |
| `toDateTime(date, format)` | `YYYY-MM-DD HH:mm` 포맷 (기본값) |
| `toDateDiff(to, from)` | 두 날짜 간 일수 차이 (콤마 포맷) |

## 디렉티브 — `src/directive/text-mask/`

`Vue.directive('mask', Mask)`로 등록. `v-mask` 디렉티브로 입력 필드에 텍스트 마스킹 적용.

## 전역 컴포넌트

`main.js`에서 `Vue.component()`로 등록:

| 컴포넌트 | 파일 | 용도 |
|---------|------|------|
| `detail-dashboard-container` | `Form/DetailDashboardContainer` | 대시보드 상세 컨테이너 레이아웃 |
| `detail-container` | `Form/DetailContainer` | 상세 페이지 컨테이너 레이아웃 |
| `list-container` | `Form/ListContainer` | 목록 페이지 컨테이너 레이아웃 |
| `json-down` | `Form/JsonDown` | JSON 데이터 다운로드 |

## 전역 라이브러리 (Vue.prototype)

`main.js`에서 `Vue.prototype`에 주입:

| 키 | 라이브러리 | 용도 |
|----|-----------|------|
| `$db` | PouchDB(`'local/setting'`) | 로컬 설정 저장소 |
| `$axios` | Axios (커스텀 인스턴스) | API 호출 |
| `$lodash` | lodash | 유틸리티 |
| `$moment` | moment | 날짜 처리 |
| `$watermark` | watermarkjs | 워터마크 |
| `$eventBus` | `new Vue()` | 컴포넌트 간 이벤트 통신 |
| `$qs` | qs | 쿼리스트링 직렬화 |

## 전역 라이브러리 (window)

| 키 | 라이브러리 |
|----|-----------|
| `window.$` / `global.jQuery` | jQuery |
| `window.echarts` / `global.echarts` | ECharts |
