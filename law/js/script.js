const law_detail_container =document.getElementById("law_detail_container");
const law_main_content = document.getElementById("law_main_content");
const error_ms_1 = document.getElementById("error_ms_1");
const error_windows =document.getElementById("error_windows");
const name_url = document.getElementById("name_url");
const Loading = document.getElementById("Loading");

function new_error(ms){
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


//获取URL参数
const urlParams = new URLSearchParams(window.location.search);
let filename = urlParams.get('name'); 
if (!filename){
    const pathMatch = window.location.pathname.match(/\/law\/([^\/\?]+)/);
    if (pathMatch && pathMatch[1]) {
        filename = decodeURIComponent(pathMatch[1]);
    }
    else{
        new_error("路径或参数不正确");
    }
}
if(filename == 'index.html' || filename == 'name' || filename == ':name'){
    new_error("路径或参数不正确");
}
console.log("文件名：", filename);
name_url.textContent = filename;
fetchMarkdown(`${filename}/README.md`)