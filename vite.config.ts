import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base:"./",
  plugins: [vue()],
  server:{
    proxy:{
      '/static': {
        target: 'https://djgo.cc',
        changeOrigin: true,
      }
    }
  }
})
