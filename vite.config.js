import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

function amplifyOutputsPlugin() {
  return {
    name: 'amplify-outputs',
    resolveId(id) {
      if (id === 'virtual:amplify-outputs') return '\0virtual:amplify-outputs'
    },
    load(id) {
      if (id === '\0virtual:amplify-outputs') {
        try {
          const content = fs.readFileSync('./amplify_outputs.json', 'utf-8')
          return `export default ${content}`
        } catch {
          return `export default null`
        }
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), amplifyOutputsPlugin()],
  resolve: {
    dedupe: ['graphql'],
  },
  optimizeDeps: {
    include: ['graphql'],
  },
})
