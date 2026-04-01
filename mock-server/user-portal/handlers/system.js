module.exports = function (app, getScenario) {
  app.get('/api/v1/system/notices/count', (req, res) => {
    const fixture = require('../fixtures/system/notice-count.json');
    res.json(fixture);
  });

  app.get('/api/v1/system/notices/:notiWrtNo', (req, res) => {
    const fixture = require('../fixtures/system/notice-detail.json');
    res.json(fixture);
  });

  app.get('/api/v1/system/notices', (req, res) => {
    const fixture = require('../fixtures/system/notice-list.json');
    res.json(fixture);
  });

  app.get('/api/v1/system/faqs/count', (req, res) => {
    const fixture = require('../fixtures/system/faq-count.json');
    res.json(fixture);
  });

  app.get('/api/v1/system/faqs/:faqWrtNo', (req, res) => {
    const fixture = require('../fixtures/system/faq-detail.json');
    res.json(fixture);
  });

  app.get('/api/v1/system/faqs', (req, res) => {
    const fixture = require('../fixtures/system/faq-list.json');
    res.json(fixture);
  });

  app.get('/api/v1/system/qnas/count', (req, res) => {
    const fixture = require('../fixtures/system/qna-count.json');
    res.json(fixture);
  });

  app.get('/api/v1/system/qnas/:advReqWrtNo', (req, res) => {
    const fixture = require('../fixtures/system/qna-detail.json');
    res.json(fixture);
  });

  app.get('/api/v1/system/qnas', (req, res) => {
    const fixture = require('../fixtures/system/qna-list.json');
    res.json(fixture);
  });

  app.post('/api/v1/system/qnas', (req, res) => {
    const fixture = require('../fixtures/resource/action-success.json');
    res.json(fixture);
  });

  app.put('/api/v1/system/qnas/:advReqWrtNo', (req, res) => {
    const fixture = require('../fixtures/resource/action-success.json');
    res.json(fixture);
  });

  app.delete('/api/v1/system/qnas/:advReqWrtNo', (req, res) => {
    const fixture = require('../fixtures/resource/action-success.json');
    res.json(fixture);
  });

  app.get('/api/v1/system/portals/guides', (req, res) => {
    const fixture = require('../fixtures/system/guides.json');
    res.json(fixture);
  });
};
