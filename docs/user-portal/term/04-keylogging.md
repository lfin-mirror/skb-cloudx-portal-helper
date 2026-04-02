---
type: concept
title: 키로깅 방지 (AntiKeyLogger)
status: stable
version: v2.2.9
tags: [키로깅, 보안, WebSocket, 에이전트]
related_screens:
  - ../internals/vuex-store/04-keylogging.md
---

# 키로깅 방지 (AntiKeyLogger)

user-portal 웹에서 입력 필드에 포커스할 때, 로컬에 설치된 CloudX AntiKeyLogger Agent와 WebSocket으로 통신해서 키 입력을 보호하는 기능이다. 키로거 악성코드가 키보드 입력을 가로채는 것을 방지한다.

## 대상자 결정

테넌트별 설정 `userPtalKlpUseYn`으로 활성화 여부가 결정된다. `permission.js`의 `tntExists()` 응답에서 받아서 Vuex `keylogging/initialize`에 전달한다. 비대상자는 키로깅 방지 없이 정상 사용한다.

## 에이전트 상태

| 상태 | 조건 | 동작 |
|------|------|------|
| `pass` | 비대상자 또는 비Windows에서 허용 | 아무것도 안 함 |
| `unsupported` | Windows 외 OS + 미허용 설정 | 입력 필드 포커스 시 OS 미지원 모달 |
| `uninstalled` | 에이전트 미설치 (WebSocket 연결 실패) | 입력 필드 포커스 시 설치 안내 모달 |
| `outdated` | 에이전트 버전 < 최소 요구 버전 | 입력 필드 포커스 시 업데이트 안내 모달 |
| `ready` | 에이전트 정상 연결 + 버전 충족 | 포커스 시 보호 활성화, 블러 시 비활성화 |

`uninstalled`, `unsupported`, `outdated` 상태에서는 입력 필드에 포커스하면 **즉시 포커스가 해제**되고 안내 모달이 표시된다. 에이전트를 설치/업데이트하지 않으면 입력 자체가 불가능하다.

## WebSocket 통신

로컬 에이전트와 `wss://localhost:29999/cx-akl/`로 바이너리 프로토콜 통신한다.

| 코드 | 명령 | 방향 | 설명 |
|------|------|------|------|
| `0x1001` | ANTIKEY_ON | 브라우저→에이전트 | 키 보호 활성화 |
| `0x1002` | ANTIKEY_OFF | 브라우저→에이전트 | 키 보호 비활성화 |
| `0x2002` | GET_VERSION | 브라우저→에이전트 | 에이전트 버전 조회 |
| `0x3001` | AUTH | 브라우저→에이전트 | 연결 인증 |
| `0x4001` | KEY | 브라우저→에이전트 | 키 이벤트 전달 |
| `0x4003` | DEMOD_KEY | 양방향 | 스캔코드 복조 (캐시 지원) |
| `0x4010` | KEY_EVENT | 에이전트→브라우저 | 키 이벤트 수신 (한영키 등) |
| `0x5001` | IME_STATE | 에이전트→브라우저 | 한/영 상태 변경 알림 |

보호 활성화 시 에이전트가 키보드 입력을 가로채 암호화하고, 복호화된 키 이벤트를 WebSocket으로 브라우저에 전달한다. 키로거가 있어도 원본 키 입력을 읽을 수 없다.

## 관련 파일

| 파일 | 역할 |
|------|------|
| `utils/keyloggingWS.js` | WebSocket 클라이언트 |
| `store/modules/keylogging.js` | 상태 머신 (Vuex) |
| `App.vue` | 전역 포커스/블러에서 보호 ON/OFF |
| `KeyloggingInstallModal.vue` | 설치 안내 모달 |
| `KeyloggingUpdateModal.vue` | 업데이트 안내 모달 |
| `KeyloggingOsUnsupportedModal.vue` | OS 미지원 안내 모달 |

## 제한 사항

- Windows 전용 — 로컬 에이전트가 Windows에서만 동작
- 데스크톱 전용 — 모바일(iOS/Android)에서는 로컬 에이전트 설치 불가
- 설치 파일은 `GET /v1/nauth/system/installer`로 조회하며, 다운로드 페이지에서도 제공 (현재 UI에서는 주석 처리)
