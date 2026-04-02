---
type: screen
title: 홈 화면 레이아웃 및 폴링
status: stable
version: v2.2.9
portal: user
component: HomePage.vue
api_endpoints:
  - GET /v1/resource/vm-authorization
  - GET /v1/resource/vm-authorization/{id}
  - GET /v1/management/dashboard/user/{id}/stat
  - GET /v1/operation/cert/secu/info/{policyId}
  - GET /v1/system/notices
  - PUT /v1/resource/vpcs/resources/{vmAuthorizationId}/user
---

# 홈 화면 레이아웃 및 폴링

`views/home/HomePage.vue` — 로그인 후 최초 진입하는 화면이다. 할당된 Cloud PC 목록을 표시하고, 선택한 PC의 상세 정보를 보여준다.

## 화면 구성

```
┌─────────────────────────────────────────────────────┐
│ 헤더 알림 배너 ("하루의 시작은 개인 정보 점검부터!") │
├──────────────────────┬──────────────────────────────┤
│                      │                              │
│  Cloud PC 목록       │  선택된 PC 상세 (VpcInfo)    │
│  (Swiper 캐러셀)     │  - 상태 / 전원 토글          │
│                      │  - 리소스 사용량              │
│  [PC 이름 순서 변경]  │  - 접속 / 기간 연장 버튼     │
│                      │  - 기본 정보                  │
│                      │  - 디바이스 정책              │
│                      │                              │
├──────────────────────┴──────────────────────────────┤
│ 공지사항 롤링 (HomeNotice)                          │
└─────────────────────────────────────────────────────┘
```

Cloud PC가 할당되지 않은 경우, 목록/상세 영역 대신 "Cloud PC 신청하기" 안내 메시지가 표시된다.

## Cloud PC 목록 — Swiper 캐러셀

할당된 PC 목록을 탭 형태로 표시한다. 각 탭에 PC 이름(별칭)이 보이며, 탭을 클릭하면 해당 PC의 상세 정보가 오른쪽에 표시된다.

```javascript
// HomePage.vue data
vpcLists: []          // 할당된 Cloud PC 배열
showVpc: {}           // 현재 선택된 PC 데이터
activeIndex: null     // 선택된 PC 인덱스
```

"PC 이름 및 순서 변경" 버튼으로 `VPcNameEditPopup`을 열어 별칭 수정(최대 20자)과 드래그 순서 변경이 가능하다.

## 데이터 로드 및 폴링

### 초기 로드

```
mounted()
  → syncAndClearBackupStorage()    // localStorage → sessionStorage 동기화
  → vpcPooling('first')           // 최초 로드 + 폴링 시작
```

### 폴링 구조

HomePage는 **10초 간격**으로 PC 목록을 폴링한다:

```
vpcPooling()
  → getVpcLists()
    → GET /v1/resource/vm-authorization
    → 응답을 sortOrder 기준 정렬
    → vpcLists 업데이트
    → 최초 로드 시 첫 번째 PC 자동 선택 (changeSlide(0))
  → 10초 후 vpcPooling() 재호출 (setInterval)
```

VpcInfo 컴포넌트도 별도로 **10초 간격** 전원 상태 폴링(`powerCheck()`)을 운영한다. `powerCheck()`는 상태를 가져온 뒤 `changeVpcInfo()`를 호출하는데, 이 메서드 안에서 리소스 사용량(`getStat()`)과 보안 정책(`getCertSecuInfo()`)도 함께 호출한다. 따라서 전원 폴링 중에는 4개 API가 10초마다 호출된다.

| 폴링 | API | 주기 | 위치 |
|------|-----|------|------|
| PC 목록 | `GET /v1/resource/vm-authorization` | 10초 | HomePage.vue |
| PC 상태 | `GET /v1/resource/vm-authorization/{id}` | 10초 | VpcInfo.vue `powerCheck()` |
| 리소스 사용량 | `GET /v1/management/dashboard/user/{id}/stat` | 10초 | VpcInfo.vue `getStat()` (powerCheck → changeVpcInfo에서 호출) |
| 보안 정책 | `GET /v1/operation/cert/secu/info/{policyId}` | 10초 | VpcInfo.vue `getCertSecuInfo()` (powerCheck → changeVpcInfo에서 호출) |

`beforeDestroy()`에서 PC 목록 폴링 타이머를 정리한다.

## 공지사항 롤링 — `HomeNotice.vue`

하단에 최근 공지사항 5건을 자동 스크롤로 표시한다.

```
GET /v1/system/notices?noti_tgt_grp_id={serv_grp_id}&sort=reg_ts&row_count=5
```

5초 간격으로 롤링 애니메이션이 동작하며, 클릭하면 공지사항 상세 페이지로 이동한다.

## PC 이름/순서 변경 — `VPcNameEditPopup.vue`

vuedraggable로 드래그 순서 변경, 인라인 편집으로 별칭 수정을 지원한다.

```
별칭 변경: PUT /v1/resource/vpcs/resources/{vmAuthorizationId}/user  body: { vm_als: '새 별칭' }
순서 변경: PUT /v1/resource/vpcs/resources/{vmAuthorizationId}/user  body: { sort_ord: 인덱스 }
```

## 에러 처리

PC 목록 API에서 `AGW-1008` / `AGW-1009` 에러가 오면 로그인이 제한된 계정으로 판단한다. sessionStorage를 정리하고(apiGateway, serv_grp_id, tnt_url_id는 보존) 에러 메시지를 저장한다.

API 명세:
- [vm-authorization](../../api/resource/vm-authorization/01-vm-authorization.md)
- [cert-policy](../../api/operation/cert/01-cert-policy.md)
- [notices](../../api/system/notices/01-notices.md)
- [vpcs-resources](../../api/resource/vpcs/01-vpcs-resources.md)
- `GET /v1/management/dashboard/user/{id}/stat` (미작성)
