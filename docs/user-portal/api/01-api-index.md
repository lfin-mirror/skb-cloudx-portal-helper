# User Portal API 인덱스

user-portal이 호출하는 모든 API 목록. 기준: v2.2.9 / 2026-03-25

## 범례

- **MS**: API 경로의 `/api/v1/{ms}/` 부분. 실제 백엔드 마이크로서비스와 1:1 대응하지 않을 수 있음
- **인증**: `nauth` = 토큰 불필요, `gw`/`auth`/나머지 = JWT 필요
- **명세서**: 해당 API의 상세 문서 링크

## gw — API Gateway 인증

| 메서드 | 경로 | 설명 | 호출 위치 | 명세서 |
|--------|------|------|-----------|--------|
| POST | `/v1/gw/authentications/` | 로그인 (1차 인증) | Login.vue | [링크](gw/authentications/01-authentications.md) |
| POST | `/v1/gw/authentications/2nd_cert/{tenant}/{acctConnId}/{challengeId}/{certNo}` | 2차 인증 검증 (SMS/Email) | CertificationSMS.vue | [링크](gw/authentications/01-authentications.md) |
| POST | `/v1/gw/authentications/2nd_cert/{tntUrlId}/{acctConnId}/{challengeId}/{otpNo}/totp` | 2차 인증 검증 (OTP) | CertificationOTP.vue | [링크](gw/authentications/01-authentications.md) |

## nauth — 비인증 API

### nauth/auth — 인증 보조

| 메서드 | 경로 | 설명 | 호출 위치 | 명세서 |
|--------|------|------|-----------|--------|
| POST | `/v1/nauth/auth/authentications/2nd_cert` | 2차 인증 요청 (인증번호 발송) | CertificationSMS.vue, login/index.vue | [링크](nauth/auth/01-authentications.md) |
| POST | `/v1/nauth/auth/authentications/accounts` | 아이디 찾기 | FindUserId.vue | [링크](nauth/auth/01-authentications.md) |
| POST | `/v1/nauth/auth/authentications/temp/passwd` | 임시 비밀번호 발급 | FindUserPwd.vue | [링크](nauth/auth/01-authentications.md) |

### nauth/user — 테넌트/외부인증

| 메서드 | 경로 | 설명 | 호출 위치 | 명세서 |
|--------|------|------|-----------|--------|
| GET | `/v1/nauth/user/tenant/exist` | 테넌트 존재 여부 확인 | permission.js | [링크](nauth/user/01-tenant.md) |
| GET | `/v1/nauth/user/tntMain` | 기본 테넌트 조회 | permission.js | [링크](nauth/user/01-tenant.md) |
| POST | `/v1/nauth/user/auth/check` | VPN 자동 로그인 검증 | VpnLoginCheck.vue | [링크](nauth/user/02-vpn.md) |
| GET | `/v1/nauth/user/external/octatco/idcheck/{tntUrlId}` | Octatco ID 확인 | OctatcoLogin.vue | [링크](nauth/user/03-octatco.md) |
| POST | `/v1/nauth/user/external/octatco/reqToken/{tntUrlId}` | Octatco 인증 토큰 요청 | SecondCert.vue, MobileMetricCert.vue, PCMetricCert.vue | [링크](nauth/user/03-octatco.md) |
| POST | `/v1/nauth/user/external/octatco/userLogin/{tntUrlId}` | Octatco 로그인 검증 | SecondCert.vue, MobileMetricCert.vue, PCMetricCert.vue | [링크](nauth/user/03-octatco.md) |
| GET | `/v1/nauth/user/external/octatco/loginCheck/{tntUrlId}/{serial}` | Octatco 모바일 로그인 확인 | MobileMetricCert.vue | [링크](nauth/user/03-octatco.md) |

### nauth/system — 공개 시스템 정보

