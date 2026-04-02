# 관리자 역할 — Super Admin / Tenant Admin

admin-portal에는 두 가지 관리자 역할이 존재. 같은 포털이지만 역할에 따라 접근 가능한 메뉴, API 권한, UI 표시가 달라짐.

## 역할 코드

| 역할 | 코드 (`grp_typ_cd`) | `usr_grp_id` | 약어 |
|------|-------------------|-------------|------|
| Super Admin | `U001SUP` | `supadm` | SA |
| Tenant Admin | `U001TNT` | `tntadm` | TA |

코드 저장 위치:
- `sessionStorage.roles` — 로그인 시 `SET_ROLES`로 저장. `['U001SUP']` 또는 `['U001TNT']` 배열
- `sessionStorage.user` → `grp_typ_cd` — 사용자 정보 객체 내 필드
- `store.getters.roles[0]` — Vuex에서 접근

## Super Admin (SA)

플랫폼 전체를 관리하는 최상위 권한.

- 테넌트에 종속되지 않음 (`tnt_id`가 null 또는 빈값)
- 모든 테넌트의 리소스를 조회·관리 가능
- 시스템 초기 설정(`/initialized`) 접근 가능
- 테넌트 생성·삭제 가능
- TA 화면으로 전환 가능 ("사용자 권한 변경")

### SA 전용 메뉴 (TA에 없는 것)

| 메뉴 | 메뉴 ID | 비고 |
|------|---------|------|
| 관리자 포털 UI 설정 | A0401 | 포털 관리 |
| 보안인증서 관리 | A0603 | 서비스 관리 (인증서 + 유효기간 알림) |
| 도메인 관리 | A1001 | 시스템 리소스 |
| 이메일 관리 | A1010 | 시스템 리소스 |
| 디스크 QoS 관리 | A100502 | 스토리지 |
| SW 버전 관리 | A1206 | 관리자 설정 |
| 메뉴/API/기능 관리 | A1208 | 관리자 설정 |
| 통합로그 (Kibana) | A1102 | 모니터링/통계 |
| 업무 처리 통계 | A1108 | 모니터링/통계 |
| SMS/이메일 통계 | A1109 | 모니터링/통계 |
| 브라우저 접속 통계 | A1112 | 모니터링/통계 (라우터에만 존재) |
| 로그 통계 (Client/시스템 에러, 활동 로그) | A1113 | 모니터링/통계 |
| 월간리포트 | A1114 | 모니터링/통계 |
| 작업 예약 | A1117 | 모니터링/통계 (예약 관리 + 실행 결과) |
| 감사로그 (Admin/User) | A1118 | 모니터링/통계 |
| 실시간 모니터링 (서버/스토리지/네트워크/Pod/VPC) | A15 | TA는 T14로 축소된 별도 구성 |
| 알림 (그룹/임계치/이력) | A1502 | 실시간 모니터링 하위 |

SA 상세정책(A0506) 하위는 Metadata(A050608)와 USB 정책(A050609)만 포함. TA(T0506)는 예외 네트워크, 접근 차단, 블랙리스트, 화이트리스트 등 전체 정책 보유.

### SA 전용 UI

- Navbar 드롭다운에 "초기 설정" 메뉴 표시 (`userGrpTypeCd === 'U001SUP'`)
- 목록 화면의 `SearchFilter`에 테넌트 선택 드롭다운 표시 (`isSuperAdmin && isShowTenant`)
- "사용자 권한 변경" 모달에서 테넌트 목록 + "SuperAdmin으로 전환" 버튼 표시

## Tenant Admin (TA)

특정 테넌트에 소속된 관리자 권한.

- 반드시 하나의 테넌트에 종속 (`tnt_id` 필수)
- 소속 테넌트의 리소스만 조회·관리 가능
- 시스템 초기 설정 접근 불가
- 테넌트 생성·삭제 불가 (자기 테넌트 정보 조회만 가능)

### TA 전용 메뉴 (SA에 없는 것)

