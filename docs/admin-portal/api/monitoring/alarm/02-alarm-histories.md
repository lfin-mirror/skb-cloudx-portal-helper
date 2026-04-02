# 알람 이력 API

## 사용 화면
- (화면 문서 미작성)

## 목록 조회

```
GET /v1/management/statistics/service/alarm
```

**호출 위치**: `views/monitoring/alarm/AlarmHistories.vue:193`

### 요청 파라미터 (Query)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| clr_yn | string | N | 해제 여부 (`Y` / `N`) |
| alm_tgt_cd | string | N | 알람 대상 코드 |
| alm_typ_class_cd | string | N | 알람 유형 분류 코드 |
| alm_typ_cd | string | N | 알람 유형 코드 |
| start_dt | string | N | 검색 시작일 (`YYYY-MM-DD`) |
| end_dt | string | N | 검색 종료일 (`YYYY-MM-DD`) |
| page | number | N | 페이지 번호 |
| limit | number | N | 페이지당 항목 수 |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| alm_hist_id | number | 알람 이력 ID (PK) |
| alm_tgt_cd | string | 알람 대상 코드 |
| alm_typ_class_cd | string | 알람 유형 분류 코드 |
| alm_typ_cd | string | 알람 유형 코드 |
| alm_detl | string | 알람 상세 |
| clr_yn | string | 해제 여부 (`Y` / `N`) |
| alm_occ_dtm | string | 알람 발생 일시 |
| alm_clr_dtm | string | 알람 해제 일시 |

---

## 에러 코드

공통 에러 코드 참고: `docs/admin-portal/internals/http-interceptor/02-error-codes.md`
