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

    <main class="container">
      <div class="breadcrumb">
        <NuxtLink to="/">首页</NuxtLink> &gt; <NuxtLink to="/all-law">法律法规</NuxtLink> &gt; <span>全部法律</span>
      </div>

      <div class="page-header">
        <h2>全部法律法规</h2>
        <p>收录中国现行有效的所有法律、法规及规范性文件</p>
      </div>

      <div class="filter-section">
        <div class="filter-grid">
          <div class="filter-group">
            <label for="law-type">法律类型</label>
            <select id="law-type" v-model="filters.type">
              <option value="">全部类型</option>
              <option v-for="category in lawCategories" :key="category" :value="category">{{ category }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="search-keyword">关键词</label>
            <input id="search-keyword" v-model="filters.keyword" type="text" placeholder="输入法律名称或关键词">
          </div>
          <div class="filter-group">
            <label for="effectiveness">效力状态</label>
            <select id="effectiveness" v-model="filters.status">
              <option value="">全部状态</option>
              <option value="实施">现行有效</option>
              <option value="部分有效">部分有效</option>
              <option value="已废止">已废止</option>
            </select>
          </div>
        </div>
        <div class="filter-actions">
          <button class="btn btn-secondary" @click="resetFilters">重置</button>
          <button class="btn btn-primary" @click="applyFilters">筛选</button>
        </div>
      </div>

      <div class="laws-list">
        <table class="law-table">
          <thead>
            <tr>
              <th width="30%">法律名称</th>
              <th width="15%">颁布日期</th>
              <th width="15%">实施日期</th>
              <th width="20%">发文字号</th>
              <th width="10%">效力状态</th>
              <th width="10%">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="6" class="text-center">加载中...</td>
            </tr>
            <tr v-else-if="paginatedLaws.length === 0">
              <td colspan="6" class="text-center">暂无数据</td>
            </tr>
            <tr v-for="law in paginatedLaws" :key="law.name">
              <td>
                <NuxtLink class="law-name" :to="lawLink(law.name)">{{ law.name }}</NuxtLink>
              </td>
              <td>{{ law.date_of_enactment }}</td>
              <td>{{ law.date_of_implementation }}</td>
              <td>{{ law.reference_number }}</td>
              <td><span class="law-status" :class="law.Timeliness.includes('废止') ? 'status-invalid' : 'status-valid'">{{ law.Timeliness }}</span></td>
              <td><NuxtLink :to="lawLink(law.name)">查看</NuxtLink></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="filteredLaws.length > 0" class="pagination">
        <div class="page-item">
          <a href="#" class="page-link" :class="{ disabled: currentPage === 1 }" @click.prevent="prevPage">
            &lt;
          </a>
        </div>
        <div v-for="page in visiblePages" :key="page" class="page-item">
          <a href="#" class="page-link" :class="{ 'page-active': page === currentPage }" @click.prevent="goToPage(page)">
            {{ page }}
          </a>
        </div>
        <div class="page-item">
          <a href="#" class="page-link" :class="{ disabled: currentPage === totalPages }" @click.prevent="nextPage">
            &gt;
          </a>
        </div>
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

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { laws as localLaws, lawCategories } from '@/data/laws'

useHead({
  title: '全部法律法规 - 中国现行法律查询系统'
})

const route = useRoute()
const laws = ref(localLaws)
const loading = ref(false)
const currentPage = ref(1)
const itemsPerPage = ref(10)
const lawLink = (name) => `/law/${encodeURIComponent(name)}`

const filters = reactive({
  type: '',
  keyword: '',
  status: ''
})

const filteredLaws = computed(() => {
  let result = laws.value

  if (filters.type) {
    result = result.filter((law) => law.category === filters.type)
  }

  if (filters.keyword) {
    const keyword = filters.keyword.trim()
    result = result.filter((law) =>
      [law.name, law.shortName, law.reference_number, law.potency_level]
        .some((field) => field.includes(keyword))
    )
  }

  if (filters.status) {
    result = result.filter((law) =>
      law.Timeliness.includes(filters.status)
    )
  }

  return result
})

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredLaws.value.length / itemsPerPage.value))
})

const paginatedLaws = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredLaws.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, start + 4)

  for (let page = start; page <= end; page += 1) {
    pages.push(page)
  }

  return pages
})

const resetFilters = () => {
  filters.type = ''
  filters.keyword = ''
  filters.status = ''
  currentPage.value = 1
}

const applyFilters = () => {
  currentPage.value = 1
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page) => {
  currentPage.value = page
}

watch(
  () => route.query.keyword,
  (keyword = '') => {
    filters.keyword = Array.isArray(keyword) ? keyword[0] || '' : keyword
    currentPage.value = 1
  },
  { immediate: true }
)
</script>

<style>
@import '@/resource/style/all-law/style.css';

.text-center {
  text-align: center;
}

.pagination .disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
