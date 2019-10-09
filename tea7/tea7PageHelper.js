/* 本脚本需要jquery 或者 zepto 支持 */
//(function (i) {
//    var hasFind = false;
//    var scriptFiles = document.getElementsByTagName("script");
//    for (var i = 0; i < scriptFiles.length; i++) {
//        if (/(jquery|zepto)(-[0-9\.]+)?(.min)?\.js/ig.test(scriptFiles[i].src)) {
//            hasFind = true;
//            break;
//        }
//    }
//    if (!hasFind) {
//        var script = document.createElement("script");
//        script.setAttribute("id", "tea7_dynaload_" + Math.ceil(Math.random() * 100000));
//        script.setAttribute("type", "text/javascript");
//        script.setAttribute("src", "jquery-1.8.1.min.js"/*tpa=http://www.tea7.com/scripts/libs/jquery-1.8.1.min.js*/);
//        var head = document.getElementsByTagName('head').item(0);
//        head.appendChild(script);
//    }
//})(window);
var Tea7ScriptHelper = {
    IsString: function (object) {
        return typeof (object) === "string";
    },
    /**
       格式化数字 四舍五入
       s 要格式化的数字
       n 保留位数
     */
    Fmoney: function (s, n) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "" : "");
        }
        return t.split("").reverse().join("") + "." + r;
    },
    IsArray: function (object) {
        return object && typeof object === 'object' &&
            typeof object.length === 'number' &&
            typeof object.splice === 'function' &&
            //判断length属性是否是可枚举的 对于数组 将得到false  
            !(object.propertyIsEnumerable('length'));
    },
    /* 加载脚本
       jspath: 脚本路径 (支持单个路径 和 多个路径) ['*****.js','**.js']
       callback: 加载完成后执行
    */
    LoadScript: function (jspath, callback) {
        var loadCompleteScripts = [];
        var loadScripts = [];
        if (this.IsArray(jspath)) {
            loadScripts = jspath;
        } else if (this.IsString(jspath)) {
            loadScripts.push(jspath);
        } else {
            return;
        }

        var group = document.getElementsByTagName("script");
        var isAppendSrcript = true;
        for (var i = 0; i < loadScripts.length; i++) {
            // 验证是否脚本
            if (!/\.js(\?)?/ig.test(loadScripts[i])) {
                continue;
            }
            isAppendSrcript = true;
            // 判断脚本页面是否已经加载
            if (group.length > 0) {
                for (var x = 0; x < group.length; x++) {
                    if (group[x].getAttribute("src") === null)
                        continue;
                    if (group[x].getAttribute("src").toString().toLowerCase().indexOf(loadScripts[i].toLowerCase()) >= 0) {
                        loadCompleteScripts.push(loadScripts[i]);
                        if (loadCompleteScripts.length === loadScripts.length
                            && typeof (callback) === "function") {
                            callback();
                        }
                        isAppendSrcript = false;
                        break;
                    }
                }
            }
            if (isAppendSrcript) {
                var script = document.createElement("script");
                script.setAttribute("id", "tea7_dynaload_" + Math.ceil(Math.random() * 100000));
                script.setAttribute("type", "text/javascript");
                script.setAttribute("src", loadScripts[i] + "?var=" + new Date().getTime());
                if (script.addEventListener) {
                    script.addEventListener('load', function () {
                        loadCompleteScripts.push(this.src);
                        if (loadCompleteScripts.length === loadScripts.length && typeof (callback) === "function")
                            callback();
                    }, false);
                } else if (script.attachEvent) {
                    script.attachEvent('onreadystatechange', function () {
                        var target = window.event.srcElement;
                        if (target.readyState == 'loaded') {
                            loadCompleteScripts.push(target.src);
                            if (loadCompleteScripts.length === loadScripts.length && typeof (callback) === "function")
                                callback();
                        }
                    });
                }
                var head = document.getElementsByTagName('head').item(0);
                head.appendChild(script);
            }
        }
    },
    /* 加载样式
       jspath: 脚本路径 (支持单个路径 和 多个路径) ['*****.css','**.css']
       callback: 加载完成后执行
    */
    LoadCSS: function (filepath, callback) {
        var loadCompleteFile = [];
        var loadFile = [];
        if (this.IsArray(filepath)) {
            loadFile = filepath;
        } else if (this.IsString(filepath)) {
            loadFile.push(filepath);
        } else {
            return;
        }

        var group = document.getElementsByTagName("link");
        var isAppendFile = true;
        for (var i = 0; i < loadFile.length; i++) {
            // 验证是否脚本
            if (!/\.css(\?)?/ig.test(loadFile[i])) {
                continue;
            }
            isAppendFile = true;
            // 判断脚本页面是否已经加载
            if (group.length > 0) {
                for (var x = 0; x < group.length; x++) {
                    if (group[x].getAttribute("href") === null)
                        continue;
                    if (group[x].getAttribute("href").toString().toLowerCase().indexOf(loadFile[i].toLowerCase()) >= 0) {
                        loadCompleteFile.push(loadFile[i]);
                        if (loadCompleteFile.length === loadFile.length
                            && typeof (callback) === "function") {
                            callback();
                        }
                        isAppendFile = false;
                        break;
                    }
                }
            }
            if (isAppendFile) {
                var csslink = document.createElement("link");
                csslink.setAttribute("id", "tea7_dynaload_" + Math.ceil(Math.random() * 100000));
                csslink.setAttribute("rel", "stylesheet");
                csslink.setAttribute("type", "text/css");
                csslink.setAttribute("href", loadFile[i] + "?var=" + new Date().getTime());
                csslink.onload = csslink.onreadystatechange = function () {
                    if (csslink.readyState && csslink.readyState !== 'loaded' && csslink.readyState !== 'complete') {
                        return;
                    }
                    csslink.onreadystatechange = csslink.onload = null;
                    loadCompleteFile.push(loadFile[i]);
                    if (loadCompleteFile.length === loadFile.length
                        && typeof (callback) === "function") {
                        callback();
                    }
                };
                var head = document.getElementsByTagName('head').item(0);
                head.appendChild(csslink);
            }
        }
    },
    /* 
       给出页面请求的参数
       name ： 不包含参数名
    */
    GetRequestParms: function (name) {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") !== -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                if (strs[i].split("=")[0].toLowerCase() === name) {
                    continue;
                }
                theRequest[strs[i].split("=")[0].toLowerCase()] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },
    IsMobile: function () {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) === "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) === "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) === "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) === "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) === "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) === "android";
        var bIsCE = sUserAgent.match(/windows ce/i) === "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) === "windows mobile";
        var bIsWeixinWap = sUserAgent.match(/micromessenger/i) === "micromessenger";
        if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM || bIsWeixinWap)
            return true;
        else
            return false;
    },
    ScrollTop: function (height) {
        height = height || 0;
        if (typeof ($(window).scrollTo) !== "undefined") {
            $(window).scrollTo({
                top: height
            });
        } else if (typeof ($('html,body').animate) !== "undefined") {
            $('html,body').animate({
                scrollTop: height
            }, 0);
        }
    },
    /* 
       时间格式化2018-06-02T11:30:27
    */
    ToTime: function (time) {
        if (time.indexOf("T") < 0)
            return time;
        var dateee = new Date(time).toJSON();
        var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString()
            .replace(/T/g, ' ')
            .replace(/\.[\d]{3}Z/, '');
        return date;
    },
    /* 
      可格式化 
      2018-06-02T11:30:27
      /Date(2367828670431)
      为标准格式
   */
    FormatTime: function (time, format) {
        var me = this;
        format = format || "yyyy-MM-dd HH:mm:ss";
        time = time || "";
        if (time === "")
            return "";
        time = time.replace(" ", ' ');
        if (time.indexOf("T") >= 0)
            time = me.ToTime(time);
        var data = null;
        if (time.indexOf("/Date") >= 0)
            data = new Date(parseInt(time.slice(6, 19)));
        if (data == null)
            data = new Date(time.replace(/-/g, "/"));

        if (format.indexOf("yyyy") >= 0)
            format = format.replace("yyyy", data.getFullYear());
        if (format.indexOf("MM") >= 0)
            format = format.replace("MM", (data.getMonth() + 1) <= 9 ? "0" + (data.getMonth() + 1) : (data.getMonth() + 1));
        if (format.indexOf("dd") >= 0)
            format = format.replace("dd", data.getDate() <= 9 ? "0" + data.getDate() : data.getDate());
        if (format.indexOf("HH") >= 0)
            format = format.replace("HH", data.getHours() <= 9 ? "0" + data.getHours() : data.getHours());
        if (format.indexOf("mm") >= 0)
            format = format.replace("mm", data.getMinutes() <= 9 ? "0" + data.getMinutes() : data.getMinutes());
        if (format.indexOf("ss") >= 0)
            format = format.replace("ss", data.getSeconds() <= 9 ? "0" + data.getSeconds() : data.getSeconds());
        return format;
    },
    /*
     * 是否是今天
     */
    IsToDay: function (time) {
        var me = this;
        if (typeof (time) === "undefined")
            return false;
        time = me.FormatTime(time);
        var date = new Date(time.replace(/-/g, "/"));
        var curData = new Date();
        if (date.getDate() === curData.getDate())
            return true;
        return false;
    },
    /**
  * 将列表数据转成树形结构和符合table展示的列表
  * var jsonData =[
        {"id":"4","pid":"1","name":"大家电"},
        {"id":"5","pid":"1","name":"生活电器"},
        {"id":"1","pid":"0","name":"家用电器"},
        {"id":"2","pid":"0","name":"服饰"},
        {"id":"3","pid":"0","name":"化妆"},
        {"id":"7","pid":"4","name":"空调"},
        {"id":"8","pid":"4","name":"冰箱"},
        {"id":"9","pid":"4","name":"洗衣机"},
        {"id":"10","pid":"4","name":"热水器"},
        {"id":"11","pid":"3","name":"面部护理"},
        {"id":"12","pid":"3","name":"口腔护理"},
        {"id":"13","pid":"2","name":"男装"},
        {"id":"14","pid":"2","name":"女装"},
        {"id":"15","pid":"7","name":"海尔空调"},
        {"id":"16","pid":"7","name":"美的空调"},
        {"id":"19","pid":"5","name":"加湿器"},
        {"id":"20","pid":"5","name":"电熨斗"}
        ]; 
    ErpScriptHelper.TreeGridArry(jsonData,"id","pid");
  * @param data          列表数据
  * @param field_Id      树形结构主键字段
  * @param field_upId    树形结构上级字段
  * @param specifiedParentId  起始父类Id
  * @returns {Array}     [0]表格列表  [1]树形结构
  */
    TreeGridArry: function (data, field_Id, field_upId, startParentId) {
        var list = [];
        var treeList = [];
        var tableList = [];
        var firstData = [];//顶级父类
        //处理树结构
        var fa = function (upId) {
            var array = [];
            for (var i = 0; i < data.length; i++) {
                var n = data[i];
                if (parseInt(n[field_upId]) === parseInt(upId)) {
                    n.children = fa(n[field_Id]);
                    array.push(n);
                }
            }
            return array;
        }
        if (typeof (startParentId) === "undefined" || !(/^-?\d+$/.test(startParentId))) {
            var isExist = function (id) {
                for (var i = 0; i < data.length; i++) {
                    var n = data[i];
                    if (n[field_Id] === id) {
                        return true;
                    }
                }
            }
            for (var i = 0; i < data.length; i++) {
                if (!isExist(data[i][field_upId])) {
                    firstData.push(data[i]); //得到顶级父类
                }
            }
            for (var i = 0; i < firstData.length; i++) {
                var n = firstData[i];
                n.children = fa(firstData[i][field_Id]);
                treeList.push(n); //递归 data[0][field_upId]
            }
        } else {
            treeList = fa(startParentId);
        }
        //处理表格结构
        var fa2 = function (l, level, upids) {
            for (var i = 0; i < l.length; i++) {
                var n = l[i];
                n.level = level;//设置当前层级
                n.upIds = upids;
                tableList.push(n);
                if (n.children && n.children.length > 0) {
                    fa2(n.children, 1 + level, upids + "_" + n[field_Id] + "_");
                }
            }
            return;
        }
        fa2(treeList, 1, "");

        list.push(tableList);//table结构
        list.push(treeList)//tree树结构
        return list;
    },
    /**
  * 导出文件
  * ScriptHelper.ExportFile("file",[{Key:"name",Title:'名字'}], [{name:'张三'}], 'csv'); //默认导出 csv，也可以为：xls
  * ScriptHelper.ExportFile("file",['名字','性别','年龄'],[['张三','男','20'],['李四','女','18']], 'csv'); //默认导出 csv，也可以为：xls
  * ErpScriptHelper.ExportFile("file",表格ID,null, 'csv'); //默认导出 csv，也可以为：xls
  * @param {} fileName 
  * @param {} id 
  * @param {} data 
  * @param {} type 
  * @returns {} 
  */
    ExportFile: function (fileName, id, data, type) {
        if (!+[1, ]) {
            console.log("IE不支持导出");
            return;
        }
        data = data || {};
        type = type || 'csv';
        var textType = ({
            csv: 'text/csv',
            xls: 'application/vnd.ms-excel'
        })[type];
        var alink = document.createElement("a");
        var tableHeader = [], dateList = [];
        if (typeof id === 'object') {
            if (typeof id[0] === 'object') {
                var tableHeaderKey = [];
                $.each(id, function (i, item) {
                    tableHeaderKey.push(item.Key);
                    tableHeader.push(item.Title);
                });
                $.each(data, function (i, item) {
                    var info = [];
                    $.each(tableHeaderKey, function (q, key) {
                        info.push(data[i][key]);
                    });
                    dateList.push(info);
                });
            } else {
                tableHeader = id;
                dateList = data;
            }
        } else {
            $("#" + id + " thead tr").eq(0).children().each(function (i, item) {
                tableHeader.push($(item).text());
            });
            $("#" + id + " tbody tr").each(function (i, item) {
                var info = [];
                $.each($(item).find("td"), function (j, item1) {
                    info.push($(item1).text());
                });
                dateList.push(info);
            });
        }
        alink.href = 'data:' + textType + ';charset=utf-8,\ufeff' + encodeURIComponent(function () {
            var dataTitle = [], dataMain = [];
            $.each(dateList, function (i1, item1) {
                var vals = [];
                if (typeof tableHeader === 'object') { //ID直接为表头数据
                    $.each(tableHeader, function (i, item) {
                        i1 === 0 && dataTitle.push(item || '');
                    });
                    $.each(item1, function (i2, item2) {
                        vals.push(item2);
                    });
                }
                dataMain.push(vals.join(','))
            });
            return dataTitle.join(',') + '\r\n' + dataMain.join('\r\n');
        }());
        alink.download = fileName + '.' + type;
        document.body.appendChild(alink);
        alink.click();
        document.body.removeChild(alink);

    },
    /* 
      设置表单值
   */
    SetFormValue: function (formObject, data) {
        formObject.find("[name]").each(function () {
            var type = $(this)[0].nodeName.toLowerCase();
            var name = $(this).attr('name');
            var value = data[name];
            if (typeof (value) === "boolean")
                value = value ? "true" : "false";
            formObject.find(type + "[name='" + name + "']").val(value);
        });
        formObject.find("input[type='checkbox']").each(function () {
            var val = $(this).val();
            $(this).prop('checked', val === "true");
        });
        if (typeof (layui) !== "undefined" && typeof (layui.form) !== "undefined")
            layui.form.render();
    },
    /* 
      获取表单值
   */
    GetFormValue: function (formObject) {
        var parms = {};
        formObject.find("[name]").each(function () {
            var name = $(this).attr('name');
            var val = $(this).val();
            var typeValue = $(this).attr("type") || "";
            var isCheckbox = typeValue.toLowerCase() === "checkbox";
            if (isCheckbox)
                val = $(this).is(":checked");
            parms[name] = val;
        });
        return parms;
    },
    /**
     * 根据指定字段分组
     */ 
    GroupByArray: function (arr, groupName) {
        var map = {},
            dest = [];
        for (var i = 0; i < arr.length; i++) {
            var ai = arr[i];
            if (!map[ai[groupName]]) {
                var info = {};
                info[groupName] = ai[groupName];
                info.data = [ai];
                dest.push(info);
                map[ai[groupName]] = ai;
            } else {
                for (var j = 0; j < dest.length; j++) {
                    var dj = dest[j];
                    if (dj[groupName] == ai[groupName]) {
                        dj.data.push(ai);
                        break;
                    }
                }
            }
        }
        return dest;
    },
};
var Tea7CustomerHelper = {
    /* 加载当前用户 */
    LoadCurrentCustomer: function (CallBack, ErrorBack) {
        $.ajax({
            cache: false,
            url: "/API/Customer/GetCurrentCustomer?ver=" + Math.ceil(Math.random() * 100000),
            success: function (data) {
                if (typeof (CallBack) === "function") {
                    CallBack(data);
                }
            },
            error: function () {
                if (typeof (ErrorBack) === "function") {
                    ErrorBack();
                }
            }
        })
    },

    /* 加载当前购物车数据 */
    LoadCurrentCustomerShoppingCart: function (CallBack) {
        $.ajax({
            url: "/json/GetMyShoppingCart?ver=" + Math.ceil(Math.random() * 100000),
            success: function (data) {
                if (typeof (CallBack) === "function") {
                    //data.ShoppingCartItems 当前购物车数量
                    CallBack(data);
                }
            }
        });
    },
    /* 写入客户的足迹 */
    FootPrint: function () {
        if (typeof ($.ajax) !== "undefined") {
            $.ajax({
                type: 'post',
                url: "/API/Customer/FootPrint",
                data: { "referrerUrl": document.referrer }
            });
        }
    },
    /* 写入事件 */
    Events: function (data) {
        if (typeof ($.ajax) !== "undefined" && typeof (data) !== "undefined" && data !== null) {
            if (typeof (data.Category) === "undefined") data.Category = "";
            if (typeof (data.Channel) === "undefined") data.Channel = "";
            if (typeof (data.Name) === "undefined") data.Name = "";
            if (typeof (data.Value) === "undefined") data.Value = "";
            // 自定义的参数
            if (typeof (TEA7_Events_Channel) !== "undefined" && data.Channel === "") data.Channel = TEA7_Events_Channel;
            if (typeof (TEA7_Events_Category) !== "undefined" && data.Category === "") data.Category = TEA7_Events_Category;
            if (data.Name !== "") {
                $.ajax({
                    type: 'post',
                    url: "/API/Customer/Events",
                    data: { "EventName": data.Name, "EventValue": data.Value, "EventCategory": data.Category, "Channel": data.Channel }
                });
            }
        }
    },
    /* 写入提示日志 */
    WriteTipLog: function (tip) {
        if (typeof ($.ajax) !== "undefined") {
            $.ajax({
                type: 'post',
                url: "/API/Customer/WriteTipLog",
                data: { content: tip }
            });
        }
    },
    /* 给出系统其他设置 */
    GetSiteSettings: function (CallBack, ErrorBack) {
        $.ajax({
            cache: false,
            url: "/API/Common/GetSiteSettings?ver=" + Math.ceil(Math.random() * 100000),
            success: function (data) {
                if (typeof (CallBack) === "function") {
                    CallBack(data);
                }
            },
            error: function () {
                if (typeof (ErrorBack) === "function") {
                    ErrorBack();
                }
            }
        })
    }
};

