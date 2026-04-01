module.exports = function (router, getScenario) {
  const actionSuccess = require('../fixtures/action-success.json');

  // ── 공지사항 ──────────────────────────────────────────────────
  router.get('/api/v1/system/notices', (req, res) => {
    res.json(require('../fixtures/notices.json'));
  });

  router.post('/api/v1/system/notices', (req, res) => {
    res.json(actionSuccess);
  });

  router.get('/api/v1/system/notices/:id', (req, res) => {
    res.json(require('../fixtures/notice-detail.json'));
  });

  router.put('/api/v1/system/notices/:id', (req, res) => {
    res.json(actionSuccess);
  });

  router.delete('/api/v1/system/notices/:id', (req, res) => {
    res.json(actionSuccess);
  });

  // ── FAQ ──────────────────────────────────────────────────────
  router.get('/api/v1/system/faqs', (req, res) => {
    res.json(require('../fixtures/faqs.json'));
  });

  router.post('/api/v1/system/faqs', (req, res) => {
    res.json(actionSuccess);
  });

  router.get('/api/v1/system/faqs/:id', (req, res) => {
    res.json(require('../fixtures/faq-detail.json'));
  });

  router.put('/api/v1/system/faqs/:id', (req, res) => {
    res.json(actionSuccess);
  });

  router.delete('/api/v1/system/faqs/:id', (req, res) => {
    res.json(actionSuccess);
  });

  // ── VOC / 1:1 문의 ────────────────────────────────────────────
  router.get('/api/v1/system/qnas', (req, res) => {
    res.json(require('../fixtures/qnas.json'));
  });

  router.get('/api/v1/system/qnas/:id', (req, res) => {
    res.json(require('../fixtures/qna-detail.json'));
  });

  router.put('/api/v1/system/qnas/:id', (req, res) => {
    res.json(actionSuccess);
  });

  router.delete('/api/v1/system/qnas/:id', (req, res) => {
    res.json(actionSuccess);
  });

  // ── 팝업 관리 ─────────────────────────────────────────────────
  router.get('/api/v1/system/popup', (req, res) => {
    res.json(require('../fixtures/popup.json'));
  });

  router.put('/api/v1/system/popup', (req, res) => {
    res.json(actionSuccess);
  });

  router.delete('/api/v1/system/popup', (req, res) => {
    res.json(actionSuccess);
  });

  // ── 포털 UI 설정 ──────────────────────────────────────────────
  router.get('/api/v1/system/portals/ui/:tntId', (req, res) => {
    res.json(require('../fixtures/nauth-portal-public.json'));
  });

  router.post('/api/v1/system/portals/ui/:tntId', (req, res) => {
    res.json(actionSuccess);
  });

  // ── 포털 가이드 (매뉴얼 / 설치파일 / URL) ──────────────────────
  // /count 또는 /create 같은 고정 경로를 /:id 보다 먼저 등록
  router.post('/api/v1/system/portals/guides/create', (req, res) => {
    res.json(actionSuccess);
  });

  router.get('/api/v1/system/portals/guides', (req, res) => {
    res.json(require('../fixtures/portals-guides.json'));
  });

  router.post('/api/v1/system/portals/guides', (req, res) => {
    res.json(actionSuccess);
  });

  router.get('/api/v1/system/portals/guides/:id/history', (req, res) => {
    res.json(require('../fixtures/portals-guide-history.json'));
  });

  router.get('/api/v1/system/portals/guides/:id', (req, res) => {
    res.json(require('../fixtures/portals-guide-detail.json'));
  });

  router.put('/api/v1/system/portals/guides/:id', (req, res) => {
    res.json(actionSuccess);
  });

  router.delete('/api/v1/system/portals/guides/:id', (req, res) => {
    res.json(actionSuccess);
  });

  // ── 메뉴 관리 ─────────────────────────────────────────────────
  // API 관리
  router.get('/api/v1/system/menu/apis', (req, res) => {
    res.json(require('../fixtures/menu-apis.json'));
  });

  router.post('/api/v1/system/menu/apis', (req, res) => {
    res.json(actionSuccess);
  });

  router.get('/api/v1/system/menu/apis/:apiId', (req, res) => {
    res.json(require('../fixtures/menu-api-detail.json'));
  });

  router.put('/api/v1/system/menu/apis/:apiId', (req, res) => {
    res.json(actionSuccess);
  });

  router.delete('/api/v1/system/menu/apis/:apiId', (req, res) => {
    res.json(actionSuccess);
  });

  // 기능권한 관리
  router.get('/api/v1/system/menu/functions', (req, res) => {
    res.json(require('../fixtures/menu-functions.json'));
  });

  router.post('/api/v1/system/menu/functions', (req, res) => {
    res.json(actionSuccess);
  });

  router.get('/api/v1/system/menu/functions/:funcAuthId/apis', (req, res) => {
    res.json(require('../fixtures/menu-function-apis.json'));
  });

  router.post('/api/v1/system/menu/functions/:funcAuthId/apis', (req, res) => {
    res.json(actionSuccess);
  });

  router.delete('/api/v1/system/menu/functions/:funcAuthId/apis', (req, res) => {
    res.json(actionSuccess);
  });

  router.get('/api/v1/system/menu/functions/:funcAuthId', (req, res) => {
    res.json(require('../fixtures/menu-function-detail.json'));
  });

  router.put('/api/v1/system/menu/functions/:funcAuthId', (req, res) => {
    res.json(actionSuccess);
  });

  router.delete('/api/v1/system/menu/functions/:funcAuthId', (req, res) => {
    res.json(actionSuccess);
  });

  // 메뉴 관리
  router.post('/api/v1/system/menu/menus', (req, res) => {
    res.json(actionSuccess);
  });

  router.get('/api/v1/system/menu/menus/:menuId/functions', (req, res) => {
    res.json(require('../fixtures/menu-functions-unmapped.json'));
  });

  router.post('/api/v1/system/menu/menus/:menuId/functions', (req, res) => {
    res.json(actionSuccess);
  });

  router.delete('/api/v1/system/menu/menus/:menuId/functions', (req, res) => {
    res.json(actionSuccess);
  });

  router.get('/api/v1/system/menu/menus/:menuId', (req, res) => {
    res.json(require('../fixtures/menu-detail.json'));
  });

  router.put('/api/v1/system/menu/menus/:menuId', (req, res) => {
    res.json(actionSuccess);
  });

  router.delete('/api/v1/system/menu/menus/:menuId', (req, res) => {
    res.json(actionSuccess);
  });

  // 공통코드 조회 (codes.js 플러그인에서 호출)
  const codeMap = {
    P013: [ // 프록시/호스트/시스템 상태
      { com_cd: 'P013NOR', com_cd_nm: '정상', usg_yn: 'Y' },
      { com_cd: 'P013WRN', com_cd_nm: '경고', usg_yn: 'Y' },
      { com_cd: 'P013ERR', com_cd_nm: '오류', usg_yn: 'Y' },
    ],
    P002: [ // 호스트 유형
      { com_cd: 'P002CTR', com_cd_nm: 'Controller', usg_yn: 'Y' },
      { com_cd: 'P002CPT', com_cd_nm: 'Computing', usg_yn: 'Y' },
      { com_cd: 'P002MGT', com_cd_nm: 'Management', usg_yn: 'Y' },
    ],
    P003: [ // 호스트 상태
      { com_cd: 'P003NOR', com_cd_nm: '정상', usg_yn: 'Y' },
      { com_cd: 'P003ERR', com_cd_nm: '오류', usg_yn: 'Y' },
      { com_cd: 'P003MNT', com_cd_nm: '점검', usg_yn: 'Y' },
      { com_cd: 'P003DWN', com_cd_nm: '다운', usg_yn: 'Y' },
    ],
    P010: [ // Evacuate(HA) 상태
      { com_cd: 'P010RDY', com_cd_nm: '대기', usg_yn: 'Y' },
      { com_cd: 'P010ING', com_cd_nm: '진행중', usg_yn: 'Y' },
      { com_cd: 'P010END', com_cd_nm: '완료', usg_yn: 'Y' },
      { com_cd: 'P010ERR', com_cd_nm: '오류', usg_yn: 'Y' },
    ],
    P004: [ // 네트워크 용도
      { com_cd: 'P004P', com_cd_nm: 'Physical Network (External Network)', usg_yn: 'Y' },
      { com_cd: 'P004V', com_cd_nm: 'Virtual Network (Internal Network)', usg_yn: 'Y' },
    ],
    P008: [ // 네트워크 타입
      { com_cd: 'P008FLT', com_cd_nm: 'FLAT', usg_yn: 'Y' },
      { com_cd: 'P008VXL', com_cd_nm: 'vxLAN', usg_yn: 'Y' },
      { com_cd: 'P008VLN', com_cd_nm: 'VLAN', usg_yn: 'Y' },
    ],
    U017: [ // VM 할당 상태
      { com_cd: 'U017UNA', com_cd_nm: '미할당', usg_yn: 'Y' },
      { com_cd: 'U017ING', com_cd_nm: '할당중', usg_yn: 'Y' },
      { com_cd: 'U017DVA', com_cd_nm: '할당', usg_yn: 'Y' },
      { com_cd: 'U017RDY', com_cd_nm: '할당대기', usg_yn: 'Y' },
      { com_cd: 'U017FAI', com_cd_nm: '할당실패', usg_yn: 'Y' },
      { com_cd: 'U017REL', com_cd_nm: '할당해제', usg_yn: 'Y' },
    ],
    V002: [ // VM 전원 상태
      { com_cd: 'V002ONC', com_cd_nm: '켜짐', usg_yn: 'Y' },
      { com_cd: 'V002OFC', com_cd_nm: '꺼짐', usg_yn: 'Y' },
      { com_cd: 'V002SUS', com_cd_nm: '일시중지', usg_yn: 'Y' },
      { com_cd: 'V002ONG', com_cd_nm: '부팅중', usg_yn: 'Y' },
      { com_cd: 'V002OFG', com_cd_nm: '종료중', usg_yn: 'Y' },
      { com_cd: 'V002UNK', com_cd_nm: '알 수 없음', usg_yn: 'Y' },
    ],
    V008: [ // 디스크 유형
      { com_cd: 'V008ULD', com_cd_nm: '사용자 로컬 디스크', usg_yn: 'Y' },
      { com_cd: 'V008SLD', com_cd_nm: '시스템 로컬 디스크', usg_yn: 'Y' },
      { com_cd: 'V008NAS', com_cd_nm: 'NAS 디스크', usg_yn: 'Y' },
    ],
    V009: [ // 디스크 상태
      { com_cd: 'V009AVL', com_cd_nm: '사용 가능', usg_yn: 'Y' },
      { com_cd: 'V009USE', com_cd_nm: '사용중', usg_yn: 'Y' },
      { com_cd: 'V009DED', com_cd_nm: '삭제됨', usg_yn: 'Y' },
      { com_cd: 'V009ERR', com_cd_nm: '오류', usg_yn: 'Y' },
    ],
    U013: [ // 계정 상태
      { com_cd: 'U013NR', com_cd_nm: '정상', usg_yn: 'Y' },
      { com_cd: 'U013ED', com_cd_nm: '만료', usg_yn: 'Y' },
      { com_cd: 'U013LK', com_cd_nm: '잠김', usg_yn: 'Y' },
      { com_cd: 'U013ST', com_cd_nm: '정지', usg_yn: 'Y' },
      { com_cd: 'U013SL', com_cd_nm: '휴면', usg_yn: 'Y' },
    ],
    M006: [ // 보안인증서 유형
      { com_cd: 'M006CA', com_cd_nm: 'CA 인증서', usg_yn: 'Y' },
      { com_cd: 'M006SV', com_cd_nm: '서버 인증서', usg_yn: 'Y' },
    ],
    M005: [ // 알림 유형
      { com_cd: 'M00530M', com_cd_nm: '30일 알림(e-mail)', usg_yn: 'Y' },
      { com_cd: 'M00560M', com_cd_nm: '60일 알림(e-mail)', usg_yn: 'Y' },
    ],
    T002: [ // OS 유형
      { com_cd: 'T002W64', com_cd_nm: 'Windows 64bit', usg_yn: 'Y' },
      { com_cd: 'T002W32', com_cd_nm: 'Windows 32bit', usg_yn: 'Y' },
      { com_cd: 'T002L64', com_cd_nm: 'Linux 64bit', usg_yn: 'Y' },
      { com_cd: 'T002L32', com_cd_nm: 'Linux 32bit', usg_yn: 'Y' },
    ],
    U011: [ // USB 연결 권한
      { com_cd: 'U011IM', com_cd_nm: '제한', usg_yn: 'Y' },
      { com_cd: 'U011PR', com_cd_nm: '읽기', usg_yn: 'Y' },
      { com_cd: 'U011PW', com_cd_nm: '읽기+쓰기', usg_yn: 'Y' },
    ],
    U007: [ // 프린터 연결 권한
      { com_cd: 'U007PO', com_cd_nm: '허용', usg_yn: 'Y' },
      { com_cd: 'U007IM', com_cd_nm: '제한', usg_yn: 'Y' },
    ],
    U009: [ // 클립보드 공유 권한
      { com_cd: 'U009PD', com_cd_nm: '양방향', usg_yn: 'Y' },
      { com_cd: 'U009PT', com_cd_nm: '단방향(가상->로컬)', usg_yn: 'Y' },
      { com_cd: 'U009PS', com_cd_nm: '단방향(로컬->가상)', usg_yn: 'Y' },
      { com_cd: 'U009IM', com_cd_nm: '제한', usg_yn: 'Y' },
    ],
    U010: [ // 파일 전송(Drag&Drop) 권한
      { com_cd: 'U010PD', com_cd_nm: '양방향', usg_yn: 'Y' },
      { com_cd: 'U010PT', com_cd_nm: '단방향(가상->로컬)', usg_yn: 'Y' },
      { com_cd: 'U010PS', com_cd_nm: '단방향(로컬->가상)', usg_yn: 'Y' },
      { com_cd: 'U010IM', com_cd_nm: '제한', usg_yn: 'Y' },
    ],
    U012: [ // URL 리다이렉트 권한
      { com_cd: 'U012PO', com_cd_nm: '허용', usg_yn: 'Y' },
      { com_cd: 'U012IM', com_cd_nm: '제한', usg_yn: 'Y' },
    ],
    U026: [ // 멀티 모니터 권한
      { com_cd: 'U026PO', com_cd_nm: '허용', usg_yn: 'Y' },
      { com_cd: 'U026IM', com_cd_nm: '제한', usg_yn: 'Y' },
    ],
    U029: [ // 워터마크 유형
      { com_cd: 'U029TXT', com_cd_nm: '텍스트', usg_yn: 'Y' },
      { com_cd: 'U029IMG', com_cd_nm: '이미지', usg_yn: 'Y' },
    ],
    U027: [ // 백업/스냅샷 주기
      { com_cd: 'U027D', com_cd_nm: '일별', usg_yn: 'Y' },
      { com_cd: 'U027W', com_cd_nm: '주별', usg_yn: 'Y' },
      { com_cd: 'U027M', com_cd_nm: '월별', usg_yn: 'Y' },
    ],
    U024: [ // 요일
      { com_cd: 'U024SUN', com_cd_nm: '일요일', usg_yn: 'Y' },
      { com_cd: 'U024MON', com_cd_nm: '월요일', usg_yn: 'Y' },
      { com_cd: 'U024TUE', com_cd_nm: '화요일', usg_yn: 'Y' },
      { com_cd: 'U024WED', com_cd_nm: '수요일', usg_yn: 'Y' },
      { com_cd: 'U024THU', com_cd_nm: '목요일', usg_yn: 'Y' },
      { com_cd: 'U024FRI', com_cd_nm: '금요일', usg_yn: 'Y' },
      { com_cd: 'U024SAT', com_cd_nm: '토요일', usg_yn: 'Y' },
    ],
    A032: [ // MS 구분 코드
      { com_cd: 'resource', com_cd_nm: 'resource', usg_yn: 'Y' },
      { com_cd: 'operation', com_cd_nm: 'operation', usg_yn: 'Y' },
      { com_cd: 'user', com_cd_nm: 'user', usg_yn: 'Y' },
      { com_cd: 'system', com_cd_nm: 'system', usg_yn: 'Y' },
      { com_cd: 'audit', com_cd_nm: 'audit', usg_yn: 'Y' },
    ],
    J001: [ // 업무 요청 상태
      { com_cd: 'J001S', com_cd_nm: '신청', usg_yn: 'Y' },
      { com_cd: 'J001A', com_cd_nm: '완료', usg_yn: 'Y' },
      { com_cd: 'J001R', com_cd_nm: '반려', usg_yn: 'Y' },
      { com_cd: 'J001C', com_cd_nm: '취소', usg_yn: 'Y' },
    ],
    J003: [ // 업무 요청 구분
      { com_cd: 'J003USE', com_cd_nm: '자원 할당', usg_yn: 'Y' },
      { com_cd: 'J003RET', com_cd_nm: '자원 회수', usg_yn: 'Y' },
      { com_cd: 'J003ADD', com_cd_nm: '자원 증설', usg_yn: 'Y' },
      { com_cd: 'J003AUT', com_cd_nm: '정책 변경', usg_yn: 'Y' },
      { com_cd: 'J003PET', com_cd_nm: '가상 PC 기간 연장', usg_yn: 'Y' },
      { com_cd: 'J003ACC', com_cd_nm: '계정 연장', usg_yn: 'Y' },
      { com_cd: 'J003ERR', com_cd_nm: '장애 처리', usg_yn: 'Y' },
      { com_cd: 'J003DAR', com_cd_nm: '단말 식별정보 등록', usg_yn: 'Y' },
    ],
    V001: [ // 테넌트 방식
      { com_cd: 'V001DED', com_cd_nm: '전용', usg_yn: 'Y' },
      { com_cd: 'V001POO', com_cd_nm: '풀', usg_yn: 'Y' },
    ],
    U007: [ // 로컬 프린터 연결
      { com_cd: 'U007ALW', com_cd_nm: '허용', usg_yn: 'Y' },
      { com_cd: 'U007DEN', com_cd_nm: '제한', usg_yn: 'Y' },
    ],
    U009: [ // 클립보드 공유
      { com_cd: 'U009ALW', com_cd_nm: '허용', usg_yn: 'Y' },
      { com_cd: 'U009DEN', com_cd_nm: '제한', usg_yn: 'Y' },
    ],
    U010: [ // 파일 전송
      { com_cd: 'U010ALW', com_cd_nm: '허용', usg_yn: 'Y' },
      { com_cd: 'U010DEN', com_cd_nm: '제한', usg_yn: 'Y' },
    ],
    U011: [ // USB 연결
      { com_cd: 'U011ALW', com_cd_nm: '허용', usg_yn: 'Y' },
      { com_cd: 'U011DEN', com_cd_nm: '제한', usg_yn: 'Y' },
    ],
    U012: [ // URL 리다이렉션
      { com_cd: 'U012ALW', com_cd_nm: '허용', usg_yn: 'Y' },
      { com_cd: 'U012DEN', com_cd_nm: '제한', usg_yn: 'Y' },
    ],
    U026: [ // 멀티모니터
      { com_cd: 'U026ALW', com_cd_nm: '허용', usg_yn: 'Y' },
      { com_cd: 'U026DEN', com_cd_nm: '제한', usg_yn: 'Y' },
    ],
    A019: [ // VOC 상담 유형
      { com_cd: 'A019PRR', com_cd_nm: '가상 PC 자원 요청', usg_yn: 'Y' },
      { com_cd: 'A019USG', com_cd_nm: '가상 PC 이용 방법', usg_yn: 'Y' },
      { com_cd: 'A019PAS', com_cd_nm: '가상 PC 할당 요청', usg_yn: 'Y' },
      { com_cd: 'A019ERR', com_cd_nm: '가상 PC 장애 처리', usg_yn: 'Y' },
      { com_cd: 'A019UPU', com_cd_nm: '유저포털 이용 방법', usg_yn: 'Y' },
      { com_cd: 'A019LIN', com_cd_nm: '유저포털 로그인', usg_yn: 'Y' },
      { com_cd: 'A019ETC', com_cd_nm: '기타', usg_yn: 'Y' },
    ],
    J008: [ // 마이그레이션 작업 상태
      { com_cd: 'J008I', com_cd_nm: '작업중', usg_yn: 'Y' },
      { com_cd: 'J008E', com_cd_nm: '작업완료', usg_yn: 'Y' },
      { com_cd: 'J008F', com_cd_nm: '작업실패', usg_yn: 'Y' },
    ],
    U003: [ // 인증정책 대상
      { com_cd: 'U003B', com_cd_nm: '기본 인증정책', usg_yn: 'Y' },
      { com_cd: 'U003R', com_cd_nm: '자원 할당시', usg_yn: 'Y' },
    ],
    U004: [ // 2차인증 방법
      { com_cd: 'U004SMS', com_cd_nm: 'SMS 인증', usg_yn: 'Y' },
      { com_cd: 'U004OTP', com_cd_nm: 'OTP 인증', usg_yn: 'Y' },
      { com_cd: 'U004EML', com_cd_nm: 'EMAIL 인증', usg_yn: 'Y' },
    ],
    J004: [ // 요청 채널
      { com_cd: 'J004WEB', com_cd_nm: '웹', usg_yn: 'Y' },
      { com_cd: 'J004MOB', com_cd_nm: '모바일', usg_yn: 'Y' },
    ],
    V003: [ // VM 연결 상태
      { com_cd: 'V003ON', com_cd_nm: '접속중', usg_yn: 'Y' },
      { com_cd: 'V003OF', com_cd_nm: '접속 대기', usg_yn: 'Y' },
    ],
  };
  router.get('/api/v1/system/commons/codes', (req, res) => {
    const raw = req.query.cd_grp_id || 'UNKNOWN';
    // $codes.gets()는 cd_grp_id=M005&cd_grp_id=M006 형태로 복수 요청
    const ids = Array.isArray(raw) ? raw : [raw];
    const data = ids.map(cdGrpId => ({
      cd_grp_id: cdGrpId,
      com_cd_lang_m: codeMap[cdGrpId] || [
        { com_cd: cdGrpId + '01', com_cd_nm: '항목1', usg_yn: 'Y' },
        { com_cd: cdGrpId + '02', com_cd_nm: '항목2', usg_yn: 'Y' },
        { com_cd: cdGrpId + '03', com_cd_nm: '항목3', usg_yn: 'Y' },
      ],
    }));
    res.json({ data, errCode: null, errMsg: null });
  });

  // 공통코드 로그 파라미터
  router.get('/api/v1/system/commons/codes/logs/params', (req, res) => {
    res.json(require('../fixtures/commons-codes-logs-params.json'));
  });

  // VOC 상담 목록
  router.get('/api/v1/system/voc/adv', (req, res) => {
    res.json(require('../fixtures/voc-adv-list.json'));
  });

  // VOC 상담 상세
  router.get('/api/v1/system/voc/adv/:id', (req, res) => {
    res.json(require('../fixtures/system/voc-adv-detail.json'));
  });
};
