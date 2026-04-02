---
type: screen
title: Cloud PC 기간 연장
status: stable
version: v2.2.9
portal: user
api_endpoints:
  - GET /v1/user/work/request
  - POST /v1/user/work/request
---

# Cloud PC 기간 연장

Cloud PC 사용 기간이 만료되기 전에 연장을 요청하는 기능이다. "Cloud PC 기간 연장" 버튼으로 접근한다.

## 흐름

```
"Cloud PC 기간 연장" 클릭
    ↓
기존 연장 요청 존재 여부 확인
  GET /v1/user/work/request?tgt_vm_id={vmId}&usr_req_div_cd=J003PET&pgrs_sts_cd=J001S
    ├── 기존 요청 있음 → PickedDatesPopup 표시 (기존 요청 확인/취소)
    └── 기존 요청 없음 → VPcPeriodExt 모달 표시
                ↓
        날짜 선택 (vue2-datepicker)
                ↓
        POST /v1/user/work/request
        body: {
          pgrs_sts_cd: 'J001S',          // 상태: 신청
          req_ch_cd: 'J004USR',          // 채널: 사용자 포털
          usr_req_div_cd: 'J003PET',     // 유형: PC 기간 연장
          req_acct_id,                   // 요청자 ID
          tgt_acct_id,                   // 대상자 ID
          tgt_vm_id,                     // 대상 VM ID
          now_vlid_stt_dt,              // 현재 시작일
          now_vlid_end_dt,              // 현재 종료일
          req_vlid_end_dt              // 요청 종료일
        }
                ↓
        PickedDatesPopup 표시 (신청 완료 확인)
```

## 신청 확인/취소 — `PickedDatesPopup.vue`

기존 연장 요청이 있을 때 표시된다. 현재 기간과 요청 기간을 보여주며, 요청 취소가 가능하다.

관리자가 승인하면 사용 기간이 연장되고, VpcInfo의 기본 정보에 반영된다.

API 명세:
- [work-request](../../api/user/work/01-work-request.md)
