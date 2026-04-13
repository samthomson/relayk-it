#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$(pwd)"
VITE="${ROOT}/node_modules/.bin/vite"
if [[ ! -x "$VITE" ]]; then
  echo "Run npm install first." >&2
  exit 1
fi
"$VITE" build -l error
cp "${ROOT}/dist/index.html" "${ROOT}/dist/404.html"
read -r -s -p "nsec or hex (input hidden): " NSITE_PRIVATE_KEY
echo
npx -y nsite-cli upload dist --fallback=/index.html --privatekey "$NSITE_PRIVATE_KEY"
unset NSITE_PRIVATE_KEY
