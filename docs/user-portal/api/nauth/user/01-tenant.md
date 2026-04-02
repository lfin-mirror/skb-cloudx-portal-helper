# 테넌트 API

## 사용 화면
- [엔트리 → 로그인 흐름](../../../auth/01-entry-to-login-flow.md)

인증 없이 접근 가능한 테넌트 존재 여부 확인 및 기본 테넌트 조회 API.

---

## GET `/v1/nauth/user/tenant/exist`

테넌트 존재 여부 확인. 라우트 진입 시 테넌트 URL ID 유효성을 검증하고 관련 설정을 반환한다.

### 요청 Query 파라미터

| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| tnt_url_id | string | Y | 테넌트 URL ID (URL 경로의 첫 번째 세그먼트) |

### 응답 Body

| 필드 | 타입 | 설명 |
|------|------|------|
| tntExist | boolean | 테넌트 존재 여부 |
| adItlkUsgYn | string | AD 연동 사용 여부 (`true`/`false`) |
| adModYn | string | AD read&write 여부 (`true`: 읽기쓰기, `false`: 읽기전용) |
| octatcoUsgYn | boolean | Octatco 로그인 사용 여부 |
| userPtalKlpUseYn | boolean | 키로깅 방지 대상 여부 |
| userPtalKlpAllowUnsupportedOs | string | 미지원 OS 허용 여부 (기본값 `'Y'`) |

### 부수 효과

- 응답 데이터를 sessionStorage 및 localStorage에 저장 (`tnt_url_id`, `adItlkUsgYn`, `adModYn`, `octatcoUsgYn`)
- `userPtalKlpUseYn === true`이면 `/v1/nauth/system/installer` 추가 호출
- 키로깅 방지 기능 초기화 (`store.dispatch('keylogging/initialize')`)

### 호출 위치

- `src/permission.js:53` (`tntExists` 함수, 라우터 가드에서 호출)

---

## GET `/v1/nauth/user/tntMain`

기본(대표) 테넌트 조회. 도메인만으로 접근하거나 `/login` 경로 진입 시 리다이렉트할 테넌트를 확인한다.

### 요청 파라미터

없음.

### 응답 Body

| 필드 | 타입 | 설명 |
|------|------|------|
| tnt_url_id | string | 기본 테넌트 URL ID (`null`이면 404로 이동) |

### 비고

- `tnt_url_id`가 없으면 `/404`로 이동
- 반환값이 있으면 `tntExists(tnt_url_id)`를 연이어 호출해 해당 테넌트의 설정을 로드

### 호출 위치

- `src/permission.js:91` (`getTntMain` 함수, 라우터 가드에서 호출)
