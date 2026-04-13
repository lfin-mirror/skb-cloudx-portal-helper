
# Integration Strategy

커밋 검증 결과를 기반으로 통합 전략을 도출한다.

## 판정 기준

### Case 1: merge 불필요

고객사 브랜치가 v2 타겟의 **완전한 조상**인 경우.

```bash
git merge-base --is-ancestor <고객사> <v2타겟> && echo "조상 = merge 불필요"
```

이 경우 v2 타겟을 그대로 사용하면 된다.

```bash
git checkout -b release/<고객사>-<새버전> <v2타겟>
# 고객사 커스텀은 이미 포함. 추가 개발만 진행.
```

### Case 2: merge 필요 (충돌 없음)

고객사 전용 커밋이 존재하고, v2에 미반영된 경우.

```bash
# 충돌 사전 분석
git merge-tree --write-tree <고객사> <v2타겟>
# exit 0 = 충돌 없음
```

충돌 없으면:

```bash
git checkout -b release/<고객사>-<새버전> <v2타겟>
git merge <고객사>
```

### Case 3: merge 필요 (충돌 있음)

양쪽에서 같은 파일을 수정한 경우.

```bash
# 충돌 파일 식별
for f in $(git diff <base> <고객사> --name-only); do
  v2_changed=$(git diff <base> <v2타겟> --name-only | grep "^${f}$")
  [ -n "$v2_changed" ] && echo "CONFLICT RISK: $f"
done

# 변경량 비교
git diff <base> <고객사> -- "$f" | grep "^[+-]" | wc -l
git diff <base> <v2타겟> -- "$f" | grep "^[+-]" | wc -l
```

### Case 4: cherry-pick 선택적 적용

고객사 전용 커밋이 소수(5개 미만)이고, 나머지는 v2에 이미 있는 경우.

```bash
git checkout -b release/<고객사>-<새버전> <v2타겟>
git cherry-pick <commit1> <commit2> ...
```

## 전략 선택 플로차트

```
고객사가 v2의 완전한 조상인가?
├── YES → Case 1: merge 불필요
└── NO → 고객사 전용 커밋이 있는가?
    ├── 0건 → Case 1
    ├── 1~5건 → Case 4: cherry-pick
    └── 6건+ → 충돌 있는가?
        ├── NO → Case 2: clean merge
        └── YES → Case 3: conflict merge
```

## 출력 형식

- 판정 결과 (Case 번호)
- 충돌 파일 목록 (있는 경우)
- 실행 명령어
- 주의사항
