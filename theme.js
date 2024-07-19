// 主题默认加载时进行的行为
// js代码加载后立即执行
(function () {
    // const body = document.getElementsByTagName("body")[0];
    // 读取配置文件或生成配置文件
    getSettings();
    addThemeToolBar();
    // str = showElementSettings(settings);
    // var str = "main/load/store/";
    // console.log(settings);
    // body.setAttribute("vslite", str);
    // 使用[vslite*=main/]读取
})();

// 更换主题时移除修改内容
window.destroyTheme = () => {
    const body = document.getElementsByTagName("body")[0];
    body.removeAttribute("vslite");
    // 移除主题按钮
    document.querySelector("#vscleToolbar").remove();
};

/**
 * 默认配置文件
 */
const defaultConf = {
    "theme": {
        "codeBlock": true,
        "reference": true,
        "bazaar": true,
        "embeddedBlock": true,
        "title": true
    },
    "plugins": {
        "shortcutPanel": true,
        "mathPanel": false
    }
};

/** 
 * * 定义需要用到的api
 * * 从[Savor](https://github.com/royc01/notion-theme/blob/main/theme.js)抄的
 * * 来自[思源api文档](https://github.com/siyuan-note/siyuan/blob/master/API_zh_CN.md)
 * TODO: 完成所需的所有api写入
 */
/**
 * @Feature 向思源请求数据
 * @param url 请求url
 * @param data 请求数据(json encode)
 */
async function _rqFORSiyuan(url, data) {
    const response = await fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            Authorization: `Token ''`
        }
    });
    if (response.status === 200)
        return await response.json();
    else
        return null;
}

/**
 * @Description 
 * @Feature 解析思源的响应
 * @param response
 * @return data or null
 */
async function _analyseResponse(response) {
    let r = await response;
    return r.code === 0 ? r.data : null;
}

/** 
 * @Feature 获取文件
 * @param path 文件路径
 * @param then then?
 * @param obj obj?
 */
async function _getFile(path, then = null, obj = null) {
    let url = '/api/file/getFile';
    await _rqFORSiyuan(url, {
        path: path
    }).then((v) => {
        if (then)
            then(v, obj);
    });
}

/**
 * @Description 根据路径获取人类可读路径
 * @Feature 
 * @param noteBook 笔记本id
 * @param path 路径
 * @return 
 */
async function _getReadablePath(noteBook, path) {
    let url = '/api/filetree/getHPathByPath';
    await _rqFORSiyuan(url, {
        notebook: noteBook,
        path: path
    });
}

/**
 * @Feature 写入文件
 * @param path 文件路径
 * @param filedata 文件数据
 * @param then then?
 * @param obj obj?
 * @param isDir 是否是路径
 * @param modTime 修改时间
*/
async function _writeFile(path, filedata, then = null, obj = null, isDir = false, modTime = Date.now()) {
    let blob = new Blob([filedata]);
    let file = new File([blob], path.split('/').pop());
    let formdata = new FormData();
    formdata.append("path", path);
    formdata.append("file", file);
    formdata.append("isDir", isDir);
    formdata.append("modTime", modTime);
    await fetch("/api/file/putFile", {
        body: formdata,
        method: 'POST',
        headers: {
            Authorization: `Token ""`
        }
    }).then((v) => {
        if (then)
            then(obj);
    }, 200);
}

async function getSettings() {
    // var res = _analyseResponse(_getFile("/data/snippets/vsc_edit.config.json"));
    _getFile("/data/snippets/vsc_edit.config.json", (v) => {
        if (v == null) {
            v = defaultConf;
            putSettings(v);
        }
        // console.log(v);
        // return v;
        var str = showElementSettings(v);
        document.getElementsByTagName("body")[0].setAttribute("vslite", str);
    });
}

async function putSettings(settings) {
    _writeFile("/data/snippets/vsc_edit.config.json", JSON.stringify(settings), null, null, false, Date.now());
}

/**
 * 得到思源toolbar
 * @returns 
 */
function getSiYuanToolbar() {
    return document.getElementById("toolbar");
}

/**
 * 得到vscode-lite-edit-Toolbar
 * @returns 
 */
function getvscleToolbar() {
    return document.getElementById("vscleToolbar");
}

/**简单判断目前思源是否是pc窗口模式 */
function isPcWindow() {
    return document.body.classList.contains("body--window");
}

/**简单判断目前思源是否是手机模式 */
function isPhone() {
    return document.getElementById("editor");
}

