const { TOKENS } = require('../../constants');

module.exports = function (router, getScenario) {
  // admin-portal 로그인
  // 아이디에 'sa'가 포함되면 Super Admin, 'ta'가 포함되면 Tenant Admin
  router.post('/api/v1/gw/authentications/admin', (req, res) => {
    const acctConnId = (req.body.acct_conn_id || '').toLowerCase();
    const isSa = acctConnId.includes('sa');
    const token = isSa ? TOKENS.SUPER_ADMIN : TOKENS.TENANT_ADMIN;
    res.set('Authorization', token);
    res.json({
      data: {
        challenge_id: 'mock-challenge-admin',
        acct_sts_cd: 'U013NR',
        acct_2nd_cert_tgt_yn: 'N',
        n2nd_cert_typ_cd: '',
        passwd_mdfy_tgt_yn: 'N',
        passwd_mdfy_vlid_yn: 'N',
        ad_itlk_acct_yn: 'N',
        acct_conn_id: isSa ? 'superadmin' : 'tenantadmin',
        acct_id: isSa ? 'ACCT-SA-001' : 'ACCT-TA-001',
        acct_nm: isSa ? '슈퍼 관리자' : '테넌트 관리자',
        grp_typ_cd: isSa ? 'U001SUP' : 'U001TNT',
        tnt_id: isSa ? null : '02157c4b5e534cb492ed5c886d3b44d7',
        tnt_nm: isSa ? null : 'TEST_TENANT',
        tnt_url_id: isSa ? null : 'TEST_TENANT',
        serv_grp_id: isSa ? null : 'SG-001',
        usr_grp_id: isSa ? 'supadm' : 'tntadm',
        x_real_ip: '127.0.0.1',
      },
      errCode: null,
      errMsg: null,
    });
  });

  // 로그아웃
  router.get('/api/v1/logout', (req, res) => {
    res.json({ data: null, errCode: null, errMsg: null });
  });

  // SA ↔ TA 권한 전환
  router.post('/api/v1/authRemake', (req, res) => {
    const { grp_typ_cd, tnt_id, usr_grp_id } = req.body;
    const isSa = grp_typ_cd === 'U001SUP';
    const token = isSa ? TOKENS.SUPER_ADMIN : TOKENS.TENANT_ADMIN;
    res.set('Authorization', token);
    res.json({
      data: {
        tnt_id: isSa ? '' : (tnt_id || 'TNT-001'),
        tnt_nm: isSa ? '' : '테스트 테넌트',
        grp_typ_cd: isSa ? 'U001SUP' : 'U001TNT',
        serv_grp_id: isSa ? '' : 'SG-001',
        serv_grp_nm: isSa ? '' : '기본 서비스 그룹',
        vm_grp_id: isSa ? '' : 'VG-001',
        ad_itlk_usg_yn: 'N',
      },
      errCode: null,
      errMsg: null,
    });
  });
};
