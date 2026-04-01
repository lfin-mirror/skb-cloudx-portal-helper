module.exports = function (app, getScenario) {
  app.get('/api/v1/resource/vpcs/resources', (req, res) => {
    const fixture = require('../fixtures/resource/vpc-list.json');
    res.json(fixture);
  });

  app.get('/api/v1/resource/vpcs/auto/mapping/user/pool/list', (req, res) => {
    const fixture = require('../fixtures/resource/pool-list.json');
    res.json(fixture);
  });

  app.get('/api/v1/resource/vpcs/resources/:vmAuthId', (req, res) => {
    const fixture = require('../fixtures/resource/vpc-detail.json');
    res.json(fixture);
  });

  app.post('/api/v1/resource/vpcs/resources/:vmAuthId/start', (req, res) => {
    const fixture = require('../fixtures/resource/action-success.json');
    res.json(fixture);
  });

  app.post('/api/v1/resource/vpcs/resources/:vmAuthId/stop', (req, res) => {
    const fixture = require('../fixtures/resource/action-success.json');
    res.json(fixture);
  });

  app.post('/api/v1/resource/vpcs/resources/:vmAuthId/restart', (req, res) => {
    const fixture = require('../fixtures/resource/action-success.json');
    res.json(fixture);
  });

  app.post('/api/v1/resource/vpcs/resources/:vmAuthId/recovery', (req, res) => {
    const fixture = require('../fixtures/resource/action-success.json');
    res.json(fixture);
  });

  app.post('/api/v1/resource/vpcs/resources/:vmAuthId/initial', (req, res) => {
    const fixture = require('../fixtures/resource/action-success.json');
    res.json(fixture);
  });

  app.put('/api/v1/resource/vpcs/resources/:vmAuthId/user', (req, res) => {
    const fixture = require('../fixtures/resource/action-success.json');
    res.json(fixture);
  });

  app.post('/api/v1/resource/vpcs/resources/vm_auto_assign', (req, res) => {
    const fixture = require('../fixtures/resource/action-success.json');
    res.json(fixture);
  });

  app.get('/api/v1/resource/vm-authorization', (req, res) => {
    const fixture = require('../fixtures/resource/vm-authorization-list.json');
    res.json(fixture);
  });

  app.get('/api/v1/resource/vm-authorization/:vmAuthId', (req, res) => {
    const fixture = require('../fixtures/resource/vm-authorization.json');
    res.json(fixture);
  });

  app.get('/api/v1/resource/snapshot/:vmAuthId', (req, res) => {
    const fixture = require('../fixtures/resource/snapshot-list.json');
    res.json(fixture);
  });

  app.delete('/api/v1/resource/snapshot/:snapId', (req, res) => {
    const fixture = require('../fixtures/resource/action-success.json');
    res.json(fixture);
  });

  app.put('/api/v1/resource/snapshot/restore/:vmAuthId/:snapId', (req, res) => {
    const fixture = require('../fixtures/resource/action-success.json');
    res.json(fixture);
  });

  app.post('/api/v1/resource/snapshot/execSnapshot/:vmAuthId', (req, res) => {
    const fixture = require('../fixtures/resource/action-success.json');
    res.json(fixture);
  });

  app.get('/api/v1/resource/disk/local/:acctId', (req, res) => {
    const fixture = require('../fixtures/resource/disk-list.json');
    res.json(fixture);
  });

  app.post('/api/v1/resource/disk/local', (req, res) => {
    const fixture = require('../fixtures/resource/action-success.json');
    res.json(fixture);
  });

  app.delete('/api/v1/resource/disk/local/:dskId', (req, res) => {
    const fixture = require('../fixtures/resource/action-success.json');
    res.json(fixture);
  });

  app.put('/api/v1/resource/disk/local/attach', (req, res) => {
    const fixture = require('../fixtures/resource/action-success.json');
    res.json(fixture);
  });

  app.put('/api/v1/resource/disk/local/detach', (req, res) => {
    const fixture = require('../fixtures/resource/action-success.json');
    res.json(fixture);
  });
};
