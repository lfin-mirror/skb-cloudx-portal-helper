# 로그아웃 API

## 사용 화면
- (화면 문서 미작성 — 로그아웃 기능에서 사용)

> **인증 토큰 필요**: 요청 헤더에 `Authorization` 토큰 필요

---

## GET /v1/logout

### 로그아웃

서버 세션 무효화 및 클라이언트 인증 정보 초기화.

**호출 위치**: `store/modules/user.js:128` (`LogOut` action)

#### 요청 파라미터

없음

#### 응답

없음 (HTTP 200 성공 확인 후 클라이언트 처리)

#### 클라이언트 처리 순서

| 순서 | 처리 내용 |
|------|----------|
| 1 | Vuex store의 user, rawUser, name, roles, favorites 초기화 |
| 2 | Vuex store의 token 초기화 |
| 3 | 쿠키/스토리지의 토큰 삭제 (`removeToken()`) |
| 4 | `/login` 페이지로 이동 (`location.href`) |

#### 비고

- 초기 비밀번호 변경 완료 후에도 동일한 `LogOut` action 호출 (`views/login/index.vue:820`)
- 토큰 만료 시 자동 로그아웃: `request.js`의 응답 인터셉터에서 에러 코드 `AGW-1003`, `AGW-1004`, `AGW-1005` 수신 시 `FedLogOut` action 호출 (서버 API 호출 없이 클라이언트만 초기화)
