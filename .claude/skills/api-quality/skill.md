---
name: api-quality
description: API 품질 관리 통합 오케스트레이터. DTO 대조, 3-way 정합성 검증, OpenAPI 변환을 모드별로 실행. 'API 검증', 'API 명세 검증', '정합성 검증', '3-way 비교', 'OpenAPI 변환', 'Hoppscotch', 'spec 리뷰', 'API 품질' 요청 시 사용.
---

# API Quality — 통합 오케스트레이터

API 명세서의 품질을 관리하는 단일 진입점. 모드에 따라 다른 파이프라인을 실행한다.

## 모드

| 모드 | 트리거 키워드 | 파이프라인 |
|------|-------------|-----------|
| `dto-review` | "DTO 대조", "spec 리뷰", "API 명세 DTO 검증" | reviewer(DTO) → fixer |
| `consistency` | "정합성 검증", "3-way 비교", "fixture-명세-OpenAPI" | reviewer(3-way) → fixer |
| `openapi-gen` | "OpenAPI 변환", "Hoppscotch", "YAML 생성" | openapi-gen → 합치기 |
| `full` | "API 전체 품질", "API 품질 검증" | dto-review → consistency → openapi-gen |

모드를 명시하지 않으면 키워드에서 자동 판별한다.

## 에이전트

| 에이전트 | 파일 | 모드 |
|---------|------|------|
| `api-reviewer` | `.claude/agents/api-reviewer.md` | dto-review, consistency |
| `api-fixer` | `.claude/agents/api-fixer.md` | dto-review, consistency |
| `api-openapi-gen` | `.claude/agents/api-openapi-gen.md` | openapi-gen |

## 도메인 슬라이스

모든 모드에서 공통으로 사용하는 도메인 분할:

| # | 이름 | 명세서 (docs/ 기준) | 백엔드 | fixture 경로 |
|---|------|---------|--------|-------------|
| 1 | resource-vpc | `admin-portal/api/resource/vpcs`, `pools` | `app-ms-resource: rest/vpcs/**`, `rest/pool/**` | `resource/vpc-*.json` |
| 2 | resource-infra | `admin-portal/api/resource/hosts`, `networks`, `templates` | `app-ms-resource: rest/host`, `rest/network`, `rest/template` 등 | `resource/host-*.json`, `network-*.json` 등 |
| 3 | resource-data | `admin-portal/api/resource/tenants`, `volumes`, `disk`, `snapshot`, `storage`, `migration`, `vm-authorization` | `app-ms-resource: rest/tenant`, `rest/volume` 등 | `resource/tenant-*.json`, `disk-*.json` 등 |
| 4 | operation | `admin-portal/api/operation/**` | `app-ms-operation: rest/**` | `operation/*.json` |

## 모드별 실행 흐름

### dto-review 모드

```
Phase 1: Review
  TeamCreate → 4~6개 api-reviewer (mode=dto-review) 병렬
  각 reviewer: spec → Controller → DTO → 대조 → _workspace/review-{slice}.md
  팀 종료

  ↓ 사용자 확인 게이트

Phase 2: Fix
  TeamCreate → 4~6개 api-fixer 병렬
  각 fixer: 보고서 → 명세서 수정
  팀 종료
```

### consistency 모드

```
Phase 1: Audit
  TeamCreate → 4개 api-reviewer (mode=consistency) 병렬
  각 reviewer: fixture + 명세서 + OpenAPI 3-way diff → _workspace/audit-{slice}.md
  팀 종료

  ↓ 사용자 확인 게이트

Phase 2: Fix
  TeamCreate → 4개 api-fixer 병렬
  각 fixer: 보고서 → 명세서 + OpenAPI YAML 수정
  팀 종료
```

### openapi-gen 모드

```
TeamCreate → 3~4개 api-openapi-gen 병렬 (도메인별 분할)
각 generator: 명세서 → _workspace/openapi-{slice}.yaml 생성
팀 종료

→ Node 스크립트로 파트 합치기 (js-yaml 사용, 중복 path merge)
→ admin + user 통합: tag prefix (admin/*, user/*), user schema는 User_ prefix
→ docs/openapi-cloudx.yaml 최종 생성
→ YAML 유효성 검증
```

### OpenAPI 응답 예시 규칙

