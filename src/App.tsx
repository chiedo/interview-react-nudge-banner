import {SparkleIcon} from '@primer/octicons-react'
import {NudgeBanner} from './NudgeBanner'

export function App() {
  return (
    <main
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
        padding: 24,
        maxWidth: 880,
        margin: '0 auto',
      }}
    >
      <h1 style={{fontSize: 18, marginBottom: 16}}>Dashboard</h1>

      <NudgeBanner
        icon={<SparkleIcon size={20} />}
        title="Get started with our CLI"
        description="Install our CLI to plan, switch models, and run things in parallel."
        ctaTitle="Read the docs"
        ctaHref="https://example.com/docs"
        dismissPath="/in-product-messaging/dismiss?notice=cli_dashboard_nudge"
        analytics={{
          category: 'cli_dashboard_nudge',
          group: 'growth',
          location: 'dashboard',
          ctaAction: 'read_docs',
        }}
        testSelector="cli-dashboard-nudge"
      />

      <p style={{marginTop: 32, color: '#57606a', fontSize: 14}}>
        Open <code>TASK.md</code> in the repo root for the interview prompt.
      </p>
    </main>
  )
}
