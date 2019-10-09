$(function(){

$(".hd_nav .main_link").mouseenter(function () {
  
    $(".yincangf").show();
});
 $(".hd_nav .main_link").mouseleave(function () {
//     timer = setTimeout(function () {
         $(".yincangf").hide();
//     },0 );
});
$(".yincangf").hover(function () {
    $(".yincangf").show();},function(){
        $(".yincangf").hide();
    }) 

$(".agreen").mouseleave(function () {
    $(".yincangf").hide();
});

$(".sort_bd").on("click","a span",function(e){
    $(e.target).addClass("on").parent().siblings().children().removeClass("on");
});

})


$(".id1").hover(function(){
    $(".tip").show();},function(){
        $(".tip").hide();
    })