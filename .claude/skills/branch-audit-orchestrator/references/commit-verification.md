
# Commit Verification (4단계 프로토콜)

커밋이 타겟 브랜치에 반영됐는지 확인할 때, 단일 검증 방법에 의존하면 안 된다. 4단계를 반드시 거쳐야 한다. **4단계 모두 "없음"일 때만 "미반영"으로 판정.**

## 사전 준비: patch-id 인덱스 빌드

대량 커밋 비교 시 효율을 위해 타겟 브랜치의 patch-id 인덱스를 먼저 빌드한다.

```bash
git log <target> --no-merges --format="%H" | while read sha; do
  pid=$(git show $sha 2>/dev/null | git patch-id --stable 2>/dev/null | cut -d' ' -f1)
  echo "$pid $sha"
done > /tmp/v2-patch-index.txt
```

## 4단계 프로토콜

### 1단계: Ancestry (직접 포함)

```bash
git merge-base --is-ancestor <SHA> <target>
```

YES → "직접 포함". 같은 커밋이 target 히스토리에 존재.

### 2단계: Patch-ID (cherry-pick)

```bash
pid=$(git show <SHA> | git patch-id --stable | cut -d' ' -f1)
grep "^$pid " /tmp/v2-patch-index.txt
```

일치 → "cherry-pick". 해시는 다르지만 코드 변경이 동일.

### 3단계: 티켓 검색 (재적용)

```bash
git log <target> --oneline --no-merges --grep="<TICKET>"
```

같은 티켓의 커밋이 있으면 → 작성자/제목 비교.
- 같은 작성자 + 같은 제목 → "재적용" (base 차이로 patch-id 불일치)
- 다른 작성자 또는 다른 내용 → 관련 작업이지만 별도 구현

### 4단계: 파일 비교 (squash)

```bash
# 커밋이 변경한 파일 목록
files=$(git diff-tree --no-commit-id -r <SHA> --name-only)

# 타겟에서도 해당 파일이 변경됐는지
for f in $files; do
  git diff <base> <target> --name-only | grep "^${f}$"
done
```

파일이 타겟에서도 변경됐으면 → squash 후보 커밋과 파일 겹침 확인:

```bash
# squash 후보와 파일 겹침 계산
comm -12 <(echo "$files" | sort) <(git diff-tree --no-commit-id -r <squash_sha> --name-only | sort) | wc -l
```

## 반영 방식 분류

| 방식 | 판별 기준 | 표기 |
|------|----------|------|
| 직접 포함 | 1단계 YES | `직접 포함` |
| cherry-pick | 2단계 patch-id 동일 | `cherry-pick → <v2 SHA>` |
| 재적용 | 3단계 같은 티켓+작성자, patch-id 다름 | `재적용 → <v2 SHA>` |
| squash | 4단계 파일 겹침 + 대규모 커밋 | `squash → <squash SHA>` |
| 파일 반영 | 4단계 파일은 있으나 특정 커밋 미식별 | `파일 레벨 반영` |
| 미반영 | 4단계 모두 없음 | `미반영` |

## 출력 형식

커밋별 테이블: SHA | 티켓 | 작성자 | 내용 | 반영여부 | 반영경로
