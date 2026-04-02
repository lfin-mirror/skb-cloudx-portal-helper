# 인증/보안 정책 API

## 사용 화면
- [Cloud PC 신청](../../../vpcinfo/01-vpc-req.md)
- [홈 화면 레이아웃 및 폴링](../../../vpcinfo/home/01-layout-and-polling.md)

## GET `/v1/operation/cert/n2nd/info/{certPlcyId}`

2차 인증 정책 정보 조회. Cloud PC 신청 전 사용자의 최대 VM 보유 수량 제한을 확인한다.

### 요청

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| certPlcyId | string | Y | 인증 정책 ID (sessionStorage `certPlcyId`) |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| vm_rstt_cnt | number | 사용자 최대 VM 보유 수량 제한 |

이 값과 현재 사용자의 VM 수(`/v1/resource/vpcs/resources` 응답 배열 길이)를 비교하여 Cloud PC 신청 가능 여부를 판단한다.

### 호출 위치

- `views/vPcInfo/VPcReqList.vue:279` — Cloud PC 신청하기 버튼 클릭 시 신청 가능 여부 확인

---

## GET `/v1/operation/cert/secu/info/{securityPolicyId}`

보안 인증 정책 정보 조회. Cloud PC에 적용된 네트워크 보안 정책(클립보드, 프린터, USB 등)을 가져온다.

### 요청

**Path Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| securityPolicyId | string | Y | 보안 정책 ID (VPC 정보의 `securityPolicyId` 필드) |

### 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| secu_plcy_id | string | 보안 정책 ID |
| secu_plcy_nm | string | 보안 정책명 |
| secu_plcy_tgt_cd | string | 보안 정책 대상 코드 |
| secu_plcy_tgt_cd_nm | string | 보안 정책 대상 코드명 |
| exc_nw_grp_id | string | 예외 네트워크 그룹 ID |
| viwr_expr_usg_yn | string | 뷰어 만료 사용 여부 (`Y`/`N`) |
| viwr_expr_mi_cnt | string | 뷰어 만료 시간(분) |
| acc_blck_plcy_id | string | 접근 차단 정책 ID |
| url_rdrt_blck_plcy_id | string | URL 리다이렉션 차단 정책 ID |
| pcly_cert | array | 네트워크 정책 인증 목록. `[0]`은 전체 네트워크 정책, `[1]`은 예외 네트워크 정책 |
| pcly_cert[].secu_plcy_auth_id | string | 보안 정책 인증 ID |
| pcly_cert[].secu_plcy_id | string | 보안 정책 ID |
| pcly_cert[].conn_net_cd | string | 접속 네트워크 코드 |
| pcly_cert[].conn_net_cd_nm | string | 접속 네트워크 코드명 |
| pcly_cert[].clb_shar_auth_cd | string | 클립보드 공유 권한 코드 |
| pcly_cert[].clb_shar_auth_cd_nm | string | 클립보드 공유 허용 코드명 |
| pcly_cert[].prt_conn_auth_cd | string | 로컬 PC 프린터 연결 권한 코드 |
| pcly_cert[].prt_conn_auth_cd_nm | string | 로컬 PC 프린터 연결 허용 코드명 |
| pcly_cert[].drag_drop_auth_cd | string | 파일 Drag & Drop 권한 코드 |
| pcly_cert[].drag_drop_auth_cd_nm | string | 파일 Drag & Drop 허용 코드명 |
| pcly_cert[].usb_plcy_id | string | USB 정책 ID |
| pcly_cert[].usb_plcy_nm | string | USB 정책명 |
| pcly_cert[].url_rdrt_auth_cd | string | URL Redirection 권한 코드 |
| pcly_cert[].url_rdrt_auth_cd_nm | string | URL Redirection 허용 코드명 |
| pcly_cert[].mult_mtor_auth_cd | string | 다중 디스플레이 권한 코드 |
| pcly_cert[].mult_mtor_auth_cd_nm | string | 다중 디스플레이 허용 코드명 |
| pcly_cert[].scr_capture_yn | string | 화면 캡처 허용 여부 (`Y`/`N`) |
| pcly_cert[].url_rdrt_to_vm_auth_cd | string | URL Redirection(VM→로컬) 권한 코드 |
| pcly_cert[].url_rdrt_to_vm_auth_cd_nm | string | URL Redirection(VM→로컬) 허용 코드명 |
| pcly_cert[].reg_id | string | 등록자 ID |
| pcly_cert[].reg_ts | string | 등록 일시 |
| pcly_cert[].mod_id | string | 수정자 ID |
| pcly_cert[].mod_ts | string | 수정 일시 |
| url_rdrt_disallow_plcy_id | string | URL 리다이렉션 비허용 정책 ID |
| vm_mdata_id | string | VM 메타데이터 정책 ID |
| proxy_type_cd | string | 프록시 유형 코드 |
| vm_mdata_nm | string | VM 메타데이터 정책명 |
| acc_blck | array | 접근 차단 목록 |
| url_blck | object | URL 차단 정보 |
| auto_resol_usg_yn | string | 자동 해상도 사용 여부 (`Y`/`N`) |
| wmk_plcy | object | 워터마크 정책 정보 |
| wmk_usg_yn | string | 워터마크 사용 여부 (`Y`/`N`) |
| reg_id | string | 등록자 ID |
| reg_ts | string | 등록 일시 |
| mod_id | string | 수정자 ID |
| mod_ts | string | 수정 일시 |
| noauth_proc_blck_plcy_id | string | 미인증 처리 차단 정책 ID |
| noAuthProcBlckPlcyDetailVo | object | 미인증 처리 차단 정책 상세 |
| vpc_auto_login_yn | string | VPC 자동 로그인 여부 (`Y`/`N`) |
| url_rdrt_disallow_to_vm_plcy_id | string | URL 리다이렉션 비허용(VM→로컬) 정책 ID |

### 호출 위치

- `views/home/components/VpcInfo.vue:502` — 홈 화면 VPC 정보 컴포넌트에서 보안 정책 로드, 기본 정책 및 예외망 정책 팝업에 데이터 전달
