# 보안 인증서 API

## 사용 화면
- [보안 인증서](../../화면/서비스/01-보안%20인증서.md)

리소스 경로 기준: `/v1/operation/secu/cert`

Kubernetes/OpenStack/CloudPC 클러스터의 TLS 인증서(CA, 서버) 목록 조회 및 만료 알림 이력 관리.

---

## CA 인증서 목록 조회

```
GET /v1/operation/secu/cert/list/{type}/ca
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| type | string | Y | 조회 유형 (`all` 전체 / `infra` 인프라(kubernetes+openstack) / `cloudpc` CloudPC / `domain` 도메인 / `spice` SPICE) |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | CA 인증서 목록 |
| data[].ca_typ_cd | string | 인증서 유형 코드 (`M006PV` Private / `M006PB` Public) |
| data[].secret_name | string | K8s Secret 이름 |
| data[].namespace | string | K8s Namespace (`kubernetes` / `openstack` / `cloudpc`) |
| data[].version | string | 인증서 버전 |
| data[].serial_number | string | 시리얼 번호 |
| data[].signature_algorithm | string | 서명 알고리즘 (`SHA256withRSA` 등) |
| data[].issuer | string | 발급자 DN |
| data[].subject | string | 주체 DN |
| data[].valid_start | string | 유효 시작일 |
| data[].valid_end | string | 유효 종료일 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/service/securityCertificate/SecurityCertificateHistories.vue` | 267 |

---

## 서버 인증서 목록 조회

```
GET /v1/operation/secu/cert/list/{type}/server
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| type | string | Y | 조회 유형 (`all` 전체 / `infra` 인프라(kubernetes+openstack) / `cloudpc` CloudPC / `domain` 도메인 / `spice` SPICE) |

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답** — CA 인증서 목록과 동일 구조

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/service/securityCertificate/SecurityCertificateHistories.vue` | 285 |

---

## 인증서 만료 알림 이력 조회

```
GET /v1/operation/secu/cert/infm
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | 알림 이력 목록 |
| data[].scert_infm_no | string | 알림 번호 |
| data[].infm_tm | string | 알림 일시 |
| data[].infm_typ_cd | string | 알림 유형 코드 (`M00530M` 30일 / `M00560M` 60일) |
| data[].infm_typ_cd_nm | string | 알림 유형명 |
| data[].scert_typ_cd | string | 인증서 유형 코드 (`M006CA` / `M006SV`) |
| data[].scert_typ_cd_nm | string | 인증서 유형명 |
| data[].host_id | string | 호스트 IP |
| data[].host_nm | string | 호스트명 |
| data[].vlid_stt_dt | string | 인증서 유효 시작일 |
| data[].vlid_end_dt | string | 인증서 유효 종료일 |
| data[].scert_ver | string | 인증서 버전 |
| data[].isur_nm | string | 발급자 DN |
| data[].reg_id | string | 등록자 (`scheduler`) |
| data[].reg_ts | string | 등록 일시 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/service/securityCertificate/ExpirationDateHistories.vue` | 196 |

---

## 인증서 다운로드

```
GET /v1/operation/secu/cert/download/{type}
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/service/securityCertificate/SecurityCertificateHistories.vue` | 349 |

---

## 인증서 업로드

```
POST /v1/operation/secu/cert/create
```

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/service/securityCertificate/SecurityCertificateUpload.vue` | 262 |

---

## 관련 공통코드

| 코드 그룹 | 설명 | 값 |
|-----------|------|-----|
| M006 | 보안인증서 유형 | `M006CA` CA 인증서, `M006SV` 서버 인증서 |
| M005 | 알림 유형 | `M00530M` 30일 알림(e-mail), `M00560M` 60일 알림(e-mail) |
