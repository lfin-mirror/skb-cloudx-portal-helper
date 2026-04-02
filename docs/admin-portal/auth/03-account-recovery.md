# 아이디 찾기 / 비밀번호 초기화

로그인 페이지 하단의 "아이디 찾기", "비밀번호 찾기" 기능.

## 아이디 찾기

로그인 폼 하단 "아이디 찾기" 링크 클릭 → 아이디 찾기 폼 전환.

### 입력 필드

| 필드 | 설명 |
|------|------|
| `acct_nm` | 사용자 이름 |
| `mob_no` | 등록된 휴대폰 번호 |

### API

```
POST /v1/nauth/auth/authentications/accounts
body: { acct_nm, mob_no, portal_type: 'A007ADM' }
```

`portal_type: 'A007ADM'`으로 admin-portal 전용임을 명시. user-portal은 `'A007USR'` 사용.

### 결과

성공 시 등록된 휴대폰으로 아이디 발송.

## 비밀번호 초기화

로그인 폼 하단 "비밀번호 찾기" 링크 클릭 → 비밀번호 초기화 폼 전환.

### 입력 필드

| 필드 | 설명 |
|------|------|
| `acct_conn_id` | 아이디 |
| `acct_nm` | 사용자 이름 |
| `mob_no` | 등록된 휴대폰 번호 |

### API

```
POST /v1/nauth/auth/authentications/temp/passwd
body: { acct_conn_id, acct_nm, mob_no, portal_type: 'A007ADM' }
```

### 결과

성공 시 임시 비밀번호가 등록된 휴대폰으로 발송. 임시 비밀번호로 로그인하면 `passwd_mdfy_tgt_yn === 'Y'`로 초기 비밀번호 변경 강제.

## user-portal과의 차이

| 항목 | admin-portal | user-portal |
|------|-------------|-------------|
| `portal_type` | `'A007ADM'` | `'A007USR'` |
| AD 연동 영향 | 없음 | AD 연동 시 비밀번호 초기화 불가 안내 |
| 동일 API | O | O (portal_type으로 분기) |
