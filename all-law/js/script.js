const legal_page = document.getElementById("legal_page");

function add_law(name,date_of_enactment,reference_number,Timeliness){
    legal_page.innerHTML +=`
                    <tr>
                        <td>
                            <a href="#" class="law-name">${name}</a>
                        </td>
                        <td>${date_of_enactment}<td>
                        <td>${date_of_implementation}</td>
                        <td>${reference_number}</td>
                        <td><span class="law-status status-valid">${Timeliness}</span></td>
                        <td><a href="#">查看</a></td>
                    </tr>`
}

async function getGitHubFolderList(owner, repo, path = '') {
    const apiUrl = `https://api.github.com/repos/zitzhen/Chinese-law/contents/law`;
    
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`GitHub API请求失败: ${response.status}`);
        }
        
        const contents = await response.json();
        
        // 过滤出文件夹
        const folders = contents.filter(item => item.type === 'dir');
        
        return folders;
    } catch (error) {
        console.error('获取文件夹列表出错:', error);
        return [];
    }
}

// 使用示例
getGitHubFolderList('octocat', 'Hello-World')
    .then(folders => {
        console.log('文件夹列表:', folders);
    });