const { test, expect } = require('@playwright/test');

const EXPECTED_MENU_NAMES = [
  'Cloud PC 관리',
  'Cloud PC 신청',
  '개인 디스크 관리',
  '이용 내역',
  '스냅샷 및 복원',
  'Cloud PC 초기화',
  'Cloud PC 반납',
  '단말 접속 정보 등록',
  '단말 접속 정보 현황',
  '고객지원',
  '공지사항',
  '매뉴얼',
  '자주 묻는 질문',
  '1:1 문의',
  '다운로드',
  '장애처리 신청',
];

test('사용자 포탈 메뉴 표시 여부를 조회하고 수정한다', async ({ request }) => {
  const tenantId = '02157c4b5e534cb492ed5c886d3b44d7';
  const portalTypeCode = 'A007USR';

  const tenantMenus = await request.get(`/api/v1/portals/menus/${tenantId}`, {
    params: { ptal_typ_cd: portalTypeCode },
    headers: { 'X-CloudPC-Request-Poc': 'POCADMIN' },
  });
  expect(tenantMenus.ok()).toBeTruthy();

  const tenantMenuBody = await tenantMenus.json();
  expect(Array.isArray(tenantMenuBody)).toBeTruthy();
  expect(tenantMenuBody[0]).toMatchObject({ ptal_typ_cd: portalTypeCode, menu_id: 'U001' });
  expect(tenantMenuBody.map((menu) => menu.menu_nm)).toEqual(EXPECTED_MENU_NAMES);
  expect(tenantMenuBody).toHaveLength(EXPECTED_MENU_NAMES.length);

  const visibleBefore = await request.get(`/api/v1/portals/${portalTypeCode}/menus`, {
    headers: { 'X-CloudPC-Request-Poc': 'POCADMIN' },
  });
  expect(visibleBefore.ok()).toBeTruthy();

  const visibleBeforeBody = await visibleBefore.json();
  expect(visibleBeforeBody.map((menu) => menu.menu_nm)).toEqual(EXPECTED_MENU_NAMES);
  expect(visibleBeforeBody[0]).not.toHaveProperty('show_yn');

  const update = await request.put(`/api/v1/portals/menus/${tenantId}`, {
    headers: { 'X-CloudPC-Request-Poc': 'POCADMIN' },
    data: {
      ptal_typ_cd: portalTypeCode,
      menu_id: 'U00206',
      show_yn: 'N',
    },
  });
  expect(update.ok()).toBeTruthy();
  await expect(update.json()).resolves.toEqual({ result: 'success' });

  const visibleAfter = await request.get(`/api/v1/portals/${portalTypeCode}/menus`, {
    headers: { 'X-CloudPC-Request-Poc': 'POCADMIN' },
  });
  expect(visibleAfter.ok()).toBeTruthy();

  const visibleAfterBody = await visibleAfter.json();
  expect(visibleAfterBody.some((menu) => menu.menu_nm === '장애처리 신청')).toBeFalsy();
  expect(visibleAfterBody.map((menu) => menu.menu_nm)).toEqual(
    EXPECTED_MENU_NAMES.filter((menuName) => menuName !== '장애처리 신청')
  );

  const tenantMenusAfter = await request.get(`/api/v1/portals/menus/${tenantId}`, {
    params: { ptal_typ_cd: portalTypeCode },
    headers: { 'X-CloudPC-Request-Poc': 'POCADMIN' },
  });
  expect(tenantMenusAfter.ok()).toBeTruthy();

  const tenantMenusAfterBody = await tenantMenusAfter.json();
  expect(tenantMenusAfterBody.find((menu) => menu.menu_id === 'U00206')).toMatchObject({
    menu_nm: '장애처리 신청',
    show_yn: 'N',
  });
});

test('user-portal 권한 메뉴 API는 라우터 meta id와 맞는 메뉴를 반환한다', async ({ request }) => {
  const response = await request.get('/api/v1/user/admin/groups/menus', {
    headers: {
      Authorization: 'Bearer mock-user-token',
      'X-CloudPC-Request-Poc': 'POCUSER',
    },
  });
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(Array.isArray(body.data)).toBeTruthy();
  expect(body.data.map((menu) => menu.menu_id)).toEqual(
    expect.arrayContaining(['A', 'A01', 'A04', 'A0402', 'A0403', 'A0405'])
  );
  expect(body.data.some((menu) => menu.menu_id.startsWith('U'))).toBeFalsy();
  expect(body.data.find((menu) => menu.menu_id === 'A04')).toMatchObject({
    menu_nm: '고객지원',
  });
});
