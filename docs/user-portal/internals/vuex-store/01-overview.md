---
type: internal
title: Vuex Store 구조
status: stable
version: v2.2.9
portal: user
source_files:
  - src/store/index.js
  - src/store/getters.js
---

# Vuex Store 구조

`src/store/index.js`에서 7개 모듈을 등록한다.

| 모듈 | namespaced | 상태 | 역할 |
|------|-----------|------|------|
| `app` | No | 활성 | UI 상태 (사이드바, 언어, 디바이스, 이미지, 페이지네이션) |
| `user` | No | 활성 | 인증/세션 관리 |
| `permission` | No | 활성 | 역할 기반 동적 라우트 생성 |
| `tagsView` | No | 활성 | 탭/컴포넌트 캐시 관리 |
| `notice` | Yes | 활성 | 공지사항 페이지네이션 |
| `keylogging` | Yes | 활성 | 키로깅 방지 에이전트 상태 머신 |
| `common` | Yes | 레거시 | 범용 상태 리셋 액션 (최소 사용) |

## 데이터 영속성

| 저장소 | 키 |
|--------|-----|
| localStorage | `sidebarStatus`, `language`, `size`, `images`, `favicon`, `footerInfo`, `settings` |
| sessionStorage | `user`, `rawUser`, `name`, `acct_conn_id`, `acct_id`, `userGrpId`, `connNetCd`, `certPlcyId`, `favorites`, `roles`, `acct_sts_cd` |

## 루트 Getters — `store/getters.js`

| getter | 모듈 | 용도 |
|--------|------|------|
| `sidebar` | app | 사이드바 열림/닫힘 |
| `language` | app | 현재 언어 |
| `device` | app | desktop / mobile |
| `currentMenuId` | app | 현재 활성 메뉴 ID |
| `images` | app | 로고/배경 이미지 URL |
| `table` | app | 테이블 기본 속성 |
| `pagging`, `page_limit`, `page_perPage`, `page_size` | app | 페이지네이션 설정 |
| `token` | user | JWT 토큰 |
| `name`, `userinfo`, `rawUserinfo` | user | 사용자 정보 |
| `roles` | user | 권한 그룹 코드 |
| `favorites` | user | 즐겨찾기 메뉴 ID |
| `userAuthInfo`, `userAuthToken` | user | 2차 인증 시 임시 저장 |
| `permissionRouters`, `addRouters` | permission | 필터링된 라우트 |
| `visitedViews`, `cachedViews` | tagsView | 방문 탭 / 캐시 컴포넌트 |
| `rownum` | notice | 공지사항 행 수 |
