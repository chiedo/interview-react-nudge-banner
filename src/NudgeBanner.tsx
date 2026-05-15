import {type ReactNode, useState} from 'react'
import {Heading, IconButton, LinkButton, Text} from '@primer/react'
import {XIcon} from '@primer/octicons-react'
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
        <Heading as="h2" className={styles.title}>
          {title}
        </Heading>
        <Text as="p" className={styles.description}>
          {description}
        </Text>
      </div>

      {ctaTitle && ctaHref && (
        <LinkButton
          href={ctaHref}
          size="small"
          className={styles.cta}
          data-analytics-event={JSON.stringify({
            category: analytics.category,
            action: analytics.ctaAction,
            label: buildAnalyticsLabel(analytics),
          })}
        >
          {ctaTitle}
        </LinkButton>
      )}

      <IconButton
        icon={XIcon}
        aria-label="Dismiss"
        variant="invisible"
        size="small"
        onClick={handleDismiss}
        className={styles.dismiss}
        data-analytics-event={JSON.stringify({
          category: analytics.category,
          action: 'dismiss',
          label: buildAnalyticsLabel(analytics),
        })}
      />
    </div>
  )
}
