// 为了兼容旧文件，只加载这个文件的页面。
// 因为这个脚本其他内容移动到LastExecution.js 中
// CNZZ 跟踪事件

(function (i, s, o, g, a, m) {
    a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://s11.cnzz.com/z_stat.php?id=1256504745&web_id=1256504745');


var _czc = _czc || [];
_czc.push(["_setAccount", "1256504745"]);

// CNZZ 事件
// category, action 必填， 其他选填
function cnzzEvent(category, action, label, value, nodeid) {
    if (typeof (label) === "undefined" || label === null) label = "";
    if (typeof (value) === "undefined" || value === null) value = 0;
    if (typeof (nodeid) === "undefined" || nodeid === null) nodeid = "";
    _czc.push(["_trackEvent", category, action, label, value, nodeid]);
}

(function (i) {
    i.onload = function () {
        var hasFind = false;
        var scriptFiles = document.getElementsByTagName("script");
        for (var i = 0; i < scriptFiles.length; i++) {
            if (/LastExecution\.js/ig.test(scriptFiles[i].src)) {
                hasFind = true;
                break;
            }
        }
        if (!hasFind) {
            var script = document.createElement("script");
            script.setAttribute("id", "tea7_dynaload_" + Math.ceil(Math.random() * 100000));
            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", "/scripts/action/LastExecution.js?var=" + new Date().getTime());
            var head = document.getElementsByTagName('body').item(0);
            head.appendChild(script);
        }
    }
})(window);