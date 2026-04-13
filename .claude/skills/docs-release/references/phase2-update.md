# Phase 2: 문서 업데이트 참고사항

## 기존 규칙 파일 참조

문서 수정 시 아래 규칙 파일을 반드시 읽고 따른다:

| 규칙 | 경로 | 적용 시점 |
|------|------|----------|
| 문서 작성 공통 | `.claude/rules/docs-writing.md` | 모든 문서 수정 |
| 화면 문서 | `.claude/rules/docs-sa-ta.md` | admin-portal 화면 문서 |
| API 명세 | `.claude/rules/docs-api.md` | API 명세 수정 |
| Docs 동기화 | `.claude/rules/docs-sync.md` | API 명세 변경 시 화면 문서 링크 동기화 |
| OpenStack | `.claude/rules/docs-openstack.md` | OpenStack 관련 배경 지식 문서 |

## 화면 문서 업데이트 패턴

### 필드 추가

소스코드에서 새 필드를 확인하는 방법:

```vue
<!-- 테이블 컬럼 추가 -->
<el-table-column prop="new_field" :label="$t('...')">

<!-- 폼 필드 추가 -->
<el-form-item :label="$t('...')">
  <el-input v-model="form.new_field" />
</el-form-item>
```

문서에 반영:
- 테이블 컬럼 표에 행 추가
- 설정 항목 표에 행 추가
- 필드명: 화면 라벨(`$t()` 값) + 괄호 안에 코드 필드명

### SA/TA 분기 변경

```vue
<!-- SA 전용 -->
<div v-if="isSuperAdmin">...</div>

<!-- TA에서 disabled -->
<el-input :disabled="!isSuperAdmin" />

<!-- TA 전용 -->
<div v-if="!isSuperAdmin">...</div>
```

SA/TA 차이 4컬럼 표 업데이트:
`항목 | 세부 항목 | SA | TA`

### 버튼/모달 변경

```vue
<el-button @click="handleCreate">{{ $t('등록') }}</el-button>
```

문서에 반영:
- 버튼 클릭 시 동작 (API 호출, 모달 표시, 확인 팝업)
- disabled/노출 조건

## API 명세 업데이트 패턴

### 응답 필드 변경

1. Controller에서 반환 DTO 확인
2. DTO 클래스 필드 목록 추출 (상속 포함)
3. 명세서의 응답 필드 표와 비교
4. 추가/삭제된 필드 반영

### 새 API 추가

```markdown
## {API 동작 설명}

`{METHOD} /v1/{ms}/{feature}/{resource}`

### 요청

| 파라미터 | 타입 | 필수 | 설명 |
...

### 응답

| 필드 | 타입 | 설명 |
...
```

### docs-sync 규칙

API 명세 수정 시:
- 화면 문서의 `## API` 섹션에서 링크/경로가 변경되었으면 업데이트
- 새 API 추가 시 `01-api-index.md` 인덱스에도 추가
- 화면 문서에는 필드 상세를 쓰지 않음 (API 명세 링크만)

## 신규 문서 생성

### 화면 문서 frontmatter 템플릿

```yaml
---
type: screen
menu_id: [{SA메뉴ID}, {TA메뉴ID}]
title: {메뉴 이름}
status: stable
version: v{new_version}
portal: admin
path: /{라우트 경로}
component_sa: {SA 컴포넌트}.vue
component_ta: {TA 컴포넌트}.vue
access: [SA, TA]
api_endpoints:
  - GET /v1/{ms}/{feature}
---
```

### 파일명 규칙

- 기존 폴더의 넘버링 다음 번호 사용
- 한글 파일명 (메뉴 이름 기준)
- 예: `09-새로운 메뉴.md`

## 문체 체크리스트

- [ ] 문장이 동사로 끝나지 않고 명사/단어로 끝나는지
- [ ] 표 셀도 명사/단어로 끝나는지
- [ ] 필드명이 화면 라벨 + (코드 필드명) 형식인지
- [ ] "다양한", "활용하다", "중요합니다" 등 AI 트로프를 사용하지 않았는지
