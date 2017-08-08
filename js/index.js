//设为首页
function SetHome(obj,url) {
    try{
        obj.style.behavior='url(#default#homepage)';
        obj.setHomePage(url);
    }catch(e){
        if(window.netscape){
            try{
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }catch(e){
                alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
            }
        }else{
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+url+"】设置为首页。");
        }
    }
}
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
        Blog : function () {
            ly.Nav('.Header');
            ly.Hover('#HeaderLeft', 'li', 'ul');
            ly.Hover('.nav-tel', 'li', 'span', 'img', 'fixImg');
            ly.Focus('.HeaderMiddle', '.search');
        },
        //导航条点击显示
        Nav : function (nav) {
            var $nav = $(nav);
            $(document).click(function () {
                $nav.toggle();
            });
            var $dh = $(document).height();
            var $wh = $(window).height();
            var $h = $dh - $wh;
            $(window).scroll(function () {
                var $s = $(window).scrollTop();
                if ($s > 0 && $s < $h) {
                    $nav.css({'display': 'block', 'position': 'fixed'})
                } else {
                    $nav.css('display','none')
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
                console.log(1)
                if (val == str) {
                    $welcome.animate({width: '80%'}, 2000, function() {
                        ly.Cover(wrap);
                    });
                    clearInterval(wordTimer);  
                };	
            };
        },
        //遮罩
        Cover : function (wrap) {
            var $wrap = $(wrap);
            $wrap.height($(window).height()).width($(window).width());
            $wrap.children('button').each(function(i, val) {
                $(this).show();
                $(this).click(function() {
                    $(wrap).hide();
                    ly.Blog();
                });
            });
        }
    };
    
    //实例化我的博客对象
    var ly = new Public();
    ly.init();
    
    
    
})

