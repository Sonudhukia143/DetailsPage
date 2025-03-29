import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://details-page-dusky.vercel.app/',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
//https://bank-website-23d3.vercel.app/