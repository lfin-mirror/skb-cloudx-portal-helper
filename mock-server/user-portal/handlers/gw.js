module.exports = function (app, getScenario) {
  app.post('/api/v1/gw/authentications/', (req, res) => {
    const scenario = getScenario('/api/v1/gw/authentications/');
    const fixture = require(`../fixtures/auth/login-${scenario}.json`);
    const errorScenarios = ['failed', 'locked'];
    if (errorScenarios.includes(scenario)) {
      return res.status(401).json(fixture);
    }
    if (!['dormant'].includes(scenario)) {
      res.set('Authorization', 'Bearer mock-jwt-token-xxx');
    }
    res.json(fixture);
  });

  app.post(
    '/api/v1/gw/authentications/2nd_cert/:tenant/:acctConnId/:challengeId/:certNo',
    (req, res) => {
      const scenario = getScenario('/api/v1/gw/authentications/2nd_cert/sms');
      const fixtureScenario = scenario === 'expired' ? '2fa-expired' : `2fa-verify-${scenario}`;
      const fixture = require(`../fixtures/auth/${fixtureScenario}.json`);
      if (scenario === 'success') {
        res.set('Authorization', 'Bearer mock-jwt-token-xxx');
      }
      res.json(fixture);
    }
  );

  app.post(
    '/api/v1/gw/authentications/2nd_cert/:tntUrlId/:acctConnId/:challengeId/:otpNo/totp',
    (req, res) => {
      const scenario = getScenario('/api/v1/gw/authentications/2nd_cert/totp');
      const fixtureScenario = scenario === 'expired' ? '2fa-expired' : `2fa-verify-${scenario}`;
      const fixture = require(`../fixtures/auth/${fixtureScenario}.json`);
      if (scenario === 'success') {
        res.set('Authorization', 'Bearer mock-jwt-token-xxx');
      }
      res.json(fixture);
    }
  );
};
