#!/bin/bash
set -euo pipefail

SRC_DIR="${1:-.}"
OUT_DIR="${2:-_site}"

command -v rsync >/dev/null 2>&1 || {
  echo "Missing required binary: rsync" >&2
  exit 1
}

[[ -d "$SRC_DIR" ]] || {
  echo "Missing source directory: $SRC_DIR" >&2
  exit 1
}

mkdir -p "$OUT_DIR"

rsync -a --delete \
  --exclude '.git/' \
  --exclude '.github/' \
  --exclude '_site/' \
  --exclude '.playwright-cli/' \
  --exclude 'output/' \
  --exclude '*.af' \
  --exclude '*.af~lock~' \
  --exclude 'scripts/' \
  --exclude 'tests/' \
  --exclude 'prompts/' \
  --exclude 'source-assets/' \
  --exclude '.gitignore' \
  --exclude 'README.md' \
  --exclude '.DS_Store' \
  "$SRC_DIR"/ "$OUT_DIR"/
