import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      }
    })
  ],
  resolve: {
    alias: {
      type: "/src/types",
      state: "/src/state",
      utilities: "/src/utilities",
      components: "/src/components",
      contexts: "/src/contexts",
      test: "/src/test"
    },
  },
  server: {
    open: true,
    port: 8080,
  },
  build: {
    commonjsOptions: { transformMixedEsModules: true }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/test/**',
        'src/index.tsx',
        'src/reportWebVitals.ts'
      ],
      thresholds: {
        // v8 counts branches/statements slightly differently than the
        // istanbul provider Jest used, hence the lower bar than before
        branches: 99,
        functions: 100,
        lines: 100,
        statements: 99.8
      }
    }
  }
})
