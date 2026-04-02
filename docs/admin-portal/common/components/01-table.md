# 테이블 컴포넌트

admin-portal의 목록 화면은 두 가지 테이블 패턴을 사용. 클라이언트사이드 페이지네이션(`data-tables`)과 서버사이드 페이지네이션(`el-table` + `el-pagination` 직접 조합).

## 라이브러리

| 패키지 | 역할 |
|--------|------|
| `vue-data-tables` (v3.4.4) | Element UI `el-table` 래퍼. 클라이언트사이드 정렬/필터/페이지네이션 내장 |
| `element-ui` `el-table` / `el-table-column` | Element UI 기본 테이블 |
| `element-ui` `el-pagination` | 서버사이드 페이지네이션용 |

`main.js`에서 `Vue.use(VueDataTables)`로 전역 등록. `<data-tables>` 태그로 사용.

---

## 패턴 1: 클라이언트사이드 — `<data-tables>`

전체 데이터를 한 번에 받아서 프론트에서 페이지네이션/정렬 처리. 대부분의 목록 화면에서 사용.

### 기본 구조

```vue
<data-tables
  ref="table"
  @row-click="get"
  :table-props="$store.getters.table.props"
  :data="items"
  :current-page.sync="searchForm.page"
  :page-size="searchForm.limit"
  :pagination-props="$store.getters.table.pagination"
>
  <el-table-column
    v-for="col in cols"
    :key="col.prop"
    :prop="col.prop"
    :label="col.label"
    :width="col.width"
    :align="col.align"
    :min-width="col.minWidth"
    :formatter="col.formatter"
    :sortable="col.sortable"
    :show-overflow-tooltip="true"
    :sort-method="col.sortable ? tableSortWithEmpty(col.prop) : null"
  />
</data-tables>
```

### 주요 props

| prop | 값 | 출처 |
|------|-----|------|
| `table-props` | `{ 'highlight-current-row': true, 'empty-text': '조회된 데이터가 없습니다.' }` | `store.getters.table.props` |
| `data` | 컴포넌트의 목록 데이터 배열 | API 응답 |
| `current-page` | `searchForm.page` (`.sync`) | 현재 페이지 번호 |
| `page-size` | `searchForm.limit` | 페이지당 행 수 |
| `pagination-props` | `{ background: false, layout: 'prev, pager, next', pageSizes: [10, 30, 50, 100] }` | `store.getters.table.pagination` |

### 기본 설정 (Vuex `app` 모듈)

`store/modules/app.js`에서 전역 테이블 설정 관리:

```javascript
table: {
  props: {
    'highlight-current-row': true,
    'empty-text': i18n.t('message.common.noResult')    // "조회된 데이터가 없습니다."
  },
  propsPeriod: {
    'highlight-current-row': true,
    'empty-text': i18n.t('message.common.noResultPeriod')  // 기간 검색용 빈 메시지
  },
  propsModal: {
    'highlight-current-row': true,
    'empty-text': i18n.t('message.common.noResult'),
    'max-height': 400
  },
  pagination: {
    background: false,
    layout: 'prev, pager, next',
    pageSizes: [10, 30, 50, 100]
  }
}
```

용도별 props 사용 분기:
- `table.props` — 일반 목록
- `table.propsPeriod` — 기간 검색 결과 목록 (빈 데이터 메시지가 다름)
- `table.propsModal` — 모달 내 테이블 (`max-height: 400` 제한)

### 기본 페이지네이션 설정

`store/modules/app.js`의 `pagging`:

```javascript
pagging: {
  limit: 10,      // 기본 페이지 크기
  perPage: 10,
  sizes: [10, 30, 50, 100]  // 페이지 크기 옵션
}
```

Vuex getters로 접근:
- `$store.getters.page_limit` → `10`
- `$store.getters.page_size` → `[10, 30, 50, 100]`

### 테이블 CSS 클래스

전역 믹스인(`global_mixin.js`)에서 제공:
- `defTableClass`: `'el-data-table'` — 테이블 기본 스타일
- `defTableLineClass`: `process.env.VUE_APP_TABLE_LINE_STYLE` — 행 스타일 (환경변수 기반)

---

## 패턴 2: 서버사이드 — `<el-table>` + `<el-pagination>`

데이터가 많아 서버에서 페이지 단위로 조회하는 경우. `el-table`과 `el-pagination`을 직접 조합.

### 기본 구조

