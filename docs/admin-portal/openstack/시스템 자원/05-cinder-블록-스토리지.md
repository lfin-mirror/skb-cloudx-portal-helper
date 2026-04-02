# Cinder — 블록 스토리지

admin-portal 메뉴: 시스템 자원 > 스토리지 (A1005/T1005)

## OpenStack Cinder

블록 스토리지 서비스. VM에 연결/분리 가능한 가상 디스크(Volume) 관리.

## Volume (볼륨)이란

물리 PC에서 하드디스크/SSD가 하는 역할을 가상으로 구현한 것. 실제로는 네트워크 저장소(NetApp 등)의 공간 일부를 잘라서 VM에 "디스크처럼" 연결.

```
물리 PC                              VM (가상 PC)
┌──────────────┐                    ┌──────────────┐
│ C: SSD 256GB │ ← 물리 디스크       │ C: 볼륨 100GB │ ← Cinder Volume (루트)
│ D: HDD 1TB   │ ← 물리 디스크       │ D: 볼륨 50GB  │ ← Cinder Volume (개인 디스크)
└──────────────┘                    └──────────────┘
                                          │
                                    네트워크로 연결
                                          │
                                    ┌─────▼─────┐
                                    │ NetApp 저장소│ ← 실제 데이터 저장 위치
                                    └───────────┘
```

물리 PC는 디스크가 본체에 물리적으로 꽂혀있지만, VM의 볼륨은 네트워크 너머 저장소에 있음. 그래서:
- **Attach/Detach** — USB 외장 하드처럼 VM에 연결/분리 가능
- **Live Migration** — VM이 다른 호스트로 이동해도 디스크는 네트워크 저장소에 그대로 있어서 데이터 손실 없음
- **Backup/Snapshot** — 저장소 레벨에서 복사하니까 VM을 끄지 않아도 가능 (단, 데이터 정합성을 위해 끄는 경우도 있음)

### 볼륨 라이프사이클

```
생성 (creating)
  │
  ▼
사용 가능 (available) ←──── 분리 (detach)
  │                           ▲
  │ 연결 (attach)              │
  ▼                           │
VM에 연결됨 (in-use) ────────┘
  │
  ├── 백업 (backing-up) → 백업 완료 → in-use로 복귀
  │
  ├── 스냅샷 생성 → 특정 시점 저장
  │
  └── 삭제 (deleting) → 삭제 완료
       ※ in-use 상태에서는 삭제 불가 → 먼저 detach 필요
```

### 볼륨 상태

| 상태 | 설명 |
|------|------|
| `creating` | 생성 중 |
| `available` | 사용 가능 (VM 미연결) |
| `in-use` | VM에 연결됨 |
| `deleting` | 삭제 중 |
| `error` | 에러 |
| `backing-up` | 백업 중 |
| `restoring-backup` | 백업 복원 중 |

### 볼륨 용도 (CloudX)

| 용도 | 설명 |
|------|------|
| 루트 디스크 | VM OS가 설치된 부팅 볼륨 |
| 추가 디스크 | 사용자 데이터용 추가 볼륨 (개인 디스크) |
| 백업 디스크 | 스냅샷/백업 대상 볼륨 |

## Volume Type (볼륨 타입)

스토리지 백엔드와 속성을 정의하는 프로필.

```
Volume Type: "SSD-Premium"
  ├── Backend: netapp-ssd (실제 스토리지 시스템)
  ├── QoS: high-iops (성능 정책)
  └── Extra Specs: { 'volume_backend_name': 'netapp-ssd' }
```

| 속성 | 설명 |
|------|------|
| `name` | 볼륨 타입 이름 |
| `backend` | 연결된 스토리지 백엔드 |
| `is_public` | 전체 테넌트 공개 여부 |
| `extra_specs` | 메타데이터 (백엔드명, 복제 정책 등) |

CloudX에서는 SA가 Volume Type을 생성하고 테넌트에 할당. 가상PC 그룹 생성 시 Volume Type 선택.

## Volume QoS (디스크 QoS)

볼륨의 I/O 성능을 제한하는 정책.

| 속성 | 설명 |
|------|------|
| `read_iops_sec` | 초당 읽기 IOPS 제한 |
| `write_iops_sec` | 초당 쓰기 IOPS 제한 |
| `read_bytes_sec` | 초당 읽기 바이트 제한 |
| `write_bytes_sec` | 초당 쓰기 바이트 제한 |
| `total_iops_sec` | 총 IOPS 제한 |
| `total_bytes_sec` | 총 바이트 제한 |

QoS 정책은 Volume Type에 연결(associate). 해당 Volume Type으로 생성된 모든 볼륨에 적용.

## Backend (스토리지 백엔드)

실제 데이터를 저장하는 스토리지 시스템.

