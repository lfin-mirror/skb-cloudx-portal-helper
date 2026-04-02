---
name: api-spec-orchestrator
description: API 명세서를 백엔드 DTO와 대조하여 검증/수정하는 오케스트레이터. 'API 명세 검증', 'API 명세 수정', '명세서 DTO 대조', 'spec 리뷰' 요청 시 사용.
---

# API Spec Orchestrator

API 명세서(`docs/*/api/`)의 응답 필드 테이블을 백엔드 Spring Boot DTO/VO와 대조하여 불일치를 찾고 수정하는 2-Phase 파이프라인.

## 실행 모드

에이전트 팀 (TeamCreate). Phase별로 팀을 재구성한다.

## 도메인 슬라이스 (6개)

| # | 이름 | API 명세 (docs/ 기준) | 백엔드 패키지 |
|---|------|---------|-------------|
| 1 | resource-vpc | `admin-portal/api/resource/vpcs`, `admin-portal/api/resource/pools` | `app-ms-resource: rest/vpcs/**`, `rest/pool/**` |
| 2 | resource-infra | `admin-portal/api/resource/hosts`, `admin-portal/api/resource/networks`, `admin-portal/api/resource/templates`, `admin-portal/api/resource/security-group` | `app-ms-resource: rest/host`, `rest/zone`, `rest/network`, `rest/subnet`, `rest/router`, `rest/template`, `rest/golden` |
| 3 | resource-data | `admin-portal/api/resource/tenants`, `admin-portal/api/resource/volumes`, `admin-portal/api/resource/disk`, `admin-portal/api/resource/snapshot`, `admin-portal/api/resource/storage`, `admin-portal/api/resource/migration`, `admin-portal/api/resource/vm-authorization` | `app-ms-resource: rest/tenant`, `rest/volume`, `rest/localdisk`, `rest/snapshot`, `rest/nas`, `rest/storage`, `rest/migration`, `rest/evacuate`, `rest/authorization` |
| 4 | operation-policy | `admin-portal/api/operation/usb`, `admin-portal/api/operation/access-control`, `admin-portal/api/operation/backup`, `admin-portal/api/operation/blacklist`, `admin-portal/api/operation/power`, `admin-portal/api/operation/network`, `admin-portal/api/operation/vpc-security`, `admin-portal/api/operation/system` | `app-ms-operation: rest/policy/usb/**`, `rest/accblck`, `rest/bkupsnap`, `rest/swblst`, `rest/powermng`, `rest/nsecond`, `rest/vpc`, `rest/license` |
| 5 | operation-cert-ext | `admin-portal/api/operation/cert`, `admin-portal/api/operation/external`, `admin-portal/api/operation/excerpt-network`, `admin-portal/api/operation/url-redirection`, `admin-portal/api/operation/metadata` | `app-ms-operation: rest/scert`, `rest/external`, `rest/excnw`, `rest/url/rdrt`, `rest/vm/mdata` |
| 6 | user-portal | `user-portal/api/resource/*`, `user-portal/api/operation/*` | 동일 resource/operation MS |

## Phase 1: Review (조사)

1. `TeamCreate("api-spec-review")`
2. 6개 `TaskCreate` — 각 도메인 슬라이스에 대한 리뷰 작업
3. 6개 `api-spec-reviewer` 에이전트 스폰 (model: opus)
4. 각 에이전트: spec 파일 읽기 → Controller 매칭 → DTO 필드 추출 → 대조 → 보고서 작성
5. 보고서 위치: `_workspace/review-{slice-name}.md`
6. 전원 완료 후 팀 종료

### 에이전트 스폰 프롬프트 템플릿

```
당신은 api-spec-reviewer입니다.
.claude/agents/api-spec-reviewer.md의 원칙을 따릅니다.

할당된 도메인: {slice-name}
검증 대상 spec: {spec-files}
백엔드 소스: /Users/jay/skb/cloudx/{ms-name}/src/
패키지 범위: {packages}

보고서를 _workspace/review-{slice-name}.md에 작성하세요.
```

## Phase 1→2 게이트

보고서 6개를 사용자에게 보여주고, 수정 진행 여부를 확인받는다. 자동 진행하지 않는다.

## Phase 2: Fix (수정)

1. `TeamCreate("api-spec-fix")`
2. 6개 `TaskCreate` — 각 도메인의 리뷰 보고서 기반 수정 작업
3. 6개 `api-spec-fixer` 에이전트 스폰 (model: opus)
4. 각 에이전트: 보고서 읽기 → 명세 파일 수정 → 변경 요약 보고
5. 전원 완료 후 팀 종료

## 데이터 전달

| 구간 | 방식 |
|------|------|
| Phase 1 에이전트 → 보고서 | 파일 (`_workspace/review-*.md`) |
| Phase 1 → Phase 2 | 파일 (보고서를 Phase 2 에이전트가 읽음) |
| Phase 2 에이전트 → 결과 | 직접 파일 수정 + SendMessage 요약 |

## 에러 핸들링

- 에이전트 1개 실패: 해당 도메인만 재시도 (다른 도메인에 영향 없음)
- Controller 미발견: 보고서에 "미매핑"으로 기록, 수정 스킵
- Phase 1 보고서가 불완전: Phase 2에서 해당 항목 스킵, 보고

## 주의사항

- `app-ms-resource`, `app-ms-operation`만 로컬 존재. user/system/gw MS는 없으므로 해당 API는 스킵.
- DTO 상속 체인 추적 필수 (`Detail extends List`)
- `@JsonIgnore`/`@JsonIgnoreProperties` 제외 필드 확인
- MyBatis mapper XML에서만 정의된 필드는 별도 표기
- MapStruct 변환 확인 (operation MS)

## 테스트 시나리오

### 정상 흐름
1. Phase 1 실행 → 6개 보고서 생성
2. 사용자 확인 → Phase 2 진행
3. Phase 2 실행 → 명세 수정 완료
4. 커밋

### 에러 흐름
1. Phase 1에서 resource-vpc 에이전트가 DTO 추적 실패
2. 보고서에 "DTO 추적 불가" 항목 기록
3. Phase 2에서 해당 항목 스킵
4. 사용자에게 수동 확인 필요 항목 안내