| 메서드 | 경로 | 설명 | 호출 위치 | 명세서 |
|--------|------|------|-----------|--------|
| GET | `/v1/nauth/system/installer` | 설치 프로그램 정보 | permission.js | [링크](nauth/system/01-system-public.md) |
| GET | `/v1/nauth/system/notices/public` | 로그인 화면 공지 | login/index.vue | [링크](nauth/system/01-system-public.md) |
| GET | `/v1/nauth/system/popup` | 로그인 팝업 메시지 | login/index.vue | [링크](nauth/system/01-system-public.md) |
| GET | `/v1/nauth/system/portals/ui/{tntUrlId}/public` | 포털 UI 설정 (배경, 로고 등) | login/index.vue, store/app.js | [링크](nauth/system/01-system-public.md) |
| GET | `/v1/nauth/system/{tntUrlId}/getToday` | 서버 현재 시각 | VPcReq.vue, VpcInfo.vue | [링크](nauth/system/01-system-public.md) |

## auth — 인증된 사용자 인증 관리

| 메서드 | 경로 | 설명 | 호출 위치 | 명세서 |
|--------|------|------|-----------|--------|
| POST | `/v1/auth/authentications/` | 비밀번호 확인 | CheckPW.vue | [링크](auth/authentications/01-authentications.md) |
| PUT | `/v1/auth/authentications/accounts/firstpassword` | 최초 비밀번호 변경 | PasswordChange.vue | [링크](auth/authentications/01-authentications.md) |
| PUT | `/v1/auth/authentications/accounts/password` | 비밀번호 변경 | ChangePw.vue | [링크](auth/authentications/01-authentications.md) |
| GET | `/v1/logout` | 로그아웃 | store/user.js | [링크](auth/authentications/01-authentications.md) |

## resource — 리소스 관리

### resource/vpcs — Cloud PC

| 메서드 | 경로 | 설명 | 호출 위치 | 명세서 |
|--------|------|------|-----------|--------|
| GET | `/v1/resource/vpcs/resources` | VPC 목록 조회 | SnapshotRecovery.vue, VPcReqList.vue, SelfFailover.vue 외 | [링크](resource/vpcs/01-vpcs-resources.md) |
| GET | `/v1/resource/vpcs/resources/{vmAuthId}` | VPC 단건 조회 | SnapshotRecovery.vue | [링크](resource/vpcs/01-vpcs-resources.md) |
| POST | `/v1/resource/vpcs/resources/{vmAuthId}/start` | 전원 ON | VpcInfo.vue | [링크](resource/vpcs/01-vpcs-resources.md) |
| POST | `/v1/resource/vpcs/resources/{vmAuthId}/stop` | 전원 OFF | VpcInfo.vue | [링크](resource/vpcs/01-vpcs-resources.md) |
| POST | `/v1/resource/vpcs/resources/{vmAuthId}/restart` | 재부팅 | VpcInfo.vue | [링크](resource/vpcs/01-vpcs-resources.md) |
| POST | `/v1/resource/vpcs/resources/{vmAuthId}/recovery` | 셀프 Failover (고정IP 유지) | SelffailoverReq.vue | [링크](resource/vpcs/01-vpcs-resources.md) |
| POST | `/v1/resource/vpcs/resources/{vmAuthId}/initial` | 셀프 Failover (초기화) | SelffailoverReq.vue | [링크](resource/vpcs/01-vpcs-resources.md) |
| PUT | `/v1/resource/vpcs/resources/{vmAuthId}/user` | PC 별칭 수정 | VPcNameEditPopup.vue | [링크](resource/vpcs/01-vpcs-resources.md) |
| GET | `/v1/resource/vpcs/auto/mapping/user/pool/list` | 자동 배정 풀 목록 | VPcReq.vue | [링크](resource/vpcs/01-vpcs-resources.md) |
| POST | `/v1/resource/vpcs/resources/vm_auto_assign` | VM 자동 배정 | VPcReq.vue | [링크](resource/vpcs/01-vpcs-resources.md) |

### resource/vm-authorization — VM 인가

| 메서드 | 경로 | 설명 | 호출 위치 | 명세서 |
|--------|------|------|-----------|--------|
| GET | `/v1/resource/vm-authorization/{vmAuthId}` | VM 인가 상세 (접속 URI 포함) | VpcInfo.vue | [링크](resource/vm-authorization/01-vm-authorization.md) |

### resource/snapshot — 스냅샷

