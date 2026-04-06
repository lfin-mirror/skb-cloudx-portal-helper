---
type: screen
title: 전원 제어
status: stable
version: v2.2.10
portal: user
component: VpcInfo.vue
api_endpoints:
  - POST /v1/resource/vpcs/resources/{vmAuthorizationId}/start
  - POST /v1/resource/vpcs/resources/{vmAuthorizationId}/stop
  - POST /v1/resource/vpcs/resources/{vmAuthorizationId}/restart
  - GET /v1/nauth/system/{tenant_id}/getToday
---

# 전원 제어

Cloud PC의 전원 ON/OFF/재부팅을 제어한다. VpcInfo.vue의 전원 토글 스위치로 조작한다.

## 전원 제어 흐름

```
전원 토글 클릭
    ↓
vpcPowerControl()
    ↓
검증:
  1. 데이터 로드 완료 확인
  2. 다른 전원 조작 진행 중이 아닌지 확인 (isProcessing)
  3. 사용 기간 유효성 확인 (checkPeriod)
    ↓
VpcPowerPopup 표시 ("전원을 켜시겠습니까?" / "전원을 끄시겠습니까?")
    ↓ 확인
API 호출
    ↓
powerCheck() 폴링 시작 (10초 간격)
```

## API 엔드포인트

| 동작 | 메서드 | 엔드포인트 |
|------|--------|----------|
| 전원 ON | POST | `/v1/resource/vpcs/resources/{vmAuthorizationId}/start` |
| 전원 OFF | POST | `/v1/resource/vpcs/resources/{vmAuthorizationId}/stop` |
| 재부팅 | POST | `/v1/resource/vpcs/resources/{vmAuthorizationId}/restart` |

재부팅은 개인 PC(dedicated)에서만 사용 가능하다.

## 사용 기간 검증 — `checkPeriod()`

전원 조작 전에 서버 시간 기준으로 사용 기간을 확인한다:

```
GET /v1/nauth/system/{tenant_id}/getToday
  → 현재 서버 시간 반환
  → validStartDate <= now <= validEndDate 확인
  → 기간 외이면 전원 조작 차단
```

## 전원 상태 전이

```
전원 ON 요청:
  V002OFC (꺼짐) → V002ONG (부팅중) → V002ONC (켜짐)

전원 OFF 요청:
  V002ONC (켜짐) → V002OFG (종료중) → V002OFC (꺼짐)

재부팅 요청:
  V002ONC (켜짐) → V002ONR (재부팅중) → V002ONC (켜짐)
```

전이 중에는 전원 토글이 비활성화되고(`isProcessing = true`), `powerCheck()` 폴링으로 상태 안정화를 감지한 뒤 토글을 다시 활성화한다.

## 전원 조작 불가 상태

다음 상태에서는 전원 조작이 차단된다:

- 이미 전원 조작 중 (`V002ONG`, `V002OFG`, `V002ONR`)
- 장애 복구 중 (`V002CRR`)
- OS 업그레이드 중 (`V002CRU`)
- 마이그레이션/스냅샷/업그레이드 진행 중 (`V002MGG`, `V002SNG`, `V002UPG`, `V002UPR`)
- 할당 진행 중 (`V002CRG`, `V002CRW`)
- 자원 회수 중 (`V002RMC`, `V002RMG`)
- 사용 기간 외

API 명세:
- [vpcs-resources](../../api/resource/vpcs/01-vpcs-resources.md)
- [system-public](../../api/nauth/system/01-system-public.md)
