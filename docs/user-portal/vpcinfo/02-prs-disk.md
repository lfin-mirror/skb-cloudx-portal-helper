---
type: screen
title: 개인 디스크 관리
status: stable
version: v2.2.10
portal: user
component: PrsDskMng.vue
api_endpoints:
  - GET /v1/resource/disk/local/{acct_id}
  - PUT /v1/resource/disk/local/attach
  - PUT /v1/resource/disk/local/detach
  - DELETE /v1/resource/disk/local/{dsk_id}
  - POST /v1/resource/disk/local
---

# 개인 디스크 관리

개인 디스크를 Cloud PC에 연결, 분리, 삭제하거나 새 디스크를 추가한다.

## 화면 — `PrsDskMng.vue`

상단에 현재 디스크 수와 사용 용량을 표시한다.

| 컬럼 | 내용 |
|------|------|
| 디스크명 | 디스크 이름 |
| 용량 | 디스크 크기 |
| 연결된 Cloud PC | 드롭다운으로 PC 선택 |
| 관리 | 적용 / 분리 / 삭제 버튼 |

### 동작

| 동작 | 조건 | API |
|------|------|-----|
| 적용 (연결) | 드롭다운에서 PC 선택 후 | `PUT /v1/resource/disk/local/attach` body: `{ acct_id, dsk_id, vm_auth_id }` |
| 분리 | 이미 연결된 디스크 | `PUT /v1/resource/disk/local/detach` body: `{ acct_id, dsk_id, vm_auth_id }` |
| 삭제 | 확인 팝업 후 | `DELETE /v1/resource/disk/local/{dsk_id}` |

### 디스크 목록 조회

```
GET /v1/resource/disk/local/{acct_id}
  → { usr_dsk_cnt, dsk_size, usr_disk[], usr_dsk_rstt_cnt, usr_dsk_max_size, usr_vm[] }
```

`usr_vm[]`은 디스크를 연결할 수 있는 Cloud PC 목록이다.

## 디스크 추가 — `PrsDskApplyPopup.vue`

10GB 단위 크기 선택 칩을 표시한다. 사용 가능한 크기 목록은 부모에서 `availableDiskSpaceList` prop으로 전달받는다.

```
POST /v1/resource/disk/local
  body: { acct_id, size }
```

생성 요청 후 5초 대기 후 목록을 새로고침한다 (디스크 생성에 시간이 걸리므로).

API 명세:
- [disk-local](../api/resource/disk/01-disk-local.md)
