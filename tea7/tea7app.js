var app = angular.module('app', []);

//有使用到这个配置的话 A标签跳转必须加 target="_self"  否则无效 $location
app.config(['$locationProvider', function ($locationProvider) {
    // $locationProvider.html5Mode(true);  
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);

// 有使用这个配置，href 链接可以使用tel: javascript:等
app.config([
    '$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|sms|javascript):/);
        // Angular v1.2 之前使用 $compileProvider.urlSanitizationWhitelist(...)
    }
]);

//ng-repeat后执行 ngrepeatafterexec='方法名()'
app.directive("ngrepeatafterexec", function ($timeout) {
    return {
        restrict: "A",
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$eval(attr.ngrepeatafterexec);
                });
            }
        }
    };
});

//自定义过滤器 jsonDate  format格式'yyyy-MM-dd HH:mm:ss' 可选择需要的
app.filter("jsonDate", function ($filter) {
    return function (input, format) {
        if (input == null) return;
        //先得到时间戳
        var timestamp = Number(input.replace(/\/Date\((\d+)\)\//, "$1"));
        //转成指定格式
        return $filter("date")(timestamp, format);
    }
});

app.factory("CaChe", function ($cacheFactory) {
    return $cacheFactory("myData");
})


// 转换成html编码
app.filter('trustHtml', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
});

// 转换成html编码
app.filter('Abs', function () {
    return function (input) {
        return Math.abs(input);
    }
});

app.directive('loadedApplink', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    if (navigator.userAgent.indexOf('T7appIOSV2') >= 0 || navigator.userAgent.indexOf('T7appAndroidV2') >= 0) {
                        var isIOS = navigator.userAgent.indexOf('T7appIOS') >= 0;
                        if ($) {
                            // 调整A链接的跳转
                            $("a").each(function () {
                                var href = $(this).attr("href");
                                // 打开首页
                                if (/(\.com\/index.htm)|(^\/index.htm)|(tea7.com(\/)?$)/ig.test(href)) {
                                    $(this).attr("href", (isIOS ?
                                        "javascript:window.webkit.messageHandlers.tea7func.postMessage(\"OpenIndex\");" :
                                        "javascript:window.tea7func.androidMethod_OpenIndex();")
                                    );
                                    return true;
                                }
                                // 打开详情页
                                if (/\/item\/(\d+).htm/ig.test(href)) {
                                    var starIndex = href.toString().lastIndexOf("/") + 1;
                                    var endIndex = href.toString().lastIndexOf(".");
                                    var id = href.toString().substring(starIndex, endIndex);
                                    $(this).attr("href", (isIOS ?
                                        "javascript:window.webkit.messageHandlers.tea7func.postMessage(\"OpenProduct_" + id + "\");"
                                        :
                                        "javascript:window.tea7func.androidMethod_OpenProduct(" + id + ");")
                                    );
                                    return true;
                                }
                                // 打开购物车
                                if (/\/cart/ig.test(href)) {
                                    $(this).attr("href", (isIOS ?
                                         "javascript:window.webkit.messageHandlers.tea7func.postMessage(\"OpenShoppingCart\");"
                                         :
                                         "javascript:window.tea7func.androidMethod_OpenShoppingCart();")
                                    );
                                    return true;
                                }
                                // 打开分页页面
                                if (/\/categorylist/ig.test(href)) {
                                    $(this).attr("href", (isIOS ?
                                         "javascript:window.webkit.messageHandlers.tea7func.postMessage(\"OpenCategoryList\");"
                                         :
                                         "javascript:window.tea7func.androidMethod_OpenCategoryList();")
                                    );
                                    return true;
                                }
                                // 打开搜索页面
                                if (/SeachPadouct/ig.test(href)) {
                                    $(this).attr("href", (isIOS ?
                                         "javascript:window.webkit.messageHandlers.tea7func.postMessage(\"OpenSeach\");"
                                         :
                                         "javascript:window.tea7func.androidMethod_OpenSeach();")
                                    );
                                    return true;
                                }
                                // 打开个人中心
                                if (/customer\/home/ig.test(href)) {
                                    $(this).attr("href", (isIOS ?
                                        "javascript:window.webkit.messageHandlers.tea7func.postMessage(\"OpenCustomeerHome\");"
                                        :
                                        "javascript:window.tea7func.androidMethod_OpenCustomeerHome();")
                                    );
                                    return true;
                                }
                                // 拨打电话
                                if (/^tel(\s)?\:(\s)?\d+$/ig.test(href)) {
                                    var starIndex = href.toString().lastIndexOf(":") + 1;
                                    var phoneNumber = href.toString().substring(starIndex);
                                    $(this).attr("href", (isIOS ?
                                        "javascript:window.webkit.messageHandlers.tea7func.postMessage(\"Tel_" + phoneNumber + "\");"
                                        :
                                        "javascript:window.tea7func.androidMethod_Tel(\"" + phoneNumber + "\");")
                                    );
                                    return true;
                                }
                            });
                        }
                    }
                });
            }
        }
    };
});