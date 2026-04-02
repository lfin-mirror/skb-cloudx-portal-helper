# User Portal 폴더 구조

```
user-portal/
├── public/
│   └── index.html                    # HTML 엔트리 (Vue 마운트 포인트 #app)
├── config/
│   └── application.json              # 앱 설정
├── src/
│   ├── main.js                       # Vue 앱 초기화
│   ├── App.vue                       # 루트 컴포넌트
│   ├── permission.js                 # 라우트 가드 & 인증 로직
│   ├── js/
│   │   └── localConfig.js
│   ├── lang/                         # i18n (한국어/영어)
│   │   ├── index.js
│   │   └── menus/
│   │       ├── ko/
│   │       └── en/
│   ├── router/
│   │   ├── index.js                  # 라우터 설정 & 라우트 정의
│   │   └── modules/
│   │       ├── vPcInfo.js            # 가상PC 관련 라우트
│   │       ├── user.js               # 계정 설정 라우트
│   │       └── support.js            # 공지/FAQ/매뉴얼 라우트
│   ├── store/
│   │   ├── index.js                  # Vuex 스토어
│   │   ├── getters.js
│   │   └── modules/
│   │       ├── app.js
│   │       ├── user.js               # 사용자 상태 & 로그인 데이터
│   │       ├── permission.js
│   │       ├── tagsView.js
│   │       ├── notice.js
│   │       ├── keylogging.js
│   │       └── common.js
│   ├── utils/
│   │   ├── request.js                # Axios 인스턴스 & 인터셉터
│   │   ├── auth.js                   # 토큰 관리 (get/set/remove)
│   │   ├── storage.js
│   │   ├── permission.js
│   │   ├── common.js
│   │   ├── validate.js
│   │   ├── validationSchema.js
│   │   ├── keyloggingWS.js
│   │   └── ...
│   ├── assets/
│   │   ├── fonts/                    # Pretendard 폰트
│   │   ├── img/                      # 아이콘, 로고, 스프라이트
│   │   ├── js/
│   │   └── scss/                     # 스타일시트
│   ├── styles/
│   │   └── commons/
│   ├── components/                   # 공통 컴포넌트
│   │   ├── ConfirmPopup.vue
│   │   ├── SpinnerLoading.vue
│   │   ├── VpcPowerPopup.vue
│   │   ├── KeyloggingInstallModal.vue
│   │   ├── KeyloggingUpdateModal.vue
│   │   ├── KeyloggingOsUnsupportedModal.vue
│   │   ├── Hamburger/
│   │   ├── ScrollPane/
│   │   └── ...
│   └── views/
│       ├── layout/
│       │   ├── Layout.vue            # 메인 레이아웃 (헤더+사이드바+콘텐츠+푸터)
│       │   ├── EmptyLayout.vue
│       │   ├── components/           # HeaderBar, FooterBar 등
│       │   └── mixin/
│       ├── login/
│       │   ├── index.vue             # 로그인 페이지 컨테이너
│       │   ├── VpnLogin.vue          # VPN 로그인
│       │   ├── authredirect.vue
│       │   └── components/
│       │       ├── Login.vue         # 일반 로그인 폼
│       │       ├── OctatcoLogin.vue  # Octatco MFA 로그인
│       │       ├── CertificationOTP.vue
│       │       ├── CertificationSMS.vue
│       │       ├── FindUserId.vue
│       │       ├── FindUserPwd.vue
│       │       ├── PasswordChange.vue
│       │       └── octatco/          # Octatco 생체인증 컴포넌트
│       ├── home/
│       │   ├── HomePage.vue
│       │   └── components/
│       ├── vPcInfo/                   # 가상PC 관리
│       │   ├── PrsDskMng.vue         # 영구디스크 관리
│       │   ├── UsageHistory.vue      # 이용내역
│       │   ├── VPcReqList.vue        # 가상PC 신청 목록
│       │   ├── SnapshotRecovery.vue  # 스냅샷 복구
│       │   ├── SelfFailover.vue      # 셀프 failover
│       │   ├── VPcReturn.vue         # 가상PC 반납
│       │   └── DeviceAccMng.vue      # 디바이스 접근 관리
│       ├── user/
│       │   ├── AccountSetting.vue    # 계정 설정
│       │   ├── component/
│       │   └── popup/
│       ├── support/                   # 고객지원
│       │   ├── NoticeList.vue
│       │   ├── NoticeDetail.vue
│       │   ├── FaqPage.vue
│       │   ├── Manual.vue
│       │   └── ...
│       ├── errorPage/
│       │   ├── 401.vue
│       │   ├── 404.vue
│       │   └── 500.vue
│       └── redirect/
├── nginx/                            # 배포용 Nginx 설정
├── package.json
├── vue.config.js
├── babel.config.js
├── jsconfig.json
├── .eslintrc.js
├── .prettierrc
├── .env
├── .env.development
├── Dockerfile-skb
├── Jenkinsfile
└── start.sh
```

## 핵심 디렉토리 역할

| 디렉토리 | 역할 |
|-----------|------|
| `src/router/` | 라우트 정의. `modules/` 하위에 기능별로 분리 |
| `src/store/` | Vuex 상태 관리. 사용자, 앱, 권한, 공지 등 모듈 분리 |
| `src/utils/` | HTTP 클라이언트, 토큰, 유효성 검증 등 유틸리티 |
| `src/views/` | 페이지 단위 컴포넌트. 라우트와 1:1 대응 |
| `src/components/` | 여러 페이지에서 재사용하는 공통 컴포넌트 |
| `src/lang/` | 다국어 번역 파일 (ko/en) |
| `src/assets/` | 폰트, 이미지, SCSS 등 정적 리소스 |
