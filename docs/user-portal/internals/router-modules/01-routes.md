---
type: internal
title: 라우트 정의
status: stable
version: v2.2.10
portal: user
source_files:
  - src/router/index.js
  - src/router/modules/vPcInfo.js
  - src/router/modules/support.js
  - src/router/modules/user.js
---

# 라우트 정의

`src/router/index.js`에서 기본 라우트를 정의하고, `modules/` 하위의 기능별 라우트를 병합한다.

```javascript
routes: [...constantRouter, ...vPcInfo, Support, ...user]
```

모든 콘텐츠 라우트는 `/:tenant` 프리픽스를 가지며 멀티테넌트를 지원한다. 콘텐츠 라우트는 `Layout` 컴포넌트로 감싸져 있다. 모든 컴포넌트는 lazy-loading(동적 import)을 사용한다.

## 기본 라우트 — `router/index.js`

| 경로 | 컴포넌트 | 용도 |
|------|----------|------|
| `/redirect/:path*` | Redirect | 같은 경로 강제 리로드 |
| `/401` | 401.vue | 권한 없음 |
| `/404` | 404.vue | 페이지 없음 |
| `/40x` | 40x.vue | 클라이언트 에러 |
| `/500` | 500.vue | 서버 에러 |
| `/505` | 505.vue | 서버 에러 |
| `/50x` | 50x.vue | 서버 에러 |
| `/checking` | Checking | 시스템 점검 안내 (name: `checking`, props: true) |
| `/auth/check` | VpnLogin | VPN 자동 로그인 |
| `/:tenant/login` | login/index.vue | 로그인 페이지 |
| `/:tenant` → `home` | HomePage | 홈 화면 (meta: `id: 'A01', tenantMenuId: 'T01', noCache: true, isNotHeader: true`) |
| `*` | 404.vue | catch-all |

## Cloud PC 관리 — `router/modules/vPcInfo.js`

부모 경로: `/:tenant/vPcInfo` (Layout)

| 경로 | 메뉴명 | 컴포넌트 | name |
|------|--------|----------|------|
| `vPcReqList` | Cloud PC 신청 | VPcReqList.vue | vPcReqList |
| `prsDskMng` | 개인 디스크 관리 | PrsDskMng.vue | prsDskMng |
| `usageHistory` | 이용 내역 | UsageHistory.vue | usageHistory |
| `snapshotRecovery` | 스냅샷 및 복원 | SnapshotRecovery.vue | snapshotRecovery |
| `initialization` | Cloud PC 초기화 | SelfFailover.vue | SelfFailover |
| `vPcReturn` | Cloud PC 반납 | VPcReturn.vue | vPcReturn |
| `DeviceAccMng` | 단말 접속 정보 등록 | DeviceAccMng.vue | DeviceAccMng |
| `DeviceAccList` | 단말 접속 정보 현황 | DeviceAccList.vue | DeviceAccList |

## 고객지원 — `router/modules/support.js`

부모 경로: `/:tenant/support` (Layout, meta: `id: 'A04', tenantMenuId: 'T04'`)

| 경로 | 메뉴명 | 컴포넌트 | name | hidden |
|------|--------|----------|------|--------|
| `noticeList` | 공지사항 | NoticeList.vue | noticeList | |
| `noticeDetail/:no` | (공지사항 상세) | NoticeDetail.vue | subNoticeDetail | O |
| `faqList` | 자주 묻는 질문 | FaqPage.vue | faqList | |
| `manual` | 매뉴얼 | Manual.vue | manual | |
| `fileDownload` | 다운로드 | FileDownload.vue | FileDownload | O |
| `disReqList` | 장애처리 신청 | DisReqList.vue | disReqList | O |
| `disReqReg` | (장애처리 신청 등록) | DisReqReg.vue | DisReqReg | O |
| `ContactList` | 1:1 문의 | ContactList.vue | ContactList | O |
| `ContactDetail` | (1:1 문의 상세) | ContactDetail.vue | ContactDetail | O |

`hidden: true`인 라우트는 네비게이션 메뉴에 표시되지 않는다. 괄호로 표기한 메뉴명은 메뉴에 노출되지 않는 하위 페이지다.

## 사용자 — `router/modules/user.js`

부모 경로: `/:tenant/user` (Layout)

| 경로 | 메뉴명 | 컴포넌트 | name |
|------|--------|----------|------|
| `info` | 사용자 정보 변경 | AccountSetting.vue | userinfo |

## meta 필드

| 필드 | 용도 |
|------|------|
| `id` | 메뉴 식별자 (A01, A0402 등). permission 모듈에서 역할 기반 접근 제어에 사용 |
| `tenantMenuId` | 테넌트 메뉴 ID (T01, T04) |
| `originalPath` | 네비게이션 추적용 원본 경로명 |
| `noCache` | `true`면 keep-alive 캐시에서 제외 (홈 화면만 해당) |
| `isNotHeader` | `true`면 헤더 숨김 (홈 화면만 해당) |
| `hidden` | `true`면 네비게이션 메뉴에서 숨김 |
