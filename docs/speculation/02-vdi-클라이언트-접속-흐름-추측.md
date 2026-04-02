# VDI 클라이언트 접속 흐름 (추측)

사용자가 user-portal에서 "Cloud PC 실행" 버튼을 눌렀을 때의 전체 흐름. 포털 코드는 검증 완료, 클라이언트 앱 내부 동작은 추측.

## 추측 근거

1. user-portal `VpcInfo.vue`의 `connectSystem()`, `handlerConnect()` 메서드 (코드 검증)
2. admin-portal `VirtualPcRemote.vue`의 원격 제어 흐름 (코드 검증)
3. `CloudPcConnPopup.vue`의 10초 카운트다운 팝업 (코드 검증)
4. `skbvdi://` URI 스킴 파라미터 구조 (코드 검증)
5. SPICE 프로토콜 문서 기반 클라이언트 앱 동작 (추측)

## 전체 흐름

```
사용자 브라우저 (user-portal)
     │
     │ ① "Cloud PC 실행" 클릭
     ▼
  접속 전 검증 (5단계)
     │
     │ ② skbvdi://cloudpc?... URI 생성
     ▼
  브라우저 → OS URI 스킴 핸들러
     │
     │ ③ OS가 skbvdi:// 등록된 앱 실행
     ▼
  VDI 클라이언트 앱 (PC Client)
     │
     │ ④ URI 파라미터로 API Gateway 인증 (추측)
     │ ⑤ VM 접속 정보 조회 (추측)
     ▼
  SPICE 프로토콜로 VM 원격 접속 (추측)
```

## ① 접속 전 검증 — `connectSystem()` (코드 검증)

"Cloud PC 실행" 버튼 클릭 시 5단계 검증 수행:

| 순서 | 검증 항목 | 조건 | 결과 |
|------|----------|------|------|
| 1 | 중복 클릭 방지 | `sessionStorage.duplicationFlag === 'true'` | "잠시 후 다시 시도해주세요" |
| 2 | 호스트 상태 | `hostStatusCode === 'P003DWN'` | "서버 장애 상태" |
| 3 | VM 상태 | `vmPowerStateCode` 확인 | 아래 표 참고 |
| 4 | 사용 기간 | `checkPeriod()` 비동기 호출 | 기간 만료 시 차단 |
| 5 | AD 연동 | `adInterlockUsageYn === 'Y'` 시 `adInterlockSuccessYn` 확인 | AD 조인 미완료/실패 시 차단 |

### VM 상태 코드별 분기

| `vmPowerStateCode` | 의미 | 동작 |
|--------------------|------|------|
| `V002ONC` | 전원 켜짐 (정상) | → 접속 진행 |
| `V002ONG` | 시작 중 | "전원 시작중" 안내 |
| `V002ONR` | 재시작 중 | "전원 시작중" 안내 |
| `V002OFG` | 종료 중 | "전원 종료중" 안내 |
| `V002ERC` / `V002CRU` | 에러 | "관리자에게 문의" |
| `V002MGG` | 마이그레이션 중 | "작업중" 안내 |
| `V002CRR` | Evacuate 중 | "작업중" 안내 |
| 그 외 | 전원 꺼짐 | "전원을 켜신 후 이용" |

### 이미 접속 중 (V003ON)

VM 상태가 `V002ONC`(켜짐)이어도, `userVmConnectStatusCode === 'V003ON'`이면 이미 Viewer가 실행 중.

→ "현재 연결을 끊고 새로 연결하시겠습니까?" 확인 팝업 표시. 확인 시 `force=y` 파라미터로 강제 재접속.

## ② URI 구성 (코드 검증)

```
skbvdi://cloudpc?
  apigw_token={JWT Authorization 토큰}
  &apigw_url={API Gateway 주소}
  &vpc_id={VM ID}
  &type=ver2
  &customer_type=SKB
  &force={y|n}
```

| 파라미터 | 출처 | 설명 |
|---------|------|------|
| `apigw_token` | `sessionStorage.Authorization` | JWT 인증 토큰 |
| `apigw_url` | `sessionStorage/localStorage.apiGateway` | API Gateway 주소 |
| `vpc_id` | `GET /v1/resource/vm-authorization/{id}` 응답의 `vmId` | VM 식별자 |
| `type` | 하드코딩 `ver2` | 프로토콜 버전 |
| `customer_type` | 하드코딩 `SKB` | 고객사 구분 |
| `force` | 접속 상태에 따라 `y`/`n` | `y`: 기존 연결 끊고 재접속, `n`: 신규 접속 |

### 관리자 원격 제어 (admin-portal)

관리자가 VM에 원격 접속할 때는 추가 파라미터:

```
skbvdi://cloudpc?
  apigw_token={토큰}
  &apigw_url={API Gateway}
  &vpc_id={VM ID}
  &type=ver2
  &REMOTE=1          ← 원격 제어 플래그
```

원격 제어는 사용자 승인 필요:
1. `POST /sm/v1/cloudpc/vpcs/{vmId}/remote/request` → 요청 전송
2. 5초 간격 폴링: `GET /sm/v1/cloudpc/vpcs/{vmId}/remote/request/{requestKey}`
3. `APPROVED` → 클라이언트 실행 / `REJECTED` → 거부 안내 / `PROGRESS` → 대기 계속

## ③ 브라우저별 URI 스킴 호출 — `handlerConnect()` (코드 검증)

