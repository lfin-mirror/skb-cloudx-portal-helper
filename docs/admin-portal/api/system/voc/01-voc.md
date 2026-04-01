# VOC 상담 API

리소스 경로 기준: `/v1/system/voc`

---

## GET /v1/system/voc/adv

VOC 상담 목록 조회.

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |
| voc_adv_typ_cd | string | N | 상담 유형 코드 필터 |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| data | array | 상담 목록 |
| data[].voc_adv_wrt_no | number | 상담 등록 번호 |
| data[].voc_adv_typ_cd | string | 상담 유형 코드 |
| data[].voc_adv_typ_cd_nm | string | 상담 유형명 |
| data[].adv_reg_tm | string | 상담 등록 시각 (yyyyMMddHHmmss) |
| data[].title | string | 상담 제목 |
| data[].adv_cont | string | 상담 내용 |
| data[].reg_id | string | 등록자 ID |
| data[].reg_conn_id | string | 등록자 로그인 ID (마스킹) |
| data[].reg_ts | string | 등록 일시 |
| data[].mod_id | string | 수정자 ID |
| data[].mod_conn_id | string | 수정자 로그인 ID (마스킹) |
| data[].mod_ts | string | 수정 일시 |

**관련 공통코드**

| 코드 그룹 | 설명 |
|---|---|
| A019 | VOC 상담 유형 |

---

## GET /v1/system/voc/adv/:id

VOC 상담 상세 조회.

**Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| id | number | Y | 상담 등록 번호 (`voc_adv_wrt_no`) |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| data.voc_adv_wrt_no | number | 상담 등록 번호 |
| data.voc_adv_typ_cd | string | 상담 유형 코드 |
| data.voc_adv_typ_cd_nm | string | 상담 유형명 |
| data.adv_reg_tm | string | 상담 등록 시각 (yyyyMMddHHmmss) |
| data.title | string | 상담 제목 |
| data.adv_cont | string | 상담 내용 |
| data.reg_id | string | 등록자 ID (마스킹) |
| data.reg_conn_id | string | 등록자 로그인 ID (`null` 가능) |
| data.reg_ts | string | 등록 일시 |
| data.mod_id | string | 수정자 ID (마스킹) |
| data.mod_conn_id | string | 수정자 로그인 ID (`null` 가능) |
| data.mod_ts | string | 수정 일시 |

---
