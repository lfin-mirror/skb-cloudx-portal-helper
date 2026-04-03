# CloudX 실서버 OpenStack 버전 추정

plat-ms-vid4o 소스코드의 API 마이크로버전 설정에서 실서버 OpenStack 릴리스를 추정한 문서.
실서버에 직접 접근할 수 없으므로, 코드에 하드코딩된 마이크로버전이 유일한 단서.

> **추정**: 이 문서의 버전 추정은 코드 분석에 기반한 추측. 실서버 `/versions` 엔드포인트 확인 시 정확한 버전 파악 가능.

## 코드에서 확인된 API 마이크로버전

| 서비스 | API 버전 | 소스 파일 | 설정 |
|--------|---------|----------|------|
| Keystone (Identity) | v3 | `AuthProvider.java` | `OSFactory.builderV3()` 사용 |
| Nova (Compute) | v2.1, 마이크로버전 **2.53** | `Keyword.java:30` | `@Value("${openstack.nova.api.version:2.53}")` |
| Neutron (Network) | v2.0 | 전체 Network 서비스 | `OSClientV3` 경유, 별도 마이크로버전 없음 |
| Cinder (Volume) | v3, 마이크로버전 **3.68~3.69** | `AuthProvider.java:58-59` | `@Value("${openstack.cinder.api.version}")` |
| Glance (Image) | v2 | 전체 Image 서비스 | openstack4j 기본값 사용 |

### Cinder 마이크로버전 — 두 가지 값

| 소스 | 파일 | 값 | 용도 |
|------|------|-----|------|
| Helm 차트 (실서버 배포) | `charts3/files/application.yaml.tpl:68` | **3.68** (default) | 운영 환경 기본값 |
| 테스트 설정 | `application-test.properties:26` | **3.69** | 테스트 환경 |

## 마이크로버전 → OpenStack 릴리스 매핑

### Nova 2.53

