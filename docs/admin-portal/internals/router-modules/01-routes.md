# 라우트 정의

`src/router/index.js`에서 기본 라우트 정의, `modules/` 하위의 기능별 라우트를 병합. 모든 콘텐츠 라우트는 `Layout` 컴포넌트로 감싸져 있고, lazy-loading(동적 import) 사용.

user-portal과 달리 `/:tenant` 프리픽스 없음. 관리자가 로그인 후 테넌트를 선택하는 구조.

## 기본 라우트 — `router/index.js`

| 경로 | 컴포넌트 | 용도 |
|------|----------|------|
| `/redirect/:path*` | Redirect | 같은 경로 강제 리로드 |
| `/login` | login/index | 로그인 페이지 |
| `/initialized` | initialized/index | 초기 설정 페이지 |
| `/401` | 401.vue | 권한 없음 |
| `/404` | 404.vue | 페이지 없음 |
| `/500` | 500.vue | 서버 에러 |
| `/505` | 505.vue | 서버 에러 |
| `/dashboard` | newDashboard/index | 대시보드 (홈). meta: `id: 'A01', tenantMenuId: 'T01', noCache: true, isNotHeader: true` |
| `/userInfo` | user/userInfo | 관리자 정보 변경 (hidden) |
| `/ready` | Ready.vue | 준비 중 페이지 (hidden) |

디버그 모드(`VUE_APP_DEBUG=true`)에서만 Sample 라우트 추가.

## 동적 라우트 — `asyncRouterMap`

`permission` 모듈의 `GenerateRoutes` 액션에서 역할별 필터링 후 `router.addRoutes()`로 등록.

### 사용자 관리 (`/user`, T02)

| 경로 | name | 컴포넌트 | 메뉴 ID |
|------|------|----------|---------|
| `group` | groupManage | Group | T0201 |
| `index` | userManage | userManage | T0202 |
| `job-request` | jobRequest | JobRequest | T0203 |
| `terminal-access` | terminalAccess | TerminalAccessList | T0204 |
| `work/urgent-work-reqeust-manage` | urgentWorkRequestManage | urgentWorkRequestManage | T0205→T020501 |
| `work/normal-work-setting` | normalWorkSetting | normalWorkSetting | T020502 |
| `work/urgent-work-setting` | urgentWorkSetting | urgentWorkSetting | T020503 |
| `work/over-work-setting` | overWorkSetting | overWorkSetting | T020504 |
| `policy/policy-list` | policyList | policyList | T0206→T020601 |

### 사용자 지원 (`/user-support`, T03)

| 경로 | name | 컴포넌트 | 메뉴 ID |
|------|------|----------|---------|
| `virtual-pc-remote-control` | virtualPcRemoteControl | VirtualPcRemoteControl | T0301 |
| `job-work-request` | jobWorkRequest | JobWorkRequest | T0302 |
| `vos-histories` | vosHistoryManage | VosHistories | T0303 |

### 포털 관리 (`/portal`, A04/T04)

| 경로 | name | 컴포넌트 | 메뉴 ID (Super/Tenant) |
|------|------|----------|----------------------|
| `admin` | adminPortalUi | AdminPortal | A0401 / - |
| `user` | userPortalUi | UserPortal | - / T0401 |
| `notice` | noticeManage | Notice | A0402 / T0402 |
| `faq` | faqManage | Faq | A0403 / T0403 |
| `man-to-man` | manToManManage | ManToMan | A0404 / T0404 |
| `manual` | manualManage | Manual | - / T0405 |
| `download/executable-files` | executableFiles | ExecutableFiles | - / T040601 |
| `download/url` | urlManage | Url | - / T040602 |
| `download/agent-files` | agentFilesManage | AgentFiles | - / T040603 |
| `popup` | popupManage | Popup | A0407 / T0407 |

### 정책 관리 (`/policy`, A05/T05)

같은 경로에 Super Admin용(`*Supadm`)과 Tenant Admin용 컴포넌트가 별도 정의된 경우 있음.

