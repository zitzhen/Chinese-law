<template>
    <body>
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
    
    <main class="container">
        <div class="breadcrumb">
            <a href="#">首页</a> &gt; <a href="#">法律法规</a> &gt; <span>收入相关法律</span>
        </div>
        
        <div class="page-header">
            <h2>收入相关法律法规</h2>
            <p>收录中国现行有效的与个人及企业收入相关的法律、法规及规范性文件</p>
        </div>
        <!--
        
        <div class="filter-section">
            <div class="filter-grid">
                <div class="filter-group">
                    <label for="law-type">法律类型</label>
                    <select id="law-type">
                        <option value="">全部类型</option>
                        <option value="tax">税法</option>
                        <option value="labor">劳动法</option>
                        <option value="social">社会保险</option>
                        <option value="other">其他</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="effective-date">生效日期</label>
                    <select id="effective-date">
                        <option value="">全部时间</option>
                        <option value="2020">2020年后</option>
                        <option value="2010">2010-2020年</option>
                        <option value="2000">2000-2010年</option>
                        <option value="1990">1990-2000年</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="search-keyword">关键词</label>
                    <input type="text" id="search-keyword" placeholder="输入法律名称或关键词">
                </div>
                <div class="filter-group">
                    <label for="effectiveness">效力状态</label>
                    <select id="effectiveness">
                        <option value="">全部状态</option>
                        <option value="valid">现行有效</option>
                        <option value="partial">部分有效</option>
                        <option value="invalid">已废止</option>
                    </select>
                </div>
            </div>
            <div class="filter-actions">
                <button class="btn btn-secondary">重置</button>
                <button class="btn btn-primary">筛选</button>
            </div>
        </div>
        -->

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
                <tbody id="legal_page">
                    <!--在此插入-->
                    <p>请稍后，我们正在处理</p>
                </tbody>
            </table>
        </div>
        
        <!--
        <div class="pagination">
            <div class="page-item">
                <a href="#" class="page-link"><i class="fas fa-angle-left"></i></a>
            </div>
            <div class="page-item">
                <a href="#" class="page-link page-active">1</a>
            </div>
            <div class="page-item">
                <a href="#" class="page-link">2</a>
            </div>
            <div class="page-item">
                <a href="#" class="page-link">3</a>
            </div>
            <div class="page-item">
                <a href="#" class="page-link">4</a>
            </div>
            <div class="page-item">
                <a href="#" class="page-link">5</a>
            </div>
            <div class="page-item">
                <a href="#" class="page-link"><i class="fas fa-angle-right"></i></a>
            </div>
        </div>
    -->

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
            <p class="copyright">© 2023 中国现行法律查询系统 版权所有 | 主管单位：中华人民共和国司法部</p>
        </div>
    </footer>
</body>
</template>