# Nova — 마이그레이션과 HA(Evacuate)

admin-portal 메뉴: 시스템 자원 > 마이그레이션(A1006), HA(A1011)

## Migration (마이그레이션)

VM을 한 호스트에서 다른 호스트로 이동하는 작업.

### Cold Migration (오프라인 마이그레이션)

```
1. VM 정지 (shutdown)
2. 디스크 데이터를 대상 호스트로 복사
3. 대상 호스트에서 VM 기동
```

- 다운타임 발생
- 디스크가 큰 VM은 시간이 오래 걸림
- 공유 스토리지 없어도 가능

### Live Migration (라이브 마이그레이션)

```
1. VM 실행 유지
2. 메모리 상태를 대상 호스트로 반복 복사 (iterative copy)
3. 최종 전환 (짧은 중단, 수 ms)
4. 원본 호스트에서 VM 정리
```

- 무중단 (거의)
- 공유 스토리지 필요 (또는 block migration 사용)
- 메모리 쓰기가 많은 VM은 수렴이 어려울 수 있음

### CloudX 마이그레이션

admin-portal에서 "마이그레이션"은 관리자가 수동으로 특정 VM을 지정 호스트로 이동하는 작업.

**마이그레이션 목록 조회**는 로컬 DB:
```
admin-portal GET /v1/resource/vpcs/migration
  → app-ms-resource MigrationController → MigrationService
    → MigrationMapper.paging() (MariaDB)
    → plat-ms-vid4o 호출 안 함
```

**마이그레이션 실행**은 OpenStack 호출:
```
app-ms-resource (내부)
  → plat-ms-vid4o POST /compute/server/action/migrate/{serverId}
    → Nova os.compute().servers().liveMigrate()
```

### 마이그레이션 상태

| 상태 | 색상 | 설명 |
|------|------|------|
| 대기 | 파랑 | 작업 큐에 등록 |
| 진행 중 | - | 데이터 복사 중 |
| 완료 | 초록 | 성공적으로 이동 |
| 에러 | 빨강 | 실패 |

8초 주기 자동 갱신으로 상태 모니터링.

## Evacuate (대피, HA)

호스트 **장애** 발생 시 VM을 다른 호스트로 복구하는 작업. Migration과의 핵심 차이: **원본 호스트가 down 상태**.

### Migration vs Evacuate

| 항목 | Migration | Evacuate |
|------|-----------|----------|
| 원본 호스트 상태 | up (정상) | down (장애) |
| 목적 | 부하 분산, 유지보수 | 장애 복구 |
| 데이터 손실 | 없음 | 로컬 디스크 데이터 손실 가능 |
| 공유 스토리지 | Live 시 필요 | 필수 (로컬 디스크는 복구 불가) |
| 트리거 | 관리자 수동 | 자동(HA) 또는 수동 |

### Evacuate 동작

```
1. 호스트 장애 감지 (state: down)
2. 해당 호스트의 VM 목록 조회
3. 각 VM을 다른 정상 호스트에서 재생성
4. 공유 스토리지 볼륨 재연결
```

### CloudX HA

```
admin-portal POST /v1/resource/evacuate/{host_id}  (수동 실행)
  → app-ms-resource EvacuateController → EvacuateService
    → Step 1: EvacuateMapper.getHostInfo() (로컬 DB에서 호스트 상태 확인)
    → Step 2: VMService → plat-ms-vid4o GET /compute/servers (호스트의 VM 목록 조회)
    → Step 3: VMActionService.evacuateVMAsync() (비동기)
      → 각 VM에 대해 plat-ms-vid4o POST (live-migrate)
        → Nova os.compute().servers().liveMigrate()

기존 문서의 단순화된 흐름:
admin-portal POST /v1/resource/evacuate/{host_id}
  → app-ms-resource
    → plat-ms-vid4o POST /compute/server/evacuate
      → Nova POST /servers/{id}/action { evacuate: { host, onSharedStorage } }
```

| 필드 | 설명 |
|------|------|
| `host_sts_cd` | 호스트 상태 (위험/정상) |
| `dng_sts_tm` | 위험 상태 감지 시각 |
| `auto_mng_yn` | 자동(`Y`) / 수동(`N`) 대피 |
| `act_vm_cnt` / `tgt_vm_cnt` | 실행된 VM 수 / 대상 VM 수 |

자동 HA: 호스트 down 감지 시 자동으로 Evacuate 실행 (SA 설정).
수동 HA: 관리자가 HA 실행 버튼 클릭.
