---
type: internal
title: app 모듈
status: stable
version: v2.2.10
portal: user
source_files:
  - src/store/modules/app.js
api_endpoints:
  - GET /v1/nauth/system/portals/ui/{tntUrlId}/public
---

# app 모듈 — `store/modules/app.js`

UI 전반의 상태를 관리한다. 사이드바, 디바이스 유형, 언어, 테넌트별 이미지/로고 등.

## State

| 필드 | 초기값 | 설명 |
|------|--------|------|
| `sidebar.opened` | localStorage `sidebarStatus` | 사이드바 열림/닫힘 |
| `sidebar.withoutAnimation` | `false` | 애니메이션 없이 전환 |
| `device` | `'desktop'` | desktop / mobile |
| `language` | localStorage `language` 또는 `'ko'` | 현재 언어 |
| `size` | localStorage `size` 또는 `'medium'` | Element UI 컴포넌트 크기 |
| `currentMenuId` | `''` | 현재 선택된 메뉴 ID |
| `images` | `{ isLoad, loginBg, loginLogo, mainBg, mainLogo }` | 테넌트별 이미지 URL |
| `table` | Element UI 테이블 기본 속성 | border, stripe, size 등 |
| `pagging` | `{ limit: 10, perPage: 10, sizes: [10,30,50,100] }` | 페이지네이션 기본값 |

## Actions

| 액션 | 동작 |
|------|------|
| `toggleSideBar` | 사이드바 열기/닫기 토글, localStorage 동기화 |
| `closeSideBar` | 사이드바 강제 닫기 |
| `toggleDevice` | device를 'mobile' 또는 'desktop'으로 전환 |
| `setLanguage` | 언어 변경, `<html lang>` 속성 업데이트, 세션 코드 초기화 |
| `setSize` | Element UI 컴포넌트 크기 변경 |
| `setImages` | **API 호출** `GET /v1/nauth/system/portals/ui/{tntUrlId}/public` → favicon, 푸터, 로고/배경 이미지 저장 |
| `setCurrentMenuId` | 현재 메뉴 ID 업데이트 |
