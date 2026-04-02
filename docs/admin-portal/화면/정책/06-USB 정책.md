---
type: screen
title: USB 정책
menu_id: [A050609, T050609, A05060901, T05060901, A05060902, T05060902, A05060903, T05060903, A05060904, T05060904]
status: stable
version: v2.2.9
portal: admin
path: /policy/policy-manage/usb-policy/usb-policy
access: [SA, TA]
related_menus: [A0503, T0503]
api_endpoints:
  - GET /v1/operation/policies/usb
  - GET /v1/operation/policies/usb/{id}
  - POST /v1/operation/policies/usb
  - PUT /v1/operation/policies/usb/{id}
  - DELETE /v1/operation/policies/usb
  - GET /v1/operation/policies/usb/types
  - POST /v1/operation/policies/usb/types
  - PUT /v1/operation/policies/usb/types/{id}
  - DELETE /v1/operation/policies/usb/types
  - GET /v1/operation/policies/usb/vendors
  - POST /v1/operation/policies/usb/vendors
  - PUT /v1/operation/policies/usb/vendors/{id}
  - DELETE /v1/operation/policies/usb/vendors
  - GET /v1/operation/policies/usb/models
  - POST /v1/operation/policies/usb/models
  - DELETE /v1/operation/policies/usb/models
---

# USB 정책 (A050609, T050609)

상세 정책(A0506) > USB 정책 하위 4개 메뉴를 통합 정리.

## 4개 메뉴 구조

```
USB 정책 (A050609)
├── USB 정책 (A05060901)    ← 정책 CRUD (어떤 USB를 허용/차단할지)
├── USB 유형 (A05060902)    ← USB 디바이스 유형 마스터 데이터
├── USB 제조사 (A05060903)  ← USB 벤더 마스터 데이터
└── USB 모델 (A05060904)    ← USB 모델 마스터 데이터 (벤더 하위)
```

### 역할 분담

```
유형/제조사/모델 = 마스터 데이터 (어떤 USB 장치가 있는지)
USB 정책       = 위 마스터 데이터를 참조해 "이 장치는 허용, 저 장치는 차단" 규칙 생성
                  → 가상 PC 정책(A0503)에서 이 USB 정책을 선택하여 VM에 적용
```

---

## USB 정책 (A05060901)

- 경로: `/policy/policy-manage/usb-policy/usb-policy`
- 컴포넌트: `UsbRedirection.vue`

VM에 연결 가능한 USB 장치를 제어하는 정책 CRUD.

### UI 레이아웃

Split Panel (좌우 분할). 좌측 검색+리스트, 우측 상세. 행 클릭 시 우측에 상세 패널 표시 (sm/md/lg 크기 조절).

### 테이블 컬럼

| 컬럼 | 필드 |
|------|------|
| 체크박스 | 다중 선택 (삭제용) |
| 정책명 | `usb_policy_name` |
| 설명 | `usb_policy_description` |
| 생성자 | `reg_conn_id` |
| 생성일시 | `reg_ts` |
| 수정자 | `mod_conn_id` |
| 수정일시 | `mod_ts` |

### SA vs TA 차이

| 항목 | 세부 항목 | SA | TA |
|------|----------|----|----|
| 대상 코드 | `usb_policy_target_code` | `U006S` | `U006T` |
| UI 구조 | — | 동일 (목록 + 상세) | 동일 (목록 + 상세) |
| 정책 등록 | — | 가능 | 가능 |
| 정책 수정 | — | 가능 | 가능 |
| 정책 삭제 | — | 가능 (다중 선택) | 가능 (다중 선택) |

SA/TA 동일한 CRUD 구조. API 호출 시 `usb_policy_target_code` 파라미터로만 구분.

### 버튼 동작 (USB 정책 4종 공통 패턴)

| 버튼 | 클릭 시 동작 |
|------|------------|
| **등록** | 빈 상세 폼 표시 → 저장 시 `POST` |
| **저장** (등록) | 유효성 검사 → `POST` API |
| **저장** (수정) | 유효성 검사 → `PUT` API |
| **삭제** | 확인 팝업 → `DELETE` API. 다중 선택 삭제 지원 |

### API

