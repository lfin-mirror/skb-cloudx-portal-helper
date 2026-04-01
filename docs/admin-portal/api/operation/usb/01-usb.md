# USB 정책 API

리소스 경로 기준: `/v1/operation/policies/usb`

---

## USB 정책 목록 조회

```
GET /v1/operation/policies/usb
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| keyword | string | N | 검색어 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | USB 정책 목록 |
| data[].usb_policy_id | string | USB 정책 ID |
| data[].usb_policy_name | string | USB 정책명 |
| data[].usb_policy_target_code | string | 정책 대상 코드 (`U006S` SA 기본 / `U006T` 테넌트) |
| data[].usb_policy_auth_code | string | USB 인증 코드 |
| data[].usb_policy_description | string | 정책 설명 |
| data[].usb_types | array | 적용된 USB 유형 목록 (미설정 시 `null`) |
| data[].usb_vendors | array | 적용된 USB 공급업체 목록 (미설정 시 `null`) |
| data[].tenant_id | string | 테넌트 ID |
| data[].reg_ts | string | 등록 일시 |
| data[].mod_ts | string | 수정 일시 |

**에러 코드**

| 코드 | 설명 |
|------|------|
| 400 | 잘못된 요청 파라미터 |
| 403 | 권한 없음 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbRedirection.vue` | 363 |
| `views/policy/VirtualPcAuthPolicySupadm.vue` | 1047 |
| `views/policy/VirtualPcNetworkPolicy.vue` | 1067 |
| `components/Modals/Policy/mixins/virtualPcPolicySetting.js` | 52 |
| `components/Modals/Policy/VirtualPcPolicySettingFor.vue` | 1038 |

---

## USB 정책 상세 조회

```
GET /v1/operation/policies/usb/{usb_policy_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usb_policy_id | string | Y | USB 정책 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbRedirectionDetail.vue` | 644 |

---

## USB 정책 생성

```
POST /v1/operation/policies/usb
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usb_policy_nm | string | Y | USB 정책명 |
| tnt_id | string | Y | 테넌트 ID |
| use_yn | string | N | 사용 여부 (`Y`/`N`) |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbRedirectionCreate.vue` | 463 |

---

## USB 정책 수정

```
PUT /v1/operation/policies/usb/{usb_policy_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usb_policy_id | string | Y | USB 정책 ID |

**Request Body** — 생성 바디와 동일

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbRedirectionDetail.vue` | 787 |

---

## USB 정책 삭제 (다중)

```
DELETE /v1/operation/policies/usb
```

