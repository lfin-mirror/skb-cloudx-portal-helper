---
type: flow
title: VM 라이프사이클 유저플로우
status: stable
version: v2.2.9
portal: admin
screens:
  - A0901
  - A0902
  - A0903
  - T0901
  - T0902
  - T0903
  - T0701
  - T0702
  - T0503
  - T0505
  - T1004
  - T1005
related_docs:
  - ../admin-portal/화면/템플릿/01-템플릿.md
  - ../admin-portal/화면/가상 PC/01-가상 PC 그룹.md
  - ../admin-portal/화면/가상 PC/02-가상 PC.md
  - ../admin-portal/화면/가상 PC/04-가상 PC 예약.md
  - ../admin-portal/화면/정책/02-가상 PC 정책.md
  - ../admin-portal/화면/정책/03-백업 스냅샷 정책.md
  - ../admin-portal/화면/시스템 자원/03-네트워크.md
  - ../admin-portal/화면/시스템 자원/04-스토리지.md
  - ../user-portal/vpcinfo/home/01-layout-and-polling.md
  - ../user-portal/vpcinfo/01-vpc-req.md
  - ../user-portal/vpcinfo/04-snapshot.md
  - ../user-portal/vpcinfo/06-vpc-return.md
---

# VM 라이프사이클 유저플로우

VM이 생성되어 사용자에게 할당되고, 운영 후 반납/회수되기까지의 전체 흐름.

---

## 전체 라이프사이클

```
[1] 사전 준비 (인프라/SA)
  │  베이스 이미지 + Flavor + 템플릿
  ▼
[2] 그룹·풀 설계 (TA)
  │  템플릿 + 정책 + 네트워크 + 스토리지 조합
  ▼
[3] VM 생성 (TA)
  │  풀에서 VM 프로비저닝
  ▼
[4] 사용자 할당 (TA / 자동)
  │  전용: 수동 할당  |  공용: 풀 자동 배정
  ▼
[5] 사용자 접속 (user-portal)
  │  전원 ON → 뷰어 접속 → 업무 수행
  ▼
[6] 운영 (TA)
  │  모니터링, 백업/스냅샷, 장애 대응
  ▼
[7] 반납/회수 (사용자 or TA)
  │  사용자 반납 신청 or TA 직접 회수
  ▼
[8] VM 삭제/재활용
```

---

## [1] 사전 준비 — 템플릿 구성

VM의 하드웨어 스펙과 OS를 정의.

```
[인프라/SA] 베이스 이미지 등록 (A0903)
  │  OpenStack Glance에 OS 이미지 업로드
  │  또는 골든 이미지 생성 (기존 VM에서 추출)
  ▼
[SA/TA] 가상 PC 사양 생성 (A0902)
  │  CPU 코어, 메모리(MB), 디스크(GB), TPM
  │  → OpenStack Flavor로 동기화
  ▼
[SA/TA] 템플릿 생성 (A0901)
  │  Flavor + Image 조합
  │  = "Win10-Standard: 4코어/8GB/50GB"
```

