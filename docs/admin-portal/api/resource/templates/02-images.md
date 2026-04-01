# 이미지 API

리소스 경로 기준: `/v1/resource/images`

템플릿에서 사용하는 OS 이미지(Glance) 관리.

---

## 이미지 목록 조회

```
GET /v1/resource/images
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| sort | string | N | 정렬 기준 필드 |
| sort_type | string | N | 정렬 방향 (`ASC` / `DESC`) |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | 이미지 목록 |
| data[].img_id | string | 이미지 ID |
| data[].img_nm | string | 이미지명 |
| data[].img_cre_tm | string | 이미지 생성 일시 |
| data[].img_file_size | string | 파일 크기 (MB) |
| data[].img_descp | string | 이미지 설명 |
| data[].os_typ_cd | string | OS 유형 코드 (`T002W64` 등) |
| data[].os_typ_cd_nm | string | OS 유형명 |
| data[].visibility | string | 가시성 (`public` / `private`) |
| data[].tnt_id | string | 테넌트 ID (null = 공용) |
| data[].reg_conn_id | string | 등록자 로그인 ID |
| data[].reg_nm | string | 등록자명 |
| data[].reg_ts | string | 등록 일시 |
| pageinfo.count | string | 전체 건수 |

---

## 이미지 상세 조회

```
GET /v1/resource/images/{imgId}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| imgId | string | Y | 이미지 ID |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| img_id | string | 이미지 ID |
| img_nm | string | 이미지명 |
| img_descp | string | 이미지 설명 |
| img_cre_tm | string | 이미지 생성 일시 |
| img_file_size | string | 파일 크기 (MB) |
| os_typ_cd | string | OS 유형 코드 |
| os_typ_cd_nm | string | OS 유형명 |
| img_serv_yn | string | 서비스 여부 (`Y`/`N`) |
| img_sts_cd | string | 이미지 상태 코드 (`T003CC` 생성 완료) |
| img_sts_cd_nm | string | 이미지 상태명 |
| init_cre_yn | string | 초기 생성 여부 |
| img_sw_l | array | 설치 SW 목록 |
| visibility | string | 가시성 |
| tnt_id | string | 테넌트 ID |
| img_cre_vm_id | string | 이미지 생성 VM ID |

---

## 이미지 등록

```
POST /v1/resource/images
```

---

## 이미지 수정

```
PUT /v1/resource/images/{imgId}
```

---

## 이미지 삭제

```
DELETE /v1/resource/images/{imgId}
```
