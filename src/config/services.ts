// Allowlist of service keys for the lead form (leads.md §2.1). Keep in step with published services;
// an unknown key is rejected, `other` is always allowed. ASSUMPTION: final list from sudip/pm sitemap.
export const SERVICE_KEYS = [
  'web-development',
  'mobile-apps',
  'custom-software',
  'ai-agents',
  'qa-testing',
  'digital-marketing',
  'team-rental',
  'other',
] as const
