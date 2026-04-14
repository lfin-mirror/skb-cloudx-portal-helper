# Phase 4: Mock 서버 업데이트 참고사항

## 목적

Phase 2~3.5에서 확정된 API 명세를 mock-server에 반영. 프론트엔드가 변경된 API로 정상 동작할 수 있도록 fixture 데이터와 handler를 맞춘다.

## mock-server 구조

```
mock-server/
├── server.js              # Express 서버 진입점
├── constants.js           # getRoleFromToken(), 공통 상수
├── admin-portal/
│   ├── handlers/
│   │   ├── resource.js    # /api/v1/resource/** 라우트
│   │   ├── operation.js   # /api/v1/operation/** 라우트
│   │   ├── system.js      # /api/v1/system/**, codeMap
│   │   ├── user.js        # /api/v1/user/admin/** 라우트
│   │   ├── monitoring.js  # /api/v1/monitoring/** 라우트
│   │   ├── gw.js          # /api/v1/gw/** 라우트
│   │   ├── auth.js        # 인증 관련
│   │   └── nauth.js       # 비인증 관련
│   └── fixtures/
│       ├── resource/      # VPC, 호스트, 네트워크, 스토리지 등
│       ├── operation/     # 정책, 인증서, 테넌트 등
│       ├── system/        # 공통코드, 메뉴 등
│       ├── user/          # 사용자, 권한 그룹 등
│       └── monitoring/    # 모니터링 데이터
└── user-portal/
    ├── handlers/
    │   ├── resource.js
    │   ├── operation.js
    │   ├── system.js
    │   ├── user.js
    │   ├── gw.js
    │   ├── auth.js
    │   ├── nauth.js
    │   └── fileService.js
    └── fixtures/
        ├── resource/
        ├── system/
        ├── user/
        └── auth/
```

## API 변경 → mock 작업 매핑

### Phase 2~3 보고서에서 추출

`_workspace/02_update-report-*.md`, `_workspace/03_update-report-*.md`에서:
- 추가된 API → 신규 fixture + handler 라우트 추가
- 수정된 API (필드 변경) → fixture 필드 수정
- 삭제된 API → handler 라우트 제거 (fixture는 보존)

### API 경로 → handler 파일 매핑

| API 경로 prefix | handler 파일 |
|-----------------|-------------|
| `/api/v1/resource/` | `resource.js` |
| `/api/v1/operation/` | `operation.js` |
| `/api/v1/system/` | `system.js` |
| `/api/v1/user/` | `user.js` |
| `/api/v1/monitoring/` | `monitoring.js` |
| `/api/v1/gw/` | `gw.js` |

### API 경로 → fixture 폴더 매핑

| API 경로 prefix | fixture 폴더 |
|-----------------|-------------|
| `/api/v1/resource/vpcs/` | `fixtures/resource/` (vpc-*.json) |
| `/api/v1/resource/hosts/` | `fixtures/resource/` (host-*.json) |
| `/api/v1/operation/cert/` | `fixtures/operation/` (cert-*.json) |
| `/api/v1/operation/policy/` | `fixtures/operation/` (policy-*.json) |

## fixture 작성 패턴

### 목록 응답

```json
{
  "resultCode": "OK",
  "resultMessage": "성공",
  "data": {
    "content": [
      { "id": "item-001", "nm": "샘플 항목 1", "reg_dt": "2026-04-14 10:00:00" },
      { "id": "item-002", "nm": "샘플 항목 2", "reg_dt": "2026-04-14 11:00:00" }
    ],
    "totalElements": 2,
    "totalPages": 1,
    "number": 0,
    "size": 20
  }
}
```

### 상세 응답

```json
{
  "resultCode": "OK",
  "resultMessage": "성공",
  "data": {
    "id": "item-001",
    "nm": "샘플 항목 1",
    "desc": "상세 설명",
    "reg_dt": "2026-04-14 10:00:00",
    "mod_dt": "2026-04-14 12:00:00"
  }
}
```

