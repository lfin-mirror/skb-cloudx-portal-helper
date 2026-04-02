# VPC 보안 그룹 정책 API

## 사용 화면
- [가상 PC 정책](../../화면/정책/02-가상%20PC%20정책.md)

리소스 경로 기준: `/v1/operation/cert/secu/grps`, `/v1/operation/policys/{id}/cert/vpc`

> VPC 보안 정책은 두 개의 하위 도메인으로 구성된다.
> - **보안 인증 정책 그룹** (`cert/secu/grps`): 가상PC에 직접 적용되는 보안 그룹 정책
> - **VPC 인증 정책** (`policys/cert/vpc`): 뷰어 접속 인증 정책
>
> 상세 명세는 [인증 정책 API](../cert/01-cert.md)의 `보안 인증 정책` 및 `VPC 보안 인증 정책` 섹션 참조.

---

## 보안 그룹 상세 조회 (sg_grp_id 기준)

```
GET /v1/operation/cert/secu/grps?sg_grp_id={security_group_id}
```

**Query Parameters**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| sg_grp_id | string | Y | 보안 그룹 ID |

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | array | 보안 정책 목록 |
| data[].secu_plcy_id | string | 보안 정책 ID |
| data[].secu_plcy_nm | string | 보안 정책명 |
| data[].secu_plcy_tgt_cd | string | 정책 대상 코드 |
| data[].secu_plcy_tgt_cd_nm | string | 정책 대상명 |
| data[].group_cnt | number | 연결된 그룹 수 |
| data[].pool_cnt | number | 연결된 풀 수 |
| data[].vm_cnt | number | 연결된 VM 수 |
| data[].reg_ts | string | 등록 일시 |
| data[].mod_ts | string | 수정 일시 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/policy/SecurityGroupDetail.vue` | 817 |

---

## SA/TA 차이

### VirtualPcAuthPolicy.vue — 가상PC 보안 정책 목록

| 구분 | 비고 |
|------|------|
| 공통 | `GET /v1/operation/cert/secu/grps` |
| 응답 필터 | `secu_plcy_tgt_cd === 'U006S'` 항목 클라이언트에서 제거 (SA/TA 공통) |
| SA | `secu_plcy_tgt_cd=U006S` 초기 설정 (mounted) |

### VirtualPcAuthPolicySupadm.vue — 가상PC 보안 정책 상세

| 구분 | API | 비고 |
|------|-----|------|
| TA 전용 | `GET /v1/operation/cert/secu/grps?secu_plcy_tgt_cd={cd}` | `getCode()` 내 정책 목록, TA만 실행 |
| TA 전용 | `GET /v1/resource/proxy/assign` → Proxy 코드 필터링 | SA는 전체 코드(`P012`) 조회, TA는 할당된 것만 |
| 공통 | `GET /v1/operation/cert/secu/info/{id}` | 상세 조회 |
| TA 전용 | USB 정책 파라미터 `usb_policy_target_code=U006T` | SA는 `U006S` |
| 공통 | `GET v1/operation/policies/usb?usb_policy_target_code={cd}` | |

### VirtualPcNetworkPolicy.vue — 가상PC 네트워크 보안 정책

| 구분 | API | 비고 |
|------|-----|------|
| TA 전용 | `GET /v1/resource/proxy/assign` | Proxy 할당 여부 조회 후 코드 필터링. SA는 전체 코드(`P012`) 직접 조회 |
| TA 전용 | `GET /v1/operation/cert/secu/grps?secu_plcy_tgt_cd={cd}` | `getCode()` 내 정책 목록, TA만 실행 |
| TA 전용 | USB 정책 `usb_policy_target_code=U006T`, SA는 `U006S` | `GET v1/operation/policies/usb` |
| SA 제외 | 예외 네트워크 설정 UI 및 저장 파라미터 제외 | |
