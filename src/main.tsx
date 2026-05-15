import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {ThemeProvider, BaseStyles} from '@primer/react'
import {App} from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider colorMode="light">
      <BaseStyles>
        <App />
      </BaseStyles>
    </ThemeProvider>
  </StrictMode>,
)
