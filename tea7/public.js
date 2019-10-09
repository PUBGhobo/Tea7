function AddVote(id) {
    $.ajax({
        url: "/json/AddEntrysSuppert",
        data: { Id: id },
        type: "POST",
        success: function (json) {
            if (!json.Success) {
                if (json.Code == "301") {
                    displayPopupWarn("请先登录！", function () { window.location.href = "http://www.tea7.com/loginsms?UrlReferrer=" + encodeURI(document.URL); }, 3500);
                } else {
                    displayPopupWarn(json.Info, function () { }, 3500);
                }
            }
            $(".vote-count").html(json.DataValue);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        }
    });
}

function AddVote1(id) {
    //alert($(obj).parent().parent().parent().removeAttr("onclick"));
    //$(obj).parent().parent().parent().attr("onclick");
    $.ajax({
        url: "/json/AddEntrysSuppert",
        data: { Id: id },
        type: "POST",
        success: function (json) {
            if (!json.Success) {
                if (json.Code == "301") {
                    displayPopupWarn("请先登录！", function () { window.location.href = "http://www.tea7.com/loginsms?UrlReferrer=" + encodeURI(document.URL); }, 3500);
                } else {
                    displayPopupWarn(json.Info, function () { }, 3500);//3500
                }
            }
            $(".vote-count_"+id+"").html(json.DataValue);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        }
    });
}

$(function () {
    if ($(".baike-footer").length < 1) {
        $.get("/API/Template/GetPlusContent", { Name: "Foot", Channel: "baike" }, function (data) {
            $("body").append(data);
        });
    }
});