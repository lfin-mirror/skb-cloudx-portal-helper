---
type: concept
title: 키로깅 방지
status: stable
version: v2.2.11
portal: admin
tags: [키로깅, 보안, keylogging]
related_screens:
  - 관리자/02-시스템 설정.md
  - 테넌트/01-테넌트.md
---

# 키로깅 방지 — admin-portal의 2단계 구조

admin-portal의 키로깅 방지는 **2단계** 제어 구조. 시스템 설정의 전역 ON/OFF + 테넌트 상세의 테넌트별 세부 설정.

```
1단계: 시스템 설정 (A1209) — 전역 스위치
  └── keylogging_protect_yn = Y/N

2단계: 테넌트 상세 — 테넌트별 스위치
  ├── user_ptal_klp_use_yn — 사용자 포털 적용 여부
  └── clnt_viwr_klp_use_yn — Client Viewer 적용 여부
```

## 1단계: 시스템 설정 — 전역 스위치

[환경 설정 (A1209)](../화면/관리자/02-시스템%20설정.md#환경-설정-a1209)의 `keylogging_protect_yn` 필드 = 전역 스위치.

| 값 | 동작 |
|-----|------|
| `Y` | 키로깅 방지 활성화 — admin-portal 매 네비게이션마다 에이전트 연결 확인 |
| `N` | 키로깅 방지 비활성화 — 에이전트 확인 없이 정상 사용 |

SA 전용 설정. 조회: `GET /v1/nauth/system/settings?category=admin`, 변경: `PUT /v1/system/settings`.

같은 화면의 `unsupported_os_allow_yn` 필드 — UI에 표시되지만 disabled 상태, 편집 불가.

## 2단계: 테넌트 상세 — 테넌트별 스위치

[테넌트 상세](../화면/테넌트/01-테넌트.md)의 키로깅 방지 섹션 — 테넌트별 세부 설정.

| 필드 | 대상 | SA | TA |
|------|------|----|----|
| `user_ptal_klp_use_yn` | 사용자 포털 | 편집 가능 | 편집 가능 |
| `clnt_viwr_klp_use_yn` | Client Viewer | 편집 가능 | 편집 가능 |
| `klp_os_allow_yn` | 미지원 OS 접속 허용 | disabled | disabled |

`klp_os_allow_yn` — 화면에 표시되지만 저장 시 서버로 전송하지 않는 필드 (코드에서 주석 처리).

## 초기화 흐름 — permission.js

`router.beforeEach`의 매 네비게이션마다 `initializeKeylogging()` 호출:

```
1. GET /v1/nauth/system/settings?category=admin → keylogging_protect_yn 확인
2. GET /v1/nauth/system/installer → 설치 파일 정보 조회
3. store.dispatch('keylogging/initialize') → 상태 머신 시작
```

상태 머신 전이 흐름 — [Vuex keylogging 모듈](../internals/vuex-store/04-keylogging.md) 참조.

## admin vs user-portal 차이

| 항목 | admin-portal | user-portal |
|------|-------------|-------------|
| 대상자 판별 소스 | `GET /v1/nauth/system/settings?category=admin` | `tntExists()` 응답의 `userPtalKlpUseYn` |
| 제어 단계 | 2단계 (전역 + 테넌트) | 1단계 (테넌트 설정만) |
| `allowUnsupportedOs` | `'Y'` 하드코딩 (비Windows에서도 접속 허용) | 서버 응답(`klpOsAllowYn`)에서 동적 결정 |
| 키로깅 설정 UI | 시스템 설정 + 테넌트 상세에서 관리 | 설정 UI 없음 (admin에서 설정한 값을 소비) |

`allowUnsupportedOs = 'Y'` 하드코딩의 결과 — admin-portal은 macOS/Linux 등 비Windows 환경에서도 에이전트 미설치 모달 없이 접속 가능. user-portal은 테넌트 설정에 따라 비Windows 접속 차단 가능.

## 에이전트 상태, WebSocket 프로토콜, 제한 사항

에이전트 5가지 상태(`pass` / `unsupported` / `uninstalled` / `outdated` / `ready`), WebSocket 바이너리 프로토콜(`wss://localhost:29999/cx-akl/`), Windows 전용 제한 등 공통 개념 — [user-portal 키로깅 방지 문서](../../user-portal/term/04-keylogging.md) 참조.

## 관련 파일

| 파일 | 역할 |
|------|------|
| `permission.js` | `initializeKeylogging()` — 매 네비게이션마다 키로깅 초기화 |
| `store/modules/keylogging.js` | 상태 머신 (Vuex) |
| `utils/keyloggingWS.js` | WebSocket 클라이언트 |
| `views/adminSetting/EnvironmentSetting.vue` | 시스템 설정 (A1209) — 전역 스위치 UI |
| `views/tenant/IndexDetail.vue` | 테넌트 상세 — 테넌트별 스위치 UI |

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|---------|
| v2.2.11 | 2026-04-13 | 신규 작성 — admin-portal 키로깅 방지 2단계 제어 구조 |
| v1.0 | 2026-04-13 | 최초 작성 |