| 메뉴 | 메뉴 ID | 비고 |
|------|---------|------|
| 사용자 정보 (그룹/사용자/업무요청/단말접속) | T02 | SA에 없는 메뉴 트리 전체 |
| 사용자 모니터링 / 접속 환경 | T0206 / T020601 | 사용자 정보 하위 |
| 사용자 지원 (원격제어/업무처리요청/VOC) | T03 | SA에 없는 메뉴 트리 전체 |
| 사용자 포털 UI 설정 | T0401 | 포털 관리 |
| 매뉴얼 관리 | T0405 | 포털 관리 |
| 설치 파일 관리 (PC Client/Mobile/Agent) | T0406 | 포털 관리 |
| 기능 개선 요청 | T0408 | 포털 관리 |
| 예외 네트워크 | T050601 | 상세정책 (SA는 A0506에 미포함) |
| 접근 차단 | T050602 | 상세정책 |
| 블랙리스트 | T050604 | 상세정책 |
| 화이트리스트 | T050605 | 상세정책 |
| URL Redirection | T050606 | 상세정책 |
| 비인가 프로세스 | T050607 | 상세정책 |
| 가상PC 네이밍 정책 | T050610 | 상세정책 |
| 접근 통제 (보안 그룹) | T050611 | 상세정책 |
| 접근 통제 (User/Admin) | T0604 | 서비스 (SA는 라우터에만 존재) |
| 외부 연동 (AD/NAS/Email/Octatco) | T0605 | 서비스 |
| 가상 PC (그룹/목록/접속조회/예약/포트/공용PC/자동할당/IP관리) | T07 | SA에 없는 메뉴 트리 전체 |
| IP 관리 | T0708 | 가상 PC 하위 |
| IP 이력 관리 | T110407 | 가상 PC 통계 하위 |
| 가상 디스크 | T13 | SA는 A14로 별도 ID |
| Elasticsearch 로그 | T1119 | 모니터링 (라우터에만 존재) |

## 메뉴 ID 체계

라우트 `meta`에 두 종류의 메뉴 ID 병존:

| 필드 | prefix | 대상 | 예시 |
|------|--------|------|------|
| `meta.id` | `A` | SA 메뉴 | `A0501`, `A0701`, `A1102` |
| `meta.tenantMenuId` | `T` | TA 메뉴 | `T0501`, `T0701`, `T1104` |

### 메뉴 필터링 흐름

```
로그인 → GET /v1/user/admin/groups/menus
→ 응답: [{ menu_id: 'A01', menu_nm: '대시보드' }, ...]
→ menu_id 첫 글자가 'A'면 SA, 'T'면 TA
→ filterAsyncRouter()가 라우트 트리 순회
  → SA: meta.id로 매칭
  → TA: meta.tenantMenuId로 매칭
  → 매칭 안 되는 라우트 제거
→ router.addRoutes()로 동적 등록
```

### 같은 path에 역할별 다른 컴포넌트

일부 정책 메뉴는 같은 URL path에 SA용/TA용 컴포넌트가 각각 정의:

| path | SA 컴포넌트 | TA 컴포넌트 |
|------|-----------|-----------|
| `user-auth-policy` | `UserAuthPolicySupadm` (A0501) | `UserAuthPolicy` (T0501) |
| `admin-auth-policy` | `AdminAuthPolicySupadm` (A0502) | `AdminAuthPolicy` (T0502) |
| `virtual-pc-auth-policy` | `VirtualPcAuthPolicySupadm` (A0503) | `VirtualPcAuthPolicy` (T0503) |
| `backup-snapshot-policy` | `BackupSnapshotSupadm` (A0505) | `BackupSnapshot` (T0505) |
| `metadata-policy` | `MetadataPolicySupadm` (A050608) | `MetadataPolicy` (T050608) |

`filterAsyncRouter`가 역할에 맞지 않는 라우트를 걸러내므로 실제로는 한쪽만 등록.

## SA 여부 판단 — 두 가지 방식

코드에서 SA 여부를 판단하는 방식이 두 가지 있어 혼용됨:

| 방식 | 코드 | 사용 위치 | SA→TA 전환 시 |
|------|------|----------|-------------|
| `roles` 기반 | `store.getters.roles[0] === 'U001SUP'` | `permission.js` (메뉴 ID 분기) | 변경 안 됨 (여전히 SA) |
| `tnt_id` 기반 | `store.getters.userinfo.tnt_id == null` | `global_mixin.js` (`isSuperAdmin`) | 변경됨 (TA처럼 동작) |
| `grp_typ_cd` 기반 | `user.grp_typ_cd === 'U001SUP'` | `Navbar.vue` (adminType 표시) | 변경됨 (TA 표시) |

SA→TA 전환 시 `roles`는 갱신되지 않고 `user` 객체만 갱신되므로, `roles` 기반 판단과 `user` 기반 판단의 결과가 달라짐. 자세한 내용은 아래 전환 흐름 참고.

---

## SA ↔ TA 전환

SA는 "사용자 권한 변경" 기능으로 특정 테넌트의 TA 관점으로 전환 가능. TA로 로그인한 계정은 전환 불가.

### 진입 경로

Navbar 우측 사용자 아이콘 드롭다운 → "사용자 권한 변경" → `Authority.vue` 모달

