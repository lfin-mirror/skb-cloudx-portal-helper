# 유틸리티 — `src/utils/`

`request.js`와 `auth.js`는 [http-interceptor](../http-interceptor/01-request-js.md), `keyloggingWS.js`는 [keylogging](../vuex-store/04-keylogging.md) 문서 참고.

## localConfig.js — 런타임 설정

배포 환경에서는 빌드 결과물의 `config.js`(window.config)를 참조, 로컬 개발 환경에서는 `config/application.json` 폴백.

```javascript
const load = () => {
  try { return config }          // 배포: window.config (vue.config.js의 file-loader로 생성)
  catch (e) { return localConfig.default }  // 로컬: application.json
}
export { conf }
```

`request.js`의 `baseURL` 등에서 `conf.VUE_APP_API_URI`로 사용.

## index.js — 범용 유틸리티

### 검색 폼

| 함수 | 용도 |
|------|------|
| `defaultSearchFormObj(obj)` | 검색 폼 기본값 생성 (`type`, `value`, `date`, `page: 1`, `limit: 10`, `sort`, `sort_type`) |
| `getApiParam(data)` | SearchFilter 폼 데이터를 API 파라미터로 변환. `date.from/to` → `start_dt/end_dt`, `type/value` → 동적 키 |

### 날짜 포맷

| 함수 | 포맷 |
|------|------|
| `toDate(value)` | `YYYY-MM-DD` |
| `toDateM(value)` | `YYYY-MM-DD HH:mm` |
| `toFullDate(value)` | `YYYY-MM-DD HH:mm:ss` |

### 단위 변환

| 함수 | 입력 | 출력 |
|------|------|------|
| `toGB(size)` | 바이트 | GB (소수점 1자리) |
| `toMB(size)` | GB | MB (소수점 1자리) |
| `formatExprAllUnitCapa(input)` | MB 값 | `{ value, unit }` — MB/GB/TB 자동 선택 (소수점 1자리 절삭, 반올림 아님) |
| `formatBytes(bytes, unitYn)` | 바이트 | 자동 단위 선택 (1000 단위). `unitYn='Y'`면 단위 포함 |
| `convertByUnit(value, targetUnit, unitYn)` | 바이트 | 지정 단위로 변환 (B/KB/MB/GB/TB/PB) |

### 모니터링 포맷터

실시간 모니터링 차트/테이블에서 사용하는 단위 변환 함수군:

| 함수 | 입력 | 출력 단위 |
|------|------|----------|
| `formatLatency(value)` | μs | μs / ms / s 자동 |
| `formatIOPS(value)` | IOPS | K / M / G 자동 |
| `formatBps(value)` | Bytes/s | bps 계열 (×8 변환) |
| `formatBandwidth(cellValue)` | Bytes/s | bps / Kbps / Mbps / Gbps / Tbps |
| `formatBandPerwidth(cellValue)` | Bytes/s | B/s / KB/s / MB/s / GB/s / TB/s / PB/s |
| `formatPpsUnit(cellValue)` | packets | pps / Kpps / Mpps / Gpps / Tpps |
| `formatBitRate(bitsPerSec)` | bits/s | b/s / Kb/s / Mb/s / Gb/s |

차트 전용 (데이터+단위 객체 반환):

| 함수 | 반환 |
|------|------|
| `chartBandwidth(val, unit)` | `{ data, unit }` — bps 계열 |
| `byteBandwidth(val, unit)` | `{ data, unit }` — Byte 계열 |
| `latencyBandwidth(val, unit)` | `{ data, unit }` — μs/ms/s |
| `chartIops(val, unit)` | `{ data, unit }` — IOPS 계열 |
| `convertByLatencyUnit(value, targetUnit, unitYn)` | 지정 단위 변환 |

### 기타

