# 백업 스냅샷 정책 API

## 사용 화면
- [백업 스냅샷 정책](../../화면/정책/03-백업%20스냅샷%20정책.md)

리소스 경로 기준: `/v1/operation/policy/bkupsnap`

---

## 백업 스냅샷 정책 그룹 목록 조회

```
GET /v1/operation/policy/bkupsnap/grps
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| keyword | string | N | 검색어 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | 백업 스냅샷 정책 목록 |
| data[].bkup_snap_plcy_id | string | 백업 스냅샷 정책 ID |
| data[].bkup_snap_plcy_nm | string | 백업 스냅샷 정책명 |
| data[].bkup_snap_plcy_tgt_cd | string | 정책 대상 코드 (U023S: SA 기본, U023T: 테넌트) |
| data[].bkup_snap_plcy_tgt_cd_nm | string | 정책 대상명 |
| data[].auto_bkup_yn | string | 자동 백업 여부 (Y/N) |
| data[].bkup_prid_cd | string | 백업 주기 코드 |
| data[].bkup_prid_cd_nm | string | 백업 주기명 |
| data[].bkup_set_time | string | 백업 실행 시각 |
| data[].bkup_set_dw_cd | string | 백업 실행 요일 코드 |
| data[].bkup_set_dw_cd_nm | string | 백업 실행 요일명 |
| data[].bkup_set_dd | string | 백업 실행 일 |
| data[].max_bkup_cnt | string | 최대 백업 보관 수 |
| data[].auto_snap_yn | string | 자동 스냅샷 여부 (Y/N) |
| data[].snap_prid_cd | string | 스냅샷 주기 코드 |
| data[].snap_prid_cd_nm | string | 스냅샷 주기명 |
| data[].snap_set_time | string | 스냅샷 실행 시각 |
| data[].snap_set_dw_cd | string | 스냅샷 실행 요일 코드 |
| data[].snap_set_dw_cd_nm | string | 스냅샷 실행 요일명 |
| data[].snap_set_dd | string | 스냅샷 실행 일 |
| data[].max_snap_cnt | string | 최대 스냅샷 보관 수 |
| data[].tnt_id | string | 테넌트 ID |
| data[].reg_id | string | 등록자 ID |
| data[].reg_ts | string | 등록 일시 |
| data[].mod_id | string | 수정자 ID |
| data[].mod_ts | string | 수정 일시 |
| data[].group_cnt | number | 연결된 그룹 수 |
| data[].pool_cnt | number | 연결된 풀 수 |
| data[].vm_cnt | number | 연결된 VM 수 |

**에러 코드**

| 코드 | 설명 |
|------|------|
| 400 | 잘못된 요청 파라미터 |
| 403 | 권한 없음 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/BackupSnapshot.vue` | 167 |
| `views/policy/BackupSnapshotPolicy.vue` | 535 |
| `views/policy/BackupSnapshotSupadm.vue` | 535 |
| `components/Modals/Policy/BackupSnapshotPolicy.vue` | 613 |
| `components/Form/mixins/modal_setting.js` | 156 |

---

## 백업 스냅샷 정책 상세 조회

```
GET /v1/operation/policy/bkupsnap/info/{bkup_snap_plcy_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| bkup_snap_plcy_id | string | Y | 백업 스냅샷 정책 ID |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| bkup_snap_plcy_id | string | 백업 스냅샷 정책 ID |
| bkup_snap_plcy_nm | string | 백업 스냅샷 정책명 |
| bkup_snap_plcy_tgt_cd | string | 정책 대상 코드 |
| bkup_snap_plcy_tgt_cd_nm | string | 정책 대상명 |
| auto_bkup_yn | string | 자동 백업 여부 (Y/N) |
| bkup_prid_cd | string | 백업 주기 코드 |
| bkup_prid_cd_nm | string | 백업 주기명 |
| bkup_set_time | string | 백업 실행 시각 |
| bkup_set_dw_cd | string | 백업 실행 요일 코드 |
| bkup_set_dw_cd_nm | string | 백업 실행 요일명 |
| bkup_set_dd | string | 백업 실행 일 |
| max_bkup_cnt | string | 최대 백업 보관 수 |
| auto_snap_yn | string | 자동 스냅샷 여부 (Y/N) |
| snap_prid_cd | string | 스냅샷 주기 코드 |
| snap_prid_cd_nm | string | 스냅샷 주기명 |
| snap_set_time | string | 스냅샷 실행 시각 |
| snap_set_dw_cd | string | 스냅샷 실행 요일 코드 |
| snap_set_dw_cd_nm | string | 스냅샷 실행 요일명 |
| snap_set_dd | string | 스냅샷 실행 일 |
| max_snap_cnt | string | 최대 스냅샷 보관 수 |
| tnt_id | string | 테넌트 ID |
| reg_id | string | 등록자 ID |
| reg_conn_id | string | 등록자 계정 |
| reg_ts | string | 등록 일시 |
| mod_id | string | 수정자 ID |
| mod_conn_id | string | 수정자 계정 |
| mod_ts | string | 수정 일시 |
| group_cnt | number | 연결된 그룹 수 |
| pool_cnt | number | 연결된 풀 수 |
| vm_cnt | number | 연결된 VM 수 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/BackupSnapshotPolicy.vue` | 553 |
| `views/policy/BackupSnapshotSupadm.vue` | 553 |
| `components/Modals/Policy/BackupSnapshotPolicy.vue` | 632 |

