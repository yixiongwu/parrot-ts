import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mockDevServerPlugin({
      prefix: ['/api'],
      include: ['mock/**/*.mock.{js,ts,cjs,mjs,json,json5}']
    })
  ]
})
