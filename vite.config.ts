import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/webcontainer-font-carrier-demo/',
  base: process.env.NODE_ENV === 'production' ? '/webcontainer-font-carrier-demo/' : '/',
  publicDir: '/webcontainer-font-carrier-demo/',
  plugins: [react()],
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
})
