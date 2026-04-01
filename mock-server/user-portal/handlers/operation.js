module.exports = function (app, getScenario) {
  app.get('/api/v1/operation/cert/n2nd/info/:certPlcyId', (req, res) => {
    const fixture = require('../fixtures/system/cert-policy.json');
    res.json(fixture);
  });

  app.get('/api/v1/operation/cert/secu/info/:securityPolicyId', (req, res) => {
    const fixture = require('../fixtures/system/cert-policy.json');
    res.json(fixture);
  });
};
