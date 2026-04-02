# SPICE 프로토콜

SPICE (Simple Protocol for Independent Computing Environments) — Red Hat이 개발한 가상 데스크톱 원격 접속 프로토콜. KVM/QEMU/OpenStack 스택과 네이티브 통합.

CloudX에서는 Metadata 정책(A050608)의 Spice Server 설정 섹션에서 관련 옵션을 관리.

## VDI에서 SPICE의 역할

```
사용자 PC (물리)                         VM (가상 PC, 서버에 존재)
┌─────────────────┐                    ┌─────────────────┐
│ USB 마우스       │                    │ Windows OS      │
│ USB 키보드       │                    │                 │
│ USB 메모리       │    SPICE 연결      │ 가상 모니터      │
│ 웹캠             │ ◄═══════════════► │ 가상 USB 포트    │
│ 프린터           │                    │ 가상 사운드카드  │
│ 모니터 2대       │                    │                 │
└─────────────────┘                    └─────────────────┘
```

VDI 사용자는 물리 PC 앞에 앉아 있지만, 실제 업무는 서버의 VM에서 수행. SPICE는 이 둘을 연결하는 프로토콜 — 화면 전송, 키보드/마우스 입력, USB 장치 연결, 오디오 재생을 모두 하나의 프로토콜로 처리.

### CloudX 정책과의 관계

```
Metadata 정책 (A050608)     → VM에 "어떤 가상 하드웨어를 달아줄지" 결정
  │                            (모니터 몇 개, USB 포트 몇 개, SPICE 압축 방식)
  │
USB 정책 (A050609)          → "연결된 USB 중 뭘 허용/차단할지" 필터링
  │                            (유형/제조사/모델 단위로 제어)
  │
  └── 둘 다 가상 PC 정책(A0503)에서 묶여 VM에 적용
```

Metadata 정책이 "USB 포트 4개를 USB 3.0으로 만들어"라고 정의하면, USB 정책이 "그 4개 포트에 꽂히는 장치 중 HID만 허용하고 Storage는 차단"이라는 필터를 걸어줌. SPICE는 이 설정대로 사용자 PC의 USB 장치를 VM에 전달하거나 차단.

## VNC/RDP와의 비교

| 항목 | VNC | RDP | SPICE |
|------|-----|-----|-------|
| 전송 방식 | 프레임버퍼 픽셀 차분 | GDI 커맨드 | 그래픽 커맨드 + 적응형 압축 |
| 멀티모니터 | 제한적 | 지원 | 지원 |
| 오디오 | 단방향 제한 | 지원 | 양방향 (lip-sync 포함) |
| USB 리디렉션 | 별도 솔루션 필요 | RDP 내장 | SPICE 내장 (`usbredir`) |
| 비디오 스트리밍 | 없음 | 제한적 | M-JPEG 스트림 감지 내장 |
| OpenStack 통합 | Nova VNC proxy | 없음 | Nova SPICE proxy |
| 암호화 | TLS 별도 구성 | 내장 TLS | TLS 지원 (`spice_tls_port`) |

VDI에서 SPICE를 선택하는 이유: OpenStack/KVM 네이티브 통합, USB 리디렉션·양방향 오디오·멀티모니터가 단일 프로토콜에 포함, 적응형 압축으로 WAN/LAN 모두 대응.

## 구성요소

```
┌─────────────────────────────────────────────────────┐
│  사용자 브라우저 (SPICE HTML5 클라이언트)             │
└────────────────────┬────────────────────────────────┘
                     │ WebSocket
┌────────────────────▼────────────────────────────────┐
│  nova-spicehtml5proxy (포트 6082)                    │
│  - 브라우저와 compute 노드 사이의 WebSocket 프록시    │
└────────────────────┬────────────────────────────────┘
                     │ TCP
┌────────────────────▼────────────────────────────────┐
│  SPICE 서버 (libspice, QEMU에 내장)                  │
│  - nova-compute가 libvirt/QEMU를 통해 구동           │
│  - VM의 디스플레이/입력/오디오/USB를 원격 노출        │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│  게스트 에이전트 (spice-vdagent, VM 내부)            │
│  - 클립보드 공유, 해상도 자동 조정, 마우스 동기화     │
└─────────────────────────────────────────────────────┘
```

### 통신 채널 (멀티플렉스)

하나의 연결 위에 여러 채널이 다중화:

| 채널 | 역할 |
|------|------|
| `main` | 제어/설정 |
| `display` | 그래픽/비디오 |
| `inputs` | 키보드/마우스 |
| `cursor` | 커서 |
| `playback` / `record` | 오디오 출력/입력 |
| `usbredir` | USB 리디렉션 |

## OpenStack에서의 SPICE 설정

VNC와 SPICE는 **동시에 활성화할 수 없음**. nova.conf에서 VNC 비활성 후 SPICE 활성화:

```ini
[vnc]
enabled = False

[spice]
enabled = True
agent_enabled = True
html5proxy_base_url = http://<CONTROLLER_IP>:6082/spice_auto.html
server_listen = 127.0.0.1
server_proxyclient_address = 127.0.0.1
```

