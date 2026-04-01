const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.MOCK_PORT || 3000;
const USER_PORTAL_PORT = process.env.USER_PORTAL_PORT || 8080;
const STATIC_DIR = process.env.STATIC_DIR || path.resolve(__dirname, '../../user-portal/dist');
const USE_STATIC = fs.existsSync(STATIC_DIR);

// --- 시나리오 상태 관리 ---

const scenarios = {};

function getScenario(endpoint) {
  return scenarios[endpoint] || 'success';
}

function setScenario(endpoint, scenario) {
  scenarios[endpoint] = scenario;
}

function resetScenarios() {
  Object.keys(scenarios).forEach((k) => delete scenarios[k]);
}

// --- 미들웨어 ---

app.use(cors({ exposedHeaders: ['Authorization'] }));
app.use(express.json());

// 시나리오 제어 API
app.post('/__control', (req, res) => {
  const { endpoint, scenario } = req.body;
  if (!endpoint || !scenario) {
    return res.status(400).json({ error: 'endpoint and scenario required' });
  }
  setScenario(endpoint, scenario);
  res.json({ ok: true, endpoint, scenario });
});

app.post('/__control/reset', (_req, res) => {
  resetScenarios();
  res.json({ ok: true, message: 'all scenarios reset' });
});

app.get('/__control/status', (_req, res) => {
  res.json({ scenarios: { ...scenarios } });
});

// --- 런타임 설정 주입 (빌드된 앱의 /js/config.js) ---
// index.html이 <script src="/js/config.js">를 로드한다.
// K8s에서는 ConfigMap으로 마운트하지만, mock 환경에서는 여기서 생성한다.
// window.portalConfig를 설정하면 configMap.js가 이 값을 최우선으로 사용한다.

app.get('/js/config.js', (req, res) => {
  const config = {
    PORTAL_TITLE: 'User Portal - Mock',
    VUE_APP_DEBUG: 'true',
    VUE_APP_API_URI: `http://localhost:${PORT}/api`,
    VUE_APP_REMOTE_URI: `http://localhost:${PORT}`,
    VUE_APP_FILE_URI: `http://localhost:${PORT}`,
    OCTATCO: {
      USE_YN: 'N',
      BASE_DOMAIN: 'mock.octatco.com',
      SUB_DOMAIN: 'api',
      BRIDGE_DOMAIN: 'bridge',
      MQTT: {
        PORT: '38083',
        USERNAME: 'mock',
        PASSWORD: 'mock',
      },
    },
  };
  res.type('application/javascript');
  res.send(`window.portalConfig = ${JSON.stringify(config, null, 2)};`);
});

// --- Mock 핸들러 등록 (포털별 Router 분리) ---

function createPortalRouter(portalDir) {
  const router = express.Router();
  const handlers = ['gw', 'nauth', 'auth', 'resource', 'user', 'system', 'operation', 'fileService', 'monitoring'];
  handlers.forEach((name) => {
    const handlerPath = `./${portalDir}/handlers/${name}`;
    try {
      require(handlerPath)(router, getScenario);
    } catch (e) {
      // 핸들러 파일이 없으면 무시 (admin-portal은 아직 비어있음)
    }
  });
  return router;
}

const userRouter = createPortalRouter('user-portal');
const adminRouter = createPortalRouter('admin-portal');

// API 요청을 X-CloudPC-Request-Poc 헤더로 분기
app.use((req, res, next) => {
  if (!req.path.startsWith('/api/')) return next();

  const poc = req.headers['x-cloudpc-request-poc'];
  if (poc === 'POCADMIN') {
    adminRouter(req, res, next);
  } else {
    userRouter(req, res, next);
  }
});

// --- 미매칭 API 요청은 로그 후 빈 응답 ---

app.all('/api/v1/*', (req, res) => {
  const poc = req.headers['x-cloudpc-request-poc'] || 'POCUSER';
  console.log(`[UNHANDLED] [${poc}] ${req.method} ${req.path}`);
  res.status(200).json({ data: null, errCode: null, errMsg: null });
});

// --- 나머지 요청: 정적 파일 서빙 또는 dev server 프록시 ---

if (USE_STATIC) {
  // user-portal/dist 가 있으면 직접 서빙 (dev server 불필요)
  app.use(express.static(STATIC_DIR));

  // SPA fallback: 모든 non-API 요청을 index.html로
  app.get('*', (req, res) => {
    res.sendFile(path.join(STATIC_DIR, 'index.html'));
  });
} else {
  // dist 없으면 dev server로 프록시
  app.use(
    '/',
    createProxyMiddleware({
      target: `http://localhost:${USER_PORTAL_PORT}`,
      changeOrigin: true,
      ws: true,
    })
  );
}

app.listen(PORT, () => {
  console.log(`[mock-server] listening on http://localhost:${PORT}`);
  if (USE_STATIC) {
    console.log(`[mock-server] serving static files from ${STATIC_DIR}`);
  } else {
    console.log(`[mock-server] proxying to user-portal on http://localhost:${USER_PORTAL_PORT}`);
  }
  console.log(`[mock-server] control API: POST http://localhost:${PORT}/__control`);
});
