---
type: screen
menu_id: [T0303]
title: VOC 내역
status: stable
version: v2.2.9
portal: admin
path: /user-support/vos-histories
component: VosHistories.vue
access: [TA]
related_menus: [T0302]
api_endpoints:
  - GET /v1/system/voc/adv
  - GET /v1/system/voc/adv/{id}
  - POST /v1/system/voc/adv
  - DELETE /v1/system/voc/adv/{id}
---

# VOC 내역 (T0303)

- 경로: `/user-support/vos-histories`
- 컴포넌트: `VosHistories.vue`
- 상세: `VosHistoriesDetail.vue`

VOC(Voice of Customer) — 사용자 의견/건의/불만을 TA가 기록·관리하는 메뉴.

## UI 레이아웃

좌측 폼(8칸) + 우측 리스트(16칸) 2단 구조. 행 클릭 시 좌측에 상세 폼, 하단에 `등록` 버튼.

### 필터

| 필터 | 필드 | 설명 |
|------|------|------|
| VOC 유형 | `voc_adv_typ_cd` | VOC 분류 코드 |

검색 조건: VOC 제목(`title`) + 생성자 ID(`reg_conn_id`)

### 테이블 컬럼

| 컬럼 | 필드 | 설명 |
|------|------|------|
| No. | `voc_adv_wrt_no` | 일련번호 |
| VOC 유형 | `voc_adv_typ_cd_nm` | 코드명 |
| 제목 | `title` | — |
| VOC 접수일 | `adv_reg_tm` | — |
| 생성자 | `reg_conn_id` | — |
| 생성일시 | `reg_ts` | — |

## 업무 처리 요청(T0302)과의 차이

| 항목 | 업무 처리 요청 (T0302) | VOC 내역 (T0303) |
|------|----------------------|-----------------|
| 발생 주체 | 사용자가 user-portal에서 신청 | TA가 admin-portal에서 직접 등록 |
| 데이터 흐름 | user-portal → admin-portal | admin-portal 내부 |
| 상태 관리 | 신청→승인/반려 워크플로우 | 단순 CRUD (등록/조회/수정/삭제) |
| 용도 | VM 자원·정책·장애 등 공식 요청 | 고객 의견·건의·불만 등 비정형 기록 |

## user-portal VOC 등록 기능 (추측)

현재 user-portal에는 VOC 등록 화면이 **없음** — 라우트, 뷰 컴포넌트 모두 미구현. 그러나 i18n 번역 파일(`user-portal/src/lang/menus/ko/page.js`)에 다음 키가 남아있음:

```
vocDetail: '상담 내역 상세'
vocRegist: '상담 내역 등록'
vocTitle:  '상담 제목'
vocType:   '상담 유형'
vocDate:   '상담 일시'
vocDesc:   '상담 내용'
```

user-portal에서도 사용자가 직접 VOC를 등록하는 기능을 **계획했지만 구현하지 않은 것으로 추측**. 현재는 TA가 전화/메일 등으로 접수한 내용을 admin-portal에서 대리 등록하는 방식으로 운영 중인 것으로 보임.

## API

| 동작 | API | 명세 |
|------|-----|------|
| 목록 | `GET /v1/system/voc/adv` | [명세](../../api/system/voc/01-voc.md) |
| 상세 | `GET /v1/system/voc/adv/{id}` | [명세](../../api/system/voc/01-voc.md) |
| 생성/수정 | `POST /v1/system/voc/adv` | [명세](../../api/system/voc/01-voc.md) |
| 삭제 | `DELETE /v1/system/voc/adv/{id}` | [명세](../../api/system/voc/01-voc.md) |

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|---------|
| v1.0 | 2026-03-31 | 최초 작성 |
