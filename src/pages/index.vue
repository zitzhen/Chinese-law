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
            <li><a href="#">关于我们</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <section class="search-section">
      <div class="container">
        <div class="search-box">
          <h2>查询中国现行法律法规</h2>
          <input
            v-model="keyword"
            type="text"
            class="search-input"
            placeholder="输入法律名称、关键词或条文内容..."
            @keyup.enter="search"
          >
          <button class="search-btn" @click="search">搜索</button>
        </div>
      </div>
    </section>

    <main class="container main-content">
      <section class="law-categories">
        <div class="category-card">
          <div class="category-header">宪法及相关法</div>
          <ul class="category-list">
            <li><NuxtLink :to="lawLink('中华人民共和国宪法')">中华人民共和国宪法</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国立法法')">立法法</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国选举法')">选举法</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国国旗法')">国旗法</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国国徽法')">国徽法</NuxtLink></li>
          </ul>
        </div>

        <div class="category-card">
          <div class="category-header">民法商法</div>
          <ul class="category-list">
            <li><NuxtLink :to="lawLink('中华人民共和国民法典')">民法典</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国公司法')">公司法</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国商标法')">商标法</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国专利法')">专利法</NuxtLink></li>
          </ul>
        </div>

        <div class="category-card">
          <div class="category-header">行政法</div>
          <ul class="category-list">
            <li><NuxtLink :to="lawLink('中华人民共和国行政处罚法')">行政处罚法</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国行政许可法')">行政许可法</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国行政复议法')">行政复议法</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国公务员法')">公务员法</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国治安管理处罚法')">治安管理处罚法</NuxtLink></li>
          </ul>
        </div>

        <div class="category-card">
          <div class="category-header">经济法</div>
          <ul class="category-list">
            <li><NuxtLink :to="lawLink('中华人民共和国反垄断法')">反垄断法</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国消费者权益保护法')">消费者权益保护法</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国税收征收管理法')">税法</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国银行业监督管理法')">银行法</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国证券法')">证券法</NuxtLink></li>
          </ul>
        </div>

        <div class="category-card">
          <div class="category-header">社会法</div>
          <ul class="category-list">
            <li><NuxtLink :to="lawLink('中华人民共和国劳动法')">劳动法</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国劳动合同法')">劳动合同法</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国社会保险法')">社会保险法</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国未成年人保护法')">未成年人保护法</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国妇女权益保障法')">妇女权益保障法</NuxtLink></li>
          </ul>
        </div>

        <div class="category-card">
          <div class="category-header">刑法</div>
          <ul class="category-list">
            <li><NuxtLink :to="lawLink('中华人民共和国刑法')">中华人民共和国刑法</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国反洗钱法')">反洗钱法</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国国家安全法')">国家安全法</NuxtLink></li>
          </ul>
        </div>

        <div class="category-card">
          <div class="category-header">诉讼与非诉讼程序法</div>
          <ul class="category-list">
            <li><NuxtLink :to="lawLink('中华人民共和国刑事诉讼法')">刑事诉讼法</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国民事诉讼法')">民事诉讼法</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国行政诉讼法')">行政诉讼法</NuxtLink></li>
            <li><NuxtLink :to="lawLink('中华人民共和国仲裁法')">仲裁法</NuxtLink></li>
          </ul>
        </div>
      </section>

      <section class="recent-updates">
        <h3 class="section-title">最新法律法规更新</h3>
        <ul class="update-list">
          <li>
            <p>暂无数据</p>
          </li>
        </ul>
      </section>
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
        <p class="copyright">© 2025 ZIT小圳创科工作室·中国现行法律查询系统 版权所有 </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const router = useRouter()
const keyword = ref('')
const lawLink = (name) => `/law/${encodeURIComponent(name)}`

const search = () => {
  router.push({ path: '/all-law', query: { keyword: keyword.value.trim() } })
}
</script>

<style>
@import '@/resource/style/style.css';
</style>
