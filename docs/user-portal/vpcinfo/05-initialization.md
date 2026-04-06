---
type: screen
title: Cloud PC 초기화
status: stable
version: v2.2.10
portal: user
component: SelfFailover.vue
api_endpoints:
  - GET /v1/resource/vpcs/resources
  - GET /v1/user/accounts/usg/history
  - POST /v1/resource/vpcs/resources/{vmAuthId}/recovery
  - POST /v1/resource/vpcs/resources/{vmAuthId}/initial
---

# Cloud PC 초기화

Cloud PC의 모든 데이터를 초기화하거나 과거 초기화 내역을 조회한다.

## 목록 — `SelfFailover.vue`

"Cloud PC 초기화하기" 버튼과 최근 5건의 초기화 이력을 표시한다. 할당된 PC가 없으면 버튼이 비활성화된다.

| 컬럼 | 내용 |
|------|------|
| 실행일시 | 초기화 실행 시각 |
| Cloud PC 유형 | 개인전용PC / 공용PC |
| PC ID | VM 이름 |
| 초기화결과 | 성공/실패 |

### API

```
GET /v1/resource/vpcs/resources → 초기화 가능 PC 확인
  필터: (V001DED + 할당 완료) 또는 V001POO

GET /v1/user/accounts/usg/history
  params: { acct_id, usg_typ_cd: 'Z006E1', start_num: 0, row_count: 5 }
```

초기화 성공 후 10초 대기 후 이력을 새로고침한다.

## 초기화 폼 — `SelffailoverReq.vue`

### PC 선택

개인전용PC(할당 완료 상태)와 공용PC를 라디오 버튼으로 표시한다. 공용PC는 선택 불가(disabled).

### 초기화 흐름

```
PC 선택 → "초기화" 클릭
    ↓
VM 전원 상태 확인 (GET /v1/resource/vpcs/resources/)
  ├── V002ONC (켜짐) → "강제 종료 후 초기화" 경고
  ├── V002OFC (꺼짐) → "초기화 시 데이터 삭제" 확인
  ├── V002CRR (복구 중) → "복구 진행 중" 안내
  └── V002ERC / V002CRU → 에러 상태 안내
    ↓ 확인
API 호출 (static IP 여부에 따라 분기)
  ├── static IP → POST /v1/resource/vpcs/resources/{vmAuthId}/recovery
  └── 일반 → POST /v1/resource/vpcs/resources/{vmAuthId}/initial
  body: { user_workset_yn: 'Y' }
    ↓ 성공
부모 컴포넌트에 'restore' 이벤트 → 10초 후 이력 새로고침
```

API 명세:
- [vpcs-resources](../api/resource/vpcs/01-vpcs-resources.md)
- [accounts](../api/user/accounts/01-accounts.md)
