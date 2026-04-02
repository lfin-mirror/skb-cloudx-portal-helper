# User Portal 문서

기준 버전: v2.2.9 / `v2` 브랜치 / 2026-03-25

## 문서 구성

상위 파일은 공통 내용, 하위 폴더는 메뉴/기능 영역별로 분리한다.

### 공통

| 폴더 | 파일 | 내용 |
|------|------|------|
| `.` | `01-folder-structure.md` | 폴더 구조 |

### auth/ — 인증/로그인

| 폴더 | 파일 | 내용 |
|------|------|------|
| `auth` | `01-entry-to-login-flow.md` | 앱 초기화 → 로그인 페이지 도달 |
| `auth` | `02-login-to-home-flow.md` | 로그인 → 2차 인증 → 홈 진입 |
| `auth` | `03-account-recovery-and-ad.md` | 아이디 찾기, 비밀번호 초기화, AD 연동 영향 |
| `auth` | `04-vpn-auto-login.md` | VPN 자동 로그인 |

### vpcinfo/ — Cloud PC 관리

| 메뉴명 | 폴더 | 파일 | 내용 |
|--------|------|------|------|
| (홈 화면) | `vpcinfo/home` | `01-layout-and-polling.md` | 할당된 Cloud PC 목록 캐러셀, 10초 폴링 2개(목록+상태), 공지사항 롤링, PC 이름/순서 변경 |
| (홈 화면) | `vpcinfo/home` | `02-vpc-info-and-status.md` | 선택된 PC의 리소스 사용량(CPU/메모리/디스크), 전원/할당 상태 코드, 보안 정책 표시, `skbvdi://` 접속 흐름 |
| (홈 화면) | `vpcinfo/home` | `03-power-control.md` | 전원 ON/OFF/재부팅 API, 사용 기간 검증, 상태 전이 다이어그램, 전원 조작 불가 조건 |
| (홈 화면) | `vpcinfo/home` | `04-period-extension.md` | Cloud PC 사용 기간 연장 요청, 기존 요청 확인/취소, 날짜 선택 |
| Cloud PC 신청 | `vpcinfo` | `01-vpc-req.md` | 개인전용PC/공용PC 선택, 관리자 승인 또는 즉시 할당(풀 선택), VM 제한 수 확인 |
| 개인 디스크 관리 | `vpcinfo` | `02-prs-disk.md` | 개인 디스크를 Cloud PC에 연결/분리/삭제, 10GB 단위 디스크 추가 신청, 5초 딜레이 새로고침 |
| 이용 내역 | `vpcinfo` | `03-usage-history.md` | 포털접속/제어/접속/신청반납/초기화/장애처리 7개 탭 필터, 날짜별 그룹핑, 50건씩 더보기 |
| 스냅샷 및 복원 | `vpcinfo` | `04-snapshot.md` | Cloud PC별 스냅샷 생성/복원/삭제, 복원 시 전원 상태 확인, 3초 자동 폴링으로 복원 진행 추적 |
| Cloud PC 초기화 | `vpcinfo` | `05-initialization.md` | Cloud PC 데이터 전체 초기화, static IP 여부에 따라 recovery/initial API 분기, 전원 강제 종료 경고 |
| Cloud PC 반납 | `vpcinfo` | `06-vpc-return.md` | Cloud PC 사용 권한 반납 신청, PC 선택 시 CPU/메모리/HDD 스펙 표시, XSS 필터링, 취소 |
| 단말 접속 정보 등록/현황 | `vpcinfo` | `07-device-access.md` | 6종 디바이스(Windows/Linux/Thin Client/MacOS/iOS/Android) 등록 요청, 관리자 승인 후 접속 허용, 등록 현황 조회/삭제 |

### support/ — 고객지원

