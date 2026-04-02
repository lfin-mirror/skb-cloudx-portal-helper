# VDI 인프라 용어

CloudX VDI 플랫폼을 이해하는 데 필요한 인프라/가상화 용어 정리.

## 가상화 기본

### VDI (Virtual Desktop Infrastructure)

서버에서 가상 PC(VM)를 생성하고, 사용자는 원격으로 접속해서 업무 수행하는 구조. 사용자 앞의 물리 PC는 화면 표시·입력 전달만 담당하고, 실제 연산·데이터는 서버에 존재.

```
기존 방식: 사용자마다 물리 PC 1대 지급 → PC마다 OS 설치, 보안 패치, 데이터 관리
VDI 방식:  서버에서 VM 생성 → 사용자는 원격 접속만 → 중앙에서 일괄 관리
```

### 하이퍼바이저 (Hypervisor)

물리 서버 위에서 여러 VM을 생성·관리하는 소프트웨어 계층. 물리 하드웨어(CPU, 메모리, 디스크)를 VM들이 나눠 쓸 수 있게 중재.

```
┌──────┐ ┌──────┐ ┌──────┐
│ VM 1 │ │ VM 2 │ │ VM 3 │   ← 가상 PC들
└──┬───┘ └──┬───┘ └──┬───┘
   └────────┼────────┘
      ┌─────▼─────┐
      │ 하이퍼바이저│              ← KVM/QEMU
      └─────┬─────┘
      ┌─────▼─────┐
      │ 물리 서버   │              ← CPU, RAM, 디스크
      └───────────┘
```

- **Type 1 (베어메탈)**: 물리 하드웨어 위에 직접 설치. VMware ESXi, KVM 등. 서버 가상화에 사용.
- **Type 2 (호스팅)**: OS 위에 앱처럼 설치. VirtualBox, VMware Workstation 등. 개발/테스트용.

CloudX는 Type 1(KVM) 사용.

### KVM (Kernel-based Virtual Machine)

Linux 커널에 내장된 하이퍼바이저. Linux 커널 자체가 하이퍼바이저 역할을 수행. OpenStack의 기본 하이퍼바이저.

### QEMU (Quick Emulator)

하드웨어 에뮬레이터. VM에 가상 CPU, 메모리, 디스크, 네트워크 카드, USB 컨트롤러 등을 소프트웨어로 제공. KVM과 조합하여 사용 — KVM이 CPU 가상화를 담당하고 QEMU가 나머지 하드웨어를 에뮬레이션.

```
KVM  = CPU/메모리 가상화 (하드웨어 가속)
QEMU = 나머지 장치 에뮬레이션 (디스크, 네트워크, USB, 디스플레이)
```

### libvirt

KVM/QEMU를 제어하는 추상화 API 라이브러리. OpenStack Nova가 VM을 생성/삭제/제어할 때 직접 QEMU를 호출하지 않고 libvirt를 통해 조작.

```
OpenStack Nova → libvirt → KVM/QEMU → VM
```

## 원격 접속 프로토콜

### VNC (Virtual Network Computing)

화면 프레임버퍼의 픽셀 차분을 전송하는 원격 데스크톱 프로토콜. 1998년 AT&T 케임브리지 연구소에서 개발. 단순하고 범용적이지만 USB 리디렉션, 오디오, 멀티모니터 미지원. 서버 관리 용도에 적합.

OpenStack 지원: O (Nova VNC proxy, `nova-novncproxy`)

### RDP (Remote Desktop Protocol)

Microsoft가 Windows 원격 데스크톱용으로 개발한 프로토콜. GDI 커맨드 단위로 전송하여 Windows에 최적화. USB, 오디오, 프린터 리디렉션 내장. Windows OS에서만 서버 역할 가능.

OpenStack 지원: X (KVM/QEMU 레벨이 아니라 Windows OS 레벨에서 동작하므로 Nova가 직접 관리하지 않음)

### SPICE (Simple Protocol for Independent Computing Environments)

Red Hat이 KVM/QEMU 가상화 전용으로 개발한 원격 데스크톱 프로토콜. 그래픽 커맨드 + 적응형 압축으로 전송. USB 리디렉션(`usbredir`), 양방향 오디오, 멀티모니터를 단일 프로토콜로 지원. VDI 환경에 최적화.

OpenStack 지원: O (Nova SPICE proxy, `nova-spicehtml5proxy`)

상세: [SPICE 프로토콜 문서](../admin-portal/openstack/정책/01-spice-프로토콜.md) 참고.

### VNC vs SPICE 선택 기준

```
VNC   → 서버 콘솔 접속, 단순 관리 작업, 가벼운 용도
SPICE → VDI (업무용 가상 데스크톱), USB/오디오/멀티모니터 필요 시
```

CloudX는 사용자가 하루 종일 VM에서 업무하는 VDI 환경이므로 SPICE 채택.

## VM 하드웨어 관련

### 가상 디스플레이 (Virtual Display)

QEMU가 VM에 제공하는 소프트웨어 모니터. Metadata 정책의 `monitor_cnt`로 개수, `monitor`로 해상도 타입(일반/4K) 결정. SPICE `display` 채널을 통해 사용자 PC의 물리 모니터에 매핑.

### USB 리디렉션 (USB Redirection)

사용자 PC에 꽂힌 USB 장치를 SPICE `usbredir` 채널을 통해 VM에 가상 연결하는 기능. VM 입장에서는 실제 USB가 꽂힌 것처럼 인식. Metadata 정책의 `usb_redirection`으로 동시 연결 가능 장치 수(1~8), `usb_version`으로 USB 컨트롤러 버전(2.0/3.0) 결정.

### 게스트 에이전트 (Guest Agent)

VM 내부에서 실행되는 데몬. SPICE의 경우 `spice-vdagent`가 클립보드 공유, 해상도 자동 조정, 마우스 커서 동기화를 담당. QEMU의 경우 `qemu-guest-agent`가 VM 상태 보고, 파일시스템 freeze/thaw(스냅샷용)를 담당.

## OpenStack 서비스와의 매핑

| 용어 | OpenStack 서비스 | 역할 |
|------|-----------------|------|
| VM 생성/관리 | Nova (Compute) | KVM/QEMU/libvirt를 통해 VM 라이프사이클 관리 |
| 가상 네트워크 | Neutron (Network) | VM 간 네트워크, 보안 그룹, 라우터 |
| 블록 스토리지 | Cinder (Volume) | VM 디스크(볼륨) 관리 |
| 이미지 저장소 | Glance (Image) | OS 이미지, 골든 이미지 저장 |
| 인증/테넌트 | Keystone (Identity) | 사용자/프로젝트(테넌트) 인증 |
| 원격 접속 | Nova + SPICE/VNC | nova-spicehtml5proxy 또는 nova-novncproxy |
