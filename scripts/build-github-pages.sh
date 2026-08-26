#!/bin/sh
#
# Build both languages into the one directory GitHub Pages publishes.
#
# The two languages are two builds of the same application: the Vite plugin swaps
# module source on DLG_LOCALE=fr, so a build is wholly English or wholly French and
# there is no runtime switch. Pages serves one directory, so English goes at the base
# and French underneath it at /fr/, which is the path the header's language button
# already points at.
#
# French is built first because the English build clears dist/, so the French output
# is parked outside the repository in between. Parking it inside would risk it being
# committed, or being wiped by the second build.
set -e

cd "$(dirname "$0")/.."
PARK="${TMPDIR:-/tmp}/dlg-fr-dist.$$"

GITHUB_PAGES=true DLG_LOCALE=fr npm run build
rm -rf "$PARK"
mv dist/client "$PARK"

GITHUB_PAGES=true npm run build
mv "$PARK" dist/client/fr

echo "English: $(find dist/client -maxdepth 1 -name index.html | wc -l | tr -d ' ') at the base, French under fr/"
