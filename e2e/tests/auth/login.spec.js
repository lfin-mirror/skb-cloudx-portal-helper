const { test, expect } = require('@playwright/test');
const { injectPortalConfig, setScenario, resetScenarios } = require('../../helpers/mock-setup');

const TENANT = 'tenant1';
const LOGIN_URL = `/${TENANT}/login`;

test.beforeEach(async ({ page }) => {
  await resetScenarios();
  await injectPortalConfig(page);
});

// --- 정상 로그인 ---

test('정상 로그인 → 홈 이동', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await page.fill('#userid', 'testuser');
  await page.fill('#userpassword', 'Test1234!');
  await page.click('.btn-prime');

  await page.waitForURL(`**/${TENANT}/home`, { timeout: 10000 });
  await expect(page).toHaveURL(new RegExp(`/${TENANT}/home`));
});

// --- 2차 인증 분기 ---

test('SMS 2차 인증 분기', async ({ page }) => {
  await setScenario('/api/v1/gw/authentications/', '2fa-sms');

  await page.goto(LOGIN_URL);
  await page.fill('#userid', 'testuser');
  await page.fill('#userpassword', 'Test1234!');
  await page.click('.btn-prime');

  await expect(page.locator('text=인증번호')).toBeVisible({ timeout: 10000 });
});

test('OTP 2차 인증 분기', async ({ page }) => {
  await setScenario('/api/v1/gw/authentications/', '2fa-otp');

  await page.goto(LOGIN_URL);
  await page.fill('#userid', 'testuser');
  await page.fill('#userpassword', 'Test1234!');
  await page.click('.btn-prime');

  // OTP 화면: 'OTP 인증번호 입력' 라벨이 있음
  await expect(page.getByText('OTP 인증번호 입력')).toBeVisible({ timeout: 10000 });
});

test('이메일 2차 인증 분기', async ({ page }) => {
  await setScenario('/api/v1/gw/authentications/', '2fa-email');

  await page.goto(LOGIN_URL);
  await page.fill('#userid', 'testuser');
  await page.fill('#userpassword', 'Test1234!');
  await page.click('.btn-prime');

  await expect(page.locator('text=인증번호')).toBeVisible({ timeout: 10000 });
});

// --- 비밀번호 변경 분기 ---

test('초기 비밀번호 변경 분기', async ({ page }) => {
  await setScenario('/api/v1/gw/authentications/', 'password-change');

  await page.goto(LOGIN_URL);
  await page.fill('#userid', 'testuser');
  await page.fill('#userpassword', 'Temp1234!');
  await page.click('.btn-prime');

  // h2 제목으로 비밀번호 변경 화면 확인
  await expect(page.getByRole('heading', { name: '비밀번호 변경' })).toBeVisible({ timeout: 10000 });
});

test('비밀번호 장기 미변경 분기', async ({ page }) => {
  await setScenario('/api/v1/gw/authentications/', 'password-expired');

  await page.goto(LOGIN_URL);
  await page.fill('#userid', 'testuser');
  await page.fill('#userpassword', 'Test1234!');
  await page.click('.btn-prime');

  await expect(page.locator('text=비밀번호').first()).toBeVisible({ timeout: 10000 });
});

// --- 에러 케이스 ---

test('로그인 실패 → 에러 메시지', async ({ page }) => {
  await setScenario('/api/v1/gw/authentications/', 'failed');

  await page.goto(LOGIN_URL);
  await page.fill('#userid', 'wronguser');
  await page.fill('#userpassword', 'wrong');
  await page.click('.btn-prime');

  // request.js 에러 인터셉터가 errCode를 반환 → Login.vue가 팝업 표시
  await expect(page.locator('.popup-wrap, .dim, .el-message-box').first()).toBeVisible({ timeout: 10000 });
});

test('계정 잠금 → 이용 제한 메시지', async ({ page }) => {
  await setScenario('/api/v1/gw/authentications/', 'locked');

  await page.goto(LOGIN_URL);
  await page.fill('#userid', 'lockeduser');
  await page.fill('#userpassword', 'Test1234!');
  await page.click('.btn-prime');

  await expect(page.locator('.popup-wrap, .dim, .el-message-box').first()).toBeVisible({ timeout: 10000 });
});

// --- 빈 입력 검증 ---

test('아이디 미입력 → 검증 메시지', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await page.fill('#userpassword', 'Test1234!');
  await page.click('.btn-prime');

  await expect(page.locator('text=아이디').first()).toBeVisible();
});

test('비밀번호 미입력 → 검증 메시지', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await page.fill('#userid', 'testuser');
  await page.click('.btn-prime');

  await expect(page.locator('text=비밀번호').first()).toBeVisible();
});
