# Local development on Roshan's Mac (T-505)

Owner: raj · Version: v0.1 · 2026-11-07 (MSK) · Reviewer: pm · Approver: Roshan
Machine: Apple Silicon (darwin arm64), about 66 GB free disk. Cost: USD 0.

**Purpose.** Run tech.admmis.org on your Mac with a real PostgreSQL, open the admin panel and create the first admin user.
**Prerequisites.** Node 24 and pnpm already installed (they are). The repo folder `/Users/rajroshan/Desktop/ADMMIS.TECH`. About 5 GB free for Docker.
**Raj does not install anything on your Mac.** You run these steps.

## 1. Pick one database path

| Path | Good for | Cost | Effort |
|---|---|---|---|
| A. Docker Desktop (recommended) | Same Postgres 17 as production and CI | USD 0 if licence allows (see below) | 15 min, one big install |
| B. Homebrew Postgres | No Docker, lighter | USD 0 | 10 min, but Postgres version may differ from production |

## 2. Docker Desktop licence (check before installing)

Docker Desktop is free for personal use, education, non-commercial open source, and small businesses. Reported thresholds: fewer than 250 employees AND less than USD 10 million annual revenue. Larger companies need a paid plan.

- Sources: Docker's subscription agreement page https://docs.docker.com/subscription/desktop-license/ and https://www.docker.com/pricing/ (the pricing page states the thresholds).
- STATUS: UNVERIFIED against the primary page. On 2026-11-07 I could only confirm the thresholds from secondary reports of Docker's 2021 announcement and a search snippet of Docker's Personal plan page. TODO(roshan): open https://docs.docker.com/subscription/desktop-license/ and confirm that ADMMIS.TECH is under both thresholds. ADMMIS.TECH is a small agency, so it very likely qualifies.
- Docker Engine itself and the `docker compose` command-line tool are open source and free. Only the Desktop app has the licence rule. If you prefer to avoid it entirely, use path B.

## 3. Path A: Docker Desktop

1. Download Docker Desktop for Mac with **Apple silicon** from https://www.docker.com/products/docker-desktop/ (file `Docker.dmg`). Do not choose the Intel build.
2. Open the dmg and drag Docker to Applications. Open it, accept the terms, and choose "Use recommended settings". You can skip the sign-in. No account is needed.
3. Wait until the whale icon in the menu bar says "Docker Desktop is running".
4. Optional, saves RAM: Docker Desktop, Settings, Resources, set Memory to 2 GB (enough for Postgres only).
5. Open Terminal and check:
   ```
   docker --version
   docker compose version
   ```
6. Start the database from the repo folder:
   ```
   cd /Users/rajroshan/Desktop/ADMMIS.TECH
   docker compose -f docker-compose.dev.yml up -d
   docker compose -f docker-compose.dev.yml ps
   ```
   `STATUS` should say `healthy` after about 15 seconds. The first run downloads the `postgres:17-alpine` image (about 100 MB).
7. Create your local settings file, only once:
   ```
   cp .env.example .env
   ```
   Edit `.env` in any editor:
   - `PAYLOAD_SECRET`: replace with any random text of at least 32 characters. Generate one with `openssl rand -base64 36`.
   - `NEXT_PUBLIC_SITE_URL`: set to `http://localhost:3100` (see the port note below).
   - Leave `DATABASE_URL` as is. It matches the compose file.
   - Leave everything else empty. The lead pipeline uses `log` providers locally.
   `.env` is ignored by git. Never paste its contents into chat or commit it.
8. Install packages and start the site on port 3100:
   ```
   pnpm install
   pnpm dev --port 3100
   ```
9. Open http://localhost:3100 for the site and http://localhost:3100/admin for the admin panel. On the first visit the admin shows "Create first user". Enter your email and a strong password (save it in Bitwarden). That is the first admin account.

**Port note.** Port 3000 on this Mac is already used by another app of yours, so always start ours with `--port 3100`. Keep `NEXT_PUBLIC_SITE_URL` and `LEAD_ALLOWED_HOSTS` in `.env` in line with it (`LEAD_ALLOWED_HOSTS=localhost:3100`).

## 4. Path B: Homebrew Postgres (no Docker)

1. `brew install postgresql@17` then `brew services start postgresql@17`. (If 17 is unavailable use the newest, and tell Hritik the version. Hritik's local smoke tests used 14. Production is 17.)
2. Create the user and database with the same names as the compose file:
   ```
   psql postgres -c "CREATE USER admmis WITH PASSWORD 'admmis';"
   psql postgres -c "CREATE DATABASE admmis_tech OWNER admmis;"
   ```
   If `psql` is not found, add it to the PATH: `export PATH="/opt/homebrew/opt/postgresql@17/bin:$PATH"`.
3. Continue from step 7 in section 3 (the `.env` default `DATABASE_URL` already matches).
4. Stop it later with `brew services stop postgresql@17`.
Do not run both paths at once: both use port 5432.

## 5. Daily use

| Task | Command |
|---|---|
| Start database | `docker compose -f docker-compose.dev.yml up -d` |
| Stop database (keeps data) | `docker compose -f docker-compose.dev.yml stop` |
| Start site | `pnpm dev --port 3100` |
| Wipe the local database (data lost) | `docker compose -f docker-compose.dev.yml down -v` |

## 6. Verify
- `docker compose -f docker-compose.dev.yml ps` shows `healthy`.
- http://localhost:3100/api/health returns OK.
- You can log in at http://localhost:3100/admin.

## 7. Roll back (remove everything)
`docker compose -f docker-compose.dev.yml down -v`, then quit and drag Docker to the Trash (Settings, Troubleshoot, "Clean / Purge data" first frees the disk). For path B: `brew services stop postgresql@17 && brew uninstall postgresql@17`. The repo is untouched.

## 8. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `docker: command not found` | Docker Desktop not started, or Terminal opened before install | Start Docker Desktop, open a new Terminal tab |
| `Cannot connect to the Docker daemon` | Whale icon still starting | Wait for "running", retry |
| `port is already allocated` on 5432 | Homebrew Postgres or another Postgres is running | `brew services stop postgresql@17` (or `lsof -i :5432` to find it) |
| `EADDRINUSE :::3000` or `:3100` | Another app uses the port | Use `--port 3100`; if 3100 is taken try 3101 and update `.env` |
| `password authentication failed for user "admmis"` | Old volume with a different password, or path B user missing | Path A: `down -v` and `up -d` again. Path B: rerun the CREATE USER line |
| Site error about `PAYLOAD_SECRET` | Secret shorter than 32 characters or `.env` missing | Fix `.env`, restart `pnpm dev` |
| `env` validation error about `NEXT_PUBLIC_SITE_URL` | Not set | Set it to `http://localhost:3100` |
| `/admin` shows login, not "create first user" | A user already exists in this database | Use that user, or wipe with `down -v` |
| Docker is slow or fans spin | Too much memory given to Docker | Settings, Resources, Memory 2 GB |
| Disk fills up | Old images and volumes | `docker system prune` (asks first; does not remove volumes in use) |
| pnpm says a build script was blocked | pnpm 12 blocks build scripts by default | Do not bypass. Tell Hritik; the allow-list is in `pnpm-workspace.yaml` |
| Fonts fail to download during build | No internet to fonts.gstatic.com | Check the connection; the build downloads fonts once |

## Sources (checked 2026-11-07)
- Docker licence: https://docs.docker.com/subscription/desktop-license/ and https://www.docker.com/pricing/ . Primary pages NOT yet read; see section 2.
- Repo files: `docker-compose.dev.yml`, `.env.example`.
