# 네트워크 정책 API

## 사용 화면
- (화면 문서 미작성)

리소스 경로 기준: `/v1/operation/policys/lnet`

---

## 네트워크 정책 목록 조회

```
GET /v1/operation/policys/lnet
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
| data | array | 네트워크 정책 목록 |
| data[].sbn_id | string | 서브넷 ID (PK) |
| data[].sbn_nm | string | 서브넷명 |
| data[].tnt_id | string | 테넌트 ID |
| data[].ip_range | string | IP 범위 |
| data[].use_yn | string | 사용 여부 |

**에러 코드**

| 코드 | 설명 |
|------|------|
| 400 | 잘못된 요청 파라미터 |
| 403 | 권한 없음 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/NetworkPolicyManage.vue` | 152 |

---

## 네트워크 정책 상세 조회

```
GET /v1/operation/policys/lnet/{sbn_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| sbn_id | string | Y | 서브넷 ID |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| sbn_id | string | 서브넷 ID |
| sbn_nm | string | 서브넷명 |
| tnt_id | string | 테넌트 ID |
| ip_range | string | IP 범위 |
| gateway | string | 게이트웨이 |
| use_yn | string | 사용 여부 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/NetworkPolicyManageDetail.vue` | 168 |

---

## 네트워크 정책 생성

```
POST /v1/operation/policys/lnet
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| sbn_nm | string | Y | 서브넷명 |
| tnt_id | string | Y | 테넌트 ID |
| ip_range | string | Y | IP 범위 (CIDR) |
| gateway | string | N | 게이트웨이 IP |
| use_yn | string | N | 사용 여부 (`Y`/`N`) |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/NetworkPolicyManageCreate.vue` | 147 |

---

## 네트워크 정책 수정

```
PUT /v1/operation/policys/lnet/{sbn_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| sbn_id | string | Y | 서브넷 ID |

**Request Body** — 생성 바디와 동일

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/NetworkPolicyManageDetail.vue` | 199 |

---

## 네트워크 정책 삭제

```
DELETE /v1/operation/policys/lnet/{sbn_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| sbn_id | string | Y | 서브넷 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/NetworkPolicyManageDetail.vue` | 234 |
