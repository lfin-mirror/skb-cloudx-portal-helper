const { TOKENS, getRoleFromToken } = require('../../constants');

module.exports = function (router, getScenario) {
  // 메뉴 목록 — 토큰으로 SA/TA 분기
  router.get('/api/v1/user/admin/groups/menus', (req, res) => {
    const role = getRoleFromToken(req.headers.authorization);
    const fixture = role === 'sa'
      ? require('../fixtures/menus-sa.json')
      : require('../fixtures/menus-ta.json');
    res.json(fixture);
  });

  // 슈퍼관리자 그룹 목록 조회
  router.get('/api/v1/user/admin/sadGroups', (req, res) => {
    res.json(require('../fixtures/user/sad-groups.json'));
  });

  // 메뉴 기능 목록 조회 — menu_func2의 TA 트리 재사용
  router.get('/api/v1/user/admin/groups/menu_func', (req, res) => {
    res.json(require('../fixtures/user/menus-tree-ta.json'));
  });

  // SA/TA 메뉴 트리 (mkind=super → SA, mkind=tenant → TA)
  router.get('/api/v1/user/admin/groups/menu_func2', (req, res) => {
    const mkind = req.query.mkind;
    const fixture = mkind === 'super'
      ? require('../fixtures/user/menus-tree-sa.json')
      : require('../fixtures/user/menus-tree-ta.json');
    res.json(fixture);
  });

  // 관리자 그룹 목록 조회 — SA: 고정 응답 없음(빈 배열), TA: sad-groups 재사용
  router.get('/api/v1/user/admin/groups', (req, res) => {
    const role = getRoleFromToken(req.headers.authorization);
    const fixture = role === 'sa'
      ? { data: [], errCode: null, errMsg: null }
      : require('../fixtures/user/sad-groups.json');
    res.json(fixture);
  });

  // 관리자 그룹 상세 조회 — grpId별 분기
  router.get('/api/v1/user/admin/groups/:grpId', (req, res) => {
    const grpMap = {
      'a67c2a1c-d0e9-4772-98bd-4dc636e4c666': '../fixtures/user/admin-group-detail-ta.json',
      'b31107bb-d904-4de4-a364-7b9b51ac065d': '../fixtures/user/admin-group-detail-ta-default.json',
    };
    const fixturePath = grpMap[req.params.grpId] || grpMap['a67c2a1c-d0e9-4772-98bd-4dc636e4c666'];
    res.json(require(fixturePath));
  });

  // AD 연동 체크
  router.get('/api/v1/user/usergroups/adchk', (req, res) => {
    res.json({ data: { adChk: 'N' } });
  });

  // 사용자 그룹 상세 조회
  router.get('/api/v1/user/usergroups/:id', (req, res) => {
    res.json(require('../fixtures/user/usergroups-detail.json'));
  });

  // 사용자 그룹 목록 조회
  router.get('/api/v1/user/usergroups', (req, res) => {
    res.json(require('../fixtures/user/usergroups-list.json'));
  });

  // 사용자 계정 목록 조회 — SA/TA 분기
  router.get('/api/v1/user/accounts', (req, res) => {
    const role = getRoleFromToken(req.headers.authorization);
    const fixture = role === 'sa'
      ? require('../fixtures/user/accounts-sup.json')
      : require('../fixtures/user/users-list.json');
    res.json(fixture);
  });

  // AD 그룹 동기화
  router.post('/api/v1/legacy/customer/ad/group/sync/:tnt_id', (req, res) => {
    res.json(require('../fixtures/action-success.json'));
  });

  // AD 사용자 동기화
  router.post('/api/v1/legacy/customer/ad/user/sync/:tntId', (req, res) => {
    res.json(require('../fixtures/action-success.json'));
  });

  // 디바이스 식별자 사용자 목록 조회 (fixed path before parameterized)
  router.get('/api/v1/user/device-identifier/users', (req, res) => {
    res.json(require('../fixtures/user/device-access-list.json'));
  });

  // 디바이스 식별자 이력 조회 (/:acctId/hist before /:acctId)
  router.get('/api/v1/user/device-identifier/:acctId/hist', (req, res) => {
    res.json(require('../fixtures/user/device-access-hist.json'));
  });

  // 디바이스 식별자 상세 조회
  router.get('/api/v1/user/device-identifier/:acctId', (req, res) => {
    res.json(require('../fixtures/user/device-access-detail.json'));
  });

  // 디바이스 식별자 등록
  router.post('/api/v1/user/device-identifier', (req, res) => {
    res.json(require('../fixtures/action-success.json'));
  });

  // 디바이스 식별자 이력 수정
  router.put('/api/v1/user/device-identifier/:acctDvcIdentId/hist', (req, res) => {
    res.json(require('../fixtures/action-success.json'));
  });

  // 디바이스 식별자 수정
  router.put('/api/v1/user/device-identifier/:acctDvcIdentId', (req, res) => {
    res.json(require('../fixtures/action-success.json'));
  });

  // 디바이스 식별자 삭제
  router.delete('/api/v1/user/device-identifier/:acctDvcIdentId', (req, res) => {
    res.json(require('../fixtures/action-success.json'));
  });

  // 슈퍼관리자 계정 목록 조회
  router.get('/api/v1/user/accounts/sup', (req, res) => {
    res.json(require('../fixtures/user/accounts-sup.json'));
  });

  // 관리자 계정 목록 조회 — SA/TA 분기
  router.get('/api/v1/user/accounts/admin', (req, res) => {
    const role = getRoleFromToken(req.headers.authorization);
    const fixture = role === 'sa'
      ? require('../fixtures/user/accounts-sup.json')
      : require('../fixtures/user/accounts-admin-ta.json');
    res.json(fixture);
  });

  // 관리자 계정 상세 조회 — SA/TA 분기
  router.get('/api/v1/user/accounts/:acctId/admin', (req, res) => {
    const role = getRoleFromToken(req.headers.authorization);
    const fixture = role === 'sa'
      ? require('../fixtures/user/account-admin-detail.json')
      : require('../fixtures/user/account-admin-detail-ta.json');
    res.json(fixture);
  });

  // 사용자 계정 상세 조회
  router.get('/api/v1/user/accounts/:id', (req, res) => {
    res.json(require('../fixtures/user/accounts-detail.json'));
  });

  // 업무 요청 목록
  router.get('/api/v1/user/work/request', (req, res) => {
    res.json(require('../fixtures/user/work-request-list.json'));
  });

  // 업무 요청 상세 — usr_req_div_cd 기준 분기
  router.get('/api/v1/user/work/request/:reqId', (req, res) => {
    const list = require('../fixtures/user/work-request-list.json');
    const item = list.data.find(d => d.usr_req_id === req.params.reqId);
    const divCd = item ? item.usr_req_div_cd : 'J003USE';

    const fixtureMap = {
      J003DAR: '../fixtures/user/work-request-detail-J003DAR.json',
      J003PET: '../fixtures/user/work-request-detail-J003PET.json',
      J003AUT: '../fixtures/user/work-request-detail-J003AUT.json',
      J003ERR: '../fixtures/user/work-request-detail-J003ERR.json',
      J003RET: '../fixtures/user/work-request-detail-J003RET.json',
      J003ADD: '../fixtures/user/work-request-detail-J003ADD.json',
      J003USE: '../fixtures/user/work-request-detail-J003USE.json',
    };

    const fixturePath = fixtureMap[divCd] || fixtureMap.J003USE;
    res.json(require(fixturePath));
  });

  router.get('/api/v1/mock/user-portal/menu', (req, res) => {
    res.json(require('../fixtures/user/user-portal-menu.json'));
  });
};
