$(function () {
    //处理视频
    $(".loadQQVideo").each(function () {
        var defaultPic = $("#mainPic").attr("src");
        var width = $(".teanewsbox_con").width();
        var height = width / 4 * 3;
        var vid = $(this).attr("data-value");
        // 配合这个脚本 http://imgcache.qq.com/tencentvideo_v1/tvp/js/tvp.player_v2.js     
        var video = new tvp.VideoInfo();
        video.setVid(vid);
        video.setTitle(document.title);
        var player = new tvp.Player();
        player.create({
            width: width, height: height, video: video, modId: "mod_player_" + vid, autoplay: false
        });
    });
});