```vue
<el-table
  :data="items"
  v-bind="$store.getters.table.props"
  @row-click="get"
  @sort-change="handleSortChange"
>
  <el-table-column
    v-for="col in cols"
    :key="col.prop"
    :prop="col.prop"
    :label="col.label"
    :sortable="'custom'"
    :show-overflow-tooltip="true"
  />
</el-table>

<el-pagination
  background
  layout="prev, pager, next"
  :current-page="currentPage"
  :page-size="pageSize"
  :page-sizes="[10, 30, 50, 100]"
  :total="totalPages"
  @current-change="handlePageChange"
/>
```

### 클라이언트사이드와의 차이

| 항목 | `data-tables` (클라이언트) | `el-table` + `el-pagination` (서버) |
|------|--------------------------|-------------------------------------|
| 데이터 | 전체 배열 한 번에 로드 | API에 `page`, `limit` 파라미터 전달 |
| 페이지네이션 | 자동 (내장) | `el-pagination` 별도 배치, `@current-change`에서 API 재호출 |
| 정렬 | `sortable: true` (내장 정렬) | `sortable: 'custom'` + `@sort-change`에서 API 재호출 |
| total | 자동 계산 | 서버 응답의 총 건수 바인딩 |
| 사용 화면 | 대부분 | VirtualPcGroup, TerminalAccessList, userManage 등 대량 데이터 |

---

## 컬럼 정의 패턴

대부분의 화면에서 `cols` 배열을 `data()`에 정의하고 `v-for`로 렌더링:

```javascript
data() {
  return {
    cols: [
      { prop: 'acct_conn_id', label: this.$t('list.common.user.acctConnId'), minWidth: '120' },
      { prop: 'acct_nm',      label: this.$t('list.common.user.acctNm'),     minWidth: '100' },
      { prop: 'reg_ts',       label: this.$t('list.common.date.regTs'),      width: '160',
        formatter: tableFormatDateTime },
      { prop: 'usg_yn',       label: this.$t('list.common.useYn'),           width: '80',
        sortable: true }
    ]
  }
}
```

### 컬럼 주요 속성

| 속성 | 타입 | 설명 |
|------|------|------|
| `prop` | String | 데이터 필드명 |
| `label` | String | 컬럼 헤더 (i18n 키 사용) |
| `width` / `minWidth` | String | 고정/최소 너비 (px) |
| `align` | String | 정렬 (`center`, `left`, `right`) |
| `formatter` | Function | 셀 값 포맷 함수. `(row, column, cellValue)` 시그니처 |
| `sortable` | Boolean/String | `true`(클라이언트 정렬) 또는 `'custom'`(서버 정렬) |
| `show-overflow-tooltip` | Boolean | 텍스트 넘침 시 툴팁 표시 |
| `sort-method` | Function | 커스텀 정렬 함수 |

---

## 커스텀 컴포넌트

### TableColumnIndex (`components/TableColumns/index.vue`)

역순 행 번호(No.) 컬럼. 서버사이드 페이지네이션에서 전체 건수 기반 역순 번호 계산.

```vue
<table-column-index
  :total="totalCount"
  :page="searchForm.page"
  :limit="searchForm.limit"
/>
```

| prop | 설명 |
|------|------|
| `total` | 전체 데이터 건수 |
| `page` | 현재 페이지 번호 |
| `limit` | 페이지당 행 수 |
| `sort` | `true`면 오름차순, 기본은 역순(내림차순) |

번호 계산: `total - (page - 1) * limit - index` (역순)

### ExpandButton (`components/TableColumns/ExpandButton.vue`)

행 확장(expand) 토글 버튼 컬럼. 클릭 시 행의 expand 상태 전환, 버튼 텍스트가 "보기"/"닫기"로 변경.

```vue
<expand-button
  label="상세"
  width="80"
  align="center"
  :event="onExpandCallback"
/>
```

`event` prop에 함수를 넘기면 expand 전에 호출되어 `true` 반환 시만 확장.

### EllipsisTooltip (`components/Form/EllipsisTooltip.vue`)

긴 텍스트를 말줄임표로 표시하고 hover 시 툴팁으로 전체 내용 표시.

```vue
<el-table-column label="설명">
  <template slot-scope="scope">
    <ellipsis-tooltip :content="scope.row.descp" type="p" />
  </template>
</el-table-column>
```

| type | 렌더링 |
|------|--------|
| `p` | `<p>` 태그 |
| `a` | `<a>` 태그 (클릭 이벤트 emit) |
| `td` | `<td>` 태그 (중앙 정렬) |
| `tdL` | `<td>` 태그 (좌측 정렬) |

