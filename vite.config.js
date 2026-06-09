import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Modern Rolldown chunk-splitting configuration
        advancedChunks: {
          groups: [
            {
              name: 'react-vendor',
              test: /\/node_modules\/(react|react-dom|react-router-dom)\//,
            },
            {
              name: 'supabase-vendor',
              test: /\/node_modules\/@supabase\/supabase-js\//,
            },
            {
              name: 'map-vendor',
              test: /\/node_modules\/(leaflet|react-leaflet)\//,
            },
            {
              name: 'store-vendor',
              test: /\/node_modules\/zustand\//,
            }
          ]
        }
      },
    },
  },
})

