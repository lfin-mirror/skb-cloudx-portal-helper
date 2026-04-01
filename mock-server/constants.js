// admin-portal 역할별 mock JWT 토큰
// 실제 JWT가 아닌 식별용 상수. handler에서 이 값을 비교해 SA/TA를 구분한다.
const TOKENS = {
  SUPER_ADMIN: 'Bearer mock-sa-token',
  TENANT_ADMIN: 'Bearer mock-ta-token',
};

function getRoleFromToken(authHeader) {
  if (authHeader === TOKENS.SUPER_ADMIN) return 'sa';
  if (authHeader === TOKENS.TENANT_ADMIN) return 'ta';
  return 'ta'; // 기본값
}

module.exports = { TOKENS, getRoleFromToken };
