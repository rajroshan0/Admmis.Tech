# syntax=docker/dockerfile:1.7
# ADMMIS.TECH app image. One image per brand from the same commit (ADR-027).
#   docker build --build-arg BRAND=admmis-tech -t admmis-tech:admmis-tech-<sha> .
# DRAFT (T-502): NOT yet built (no Docker on the authoring machine). The first CI build is the first real test.

# Bases pinned by tag + digest (digests checked 2026-11-06). Update through Dependabot PRs.
ARG NODE_IMAGE=node:24-alpine@sha256:a34ab6d7f6f4813f4d0c5469d74685604b962fbdbf5793a7bc7b4998ecb867c8

# ---------- deps: install with the lockfile only (cache-friendly) ----------
FROM ${NODE_IMAGE} AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json pnpm-lock.yaml .npmrc* pnpm-workspace.yaml* ./
# pnpm version comes from the packageManager field in package.json
RUN corepack enable
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# ---------- build ----------
FROM ${NODE_IMAGE} AS build
WORKDIR /app
RUN apk add --no-cache libc6-compat && corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# BRAND is a build-time setting (tokens and fonts are resolved at build). Default: admmis-tech.
ARG BRAND=admmis-tech
# Public, non-secret values that Next embeds into client JS at build time. Never pass secrets as build args.
ARG NEXT_PUBLIC_SITE_URL=https://tech.admmis.org
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY=
ARG NEXT_PUBLIC_GA_ID=
ARG NEXT_PUBLIC_META_PIXEL_ID=
ARG NEXT_PUBLIC_CLARITY_ID=
ARG BUILD_SHA=dev
ENV BRAND=${BRAND} \
    NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    NEXT_PUBLIC_TURNSTILE_SITE_KEY=${NEXT_PUBLIC_TURNSTILE_SITE_KEY} \
    NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID} \
    NEXT_PUBLIC_META_PIXEL_ID=${NEXT_PUBLIC_META_PIXEL_ID} \
    NEXT_PUBLIC_CLARITY_ID=${NEXT_PUBLIC_CLARITY_ID} \
    BUILD_SHA=${BUILD_SHA} \
    NEXT_TELEMETRY_DISABLED=1

# Server env needed only so env.ts validation passes during `next build`: dummy values from .env.ci.
# They live only in this build stage and are not copied to the runtime image.
# next/font/google downloads fonts here, so the build needs network access (fonts.gstatic.com).
RUN --mount=type=cache,target=/app/.next/cache \
    set -a && . ./.env.ci && set +a && pnpm build

# ---------- runtime ----------
FROM ${NODE_IMAGE} AS runner
WORKDIR /app
ARG BRAND=admmis-tech
ARG BUILD_SHA=dev
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    BRAND=${BRAND} \
    BUILD_SHA=${BUILD_SHA}
LABEL org.opencontainers.image.title="admmis-tech" \
      org.opencontainers.image.source="https://github.com/rajroshan0/Admmis.Tech" \
      org.opencontainers.image.revision="${BUILD_SHA}" \
      org.admmis.brand="${BRAND}"

# Non-root user with a fixed uid (matches compose `user:`)
RUN addgroup -g 10001 -S app && adduser -u 10001 -S -G app -H -h /app app \
    && mkdir -p /app/.next/cache && chown -R app:app /app

# Requires `output: 'standalone'` (set by hritik). Verified locally by hritik without outputFileTracingIncludes
# (`node .next/standalone/server.js` serves /, /admin, /api/health). sharp on musl (alpine) is untested.
COPY --from=build --chown=app:app /app/.next/standalone ./
COPY --from=build --chown=app:app /app/.next/static ./.next/static
COPY --from=build --chown=app:app /app/public ./public

USER app
EXPOSE 3000

# /api/health is part of the scaffold (T-103 step 7). Uses node: no curl/wget dependency.
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
