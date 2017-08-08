//收藏本站
function AddFavorite(title, url) {
    try {
        window.external.addFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
$(document).ready(function () {

    function Public(){};

    Public.prototype = {
        //初始化
        init : function () {
            ly.Snow();
            ly.Welcome('.welcome', 'Welcome to my Blog!', '.cover');
        },
        goBlog : function () {
            ly.Nav('.Header', '.footer', '.cover-footer');
            ly.Hover('#HeaderLeft', 'li', 'ul');
            ly.Hover('.nav-tel', 'li', 'span', 'img', 'fixImg');
            ly.Focus('.HeaderMiddle', '.search');
        },
        //导航条显示
        Nav : function (nav, foot, cfoot) {
            var $nav = $(nav);
            var $foot = $(foot);
            var $cfoot = $(cfoot); 
            $nav.show();
            var $dh = $(document).height();
            var $wh = $(window).height();
            var $h = $dh - $wh;
            $(window).scroll(function () {
                var $s = $(window).scrollTop();
                if ($s >= $h) {
                    $nav.hide();
                    $cfoot.hide();
                    $foot.show();
                } else {
                    $foot.hide();
                    $cfoot.show();
                    $nav.show();
                }
            });
        },
        //导航条hover效果
        Hover : function (pe, se, ce, cetwo, ceClass) {
            var $pe = $(pe);
            $pe.on('mouseover', se, function () {
                $(this).children(ce).show();
                $(this).children(cetwo).addClass(ceClass);
            });
            $pe.on('mouseout', se, function () {
                $(this).children(ce).hide();
                $(this).children(cetwo).removeClass(ceClass);
            });
        },
        //雪花特效
        Snow : function () {
            var x = 0;
            function snow(){
                var $snow = $('.snow');
                $snow.remove();
                var snow = '';
                var iNow = parseInt(Math.random()*3 + 3);
                for (var i = 0; i < iNow; i++) {
                    var left = Math.random()*$(window).width();
                    snow += '<div class="snow" style="left:'+ left + 'px"></div>';
                };
                $('body').append(snow);   
            };
            snow();
            function draw(){
                x=x+1;
                var $snow = $('.snow');
                $snow.css('top', x);
                if(x>$(window).height()){
                    x=0;
                    snow();       
                };
            };
            var drawTimer = setInterval(draw, 20);
        },
        //聚焦
        Focus : function (pe, ce) {
            var $span = $(pe).children('span');
            var $search = $(ce);
            $search.focus(function () {
                $(document).keydown(function (e) {
                    if (e.keyCode == 13) {
                       console.log('搜索功能暂时无法使用,谢谢！！！');
                       $span.eq(0).siblings().css('display', 'none');
                    } 
                });  
                $span.css('display','block').eq(0).siblings().click(function () {
                    $search.val($(this).html());
                    $span.eq(0).siblings().css('display', 'none'); 
                });
            });
        },
        //打字
        Welcome : function (e, str, wrap) {
            var wordTimer = setInterval(wT, 100);
            var word = 0;
            var $welcome = $(e);
            function wT(){
                var val = str.substring(0, word++);
                $welcome.html(val);
                if (val == str) {
                    $welcome.animate({width: '80%'}, 2000, function() {
                        ly.Cover(wrap, e);
                    });
                    clearInterval(wordTimer);  
                };	
            };
        },
        //遮罩
        Cover : function (wrap, e) {
            var $wrap = $(wrap);
            $wrap.height($(window).height()).width($(window).width());
            $wrap.children('button').each(function(i, val) {
                $(this).show();
                $(this).click(function() {
                    $(wrap).hide();
                    $(e).hide();
                    $('body').addClass('body-bg');
                    ly.goBlog();
                });
            });
        }
    };
    
    //实例化我的博客对象
    var ly = new Public();
    ly.init();
    
    
})

