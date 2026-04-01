# Resource MS API 매핑

## 매핑 현황

| mock API 경로 | HTTP | fixture 파일 | Controller 클래스 | 메서드명 | Response DTO | 매핑 상태 |
|---|---|---|---|---|---|---|
| /api/v1/resource/vpcs/group | GET | vpc-group-list.json | GroupController | paging | GroupList | OK |
| /api/v1/resource/vpcs/group/:id | GET | vpc-group-detail.json | GroupController | get | GroupDetail | OK |
| /api/v1/resource/vpcs/group | POST | action-success.json | GroupController | create | GroupDetail | OK |
| /api/v1/resource/vpcs/group/:vmGrpId | PUT | action-success.json | GroupController | update | GroupDetail | OK |
| /api/v1/resource/vpcs/group/:vmGrpId | DELETE | action-success.json | GroupController | delete | - | OK |
| /api/v1/resource/vpcs/group/:vmGrpId/network | POST | action-success.json | GroupController | addNetwork | GroupDetail | OK |
| /api/v1/resource/vpcs/group/:vmGrpId/network | DELETE | action-success.json | GroupController | removeNetwork | GroupDetail | OK |
| /api/v1/resource/vpcs/pool/count | GET | vpc-pool-count.json | PoolController | getPoolCount | PoolCountVO | OK |
| /api/v1/resource/vpcs/pool2 | GET | vpc-pool-list.json | PoolController | paging2 | PoolList | OK |
| /api/v1/resource/vpcs/pool/auto/:companyNm | GET | vpc-pool-list.json | PoolController | auto_create_pool | PoolDetail | OK |
| /api/v1/resource/vpcs/pool/:vmPoolId/ip | GET | vpc-pool-ip-list.json | - | - | - | 미매핑 |
| /api/v1/resource/vpcs/pool/:poolId/template/history | GET | vpc-pool-template-history.json | PoolController | getTemplateHistory | PageResponse\<TemplateHistoryEntity\> | OK |
| /api/v1/resource/vpcs/pool/:id/image-mismatched-vm | GET | vpc-image-mismatched.json | PoolController | getMismatchedVm | PageResponse\<VMStatusEntity\> | OK |
| /api/v1/resource/vpcs/pool/:poolId/subnet | POST | action-success.json | PoolController | addSubnet | PoolDetail | OK |
| /api/v1/resource/vpcs/pool/:vmPoolId/subnet | PUT | action-success.json | - | - | - | 미매핑 |
| /api/v1/resource/vpcs/pool/:vmPoolId/reset | PUT | action-success.json | PoolController | resetPool | - | OK |
| /api/v1/resource/vpcs/pool/:vmPoolId/template | PUT | action-success.json | PoolController | changePoolTemplate | CloudXResponse | OK |
| /api/v1/resource/vpcs/pool/:vmPoolId/volume | POST | action-success.json | PoolController | attachVolumeType | PoolDetail | OK |
| /api/v1/resource/vpcs/pool/:vmPoolId/volume | DELETE | action-success.json | PoolController | detachVolumeType | PoolDetail | OK |
| /api/v1/resource/vpcs/pool/:vmPoolId/collection | DELETE | action-success.json | PoolController | deleteCollection | - | OK |
| /api/v1/resource/vpcs/pool | GET | vpc-pool-list.json | PoolController | paging | PoolList | OK |
| /api/v1/resource/vpcs/pool/:vmPoolId | GET | vpc-pool-detail.json | PoolController | get | PoolDetail | OK |
| /api/v1/resource/vpcs/pool | POST | action-success.json | PoolController | create | PoolDetail | OK |
| /api/v1/resource/vpcs/pool/:vmPoolId | PUT | action-success.json | PoolController | update | PoolDetail | OK |
| /api/v1/resource/vpcs/pool/:vmPoolId | DELETE | action-success.json | PoolController | delete | - | OK |
| /api/v1/resource/vpcs/resources/list/vm2/count | GET | vpc-pool-count.json | PcController | listVm2Count | PcVm2List | OK |
| /api/v1/resource/vpcs/resources/list/vm2 | GET | vpc-resources-list.json | PcController | listVm2 | List\<PcVm2ListBase\> | OK |
| /api/v1/resource/vpcs/resources | GET | vpc-resources-list.json | PcController | paging | List\<PcListBase\> | OK |
| /api/v1/resource/vpcs/resources/:id | GET | vpc-resource-detail.json | PcController | get | PcDetail | OK |
| /api/v1/resource/vpcs/resources/:vmAuthId/tenant | PUT | action-success.json | PcController | updateTnt | PcDetail | OK |
| /api/v1/resource/vpcs/resources/:vmAuthId | PUT | action-success.json | PcController | updateUser | PcDetail | OK |
| /api/v1/resource/vpcs/migration | GET | vpc-migration-list.json | MigrationController | paging | MigrationList | OK |
| /api/v1/resource/vpcs/migration/:id | GET | vpc-migration-detail.json | MigrationController | get | MigrationDetail | OK |
| /api/v1/resource/vpcs/migration/multi | POST | action-success.json | MigrationController | multi | MigratioinResult | OK |
| /api/v1/resource/vpcs/migration/:mig_id/initial | POST | action-success.json | MigrationController | initial | - | OK |
| /api/v1/resource/hosts/platforms | GET | host-list.json | - | - | - | 미매핑 |
| /api/v1/resource/hosts/admin/:id | GET | host-detail.json | HostController | getAdmin | HostAdminList | OK |
| /api/v1/resource/hosts/admin | GET | host-list.json | HostController | pagingAdmin | HostAdminList | OK |
| /api/v1/resource/hosts/tenant/:id | GET | host-detail.json | HostController | getTenant | HostTenantList | OK |
| /api/v1/resource/hosts/tenant | GET | host-list.json | HostController | pagingTenant | HostTenantList | OK |
| /api/v1/resource/hosts | GET | host-list.json | HostController | getHostList | RtnVo | OK |
| /api/v1/resource/zones/list | GET | zone-list.json | ZoneController | list | Zone | OK |
| /api/v1/resource/zones/platforms | GET | zone-list.json | - | - | - | 미매핑 |
| /api/v1/resource/zones | GET | zone-list.json | ZoneController | paging | Zone | OK |
| /api/v1/resource/zones/:zoneNm | GET | zone-detail.json | ZoneController | get | Zone | OK |
| /api/v1/resource/zones | POST | action-success.json | ZoneController | create | Zone | OK |
| /api/v1/resource/zones/addHost | PUT | action-success.json | ZoneController | addHost | - | OK |
| /api/v1/resource/zones/removeHost | PUT | action-success.json | ZoneController | removeHost | - | OK |
| /api/v1/resource/zones/update_maint | PUT | action-success.json | ZoneController | updateMaint | Zone | OK |
| /api/v1/resource/zones/:zoneNm | PUT | action-success.json | ZoneController | update | - | OK |
| /api/v1/resource/zones/:zoneNm | DELETE | action-success.json | ZoneController | delete | - | OK |
| /api/v1/resource/evacuate/history/:evacGrpId | GET | evacuate-history-detail.json | EvacuateController | historyVmList | EvacuateHistoryVmList | OK |
| /api/v1/resource/evacuate/history | GET | evacuate-history-list.json | EvacuateController | historyList | EvacuateHistoryList | OK |
| /api/v1/resource/evacuate | GET | evacuate-list.json | EvacuateController | list | EvacuateHost | OK |
| /api/v1/resource/evacuate/:host_id | POST | action-success.json | EvacuateController | evacuate | - | OK |
| /api/v1/resource/networks/phy_networks | GET | network-list.json | NetworkController | getPhysicalNetwork | NetworkDetail | OK |
| /api/v1/resource/networks/qos/:networkQosId | GET | network-qos-detail.json | NetworkController | getQosDetail | NetworkQosDetail | OK |
| /api/v1/resource/networks/qos | GET | network-qos-list.json | NetworkController | getQosList | NetworkQosDetail | OK |
| /api/v1/resource/networks/qos | POST | action-success.json | NetworkController | createNetwowkQos | NetworkQosDetail | OK |
| /api/v1/resource/networks/qos/:networkQosId | PUT | action-success.json | NetworkController | updateNetworkQos | NetworkQosDetail | OK |
| /api/v1/resource/networks/qos/:networkQosId | DELETE | action-success.json | NetworkController | deleteNetworkQos | - | OK |
| /api/v1/resource/networks | GET | network-list.json / network-list-virtual.json | NetworkController | paging | NetworkDetail | OK |
| /api/v1/resource/networks/:networkId | GET | network-detail.json | NetworkController | get | NetworkDetail | OK |
| /api/v1/resource/networks | POST | action-success.json | NetworkController | create | NetworkDetail | OK |
| /api/v1/resource/networks/:networkId | PUT | action-success.json | NetworkController | update | NetworkDetail | OK |
| /api/v1/resource/networks/:networkId | DELETE | action-success.json | NetworkController | delete | - | OK |
| /api/v1/resource/subnets/:subnetId/ips | GET | subnet-ip-list.json | SubnetController | ips | SubnetIpsList | OK |
| /api/v1/resource/subnets | GET | subnet-list.json | SubnetController | paging | SubnetDetail | OK |
| /api/v1/resource/subnets/:subnetId | GET | subnet-detail.json | SubnetController | get | SubnetDetail | OK |
| /api/v1/resource/subnets | POST | action-success.json | SubnetController | create | SubnetDetail | OK |
| /api/v1/resource/subnets/:subnetId | PUT | action-success.json | SubnetController | update | SubnetDetail | OK |
| /api/v1/resource/subnets/:subnetId | DELETE | action-success.json | SubnetController | delete | - | OK |
| /api/v1/resource/router | GET | router-list.json | RouterController | paging | RouterDetail | OK |
| /api/v1/resource/router/:id | GET | router-detail.json | RouterController | get | RouterDetail | OK |
| /api/v1/resource/router | POST | action-success.json | RouterController | create | RouterDetail | OK |
| /api/v1/resource/router/:id/changeNetwork | PUT | action-success.json | RouterController | changeExtNetwork | RouterDetail | OK |
| /api/v1/resource/router/:id/addNetwork | PUT | action-success.json | RouterController | addNetwork | RouterDetail | OK |
| /api/v1/resource/router/:id/removeNetwork | PUT | action-success.json | RouterController | removeNetwork | RouterDetail | OK |
| /api/v1/resource/router/:id | PUT | action-success.json | RouterController | modify | RouterDetail | OK |
| /api/v1/resource/router/:id | DELETE | action-success.json | RouterController | delete | - | OK |
| /api/v1/resource/storage/admin | GET | storage-list.json | StorageController | listAdminCinder | AdminCinderList | OK |
| /api/v1/resource/storage/resources/count | GET | storage-resources-count.json | VolumeResourceController | list | VolumeResourceCount | OK |
| /api/v1/resource/storage/resources/list | GET | storage-resources-list.json | VolumeResourceController | listVolume | VolumeResourceDetail | OK |
| /api/v1/resource/storage/resources/:id | GET | storage-resource-detail.json | VolumeResourceController | getVolume | VolumeResourceDetail | OK |
| /api/v1/resource/storage/qos/:id | GET | storage-qos-detail.json | StorageController | getVolumeQosDetail | VolumeQosDetail | OK |
| /api/v1/resource/storage/qos | GET | storage-qos-list.json | StorageController | getVolumeQosList | VolumeQosDetail | OK |
| /api/v1/resource/storage/qos | POST | action-success.json | StorageController | createVolumeQos | VolumeQosDetail | OK |
| /api/v1/resource/storage/qos/:id | PUT | action-success.json | StorageController | updateVolumeQos | VolumeQosDetail | OK |
| /api/v1/resource/storage/qos/:id | DELETE | action-success.json | StorageController | deleteVolumeQos | - | OK |
| /api/v1/resource/storage/backend/list | GET | storage-backend-list.json | StorageController | getBackendVolume | String (List) | OK |
| /api/v1/resource/storage | GET | storage-list.json | StorageController | listCinder | CinderList | OK |
| /api/v1/resource/storage/:id | GET | storage-detail.json | StorageController | getVolumeTypeDetail | CinderDetail | OK |
| /api/v1/resource/storage | POST | action-success.json | StorageController | createVolumeType | CinderDetail | OK |
| /api/v1/resource/storage/:id | PUT | action-success.json | StorageController | updateVolumeType | CinderDetail | OK |
| /api/v1/resource/storage/:id | DELETE | action-success.json | StorageController | deleteVolumeType | - | OK |
| /api/v1/resource/template | GET | template-list.json | TemplateController | getTemplates | TemplateSimple | OK |
| /api/v1/resource/template/:id | GET | template-detail.json | TemplateController | get | Template | OK |
| /api/v1/resource/template | POST | action-success.json | TemplateController | create | Template | OK |
| /api/v1/resource/template/:tempId/addFlavor | PUT | action-success.json | TemplateController | updateFlavor | Template | OK |
| /api/v1/resource/template/:tempId/addImage | PUT | action-success.json | TemplateController | updateImage | Template | OK |
| /api/v1/resource/template/:id | PUT | action-success.json | TemplateController | update | - | OK |
| /api/v1/resource/template/:id | DELETE | action-success.json | TemplateController | delete | - | OK |
| /api/v1/resource/images/vpc | GET | vpc-resources-list.json | GoldenImageController | listVpc | GoldenImageVpcList | OK |
| /api/v1/resource/images/vm/:id | GET | image-status.json | GoldenImageController | getImageVm | GoldenImageVpcInfo | OK |
| /api/v1/resource/images/status/:imgId | GET | image-status.json | GoldenImageController | getVmStatus | GoldenImageVmStatus | OK |
| /api/v1/resource/images | GET | image-list.json | GoldenImageController | list | GoldenImageList | OK |
| /api/v1/resource/images/:id | GET | image-detail.json | GoldenImageController | get | GoldenImageDetail | OK |
| /api/v1/resource/images/create_vm | POST | action-success.json | GoldenImageController | createVm | GoldenImageDetail | OK |
| /api/v1/resource/images/convert | POST | action-success.json | GoldenImageController | convert | GoldenImageCreateResponse | OK |
| /api/v1/resource/images/vm_convert | POST | action-success.json | GoldenImageController | convertVm | GoldenImageCreateResponse | OK |
| /api/v1/resource/images/clear/:imgId | PUT | action-success.json | GoldenImageController | clear | GoldenImageDetail | OK |
| /api/v1/resource/images/:imgId/power_on | PUT | action-success.json | GoldenImageController | power_on | GoldenImageDetail | OK |
| /api/v1/resource/images/:imgId/power_off | PUT | action-success.json | GoldenImageController | power_off | GoldenImageDetail | OK |
| /api/v1/resource/images/:id | PUT | action-success.json | GoldenImageController | update | GoldenImageDetail | OK |
| /api/v1/resource/images/delete/:imgId | DELETE | action-success.json | GoldenImageController | deleteImage | GoldenImageDetail | OK |
| /api/v1/resource/images/delete_vm/:imgId | DELETE | action-success.json | GoldenImageController | deleteVm | GoldenImageDetail | OK |
| /api/v1/resource/images/:id | DELETE | action-success.json | GoldenImageController | delete | ResponseMessage | OK |
| /api/v1/resource/flavors/list/tenant | GET | flavor-list.json | SpecController | listTenant | TenantSpecList | OK |
| /api/v1/resource/flavors | GET | flavor-list.json | SpecController | paging | Spec | OK |
| /api/v1/resource/flavors/:flavorId | GET | flavor-detail.json | SpecController | get | Spec | OK |
| /api/v1/resource/flavors | POST | action-success.json | SpecController | create | Spec | OK |
| /api/v1/resource/flavors/:flavorId | PUT | action-success.json | SpecController | update | Spec | OK |
| /api/v1/resource/flavors/:flavorId | DELETE | action-success.json | SpecController | delete | - | OK |
| /api/v1/resource/proxy/assign | GET | proxy-assign.json | ProxyController | getProxyAssignInfo | ProxyAssignInfo | OK |
| /api/v1/resource/proxy/L4/:path | GET | proxy-l4-list.json | ProxyController | pagingL4ProxyAdmin / pagingL4ProxyTenant | L4Proxy | OK |
| /api/v1/resource/proxy/L7/:path | GET | proxy-list.json | ProxyController | pagingL7ProxyAdmin / pagingL7ProxyTenant | L7Proxy | OK |
| /api/v1/resource/platform/software | GET | software-version.json | PlatformController | software | SoftWare | OK |
| /api/v1/resource/snapshot/:vmAuthId | GET | snapshot-list.json | SnapshotController | snapshotList | SnapshotMngInfo | OK |
| /api/v1/resource/snapshot/execSnapshot/:vmAuthId | POST | action-success.json | SnapshotController | execSnapshot | SnapshotInfo | OK |
| /api/v1/resource/snapshot/restore/:vmAuthId/:snapId | PUT | action-success.json | SnapshotController | restoreSnapshot | SnapshotInfo | OK |
| /api/v1/resource/snapshot | DELETE | action-success.json | SnapshotController | deleteSnapshot (body) | SnapshotInfo | OK |
| /api/v1/resource/backup/backup/:diskId | GET | backup-list.json | BackupController | dskList | BackupUserVmInfo | OK |
| /api/v1/resource/backup/execBackup/:diskId | POST | action-success.json | BackupController | execBackup | - | OK |
| /api/v1/resource/backup/restore/:bkupDiskId | PUT | action-success.json | BackupController | restoreBackup | BackupInfo | OK |
| /api/v1/resource/backup/:diskId | DELETE | action-success.json | BackupController | deleteBackup | BackupInfo | OK |
| /api/v1/resource/disk/local/add-list | GET | disk-local-all.json | LocalDiskController | addDiskPaging | AddDiskList | OK |
| /api/v1/resource/disk/local/:acctId | GET | disk-local-list.json / disk-local-detail.json | LocalDiskController | diskList | UserVmDisk | OK |
| /api/v1/resource/disk/local | GET | disk-local-all.json | LocalDiskController | addDiskPaging | AddDiskList | OK |
| /api/v1/resource/disk/local | DELETE | action-success.json | LocalDiskController | delete | - | OK |
| /api/v1/resource/disk/local/add-detach | POST | action-success.json | LocalDiskController | addDetach | - | OK |
| /api/v1/resource/disk/local/add-delete | POST | action-success.json | LocalDiskController | addDelete | - | OK |
| /api/v1/resource/tenants/manager/list/all | GET | tenant-manager-all.json | TenantManagerController | list | TenantAllList | OK |
| /api/v1/resource/tenants/manager/get/license | GET | tenant-license.json | TenantManagerController | license | TenantLicense | OK |
| /api/v1/resource/tenants/manager/autoTenants/:companyNm | GET | tenant-manager-all.json | TenantManagerController | create_AutoTenants | TenantManagerDetail | OK |
| /api/v1/resource/tenants/manager/:id | GET | tenant-manager-detail.json | TenantManagerController | get | TenantManagerDetail | OK |
| /api/v1/resource/tenants/manager | GET | tenant-manager-list.json | TenantManagerController | paging | TenantManagerList | OK |
| /api/v1/resource/tenants/manager/:tntId | DELETE | action-success.json | TenantManagerController | deleteTenant | - | OK |
| /api/v1/resource/tenants/manager/usehost | PUT | action-success.json | TenantManagerController | create_usehost (POST) | TenantManagerDetail | 미매핑 |
| /api/v1/resource/tenants/manager/nonehost | PUT | action-success.json | TenantManagerController | create_nonehost (POST) | TenantManagerDetail | 미매핑 |
| /api/v1/resource/tenants/manager/ignore/:tntId | PUT | action-success.json | TenantManagerController | deleteIgnore (DELETE) | - | 미매핑 |
| /api/v1/resource/tenants/manager/:id/network | PUT | action-success.json | TenantManagerController | addNetwork / removeNetwork | TenantManagerDetail | OK |
| /api/v1/resource/tenants/manager/:tenantId/volume | GET | tenant-volumes.json | - | - | - | 미매핑 |
| /api/v1/resource/tenants/manager/:id/volume | PUT | action-success.json | TenantManagerController | updateVolume | TenantManagerDetail | OK |
| /api/v1/resource/tenants/manager/:id/host | PUT | action-success.json | TenantManagerController | addHost / removeHost | TenantManagerDetail | OK |
| /api/v1/resource/tenants/manager/:id/:type | PUT | action-success.json | TenantManagerController | updateAdmin / updateTenant | TenantManagerDetail | OK |
| /api/v1/resource/tenants/groups/licenses | GET | tenant-license.json | - | - | - | 미매핑 |
| /api/v1/resource/tenants/groups/:tntGrpId | GET | tenant-groups-detail.json | - | - | - | 미매핑 |
| /api/v1/resource/tenants/groups | GET | tenant-groups-list.json | - | - | - | 미매핑 |
| /api/v1/resource/tenants/groups/package | POST | action-success.json | - | - | - | 미매핑 |
| /api/v1/resource/tenants/groups/package | DELETE | action-success.json | - | - | - | 미매핑 |
| /api/v1/resource/tenants/packages | GET | (empty data) | - | - | - | 미매핑 |
| /api/v1/resource/tenants/resources/request/ | GET | tenant-resource-request-list.json | - | - | - | 미매핑 |
| /api/v1/resource/tenants/resources/request/:id | GET | tenant-resource-request-list.json | - | - | - | 미매핑 |
| /api/v1/resource/tenants/resources/request/ | POST | action-success.json | - | - | - | 미매핑 |
| /api/v1/resource/tenants/resources/request/:id | PUT | action-success.json | - | - | - | 미매핑 |
| /api/v1/resource/tenants/:tntId/subnet | POST | action-success.json | - | - | - | 미매핑 |
| /api/v1/resource/tenants/:tntId/subnet | DELETE | action-success.json | - | - | - | 미매핑 |
| /api/v1/resource/tenants/:tntId/networks | GET | tenant-networks.json | - | - | - | 미매핑 |
| /api/v1/resource/tenants/:tntId/networks | POST | action-success.json | - | - | - | 미매핑 |
| /api/v1/resource/tenants/:tntId/capa/platforms | GET | tenant-capacity-platforms.json | - | - | - | 미매핑 |
| /api/v1/resource/tenants/:tntId/temps | GET | template-list.json | - | - | - | 미매핑 |
| /api/v1/resource/tenants/manager/:tntId/template | POST | action-success.json | TenantManagerController | addTemplate | TenantManagerDetail | OK |
| /api/v1/resource/tenants | GET | tenant-list.json | - | - | - | 미매핑 |
| /api/v1/resource/tenants/:tntId | GET | tenant-detail.json | - | - | - | 미매핑 |
| /api/v1/resource/tenants/:tntId | PUT | action-success.json | - | - | - | 미매핑 |
| /api/v1/resource/tenants/:tntId | DELETE | action-success.json | - | - | - | 미매핑 |
| /api/v1/resource/domains/list | GET | domain-list.json | DomainController | getDomainList | PlatformDomain | OK |
| /api/v1/resource/domains | GET | domain-list.json | DomainController | paging | DomainDetail | OK |
| /api/v1/resource/domains/:id | GET | (domain-list.json data[0]) | DomainController | get | DomainDetail | OK |
| /api/v1/resource/domains | POST | action-success.json | DomainController | createDomain | DomainDetail | OK |
| /api/v1/resource/domains/:id | DELETE | action-success.json | DomainController | delete | - | OK |
| /api/v1/resource/adscript/detail/:tntId | GET | adscript-detail.json | AdScriptController | getAdScript | ADScriptVO | OK |
| /api/v1/resource/adscript/:cadno | PUT | action-success.json | AdScriptController | updateAdScript | ADScriptVO | OK |
| /api/v1/resource/init | GET | init-status.json | InitController | list | InitJob | OK |
| /api/v1/resource/init | POST | action-success.json | InitController | doInit | - | OK |
| /api/v1/resource/init/auto/delete/:companyNm | DELETE | action-success.json | InitController | autoInit | - | OK |
| /api/v1/resource/policies/security-group/:securityGroupId/history | GET | security-group-history.json | - | - | - | 미매핑 |
| /api/v1/resource/policies/security-group/:securityGroupId/rule | GET | security-group-rules.json | - | - | - | 미매핑 |
| /api/v1/resource/policies/security-group/:securityGroupId/rule | POST | action-success.json | - | - | - | 미매핑 |
| /api/v1/resource/policies/security-group/:securityGroupId/rule/:ruleId | DELETE | action-success.json | - | - | - | 미매핑 |
| /api/v1/resource/policies/security-group/:securityGroupId | GET | security-group-detail.json | - | - | - | 미매핑 |
| /api/v1/resource/policies/security-group | GET | security-group-list.json | - | - | - | 미매핑 |
| /api/v1/resource/policies/security-group/sync | POST | action-success.json | - | - | - | 미매핑 |
| /api/v1/resource/policies/security-group | POST | action-success.json | - | - | - | 미매핑 |
| /api/v1/resource/policies/security-group/:securityGroupId | PUT | action-success.json | - | - | - | 미매핑 |
| /api/v1/resource/policies/security-group/:id | DELETE | action-success.json | - | - | - | 미매핑 |
| /api/v1/legacy/cloud/ad/allSharedfolders | POST | nas-sa-list.json | NetappController | detailVolume (/v1/volumes/nas/allSharedfolders) | List | OK |
| /api/v1/legacy/cloud/ad/sharedfolder/directories | POST | nas-ta-list.json | NetappController | getQtrees (/{volumeName}/directories) | RtnVo | OK |

