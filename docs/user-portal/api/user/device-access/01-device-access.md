# 단말 접속 정보 API

## 사용 화면
- [단말 접속 관리](../../../vpcinfo/07-device-access.md)

## GET `/v1/user/device-access/{acctId}/identifier-info`

승인된 단말 접속 정보(식별자) 목록 조회. 단말 접속 정보 현황 페이지에서 사용한다.

### 요청

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acctId | string | Y | 계정 ID (sessionStorage `acct_id`) |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | 단말 식별 정보 목록 |
| data[].acct_dvc_ident_id | string | 단말 식별 ID (삭제 DELETE에 사용) |
| data[].clnt_dvc_type | string | 클라이언트 종류 (예: Windows, Linux, iOS) |
| data[].dvc_nm | string | 단말 이름 |
| data[].dvc_id | string | 단말 ID |
| data[].mac_addr | string | MAC 주소 |
| data[].ip_addr | string | IP 주소 |

### 호출 위치

- `views/vPcInfo/DeviceAccList.vue:126` — 단말 접속 정보 현황 페이지 진입 시 조회

---

## DELETE `/v1/user/device-access/{acctDvcIdentId}/identifier-info`

승인된 단말 식별 정보 삭제.

### 요청

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acctDvcIdentId | string | Y | 단말 식별 ID (`acct_dvc_ident_id`) |

### 응답

HTTP 200 성공 시 응답 본문 없음.

### 호출 위치

- `views/vPcInfo/DeviceAccList.vue:163` — 단말 접속 정보 현황 페이지 삭제 버튼 클릭 시

---

## GET `/v1/user/device-access/{acctId}/hist`

단말 접속 이력 목록 조회. 단말 등록 요청 팝업에서 미등록 단말 선택 목록으로 사용한다.

### 요청

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acctId | string | Y | 계정 ID (sessionStorage `acct_id`) |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | 단말 접속 이력 목록 |
| data[].acct_dvc_ident_hist_id | string | 단말 식별 이력 ID (비활성화 PUT에 사용) |
| data[].clnt_dvc_type | string | 클라이언트 종류 |
| data[].dvc_nm | string | 단말 이름 |
| data[].dvc_id | string | 단말 ID |
| data[].mac_addr | string | MAC 주소 |
| data[].ip_addr | string | IP 주소 |
| pageinfo | object | 페이지 정보 |
| pageinfo.count | number | 전체 이력 건수 |

### 호출 위치

- `views/vPcInfo/DeviceAccReq.vue:399` — 단말 등록 요청 팝업 진입 시 미등록 단말 선택 목록 로드

---

## PUT `/v1/user/device-identifier/{acctDvcIdentHistId}/hist`

단말 접속 이력 항목 비활성화. 단말 등록 요청 팝업에서 이력 항목을 삭제(비활성화)할 때 사용한다.

### 요청

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| acctDvcIdentHistId | string | Y | 단말 식별 이력 ID (`acct_dvc_ident_hist_id`) |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| use_yn | string | Y | 사용 여부. `N` (비활성화) 고정 |

### 응답

HTTP 200 성공 시 응답 본문 없음.

### 호출 위치

- `views/vPcInfo/DeviceAccReq.vue:453` — 단말 등록 요청 팝업에서 이력 항목 삭제 시
