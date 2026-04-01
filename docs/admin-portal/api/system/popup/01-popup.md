# 팝업 관리 API

## 조회

```
GET /v1/system/popup
```

**호출 위치**: `views/portal/Popup.vue:157`, `views/portal/PopupDetail.vue:253`

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| show_yn | string | 노출 여부 (`Y` / `N`) |
| check_yn | string | 오늘 하루 보지 않기 체크 여부 (`Y` / `N`) |
| cont | string | 팝업 내용 (HTML) |
| show_stt_dtm | string | 노출 시작 일시 |
| show_end_dtm | string | 노출 종료 일시 |
| stor_file_id | string | 첨부 파일 ID |
| att_file_loc_cd | string | 첨부파일 표시 위치 (`U`: 상단, `D`: 하단) |
| wri_att_file_l | array | 첨부 파일 목록 |

---

## 수정

```
PUT /v1/system/popup
```

**호출 위치**: `views/portal/PopupDetail.vue:315`

### 요청 바디 (JSON)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| show_yn | string | Y | 노출 여부 (`Y` / `N`) |
| check_yn | string | Y | 오늘 하루 보지 않기 (`Y` / `N`) |
| cont | string | Y | 팝업 내용 (HTML) |
| show_stt_dtm | string | N | 노출 시작 일시 |
| show_end_dtm | string | N | 노출 종료 일시 |
| org_file_nm | string | N | 첨부파일 원본명 |
| att_file_loc_cd | string | N | 첨부파일 위치 (`U` / `D`) |
| wri_att_file_l_l | array | N | 전체 첨부 파일 목록 |
| wri_att_file_l_new | array | N | 신규 첨부 파일 |
| wri_att_file_l_old | array | N | 삭제할 기존 첨부 파일 |

---

## 삭제

```
DELETE /v1/system/popup
```

**호출 위치**: `views/portal/PopupDetail.vue:390`

### 응답

삭제 성공 시 응답 바디 없음 (HTTP 200).

---

## 에러 코드

공통 에러 코드 참고: `docs/admin-portal/internals/http-interceptor/02-error-codes.md`