| 동작 | API | 명세 |
|------|-----|------|
| 목록 | `GET /v1/operation/policies/usb` | [명세](../../api/operation/usb/01-usb.md) |
| 상세 | `GET /v1/operation/policies/usb/{id}` | [명세](../../api/operation/usb/01-usb.md) |
| 생성 | `POST /v1/operation/policies/usb` | [명세](../../api/operation/usb/01-usb.md) |
| 수정 | `PUT /v1/operation/policies/usb/{id}` | [명세](../../api/operation/usb/01-usb.md) |
| 삭제 | `DELETE /v1/operation/policies/usb` (배열: `usb_policy_ids`) | [명세](../../api/operation/usb/01-usb.md) |

삭제는 다중 선택 후 일괄 삭제. 요청 body에 `usb_policy_ids` 배열 전달.

---

## USB 유형 (A05060902)

- 경로: `/policy/policy-manage/usb-policy/usb-type`
- 컴포넌트: `UsbType.vue`

USB 디바이스의 **기능 분류** 마스터 데이터. USB-IF(USB Implementers Forum)에서 정의한 Class Code 기반.

### 개념

USB 장치는 기능에 따라 Class Code가 부여됨. 예:

| `usb_type_base` (코드) | `usb_type_meaning` (유형명) | 실제 장치 예시 |
|------------------------|---------------------------|--------------|
| `01` | Audio | 헤드셋, 마이크, 스피커 |
| `03` | HID (Human Interface Device) | 키보드, 마우스, 게임패드 |
| `06` | Still Image | 스캐너, 디지털 카메라 |
| `07` | Printer | 프린터 |
| `08` | Mass Storage | USB 메모리, 외장 하드 |
| `0E` | Video | 웹캠 |
| `E0` | Wireless Controller | 블루투스 동글 |

USB 정책(A05060901) 생성 시, 이 유형 코드를 기준으로 "Mass Storage 유형 전체 차단" 같은 규칙 설정 가능.

### UI 레이아웃

Split Panel (상하 분할). 상단 검색+리스트, 하단 상세. 체크박스 다중 선택 → 일괄 삭제 지원.

### 테이블 컬럼

| 컬럼 | 필드 | 설명 |
|------|------|------|
| 유형 코드 | `usb_type_base` | USB Class Code (16진수) |
| 유형명 | `usb_type_meaning` | 코드에 대응하는 이름 |
| 생성자 | `reg_conn_id` | — |
| 생성일시 | `reg_ts` | — |

### 검색

`usb_type_base` 필드로 검색 (검색 유형 코드: `type: 'usb_type_base'`).

### API

| 동작 | API | 명세 |
|------|-----|------|
| 목록 | `GET /v1/operation/policies/usb/types` | [명세](../../api/operation/usb/01-usb.md) |
| 생성 | `POST /v1/operation/policies/usb/types` | [명세](../../api/operation/usb/01-usb.md) |
| 수정 | `PUT /v1/operation/policies/usb/types/{id}` | [명세](../../api/operation/usb/01-usb.md) |
| 삭제 | `DELETE /v1/operation/policies/usb/types` (배열: 다중 삭제) | [명세](../../api/operation/usb/01-usb.md) |

---

## USB 제조사 (A05060903)

- 경로: `/policy/policy-manage/usb-policy/usb-vendor`
- 컴포넌트: `UsbVendor.vue`

USB 장치 **제조사(Vendor)** 마스터 데이터. USB-IF가 부여하는 Vendor ID 기반.

### 개념

모든 USB 장치는 제조사를 식별하는 고유 Vendor ID(16비트)를 가짐. 예:

| `usb_vendor_uid` | `usb_vendor_name` |
|------------------|--------------------|
| `046D` | Logitech |
| `04E8` | Samsung Electronics |
| `8087` | Intel Corp |
| `05AC` | Apple Inc. |

USB 정책 생성 시 "Logitech 제조사 장치만 허용" 같은 벤더 단위 규칙 설정 가능.

### UI 레이아웃

Split Panel (상하 분할). USB 유형과 동일한 구조. 체크박스 다중 선택 → 일괄 삭제 지원.

### 테이블 컬럼

