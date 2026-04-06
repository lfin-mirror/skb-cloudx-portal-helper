---
type: screen
title: Proxy 서버 / 이메일
menu_id: [A100901, T100901, A100902, T100902, A1010]
status: stable
version: v2.2.10
portal: admin
path: /system-resource/proxy/forward-proxy
access: [SA, TA]
api_endpoints:
  - GET /v1/resource/proxy/L4/admin
  - GET /v1/resource/proxy/L4/tenant
  - GET /v1/resource/proxy/L7/admin
  - GET /v1/resource/proxy/L7/tenant
  - GET /v1/operation/outs/interfaces/email
  - PUT /v1/operation/outs/interfaces/email
  - POST /v1/legacy/mail/check
---

# Proxy 서버 / 이메일

인프라 부속 설정 메뉴.

---

## L4 Proxy 서버 (A100901, T100901)

경로: /system-resource/proxy/forward-proxy

컴포넌트: views/systemResource/proxy/ForwardProxy.vue

Forward Proxy 목록 조회. SA/TA 공통, API 경로만 다름. 행 클릭 없음 (상세 화면 없음). 등록/수정/삭제 버튼 없음 — 읽기 전용 목록.

### SA vs TA 차이

| 항목 | 세부 항목 | SA | TA |
|------|----------|----|----|
| 범위 | — | 전체 조회 | 자기 테넌트만 |
| API 경로 | — | `GET /v1/resource/proxy/L4/admin` | `GET /v1/resource/proxy/L4/tenant` |

### 검색 조건

| 검색 항목 | 필드 |
|----------|------|
| Proxy 명 (`proxy_nm`) | 텍스트 |
| 서비스 IP (`service_ip`) | 텍스트 |

### 테이블 컬럼

| 화면 라벨 (i18n) | 필드 | 비고 |
|-----------------|------|------|
| 상태 (`list.common.status`) | `sts_cd` | StatusPane 컴포넌트, 코드 P013 (green/yellow/red) |
| Proxy 명 (`list.systemResource.proxyName`) | `proxy_nm` | |
| 서비스 IP (`list.systemResource.proxyServiceIp`) | `service_ip` | |
| PORT 범위 (`list.systemResource.proxyServicePortRange`) | `service_min_port` ~ `service_max_port` | `{min} ~ {max}` formatter |
| 생성일시 (`list.systemResource.createDate`) | `reg_ts` | 날짜 포맷 |

### API

| 동작 | 메서드 | 경로 | 명세 |
|------|--------|------|------|
| 목록 조회 (SA) | GET | `/v1/resource/proxy/L4/admin` | (미작성) |
| 목록 조회 (TA) | GET | `/v1/resource/proxy/L4/tenant` | (미작성) |

---

## L7 Proxy 서버 (A100902, T100902)

경로: /system-resource/proxy/reverse-proxy

컴포넌트: views/systemResource/proxy/ReverseProxy.vue

Reverse Proxy 목록 조회. SA/TA 공통, API 경로만 다름. 행 클릭 없음 (상세 화면 없음). 등록/수정/삭제 버튼 없음 — 읽기 전용 목록.

### SA vs TA 차이

| 항목 | 세부 항목 | SA | TA |
|------|----------|----|----|
| 범위 | — | 전체 조회 | 자기 테넌트만 |
| API 경로 | — | `GET /v1/resource/proxy/L7/admin` | `GET /v1/resource/proxy/L7/tenant` |

### 검색 조건

| 검색 항목 | 필드 |
|----------|------|
| Proxy 명 (`proxy_nm`) | 텍스트 |
| 서비스 IP (`service_ip`) | 텍스트 |

### 테이블 컬럼

| 화면 라벨 (i18n) | 필드 | 비고 |
|-----------------|------|------|
| 상태 (`list.common.status`) | `sts_cd` | StatusPane 컴포넌트, 코드 P013 (green/yellow/red) |
| Proxy 명 (`list.systemResource.proxyName`) | `proxy_nm` | |
| 서비스 IP (`list.systemResource.proxyServiceIp`) | `service_ip` | |
| 서비스 PORT (`list.systemResource.proxyServicePort`) | `service_port` | |
| 최대 VM 수 (`list.systemResource.proxyMaxVmCnt`) | `max_conn_limit` | `toCurrency` formatter (천단위 구분) |
| 생성일시 (`list.systemResource.createDate`) | `reg_ts` | 날짜 포맷 |

### API

| 동작 | 메서드 | 경로 | 명세 |
|------|--------|------|------|
| 목록 조회 (SA) | GET | `/v1/resource/proxy/L7/admin` | (미작성) |
| 목록 조회 (TA) | GET | `/v1/resource/proxy/L7/tenant` | (미작성) |

---

## 이메일 (A1010) — SA 전용

SA 전용 (TA 메뉴에 없음).

경로: /system-resource/EmailManage

컴포넌트: views/systemResource/EmailManage.vue

SMTP 이메일 설정 관리. 폼 기반 단일 화면 (목록 없음). 조회/수정 + 테스트 발송.

### 폼 필드

| 화면 라벨 | 필드 | 타입 | 비고 |
|----------|------|------|------|
| 이메일 사용 여부 | `use_yn` | 셀렉트 (사용 `Y` / 미사용 `N`) | |
| 암호화 프로토콜 방식 | `protocol_type` | 라디오 | 미사용 (`A036NON`) / SMTPS (`A036SSL`) / STARTTLS (`A036TLS`) |
| SMTP Host | `smtp_host` | 텍스트 입력 | |
| SMTP Port | `smtp_port` | 텍스트 입력 | |
| From Mail | `from_mail` | 텍스트 입력 | |
| Password | `passwd_cryptval` | 비밀번호 입력 | `tmp_email_reinput` 체크 해제 시 disabled |
| 상세 설명 | `descp` | textarea | 최대 150자 |
| 테스트 검증 | — | 버튼 영역 | 아래 참고 |

### 버튼 동작

| 버튼 | 클릭 시 동작 |
|------|------------|
| **테스트 검증** | `POST /v1/legacy/mail/check` 호출. `to_mail`은 `from_mail`과 동일값 사용. 성공 시 "E-mail 연동이 확인되었습니다" 알림 |
| **저장** | `PUT /v1/operation/outs/interfaces/email` 호출. `tnt_id='ADMIN'` 고정. `tmp_email_reinput` 체크 시에만 `passwd_cryptval` 포함 (미체크 시 기존 비밀번호 유지). 성공 시 "처리 완료" 알림 |

### Password 재입력 체크박스

`tmp_email_reinput` 체크박스로 비밀번호 변경 여부 제어:
- 체크 해제 (기본) → 비밀번호 input disabled, 저장 시 `passwd_cryptval` 미전송 → 기존 비밀번호 유지
- 체크 → 비밀번호 input 활성화, 저장 시 새 비밀번호 전송

### API

| 동작 | 메서드 | 경로 | 비고 | 명세 |
|------|--------|------|------|------|
| 조회 | GET | `/v1/operation/outs/interfaces/email` | | [명세](../../api/operation/external/01-external.md) |
| 수정 | PUT | `/v1/operation/outs/interfaces/email` | `tnt_id='ADMIN'` 고정 | [명세](../../api/operation/external/01-external.md) |
| 테스트 발송 | POST | `/v1/legacy/mail/check` | `extLinkVO` + `to_mail` 전송 | (미작성) |

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|---------|
| v1.1 | 2026-04-01 | 화면 라벨(i18n) 병기, 검색 조건, 버튼 동작, Password 재입력 체크박스 상세 추가 |
| v1.0 | 2026-03-31 | 최초 작성 |
