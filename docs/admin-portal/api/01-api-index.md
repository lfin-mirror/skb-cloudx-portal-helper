# Admin Portal API 인덱스

admin-portal이 호출하는 모든 API 목록.

## gw — 게이트웨이 인증

| 메서드 | 경로 | 설명 | 명세서 |
|--------|------|------|--------|
| POST | `/v1/gw/authentications/admin` | 1차 로그인 | [링크](gw/authentications/01-authentications.md) |
| POST | `/v1/gw/authentications/2nd_cert/{acctConnId}/{challengeId}/{code}` | 2차 인증 검증 | [링크](gw/authentications/01-authentications.md) |
| PUT | `/v1/gw/authentications/accounts/firstpassword` | 초기 비밀번호 변경 | [링크](gw/authentications/01-authentications.md) |

## nauth — 비인증 API

| 메서드 | 경로 | 설명 | 명세서 |
|--------|------|------|--------|
| POST | `/v1/nauth/auth/authentications/2nd_cert` | 2차 인증 코드 발송 | [링크](nauth/auth/01-authentications.md) |
| POST | `/v1/nauth/auth/authentications/accounts` | 아이디 찾기 | [링크](nauth/auth/01-authentications.md) |
| POST | `/v1/nauth/auth/authentications/temp/passwd` | 임시 비밀번호 발급 | [링크](nauth/auth/01-authentications.md) |
| GET | `/v1/nauth/system/portals/ui/{tntUrlId}/public` | 포털 UI 공개 조회 | [링크](nauth/system/01-nauth-system.md) |
| GET | `/v1/nauth/system/settings` | 키로깅 설정 조회 | [링크](nauth/system/01-nauth-system.md) |
| GET | `/v1/nauth/system/installer` | 키로깅 설치 파일 정보 | [링크](nauth/system/01-nauth-system.md) |

## auth — 인증된 사용자

| 메서드 | 경로 | 설명 | 명세서 |
|--------|------|------|--------|
| POST | `/v1/auth/authentications/` | 본인 확인 | [링크](auth/authentications/01-authentications.md) |
| PUT | `/v1/auth/authentications/accounts/password` | 비밀번호 변경 | [링크](auth/authentications/01-authentications.md) |

## authRemake — 권한 전환

| 메서드 | 경로 | 설명 | 명세서 |
|--------|------|------|--------|
| POST | `/v1/authRemake` | SA ↔ TA 권한 전환 | [링크](authRemake/01-authRemake.md) |

## logout

| 메서드 | 경로 | 설명 | 명세서 |
|--------|------|------|--------|
| GET | `/v1/logout` | 로그아웃 | [링크](logout/01-logout.md) |

## resource — 리소스 관리

| 메서드 그룹 | 설명 | 명세서 |
|-------------|------|--------|
| VPC 그룹/풀/VM/번들/배정/전원/포트/VNC | VPC 전체 관리 | [링크](resource/vpcs/01-vpcs.md) |
| 호스트 목록/상세, Zone, 대피(HA) | 호스트 관리 | [링크](resource/hosts/01-hosts.md) |
| 네트워크/서브넷/라우터/QoS/IP | 네트워크 관리 | [링크](resource/networks/01-networks.md) |
| 볼륨 타입/리소스, 디스크 QoS | 스토리지 관리 | [링크](resource/volumes/01-volumes.md) |
| 템플릿/골든이미지/플레이버/프록시/SW버전 | 템플릿 관리 | [링크](resource/templates/01-templates.md) |
| 스냅샷/백업 생성/복원/삭제 | 스냅샷/백업 | [링크](resource/snapshot/01-snapshot.md) |
| 영구 디스크 목록/삭제/분리 | 영구 디스크 | [링크](resource/disk/01-disk.md) |
| 테넌트/관리자/그룹/리소스/네트워크 배정 | 테넌트 리소스 | [링크](resource/tenants/01-tenants.md) |
| 보안 그룹/규칙/동기화/이력 | VM 인가 (보안 그룹) | [링크](resource/vm-authorization/01-vm-authorization.md) |
| 풀 IP/템플릿 이력/서브넷 배정/초기화 | 풀 관리 | [링크](resource/pools/01-pools.md) |
| 마이그레이션/대피 실행/이력 | 마이그레이션 | [링크](resource/migration/01-migration.md) |

## user — 사용자 관리

| 메서드 그룹 | 설명 | 명세서 |
|-------------|------|--------|
| 사용자 계정 CRUD, CSV, 비밀번호 초기화, 상태 변경 | 계정 관리 | [링크](user/accounts/01-accounts.md) |
| 사용자 그룹 CRUD, 트리, AD 체크 | 사용자 그룹 | [링크](user/usergroups/01-usergroups.md) |
| 관리자 그룹/메뉴/기능, 역할 초기화 | 관리자 그룹 | [링크](user/admin-groups/01-admin-groups.md) |
| 서비스 그룹 CRUD, 라이선스, 초기화 | 서비스 그룹 | [링크](user/servgroup/01-servgroup.md) |
| MAC/단말 식별자 CRUD, CSV, 이력 | 단말 접속 | [링크](user/device-access/01-device-access.md) |
| 업무 요청 CRUD | 업무 요청 | [링크](user/work/01-work.md) |
| 근태 설정, 긴급 사용 시간 | 근태 관리 | [링크](user/worktime/01-worktime.md) |