| 함수 | 용도 |
|------|------|
| `toCurrency(num)` | 천 단위 콤마 |
| `uuid()` | crypto 기반 UUID v4 생성 |
| `getByteLen(val)` | 문자열 바이트 길이 (한글 3바이트) |
| `isExternal(path)` | URL이 외부 링크인지 판단 |
| `isEmpty(value)` | null/빈문자열/빈배열/빈객체/빈Map,Set 체크 |
| `toRoundedPercentage(value)` | 소수점 4자리에서 반올림 후 백분율(소수점 1자리) |
| `getClassType(value, threshold)` | 임계치 기반 CSS 클래스 반환 (danger/warning/caution) |
| `fillNullsByKey(obj, defaults)` | null 값을 기본값으로 채움 |
| `formatWithRegex(value)` | 3자리 콤마 (정규식) |
| `debounce(func, wait, immediate)` | 디바운스 |
| `deepClone(source)` | 간이 딥 카피 (lodash `_.cloneDeep` 권장) |

## validate.js — 폼 검증

Element UI의 `el-form` 검증 규칙에서 사용하는 커스텀 validator.

### 정규식 패턴 (`regExp`)

| 키 | 대상 |
|----|------|
| `id` | 계정 ID (영문+숫자, 5~51자) |
| `name` | 이름 (한/영/숫자, 30자) |
| `phone` | 전화번호 |
| `email` | 이메일 |
| `ip` | IPv4 주소 |
| `url` / `simpleUrl` | URL (프로토콜 포함/생략) |
| `num` / `int` | 숫자 / 정수(음수 포함) |
| `commonResourceName` | 리소스 이름 (한/영/숫자/공백, 240자) |
| `tenantName` / `tenantId` | 테넌트 이름/ID |
| `serviceGroupId` | 서비스 그룹 ID (대문자, 20자) |
| `version` | 버전 문자열 (최대 5단위, 예: `1.2.3.4.5`) |
| `domain` | 도메인/URL 패턴 (chrome://, edge:// 포함) |
| `uuid` | UUID v1~v5 |
| `secu` | 특수문자 포함 여부 |
| `contEmpty` | 앞공백 여부 |

### 검증 함수

| 함수 | 검증 대상 |
|------|----------|
| `formValidate(r, v, callback)` | 범용 검증 (필수/정규식/길이/숫자범위). `r.checktype`으로 분기 |
| `formValidateDateRange(from, to, ...)` | 날짜 기간 (시작 ≤ 종료) |
| `formValidateIp(r, v, callback)` | IP 주소 |
| `formValidateCidrBit(r, v, callback)` | CIDR 비트 (min~max 범위) |
| `formValidateVersion(r, v, callback)` | 버전 문자열 |
| `formValidateDiskDrive(r, v, callback)` | 디스크 용량 (1~100) |
| `formValidateUpload(r, v, callback)` | 파일 첨부 여부 |
| `formValidMacAddress(r, v, callback)` | MAC 주소 (`XX-XX-XX-XX-XX-XX`) |
| `formValidateBaseClass(r, v, callback)` | USB 유형 코드 (16진수 2~3자리) |
| `formValidateUid(r, v, callback)` | USB 모델/벤더 UID (16진수 4자리) |
| `validatePush(r, v, callback)` | Push 메시지 제목 (필수 + 길이) |
| `validate($form, callback)` | Element UI `$form.validate()` 래퍼 + 에러 필드 스크롤 |

## permission.js — 권한 체크 유틸리티

`v-permission` 디렉티브 등에서 사용하는 역할 기반 권한 체크:

```javascript
export default function checkPermission(value) {
  // value: ['U001SUP', 'U001TNT'] 등 허용 역할 배열
  // store.getters.roles에 포함되는 역할이 있으면 true
}
```

## element-helper.js

Element UI 테이블 커스텀 포맷터. `tableFormatDateM`, `tableFormatDateTime`, `tableFormatNullConvert` 등 테이블 셀 렌더링 헬퍼 제공.
