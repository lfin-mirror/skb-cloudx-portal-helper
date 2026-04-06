---
type: screen
title: 장애처리 신청
status: stable
version: v2.2.10
portal: user
component: DisReqList.vue
api_endpoints:
  - GET v1/resource/vpcs/resources
  - GET /v1/user/work/request
  - PUT /v1/user/work/request/{usr_req_id}
  - POST /v1/user/work/request
---

# 장애처리 신청

관리자가 사용자의 Cloud PC에 원격 접속하여 장애 원인을 분석하고 직접 조치할 수 있도록 신청한다.

## 목록 — `views/support/DisReqList.vue`

최근 5건의 장애처리 신청 내역을 표시한다. 할당된 Cloud PC가 없으면 신청 버튼이 비활성화된다.

| 컬럼 | 내용 |
|------|------|
| 신청일시 | 신청 등록 시각 |
| PC ID | 대상 VM 이름 |
| 신청자 메모 | 사용자가 작성한 장애 내용 (보기 팝업) |
| 신청결과 | 진행 상태 코드명 |
| 요청 | 취소 버튼 |
| 관리자 메모 | 관리자 처리 내용 (보기 팝업) |

### API

```
GET v1/resource/vpcs/resources → Cloud PC 할당 여부 확인
GET /v1/user/work/request
  params: { req_acct_conn_id, req_acct_nm, usr_req_div_cd: 'J003ERR', start_num: 0, row_count: 5, sort: 'reg_ts,', sort_type: 'desc' }
  → 신청 목록 배열

PUT /v1/user/work/request/{usr_req_id} → 신청 취소
  body: { had_acct_id, had_detl, had_tm, pgrs_sts_cd: 'J001C' }
```

## 등록 — `views/support/DisReqReg.vue`

### 입력 항목

**1. Cloud PC 선택** — 할당된 VM 중 하나를 라디오 버튼으로 선택. 개인전용PC(`V001DED`) / 공용PC(`V001POO`)로 구분 표시.

**2. 장애 유형 태그 선택** — 3개 그룹에서 복수 선택 가능:

| 그룹 | 태그 | 코드 |
|------|------|------|
| PC 장애 | 뷰어 연결 | `A015PC1` |
| | 부팅 | `A015PC2` |
| | 멈춤 | `A015PC3` |
| | 인터넷 | `A015PC4` |
| | 로그인 | `A015PC5` |
| 프로그램 오류 | 윈도우 | `A015PG1` |
| | 브라우저 | `A015PG2` |
| | 오피스 | `A015PG3` |
| | 기타 | `A015PG4` |
| 기타 장애 오류 | 바이러스 | `A015ET1` |
| | 접속 불가 | `A015ET2` |

**3. 신청자 메모** — textarea (최대 1000자)

**4. 원격 접속 동의** — 체크박스 필수. VM 선택 + 메모 입력 후 활성화.

### API

```
GET /v1/resource/vpcs/resources → 선택 가능한 VM 목록
  전용PC + 할당 완료(U017DVA 아닌 것) 또는 공용PC

POST /v1/user/work/request → 신청 등록
  body: {
    demd_detl,                      // 메모
    now_flavor_id,                  // 현재 스펙 ID
    pgrs_sts_cd: 'J001S',          // 신청 상태
    req_acct_id,                    // 요청자 ID
    req_ch_cd: 'J004USR',          // 채널: 사용자 포털
    tgt_acct_id,                    // 대상자 ID
    tgt_vm_id,                      // 대상 VM ID
    tnt_grp_id,                     // 테넌트 그룹 ID
    tnt_mtd_cd,                     // 테넌트 방식 코드
    usr_grp_id,                     // 사용자 그룹 ID
    usr_req_div_cd: 'J003ERR',     // 유형: 장애처리
    usr_req_flt_typ_l: [{ flt_typ_cd }]  // 장애 유형 코드 배열
  }
```

API 명세:
- [work-request](../api/user/work/01-work-request.md)
- [vpcs-resources](../api/resource/vpcs/01-vpcs-resources.md)
