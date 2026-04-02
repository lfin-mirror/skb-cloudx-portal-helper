# keylogging 모듈 — `store/modules/keylogging.js`

키로깅 방지 에이전트의 설치/업데이트 상태를 관리하는 상태 머신. namespaced. user-portal과 구조 동일.

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

## 초기화 시점

`permission.js`의 `router.beforeEach`에서 **매 네비게이션마다** `initializeKeylogging()` 호출:

```javascript
router.beforeEach(async (to, from, next) => {
  await initializeKeylogging();
  // ...
});
```

`initializeKeylogging()` 동작:
1. `GET /v1/nauth/system/settings?category=admin` → 대상자 여부 확인
2. `GET /v1/nauth/system/installer` → 설치 파일 정보 조회
3. `store.dispatch('keylogging/initialize')` → 상태 머신 시작

## Actions

| 액션 | 동작 |
|------|------|
| `initialize` | 메인 진입점. 대상자 여부/OS 확인 후 에이전트 상태 체크 |
| `checkOsSupport` | `navigator.userAgent`로 Windows 여부 판단 |
| `checkAgentStatus` | `keyloggingWS.connect()` WebSocket 연결 시도 → 성공 시 버전 확인 |
| `setAgentVersion` | 에이전트 버전과 최소 요구 버전 비교 (`compareVersions`) → 상태 결정 |
| `openInstallModal` / `closeInstallModal` | 설치 모달 제어 |
| `openUpdateModal` / `closeUpdateModal` | 업데이트 모달 제어 |
| `openOsUnsupportedModal` / `closeOsUnsupportedModal` | OS 미지원 모달 제어 |
| `setInstallerInfo` | 서버에서 받은 설치 파일 정보 저장 |

## WebSocket 통신 — `utils/keyloggingWS.js`

`wss://localhost:29999/cx-akl/`로 로컬 에이전트와 바이너리 WebSocket 통신.

### 메시지 프로토콜

16바이트 헤더 + JSON 바디:

```
CX_AKL_MSG {
  uint32_t Version;    // AKL_VERSION = 1
  uint32_t Cmd;        // 명령어 코드
  uint32_t Param;      // 파라미터 (0: 성공)
  uint32_t PayloadLen; // JSON 바디 길이
}
```

### 명령어 코드

| 코드 | 값 | 방향 | 용도 |
|------|-----|------|------|
| `ANTIKEY_ON` | `0x1001` | → Agent | 키로깅 방지 활성화 |
| `ANTIKEY_OFF` | `0x1002` | → Agent | 키로깅 방지 비활성화 |
| `GET_VERSION` | `0x2002` | ↔ | 에이전트 버전 요청/응답 |
| `AUTH` | `0x3001` | → Agent | 인증 |
| `DEMOD_KEY` | `0x4003` | ↔ | 스캔코드 복조 요청/응답 |
| `KEY_EVENT` | `0x4010` | ← Agent | 키 이벤트 (한영키 등) |
| `IME_STATE` | `0x5001` | ← Agent | IME 상태 (한/영) |

### 복조 캐시

`DEMOD_KEY` 응답을 `Map`에 캐시, 같은 스캔코드 재요청 방지. `ANTIKEY_ON`/`ANTIKEY_OFF` 시 캐시 초기화.

### 재연결

연결 끊기면 3초 간격으로 최대 2회 재연결 시도.
