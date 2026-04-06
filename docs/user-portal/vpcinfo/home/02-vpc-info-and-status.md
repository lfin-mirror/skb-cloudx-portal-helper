---
type: screen
title: Cloud PC 상세 정보 및 상태
status: stable
version: v2.2.10
portal: user
component: VpcInfo.vue
api_endpoints:
  - GET /v1/management/dashboard/user/{vmAuthorizationId}/stat
  - GET /v1/resource/vm-authorization/{vmAuthorizationId}
---

# Cloud PC 상세 정보 및 상태 — VpcInfo.vue

HomePage에서 선택된 Cloud PC의 상세 정보를 표시하는 컴포넌트다. 리소스 사용량, 전원 상태, 기본 정보, 디바이스 정책을 보여준다.

## 화면 섹션

### PC 상태 및 전원

- PC 이름
- 상태 배지 (예: "사용가능", "부팅중", "전원 꺼짐")
- 전원 토글 스위치 (ON/OFF)

### 리소스 사용량

CPU, 메모리, 디스크 사용률을 프로그레스 바로 표시한다.

```
GET /v1/management/dashboard/user/{vmAuthorizationId}/stat
응답: { cpu_usage, mem_used, mem_total, disk_used, disk_total }
```

### 액션 버튼

- "Cloud PC 실행" — 접속 (아래 "Cloud PC 접속 흐름" 참고)
- "Cloud PC 기간 연장" — 사용 기간 연장 요청 ([04-period-extension.md](./04-period-extension.md))

### 기본 정보 (BaseInfoPopup)

| 항목 | 설명 |
|------|------|
| 최근 시작 시간 | 마지막 전원 ON 시각 |
| 최근 접속 시간 | 마지막 사용자 접속 시각 |
| 이용 기간 | 시작일 ~ 종료일 |
| IP 주소 | 할당된 IP |

### 디바이스 정책 (DetailInfoPopup / CertPlcyExcNw)

정책 항목(클립보드, 프린터, 드래그앤드롭, USB, 화면 캡처 등)과 일반/예외 네트워크 구분, API 상세는 [Cloud PC 디바이스 정책](../../../term/01-virtual-pc-policy.md) 참고.

## 전원 상태 코드

### VM 전원 상태 (power_state)

| 코드 | 의미 | 화면 표시 |
|------|------|----------|
| `V002ONC` | 전원 켜짐 | "사용가능" |
| `V002OFC` | 전원 꺼짐 | "전원 꺼짐" |
| `V002ONG` | 부팅 중 | "부팅중" |
| `V002OFG` | 종료 중 | "종료중" |
| `V002ONR` | 재부팅 중 | "재부팅 중" |
| `V002ERC` | 장애 | "장애" |
| `V002CRR` | 장애 복구 중 | "장애복구 중" |
| `V002CRU` | OS 업그레이드 중 | "업그레이드 중" |
| `V002MGG` | 마이그레이션 중 | 동작 중 표시 |
| `V002SNG` | 스냅샷 중 | 동작 중 표시 |
| `V002UPG` / `V002UPR` | 업그레이드 | 동작 중 표시 |
| `V002CRG` / `V002CRW` | 할당 중 | "할당 진행 중" |
| `V002RMC` / `V002RMG` | 자원 회수 | "자원 회수 중" |

### 할당 상태 (allocation_status)

| 코드 | 의미 |
|------|------|
| `U017DVA` | 미할당 |
| `U017PVN` | VM 미생성 |
| `U017ALR` | 할당 중 |
| `U017RAR` | 재할당 중 |

공유 PC는 할당 상태를, 개인 PC는 사용 가능 여부를 표시한다. 비정상 전원 상태에서는 "부팅중(할당중)"처럼 조합해서 보여준다.

## 상태 폴링

전원 조작 후 10초 간격으로 상태를 폴링한다:

```
powerCheck()
  → GET /v1/resource/vm-authorization/{vmAuthorizationId}
  → selectedVpcInfo 업데이트
  → sessionStorage['vpc_info'] 동기화
  → 상태 안정화될 때까지 반복
```

---

## Cloud PC 접속 흐름 — `connectSystem()`

"Cloud PC 실행" 버튼을 누르면 VDI 클라이언트 앱이 실행되어 Cloud PC에 접속한다. 데스크톱과 모바일 모두 동일한 흐름이다.

모바일 접속 특이사항은 [mobile/01-mobile-app-and-connection.md](../../mobile/01-mobile-app-and-connection.md) 참고.

### 접속 전 검증

```
1. 호스트 상태 확인 (P003DWN = 서버 다운)
2. VM 상태 확인 (V002ERC = 에러, V002CRU = 업그레이드 중)
3. 마이그레이션 진행 여부 확인
4. AD 연동 확인 (adInterlockUsageYn === 'Y'이면 AD 가입 완료 대기)
5. VM 접속 권한 확인 (GET /v1/resource/vm-authorization/{id})
6. 이미 접속 중인지 확인 (V003ON = 이미 접속 중 → 강제 재접속 여부 확인)
```

### 접속 URI 구성

```
skbvdi://cloudpc?
  &apigw_token={Authorization 토큰}
  &apigw_url={API Gateway URL}
  &vpc_id={VM ID}
  &type=ver2
  &customer_type=SKB
  &force={y|n}
```

`location.href = 'skbvdi://cloudpc?' + connectUri`로 실행한다.

`skbvdi://`는 SKB VDI 클라이언트 앱이 OS에 등록하는 커스텀 URI 스킴(Custom URL Scheme)이다. `http://`가 브라우저를 여는 것처럼, `skbvdi://`는 VDI 클라이언트 앱을 여는 프로토콜이다. 클라이언트 앱을 설치하면 OS에 이 스킴이 핸들러로 등록되고, 브라우저에서 `location.href`에 이 URI를 할당하면 OS가 해당 앱을 실행하면서 `?` 뒤의 파라미터(토큰, API 주소, VM ID 등)를 전달한다. 앱은 이 정보로 API Gateway에 인증하고 해당 VM에 원격 접속한다.

클라이언트 앱이 설치되어 있지 않으면 OS가 이 스킴을 처리할 수 없어서 아무 일도 일어나지 않는다. 이 경우를 대비해 접속 팝업에서 다운로드 페이지 링크를 제공한다. IE/Win7 환경에서는 `location.href` 대신 iframe을 생성해서 프로토콜 핸들러를 트리거한다.

API 명세:
- [vm-authorization](../../api/resource/vm-authorization/01-vm-authorization.md)
- `GET /v1/management/dashboard/user/{vmAuthorizationId}/stat` (미작성)

### 접속 팝업 — `CloudPcConnPopup.vue`

접속 URI를 호출한 뒤 10초 카운트다운 팝업이 표시된다:
- "PC Client가 자동 실행됩니다"
- 10초 후 자동 닫힘
- 클라이언트가 실행되지 않으면 다운로드 페이지로 이동하는 버튼 제공
