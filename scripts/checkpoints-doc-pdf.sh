#!/bin/sh
# Converts the built .docx to PDF beside it in the GCX Repo.
# LibreOffice is the converter, because it is what is on this machine.
set -e
REPO="$PWD/../../TBS (Claude Output)/GCX Repo"
NAME="The official checkpoints of a digital service"
rm -f "$REPO/DLG -- EN/DLG -- Documents (PDF)/$NAME.pdf"
soffice --headless --convert-to pdf \
  --outdir "$REPO/DLG -- EN/DLG -- Documents (PDF)" \
  "$REPO/DLG -- EN/DLG -- Editable Source Files (Word)/$NAME.docx" >/dev/null
echo "converted: $(pdfinfo "$REPO/DLG -- EN/DLG -- Documents (PDF)/$NAME.pdf" | grep Pages)"
