import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/webcontainer-font-carrier-demo/',
  base: './',
  publicDir: '/webcontainer-font-carrier-demo/',
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: './public/coi.min.js',
          dest: './',
        },
      ],
    }),
  ],

  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
})
