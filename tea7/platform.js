//平台、设备和操作系统
//var system = { win: false,  mac: false,  xll: false };
//检测平台
//var sPlatform = navigator.platform.toLowerCase();
//system.win = sPlatform.indexOf("win") == 0;
//system.mac = sPlatform.indexOf("mac") == 0;
//system.x11 = (sPlatform == "x11") || (sPlatform.indexOf("linux") == 0);
var sUserAgent = navigator.userAgent.toLowerCase();
var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
var bIsMidp = sUserAgent.match(/midp/i) == "midp";
var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
var bIsAndroid = sUserAgent.match(/android/i) == "android";
var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
var bIsWeixinWap = sUserAgent.match(/micromessenger/i) == "micromessenger";
if ((bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM || bIsWeixinWap)
    //|| (!system.win && !system.mac && !system.xll)
    ) {
    var url = document.URL.toString().toLowerCase();
    if (url.indexOf(".html") > 0) {
        url = url.replace(".html", ".htm");
        url = url.replace(/((www\.)|(test\.))tea7\.com/g, "http://www.tea7.com/scripts/m.tea7.com");
        window.location.href = url;
    }
}

// 如果tea7.com 访问页面，脚本的域名加上tea7.com
if (document.URL.toString().toLowerCase().match(/(www\.)?tea7\.com/i) == "http://www.tea7.com/scripts/tea7.com" ||
    document.URL.toString().toLowerCase().match(/(m\.)?tea7\.com/i) == "http://www.tea7.com/scripts/m.tea7.com") {
    document.domain = "http://www.tea7.com/scripts/tea7.com";
}