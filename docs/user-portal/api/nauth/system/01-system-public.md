# 시스템 공개 API

## 사용 화면
- [Cloud PC 신청](../../../vpcinfo/01-vpc-req.md)
- [전원 제어](../../../vpcinfo/home/03-power-control.md)
- [엔트리 → 로그인 흐름](../../../auth/01-entry-to-login-flow.md)

인증 없이 접근 가능한 시스템 정보 조회 API. 로그인 화면 진입 시 호출된다.

---

## GET `/v1/nauth/system/installer`

키로깅 방지 에이전트 설치 파일 정보 조회. 테넌트의 `userPtalKlpUseYn === true`인 경우에만 호출된다.

### 요청 파라미터

없음.

### 응답 Body

배열로 반환. 첫 번째 요소(`[0]`)를 사용.

| 필드 | 타입 | 설명 |
|------|------|------|
| (설치파일 정보 필드) | | `store.dispatch('keylogging/setInstallerInfo', data[0])`으로 저장 |

### 호출 위치

- `src/permission.js:64` (`tntExists` 함수 내부, 키로깅 대상 테넌트에서만 호출)

---

## GET `/v1/nauth/system/notices/public`

로그인 화면에 표시할 공지사항 목록 조회.

### 요청 Query 파라미터

| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| noti_meth_cd | string | Y | 공지 방법 코드 (`U016REP` 고정) |
| tnt_url_id | string | Y | 테넌트 URL ID |

### 응답 Body

공지사항 배열.

| 필드 | 타입 | 설명 |
|------|------|------|
| [].title | string | 공지 제목 (로그인 화면 하단 스와이퍼에 표시) |
| (기타 공지 필드) | | 공지 상세 팝업에 사용 |

### 호출 위치

- `views/login/index.vue:407`

---

## GET `/v1/nauth/system/popup`

로그인 화면 팝업 메시지 조회. 점검 중 안내 등 전체 공지 팝업에 사용된다.

### 요청 Query 파라미터

| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| tnt_url_id | string | Y | 테넌트 URL ID |

### 응답 Body

| 필드 | 타입 | 설명 |
|------|------|------|
| show_yn | string | 팝업 표시 여부 (`Y`/`N`) |
| show_stt_dtm_str | string | 팝업 표시 시작 일시 (`YYYY-MM-DD HH:mm` 형식, 옵션) |
| show_end_dtm_str | string | 팝업 표시 종료 일시 (`YYYY-MM-DD HH:mm` 형식, 옵션) |
| cont | string | 팝업 본문 내용 (HTML 엔티티 인코딩, `&lt;`/`&gt;` 포함 가능) |
| att_file_loc_cd | string | 첨부 이미지 위치 코드 (`U`: 상단, 그 외: 하단) |
| wri_att_file_l | array | 첨부 파일 목록 |
| wri_att_file_l[].path | string | 이미지 경로 |
| check_yn | string | 점검 페이지 이동 여부 (`Y`이면 `/checking`으로 이동) |

### 비고

- `show_yn === 'Y'`이고 현재 시각이 `show_stt_dtm_str`~`show_end_dtm_str` 범위 내일 때 팝업 표시
- localStorage의 `hidePopupUntil`이 오늘 날짜면 팝업 숨김
- `check_yn === 'Y'`이면 공지 팝업 대신 점검 페이지(`/checking`)로 라우팅

### 호출 위치

- `views/login/index.vue:422` (`getPopupMessage` 메서드)

---

## GET `/v1/nauth/system/portals/ui/{tntUrlId}/public`

로그인 화면 및 메인 화면의 배경 이미지, 배너, 로고, 파비콘, 푸터 정보 조회.

### Path 파라미터

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| tntUrlId | string | 테넌트 URL ID |

### 응답 Body

| 필드 | 타입 | 설명 |
|------|------|------|
| lin_bg_yn | string | 로그인 배경 이미지 사용 여부 (`Y`/`N`) |
| lin_bg_stor_path | string | 로그인 배경 이미지 경로 |
| lin_img_1_yn | string | 로그인 배너 이미지 1 사용 여부 (`Y`/`N`) |
| lin_img_1_stor_path | string | 로그인 배너 이미지 1 경로 |
| lin_img_2_yn | string | 로그인 배너 이미지 2 사용 여부 (`Y`/`N`) |
| lin_img_2_stor_path | string | 로그인 배너 이미지 2 경로 |
| lin_img_3_yn | string | 로그인 배너 이미지 3 사용 여부 (`Y`/`N`) |
| lin_img_3_stor_path | string | 로그인 배너 이미지 3 경로 |
| ptal_bg_yn | string | 메인 배경 이미지 사용 여부 (`Y`/`N`) |
| ptal_bg_stor_path | string | 메인 배경 이미지 경로 |
| ptal_img_yn | string | 메인 로고 이미지 사용 여부 (`Y`/`N`) |
| ptal_img_stor_path | string | 메인 로고 이미지 경로 |
| fvcn_yn | string | 파비콘 사용 여부 (`Y`/`N`) |
| fvcn_stor_path | string | 파비콘 경로 |
| copyright_txt | string | 저작권 텍스트 (푸터) |
| inquiry_txt | string | 문의 안내 텍스트 (푸터) |
| contact_txt | string | 연락처 텍스트 (푸터) |

### 비고

- `lin_bg_yn !== 'Y'`이면 기본 배경 이미지(`Type1.png`) 사용
- 배너 이미지 미설정 시 기본 배너(`Banner1.png`, `Banner2.png`, `Banner3.png`) 사용
- 푸터 정보는 localStorage의 `footerInfo`에 JSON으로 저장
- 파비콘은 localStorage의 `favicon`에 저장 후 `<link>` 태그 업데이트

### 호출 위치

- `views/login/index.vue:503` (`getBackgroundImg` 메서드, 로그인 화면 배경/배너)
- `src/store/modules/app.js:116` (`setImages` action, 로그인 후 메인 화면 이미지)

---

## GET `/v1/nauth/system/{tntUrlId}/getToday`

서버 기준 현재 날짜/시간 조회.

### Path 파라미터

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| tntUrlId | string | 테넌트 URL ID |

### 응답 Body

| 필드 | 타입 | 설명 |
|------|------|------|
| (날짜/시간 필드) | string | 서버 기준 현재 날짜 및 시간 |

### 비고

소스에서 직접 호출 위치가 확인되지 않음. 클라이언트 시간 대신 서버 시간을 기준으로 날짜 비교가 필요한 경우에 사용하는 것으로 추정.

### 호출 위치

- 직접 호출 위치 미확인 (API 목록에 포함)
