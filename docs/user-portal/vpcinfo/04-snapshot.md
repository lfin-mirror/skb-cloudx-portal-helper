---
type: screen
title: 스냅샷 및 복원
status: stable
version: v2.2.10
portal: user
component: SnapshotRecovery.vue
api_endpoints:
  - GET /v1/resource/vpcs/resources
  - GET /v1/resource/snapshot/{vm_auth_id}
  - POST /v1/resource/snapshot/execSnapshot/{vm_auth_id}
  - PUT /v1/resource/snapshot/restore/{vm_auth_id}/{snap_id}
  - DELETE /v1/resource/snapshot/{snap_id}
---

# 스냅샷 및 복원

Cloud PC의 스냅샷을 생성하고, 성공한 스냅샷으로 복원한다.

## 화면 — `SnapshotRecovery.vue`

Cloud PC를 드롭다운에서 선택한 뒤 "스냅샷조회하기"를 클릭하면 해당 PC의 스냅샷 내역이 표시된다.

| 컬럼 | 내용 |
|------|------|
| 구분 | 스냅샷 유형 |
| 생성일시 | 스냅샷 생성 시각 |
| 스냅샷결과 | 성공/실패 |
| 관리 | 복원 버튼 |
| 복원결과 | 복원 상태 |
| 삭제 | 삭제 버튼 |

상단에 최대 스냅샷 수(`maxSnapCnt`)가 표시되며, "스냅샷추가하기" 버튼으로 새 스냅샷을 생성한다.

### 복원 흐름

```
"복원" 클릭
    ↓
VM 전원 상태 확인 (GET /v1/resource/vpcs/resources/{vm_auth_id})
  ├── V002OFC (꺼짐) → 복원 진행
  └── V002ONC (켜짐) → "전원을 끈 후 복원해주세요" 경고
    ↓
PUT /v1/resource/snapshot/restore/{vm_auth_id}/{snap_id}
    ↓
3초 간격 자동 폴링으로 복원 상태 확인
    ↓ 복원 완료
폴링 중단
```

복원 중(`isRestoring = true`)에는 3초 간격으로 스냅샷 목록을 재조회해서 상태를 갱신한다.

### API

```
GET /v1/resource/vpcs/resources → VM 목록
GET /v1/resource/snapshot/{vm_auth_id} → 스냅샷 목록 + max_snap_cnt
POST /v1/resource/snapshot/execSnapshot/{vm_auth_id} → 스냅샷 생성
PUT /v1/resource/snapshot/restore/{vm_auth_id}/{snap_id} → 복원
DELETE /v1/resource/snapshot/{snap_id} → 삭제
```

API 명세:
- [vpcs-resources](../api/resource/vpcs/01-vpcs-resources.md)
- [snapshot](../api/resource/snapshot/01-snapshot.md)
