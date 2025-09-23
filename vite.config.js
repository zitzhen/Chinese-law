import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  root: '.',  // 项目根目录
  build: {
    outDir: 'dist',  // 输出目录
    assetsDir: 'assets',  // 静态资源目录
  },
  server: {
    open: true,  // 开发服务器启动时自动打开浏览器
    port: 3000,  // 开发服务器端口
  },
  resolve: {
    alias: {
      '@': '/src',  // 路径别名
    },
  },
})