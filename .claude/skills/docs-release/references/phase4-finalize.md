# Phase 3: 마무리 참고사항

## frontmatter 버전 업데이트

### 대상

Phase 2에서 실제로 수정된 문서만 버전 업데이트. `_workspace/02_update-report-*.md`에서 "수정된 문서" 목록을 추출한다.

### 변경 방법

```yaml
# before
version: v2.2.10

# after
version: v2.2.11
```

수정하지 않은 문서의 version은 그대로 유지.

### 일괄 확인

```bash
# 현재 v2.2.10인 문서 목록
grep -rl "version: v2.2.10" docs/
```

## 변경 이력 추가

### 형식

각 문서 하단 `## 변경 이력` 테이블에 행 추가:

```markdown
| v2.2.11 | 2026-04-13 | {변경 내용 요약} |
```

### 변경 내용 요약 작성 규칙

- 명사/단어로 끝냄 (동사 금지)
- 구체적으로 (예: "필드 3개 추가" O, "업데이트" X)
- 예시:
  - `워터마크 옵션 3개 추가 (위치, 크기, 투명도)`
  - `네이밍 정책 필드 추가 (vm_nm_policy)`
  - `SA/TA 분기 조건 변경 — TA에서도 편집 가능`
  - `API 경로 변경: /v1/resource/vpcs → /v1/resource/vpc-groups`

### 변경 이력 섹션 미존재 시

문서 맨 하단에 섹션 생성:

```markdown
## 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|----------|
| v2.2.11 | 2026-04-13 | {내용} |
```

## changelog 작성

### 파일 경로

`docs/changelog/v{new_version}.md`

### 기존 changelog 참고

`docs/changelog/v2.2.10.md`의 구조를 따른다.

### 필수 섹션

```markdown
# v{new} — {한 줄 요약}

날짜: {YYYY-MM-DD}

## 개요

{2~3문장 요약. 이번 릴리스의 핵심 변경사항}

## admin-portal 변경

### 화면 변경
| 메뉴 | 변경 내용 |
|------|----------|
| {메뉴명} | {구체적 변경} |

### API 변경
| API | 변경 내용 |
|-----|----------|
| {경로} | {구체적 변경} |

## user-portal 변경
(위와 동일 구조)

## 백엔드 변경

### app-ms-resource
- {변경 내용}

### app-ms-operation
- {변경 내용}

## 문서
- 수정: {N}개
- 신규: {N}개
```

### 변경 없는 섹션

해당 포털/MS에 변경이 없으면 섹션 자체를 생략. "변경 없음"이라고 적지 않음.

## OpenAPI 업데이트

### version 변경

```yaml
info:
  title: CloudX VDI Platform API
  version: v2.2.11
```

### API 필드 변경 반영

소규모 변경 (필드 2~3개): 직접 Edit으로 수정.

대규모 변경 (새 API 추가, schema 구조 변경):
- 직접 수정하지 않고 보고서에 기록:
  "OpenAPI 대규모 변경 — api-quality openapi-gen 모드 실행 권장"
- 사용자가 api-quality 스킬로 재생성하도록 안내

### OpenAPI 수정 시 주의

- YAML 문법: description 내 따옴표 이스케이프
- $ref 경로: components/schemas/ 하위 일관성
- example 필드: fixture 데이터 기반 (mock-server 규칙)

## 최종 보고서

`_workspace/03_finalize-report.md`:

```markdown
# 릴리스 마무리 보고서

## 버전 업데이트
- 수정 문서 {N}개 → v{new_version} 반영 완료

## 변경 이력
- {N}개 문서에 변경 이력 추가

## changelog
- docs/changelog/v{new_version}.md 생성

## OpenAPI
- info.version → v{new_version}
- API 변경 반영: {직접 수정 / openapi-gen 권장}

## 미완료 항목
- {수동 확인 필요 항목}
- {api-quality 실행 권장 항목}
```
