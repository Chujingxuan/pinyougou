$(function () {
    //节流阀
    var flag = true;
    //显示和隐藏电梯导航
    function toggleTool() {
        if ($(document).scrollTop() >= $('.recom').offset().top) {
            $('.fixedtool').fadeIn();
        } else {
            $('.fixedtool').fadeOut();
        }
    }
    toggleTool();
    $(window).scroll(function () {
        toggleTool();
        //滚动到对应模块添加current类
        if (flag) {
            $('.floor .w').each(function (i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $('.fixedtool li').eq(i).addClass('current').siblings().removeClass();
                }
            })
        }
    });
    //点击对应内容跳转到对应模块
    $('.fixedtool ul li').click(function () {
        flag = false;
        var index = $(this).index();
        //点击给添加current类
        $(this).addClass('current').siblings().removeClass('current');
        var floorTop = $('.floor .w').eq(index).offset().top;
        $('html,body').stop().animate({
            scrollTop: floorTop
        }, function () {
            flag = true;
        })
    })
})