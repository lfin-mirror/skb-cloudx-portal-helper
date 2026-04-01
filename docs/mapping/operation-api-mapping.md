# Operation MS API 매핑

## 매핑 현황

> 백엔드 base path: `/v1/...` (mock은 `/api/v1/operation/...` 접두사 포함)
> VpcController는 보안 인증(secu) 그룹을 담당하며 클래스명이 경로와 불일치함 (내부 도메인명 기준).

| mock API 경로 | HTTP | fixture 파일 | Controller 클래스 | 메서드명 | Response DTO | 매핑 상태 |
|---|---|---|---|---|---|---|
| /api/v1/operation/cert/n2nd/ptalType/:ptal_type_cd | GET | cert-n2nd-admin-list.json / cert-n2nd-user-list.json | N2ndController | getCertListByPortalType | ResponseResult\<List\<N2ndResponseBase\>\> | OK |
| /api/v1/operation/cert/n2nd/info/:cert_plcy_id | GET | cert-n2nd-admin-detail.json / cert-n2nd-user-detail.json | N2ndController | getCertPolicy | ResponseResult\<N2ndDetailVO\> | OK |
| /api/v1/operation/cert/n2nd/:cert_plcy_id/acc | GET | cert-n2nd-acc.json | N2ndController | getAccs | ResponseResult\<List\<AccountMappedCertBase\>\> | OK |
| /api/v1/operation/policys/cert/n2nd | GET | cert-n2nd-grp-list.json | N2ndController | getCertList (all) | ResponseResult\<List\<N2ndResponseBase\>\> | OK |
| /api/v1/operation/cert/n2nd/grps | POST | action-success.json | N2ndController | createCertPolicy | ResponseResult\<N2ndDetailVO\> | OK |
| /api/v1/operation/policys/cert/n2nd/multi | POST | action-success.json | N2ndController | createNFrm | ResponseResult\<List\<N2ndDetailVO\>\> | OK |
| /api/v1/operation/cert/n2nd/info/:cert_plcy_id | PUT | action-success.json | N2ndController | updateCertPolicy | ResponseResult\<N2ndDetailVO\> | OK |
| /api/v1/operation/cert/n2nd/info/:cert_plcy_id | DELETE | action-success.json | N2ndController | deleteCertPolicy | ResponseResult\<ResponseMessage\> | OK |
| /api/v1/operation/policys/cert/A007ADM/:cert_plcy_id | GET | cert-policy-adm-detail.json | N2ndController | getCertPolicy | ResponseResult\<N2ndDetailVO\> | OK |
| /api/v1/operation/policys/cert/A007ADM/:cert_plcy_id | PUT | action-success.json | N2ndController | updateCertPolicy | ResponseResult\<N2ndDetailVO\> | OK |
| /api/v1/operation/policys/cert/A007USR/:cert_plcy_id | GET | cert-policy-usr-detail.json | N2ndController | getCertPolicy | ResponseResult\<N2ndDetailVO\> | OK |
| /api/v1/operation/policys/cert/A007USR/:cert_plcy_id | PUT | action-success.json | N2ndController | updateCertPolicy | ResponseResult\<N2ndDetailVO\> | OK |
| /api/v1/operation/cert/secu/grps | GET | cert-secu-grps-list.json / cert-secu-grps-list-ta.json | VpcController | getGrps | ResponseResult\<List\<VpcResponseBase\>\> | OK |
| /api/v1/operation/cert/secu/info/:cert_secu_id | GET | cert-secu-info-detail.json | VpcController | getVpcPolicy | ResponseResult\<VpcDetailVO\> | OK |
| /api/v1/operation/cert/secu/adopter/info/:secuPlcyId | GET | cert-secu-adopter-info.json | VpcController | getAdopterInfo | ResponseResult\<VpcAdptDetailVO\> | OK |
| /api/v1/operation/cert/secu/adopter/info | POST | (inline JSON) | VpcController | createAdopterInfo | ResponseResult\<VpcAdptDetailVO\> | OK |
| /api/v1/operation/cert/secu/noauth/dup-check | GET | (inline JSON) | NoAuthController | checkPolicyNameAvailability | ResponseResult\<NoAuthProcBlckPlcyDupCheckResult\> | OK |
| /api/v1/operation/cert/secu/noauth | GET | cert-secu-noauth-list.json | NoAuthController | getNoAuthProcBlockPolicyList | ResponseResult\<List\<NoAuthProcBlckPlcyBase\>\> | OK |
| /api/v1/operation/cert/secu/noauth/:blck_plcy_id | GET | cert-secu-noauth-detail.json | NoAuthController | getNoAuthProcBlockPolicy | ResponseResult\<NoAuthProcBlckPlcyDetailVo\> | OK |
| /api/v1/operation/cert/secu/noauth/:blck_plcy_id/blck | GET | cert-secu-noauth-blck-list.json | NoAuthController | getNoAuthProcBlockList | ResponseResult\<List\<NoAuthProcBlckVo\>\> | OK |
| /api/v1/operation/cert/secu/grps | POST | action-success.json | VpcController | createSecuGrps | ResponseResult\<VpcDetailVO\> | OK |
| /api/v1/operation/cert/secu/grp | POST | action-success.json | VpcController | createSecuGrp | ResponseResult\<VpcGrpDetailVO\> | OK |
| /api/v1/operation/cert/secu/noauth | POST | action-success.json | NoAuthController | createNoAuthProcBlockPolicy | ResponseResult\<NoAuthProcBlckPlcyDetailVo\> | OK |
| /api/v1/operation/cert/secu/info/:cert_secu_id | PUT | action-success.json | VpcController | modifyVpcPolicy | ResponseResult\<VpcDetailVO\> | OK |
| /api/v1/operation/cert/secu/noauth | PUT | action-success.json | NoAuthController | modifyNoAuthProcBlockPolicy | ResponseResult\<NoAuthProcBlckPlcyDetailVo\> | OK |
| /api/v1/operation/cert/secu/info/:cert_secu_id | DELETE | action-success.json | VpcController | removeVpcPolicy | ResponseResult\<ResponseMessage\> | OK |
| /api/v1/operation/cert/secu/noauth | DELETE | action-success.json | NoAuthController | removeNoAuthProcBlockPolicy | ResponseResult\<ResponseMessage\> | OK |
| /api/v1/operation/policys/cert/vpc | GET | cert-vpc-list.json | - | - | - | 미매핑 |
| /api/v1/operation/policys/:policy_id/cert/vpc/ | GET | cert-vpc-detail.json | - | - | - | 미매핑 |
| /api/v1/operation/policys/cert/vpc | POST | action-success.json | - | - | - | 미매핑 |
| /api/v1/operation/policys/:policy_id/cert/vpc/ | PUT | action-success.json | - | - | - | 미매핑 |
| /api/v1/operation/policies/usb/types | GET | usb-type-list.json | UsbTypeController | getUsbTypes | ResponseResult\<List\<UsbTypeBase\>\> | OK |
| /api/v1/operation/policies/usb/types | DELETE | action-success.json | UsbTypeController | deleteUsbTypes | ResponseResult\<ResponseMessage\> | OK |
| /api/v1/operation/policies/usb/types/:usb_type_id | GET | usb-type-detail.json | UsbTypeController | getUsbType | ResponseResult\<UsbTypeVO\> | OK |
| /api/v1/operation/policies/usb/types/:usb_type_id/usb_policies | GET | usb-type-usb-policies.json | UsbTypeController | getUsbPoliciesByUsbTypeId | ResponseResult\<List\<UsbPolicyBase\>\> | OK |
| /api/v1/operation/policies/usb/types | POST | action-success.json | UsbTypeController | createUsbType | ResponseResult\<UsbTypeVO\> | OK |
| /api/v1/operation/policies/usb/types/:usb_type_id | PUT | action-success.json | UsbTypeController | updateUsbType | ResponseResult\<UsbTypeVO\> | OK |
| /api/v1/operation/policies/usb/vendors | GET | usb-vendor-list.json | UsbVendorController | getUsbVendors | ResponseResult\<List\<UsbVendorBase\>\> | OK |
| /api/v1/operation/policies/usb/vendors | DELETE | action-success.json | UsbVendorController | deleteUsbVendors | ResponseResult\<ResponseMessage\> | OK |
| /api/v1/operation/policies/usb/vendors/:usb_vendor_id | GET | usb-vendor-detail.json | UsbVendorController | getUsbVendor | ResponseResult\<UsbVendorVO\> | OK |
| /api/v1/operation/policies/usb/vendors/:usb_vendor_id/usb_policies | GET | usb-vendor-usb-policies.json | UsbVendorController | getUsbPoliciesByUsbVendor | ResponseResult\<List\<UsbPolicyBase\>\> | OK |
| /api/v1/operation/policies/usb/vendors/:usb_vendor_id/models | GET | usb-vendor-models.json | UsbVendorController | getUsbModelsByUsbVendor | ResponseResult\<List\<UsbModelBase\>\> | OK |
| /api/v1/operation/policies/usb/vendors | POST | action-success.json | UsbVendorController | createUsbVendor | ResponseResult\<UsbVendorVO\> | OK |
| /api/v1/operation/policies/usb/vendors/:usb_vendor_id | PUT | action-success.json | UsbVendorController | updateUsbVendor | ResponseResult\<UsbVendorVO\> | OK |
| /api/v1/operation/policies/usb/models | GET | usb-model-list.json | UsbModelController | getUsbModels | ResponseResult\<List\<UsbVendorWithModelBase\>\> | OK |
| /api/v1/operation/policies/usb/models | DELETE | action-success.json | UsbModelController | deleteUsbModels | ResponseResult\<ResponseMessage\> | OK |
| /api/v1/operation/policies/usb/models/:usb_model_id | GET | usb-model-detail.json | UsbModelController | getUsbModel | ResponseResult\<UsbVendorWithModelVO\> | OK |
| /api/v1/operation/policies/usb/models/:usb_model_id/usb_policies | GET | usb-model-usb-policies.json | UsbModelController | getUsbPoliciesByUsbModel | ResponseResult\<List\<UsbPolicyBase\>\> | OK |
| /api/v1/operation/policies/usb/models | POST | action-success.json | UsbModelController | createUsbModel | ResponseResult\<UsbModelVO\> | OK |
| /api/v1/operation/policies/usb/models/:usb_model_id | PUT | action-success.json | UsbModelController | updateUsbModel | ResponseResult\<UsbModelVO\> | OK |
| /api/v1/operation/policies/usb | GET | usb-policy-list.json | UsbPolicyController | getUsbPolicies | ResponseResult\<List\<UsbPolicyBase\>\> | OK |
| /api/v1/operation/policies/usb | DELETE | action-success.json | UsbPolicyController | deleteUsbPolicies | ResponseResult\<ResponseMessage\> | OK |
| /api/v1/operation/policies/usb/:usb_policy_id/vpc_policies | GET | usb-policy-vpc-policies.json | UsbPolicyController | getVpcPoliciesByUsbPolicyId | List\<VpcResponseBase\> | OK |
| /api/v1/operation/policies/usb/:usb_policy_id/types | GET | usb-policy-types.json | UsbPolicyController | getUsbTypesByUsbPolicyId | ResponseResult\<List\<UsbTypeVO\>\> | OK |
| /api/v1/operation/policies/usb/:usb_policy_id/vendors | GET | usb-policy-vendors.json | UsbPolicyController | getUsbVendorsByUsbPolicyId | ResponseResult\<List\<UsbVendorWithModelVO\>\> | OK |
| /api/v1/operation/policies/usb/:usb_policy_id/add_types | PUT | action-success.json | UsbPolicyController | addUsbTypesToUsbPolicy | ResponseResult\<List\<UsbTypeVO\>\> | OK |
| /api/v1/operation/policies/usb/:usb_policy_id/remove_types | PUT | action-success.json | UsbPolicyController | removeUsbTypesFromUsbPolicy | ResponseResult\<List\<UsbTypeVO\>\> | OK |
| /api/v1/operation/policies/usb/:usb_policy_id/add_vendors | PUT | action-success.json | UsbPolicyController | addUsbVendorsToUsbPolicy | ResponseResult\<List\<UsbVendorWithModelVO\>\> | OK |
| /api/v1/operation/policies/usb/:usb_policy_id/remove_vendors | PUT | action-success.json | UsbPolicyController | removeUsbVendorsFromUsbPolicy | ResponseResult\<List\<UsbVendorWithModelVO\>\> | OK |
| /api/v1/operation/policies/usb/:usb_policy_id | GET | usb-policy-detail.json | UsbPolicyController | getUsbPolicy | ResponseResult\<UsbPolicyVO\> | OK |
| /api/v1/operation/policies/usb | POST | action-success.json | UsbPolicyController | createUsbPolicy | ResponseResult\<UsbPolicyVO\> | OK |
| /api/v1/operation/policies/usb/:usb_policy_id | PUT | action-success.json | UsbPolicyController | updateUsbPolicy | ResponseResult\<UsbPolicyVO\> | OK |
| /api/v1/operation/policy/bkupsnap/grps | GET | backup-grp-list.json | BkupSnapPlcyController | getBackupSnapshotPolicyList | ResponseResult\<List\<BkupSnapPlcyBase\>\> | OK |
| /api/v1/operation/policy/bkupsnap/info/:bkup_plcy_id | GET | backup-detail.json | BkupSnapPlcyController | getBackupSnapshotPolicy | ResponseResult\<BkupSnapPlcyDetailVO\> | OK |
| /api/v1/operation/policy/bkupsnap/grps | POST | action-success.json | BkupSnapPlcyController | createGrps | ResponseResult\<BkupSnapPlcyDetailVO\> | OK |
| /api/v1/operation/policy/bkupsnap/info/:bkup_plcy_id | PUT | action-success.json | BkupSnapPlcyController | modifyBackupSnapshotPolicy | ResponseResult\<BkupSnapPlcyDetailVO\> | OK |
| /api/v1/operation/policy/bkupsnap/info/:bkup_plcy_id | DELETE | action-success.json | BkupSnapPlcyController | removeBackupSnapshotPolicy | ResponseResult\<ResponseMessage\> | OK |
| /api/v1/operation/policys/acclbck/plcys/ | GET | acclbck-plcys-list.json | AccBlckController | getAccessBlockGroupList | ResponseResult\<List\<AccBlckBase\>\> | OK |
| /api/v1/operation/policys/acclbck/plcys/:acc_blck_plcy_id | GET | access-control-detail.json | AccBlckController | getAccessBlockGroup | ResponseResult\<AccessBlockMultiVO\> | OK |
| /api/v1/operation/policys/acclbck/plcys | POST | action-success.json | AccBlckController | createAccessBlockGroup | ResponseResult\<AccessBlockMultiVO\> | OK |
| /api/v1/operation/policys/acclbck/plcys/:acc_blck_plcy_id | PUT | action-success.json | AccBlckController | updateAccessBlockGroup | ResponseResult\<AccessBlockMultiVO\> | OK |
| /api/v1/operation/policys/acclbck/plcys/:acc_blck_plcy_id | DELETE | action-success.json | AccBlckController | deleteAccessBlockGroup | ResponseResult\<ResponseMessage\> | OK |
| /api/v1/operation/policys/swblst/:blst_file_id/downLoad | GET | (CSV 직접 반환) | SwBlstController | (download method) | text/csv | OK |
| /api/v1/operation/policys/swblst | GET | blacklist-list.json | SwBlstController | getSwBlackLists | ResponseResult\<List\<SwBlstDetailVO\>\> | OK |
| /api/v1/operation/policys/swblst/:blst_file_id | GET | blacklist-detail.json | SwBlstController | getSwBlackList | ResponseResult\<SwBlstDetailVO\> | OK |
| /api/v1/operation/policys/swblst | POST | action-success.json | SwBlstController | createSwBlackList | ResponseResult\<SwBlstDetailVO\> | OK |
| /api/v1/operation/policys/lnet | GET | network-list.json | - | - | - | 미매핑 |
| /api/v1/operation/policys/lnet/:sbn_id | GET | network-detail.json | - | - | - | 미매핑 |
| /api/v1/operation/policys/lnet | POST | action-success.json | - | - | - | 미매핑 |
| /api/v1/operation/policys/lnet/:sbn_id | PUT | action-success.json | - | - | - | 미매핑 |
| /api/v1/operation/policys/lnet/:sbn_id | DELETE | action-success.json | - | - | - | 미매핑 |
| /api/v1/operation/policy/excn/excngrp | GET | excn-grp-list.json | ExcnwController | getExcNetworkGroupList | ResponseResult\<List\<ExcNetworkBase\>\> | OK |
| /api/v1/operation/policy/excn/excngrp/:exc_nw_grp_id | GET | excn-grp-detail.json | ExcnwController | getExcNetworkGroup | ResponseResult\<ExcNetworkGroupVO\> | OK |
| /api/v1/operation/policy/excn/excngrps/:exc_nw_grp_id | GET | excn-grp-detail.json | ExcnwController | getExcNetworkGroupDetail | ResponseResult\<ExcNetworkMultiVO\> | OK |
| /api/v1/operation/policy/excn/excngrps | POST | action-success.json | ExcnwController | createExcNetworkGroup | ResponseResult\<ExcNetworkMultiVO\> | OK |
| /api/v1/operation/policy/excn/excngrps/:exc_nw_grp_id | PUT | action-success.json | ExcnwController | updateExcNetworkGroup | ResponseResult\<ExcNetworkMultiVO\> | OK |
| /api/v1/operation/policy/excn/excngrps/:exc_nw_grp_id | DELETE | action-success.json | ExcnwController | deleteExcNetworkGroup | ResponseResult\<ResponseMessage\> | OK |
| /api/v1/operation/policy/url/rdrt/disallow/policy | GET | url-rdrt-disallow-list.json | UrlRdrtDisallowController | getUrlRedirectionPolicyList | ResponseResult\<List\<UrlRdrtDisallowBase\>\> | OK |
| /api/v1/operation/policy/url/rdrt/disallow/policy/:url_disallow_id | GET | url-disallow-detail.json | UrlRdrtDisallowController | get | ResponseResult\<UrlRdrtDisallowVO\> | OK |
| /api/v1/operation/policy/url/rdrt/disallow/policy | POST | action-success.json | UrlRdrtDisallowController | create | ResponseEntity\<?> | OK |
| /api/v1/operation/policy/url/rdrt/disallow/policy/:url_disallow_id | PUT | action-success.json | UrlRdrtDisallowController | update | ResponseEntity\<?> | OK |
| /api/v1/operation/policy/url/rdrt/disallow/policy/:url_disallow_id | DELETE | action-success.json | UrlRdrtDisallowController | delete | ResponseResult\<ResponseMessage\> | OK |
| /api/v1/operation/policys/powermgt/:policy_id | GET | power-detail.json | PowerController | get | ResponseResult\<PowerMngDetailVO\> | OK |
| /api/v1/operation/policys/powermgt | POST | action-success.json | PowerController | create | ResponseResult\<PowerMngDetailVO\> | OK |
| /api/v1/operation/policys/powermgt/:policy_id | PUT | action-success.json | PowerController | update | ResponseResult\<PowerMngDetailVO\> | OK |
| /api/v1/operation/policys/rset/:policy_id | GET | rset-detail.json | RsetPlcyController | get | ResponseResult\<RsetPlcyDetailVO\> | OK |
| /api/v1/operation/policys/rset | POST | action-success.json | RsetPlcyController | create | ResponseResult\<RsetPlcyDetailVO\> | OK |
| /api/v1/operation/policys/rset/:policy_id | PUT | action-success.json | RsetPlcyController | update | ResponseResult\<RsetPlcyDetailVO\> | OK |
| /api/v1/operation/policys/vm/mdata | GET | vm-mdata-list.json | VmMdataController | getVmMetaDataList | ResponseResult\<List\<VmMdataBase\>\> | OK |
| /api/v1/operation/policys/vm/mdata/:vm_mdata_id | GET | metadata-detail.json | VmMdataController | getVmMetaData | ResponseResult\<VmMdataDetailVO\> | OK |
| /api/v1/operation/policys/vm/mdata | POST | action-success.json | VmMdataController | createVmMetaData | ResponseResult\<VmMdataDetailVO\> | OK |
| /api/v1/operation/policys/vm/mdata/:vm_mdata_id | PUT | action-success.json | VmMdataController | updateVmMetaData | ResponseResult\<VmMdataDetailVO\> | OK |
| /api/v1/operation/policys/vm/mdata/:vm_mdata_id | DELETE | action-success.json | VmMdataController | deleteVmMetaData | ResponseResult\<ResponseMessage\> | OK |
| /api/v1/operation/outs/interfaces | GET | external-interfaces-list.json | ExtController | getInterfaceList | List\<ExtInterfaceVO\> | OK |
| /api/v1/operation/outs/interfaces/email | GET | external-email.json | ExtController | getEmail | ExtEmailDetailVO | OK |
| /api/v1/operation/outs/interfaces/email | PUT | action-success.json | ExtController | updateEmail | ExtEmailDetailVO | OK |
| /api/v1/operation/outs/interfaces/netapp | GET | external-netapp.json | ExtController | getNetApp | ExtNetAppDetailVO | OK |
| /api/v1/operation/outs/interfaces/netapp | PUT | action-success.json | ExtController | updateNetApp | ExtNetAppDetailVO | OK |
| /api/v1/operation/outs/interfaces/usr | GET | ad-interlock-usr.json | ExtController | getUsr | ExtUsrDetailVO | OK |
| /api/v1/operation/outs/interfaces/usr | PUT | action-success.json | ExtController | updateUsr | ExtUsrDetailVO | OK |
| /api/v1/operation/outs/interfaces/octatco | GET | external-octatco.json | ExtController | getOctatco | ExtOctatcoDetailVO | OK |
| /api/v1/operation/outs/interfaces/octatco | PUT | action-success.json | ExtController | updateOctatco | ExtOctatcoDetailVO | OK |
| /api/v1/operation/outs/interfaces/:ext_itlk_div_cd | GET | (fixtureMap 분기) | ExtController | getInterfaceList (fallback) | List\<ExtInterfaceVO\> | OK |
| /api/v1/operation/outs/interfaces/:ext_itlk_div_cd | PUT | action-success.json | ExtController | (update fallback) | - | OK |
| /api/v1/operation/system/license | GET | system-license.json | LicenseController | get | ResponseResult\<LicenseVO\> | OK |
| /api/v1/operation/policy/storage/sched/ | GET | storage-sched.json | StorageSchedPlcyController | getPolicies | ResponseResult\<List\<StorageSchedPlcyDetailVO\>\> | OK |
| /api/v1/operation/policy/storage/sched | POST | action-success.json | StorageSchedPlcyController | createPolicy | ResponseResult\<StorageSchedPlcyDetailVO\> | OK |
| /api/v1/operation/log/vm/vm | GET | vm-access-log-list.json | ConnLogController | pagingConnLog | ResponseResult\<List\<ConnLogDetailVO\>\> | OK |
| /api/v1/operation/secu/cert/list/:type/:certType | GET | cert-{type}-{certType}.json | ScertController | pagingCertificate | ResponseResult\<List\<CertificateInfo\>\> | OK |
| /api/v1/operation/secu/cert/infm | GET | cert-infm-list.json | ScertController | pagingExpiry | ResponseResult\<List\<ScertExpiryListVO\>\> | OK |

