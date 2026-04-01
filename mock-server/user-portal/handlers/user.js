module.exports = function (app, getScenario) {
  app.get('/api/v1/user/accounts/usg/history', (req, res) => {
    const fixture = require('../fixtures/user/usage-history.json');
    res.json(fixture);
  });

  app.get('/api/v1/user/accounts/:acctId', (req, res) => {
    const fixture = require('../fixtures/user/account-detail.json');
    res.json(fixture);
  });

  app.get('/api/v1/user/work/request/count', (req, res) => {
    const fixture = require('../fixtures/user/work-request-count.json');
    res.json(fixture);
  });

  app.get('/api/v1/user/work/request', (req, res) => {
    const fixture = require('../fixtures/user/work-request-list.json');
    res.json(fixture);
  });

  app.post('/api/v1/user/work/request', (req, res) => {
    const fixture = require('../fixtures/resource/action-success.json');
    res.json(fixture);
  });

  app.put('/api/v1/user/work/request/:usrReqId', (req, res) => {
    const fixture = require('../fixtures/resource/action-success.json');
    res.json(fixture);
  });

  app.get('/api/v1/user/device-access/:acctId/identifier-info', (req, res) => {
    const fixture = require('../fixtures/user/device-access-list.json');
    res.json(fixture);
  });

  app.delete('/api/v1/user/device-access/:id/identifier-info', (req, res) => {
    const fixture = require('../fixtures/resource/action-success.json');
    res.json(fixture);
  });

  app.get('/api/v1/user/device-access/:acctId/hist', (req, res) => {
    const fixture = require('../fixtures/user/device-access-history.json');
    res.json(fixture);
  });

  app.put('/api/v1/user/device-identifier/:id/hist', (req, res) => {
    const fixture = require('../fixtures/resource/action-success.json');
    res.json(fixture);
  });

  app.get('/api/v1/user/servGroup/usergroups', (req, res) => {
    const fixture = require('../fixtures/user/usergroups.json');
    res.json(fixture);
  });
};
