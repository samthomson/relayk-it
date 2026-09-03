#!/usr/bin/env bash
# Deploy the site: builds with Astro, publishes via nsyte.
# Signing key: NSITE_BUNKER in .env (bunker://… URL from your signing app).
#
# Extra nsyte args pass straight through, e.g. target a single server:
#   npm run nsite:publish -- -s https://blossom.relayk.it
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$(pwd)"
ASTRO="${ROOT}/node_modules/.bin/astro"
NSYTE_VERSION="0.28.0"
NSYTE_DIR="${ROOT}/.tools/nsyte-${NSYTE_VERSION}"
NSYTE_BIN="${NSYTE_DIR}/nsyte"
NSYTE_BASE="https://github.com/sandwichfarm/nsyte/releases/download/v${NSYTE_VERSION}"

if [[ ! -x "$ASTRO" ]]; then
  echo "Run npm install first." >&2
  exit 1
fi

if [[ -f .env ]]; then
  set -a
  # shellcheck disable=SC1091
  . ./.env
  set +a
fi

if [[ -z "${NSITE_BUNKER:-}" ]]; then
  echo "Missing NSITE_BUNKER — add your bunker URL to .env (see .env.example)." >&2
  exit 1
fi

ensure_nsyte() {
  if [[ -x "$NSYTE_BIN" ]]; then
    return 0
  fi
  mkdir -p "$NSYTE_DIR"
  local asset
  case "$(uname -s)-$(uname -m)" in
    Darwin-arm64) asset="nsyte-macos-arm64" ;;
    Darwin-x86_64) asset="nsyte-macos-x64" ;;
    Linux-x86_64|Linux-amd64) asset="nsyte-linux" ;;
    Linux-aarch64|Linux-arm64) asset="nsyte-linux" ;;
    *)
      echo "Unsupported platform: $(uname -s) $(uname -m)" >&2
      exit 1
      ;;
  esac
  echo "Downloading nsyte ${NSYTE_VERSION} (${asset}) into .tools/ …" >&2
  curl -fsSL "${NSYTE_BASE}/${asset}" -o "$NSYTE_BIN"
  chmod +x "$NSYTE_BIN"
}

"$ASTRO" build > /dev/null 2>&1
echo "✓ Built $(find dist -name '*.html' | wc -l | tr -d ' ') pages"
ensure_nsyte

LOG="$(mktemp)"
trap 'rm -f "$LOG"' EXIT

if "$NSYTE_BIN" deploy dist \
  --sec "$NSITE_BUNKER" \
  --fallback=/404.html \
  --skip-secrets-scan \
  --sync \
  "$@" >"$LOG" 2>&1; then
  echo "✓ Deployed — https://relayk.it (gateway refreshes within ~10 min)"
  # Errors are shown; warnings collapse to a single count.
  grep -E '^\[ERROR\]|✗' "$LOG" | head -10 || true
  WARNS=$(grep -c '^\[WARN\]' "$LOG" || true)
  [[ "$WARNS" -gt 0 ]] && echo "($WARNS warnings suppressed)"
else
  echo "✗ Deploy failed:"
  grep -E '^\[ERROR\]|✗' "$LOG" | head -20 || true
  echo "—— last 15 lines ——" >&2
  tail -15 "$LOG" >&2
  exit 1
fi
