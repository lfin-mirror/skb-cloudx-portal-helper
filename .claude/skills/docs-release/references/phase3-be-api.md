# Phase 3: BE 기반 API 명세 보강 참고사항

## 목적

Phase 2에서 FE 소스(axios 호출) 기반으로 1차 작성된 API 명세를, BE 소스(Controller → DTO)로 보강한다. FE에서는 요청 파라미터와 API 경로를 파악하고, BE에서는 실제 응답 필드·타입·상속 체인을 확인.

## 대상 레포

| 영역 | 레포 | 패키지 |
|------|------|--------|
| resource-api | `app-ms-resource` | `com.skb.cloud.microservice.resource` |
| operation-api | `app-ms-operation` | `com.skb.cloud.microservice.operation` |

`plat-ms-vid4o`는 OpenStack 어댑터 레이어로 API 명세 대상이 아님. 단, resource/operation이 vid4o를 호출하는 경우 vid4o의 DTO를 참고.

## Controller → DTO 추적 방법

### 1. Controller에서 API 경로 확인

```java
@RestController
@RequestMapping("/v1/resource/policies/security-group")
public class SecurityGroupController {

    @GetMapping
    public ResponseEntity<?> list(SecurityGroupSearchReq req) { ... }

    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable String id) { ... }
}
```

추출 정보:
- HTTP 메서드 + 경로 → API 명세의 제목
- 요청 파라미터 (`@RequestParam`, `@RequestBody`, `@PathVariable`) → 요청 필드 표
- 반환 타입 → 응답 DTO 추적

### 2. 반환 DTO 필드 추출

```java
public class SecurityGroupVo {
    private String sg_grp_id;
    private String sg_grp_nm;
    private String tnt_id;
    // ...
}
```

주의사항:
- **상속 체인**: `DetailVo extends ListVo` 패턴 빈번. 부모 클래스 필드까지 포함
- **snake_case 유지**: Java DTO 필드가 이미 snake_case면 그대로
- **`@JsonIgnore`**: 응답에서 제외되는 필드. 명세에 넣지 않음
- **`@JsonIgnoreProperties`**: 클래스 레벨 제외 필드 확인
- **MapStruct**: VO → DTO 변환 시 필드명 변경 가능. `@Mapping` 어노테이션 확인

### 3. MyBatis Mapper 참고

```xml
<resultMap id="securityGroupMap" type="SecurityGroupVo">
    <result column="sg_grp_id" property="sg_grp_id"/>
    <result column="sg_grp_nm" property="sg_grp_nm"/>
</resultMap>
```

DB 컬럼명과 VO 필드명 매핑 확인. 특히 `<collection>`으로 중첩 구조가 있는 경우.

## API 명세 작성/보강 규칙

### 기존 명세 보강 (Phase 2에서 1차 작성된 경우)

Phase 2에서 작성된 API 명세를 Read한 뒤:
1. 응답 필드 표에 BE DTO 기반으로 누락 필드 추가
2. 필드 타입 정확도 향상 (string/number/boolean/array/object)
3. 중첩 구조(`data[].volumes[]`) 재귀적으로 보강

### 신규 명세 작성 (Phase 2에서 경로만 파악된 경우)

`.claude/rules/docs-api.md` 규칙을 따른다:

```markdown
## {API 동작 설명}

`{METHOD} /v1/{ms}/{feature}/{resource}`

### 요청

| 파라미터 | 위치 | 타입 | 필수 | 설명 |
|---------|------|------|------|------|

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
```

### 파일 위치

```
docs/{portal}/api/{ms}/{feature}/{nn}-{resource}.md
```

- 같은 리소스 CRUD는 한 파일에 작성
- 신규 API 파일 추가 시 `01-api-index.md` 인덱스에도 추가

## docs-sync 규칙 준수

API 명세 수정/추가 시 `.claude/rules/docs-sync.md` 규칙에 따라:
- 화면 문서의 `## API` 섹션 링크 업데이트
- `01-api-index.md` 인덱스 테이블 업데이트

## 출력

`_workspace/03_update-report-{영역}.md`:

```markdown
# API 명세 보강 보고서 — {영역}

## 보강된 명세
| 명세 파일 | 변경 내용 | 추가 필드 수 |
...

## 신규 생성 명세
| 명세 파일 | API 수 | 필드 수 |
...

## 스킵 (BE 소스 미존재)
| API 경로 | 사유 |
...
```

## 에러 핸들링

- Controller 미발견: "미매핑" 보고, 스킵
- DTO 추적 불가 (제네릭 반환 등): "추적 불가" 보고, Phase 3.5 dto-review에서 재시도
- MyBatis XML 미존재: DTO 필드만으로 작성
