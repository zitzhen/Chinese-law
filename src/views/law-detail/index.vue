<template>
  <div>
    <div v-if="loading" class="progress-container">
      <div class="progress-bar"></div>
    </div>

    <header>
      <div class="container header-content">
        <div class="logo">
          <h1>ZIT小圳创科工作室·中国现行法律查询系统</h1>
        </div>
        <nav>
          <ul>
            <li><RouterLink to="/">首页</RouterLink></li>
            <li><RouterLink to="/all-law">法律法规</RouterLink></li>
            <li><a href="#">司法解释</a></li>
            <li><a href="#">法律动态</a></li>
            <li><a href="#">关于我们</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="container">
      <div class="breadcrumb">
        <RouterLink to="/">首页</RouterLink> &gt;
        <RouterLink to="/all-law">法律法规</RouterLink> &gt;
        <span>{{ lawName }}</span>
      </div>

      <div v-if="!law" class="notifications-container">
        <div class="error-alert">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" class="error-svg">
                <path clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" fill-rule="evenodd"></path>
              </svg>
            </div>
            <div class="error-prompt-container">
              <p class="error-prompt-heading">发生了错误</p>
              <div class="error-prompt-wrap">
                <ul class="error-prompt-list" role="list">
                  <li>未找到对应法律，请返回法律法规列表重新选择。</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="law-detail-container">
        <article class="law-main-content">
          <h2 class="law-title">{{ law.name }}</h2>
          <div class="law-meta">
            <div class="meta-item"><span class="meta-icon">日</span>颁布日期：{{ law.date_of_enactment }}</div>
            <div class="meta-item"><span class="meta-icon">行</span>实施日期：{{ law.date_of_implementation }}</div>
            <div class="meta-item"><span class="meta-icon">级</span>效力级别：{{ law.potency_level }}</div>
            <div class="meta-item"><span class="meta-icon">态</span>时效性：{{ law.Timeliness }}</div>
          </div>
          <div class="markdown-body" v-html="content"></div>
        </article>

        <aside class="law-sidebar">
          <div class="sidebar-card">
            <h3 class="sidebar-title">同类法律</h3>
            <ul class="related-laws" v-if="relatedLaws.length">
              <li v-for="item in relatedLaws" :key="item.name">
                <RouterLink :to="{ name: 'LawDetail', params: { name: item.name } }">{{ item.shortName }}</RouterLink>
              </li>
            </ul>
            <p v-else>暂无</p>
          </div>

          <div class="sidebar-card">
            <h3 class="sidebar-title">下载文档</h3>
            <p>下载本法律全文：</p>
            <a v-if="law.pdfUrl" :href="law.pdfUrl" download class="download-btn">PDF版本下载</a>
            <a v-if="law.docxUrl" :href="law.docxUrl" download class="download-btn">DOCX版本下载</a>
          </div>
        </aside>
      </div>
    </main>

    <footer>
      <div class="container">
        <div class="footer-links">
          <a href="#">关于我们</a>
          <a href="#">联系方式</a>
          <a href="#">网站地图</a>
          <a href="#">法律声明</a>
          <a href="#">帮助中心</a>
        </div>
        <p class="copyright">2025 ZIT小圳创科工作室·中国现行法律查询系统 版权所有</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getLawByName, getLawMarkdown, getRelatedLaws } from '@/data/laws'
import { renderMarkdown } from '@/utils/markdown'

export default {
  name: 'LawDetail',
  setup() {
    const route = useRoute()
    const loading = ref(true)
    const markdown = ref('')

    const lawName = computed(() => route.params.name || '')
    const law = computed(() => getLawByName(lawName.value))
    const content = computed(() => renderMarkdown(markdown.value))
    const relatedLaws = computed(() => getRelatedLaws(lawName.value))

    watch(
      lawName,
      async (name) => {
        loading.value = true
        markdown.value = await getLawMarkdown(name)
        loading.value = false
      },
      { immediate: true }
    )

    return {
      lawName,
      law,
      content,
      relatedLaws,
      loading
    }
  }
}
</script>

<style>
@import '@/resource/style/law-detail/style.css';
</style>
