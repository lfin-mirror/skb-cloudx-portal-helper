# 로그인 → 대시보드 진입

로그인 폼 제출부터 대시보드 도달까지의 흐름. 1차 인증 → 2차 인증(SMS) → 초기 비밀번호 변경 → 대시보드 순서.

## 1차 인증

```
POST /v1/gw/authentications/admin
body: { acct_conn_id, passwd }
```

### 응답 주요 필드

| 필드 | 설명 |
|------|------|
| `acct_id` | 계정 ID |
| `grp_typ_cd` | 역할 코드 (`U001SUP`: SA, `U001TNT`: TA) |
| `acct_2nd_cert_tgt_yn` | 2차 인증 대상 여부 |
| `acct_sts_cd` | 계정 상태 (`U013SL`: 휴면, `U013IN`: 초기화 필요, `U013NR`: 정상) |
| `n2nd_cert_typ_cd` | 2차 인증 타입 (`U004SMS`) |
| `challenge_id` | 2차 인증 챌린지 ID |
| `passwd_mdfy_tgt_yn` | 초기 비밀번호 변경 필요 여부 |
| `passwd_mdfy_vlid_yn` | 비밀번호 변경 유효기간 안내 여부 |

응답 헤더 `Authorization`에서 JWT 토큰 추출.

### 1차 인증 후 분기

```
1차 인증 성공
  ├── acct_2nd_cert_tgt_yn === 'Y'
  │   ├── acct_sts_cd === 'U013SL' (휴면) → 휴면 계정 안내 표시
  │   └── 그 외 → 2차 인증 (SMS 코드 발송)
  └── acct_2nd_cert_tgt_yn !== 'Y'
      ├── passwd_mdfy_tgt_yn === 'Y' → 초기 비밀번호 변경
      └── passwd_mdfy_tgt_yn !== 'Y' → 정상 로그인 처리 (authLogin)
```

## 2차 인증 (SMS)

현재 SMS(`U004SMS`)만 구현. 다른 인증 방식은 TODO 상태.

### 코드 발송

```
POST /v1/nauth/auth/authentications/2nd_cert
body: { acct_conn_id, n2nd_cert_typ_cd, challenge_id }
```

발송 후 180초 카운트다운 타이머 시작 (분:초 형식).

### 코드 검증

```
POST /v1/gw/authentications/2nd_cert/{acct_conn_id}/{challenge_id}/{code}
```

6자리 숫자 코드 입력. 검증 결과 분기:

| 결과 | 에러 코드 | 처리 |
|------|----------|------|
| 성공 | - | 초기 비밀번호 변경 체크 → `authLogin` |
| 인증번호 불일치 | `AUTH-4214` | 에러 메시지 표시 |
| 과도한 발송 | `AUTH-4220` | 로그인 페이지로 리다이렉트 |
| 세션 만료 | `AUTH-4216` | 로그인 페이지로 리다이렉트 |

## 초기 비밀번호 변경

`passwd_mdfy_tgt_yn === 'Y'`이면 강제 비밀번호 변경 폼 표시.

```
PUT /v1/gw/authentications/accounts/firstpassword
body: { acct_conn_id, passwd, new_passwd, new_passwd_confirm }
```

변경 성공 → 자동 로그아웃 → `/login`으로 리다이렉트 (재로그인 필요).

## 정상 로그인 처리 (`authLogin`)

```
1. store.dispatch('Login', { user, token })
   → SET_USER, SET_ROLES(['U001SUP' 또는 'U001TNT']), SET_TOKEN
   → GET /v1/user/accounts/favorite → SET_FAVORITES

2. rememberMe 체크 → localStorage에 아이디 저장

3. passwd_mdfy_vlid_yn === 'Y'
   → 비밀번호 변경 유효기간 안내 폼 표시
   → "비밀번호 변경" 클릭 → /userInfo 이동
   → "나중에" 클릭 → 안내 무시, 계속 진행

4. nextRouter() 호출
```

### `nextRouter()` — 대시보드 진입 분기

```
nextRouter()
  ├── acct_sts_cd === 'U013IN' (초기화 필요)
  │   → /initialized (시스템 초기 설정 마법사)
  │
  ├── SA + acct_sts_cd === 'U013NR' (정상)
  │   → getUserIp() 호출 (등록된 IP 확인)
  │   ├── 등록된 IP 없음 → 최초 IP 등록 폼 표시
  │   └── 등록된 IP 있음 → 대시보드 이동
  │
  └── 그 외 (TA 또는 redirect 쿼리 있음)
      ├── redirect 쿼리 → 해당 경로로 이동
      └── redirect 없음 → /dashboard
```

### SA 최초 IP 등록

SA 첫 로그인 시 클라이언트 IP를 서버에 등록하는 단계. 1차 인증 응답의 `x_real_ip` 값을 사용.

## 로그인 성공 후 라우터 가드 동작

```
/dashboard 이동 → permission.js beforeEach
  → getToken() 성공
  → addRouters.length === 0
  → GenerateRoutes dispatch
    → GET /v1/user/admin/groups/menus
    → 역할(SA/TA)별 메뉴 필터링
    → router.addRoutes()
  → /dashboard 렌더링
```

## 세션 만료 / 강제 로그아웃

| 트리거 | 처리 |
|--------|------|
| `AGW-1003/1004/1005` (토큰 에러) | `FedLogOut` → `/login` 리다이렉트 + 경고 팝업 |
| `AGW-1006` (토큰 없음) | 요청 인터셉터에서 요청 취소 |
| 사용자 로그아웃 | `LogOut` → `GET /v1/logout` → 상태 초기화 → `/login` |

## user-portal과의 차이

| 항목 | admin-portal | user-portal |
|------|-------------|-------------|
| 로그인 API | `/v1/gw/authentications/admin` | `/v1/gw/authentications/user` |
| 2차 인증 | SMS만 | SMS, OTP, 모바일/PC 생체인증, Email 등 |
| 2차 인증 라이브러리 | 없음 | Octatco SDK |
| 초기 비밀번호 변경 후 | 자동 로그아웃 | 자동 로그아웃 |
| 초기 설정 페이지 | `/initialized` (SA 전용) | 없음 |
| IP 등록 | SA 최초 접속 시 필수 | 없음 |
| MQTT | 없음 | 모바일 생체 인증 통신용 |
| 토큰 키 | `Admin-Token` | `Authorization` |
| 비밀번호 만료 안내 | "나중에" 버튼으로 무시 가능 | 동일 |