- **도입 릴리스**: Pike (2017.08)
- **변경 내용**: 서비스/하이퍼바이저 ID를 정수 → UUID로 변경. 멀티 셀 환경에서 ID 충돌 방지
- **의미**: 실서버가 최소 Pike 이상이라는 하한선. 단독으로는 범위가 넓어 Cinder 버전이 더 유용한 지표
- [Nova API 마이크로버전 히스토리](https://docs.openstack.org/nova/latest/reference/api-microversion-history.html)

### Cinder 3.68

- **도입 릴리스**: Yoga (2022.03)
- **변경 내용**: `os-reimage` 볼륨 액션 추가. 기존 볼륨 내용을 Glance 이미지 데이터로 교체
- **의미**: Helm 차트 기본값이 3.68이므로 실서버는 **최소 Yoga 이상**
- [Yoga 릴리스 노트 (Cinder)](https://docs.openstack.org/releasenotes/cinder/yoga.html)

### Cinder 3.69

- **도입 릴리스**: Zed (2022.10)
- **변경 내용**: 볼륨 목록/상세 응답에 `consumes_quota` 필드 추가
- **의미**: 테스트 환경은 Zed 이상으로 구성
- [Zed 릴리스 노트 (Cinder)](https://docs.openstack.org/releasenotes/cinder/zed.html)

### 추정 결론

```
Nova 2.53 ─────────── Pike(2017) 이상
                         ↓ (하한만 제공, 범위 넓음)
Cinder 3.68 (실서버) ── Yoga(2022.1) 이상  ← 실서버 최소 버전
Cinder 3.69 (테스트) ── Zed(2022.2) 이상   ← 테스트 환경

실서버 추정 범위: Yoga(2022.1) ~ 2024.x
```

Cinder가 병목 기준. Nova는 Pike 이후 마이크로버전을 올리지 않았을 수 있어서 상한 추정에 부적합.

---

## OpenStack 릴리스 주기

6개월 주기로 릴리스. 매년 봄(x.1)과 가을(x.2) 두 번.

### 릴리스 프로세스

```
6개월 주기
├── Milestone 1 (M1)     ← 개발 시작 ~2개월 후
├── Milestone 2 (M2)     ← ~4개월 후
├── Milestone 3 (M3)     ← ~5개월 후, 기능 동결(Feature Freeze)
├── RC (Release Candidate) ← M3 후 ~1개월간 안정화
└── GA (General Availability) ← 최종 릴리스
```

- M3 이후 신규 기능 추가 중단, 버그 수정과 테스트에 집중
- `cycle-with-milestones`: Nova, Cinder 등 핵심 서비스가 따르는 모델
- `cycle-with-intermediary`: 일부 프로젝트는 주기 내 여러 번 릴리스

### 릴리스 네이밍

- 초기(2010~2022): 알파벳 순 코드명 (Austin → Zed)
- 2023~: `{연도}.{반기}` 형식 + 코드명 병기 (예: 2024.1 Caracal)

### 전체 릴리스 목록

| 코드명 | 버전 | 릴리스 | Nova 최대 MV | Cinder 최대 MV | 상태 |
|--------|------|--------|-------------|---------------|------|
| Austin | — | 2010-10 | — | — | EOL |
| Bexar | — | 2011-02 | — | — | EOL |
| Cactus | — | 2011-04 | — | — | EOL |
| Diablo | — | 2011-09 | — | — | EOL |
| Essex | — | 2012-04 | — | — | EOL |
| Folsom | — | 2012-09 | — | — | EOL |
| Grizzly | — | 2013-04 | — | — | EOL |
| Havana | — | 2013-10 | — | — | EOL |
| Icehouse | — | 2014-04 | — | — | EOL |
| Juno | — | 2014-10 | 2.1 | — | EOL |
| Kilo | — | 2015-04 | 2.3 | 3.0 | EOL |
| Liberty | — | 2015-10 | 2.12 | 3.8 | EOL |
| Mitaka | — | 2016-04 | 2.25 | 3.16 | EOL |
| Newton | — | 2016-10 | 2.38 | 3.27 | EOL |
| Ocata | — | 2017-02 | 2.42 | 3.30 | EOL |
| **Pike** | — | **2017-08** | **2.53** | 3.40 | EOL |
| Queens | — | 2018-02 | 2.60 | 3.43 | EOL |
| Rocky | — | 2018-08 | 2.65 | 3.50 | EOL |
| Stein | — | 2019-04 | 2.72 | 3.56 | EOL |
| Train | — | 2019-10 | 2.79 | 3.59 | EOL |
| Ussuri | — | 2020-05 | 2.87 | 3.62 | EOL |
| Victoria | — | 2020-10 | 2.88 | 3.63 | EOL |
| Wallaby | — | 2021-04 | 2.88 | 3.64 | EOL |
| Xena | — | 2021-10 | 2.90 | 3.66 | EOL |
| **Yoga** | — | **2022-03** | 2.90 | **3.68** | EOL |
| **Zed** | — | **2022-10** | 2.93 | **3.70** | EOL |
| Antelope | 2023.1 | 2023-03 | 2.95 | 3.70 | Maintained |
| Bobcat | 2023.2 | 2023-10 | 2.95 | 3.70 | Maintained |
| Caracal | 2024.1 | 2024-04 | 2.96 | 3.71 | Maintained |
| Dalmatian | 2024.2 | 2024-10 | 2.96 | 3.72 | Maintained |
| Epoxy | 2025.1 | 2025-04 | — | — | Maintained |
| Flamingo | 2025.2 | 2025-10 | — | — | Development |
| Gazpacho | 2026.1 | 2026-04 | — | — | Current |
| Hibiscus | 2026.2 | 2026-09 (예정) | — | — | 개발 중 |

### 지원 주기

- **Maintained**: 공식 보안/버그 수정 지원
- 일반적으로 릴리스 후 약 18개월간 지원
- SLURP(Skip Level Upgrade Release Process): 짝수 릴리스(x.2)는 한 단계 건너뛰기 업그레이드 지원

---

## 참고 링크

- [OpenStack 릴리스 공식 페이지](https://releases.openstack.org/)
- [Nova API 마이크로버전 히스토리](https://docs.openstack.org/nova/latest/reference/api-microversion-history.html)
- [Cinder API 마이크로버전 히스토리](https://docs.openstack.org/cinder/latest/contributor/api_microversion_history.html)
- [릴리스 주기 및 지원 버전 (Canonical)](https://canonical-openstack.readthedocs-hosted.com/en/latest/reference/release-cycle-and-supported-versions/)
- [릴리스 모델 설명](https://releases.openstack.org/reference/release_models.html)
