/* 本脚本需要jquery 或者 zepto 支持 */
var isConfigWYQY = false;             //是否已经配置网易七鱼


/* 测试站给出提示 */
if (document.URL.toString().indexOf("http://www.tea7.com/scripts/action/mt.tea7.com") >= 0 || document.URL.toString().indexOf("http://www.tea7.com/scripts/action/test.tea7.com") >= 0) {
    $("body").append('<div class="test_site pc">温馨提示：此站点仅为测试使用, 点击前往<a href="index.html"/*tpa=http://www.tea7.com/index.html*/>茶七网正式站</a></div>');
    //document.body.innerHTML += '<div class="test_site pc">温馨提示：此站点仅为测试使用, 点击前往<a href="index.html"/*tpa=http://www.tea7.com/index.html*/>茶七网正式站</a></div>';
}

// 脚本发生错误提交给服务
window.onerror = function (errorInfo, url, errorLine) {
    if (errorInfo.length > 1
        && url !== undefined
        && url.length > 1
        && url !== "undefined") {
        $.ajax({
            url: "/API/Other/ScriptErrorLog", data: { content: errorInfo, url: url, line: errorLine }, type: "POST"
        });
    }
};

$("img").error(function () {
    $(this).attr("src", "default-image.gif"/*tpa=http://www.tea7.com/Themes/Mobile/images/default-image.gif*/);
});

var popCommomLogin = null;
LoadPopLoginScript(function () {
    if (typeof (LoginPop) !== "undefined") {
        popCommomLogin = new LoginPop({
            Title : "登录茶七网",
            Success: function (Id) {
                window.location.reload();
            }
        });
    }
});

// 加载模板
LoadPageModules();

//加载完茶七网辅助脚本完后处理
LoadTea7PageHelperScript(function () {

    // 写入客服的行为日志
    Tea7CustomerHelper.FootPrint();

    // 载入当前用户
    Tea7CustomerHelper.LoadCurrentCustomer(function (data) {
        Tea7ScriptHelper.LoadScript("https://qiyukf.com/script/6a77f3303cc98343582464c7494e6033.js", function () {
            // 七鱼
            if (typeof (ysf) !== "undefined"
                && typeof (data.OtherPlatformId) !== "undefined"
                && typeof (data.OtherPlatformName) !== "undefined") {
                ysf.config({
                    "uid": data.OtherPlatformId,
                    "data": JSON.stringify([
                        { "key": "real_name", "value": data.OtherPlatformName },
                        { "key": "mobile_phone", "hidden": true },
                        { "key": "email", "value": "" }
                        //,
                        //{ "index": 0, "key": "account", "label": "账号", "value": "zhangsan", "href": "http://example.domain/user/zhangsan" },
                        //{ "index": 1, "key": "sex", "label": "性别", "value": "先生" },
                        //{ "index": 5, "key": "reg_date", "label": "注册日期", "value": "2015-11-16" },
                        //{ "index": 6, "key": "last_login", "label": "上次登录时间", "value": "2015-12-22 15:38:54" }
                    ])
                });

            }
            isConfigWYQY = true;
        });
    }, function () {
        isConfigWYQY = true;
    });
});



//加载茶七网辅助脚本
function LoadTea7PageHelperScript(callback) {
    var hasFind = false;
    var scriptFiles = document.getElementsByTagName("script");
    for (var i = 0; i < scriptFiles.length; i++) {
        if (/tea7PageHelper\.js/ig.test(scriptFiles[i].src)) {
            if (typeof (callback) === "function") callback();
            hasFind = true;
            break;
        }
    }
    if (!hasFind) {
        var script = document.createElement("script");
        script.setAttribute("id", "tea7_dynaload_" + Math.ceil(Math.random() * 100000));
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", "/scripts/helper/tea7PageHelper.js?var=" + Math.ceil(Math.random() * 100000));
        script.onload = script.onreadystatechange = function () {
            if (script.readyState && script.readyState !== 'loaded' && script.readyState !== 'complete') {
                return;
            }
            script.onreadystatechange = script.onload = null;
            if (typeof (callback) === "function") callback();
        };
        var head = document.getElementsByTagName('head').item(0);
        head.appendChild(script);
    }
}