### CUD 성공 응답

```json
{
  "resultCode": "OK",
  "resultMessage": "성공"
}
```

### 개인정보 마스킹

| 필드 유형 | 마스킹 값 |
|----------|----------|
| 이름 (acct_nm 등) | `***` |
| 계정 ID (acct_conn_id 등) | `***` |
| 이메일 | `***@***.kr` |
| 전화번호 | `***` |

## handler 작성 패턴

### 기본 CRUD

```javascript
// 목록 조회
router.get('/api/v1/{ms}/{feature}', (req, res) => {
  res.json(require('../fixtures/{ms}/{resource}-list.json'));
});

// 상세 조회
router.get('/api/v1/{ms}/{feature}/:id', (req, res) => {
  res.json(require('../fixtures/{ms}/{resource}-detail.json'));
});

// 등록
router.post('/api/v1/{ms}/{feature}', (req, res) => {
  res.json(SUCCESS());
});

// 수정
router.put('/api/v1/{ms}/{feature}/:id', (req, res) => {
  res.json(SUCCESS());
});

// 삭제
router.delete('/api/v1/{ms}/{feature}/:id', (req, res) => {
  res.json(SUCCESS());
});
```

### SA/TA 분기

```javascript
const { getRoleFromToken } = require('../../constants');

router.get('/api/v1/{ms}/{feature}', (req, res) => {
  const role = getRoleFromToken(req.headers.authorization);
  if (role === 'SA') {
    res.json(require('../fixtures/{ms}/{resource}-list-sa.json'));
  } else {
    res.json(require('../fixtures/{ms}/{resource}-list-ta.json'));
  }
});
```

### 상세 조회 분기 (목록 기반)

```javascript
router.get('/api/v1/{ms}/{feature}/:id', (req, res) => {
  const list = require('../fixtures/{ms}/{resource}-list.json');
  const item = list.data.content.find(i => i.id === req.params.id);
  const typeCode = item?.type_cd || 'DEFAULT';

  const fixtureMap = {
    'TYPE_A': '../fixtures/{ms}/{resource}-detail-a.json',
    'TYPE_B': '../fixtures/{ms}/{resource}-detail-b.json',
  };

  const fixture = fixtureMap[typeCode] || '../fixtures/{ms}/{resource}-detail.json';
  res.json(require(fixture));
});
```

## codeMap 확인 방법

변경된 Vue 컴포넌트에서 공통코드 호출을 검색:

```bash
# 변경된 컴포넌트에서 $codes 사용처 찾기
grep -n '\$codes\.\(get\|gets\)' admin-portal/src/views/ChangedComponent.vue
```

`system.js`의 `codeMap`에 해당 그룹이 없으면 추가:

```javascript
const codeMap = {
  // ... 기존 항목
  'NEW_GROUP': [
    { cd_id: 'NEW_GROUP01', cd_nm: '항목1', usg_yn: 'Y' },
    { cd_id: 'NEW_GROUP02', cd_nm: '항목2', usg_yn: 'Y' },
  ],
};
```

## 기존 fixture와의 정합성

Phase 3.5 api-quality consistency 검증에서 fixture ↔ 명세 ↔ OpenAPI 3-way 검증을 이미 통과한 상태. Phase 4에서는:

1. 명세의 응답 필드 표 → fixture JSON 구조가 일치하는지 확인
2. 불일치 시 fixture를 명세에 맞춤 (명세가 정본)
3. Phase 5에서 OpenAPI도 최종 동기화

## 검증

fixture/handler 추가 후 가능하면 curl로 최소 응답 검증:

```bash
# mock 서버가 실행 중이면
curl -s -H 'Authorization: Bearer mock-sa-token' \
  http://localhost:3000/api/v1/{ms}/{feature} | jq '.resultCode'
```

mock 서버 미실행 시 검증은 스킵, 보고서에 "curl 검증 미수행" 기록.
