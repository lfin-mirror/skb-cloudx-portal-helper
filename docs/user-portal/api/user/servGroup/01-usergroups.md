# 서비스 그룹 API

## 사용 화면
- 사용자 정보 관리 (`AccountSetting.vue`) — 화면 문서 미작성

## GET `/v1/user/servGroup/usergroups`

사용자 그룹 정보 조회. 계정의 정보 수정 가능 여부를 확인하는 용도로 사용한다.

### 요청

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_url_id | string | Y | 테넌트 URL ID (sessionStorage `tnt_url_id`) |
| usr_grp_id | string | Y | 사용자 그룹 ID (sessionStorage `userGrpId`) |

### 응답

배열. 항목당 필드:

| 필드 | 타입 | 설명 |
|------|------|------|
| acct_mod_psb_yn | string | 계정 정보 수정 가능 여부 (`Y`/`N`) |

응답의 첫 번째 항목(`[0]`)에서 `acct_mod_psb_yn` 값을 사용한다.

### 호출 위치

- `views/user/AccountSetting.vue:280` — 사용자 정보 관리 페이지에서 계정 수정 권한 확인
