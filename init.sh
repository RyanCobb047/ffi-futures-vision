#!/usr/bin/env bash
# Project bootstrap / smoke test
# Generated during project initialization. Agents run this to verify
# the environment is healthy before starting or resuming work.
#
# Customize per project. Every command should be idempotent.

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"

echo "=== Project Bootstrap ==="
echo "Directory: $PROJECT_DIR"
echo "Time: $(date -u +%Y-%m-%dT%H:%M:%SZ)"

# 1. Install dependencies (idempotent)
if [ -f "package.json" ]; then
  echo "--- Installing npm dependencies ---"
  npm install --silent
elif [ -f "requirements.txt" ]; then
  echo "--- Installing Python dependencies ---"
  pip install -q -r requirements.txt
elif [ -f "pyproject.toml" ]; then
  echo "--- Installing Python dependencies ---"
  pip install -q -e .
fi

# 2. Build check
if [ -f "package.json" ]; then
  if npm run --silent build 2>/dev/null; then
    echo "--- Build: PASS ---"
  else
    echo "--- Build: FAIL ---"
    exit 1
  fi
fi

# 3. Lint check (non-blocking — report but don't exit)
if [ -f "package.json" ]; then
  if npx --no-install eslint . --quiet 2>/dev/null; then
    echo "--- Lint: PASS ---"
  else
    echo "--- Lint: WARNINGS (non-blocking) ---"
  fi
fi

# 4. Type check (if applicable)
if [ -f "tsconfig.json" ]; then
  if npx --no-install tsc --noEmit 2>/dev/null; then
    echo "--- Type-check: PASS ---"
  else
    echo "--- Type-check: FAIL ---"
    exit 1
  fi
fi

# 5. Test suite (if exists)
if [ -f "package.json" ] && npm run --silent test 2>/dev/null; then
  echo "--- Tests: PASS ---"
else
  echo "--- Tests: SKIPPED or N/A ---"
fi

# 6. Dev server smoke test (optional — uncomment and customize)
# echo "--- Starting dev server for smoke test ---"
# npm run dev &
# DEV_PID=$!
# sleep 3
# if curl -sf http://localhost:5173 > /dev/null 2>&1; then
#   echo "--- Dev server: RESPONDING ---"
# else
#   echo "--- Dev server: NOT RESPONDING ---"
# fi
# kill $DEV_PID 2>/dev/null

echo "=== Bootstrap Complete ==="
