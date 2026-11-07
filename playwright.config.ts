import { defineConfig, devices } from '@playwright/test'

// Runs against the PRODUCTION build (`pnpm build` first), never `next dev`.
// Port 3000 may belong to another app on a dev machine: set E2E_PORT=3102 (or any free port) locally.
// E2E_CHANNEL=chrome uses the installed Google Chrome when Playwright's own browsers are not installed.
const PORT = process.env.E2E_PORT ?? '3000'
const baseURL = process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`
const channel = process.env.E2E_CHANNEL || undefined

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: { baseURL, trace: 'retain-on-failure' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], channel } },
    // WebKit stands in for iOS Safari; it is not real iOS (qa/device-matrix.md keeps one real iPhone check).
    ...(process.env.E2E_WEBKIT === '0' ? [] : [{ name: 'webkit', use: { ...devices['Desktop Safari'] } }]),
  ],
  // No server when E2E_BASE_URL points at staging.
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: `pnpm start --port ${PORT}`,
        url: `http://localhost:${PORT}/`,
        reuseExistingServer: process.env.E2E_REUSE === '1',
        timeout: 60_000,
      },
})