function LoadPopLoginScript(callback) {
    var hasFind = false;
    var scriptFiles = document.getElementsByTagName("script");
    for (var i = 0; i < scriptFiles.length; i++) {
        if (/loginpop\.js/ig.test(scriptFiles[i].src)) {
            hasFind = true;
            if (typeof(callback) === "function") callback();
            break;
        }
    }
    if (!hasFind) {
        var script = document.createElement("script");
        script.setAttribute("id", "tea7_dynaload_" + Math.ceil(Math.random() * 100000));
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", "/scripts/helper/loginpop.js?var=" + Math.ceil(Math.random() * 100000));
        script.onload = script.onreadystatechange = function () {
            if (script.readyState && script.readyState !== 'loaded' && script.readyState !== 'complete') {
                return;
            }
            script.onreadystatechange = script.onload = null;
            if (typeof (callback) === "function") callback();
        };
        var head = document.getElementsByTagName('head').item(0);
        head.appendChild(script);
    }
}

function LinkToComeFrom(me, como) {
    if (como !== null && typeof (como) !== "undefined" && como !== "") {
        me.find("a").each(function () {
            var href = $(this).attr("href");
            if (href !== null && href !== "undefined") {
                if (href.indexOf("comefrom") < 0) {
                    if (href.indexOf("?") < 0) {
                        $(this).attr("href", href + (href.indexOf("?") < 0 ? "?" : "&") + "comefrom={comefrom}".replace("{comefrom}", como));
                    }
                }
            }
        });
    }
};

/* 检测是否又需要加载模板 */
function LoadPageModules() {
    if ($(".loadPageModules").length > 0) {
        $(".loadPageModules").each(function () {
            var me = $(this);
            var id = me.attr("data-id");
            var key = me.attr("data-key");
            var como = me.attr("data-comefrom");
            if (id === null || typeof (id) === "undefined" || id === "") id = 0;
            if (key === null || typeof (key) === "undefined") key = "";
            if (id > 0)
                me.load("/Modules/United/RenderPageSections/", { Id: id, IsMobile: true }, function () {
                    LinkToComeFrom(me, como);
                    //加载完之后要做的事情
                    if (typeof (loadPageModulesAfterwards) !== "undefined") loadPageModulesAfterwards();
                });
            else if (key !== null && key !== "") {
                me.load("/Modules/United/RenderPageSections/", { Keys: key, IsMobile: true }, function () {
                    LinkToComeFrom(me, como);
                    //加载完之后要做的事情
                    if (typeof (loadPageModulesAfterwards) !== "undefined") loadPageModulesAfterwards();
                });
            }
        });
    }
    if ($(".loadPageModule").length > 0) {
        $(".loadPageModule").each(function () {
            var me = $(this);
            var id = me.attr("data-id");
            var key = me.attr("data-key");
            var como = me.attr("data-comefrom");
            if (id === null || typeof (id) === "undefined" || id === "") id = 0;
            if (key === null || typeof (key) === "undefined") key = "";
            if (id > 0)
                me.load("/Modules/United/RenderHtml/", { Id: id, IsMobile: true }, function () {
                    LinkToComeFrom(me, como);
                    //加载完之后要做的事情
                    if (typeof (loadPageModuleAfterwards) !== "undefined") loadPageModuleAfterwards();
                });
            else if (key !== null && key !== "") {
                me.load("/Modules/United/RenderHtml/", { Keys: key, IsMobile: true }, function () {
                    LinkToComeFrom(me, como);
                    //加载完之后要做的事情
                    if (typeof (loadPageModuleAfterwards) !== "undefined") loadPageModuleAfterwards();
                });
            }
        });
    }
}



/* 打开网易七鱼客服 */
function openqiyukefu(isWaite) {
    if (typeof (isWaite) === "undefined") isWaite = true;
    var ua = navigator.userAgent;
    if (ua.indexOf("T7app android") >= 0) {
        AndroidFunction.showQiyukefu(window.location.href, document.title);
    }
    else {
        if (!isConfigWYQY && isWaite) {
            setTimeout(function () { openqiyukefu(false); }, 500);
            return;
        }
        if (typeof (ysf) !== "undefined") {
            ysf.open();
        }
    }
}