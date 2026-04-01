# 공통 코드 API

## GET `/v1/system/commons/codes`

공통 코드 그룹별 코드 목록 조회. `codes.js` 플러그인에서 드롭다운/셀렉트 옵션 데이터를 가져올 때 호출.

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| cd_grp_id | string | Y | 코드 그룹 ID |
| usg_yn | string | N | 사용 여부 필터 (`Y`) |

### 응답 Body

배열. `data[0].com_cd_lang_m`에서 코드 목록 추출.

| 필드 | 타입 | 설명 |
|------|------|------|
| [].cd_grp_id | string | 코드 그룹 ID |
| [].com_cd_lang_m | array | 코드 목록 |
| [].com_cd_lang_m[].com_cd | string | 코드 값 |
| [].com_cd_lang_m[].com_cd_nm | string | 코드 표시명 |
| [].com_cd_lang_m[].usg_yn | string | 사용 여부 (`Y`/`N`) |

### 프론트엔드 처리

`codes.js` 플러그인이 `usg_yn === 'Y'`인 항목만 필터링 후 `{ label: com_cd_nm, value: com_cd }` 형태로 변환. `sessionStorage.codes`에 캐싱.

### 호출 위치

- `plugins/codes.js:19` — 전역에서 `$codes.get('코드그룹ID')` 형태로 사용
