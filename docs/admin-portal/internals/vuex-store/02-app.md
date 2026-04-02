# app 모듈 — `store/modules/app.js`

UI 전반의 상태 관리. 사이드바, 디바이스 유형, 언어, 포털 이미지/로고, 저작권 등.

## State

| 필드 | 초기값 | 설명 |
|------|--------|------|
| `sidebar.opened` | localStorage `sidebarStatus` | 사이드바 열림/닫힘 |
| `sidebar.withoutAnimation` | `false` | 애니메이션 없이 전환 |
| `device` | `'desktop'` | 항상 desktop (모바일 미지원) |
| `language` | localStorage `language` 또는 `'ko'` | 현재 언어 |
| `size` | localStorage `size` 또는 `'medium'` | Element UI 컴포넌트 크기 |
| `currentMenuId` | `null` | 현재 선택된 메뉴 ID |
| `images` | `{ isLoad, login: { background, logo }, main: { logo } }` | 포털 UI 이미지 |
| `ptalLinTitle` | `'Cloud X Service Portal'` | 로그인 페이지 제목 |
| `copyright` | `'COPYRIGHT © SK BROADBAND CO., LTD. ALL RIGHTS RESERVED.'` | 하단 저작권 |
| `footerInfo` | `{ inquiry: '', contact: '' }` | 하단 문의/연락처 |
| `table` | Element UI 테이블 기본 속성 | `highlight-current-row`, `empty-text` 등 |
| `pagging` | `{ limit: 10, perPage: 10, sizes: [10, 30, 50, 100] }` | 페이지네이션 기본값 |

## Actions

| 액션 | 동작 |
|------|------|
| `toggleSideBar` | 사이드바 열기/닫기 토글, localStorage 동기화 |
| `closeSideBar` | 사이드바 강제 닫기 |
| `toggleDevice` | device 전환 (미사용) |
| `setLanguage` | 언어 변경, `<html lang>` 속성 업데이트, 세션 코드 초기화 |
| `setSize` | Element UI 컴포넌트 크기 변경 |
| `setImages` | **API 호출** `GET /v1/nauth/system/portals/ui/ADMIN/public` → 로고/배경 이미지, 저작권, 푸터 정보, 포털 제목 저장 |
| `setCurrentMenuId` | 현재 메뉴 ID 업데이트 |

### user-portal과의 차이

| 항목 | admin-portal | user-portal |
|------|-------------|-------------|
| `setImages` API 경로 | `/ADMIN/public` (고정) | `/{tntUrlId}/public` (테넌트별) |
| `ptalLinTitle` | 로그인 제목 커스터마이징 | 없음 |
| `footerInfo` | 문의/연락처 표시 | 없음 |
| 사이드바 | 실제 사용 (vue-element-admin 원본) | 비활성화 (`WIDTH = 0`) |
