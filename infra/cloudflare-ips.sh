#!/usr/bin/env bash
# Allow 443 only from Cloudflare. Run as root on the VPS; re-run monthly (ranges rarely change).
set -euo pipefail
for f in ips-v4 ips-v6; do
	for ip in $(curl -fsS "https://www.cloudflare.com/$f"); do
		ufw allow proto tcp from "$ip" to any port 443 comment 'cloudflare'
	done
done
