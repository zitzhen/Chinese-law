<template>
  <div>
    <header>
      <div class="container header-content">
        <div class="logo">
          <h1>ZIT小圳创科工作室·中国现行法律查询系统</h1>
        </div>
        <nav>
          <ul>
            <li><a href="#">首页</a></li>
            <li><a href="#">法律法规</a></li>
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
          <input type="text" class="search-input" placeholder="输入法律名称、关键词或条文内容...">
          <button class="search-btn">搜索</button>
        </div>
      </div>
    </section>
    
    <main class="container main-content">
      <section class="law-categories">
        <div class="category-card">
          <div class="category-header">宪法及相关法</div>
          <ul class="category-list">
            <li><a href="law/中华人民共和国宪法/">中华人民共和国宪法</a></li>
            <li><a href="law/中华人民共和国立法法/">立法法</a></li>
            <li><a href="law/中华人民共和国选举法/">选举法</a></li>
            <li><a href="law/中华人民共和国国旗法/">国旗法</a></li>
            <li><a href="law/中华人民共和国国徽法/">国徽法</a></li>
          </ul>
        </div>
        
        <div class="category-card">
          <div class="category-header">民法商法</div>
          <ul class="category-list">
            <li><a href="law/中华人民共和国民法典/">民法典</a></li>
            <li><a href="law/中华人民共和国公司法/">公司法</a></li>
            <li><a href="law/中华人民共和国商标法/">商标法</a></li>
            <li><a href="law/中华人民共和国专利法/">专利法</a></li>
          </ul>
        </div>
        
        <div class="category-card">
          <div class="category-header">行政法</div>
          <ul class="category-list">
            <li><a href="law/中华人民共和国行政处罚法/">行政处罚法</a></li>
            <li><a href="law/中华人民共和国行政许可法/">行政许可法</a></li>
            <li><a href="law/中华人民共和国行政复议法/">行政复议法</a></li>
            <li><a href="law/中华人民共和国公务员法/">公务员法</a></li>
            <li><a href="law/中华人民共和国治安管理处罚法/">治安管理处罚法</a></li>
          </ul>
        </div>
        
        <div class="category-card">
          <div class="category-header">经济法</div>
          <ul class="category-list">
            <li><a href="law/中华人民共和国反垄断法/">反垄断法</a></li>
            <li><a href="law/中华人民共和国消费者权益保护法/">消费者权益保护法</a></li>
            <li><a href="law/中华人民共和国税收征收管理法/">税法</a></li>
            <li><a href="law/中华人民共和国银行业监督管理法/">银行法</a></li>
            <li><a href="law/中华人民共和国证券法/">证券法</a></li>
          </ul>
        </div>
        
        <div class="category-card">
          <div class="category-header">社会法</div>
          <ul class="category-list">
            <li><a href="law/中华人民共和国劳动法/">劳动法</a></li>
            <li><a href="law/中华人民共和国劳动合同法/">劳动合同法</a></li>
            <li><a href="law/中华人民共和国社会保险法/">社会保险法</a></li>
            <li><a href="law/中华人民共和国未成年人保护法/">未成年人保护法</a></li>
            <li><a href="law/中华人民共和国妇女权益保障法/">妇女权益保障法</a></li>
          </ul>
        </div>
        
        <div class="category-card">
          <div class="category-header">刑法</div>
          <ul class="category-list">
            <li><a href="law/中华人民共和国刑法/">中华人民共和国刑法</a></li>
            <li><a href="law/中华人民共和国反洗钱法/">反洗钱法</a></li>
            <li><a href="law/中华人民共和国国家安全法/">国家安全法</a></li>
          </ul>
        </div>
        
        <div class="category-card">
          <div class="category-header">诉讼与非诉讼程序法</div>
          <ul class="category-list">
            <li><a href="law/中华人民共和国刑事诉讼法/">刑事诉讼法</a></li>
            <li><a href="law/中华人民共和国民事诉讼法/">民事诉讼法</a></li>
            <li><a href="law/中华人民共和国行政诉讼法/">行政诉讼法</a></li>
            <li><a href="law/中华人民共和国仲裁法/">仲裁法</a></li>
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

<script>
export default {
  name: 'Home'
}
</script>