| 브라우저/OS | 호출 방식 |
|------------|----------|
| IE 10+ (msLaunchUri 지원) | `navigator.msLaunchUri('skbvdi://...', successCb, failCb)` |
| IE + Windows 7 | 숨겨진 iframe 생성 → `iframe.contentWindow.location.href` (3초 후 iframe 제거) |
| Chrome / Firefox / Safari 등 | `location.href = 'skbvdi://...'` 직접 할당 |

모든 경우에 `CloudPcConnPopup` 팝업 표시:
- 10초 카운트다운 후 자동 닫힘
- "PC Client가 자동 실행되지 않을 경우 다운로드 페이지에서 설치해 주세요"
- `다운로드 페이지로` 버튼 → `/{tntUrlId}/support/FileDownload` 이동

## ④⑤ 클라이언트 앱 내부 동작 (추측)

VDI 클라이언트 앱 소스코드는 코드베이스에 없음. URI 파라미터와 SPICE 프로토콜 구조를 기반으로 추측.

### 추측 흐름

```
클라이언트 앱 실행
  │
  │ URI 파라미터 파싱
  │   apigw_token, apigw_url, vpc_id, force
  │
  ├── apigw_url + apigw_token으로 API Gateway 인증 (추측)
  │     → JWT 토큰 유효성 검증
  │     → 해당 사용자가 vpc_id에 접근 권한이 있는지 확인
  │
  ├── VM 접속 정보 조회 (추측)
  │     → SPICE 서버 IP/Port 조회
  │     → 보안 정책 (USB, 클립보드, 워터마크 등) 조회
  │     → force=y면 기존 세션 종료 요청
  │
  ├── SPICE 연결 수립 (추측)
  │     → nova-spicehtml5proxy 또는 직접 SPICE 서버에 연결
  │     → TLS 핸드셰이크 (spice_tls_port 사용 시)
  │     → 채널 멀티플렉싱: display, inputs, usbredir, playback 등
  │
  └── 정책 적용 (추측)
        → Metadata 정책: 모니터 수, 해상도
        → USB 정책: 허용/차단 장치 필터링
        → 워터마크: 화면 오버레이
        → 세션 만료: 타이머 설정
```

### 클라이언트 앱이 네이티브 앱인 이유 (추측)

- USB 리디렉션: 로컬 USB 장치에 직접 접근해야 하므로 브라우저만으로 불가
- SPICE 프로토콜: 웹 버전(spice-html5)도 있지만 USB/오디오/멀티모니터 지원이 제한적
- 워터마크 렌더링: OS 레벨 화면 오버레이
- 화면 캡처 차단: OS 레벨 API 필요
- `.exe`(Windows) / `.pkg`(Mac) 형태로 배포

## 설치 파일 관리 (코드 검증)

admin-portal에서 PC Client 설치 파일을 관리하는 메뉴 존재.

### 지원 파일 형식

| 확장자 | OS |
|--------|-----|
| `.exe`, `.msi` | Windows |
| `.pkg` | macOS |
| `.run`, `.tgz` | Linux |
| `.zip` | 공통 |

### 관리 필드

| 필드 | 설명 |
|------|------|
| `ui_file_div_nm` | 파일 구분 (예: "PC Client") |
| `ui_file_nm` | 파일명 |
| `ver` | 소프트웨어 버전 |
| `hash_cd_val` | 해시 코드 (무결성 검증) |
| `forc_upd_ver` | 강제 업데이트 버전 — 이 버전 미만이면 업데이트 강제 (추측) |
| `descp` | 설명 |

### API

| 동작 | API |
|------|-----|
| 목록 | `GET /v1/system/portals/guides` |
| 상세 | `GET /v1/system/portals/guides/{id}` |
| 생성 | `POST /v1/system/portals/guides/create` |
| 수정 | `PUT /v1/system/portals/guides/{id}` |
| 삭제 | `DELETE /v1/system/portals/guides/{id}` |

## 주석 처리된 코드 — policyInsert (참고)

VpcInfo.vue에 주석 처리된 `policyInsert()` 메서드:

```javascript
// POST /v1/policy/api/{client_type}/{vmId}
// params: { acct_conn_id, vmId, tnt_url_id, type: 'PC' | 'MOBILE' }
```

접속 시 정책 정보를 서버에 전송하는 로직이 있었으나 현재 비활성. `type: 'MOBILE'` 분기가 있는 것으로 보아 **모바일 VDI 클라이언트도 계획에 있었던 것으로 추측**.

## 미확인 사항

- 클라이언트 앱이 API Gateway에 인증하는 정확한 방식 (JWT 토큰을 어떤 API에 보내는지)
- SPICE 연결 시 nova-spicehtml5proxy를 경유하는지 직접 연결인지
- `force=y` 시 기존 세션 종료가 클라이언트 측인지 서버 측인지
- `forc_upd_ver` (강제 업데이트 버전)의 정확한 동작 메커니즘
- `customer_type=SKB`가 클라이언트 동작에 어떤 영향을 주는지
- `type=ver2`의 의미 (ver1과의 차이)
- 모바일 VDI 클라이언트의 현재 상태 (주석 코드에 'MOBILE' 타입 존재)
- Agent 파일(`.exe` 전용)과 PC Client의 관계 — KeyLogging Agent 등 보안 에이전트가 별도 존재