/**
 * 向指定父级创建追加一个子元素，并可选添加ID,
 * @param {Element} fatherElement 
 * @param {string} addElementTxt 要创建添加的元素标签
 * @param {string} setId 
 * @returns addElementObject
 */
function addinsertCreateElement(fatherElement, addElementTxt, setId = null) {
    if (!fatherElement) console.error("指定元素对象不存在！");
    if (!addElementTxt) console.error("未指定字符串！");
    var element = document.createElement(addElementTxt);
    if (setId) element.id = setId;
    fatherElement.appendChild(element);
    return element;
}

/**
 * 向指定元素后创建插入一个元素，可选添加ID
 * @param {Element} targetElement 目标元素
 * @param {String} addElementTxt 要创建添加的元素标签
 * @param {String} setId 为创建元素设置ID
 */
function insertCreateAfter(targetElement, addElementTxt, setId = null) {
    if (!targetElement) console.error("指定元素对象不存在！");
    if (!addElementTxt) console.error("未指定字符串！");
    var element = document.createElement(addElementTxt);
    if (setId) element.id = setId;
    var parent = targetElement.parentNode;//得到父节点
    if (parent.lastChild === targetElement) {
        //如果最后一个子节点是当前元素那么直接添加即可
        parent.appendChild(element);
        return element;
    } else {
        parent.insertBefore(element, targetElement.nextSibling);//否则，当前节点的下一个节点之前添加
        return element;
    }
}

/**
 * 向指定元素前创建插入一个元素，可选添加ID
 * @param {*} targetElement 目标元素
 * @param {*} addElementTxt 要创建添加的元素标签
 * @param {*} setId 为创建元素设置ID
 */
function insertCreateBefore(targetElement, addElementTxt, setId = null) {
    if (!targetElement) console.error("指定元素对象不存在！");
    if (!addElementTxt) console.error("未指定字符串！");
    var element = document.createElement(addElementTxt);
    if (setId) element.id = setId;
    targetElement.parentElement.insertBefore(element, targetElement);
    return element;
}

/**
 * @Description 创建工具栏的按钮
 * @Feature 
 */
function addThemeToolBar() {
    var vscToolBar = getvscleToolbar();
    if (vscToolBar == null) {
        var toolbarVIP = document.getElementById("toolbarVIP");
        var windowControls = document.getElementById("windowControls");
        vscToolBar = document.createElement("div");
        vscToolBar.id = "vscleToolbar";
        vscToolBar.setAttribute("class", "toolbar__item ariaLabel");
        vscToolBar.setAttribute("aria-label", "VSClite主题设置");
        vscToolBar.setAttribute("style", "width=23.5px;height=23.5px");
        if (toolbarVIP == null) {
            windowControls.parentElement.insertBefore(vscToolBar, windowControls);
        } else {
            toolbarVIP.parentElement.insertBefore(vscToolBar, toolbarVIP);
        }
    }
    vscToolBar.innerHTML = "VC";
    // vscToolBar.innerHTML = "<img src=\"resources\\h6.bmp\"\\>";
    vscToolBar.addEventListener("click", (event) => {
        // window.open(_getFile("conf/appearance/themes/siyuan-vscodelite-edit/resources/settings.html"));
        // window.screenX = event.screenX;
        // window.screenY = event.screenY;
        alert("抱歉，暂时无法打开配置文件。请打开工作空间下的/data/snippets/vsc_edit.config.json文件编辑并重新加载思源");
        var re = confirm("是否要重置配置文件?Reset configuration file?");
        if (re == true) {
            v = defaultConf;
            putSettings(v);
            alert("重置配置文件成功.Successfully reset configuration file.");
        } else {

        }
    });
}

/**
 * @Description 根据设置显示不同的主题
 * @Feature 
 * @param settings
 * @return 
 */
function showElementSettings(settings) {
    var str = "";
    // 代码块
    if (settings["theme"]["codeBlock"]) {
        str += "cb/";
    }
    // 引用
    if (settings["theme"]["reference"]) {
        str += "ref/";
    }
    // 集市
    if (settings["theme"]["bazaar"]) {
        str += "bazaar/";
    }
    // 嵌入块
    if (settings["theme"]["embeddedBlock"]) {
        str += "embed/";
    }
    // 标题
    if (settings["theme"]["title"]) {
        str += "ttH/";
    }
    // 快捷键面板
    if (settings["plugins"]["shortcutPanel"]) {
        str += "scPanel/";
    }
    return str;
}