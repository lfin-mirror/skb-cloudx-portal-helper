---
type: screen
title: Cloud PC 신청
status: stable
version: v2.2.9
portal: user
component: VPcReq.vue
api_endpoints:
  - GET /v1/user/work/request
  - PUT /v1/user/work/request/{usr_req_id}
  - GET /v1/resource/vpcs/resources
  - GET /v1/operation/cert/n2nd/info/{certPlcyId}
  - GET /v1/nauth/system/{tnt_url_id}/getToday
  - GET /v1/resource/vpcs/auto/mapping/user/pool/list
  - POST /v1/user/work/request
  - POST /v1/resource/vpcs/resources/vm_auto_assign
---

# Cloud PC 신청

Cloud PC 이용 권한을 신청하거나 과거 신청 내역을 조회한다.

## 목록 — `VPcReqList.vue`

최근 5건의 신청 내역을 표시한다.

| 컬럼 | 내용 |
|------|------|
| 신청일시 | 등록 시각 |
| Cloud PC 유형 | 개인전용PC / 공용PC |
| 신청결과 | 진행 상태 코드명 |
| 요청 | 취소 버튼 |
| 관리자메모 | 보기 버튼 (RequesterMemo 팝업) |

"Cloud PC 신청하기" 버튼 클릭 시 VM 제한 수를 확인한다:

```
GET /v1/resource/vpcs/resources → 현재 할당된 VM 수
GET /v1/operation/cert/n2nd/info/{certPlcyId} → vm_rstt_cnt (최대 VM 수)
  → 초과 시 "더 이상 Cloud PC를 신청할 수 없습니다" 팝업
  → 미초과 시 VPcReq 폼 표시
```

### API

```
GET /v1/user/work/request
  params: { usr_req_div_cd: 'J003USE', start_num: 0, row_count: 5, sort: 'reg_ts', sort_type: 'desc' }

PUT /v1/user/work/request/{usr_req_id}  → 신청 취소
  body: { had_acct_id, pgrs_sts_cd: 'J001C' }
```

## 신청 폼 — `VPcReq.vue`

### 신청 유형

| 유형 | 코드 | 설명 |
|------|------|------|
| 개인전용PC | `V001DED` | 한 사용자에게 전용으로 할당 |
| 공용PC | `V001POO` | 풀에서 공유 |

### 할당 방식

| 방식 | 설명 |
|------|------|
| 관리자 승인 | 신청 후 관리자가 승인하면 할당 |
| 즉시 할당 | 사용 가능한 풀에서 즉시 자동 할당 |

즉시 할당 선택 시 풀 목록이 테이블로 표시되고, 풀을 선택해야 신청 가능.

### API

```
GET /v1/nauth/system/{tnt_url_id}/getToday → 현재 날짜

GET /v1/resource/vpcs/auto/mapping/user/pool/list  → 즉시 할당 가능 풀 목록
  params: { tnt_mtd_cd, auto_allo_yn: 'Y' }

POST /v1/user/work/request  → 관리자 승인 신청
  body: { pgrs_sts_cd: 'J001S', req_ch_cd: 'J004USR', usr_req_div_cd: 'J003USE', tnt_mtd_cd, demd_detl, ... }

POST /v1/resource/vpcs/resources/vm_auto_assign  → 즉시 할당
  body: { vm_pool_id, vm_vlid_stt_dt: today, vm_vlid_end_dt: '29990101' }
```

API 명세:
- [work-request](../api/user/work/01-work-request.md)
- [vpcs-resources](../api/resource/vpcs/01-vpcs-resources.md)
- [cert-policy](../api/operation/cert/01-cert-policy.md)
- [system-public](../api/nauth/system/01-system-public.md)
