#!/usr/bin/env bash
# Daily backup: pg_dump -> age encrypt -> R2 (daily/, weekly/ on Sunday, monthly/ on day 1) + media mirror.
# Runs on the VPS from backup.service. Needs in /opt/admmis/.env.backup (mode 600, NOT in git):
#   AGE_RECIPIENT (public key), RCLONE_CONFIG_R2_* (R2 S3 endpoint + backup token), BACKUP_BUCKET,
#   MEDIA_BUCKET, BACKUP_HEARTBEAT_URL, PGUSER, PGDATABASE, ENV_NAME (production|staging)
set -euo pipefail
umask 077

: "${AGE_RECIPIENT:?}" "${BACKUP_BUCKET:?}" "${PGUSER:?}" "${PGDATABASE:?}" "${ENV_NAME:?}"
WORK="$(mktemp -d /opt/admmis/backups/tmp.XXXXXX)"
trap 'rm -rf "$WORK"' EXIT

AVAIL=$(df --output=pcent /opt/admmis | tail -1 | tr -dc '0-9')
[ "$AVAIL" -lt 80 ] || { echo "disk usage ${AVAIL}% too high" >&2; exit 1; }

STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
NAME="${ENV_NAME}-${STAMP}.pgc.age"

docker compose -f /opt/admmis/docker-compose.yml exec -T postgres \
	pg_dump -U "$PGUSER" -Fc "$PGDATABASE" | age -r "$AGE_RECIPIENT" > "$WORK/$NAME"
[ -s "$WORK/$NAME" ] || { echo "empty dump" >&2; exit 1; }

# Row counts for the restore test comparison (numbers only, no personal data).
docker compose -f /opt/admmis/docker-compose.yml exec -T postgres \
	psql -U "$PGUSER" -d "$PGDATABASE" -Atc \
	"select relname||'='||n_live_tup from pg_stat_user_tables order by 1" > "$WORK/counts.txt" || true

rclone copyto "$WORK/$NAME" "r2:${BACKUP_BUCKET}/daily/${NAME}"
[ "$(date -u +%u)" = 7 ] && rclone copyto "$WORK/$NAME" "r2:${BACKUP_BUCKET}/weekly/${NAME}"
[ "$(date -u +%d)" = 01 ] && rclone copyto "$WORK/$NAME" "r2:${BACKUP_BUCKET}/monthly/${NAME}"
rclone copyto "$WORK/counts.txt" "r2:${BACKUP_BUCKET}/counts/${ENV_NAME}-${STAMP}.txt"

# Media is already in R2; copy (never sync) so accidental deletes are not propagated.
[ -n "${MEDIA_BUCKET:-}" ] && rclone copy "r2:${MEDIA_BUCKET}" "r2:${BACKUP_BUCKET}/media-mirror" --fast-list

[ -n "${BACKUP_HEARTBEAT_URL:-}" ] && curl -fsS --max-time 10 "$BACKUP_HEARTBEAT_URL" >/dev/null
echo "backup ok: $NAME"
