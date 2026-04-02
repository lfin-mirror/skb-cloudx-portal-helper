# URL 리디렉션 차단 정책 API

## 사용 화면
- [SW 제어 정책](../../화면/정책/05-SW%20제어%20정책.md)
- [가상 PC 정책](../../화면/정책/02-가상%20PC%20정책.md)

리소스 경로 기준: `/v1/operation/policy/url/rdrt/disallow`

---

## URL 차단 정책 목록 조회

```
GET /v1/operation/policy/url/rdrt/disallow/policy
```

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | URL 차단 정책 목록 |
| data[].url_rdrt_disallow_plcy_id | string | URL 리다이렉션 차단 정책 ID |
| data[].url_rdrt_disallow_plcy_nm | string | URL 리다이렉션 차단 정책명 |
| data[].tnt_id | string | 테넌트 ID |
| data[].tnt_nm | string | 테넌트명 |
| data[].dm_cnt | number | 등록된 도메인 수 |
| data[].reg_ts | string | 등록 일시 |
| data[].mod_ts | string | 수정 일시 |

**에러 코드**

| 코드 | 설명 |
|------|------|
| 403 | 권한 없음 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UrlRedirectionDisallow.vue` | 101 |
| `views/policy/VirtualPcAuthPolicySupadm.vue` | 813 |
| `views/policy/VirtualPcNetworkPolicy.vue` | 842 |
| `components/Modals/Policy/VirtualPcPolicySetting.vue` | 1114 |
| `components/Modals/Policy/VirtualPcPolicySettingFor.vue` | 1114 |
| `components/Modals/Policy/mixins/virtualPcPolicySetting.js` | 123 |

---

## URL 차단 정책 상세 조회

```
GET /v1/operation/policy/url/rdrt/disallow/policy/{url_disallow_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| url_disallow_id | string | Y | URL 차단 정책 ID |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| url_disallow_id | string | URL 차단 정책 ID |
| url_disallow_nm | string | URL 차단 정책명 |
| tnt_id | string | 테넌트 ID |
| url_list | array | 차단 URL 목록 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/mixins/urlRedirectionDisallowDetail.js` | 52 |
| `views/policy/VirtualPcAuthPolicySupadm.vue` | 1018 |
| `views/policy/VirtualPcNetworkPolicy.vue` | 1032 |
| `components/Modals/Policy/VirtualPcPolicySetting.vue` | 917 |
| `components/Modals/Policy/VirtualPcPolicySettingFor.vue` | 1002 |

---

## URL 차단 정책 생성

```
POST /v1/operation/policy/url/rdrt/disallow/policy
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| url_disallow_nm | string | Y | URL 차단 정책명 |
| tnt_id | string | Y | 테넌트 ID |
| url_list | array | N | 차단 URL 목록 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/UrlRedirectionUpload.vue` | 268 |
| `views/policy/mixins/urlRedirectionDisallowDetail.js` | 138, 158 |

---

## URL 차단 정책 수정

```
PUT /v1/operation/policy/url/rdrt/disallow/policy/{url_disallow_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| url_disallow_id | string | Y | URL 차단 정책 ID |

**Request Body** — 생성 바디와 동일

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/mixins/urlRedirectionDisallowDetail.js` | 138, 158 |

---

## URL 차단 정책 삭제

```
DELETE /v1/operation/policy/url/rdrt/disallow/policy/{url_disallow_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| url_disallow_id | string | Y | URL 차단 정책 ID |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/mixins/urlRedirectionDisallowDetail.js` | 104 |
