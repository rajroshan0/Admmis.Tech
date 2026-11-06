# Device and Browser Matrix

Owner: rajaros · Task: T-801 · Version: v0.1 · 2026-11-06 · Reviewer: hritik
Rule from role brief: 2 budget Android phones + 1 iPhone, viewport 360 px, plus desktop browsers. Real devices are `TODO(roshan)` (purchase or loan needs his approval, CLAUDE.md §3).

## 1. Nepal market reasoning (sources, checked 2026-11-06)

| Fact | Source | Note |
|---|---|---|
| Mobile OS share in Nepal, Sep 2026: Android 75.07 %, iOS 24.93 % (Aug 2026: 74.39 / 25.6; May-Jul 2026 Android 73.7-75.5 %) | StatCounter Global Stats, https://gs.statcounter.com/os-market-share/mobile/nepal (figures as returned by search on 2026-11-06; I could not open the page to confirm) | Web-traffic share, not sales. iOS is about a quarter, so iPhone Safari is a must-test, and WebKit is in CI |
| Xiaomi was almost 27 % of mobile vendor traffic share in Nepal, March 2024 | Statista citing StatCounter, https://statista.com/statistics/938750/nepal-market-share-of-leading-mobile-brands (via search summary 2026-11-06; paywalled detail not read) | Latest vendor figure I found. No 2025-26 Nepal vendor data found |
| IDC Q1 2020: Xiaomi 30.9 %, Samsung 18.6 %, Vivo 12.3 %, Oppo 10.0 %, Lava 5.3 % (shipments) | https://www.gadgetbytenepal.com/xiaomi-number-one-smartphone-brand-nepal-q1-2020/ and https://www.nepalitelecom.com/2020/05/xiaomi-becomes-the-number-one-smartphone-brand-in-nepal.html (search summary 2026-11-06) | Old (2020). Shows brand mix; order may have changed |
| Realme about 14 % of Nepal smartphone market, Q3 2021, behind Samsung and Xiaomi | GadgetByte Nepal (search summary 2026-11-06), https://gadgetbytenepal.com/cat/mobiles/ for the listing | Old (2021) |
| Buyers skew to affordable and mid-range phones; Redmi Note 8 and Redmi 8 were Xiaomi's top sellers in 2020 | same sources | Supports a budget Redmi and Samsung A-series as test devices |

Conclusions:
1. Android is about three quarters of mobile traffic; most of it is Xiaomi/Redmi, Samsung, Realme, Vivo, Oppo in the budget and mid tier. ESTIMATE: the typical visitor phone is a 3-4 GB RAM, Chrome, Android 12-14 device with a mid-tier MediaTek chip.
2. iOS about a quarter: Safari on a recent iPhone is a must. WebKit in CI catches most Safari-only issues but not all (viewport units, keyboard, sticky bars).
3. Network: Nepal 4G is variable and many users are on mobile data. Test profiles in §4. (No Nepal speed source cited; profile numbers are Chrome/Lighthouse defaults, not Nepal measurements.)
4. Opening-event traffic is phone traffic from QR codes and social links, often on venue Wi-Fi or congested mobile data.
5. Please do not rely on the old brand shares for purchases; Roshan or the team should check current Nepal shop listings before buying.

## 2. Physical test devices (to be supplied)

| ID | Device (proposed) | Why | Spec target (ESTIMATE) | Status |
|---|---|---|---|---|
| A1 | **Xiaomi Redmi 13C or a Redmi A-series** (any current entry Redmi sold in Nepal) | Xiaomi/Redmi is the top brand in every Nepal source above; entry model = the worst case we must pass | 4 GB RAM or less, Helio G-class or Snapdragon 4-series, Android 13-14, Chrome stable, 720 x 1600 (~360 x 800 CSS px) | TODO(roshan): confirm model on sale in Nepal and approve purchase/loan |
| A2 | **Samsung Galaxy A0x/A1x series** (e.g. A05, A15) or **realme C-series** | Samsung is consistently #1-2; second brand family catches OEM browser quirks; Samsung Internet is preinstalled | 3-4 GB RAM, Android 13-14, Chrome + Samsung Internet | TODO(roshan) |
| I1 | **iPhone SE (2nd/3rd gen) or iPhone 11-13** | Smallest common iPhone screen (375 x 667 on SE) plus Safari quirks | latest iOS reachable for the model | TODO(roshan) |
| X1 | Old low-end Android (Android 9-10, 2 GB RAM) if any exists in the team | stress test for the long tail | - | optional |

