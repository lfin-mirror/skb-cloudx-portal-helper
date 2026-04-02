# Cloud PC 보안 정책

Cloud PC에 접속할 때 적용되는 보안 정책. 로컬 PC와 Cloud PC 간 데이터 전송, 주변기기 연결, 화면 캡처 등을 제어한다. 보안 정책은 Cloud PC에 할당된 `securityPolicyId` 기준으로 조회하며, 하나의 정책 안에 일반 네트워크용과 예외 네트워크용 두 세트가 포함된다.

## 정책 항목

| 항목 | 화면 표시명 | API 필드 (일반) | API 필드 (예외) | 값 형태 |
|------|-----------|----------------|----------------|---------|
| 클립보드 공유 | 클립보드 공유 | `clb_shar_auth_cd_nm` | `clb_shar_auth_cd_nm` | 코드명 (예: "허용", "로컬→원격만", "미허용") |
| 프린터 연결 | 로컬 PC 프린터 연결 | `prt_conn_auth_cd_nm` | `prt_conn_auth_cd_nm` | 코드명 |
| 파일 드래그 앤 드롭 | 파일 Drag & Drop | `drag_drop_auth_cd_nm` | `drag_drop_auth_cd_nm` | 코드명 |
| 다중 디스플레이 | 다중 디스플레이 | `mult_mtor_auth_cd_nm` | `mult_mtor_auth_cd_nm` | 코드명 |
| USB 연결 | 로컬 USB 연결 | `usb_conn_auth_cd_nm` (내부용), `usb_plcy_nm` (표시용) | `usb_plcy_nm` | 정책명 (기본값: "제한") |
| 화면 캡처 | 화면 캡처 | `scr_capture_yn` | `scr_capture_yn` | `'Y'` → "허용", 그 외 → "미허용" |
| URL 리다이렉션 | URL Redirection | `url_rdrt_auth_cd_nm` | `url_rdrt_auth_cd_nm` | 코드명 |

대부분의 항목은 서버에서 코드명(`_cd_nm`)으로 내려오므로 프론트엔드에서 별도 변환 없이 그대로 표시한다. `scr_capture_yn`만 `'Y'`/`'N'` 플래그이므로 프론트엔드에서 "허용"/"미허용"으로 변환한다. 값이 없으면(`null`/`undefined`) `'-'`로 표시하고, USB 정책명이 없으면 `'제한'`으로 표시한다.

## 네트워크 구분

하나의 보안 정책에 두 세트의 디바이스 정책이 포함된다:

| 구분 | 팝업 제목 | 배열 인덱스 | 설명 |
|------|----------|-----------|------|
| 일반 네트워크 | 기본 보안정책 | `pcly_cert[0]` | 기본 네트워크에서 접속 시 적용. 홈 화면에 직접 표시됨 |
| 예외 네트워크 | 예외망 보안정책 | `pcly_cert[1]` | 관리자가 지정한 예외 네트워크에서 접속 시 적용. "예외망 > 보안 정책" 링크로 팝업 확인 |

홈 화면의 장치관리 상태 영역에는 일반 네트워크 정책(`allNwPlcyCert`)이 기본 표시된다. 예외 네트워크 정책(`excNwPlcyCert`)은 "예외망 > 보안 정책" 링크를 클릭하면 팝업(`CertPlcyExcNw`)으로 확인한다. 일반 네트워크 상세도 팝업(`DetailInfoPopup`)으로 볼 수 있다. 두 팝업 모두 동일한 7개 항목을 표시한다.

### 예외 네트워크란

예외 네트워크는 관리자가 CIDR 대역으로 지정한 특별 취급 네트워크다. admin-portal의 "예외 네트워크 설정" 메뉴에서 그룹 단위로 등록하며, 보안 정책에 `exc_nw_grp_id`로 연결된다. 사용자가 Cloud PC에 접속할 때 접속 원점 IP가 이 CIDR 대역에 해당하면 예외 네트워크 정책이, 그 외에는 일반 정책이 적용된다.

예외 네트워크 그룹 구조 (app-ms-operation `ExcNetworkVO`):

| 필드 | 설명 |
|------|------|
| `exc_nw_grp_id` | 예외 네트워크 그룹 ID |
| `exc_nw_grp_nm` | 그룹명 |
| `cidr` | 네트워크 대역 (예: `192.168.1.0`) |
| `bit` | 서브넷 비트 (예: `24`) |
| `tnt_id` | 테넌트 ID |

예외 네트워크에서는 2차 인증 요구도 별도 설정 가능하다:

| 필드 | 설명 |
|------|------|
| `exc_nw_n2nd_cert_yn` | 예외 네트워크 접속 시 2차 인증 필요 여부 (`'Y'`/`'N'`) |
| `exc_nw_n2nd_cert_mtd_cd` | 예외 네트워크 2차 인증 방식 (기본값: `U004SMS`) |

### 활용 시나리오

| 시나리오 | 일반 네트워크 정책 | 예외 네트워크 정책 |
|---------|-----------------|-----------------|
| 사내망은 엄격, 재택/외부는 완화 | USB 미허용, 캡처 미허용, 드래그 미허용 | USB 허용, 캡처 허용, 드래그 허용 |
| 사내망은 완화, 외부망은 엄격 | 클립보드/드래그/프린터 허용 | 클립보드/드래그/프린터 미허용 |
| 사내망은 2차 인증 없음, 외부망은 2차 인증 필수 | 2차 인증 없음 | `exc_nw_n2nd_cert_yn: 'Y'` (SMS 또는 OTP) |

일반 네트워크와 예외 네트워크 중 어느 쪽을 엄격하게 설정할지는 관리자가 결정한다. 예외 네트워크가 반드시 "완화"를 의미하지는 않는다.

## API

```
GET /v1/operation/cert/secu/info/{securityPolicyId}
```

응답:

```json
{
  "pcly_cert": [
    {
      "clb_shar_auth_cd_nm": "허용",
      "prt_conn_auth_cd_nm": "미허용",
      "drag_drop_auth_cd_nm": "미허용",
      "mult_mtor_auth_cd_nm": "허용",
      "usb_conn_auth_cd_nm": "미허용",
      "usb_plcy_nm": "제한",
      "scr_capture_yn": "N",
      "url_rdrt_auth_cd_nm": "허용"
    },
    {
      "clb_shar_auth_cd_nm": "허용",
      "prt_conn_auth_cd_nm": "허용",
      "drag_drop_auth_cd_nm": "허용",
      "mult_mtor_auth_cd_nm": "허용",
      "usb_plcy_nm": "허용",
      "scr_capture_yn": "Y",
      "url_rdrt_auth_cd_nm": "허용"
    }
  ]
}
```

이 API는 app-ms-operation에서 제공한다.
