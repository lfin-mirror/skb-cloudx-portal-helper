#!/bin/bash
# test-harness 기동 스크립트
#
# 사용법:
#   ./start.sh          # dist가 있으면 정적 서빙, 없으면 dev server 프록시
#   ./start.sh --dev    # 강제 dev server 모드

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
USER_PORTAL_DIR="$(dirname "$ROOT_DIR")/user-portal"
DIST_DIR="$USER_PORTAL_DIR/dist"

export MOCK_PORT="${MOCK_PORT:-3000}"
export USER_PORTAL_PORT="${USER_PORTAL_PORT:-8080}"

cleanup() {
  echo "[start.sh] shutting down..."
  kill $MOCK_PID $PORTAL_PID 2>/dev/null
  wait $MOCK_PID $PORTAL_PID 2>/dev/null
  exit 0
}
trap cleanup SIGINT SIGTERM

USE_DEV=false
if [ "$1" = "--dev" ]; then
  USE_DEV=true
fi

# dev server 모드: dist가 없거나 --dev 플래그
if [ "$USE_DEV" = true ] || [ ! -d "$DIST_DIR" ]; then
  echo "[start.sh] mode: dev server proxy"
  echo "[start.sh] starting user-portal on :${USER_PORTAL_PORT}..."
  cd "$USER_PORTAL_DIR" && npm run serve &
  PORTAL_PID=$!
  sleep 3
else
  echo "[start.sh] mode: static (serving from $DIST_DIR)"
fi

echo "[start.sh] starting mock-server on :${MOCK_PORT}..."
cd "$ROOT_DIR" && node mock-server/server.js &
MOCK_PID=$!

sleep 1
echo ""
echo "====================================="
echo "  mock server:  http://localhost:${MOCK_PORT}"
if [ "$USE_DEV" = true ] || [ ! -d "$DIST_DIR" ]; then
  echo "  user-portal:  http://localhost:${USER_PORTAL_PORT} (dev server)"
else
  echo "  user-portal:  static files from dist/"
fi
echo ""
echo "  브라우저에서 http://localhost:${MOCK_PORT} 접속"
echo "====================================="
echo ""

wait
