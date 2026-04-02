# 외부 연동 인터페이스 API

## 사용 화면
- [서비스 (접근 통제/외부 연동/Push 메시지)](../../화면/서비스/02-서비스.md)
- [Proxy-이메일](../../화면/시스템%20자원/05-Proxy-이메일.md)

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
| data[].tnt_id | string | 테넌트 ID |
| data[].linkage_type_cd | string | 연동 유형 코드 |
| data[].linkage_type_cd_nm | string | 연동 유형 코드명 |
| data[].ad_itlk_usg_yn | string | AD 연동 사용 여부 |
| data[].shar_str_usg_yn | string | 공유 스토리지 사용 여부 |
| data[].reg_conn_id | string | 등록자 접속 ID |
| data[].reg_id | string | 등록자 ID |
| data[].reg_ts | string | 등록 일시 |
| data[].mod_conn_id | string | 수정자 접속 ID |
| data[].mod_id | string | 수정자 ID |
| data[].mod_ts | string | 수정 일시 |

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
| linkage_type_cd | string | 연동 유형 코드 |
| linkage_type_cd_nm | string | 연동 유형 코드명 |
| tnt_id | string | 테넌트 ID |
| smtp_host | string | SMTP 호스트 |
| smtp_port | number | SMTP 포트 |
| from_mail | string | 발신 이메일 주소 |
| use_yn | string | 사용 여부 |
| passwd_cryptval | string | 비밀번호 암호화 값 |
| protocol_type | string | 프로토콜 유형 |
| descp | string | 설명 |
| reg_conn_id | string | 등록자 접속 ID |
| reg_id | string | 등록자 ID |
| reg_ts | string | 등록 일시 |
| mod_conn_id | string | 수정자 접속 ID |
| mod_id | string | 수정자 ID |
| mod_ts | string | 수정 일시 |

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
| passwd_cryptval | string | N | 비밀번호 암호화 값 |
| from_mail | string | Y | 발신 이메일 주소 |
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
| linkage_type_cd | string | 연동 유형 코드 |
| linkage_type_cd_nm | string | 연동 유형 코드명 |
| tnt_id | string | 테넌트 ID |
| ip | string | Netapp 호스트 IP |
| port | number | Netapp 포트 |
| cert_id | string | 인증 ID |
| cert_passwd_cryptval | string | 인증 비밀번호 암호화 값 |
| grp_fold_cre_size | string | 그룹 폴더 생성 크기 |
| descp | string | 설명 |
| ad_itlk_usg_yn | string | AD 연동 사용 여부 |
| shar_str_usg_yn | string | 공유 스토리지 사용 여부 |
| reg_id | string | 등록자 ID |
| reg_ts | string | 등록 일시 |
| mod_id | string | 수정자 ID |
| mod_ts | string | 수정 일시 |

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
| ip | string | Y | Netapp 호스트 IP |
| port | number | Y | Netapp 포트 |
| cert_id | string | Y | 인증 ID |
| cert_passwd_cryptval | string | N | 인증 비밀번호 암호화 값 |

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
| linkage_type_cd | string | 연동 유형 코드 |
| linkage_type_cd_nm | string | 연동 유형 코드명 |
| tnt_id | string | 테넌트 ID |
| ad_ip | string | AD 서버 IP |
| ad_port | number | AD 서버 포트 |
| ad_dm | string | AD 도메인 |
| ad_base | string | AD Base DN |
| ad_itlk_usg_yn | string | AD 연동 사용 여부 |
| ad_cert_id | string | AD 인증 ID |
| ad_cert_passwd_cryptval | string | AD 인증 비밀번호 암호화 값 |
| ad_vdi_ou | string | AD VDI OU |
| ad_base_dept_ou | string | AD 부서 기본 OU |
| ad_base_usr_ou | string | AD 사용자 기본 OU |
| ad_cert_info | string | AD 인증서 정보 |
| ad_cert_info_yn | string | AD 인증서 정보 사용 여부 |
| ad_cert_file_nm | string | AD 인증서 파일명 |
| ad_itlk_descp | string | AD 연동 설명 |
| shar_str_usg_yn | string | 공유 스토리지 사용 여부 |
| info_reg_allow_yn | string | 정보 등록 허용 여부 |
| ad_itlk_mod_id | string | AD 연동 수정자 ID |
| ad_itlk_mod_ts | string | AD 연동 수정 일시 |
| reg_id | string | 등록자 ID |
| reg_ts | string | 등록 일시 |

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
| ad_ip | string | Y | AD 서버 IP |
| ad_port | number | Y | AD 서버 포트 |
| ad_dm | string | Y | AD 도메인 |
| ad_base | string | Y | AD Base DN |
| ad_cert_id | string | N | AD 인증 ID |
| ad_cert_passwd_cryptval | string | N | AD 인증 비밀번호 암호화 값 |
| ad_itlk_usg_yn | string | N | AD 연동 사용 여부 (`Y`/`N`) |

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

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | VM 접속 로그 목록 |
| data[].vm_auth_id | string | VM 인증 ID |
| data[].acct_conn_id | string | 계정 로그인 ID (마스킹) |
| data[].acct_nm | string | 계정명 (마스킹) |
| data[].vm_nm | string | VM명 |
| data[].vm_pool_nm | string | 풀명 |
| data[].puc_ts | string\|null | 프로토콜 접속 시작 일시 |
| data[].pud_ts | string\|null | 프로토콜 접속 종료 일시 |
| data[].tuc_ts | string\|null | 터널 접속 시작 일시 |
| data[].tud_ts | string\|null | 터널 접속 종료 일시 |
| data[].iuc_ts | string\|null | 내부 접속 시작 일시 |
| data[].iud_ts | string\|null | 내부 접속 종료 일시 |
| data[].auc_ts | string\|null | 관리자 접속 시작 일시 |
| data[].aud_ts | string\|null | 관리자 접속 종료 일시 |
| errCode | string\|null | 에러 코드 |
| errMsg | string\|null | 에러 메시지 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/virtualPc/VirtualPcConnet.vue` | 391 |
