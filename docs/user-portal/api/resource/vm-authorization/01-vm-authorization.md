# VM 인가 API

## 사용 화면
- [홈 화면 레이아웃 및 폴링](../../../vpcinfo/home/01-layout-and-polling.md)
- [Cloud PC 상세 정보 및 상태](../../../vpcinfo/home/02-vpc-info-and-status.md)

## GET `/v1/resource/vm-authorization/{vmAuthId}`

VM 인가 정보를 조회한다. Cloud PC 실행(뷰어 연결) 전 연결 상태 및 AD 조인 여부 확인, 그리고 전원 상태 폴링에 사용된다.

### 요청

**Path Parameters**

| 필드 | 타입 | 설명 |
|------|------|------|
| vmAuthId | string | VM 인가 ID |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| vmAuthorizationId | string | VM 인가 ID |
| accountId | string | 계정 ID |
| vmId | string | VM ID. 뷰어 연결 URL 파라미터(`vpc_id`)로 사용. |
| vmName | string | VM 이름 |
| vmAlias | string | VM 별칭 |
| vmDescription | string | VM 설명 |
| tenantId | string | 테넌트 ID |
| tenantMethodCode | string | 테넌트 방식 코드 (`V001DED`: 전용, `V001POO`: 공용) |
| tenantMethod | string | 테넌트 방식명 |
| vmPoolId | string | VM Pool ID |
| sortOrder | number | 정렬 순서 |
| vmPowerStateCode | string | 전원 상태 코드 |
| vmAllocationStatus | string | 할당 상태 코드명 |
| vmAllocationStatusCode | string | 할당 상태 코드 |
| vmAllocationTypeCode | string | 할당 유형 코드 |
| vmAllocationType | string | 할당 유형명 |
| allocationTime | string | 할당 시간 |
| allocateFailMessage | string | 할당 실패 메시지 |
| vmValidStartDate | string | 사용 시작일 (`YYYYMMDD`) |
| vmValidEndDate | string | 사용 종료일 (`YYYYMMDD`) |
| lastStartTime | string | 최근 구동 시간 |
| lastUserConnectionTime | string | 최근 접속 시간 |
| hostStatusCode | string | 호스트 상태 코드 (`P003DWN`: 호스트 다운) |
| hostStatus | string | 호스트 상태명 |
| securityPolicyId | string | 보안 정책 ID |
| backupSnapshotPolicyId | string | 백업 스냅샷 정책 ID |
| networkQosPolicyId | string | 네트워크 QoS 정책 ID |
| volumeTypeId | string | 볼륨 유형 ID |
| restoreStatusCode | string | 복원 상태 코드 |
| restoreStatus | string | 복원 상태명 |
| osTypeCode | string | OS 유형 코드 |
| osType | string | OS 유형명 |
| vcpuCount | number | vCPU 수 |
| vmemoryCapacity | number | 메모리 용량 (MB) |
| vharddiskCapacity | number | HDD 용량 (GB) |
| ip | string | IP 주소 |
| adInterlockUsageYn | string | AD 연동 사용 여부 (`Y`/`N`) |
| adInterlockSuccessYn | string | AD 연동 성공 여부 (`Y`/`N`/`null`). `null`이면 AD 조인 진행 중. |
| userVmConnectStatusCode | string | 사용자 VM 연결 상태 코드 (`V003ON`: 이미 연결됨) |
| registrantId | string | 등록자 ID |
| registeredTime | string | 등록 일시 |
| modifierId | string | 수정자 ID |
| modifiedTime | string | 수정 일시 |

응답이 `null`이면 VM 정보 없음으로 처리.

### 호출 위치

- `views/home/components/VpcInfo.vue:1002` — 전원 상태 폴링 (`getVpcDetail`, `powerCheck`)
- `views/home/components/VpcInfo.vue:1255` — Cloud PC 실행 버튼 클릭 시 연결 상태 확인 (`connectSystem`)
