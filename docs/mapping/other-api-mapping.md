# 기타 API 매핑 (user, system, gw, monitoring)

로컬에 존재하는 MS: `app-ms-resource`, `app-ms-operation`
로컬 미존재 MS: `user-ms`, `system-ms`, `gateway`, `management-ms`, `audit-ms`

> `/api/v1/user/...`, `/api/v1/system/...`, `/api/v1/gw/...`, `/api/v1/management/...`, `/api/v1/audit/...` 경로는 모두 로컬에 없는 MS에 해당. `미매핑 (MS 미존재)` 처리.

---

## handler: user.js

| mock API 경로 | HTTP | fixture 파일 | MS | Controller | 매핑 상태 |
|---|---|---|---|---|---|
| `/api/v1/user/admin/groups/menus` | GET | `menus-sa.json` / `menus-ta.json` (토큰 분기) | user-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/user/admin/sadGroups` | GET | `user/sad-groups.json` | user-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/user/admin/groups/menu_func` | GET | `user/menus-tree-ta.json` | user-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/user/admin/groups/menu_func2` | GET | `user/menus-tree-sa.json` / `user/menus-tree-ta.json` (mkind 분기) | user-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/user/admin/groups` | GET | `{ data: [] }` / `user/sad-groups.json` (토큰 분기) | user-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/user/admin/groups/:grpId` | GET | `user/admin-group-detail-ta.json` / `user/admin-group-detail-ta-default.json` (grpId 분기) | user-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/user/accounts/sup` | GET | `user/accounts-sup.json` | user-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/user/accounts/admin` | GET | `user/accounts-sup.json` / `user/accounts-admin-ta.json` (토큰 분기) | user-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/user/accounts/:acctId/admin` | GET | `user/account-admin-detail.json` / `user/account-admin-detail-ta.json` (토큰 분기) | user-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/user/work/request` | GET | `user/work-request-list.json` | user-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/user/work/request/:reqId` | GET | `user/work-request-detail-{usr_req_div_cd}.json` (목록 기반 분기, 7종) | user-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/user/widget/account` | GET | `monitoring/widget-account.json` | user-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/user/widget/account` | POST | `action-success.json` | user-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/user/widget` | GET | `monitoring/widget-list.json` | user-ms | — | 미매핑 (MS 미존재) |

---

## handler: system.js

| mock API 경로 | HTTP | fixture 파일 | MS | Controller | 매핑 상태 |
|---|---|---|---|---|---|
| `/api/v1/system/notices` | GET | `notices.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/notices` | POST | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/notices/:id` | GET | `notice-detail.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/notices/:id` | PUT | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/notices/:id` | DELETE | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/faqs` | GET | `faqs.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/faqs` | POST | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/faqs/:id` | GET | `faq-detail.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/faqs/:id` | PUT | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/faqs/:id` | DELETE | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/qnas` | GET | `qnas.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/qnas/:id` | GET | `qna-detail.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/qnas/:id` | PUT | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/qnas/:id` | DELETE | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/popup` | GET | `popup.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/popup` | PUT | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/popup` | DELETE | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/portals/ui/:tntId` | GET | `nauth-portal-public.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/portals/ui/:tntId` | POST | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/portals/guides/create` | POST | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/portals/guides` | GET | `portals-guides.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/portals/guides` | POST | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/portals/guides/:id/history` | GET | `portals-guide-history.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/portals/guides/:id` | GET | `portals-guide-detail.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/portals/guides/:id` | PUT | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/portals/guides/:id` | DELETE | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/menu/apis` | GET | `menu-apis.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/menu/apis` | POST | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/menu/apis/:apiId` | GET | `menu-api-detail.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/menu/apis/:apiId` | PUT | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/menu/apis/:apiId` | DELETE | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/menu/functions` | GET | `menu-functions.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/menu/functions` | POST | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/menu/functions/:funcAuthId/apis` | GET | `menu-function-apis.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/menu/functions/:funcAuthId/apis` | POST | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/menu/functions/:funcAuthId/apis` | DELETE | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/menu/functions/:funcAuthId` | GET | `menu-function-detail.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/menu/functions/:funcAuthId` | PUT | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/menu/functions/:funcAuthId` | DELETE | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/menu/menus` | POST | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/menu/menus/:menuId/functions` | GET | `menu-functions-unmapped.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/menu/menus/:menuId/functions` | POST | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/menu/menus/:menuId/functions` | DELETE | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/menu/menus/:menuId` | GET | `menu-detail.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/menu/menus/:menuId` | PUT | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/menu/menus/:menuId` | DELETE | `action-success.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/commons/codes` | GET | 인라인 codeMap (cd_grp_id 파라미터 분기) | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/commons/codes/logs/params` | GET | `commons-codes-logs-params.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/voc/adv` | GET | `voc-adv-list.json` | system-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/system/voc/adv/:id` | GET | `system/voc-adv-detail.json` | system-ms | — | 미매핑 (MS 미존재) |

