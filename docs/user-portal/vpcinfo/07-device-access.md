---
type: screen
title: 단말 접속 관리
status: stable
version: v2.2.10
portal: user
component: DeviceAccMng.vue
api_endpoints:
  - POST /v1/user/work/request
---

# 단말 접속 관리

Cloud PC에 접속할 수 있는 디바이스를 등록·관리하는 기능이다. Cloud PC 관리 메뉴의 "단말 접속 정보 등록"과 "단말 접속 정보 현황"에 해당한다.

## 지원 디바이스 유형

`DeviceAccReq.vue`의 디바이스 유형 드롭다운에서 선택 가능한 값:

| 유형 | 설명 |
|------|------|
| Windows | Windows PC |
| Linux | Linux PC |
| Thin Client | 씬 클라이언트 |
| MacOS | Mac |
| iOS | iPhone/iPad |
| Android | Android 기기 |

## 단말 접속 정보 등록 — `views/vPcInfo/DeviceAccMng.vue`

등록된 디바이스 목록과 등록 요청 목록을 탭으로 구분해 보여준다.

### 등록 요청 — `DeviceAccReq.vue`

```
디바이스 정보 입력
  - 클라이언트 유형 (OS 선택)
  - 단말명
  - 단말 ID (영문, 숫자, 하이픈만 허용)
  - MAC 주소
  - IP 주소
  - 메모
    ↓
유효성 검사 (단말 ID, MAC 주소, IP 주소 형식)
    ↓
POST /v1/user/work/request
    ↓
관리자 승인 대기
    ↓ 승인 완료
접속 허용 디바이스로 등록
```

등록 요청은 관리자의 승인을 거쳐야 한다. 승인 전까지 요청 상태로 남는다.

### 단말 접속 정보 현황 — `DeviceAccList.vue`

승인 완료된 디바이스 목록을 표시한다:
- 클라이언트 유형, 단말명, MAC 주소, IP 주소
- 삭제 기능 (등록 해제)

### 요청 상세 — `DeviceDetail.vue`

등록 요청의 상세 정보를 팝업으로 표시한다. 디바이스 정보, 메모, 요청 이력 등을 확인할 수 있다.

API 명세:
- [work-request](../api/user/work/01-work-request.md)
- [device-access](../api/user/device-access/01-device-access.md)
