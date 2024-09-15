// 主题默认加载时进行的行为
// js代码加载后立即执行
(function () {
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

/**
 * @Feature 发送消息
 * @param type 消息类型
 * @param message 消息内容
 * @param time 持续时间
 */
async function _postMessage(type, message, time = null) {
    if (type == "ok") url = "/api/notification/pushMsg";
    else if (type == "error") url = "api/notification/pushErrMsg";
    if (time) await _rqFORSiyuan(url, { "msg": message, "timeout": time });
    else await _rqFORSiyuan(url, { "msg": message });
}

async function getSettings() {
    // var res = _analyseResponse(_getFile("/data/snippets/vsc_edit.config.json"));
    await _getFile("/data/snippets/vsc_edit.config.json", (v) => {
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
    if (settings == null) {
        return;
    }
    await _writeFile("/data/snippets/vsc_edit.config.json", JSON.stringify(settings), null, null, false, Date.now());
}

/**
 * 得到vscode-lite-edit-Toolbar
 * @returns 
 */
function getvscleToolbar() {
    return document.getElementById("vscleToolbar");
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
        // 调用函数创建设置窗口
        createSettingsWindow();
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

// 创建一个包含标签和复选框的 HTML 结构
async function createSettingsWindow() {
    // 创建设置窗口大框
    const dialogSetting = document.createElement('div');
    dialogSetting.setAttribute("data-key", "dialog-setting");
    dialogSetting.classList = "b3-dialog--open";
    document.body.appendChild(dialogSetting);

    // 创建一个遮罩层
    const dialog = document.createElement('div');
    dialog.classList = "b3-dialog";
    dialog.style.zIndex = '14';
    dialogSetting.appendChild(dialog);

    // 可关闭遮罩层
    const scrim = document.createElement('div');
    scrim.classList = "b3-dialog__scrim";
    scrim.onclick = () => {
        closeNotSave();
    };
    dialog.appendChild(scrim);

    // 创建窗口容器
    const dialogContainer = document.createElement('div');
    dialogContainer.classList = "b3-dialog__container";
    dialogContainer.style.width = '60vw';
    dialogContainer.style.height = '60vh';
    dialogContainer.style.maxWidth = '1280px';
    dialog.appendChild(dialogContainer);

    // 创建设置窗口
    const dialogBody = document.createElement('div');
    dialogBody.classList = 'b3-dialog__body';
    dialogBody.setAttribute("vslite", "SettingPanel");
    dialogContainer.appendChild(dialogBody);


    // 创建标题
    const title = document.createElement('h2');
    title.textContent = 'VSCode Lite Edit设置';
    title.setAttribute("data-subtype", "h2");
    // title.setAttribute("data-type", "NodeHeading");
    title.classList = "h2";
    dialogBody.appendChild(title);

    // 获取设置文件数组
    async function fetchSettingsArray() {
        let re;
        await _getFile("/data/snippets/vsc_edit.config.json", async (v) => {
            // console.log(v);
            if (v == null) {
                v = defaultConf;
            }
            // return v;
            re = await getSettingArrays(v);
        });
        // console.log(re);
        return re;

        async function getSettingArrays(v) {
            let settings = [];
            if (v["theme"]["codeBlock"] == true) {
                settings.push({ label: '代码块样式', id: 'codeBlock', enable: true });
            } else {
                settings.push({ label: '代码块样式', id: 'codeBlock', enable: false });
            }
            // 引用
            if (v["theme"]["reference"] == true) {
                settings.push({ label: '引用块样式', id: 'referenceBlock', enable: true });
            } else {
                settings.push({ label: '引用块样式', id: 'referenceBlock', enable: false });
            }
            // 集市
            if (v["theme"]["bazaar"] == true) {
                settings.push({ label: '集市样式', id: 'bazaarStyle', enable: true });
            } else {
                settings.push({ label: '集市样式', id: 'bazaarStyle', enable: false });
            }
            // 嵌入块
            if (v["theme"]["embeddedBlock"] == true) {
                settings.push({ label: '嵌入块样式', id: 'embeddedBlock', enable: true });
            } else {
                settings.push({ label: '嵌入块样式', id: 'embeddedBlock', enable: false });
            }
            // 标题
            if (v["theme"]["title"] == true) {
                settings.push({ label: '标题块样式', id: 'titleBlock', enable: true });
            } else {
                settings.push({ label: '标题块样式', id: 'titleBlock', enable: false });
            }
            // 快捷键面板
            if (v["plugins"]["shortcutPanel"] == true) {
                settings.push({ label: '（插件）快捷键面板样式', id: 'scPanelStyle', enable: true });
            } else {
                settings.push({ label: '（插件）快捷键面板样式', id: 'scPanelStyle', enable: false });
            }
            return settings;
        }
    }

    // 创建标签和复选框
    const settings = await fetchSettingsArray();
    // console.log(settings);

    // 遍历数组添加选项
    settings.forEach(setting => {
        const label = document.createElement('span');
        label.textContent = setting.label;
        label.htmlFor = setting.id;
        label.classList = "fn__flex-1";

        const space = document.createElement('span');
        space.classList = 'fn__space';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = setting.id;
        checkbox.checked = setting.enable;
        checkbox.classList = "b3-switch fn__flex-center vslite_sets";

        const div = document.createElement('label');
        div.classList = "fn__flex b3-label";
        div.appendChild(label);
        div.appendChild(space);
        div.appendChild(checkbox);

        dialogBody.appendChild(div);
    });

    async function closeAndSave() {
        saveSt = defaultConf;
        ckb = document.getElementsByClassName("vslite_sets");
        Array.from(ckb).forEach(checkbox => {
            const id = checkbox.id;
            const ck = checkbox.checked;
            if (id == "codeBlock") {
                saveSt["theme"]["codeBlock"] = ck;
            } else if (id == "referenceBlock") {
                saveSt["theme"]["reference"] = ck;
            } else if (id == "referenceBlock") {
                saveSt["theme"]["reference"] = ck;
            } else if (id == "bazaarStyle") {
                saveSt["theme"]["bazaar"] = ck;
            } else if (id == "embeddedBlock") {
                saveSt["theme"]["embeddedBlock"] = ck;
            } else if (id == "titleBlock") {
                saveSt["theme"]["title"] = ck;
            } else if (id == "scPanelStyle") {
                saveSt["plugins"]["shortcutPanel"] = ck;
            }
        });
        await putSettings(saveSt);
        _postMessage("ok", "配置保存成功，稍后自动刷新");
        setTimeout(() => { window.location.reload(); }, 2000);
        document.body.removeChild(dialogSetting);
    }
    function closeNotSave() {
        _postMessage("error", "配置未保存");
        document.body.removeChild(dialogSetting);
    }

    // 创建关闭按钮
    const saveButton = document.createElement('button');
    saveButton.textContent = '保存';
    saveButton.classList = "b3-button b3-button--outline fn__flex-center fn__size200";
    saveButton.onclick = () => {
        closeAndSave();
    };
    const notSaveButton = document.createElement('button');
    notSaveButton.textContent = '不保存';
    notSaveButton.classList = "b3-button b3-button--outline fn__flex-center fn__size200";
    notSaveButton.onclick = () => {
        closeNotSave();
    };
    const label = document.createElement('span');
    label.textContent = "直接关闭不保存哦，必须点击保存按钮";
    label.classList = "fn__flex-1";
    const space = document.createElement('span');
    space.classList = 'fn__space';
    const div = document.createElement('label');
    div.classList = "fn__flex b3-label";
    div.appendChild(label);
    div.appendChild(space);
    div.appendChild(saveButton);
    div.appendChild(space);
    div.appendChild(notSaveButton);
    dialogBody.appendChild(div);
}