| 메서드 | 경로 | 설명 | 호출 위치 | 명세서 |
|--------|------|------|-----------|--------|
| GET | `/v1/resource/snapshot/{vmAuthId}` | 스냅샷 목록 | SnapshotRecovery.vue | [링크](resource/snapshot/01-snapshot.md) |
| DELETE | `/v1/resource/snapshot/{snapId}` | 스냅샷 삭제 | SnapshotRecovery.vue | [링크](resource/snapshot/01-snapshot.md) |
| PUT | `/v1/resource/snapshot/restore/{vmAuthId}/{snapId}` | 스냅샷 복원 | SnapshotRecovery.vue | [링크](resource/snapshot/01-snapshot.md) |
| POST | `/v1/resource/snapshot/execSnapshot/{vmAuthId}` | 스냅샷 생성 | SnapshotRecovery.vue | [링크](resource/snapshot/01-snapshot.md) |

### resource/disk — 영구디스크

| 메서드 | 경로 | 설명 | 호출 위치 | 명세서 |
|--------|------|------|-----------|--------|
| GET | `/v1/resource/disk/local/{acctId}` | 디스크 목록 | PrsDskMng.vue | [링크](resource/disk/01-disk-local.md) |
| POST | `/v1/resource/disk/local` | 디스크 생성 | PrsDskApplyPopup.vue | [링크](resource/disk/01-disk-local.md) |
| DELETE | `/v1/resource/disk/local/{dskId}` | 디스크 삭제 | PrsDskMng.vue | [링크](resource/disk/01-disk-local.md) |
| PUT | `/v1/resource/disk/local/attach` | 디스크 연결 | PrsDskMng.vue | [링크](resource/disk/01-disk-local.md) |
| PUT | `/v1/resource/disk/local/detach` | 디스크 해제 | PrsDskMng.vue | [링크](resource/disk/01-disk-local.md) |

## user — 사용자 관리

### user/accounts — 계정

| 메서드 | 경로 | 설명 | 호출 위치 | 명세서 |
|--------|------|------|-----------|--------|
| GET | `/v1/user/accounts/{acctId}` | 계정 상세 조회 | HeaderBar.vue, AccountSetting.vue | [링크](user/accounts/01-accounts.md) |
| GET | `/v1/user/accounts/usg/history` | 이용 이력 | UsageHistory.vue, SelfFailover.vue | [링크](user/accounts/01-accounts.md) |

### user/work — 업무 요청

| 메서드 | 경로 | 설명 | 호출 위치 | 명세서 |
|--------|------|------|-----------|--------|
| GET | `/v1/user/work/request` | 요청 목록 조회 | VpcInfo.vue, VPcReqList.vue, DeviceAccMng.vue 외 | [링크](user/work/01-work-request.md) |
| GET | `/v1/user/work/request/count` | 요청 건수 조회 | DeviceAccMng.vue | [링크](user/work/01-work-request.md) |
| POST | `/v1/user/work/request` | 요청 등록 | DeviceAccReq.vue, VPcReq.vue, VPcPeriodExt.vue, DisReqReg.vue | [링크](user/work/01-work-request.md) |
| PUT | `/v1/user/work/request/{usrReqId}` | 요청 취소 | VpcInfo.vue, VPcReqList.vue, DeviceAccMng.vue 외 | [링크](user/work/01-work-request.md) |

### user/device-access — 단말 접속

| 메서드 | 경로 | 설명 | 호출 위치 | 명세서 |
|--------|------|------|-----------|--------|
| GET | `/v1/user/device-access/{acctId}/identifier-info` | 등록 디바이스 조회 | DeviceAccList.vue | [링크](user/device-access/01-device-access.md) |
| DELETE | `/v1/user/device-access/{acctDvcIdentId}/identifier-info` | 디바이스 삭제 | DeviceAccList.vue | [링크](user/device-access/01-device-access.md) |
| GET | `/v1/user/device-access/{acctId}/hist` | 접속 이력 | DeviceAccReq.vue | [링크](user/device-access/01-device-access.md) |
| PUT | `/v1/user/device-identifier/{acctDvcIdentHistId}/hist` | 이력 상태 변경 | DeviceAccReq.vue | [링크](user/device-access/01-device-access.md) |

