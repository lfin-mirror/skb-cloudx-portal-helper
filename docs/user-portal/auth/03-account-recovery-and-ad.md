---
type: flow
title: 아이디 찾기, 비밀번호 초기화, AD 연동
status: stable
version: v2.2.10
portal: user
screens:
  - login/components/FindUserId.vue
  - login/components/FindUserPwd.vue
  - login/components/Login.vue
  - login/PasswordChange.vue
  - login/PasswordNotChangedLongTime.vue
  - user/AccountSetting.vue
related_docs:
  - ../term/01-ad.md
  - ../term/02-octatco.md
api_endpoints:
  - POST /v1/nauth/auth/authentications/accounts
  - POST /v1/nauth/auth/authentications/temp/passwd
---

# 아이디 찾기, 비밀번호 초기화, AD 연동

로그인 화면에서 접근 가능한 계정 복구 기능과, 비밀번호 관련 동작에 영향을 주는 AD(Active Directory) 연동 구조를 다룬다.

## 아이디 찾기 — `components/FindUserId.vue`

로그인 폼의 "아이디 찾기" 버튼을 누르면 `visible.isForm`이 `'findId'`로 전환된다.

### 입력 폼

| 필드 | v-model | 설명 |
|------|---------|------|
| 이름 | `model.findId.acct_nm` | 회원 등록 시 사용한 이름 |
| 휴대폰 번호 | `model.findId.mob_no` | `-` 제외 숫자만 입력 (최대 12자리) |

`portal_type`은 `'A007USR'`(사용자 포털)로 고정, `tnt_url_id`는 sessionStorage에서 가져온다.

### 처리 흐름

```
이름 + 휴대폰 번호 입력
    ↓
findIdValidationSchema로 유효성 검사
    ↓
POST /v1/nauth/auth/authentications/accounts
body: { acct_nm, mob_no, portal_type: 'A007USR', tnt_url_id }
    ↓ 성공
결과 메시지 팝업 표시 ("시스템에 등록된 아이디가 이메일로 발송됩니다")
    ↓
로그인 화면으로 자동 복귀
```

아이디를 화면에 직접 보여주지 않고, 등록된 이메일로 발송하는 방식이다.

### 취소 시 분기

취소 버튼을 누르면 Octatco 사용 여부에 따라 돌아갈 화면이 달라진다:

```javascript
// FindUserId.vue cancelLogin() (157행~)
if (sessionStorage.getItem('octatcoUsgYn') === 'true') {
  → 'octatcoLogin' 화면으로 복귀
} else {
  → 'login' 화면으로 복귀
}
```

---

## 비밀번호 초기화 — `components/FindUserPwd.vue`

로그인 폼의 "비밀번호 초기화" 버튼을 누르면 `visible.isForm`이 `'findPwd'`로 전환된다. 이 버튼은 AD 연동 상태에 따라 표시 여부가 결정된다 (아래 AD 연동 섹션 참고).

### 입력 폼

| 필드 | v-model | 설명 |
|------|---------|------|
| 아이디 | `model.findPwd.acct_conn_id` | 로그인 아이디 |
| 이름 | `model.findPwd.acct_nm` | 회원 등록 시 사용한 이름 |
| 휴대폰 번호 | `model.findPwd.mob_no` | `-` 제외 숫자만 입력 (최대 11자리) |

### 처리 흐름

```
아이디 + 이름 + 휴대폰 번호 입력
    ↓
findPwdValidationSchema로 유효성 검사
    ↓
POST /v1/nauth/auth/authentications/temp/passwd
body: { acct_conn_id, acct_nm, mob_no, portal_type: 'A007USR', tnt_url_id }
    ↓ 성공
결과 메시지 팝업 표시 ("임시 비밀번호가 등록된 이메일로 발송됩니다")
    ↓
로그인 화면으로 자동 복귀
```

임시 비밀번호로 로그인하면 `passwd_mdfy_tgt_yn === 'Y'`가 응답에 포함되므로, 로그인 직후 비밀번호 변경 화면(`PasswordChange`)으로 강제 이동된다.

---

## AD(Active Directory) 연동

