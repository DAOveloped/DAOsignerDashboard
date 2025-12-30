import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    proxy: {
      // Proxy Printify API requests to bypass CORS during development
      '/api/printify': {
        target: 'https://api.printify.com/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/printify/, ''),
        headers: {
          'User-Agent': 'DAOsigner-Apparel/1.0',
        },
      },
    },
  },
})
