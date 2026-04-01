# 인증된 사용자 인증 API

로그인 토큰이 있어야 접근 가능한 비밀번호 검증 및 변경 API.

---

## POST `/v1/auth/authentications/`

비밀번호 확인. 사용자 정보 페이지 진입 전 현재 비밀번호를 검증한다.

### 요청 Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_conn_id | string | Y | 사용자 아이디 (sessionStorage의 `acct_conn_id`) |
| passwd | string | Y | 현재 비밀번호 |
| tnt_url_id | string | Y | 테넌트 URL ID (sessionStorage의 `user_info.tnt_url_id`) |

### 응답

성공 시 HTTP 200. `res.errCode` 없음.

### 에러 코드

| 코드 | 설명 |
|------|------|
| AUTH-4209 | 비밀번호 불일치 또는 기타 인증 오류 (서버 `errMsg` 팝업 표시 후 팝업 닫으면 화면 닫힘) |
| AUTH-4216 | 인증 세션 만료 (팝업 표시 후 화면 닫힘) |
| AUTH-4217 | 권한 없음 (팝업 표시 후 화면 닫힘) |
| AUTH-4220 | 과도한 시도로 이용 제한 (팝업 표시 후 화면 닫힘) |

### 비고

- 성공 시 사용자 정보 페이지(`userinfo`)로 이동
- 실패 시(`AUTH-4217`, `AUTH-4209`, `AUTH-4216`, `AUTH-4220`) 팝업 확인 후 비밀번호 확인 팝업 자체를 닫음

### 호출 위치

- `views/user/CheckPW.vue:84`

---

## PUT `/v1/auth/authentications/accounts/firstpassword`

초기/임시 비밀번호 변경. 최초 로그인 시 또는 임시 비밀번호 발급 후 비밀번호를 변경한다.

### 요청 Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_conn_id | string | Y | 사용자 아이디 (sessionStorage의 `acct_conn_id`) |
| passwd | string | Y | 현재(초기/임시) 비밀번호 |
| new_passwd | string | Y | 새 비밀번호 |
| new_passwd_confirm | string | Y | 새 비밀번호 확인 |

### 응답

성공 시 `res.errCode` 없음. 성공 후 `/{tnt_url_id}/home`으로 이동.

### 에러 코드

| 코드 | 설명 |
|------|------|
| AUTH-4211 | 현재 비밀번호 불일치 (`changePasswdError.oldPassword` 필드에 인라인 에러 표시) |

### 비밀번호 규칙

특수문자, 영문 대문자, 영문 소문자, 숫자 중 최소 3가지 이상 조합, 9자 이상.

### 비고

- API 호출 전 임시 토큰(`sessionStorage.Authorization`)을 복원한 후 호출
- 취소 시 sessionStorage 초기화 후 로그인 화면으로 이동 (`location.reload(true)`)
- 사용자 정보 변경 화면에서도 동일 컴포넌트(`PasswordChange.vue`)를 `page='accountSetting'`으로 재사용

### 호출 위치

- `views/login/components/PasswordChange.vue:178`

---

## PUT `/v1/auth/authentications/accounts/password`

비밀번호 변경. 로그인 후 마이페이지에서 비밀번호를 변경한다.

### 요청 Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acct_conn_id | string | Y | 사용자 아이디 (sessionStorage의 `acct_conn_id`) |
| passwd | string | Y | 현재 비밀번호 |
| new_passwd | string | Y | 새 비밀번호 |
| new_passwd_confirm | string | Y | 새 비밀번호 확인 |

### 응답

성공 시 '비밀번호가 변경되었습니다.' 팝업 표시. 팝업 확인 후 비밀번호 변경 팝업 닫힘.

### 에러 코드

| 코드 | 설명 |
|------|------|
| AUTH-4211 | 현재 비밀번호 불일치 (`notCollect` 플래그 활성화로 인라인 에러 표시) |

### 호출 위치

- `views/user/popup/ChangePw.vue:68`

---

## GET `/v1/logout`

로그아웃. 서버 세션을 종료하고 클라이언트 토큰 및 사용자 정보를 초기화한다.

### 요청 파라미터

없음.

### 응답

없음 (성공 여부만 확인).

### 부수 효과

- Vuex 스토어의 사용자 정보 전체 초기화 (`user`, `name`, `roles`, `token`, `favorites`, `acct_conn_id`, `acct_id`, `acct_sts_cd`, `usr_grp_id`, `conn_net_cd`, `cert_plcy_id`)
- `removeToken()` 호출로 쿠키/localStorage에서 인증 토큰 제거
- localStorage 백업 데이터 삭제 (`clearBackupStorage()`)

### 호출 위치

- `src/store/modules/user.js:175` (`LogOut` action)
