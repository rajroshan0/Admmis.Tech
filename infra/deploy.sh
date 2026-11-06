#!/usr/bin/env bash
# Runs on the VPS as user `deploy`. Called by CI over SSH with a restricted key (command=).
# Input: one image tag, for example admmis-tech-3b4f39b. Pulls it, restarts, health-checks, rolls back on failure.
set -euo pipefail

TAG="${SSH_ORIGINAL_COMMAND:-${1:-}}"
[[ "$TAG" =~ ^[a-z0-9][a-z0-9-]{0,40}-[0-9a-f]{7,40}$ ]] || { echo "bad tag" >&2; exit 2; }

cd /opt/admmis
PREV="$(cat .current-tag 2>/dev/null || true)"
export IMAGE_TAG="$TAG"

docker compose pull app
docker compose up -d --remove-orphans

for i in $(seq 1 30); do
	if curl -fsS --max-time 3 http://127.0.0.1:3000/api/health >/dev/null; then
		echo "$TAG" > .current-tag
		[ -n "$PREV" ] && echo "$PREV" > .previous-tag
		echo "deployed $TAG"
		exit 0
	fi
	sleep 4
done

echo "health check failed for $TAG" >&2
if [ -n "$PREV" ]; then
	echo "rolling back to $PREV" >&2
	IMAGE_TAG="$PREV" docker compose up -d
fi
exit 1