| 경로 | 컴포넌트 | 메뉴 ID (Super/Tenant) |
|------|----------|----------------------|
| `user-auth-policy` | UserAuthPolicySupadm / UserAuthPolicy | A0501 / T0501 |
| `admin-auth-policy` | AdminAuthPolicySupadm / AdminAuthPolicy | A0502 / T0502 |
| `virtual-pc-auth-policy` | VirtualPcAuthPolicySupadm / VirtualPcAuthPolicy | A0503 / T0503 |
| `backup-snapshot-policy` | BackupSnapshotSupadm / BackupSnapshot | A0505 / T0505 |
| `policy-manage/excerpt-network` | ExcerptNetwork | A050601 / T050601 |
| `policy-manage/access-block` | AccessBlock | A050602 / T050602 |
| `policy-manage/url-Redirection-disallow` | UrlRedirectionDisallow | - / T050606 |
| `policy-manage/unlicensed-policy` | UnlicensedPolicyManage | - / T050607 |
| `policy-manage/metadata-policy` | MetadataPolicySupadm / MetadataPolicy | A050608 / T050608 |
| `policy-manage/black-list` | BlacklistUpload | A050604 / T050604 |
| `policy-manage/white-list` | WhitelistUpload | A050605 / T050605 |
| `policy-manage/usb-policy/usb-policy` | UsbRedirection | A05060901 / T05060901 |
| `policy-manage/usb-policy/usb-type` | UsbType | A05060902 / T05060902 |
| `policy-manage/usb-policy/usb-vendor` | UsbVendor | A05060903 / T05060903 |
| `policy-manage/usb-policy/usb-model` | UsbModel | A05060904 / T05060904 |
| `policy-manage/security-group` | SecurityGroup | - / T050611 |

### 서비스 관리 (`/service-manage`, A06/T06)

| 경로 | 컴포넌트 | 메뉴 ID (Super/Tenant) |
|------|----------|----------------------|
| `alarm-manage/alarm-histories` | AlarmHistories | A060101 / T060101 |
| `alarm-manage/alarm-settings` | AlarmSettings | A060102 / T060102 |
| `security-certificate/histories` | SecurityCertificateHistories | A060301 / - |
| `security-certificate/expiration-date-histories` | ExpirationDateHistories | A060302 / - |
| `access-control/histories` | AccessControlHistories | A060401 / T060401 |
| `access-control/settings` | AccessControlSettings | A060402 / T060402 |
| `external-link/octatco` | ExternalLinkOctatco | - / T060504 |
| `external-link/external-link-adLinkage` | ExternalLinkAdLinkage | - / T060501 |
| `external-link/external-link-networkStorage` | ExternalLinkNetworkStorage | - / T060502 |
| `external-link/external-link-email` | ExternalLinkEmail | - / T060503 |
| `push-manage/message` | Message | A060601 / T060601 |
| `push-manage/message-result` | MessageResult | A060602 / T060602 |

### 가상PC 관리 (`/virtual-pc`, T07)

| 경로 | name | 메뉴 ID |
|------|------|---------|
| `virtual-pc-create` | Virtual Pc Create Management | T0701 |
| `virtual-pc-group` | Group | T0702 |
| `virtual-pc-connect` | Virtual Pc connect Management | T0703 |
| `virtual-pc-reservate` | Reservate | T0704 |
| `portManage` | portManage | T0705 |
| `public-pc-resource` | PublicPcStandbyResources | T0706 |
| `autoAssign` | autoAssign | T0707 |

### 테넌트 관리 (`/tenant`, A08/T08)

| 경로 | name | 메뉴 ID |
|------|------|---------|
| `index` | tenant | A0802 / T0802 |

### 템플릿 관리 (`/template`, A09/T09)

| 경로 | name | 메뉴 ID |
|------|------|---------|
| `index` | templateManage | A0901 / T0901 |
| `virtual-spec` | virtualSpecManage | A0902 / T0902 |
| `golden-image/manage` | GoldenImageManage | A0903 / T090301 |
| `golden-image/create` | GoldenImageCreate | A090302 / T090302 |

### 시스템 리소스 관리 (`/system-resource`, A10/T10)

Super Admin과 Tenant Admin이 같은 경로지만 다른 하위 메뉴를 보는 구조. 네트워크, 스토리지는 역할별로 별도 라우트 블록 정의.