AD의 개념, 관련 설정값(`adItlkUsgYn`, `adModYn`, `ad_itlk_acct_yn`)의 정의는 [AD 용어 정의](../term/01-ad.md) 참고.

이 섹션에서는 AD 설정값이 user-portal 화면에 미치는 구체적인 영향을 다룬다.

### 화면에 미치는 영향

#### 1. "비밀번호 초기화" 버튼 표시 여부 (`Login.vue:170~184`)

```javascript
isAdItlkUsage() {
  // AD 사용 + read&write → 표시 (CloudX에서 AD에 비밀번호 쓰기 가능)
  if (adItlkUsgYn === 'true' && adModYn === 'true') return true;
  // AD 미사용 → 표시 (CloudX 자체 관리)
  if (adItlkUsgYn === 'false') return true;
  // AD 사용 + readonly → 숨김 (CloudX에서 비밀번호 변경 불가)
  return false;
}
```

| `adItlkUsgYn` | `adModYn` | "비밀번호 초기화" 버튼 |
|---|---|---|
| `'false'` | (무관) | 표시 |
| `'true'` | `'true'` | 표시 |
| `'true'` | `'false'` | 숨김 |

#### 2. 로그인 후 비밀번호 변경 분기 (`Login.vue:305~333`)

로그인 성공 후 비밀번호 관련 화면 전환은 `ad_itlk_acct_yn`(사용자별 속성)으로 판단한다:

```
로그인 성공 응답
  │
  ├── passwd_mdfy_tgt_yn === 'Y' (초기/임시 비밀번호)
  │     → passwordChange 화면 (AD 연동 여부 무관하게 이동)
  │
  ├── passwd_mdfy_vlid_yn === 'Y' && ad_itlk_acct_yn !== 'Y' (장기 미변경 & AD 미연동)
  │     → passwordNotChangedLongTime 화면
  │
  ├── passwd_mdfy_vlid_yn === 'Y' && ad_itlk_acct_yn === 'Y' (장기 미변경 & AD 연동)
  │     → 건너뜀, 바로 홈 진입 (AD가 비밀번호 정책 관리)
  │
  └── 그 외 → authLogin() → 홈 화면
```

#### 3. 2차 인증 후 동일 분기 (`index.vue:587~612`)

2차 인증(SMS/OTP) 통과 후에도 같은 로직이 적용된다:

```javascript
// index.vue certificationPass()
if (passwd_mdfy_tgt_yn === 'Y' && ad_itlk_acct_yn !== 'Y') {
  → passwordChange
} else if (passwd_mdfy_vlid_yn === 'Y' && ad_itlk_acct_yn !== 'Y') {
  → passwordNotChangedLongTime
} else {
  → authLogin() → 홈
}
```

AD 연동 계정은 비밀번호 변경/장기 미변경 화면을 건너뛰고 바로 홈으로 진입한다.

#### 4. 계정 설정의 비밀번호 변경 (`AccountSetting.vue:318`)

로그인 후 계정 설정 화면에서 비밀번호 변경을 시도할 때:

```javascript
changePw() {
  if (this.ad_itlk_acct_yn !== 'Y') {
    → 비밀번호 변경 폼 표시
  } else {
    → "AD 연동 계정은 비밀번호 변경이 제한됩니다" 팝업 표시
  }
}
```

### AD 연동 여부별 전체 비교

| 기능 | AD 미사용 | AD 연동 (read&write) | AD 연동 (readonly) |
|------|-----------|---------------------|-------------------|
| 로그인 폼/API | 동일 | 동일 | 동일 |
| "비밀번호 초기화" 버튼 | 표시 | 표시 | 숨김 |
| 초기 비밀번호 변경 | 강제 이동 | 강제 이동 | 강제 이동 |
| 장기 미변경 안내 | 표시 | 건너뜀 (AD 계정) | 건너뜀 (AD 계정) |
| 계정 설정 비밀번호 변경 | 가능 | 제한 팝업 (AD 계정) | 제한 팝업 (AD 계정) |

API 명세:
- [nauth-authentications](../api/nauth/auth/01-authentications.md)
