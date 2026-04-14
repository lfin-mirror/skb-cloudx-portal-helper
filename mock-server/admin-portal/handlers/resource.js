const { getRoleFromToken } = require('../../constants');

module.exports = function (router, getScenario) {
  const SUCCESS = () => require('../fixtures/resource/action-success.json');

  // ============================================================
  // VPC 그룹
  // ============================================================

  router.get('/api/v1/resource/vpcs/group', (req, res) => {
    res.json(require('../fixtures/resource/vpc-group-list.json'));
  });

  router.get('/api/v1/resource/vpcs/group/:id', (req, res) => {
    res.json(require('../fixtures/resource/vpc-group-detail.json'));
  });

  router.post('/api/v1/resource/vpcs/group', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/vpcs/group/:vmGrpId', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/vpcs/group/:vmGrpId', (req, res) => {
    res.json(SUCCESS());
  });

  router.post('/api/v1/resource/vpcs/group/:vmGrpId/network', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/vpcs/group/:vmGrpId/network', (req, res) => {
    res.json(SUCCESS());
  });

  // ============================================================
  // VPC 풀
  // ============================================================

  router.get('/api/v1/resource/vpcs/pool/count', (req, res) => {
    res.json(require('../fixtures/resource/vpc-pool-count.json'));
  });

  // 풀 목록 v2 (pool2) — 컴포넌트가 res.data를 배열로 직접 사용
  router.get('/api/v1/resource/vpcs/pool2', (req, res) => {
    const fixture = require('../fixtures/resource/vpc-pool-list.json');
    res.json({ data: fixture.data });
  });

  // 자동 Pool 조회 (초기화)
  router.get('/api/v1/resource/vpcs/pool/auto/:companyNm', (req, res) => {
    res.json(require('../fixtures/resource/vpc-pool-list.json'));
  });

  // 풀 상세 관련 서브 라우트 (풀 ID 앞에 선언)
  router.get('/api/v1/resource/vpcs/pool/:vmPoolId/ip', (req, res) => {
    res.json(require('../fixtures/resource/vpc-pool-ip-list.json'));
  });

  router.get('/api/v1/resource/vpcs/pool/:poolId/template/history', (req, res) => {
    res.json(require('../fixtures/resource/vpc-pool-template-history.json'));
  });

  router.get('/api/v1/resource/vpcs/pool/:id/image-mismatched-vm', (req, res) => {
    res.json(require('../fixtures/resource/vpc-image-mismatched.json'));
  });

  router.post('/api/v1/resource/vpcs/pool/:poolId/subnet', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/vpcs/pool/:vmPoolId/subnet', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/vpcs/pool/:vmPoolId/reset', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/vpcs/pool/:vmPoolId/template', (req, res) => {
    res.json(SUCCESS());
  });

  router.post('/api/v1/resource/vpcs/pool/:vmPoolId/volume', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/vpcs/pool/:vmPoolId/volume', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/vpcs/pool/:vmPoolId/collection', (req, res) => {
    res.json(SUCCESS());
  });

  router.get('/api/v1/resource/vpcs/pool', (req, res) => {
    res.json(require('../fixtures/resource/vpc-pool-list.json'));
  });

  router.get('/api/v1/resource/vpcs/pool/:vmPoolId', (req, res) => {
    res.json(require('../fixtures/resource/vpc-pool-detail.json'));
  });

  router.post('/api/v1/resource/vpcs/pool', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/vpcs/pool/:vmPoolId', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/vpcs/pool/:vmPoolId', (req, res) => {
    res.json(SUCCESS());
  });

  // ============================================================
  // VPC 자동 할당 맵핑
  // ============================================================

  router.get('/api/v1/resource/vpcs/auto/mapping/list', (req, res) => {
    res.json({ data: [], errCode: null, errMsg: null });
  });

  // 공용 PC 대기 VM 목록
  router.get('/api/v1/resource/vpcs/resources/pooled/user_vm', (req, res) => {
    res.json(require('../fixtures/resource/vpc-pooled-user-vm.json'));
  });

  // 포트 관리 목록
  router.get('/api/v1/resource/port', (req, res) => {
    res.json({ data: [], errCode: null, errMsg: null });
  });
  router.put('/api/v1/resource/port/:devId', (req, res) => {
    res.json({ data: null, errCode: null, errMsg: null });
  });
  router.delete('/api/v1/resource/port/:portId', (req, res) => {
    res.json({ data: null, errCode: null, errMsg: null });
  });

  // ============================================================
  // VPC 리소스 (VM)
  // ============================================================

  router.get('/api/v1/resource/vpcs/resources/list/vm2/count', (req, res) => {
    res.json(require('../fixtures/resource/vpc-pool-count.json'));
  });

  router.get('/api/v1/resource/vpcs/resources/list/vm2', (req, res) => {
    res.json(require('../fixtures/resource/vpc-resources-list.json'));
  });

  router.get('/api/v1/resource/vpcs/resources', (req, res) => {
    res.json(require('../fixtures/resource/vpc-resources-list.json'));
  });

  router.get('/api/v1/resource/vpcs/resources/:id', (req, res) => {
    res.json(require('../fixtures/resource/vpc-resource-detail.json'));
  });

  router.put('/api/v1/resource/vpcs/resources/:vmAuthId/tenant', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/vpcs/resources/:vmAuthId', (req, res) => {
    res.json(SUCCESS());
  });

  // ============================================================
  // 마이그레이션
  // ============================================================

  router.get('/api/v1/resource/vpcs/migration', (req, res) => {
    res.json(require('../fixtures/resource/vpc-migration-list.json'));
  });

  router.get('/api/v1/resource/vpcs/migration/:id', (req, res) => {
    res.json(require('../fixtures/resource/vpc-migration-detail.json'));
  });

  router.post('/api/v1/resource/vpcs/migration/multi', (req, res) => {
    res.json(SUCCESS());
  });

  router.post('/api/v1/resource/vpcs/migration/:mig_id/initial', (req, res) => {
    res.json(SUCCESS());
  });

  // ============================================================
  // 호스트
  // ============================================================

  router.get('/api/v1/resource/hosts/platforms', (req, res) => {
    res.json(require('../fixtures/resource/host-list.json'));
  });

  router.get('/api/v1/resource/hosts/admin/:id', (req, res) => {
    res.json(require('../fixtures/resource/host-detail.json'));
  });

  router.get('/api/v1/resource/hosts/admin', (req, res) => {
    res.json(require('../fixtures/resource/host-list.json'));
  });

  router.get('/api/v1/resource/hosts/tenant/:id', (req, res) => {
    res.json(require('../fixtures/resource/host-detail.json'));
  });

  router.get('/api/v1/resource/hosts/tenant', (req, res) => {
    res.json(require('../fixtures/resource/host-list.json'));
  });

  router.get('/api/v1/resource/hosts', (req, res) => {
    res.json(require('../fixtures/resource/host-list.json'));
  });

  // ============================================================
  // Zone
  // ============================================================

  router.get('/api/v1/resource/zones/list', (req, res) => {
    res.json(require('../fixtures/resource/zone-list.json'));
  });

  router.get('/api/v1/resource/zones/platforms', (req, res) => {
    res.json(require('../fixtures/resource/zone-list.json'));
  });

  router.get('/api/v1/resource/zones', (req, res) => {
    res.json(require('../fixtures/resource/zone-list.json'));
  });

  router.get('/api/v1/resource/zones/:zoneNm', (req, res) => {
    res.json(require('../fixtures/resource/zone-detail.json'));
  });

  router.post('/api/v1/resource/zones', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/zones/addHost', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/zones/removeHost', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/zones/update_maint', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/zones/:zoneNm', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/zones/:zoneNm', (req, res) => {
    res.json(SUCCESS());
  });

  // ============================================================
  // 대피 (Evacuate / HA)
  // ============================================================

  router.get('/api/v1/resource/evacuate/history/:evacGrpId', (req, res) => {
    res.json(require('../fixtures/resource/evacuate-history-detail.json'));
  });

  router.get('/api/v1/resource/evacuate/history', (req, res) => {
    res.json(require('../fixtures/resource/evacuate-history-list.json'));
  });

  router.get('/api/v1/resource/evacuate', (req, res) => {
    res.json(require('../fixtures/resource/evacuate-list.json'));
  });

  router.post('/api/v1/resource/evacuate/:host_id', (req, res) => {
    res.json(SUCCESS());
  });

  // ============================================================
  // 네트워크
  // ============================================================

  router.get('/api/v1/resource/networks/phy_networks', (req, res) => {
    res.json(require('../fixtures/resource/network-list.json'));
  });

  router.get('/api/v1/resource/networks/qos/:networkQosId', (req, res) => {
    res.json(require('../fixtures/resource/network-qos-detail.json'));
  });

  router.get('/api/v1/resource/networks/qos', (req, res) => {
    res.json(require('../fixtures/resource/network-qos-list.json'));
  });

  router.post('/api/v1/resource/networks/qos', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/networks/qos/:networkQosId', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/networks/qos/:networkQosId', (req, res) => {
    res.json(SUCCESS());
  });

  router.get('/api/v1/resource/networks', (req, res) => {
    const role = getRoleFromToken(req.headers['authorization']);
    const usgUseCd = req.query.usg_use_cd;
    // usg_use_cd=P004V 명시 또는 TA일 때 가상 네트워크 반환
    if (usgUseCd === 'P004V' || role === 'ta') {
      res.json(require('../fixtures/resource/network-list-virtual.json'));
    } else {
      res.json(require('../fixtures/resource/network-list.json'));
    }
  });

  router.get('/api/v1/resource/networks/:networkId', (req, res) => {
    res.json(require('../fixtures/resource/network-detail.json'));
  });

  router.post('/api/v1/resource/networks', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/networks/:networkId', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/networks/:networkId', (req, res) => {
    res.json(SUCCESS());
  });

  // ============================================================
  // 서브넷
  // ============================================================

  router.get('/api/v1/resource/subnets/:subnetId/ips', (req, res) => {
    res.json(require('../fixtures/resource/subnet-ip-list.json'));
  });

  router.get('/api/v1/resource/subnets', (req, res) => {
    res.json(require('../fixtures/resource/subnet-list.json'));
  });

  router.get('/api/v1/resource/subnets/:subnetId', (req, res) => {
    res.json(require('../fixtures/resource/subnet-detail.json'));
  });

  router.post('/api/v1/resource/subnets', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/subnets/:subnetId', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/subnets/:subnetId', (req, res) => {
    res.json(SUCCESS());
  });

  // ============================================================
  // 라우터
  // ============================================================

  router.get('/api/v1/resource/router', (req, res) => {
    res.json(require('../fixtures/resource/router-list.json'));
  });

  router.get('/api/v1/resource/router/:id', (req, res) => {
    res.json(require('../fixtures/resource/router-detail.json'));
  });

  router.post('/api/v1/resource/router', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/router/:id/changeNetwork', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/router/:id/addNetwork', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/router/:id/removeNetwork', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/router/:id', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/router/:id', (req, res) => {
    res.json(SUCCESS());
  });

  // ============================================================
  // 스토리지 / 볼륨 타입
  // ============================================================

  router.get('/api/v1/resource/storage/admin', (req, res) => {
    res.json(require('../fixtures/resource/storage-list.json'));
  });

  router.get('/api/v1/resource/storage/resources/count', (req, res) => {
    res.json(require('../fixtures/resource/storage-resources-count.json'));
  });

  router.get('/api/v1/resource/storage/resources/list', (req, res) => {
    res.json(require('../fixtures/resource/storage-resources-list.json'));
  });

  router.get('/api/v1/resource/storage/resources/:id', (req, res) => {
    res.json(require('../fixtures/resource/storage-resource-detail.json'));
  });

  router.get('/api/v1/resource/storage/qos/:id', (req, res) => {
    res.json(require('../fixtures/resource/storage-qos-detail.json'));
  });

  router.get('/api/v1/resource/storage/qos', (req, res) => {
    res.json(require('../fixtures/resource/storage-qos-list.json'));
  });

  router.post('/api/v1/resource/storage/qos', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/storage/qos/:id', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/storage/qos/:id', (req, res) => {
    res.json(SUCCESS());
  });

  router.get('/api/v1/resource/storage/backend/list', (req, res) => {
    res.json(require('../fixtures/resource/storage-backend-list.json'));
  });

  router.get('/api/v1/resource/storage', (req, res) => {
    res.json(require('../fixtures/resource/storage-list.json'));
  });

  router.get('/api/v1/resource/storage/:id', (req, res) => {
    res.json(require('../fixtures/resource/storage-detail.json'));
  });

  router.post('/api/v1/resource/storage', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/storage/:id', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/storage/:id', (req, res) => {
    res.json(SUCCESS());
  });

  // ============================================================
  // 템플릿
  // ============================================================

  router.get('/api/v1/resource/template', (req, res) => {
    res.json(require('../fixtures/resource/template-list.json'));
  });

  router.get('/api/v1/resource/template/:id', (req, res) => {
    res.json(require('../fixtures/resource/template-detail.json'));
  });

  router.post('/api/v1/resource/template', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/template/:tempId/addFlavor', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/template/:tempId/addImage', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/template/:id', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/template/:id', (req, res) => {
    res.json(SUCCESS());
  });

  // ============================================================
  // 골든 이미지
  // ============================================================

  router.get('/api/v1/resource/images/vpc', (req, res) => {
    res.json(require('../fixtures/resource/vpc-resources-list.json'));
  });

  router.get('/api/v1/resource/images/vm/:id', (req, res) => {
    res.json(require('../fixtures/resource/image-status.json'));
  });

  router.get('/api/v1/resource/images/status/:imgId', (req, res) => {
    res.json(require('../fixtures/resource/image-status.json'));
  });

  router.get('/api/v1/resource/images', (req, res) => {
    res.json(require('../fixtures/resource/image-list.json'));
  });

  router.get('/api/v1/resource/images/:id', (req, res) => {
    res.json(require('../fixtures/resource/image-detail.json'));
  });

  router.post('/api/v1/resource/images/create_vm', (req, res) => {
    res.json(SUCCESS());
  });

  router.post('/api/v1/resource/images/convert', (req, res) => {
    res.json(SUCCESS());
  });

  router.post('/api/v1/resource/images/vm_convert', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/images/clear/:imgId', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/images/:imgId/power_on', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/images/:imgId/power_off', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/images/:id', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/images/delete/:imgId', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/images/delete_vm/:imgId', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/images/:id', (req, res) => {
    res.json(SUCCESS());
  });

  // ============================================================
  // 플레이버
  // ============================================================

  router.get('/api/v1/resource/flavors/list/tenant', (req, res) => {
    res.json(require('../fixtures/resource/flavor-list.json'));
  });

  router.get('/api/v1/resource/flavors', (req, res) => {
    res.json(require('../fixtures/resource/flavor-list.json'));
  });

  router.get('/api/v1/resource/flavors/:flavorId', (req, res) => {
    res.json(require('../fixtures/resource/flavor-detail.json'));
  });

  router.post('/api/v1/resource/flavors', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/flavors/:flavorId', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/flavors/:flavorId', (req, res) => {
    res.json(SUCCESS());
  });

  // ============================================================
  // 프록시
  // ============================================================

  router.get('/api/v1/resource/proxy/assign', (req, res) => {
    res.json(require('../fixtures/resource/proxy-assign.json'));
  });

  router.get('/api/v1/resource/proxy/L4/:path', (req, res) => {
    res.json(require('../fixtures/resource/proxy-l4-list.json'));
  });

  router.get('/api/v1/resource/proxy/L7/:path', (req, res) => {
    res.json(require('../fixtures/resource/proxy-list.json'));
  });

  // ============================================================
  // 소프트웨어 버전
  // ============================================================

  router.get('/api/v1/resource/platform/software', (req, res) => {
    res.json(require('../fixtures/resource/software-version.json'));
  });

  // ============================================================
  // 스냅샷
  // ============================================================

  router.get('/api/v1/resource/snapshot/:vmAuthId', (req, res) => {
    res.json(require('../fixtures/resource/snapshot-list.json'));
  });

  router.post('/api/v1/resource/snapshot/execSnapshot/:vmAuthId', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/snapshot/restore/:vmAuthId/:snapId', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/snapshot', (req, res) => {
    res.json(SUCCESS());
  });

  // ============================================================
  // 백업
  // ============================================================

  router.get('/api/v1/resource/backup/backup/:diskId', (req, res) => {
    res.json(require('../fixtures/resource/backup-list.json'));
  });

  router.post('/api/v1/resource/backup/execBackup/:diskId', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/backup/restore/:bkupDiskId', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/backup/:diskId', (req, res) => {
    res.json(SUCCESS());
  });

  // ============================================================
  // 영구 디스크
  // ============================================================

  router.get('/api/v1/resource/disk/local/add-list', (req, res) => {
    res.json(require('../fixtures/resource/disk-local-all.json'));
  });

  router.get('/api/v1/resource/disk/local/:acctId', (req, res) => {
    // :acctId가 숫자/문자 ID이면 사용자별 디스크, 특정 경우 상세 처리
    const id = req.params.acctId;
    // disk ID 패턴이면 상세, 아니면 목록
    if (id && id.startsWith('DISK-')) {
      res.json(require('../fixtures/resource/disk-local-detail.json'));
    } else {
      res.json(require('../fixtures/resource/disk-local-list.json'));
    }
  });

  router.get('/api/v1/resource/disk/local', (req, res) => {
    res.json(require('../fixtures/resource/disk-local-all.json'));
  });

  router.delete('/api/v1/resource/disk/local', (req, res) => {
    res.json(SUCCESS());
  });

  router.post('/api/v1/resource/disk/local/add-detach', (req, res) => {
    res.json(SUCCESS());
  });

  router.post('/api/v1/resource/disk/local/add-delete', (req, res) => {
    res.json(SUCCESS());
  });

  // ============================================================
  // 테넌트
  // ============================================================

  // 테넌트 manager 하위 라우트 (manager/:id 보다 먼저 선언)
  router.get('/api/v1/resource/tenants/manager/list/all', (req, res) => {
    res.json(require('../fixtures/resource/tenant-manager-all.json'));
  });

  router.get('/api/v1/resource/tenants/manager/get/license', (req, res) => {
    res.json(require('../fixtures/resource/tenant-license.json'));
  });

  router.get('/api/v1/resource/tenants/manager/autoTenants/:companyNm', (req, res) => {
    res.json(require('../fixtures/resource/tenant-manager-all.json'));
  });

  router.get('/api/v1/resource/tenants/manager/:id', (req, res) => {
    res.json(require('../fixtures/resource/tenant-manager-detail.json'));
  });

  router.get('/api/v1/resource/tenants/manager', (req, res) => {
    const role = getRoleFromToken(req.headers.authorization);
    const full = require('../fixtures/resource/tenant-manager-list.json');
    if (role === 'sa') {
      res.json(full);
    } else {
      // TA: 내가 속한 테넌트 1개만
      res.json({ ...full, data: full.data.slice(0, 1) });
    }
  });

  router.delete('/api/v1/resource/tenants/manager/:tntId', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/tenants/manager/usehost', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/tenants/manager/nonehost', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/tenants/manager/ignore/:tntId', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/tenants/manager/:id/network', (req, res) => {
    res.json(SUCCESS());
  });

  router.get('/api/v1/resource/tenants/manager/:tenantId/volume', (req, res) => {
    res.json(require('../fixtures/resource/tenant-volumes.json'));
  });

  router.put('/api/v1/resource/tenants/manager/:id/volume', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/tenants/manager/:id/host', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/tenants/manager/:id/:type', (req, res) => {
    res.json(SUCCESS());
  });

  // 테넌트 그룹
  router.get('/api/v1/resource/tenants/groups/licenses', (req, res) => {
    res.json(require('../fixtures/resource/tenant-license.json'));
  });

  router.get('/api/v1/resource/tenants/groups/:tntGrpId', (req, res) => {
    res.json(require('../fixtures/resource/tenant-groups-detail.json'));
  });

  router.get('/api/v1/resource/tenants/groups', (req, res) => {
    res.json(require('../fixtures/resource/tenant-groups-list.json'));
  });

  router.post('/api/v1/resource/tenants/groups/package', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/tenants/groups/package', (req, res) => {
    res.json(SUCCESS());
  });

  // 테넌트 패키지
  router.get('/api/v1/resource/tenants/packages', (req, res) => {
    res.json({ data: [], errCode: null, errMsg: null });
  });

  // 테넌트 리소스 요청
  router.get('/api/v1/resource/tenants/resources/request/', (req, res) => {
    res.json(require('../fixtures/resource/tenant-resource-request-list.json'));
  });

  router.get('/api/v1/resource/tenants/resources/request/:id', (req, res) => {
    res.json(require('../fixtures/resource/tenant-resource-request-list.json'));
  });

  router.post('/api/v1/resource/tenants/resources/request/', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/tenants/resources/request/:id', (req, res) => {
    res.json(SUCCESS());
  });

  // 테넌트 서브넷
  router.post('/api/v1/resource/tenants/:tntId/subnet', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/tenants/:tntId/subnet', (req, res) => {
    res.json(SUCCESS());
  });

  // 테넌트 네트워크
  router.get('/api/v1/resource/tenants/:tntId/networks', (req, res) => {
    res.json(require('../fixtures/resource/tenant-networks.json'));
  });

  router.post('/api/v1/resource/tenants/:tntId/networks', (req, res) => {
    res.json(SUCCESS());
  });

  // 테넌트 플랫폼 가용량
  router.get('/api/v1/resource/tenants/:tntId/capa/platforms', (req, res) => {
    res.json(require('../fixtures/resource/tenant-capacity-platforms.json'));
  });

  // 테넌트 템플릿
  router.get('/api/v1/resource/tenants/:tntId/temps', (req, res) => {
    res.json(require('../fixtures/resource/template-list.json'));
  });

  router.post('/api/v1/resource/tenants/manager/:tntId/template', (req, res) => {
    res.json(SUCCESS());
  });

  // 테넌트 목록/상세
  router.get('/api/v1/resource/tenants', (req, res) => {
    res.json(require('../fixtures/resource/tenant-list.json'));
  });

  router.get('/api/v1/resource/tenants/:tntId', (req, res) => {
    res.json(require('../fixtures/resource/tenant-detail.json'));
  });

  router.put('/api/v1/resource/tenants/:tntId', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/tenants/:tntId', (req, res) => {
    res.json(SUCCESS());
  });

  // ============================================================
  // 도메인
  // ============================================================

  router.get('/api/v1/resource/domains/list', (req, res) => {
    res.json(require('../fixtures/resource/domain-list.json'));
  });

  router.get('/api/v1/resource/domains', (req, res) => {
    res.json(require('../fixtures/resource/domain-list.json'));
  });

  router.get('/api/v1/resource/domains/:id', (req, res) => {
    const item = require('../fixtures/resource/domain-list.json').data[0];
    res.json({ data: item, errCode: null, errMsg: null });
  });

  router.post('/api/v1/resource/domains', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/domains/:id', (req, res) => {
    res.json(SUCCESS());
  });

  // ============================================================
  // AD 스크립트
  // ============================================================

  router.get('/api/v1/resource/adscript/detail/:tntId', (req, res) => {
    res.json(require('../fixtures/resource/adscript-detail.json'));
  });

  router.put('/api/v1/resource/adscript/:cadno', (req, res) => {
    res.json(SUCCESS());
  });

  // ============================================================
  // 초기화 (Init)
  // ============================================================

  router.get('/api/v1/resource/init', (req, res) => {
    res.json(require('../fixtures/resource/init-status.json'));
  });

  router.post('/api/v1/resource/init', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/init/auto/delete/:companyNm', (req, res) => {
    res.json(SUCCESS());
  });

  // ============================================================
  // VM 보안 그룹 (Security Group)
  // ============================================================

  router.get('/api/v1/resource/policies/security-group/:securityGroupId/history', (req, res) => {
    res.json(require('../fixtures/resource/security-group-history.json'));
  });

  router.get('/api/v1/resource/policies/security-group/:securityGroupId/rule', (req, res) => {
    res.json(require('../fixtures/resource/security-group-rules.json'));
  });

  router.post('/api/v1/resource/policies/security-group/:securityGroupId/rule', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/policies/security-group/:securityGroupId/rule/:ruleId', (req, res) => {
    res.json(SUCCESS());
  });

  router.post('/api/v1/resource/policies/security-group/:securityGroupId/sync', (req, res) => {
    res.json(require('../fixtures/resource/security-group-sync-result.json'));
  });

  router.get('/api/v1/resource/policies/security-group/:securityGroupId', (req, res) => {
    res.json(require('../fixtures/resource/security-group-detail.json'));
  });

  router.get('/api/v1/resource/policies/security-group', (req, res) => {
    res.json(require('../fixtures/resource/security-group-list.json'));
  });

  router.post('/api/v1/resource/policies/security-group/sync', (req, res) => {
    res.json(require('../fixtures/resource/security-group-sync-result.json'));
  });

  router.post('/api/v1/resource/policies/security-group', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/policies/security-group/:securityGroupId', (req, res) => {
    res.json(SUCCESS());
  });

  router.delete('/api/v1/resource/policies/security-group/:id', (req, res) => {
    res.json(SUCCESS());
  });

  router.put('/api/v1/resource/vm/:vmId/security-group', (req, res) => {
    res.json(SUCCESS());
  });

  // ============================================================
  // NAS 스토리지 (legacy)
  // ============================================================

  router.get('/api/v1/legacy/cloud/ad/allSharedfolders', (req, res) => {
    res.json(require('../fixtures/resource/nas-sa-list.json'));
  });

  router.post('/api/v1/legacy/cloud/ad/sharedfolder/directories', (req, res) => {
    res.json(require('../fixtures/resource/nas-ta-list.json'));
  });
};
