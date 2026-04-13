# Phase 1: 영향 분석 참고사항

## 컴포넌트 → 문서 매핑 방법

### frontmatter 필드로 검색

화면 문서에는 컴포넌트명이 frontmatter에 기록되어 있다:

```yaml
# admin-portal (SA/TA 공통 메뉴)
component_sa: VirtualPcAuthPolicySupadm.vue
component_ta: VirtualPcAuthPolicy.vue

# admin-portal (단일 컴포넌트)
component: HostList.vue

# user-portal
component: VPcReqList.vue
```

검색 명령:

```bash
# 특정 컴포넌트명으로 문서 찾기
grep -rl "VirtualPcAuthPolicy" docs/admin-portal/화면/

# 여러 컴포넌트 한번에
for f in Component1.vue Component2.vue; do
  echo "=== $f ===" && grep -rl "${f%.vue}" docs/
done
```

### API 경로로 검색

```bash
# API 명세에서 경로로 찾기
grep -rl "GET /v1/resource/vpcs" docs/*/api/

# 화면 문서의 api_endpoints로 찾기
grep -rl "/v1/resource/vpcs" docs/*/화면/
```

### menu_id로 검색

```bash
grep -rl "menu_id.*A0503" docs/
```

## 매핑 결과 분류

### 1:1 매핑 (가장 흔함)

변경된 컴포넌트가 정확히 하나의 화면 문서에 매핑.
→ 해당 문서 수정

### 1:N 매핑

하나의 컴포넌트가 여러 문서에서 참조 (공유 컴포넌트).
→ 모든 관련 문서 확인, 영향받는 문서만 수정

### 미매핑

변경된 파일이 어떤 문서에도 매핑되지 않음.

판단 기준:
- `src/views/` 하위: 화면 컴포넌트 → 신규 문서 생성 후보
- `src/components/` 하위: 공유 컴포넌트 → 사용하는 화면 문서에 반영
- `src/api/` 하위: API 호출 함수 → API 명세에 반영
- `src/store/` 하위: 상태 관리 → 보통 문서 영향 없음
- `src/lang/` 하위: 라벨 변경 → 화면 문서의 필드명 변경 가능

## BE 변경 → 문서 매핑

### Controller 변경

```
Controller 클래스 → @RequestMapping 어노테이션 → API 경로
API 경로 → docs/*/api/ 하위 명세서
```

```bash
# Controller에서 API 경로 추출
grep -n "@RequestMapping\|@GetMapping\|@PostMapping\|@PutMapping\|@DeleteMapping" \
  app-ms-resource/src/**/rest/ChangedController.java
```

### DTO 변경

```
DTO 클래스 → 필드 추가/삭제 → API 명세의 응답 필드 표
```

DTO 상속 체인 주의: `Detail extends List` 패턴이 빈번. 부모 클래스 필드까지 확인.

## 영향 분석 보고서 품질 체크

보고서 작성 후 자체 검증:
- [ ] 모든 변경 파일이 매핑 또는 미매핑으로 분류되었는지
- [ ] 미매핑 파일에 대한 판단(신규 문서/기존 문서 반영/무관)이 있는지
- [ ] API 경로 변경이 화면 문서의 `## API` 섹션에도 영향을 주는지 확인했는지
- [ ] i18n 키 변경이 화면 문서의 필드명 변경으로 이어지는지 확인했는지
