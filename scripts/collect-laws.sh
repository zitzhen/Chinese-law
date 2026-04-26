#!/bin/bash
# law-bot 定时收录脚本 - 每周工作日检查并收录未收入的法律

WORKSPACE="/home/lawbot/.openclaw/workspace/Chinese-law"
TOKEN_SCRIPT="/root/token.js"
BRANCH_PREFIX="lawbot"

cd "$WORKSPACE" || exit 1

# 确保在 main 分支
git checkout main >/dev/null 2>&1
git pull >/dev/null 2>&1

# 获取当前已收录的法律列表
existing_laws=$(ls -1 law/ | grep -v -E "^(css|js|example)$" | sort)

echo "=== [$(date)] 开始检查未收录法律 ==="

# 通过 GitHub API 搜索 LawRefBook/Laws 中有但本地没有的法律
# 这个仓库结构: 分类目录/*.md
TOKEN=$(node "$TOKEN_SCRIPT")

# 获取 LawRefBook/Laws 的目录结构
api_response=$(curl -sL --max-time 15 \
  -H "Authorization: Bearer $TOKEN" \
  "https://api.github.com/repos/LawRefBook/Laws/contents/" 2>/dev/null)

# 解析 categories
categories=$(echo "$api_response" | python3 -c "
import sys, json
try:
    items = json.load(sys.stdin)
    for item in items:
        if item['type'] == 'dir':
            print(item['name'])
except: pass
" 2>/dev/null)

new_laws_added=0

for category in $categories; do
    # 获取该分类下的法律文件
    files=$(curl -sL --max-time 15 \
      -H "Authorization: Bearer $TOKEN" \
      "https://api.github.com/repos/LawRefBook/Laws/contents/$category" 2>/dev/null | \
      python3 -c "
import sys, json
try:
    items = json.load(sys.stdin)
    for item in items:
        if item['name'].endswith('.md'):
            print(item['name'])
except: pass
" 2>/dev/null)
    
    for file in $files; do
        # 提取法律名称
        law_name=$(echo "$file" | sed 's/\.md$//' | sed 's/(.*$//' | tr -d ' ')
        
        # 检查是否已存在
        if echo "$existing_laws" | grep -q "$law_name"; then
            continue
        fi
        
        # 跳过重复的
        if [ -d "law/$law_name" ]; then
            continue
        fi
        
        echo "发现新法律: $law_name"
        
        # 创建分支
        branch="${BRANCH_PREFIX}/add-$(echo $law_name | sed 's/[^[:alnum:]]//g')"
        git checkout -b "$branch" >/dev/null 2>&1
        
        # 下载法律内容
        encoded_path=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$category/$file'))")
        content=$(curl -sL --max-time 15 \
          -H "Authorization: Bearer $TOKEN" \
          "https://api.github.com/repos/LawRefBook/Laws/contents/$encoded_path" | \
          python3 -c "
import sys, json, base64
try:
    d = json.load(sys.stdin)
    print(base64.b64decode(d['content']).decode('utf-8'))
except: pass
" 2>/dev/null)
        
        if [ -z "$content" ]; then
            git checkout main >/dev/null 2>&1
            git branch -D "$branch" >/dev/null 2>&1
            continue
        fi
        
        # 提取法律名称(全称)
        full_name=$(echo "$file" | sed 's/.md$//' | sed 's/(.*$//')
        mkdir -p "law/$full_name"
        
        # 写入 README
        echo "$content" | sed '/<!-- INFO END -->/,$!d' | sed '1d' > "law/$full_name/README.md"
        
        # 创建 information.json (从文件名提取日期)
        date_info=$(echo "$file" | grep -oE '\([0-9]{4}-[0-9]{2}-[0-9]{2}\)')
        if [ -n "$date_info" ]; then
            enact_date=$(echo "$date_info" | tr -d '()' | sed 's/-/年/2' | sed 's/-/月/' | sed 's/$/日/')
            impl_date=$(echo "$enact_date" | sed 's/月/年/' | sed 's/月/月/')
        else
            enact_date="暂无"
            impl_date="暂无"
        fi
        
        cat > "law/$full_name/information.json" << EOF
{
    "date_of_enactment":"$enact_date",
    "date_of_implementation":"$impl_date",
    "potency_level":"法律",
    "Timeliness":"现行有效"
}
EOF
        
        # 提交
        git add "law/$full_name/"
        git commit -m "收录: $full_name" >/dev/null 2>&1
        
        # 推送
        GIT_ASKPASS="$WORKSPACE/scripts/git-token.sh" git push -u origin "$branch" >/dev/null 2>&1
        
        # 创建 PR
        pr_body="## 收录: $full_name\n\n- 来源: LawRefBook/Laws\n\n自动收录"
        curl -sL -X POST \
          -H "Authorization: Bearer $TOKEN" \
          -H "Content-Type: application/json" \
          -d "{\"title\":\"收录: $full_name\",\"head\":\"$branch\",\"base\":\"main\",\"body\":\"$pr_body\"}" \
          "https://api.github.com/repos/zitzhen/Chinese-law/pulls" >/dev/null 2>&1
        
        echo "  -> 已创建 PR for $full_name"
        new_laws_added=$((new_laws_added + 1))
        
        # 返回 main
        git checkout main >/dev/null 2>&1
        git branch -D "$branch" >/dev/null 2>&1
    done
done

echo "=== [$(date)] 完成，新增 $new_laws_added 部法律 ==="
