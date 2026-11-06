export const dynamic = 'force-dynamic'

// Liveness for Docker and uptime checks. No DB call on purpose: a DB outage must not restart the app.
export function GET() {
  return Response.json({ status: 'ok', sha: process.env.BUILD_SHA || 'dev' })
}