| 경로 | name | 메뉴 ID (Super/Tenant) |
|------|------|----------------------|
| `domain` | domainManage | A1001 / T1001 |
| `zone` | zoneManage | A1002 / T1002 |
| `host` | hostManage | A1003 / T1003 |
| `network/zone` | networkManage | A100401 / T100401 |
| `network/subnet` | subnetManage | A100402 / T100402 |
| `network/router` | routerManage | A100403 / T100403 |
| `network/qos` | qosManage | A100404 / T100404 |
| `storage/volume-Type` | VolumeTypeManager | A100501 / - |
| `storage/disk-qos` | diskQosManager | A100502 / - |
| `storage/volume-resource` | VolumeResourceManager | A100503 / T100503 |
| `storage/block-storage` | BlockStorage | - / T100501 |
| `migration` | migrationManage | - / T1006 |
| `nws` | networkStorageManage | A1007 / T1007 |
| `proxy/forward-proxy` | ForwardProxyManage | A100901 / T100901 |
| `proxy/reverse-proxy` | ReverseProxyManage | A100902 / T100902 |
| `EmailManage` | EmailManage | A1010 / - |
| `evacuate/evacuate` | evacuateManage | A101101 / T100801 |
| `evacuate/evacuate-history` | evacuateHistoryManage | A101102 / T100802 |

### 모니터링 — Super Admin (`/monitoring`, A11)

| 경로 | name | 메뉴 ID |
|------|------|---------|
| Kibana(외부 URL) | totalLogSystem | A1102 |
| `user-connect-status` | UserConnectStatus | A1121 |
| `tenant-alarm-manage/alarm-histories` | AlarmHistories | A112201 |
| `tenant-alarm-manage/alarm-settings` | AlarmSettings | A112202 |
| `service-statistics/resource` | systemResourceStatistics | A110301 |
| `service-statistics/tenant` | tenantStatistics | A110302 |
| `service-statistics/user-virtual-pc` | userVirtualPcStatistics | A110303 |
| `service-statistics/period-user-usage-time` | PeriodUserUsageTimeList | A110305 |
| `service-statistics/by-user-usage-time` | ByUserUsageTimeList | A110306 |
| `service-statistics/period-connect-log` | PeriodConnectLogList | A110307 |
| `service-statistics/by-user-period-connect-log` | ByUserPeriodConnectLogList | A110308 |
| `service-statistics/period-by-user-count` | PeriodByUserCount | A110310 |
| `service-statistics/group-by-user-count` | GroupByUserCount | A110311 |
| `virtualpc-statistics/virtualpc-allotment` | virtualpcAllotment | A110401 |
| `virtualpc-statistics/simultaneous-virtualpc` | simultaneousVirtualpc | A110402 |
| `virtualpc-statistics/virtualpc-usage` | virtualpcUsage | A110404 |
| `virtualpc-statistics/non-connect-virtualpc` | nonConnectVirtualpc | A110405 |
| `virtualpc-statistics/user-virtual-pc-lookup` | userVirtualPcLookup | A110406 |
| `work-handle-statistics/work-handle-statistics` | workHandleStatistics | A110801 |
| `work-handle-statistics/customer-support-statistics` | customerSupportStatistics | A110802 |
| `email-sms-statistics/sms-sending-statistics` | smsSendingStatistics | A110901 |
| `email-sms-statistics/email-sending-statics` | emailSendingStatics | A110902 |
| `deploy-connect-status/deploy-connect-status` | deployConnectStatus | A1110 |
| `quality-statistics/delay-time` | DelayTime | A111101 |
| `quality-statistics/bandwidth` | Bandwidth | A111102 |
| `quality-statistics/viewer-run-environment` | viewerRunEnvironment | A111103 |
| `browser-access-statistics` | browserAccessStatistics | A1112 |
| `log-statistics/client-error-statistics` | clientErrorStatistics | A111301 |
| `log-statistics/system-error-statistics` | systemErrorStatistics | A111302 |
| `log-statistics/admin-activity-log` | adminActivityLog | A111303 |
| `log-statistics/user-activity-log` | userActivityLog | A111304 |
| `monthly-report` | monthlyReport | A1114 |
| `audit-log/admin-audit-log` | adminAuditLog | A111801 |
| `audit-log/user-audit-log` | userAuditLog | A111802 |

### 실시간 모니터링 — Super Admin (`/realTimeMonitoring`, A15)

