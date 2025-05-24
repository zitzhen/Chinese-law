const law_detail_container =document.getElementById("law_detail_container");
const law_main_content = document.getElementById("law_main_content");
const error_ms_1 = document.getElementById("error_ms_1");
const error_windows =document.getElementById("error_windows");
const name_url = document.getElementById("name_url");
const Loading = document.getElementById("Loading");
const law_content = document.getElementById("law_content");
const law_name =document.getElementById("law_name");
const pdf_download=document.getElementById("pdf_download");
const md_download =document.getElementById("md_download");
const promulgate = document.getElementById("promulgate")
if(!law_detail_container ||!law_main_content||!error_ms_1||!error_windows||!name_url||!Loading||!law_content||!law_name||!pdf_download||!md_download){
    console.error("获取元素其一失败");
}

function new_error(ms){
    console.error("触发错误");
    law_detail_container.style.display = 'none';
    error_windows.style.display = 'block';
    error_ms_1.textContent = ms;
    Loading.style.display = 'none';
}

async function fetchMarkdown(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const markdownContent = await response.text();
    return markdownContent;
  } catch (error) {
    console.error('Error fetching markdown:', error);
    return null;
  }
}


async function main() {
    const urlParams = new URLSearchParams(window.location.search);
    let filename = urlParams.get('name'); 
    if (!filename){
        const pathMatch = window.location.pathname.match(/\/law\/([^\/\?]+)/);
        if (pathMatch && pathMatch[1]) {
            filename = decodeURIComponent(pathMatch[1]);
        }
        else{
            new_error("路径或参数不正确");
            return;
        }
    }
    if(filename == 'index.html' || filename == 'name' || filename == ':name'){
        new_error("路径或参数不正确");
        return;
    }
    console.log("文件名：", filename);
    name_url.textContent = filename;

    const filemarkdown = await fetchMarkdown(`${filename}/README.md`);
    console.log(filemarkdown);
    if (filemarkdown) {
        const filelaw = marked.parse(filemarkdown);
        law_name.textContent = filename;
        console.log(filelaw);
        law_detail_container.style.display = 'flex';
        law_content.innerHTML = filelaw;
        pdf_download.href = window.location.hostname+`/${filename}/${filename}.pdf`
        md_download.href = window.location.hostname+`/${filename}/README.md`
        Loading.style.display = 'none';
    } else {
        new_error("未能加载文件内容");
    }
}

main();