| 메뉴명 | 폴더 | 파일 | 내용 |
|--------|------|------|------|
| 공지사항 | `support` | `01-notice.md` | 공지사항 검색(제목/내용), 페이지네이션, 상세 HTML 렌더링, 첨부 이미지, 이전/다음 네비게이션 |
| 매뉴얼 | `support` | `02-manual.md` | PC Client/Mobile Client/Thin Client 매뉴얼 PDF 다운로드 |
| 자주 묻는 질문 | `support` | `03-faq.md` | 이용방법/장애/로그인/기타 5개 탭 필터, 아코디언 펼침 시 답변+이미지 로드, 검색 |
| 1:1 문의 | `support` | `04-contact.md` | 문의 등록(유형/제목/내용/파일첨부 25MB), 답변대기/완료 상태 추적, 답변대기 시만 수정/삭제 가능 |
| 다운로드 | `support` | `05-file-download.md` | Windows/MacOS 클라이언트 직접 다운로드(진행률 표시), Android/iOS 앱스토어 링크, 300초 타임아웃 |
| 장애처리 신청 | `support` | `06-trouble-request.md` | Cloud PC 선택, 11종 장애 유형 태그 복수 선택(PC장애/프로그램오류/기타), 원격 접속 동의 필수, 신청/취소 |

### mobile/ — 모바일 전용

| 폴더 | 파일 | 내용 |
|------|------|------|
| `mobile` | `01-mobile-app-and-connection.md` | 모바일 앱 다운로드(App Store/Play Store), 모바일 접속 흐름 |
| `mobile` | `02-responsive-ui.md` | 반응형 UI (Layout 분기, 미디어 쿼리 브레이크포인트, 모바일 헤더, v2.2.9 변경 내역) |
| `mobile` | `03-mqtt-mobile-biometric.md` | MQTT 기반 모바일 생체 인증 통신 구조 |

### internals/ — 내부 구조

| 폴더 | 파일 | 내용 |
|------|------|------|
| `internals/http-interceptor` | `01-request-js.md` | Axios 인스턴스, 토큰 주입/갱신, 에러 핸들링, 재시도, forwardCodes |
| `internals/http-interceptor` | `02-error-codes.md` | AGW/AUTH 에러 코드 전체 목록과 프론트엔드 처리 |
| `internals/vuex-store` | `01-overview.md` | 7개 모듈 구조, 루트 getters, 데이터 영속성 |
| `internals/vuex-store` | `02-app.md` | app 모듈 (사이드바, 언어, 디바이스, 이미지, 페이지네이션) |
| `internals/vuex-store` | `03-permission.md` | permission 모듈 (역할 기반 동적 라우트 필터링) |
| `internals/vuex-store` | `04-keylogging.md` | keylogging 모듈 (에이전트 상태 머신) |
| `internals/vuex-store` | `05-tagsview-notice-common.md` | tagsView, notice, common 모듈 |
| `internals/router-modules` | `01-routes.md` | 전체 라우트 정의, meta 필드, 기능별 모듈 상세 |
| `internals/i18n` | `01-i18n.md` | Vue-i18n 설정, 번역 파일 구조, 키 패턴 |

## 보일러플레이트 기반

user-portal은 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) (Vue 2 + Element UI 관리자 대시보드 보일러플레이트)을 기반으로 시작한 것으로 추정된다. 코드 곳곳에 이 프로젝트의 구조가 남아 있다:

| 파일/패턴 | vue-element-admin 원본 | CloudX 커스터마이징 |
|---|---|---|
| `layout/mixin/ResizeHandler.js` | `WIDTH = 992`로 모바일 감지 | `WIDTH = 0`으로 비활성화, CSS 미디어 쿼리로 대체 |
| `layout/Layout.vue` + `AppMain.vue` | 사이드바 + 헤더 + 콘텐츠 구조 | 사이드바 제거, PC/모바일 헤더 이중 구조로 변경 |
| `store/modules/app.js` | `device`, `sidebar` 상태 관리 | 구조 유지 (`device`는 항상 desktop) |
| `src/permission.js` | `router.beforeEach` 가드 + 화이트리스트 | 멀티테넌트 분기, `tntExists()` 추가 |
| `utils/request.js` | Axios 인터셉터 (토큰 주입, 에러 처리) | JWT 갱신, 401 리다이렉트 등 커스터마이징 |
| `views/redirect/` | 같은 경로 강제 리로드용 리다이렉트 | 원본 유지 |
| `store/modules/tagsView.js` | 탭 기반 라우트 히스토리 | 원본 유지 (사용 여부 불명확) |
