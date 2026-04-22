export default defineNuxtConfig({
  compatibilityDate: '2026-04-22',
  devtools: { enabled: true },
  srcDir: 'src/',
  app: {
    head: {
      title: 'ZIT小圳创科工作室·中国现行法律查询系统',
      meta: [
        {
          name: 'description',
          content: '中国现行法律查询系统，提供法律法规检索、法律详情阅读与文档下载。'
        }
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
    }
  },
  routeRules: {
    '/law/**': { prerender: false }
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 1000,
        ignored: ['**/dist/**', '**/law/**/*.pdf', '**/law/**/*.docx']
      }
    }
  }
})
