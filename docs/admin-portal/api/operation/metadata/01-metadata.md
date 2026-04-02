# VM 메타데이터 정책 API

## 사용 화면
- [Metadata](../../화면/정책/07-Metadata.md)
- [가상 PC 정책](../../화면/정책/02-가상%20PC%20정책.md)

리소스 경로 기준: `/v1/operation/policys/vm/mdata`

---

## 메타데이터 정책 목록 조회

```
GET /v1/operation/policys/vm/mdata
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| tnt_id | string | N | 테넌트 ID |
| vm_mdata_id | string | N | 특정 정책 ID (단건 조회 시) |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | 메타데이터 정책 목록 |
| data[].vm_mdata_id | string | VM 메타데이터 정책 ID |
| data[].vm_mdata_nm | string | VM 메타데이터 정책명 |
| data[].vm_mdata_tgt_cd | string | 정책 대상 코드 (`U006S` SA 기본 등) |
| data[].tnt_id | string | 테넌트 ID |
| data[].mdata | object | 메타데이터 설정 객체 |
| data[].mdata.devices | object | 디바이스 설정 (모니터, USB, SPICE 서버, 입력장치, 사운드) |
| data[].mdata.qemu_gstreamer | object | GStreamer 환경변수 설정 |
| data[].mdata.qemu_h264 | array | H.264 인코딩 관련 환경변수 목록 |
| data[].cont | string | 기타 설정 내용 |
| data[].volm_qos_plcy_id | string | 볼륨 QoS 정책 ID |
| data[].reg_id | string | 등록자 ID |
| data[].reg_ts | string | 등록 일시 |
| data[].mod_id | string | 수정자 ID |
| data[].mod_ts | string | 수정 일시 |

**에러 코드**

| 코드 | 설명 |
|------|------|
| 403 | 권한 없음 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/VirtualPcAuthPolicySupadm.vue` | 668 |
| `views/policy/VirtualPcNetworkPolicy.vue` | 664 |
| `components/Modals/Policy/VirtualPcPolicySetting.vue` | 779 |
| `components/Modals/Policy/VirtualPcPolicySettingFor.vue` | 802 |

---

## 메타데이터 정책 상세 조회

```
GET /v1/operation/policys/vm/mdata/{vm_mdata_id}
```

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| vm_mdata_id | string | Y | VM 메타데이터 정책 ID |

**응답**

목록 조회(`GET /v1/operation/policys/vm/mdata`) 단건 결과와 동일한 구조. `mdata` 객체 세부 필드는 목록 응답 참고.

| 필드 | 타입 | 설명 |
|------|------|------|
| vm_mdata_id | string | VM 메타데이터 정책 ID |
| vm_mdata_nm | string | VM 메타데이터 정책명 |
| vm_mdata_tgt_cd | string | 정책 대상 코드 |
| tnt_id | string | 테넌트 ID |
| mdata | object | 메타데이터 설정 객체 |
| mdata.devices | object | 디바이스 설정 |
| mdata.devices.monitor_cnt | string | 모니터 수 |
| mdata.devices.monitor | string | 모니터 해상도 규격 |
| mdata.devices.usb30 | object | USB 3.0 컨트롤러 설정 |
| mdata.devices.usb20 | array | USB 2.0 장치 목록 |
| mdata.devices.usb_redirection | object | USB 리다이렉션 설정 (redirdev 배열) |
| mdata.devices.spice_server | object | SPICE 서버 그래픽 설정 |
| mdata.devices.input | array | 입력 장치 목록 (마우스, 키보드) |
| mdata.devices.sound | object | 사운드 모델 설정 |
| mdata.qemu_gstreamer | object | GStreamer 환경변수 (`name`, `value`) |
| mdata.qemu_h264 | array | H.264 관련 환경변수 목록 (`name`, `value`) |
| cont | string | 기타 설정 내용 |
| volm_qos_plcy_id | string | 볼륨 QoS 정책 ID |
| reg_conn_id | string | 등록자 접속 ID |
| reg_id | string | 등록자 ID |
| reg_ts | string | 등록 일시 |
| mod_conn_id | string | 수정자 접속 ID |
| mod_id | string | 수정자 ID |
| mod_ts | string | 수정 일시 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/VirtualPcAuthPolicySupadm.vue` | 679, 705 |
| `views/policy/VirtualPcNetworkPolicy.vue` | 674, 706 |
| `components/Modals/Policy/VirtualPcPolicySetting.vue` | 789, 821 |
| `components/Modals/Policy/VirtualPcPolicySettingFor.vue` | 812, 844 |

---

## 메타데이터 정책 생성/수정/삭제

`MetadataPolicy.vue`, `MetadataPolicyDetail.vue`, `MetadataPolicySupadm.vue`에서 `BASE_URI = '/v1/operation/policys/vm/mdata'`를 기준으로 표준 CRUD 패턴 사용.

```
POST   /v1/operation/policys/vm/mdata
PUT    /v1/operation/policys/vm/mdata/{vm_mdata_id}
DELETE /v1/operation/policys/vm/mdata/{vm_mdata_id}
```

**Request Body (생성)**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| vm_mdata_nm | string | Y | VM 메타데이터 정책명 |
| tnt_id | string | Y | 테넌트 ID |
| mdata_key | string | Y | 메타데이터 키 |
| mdata_val | string | Y | 메타데이터 값 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/MetadataPolicy.vue` | 64 (BASE_URI 정의) |
| `views/policy/MetadataPolicyDetail.vue` | 577 (BASE_URI 정의) |
| `views/policy/MetadataPolicySupadm.vue` | 596 (BASE_URI 정의) |
