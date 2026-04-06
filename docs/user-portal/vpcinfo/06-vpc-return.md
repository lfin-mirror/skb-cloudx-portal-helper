---
type: screen
title: Cloud PC 반납
status: stable
version: v2.2.10
portal: user
component: VPcReturn.vue
api_endpoints:
  - GET /v1/user/work/request
  - PUT /v1/user/work/request/{usr_req_id}
  - GET /v1/resource/vpcs/resources
  - POST /v1/user/work/request
---

# Cloud PC 반납

Cloud PC 사용 권한을 반납하고 사용을 중지한다.

## 목록 — `VPcReturn.vue`

최근 5건의 반납 신청 내역을 표시한다.

| 컬럼 | 내용 |
|------|------|
| 신청일시 | 반납 신청 시각 |
| Cloud PC 유형 | 개인전용PC(`V001DED`) / 공용PC(`V001POO`) |
| PC ID (권한ID) | VM 이름 및 권한 ID |
| 신청결과 | 진행 상태 코드명 |
| 요청 | 취소 버튼 |
| 관리자메모 | 보기 버튼 |

### API

```
GET /v1/user/work/request
  params: { usr_req_div_cd: 'J003RET', start_num: 0, row_count: 5 }

PUT /v1/user/work/request/{usr_req_id}  → 반납 취소
  body: { had_acct_id, pgrs_sts_cd: 'J001C' }
```

## 반납 폼 — `VPcReturnReq.vue`

### 입력 항목

**PC 선택** — 반납 가능한 VM을 라디오 버튼으로 표시. 개인전용PC(할당 완료) 또는 공용PC만 대상.

선택하면 CPU/메모리/HDD 스펙이 자동 표시된다.

**메모** — textarea (최대 1000자). XSS 필터링(`filterXSS()`) 적용.

### API

```
GET /v1/resource/vpcs/resources → 반납 가능 PC 목록
  필터: (V001DED + 할당 완료) 또는 V001POO

POST /v1/user/work/request → 반납 신청
  body: {
    usr_req_div_cd: 'J003RET',
    req_ch_cd: 'J004USR',
    pgrs_sts_cd: 'J001S',
    req_acct_id, tgt_acct_id,
    demd_detl,
    usr_grp_id, tnt_url_id,
    tnt_mtd_cd,
    tgt_vm_auth_id, tgt_vm_id,
    now_flavor_id
  }
```

API 명세:
- [work-request](../api/user/work/01-work-request.md)
- [vpcs-resources](../api/resource/vpcs/01-vpcs-resources.md)
