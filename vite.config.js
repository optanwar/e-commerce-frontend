import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // allows access via local network IP
    port: 5173, // (optional) choose your port
    proxy: {
      '/api': 'http://localhost:4000'
    }
  },
  plugins: [react()],
   optimizeDeps: {
    include: ['@stripe/stripe-js'],
  },
})
