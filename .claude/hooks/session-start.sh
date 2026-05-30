#!/bin/bash
set -euo pipefail

# Only run dependency setup in the Claude Code remote (web) environment.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# Install Node dependencies. `npm install` is idempotent and benefits from
# the container's cached state on subsequent runs.
npm install
