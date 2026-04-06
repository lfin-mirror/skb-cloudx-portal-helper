---
type: screen
title: Metadata
menu_id: [A050608, T050608]
status: stable
version: v2.2.10
portal: admin
path: /policy/policy-manage/metadata-policy
component_sa: MetadataPolicySupadm.vue
component_ta: MetadataPolicy.vue
access: [SA, TA]
related_menus: [A0503, T0503]
api_endpoints:
  - GET /v1/operation/policys/vm/mdata
  - PUT /v1/operation/policys/vm/mdata/{id}
---

# Metadata (A050608, T050608)

- 경로: `/policy/policy-manage/metadata-policy`
- SA 컴포넌트: `MetadataPolicySupadm.vue`
- TA 컴포넌트: `MetadataPolicy.vue`

VM의 하드웨어/디바이스 설정을 정의하는 정책. OpenStack VM 생성 시 metadata로 전달되어 VM의 모니터, USB, 입력 장치, 디스크 QoS, Spice 서버 등을 제어.

## UI 레이아웃

SA: 폼 기반 단일 화면. 여러 디바이스 설정 섹션이 상하로 배치.
TA: 목록 + 상세 폼. 정책 등록/삭제/가져오기 가능.

## 설정 항목

### 모니터 (Video Device)

| 필드 | 설명 | 값 |
|------|------|-----|
| `monitor_cnt` | 장치 최대 개수 | 드롭다운 (1~N) |
| `monitor` | 모니터 타입 | `DEFAULT`: 일반 모니터 / `4KWIDE`: 4K 와이드 모니터 |

### USB 설정

| 필드 | 설명 | 값 |
|------|------|-----|
| `usb_version` | USB 컨트롤러 버전 | 드롭다운 |
| `usb_redirection` | USB 리다이렉션 수 | 숫자 (1~8) |

### Spice Server 설정

VM 원격 접속 시 사용하는 SPICE 프로토콜 설정.

| 필드 | 설명 | 비고 |
|------|------|------|
| `spice_use_yn` | SPICE 사용 여부 | Y/N |
| `spice_type` | Graphics Type | 읽기 전용 |
| `spice_address` | Address | 읽기 전용 |
| `spice_port` | Port | 읽기 전용 |
| `spice_tls_port` | TLS Port | 읽기 전용 |
| `spice_auto_port` | Auto Port | 읽기 전용 |
| `spice_img_compression` | Image Compression | 선택 가능 |
| `spice_jpeg_compression` | JPEG Compression | 선택 가능 |
| `spice_zlib_compression` | zlib Compression | 선택 가능 |
| `spice_streaming_mode` | Streaming Mode | 선택 가능 |
| `spice_playback_mode` | Playback Mode | 선택 가능 |

`spice_use_yn == 'Y'`일 때만 하위 설정 노출. 접속 정보(type, address, port)는 읽기 전용이고 압축/스트리밍 옵션만 변경 가능.

### Input Device

입력 장치(키보드, 마우스 등) 설정. 추가/삭제 버튼은 비활성화 처리됨 (CLOUDPCQA-1490).

### Disk QoS

디스크 I/O 제한 설정. 현재 **미사용** (IAADEV-6206). UI에서 disabled 처리.

## SA vs TA 차이

| 항목 | 세부 항목 | SA | TA |
|------|----------|----|----|
| 컴포넌트 | — | `MetadataPolicySupadm.vue` (폼 1개) | `MetadataPolicy.vue` (목록 + 상세) |
| UI 구조 | — | 폼 1개 직접 편집 | 목록 + 상세 폼 |
| 역할 | — | 기본 정책 템플릿 정의 | 테넌트별 정책 커스터마이징 |
| 정책 등록 | — | 불가 (`!isSuperAdmin` 조건) | 가능 (신규 정책 생성) |
| 정책 삭제 | — | 불가 | 가능 |
| 정책 가져오기 | — | 비노출 | 가능 (SA 템플릿 복제) |
| 설정 편집 | 모니터, USB, Spice 등 | 편집 가능 | 편집 가능 |

## 버튼 동작

| 버튼 | SA | TA | 클릭 시 동작 |
|------|----|----|------------|
| **저장** | 노출 | 노출 | `PUT /v1/operation/policys/vm/mdata/{id}` |
| **등록** | 비노출 | 노출 (`!isSuperAdmin`) | 빈 폼 → `POST /v1/operation/policys/vm/mdata` |
| **삭제** | 비노출 | 노출 (`id && !isSuperAdmin`) | 확인 팝업 → `DELETE /v1/operation/policys/vm/mdata/{id}` |
| **정책 가져오기** | 비노출 | 노출 (`!id && !isSuperAdmin`) | SA 정책 복사 |

## API

| 동작 | API | 명세 |
|------|-----|------|
| 조회 | `GET /v1/operation/policys/vm/mdata` | [명세](../../api/operation/metadata/01-metadata.md) |
| 수정 | `PUT /v1/operation/policys/vm/mdata/{id}` | [명세](../../api/operation/metadata/01-metadata.md) |

## 가상 PC 정책과의 관계

Metadata 정책은 VM의 **하드웨어 스펙**(모니터, USB, Spice)을 정의. 가상 PC 정책(A0503)은 VM의 **보안 동작**(인증, 워터마크, 접근 차단)을 정의. 둘 다 VM에 적용되지만 제어 영역이 다름.

```
Metadata (A050608)     → VM 하드웨어/디바이스 설정 (모니터 수, USB 버전, Spice)
가상 PC 정책 (A0503)   → VM 보안 동작 (2차 인증, 워터마크, 세션 만료)
```

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|---------|
| v1.1 | 2026-04-01 | 버튼 동작 상세 추가 |
| v1.0 | 2026-03-31 | 최초 작성 |