var SiteActionHelper = {
    SetFeaturedUserId: function () {  // 绑定推广客服 和 推荐好友
        var parms = {};
        var request = Tea7ScriptHelper.GetRequestParms();
        if (request["friend"] !== undefined
            || request["featured"] !== undefined) {

            if (request["friend"] !== undefined)
                parms.friend = request["friend"];
            if (request["featured"] !== undefined)
                parms.featured = request["featured"];
            $.ajax({
                url: "/Json/SetFeaturedUserId",
                data: parms
            });
        }
    },
    SetChannel: function () {     // 设置渠道
        var parms = {};
        var request = Tea7ScriptHelper.GetRequestParms();
        if (request["qd"] !== undefined && request["qd"] !== null) {
            parms.qd = request["qd"];
            // 分销人员编号
            if (request["spid"] !== undefined && request["spid"] !== null)
                parms.spid = request["spid"];
            $.ajax({
                url: "/Json/SetChannel",
                data: parms
            });
        }
    },
    SetAd: function () {
        $(".load_adgroup").each(function () {
            var element = $(this);
            $.ajax({
                url: "/json/GetAdGroupImgs",
                data: { "id": element.attr("data-groupId") },
                type: 'post',
                success: function (data) {
                    $(data).each(function (i) {
                        element.append('<a href="' + data[i].Url + '"><img src="' + data[i].PictureUrl + '" width="100%" /></a>')
                    });
                },
                error: function (data) {
                    if (tip.warn)
                        tip.warn(data.data);
                }
            });
        });
    },
    // 领取红包
    ReceiveRedEnvelopes: function (option, callback, errorback) {
        var sendData = {
            redEnvelopesId: 0,
            redEnvelopesSchemeId: 0,
            channel: 0,
            redEnvelopesKeyWord: "",
        };
        $.extend(sendData, option);
        $.ajax({
            type: "POST",
            cache: false,
            url: "/API/Customer/ReceiveRedEnvelopes",
            data: sendData,
            success: function (repReceive) {
                if (typeof (callback) === "function") {
                    callback(repReceive);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (typeof (errorback) === "function") {
                    errorback(XMLHttpRequest, textStatus, errorThrown);
                }
            }
        });
    },
    // 短信登录
    SmsLogin: function (option, callback, errorback) {
        var sendData = {
            Phone: "",
            CodeSMS: "",
            customerFrom: 0,
            returnUrl: document.URL
        };
        $.extend(sendData, option);
        $.ajax({
            type: "POST",
            cache: false,
            url: "/API/Customer/SmsLogin",
            data: sendData,
            success: function (repReceive) {
                if (typeof (callback) === "function") {
                    callback(repReceive);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (typeof (errorback) === "function") {
                    errorback(XMLHttpRequest, textStatus, errorThrown);
                }
            }
        });
    }
}

