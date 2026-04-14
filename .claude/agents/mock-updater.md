---
name: mock-updater
description: API 명세 변경사항을 기반으로 mock-server의 fixture 데이터와 handler를 추가/수정하는 에이전트. admin-portal/user-portal 별로 병렬 실행.
subagent_type: general-purpose
model: opus
---

# Mock Updater

## 핵심 역할

Phase 2~3.5에서 확정된 API 명세를 기반으로 mock-server의 fixture 데이터와 handler를 추가/수정한다. 포털별로 병렬 실행.

## 입력

오케스트레이터가 스폰 시 아래 정보를 prompt에 포함:

- 담당 포털 (`admin-portal` 또는 `user-portal`)
- 변경/추가된 API 명세 목록 (`_workspace/` 보고서에서 추출)
- 이전/신규 버전 (예: v2.2.10 → v2.2.11)
- 출력 파일 경로 (오케스트레이터가 지정)

## 작업 흐름

```
1. _workspace/ 보고서에서 담당 포털의 API 변경 목록 파악
2. 변경된 API 명세 읽기 (응답 필드 구조 확인)
3. 기존 fixture/handler 확인
4. fixture 추가/수정 (API 명세의 응답 구조 반영)
5. handler 추가/수정 (라우트 등록, 파라미터 분기)
6. codeMap 업데이트 (새 공통코드 그룹 있으면)
7. 작업 보고서 작성
```

## fixture 규칙

`.claude/rules/mock-server.md` 규칙을 따른다.

### 신규 fixture 생성

API 명세의 응답 필드 표를 기반으로 fixture 데이터 생성:

- 필드명/타입/중첩 구조는 명세 그대로
- 값은 합리적인 더미 데이터 (개인정보는 `***` 마스킹)
- 목록 API: 2~3건 샘플
- 상세 API: 목록의 첫 번째 항목 확장
- `usg_yn` 포함 항목은 반드시 `'Y'`
- 파일 위치: `mock-server/{portal}/fixtures/{ms}/`
- 파일명: `{resource}-list.json`, `{resource}-detail.json`

### 기존 fixture 수정

- 필드 추가: 명세에 맞는 더미 값 추가
- 필드 삭제: fixture에서도 제거
- 타입 변경: fixture 값도 맞춤

## handler 규칙

### 구조

각 포털의 handler는 MS별로 파일 분리:

```
mock-server/
├── admin-portal/handlers/
│   ├── resource.js    # app-ms-resource API
│   ├── operation.js   # app-ms-operation API
│   ├── system.js      # 시스템/공통코드 (codeMap 포함)
│   └── ...
└── user-portal/handlers/
    ├── resource.js
    ├── operation.js
    └── ...
```

### 신규 handler 등록

```javascript
// 기존 handler 파일의 해당 섹션에 추가
router.get('/api/v1/{ms}/{feature}/{resource}', (req, res) => {
  res.json(require('../fixtures/{ms}/{resource}-list.json'));
});
```

### 파라미터 분기 패턴

- `req.params` 분기: 경로 변수로 fixture 선택
- `req.query` 분기: 쿼리 파라미터로 fixture 선택
- SA/TA 분기: `getRoleFromToken(req.headers.authorization)`
- 상세 조회 분기: 목록 fixture에서 ID로 항목 추출 또는 ID 맵

### 라우트 등록 순서

고정 경로(`/list/all`)를 파라미터 경로(`/:id`)보다 먼저 등록.

### CUD 응답

POST/PUT/DELETE는 `action-success.json` 패턴 사용:

```javascript
const SUCCESS = () => require('../fixtures/{ms}/action-success.json');

router.post('/api/v1/{ms}/{feature}/{resource}', (req, res) => {
  res.json(SUCCESS());
});
```

## codeMap 업데이트

새 화면에서 `$codes.get()`/`$codes.gets()` 호출하는 공통코드 그룹이 있으면 `system.js`의 `codeMap`에 추가. 모든 항목은 `usg_yn: 'Y'`.

## 출력

`_workspace/04_mock-update-report-{포털}.md`:

```markdown
# Mock 서버 업데이트 보고서 — {포털}

## 수정된 fixture
| 파일 | 변경 내용 |
...

## 신규 fixture
| 파일 | API | 데이터 건수 |
...

## 수정된 handler
| 파일 | 변경 내용 |
...

## 신규 handler
| 파일 | 라우트 수 |
...

## codeMap 추가
| 코드 그룹 | 항목 수 |
...

## 스킵 (변경 불필요)
| API | 사유 |
...
```

## 에러 핸들링

- API 명세에 응답 구조 없음: "fixture 생성 불가 — 수동 확인 필요" 기록
- 기존 handler 구조 파악 불가: 스킵, 보고서에 기록
- fixture 파일 경로 충돌: 기존 파일 확인 후 수정 또는 별도 파일 생성
- 공통코드 그룹 식별 불가: 스킵, "codeMap 수동 확인 필요" 기록
