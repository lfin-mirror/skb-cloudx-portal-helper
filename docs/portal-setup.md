# 포털 패키지 설치

## user-portal (Node lts/jod, npm)

```bash
cd user-portal && npm install
```

## admin-portal (Node 11.15.0, yarn)

admin-portal은 node-sass 4.x를 사용하므로 Apple Silicon Mac(M1/M2/M3)에서는 Rosetta(x86_64) 모드가 필요하다.

```bash
# Rosetta 미설치 시
softwareupdate --install-rosetta

# Node 11에 yarn 설치 (최초 1회)
arch -x86_64 zsh -c 'source ~/.nvm/nvm.sh && nvm use 11.15.0 && npm install -g yarn'

# 패키지 설치
arch -x86_64 zsh -c 'source ~/.nvm/nvm.sh && nvm use 11.15.0 && cd admin-portal && yarn install --force'
```

Intel Mac은 `arch -x86_64` 없이 직접 실행 가능.

## user-portal 설정 (mock 서버 연결)

`user-portal/config/application.json`의 API URL을 mock 서버로 변경한다:

```json
{
  "VUE_APP_API_URI": "http://localhost:3000/api",
  "VUE_APP_REMOTE_URI": "http://localhost:3000",
  "VUE_APP_FILE_URI": "http://localhost:3000"
}
```

이 변경은 커밋하지 않는다. git에서 추적을 제외하려면:

```bash
cd user-portal
git update-index --assume-unchanged config/application.json
```

원복이 필요할 때:

```bash
git update-index --no-assume-unchanged config/application.json
git checkout config/application.json
```

## admin-portal 설정 (mock 서버 연결)

admin-portal도 user-portal과 동일하게 `config/application.json`에서 API URL을 읽는다 (`src/utils/localConfig.js` → `config/application.json`).

`admin-portal/config/application.json`의 API URL을 mock 서버로 변경한다:

```json
{
    "VUE_APP_API_URI": "http://localhost:3000/api",
    "VUE_APP_REMOTE_URI": "http://localhost:3000",
    "VUE_APP_FILE_URI": "http://localhost:3000"
}
```

이 변경은 커밋하지 않는다. git에서 추적을 제외하려면:

```bash
cd admin-portal
git update-index --assume-unchanged config/application.json
```

### 포털 분기

mock 서버는 요청 헤더 `X-CloudPC-Request-Poc`로 포털을 구분한다:

- `POCUSER` → `user-portal/handlers/` 라우터
- `POCADMIN` → `admin-portal/handlers/` 라우터

각 포털의 axios 인터셉터가 이 헤더를 자동으로 주입하므로 별도 설정 불필요.

### SA / TA 로그인

admin-portal 로그인 시 **아이디에 따라** 역할이 결정된다:

| 아이디 입력값 | 역할 | 토큰 |
|--------------|------|------|
| `sa`, `superadmin` 등 (`sa` 포함) | Super Admin | `Bearer mock-sa-token` |
| `ta`, `tenantadmin` 등 (그 외) | Tenant Admin | `Bearer mock-ta-token` |

비밀번호는 아무 값이나 입력하면 된다.

이후 메뉴 API(`/v1/user/admin/groups/menus`)는 토큰을 보고 SA/TA 메뉴 트리를 반환한다.

### SA ↔ TA 권한 전환

`/v1/authRemake` API로 런타임에 역할을 전환한다. admin-portal의 권한 전환 모달에서 호출되며, 요청 body의 `grp_typ_cd`로 분기한다:

- `U001SUP` → SA로 전환, `Bearer mock-sa-token` 발급
- `U001TNT` → TA로 전환, `Bearer mock-ta-token` 발급