| 컬럼 | 필드 | 설명 |
|------|------|------|
| 제조사 ID | `usb_vendor_uid` | Vendor ID (16진수) |
| 제조사명 | `usb_vendor_name` | 벤더 이름 |
| 설명 | `usb_vendor_description` | 메모 |
| 생성자 | `reg_conn_id` | — |
| 생성일시 | `reg_ts` | — |

### API

| 동작 | API | 명세 |
|------|-----|------|
| 목록 | `GET /v1/operation/policies/usb/vendors` | [명세](../../api/operation/usb/01-usb.md) |
| 생성 | `POST /v1/operation/policies/usb/vendors` | [명세](../../api/operation/usb/01-usb.md) |
| 수정 | `PUT /v1/operation/policies/usb/vendors/{id}` | [명세](../../api/operation/usb/01-usb.md) |
| 삭제 | `DELETE /v1/operation/policies/usb/vendors` (배열: 다중 삭제) | [명세](../../api/operation/usb/01-usb.md) |

---

## USB 모델 (A05060904)

- 경로: `/policy/policy-manage/usb-policy/usb-model`
- 컴포넌트: `UsbModel.vue`

특정 제조사(Vendor) 하위의 **개별 제품(Product)** 마스터 데이터. USB 장치의 Product ID 기반.

### 개념

USB 장치는 Vendor ID + Product ID 조합으로 고유 식별됨. 예:

| `usb_vendor_uid` | `usb_vendor_name` | `usb_model_uid` | `usb_model_name` |
|------------------|--------------------|-----------------|--------------------|
| `046D` | Logitech | `C52B` | Unifying Receiver |
| `046D` | Logitech | `C077` | M105 Mouse |
| `04E8` | Samsung | `61F5` | T7 Portable SSD |

제조사 단위보다 세밀한 제어가 필요할 때 사용. "Samsung T7만 차단하고 다른 Samsung 장치는 허용" 같은 모델 단위 규칙.

### 3단계 계층 관계

```
USB 유형 (Class Code)
  └── USB 제조사 (Vendor ID)
        └── USB 모델 (Product ID)    ← 가장 세밀한 단위

예: Mass Storage (08) > Samsung (04E8) > T7 SSD (61F5)
```

USB 정책 생성 시 유형·제조사·모델 중 원하는 수준으로 규칙 적용 가능:
- 유형 단위: "Mass Storage 전체 차단"
- 제조사 단위: "Samsung 장치 전체 차단"
- 모델 단위: "Samsung T7만 차단"

### UI 레이아웃

Split Panel (상하 분할). 제조사를 먼저 선택해야 해당 제조사의 모델 리스트가 표시되는 구조. 체크박스 다중 선택 → 일괄 삭제 지원.

### 테이블 컬럼

| 컬럼 | 필드 | 설명 |
|------|------|------|
| 제조사 ID | `usb_vendor_uid` | 상위 Vendor ID |
| 제조사명 | `usb_vendor_name` | 상위 Vendor 이름 |
| 모델 ID | `usb_model_uid` | Product ID (16진수) |
| 모델명 | `usb_model_name` | 제품 이름 |
| 설명 | `usb_model_description` | 메모 |
| 생성자 | `reg_conn_id` | — |
| 생성일시 | `reg_ts` | — |

### API

| 동작 | API | 명세 |
|------|-----|------|
| 목록 | `GET /v1/operation/policies/usb/models` | [명세](../../api/operation/usb/01-usb.md) |
| 생성 | `POST /v1/operation/policies/usb/models` | [명세](../../api/operation/usb/01-usb.md) |
| 삭제 | `DELETE /v1/operation/policies/usb/models` (배열: 다중 삭제) | [명세](../../api/operation/usb/01-usb.md) |

---

## USB 정책 적용 흐름

```
1. [SA] USB 유형/제조사/모델 마스터 데이터 등록
     예: 유형=Storage, 제조사=Samsung, 모델=T7

2. [SA/TA] USB 정책 생성
     예: "USB 스토리지 차단" 정책 → Storage 유형 전체 차단

3. [TA] 가상 PC 정책(A0503)에서 USB 정책 선택
     → VM에 적용

4. VM에서 USB 장치 연결 시
     → 정책 검사 → 허용/차단 판단
```

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|---------|
| v1.1 | 2026-04-01 | 버튼 동작 상세 추가 |
| v1.0 | 2026-03-31 | 최초 작성 |
