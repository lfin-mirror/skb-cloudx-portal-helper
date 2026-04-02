---
type: flow
title: admin-portal / user-portal 간 연결 유저플로우
status: stable
version: v2.2.9
portal: admin
screens:
  - T0701
  - T0702
  - T0301
  - T0302
  - T0203
  - T0202
related_docs:
  - ../admin-portal/화면/가상 PC/01-가상 PC 그룹.md
  - ../admin-portal/화면/가상 PC/02-가상 PC.md
  - ../admin-portal/화면/사용자 지원/01-가상 PC 원격 제어.md
  - ../admin-portal/화면/사용자 지원/02-업무 처리 요청.md
  - ../admin-portal/화면/사용자 정보/03-업무요청-단말접속-사용자모니터링.md
  - ../user-portal/vpcinfo/01-vpc-req.md
  - ../user-portal/vpcinfo/home/01-layout-and-polling.md
  - ../user-portal/support/06-trouble-request.md
---

# admin-portal / user-portal 간 연결 유저플로우

admin-portal(관리자)과 user-portal(사용자) 사이에서 데이터가 오가는 3가지 핵심 시나리오.

---

## 1. VM 할당 → 사용자 접속

TA가 VM을 생성·할당하면, 사용자가 user-portal에서 접속.

```
admin-portal (TA)                              user-portal (사용자)
─────────────────                              ─────────────────────

[가상 PC 그룹] (T0701)
  │  템플릿·정책·네트워크 설정
  │  풀 생성 → VM 생성
  ▼
[가상 PC] (T0702)
  │  VM 목록에서 사용자 할당
  │  (수동 할당 or 자동 할당)
  ▼
                        ── DB 반영 ──→
                                               [홈 화면]
                                                 │  할당된 Cloud PC 목록 표시
                                                 │  (GET /v1/resource/vm-authorization)
                                                 ▼
                                               [PC 상세 + 접속 버튼]
                                                 │  전원 ON → 뷰어 접속
                                                 ▼
                                               VM 사용 중
```

| 단계 | 포털 | 화면 | 비고 |
|------|------|------|------|
| 그룹·풀 생성 | admin | [가상 PC 그룹](../admin-portal/화면/가상%20PC/01-가상%20PC%20그룹.md) (T0701) | 템플릿·정책·네트워크 조합 |
| VM 생성·할당 | admin | [가상 PC](../admin-portal/화면/가상%20PC/02-가상%20PC.md) (T0702) | 사용자에게 VM 배정 |
| PC 목록 확인 | user | [홈 화면](../user-portal/vpcinfo/home/01-layout-and-polling.md) | 할당된 PC 캐러셀 |
| PC 상세·접속 | user | [PC 상세](../user-portal/vpcinfo/home/02-vpc-info-and-status.md) | 전원 제어 + 뷰어 접속 |

### 자동 할당 경로 (사용자 주도)

사용자가 직접 Cloud PC를 신청하는 경로도 존재.

```
user-portal                                    admin-portal (TA)
───────────                                    ─────────────────

[Cloud PC 신청]
  │  개인전용PC / 공용PC 선택
  │  POST /v1/user/work/request
  ▼
                        ── 업무 요청 생성 ──→
                                               [업무 처리 요청] (T0302)
                                                 │  요청 유형: 자원 할당 (J003USE)
                                                 │  승인 처리
                                                 ▼
                        ←── VM 할당 완료 ───
[홈 화면]
  │  할당된 PC 표시
  ▼
접속
```

| 단계 | 포털 | 화면 |
|------|------|------|
| PC 신청 | user | [Cloud PC 신청](../user-portal/vpcinfo/01-vpc-req.md) |
| 요청 접수·승인 | admin | [업무 처리 요청](../admin-portal/화면/사용자%20지원/02-업무%20처리%20요청.md) (T0302) |
| 할당 확인 | user | [홈 화면](../user-portal/vpcinfo/home/01-layout-and-polling.md) |

---

## 2. 사용자 업무 요청 → TA 처리

user-portal에서 사용자가 다양한 유형의 요청을 신청하면, admin-portal에서 TA가 처리.

```
user-portal (사용자)                           admin-portal (TA)
─────────────────────                          ─────────────────

[Cloud PC 신청]            ─ J003USE ─→
[기간 연장 신청]           ─ J003EXT ─→       [업무 요청] (T0203)
[반납 신청]                ─ J003RET ─→         읽기 전용 조회
[보안 정책 변경 요청]      ─ J003SEC ─→
[자원 변경 요청]           ─ J003CHG ─→              │
[장애처리 신청]            ─ J003ERR ─→              ▼
[개인디스크 신청]          ─ J003DAR ─→
                                               [업무 처리 요청] (T0302)
                                                 │  상세 확인
                                                 │  승인 / 반려
                                                 ▼
                        ←── 결과 반영 ───
[신청 내역 조회]
  상태: 승인 / 반려 / 취소
```