---

## 백업 스냅샷 정책 생성

```
POST /v1/operation/policy/bkupsnap/grps
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| bkup_snap_plcy_nm | string | Y | 백업 스냅샷 정책명 |
| tnt_id | string | Y | 테넌트 ID |
| auto_bkup_yn | string | Y | 자동 백업 여부 (Y/N) |
| bkup_prid_cd | string | N | 백업 주기 코드 |
| bkup_set_time | string | N | 백업 실행 시각 |
| bkup_set_dw_cd | string | N | 백업 실행 요일 코드 |
| bkup_set_dd | string | N | 백업 실행 일 |
| max_bkup_cnt | string | N | 최대 백업 보관 수 |
| auto_snap_yn | string | Y | 자동 스냅샷 여부 (Y/N) |
| snap_prid_cd | string | N | 스냅샷 주기 코드 |
| snap_set_time | string | N | 스냅샷 실행 시각 |
| snap_set_dw_cd | string | N | 스냅샷 실행 요일 코드 |
| snap_set_dd | string | N | 스냅샷 실행 일 |
| max_snap_cnt | string | N | 최대 스냅샷 보관 수 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/BackupSnapshot.vue` | 355 |
| `views/policy/BackupSnapshotPolicy.vue` | 639 |
| `views/policy/BackupSnapshotSupadm.vue` | 639 |
| `components/Modals/Policy/BackupSnapshotPolicy.vue` | 807 |

---

## 백업 스냅샷 정책 수정

```
PUT /v1/operation/policy/bkupsnap/info/{bkup_snap_plcy_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| bkup_snap_plcy_id | string | Y | 백업 정책 ID |

**Request Body** — 생성 바디와 동일

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/BackupSnapshotPolicy.vue` | 648 |
| `views/policy/BackupSnapshotSupadm.vue` | 651 |
| `components/Modals/Policy/BackupSnapshotPolicy.vue` | 818 |

---

## 백업 스냅샷 정책 삭제

```
DELETE /v1/operation/policy/bkupsnap/info/{bkup_snap_plcy_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| bkup_snap_plcy_id | string | Y | 백업 정책 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/BackupSnapshotPolicy.vue` | 686 |
| `views/policy/BackupSnapshotSupadm.vue` | 693 |

---

## SA/TA 차이

### BackupSnapshot.vue — 백업스냅샷 정책 목록

| 구분 | 파라미터 | 비고 |
|------|---------|------|
| SA | `bkup_snap_plcy_tgt_cd=U023S` | |
| TA | `bkup_snap_plcy_tgt_cd=U023T` | |
| 공통 | `GET /v1/operation/policy/bkupsnap/grps` | 파라미터만 다름 |

TA일 때 등록 버튼 노출, SA일 때 숨김.

### BackupSnapshotPolicy.vue — 백업스냅샷 정책 상세/등록

| 구분 | API | 비고 |
|------|-----|------|
| TA 전용 | `GET /v1/operation/policy/bkupsnap/grps?bkup_snap_plcy_tgt_cd={cd}` | `getCode()` 내 정책 목록 조회, TA만 실행 |
| 공통 | `GET /v1/operation/policy/bkupsnap/info/{id}` | 상세 조회 |
