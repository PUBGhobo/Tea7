var LoadEntryParms = { TagId: -1, Page: 0, PageSize: 50, TypeId: $(".hidTypeid").val() };
$(function () {

    //$('#slides').slideBox();
    //大类链接
    var Urlhtml = "";
    Urlhtml+=' <li class="list " data-TypeId="4"><a href="http://www.tea7.com/scripts/baike/Oolong.html" class="tea1"></a></li>';
    Urlhtml+=' <li class="list " data-TypeId=""><a href="http://www.tea7.com/scripts/baike/BlackTea.html" class="tea2"></a></li>';
    Urlhtml+=' <li class="list " data-TypeId="1"><a href="http://www.tea7.com/scripts/baike/RedTea.html" class="tea3"></a></li>';
    Urlhtml+=' <li class="list " data-TypeId="2"><a href="http://www.tea7.com/scripts/baike/GreenTea.html" class="tea4"></a></li>';
    Urlhtml+=' <li class="list " data-TypeId=""><a href="http://www.tea7.com/scripts/baike/YellowTea.html" class="tea5"></a></li>';
    Urlhtml += ' <li class="list last" data-TypeId="3"><a href="http://www.tea7.com/scripts/baike/WhiteTea.html" class="tea6"></a></li>';
    $("#divTea ul").eq(0).html(Urlhtml);     
    // 给出词条总数
    if ($(".more").length > 0) {
        $.ajax({
            url: "/API/Baike/GetEntryCount",
            type: "POST",
            success: function (json) {
                $("http://www.tea7.com/scripts/baike/.more .sum").html(json.DataValue);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
        // 给出点赞总数
        $.ajax({
            url: "/API/Baike/GetSuportTotal",
            type: "POST",
            success: function (json) {
                $("http://www.tea7.com/scripts/baike/.more .city").html(json.DataValue);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    }
    if ($("#tab").length > 0) {
        // 给出标签列表
        $.ajax({
            url: "/API/Baike/GetHotTags",
            data: { size: 10, type: LoadEntryParms .TypeId},
            type: "POST",
            success: function (json) {
                var tab = $("#tab");
                if (json.length > 0) {
                    $(json).each(function (i) {
                        tab.append('<li><a   onclick="javascript:LoadEntry(' + json[i].Id + ')" class="all" data-id="' + json[i].Id + '"> ' + json[i].Name + '<span> ' + json[i].UseTotal + '</span> </a></li>');
                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown)
            {

            }
        });

    }
    LoadEntry(0,0,1);
    ///
    $("#divTea ul").css("display", "none");
    $("#divTea ul").eq(0).css("display", "block");
    $(".openpdlist").click(function () {
        if ($(this).attr("data-id") == "1") {
            $("#divTea ul").css("display", "block");
            $(this).attr("data-id", "2");
            $(this).html("隐藏");
        }
        else {
            $("#divTea ul").css("display", "none");
            $("#divTea ul").eq(0).css("display", "block");
            $(this).attr("data-id", "1");
            $(this).html("展开");
        }
    });


});
//$(".list").click(function () {
//    LoadEntry(0, $(this).attr("data-TypeId"));
//});

function LoadEntry(tagId, TypeId,Mark) {
    if (LoadEntryParms.TypeId != 0) {
        ///加载最新词条，阅读量排行

        $.ajax({
            url: "/Encyclopedia/GetEntryList",
            data: { TypeId: LoadEntryParms.TypeId, tagId: tagId, Mark: 0 },
            type: "POST",
            cache:false,
            success: function (json) {
                var html = "";
                if (json.length > 0)
                {
                    for (var i = 0; i < json.length; i++) {
                        html += '<li><a href="http://www.tea7.com/baike/'+json[i].Id+'.html" target="_blank">'+json[i].Title+'</a></li>';
                    }
                }
                $("#ZXEnry").append(html);
            },
        });
        $.ajax({
            url: "/Encyclopedia/GetEntryList",
            data: { TypeId: LoadEntryParms.TypeId, tagId: tagId, Mark: 1 },
            type: "POST",
            success: function (json) {
                var html = "";
                if (json.length > 0) {
                    for (var i = 0; i < json.length; i++) {
                        html += '<li><a href="http://www.tea7.com/baike/' + json[i].Id + '.html" target="_blank">' + json[i].Title + '</a></li>';
                    }
                }
                $("#YDEntry").append(html);
            },
        });
    }
    $("#tab li ").removeClass("current");
    $("#tab li ").eq($("#tab li ").index($("#tab a[data-id='" + tagId + "']").parent())).addClass("current");
    // 如果编号不同，页面设置成 0
    if (tagId != LoadEntryParms.TagId)
    {
        LoadEntryParms.TagId = tagId;
        LoadEntryParms.Page = 0;
        $(".flow-group .flowoption").remove();
    } else {
        return;
    }
    if (Mark != 1) {
        $.ajax({
            url: "/API/Baike/GetEntryList",
            data: { pagesize: LoadEntryParms.PageSize, page: LoadEntryParms.Page, tagId: LoadEntryParms.TagId, TypeId: LoadEntryParms.TypeId },
            type: "POST",
            success: function (json) {
                var tab = $("#tab");
                if (json.length > 0) {
                    var _html = "";
                    $(json).each(function (i) {
                        _html += '<div  data-url="/baike/' + json[i].Id + '.html"  class="flowoption card card-flow clearfix">' +
                                '  <a class="mask" href="http://www.tea7.com/baike/' + json[i].Id + '.html"><img src="' + json[i].CoverImagePath + '" width="230" /></a> ' +
                                '  <div class="card-info">' +
                                '  <p><a class="title" target="_blank" href="http://www.tea7.com/baike/' + json[i].Id + '.html">' + json[i].Title + '</a><span class="category">'
                            + json[i].TypeName + '</span></p><p class="desc">'
                            + json[i].ShortDescription + '</p>     <a class="other hand love" href="javascript:AddVote1('
                            + json[i].Id + ')"  ><span class="plus">+1</span>赞 (<span class="vote-count_'
                            + json[i].Id + '">' + json[i].SupportNumber + '</span>)</a></div></div>';
                    });
                    jQuery("#flow").append(_html);
                    opt.load_index = 0;
                    jQuery("#flow").waterfall(opt);
                    jQuery("#loading").hide();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    }
    else {
        opt.load_index = 1;
        jQuery("#flow").waterfall(opt);
    }
}

function toPage(me) {
    //onclick="toPage(this)"
    window.location.href = $(me).data("url");
}

var opt = {
    column_width: 230, load_index: 0, hasloadedcomption: true, cell_selector: ".flowoption", column_className: "flow-group", auto_imgHeight: true, insert_type: 1,
    getResource: function (index, render) {
        index++;
        var obj = this;
        obj.hasloadedcomption = false;
        jQuery("#loading").show();
        LoadEntryParms.Page = index - 1;
        jQuery.getJSON("/API/Baike/GetEntryList", { pagesize: LoadEntryParms.PageSize, page: LoadEntryParms.Page, tagId: LoadEntryParms.TagId, TypeId: LoadEntryParms.TypeId }, function (json) {
            if (json != null && json.length > 0) {
                var _html = "";
                $(json).each(function (i) {
                    //_html += '<div  data-url="/baike/' + json[i].Id + '.html" onclick="toPage(this)" class="flowoption card card-flow clearfix"><div class="mask"><img src="' + json[i].CoverImagePath + '" width="230"></div> <div class="card-info">     <p><a class="title" target="_blank">' + json[i].Title + '</a><span class="category">' + json[i].TypeName + '</span></p><p class="desc">' + json[i].ShortDescription + '</p>     <a class="other hand love" href="javascript:void(0)" data-id="2034032"><span class="plus">+1</span>赞 (' + json[i].SupportNumber + ')</a></div></div>';
                    _html += '<div  data-url="/baike/' + json[i].Id + '.html"  class="flowoption card card-flow clearfix">' +
                            '  <a class="mask" href="http://www.tea7.com/baike/' + json[i].Id + '.html"><img src="' + json[i].CoverImagePath + '" width="230" /></a> ' +
                            '  <div class="card-info">' +
                            '  <p><a class="title" target="_blank" href="http://www.tea7.com/baike/' + json[i].Id + '.html">' + json[i].Title + '</a><span class="category">'
                        + json[i].TypeName + '</span></p><p class="desc">'
                        + json[i].ShortDescription + '</p>     <a class="other hand love" href="javascript:AddVote1('
                        + json[i].Id + ')"  ><span class="plus">+1</span>赞 (<span class="vote-count_'
                        + json[i].Id + '">' + json[i].SupportNumber + '</span>)</a></div></div>';
                });
                $("#flow1").append(_html); //将加载的数据插入到B容器中
                render($("#flow1").find(".flowoption").detach(), false); //循环取数据 组成一个元素 返回给系统提供的Render()方法
                obj.hasloadedcomption = true;
                if (json.length < 15)
                    obj.hasloadedcomption = false;
            }
            //else {
            //    obj.hasloadedcomption = true;
            //}
            jQuery("#loading").hide();
        });
    }
};