### user/servGroup — 서비스 그룹

| 메서드 | 경로 | 설명 | 호출 위치 | 명세서 |
|--------|------|------|-----------|--------|
| GET | `/v1/user/servGroup/usergroups` | 사용자 그룹 조회 | AccountSetting.vue | [링크](user/servGroup/01-usergroups.md) |

## system — 시스템 콘텐츠

### system/notices — 공지사항

| 메서드 | 경로 | 설명 | 호출 위치 | 명세서 |
|--------|------|------|-----------|--------|
| GET | `/v1/system/notices` | 공지 목록 | NoticeList.vue, HomeNotice.vue | [링크](system/notices/01-notices.md) |
| GET | `/v1/system/notices/count` | 공지 건수 | NoticeList.vue | [링크](system/notices/01-notices.md) |
| GET | `/v1/system/notices/{notiWrtNo}` | 공지 상세 | NoticeDetail.vue | [링크](system/notices/01-notices.md) |

### system/faqs — FAQ

| 메서드 | 경로 | 설명 | 호출 위치 | 명세서 |
|--------|------|------|-----------|--------|
| GET | `/v1/system/faqs` | FAQ 목록 | FaqPage.vue | [링크](system/faqs/01-faqs.md) |
| GET | `/v1/system/faqs/count` | FAQ 건수 | FaqPage.vue | [링크](system/faqs/01-faqs.md) |
| GET | `/v1/system/faqs/{faqWrtNo}` | FAQ 상세 | FaqPage.vue | [링크](system/faqs/01-faqs.md) |

### system/qnas — 1:1 문의

| 메서드 | 경로 | 설명 | 호출 위치 | 명세서 |
|--------|------|------|-----------|--------|
| GET | `/v1/system/qnas` | 문의 목록 | ContactList.vue | [링크](system/qnas/01-qnas.md) |
| GET | `/v1/system/qnas/count` | 문의 건수 | ContactList.vue | [링크](system/qnas/01-qnas.md) |
| GET | `/v1/system/qnas/{advReqWrtNo}` | 문의 상세 | ContactList.vue | [링크](system/qnas/01-qnas.md) |
| POST | `/v1/system/qnas` | 문의 등록 | ContactDetail.vue | [링크](system/qnas/01-qnas.md) |
| PUT | `/v1/system/qnas/{advReqWrtNo}` | 문의 수정 | ContactDetail.vue | [링크](system/qnas/01-qnas.md) |
| DELETE | `/v1/system/qnas/{advReqWrtNo}` | 문의 삭제 | ContactList.vue | [링크](system/qnas/01-qnas.md) |

### system/portals — 포털 리소스

| 메서드 | 경로 | 설명 | 호출 위치 | 명세서 |
|--------|------|------|-----------|--------|
| GET | `/v1/system/portals/guides` | 다운로드/매뉴얼 목록 | FileDownload.vue, Manual.vue | [링크](system/portals/01-guides.md) |

## operation — 운영/정책

### operation/cert — 인증 정책

| 메서드 | 경로 | 설명 | 호출 위치 | 명세서 |
|--------|------|------|-----------|--------|
| GET | `/v1/operation/cert/n2nd/info/{certPlcyId}` | 2차 인증 정책 조회 | VPcReqList.vue | [링크](operation/cert/01-cert-policy.md) |
| GET | `/v1/operation/cert/secu/info/{...}` | 보안 정책 조회 | VpcInfo.vue | [링크](operation/cert/01-cert-policy.md) |

## fileService — 파일 서비스 (별도 서비스)

| 메서드 | 경로 | 설명 | 호출 위치 | 명세서 |
|--------|------|------|-----------|--------|
| POST | `{FILE_URI}/v1/fileService/uploads` | 파일 업로드 | ContactDetail.vue | [링크](fileService/01-file-service.md) |
| GET | `{FILE_URI}/v1/fileService/files/{storFileId}` | 파일 다운로드 | ContactList.vue, FileDownload.vue, Manual.vue | [링크](fileService/01-file-service.md) |
