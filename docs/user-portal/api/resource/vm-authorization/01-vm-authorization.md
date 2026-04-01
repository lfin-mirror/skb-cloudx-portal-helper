# VM 인가 API

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
| vmId | string | VM ID. 뷰어 연결 URL 파라미터(`vpc_id`)로 사용. |
| vmPowerStateCode | string | 전원 상태 코드 |
| vmAllocationStatus | string | 할당 상태 코드명 |
| vmAllocationStatusCode | string | 할당 상태 코드 |
| tenantMethodCode | string | 테넌트 방식 코드 (`V001DED`: 전용, `V001POO`: 공용) |
| vmValidStartDate | string | 사용 시작일 (`YYYYMMDD`) |
| vmValidEndDate | string | 사용 종료일 (`YYYYMMDD`) |
| lastStartTime | string | 최근 구동 시간 |
| lastUserConnectionTime | string | 최근 접속 시간 |
| hostStatusCode | string | 호스트 상태 코드 (`P003DWN`: 호스트 다운) |
| securityPolicyId | string | 보안 정책 ID |
| vmAuthorizationId | string | VM 인가 ID |
| vmName | string | VM 이름 |
| vcpuCount | number | vCPU 수 |
| vmemoryCapacity | number | 메모리 용량 (MB) |
| vharddiskCapacity | number | HDD 용량 (GB) |
| ip | string | IP 주소 |
| adInterlockUsageYn | string | AD 연동 사용 여부 (`Y`/`N`) |
| adInterlockSuccessYn | string | AD 연동 성공 여부 (`Y`/`N`/`null`). `null`이면 AD 조인 진행 중. |
| userVmConnectStatusCode | string | 사용자 VM 연결 상태 코드 (`V003ON`: 이미 연결됨) |

응답이 `null`이면 VM 정보 없음으로 처리.

### 호출 위치

- `views/home/components/VpcInfo.vue:1002` — 전원 상태 폴링 (`getVpcDetail`, `powerCheck`)
- `views/home/components/VpcInfo.vue:1255` — Cloud PC 실행 버튼 클릭 시 연결 상태 확인 (`connectSystem`)