Until real devices exist: Chrome DevTools emulation (Moto G Power/Pixel 5 profile at 360 x 800, 4x CPU slowdown) and Playwright device profiles. Emulation does not reproduce memory pressure, GPU limits or real keyboards, so it cannot close the go/no-go device criterion (go-no-go G-12). Cloud devices (BrowserStack/LambdaTest) need a paid account: TODO(roshan) approval, fallback only.

## 3. Browser and viewport matrix

| Browser | Version | Platform | Where | Depth |
|---|---|---|---|---|
| Chrome | stable | Android (A1, A2) | manual | full pass (home, pricing, rent, contact form, event, one service, one case, blog, legal, consent) |
| Samsung Internet | stable | Android (A2) | manual | smoke |
| Safari | latest iOS on I1 | iPhone | manual | full pass |
| Chrome | stable | Windows/macOS | manual + Playwright Chromium | full |
| Edge | stable | Windows | manual | smoke (shares Chromium) |
| Firefox | stable | desktop | manual | smoke + forms + consent |
| Safari | latest macOS | macOS | Playwright WebKit (CI) + manual smoke | forms, sticky elements |
| Chrome, Safari | previous major | desktop | optional | only if analytics shows share (post-launch) |

Support policy (ASSUMPTION, Hritik to confirm): last 2 major versions of Chrome/Edge/Firefox/Safari, Android 9+ on Chrome, iOS 16+. Layout must work without JS for content (progressive enhancement); forms need JS (Turnstile) and show fallback phone/WhatsApp when JS fails. TODO(sudip/pm): check analytics after launch and adjust.

Viewports for automated and manual checks: 320 x 640 (reflow check), **360 x 800 (primary)**, 390 x 844 (iPhone), 768 x 1024 (tablet), 1280 x 800, 1440 x 900, 1920 x 1080. Landscape phone for sticky bar and menu. Orientation change must not break the layout.

## 4. Network and CPU profiles

| Profile | Settings | Use |
|---|---|---|
| Lighthouse mobile default (CI) | Slow 4G simulated (~1.6 Mbps down, 150 ms RTT), 4x CPU | budget gate |
| Fast 3G stress | 1.6 Mbps down / 750 kbps up / 300 ms RTT in Chrome DevTools "Fast 3G" | page must be usable, form must submit and retry |
| Offline mid-submit | disconnect after click | data kept, fallback shown |
| Real mobile data | SIM on the test phone, in Nepal if possible | TODO(roshan) |
| Data saver on, reduced motion on, dark mode on (if the brand has it) | OS settings | spot checks |

## 5. Device log (filled during week 7)
Stored in this file below, one row per run: date, device ID, browser, build/URL, network, page, LCP (s), CLS, jank notes, result, bug IDs.

| Date | Device | Browser | Build | Network | Page | LCP | CLS | Notes | Result | Bugs |
|---|---|---|---|---|---|---|---|---|---|---|

## 6. Real-device pass script (per device)
1. Load home on first visit with cache cleared: banner shown, LCP image paints, no layout jump, no horizontal scroll.
2. Scroll the full page: no jank in hero animation, sticky bar does not cover content, text readable without zoom.
3. Open menu with touch: opens/closes, focus and back-button behave, tap targets not mis-hit.
4. Pricing: toggle currency, values correct, table readable at 360 px.
5. Contact form: fill with on-screen keyboard (fields not hidden), `autocomplete` and numeric keypad for phone, submit success, thank-you page; repeat in airplane mode (failure path and fallback), then retry.
6. Tap phone and WhatsApp links: correct apps open with the right number.
7. Consent: accept, reject, re-open from `/cookies`.
8. Share/QR flow for the event page: scan QR code printed on paper, page loads under 3 s on venue-like network.
9. Rotate to landscape, zoom text to 200 %, enable TalkBack/VoiceOver for the contact form.
10. Record results in §5 and bugs in `qa/bugs.md`.
