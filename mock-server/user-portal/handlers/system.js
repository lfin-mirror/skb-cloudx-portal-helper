const portalMenuFixture = require('../../admin-portal/fixtures/user/portal-menus.json');

function toVisibleMenu(menu) {
  const { show_yn, ...visibleMenu } = menu;
  return visibleMenu;
}

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

  app.get('/api/v1/system/portals/:ptal_typ_cd/menus', (req, res) => {
    if (req.query.scenario === 'error') {
      return res.status(500).json({
        data: null,
        errCode: 'INTERNAL_SERVER_ERROR',
        errMsg: 'mock portal menus error',
      });
    }

    res.json(
      portalMenuFixture
        .filter((menu) => menu.ptal_typ_cd === req.params.ptal_typ_cd && menu.show_yn === 'Y')
        .map(toVisibleMenu)
    );
  });
};
