const { getRoleFromToken } = require('../../constants');

module.exports = function (router, getScenario) {
  const success = () => require('../fixtures/action-success.json');

  // ─────────────────────────────────────────────
  // 인증 정책 — 2차 인증 (n2nd)
  // ─────────────────────────────────────────────

  // 2차 인증 정책 목록 조회 (포털 유형별)
  router.get('/api/v1/operation/cert/n2nd/ptalType/:ptal_type_cd', (req, res) => {
    const fixture = req.params.ptal_type_cd === 'A007ADM'
      ? require('../fixtures/operation/cert-n2nd-admin-list.json')
      : require('../fixtures/operation/cert-n2nd-user-list.json');
    res.json(fixture);
  });

  // 2차 인증 정책 상세 조회
  router.get('/api/v1/operation/cert/n2nd/info/:cert_plcy_id', (req, res) => {
    const adminIds = [
      '312352b0-2be0-11f1-a5c1-22b10486d9be',
      '9ce54bed-2bdf-11f1-814a-d2425695d54c',
      '29e84e6b-ab57-11f0-8557-3a7bf606d4cf',
      '50714850-ec4e-11f0-a66b-a6d95c7431b3',
    ];
    const fixture = adminIds.includes(req.params.cert_plcy_id)
      ? require('../fixtures/operation/cert-n2nd-admin-detail.json')
      : require('../fixtures/operation/cert-n2nd-user-detail.json');
    res.json(fixture);
  });

  // 2차 인증 정책 접속 계정 조회
  router.get('/api/v1/operation/cert/n2nd/:cert_plcy_id/acc', (req, res) => {
    res.json(require('../fixtures/operation/cert-n2nd-acc.json'));
  });

  // 2차 인증 정책 그룹 목록 조회
  router.get('/api/v1/operation/policys/cert/n2nd', (req, res) => {
    res.json(require('../fixtures/operation/cert-n2nd-grp-list.json'));
  });

  // 2차 인증 정책 그룹 생성
  router.post('/api/v1/operation/cert/n2nd/grps', (req, res) => {
    res.json(success());
  });

  // 2차 인증 정책 다중 생성
  router.post('/api/v1/operation/policys/cert/n2nd/multi', (req, res) => {
    res.json(success());
  });

  // 2차 인증 정책 수정
  router.put('/api/v1/operation/cert/n2nd/info/:cert_plcy_id', (req, res) => {
    res.json(success());
  });

  // 2차 인증 정책 삭제
  router.delete('/api/v1/operation/cert/n2nd/info/:cert_plcy_id', (req, res) => {
    res.json(success());
  });

  // ─────────────────────────────────────────────
  // 인증 정책 — 관리자 (A007ADM)
  // ─────────────────────────────────────────────

  // 관리자 인증 정책 설정 조회
  router.get('/api/v1/operation/policys/cert/A007ADM/:cert_plcy_id', (req, res) => {
    res.json(require('../fixtures/operation/cert-policy-adm-detail.json'));
  });

  // 관리자 인증 정책 설정 수정
  router.put('/api/v1/operation/policys/cert/A007ADM/:cert_plcy_id', (req, res) => {
    res.json(success());
  });

  // ─────────────────────────────────────────────
  // 인증 정책 — 사용자 (A007USR)
  // ─────────────────────────────────────────────

  // 사용자 인증 정책 설정 조회
  router.get('/api/v1/operation/policys/cert/A007USR/:cert_plcy_id', (req, res) => {
    res.json(require('../fixtures/operation/cert-policy-usr-detail.json'));
  });

  // 사용자 인증 정책 설정 수정
  router.put('/api/v1/operation/policys/cert/A007USR/:cert_plcy_id', (req, res) => {
    res.json(success());
  });

  // ─────────────────────────────────────────────
  // 인증 정책 — 보안 인증 (secu)
  // ─────────────────────────────────────────────

  // 보안 인증 정책 그룹 목록 조회 — SA/TA 분기
  router.get('/api/v1/operation/cert/secu/grps', (req, res) => {
    const role = getRoleFromToken(req.headers.authorization);
    const fixture = role === 'sa'
      ? require('../fixtures/operation/cert-secu-grps-list.json')
      : require('../fixtures/operation/cert-secu-grps-list-ta.json');
    res.json(fixture);
  });

  // 보안 인증 정책 상세 조회
  router.get('/api/v1/operation/cert/secu/info/:cert_secu_id', (req, res) => {
    res.json(require('../fixtures/operation/cert-secu-info-detail.json'));
  });

  // 보안 인증 정책 adopter 상세 조회
  router.get('/api/v1/operation/cert/secu/adopter/info/:secuPlcyId', (req, res) => {
    res.json(require('../fixtures/operation/cert-secu-adopter-info.json'));
  });

  // 보안 인증 정책 adopter 저장
  router.post('/api/v1/operation/cert/secu/adopter/info', (req, res) => {
    res.json({ data: { secu_plcy_id: '69421473-67c0-4873-b86e-e72621942016' }, errCode: null, errMsg: null });
  });

  // 보안 인증 정책 중복명 확인
  router.get('/api/v1/operation/cert/secu/noauth/dup-check', (req, res) => {
    res.json({ data: false, errCode: null, errMsg: null });
  });

  // 보안 인증 정책 미인증 목록 조회
  router.get('/api/v1/operation/cert/secu/noauth', (req, res) => {
    res.json(require('../fixtures/operation/cert-secu-noauth-list.json'));
  });

  // 보안 인증 정책 미인증 상세 조회
  router.get('/api/v1/operation/cert/secu/noauth/:blck_plcy_id', (req, res) => {
    res.json(require('../fixtures/operation/cert-secu-noauth-detail.json'));
  });

  // 보안 인증 정책 미인증 차단 목록 조회
  router.get('/api/v1/operation/cert/secu/noauth/:blck_plcy_id/blck', (req, res) => {
    res.json(require('../fixtures/operation/cert-secu-noauth-blck-list.json'));
  });

  // 보안 인증 정책 그룹 생성 (복수형)
  router.post('/api/v1/operation/cert/secu/grps', (req, res) => {
    res.json(success());
  });

  // 보안 인증 정책 그룹 생성 (단수형)
  router.post('/api/v1/operation/cert/secu/grp', (req, res) => {
    res.json(success());
  });

  // 보안 인증 정책 미인증 등록
  router.post('/api/v1/operation/cert/secu/noauth', (req, res) => {
    res.json(success());
  });

  // 보안 인증 정책 수정
  router.put('/api/v1/operation/cert/secu/info/:cert_secu_id', (req, res) => {
    res.json(success());
  });

  // 보안 인증 정책 미인증 수정
  router.put('/api/v1/operation/cert/secu/noauth', (req, res) => {
    res.json(success());
  });

  // 보안 인증 정책 삭제
  router.delete('/api/v1/operation/cert/secu/info/:cert_secu_id', (req, res) => {
    res.json(success());
  });

  // 보안 인증 정책 미인증 삭제
  router.delete('/api/v1/operation/cert/secu/noauth', (req, res) => {
    res.json(success());
  });

  // ─────────────────────────────────────────────
  // 인증 정책 — VPC 인증
  // ─────────────────────────────────────────────

  // VPC 인증 정책 목록 조회
  router.get('/api/v1/operation/policys/cert/vpc', (req, res) => {
    res.json(require('../fixtures/operation/cert-vpc-list.json'));
  });

  // VPC 인증 정책 상세 조회
  router.get('/api/v1/operation/policys/:policy_id/cert/vpc/', (req, res) => {
    res.json(require('../fixtures/operation/cert-vpc-detail.json'));
  });

  // VPC 인증 정책 생성
  router.post('/api/v1/operation/policys/cert/vpc', (req, res) => {
    res.json(success());
  });

  // VPC 인증 정책 수정
  router.put('/api/v1/operation/policys/:policy_id/cert/vpc/', (req, res) => {
    res.json(success());
  });

  // ─────────────────────────────────────────────
  // USB 정책
  // ─────────────────────────────────────────────

  // USB 유형 목록 조회 (경로 충돌 방지를 위해 /:id 라우트보다 먼저 등록)
  router.get('/api/v1/operation/policies/usb/types', (req, res) => {
    res.json(require('../fixtures/operation/usb-type-list.json'));
  });

  // USB 유형 삭제 (다중)
  router.delete('/api/v1/operation/policies/usb/types', (req, res) => {
    res.json(success());
  });

  // USB 유형 상세 조회
  router.get('/api/v1/operation/policies/usb/types/:usb_type_id', (req, res) => {
    res.json(require('../fixtures/operation/usb-type-detail.json'));
  });

  // USB 유형 적용 정책 조회
  router.get('/api/v1/operation/policies/usb/types/:usb_type_id/usb_policies', (req, res) => {
    res.json(require('../fixtures/operation/usb-type-usb-policies.json'));
  });

  // USB 유형 생성
  router.post('/api/v1/operation/policies/usb/types', (req, res) => {
    res.json(success());
  });

  // USB 유형 수정
  router.put('/api/v1/operation/policies/usb/types/:usb_type_id', (req, res) => {
    res.json(success());
  });

  // USB 공급업체 목록 조회
  router.get('/api/v1/operation/policies/usb/vendors', (req, res) => {
    res.json(require('../fixtures/operation/usb-vendor-list.json'));
  });

  // USB 공급업체 삭제 (다중)
  router.delete('/api/v1/operation/policies/usb/vendors', (req, res) => {
    res.json(success());
  });

  // USB 공급업체 상세 조회
  router.get('/api/v1/operation/policies/usb/vendors/:usb_vendor_id', (req, res) => {
    res.json(require('../fixtures/operation/usb-vendor-detail.json'));
  });

  // USB 공급업체 적용 정책 조회
  router.get('/api/v1/operation/policies/usb/vendors/:usb_vendor_id/usb_policies', (req, res) => {
    res.json(require('../fixtures/operation/usb-vendor-usb-policies.json'));
  });

  // USB 공급업체 모델 목록 조회
  router.get('/api/v1/operation/policies/usb/vendors/:usb_vendor_id/models', (req, res) => {
    res.json(require('../fixtures/operation/usb-vendor-models.json'));
  });

  // USB 공급업체 생성
  router.post('/api/v1/operation/policies/usb/vendors', (req, res) => {
    res.json(success());
  });

  // USB 공급업체 수정
  router.put('/api/v1/operation/policies/usb/vendors/:usb_vendor_id', (req, res) => {
    res.json(success());
  });

  // USB 모델 목록 조회
  router.get('/api/v1/operation/policies/usb/models', (req, res) => {
    res.json(require('../fixtures/operation/usb-model-list.json'));
  });

  // USB 모델 삭제 (다중)
  router.delete('/api/v1/operation/policies/usb/models', (req, res) => {
    res.json(success());
  });

  // USB 모델 상세 조회
  router.get('/api/v1/operation/policies/usb/models/:usb_model_id', (req, res) => {
    res.json(require('../fixtures/operation/usb-model-detail.json'));
  });

  // USB 모델 적용 정책 조회
  router.get('/api/v1/operation/policies/usb/models/:usb_model_id/usb_policies', (req, res) => {
    res.json(require('../fixtures/operation/usb-model-usb-policies.json'));
  });

  // USB 모델 생성
  router.post('/api/v1/operation/policies/usb/models', (req, res) => {
    res.json(success());
  });

  // USB 모델 수정
  router.put('/api/v1/operation/policies/usb/models/:usb_model_id', (req, res) => {
    res.json(success());
  });

  // USB 정책 목록 조회 — SA/TA 분기
  router.get('/api/v1/operation/policies/usb', (req, res) => {
    const role = getRoleFromToken(req.headers.authorization);
    const fixture = require('../fixtures/operation/usb-policy-list.json');
    if (role === 'sa') {
      const filtered = { ...fixture, data: fixture.data.filter(d => d.usb_policy_target_code === 'U006S') };
      return res.json(filtered);
    }
    res.json({ ...fixture, data: fixture.data.filter(d => d.usb_policy_target_code !== 'U006S') });
  });

  // USB 정책 삭제 (다중)
  router.delete('/api/v1/operation/policies/usb', (req, res) => {
    res.json(success());
  });

  // USB 정책 적용 VPC 목록 조회
  router.get('/api/v1/operation/policies/usb/:usb_policy_id/vpc_policies', (req, res) => {
    res.json(require('../fixtures/operation/usb-policy-vpc-policies.json'));
  });

  // USB 정책 유형 목록 조회
  router.get('/api/v1/operation/policies/usb/:usb_policy_id/types', (req, res) => {
    res.json(require('../fixtures/operation/usb-policy-types.json'));
  });

  // USB 정책 공급업체 목록 조회
  router.get('/api/v1/operation/policies/usb/:usb_policy_id/vendors', (req, res) => {
    res.json(require('../fixtures/operation/usb-policy-vendors.json'));
  });

  // USB 정책 유형 추가
  router.put('/api/v1/operation/policies/usb/:usb_policy_id/add_types', (req, res) => {
    res.json(success());
  });

  // USB 정책 유형 삭제
  router.put('/api/v1/operation/policies/usb/:usb_policy_id/remove_types', (req, res) => {
    res.json(success());
  });

  // USB 정책 공급업체 추가
  router.put('/api/v1/operation/policies/usb/:usb_policy_id/add_vendors', (req, res) => {
    res.json(success());
  });

  // USB 정책 공급업체 삭제
  router.put('/api/v1/operation/policies/usb/:usb_policy_id/remove_vendors', (req, res) => {
    res.json(success());
  });

  // USB 정책 상세 조회
  router.get('/api/v1/operation/policies/usb/:usb_policy_id', (req, res) => {
    res.json(require('../fixtures/operation/usb-policy-detail.json'));
  });

  // USB 정책 생성
  router.post('/api/v1/operation/policies/usb', (req, res) => {
    res.json(success());
  });

  // USB 정책 수정
  router.put('/api/v1/operation/policies/usb/:usb_policy_id', (req, res) => {
    res.json(success());
  });

  // ─────────────────────────────────────────────
  // 백업 스냅샷 정책
  // ─────────────────────────────────────────────

  // 백업 스냅샷 정책 그룹 목록 조회 — SA/TA 분기
  router.get('/api/v1/operation/policy/bkupsnap/grps', (req, res) => {
    const role = getRoleFromToken(req.headers.authorization);
    const fixture = require('../fixtures/operation/backup-grp-list.json');
    if (role === 'sa') {
      const filtered = { ...fixture, data: fixture.data.filter(d => d.bkup_snap_plcy_tgt_cd === 'U023S') };
      return res.json(filtered);
    }
    res.json({ ...fixture, data: fixture.data.filter(d => d.bkup_snap_plcy_tgt_cd !== 'U023S') });
  });

  // 백업 스냅샷 정책 상세 조회
  router.get('/api/v1/operation/policy/bkupsnap/info/:bkup_plcy_id', (req, res) => {
    res.json(require('../fixtures/operation/backup-detail.json'));
  });

  // 백업 스냅샷 정책 생성
  router.post('/api/v1/operation/policy/bkupsnap/grps', (req, res) => {
    res.json(success());
  });

  // 백업 스냅샷 정책 수정
  router.put('/api/v1/operation/policy/bkupsnap/info/:bkup_plcy_id', (req, res) => {
    res.json(success());
  });

  // 백업 스냅샷 정책 삭제
  router.delete('/api/v1/operation/policy/bkupsnap/info/:bkup_plcy_id', (req, res) => {
    res.json(success());
  });

  // ─────────────────────────────────────────────
  // 접근 통제 정책
  // ─────────────────────────────────────────────

  // 접근 차단 정책 목록 조회
  router.get('/api/v1/operation/policys/acclbck/plcys/', (req, res) => {
    res.json(require('../fixtures/operation/acclbck-plcys-list.json'));
  });

  // 접근 차단 정책 상세 조회
  router.get('/api/v1/operation/policys/acclbck/plcys/:acc_blck_plcy_id', (req, res) => {
    res.json(require('../fixtures/operation/access-control-detail.json'));
  });

  // 접근 차단 정책 생성
  router.post('/api/v1/operation/policys/acclbck/plcys', (req, res) => {
    res.json(success());
  });

  // 접근 차단 정책 수정
  router.put('/api/v1/operation/policys/acclbck/plcys/:acc_blck_plcy_id', (req, res) => {
    res.json(success());
  });

  // 접근 차단 정책 삭제
  router.delete('/api/v1/operation/policys/acclbck/plcys/:acc_blck_plcy_id', (req, res) => {
    res.json(success());
  });

  // ─────────────────────────────────────────────
  // 블랙리스트 / 화이트리스트 (SW 차단 목록)
  // ─────────────────────────────────────────────

  // SW 차단 목록 다운로드 (상세 조회보다 먼저 등록)
  router.get('/api/v1/operation/policys/swblst/:blst_file_id/downLoad', (req, res) => {
    res.set('Content-Type', 'text/csv');
    res.send('sw_nm,sw_hash\n악성프로그램A.exe,abc123\n스파이웨어B.exe,def456\n');
  });

  // SW 차단 목록 조회 (wtst_yn=Y → 화이트리스트, 없거나 N → 블랙리스트)
  router.get('/api/v1/operation/policys/swblst', (req, res) => {
    const fixture = require('../fixtures/operation/blacklist-list.json');
    if (req.query.wtst_yn) {
      const filtered = { ...fixture, data: fixture.data.filter(d => d.wtst_yn === req.query.wtst_yn) };
      return res.json(filtered);
    }
    res.json({ ...fixture, data: fixture.data.filter(d => d.wtst_yn === 'N') });
  });

  // SW 차단 목록 파일 상세 조회
  router.get('/api/v1/operation/policys/swblst/:blst_file_id', (req, res) => {
    res.json(require('../fixtures/operation/blacklist-detail.json'));
  });

  // SW 차단 목록 업로드
  router.post('/api/v1/operation/policys/swblst', (req, res) => {
    res.json(success());
  });

  // ─────────────────────────────────────────────
  // 네트워크 정책
  // ─────────────────────────────────────────────

  // 네트워크 정책 목록 조회
  router.get('/api/v1/operation/policys/lnet', (req, res) => {
    res.json(require('../fixtures/operation/network-list.json'));
  });

  // 네트워크 정책 상세 조회
  router.get('/api/v1/operation/policys/lnet/:sbn_id', (req, res) => {
    res.json(require('../fixtures/operation/network-detail.json'));
  });

  // 네트워크 정책 생성
  router.post('/api/v1/operation/policys/lnet', (req, res) => {
    res.json(success());
  });

  // 네트워크 정책 수정
  router.put('/api/v1/operation/policys/lnet/:sbn_id', (req, res) => {
    res.json(success());
  });

  // 네트워크 정책 삭제
  router.delete('/api/v1/operation/policys/lnet/:sbn_id', (req, res) => {
    res.json(success());
  });

  // ─────────────────────────────────────────────
  // 예외 네트워크 그룹
  // ─────────────────────────────────────────────

  // 예외 네트워크 그룹 목록 조회
  router.get('/api/v1/operation/policy/excn/excngrp', (req, res) => {
    res.json(require('../fixtures/operation/excn-grp-list.json'));
  });

  // 예외 네트워크 그룹 단건 조회 (인증 정책 연결용)
  router.get('/api/v1/operation/policy/excn/excngrp/:exc_nw_grp_id', (req, res) => {
    res.json(require('../fixtures/operation/excn-grp-detail.json'));
  });

  // 예외 네트워크 그룹 상세 조회 (복수형)
  router.get('/api/v1/operation/policy/excn/excngrps/:exc_nw_grp_id', (req, res) => {
    res.json(require('../fixtures/operation/excn-grp-detail.json'));
  });

  // 예외 네트워크 그룹 생성
  router.post('/api/v1/operation/policy/excn/excngrps', (req, res) => {
    res.json(success());
  });

  // 예외 네트워크 그룹 수정
  router.put('/api/v1/operation/policy/excn/excngrps/:exc_nw_grp_id', (req, res) => {
    res.json(success());
  });

  // 예외 네트워크 그룹 삭제
  router.delete('/api/v1/operation/policy/excn/excngrps/:exc_nw_grp_id', (req, res) => {
    res.json(success());
  });

  // ─────────────────────────────────────────────
  // URL 리디렉션 차단 정책
  // ─────────────────────────────────────────────

  // URL 차단 정책 목록 조회
  router.get('/api/v1/operation/policy/url/rdrt/disallow/policy', (req, res) => {
    res.json(require('../fixtures/operation/url-rdrt-disallow-list.json'));
  });

  // URL 차단 정책 상세 조회
  router.get('/api/v1/operation/policy/url/rdrt/disallow/policy/:url_disallow_id', (req, res) => {
    res.json(require('../fixtures/operation/url-disallow-detail.json'));
  });

  // URL 차단 정책 생성
  router.post('/api/v1/operation/policy/url/rdrt/disallow/policy', (req, res) => {
    res.json(success());
  });

  // URL 차단 정책 수정
  router.put('/api/v1/operation/policy/url/rdrt/disallow/policy/:url_disallow_id', (req, res) => {
    res.json(success());
  });

  // URL 차단 정책 삭제
  router.delete('/api/v1/operation/policy/url/rdrt/disallow/policy/:url_disallow_id', (req, res) => {
    res.json(success());
  });

  // ─────────────────────────────────────────────
  // 전원 관리 정책
  // ─────────────────────────────────────────────

  // 전원 관리 정책 상세 조회
  router.get('/api/v1/operation/policys/powermgt/:policy_id', (req, res) => {
    res.json(require('../fixtures/operation/power-detail.json'));
  });

  // 전원 관리 정책 생성
  router.post('/api/v1/operation/policys/powermgt', (req, res) => {
    res.json(success());
  });

  // 전원 관리 정책 수정
  router.put('/api/v1/operation/policys/powermgt/:policy_id', (req, res) => {
    res.json(success());
  });

  // 재설정 정책 상세 조회
  router.get('/api/v1/operation/policys/rset/:policy_id', (req, res) => {
    res.json(require('../fixtures/operation/rset-detail.json'));
  });

  // 재설정 정책 생성
  router.post('/api/v1/operation/policys/rset', (req, res) => {
    res.json(success());
  });

  // 재설정 정책 수정
  router.put('/api/v1/operation/policys/rset/:policy_id', (req, res) => {
    res.json(success());
  });

  // ─────────────────────────────────────────────
  // VM 메타데이터 정책
  // ─────────────────────────────────────────────

  // 메타데이터 정책 목록 조회
  router.get('/api/v1/operation/policys/vm/mdata', (req, res) => {
    res.json(require('../fixtures/operation/vm-mdata-list.json'));
  });

  // 메타데이터 정책 상세 조회
  router.get('/api/v1/operation/policys/vm/mdata/:vm_mdata_id', (req, res) => {
    res.json(require('../fixtures/operation/metadata-detail.json'));
  });

  // 메타데이터 정책 생성
  router.post('/api/v1/operation/policys/vm/mdata', (req, res) => {
    res.json(success());
  });

  // 메타데이터 정책 수정
  router.put('/api/v1/operation/policys/vm/mdata/:vm_mdata_id', (req, res) => {
    res.json(success());
  });

  // 메타데이터 정책 삭제
  router.delete('/api/v1/operation/policys/vm/mdata/:vm_mdata_id', (req, res) => {
    res.json(success());
  });

  // ─────────────────────────────────────────────
  // 외부 연동 인터페이스
  // ─────────────────────────────────────────────

  // 외부 연동 목록 조회
  router.get('/api/v1/operation/outs/interfaces', (req, res) => {
    res.json(require('../fixtures/operation/external-interfaces-list.json'));
  });

  // 이메일 연동 설정 조회
  router.get('/api/v1/operation/outs/interfaces/email', (req, res) => {
    res.json(require('../fixtures/operation/external-email.json'));
  });

  // 이메일 연동 설정 수정
  router.put('/api/v1/operation/outs/interfaces/email', (req, res) => {
    res.json(success());
  });

  // 네트워크 스토리지 연동 설정 조회
  router.get('/api/v1/operation/outs/interfaces/netapp', (req, res) => {
    res.json(require('../fixtures/operation/external-netapp.json'));
  });

  // 네트워크 스토리지 연동 설정 수정
  router.put('/api/v1/operation/outs/interfaces/netapp', (req, res) => {
    res.json(success());
  });

  // AD 연동 설정 조회
  router.get('/api/v1/operation/outs/interfaces/usr', (req, res) => {
    res.json(require('../fixtures/operation/ad-interlock-usr.json'));
  });

  // AD 연동 설정 수정
  router.put('/api/v1/operation/outs/interfaces/usr', (req, res) => {
    res.json(success());
  });

  // Octatco 연동 설정 조회
  router.get('/api/v1/operation/outs/interfaces/octatco', (req, res) => {
    res.json(require('../fixtures/operation/external-octatco.json'));
  });

  // Octatco 연동 설정 수정
  router.put('/api/v1/operation/outs/interfaces/octatco', (req, res) => {
    res.json(success());
  });

  // 외부 연동 설정 조회 (공통 — 구버전)
  router.get('/api/v1/operation/outs/interfaces/:ext_itlk_div_cd', (req, res) => {
    const code = req.params.ext_itlk_div_cd.toLowerCase();
    const fixtureMap = {
      email: require('../fixtures/operation/external-email.json'),
      netapp: require('../fixtures/operation/external-netapp.json'),
      usr: require('../fixtures/operation/external-ad.json'),
      octatco: require('../fixtures/operation/external-octatco.json'),
    };
    res.json(fixtureMap[code] || { data: null, errCode: 'NOT_FOUND', errMsg: '연동 정보 없음' });
  });

  // 외부 연동 설정 수정 (공통 — 구버전)
  router.put('/api/v1/operation/outs/interfaces/:ext_itlk_div_cd', (req, res) => {
    res.json(success());
  });

  // ─────────────────────────────────────────────
  // 시스템 라이선스
  // ─────────────────────────────────────────────

  // 시스템 라이선스 조회
  router.get('/api/v1/operation/system/license', (req, res) => {
    res.json(require('../fixtures/operation/system-license.json'));
  });

  // ─────────────────────────────────────────────
  // 스토리지 스케줄 정책
  // ─────────────────────────────────────────────

  // 스토리지 스케줄 조회
  router.get('/api/v1/operation/policy/storage/sched/', (req, res) => {
    res.json(require('../fixtures/operation/storage-sched.json'));
  });

  // 스토리지 스케줄 등록
  router.post('/api/v1/operation/policy/storage/sched', (req, res) => {
    res.json(success());
  });

  // ─────────────────────────────────────────────
  // VM 접속 로그
  // ─────────────────────────────────────────────

  // VM 접속 로그 조회
  router.get('/api/v1/operation/log/vm/vm', (req, res) => {
    res.json(require('../fixtures/operation/vm-access-log-list.json'));
  });

  // ── 보안 인증서 ───────────────────────────────────────────────
  // type: all, infra, cloudpc, domain, spice / certType: ca, server
  router.get('/api/v1/operation/secu/cert/list/:type/:certType', (req, res) => {
    const { type, certType } = req.params;
    if (type === 'all') {
      // all = infra + cloudpc + domain + spice 합산
      const infra = require(`../fixtures/operation/cert-infra-${certType}.json`);
      const cloudpc = require(`../fixtures/operation/cert-cloudpc-${certType}.json`);
      const domain = require(`../fixtures/operation/cert-domain-${certType}.json`);
      const spice = require(`../fixtures/operation/cert-spice-${certType}.json`);
      const merged = [...infra.data, ...cloudpc.data, ...domain.data, ...spice.data];
      // 중복 제거 (secret_name + namespace 기준)
      const seen = new Set();
      const unique = merged.filter(item => {
        const key = `${item.secret_name}@${item.namespace}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      return res.json({ data: unique, errCode: null, errMsg: null });
    }
    try {
      res.json(require(`../fixtures/operation/cert-${type}-${certType}.json`));
    } catch (e) {
      res.json({ data: [], errCode: null, errMsg: null });
    }
  });

  router.get('/api/v1/operation/secu/cert/infm', (req, res) => {
    res.json(require('../fixtures/operation/cert-infm-list.json'));
  });
};
