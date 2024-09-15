import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@tailwindcss/forms" as forms;\n@apply forms\:border-radius-md;'
      }
    }
  },
  optimizeDeps: {
    include: ['tailwindcss', 'autoprefixer']
  }
})
