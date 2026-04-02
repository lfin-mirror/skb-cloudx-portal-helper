---
type: flow
title: VPN 자동 로그인
status: stable
version: v2.2.9
portal: user
screens:
  - login/VpnLogin.vue
  - login/VpnLoginCheck.vue
related_docs:
  - ../term/02-octatco.md
api_endpoints:
  - POST /v1/nauth/user/auth/check
---

# VPN 자동 로그인

VPN을 통해 접속한 사용자가 별도 로그인 과정 없이 자동으로 인증되는 경로다. [Octatco](../term/02-octatco.md) 연동 테넌트에서 VPN 접속 시 사용하는 전용 경로로, `VpnLoginCheck` 컴포넌트가 `octatco/` 폴더 안에 위치하며 Octatco 로고를 표시한다.

## 진입 조건

사용자가 직접 이 URL에 접근하는 경우는 없다. **VPN 장비(또는 보안 솔루션)가 인증 성공 후 브라우저를 자동으로 열면서 리다이렉트**한다.

```
사용자가 VPN 클라이언트로 사내 내부망에 접속
  → VPN 장비가 인증 성공 확인
  → 브라우저를 자동으로 열면서 URL 파라미터에 인증 정보 포함:
    /auth/check?acct_conn_id=hbyoon3&onePassToken=abc123xyz
```

`onePassToken`은 일회용 토큰으로 재사용이 불가하다. 라우트 `/auth/check`는 `permission.js`의 화이트리스트에 포함되어 있어 JWT 토큰 없이 접근 가능하다.

## 흐름 — `views/login/VpnLogin.vue` → `VpnLoginCheck.vue`

```
/auth/check?acct_conn_id={아이디}&onePassToken={일회용토큰}
    ↓
VpnLogin.vue 렌더링 (Octatco 로고 + 로딩 화면)
    ↓
VpnLoginCheck.vue mounted → checkToken() 자동 실행
    ↓
URL에서 acct_conn_id, onePassToken 추출
  (파라미터 누락 시 → "로그인 인증 실패" 팝업)
    ↓
POST /v1/nauth/user/auth/check
body: { acctConnId, onePassToken }
    ↓ 성공
응답에서 사용자 정보 + 토큰 획득
  → Vuex userAuthInfo dispatch
  → authLogin() → Vuex Login dispatch
  → tnt_url_id를 응답의 tnt_nm에서 추출 → sessionStorage 저장
  → nextRouter() → /:tenant/home 이동
    ↓ 실패
에러 코드별 처리 (errCode.js의 getErrMsg)
  → 에러 팝업 표시
  → 확인 클릭 → /:tenant/login 이동
```

## 에러 처리

| 상황 | 동작 |
|------|------|
| URL 파라미터 누락 (`acct_conn_id` 또는 `onePassToken` 없음) | "로그인 인증 실패" 팝업 |
| 응답에 `error` 객체 포함 | `error.reason` 메시지 팝업 |
| `AUTH-4218` | 서버 메시지 그대로 표시 |
| 기타 AUTH 에러 | `errCode.js`에서 매핑된 메시지 표시 |
| 네트워크 에러 | "로그인 인증 실패" 팝업 |

모든 에러 시 팝업 확인 후 로그인 페이지(`/:tenant/login`)로 이동한다.

API 명세:
- [vpn](../api/nauth/user/02-vpn.md)
