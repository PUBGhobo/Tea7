(function ($) {
    $.fn.slideBox = function (s) {
        var i = {
            direction: "left",
            duration: 0.6,
            easing: "swing",
            delay: 3,
            startIndex: 0,
            hideClickBar: true,
            clickBarRadius: 5,
            hideBottomBar: false,
            backHref: "###",
            title: "",
            event: function () { },
            changeCallback: function () { }
        };
        var g = $.extend(i, s || {});
        var e = $(this),
            k = e.children("ul.items"),
            r = k.find("li").not(".liBj"),
            p = r.first().find("img");
        var m = r.size(),
            j = 0,
            o = 0;
        var h = "ASC";
        var q = function () {
            if (!e.size()) {
                return false
            }
            j = r.first().height();
            o = r.first().width();
            e.css({
                width: o + "px",
                height: j + "px"
            });
            r.css({
                width: o + "px",
                height: j + "px"
            });
            if (g.direction == "left") {
                k.css("width", m * o + "px")
            } else {
                k.css("height", m * j + "px")
            }
            k.find("li:eq(" + g.startIndex + ")").addClass("active");
            if (!g.hideBottomBar) {
                var t = $('<div class="tips"></div>').appendTo(e);
                //var w = $('<div class="title"></div>').html(function () {
                //    var y = k.find("li.active").find("a"),
                //        z = y.attr("title"),
                //        x = y.attr("href");
                //    return $("<a>").attr("href", x).text(z)
                //}).appendTo(t);
                var v = $('<div class="nums"></div>').hide().appendTo(t);
                var u = $('<div id="nums-container" class="nums-container"></div>').appendTo(v);
                r.each(function (A, C) {
                    var x = $(C).find("a"),
                        B = x.attr("title"),
                        y = "#",//x.attr("href")
                        z = "";
                    A == g.startIndex && (z = "active");
                    $("<a>").attr("href", y).text(B).addClass(z).css("borderRadius", g.clickBarRadius + "px").click(function () {
                        $(this).addClass("active").siblings().removeClass("active");
                        k.find("li:eq(" + $(this).index() + ")").addClass("active").siblings().removeClass("active");
                        n();
                        f()
                    }).appendTo(u)
                });
                if (g.hideClickBar) {
                    t.hover(function () {
                        v.animate({
                            top: "0px"
                        }, "fast")
                    }, function () {
                        v.animate({
                            top: t.height() + "px"
                        }, "fast")
                    });
                    v.show().delay(2000).animate({
                        top: t.height() + "px"
                    }, "fast")
                } else {
                    v.show()
                }
            }
            e.find(".title").find("a").attr("href", g.backHref).text(g.title);
            if (r.size() > 1) {
                f();
                g.event()
            } else {
                g.changeCallback(0)
            }
        };
        var f = function () {
            var u = k.find("li.active"),
                v = k.find("http://www.tea7.com/scripts/baike/li.cur");
            var t = u.index();
            if (g.direction == "left") {
                offset = t * o * -1;
                param = {
                    left: offset + "px"
                }
            } else {
                offset = t * j * -1;
                param = {
                    top: offset + "px"
                }
            }
            v.removeClass("cur");
            setTimeout(function () { v.find(".card").hide(); }, 850);

            u.addClass("cur");
            u.find(".card").show();
            e.find(".nums").find("a:eq(" + t + ")").addClass("active").siblings().removeClass("active");
            k.stop().animate(param, g.duration * 1000, g.easing, function () {
                u.removeClass("active");

                if (h == "ASC") {
                    if (u.next().size()) {

                        u.next().addClass("active")
                    } else {
                        h = "DESC";
                        u.prev().addClass("active")
                    }
                } else {
                    if (h == "DESC") {
                        if (u.prev().size()) {
                            u.prev().addClass("active")
                        } else {
                            h = "ASC";
                            u.next().addClass("active")
                        }
                    }
                }
                g.changeCallback(t)
            });
            e.data("timeid", window.setTimeout(f, g.delay * 1000))
        };
        var n = function () {
            window.clearTimeout(e.data("timeid"))
        };
        var l = new Image();
        l.onload = function () {
            l.onload = null;
            q()
        };
        l.src = p.attr("src")
    }
})(jQuery);

$(function () {
    $("#slides").slideBox({
        duration: 1,
        //easing: "easeOutSine",
        delay: 6,
        hideClickBar: false,
        clickBarRadius: 10,
        backHref: "",
        title: "",
        event: function () {
            var v = $("#slides .items");
            $("#scroll-left").click(function () {
                var w = $("#slides .nums .active");
                if (w.prev()[0]) {
                    w.prev().trigger("click")
                } else {
                    w.parent().find("a").last().trigger("click")
                }
            });
            $("#scroll-right").click(function () {
                var w = $("#slides .nums .active");
                if (w.next()[0]) {
                    w.next().trigger("click")
                } else {
                    w.parent().find("a").first().trigger("click")
                }
            });
            $("#nums-container").css("margin-left", ((-$("#nums-container").width() / 2) + 10) + "px")
        },
    });
});
