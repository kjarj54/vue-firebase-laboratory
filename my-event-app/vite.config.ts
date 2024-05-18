import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
 
export default defineConfig({
  plugins: [vue()],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      "Cross-Origin-Resource-Policy": "cross-origin",
      'Cross-Origin-Embedder-Policy': 'require-corp',
      "Permissions-Policy": "geolocation=(self), microphone=()"
    }
  }
})