## 미매핑 목록 요약

| mock API 경로 | 비고 |
|---|---|
| /api/v1/operation/policys/cert/vpc | VPC 인증 정책 — 백엔드 Controller 미발견 |
| /api/v1/operation/policys/:policy_id/cert/vpc/ | VPC 인증 정책 상세 — 백엔드 Controller 미발견 |
| /api/v1/operation/policys/lnet | 네트워크 정책 — 백엔드 Controller 미발견 (`lnet` 키워드 없음) |
| /api/v1/operation/policys/lnet/:sbn_id | 네트워크 정책 상세 — 백엔드 Controller 미발견 |

## Controller 클래스 위치

| Controller 클래스 | 패키지 경로 |
|---|---|
| N2ndController | rest/nsecond/controller/ |
| VpcController | rest/vpc/controller/ (경로: /v1/cert/secu) |
| NoAuthController | rest/noauth/controller/ |
| UsbPolicyController | rest/policy/usb/core/controller/ |
| UsbTypeController | rest/policy/usb/type/controller/ |
| UsbVendorController | rest/policy/usb/vendor/controller/ |
| UsbModelController | rest/policy/usb/model/controller/ |
| BkupSnapPlcyController | rest/bkupsnap/controller/ |
| AccBlckController | rest/accblck/controller/ |
| SwBlstController | rest/swblst/controller/ |
| ExcnwController | rest/excnw/controller/ |
| UrlRdrtDisallowController | rest/url/rdrt/disallow/controller/ |
| PowerController | rest/powermng/controller/ |
| RsetPlcyController | rest/rsetplcy/controller/ |
| VmMdataController | rest/vm/mdata/controller/ |
| ExtController | rest/external/controller/ |
| LicenseController | rest/license/controller/ |
| StorageSchedPlcyController | rest/storage/controller/ |
| ConnLogController | rest/connlog/controller/ |
| ScertController | rest/scert/controller/ |