| 백엔드 | 설명 |
|--------|------|
| LVM | 로컬 디스크 기반 (개발/테스트용) |
| Ceph | 분산 스토리지 (대규모) |
| NetApp | 엔터프라이즈 NAS/SAN |
| iSCSI | 블록 스토리지 프로토콜 |

CloudX는 주로 NetApp 백엔드 사용. `cinder-volume` 서비스가 백엔드와 통신.

## app-ms-resource 데이터 소스

**목록 조회는 전부 로컬 MariaDB.** 생성/수정/삭제 시에만 plat-ms-vid4o → OpenStack 호출.

| 동작 | 데이터 소스 |
|------|-----------|
| 볼륨 타입/디스크 QoS/볼륨 자원 목록 | 로컬 DB (MyBatis mapper) |
| 볼륨 타입 생성 | DB + OpenStack (양쪽 동기화) |
| 디스크 QoS 생성 | DB + OpenStack |
| 볼륨 attach/detach/extend | OpenStack |

## plat-ms-vid4o API (생성/수정/삭제 시 호출)

| 메서드 | 경로 | OpenStack API |
|--------|------|---------------|
| POST | `/volume/types` | Cinder `POST /v3/types` |
| GET | `/volume/qos-specs/{id}/associate?vol_type_id=` | Cinder QoS ↔ Volume Type 연결 |
| POST | `/volume/qos-specs` | Cinder `POST /v3/qos-specs` |
| PUT | `/volume/qos-specs/{id}` | Cinder QoS spec 키 설정 |
| POST | `/volume/volumes` | Cinder `POST /v3/volumes` |
| POST | `/volume/volumes/{id}/attach` | Nova `POST /servers/{id}/os-volume_attachments` |
| POST | `/volume/volumes/{id}/detach` | Nova `DELETE /servers/{id}/os-volume_attachments/{id}` |
| POST | `/volume/volumes/{id}/extend` | Cinder `POST /v3/volumes/{id}/action { os-extend }` |
| POST | `/volume/snapshot` | Cinder `POST /v3/snapshots` |

## 가상 디스크 메뉴(T1301)와의 매핑

admin-portal의 [가상 디스크](../../화면/가상%20디스크/01-가상%20디스크.md) 메뉴(TA 전용)가 Cinder Volume 운영에 대응.

### 메뉴 버튼 → Cinder/Nova 동작 매핑

| 가상 디스크 버튼 | Cinder/Nova 동작 | 볼륨 상태 변화 | 설명 |
|-----------------|-----------------|--------------|------|
| 연결 (attach) | Nova `POST /servers/{id}/os-volume_attachments` | `available` → `in-use` | 볼륨을 VM에 디스크로 연결. VM에서 D: 드라이브처럼 인식 |
| 분리 (detach) | Nova `DELETE /servers/{id}/os-volume_attachments/{id}` | `in-use` → `available` | VM에서 디스크 분리. 데이터는 유지, VM에서만 안 보임 |
| 백업 (backup) | Cinder `POST /v3/backups` | `in-use` → `backing-up` → `in-use` | 볼륨 전체를 별도 저장소에 복사. 복원용 |
| 복구 (restore) | Cinder `POST /v3/backups/{id}/restore` | 백업 데이터 → 볼륨에 덮어쓰기 | 백업 시점으로 디스크 내용 되돌리기 |
| 삭제 (delete) | Cinder `DELETE /v3/volumes/{id}` | → `deleting` → 삭제 완료 | 볼륨 영구 삭제. `in-use` 상태에서는 삭제 불가 |

### 3단계 관계

```
[시스템 자원 > 스토리지]    디스크 "타입"을 정의 (볼륨 타입, QoS, 백엔드)
         │
         │  SA가 볼륨 타입 생성 → 테넌트에 할당
         ▼
[테넌트 설정]              어떤 볼륨 타입을 개인 디스크에 쓸지 "할당"
         │
         │  TA가 개인디스크 볼륨 설정에서 선택
         ▼
[가상 디스크] (T1301)      실제 디스크 "운영" (연결/분리/백업/복구/삭제)
         │
         │  각 버튼이 Cinder/Nova API 호출
         ▼
[OpenStack]               Cinder Volume + Nova Attach/Detach 실행
```

### 볼륨 상태 코드 (CloudX ↔ Cinder)

| CloudX 코드 | Cinder 상태 | 가상 디스크 메뉴에서의 의미 |
|-------------|------------|-------------------------|
| `V009USE` | `in-use` | VM에 연결됨 → attach 불가, delete 불가 |
| `V009AVL` | `available` | 사용 가능 → detach 불가 (이미 분리됨) |

## Snapshot (스냅샷)

볼륨의 특정 시점 상태를 저장한 읽기 전용 복사본.

- 스냅샷에서 새 볼륨 생성 가능 (복원)
- 증분(incremental) 방식으로 저장 공간 효율적
- CloudX의 "스냅샷 및 복원" 기능의 백엔드
