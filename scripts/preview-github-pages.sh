#!/usr/bin/env sh
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PREVIEW_DIR="$ROOT/dist/gh-pages-preview"
BASE="simple-gov-guide"

cd "$ROOT"
npm run build:pages

rm -rf "$PREVIEW_DIR"
mkdir -p "$PREVIEW_DIR/$BASE"
cp -r dist/client/. "$PREVIEW_DIR/$BASE/"

echo ""
echo "GitHub Pages preview (same layout as production):"
echo "  http://localhost:4173/$BASE/"
echo ""

exec npx serve "$PREVIEW_DIR" -l 4173