## CloudX Metadata 정책의 Spice 설정 항목

`MetadataPolicySupadm.vue`의 Spice Server 섹션이 관리하는 설정 항목.

### 접속 정보 (읽기 전용)

| 필드 | 설명 | 읽기 전용인 이유 |
|------|------|-----------------|
| `spice_type` | Graphics Type | `spice`로 고정 (libvirt XML `<graphics type='spice'>`) |
| `spice_address` | 바인딩 IP | nova.conf `server_listen` 값. Nova가 관리 |
| `spice_port` | 평문 포트 | VM 생성 시 동적 할당 (보통 5900번대) |
| `spice_tls_port` | 암호화 포트 | TLS 연결용. 동적 할당 |
| `spice_auto_port` | 자동 포트 할당 | `True`면 Nova가 포트를 자동 배정 |

관리자가 직접 편집할 값이 아니라 Nova가 VM 생성 시 자동 설정하는 값이므로 disabled.

### Image Compression (`spice_img_compression`)

무손실(lossless) 이미지 압축 알고리즘 선택.

| 값 | 알고리즘 | 특징 |
|----|---------|------|
| `auto_glz` | GLZ + QUIC 자동 선택 | **기본 권장값**. 이미지 특성에 따라 전환 |
| `auto_lz` | LZ + QUIC 자동 선택 | auto_glz와 유사하나 GLZ 대신 LZ |
| `quic` | SFALIC 기반 SPICE 전용 | 사진/자연 이미지에 효과적 |
| `glz` | LZ + 전역 히스토리 딕셔너리 | WAN에서 반복 패턴 제거에 유리 |
| `lz` | Lempel-Ziv | 빠르지만 GLZ보다 압축률 낮음 |
| `off` | 압축 없음 | 고속 LAN에서 CPU 절약 목적 |

`auto_glz`가 일반적으로 최선 — 텍스트/UI 영역은 GLZ, 이미지 영역은 QUIC를 자동 선택.

### JPEG Compression (`spice_jpeg_compression`)

**손실(lossy)** 압축. WAN 저속 링크 대상.

| 값 | 설명 |
|----|------|
| `auto` | 네트워크 상태 감지 후 자동 적용 |
| `never` | 비활성화 (화질 우선) |
| `always` | 항상 적용 (대역폭 절약 우선) |

### zlib Compression (`spice_zlib_compression`)

**무손실(lossless)** zlib 압축. WAN 저속 링크 대상.

| 값 | 설명 |
|----|------|
| `auto` | 자동 감지 |
| `never` | 비활성화 |
| `always` | 항상 적용 |

JPEG vs zlib: JPEG는 손실 압축(대역폭 최우선), zlib는 무손실 압축(화질 유지하면서 압축). 일반적으로 둘 다 `auto`로 네트워크 상태에 맡김.

### Streaming Mode (`spice_streaming_mode`)

빠르게 변하는 화면 영역을 M-JPEG 비디오 스트림으로 인코딩할지 여부.

| 값 | 설명 | 적합한 환경 |
|----|------|------------|
| `filter` | 서버가 추가 필터로 스트리밍 여부 판단. 보수적 적용 | 오피스 업무 (일반 VDI) |
| `all` | 빠르게 갱신되는 모든 창을 비디오 스트림으로 인코딩 | 미디어 편집/영상 재생 |
| `off` | 비디오 감지 완전 비활성화 | 화질 최우선 |

### Playback Mode (`spice_playback_mode`)

오디오 스트림의 CELT 코덱 압축 여부.

| 값 | 설명 |
|----|------|
| `on` | 오디오 압축 활성화 (대역폭 절약) |
| `off` | 오디오 압축 비활성화 (음질 우선) |

## USB Redirection over SPICE

SPICE의 `usbredir` 채널을 통해 클라이언트 로컬 USB 장치를 VM에 투명하게 전달.

```
[사용자 PC]                    [VM]
 USB 장치 연결
     │
     ▼
 SPICE 클라이언트
 usbredir 채널로 캡처 ────────→ 실제 USB 장치가 연결된 것처럼 인식
                                드라이버 설치, 파일 접근 등 일반 USB 동작
```

CloudX Metadata 정책의 USB 설정(`usb_version`, `usb_redirection`)이 이 기능을 제어:

| 필드 | 역할 | libvirt 변환 |
|------|------|-------------|
| `usb_version` | USB 컨트롤러 버전 (2.0/3.0) | `<controller type='usb'>` 모델 |
| `usb_redirection` | 동시 리디렉션 가능 장치 수 (1~8) | `<redirdev>` 항목 수 |

## 압축 설정 조합 가이드

| 환경 | image | jpeg | zlib | streaming | playback |
|------|-------|------|------|-----------|----------|
| 사내 LAN (고속) | `auto_glz` | `never` | `never` | `filter` | `off` |
| VPN/WAN (저속) | `auto_glz` | `auto` | `auto` | `filter` | `on` |
| 영상 편집/미디어 | `auto_glz` | `auto` | `auto` | `all` | `on` |
| CPU 절약 우선 | `off` | `never` | `never` | `off` | `off` |
