// 防iframe广告嵌入嵌套
if (top !== self) {
    top.location = self.location;
}
function getE(name) {
    if (document.getElementById)
        var elem = document.getElementById(name);
    else if (document.all)
        var elem = document.all[name];
    else if (document.layers)
        var elem = document.layers[name];
    return elem;
}

function OpenWindow(query, w, h, scroll) {
    var l = (screen.width - w) / 2;
    var t = (screen.height - h) / 2;

    winprops = 'resizable=0, height=' + h + ',width=' + w + ',top=' + t + ',left=' + l + 'w';
    if (scroll) winprops += ',scrollbars=1';
    var f = window.open(query, "_blank", winprops);
}

function setLocation(url) {
    window.location.href = url;
}

function displayAjaxLoading(display) {
    if (display) {
        //$('.ajax-loading-block-window').show();
        $('.spinner_bg').show();
        
    }
    else {
        $('.spinner_bg').hide();
        //$('.ajax-loading-block-window').hide('slow');
    }
}

function displayPopupNotification(message, messagetype) {
    displayPopupNotification(message, messagetype, null, null, null);
}

function displayPopupNotification(message, messagetype, title) {
    displayPopupNotification(message, messagetype, title, null, null);
}

function displayPopupNotification(message, messagetype, title, time) {
    displayPopupNotification(message, messagetype, title, time, null);
}

function displayPopupNotification(message, messagetype, title, time, redirect) {

    var htmlcode = '';
    if ((typeof message) == 'string') {
        htmlcode = '<p>' + message + '</p>';
    } else {
        for (var i = 0; i < message.length; i++) {
            htmlcode = htmlcode + '<p>' + message[i] + '</p>';
        }
    }

    if (title == null || title == undefined || title == "") title = "内容提示";

    if (time == null || time == undefined || time == "") {
        var d = dialog({ content: htmlcode, icon: messagetype });
        d.show();
    } else {
        if (redirect == null || redirect == undefined || redirect == "") {
            var d = dialog({ content: htmlcode, icon: messagetype, width: 300, time: time });
            d.show();
        } else {
            var d = dialog({
                "title": title, content: htmlcode, icon: messagetype, width: 300, time: time, close: function () {
                    console.log(redirect);
                    window.location.href = redirect;
                    return false;
                }
            });
            d.show();
        }
    }
}

function displayPopupWarn(message, okback, time) {
    if (okback == undefined || okback == null) {
        okback = function () {
            return true;
        }
    }
    var d = dialog({
        content: '<div class="tip_confirm"><i class="iconfont">&#xf0013;</i>' + message + '</div>',//&#xe633;
        okValue: '确定',
        ok: okback
    });
    d.show();
    if (time != undefined && okback != null) {
        setTimeout(function () {
            d.close().remove();
        }, time);
    }
}

function displayPopupOK(message, okback) {
    if (okback == undefined || okback == null) {
        okback = function () {
            return true;
        }
    }
    var d = dialog({
        content: '<div class="tip_ok"><i class="iconfont">&#xe623;</i>' + message + '</div>',
        okValue: '确定',
        ok: okback
    });
    d.show();
}

function displayPopupOKGift(message,btntext, okback) {
    if (okback == undefined || okback == null)
    {
        okback = function () {
            return true;
        }
    }
    var d = dialog({
        content: '<div onclick="$(this).parents(\'.ui-dialog-grid\').remove();" style="position:fixed;right:0px; top:10px;text-align:right;line-height:10px; height:10px;cursor:pointer;"><i class="iconfont close" style="color:black;font-size:16px;">&#xe61c;</i></div><div class="tip_ok"><i class="iconfont">&#xe633;</i>' + message + '</div>',
        okValue: btntext,
        ok: okback
    });
    d.show();
}

function displayPopupTip(message) {
    var d = dialog({ content: message });
    d.show();
    setTimeout(function () {
        d.close().remove();
    }, 2000);
}

function displayPopupChoose(title, html, cancelback, okback) {
    var d = dialog({
        title: title,
        content: html,
        cancel: false,
        cancelValue: '取消',
        cancel: cancelback,
        okValue: '确定',
        ok: okback
    });
    d.showModal();
}

var barNotificationTimeout;
function displayBarNotification(message, messagetype, timeout) {
    clearTimeout(barNotificationTimeout);

    //types: success, error
    var cssclass = 'success';
    if (messagetype == 'success') {
        cssclass = 'success';
    }
    else if (messagetype == 'error') {
        cssclass = 'error';
    }
    //remove previous CSS classes and notifications
    $('#bar-notification')
        .removeClass('success')
        .removeClass('error');
    $('#bar-notification .content').remove();

    //we do not encode displayed message

    //add new notifications
    var htmlcode = '';
    if ((typeof message) == 'string') {
        htmlcode = '<p class="content">' + message + '</p>';
    } else {
        for (var i = 0; i < message.length; i++) {
            htmlcode = htmlcode + '<p class="content">' + message[i] + '</p>';
        }
    }
    $('#bar-notification').append(htmlcode)
        .addClass(cssclass)
        .fadeIn('slow')
        .mouseenter(function () {
            clearTimeout(barNotificationTimeout);
        });

    $('#bar-notification .close').unbind('click').click(function () {
        $('#bar-notification').fadeOut('slow');
    });

    //timeout (if set)
    if (timeout > 0) {
        barNotificationTimeout = setTimeout(function () {
            $('#bar-notification').fadeOut('slow');
        }, timeout);
    }
}

function htmlEncode(value) {
    return $('<div/>').text(value).html();
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}

function fmoney(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}

function rmoney(s) {
    return parseFloat(s.replace(/[^\d\.-]/g, ""));
}