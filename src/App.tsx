import {NudgeBanner} from './NudgeBanner'

const SparkleIcon = () => (
  <svg viewBox="0 0 16 16" width="20" height="20" aria-hidden="true">
    <path
      fill="currentColor"
      d="M7.53 1.282a.5.5 0 0 1 .94 0l1.17 3.244a.5.5 0 0 0 .329.329l3.244 1.17a.5.5 0 0 1 0 .94l-3.244 1.17a.5.5 0 0 0-.329.329l-1.17 3.244a.5.5 0 0 1-.94 0L6.36 8.464a.5.5 0 0 0-.329-.329l-3.244-1.17a.5.5 0 0 1 0-.94l3.244-1.17a.5.5 0 0 0 .329-.329Z"
    />
  </svg>
)

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
        icon={<SparkleIcon />}
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