표시 조건: `usr_grp_id`가 `'supadm'` 또는 `'tntadm'`인 경우만 드롭다운에 노출. TA가 생성한 하위 계정은 `usr_grp_id`가 다르므로 이 메뉴 미노출.

### SA → TA 전환 흐름

```
1. Authority 모달 열림
   → getAllTenant() 호출: GET /v1/resource/tenants/manager/list/all
   → 테넌트 목록을 드롭다운에 표시
   → 이미 TA 전환 상태면 현재 tnt_id로 선택값 복원

2. 사용자가 테넌트 선택 후 "변경" 클릭
   → confirm 다이얼로그 표시

3. 확인 시 getAuthUpdate 호출:
   POST /v1/authRemake
   body: {
     tnt_id: 선택한 테넌트 ID,
     grp_typ_cd: 'U001TNT',
     usr_grp_id: 'tntadm'
   }

4. 응답으로 SET_TEMP_USER commit:
   → state.user.tnt_id = 선택한 테넌트 ID    (변경)
   → state.user.grp_typ_cd = 'U001TNT'       (변경)
   → state.user.tnt_nm = 테넌트 이름          (변경)
   → state.user.serv_grp_id = ...             (변경)
   → sessionStorage.user도 동기화             (변경)
   → sessionStorage.roles                     (변경 안 됨! 여전히 'U001SUP')

5. 성공 알림 후 1초 대기
   → window.location.href = '/dashboard' (전체 페이지 리로드)

6. 리로드 후:
   → permission.js beforeEach 실행
   → getToken() 성공 → GenerateRoutes dispatch
   → GET /v1/user/admin/groups/menus 재호출
   → 서버가 현재 세션(authRemake로 변경된 상태) 기준 TA 메뉴 목록 반환
   → filterAsyncRouter가 tenantMenuId 기반으로 라우트 필터링
   → TA용 메뉴 구성 완료
```

### 전환 후 변경되는 것 / 안 되는 것

| 항목 | 변경 여부 | 상세 |
|------|----------|------|
| `sessionStorage.user` → `grp_typ_cd` | O | `'U001TNT'`으로 변경 |
| `sessionStorage.user` → `tnt_id` | O | 선택한 테넌트 ID |
| `sessionStorage.roles` | X | `'U001SUP'` 그대로 유지 |
| Navbar `adminType` 표시 | O | "Tenant Admin" + 테넌트명 표시 (`grp_typ_cd` 기반) |
| Navbar 드롭다운 "초기 설정" | X | 여전히 표시 (`userGrpTypeCd`가 user 객체 기반이므로 숨겨짐) |
| `global_mixin.isSuperAdmin` | O | `tnt_id` 존재하므로 `false` |
| `SearchFilter` 테넌트 드롭다운 | O | 숨겨짐 (`isSuperAdmin` = `false`) |
| `permission.js` 메뉴 ID 분기 | X | `roles[0]`이 여전히 `'U001SUP'`이므로 `meta.id` 사용 |
| `X-CloudPC-Request-MenuID` 헤더 | 부분적 | TA 전용 라우트에서 `meta.id`가 빈값일 때 빈값 전달 |
| 사이드바 메뉴 | O | 서버가 TA 메뉴 목록 반환 → TA 메뉴로 재구성 |

### TA → SA 복귀 흐름

```
1. Authority 모달에서 "SuperAdmin으로 전환" 버튼 클릭
   (현재 tnt_id가 있을 때만 활성화)

2. getAuthUpdate 호출:
   POST /v1/authRemake
   body: {
     grp_typ_cd: 'U001SUP',
     tnt_id: '',
     usr_grp_id: 'supadm'
   }

3. SET_TEMP_USER commit:
   → state.user.tnt_id = ''
   → state.user.grp_typ_cd = 'U001SUP'
   → sessionStorage.user 동기화

4. 성공 알림 후 1초 대기
   → window.location.href = '/dashboard'

5. 리로드 후 SA 메뉴로 복원
```

### Navbar 표시

전환 상태에 따른 Navbar 좌측 표시:

| 상태 | 표시 |
|------|------|
| SA (기본) | `Super Admin` |
| SA→TA 전환 후 | `Tenant Admin | Tenant: {테넌트명}` |
| TA (직접 로그인) | `Tenant Admin | Tenant: {테넌트명}` |

판단 로직:
- `adminType`: `user.grp_typ_cd === 'U001SUP'` → `'Super Admin'`, 아니면 `'Tenant Admin'`
- `isTenant`: `user.tnt_id && user.tnt_id !== 'ADMIN'` → 테넌트명 표시 여부
