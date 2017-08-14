$(document).ready(function () {

    function Public(){};

    Public.prototype = {
        //初始化
        init : function () {
            debugger
            ly.Snow();
            ly.Welcome('.welcome', 'Welcome to my Blog!', '.cover');
        },
        goBlog : function () {
            debugger
            ly.Nav('.Header', '.footer', '.cover-footer');
            ly.Hover('#HeaderLeft', 'li', 'ul');
            ly.Hover('.nav-tel', 'li', 'span', 'img', 'fixImg');
            ly.Focus('.HeaderMiddle', '.search');
        },
        //导航条显示
        Nav : function (nav, foot, cfoot) {
            debugger
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
            debugger
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
            debugger
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
            debugger
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
            debugger
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
            debugger
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
     
});

//收藏本站
function AddFavorite(title, url) {
    debugger
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
};

//echarts图表
$.ajax({
    type: 'get',
    url: 'data/echarts.json',
    success: function (result, statusText, xhr) {
        debugger
        var arr = result;
        //生成下拉框
        var opt = '';
        var productArr = [];
        for (var i = 0; i < arr.length; i++ ) {
            //去掉重复的product
            if (productArr.indexOf(arr[i].name) == -1) {
                productArr.push(arr[i].name);
                opt += '<option>' + arr[i].name + '</option>';
            };
        };
        $('#parent').html(opt);

        //初始化图表
        var chartModel = 'bar';
        var pt1 = arr[0].name;
        var unitArr = ['100', '200', '300', '400', '500', '600', '700'];
        var dateArr = ['2017-08-01', '2017-08-02', '2017-08-03', '2017-08-04', '2017-08-05', '2017-08-06', '2017-08-07'];
        setChart();

        //下拉框控制图表名
        var $parent = $('#parent');
        $parent.change(function () {
            var $opt = $(this).children('option:selected').val();
            pt1 = $opt;
            setChart();
            //每次点击都初始化一遍
            unitArr = [];
            dateArr = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].name == $opt) {
                    unitArr.push(arr[i].unit);
                    dateArr.push(arr[i].date);
                };
            };
        });

        //下拉框控制图表模型
        var $chart = $('#chart');
        $chart.change(function () {
            var $chartOpt = $(this).children('option:selected').val();
            chartModel = $chartOpt;
            setChart();
        });

        //echarts封装
        function setChart() {
            debugger
            var option = {
            //标题
            title : {
                text : '健康周期表',
                x : 'center',
                y : 'top',
                subtext : '体脂表',
            },
            tooltip : {
                trigger : 'axis'
            },
            toolbox : {
                show : true,
                feature : {
                    dataView : {realyOnly : false},
                    magicType : {type : ['line', 'bar']},
                    restore : {},
                    saveAsImage : {}
                }
            },
            legend : {
                left : 'left',
                top : '5%',
                data : [pt1]
            },
            grid : {
                top : '20%',
                left : '3%',
                right : '4%',
                bottom : '3%',
                containLabel : true
            },
            xAxis : {
                type : 'category',
                boundaryGap : false,
                data : dateArr
            },
            yAxis : {
                type : 'value',
                position : 'right',
                name : '体重(KG)',
                nameLocation : 'middle',
                nameRotate : '270',
                splitNumber : '3',
                nameGap : 40,
                axisLine : {
                    show:false
                }
            },
            series : [{
                name : pt1,
                type : chartModel,
                data : unitArr
            }]
        };
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption(option);

        };
    }
});


            
        


