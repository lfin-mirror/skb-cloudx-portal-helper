module.exports = function (app, getScenario) {
  app.post('/api/v1/nauth/auth/authentications/2nd_cert', (req, res) => {
    const fixture = require('../fixtures/auth/2fa-send-success.json');
    res.json(fixture);
  });

  app.post('/api/v1/nauth/auth/authentications/accounts', (req, res) => {
    const fixture = require('../fixtures/auth/find-id-success.json');
    res.json(fixture);
  });

  app.post('/api/v1/nauth/auth/authentications/temp/passwd', (req, res) => {
    const fixture = require('../fixtures/auth/find-pwd-success.json');
    res.json(fixture);
  });

  app.get('/api/v1/nauth/user/tenant/exist', (req, res) => {
    const scenario = getScenario('/api/v1/nauth/user/tenant/exist');
    const fixtureFile = scenario === 'not-found' ? 'tenant-not-found' : 'tenant-exist';
    const fixture = require(`../fixtures/auth/${fixtureFile}.json`);
    res.json(fixture);
  });

  app.get('/api/v1/nauth/user/tntMain', (req, res) => {
    const fixture = require('../fixtures/auth/tenant-main.json');
    res.json(fixture);
  });

  app.post('/api/v1/nauth/user/auth/check', (req, res) => {
    res.set('Authorization', 'Bearer mock-jwt-token-xxx');
    res.json({ data: null, errCode: null, errMsg: null });
  });

  app.get('/api/v1/nauth/system/installer', (req, res) => {
    const fixture = require('../fixtures/auth/installer.json');
    res.json(fixture);
  });

  app.get('/api/v1/nauth/system/notices/public', (req, res) => {
    const fixture = require('../fixtures/auth/notices-public.json');
    res.json(fixture);
  });

  app.get('/api/v1/nauth/system/popup', (req, res) => {
    const scenario = getScenario('/api/v1/nauth/system/popup');
    const fixtureFile = scenario === 'maintenance' ? 'popup-maintenance' : 'popup-none';
    const fixture = require(`../fixtures/auth/${fixtureFile}.json`);
    res.json(fixture);
  });

  app.get('/api/v1/nauth/system/portals/ui/:tntUrlId/public', (req, res) => {
    const fixture = require('../fixtures/auth/portal-ui.json');
    res.json(fixture);
  });

  app.get('/api/v1/nauth/:tntUrlId/getToday', (req, res) => {
    const fixture = JSON.parse(JSON.stringify(require('../fixtures/auth/server-time.json')));
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    if (fixture.data) {
      fixture.data.today = `${yyyy}${mm}${dd}`;
    }
    res.json(fixture);
  });

  app.post('/api/v1/nauth/idcheck', (req, res) => {
    res.json({ data: null, errCode: null, errMsg: null });
  });

  app.post('/api/v1/nauth/reqToken', (req, res) => {
    res.json({ data: null, errCode: null, errMsg: null });
  });

  app.post('/api/v1/nauth/userLogin', (req, res) => {
    res.json({ data: null, errCode: null, errMsg: null });
  });

  app.post('/api/v1/nauth/loginCheck', (req, res) => {
    res.json({ data: null, errCode: null, errMsg: null });
  });
};
