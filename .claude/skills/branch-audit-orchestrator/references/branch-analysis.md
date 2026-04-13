
# Branch Analysis

고객사 release 브랜치와 v2 메인 라인의 관계를 분석하는 스킬.

## 분석 순서

### 1. 대상 식별

```bash
# 고객사 브랜치 확인
git branch --all | grep -i "<고객사명>"
git tag -l "*<고객사명>*"

# v2 메인 라인 확인
git rev-parse remotes/origin/release/v2
git tag -l "2.2.*" | sort -V
```

### 2. 분기점 찾기

```bash
# merge-base로 공통 조상 찾기
git merge-base <고객사브랜치> <v2타겟>

# ancestry 방향 확인 (반드시 양방향 체크)
git merge-base --is-ancestor <A> <B> && echo "A→B" || echo "NOT"
git merge-base --is-ancestor <B> <A> && echo "B→A" || echo "NOT"
```

### 3. 브랜치 간 커밋 차이

```bash
# 고객사에만 있는 커밋
git log <고객사> --not <v2타겟> --oneline | wc -l

# v2에만 있는 커밋
git log <v2타겟> --not <고객사> --oneline | wc -l
```

### 4. 관련 브랜치 수집

```bash
# 같은 커밋을 가리키는 다른 이름
git branch --all --contains <SHA> | head -20
```

### 5. squash 커밋 후보 탐지

v2 메인에서 100+파일을 변경한 커밋을 찾는다. 이런 커밋은 다수의 개발 커밋을 squash한 것일 가능성이 높다.

```bash
git log <v2타겟> --not <base> --format="%H" --no-merges | while read sha; do
  count=$(git diff-tree --no-commit-id -r $sha --name-only | wc -l)
  [ $count -gt 50 ] && echo "$sha $count files"
done
```

## 출력 형식

트리 다이어그램 + 브랜치 요약 테이블 (SHA, 커밋 수, 성격, 기준 버전).