## operation — 운영/정책

| 메서드 그룹 | 설명 | 명세서 |
|-------------|------|--------|
| 2차 인증/보안/VPC 인증 정책 CRUD | 인증 정책 | [링크](operation/cert/01-cert.md) |
| USB 정책/유형/공급업체/모델 | USB 정책 | [링크](operation/usb/01-usb.md) |
| 백업 스냅샷 정책 CRUD | 백업 정책 | [링크](operation/backup/01-backup.md) |
| 접근 차단 정책 CRUD | 접근 차단 | [링크](operation/access-control/01-access-control.md) |
| SW 블랙리스트/화이트리스트 | 블랙리스트 | [링크](operation/blacklist/01-blacklist.md) |
| 네트워크 서브넷 정책 CRUD | 네트워크 정책 | [링크](operation/network/01-network.md) |
| 예외 네트워크 그룹 CRUD | 예외 네트워크 | [링크](operation/excerpt-network/01-excerpt-network.md) |
| URL 차단 정책 CRUD | URL Redirection | [링크](operation/url-redirection/01-url-redirection.md) |
| 전원 관리/재설정 정책 | 전원 관리 | [링크](operation/power/01-power.md) |
| VM 메타데이터 정책 CRUD | Metadata | [링크](operation/metadata/01-metadata.md) |
| VPC 보안 그룹 | VPC 보안 | [링크](operation/vpc-security/01-vpc-security.md) |
| 이메일/Netapp/AD/Octatco/라이선스/스토리지 스케줄 | 외부 연동 | [링크](operation/external/01-external.md) |

## system — 시스템 콘텐츠

| 메서드 그룹 | 설명 | 명세서 |
|-------------|------|--------|
| 공지사항 CRUD | 공지사항 | [링크](system/notices/01-notices.md) |
| FAQ CRUD | FAQ | [링크](system/faqs/01-faqs.md) |
| VOC/1:1 문의 CRUD | VOC | [링크](system/qnas/01-qnas.md) |
| 팝업 조회/수정/삭제 | 팝업 | [링크](system/popup/01-popup.md) |
| 포털 UI 설정 | 포털 UI | [링크](system/portals/01-portals-ui.md) |
| 가이드/매뉴얼/설치파일 CRUD | 가이드 | [링크](system/portals/02-portals-guides.md) |
| 다국어 조회/저장 | 다국어 | [링크](system/portals/03-portals-multilang.md) |
| 메뉴 개선사항 | 개선사항 | [링크](system/portals/04-portals-improves.md) |
| 메뉴/API/기능권한 관리 | 메뉴 관리 | [링크](system/menu/01-menu.md) |
| 공통 코드 그룹별 조회 | 공통 코드 | [링크](system/commons/01-codes.md) |
| VOC 상담 목록 조회 | VOC 상담 | [링크](system/voc/01-voc.md) |

## monitoring — 모니터링/통계

| 메서드 그룹 | 설명 | 명세서 |
|-------------|------|--------|
| 알람 설정 CRUD, 수신 대상 | 알람 설정 | [링크](monitoring/alarm/01-alarm.md) |
| 알람 발생 이력 | 알람 이력 | [링크](monitoring/alarm/02-alarm-histories.md) |
| 수신 그룹 CRUD | 수신 그룹 | [링크](monitoring/alarm/03-receive-group.md) |
| 임계치 CRUD, 수신 이력 | 임계치 | [링크](monitoring/alarm/04-receive-threshold.md) |
| 관리자/사용자 감사로그 | 감사로그 | [링크](monitoring/audit/01-audit.md) |
| 대시보드 (VPC/서버/스토리지/Pod/알람) | 대시보드 | [링크](monitoring/dashboard/01-dashboard.md) |
| 구버전 위젯 대시보드 | 위젯 대시보드 | [링크](monitoring/dashboard/02-user-widget.md) |
| 로그/접속/사용자수/사용시간/오류 통계 | 로그 통계 | [링크](monitoring/statistics/01-log-statistics.md) |
| VPC 배정/사용/동시접속/미접속 통계 | VPC 통계 | [링크](monitoring/statistics/02-vpc-statistics.md) |
| 서비스/브라우저/업무처리/이메일SMS/월간리포트 | 서비스 통계 | [링크](monitoring/statistics/03-service-statistics.md) |
| 품질/호스트/스토리지 통계 | 품질/인프라 통계 | [링크](monitoring/statistics/04-quality-host-storage-statistics.md) |

---

## 역할별 파라미터 코드 대조표

| 정책 유형 | SA 코드 | TA 코드 |
|---------|--------|--------|
| USB 정책 대상 | `U006S` | `U006T` |
| 백업스냅샷 정책 대상 | `U023S` | `U023T` |
| 인증 정책 대상 (관리자/사용자) | `U003S` | `U003B` |
| 가상PC 보안 정책 대상 | `U006S` | (필터링으로 제거) |
| 관리자 포털 타입 | `A007ADM` | `A007ADM` (동일) |
| 사용자 포털 타입 | `A007USR` | `A007USR` (동일) |