---

## handler: gw.js

| mock API 경로 | HTTP | fixture 파일 | MS | Controller | 매핑 상태 |
|---|---|---|---|---|---|
| `/api/v1/gw/authentications/admin` | POST | 인라인 (acct_conn_id 포함 'sa' → SA 토큰) | gateway | — | 미매핑 (MS 미존재) |
| `/api/v1/logout` | GET | 인라인 `{ data: null }` | gateway | — | 미매핑 (MS 미존재) |
| `/api/v1/authRemake` | POST | 인라인 (grp_typ_cd 분기) | gateway | — | 미매핑 (MS 미존재) |

---

## handler: monitoring.js

| mock API 경로 | HTTP | fixture 파일 | MS | Controller | 매핑 상태 |
|---|---|---|---|---|---|
| `/api/v1/management/statistics/service/alarmconform/count` | GET | 인라인 `{ data: 3 }` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/service/alarmconform` | GET | 인라인 알람 목록 | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/panel/:acctId/list` | GET | `monitoring/dashboard-panel-list.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/panel/:acctId` | PUT | `action-success.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/alarm` | GET | `monitoring/alarm-list.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/alarm/:id` | GET | `monitoring/alarm-detail.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/alarm` | POST | `action-success.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/alarm/:id` | PUT | `action-success.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/alarm/:id` | DELETE | `action-success.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/service/alarm` | GET | `monitoring/alarm-histories.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/receive/group` | GET | `monitoring/receive-group-list.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/receive/group/:id` | GET | `monitoring/receive-group-detail.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/receive/group` | POST | `action-success.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/receive/group/:id` | PUT | `action-success.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/receive/group/:id` | DELETE | `action-success.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/receive/threshold` | GET | `monitoring/receive-threshold-list.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/receive/threshold/:id` | GET | `monitoring/receive-threshold-detail.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/receive/threshold` | POST | `action-success.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/receive/threshold/:id` | PUT | `action-success.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/receive/threshold/:id` | DELETE | `action-success.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/receive/histories` | GET | `monitoring/receive-histories.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/receive/receiver` | GET | `monitoring/receive-receiver-list.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/audit/auditlog/admin` | GET | `monitoring/audit-admin-list.json` | audit-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/audit/auditlog/user` | GET | `monitoring/audit-user-list.json` | audit-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/audit/auditlog/:apiType/:audit_id` | GET | `monitoring/audit-detail.json` | audit-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/vpc/status` | GET | `monitoring/dashboard-vpc-status.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/vpc/count` | GET | `monitoring/dashboard-vpc-count.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/vpc/usage` | GET | `monitoring/dashboard-vpc-usage.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/vpc/latency` | GET | `monitoring/dashboard-vpc-topk.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/vpc/networkrx` | GET | `monitoring/dashboard-vpc-topk.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/vpc/cpu` | GET | `monitoring/dashboard-vpc-topk.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/vpc/memory` | GET | `monitoring/dashboard-vpc-topk.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/vpc/disk` | GET | `monitoring/dashboard-vpc-topk.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/vm/status` | GET | `monitoring/dashboard-vm-status.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/user/count` | GET | `monitoring/dashboard-user-count.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/user/stats` | GET | `monitoring/dashboard-user-stats.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/node/count` | GET | `monitoring/dashboard-node-count.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/node/list` | GET | `monitoring/dashboard-node-list.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/node/cpu` | GET | `monitoring/dashboard-node-topk.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/node/memory` | GET | `monitoring/dashboard-node-topk.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/node/disk` | GET | `monitoring/dashboard-node-topk.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/node/networkrx` | GET | `monitoring/dashboard-node-topk.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/node/network/bps` | GET | `monitoring/dashboard-node-metric.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/node/network/summary` | GET | `monitoring/dashboard-node-metric.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/node/network` | GET | `monitoring/dashboard-node-metric.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/node/networktx` | GET | `monitoring/dashboard-node-metric.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/storage/status` | GET | `monitoring/dashboard-storage-status.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/storage/usage` | GET | `monitoring/dashboard-storage-usage.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/storage/diskio` | GET | `monitoring/dashboard-storage-diskio.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/storage/usage/osd` | GET | `monitoring/dashboard-storage-osd-topk.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/alarm/count` | GET | `monitoring/dashboard-alarm-count.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/alarm/list` | GET | `monitoring/dashboard-alarm-list.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/pod/count` | GET | `monitoring/dashboard-pod-count.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/pod/list` | GET | `monitoring/dashboard-pod-list.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/pod/namespaces` | GET | `monitoring/dashboard-pod-namespaces.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/pod/cpu` | GET | `monitoring/dashboard-pod-topk.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/pod/memory` | GET | `monitoring/dashboard-pod-topk.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/dashboard/network/status` | GET | `monitoring/dashboard-network-status.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/api/dashboard/ifarmePathAdmin` | GET | `monitoring/dashboard-iframe-admin.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/api/dashboard/ifarmePath/:tenantId` | GET | `monitoring/dashboard-iframe-tenant.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/user/log/total` | GET | `monitoring/log-stat-total.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/user/log` | GET | `monitoring/log-stat-user-log.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/admin/log/total` | GET | `monitoring/log-stat-total.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/admin/log` | GET | `monitoring/log-stat-admin-log.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/connhist/byperiod/list/csv` | GET | 인라인 CSV | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/connhist/byperiod/total` | GET | `monitoring/log-stat-total.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/connhist/byperiod/list` | GET | `monitoring/log-stat-connhist-byperiod.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/connhist/peruser/list/csv` | GET | 인라인 CSV | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/connhist/peruser/total` | GET | `monitoring/log-stat-total.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/connhist/peruser/list` | GET | `monitoring/log-stat-connhist-peruser.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/connhist/detail/total` | GET | `monitoring/log-stat-total.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/connhist/detail/list` | GET | `monitoring/log-stat-connhist-detail.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/totalconnstat/total` | GET | `monitoring/log-stat-total.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/totalconnstat/list` | GET | `monitoring/log-stat-totalconnstat.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/totalusers/byperiod/list/csv` | GET | 인라인 CSV | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/totalusers/byperiod/total` | GET | `monitoring/log-stat-total.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/totalusers/byperiod/list` | GET | `monitoring/log-stat-totalusers-byperiod.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/totalusers/bygroup/list/csv` | GET | 인라인 CSV | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/totalusers/bygroup/total` | GET | `monitoring/log-stat-total.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/totalusers/bygroup/list` | GET | `monitoring/log-stat-totalusers-bygroup.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/usagetime/byperiod/list/csv` | GET | 인라인 CSV | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/usagetime/byperiod/total` | GET | `monitoring/log-stat-total.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/usagetime/byperiod/list` | GET | `monitoring/log-stat-usagetime-byperiod.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/usagetime/peruser/list/csv` | GET | 인라인 CSV | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/usagetime/peruser/total` | GET | `monitoring/log-stat-total.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/usagetime/peruser/list` | GET | `monitoring/log-stat-usagetime-peruser.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/error/system` | GET | `monitoring/log-stat-error-system.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/error/client` | GET | `monitoring/log-stat-error-client.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/vpc/allocation` | GET | `monitoring/vpc-stat-allocation.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/vpc/usage/total` | GET | `monitoring/log-stat-total.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/vpc/usage` | GET | `monitoring/vpc-stat-usage.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/vpc/connection/attempt` | GET | `monitoring/vpc-stat-connection-attempt.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/vpc/connection` | GET | `monitoring/vpc-stat-connection.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/vpc/nonconnection` | GET | `monitoring/vpc-stat-nonconnection.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/vpc/network` | GET | `monitoring/vpc-stat-network.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/getUserVMTotalInfo` | GET | `monitoring/vpc-stat-getuservm-total.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/getUserVM` | GET | `monitoring/vpc-stat-getuservm.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/user/total` | GET | `monitoring/service-stat-user-total.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/user/client` | GET | `monitoring/service-stat-user-client.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/user/vpc/total` | GET | `monitoring/log-stat-total.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/user/vpc` | GET | `monitoring/service-stat-user-vpc.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/browser` | GET | `monitoring/service-stat-browser.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/work/handling` | GET | `monitoring/service-stat-work-handling.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/work/support` | GET | `monitoring/service-stat-work-support.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/mailing/email` | GET | `monitoring/service-stat-mailing-email.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/mailing/sms` | GET | `monitoring/service-stat-mailing-sms.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/month/report` | GET | `monitoring/service-stat-month-report.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/deploy` | GET | `monitoring/service-stat-deploy.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/quality/delay` | GET | `monitoring/quality-stat-delay.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/quality/environment/graph` | GET | `monitoring/quality-stat-environment-graph.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/quality/environment` | GET | `monitoring/quality-stat-environment.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/quality/bandwidth` | GET | `monitoring/quality-stat-bandwidth.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/host/cpu` | GET | `monitoring/host-stat-cpu.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/host/memory` | GET | `monitoring/host-stat-memory.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/host/disk` | GET | `monitoring/host-stat-disk.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/host/network` | GET | `monitoring/host-stat-network.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/storage/os` | GET | `monitoring/storage-stat-os.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/statistics/storage/nas` | GET | `monitoring/storage-stat-nas.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/common/zones` | GET | `monitoring/common-zones.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/common/zone/:parentValue/hosts` | GET | `monitoring/common-zone-hosts.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/common/service/:parentValue/error/code` | GET | `monitoring/common-service-error-codes.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/common/client/:parentValue/version` | GET | `monitoring/common-client-versions.json` | management-ms | — | 미매핑 (MS 미존재) |
| `/api/v1/management/common/vpcs` | GET | `monitoring/common-vpcs.json` | management-ms | — | 미매핑 (MS 미존재) |