| 단계 | 화면 | 생성 결과 |
|------|------|----------|
| 이미지 등록 | [베이스 이미지](../admin-portal/화면/템플릿/01-템플릿.md#베이스-이미지-a0903-t0903) (A0903) | Glance Image |
| 사양 생성 | [가상 PC 사양](../admin-portal/화면/템플릿/01-템플릿.md#가상-pc-사양-a0902-t0902) (A0902) | OpenStack Flavor |
| 템플릿 생성 | [템플릿](../admin-portal/화면/템플릿/01-템플릿.md#템플릿-a0901-t0901) (A0901) | Flavor + Image 조합 |

---

## [2] 그룹·풀 설계

템플릿에 정책·네트워크·스토리지를 결합하여 VM 프로비저닝 단위 구성.

```
[TA] 가상 PC 그룹 생성 (T0701)
  │  ├── 기본 템플릿 선택 (A0901에서 생성한 템플릿)
  │  ├── 네트워크 설정 (T1004에서 생성한 네트워크/서브넷)
  │  ├── 가상 PC 정책 선택 (T0503에서 생성한 정책)
  │  └── 백업/스냅샷 정책 선택 (T0505에서 생성한 정책)
  ▼
[TA] 풀 생성 (T0701 내 풀 상세)
  │  ├── Zone 선택 (VM 배치 영역)
  │  ├── 볼륨 타입 선택 (T1005에서 설정한 스토리지)
  │  ├── 전용/공용 PC 유형 선택
  │  ├── 전원 정책 / 초기화 정책 설정
  │  └── Pool 최대 VM 수 설정
```

| 설정 항목 | 참조 화면 | 설정 레벨 |
|-----------|----------|----------|
| 템플릿 | [템플릿](../admin-portal/화면/템플릿/01-템플릿.md) (T0901) | 그룹 |
| 네트워크 | [네트워크](../admin-portal/화면/시스템%20자원/03-네트워크.md) (T1004) | 그룹 |
| 가상 PC 정책 | [가상 PC 정책](../admin-portal/화면/정책/02-가상%20PC%20정책.md) (T0503) | 그룹 |
| 백업/스냅샷 정책 | [백업/스냅샷 정책](../admin-portal/화면/정책/03-백업%20스냅샷%20정책.md) (T0505) | 그룹 |
| Zone | [Zone](../admin-portal/화면/시스템%20자원/01-도메인-Zone.md) (T1002) | 풀 |
| 볼륨 타입 | [스토리지](../admin-portal/화면/시스템%20자원/04-스토리지.md) (T1005) | 풀 |
| 전용/공용 유형 | 풀 상세 폼 | 풀 |

---

## [3] VM 생성

풀에서 실제 VM을 프로비저닝.

```
[TA] 가상 PC 그룹 목록 (T0701)
  │  그룹 행의 "생성" 버튼 클릭
  │  → VM 수량 입력
  │  → OpenStack Nova에 VM 생성 요청
  ▼
VM 생성 완료
  │  템플릿 스펙(CPU/RAM/Disk)으로 생성
  │  지정된 Zone의 호스트에 배치
  │  지정된 서브넷에 IP 할당
  │  지정된 볼륨 타입으로 디스크 생성
```

예약 생성도 가능: [가상 PC 예약](../admin-portal/화면/가상%20PC/04-가상%20PC%20예약.md) (T0704)에서 시간 지정.

---

## [4] 사용자 할당

### 전용 PC (V001DED)

```
[TA] 가상 PC 목록 (T0702)
  │  또는 가상 PC 그룹 (T0701) 풀 expand → "할당" 버튼
  │  사용자 선택 → VM에 1:1 고정 할당
  ▼
사용자에게 VM 귀속
```

### 공용 PC (V001POO)

```
사용자가 user-portal에서 접속 요청
  ▼
풀에서 대기 중인 VM을 자동 배정
  │  접속 종료 시 VM 반환 → 풀로 복귀
  │  초기화 정책 적용 시 VM 초기화 후 재대기
```

### 자동 할당

```
[TA] 자동 할당 맵핑 (T0707)
  │  사용자 그룹 ↔ Pool 매핑 설정
  ▼
사용자가 Cloud PC 신청 (user-portal)
  │  POST /v1/resource/vpcs/resources/vm_auto_assign
  ▼
자동으로 매핑된 풀에서 VM 할당
```

---

## [5] 사용자 접속

```
[사용자] user-portal 홈 화면
  │  할당된 Cloud PC 목록 (캐러셀)
  │  PC 선택 → 상세 정보 표시
  ▼
[사용자] 전원 ON
  │  PUT /v1/resource/vpcs/resources/{id}/user (power on)
  ▼
[사용자] 접속 버튼 클릭
  │  뷰어 접속 URL 획득
  │  VDI 클라이언트로 VM 화면 표시
  ▼
VM 사용 중
  │  가상 PC 정책 적용 (클립보드, USB, 워터마크 등)
  │  인증 정책 적용 (세션 만료, 2차 인증 등)
```

| 단계 | 화면 |
|------|------|
| PC 목록 | [홈 화면](../user-portal/vpcinfo/home/01-layout-and-polling.md) |
| PC 상세 | [PC 상세](../user-portal/vpcinfo/home/02-vpc-info-and-status.md) |
| 전원 제어 | [전원 제어](../user-portal/vpcinfo/home/03-power-control.md) |

---

## [6] 운영

VM 사용 중 관리자가 수행하는 운영 작업.

```
[TA] 모니터링
  │  가상 PC (T0702) — VM 상태/전원/접속 현황
  │  가상 PC 접속 조회 (T0703) — 접속 이력
  │  사용자 모니터링 (T020601) — 사용자별 활동
  ▼
[시스템] 백업/스냅샷 자동 실행
  │  백업/스냅샷 정책(T0505)에 따라 스케줄 실행
  ▼
[사용자] 스냅샷 복구 요청
  │  user-portal → 스냅샷 목록에서 복구 선택
  ▼
[TA] 장애 대응
  │  원격 제어 (T0301) — VM에 원격 접속하여 조치
  │  업무 처리 요청 (T0302) — 장애 신고 처리
```

| 작업 | 화면 |
|------|------|
| VM 현황 | [가상 PC](../admin-portal/화면/가상%20PC/02-가상%20PC.md) (T0702) |
| 접속 이력 | [가상 PC 접속 조회](../admin-portal/화면/가상%20PC/03-가상%20PC%20접속%20조회.md) (T0703) |
| 스냅샷 복구 | [스냅샷](../user-portal/vpcinfo/04-snapshot.md) (user-portal) |
| 원격 제어 | [원격 제어](../admin-portal/화면/사용자%20지원/01-가상%20PC%20원격%20제어.md) (T0301) |

---

## [7] 반납/회수

### 사용자 반납

```
[사용자] user-portal → Cloud PC 반납
  │  POST /v1/user/work/request (J003RET)
  ▼
[TA] 업무 처리 요청 (T0302)
  │  반납 요청 승인
  ▼
VM 할당 해제
```

| 단계 | 화면 |
|------|------|
| 반납 신청 | [반납](../user-portal/vpcinfo/06-vpc-return.md) (user-portal) |
| 승인 처리 | [업무 처리 요청](../admin-portal/화면/사용자%20지원/02-업무%20처리%20요청.md) (T0302) |

### TA 직접 회수

```
[TA] 가상 PC (T0702)
  │  VM 선택 → 할당 해제 / 삭제
  ▼
VM 할당 해제 or 삭제
```

---

## [8] VM 삭제/재활용

```
할당 해제된 VM
  ├── 전용 PC: 다른 사용자에게 재할당 가능
  ├── 공용 PC: 풀로 자동 복귀 → 초기화 후 재사용
  └── 삭제: TA가 VM 삭제 → OpenStack에서 리소스 해제
```

---

## 전체 흐름 요약

```
[인프라/SA]  Image ─┐
                    ├─→ 템플릿 ──→ 그룹 ──→ 풀 ──→ VM 생성 ──→ 할당 ──→ 접속 ──→ 운영 ──→ 반납
[SA/TA]     Flavor ─┘        ↑        ↑        ↑
                           정책     Zone     볼륨타입
                          (T0503)  (T1002)   (T1005)
                          (T0505)
```

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|---------|
| v1.0 | 2026-04-02 | 최초 작성 |
