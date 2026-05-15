import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({command}) => ({
  plugins: [react()],
  // Served at https://chiedo.github.io/interview-react-nudge-banner/ in production.
  base: command === 'build' ? '/interview-react-nudge-banner/' : '/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    css: false,
    // Primer ships .css imports inside its published modules; Vitest only
    // transforms inlined deps with `css: false`, so inline Primer so its CSS
    // imports are no-op'd instead of bubbling up as "Unknown file extension".
    server: {
      deps: {
        inline: [/@primer\/react/],
      },
    },
  },
}))
