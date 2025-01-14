import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8089', // 目标服务器地址
        changeOrigin: true, // 是否改变请求的源头
      },
      '/pic':{
        target: 'http://localhost:8089',
        changeOrigin: true,
      },
        "/image":{
          target: 'http://localhost:8089',
          changeOrigin: true,
        }
    }
  }
})