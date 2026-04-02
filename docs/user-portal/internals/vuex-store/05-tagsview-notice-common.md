---
type: internal
title: tagsView, notice, common 모듈
status: stable
version: v2.2.9
portal: user
source_files:
  - src/store/modules/tagsView.js
  - src/store/modules/notice.js
  - src/store/modules/common.js
---

# tagsView, notice, common 모듈

## tagsView — `store/modules/tagsView.js`

브라우저 탭 스타일의 페이지 히스토리와 컴포넌트 캐시(keep-alive)를 관리한다.

### State

| 필드 | 설명 |
|------|------|
| `visitedViews` | 방문한 페이지 탭 목록 (경로 기준 중복 제거) |
| `cachedViews` | keep-alive 캐시 대상 컴포넌트 이름 목록 (`noCache`가 아닌 것만) |
| `networkData` | 네트워크 생성 폼 임시 데이터 |

### 주요 Actions

| 액션 | 동작 |
|------|------|
| `addView` | visitedViews + cachedViews에 추가 |
| `delView` | 특정 뷰 삭제 |
| `delOthersViews` | 지정 뷰 외 전체 삭제 |
| `delAllViews` | 전체 초기화 |

---

## notice — `store/modules/notice.js`

공지사항/FAQ 목록의 페이지네이션 상태를 관리한다. namespaced.

### State

| 필드 | 설명 |
|------|------|
| `rownum` | 전체 행 수 |
| `pagenum` | 현재 페이지 |
| `noticeList` | 공지 목록 배열 |

### Actions

`setRownum`, `setPagenum`, `setNoticeList` — 각각 대응하는 mutation을 commit한다.

---

## common — `store/modules/common.js`

namespaced. 범용 상태 리셋 액션 하나만 제공한다.

```javascript
resetState({ rootState }, { moduleName, keyName }) {
  rootState[moduleName][keyName] = {};
}
```

레거시 모듈로, 현재 거의 사용되지 않는다.
