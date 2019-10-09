/*  
    必须引用jquery  
    使用方法 需要在页面建议2个容器. 1个容器用来显示, 1个容器用来加载要显示内容的.
    <div id="a"></div><div id="b"></div> 
    a 容器: 用来最终显示瀑布图片框架
    b 容器: 用来过度滚动条下划到一定程序后加载的数据. 由于异步加载需要将数据先插入到页面上才可以计算出图片大小以及占位
    例子如下
    <div id="container"></div><div id="t_container"></div>
      var opt = {
        getResource: function (index, render) {
            //  index为已加载次数,render为渲染接口函数,接受一个dom集合或jquery对象作为参数。
            //  通过ajax等异步方法得到的数据可以传入该接口进行渲染，如 render(elem)
            jQuery.getJSON("http://www.51qc.com//ajax/Json/ImageGroup.ashx?callback=?",
            { "t": "childrengroup_haveimg", "page": index, "id": 1, "count": 16, "sort": "new" },
            function (json) {
                if (json != null && json.length > 0) {
                    var html = '';
                    for (var i = 0; i < json.length; i++) {
                        html += '<div class="cell"><img width="192px" src="' + json[i].ImagePath.replace("big", "medium") + '" /><p>' + json[i].Name + '</p></div>';
                    }
                    $("#t_container").append(html); //将加载的数据插入到B容器中
                    render($("#t_container").find(".cell").detach(), true); //循环取数据 组成一个元素 返回给系统提供的Render()方法
                }
            });
        },
        auto_imgHeight: true,
        insert_type: 1
    }
    //以下是初始化操作.当然如果有数据可以直接先显示在A容器中, 由于初始化数据时.A容器无数据.可以直接先插入到A容器中再进行重组
    jQuery.getJSON("http://www.51qc.com/ajax/Json/ImageGroup.ashx?callback=?",
    { "t": "childrengroup_haveimg", "page": 1, "id": 1, "count": 16, "sort": "new" },
    function (json) {
        if (json != null && json.length > 0) {
            var html = '';
            for (var i = 0; i < json.length; i++) {
                html += '<div class="cell"><img width="192px" src="' + json[i].ImagePath.replace("big", "medium") + '" /><p>' + json[i].Name + '</p></div>';
            }
            $('#container').html(html).waterfall(opt);
        }
    });
*/
(function ($) {
    var setting = {
        column_width: 204, 
        column_className: 'waterfall_column', 
        column_space: 0,
        cell_selector: '.cell',
        img_selector: 'img', 
        hasloadedcomption: true,
        auto_imgHeight: true, 
        fadein: true,
        fadein_speed: 600, 
        insert_type: 1,
        load_index : 0,
        getResource: function (index) { } 
    },
   waterfall = $.waterfall = {}, 
   $container = null; 
    $.fn.extend({
        waterfall: function (opt) {
            opt = opt || {};
            setting = $.extend(setting, opt);
            $container = waterfall.$container = $(this);
            waterfall.$columns = creatColumn();
            render($(this).find(setting.cell_selector).detach(), false);
            waterfall._scrollTimer2 = null;
            $(window).bind('scroll', function () {
                clearTimeout(waterfall._scrollTimer2);
                waterfall._scrollTimer2 = setTimeout(onScroll, 300);
            });
            waterfall._scrollTimer3 = null;
            $(window).bind('resize', function () {
                clearTimeout(waterfall._scrollTimer3);
                waterfall._scrollTimer3 = setTimeout(onResize, 300);
            });
        }
    });
    function creatColumn() {
        if ($container.find('.' + setting.column_className).length <= 0) {
            waterfall.column_num = calculateColumns();
            var html = '';
            var width = $container.width();
            var maginValue = 0;
            var isBoder = false;
            if (setting.column_space <= 0) {
                if (waterfall.column_num >= 2) {
                    isBoder = true;
                    maginValue = (width - waterfall.column_num * setting.column_width) * 1.0 / ((waterfall.column_num - 2) * 2 + 2);
                } else {
                    maginValue = (width - waterfall.column_num * setting.column_width) / 2;
                }
            } else
            {
                maginValue = setting.column_space / 2;
            }
            for (var i = 0; i < waterfall.column_num; i++) {
                html += '<div class="' + setting.column_className + '" style="width:' + setting.column_width + 'px; display:inline-block; *display:inline;zoom:1; ';
                if ((i == 0) && isBoder) {
                    html += '  margin-right:' + maginValue + 'px; ';
                } else if ((i == (waterfall.column_num - 1)) && isBoder) {
                    html += '  margin-left:' + maginValue + 'px; ';
                } else {
                    html += '  margin-left:' + maginValue + 'px; margin-right:' + maginValue + 'px; ';
                }
                html += ' vertical-align:top; overflow:hidden"></div>';
            }
            $container.prepend(html);
        } else {
            waterfall.column_num = $container.find('.' + setting.column_className).length;
        }
        return $('.' + setting.column_className, $container);
    }
    function calculateColumns() {
        var num = Math.floor(($container.innerWidth()) / (setting.column_width + setting.column_space));
        if (num < 1) { num = 1; } 
        return num;
    }
    function render(elements, fadein) {
        if (!$(elements).length) return; 
        var $columns = waterfall.$columns;
        $(elements).each(function (i) {
            if (!setting.auto_imgHeight || setting.insert_type == 2) {
                if (setting.insert_type == 1) {
                    insert($(elements).eq(i), setting.fadein && fadein);
                } else if (setting.insert_type == 2) {
                    insert2($(elements).eq(i), i, setting.fadein && fadein);
                }
                return true; 
            }
            if ($(this)[0].nodeName.toLowerCase() == 'img' || $(this).find(setting.img_selector).length > 0) {
                var image = new Image;
                var src = $(this)[0].nodeName.toLowerCase() == 'img' ? $(this).attr('src') : $(this).find(setting.img_selector).attr('src');
                image.onload = function () {
                    image.onreadystatechange = null;
                    if (setting.insert_type == 1) {
                        insert($(elements).eq(i), setting.fadein && fadein); 
                    } else if (setting.insert_type == 2) {
                        insert2($(elements).eq(i), i, setting.fadein && fadein);
                    }
                    image = null;
                }
                image.onreadystatechange = function () {
                    if (image.readyState == "complete" || image.readyState == "loaded") {
                        image.onload = null;
                        if (setting.insert_type == 1) {
                            insert($(elements).eq(i), setting.fadein && fadein);
                        } else if (setting.insert_type == 2) {
                            insert2($(elements).eq(i), i, setting.fadein && fadein);
                        }
                        image = null;
                    }
                }
                image.onerror = function () {
                    insert($(elements).eq(i), setting.fadein && fadein);
                }
                image.src = src;
            }
            else {
                if (setting.insert_type == 1) {
                    insert($(elements).eq(i), setting.fadein && fadein); 
                } else if (setting.insert_type == 2) {
                    insert2($(elements).eq(i), i, setting.fadein && fadein);
                }
            }
        });
    }
    function public_render(elems) {
        render(elems, true);
    }
    function insert($element, fadein) {
        if (fadein) {
            $element.css('opacity', 0).appendTo(waterfall.$columns.eq(calculateLowest())).fadeTo(setting.fadein_speed, 1);
        } else {
            $element.appendTo(waterfall.$columns.eq(calculateLowest()));
        }
    }
    function insert2($element, i, fadein) {
        if (fadein) {
            $element.css('opacity', 0).appendTo(waterfall.$columns.eq(i % waterfall.column_num)).fadeTo(setting.fadein_speed, 1);
        } else {
            $element.appendTo(waterfall.$columns.eq(i % waterfall.column_num));
        }
    }
    function calculateLowest() {
        var min = waterfall.$columns.eq(0).outerHeight(), min_key = 0;
        waterfall.$columns.each(function (i) {
            if ($(this).outerHeight() < min) {
                min = $(this).outerHeight();
                min_key = i;
            }
        });
        return min_key;
    }
    function getElements() {
        if (setting.hasloadedcomption) {
            setting.load_index++;
            return setting.getResource(setting.load_index, public_render);
        }
    }
    waterfall._scrollTimer = null; 
    function onScroll() {
        clearTimeout(waterfall._scrollTimer);
        waterfall._scrollTimer = setTimeout(function () {
            var $lowest_column = waterfall.$columns.eq(calculateLowest()); 
            var bottom = $lowest_column.offset().top + $lowest_column.outerHeight(); 
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 300; 
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight || 300; 
            if (scrollTop >= bottom - windowHeight) {
                render(getElements(), true);
            }
        }, 100);
    }
    function onResize() {
        if (calculateColumns() == waterfall.column_num) return;
        var $cells = waterfall.$container.find(setting.cell_selector);
        waterfall.$columns.remove();
        waterfall.$columns = creatColumn();
        render($cells, false);
    }
})(jQuery);