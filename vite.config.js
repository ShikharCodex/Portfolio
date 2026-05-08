import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

<<<<<<< HEAD


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
=======
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/gsap')) {
            return 'vendor-motion'
          }
        },
      },
    },
  },
>>>>>>> 4c49be3997eb32e141649200546dfc75e1d01f56
})
