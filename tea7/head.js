// 如果用户登录修改用户登录的状态
jQuery.getJSON("/json/GetCurrentCustomer", function (data) {
    if (data.IsGuest == false) {
        var userName = data.Name;
        if (userName == "" || userName == null)
            userName = "茶友" + data.Id;
        $(".topbar_user").html('<a href="http://www.tea7.com/customer/info" class="name" rel="nofollow">' + userName + '</a>  &nbsp;[<a href="head.js"/*tpa=http://www.tea7.com/logout*/>退出</a>]');
        $(".topbar_user").after(
        '<li class="more_menu" id="header_mymember">' +
        '   <a href="http://www.tea7.com/orders" rel="nofollow">我的茶七</a>'+
        '   <i class="iconfont arrow"> </i>'+
        '   <div class="more_bd">'+
        '       <div class="list">'+
        '           <a href="http://www.tea7.com/customer/info" rel="nofollow">个人资料</a>' +
        '           <a href="http://www.tea7.com/orders" rel="nofollow">我的订单</a>'+
        '           <a href="http://www.tea7.com/customer/coindetail" rel="nofollow">我的茶币</a>' +
                '   <a href="loginsms-UrlReferrer=http---www.tea7.com-UserCenter-MyCoupons.htm"/*tpa=http://www.tea7.com/UserCenter/MyCoupons*/ rel="nofollow">我的优惠券</a>' +
        '           <a href="http://www.tea7.com/addresses" class="last" rel="nofollow">修改收货地址</a>'+
        '       </div>'+
        '   </div>'+
        '</li>');
        // public.js 中有加载
        //$('#header_mymember').delegate("hover").hover(function () {
        //    $(this).toggleClass('hover');
        //});
        //加载购物车的内容
        $('#flyout-cart').load("/ShoppingCart/GetMiniShopping", function () {
            var num = parseInt($("#cartlist").text());
            if (isNaN(num)) num = 0;
            jQuery(".cartnum").html(num);
            if (num > 0)
                jQuery(".cartnum").css({ "visibility": "visible" });
        });
    }
});
// 热门搜索
jQuery(".head_search_hot").append('<a href="大红袍.htm"/*tpa=http://www.tea7.com/search/%E5%A4%A7%E7%BA%A2%E8%A2%8D*/ target="_blank" rel="nofollow">大红袍</a>' +
    '<a href="铁观音.htm"/*tpa=http://www.tea7.com/search/%E9%93%81%E8%A7%82%E9%9F%B3*/ target="_blank" rel="nofollow">铁观音</a>' +
    '<a href="金骏眉.htm"/*tpa=http://www.tea7.com/search/%E9%87%91%E9%AA%8F%E7%9C%89*/ target="_blank" rel="nofollow">金骏眉</a>');

//搜索按钮
jQuery(".sea_submit").click(function () {
    var value = jQuery("#small-searchterms").val();
    if (value == "搜索所有商品" || value == "") {
        alert("请输入您要搜索的商品信息！");
        return false;
    }
});

function delcartshop(id, count) {
    jQuery("#" + id + " .del").html("正在删除..");
    jQuery.ajax({
        type: 'POST',
        url: "/ShoppingCart/RemoveCartItem",
        data: { sciId: id },
        dataType: 'json',
        success: function (data) {
            if (data.success == "1") {
                jQuery("#" + id).remove();
                var num = parseInt(jQuery("#cartlist").html()) - count;
                jQuery("#cartlist").html(num);
                jQuery(".cartnum").html(num);
            } else {
                alert("系统忙,请稍后再试！");
                jQuery("#" + id + " .del").html("删除");
            }
        }
    });
}
AjaxCart.init(true, '.cartnum', '', '#flyout-cart');
jQuery(function () {
    jQuery("#sidebar_cartnum").html(0);
});