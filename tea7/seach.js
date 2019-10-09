$("#close_seach_result").click(function () {
   //关闭按钮
});
var input_seach_keyup = null;
if ($("#input_search").length > 0 && $("#search_result_parent").length > 0) {
    $("#input_search").keyup(function (event) {
        if ($("#search_result li").length > 0) {
            var obj = $("#search_result li.selected");
            // 37 左， 39 右
            if (event.keyCode == 38) {
                // 向上
                $("#search_result li").removeClass("selected");
                if (obj.length <= 0 || $("#search_result li").index(obj) <= 0) {
                    $("#search_result li:last").addClass("selected");
                } else {
                    obj.prev().addClass("selected");
                }
                return;
            }
            if (event.keyCode == 40) {
                // 向下
                $("#search_result li").removeClass("selected");
                if (obj.length <= 0 || $("#search_result li").index(obj) >= ($("#search_result li").length - 1)) {
                    $("#search_result li:first").addClass("selected");
                } else {
                    obj.next().addClass("selected");
                }
                return;
            }
            if (event.keyCode == 13) {
                // 确认
                if(obj.length > 0)
                    window.location.href = "index-2.htm"/*tpa=http://www.tea7.com/baike/*/ + obj.data("id") + ".html";
                return;
            }
           
        }
        //搜索框发生改变
        input_seach_keyup = null;
        input_seach_keyup = setTimeout(function () {
            SeachBaiKeKey($("#input_search").val());
        }, 600);
    });
}
$("#close_search_result").click(function () {
    $("#search_result_parent").hide();
    $("#search_result").html("");
});
$("#btnInEntry").click(function () {
    //进入词条

    if ($("#input_search").val() != "")
    {
        GetTags($("#input_search").val());
    }

});
///回车跳转
$("#input_search").keyup(function () {
    if (event.keyCode == 13) {
        window.location.href = "http://www.tea7.com/baike/seach?key=" + $.trim($("#input_search").val());
        return;
    }
});
$("#btnSearchEntry").click(function () {
    // 搜索词条
    $(".HidKey").val($("#input_search").val());
    $("#close_search_result").trigger("click");
    //GetEntry($("#input_search").val());
    window.location.href = "http://www.tea7.com/baike/seach?key="+$.trim($("#input_search").val());
});
function GetTags(Key)
{
    $.ajax({
        type: "POST",
        url: "/Encyclopedia/SearchTag",
        data: {
            Key: Key
        },
        success: function (msg) {
            if (msg.length <= 0) {
                $("#btnSearchEntry").trigger("click");
            }
            else {
                window.location.href = "index-2.htm"/*tpa=http://www.tea7.com/baike/*/+msg.Id+".html";
            }
        }
    });
}
function GetEntry(key)
{
    $.ajax({
        type: "POST",
        url: "/baike/seach",
        data: {
            Key:key
        },
        success: function (msg) {
            $(".bklist-wrapper").html(msg);
        }
    });
}
function SeachBaiKeKey(txt) {
    if (input_seach_keyup != null) {
        $.ajax({
            url: "/json/GetEasyEntrys",
            data: { key: escape(txt) },
            type: "POST",
            success: function (json) {
                $("#search_result").html("");
                if (json.length > 0) {
                    $("#search_result_parent").show();
                    $(json).each(function (i) {
                        var li = $('<li data-id="' + json[i].Id
                            + '" class="matched">' + json[i].Title.replace(txt, '<span class="highlight">' + txt + '</span>') + '</li>').click(function () {
                                window.location.href = "index-2.htm"/*tpa=http://www.tea7.com/baike/*/ + $(this).data("id") + ".html";
                            });
                        $("#search_result").append(li);
                    })
                } else {
                    $("#search_result_parent").hide();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    }
}
//<ul id="search_result_parent" class="suggestion" style="display: none;">
//             <div id="search_result">
//                 <!--<li class="matched"><span class="highlight">竹</span>达彩奈</li>-->
//             </div>
//             <li class="extra"><span id="close_search_result">关闭</span> </li>
//         </ul>