**Request Body** — 삭제할 USB 정책 ID 목록 배열

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbRedirection.vue` | 456 |

---

## USB 정책 유형 추가

```
PUT /v1/operation/policies/usb/{usb_policy_id}/add_types
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usb_policy_id | string | Y | USB 정책 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| type_ids | array | Y | 추가할 USB 유형 ID 목록 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/components/UsbPolicyModal.vue` | 159 |

---

## USB 정책 유형 삭제

```
PUT /v1/operation/policies/usb/{usb_policy_id}/remove_types
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbRedirectionDetail.vue` | 1092 |

---

## USB 정책 공급업체 추가

```
PUT /v1/operation/policies/usb/{usb_policy_id}/add_vendors
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbRedirectionDetail.vue` | 954 |

---

## USB 정책 공급업체 삭제

```
PUT /v1/operation/policies/usb/{usb_policy_id}/remove_vendors
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbRedirectionDetail.vue` | 1129 |

---

## USB 정책 적용 VPC 목록 조회

```
GET /v1/operation/policies/usb/{usb_policy_id}/vpc_policies
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbRedirectionDetail.vue` | 996 |

---

## USB 정책 유형 목록 조회

```
GET /v1/operation/policies/usb/{usb_policy_id}/types
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbRedirectionDetail.vue` | 966 |
| `views/policy/UsbTypeDetail.vue` | 534 |

---

## USB 정책 공급업체 목록 조회

```
GET /v1/operation/policies/usb/{usb_policy_id}/vendors
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbRedirectionDetail.vue` | 978 |

---

## USB 유형 관리

### USB 유형 목록 조회

```
GET /v1/operation/policies/usb/types
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbType.vue` | 322 |
| `views/policy/components/UsbPolicyModal.vue` | 129 |

---

### USB 유형 상세 조회

```
GET /v1/operation/policies/usb/types/{usb_type_id}
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbTypeDetail.vue` | 342 |

---

### USB 유형 적용 정책 조회

```
GET /v1/operation/policies/usb/types/{usb_type_id}/usb_policies
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbTypeDetail.vue` | 421 |

---

### USB 유형 생성

```
POST /v1/operation/policies/usb/types
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| usb_type_nm | string | Y | USB 유형명 |
| tnt_id | string | Y | 테넌트 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbTypeCreate.vue` | 112 |

---

### USB 유형 수정

```
PUT /v1/operation/policies/usb/types/{usb_type_id}
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbTypeDetail.vue` | 510 |

---

### USB 유형 삭제 (다중)

```
DELETE /v1/operation/policies/usb/types
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbType.vue` | 411 |

---

## USB 공급업체 관리

### USB 공급업체 목록 조회

```
GET /v1/operation/policies/usb/vendors
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbVendor.vue` | 331 |
| `views/policy/UsbRedirectionDetail.vue` | 699 |
| `views/policy/UsbModelCreate.vue` | 133 |
| `views/policy/UsbModelDetail.vue` | 490 |
| `views/policy/UsbRedirectionCreate.vue` | 378 |

---

### USB 공급업체 상세 조회

```
GET /v1/operation/policies/usb/vendors/{usb_vendor_id}
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbVendorDetail.vue` | 418, 631 |
| `views/policy/UsbTypeDetail.vue` | 543 |

---

### USB 공급업체 적용 정책 조회

```
GET /v1/operation/policies/usb/vendors/{usb_vendor_id}/usb_policies
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbVendorDetail.vue` | 458 |

---

### USB 공급업체 모델 목록 조회

```
GET /v1/operation/policies/usb/vendors/{usb_vendor_id}/models
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbVendorDetail.vue` | 469 |
| `views/policy/UsbRedirectionCreate.vue` | 494 |
| `views/policy/UsbRedirectionDetail.vue` | 1022 |

---

### USB 공급업체 생성

```
POST /v1/operation/policies/usb/vendors
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| vendor_nm | string | Y | 공급업체명 |
| vendor_id_val | string | Y | USB Vendor ID 값 |
| tnt_id | string | Y | 테넌트 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbVendorCreate.vue` | 113 |

---

### USB 공급업체 수정

```
PUT /v1/operation/policies/usb/vendors/{usb_vendor_id}
PUT /v1/operation/policies/usb/vendors/{usb_vendor_id}  (삭제 전 확인용)
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbVendorDetail.vue` | 571, 608 |

---

### USB 공급업체 삭제 (다중)

```
DELETE /v1/operation/policies/usb/vendors
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbVendor.vue` | 434 |

---

## USB 모델 관리

### USB 모델 목록 조회

```
GET /v1/operation/policies/usb/models
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbModel.vue` | 352 |

---

### USB 모델 상세 조회

```
GET /v1/operation/policies/usb/models/{usb_model_id}
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbModelDetail.vue` | 437 |

---

### USB 모델 적용 정책 조회

```
GET /v1/operation/policies/usb/models/{usb_model_id}/usb_policies
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbModelDetail.vue` | 476 |

---

### USB 모델 생성

```
POST /v1/operation/policies/usb/models
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| model_nm | string | Y | 모델명 |
| usb_vendor_id | string | Y | 공급업체 ID |
| model_id_val | string | Y | USB Product ID 값 |
| tnt_id | string | Y | 테넌트 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbModelCreate.vue` | 162 |

---

### USB 모델 수정

```
PUT /v1/operation/policies/usb/models/{usb_model_id}
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbModelDetail.vue` | 580 |

---

### USB 모델 삭제 (다중)

```
DELETE /v1/operation/policies/usb/models
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UsbModel.vue` | 453 |

---

## SA/TA 차이

### UsbRedirection.vue — USB 연결 정책 목록

| 구분 | 파라미터 | 비고 |
|------|---------|------|
| SA | `usb_policy_target_code=U006S` | |
| TA | `usb_policy_target_code=U006T`, `tenant_id={tnt_id}` 추가 | |
| 공통 | `GET v1/operation/policies/usb` | 파라미터만 다름 |
