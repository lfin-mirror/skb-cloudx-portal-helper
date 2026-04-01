# 상태 다양성 검토

검토 기준: 리스트 fixture에 상태/코드 필드가 있을 때, UI의 색상·배지·버튼 활성화 등 시각적 분기를 테스트할 수 있도록 복수의 상태값이 포함되어 있는지 확인.

---

## 충분 ✓

### resource/

- **disk-local-all.json** (`dsk_sts_cd` + `vm_power_sts_cd`)
  - `dsk_sts_cd`: V009USE(사용중) / V009AVL(사용 가능) / V009ERR(오류) — 3종
  - `vm_power_sts_cd`: V002ONC(켜짐) / V002OFC(꺼짐) / V002SUS(일시중지) — 3종

- **disk-local-list.json** (`dsk_sts_cd`)
  - V009USE / V009AVL — 2종 (사용자별 상세 목록, 2건으로 충분)

- **vpc-resources-list.json** (`vm_power_sts_cd` + `vm_allo_sts_cd`)
  - `vm_power_sts_cd`: V002ONC / V002OFC — 2종 (V002SUS 미포함, 단 5건 중 2종으로 기본 분기 가능)
  - `vm_allo_sts_cd`: U017DVA(할당) / U017PVN(공용 PC 예약) — 2종

- **evacuate-list.json** (`evac_sts_cd`)
  - E001NONE(없음) / E001COMP(완료) — 2종 (2건으로 양쪽 상태 커버)

- **storage-resources-list.json** (`dsk_sts_cd`)
  - V009USE / V009AVL — 2종

### operation/

- **blacklist-list.json** (`wtst_yn`)
  - Y / N — 2종 ✓

- **backup-grp-list.json** (`auto_bkup_yn` + `auto_snap_yn`)
  - `auto_bkup_yn`: Y / N — 2종 (항목 1: Y/Y, 항목 2,3: N/N, 항목 4: Y/Y)
  - `auto_snap_yn`: Y / N — 2종

- **usb-policy-list.json** (`usb_policy_auth_code`)
  - U011PR(읽기전용) / U011AL(허용) / U011BL(차단) — 3종 ✓

- **cert-secu-grps-list-ta.json** (`secu_plcy_tgt_cd`)
  - U006R / U006T — 2종 (7건)

- **cert-n2nd-list.json** (`cert_plcy_tgt_cd`)
  - U003B / U003S — 2종 (3건)

---

## 개선 권장

### resource/

- **vpc-pool-list.json** (`vm_pool_sts_cd`)
  - 현재: V010NM(정상) 2건 모두 동일
  - 권장: V010CO(생성완료), V010PR(생성중), V010ER(오류) 등 추가
  - 이유: 풀 상태에 따라 버튼 활성화, 배지 색상이 달라지는데 정상 상태만으로는 오류/진행 중 UI 검증 불가

- **vpc-migration-list.json** (`job_sts_cd`)
  - 현재: J008E(작업완료) 14건 전부 동일
  - 권장: J008I(작업중), J008F(실패) 1~2건 추가
  - 이유: 마이그레이션 진행 중·실패 상태의 UI(취소 버튼, 에러 표시 등) 검증 불가

- **host-list.json** (`host_sts_cd`)
  - 현재: P003NOR(정상) 2건 모두 동일
  - 권장: P003ERR(오류), P003MNT(점검), P003DWN(다운) 중 1~2개 추가
  - 이유: 호스트 이상 상태 시 대피 버튼 활성화, 알림 배지 등 분기 UI 검증 불가

- **evacuate-history-list.json** (`evac_sts_cd`)
  - 현재: E001COMP(완료) 1건만 존재
  - 권장: E001FAIL(실패) 또는 E001ING(진행중) 1건 추가
  - 이유: 히스토리 목록에서 완료/실패 상태 구분 색상 등 검증 불가

- **snapshot-list.json** (`snap_sts_cd`)
  - 현재: S001ACT(활성) 2건 모두 동일
  - 권장: S001INA(비활성), S001CRE(생성중) 등 추가
  - 이유: 스냅샷 복구 버튼 활성화 조건이 상태값에 따라 달라질 수 있음

- **backup-list.json** (`bkup_dsk_sts_cd`)
  - 현재: B001COMP(완료) 2건 모두 동일
  - 권장: B001FAIL(실패), B001ING(진행중) 각 1건 추가
  - 이유: 백업 실패·진행 중 상태의 배지/버튼 UI 검증 불가

- **image-list.json** (`img_sts_cd`)
  - 현재: T003CC(생성 완료) 3건 모두 동일
  - 권장: T003CI(생성중), T003ER(오류) 각 1건 추가
  - 이유: 이미지 생성 진행 중·오류 상태의 버튼(create_btn, delete_btn 등) 분기 UI 검증 불가

### operation/

- **cert-secu-grps-list.json** (`secu_plcy_tgt_cd`)
  - 현재: U006S(Super Admin 기본 보안정책) 1건만 존재
  - 권장: U006T(테넌트 보안정책) 항목 추가 (SA 화면에서도 테넌트 정책이 표시되는 경우 검증 필요)

---

## 상태 필드 없음 (해당 없음)

- **vpc-group-list.json** — 상태 코드 필드 없음. 그룹 자체에 활성/비활성 상태 없는 구조.
- **tenant-manager-list.json** — 별도 `tnt_sts_cd` 없음. 테넌트 설정값(`ha_auto_mng_yn`, `host_tnt_yn` 등) Y/N은 2건에 걸쳐 분기됨.
- **security-group-list.json** — 보안그룹 목록에 상태 코드 필드 없음. 규칙 단위로만 상태 구분.
