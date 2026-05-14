import {type ReactNode, useState} from 'react'
import styles from './NudgeBanner.module.css'

export interface NudgeBannerAnalytics {
  category: string
  group: string
  location: string
  ctaAction: string
}

export interface NudgeBannerProps {
  icon: ReactNode
  title: string
  description: string
  ctaTitle?: string
  ctaHref?: string
  dismissPath: string
  analytics: NudgeBannerAnalytics
  testSelector: string
}

const XIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"
    />
  </svg>
)

function buildAnalyticsLabel(analytics: NudgeBannerAnalytics): string {
  return `group:${analytics.group};location:${analytics.location}`
}

export function NudgeBanner({
  icon,
  title,
  description,
  ctaTitle,
  ctaHref,
  dismissPath,
  analytics,
  testSelector,
}: NudgeBannerProps) {
  const [hidden, setHidden] = useState(false)

  const handleDismiss = async () => {
    try {
      await fetch(dismissPath, {method: 'POST'})
    } catch {
      // Silently handle network errors to maintain good UX.
    } finally {
      setHidden(true)
    }
  }

  if (hidden) {
    return null
  }

  return (
    <div
      className={styles.nudgeBox}
      data-test-selector={testSelector}
      data-analytics-visible={JSON.stringify({
        category: analytics.category,
        action: 'visible',
        label: buildAnalyticsLabel(analytics),
      })}
    >
      <div className={styles.iconWrapper} aria-hidden="true">
        {icon}
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>

      {ctaTitle && ctaHref && (
        <a
          href={ctaHref}
          className={styles.cta}
          data-analytics-event={JSON.stringify({
            category: analytics.category,
            action: analytics.ctaAction,
            label: buildAnalyticsLabel(analytics),
          })}
        >
          {ctaTitle}
        </a>
      )}

      <button
        type="button"
        className={styles.dismiss}
        aria-label="Dismiss"
        onClick={handleDismiss}
        data-analytics-event={JSON.stringify({
          category: analytics.category,
          action: 'dismiss',
          label: buildAnalyticsLabel(analytics),
        })}
      >
        <XIcon />
      </button>
    </div>
  )
}
