#!/usr/bin/env bash
# NIP-5A deploy via nsyte (official GitHub release binary — avoids JSR, which can 403 from Deno).
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$(pwd)"
ASTRO="${ROOT}/node_modules/.bin/astro"
NSYTE_VERSION="0.25.0"
NSYTE_DIR="${ROOT}/.tools/nsyte-${NSYTE_VERSION}"
NSYTE_BIN="${NSYTE_DIR}/nsyte"
NSYTE_BASE="https://github.com/sandwichfarm/nsyte/releases/download/v${NSYTE_VERSION}"

if [[ ! -x "$ASTRO" ]]; then
  echo "Run npm install first." >&2
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

"$ASTRO" build

read -r -s -p "nsec, hex, or nbunksec (input hidden): " NSITE_SECRET
echo

ensure_nsyte

echo "Deploying with nsyte@${NSYTE_VERSION} (NIP-5A root manifest)…" >&2
# Static multipage site: unknown paths serve the generated 404 page.
# Secrets scan flag skips static media/asset false positives.
"$NSYTE_BIN" deploy dist \
  --sec "$NSITE_SECRET" \
  --fallback=/404.html \
  --verbose \
  --skip-secrets-scan \
  --sync

unset NSITE_SECRET
