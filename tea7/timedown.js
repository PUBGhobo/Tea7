//define(function() {
    function timeDownFn(a) {
        var c = {
                elem: null,
                endTime: 60000,
                onlySec: false,
                endFunc: function() {}
            },
            d = $.extend(c, a),
            e = d.elem,
            f = 0,
            g = null,
            h = null,
            i = /^(\d{4})\/(\d{1,2})\/(\d{1,2})\s(\d{1,2}):(\d{1,2}):(\d{1,2})$/;
        return null !== e && 0 != e.length ? (f = d.endTime, i.test(f) && (f = new Date(f).getTime() - (new Date).getTime()), f = parseInt(f / 1000), g = function() {
            var a;
            0 > f && (clearInterval(h), d.endFunc(), f = 0), a = b(f), e.html(d.onlySec ? '<i class="iconfont">&#x3a;</i><span class="s">剩余时间：</span><em>' + a.secs + "</em><span>秒</span>" : '<i class="iconfont">&#x3a;</i><span class="s">剩余时间：</span><em>' + a.days + "</em><span>天</span><em>" + a.hours + "</em><span>时</span><em>" + a.mins + "</em><span>分</span><em>" + a.secs + "</em><span>秒</span>"), f--
        }, h = setInterval(g, 1000), g(), h) : void 0
    }

    function b(a) {
        var b = {};
		b.secs = Math.floor(a % 60);
		b.mins = Math.floor(a / 60 % 60);
		b.hours = Math.floor(a / 60 / 60);
		b.days = 0;
		if(b.hours > 23){
			b.days = Math.floor(b.hours / 24);
		}
		b.hours = b.hours - 24 * b.days;
	    if(b.secs < 10 ){
		     b.secs = "0" + b.secs;
		}
		if(b.mins < 10){
			b.mins = "0" + b.mins;
		}
		if(b.hours < 10){
			b.hours = "0" + b.hours;
		}
		if(b.days < 10) {
			b.days = "0" + b.days;
		}
        return b;
    }
    //return a
//});