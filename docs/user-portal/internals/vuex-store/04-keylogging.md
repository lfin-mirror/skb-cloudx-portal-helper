---
type: internal
title: keylogging 모듈
status: stable
version: v2.2.10
portal: user
source_files:
  - src/store/modules/keylogging.js
used_by:
  - ../../../term/04-keylogging.md
---

# keylogging 모듈 — `store/modules/keylogging.js`

키로깅 방지 에이전트의 설치/업데이트 상태를 관리하는 상태 머신이다. namespaced.

## State

| 필드 | 설명 |
|------|------|
| `agentStatus` | 에이전트 상태: `'pass'` / `'unsupported'` / `'uninstalled'` / `'outdated'` / `'ready'` |
| `agentVersion` | 설치된 에이전트 버전 객체 |
| `installerInfo` | 서버에서 받아온 설치 파일 메타데이터 |
| `isInstallModalVisible` | 설치 안내 모달 표시 여부 |
| `isUpdateModalVisible` | 업데이트 안내 모달 표시 여부 |
| `isOsUnsupportedModalVisible` | OS 미지원 모달 표시 여부 |

## 상태 전이

```
initialize()
  ├── 대상자 아님 (isEligible === false) → 'pass'
  ├── Windows가 아님 → allowUnsupportedOs에 따라 'pass' 또는 'unsupported'
  └── Windows + 대상자 → checkAgentStatus()
        ├── WebSocket 연결 실패 → 'uninstalled'
        └── WebSocket 연결 성공 → setAgentVersion()
              ├── 버전 < minimumVersion → 'outdated'
              └── 버전 >= minimumVersion → 'ready'
```

## Actions

| 액션 | 동작 |
|------|------|
| `initialize` | 메인 진입점. 대상자 여부/OS 확인 후 에이전트 상태 체크 |
| `checkAgentStatus` | `keyloggingWS.connect()` WebSocket 연결 시도 → 성공 시 버전 확인 |
| `setAgentVersion` | 에이전트 버전과 최소 요구 버전 비교 (`compareVersions`) → 상태 결정 |
| `openInstallModal` / `closeInstallModal` | 설치 모달 제어 |
| `openUpdateModal` / `closeUpdateModal` | 업데이트 모달 제어 |
| `openOsUnsupportedModal` / `closeOsUnsupportedModal` | OS 미지원 모달 제어 |
| `setInstallerInfo` | 서버에서 받은 설치 파일 정보 저장 |

에이전트 통신은 `wss://localhost:29999/cx-akl/`로 로컬 WebSocket 연결한다. 데스크톱(Windows) 전용이다.
