# 풀 관리 API

## 사용 화면
- (화면 문서 미작성)

> 가상 PC 풀(Pool) 전체 CRUD는 `/vpcs/01-vpcs.md`의 [VPC 풀](#vpc-풀) 섹션에 기술되어 있다.
> 이 문서는 풀과 연관된 부가 기능(IP 관리, 템플릿 이력, 서브넷 설정 등)을 보완 기술한다.

## 목차

- [풀 IP 관리](#풀-ip-관리)
- [풀 템플릿 이력](#풀-템플릿-이력)
- [풀 서브넷 설정](#풀-서브넷-설정)
- [풀 볼륨 배정](#풀-볼륨-배정)
- [풀 초기화](#풀-초기화)

---

## 풀 IP 관리

### GET /v1/resource/vpcs/pool/{vmPoolId}/ip

풀 IP 목록 조회.

**호출 위치**: `views/virtualPc/mixins/virtualPcGroup.js:415`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmPoolId | string | Y | 풀 ID |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| ip_id | string | IP ID |
| ip_addr | string | IP 주소 |
| ip_usg_typ_cd | string | IP 사용 타입 코드 |
| vm_auth_id | string | 할당된 VM 인증 ID |
| acct_id | string | 계정 ID |

---

## 풀 템플릿 이력

### GET /v1/resource/vpcs/pool/{poolId}/template/history

풀 템플릿 변경 이력 조회.

**호출 위치**: `views/virtualPc/mixins/virtualPcGroup.js:669`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| poolId | string | Y | 풀 ID |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| temp_id | string | 템플릿 ID |
| temp_nm | string | 템플릿명 |
| chg_ts | string | 변경 일시 |
| chg_usr_id | string | 변경자 ID |

---

## 풀 서브넷 설정

### POST /v1/resource/vpcs/pool/{poolId}/subnet

풀 서브넷 등록(설정).

**호출 위치**: `store/modules/virtualPc.js:392`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| poolId | string | Y | 풀 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| sbn_id | string | Y | 서브넷 ID |

---

### PUT /v1/resource/vpcs/pool/{vmPoolId}/subnet

풀 서브넷 수정.

**호출 위치**: `views/virtualPc/VirtualPcPoolDetail.vue:1134`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmPoolId | string | Y | 풀 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| sbn_id | string | Y | 변경할 서브넷 ID |

---

## 풀 볼륨 배정

### POST /v1/resource/vpcs/pool/{vmPoolId}/volume

풀에 볼륨 타입 배정.

**호출 위치**: `views/virtualPc/VirtualPcPoolDetail.vue:1402`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmPoolId | string | Y | 풀 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| volm_typ_id | string | Y | 볼륨 타입 ID |

---

### DELETE /v1/resource/vpcs/pool/{vmPoolId}/volume

풀 볼륨 타입 배정 해제.

**호출 위치**: `views/virtualPc/VirtualPcPoolDetail.vue:1483`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmPoolId | string | Y | 풀 ID |

**Request Body (params)**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| volm_typ_id | string | Y | 볼륨 타입 ID |

---

## 풀 초기화

### PUT /v1/resource/vpcs/pool/{vmPoolId}/reset

풀 초기화 실행.

**호출 위치**: `views/virtualPc/VirtualPcPoolDetail.vue:1181`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmPoolId | string | Y | 풀 ID |

---

## 풀 템플릿 변경

### PUT /v1/resource/vpcs/pool/{vmPoolId}/template

풀 적용 템플릿 변경.

**호출 위치**: `views/virtualPc/VirtualPcPoolDetail.vue:1254`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmPoolId | string | Y | 풀 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| temp_id | string | Y | 새 템플릿 ID |

---

## 이미지 불일치 VM

### GET /v1/resource/vpcs/pool/{id}/image-mismatched-vm

이미지 불일치 VM 목록 조회.

**호출 위치**: `views/virtualPc/VirtualPcPoolDetail.vue:1309`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | string | Y | 풀 ID |

**응답**

배열 형태.

| 필드 | 타입 | 설명 |
|---|---|---|
| vm_auth_id | string | VM 인증 ID |
| vm_nm | string | VM명 |
| cur_img_id | string | 현재 이미지 ID |
| tgt_img_id | string | 목표 이미지 ID |

---

## 자원 회수

### DELETE /v1/resource/vpcs/pool/{vmPoolId}/collection

풀 자원 회수.

**호출 위치**: `store/modules/virtualPc.js:472`

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| vmPoolId | string | Y | 풀 ID |

---

## 에러 코드

| HTTP 상태 | 설명 |
|---|---|
| 200 | 정상 처리 |
| 400 | 잘못된 요청 파라미터 |
| 404 | 풀 없음 |
| 409 | 풀 상태 충돌 (사용 중인 풀 삭제 등) |
| 500 | 서버 오류 |
