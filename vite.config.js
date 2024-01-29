import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // build: {
  //   optimize: false, // Disable optimization
  // },
  plugins: [react()],
})


