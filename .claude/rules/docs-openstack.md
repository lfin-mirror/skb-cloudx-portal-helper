---
globs: docs/admin-portal/openstack/**/*.md, docs/term/02-vdi-infra-terms.md
---

# OpenStack / VDI 지식 문서 규칙

## 목적

특정 MS 구현이 아닌 OpenStack/VDI 일반 지식 정리. admin-portal 화면 문서를 이해하기 위한 배경 지식 제공.

## 읽기 가이드

- 각 하위 폴더(`시스템 자원/`, `정책/`)에 `00-읽기-가이드.md` 배치.
- 읽기 가이드에 포함할 내용: 문서 ↔ 메뉴 매핑 테이블, 추천 읽기 순서, 사전 지식 링크, 한 줄 요약.

## 화면 문서와의 관계

- openstack/ 문서 = "왜 이런 설정이 있는지" (개념/원리)
- SA/, TA/ 문서 = "UI에 뭐가 있고 어떻게 동작하는지" (화면/필드)
- 내용이 겹치면 openstack/에 개념을 두고 SA/TA 문서에서 링크.

## 추측 내용 표기

- 코드로 검증되지 않은 추측은 반드시 **'추측'** 이라고 명시.
- 코드 검증 후 확인된 내용은 추측 표기 제거.

## 데이터 소스 표기

- API 정리 시 데이터 소스(로컬 DB / OpenStack 실시간 / DB+OpenStack) 명시.
- 목록 조회가 로컬 DB인지 OpenStack 직접 조회인지 구분 중요.
