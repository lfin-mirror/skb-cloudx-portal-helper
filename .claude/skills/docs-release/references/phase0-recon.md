# Phase 0: Diff 추출 참고사항

## 레포 경로

```
/Users/jay/skb/cloudx/
├── admin-portal/          # Vue 2 + Element UI
├── user-portal/           # Vue 2 + Element UI
├── app-ms-resource/       # Spring Boot 2.7, 패키지: com.skb.cloud.microservice.resource
├── app-ms-operation/      # Spring Boot 2.7, 패키지: com.skb.cloud.microservice.operation
└── plat-ms-vid4o/         # Spring Boot 2.7, 패키지: com.skb.cloudpc.platform
```

각 디렉토리가 독립 git 저장소. 반드시 해당 디렉토리 안에서 git 명령 실행.

## 버전 태그 확인

```bash
# 태그 존재 확인
cd /Users/jay/skb/cloudx/{repo} && git tag -l '*2.2*'

# 태그 없으면 브랜치 확인
git branch -a | grep -i release

# 현재 체크아웃된 브랜치/태그
git log --oneline -1
```

## diff 추출 명령

### FE (admin-portal, user-portal)

```bash
# 커밋 로그
git log {old}..{new} --oneline --no-merges

# 변경 파일 (화면 관련만)
git diff {old}..{new} --name-only -- 'src/views/' 'src/components/'

# 변경 통계
git diff {old}..{new} --stat -- 'src/views/' 'src/components/'

# API 호출 변경 (axios 사용처)
git diff {old}..{new} --name-only -- 'src/api/'
```

주요 디렉토리 역할:
- `src/views/`: 페이지 컴포넌트 (화면 문서의 component 필드와 매핑)
- `src/components/`: 공유 컴포넌트
- `src/api/`: API 호출 함수 (어떤 API를 호출하는지 파악)
- `src/store/`: Vuex 상태 관리
- `src/lang/`: i18n 번역 키 (화면 라벨 변경 파악)

### BE (app-ms-resource, app-ms-operation)

```bash
# 커밋 로그
git log {old}..{new} --oneline --no-merges

# Controller 변경 (API 경로 변경)
git diff {old}..{new} --name-only -- '**/rest/**'

# DTO/VO 변경 (응답 필드 변경)
git diff {old}..{new} --name-only -- '**/dto/**' '**/vo/**'

# Service 변경 (로직 변경)
git diff {old}..{new} --name-only -- '**/service/**'

# MyBatis 매퍼 변경 (쿼리 변경)
git diff {old}..{new} --name-only -- '**/mapper/**' '**/*.xml'
```

패키지 구조:
- `rest/`: Controller (@RequestMapping → API 경로)
- `dto/`: 요청/응답 DTO (필드명이 API 명세의 필드)
- `vo/`: 내부 VO (DTO로 변환되어 응답)
- `service/`: 비즈니스 로직
- `mapper/`: MyBatis XML (DB 쿼리)

### plat-ms-vid4o

```bash
git log {old}..{new} --oneline --no-merges
git diff {old}..{new} --name-only -- '**/controller/**' '**/dto/**'
```

OpenStack 어댑터 레이어. API 변경이 있으면 resource/operation MS의 OpenStack 호출 방식에 영향.

## diff 없을 때

```bash
# 두 버전이 같은 커밋을 가리키는지 확인
git rev-parse {old}
git rev-parse {new}
# 같으면 "변경 없음"
```

## 대규모 diff 처리

50개 이상 파일이 변경된 경우:
1. `--stat`으로 변경량 파악
2. 디렉토리별 그루핑: `git diff --dirstat {old}..{new}`
3. 주요 변경 디렉토리만 우선 분석
