# Proxy — VDI 네트워크 구성

admin-portal 메뉴: 시스템 자원 > Proxy 서버 (A1009/T1009)

## VDI 환경의 Proxy

Proxy 서버는 OpenStack 고유 기능이 아닌 VDI 플랫폼의 네트워크 아키텍처 구성 요소. 가상 PC와 외부 네트워크 간 트래픽을 중계·제어.

## Forward Proxy (L4, 전송 계층)

가상 PC → 외부 통신 경로에서 중계.

```
┌─ 가상 PC ─┐     ┌─ Forward Proxy ─┐     ┌─ 인터넷 ─┐
│ (클라이언트) │ ──→ │   (L4 중계)       │ ──→ │          │
└────────────┘     └─────────────────┘     └──────────┘
```

### 역할

- **URL 필터링**: 허용/차단 URL 정책 적용
- **대역폭 제어**: 테넌트/사용자별 대역폭 제한
- **로깅**: 외부 접속 기록 (감사 로그)
- **인증**: 사용자 인증 후 외부 접속 허용

### L4 특성

- TCP/UDP 레벨에서 동작
- IP + Port 기반 라우팅
- 패킷 내용(HTTP 헤더 등)을 검사하지 않음
- 성능이 높고 지연이 적음

### CloudX 관리 항목

| 필드 | 설명 |
|------|------|
| `proxy_nm` | Proxy 서버 이름 |
| `service_ip` | 서비스 IP |
| `service_min_port` ~ `service_max_port` | 서비스 포트 범위 |
| `sts_cd` | 상태 (정상/경고/에러) |

## Reverse Proxy (L7, 응용 계층)

외부 → 가상 PC 접속 경로에서 중계.

```
┌─ 사용자 ─┐     ┌─ Reverse Proxy ─┐     ┌─ 가상 PC ─┐
│ (브라우저) │ ──→ │   (L7 중계)       │ ──→ │ (VDI 세션)  │
└───────────┘     └─────────────────┘     └────────────┘
```

### 역할

- **SSL/TLS 종료**: HTTPS 암호화/복호화 처리
- **로드 밸런싱**: 여러 가상 PC로 세션 분산
- **접근 제어**: 클라이언트 인증, IP 필터링
- **프로토콜 변환**: 외부 HTTPS → 내부 VDI 프로토콜 (RDP/PCoIP/Blast)

### L7 특성

- HTTP/HTTPS 레벨에서 동작
- URL 경로, 헤더, 쿠키 기반 라우팅
- 콘텐츠 검사 가능 (WAF 기능)
- Forward Proxy보다 처리 부하 높음

### CloudX 관리 항목

| 필드 | 설명 |
|------|------|
| `proxy_nm` | Proxy 서버 이름 |
| `service_ip` | 서비스 IP |
| `service_port` | 서비스 포트 |
| `max_conn_limit` | 최대 동시 접속 VM 수 |
| `sts_cd` | 상태 |

## API

CloudX 자체 관리 API (OpenStack 미경유):

| 역할 | 메서드 | 경로 |
|------|--------|------|
| SA L4 | GET | `/v1/resource/proxy/L4/admin` |
| TA L4 | GET | `/v1/resource/proxy/L4/tenant` |
| SA L7 | GET | `/v1/resource/proxy/L7/admin` |
| TA L7 | GET | `/v1/resource/proxy/L7/tenant` |

현재 admin-portal에서는 **조회만** 지원. Proxy 서버 자체의 설정 변경은 인프라 팀에서 직접 관리.
