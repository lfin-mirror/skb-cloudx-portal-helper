# AuthRemake API

## 사용 화면
- (화면 문서 미작성 — SA/TA 권한 전환 기능에서 사용)

Super Admin ↔ Tenant Admin 권한 전환 API.

> **인증 토큰 필요**: 요청 헤더에 `Authorization` 토큰 필요

---

## POST /v1/authRemake

### 관리자 권한 전환

Super Admin이 Tenant Admin으로 전환하거나, Tenant Admin에서 Super Admin으로 복귀.

**호출 위치**: `store/modules/user.js:163` (`getAuthUpdate` action)
**UI 호출 위치**: `components/Modals/Admin/Authority.vue:136, :203`

#### 요청 바디

**SA → TA 전환 시**

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| `tnt_id` | string | Y | 전환 대상 테넌트 ID |
| `grp_typ_cd` | string | Y | 권한 그룹 코드 (`U001TNT`: 테넌트어드민) |
| `usr_grp_id` | string | Y | 사용자 그룹 ID (`tntadm`) |

**TA → SA 복귀 시**

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| `grp_typ_cd` | string | Y | 권한 그룹 코드 (`U001SUP`: 슈퍼어드민) |
| `tnt_id` | string | Y | 빈 문자열 (`""`) |
| `usr_grp_id` | string | Y | 사용자 그룹 ID (`supadm`) |

#### 응답

| 필드명 | 타입 | 설명 |
|--------|------|------|
| `tnt_id` | string | 변경된 테넌트 ID |
| `tnt_nm` | string | 변경된 테넌트명 |
| `grp_typ_cd` | string | 변경된 권한 그룹 코드 |
| `vm_grp_id` | string | VM 그룹 ID |
| `serv_grp_id` | string | 서비스 그룹 ID |
| `serv_grp_nm` | string | 서비스 그룹명 |
| `ad_itlk_usg_yn` | string | AD 연동 사용 여부 |

#### 처리 흐름

1. 응답 데이터를 Vuex store(`SET_TEMP_USER`)와 `sessionStorage.user`에 반영
2. 성공 알림 표시 후 1초 딜레이
3. `/dashboard`로 페이지 새로고침 (`window.location.href`)

#### 비고

- Tenant Admin 계정(`isTenant === true`)이 호출하는 경우: `tnt_id`, `grp_typ_cd`, `usr_grp_id`, `vm_grp_id` 필드 미포함 (`Authority.vue:196-201` 참고)
