# BUG-002 Home LCP is 2.5 to 2.6 s on Lighthouse mobile, over the 2.5 s budget

| Field | Value |
|---|---|
| Severity | S2 |
| Owner | hritik (headers), satish (hero image) |
| Found | 2026-11-07 by rajaros, T-802 |
| Build | commit 5fdd40a, production build, `next start` on port 3102 |
| Environment | Lighthouse 13.6 mobile default (simulated slow 4G, 4x CPU), Chrome stable, localhost production build, 3 runs. |
| Status | OPEN |

## Steps
1. `pnpm build && pnpm start --port 3102`.
2. Run Lighthouse mobile 3 times on `http://localhost:3102/`.

## Expected
LCP < 2.5 s (CLAUDE.md section 8, ci-spec, go/no-go G-5), 3-run median.

## Actual
Performance 97 / 95 / 97 (>= 90, pass). LCP 2.5 s / 2.6 s / 2.6 s: median 2.6 s, **over the 2.5 s limit**. CLS 0, TBT 10 to 150 ms, accessibility 100, best-practices 100, SEO 100. Two causes in the Lighthouse report:
1. **Redirect insight, est. 610 ms.** The HTML response carries `Accept-CH` and `Critical-CH: Sec-CH-Prefers-Color-Scheme`. Chrome restarts the first navigation when it sees Critical-CH, so every first visit pays one extra round trip. The header is not set in `src/` or `next.config.ts` (grep), so it comes from a dependency or the proxy; hritik to find the source and remove it.
2. **LCP image preload has no `fetchpriority=high`** (lcp-discovery-insight: priorityHinted false). The hero `<Image preload>` in `HeroBlock.tsx` should also pass `fetchPriority="high"`.
Note: lab numbers on a local server without Cloudflare; real staging numbers are the binding ones (hritik review of go/no-go).
