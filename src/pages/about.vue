<template>
  <div>
    <header>
      <div class="container header-content">
        <div class="logo">
          <h1>ZIT小圳创科工作室·中国现行法律查询系统</h1>
        </div>
        <nav>
          <ul>
            <li><NuxtLink to="/">首页</NuxtLink></li>
            <li><NuxtLink to="/all-law">法律法规</NuxtLink></li>
            <li><a href="#">司法解释</a></li>
            <li><a href="#">法律动态</a></li>
            <li><NuxtLink to="/about">关于我们</NuxtLink></li>
          </ul>
        </nav>
      </div>
    </header>

    <main>
      <section class="about-hero">
        <div class="container about-hero-content">
          <div>
            <p class="about-eyebrow">关于 ZIT-Chinese-law</p>
            <h2>让现行法律查询更清晰、更稳定、更便捷</h2>
            <p class="about-hero-text">
              中国现行法律查询系统由 ZIT小圳创科工作室维护，面向公众提供法律名称检索、分类浏览、正文阅读与原始文档下载入口。
            </p>
          </div>
          <div class="about-stat-panel" aria-label="项目收录概况">
            <div>
              <strong>{{ laws.length }}</strong>
              <span>已收录法律</span>
            </div>
            <div>
              <strong>{{ activeCategoryCount }}</strong>
              <span>分类索引</span>
            </div>
            <div>
              <strong>2025</strong>
              <span>公开维护</span>
            </div>
          </div>
        </div>
      </section>

      <section class="container about-section">
        <div class="about-intro">
          <p>
            我们希望把分散的法律文本整理成更适合网页阅读和检索的形式。项目中的法律资料主要来自中华人民共和国政府网及相关政府网站，整理时以尊重原文为前提，尽量只做结构化、排版和索引工作。
          </p>
          <p>
            本站内容用于学习、研究和一般信息查询。法律具有时效性和适用条件，涉及具体权利义务、诉讼、合规或交易安排时，请以官方公布文本为准，并咨询具备资质的专业人士。
          </p>
        </div>

        <div class="about-grid">
          <article class="about-card">
            <span class="about-icon">源</span>
            <h3>资料来源清楚</h3>
            <p>优先依据政府公开渠道整理法律文本，并保留 PDF、DOCX 等原始文档下载入口，方便交叉核对。</p>
          </article>
          <article class="about-card">
            <span class="about-icon">索</span>
            <h3>检索路径直接</h3>
            <p>围绕法律名称、简称、发文字号、效力级别和分类建立索引，减少查找常用法律时的跳转成本。</p>
          </article>
          <article class="about-card">
            <span class="about-icon">稳</span>
            <h3>持续维护更新</h3>
            <p>项目仍在持续收录和校对中；发现文本错误、失效链接或法律状态变化时，欢迎反馈。</p>
          </article>
        </div>
      </section>

      <section class="about-band">
        <div class="container about-band-content">
          <div>
            <h3>我们如何处理法律文本</h3>
            <p>尽量保持法律正文不被改写，只对标题、段落、下载地址和基础信息进行网页化组织。</p>
          </div>
          <ul class="about-check-list">
            <li>不主动解释或替用户推导法律结论</li>
            <li>不以本站页面替代官方公布版本</li>
            <li>不将自动整理结果作为唯一依据</li>
          </ul>
        </div>
      </section>

      <section class="container about-section">
        <div class="about-two-column">
          <div>
            <h3 class="about-section-title">反馈与协作</h3>
            <p>
              如果你发现法律文本与官方版本不一致、页面下载失效、分类不准确，或希望补充尚未收录的法律，可以通过项目仓库提交 issue 或 pull request。
            </p>
          </div>
          <div class="about-action-box">
            <p>项目仓库</p>
            <a href="https://github.com/zitzhen/Chinese-law" target="_blank" rel="noopener noreferrer">
              github.com/zitzhen/Chinese-law
            </a>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div class="container">
        <div class="footer-links">
          <NuxtLink to="/about">关于我们</NuxtLink>
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

<script setup>
import { computed } from 'vue'
import { laws } from '@/data/laws'

useHead({
  title: '关于我们 - 中国现行法律查询系统',
  meta: [
    {
      name: 'description',
      content: '了解 ZIT小圳创科工作室·中国现行法律查询系统的项目定位、资料来源、维护原则和反馈方式。'
    }
  ]
})

const activeCategoryCount = computed(() => {
  return new Set(laws.map((law) => law.category)).size
})
</script>

<style>
@import '@/resource/style/style.css';

.about-hero {
  background: linear-gradient(135deg, var(--primary-dark), var(--primary-color));
  color: white;
  padding: 56px 0;
}

.about-hero-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 40px;
  align-items: center;
}

.about-eyebrow {
  font-size: 0.95rem;
  opacity: 0.9;
  margin-bottom: 12px;
}

.about-hero h2 {
  font-size: 2.3rem;
  line-height: 1.25;
  margin-bottom: 18px;
}

.about-hero-text {
  max-width: 720px;
  font-size: 1.08rem;
  line-height: 1.9;
  opacity: 0.95;
}

.about-stat-panel {
  display: grid;
  gap: 1px;
  overflow: hidden;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.24);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.16);
}

.about-stat-panel div {
  padding: 22px;
  background: rgba(255, 255, 255, 0.12);
}

.about-stat-panel strong {
  display: block;
  font-size: 2rem;
  line-height: 1;
}

.about-stat-panel span {
  display: block;
  margin-top: 8px;
  opacity: 0.9;
}

.about-section {
  padding: 42px 0;
}

.about-intro {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
  margin-bottom: 28px;
}

.about-intro p,
.about-two-column p,
.about-band p {
  color: var(--text-color);
  line-height: 1.9;
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.about-card {
  background: white;
  border-radius: 6px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.about-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  margin-bottom: 16px;
  border-radius: 50%;
  background: #f8e7e5;
  color: var(--primary-color);
  font-weight: bold;
}

.about-card h3 {
  color: var(--primary-dark);
  margin-bottom: 10px;
}

.about-card p {
  color: var(--light-text);
  line-height: 1.8;
}

.about-band {
  background: white;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.about-band-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  gap: 32px;
  align-items: center;
  padding: 36px 0;
}

.about-band h3,
.about-section-title {
  color: var(--primary-color);
  font-size: 1.45rem;
  margin-bottom: 14px;
}

.about-check-list {
  list-style: none;
  display: grid;
  gap: 12px;
}

.about-check-list li {
  padding-left: 28px;
  position: relative;
  color: var(--text-color);
}

.about-check-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #2e7d32;
  font-weight: bold;
}

.about-two-column {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 32px;
  align-items: center;
}

.about-action-box {
  background: white;
  border-left: 4px solid var(--primary-color);
  border-radius: 6px;
  padding: 22px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.about-action-box p {
  color: var(--light-text);
  margin-bottom: 8px;
}

.about-action-box a {
  color: var(--primary-dark);
  font-weight: bold;
  text-decoration: none;
  word-break: break-all;
}

.about-action-box a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .about-hero-content,
  .about-intro,
  .about-grid,
  .about-band-content,
  .about-two-column {
    grid-template-columns: 1fr;
  }

  .about-hero {
    padding: 38px 0;
  }

  .about-hero h2 {
    font-size: 1.8rem;
  }
}
</style>
