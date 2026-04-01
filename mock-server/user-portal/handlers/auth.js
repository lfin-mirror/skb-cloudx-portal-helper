module.exports = function (app, getScenario) {
  app.post('/api/v1/auth/authentications/', (req, res) => {
    const scenario = getScenario('/api/v1/auth/authentications/');
    const fixtureFile = scenario === 'failed' ? 'password-wrong' : 'password-change-success';
    const fixture = require(`../fixtures/auth/${fixtureFile}.json`);
    res.json(fixture);
  });

  app.put('/api/v1/auth/authentications/accounts/firstpassword', (req, res) => {
    const scenario = getScenario('/api/v1/auth/authentications/accounts/firstpassword');
    if (scenario === 'wrong') {
      res.json({ data: null, errCode: 'AUTH-4211', errMsg: 'Password policy not satisfied' });
    } else {
      res.json({ data: null, errCode: null, errMsg: null });
    }
  });

  app.put('/api/v1/auth/authentications/accounts/password', (req, res) => {
    const scenario = getScenario('/api/v1/auth/authentications/accounts/password');
    if (scenario === 'wrong') {
      res.json({ data: null, errCode: 'AUTH-4211', errMsg: 'Password policy not satisfied' });
    } else {
      res.json({ data: null, errCode: null, errMsg: null });
    }
  });

  app.get('/api/v1/logout', (req, res) => {
    res.json({ data: null, errCode: null, errMsg: null });
  });
};
