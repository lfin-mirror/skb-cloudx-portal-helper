module.exports = function (router, getScenario) {
  // 현재 비밀번호 확인 (본인 인증)
  router.post('/api/v1/auth/authentications/', (req, res) => {
    res.json({
      data: null,
      errCode: null,
      errMsg: null,
    });
  });

  // 비밀번호 변경
  router.put('/api/v1/auth/authentications/accounts/password', (req, res) => {
    res.json({
      data: true,
      errCode: null,
      errMsg: null,
    });
  });
};
