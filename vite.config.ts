// ABOUTME: Vite configuration with PWA support.
// ABOUTME: Enables installable web app with offline caching.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.svg', 'icon-512.svg'],
      manifest: {
        name: 'Liars Todo',
        short_name: 'Liars',
        description: 'A todo app that lies about due dates for your own good',
        theme_color: '#1f2937',
        background_color: '#f3f4f6',
        display: 'standalone',
        icons: [
          {
            src: 'icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      },
      workbox: {
        // Import the push handler into the generated SW
        importScripts: ['sw-push.js'],
      },
    })
  ],
})
