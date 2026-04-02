# 가상PC 도메인 모듈

가상PC 생성·관리·운영 관련 3개 모듈.

## virtualPc (변수명: `visualPcCreate`) — `store/modules/virtualPc.js`

가상PC 그룹/풀 생성 및 관리. 이름이 `visualPcCreate`로 등록되어 있지만 실제 역할은 그룹·풀 CRUD 전반.

### State

| 필드 | 설명 |
|------|------|
| `vpcManagementList` | 가상PC 그룹 목록 |
| `vpcGrpPoolList` | 그룹별 풀 목록 |
| `vpcManagementDetail` | 그룹 상세 (템플릿 정보 포함) |
| `vpcGroupPoolDetail` | 풀 상세 (템플릿, 정책 ID 포함) |
| `vpcAllAssignList` / `Detail` | 일괄 할당 내역/상세 |
| `subnetDetail` | 네트워크 서브넷 상세 |
| `vpcPolicyDetail` | 전원 관리 정책 상세 |
| `vpcPublicIniDetail` | 공용PC 초기화 정책 상세 |

### 주요 Actions

| 카테고리 | 액션 | API |
|---------|------|-----|
| 그룹 | `getVpcManagementList` | `GET /v1/resource/vpcs/group` |
| 그룹 | `getVpcManagementDetail` | `GET /v1/resource/vpcs/group/{id}` + 템플릿 조회 |
| 그룹 | `postVpcGroup` / `updateVpcManagement` / `deleteVpcGroup` | 그룹 CRUD |
| 그룹 네트워크 | `postVpcGroupNetwork` / `deleteVpcNetwork` | 그룹에 네트워크 연결/해제 |
| 풀 | `getVpcPoolList` | `GET /v1/resource/vpcs/pool?vm_grp_id={id}` |
| 풀 | `postGroupVpcPool` / `updateGroupVpcPoolDetail` / `deleteGroupVpcPool` | 풀 CRUD |
| 할당 | `postVpcUserGroupAssign` | IP 유형(유동/고정)에 따라 다른 API 호출 |
| 일괄 할당 | `getVirtualPcAllAssign` / `Detail` | `GET /v1/resource/vpcs/bundle` |
| 일괄 디스크 | `postVirtualPcDiskAllCreate` / `AllAssign` | 일괄 디스크 생성/할당 |
| 정책 | `postPrivatePcPowerPolicy` / `postPublicInitPcPolicy` | 전원관리/초기화 정책 생성 |
| 정책 | `getPrivatePcPolicyDetail` / `getPublicPcInitDetail` | 정책 상세 조회 |
| 리소스 회수 | `deleteResourceRecall` | `DELETE /v1/resource/vpcs/pool/{id}/collection` |

---

## virtualPcGroup — `store/modules/virtualPcGroup.js`

할당된 가상PC 인스턴스의 목록 조회, 상세, 전원 제어, 스냅샷, 디스크, 예약, 포트 등 운영 기능 담당.

### State

| 필드 | 설명 |
|------|------|
| `virtualPcGroupList` | 할당된 가상PC 목록 |
| `virtualPcPoolList` | 풀 목록 (골든이미지 생성 제외) |
| `virtualPcGroupDetail` | 가상PC 상세 (CPU, 메모리, 디스크 등) |
| `userFlavor` / `userFlavorList` | 현재/변경 가능 자원 세트 |
| `userDiskList` / `userDiskBackupList` | 사용자 디스크 / 백업 목록 |
| `virtualPcSnapshot` | 스냅샷 목록 |
| `virtualPcReservateList` | 예약 관리 목록 |
| `publicPcStandbyList` | 공용PC 대기 자원 목록 |
| `portList` | 포트 목록 |

### 주요 Actions

| 카테고리 | 액션 | API |
|---------|------|-----|
| 목록/상세 | `getVirtualPcGroupList` | `GET /v1/resource/vpcs/resources/list/vm2` |
| 목록/상세 | `getVirtualPcGroupDetail` | `GET /v1/resource/vpcs/resources/{id}` |
| 전원 제어 | `postVirtualPcControl` | `POST /v1/resource/vpcs/resources/{id}/stop` 또는 `/start` |
| 전원 제어 | `postVirtualPcForcedRestart` | `POST /v1/resource/vpcs/resources/{id}/restart` |
| 화면 복구 | `postVirtualPcScreenRecovery` | `GET /v1/resource/vpcs/resources/{id}/screen_recovery` |
| 초기화 | `postVirtualPcInit` | static IP 여부에 따라 `/recovery` 또는 `/initial` |
| 자원 증설 | `postUserVmScaleup` | `POST /v1/resource/vpcs/resources/vm_scaleup` |
| OS 디스크 증설 | `putUserOsDiskScaleup` | `PUT /v1/resource/vm/{vmId}/ext-root-vol` |
| 자원 회수 | `deleteVmTerminate` | `POST /v1/resource/vpcs/resources/{id}/vm_terminate` |
| 원격 접속 | `postVirtualPcRemote` | `POST /sm/v1/cloudpc/vpcs/{vmId}/remote/request` |
| 디스크 | `getUserDiskList` / `getUserDiskBackup` | 사용자 디스크/백업 조회 |
| 디스크 백업 | `postUserDiskBackup` / `putUserDiskBackupRecovery` / `deleteUserDiskBackup` | 백업 실행/복원/삭제 |
| 스냅샷 | `getVirtualPcSnapshot` / `post` / `put` / `delete` | 스냅샷 CRUD |
| 예약 | `getVirtualPcReservate` | `GET /v1/resource/vpcs/resources` (예약 조건) |
| 공용PC 대기 | `getPublicPcStandbyList` | `GET /v1/resource/vpcs/resources/pooled/user_vm` |
| 포트 | `getPort` / `deletePort` | `GET/DELETE /v1/resource/port` |

---

## syncTimer — `store/modules/timer.js`

가상PC 관련 화면의 자동 새로고침 주기(초) 관리. 상수 저장소에 가까움.

### State

| 필드 | 기본값(초) | 용도 |
|------|-----------|------|
| `virtualPcPoolDetailTimer` | 5 | 풀 상세 조회 |
| `virtualPcListPoolTimer` | 5 | 목록 내 풀 조회 |
| `virtualPcListTimer` | 8 | 가상PC 목록 |
| `virtualPcDetailTimer` | 8 | 가상PC 상세 (전원/클라이언트 상태) |
| `virtualPcSnapshotTimer` | 8 | 스냅샷 (생성/복원 상태) |

`setSyncTimer` 액션으로 모든 타이머 값 일괄 설정.
