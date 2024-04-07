import { defineConfig } from 'vite'
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
  }
})
