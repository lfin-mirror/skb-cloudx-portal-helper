---
description: mock-server 폴더의 handler/fixture 작업 시 적용
globs: mock-server/**
---

# Mock 서버 작업 규칙

## 포털 코드 미수정 원칙

admin-portal, user-portal 소스코드는 수정하지 않는다. 화면 에러는 mock 응답을 조정해서 해결한다.

## fixture 데이터

- 실서버 응답 구조를 그대로 사용한다. 필드명, 중첩 구조, 타입(string/number)을 변경하지 않는다.
- 개인정보는 모두 `***`로 마스킹한다:
  - 이름(acct_nm, req_acct_nm, had_acct_nm, tgt_acct_nm 등): `***`
  - 계정 연결 ID(acct_conn_id, req_acct_conn_id, tgt_acct_conn_id 등): `***`
  - 이메일: `***@***.kr`
  - 전화번호: `***`
  - 실서버 응답에서 부분 마스킹된 값(예: `손*성`, `skyu***`)도 `***`로 통일.
- fixture 파일은 `mock-server/{portal}/fixtures/` 하위에 둔다.
- fixture 파일명은 API 리소스명 기준: `{resource}-list.json`, `{resource}-detail.json`.

## codeMap 관리

- `system.js`의 `codeMap` 객체에 공통코드 그룹을 등록한다.
- 새 화면에서 `$codes.get()` / `$codes.gets()` 에러 발생 시 해당 코드 그룹을 codeMap에 추가한다.
- codeMap에 없는 코드 그룹은 fallback(`{cdGrpId}01`, `02`, `03`)으로 반환되며, 프론트엔드의 `.find(item => item.value === '...')`에서 매칭 실패 → `null.value` 에러를 유발한다.
- `$codes.gets()`는 `cd_grp_id=A&cd_grp_id=B` 형태로 복수 요청하므로, mock은 배열 파라미터를 처리해야 한다 (현재 구현 완료).
- **sessionStorage 캐시 주의**: 코드 그룹을 추가/수정한 후에는 브라우저의 sessionStorage에서 `codes` 항목을 삭제해야 반영된다.

## 파라미터 분기 패턴

path/query/body 파라미터에 따라 응답이 달라져야 하는 경우:

- `req.params` 분기: 경로 변수로 fixture 선택 (예: `/:ptalTypeCd` → A007ADM/A007USR)
- `req.query` 분기: 쿼리 파라미터로 fixture 선택 (예: `?mkind=super` → SA/TA 메뉴 트리)
- `req.body` 분기: 요청 바디로 분기 (예: 로그인 ID에 'sa' 포함 → SA 토큰)
- 인라인 맵: 코드값 매핑은 handler 내 객체로 관리 (예: codeMap)

## SA/TA 분기

- `constants.js`의 `getRoleFromToken(authHeader)`으로 SA/TA 판별한다.
- SA 토큰: `Bearer mock-sa-token`, TA 토큰: `Bearer mock-ta-token`.
- 로그인 시 ID에 'sa' 포함 → SA 토큰, 그 외 → TA 토큰.

## 상세 조회 분기 패턴

같은 상세 API가 조건에 따라 다른 응답을 반환해야 하는 경우:

- **목록 기반 분기**: 목록 fixture에서 ID로 항목을 찾아 유형 코드를 추출 → 유형별 fixture 반환. (예: 업무요청 상세 — `usr_req_div_cd`별 7개 fixture)
- **ID 맵 분기**: handler 내 `{ id: fixturePath }` 맵으로 직접 분기. (예: 권한 그룹 상세 — `grpId`별 fixture)
- fixture 파일명: `{resource}-detail-{분기값}.json` (예: `work-request-detail-J003DAR.json`, `admin-group-detail-ta-default.json`)

## codes.js 플러그인 주의사항

admin-portal의 `codes.js` 플러그인 `gets()` 메서드에 버그 존재: `.map()` 내부에서 `usg_yn !== 'Y'`일 때 `undefined` 반환 → sessionStorage 경유 시 `null` 변환 → `v-for`에서 `null.value` 에러. **codeMap의 모든 항목과 fallback 항목은 `usg_yn: 'Y'`로 설정**해야 한다.

## 라우트 등록 순서

Express는 먼저 등록된 라우트가 우선 매칭된다. 고정 경로(예: `/list/all`)를 파라미터 경로(예: `/:id`)보다 먼저 등록해야 한다.