## 참고

### 미매핑 항목 분류

**app-ms-resource에 컨트롤러 없음 (다른 MS 또는 미구현):**
- `/api/v1/resource/vpcs/pool/:vmPoolId/ip` — Pool IP 목록. PoolController에 해당 엔드포인트 없음.
- `/api/v1/resource/vpcs/pool/:vmPoolId/subnet` (PUT) — PoolController에 POST만 존재, PUT은 없음.
- `/api/v1/resource/hosts/platforms` — HostController에 `/platforms` 경로 없음.
- `/api/v1/resource/zones/platforms` — ZoneController에 `/platforms` 경로 없음.
- `/api/v1/resource/tenants/manager/usehost` (PUT) — TenantManagerController에 POST만 존재.
- `/api/v1/resource/tenants/manager/nonehost` (PUT) — TenantManagerController에 POST만 존재.
- `/api/v1/resource/tenants/manager/ignore/:tntId` (PUT) — TenantManagerController에 DELETE만 존재.
- `/api/v1/resource/tenants/manager/:tenantId/volume` (GET) — TenantManagerController에 GET 없음 (ADD/REMOVE/UPDATE만 존재).
- `/api/v1/resource/tenants/groups/**` — 테넌트 그룹 관련 컨트롤러 없음.
- `/api/v1/resource/tenants/packages` — 테넌트 패키지 컨트롤러 없음.
- `/api/v1/resource/tenants/resources/request/**` — 테넌트 리소스 요청 컨트롤러 없음.
- `/api/v1/resource/tenants/:tntId/subnet` — 테넌트 서브넷 컨트롤러 없음.
- `/api/v1/resource/tenants/:tntId/networks` — 테넌트 네트워크 컨트롤러 없음.
- `/api/v1/resource/tenants/:tntId/capa/platforms` — 테넌트 용량 컨트롤러 없음.
- `/api/v1/resource/tenants/:tntId/temps` — 테넌트 템플릿 목록 컨트롤러 없음.
- `/api/v1/resource/tenants` (GET/GET/:id/PUT/DELETE) — `/v1/tenants` 기본 CRUD 컨트롤러 없음. TenantManagerController는 `/v1/tenants/manager` 경로만 담당.
- `/api/v1/resource/policies/security-group/**` — app-ms-resource에 보안 그룹 컨트롤러 없음. app-ms-operation에 있을 가능성 높음.

### mock 경로 vs 백엔드 경로

mock은 `/api/v1/resource/...` 접두사를 사용하나, 백엔드 컨트롤러는 `/v1/...`로 선언됨. `/api/v1/resource` prefix는 게이트웨이 또는 서버 설정에서 처리되는 것으로 추정.

### legacy NAS 경로

- mock: `/api/v1/legacy/cloud/ad/allSharedfolders` → 실제 백엔드: `/v1/volumes/nas/allSharedfolders`
- mock: `/api/v1/legacy/cloud/ad/sharedfolder/directories` → 실제 백엔드: `/v1/volumes/nas/{volumeName}/directories`
- mock 경로와 백엔드 경로가 다름. mock에서 legacy 경로로 프록시 처리하는 구조로 추정.
