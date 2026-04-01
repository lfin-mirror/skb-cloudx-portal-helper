module.exports = function (router, getScenario) {
  // SMS 2차 인증 코드 발송
  router.post('/api/v1/nauth/auth/authentications/2nd_cert', (req, res) => {
    res.json({
      data: { result_message: 'SMS 인증 코드가 발송되었습니다.' },
      errCode: null,
      errMsg: null,
    });
  });

  // 아이디 찾기
  router.post('/api/v1/nauth/auth/authentications/accounts', (req, res) => {
    res.json({
      data: { result_message: '등록된 계정 ID를 SMS/이메일로 발송하였습니다.' },
      errCode: null,
      errMsg: null,
    });
  });

  // 임시 비밀번호 발급
  router.post('/api/v1/nauth/auth/authentications/temp/passwd', (req, res) => {
    res.json({
      data: { result_message: '임시 비밀번호를 SMS/이메일로 발송하였습니다.' },
      errCode: null,
      errMsg: null,
    });
  });

  // 키로깅 설정 조회
  router.get('/api/v1/nauth/system/settings', (req, res) => {
    res.json({
      data: [
        {
          settingId: 'SETTING-KEYLOG-001',
          category: 'admin',
          value: 'false',
          description: '관리자 포털 키로깅 방지 에이전트 사용 여부',
          createdBy: 'init',
          createdAt: '2025-01-10T09:00:00',
          updatedBy: 'init',
          updatedAt: '2025-01-10T09:00:00',
        },
      ],
      errCode: null,
      errMsg: null,
    });
  });

  // 키로깅 설치 파일 정보
  router.get('/api/v1/nauth/system/installer', (req, res) => {
    res.json({
      data: [{ installer_nm: 'KeyLogging Agent', installer_ver: '1.0.0', file_store_id: 'mock-installer-001' }],
      errCode: null,
      errMsg: null,
    });
  });

  // 관리자 포털 UI 공개 조회 (로그인 전)
  router.get('/api/v1/nauth/system/portals/ui/ADMIN/public', (req, res) => {
    res.json(require('../fixtures/nauth-portal-public.json'));
  });
};
