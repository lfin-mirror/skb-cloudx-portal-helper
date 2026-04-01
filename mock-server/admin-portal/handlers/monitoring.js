module.exports = function (router, getScenario) {
  // =========================================================================
  // 알람 카운트 (Navbar 뱃지)
  // =========================================================================

  router.get('/api/v1/management/statistics/service/alarmconform/count', (req, res) => {
    res.json("0");
  });

  router.get('/api/v1/management/statistics/service/alarmconform', (req, res) => {
    res.json({
      data: [
        { alarm_id: 'ALM-001', alarm_nm: '호스트 CPU 사용률 초과', alarm_level: 'critical', reg_ts: '2026-03-26 10:00:00' },
        { alarm_id: 'ALM-002', alarm_nm: '스토리지 용량 경고', alarm_level: 'warning', reg_ts: '2026-03-26 09:30:00' },
        { alarm_id: 'ALM-003', alarm_nm: '네트워크 지연 감지', alarm_level: 'warning', reg_ts: '2026-03-26 09:00:00' }
      ],
      errCode: null,
      errMsg: null
    });
  });

  // =========================================================================
  // 대시보드 패널 설정
  // =========================================================================

  router.get('/api/v1/management/dashboard/panel/:acctId/list', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-panel-list.json'));
  });

  router.put('/api/v1/management/dashboard/panel/:acctId', (req, res) => {
    res.json(require('../fixtures/action-success.json'));
  });

  // =========================================================================
  // 알람 설정 (Alarm Settings)
  // =========================================================================

  // 목록 조회
  router.get('/api/v1/management/alarm', (req, res) => {
    res.json(require('../fixtures/monitoring/alarm-list.json'));
  });

  // 단건 조회
  router.get('/api/v1/management/alarm/:id', (req, res) => {
    res.json(require('../fixtures/monitoring/alarm-detail.json'));
  });

  // 등록
  router.post('/api/v1/management/alarm', (req, res) => {
    res.json(require('../fixtures/action-success.json'));
  });

  // 수정
  router.put('/api/v1/management/alarm/:id', (req, res) => {
    res.json(require('../fixtures/action-success.json'));
  });

  // 삭제
  router.delete('/api/v1/management/alarm/:id', (req, res) => {
    res.json(require('../fixtures/action-success.json'));
  });

  // =========================================================================
  // 알람 이력 (Alarm Histories)
  // =========================================================================

  router.get('/api/v1/management/statistics/service/alarm', (req, res) => {
    res.json(require('../fixtures/monitoring/alarm-histories.json'));
  });

  // =========================================================================
  // 알람 수신 그룹 (Receive Group)
  // =========================================================================

  // 목록 조회
  router.get('/api/v1/management/receive/group', (req, res) => {
    res.json(require('../fixtures/monitoring/receive-group-list.json'));
  });

  // 단건 조회
  router.get('/api/v1/management/receive/group/:id', (req, res) => {
    res.json(require('../fixtures/monitoring/receive-group-detail.json'));
  });

  // 등록
  router.post('/api/v1/management/receive/group', (req, res) => {
    res.json(require('../fixtures/action-success.json'));
  });

  // 수정
  router.put('/api/v1/management/receive/group/:id', (req, res) => {
    res.json(require('../fixtures/action-success.json'));
  });

  // 삭제
  router.delete('/api/v1/management/receive/group/:id', (req, res) => {
    res.json(require('../fixtures/action-success.json'));
  });

  // =========================================================================
  // 알람 수신 임계치 (Receive Threshold)
  // =========================================================================

  // 목록 조회
  router.get('/api/v1/management/receive/threshold', (req, res) => {
    res.json(require('../fixtures/monitoring/receive-threshold-list.json'));
  });

  // 단건 조회
  router.get('/api/v1/management/receive/threshold/:id', (req, res) => {
    res.json(require('../fixtures/monitoring/receive-threshold-detail.json'));
  });

  // 등록
  router.post('/api/v1/management/receive/threshold', (req, res) => {
    res.json(require('../fixtures/action-success.json'));
  });

  // 수정
  router.put('/api/v1/management/receive/threshold/:id', (req, res) => {
    res.json(require('../fixtures/action-success.json'));
  });

  // 삭제
  router.delete('/api/v1/management/receive/threshold/:id', (req, res) => {
    res.json(require('../fixtures/action-success.json'));
  });

  // 수신 이력 조회
  router.get('/api/v1/management/receive/histories', (req, res) => {
    res.json(require('../fixtures/monitoring/receive-histories.json'));
  });

  // 수신자 목록 조회
  router.get('/api/v1/management/receive/receiver', (req, res) => {
    res.json(require('../fixtures/monitoring/receive-receiver-list.json'));
  });

  // =========================================================================
  // 감사 로그 (Audit Log)
  // =========================================================================

  // 관리자 감사로그 조회
  router.get('/api/v1/audit/auditlog/admin', (req, res) => {
    res.json(require('../fixtures/monitoring/audit-admin-list.json'));
  });

  // 사용자 감사로그 조회
  router.get('/api/v1/audit/auditlog/user', (req, res) => {
    res.json(require('../fixtures/monitoring/audit-user-list.json'));
  });

  // 감사로그 단건 상세 조회
  router.get('/api/v1/audit/auditlog/:apiType/:audit_id', (req, res) => {
    res.json(require('../fixtures/monitoring/audit-detail.json'));
  });

  // =========================================================================
  // 대시보드 — VPC 현황
  // =========================================================================

  router.get('/api/v1/management/dashboard/vpc/status', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-vpc-status.json'));
  });

  router.get('/api/v1/management/dashboard/vpc/count', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-vpc-count.json'));
  });

  router.get('/api/v1/management/dashboard/vpc/usage', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-vpc-usage.json'));
  });

  router.get('/api/v1/management/dashboard/vpc/latency', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-vpc-topk.json'));
  });

  router.get('/api/v1/management/dashboard/vpc/networkrx', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-vpc-topk.json'));
  });

  router.get('/api/v1/management/dashboard/vpc/cpu', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-vpc-topk.json'));
  });

  router.get('/api/v1/management/dashboard/vpc/memory', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-vpc-topk.json'));
  });

  router.get('/api/v1/management/dashboard/vpc/disk', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-vpc-topk.json'));
  });

  // 테넌트용 VM 상태
  router.get('/api/v1/management/dashboard/vm/status', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-vm-status.json'));
  });

  // 테넌트용 사용자 수
  router.get('/api/v1/management/dashboard/user/count', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-user-count.json'));
  });

  // 테넌트용 사용자 통계
  router.get('/api/v1/management/dashboard/user/stats', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-user-stats.json'));
  });

  // =========================================================================
  // 대시보드 — 서버(노드) 현황
  // =========================================================================

  router.get('/api/v1/management/dashboard/node/count', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-node-count.json'));
  });

  router.get('/api/v1/management/dashboard/node/list', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-node-list.json'));
  });

  router.get('/api/v1/management/dashboard/node/cpu', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-node-topk.json'));
  });

  router.get('/api/v1/management/dashboard/node/memory', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-node-topk.json'));
  });

  router.get('/api/v1/management/dashboard/node/disk', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-node-topk.json'));
  });

  router.get('/api/v1/management/dashboard/node/networkrx', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-node-topk.json'));
  });

  // 노드 지표별 조회 (network/bps, network/summary 포함하므로 파라미터 라우트보다 먼저 등록)
  router.get('/api/v1/management/dashboard/node/network/bps', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-node-metric.json'));
  });

  router.get('/api/v1/management/dashboard/node/network/summary', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-node-metric.json'));
  });

  router.get('/api/v1/management/dashboard/node/network', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-node-metric.json'));
  });

  router.get('/api/v1/management/dashboard/node/networktx', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-node-metric.json'));
  });

  // =========================================================================
  // 대시보드 — 스토리지 현황
  // =========================================================================

  router.get('/api/v1/management/dashboard/storage/status', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-storage-status.json'));
  });

  router.get('/api/v1/management/dashboard/storage/usage', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-storage-usage.json'));
  });

  router.get('/api/v1/management/dashboard/storage/diskio', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-storage-diskio.json'));
  });

  router.get('/api/v1/management/dashboard/storage/usage/osd', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-storage-osd-topk.json'));
  });

  // =========================================================================
  // 대시보드 — 알람 현황
  // =========================================================================

  router.get('/api/v1/management/dashboard/alarm/count', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-alarm-count.json'));
  });

  router.get('/api/v1/management/dashboard/alarm/list', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-alarm-list.json'));
  });

  // =========================================================================
  // 대시보드 — Pod 현황
  // =========================================================================

  router.get('/api/v1/management/dashboard/pod/count', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-pod-count.json'));
  });

  router.get('/api/v1/management/dashboard/pod/list', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-pod-list.json'));
  });

  router.get('/api/v1/management/dashboard/pod/namespaces', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-pod-namespaces.json'));
  });

  router.get('/api/v1/management/dashboard/pod/cpu', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-pod-topk.json'));
  });

  router.get('/api/v1/management/dashboard/pod/memory', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-pod-topk.json'));
  });

  // =========================================================================
  // 대시보드 — 네트워크 현황
  // =========================================================================

  router.get('/api/v1/management/dashboard/network/status', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-network-status.json'));
  });

  // =========================================================================
  // 대시보드 — iframe 경로
  // =========================================================================

  router.get('/api/v1/management/api/dashboard/ifarmePathAdmin', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-iframe-admin.json'));
  });

  router.get('/api/v1/management/api/dashboard/ifarmePath/:tenantId', (req, res) => {
    res.json(require('../fixtures/monitoring/dashboard-iframe-tenant.json'));
  });

  // =========================================================================
  // 사용자 위젯 (User Widget)
  // =========================================================================

  // 계정별 위젯 구성 조회 (구체적 경로 먼저)
  router.get('/api/v1/user/widget/account', (req, res) => {
    res.json(require('../fixtures/monitoring/widget-account.json'));
  });

  // 계정별 위젯 구성 저장
  router.post('/api/v1/user/widget/account', (req, res) => {
    res.json(require('../fixtures/action-success.json'));
  });

  // 위젯 목록 조회
  router.get('/api/v1/user/widget', (req, res) => {
    res.json(require('../fixtures/monitoring/widget-list.json'));
  });

  // =========================================================================
  // 로그 통계 — 사용자 활동 로그
  // =========================================================================

  router.get('/api/v1/management/statistics/user/log/total', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-total.json'));
  });

  router.get('/api/v1/management/statistics/user/log', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-user-log.json'));
  });

  // =========================================================================
  // 로그 통계 — 관리자 활동 로그
  // =========================================================================

  router.get('/api/v1/management/statistics/admin/log/total', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-total.json'));
  });

  router.get('/api/v1/management/statistics/admin/log', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-admin-log.json'));
  });

  // =========================================================================
  // 로그 통계 — 접속 이력 통계
  // =========================================================================

  router.get('/api/v1/management/statistics/connhist/byperiod/list/csv', (req, res) => {
    res.set('Content-Type', 'text/csv');
    res.send('stat_dt,conn_cnt,disconn_cnt,avg_usage_min\n2026-03-24,215,210,142\n2026-03-25,248,245,156\n');
  });

  router.get('/api/v1/management/statistics/connhist/byperiod/total', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-total.json'));
  });

  router.get('/api/v1/management/statistics/connhist/byperiod/list', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-connhist-byperiod.json'));
  });

  router.get('/api/v1/management/statistics/connhist/peruser/list/csv', (req, res) => {
    res.set('Content-Type', 'text/csv');
    res.send('acct_conn_id,acct_nm,conn_cnt,total_usage_min\nuser_choi,최사용,42,3150\n');
  });

  router.get('/api/v1/management/statistics/connhist/peruser/total', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-total.json'));
  });

  router.get('/api/v1/management/statistics/connhist/peruser/list', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-connhist-peruser.json'));
  });

  router.get('/api/v1/management/statistics/connhist/detail/total', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-total.json'));
  });

  router.get('/api/v1/management/statistics/connhist/detail/list', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-connhist-detail.json'));
  });

  // =========================================================================
  // 로그 통계 — 접속 현황 (실시간)
  // =========================================================================

  router.get('/api/v1/management/statistics/totalconnstat/total', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-total.json'));
  });

  router.get('/api/v1/management/statistics/totalconnstat/list', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-totalconnstat.json'));
  });

  // =========================================================================
  // 로그 통계 — 사용자 수 통계
  // =========================================================================

  router.get('/api/v1/management/statistics/totalusers/byperiod/list/csv', (req, res) => {
    res.set('Content-Type', 'text/csv');
    res.send('stat_dt,total_user_cnt,active_user_cnt\n2026-03-24,310,278\n');
  });

  router.get('/api/v1/management/statistics/totalusers/byperiod/total', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-total.json'));
  });

  router.get('/api/v1/management/statistics/totalusers/byperiod/list', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-totalusers-byperiod.json'));
  });

  router.get('/api/v1/management/statistics/totalusers/bygroup/list/csv', (req, res) => {
    res.set('Content-Type', 'text/csv');
    res.send('usr_grp_nm,tnt_nm,total_user_cnt,active_user_cnt\n개발 그룹,테넌트A,120,108\n');
  });

  router.get('/api/v1/management/statistics/totalusers/bygroup/total', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-total.json'));
  });

  router.get('/api/v1/management/statistics/totalusers/bygroup/list', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-totalusers-bygroup.json'));
  });

  // =========================================================================
  // 로그 통계 — 사용 시간 통계
  // =========================================================================

  router.get('/api/v1/management/statistics/usagetime/byperiod/list/csv', (req, res) => {
    res.set('Content-Type', 'text/csv');
    res.send('stat_dt,total_usage_min,avg_usage_min\n2026-03-24,31320,144\n');
  });

  router.get('/api/v1/management/statistics/usagetime/byperiod/total', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-total.json'));
  });

  router.get('/api/v1/management/statistics/usagetime/byperiod/list', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-usagetime-byperiod.json'));
  });

  router.get('/api/v1/management/statistics/usagetime/peruser/list/csv', (req, res) => {
    res.set('Content-Type', 'text/csv');
    res.send('acct_conn_id,acct_nm,total_usage_min,avg_usage_min\nuser_choi,최사용,3150,75\n');
  });

  router.get('/api/v1/management/statistics/usagetime/peruser/total', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-total.json'));
  });

  router.get('/api/v1/management/statistics/usagetime/peruser/list', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-usagetime-peruser.json'));
  });

  // =========================================================================
  // 로그 통계 — 오류 통계
  // =========================================================================

  router.get('/api/v1/management/statistics/error/system', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-error-system.json'));
  });

  router.get('/api/v1/management/statistics/error/client', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-error-client.json'));
  });

  // =========================================================================
  // VPC 통계
  // =========================================================================

  router.get('/api/v1/management/statistics/vpc/allocation', (req, res) => {
    res.json(require('../fixtures/monitoring/vpc-stat-allocation.json'));
  });

  router.get('/api/v1/management/statistics/vpc/usage/total', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-total.json'));
  });

  router.get('/api/v1/management/statistics/vpc/usage', (req, res) => {
    res.json(require('../fixtures/monitoring/vpc-stat-usage.json'));
  });

  router.get('/api/v1/management/statistics/vpc/connection/attempt', (req, res) => {
    res.json(require('../fixtures/monitoring/vpc-stat-connection-attempt.json'));
  });

  router.get('/api/v1/management/statistics/vpc/connection', (req, res) => {
    res.json(require('../fixtures/monitoring/vpc-stat-connection.json'));
  });

  router.get('/api/v1/management/statistics/vpc/nonconnection', (req, res) => {
    res.json(require('../fixtures/monitoring/vpc-stat-nonconnection.json'));
  });

  router.get('/api/v1/management/statistics/vpc/network', (req, res) => {
    res.json(require('../fixtures/monitoring/vpc-stat-network.json'));
  });

  router.get('/api/v1/management/statistics/getUserVMTotalInfo', (req, res) => {
    res.json(require('../fixtures/monitoring/vpc-stat-getuservm-total.json'));
  });

  router.get('/api/v1/management/statistics/getUserVM', (req, res) => {
    res.json(require('../fixtures/monitoring/vpc-stat-getuservm.json'));
  });

  // =========================================================================
  // 서비스 통계
  // =========================================================================

  router.get('/api/v1/management/statistics/user/total', (req, res) => {
    res.json(require('../fixtures/monitoring/service-stat-user-total.json'));
  });

  router.get('/api/v1/management/statistics/user/client', (req, res) => {
    res.json(require('../fixtures/monitoring/service-stat-user-client.json'));
  });

  router.get('/api/v1/management/statistics/user/vpc/total', (req, res) => {
    res.json(require('../fixtures/monitoring/log-stat-total.json'));
  });

  router.get('/api/v1/management/statistics/user/vpc', (req, res) => {
    res.json(require('../fixtures/monitoring/service-stat-user-vpc.json'));
  });

  router.get('/api/v1/management/statistics/browser', (req, res) => {
    res.json(require('../fixtures/monitoring/service-stat-browser.json'));
  });

  router.get('/api/v1/management/statistics/work/handling', (req, res) => {
    res.json(require('../fixtures/monitoring/service-stat-work-handling.json'));
  });

  router.get('/api/v1/management/statistics/work/support', (req, res) => {
    res.json(require('../fixtures/monitoring/service-stat-work-support.json'));
  });

  router.get('/api/v1/management/statistics/mailing/email', (req, res) => {
    res.json(require('../fixtures/monitoring/service-stat-mailing-email.json'));
  });

  router.get('/api/v1/management/statistics/mailing/sms', (req, res) => {
    res.json(require('../fixtures/monitoring/service-stat-mailing-sms.json'));
  });

  router.get('/api/v1/management/statistics/month/report', (req, res) => {
    res.json(require('../fixtures/monitoring/service-stat-month-report.json'));
  });

  router.get('/api/v1/management/statistics/deploy', (req, res) => {
    res.json(require('../fixtures/monitoring/service-stat-deploy.json'));
  });

  // =========================================================================
  // 품질 통계
  // =========================================================================

  router.get('/api/v1/management/statistics/quality/delay', (req, res) => {
    res.json(require('../fixtures/monitoring/quality-stat-delay.json'));
  });

  router.get('/api/v1/management/statistics/quality/environment/graph', (req, res) => {
    res.json(require('../fixtures/monitoring/quality-stat-environment-graph.json'));
  });

  router.get('/api/v1/management/statistics/quality/environment', (req, res) => {
    res.json(require('../fixtures/monitoring/quality-stat-environment.json'));
  });

  router.get('/api/v1/management/statistics/quality/bandwidth', (req, res) => {
    res.json(require('../fixtures/monitoring/quality-stat-bandwidth.json'));
  });

  // =========================================================================
  // 호스트 통계
  // =========================================================================

  router.get('/api/v1/management/statistics/host/cpu', (req, res) => {
    res.json(require('../fixtures/monitoring/host-stat-cpu.json'));
  });

  router.get('/api/v1/management/statistics/host/memory', (req, res) => {
    res.json(require('../fixtures/monitoring/host-stat-memory.json'));
  });

  router.get('/api/v1/management/statistics/host/disk', (req, res) => {
    res.json(require('../fixtures/monitoring/host-stat-disk.json'));
  });

  router.get('/api/v1/management/statistics/host/network', (req, res) => {
    res.json(require('../fixtures/monitoring/host-stat-network.json'));
  });

  // =========================================================================
  // 스토리지 통계
  // =========================================================================

  router.get('/api/v1/management/statistics/storage/os', (req, res) => {
    res.json(require('../fixtures/monitoring/storage-stat-os.json'));
  });

  router.get('/api/v1/management/statistics/storage/nas', (req, res) => {
    res.json(require('../fixtures/monitoring/storage-stat-nas.json'));
  });

  // =========================================================================
  // 공통 보조 API
  // =========================================================================

  router.get('/api/v1/management/common/zones', (req, res) => {
    res.json(require('../fixtures/monitoring/common-zones.json'));
  });

  router.get('/api/v1/management/common/zone/:parentValue/hosts', (req, res) => {
    res.json(require('../fixtures/monitoring/common-zone-hosts.json'));
  });

  router.get('/api/v1/management/common/service/:parentValue/error/code', (req, res) => {
    res.json(require('../fixtures/monitoring/common-service-error-codes.json'));
  });

  router.get('/api/v1/management/common/client/:parentValue/version', (req, res) => {
    res.json(require('../fixtures/monitoring/common-client-versions.json'));
  });

  router.get('/api/v1/management/common/vpcs', (req, res) => {
    res.json(require('../fixtures/monitoring/common-vpcs.json'));
  });
};