- 모든 GET API의 response에 `example` 필드를 포함한다.
- **example 데이터는 mock fixture를 정답으로 사용한다.** 명세서나 DTO가 아닌, 실제 fixture JSON의 데이터를 그대로 example에 넣는다.
- fixture에 마스킹(`***`)된 값은 그대로 example에 포함한다.
- handler에서 fixture를 찾는 방법: `mock-server/admin-portal/handlers/*.js`에서 해당 API path의 `require('../fixtures/...')` 경로를 확인.
- fixture가 없는 API (인라인 응답, POST/PUT/DELETE success)는 example 생략.
- 중첩 구조(volumes[], subnets[], ports[] 등)도 fixture 그대로 포함.
- example은 schema 정의와 별개로, `responses.200.content.application/json.example`에 배치:

```yaml
responses:
  "200":
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/VpcGroupListResponse'
        example:
          data:
            - vm_grp_id: "7883baf9-ab5b-11f0-8557-3a7bf606d4cf"
              vm_grp_nm: "Win10"
              tnt_nm: "TEST_TENANT"
              ...
```

### full 모드

```
dto-review 실행 → 완료 →
consistency 실행 → 완료 →
openapi-gen 실행 → 완료
```

Phase 간 팀을 해체하고 새 팀을 구성한다. 이전 Phase의 산출물(`_workspace/`)은 다음 Phase에서 참조 가능.

## 정답 우선순위

| 모드 | 정답 |
|------|------|
| dto-review | DTO (백엔드 Java 소스) |
| consistency | fixture > 명세서 > OpenAPI |
| openapi-gen | 명세서 (입력 그대로 변환) |

## 데이터 전달

| 구간 | 방식 |
|------|------|
| Phase 1 → Phase 2 | `_workspace/*.md` 보고서 파일 |
| openapi-gen 파트 → 합치기 | `_workspace/openapi-*.yaml` 파트 파일 |
| Phase 간 | 파일 (`_workspace/`) — 팀 해체 후에도 유지 |

## 에러 핸들링

- 에이전트 1개 실패: 해당 도메인만 재시도
- Controller 미발견: "미매핑" 보고, 수정 스킵
- OpenAPI YAML 문법 오류: 합치기 단계에서 검증 + 수정
- fixture 수동 확인 필요: 보고서에 플래그, 수정하지 않음

## OpenAPI 합치기 스크립트

```bash
npm install --no-save js-yaml  # 최초 1회
node -e "
const fs = require('fs');
const yaml = require('js-yaml');
const files = ['openapi-resource-vpc.yaml','openapi-resource-infra.yaml',
               'openapi-resource-data.yaml','openapi-admin-operation-paths.yaml'];
const mergedPaths = {}, mergedSchemas = {};
files.forEach(f => {
  const doc = yaml.load(fs.readFileSync('_workspace/'+f,'utf8'));
  if(doc.paths) Object.entries(doc.paths).forEach(([p,m])=>{
    mergedPaths[p] ? Object.assign(mergedPaths[p],m) : mergedPaths[p]=m;
  });
  if(doc.components?.schemas) Object.entries(doc.components.schemas).forEach(([n,s])=>{
    if(!mergedSchemas[n]) mergedSchemas[n]=s;
  });
});
const merged = {
  openapi:'3.0.3',
  info:{title:'CloudX VDI Platform API - Admin Portal',version:'v2.2.9'},
  servers:[{url:'http://127.0.0.1:3000/api',description:'Mock Server'}],
  security:[{bearerAuth:[]}],
  paths:mergedPaths,
  components:{securitySchemes:{bearerAuth:{type:'http',scheme:'bearer'}},schemas:mergedSchemas}
};
fs.writeFileSync('_workspace/openapi-admin.yaml',yaml.dump(merged,{lineWidth:-1,noRefs:true}));
console.log('Paths:',Object.keys(mergedPaths).length,'Schemas:',Object.keys(mergedSchemas).length);
"
```

## 주의사항

- `app-ms-resource`, `app-ms-operation`만 로컬 존재. user/system/gw MS API는 스킵.
- DTO 상속 체인 추적 필수 (`Detail extends List`)
- `@JsonIgnore`/`@JsonIgnoreProperties` 제외 필드 확인
- interceptor(`res.data = res.data.data || res.data`) — fixture 구조와 실제 응답 구조가 다를 수 있음
- OpenAPI YAML 수정 시 description 안에 따옴표 주의 (YAML 문법 깨짐)

## 테스트 시나리오

### 정상 (consistency 모드)
1. Phase 1 → 4개 audit 보고서 → 사용자 확인
2. Phase 2 → 명세서 + OpenAPI 수정 → 커밋

### 에러 (full 모드)
1. dto-review에서 DTO 추적 실패 → 보고서에 "추적 불가"
2. consistency에서 fixture 구조 이상 → "fixture 수동 확인" 플래그
3. openapi-gen에서 출력 토큰 초과 → 도메인 분할 후 재실행
