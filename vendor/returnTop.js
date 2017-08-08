var $backToTopEle = $('<div id="returnTop"></div>').appendTo($("body")).click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
}), $backToTopFun = function () {
    var st = $(document).scrollTop(), winh = $(window).height();
    (st > 0) ? $backToTopEle.show() : $backToTopEle.hide();
    //IE6
    if (!window.XMLHttpRequest) {
        $backToTopEle.css("top", st + winh - 166);
    }
};
$(window).bind("scroll", $backToTopFun);
$(function () { $backToTopFun(); });