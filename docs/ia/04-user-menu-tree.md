# User Portal — 메뉴 트리

사용자 포털(user-portal)의 전체 화면 구조. 멀티테넌트 경로(`/:tenant/...`) 기반.

## 메뉴 트리

```
인증
├── 앱 초기화 → 로그인                                   → 문서 있음
├── 로그인 → 2차 인증 → 홈 진입                           → 문서 있음
├── 아이디 찾기 / 비밀번호 초기화 / AD 연동                 → 문서 있음
└── VPN 자동 로그인                                      → 문서 있음
│
Cloud PC (홈 화면)
├── 레이아웃 및 폴링                                     → 문서 있음
├── Cloud PC 상세 정보 및 상태                            → 문서 있음
├── 전원 제어                                            → 문서 있음
└── Cloud PC 기간 연장                                   → 문서 있음
│
Cloud PC 관리
├── Cloud PC 신청                                        → 문서 있음
├── 개인 디스크 관리                                      → 문서 있음
├── 이용 내역                                            → 문서 있음
├── 스냅샷 및 복원                                        → 문서 있음
├── Cloud PC 초기화                                      → 문서 있음
├── Cloud PC 반납                                        → 문서 있음
└── 단말 접속 관리                                        → 문서 있음
│
고객지원
├── 공지사항                                             → 문서 있음
├── 매뉴얼                                               → 문서 있음
├── 자주 묻는 질문 (FAQ)                                  → 문서 있음
├── 1:1 문의                                             → 문서 있음
├── 다운로드                                             → 문서 있음
└── 장애처리 신청                                         → 문서 있음
│
모바일
├── 모바일 앱 다운로드 및 접속                              → 문서 있음
├── 반응형 UI                                            → 문서 있음
└── MQTT 기반 모바일 생체 인증                             → 문서 있음
```

## 문서 링크

### 인증 (auth/)

| 화면/흐름 | 문서 |
|-----------|------|
| 앱 초기화 → 로그인 페이지 | [entry-to-login-flow](../user-portal/auth/01-entry-to-login-flow.md) |
| 로그인 → 2차 인증 → 홈 진입 | [login-to-home-flow](../user-portal/auth/02-login-to-home-flow.md) |
| 아이디 찾기 / 비밀번호 초기화 / AD 연동 | [account-recovery-and-ad](../user-portal/auth/03-account-recovery-and-ad.md) |
| VPN 자동 로그인 | [vpn-auto-login](../user-portal/auth/04-vpn-auto-login.md) |

### Cloud PC 홈 화면 (vpcinfo/home/)

| 화면 | 컴포넌트 | 문서 |
|------|----------|------|
| 레이아웃 및 폴링 | HomePage.vue | [layout-and-polling](../user-portal/vpcinfo/home/01-layout-and-polling.md) |
| Cloud PC 상세 정보 및 상태 | VpcInfo.vue | [vpc-info-and-status](../user-portal/vpcinfo/home/02-vpc-info-and-status.md) |
| 전원 제어 | VpcInfo.vue | [power-control](../user-portal/vpcinfo/home/03-power-control.md) |
| Cloud PC 기간 연장 | — | [period-extension](../user-portal/vpcinfo/home/04-period-extension.md) |

### Cloud PC 관리 (vpcinfo/)

| 화면 | 컴포넌트 | 문서 |
|------|----------|------|
| Cloud PC 신청 | VPcReq.vue | [vpc-req](../user-portal/vpcinfo/01-vpc-req.md) |
| 개인 디스크 관리 | PrsDskMng.vue | [prs-disk](../user-portal/vpcinfo/02-prs-disk.md) |
| 이용 내역 | UsageHistory.vue | [usage-history](../user-portal/vpcinfo/03-usage-history.md) |
| 스냅샷 및 복원 | SnapshotRecovery.vue | [snapshot](../user-portal/vpcinfo/04-snapshot.md) |
| Cloud PC 초기화 | SelfFailover.vue | [initialization](../user-portal/vpcinfo/05-initialization.md) |
| Cloud PC 반납 | VPcReturn.vue | [vpc-return](../user-portal/vpcinfo/06-vpc-return.md) |
| 단말 접속 관리 | DeviceAccMng.vue | [device-access](../user-portal/vpcinfo/07-device-access.md) |

### 고객지원 (support/)

| 화면 | 컴포넌트 | 문서 |
|------|----------|------|
| 공지사항 | NoticeList.vue | [notice](../user-portal/support/01-notice.md) |
| 매뉴얼 | Manual.vue | [manual](../user-portal/support/02-manual.md) |
| 자주 묻는 질문 (FAQ) | FaqPage.vue | [faq](../user-portal/support/03-faq.md) |
| 1:1 문의 | ContactList.vue | [contact](../user-portal/support/04-contact.md) |
| 다운로드 | FileDownload.vue | [file-download](../user-portal/support/05-file-download.md) |
| 장애처리 신청 | DisReqList.vue | [trouble-request](../user-portal/support/06-trouble-request.md) |

### 모바일 (mobile/)

| 화면/기능 | 문서 |
|-----------|------|
| 모바일 앱 다운로드 및 접속 | [mobile-app-and-connection](../user-portal/mobile/01-mobile-app-and-connection.md) |
| 반응형 UI | [responsive-ui](../user-portal/mobile/02-responsive-ui.md) |
| MQTT 기반 모바일 생체 인증 | [mqtt-mobile-biometric](../user-portal/mobile/03-mqtt-mobile-biometric.md) |
