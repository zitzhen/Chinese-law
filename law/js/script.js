const law_detail_container =document.getElementById("law_detail_container");
const law_main_content = document.getElementById("law_main_content");
const error_ms_1 = document.getElementById("error_ms_1");
const error_windows =document.getElementById("error_windows")

function new_error(ms){
    law_detail_container.style.display = 'none';
    error_windows.style.display = 'block';
    error_ms_1.textContent = ms;
}

//获取URL参数
const urlParams = new URLSearchParams(window.location.search);
const filename = urlParams.get('name');
if (!filename){
    const pathMatch = window.location.pathname.match(/\/law\/([^\/\?]+)/);
    if (pathMatch && pathMatch[1]) {
        filename = decodeURIComponent(pathMatch[1]);
    }
    else{
        new_error("路径或参数不正确");
    }
}
console.log("文件名：".filename)