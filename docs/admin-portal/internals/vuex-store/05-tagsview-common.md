# tagsView, common 모듈

## tagsView — `store/modules/tagsView.js`

브라우저 탭 스타일의 페이지 히스토리와 컴포넌트 캐시(keep-alive) 관리. admin-portal은 사이드바와 함께 상단 탭 UI를 제공하므로 실제 사용 중.

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

## common — `store/modules/common.js`

namespaced. 범용 상태 리셋 액션 하나만 제공.

```javascript
resetState({ rootState }, { moduleName, keyName }) {
  rootState[moduleName][keyName] = {};
}
```

다른 모듈의 특정 state 키를 빈 객체로 초기화할 때 사용. 레거시 모듈, 현재 거의 미사용.

## user-portal과의 차이

| 항목 | admin-portal | user-portal |
|------|-------------|-------------|
| `notice` 모듈 | 없음 | 있음 (공지사항 페이지네이션) |
| `tagsView` 사용 | 활성 (상단 탭 UI) | 존재하나 실질 사용 불명확 |
