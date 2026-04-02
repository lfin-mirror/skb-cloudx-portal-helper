# CloudX VDI Platform — PRD

## 목적

OpenStack 기반 VDI(Virtual Desktop Infrastructure) 플랫폼.
기업 내 가상 PC 프로비저닝, 라이프사이클 관리, 모니터링을 단일 플랫폼에서 제공.

## 대상 사용자

| 역할 | 설명 | 포털 |
|------|------|------|
| SA (Super Admin) | 플랫폼 전체 인프라 운영자. 도메인/Zone/호스트/네트워크/스토리지 구성, 테넌트 생성, 정책 템플릿 정의 | admin-portal |
| TA (Tenant Admin) | 테넌트 단위 관리자. 가상 PC 풀/그룹 운영, 사용자 계정 관리, 테넌트 정책 설정 | admin-portal |
| 최종 사용자 | 가상 PC 이용자. PC 접속, 스냅샷, 디스크 관리, 장애 신청 | user-portal |

## 핵심 기능

### admin-portal — SA

| 대메뉴 | 기능 |
|--------|------|
| 대시보드 (A01) | 플랫폼 전체 모니터링/통계 |
| 모니터링 (A03) | 접속 현황, 자원 사용률 |
| 포털 (A04) | 관리자 UI 커스터마이징 (로고/배경/Footer) |
| 정책 (A05) | 인증/가상PC/백업 정책 템플릿 정의 |
| 서비스 (A06) | TLS/SSL 보안 인증서 관리 |
| 테넌트 (A08) | 테넌트 CRUD, 호스트 할당, 리소스 쿼터 |
| 템플릿 (A09) | Flavor + Image = 템플릿, 골든 이미지 |
| 시스템 자원 (A10) | 도메인/Zone/호스트/네트워크/스토리지/Proxy/이메일/HA |
| 통계 (A11) | 리포트/통계 |
| 관리자 (A12) | 관리자 계정, 시스템 설정, 메뉴-API-기능 RBAC |

### admin-portal — TA

| 대메뉴 | 기능 |
|--------|------|
| 대시보드 (T01) | 테넌트 범위 모니터링/통계 |
| 사용자 정보 (T02) | 사용자 그룹/계정 관리, 업무 요청, 단말 접속 |
| 사용자 지원 (T03) | 원격 제어, 업무 처리 요청, VOC |
| 포털 (T04) | user-portal UI 커스터마이징, 공지/FAQ/1:1문의/매뉴얼/팝업/설치파일 |
| 정책 (T05) | 테넌트별 정책 생성, SA 템플릿 복사(정책 가져오기) |
| 서비스 (T06) | 접근 통제, 외부 연동(AD/NAS/이메일/OCTATCO), Push 메시지 |
| 가상 PC (T07) | 그룹/풀/VM 관리, 접속 조회, 예약, 포트/IP |
| 테넌트 (T08) | 자기 테넌트 설정 수정 |
| 템플릿 (T09) | 템플릿 조회 (SA와 동일 컴포넌트, RBAC 제어) |
| 시스템 자원 (T10) | 자기 테넌트 범위 자원 조회, 가상 네트워크 CRUD |
| 통계 (T11) | 테넌트 범위 리포트/통계 |
| 관리자 (T12) | 관리자 계정, 권한 그룹 |
| 가상 디스크 | Cinder Volume 연결/분리/백업/복원 |

### user-portal — 최종 사용자

| 영역 | 기능 |
|------|------|
| 인증 | 로그인, 2차 인증(OCTATCO/모바일 생체), VPN 자동 로그인, 아이디 찾기/비밀번호 초기화 |
| Cloud PC 관리 | PC 목록/상태 조회, 전원 제어(ON/OFF/재부팅), 사용 기간 연장, Cloud PC 신청/반납/초기화 |
| 개인 디스크 | 개인 디스크 연결/분리/삭제, 디스크 추가 신청 |
| 스냅샷 | 스냅샷 생성/복원/삭제 |
| 단말 접속 | 6종 디바이스(Windows/Linux/Thin Client/MacOS/iOS/Android) 등록 요청 |
| 이용 내역 | 포털접속/제어/접속/신청반납/초기화/장애처리 이력 조회 |
| 고객지원 | 공지사항, FAQ, 1:1 문의, 매뉴얼, 클라이언트 다운로드, 장애처리 신청 |
| 모바일 | 모바일 앱(iOS/Android), 반응형 UI, MQTT 기반 생체 인증 |

## 기술 스택

| 계층 | 기술 |
|------|------|
| Frontend | Vue 2.5 + Vuex + Vue Router + Element UI + SCSS |
| Backend | Java 17, Spring Boot 2.7, Spring Cloud 2021.0.7, MyBatis, MapStruct |
| 데이터 | MariaDB, Redis |
| 인프라 | OpenStack (Nova, Neutron, Cinder, Glance, Keystone) |
| 통신 | REST (Axios ↔ Spring), OpenFeign (MS 간), MQTT (실시간 메시징) |
| 인증 | JWT (jjwt) |

## 포털 구조

```
admin-portal (SA/TA)          user-portal (최종 사용자)
        │                              │
        ▼                              ▼
   app-ms-resource ◄──────────► app-ms-operation
        │                              │
        └──────────┬───────────────────┘
                   ▼
            plat-ms-vid4o
                   │
                   ▼
    OpenStack (Nova / Neutron / Cinder / Glance / Keystone)
```

- **admin-portal** — SA와 TA가 같은 코드베이스를 공유. `isSuperAdmin` 분기로 권한별 UI 제어.
- **user-portal** — 멀티테넌트 라우트(`/:tenant`). vue-element-admin 보일러플레이트 기반.
- **app-ms-resource** — 가상 PC 리소스 프로비저닝/라이프사이클.
- **app-ms-operation** — 정책/운영 설정, 외부 연동(Netapp/Email/Octatco).
- **plat-ms-vid4o** — OpenStack API를 내부 REST API로 래핑하는 어댑터.

## 용어

플랫폼 공통 용어: `term/` 참고.
admin-portal 전용 용어: `admin-portal/term/` 참고.
user-portal 전용 용어: `user-portal/term/` 참고.