| 요청 유형 | 코드 | user-portal 화면 | admin-portal 화면 |
|-----------|------|-----------------|------------------|
| 자원 할당 | `J003USE` | [Cloud PC 신청](../user-portal/vpcinfo/01-vpc-req.md) | [업무 처리 요청](../admin-portal/화면/사용자%20지원/02-업무%20처리%20요청.md) (T0302) |
| 기간 연장 | `J003EXT` | [기간 연장](../user-portal/vpcinfo/home/04-period-extension.md) | T0302 |
| 반납 | `J003RET` | [반납](../user-portal/vpcinfo/06-vpc-return.md) | T0302 |
| 장애 처리 | `J003ERR` | [장애처리 신청](../user-portal/support/06-trouble-request.md) | T0302 |
| 개인디스크 | `J003DAR` | [개인디스크](../user-portal/vpcinfo/02-prs-disk.md) | T0302 |
| 보안 정책 변경 | `J003SEC` | (보안 정책 변경 폼) | T0302 |
| 자원 변경 | `J003CHG` | (자원 변경 폼) | T0302 |

### 두 화면의 역할 차이

- **업무 요청** (T0203, 사용자 정보 하위): 읽기 전용 조회. 요청 현황 파악 목적.
- **업무 처리 요청** (T0302, 사용자 지원 하위): 실제 승인/반려 처리. VM 할당, 정책 변경 등 후속 작업 수행.

---

## 3. 사용자 장애 신고 → TA 원격 제어

사용자가 장애를 신고하면, TA가 원격 접속으로 문제를 해결.

```
user-portal (사용자)                           admin-portal (TA)
─────────────────────                          ─────────────────

[장애처리 신청]
  │  Cloud PC 선택
  │  장애 유형 태그 선택
  │  (PC 장애 / 프로그램 오류 / 기타)
  │  메모 작성
  │  POST /v1/user/work/request
  ▼
                        ── J003ERR 요청 ──→
                                               [업무 처리 요청] (T0302)
                                                 │  장애 요청 확인
                                                 │  승인 처리
                                                 ▼
                                               [가상 PC 원격 제어] (T0301)
                                                 │  VM 목록에서 대상 PC 선택
                                                 │  원격 접속 요청
                                                 │  POST /sm/v1/cloudpc/vpcs/{vmId}/remote/request
                                                 ▼
                        ←── 원격 접속 알림 ───
                                               TA가 사용자 VM에 원격 접속
[사용자 화면에서 원격                            │  장애 원인 분석 + 조치
 접속 중 표시]                                   ▼
                                               처리 완료 → 결과 기록
                        ←── 처리 결과 ───
[신청 내역에서 결과 확인]
```

| 단계 | 포털 | 화면 | API |
|------|------|------|-----|
| 장애 신고 | user | [장애처리 신청](../user-portal/support/06-trouble-request.md) | `POST /v1/user/work/request` |
| 요청 접수 | admin | [업무 처리 요청](../admin-portal/화면/사용자%20지원/02-업무%20처리%20요청.md) (T0302) | `GET /v1/user/work/request` |
| 원격 접속 | admin | [가상 PC 원격 제어](../admin-portal/화면/사용자%20지원/01-가상%20PC%20원격%20제어.md) (T0301) | `POST /sm/v1/cloudpc/vpcs/{vmId}/remote/request` |
| 결과 확인 | user | [장애처리 신청](../user-portal/support/06-trouble-request.md) (목록) | `GET /v1/user/work/request` |

---

## 포털 간 데이터 공유 구조

두 포털은 동일한 백엔드 API(app-ms-resource, app-ms-operation)를 공유. DB가 중간 매개.

```
user-portal ──→ app-ms-resource ──→ MariaDB ←── app-ms-resource ←── admin-portal
                app-ms-operation                 app-ms-operation
```

- 사용자가 신청(`POST /v1/user/work/request`) → DB에 저장
- TA가 조회(`GET /v1/user/work/request`) → 동일 테이블에서 읽기
- TA가 처리(승인/반려) → DB 상태 업데이트
- 사용자가 결과 확인 → 동일 테이블의 상태 코드 변경 감지

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|---------|
| v1.0 | 2026-04-02 | 최초 작성 |