---

## 포맷터 — `utils/element-helper.js`

`el-table-column`의 `:formatter`에 사용하는 셀 값 변환 함수:

| 함수 | 입력 | 출력 |
|------|------|------|
| `tableFormatDateTime` | timestamp | `YYYY-MM-DD HH:mm` |
| `tableFormaFulltDateTimeS` | timestamp | `YYYY-MM-DD HH:mm:ss` |
| `tableFormaFulltDateTime` | timestamp | `YYYY-MM-DD HH:mm:ssA` |
| `tableFormatDateM` | moment 형식 | `YYYY-MM-DD HH:mm` |
| `tableFormatDateS` | moment 형식 | `YYYY-MM-DD HH:mm:ss` |
| `tableFormatDate` | timestamp | `YYYY-MM-DD` |
| `tableFormatDateRange(fromProp, toProp)` | row 객체 | `시작일 ~ 종료일` |
| `tableFormatComputedDate` | any | 값 없으면 `'-'` |
| `tableToCurrency` | 숫자 | 천 단위 콤마 |
| `tableFormatNullConvert` | 가상PC 목록 | 미할당 VM의 그룹명/사용자명을 `'-'`로 치환 |
| `tableSortWithEmpty(prop)` | - | null/빈값을 맨 뒤로 보내는 정렬 함수 반환 |

### 상태 표시 함수

| 함수 | 용도 |
|------|------|
| `tableToStatusItem(row, col, code, h)` | 상태 코드를 컬러 원(circle) + 라벨로 렌더링. `code` 객체의 키(색상명)로 CSS 클래스 결정 |
| `tableToPushStatusItem(row, col, code, h)` | Push 발송 상태 전용 |
| `tableToCodeLabel(row, col, code)` | 코드 배열을 `/`로 구분된 라벨 문자열로 변환 (Push 채널 등) |

---

## ListContainer — 목록 페이지 레이아웃

`components/Form/ListContainer.vue`. 전역 컴포넌트(`<list-container>`)로 등록. 목록 화면의 표준 레이아웃 제공.

### 구조

```
┌─ slot:top ─────────────────────────┐
├─ slot:targetTenant ────────────────┤
├─ SearchFilter (isShowFilter=true) ─┤
├─ slot:extend ──────────────────────┤
├─ 페이지 크기 선택 + slot:explanation ─┤
├─ slot (기본) ← 테이블 배치 위치 ───┤
└─ slot:footer ──────────────────────┘
```

### props

| prop | 기본값 | 설명 |
|------|--------|------|
| `type` | - | SearchFilter 검색 타입 옵션 배열 |
| `value` | - | 검색 폼 객체 (`v-model`) |
| `isShowTenant` | `false` | SA 테넌트 드롭다운 표시 여부 |
| `isShowFilter` | `true` | SearchFilter 표시 여부 |
| `isShowExplanation` | `true` | 페이지 크기 선택 영역 표시 여부 |
| `isShowPageSize` | `true` | 페이지 크기 셀렉트 표시 여부 |

### 페이지 크기 선택

ListContainer 내부에서 `value.limit`을 페이지 크기 셀렉트에 바인딩. 변경 시 `@search` emit. 옵션은 `$store.getters.page_size` → `[10, 30, 50, 100]`.

---

## SearchFilter — 검색 필터

`components/Form/SearchFilter.vue`. ListContainer 내부에 포함되는 검색 폼.

### 기본 구성

- 검색 타입 드롭다운 + 검색어 입력 + 조회 버튼
- "상세검색" 토글 → 기간 검색 (1주/1개월/3개월/6개월/직접입력)
- SA일 때 상단에 테넌트 드롭다운 추가 (`isSuperAdmin && isShowTenant`)
- 가상PC 목록(`T0702`)에서는 호스트명/Zone/가상PC명/IP 추가 검색 조건 표시

### 검색 폼 기본값 (`defaultSearchFormObj`)

```javascript
{
  type: null,         // 검색 타입
  value: null,        // 검색어
  date: { from: null, to: null },  // 기간
  page: 1,
  limit: 10,
  sort: '',
  sort_type: ''       // 'ASC' / 'DESC'
}
```

`utils/index.js`의 `getApiParam()`으로 API 파라미터로 변환. `date.from/to` → `start_dt/end_dt`, `type/value` → 동적 키로 변환.
