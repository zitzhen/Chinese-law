<template>
  <div>
    <header>
      <div class="container header-content">
        <div class="logo">
          <h1>ZIT小圳创科工作室·中国现行法律查询系统</h1>
        </div>
        <nav>
          <ul>
            <li><a href="/">首页</a></li>
            <li><a href="/all-law">法律法规</a></li>
            <li><a href="#">司法解释</a></li>
            <li><a href="#">法律动态</a></li>
            <li><a href="#">关于我们</a></li>
          </ul>
        </nav>
      </div>
    </header>
    
    <main class="container">
      <div class="breadcrumb">
        <a href="/">首页</a> > <a href="/all-law">法律法规</a> > <span>全部法律</span>
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
              <option value="宪法">宪法</option>
              <option value="民法">民法</option>
              <option value="刑法">刑法</option>
              <option value="行政法">行政法</option>
              <option value="经济法">经济法</option>
              <option value="社会法">社会法</option>
              <option value="诉讼法">诉讼法</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="search-keyword">关键词</label>
            <input type="text" id="search-keyword" placeholder="输入法律名称或关键词" v-model="filters.keyword">
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
            <tr v-else-if="filteredLaws.length === 0">
              <td colspan="6" class="text-center">暂无数据</td>
            </tr>
            <tr v-for="law in filteredLaws" :key="law.name">
              <td>
                <a href="#" class="law-name">{{ law.name }}</a>
              </td>
              <td>{{ law.date_of_enactment }}</td>
              <td>{{ law.date_of_implementation }}</td>
              <td>{{ law.reference_number }}</td>
              <td><span class="law-status status-valid">{{ law.Timeliness }}</span></td>
              <td><a href="#">查看</a></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- 简单分页 -->
      <div class="pagination" v-if="filteredLaws.length > 0">
        <div class="page-item">
          <a href="#" class="page-link" @click.prevent="prevPage" :class="{ disabled: currentPage === 1 }">
            <i class="fas fa-angle-left"></i>
          </a>
        </div>
        <div class="page-item" v-for="page in totalPages" :key="page">
          <a href="#" class="page-link" :class="{ 'page-active': page === currentPage }" @click.prevent="goToPage(page)">
            {{ page }}
          </a>
        </div>
        <div class="page-item">
          <a href="#" class="page-link" @click.prevent="nextPage" :class="{ disabled: currentPage === totalPages }">
            <i class="fas fa-angle-right"></i>
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

<script>
import { ref, reactive, computed, onMounted } from 'vue'

export default {
  name: 'AllLaw',
  setup() {
    // 响应式数据
    const laws = ref([])
    const loading = ref(true)
    const currentPage = ref(1)
    const itemsPerPage = ref(10)
    
    // 筛选条件
    const filters = reactive({
      type: '',
      keyword: '',
      status: ''
    })
    
    // 计算属性 - 过滤后的法律列表
    const filteredLaws = computed(() => {
      let result = laws.value
      
      // 根据关键词筛选
      if (filters.keyword) {
        result = result.filter(law => 
          law.name.includes(filters.keyword)
        )
      }
      
      // 根据状态筛选
      if (filters.status) {
        result = result.filter(law => 
          law.Timeliness.includes(filters.status)
        )
      }
      
      return result
    })
    
    // 计算属性 - 总页数
    const totalPages = computed(() => {
      return Math.ceil(filteredLaws.value.length / itemsPerPage.value)
    })
    
    // 计算属性 - 当前页的法律列表
    const paginatedLaws = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      const end = start + itemsPerPage.value
      return filteredLaws.value.slice(start, end)
    })
    
    // 方法 - 重置筛选条件
    const resetFilters = () => {
      filters.type = ''
      filters.keyword = ''
      filters.status = ''
    }
    
    // 方法 - 应用筛选条件
    const applyFilters = () => {
      // 筛选逻辑已经在 computed 中实现
      // 这里可以添加其他需要的操作
      currentPage.value = 1
    }
    
    // 方法 - 上一页
    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }
    
    // 方法 - 下一页
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }
    
    // 方法 - 跳转到指定页
    const goToPage = (page) => {
      currentPage.value = page
    }
    
    // 方法 - 获取法律列表
    const fetchLaws = async () => {
      try {
        loading.value = true
        // 这里使用 GitHub API 获取法律列表
        const response = await fetch('https://api.github.com/repos/zitzhen/Chinese-law/contents/law')
        
        if (!response.ok) {
          throw new Error(`GitHub API请求失败: ${response.status}`)
        }
        
        const contents = await response.json()
        
        // 过滤出文件夹并获取法律信息
        const folders = contents.filter(item => item.type === 'dir')
        
        // 获取每个法律文件夹中的 information.json
        const lawPromises = folders.map(async folder => {
          try {
            const infoResponse = await fetch(`https://api.github.com/repos/zitzhen/Chinese-law/contents/${folder.path}/information.json`)
            if (infoResponse.ok) {
              const infoData = await infoResponse.json()
              // 正确解码 base64 内容
              const infoContent = atob(infoData.content)
              const lawInfo = JSON.parse(infoContent)
              
              // 从文件夹名称中提取法律名称
              const name = folder.name
              
              return {
                name,
                ...lawInfo
              }
            }
            return null
          } catch (error) {
            console.error(`获取 ${folder.name} 信息失败:`, error)
            return null
          }
        })
        
        const lawResults = await Promise.all(lawPromises)
        laws.value = lawResults.filter(law => law !== null)
      } catch (error) {
        console.error('获取法律列表出错:', error)
      } finally {
        loading.value = false
      }
    }
    
    // 组件挂载时获取数据
    onMounted(() => {
      fetchLaws()
    })
    
    return {
      laws,
      loading,
      currentPage,
      filters,
      filteredLaws: paginatedLaws, // 使用分页后的数据
      totalPages,
      resetFilters,
      applyFilters,
      prevPage,
      nextPage,
      goToPage
    }
  }
}
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