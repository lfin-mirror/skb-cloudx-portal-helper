# NAS 스토리지 API

## 사용 화면
- [스토리지](../../화면/시스템%20자원/04-스토리지.md)

## 목차

- [NAS 공유 폴더 목록 조회](#nas-공유-폴더-목록-조회)

---

## NAS 공유 폴더 목록 조회

SA와 TA가 서로 다른 엔드포인트를 호출. 역할에 따라 조회 범위와 검색 파라미터가 다름.

### SA: GET /v1/legacy/cloud/ad/allSharedfolders

전체 테넌트 NAS 공유 폴더 목록 조회.

**호출 위치**: `views/systemResource/storage/Nas.vue:109`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tnt_nm | string | N | 테넌트명 검색어 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| tnt_nm | string | 테넌트명 |
| usedSize | number | 사용 용량 |
| totalSize | number | 할당 용량 |

---

### TA: GET /v1/legacy/cloud/ad/sharedfolder/directories

로그인 테넌트 소속 NAS 공유 폴더 목록 조회.

**호출 위치**: `views/systemResource/storage/Nas.vue:99`

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| tnt_id | string | Y | 로그인 사용자의 테넌트 ID (자동 주입) |
| dept_cd | string | N | 스토리지명 검색어 |
| usr_grp_nm | string | N | 사용자 그룹명 검색어 |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

**응답**

| 필드 | 타입 | 설명 |
|---|---|---|
| usr_grp_nm | string | 사용자 그룹명 |
| dept_cd | string | 스토리지명 |
| used_size | number | 사용 용량 |
| total_size | number | 할당 용량 |

---

### SA/TA 차이

| 조건 | 동작 |
|------|------|
| SA (grp_typ_cd === 'U001SUP') | `GET /v1/legacy/cloud/ad/allSharedfolders?tnt_nm=...` — 전체 테넌트 목록, 테넌트명으로 검색 |
| TA (grp_typ_cd === 'U001TNT') | `GET /v1/legacy/cloud/ad/sharedfolder/directories?tnt_id=...` — 본인 테넌트 한정, 스토리지명/사용자그룹명으로 검색 |

---

## 에러 코드

| HTTP 상태 | 설명 |
|---|---|
| 200 | 정상 처리 |
| 400 | 잘못된 요청 파라미터 |
| 404 | 리소스 없음 |
| 500 | 서버 오류 |
