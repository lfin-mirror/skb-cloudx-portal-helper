# 외부 연동 인터페이스 API

리소스 경로 기준: `/v1/operation/outs/interfaces`

---

## 외부 연동 목록 조회

```
GET /v1/operation/outs/interfaces
```

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | 외부 연동 인터페이스 목록 |
| data[].ext_itlk_div_cd | string | 외부 연동 구분 코드 |
| data[].ext_itlk_nm | string | 외부 연동명 |
| data[].use_yn | string | 사용 여부 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/adminSetting/subAdminSettingManage.vue` | 274 |

---

## 이메일 연동 설정 조회

```
GET /v1/operation/outs/interfaces/email
```

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| smtp_host | string | SMTP 호스트 |
| smtp_port | number | SMTP 포트 |
| smtp_user | string | SMTP 사용자 |
| from_addr | string | 발신 이메일 주소 |
| use_yn | string | 사용 여부 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/systemResource/EmailManage.vue` | 235 |
| `views/service/ExternalLink/ExternalLinkEmail.vue` | 255 |

---

## 이메일 연동 설정 수정

```
PUT /v1/operation/outs/interfaces/email
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| smtp_host | string | Y | SMTP 호스트 |
| smtp_port | number | Y | SMTP 포트 |
| smtp_user | string | N | SMTP 사용자 |
| smtp_pw | string | N | SMTP 비밀번호 |
| from_addr | string | Y | 발신 이메일 주소 |
| use_yn | string | N | 사용 여부 (`Y`/`N`) |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/systemResource/EmailManage.vue` | 262 |
| `views/service/ExternalLink/ExternalLinkEmail.vue` | 286 |

---

## 네트워크 스토리지 연동 설정 조회

```
GET /v1/operation/outs/interfaces/netapp
```

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| netapp_host | string | Netapp 호스트 |
| netapp_port | number | Netapp 포트 |
| netapp_user | string | Netapp 사용자 |
| use_yn | string | 사용 여부 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/service/ExternalLink/ExternalLinkNetworkStorage.vue` | 231 |

---

## 네트워크 스토리지 연동 설정 수정

```
PUT /v1/operation/outs/interfaces/netapp
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| netapp_host | string | Y | Netapp 호스트 |
| netapp_port | number | Y | Netapp 포트 |
| netapp_user | string | Y | Netapp 사용자 |
| netapp_pw | string | N | Netapp 비밀번호 |
| use_yn | string | N | 사용 여부 (`Y`/`N`) |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/service/ExternalLink/ExternalLinkNetworkStorage.vue` | 256 |

---

## AD 연동 설정 조회

```
GET /v1/operation/outs/interfaces/usr
```

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| ad_host | string | AD 서버 호스트 |
| ad_port | number | AD 서버 포트 |
| ad_domain | string | AD 도메인 |
| base_dn | string | Base DN |
| use_yn | string | 사용 여부 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/service/ExternalLink/ExternalLinkAdLinkage.vue` | 650 |
| `views/virtualPc/VirtualPcPoolCreate.vue` | 840 |

---

## AD 연동 설정 수정

```
PUT /v1/operation/outs/interfaces/usr
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| ad_host | string | Y | AD 서버 호스트 |
| ad_port | number | Y | AD 서버 포트 |
| ad_domain | string | Y | AD 도메인 |
| base_dn | string | Y | Base DN |
| bind_dn | string | N | Bind DN |
| bind_pw | string | N | Bind 비밀번호 |
| use_yn | string | N | 사용 여부 (`Y`/`N`) |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/service/ExternalLink/ExternalLinkAdLinkage.vue` | 710 |

---

## Octatco 연동 설정 조회

```
GET /v1/operation/outs/interfaces/octatco
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/service/ExternalLink/ExternalLinkOctatco.vue` | 175 |

---

## Octatco 연동 설정 수정

```
PUT /v1/operation/outs/interfaces/octatco
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/service/ExternalLink/ExternalLinkOctatco.vue` | 201 |

---

## 외부 연동 설정 조회 (공통 — 구버전)

```
GET /v1/operation/outs/interfaces/{ext_itlk_div_cd}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| ext_itlk_div_cd | string | Y | 외부 연동 구분 코드 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/service/ExternalLinkEmail.vue` | 168 |
| `views/service/ExternalLinkNetworkStorage.vue` | 180 |

---

## 외부 연동 설정 수정 (공통 — 구버전)

```
PUT /v1/operation/outs/interfaces/{ext_itlk_div_cd}
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/service/ExternalLinkEmail.vue` | 193 |
| `views/service/ExternalLinkNetworkStorage.vue` | 205 |

---

## 시스템 라이선스 조회

```
GET /v1/operation/system/license
```

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| version | string | 시스템 버전 (예: v.2.2.9) |
| license_valid_period | string | 라이선스 유효 기간 (예: 2024.01.01~2026.12.31) |
| quantity_virtual_pc | string | 라이선스 가상PC 수량 |
| contact | string | 라이선스 문의 이메일 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/adminSetting/SystemLicense.vue` | 78 |
| `views/policy/UserAuthPolicySupadm.vue` | 737 |

---

## 스토리지 스케줄 정책

### 스토리지 스케줄 조회

```
GET /v1/operation/policy/storage/sched/
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/tenant/IndexDetail.vue` | 1620, 1705 |

---

### 스토리지 스케줄 등록

```
POST /v1/operation/policy/storage/sched
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/tenant/IndexDetail.vue` | 1636 |

---

## VM 접속 로그 조회

```
GET /v1/operation/log/vm/vm
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| vm_id | string | N | VM ID |
| tnt_id | string | N | 테넌트 ID |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/virtualPc/VirtualPcConnet.vue` | 391 |
