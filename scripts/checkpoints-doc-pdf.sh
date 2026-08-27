#!/bin/sh
# Converts the built checkpoints .docx to PDF beside it in the GCX Repo.
# LibreOffice is the converter, because it is what is on this machine.
#
#   sh scripts/checkpoints-doc-pdf.sh        the English document
#   sh scripts/checkpoints-doc-pdf.sh fr     the French one
#
# The two editions differ in more than a suffix -- separate library folders and a
# different file name -- so the paths are spelled out per language rather than
# derived, which is what let the English paths quietly rot after the repo split.
set -e
REPO="$PWD/../../TBS (Claude Output)/GCX Repo"

if [ "$1" = "fr" ]; then
  WORD="$REPO/DLG -- FR/DLG -- Editable Source Files (Word) FR"
  PDF="$REPO/DLG -- FR/DLG -- Documents (PDF) FR"
  NAME="Points de contrôle"
else
  WORD="$REPO/DLG -- EN/DLG -- Editable Source Files (Word)"
  PDF="$REPO/DLG -- EN/DLG -- Documents (PDF)"
  NAME="The official checkpoints of a digital service"
fi

rm -f "$PDF/$NAME.pdf"
soffice --headless --convert-to pdf --outdir "$PDF" "$WORD/$NAME.docx" >/dev/null
echo "converted: $NAME — $(pdfinfo "$PDF/$NAME.pdf" | grep Pages)"
