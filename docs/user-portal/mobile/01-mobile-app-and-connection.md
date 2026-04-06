---
type: flow
title: 모바일 앱 다운로드 및 접속
status: stable
version: v2.2.10
portal: user
screens:
  - support/FileDownload.vue
related_docs:
  - ../vpcinfo/home/02-vpc-info-and-status.md
  - ../vpcinfo/07-device-access.md
---

# 모바일 앱 다운로드 및 접속

VDI 클라이언트 공통 접속 흐름(`skbvdi://` URI 스킴, 접속 전 검증)은 [02-vpc-info-and-status.md](../vpcinfo/home/02-vpc-info-and-status.md) 참고. 이 문서에서는 모바일 고유 부분만 다룬다.

## 모바일 클라이언트 다운로드 — `views/support/FileDownload.vue`

| 플랫폼 | 다운로드 방식 |
|------|----------|
| Android | Google Play Store 링크로 이동 (`window.open(url)`) |
| iOS | Apple App Store 링크로 이동 (`window.open(url)`) |

데스크톱처럼 파일을 직접 다운로드하지 않고, 각 앱 스토어 페이지를 연다.

## 모바일에서의 Cloud PC 접속

모바일도 데스크톱과 동일한 `skbvdi://cloudpc?` URI 스킴을 사용한다. 모바일 기기에 VDI 클라이언트 앱(App Store/Play Store에서 설치)이 있으면 앱이 열리면서 Cloud PC에 접속한다. 앱이 없으면 URI 스킴이 동작하지 않으므로, 앱 설치가 선행되어야 한다.

## 모바일 기기 등록 → 접속까지 전체 흐름

단말 접속 등록의 공통 구조는 [07-device-access.md](../vpcinfo/07-device-access.md) 참고.

```
1. App Store / Play Store에서 VDI 클라이언트 앱 설치
2. user-portal에서 단말 접속 정보 등록 요청 (디바이스 유형: iOS 또는 Android)
3. 관리자 승인
4. user-portal 홈 화면에서 Cloud PC "접속" 버튼 클릭
5. skbvdi:// URI 스킴으로 VDI 클라이언트 앱 실행 → Cloud PC 접속
```

## 키로깅 방지 미적용

키로깅 방지 에이전트는 로컬 WebSocket(`wss://localhost:29999`)을 사용하는 데스크톱 전용 기능이다. iOS/Android에서는 로컬 에이전트를 설치할 수 없으므로 키로깅 방지가 적용되지 않는다.
