/**
 * E2E 테스트 공통 헬퍼.
 * - portalConfig 주입 (user-portal이 mock 서버를 바라보도록)
 * - 시나리오 전환
 */

const MOCK_BASE = 'http://localhost:3000';

/**
 * 페이지에 portalConfig를 주입한다.
 * user-portal의 configMap.js가 window.portalConfig를 최우선으로 읽으므로,
 * 이 스크립트가 앱 코드보다 먼저 실행되면 baseURL이 mock 서버로 바뀐다.
 */
async function injectPortalConfig(page) {
  await page.addInitScript(() => {
    window.portalConfig = {
      PORTAL_TITLE: 'User Portal - Test',
      VUE_APP_DEBUG: 'true',
      VUE_APP_API_URI: 'http://localhost:3000/api',
      VUE_APP_REMOTE_URI: 'http://localhost:3000',
      VUE_APP_FILE_URI: 'http://localhost:3000',
    };
  });
}

/**
 * mock 서버의 시나리오를 전환한다.
 */
async function setScenario(endpoint, scenario) {
  const res = await fetch(`${MOCK_BASE}/__control`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ endpoint, scenario }),
  });
  return res.json();
}

/**
 * 모든 시나리오를 초기화한다.
 */
async function resetScenarios() {
  const res = await fetch(`${MOCK_BASE}/__control/reset`, { method: 'POST' });
  return res.json();
}

module.exports = { injectPortalConfig, setScenario, resetScenarios };
