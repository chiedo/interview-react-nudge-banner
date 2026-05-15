import {type ReactElement, type ReactNode} from 'react'
import {render as rtlRender, type RenderOptions} from '@testing-library/react'
import {BaseStyles, ThemeProvider} from '@primer/react'

function Providers({children}: {children: ReactNode}) {
  return (
    <ThemeProvider colorMode="light">
      <BaseStyles>{children}</BaseStyles>
    </ThemeProvider>
  )
}

/**
 * Wraps `@testing-library/react`'s `render` so Primer components have a
 * `ThemeProvider` + `BaseStyles` context. Import this instead of from
 * `@testing-library/react` directly in tests.
 */
export function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return rtlRender(ui, {wrapper: Providers, ...options})
}

export * from '@testing-library/react'