| 경로 | name | 메뉴 ID |
|------|------|---------|
| `dashboard-manager` | DashboardManager | A1501 |
| `receive-manage/receive-group-manage` | receiveGroupManage | A150201 |
| `receive-manage/receive-alarm-threshold` | receiveAlarmThreshold | A150202 |
| `receive-manage/receive-alarm-history` | ReceiveAlarmHistory | A150203 |
| `/realTime/server/compute` | computeNode | A150301 |
| `/realTime/server/control` | controlNode | A150302 |
| `/realTime/storage` | storage | A1504 |
| `/realTime/network` | network | A1505 |
| `/realTime/vpc` | vpc | A1506 |
| `/realTime/pod` | pod | A1507 |

### 모니터링 — Tenant Admin (`/monitoring`, T11)

서비스 통계, 가상PC 통계, 품질 통계, 로그 통계의 테넌트 전용 뷰 제공. Super Admin 모니터링과 많은 컴포넌트 공유하지만 일부는 `Tenant*` 접두사가 붙은 전용 컴포넌트 사용.

| 주요 하위 그룹 | 메뉴 ID |
|-------------|---------|
| 서비스 통계 | T1103 |
| 가상PC 통계 | T1104 |
| 품질 통계 | T1111 |
| 로그 통계 | T1113 |
| Elasticsearch 로그 | T1119 |

### 실시간 모니터링 — Tenant Admin (`/realTimeMonitoring`, T14)

| 경로 | name | 메뉴 ID |
|------|------|---------|
| `user-connect-status` | UserConnectStatus | T1401 |
| `tenant-dashboard-manager` | TenantDashboardManager | T1402 |
| `tenant-alarm/alarm-histories` | AlarmHistories | T140301 |
| `tenant-alarm/alarm-settings` | AlarmSettings | T140302 |

### 관리자 설정 (`/admin-setting`, A12/T12)

| 경로 | name | 메뉴 ID (Super/Tenant) |
|------|------|----------------------|
| `index` | adminSetting | A1201 / T1201 |
| `group` | groupManageAdminSetting | A1202 / T1202 |
| `environment-setting` | environmentSetting | A1209 / T1209 |
| `tenant-group` | tenantGroupManageAdminSetting | A1203 / T1203 |
| `menu/menu-manage` | codeManageAdminSetting | A120801 / T120801 |
| `menu/api-menu-manage` | apiManageAdminSetting | A120802 / T120802 |
| `menu/func-menu-manage` | funcManageAdminSetting | A120803 / T120803 |
| `code` | codeManageAdminSetting | A1204 / T1204 |
| `system-license` | systemLicenseAdminSetting | A1205 / T1205 |
| `sw-version` | swVersionIAdminSetting | A1206 / - |
| `platform-settings/pod-setting` | PodSetting | A120701 / T120701 |
| `platform-settings/platform-sw` | PlatformSettings | A120702 / T120702 |
| `platform-settings/event-log` | LogDump | A120703 / T120703 |

### 가상디스크 관리 (`/virtual-disk`, A14/T13)

| 경로 | name | 메뉴 ID |
|------|------|---------|
| `virtual-disk-manage` | virtualDiskManagement | A1401 / T1301 |

## meta 필드

| 필드 | 용도 |
|------|------|
| `id` | Super Admin 메뉴 식별자 (`A` prefix). permission 모듈에서 접근 제어에 사용 |
| `tenantMenuId` | Tenant Admin 메뉴 식별자 (`T` prefix) |
| `originalPath` | 네비게이션 추적용 원본 경로명 |
| `noCache` | `true`면 keep-alive 캐시에서 제외 (대시보드만 해당) |
| `isNotHeader` | `true`면 헤더 숨김 (대시보드, 대시보드 매니저) |
| `icon` | 사이드바 아이콘 SVG 이름 |
| `hidden` | `true`면 사이드바 메뉴에서 숨김 |

## 레이아웃

| 컴포넌트 | 용도 |
|---------|------|
| `Layout` | 사이드바 + Navbar + TagsView + AppMain + FooterBar. 메인 레이아웃 |
| `EmptyLayout` | 중첩 라우트용 빈 레이아웃 (`<router-view>` only) |
