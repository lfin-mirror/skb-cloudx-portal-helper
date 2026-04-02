---
type: concept
title: Octatco
status: stable
version: v2.2.9
tags: [Octatco, FIDO2, WebAuthn, MFA]
related_screens:
  - ../auth/02-login-to-home-flow.md
---

# Octatco

FIDO2/WebAuthn 기반 인증 솔루션을 제공하는 외부 서비스다. CloudX VDI 플랫폼에서는 Octatco를 통해 비밀번호 없는(passwordless) 다중 인증(MFA)을 구현한다.

## 테넌트 설정

테넌트 단위로 사용 여부를 설정할 수 있다. 관리자가 admin-portal에서 테넌트별로 활성화/비활성화한다. 백엔드에서는 app-ms-operation의 `ExtController`(`/octatco` 엔드포인트)가 테넌트별 Octatco 설정을 관리하고, 실제 인증 처리는 Octatco 외부 API와 연동한다.

| 키 | 저장 위치 | 값 | 설명 |
|---|---|---|---|
| `octatcoUsgYn` | sessionStorage | `'true'` / `'false'` | 테넌트의 Octatco MFA 사용 여부. `permission.js`의 `tntExists()` 응답에서 세팅 |

## 일반 로그인과의 차이

| | 일반 로그인 | Octatco 로그인 |
|---|---|---|
| 1차 인증 | ID + 비밀번호 | ID만 (비밀번호 없음) |
| 2차 인증 | 선택적 (`acct_2nd_cert_tgt_yn`에 따라) | 필수 (반드시 2차 인증 거침) |
| 로그인 폼 | `Login.vue` | `OctatcoLogin.vue` |

## 지원 인증 수단

| 수단 | 기술 | 동작 방식 |
|------|------|----------|
| 이메일 인증 | 인증번호 발송 | 이메일로 6자리 코드 발송 → 입력 |
| SMS 인증 | 인증번호 발송 | 문자로 6자리 코드 발송 → 입력 |
| OTP 인증 | TOTP | Google OTP 앱의 6자리 코드 입력 |
| 모바일 생체 인증 | MQTT push + 생체 | 모바일 기기로 push → 기기에서 지문/얼굴 인증 |
| PC 생체 인증 | WebAuthn (platform) | Windows Hello, 지문 인식기 등 브라우저 내장 인증 |
| FIDO 보안키 | WebAuthn (ctap) | USB/NFC 보안키로 인증 |

Octatco 로그인의 상세 흐름은 [user-portal/auth/02-login-to-home-flow.md](../auth/02-login-to-home-flow.md)의 "경로 B" 섹션에서 다룬다.
