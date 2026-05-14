import {describe, it, expect, vi, beforeEach} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {NudgeBanner} from '../NudgeBanner'

const defaultProps = {
  icon: <span data-testid="icon">★</span>,
  title: 'Get started with our CLI',
  description: 'Install our CLI for faster iteration.',
  ctaTitle: 'Read the docs',
  ctaHref: 'https://example.com/docs',
  dismissPath: '/in-product-messaging/dismiss?notice=cli_dashboard_nudge',
  analytics: {
    category: 'cli_dashboard_nudge',
    group: 'growth',
    location: 'dashboard',
    ctaAction: 'read_docs',
  },
  testSelector: 'cli-dashboard-nudge',
}

describe('NudgeBanner', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ok: true} as Response),
    )
  })

  it('renders the title, description, and CTA', () => {
    render(<NudgeBanner {...defaultProps} />)
    expect(screen.getByRole('heading', {level: 2, name: /get started with our cli/i})).toBeInTheDocument()
    expect(screen.getByText(/install our cli/i)).toBeInTheDocument()
    expect(screen.getByRole('link', {name: /read the docs/i})).toHaveAttribute(
      'href',
      'https://example.com/docs',
    )
  })

  it('posts to dismissPath and hides the banner when dismiss is clicked', async () => {
    const user = userEvent.setup()
    render(<NudgeBanner {...defaultProps} />)

    await user.click(screen.getByRole('button', {name: /dismiss/i}))

    expect(fetch).toHaveBeenCalledWith(
      defaultProps.dismissPath,
      expect.objectContaining({method: 'POST'}),
    )
    expect(
      screen.queryByRole('heading', {level: 2, name: /get started with our cli/i}),
    ).not.toBeInTheDocument()
  })
})
