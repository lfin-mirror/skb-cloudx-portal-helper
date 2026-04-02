---
type: screen
title: 이용 내역
status: stable
version: v2.2.9
portal: user
component: UsageHistory.vue
api_endpoints:
  - GET /v1/user/accounts/usg/history
---

# 이용 내역

포털 접속 이력, Cloud PC 제어/접속/신청/반납/초기화/장애처리 이력을 조회한다.

## 화면 — `UsageHistory.vue`

탭으로 이력 유형을 필터링하고, 날짜별로 그룹핑해서 표시한다. "더보기" 버튼으로 50건씩 추가 로드한다.

### 탭 필터

| 탭 | 코드 | 내용 |
|----|------|------|
| 전체 | (없음) | 모든 이력 |
| 포털 접속 이력 | `Z006A1` | 로그인/로그아웃 |
| 제어 이력 | `Z006B1` | 전원 ON/OFF |
| 접속 이력 | `Z006C1` | Cloud PC 접속 |
| 신청/반납 이력 | `Z006D1` | Cloud PC 신청, 반납 |
| 초기화 이력 | `Z006E1` | Cloud PC 초기화 |
| 장애처리 이력 | `Z006G1` | 장애처리 신청/완료 |

### API

```
GET /v1/user/accounts/usg/history
  params: { acct_id, usg_typ_cd, start_num, row_count: 50, sort: 'act_tm', sort_type: 'desc' }
  → 이력 배열 (50건씩 페이지네이션)
```

50건 미만 반환 시 "더보기" 버튼이 숨겨진다.

API 명세:
- [accounts](../api/user/accounts/01-accounts.md)
