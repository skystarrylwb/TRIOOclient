//引入配置所需的模块
require(["config"],function(){
    require(["jquery", "template", "header"], function($, template){
        function Index(){
            this.right();
            this.play();
            this.homepages();
            this.contnet();
            this.cut();
            this.fashion();
            // this.fashiondata();
        }
        Index.prototype = {
                constructor:Index,
                //右侧吸顶
                right: function(){
                    $(window).scroll(function() {
                        if($(this).scrollTop()>=700){
                            $(".customerServices").css({display:"block"});
                        }else{
                            $(".customerServices").css({display:"none"});
                        }
                    });
                },
                //轮播图
                play: function(){
                        var lis = $(".banner>ul").find('li'), // 所有轮播的图片
                        length = lis.length,// 图片张数
                        liWidth = lis[0].offsetWidth // li 宽度
                        ul = $(".banner>ul")[0], // UL
                        currentIndex = 1, // 当前显示图片的索引
                        nextIndex = 2, // 即将显示图片的索引
                        isRunning = false; // 是否正在切换过程中，false否   true是(如果连续快速点击翻页可能出现空白，添加该标记解决这个问题)
                        console.log(liWidth);
                        // 复制第一张与最后一张图片
                        var first = lis[0].cloneNode(true),
                            last = lis[length - 1].cloneNode(true);
                        // 将 first 追加到最后，将 last 插入头部
                        ul.appendChild(first);
                        ul.insertBefore(last, lis[0]);
                        // 图片张数 +2
                        length += 2;

                        // 动态计算 ul 的宽度
                        ul.style.width = liWidth * length + "px";
                        // 默认显示内容1的图片
                        ul.style.left = -liWidth + "px";
                        // 切换
                        function move() {
                            // 标记正在切换过程中(为了解决连续快速点击翻页可能出现空白问题)
                            isRunning = true;
                            // 求运动定位目标终点值
                            var _left = -nextIndex * liWidth;
                            // 运动动画
                            $(".banner>ul").animate({left: _left}, 200, function(){
                                // 运动结束后，判断是否还原
                                if (currentIndex === length - 1) { // 切换到最后，还原显示第一张内容
                                    currentIndex = 1;
                                    nextIndex = 2;
                                    ul.style.left = -liWidth + "px";
                                } else if (currentIndex === 0) { // 切换到最前，还原显示最后一张内容
                                    currentIndex = length - 2;
                                    nextIndex = length - 1;
                                    ul.style.left = -(length-2) * liWidth + "px";
                                }
                                // 运动结束，切换完毕(为了解决连续快速点击翻页可能出现空白问题)
                                isRunning = false;
                            })
                            // 修改索引
                            currentIndex = nextIndex;
                            nextIndex++;
                        }

                        // 自动轮播
                        var timer = setInterval(move, 3000);

                        /* 鼠标移入/移出容器，停止/重启自动轮播 */
                        $(".banner>ul").mouseenter(()=> {
                            clearInterval(timer);
                        });
                        $(".banner>ul").mouseleave(()=> {
                            timer = setInterval(move, 3000);
                        });
                        /*向前/后翻页*/
                        $(".prev").on("click", function() {
                            if (isRunning) // 当前正在翻页切换过程中，不再切换
                                return;
                            // 向前翻页，即将显示图片索引为：当前图片索引-1
                            nextIndex = currentIndex - 1;
                            // 切换翻页
                            move();
                        });
                        $(".next").on("click", function(){
                            if (isRunning) // 当前正在翻页切换过程中，不再切换
                                return;
                            // 切换翻页
                            move();
                        });
                        // 阻止双击选中文本：双击选中 "<" 或 ">" 符号
                        $(".prev").on("selectstart", function(event){
                            event.preventDefault();
                        });
                        $(".next").on("selectstart", function(event){
                            event.preventDefault();
                        });
                },
                //加载homepages中的图片
                homepages: function(){
                    $.ajax("http://rap2api.taobao.org/app/mock/95025/api/index-homepages")
                    .done(function(data) {
                        //获取图片
                        // 待渲染的数据
                        var data = {list: data.res_body.list};
                        // 渲染
                        var html = template("homepages_html", data);
                        $(".homepages").html(html)
                        });
                },
                //渲染列表
                contnet: function(){
                    $.ajax("http://rap2api.taobao.org/app/mock/95025/api/index-content")
                    .done($.proxy(this.addListener, this))
                },
                //监听事件
                addListener:function(data){
                    this.show(data);
                    this.cartoon();
                },
                //渲染数据
                show: function(data){
                    // 待渲染的数据
                        var data = {list: data.res_body.list},
                            dataArr = data.list;
                        console.log(data);
                        //定义新数组及变量
                        var arr = new Array(4);
                        var cunt=0,cut=0;
                        //遍历将list数组分成4份，每一份3个数组
                        for(let i=0,len=dataArr.length; i<4; i++){
                            for(let j=0;j<3;j++){
                                cunt++;
                            }
                            arr[i]=dataArr.slice(cut, cunt);
                            cut = cunt;
                        }
                        //将数组放入对象
                        dataz = {
                            arr0 : arr[0]
                        }
                        datat = {
                            arr1 : arr[1]
                        }
                        datas = {
                            arr2 : arr[2]
                        }
                        dataf = {
                            arr3 : arr[3]
                        }
                        // 渲染
                        var html = template("content_dl_zero", dataz);
                        $(".content-zero").html(html);
                        var html = template("content_dl_one", datat);
                        $(".content-one").html(html);
                        var html = template("content_dl_three", datas);
                        $(".content-three").html(html);
                        var html = template("content_dl_four", dataf);
                        $(".content-four").html(html);
                },
                //动画效果
                cartoon: function(){
                    this.cartoonmove($(".content-zero"),0.5);
                    this.cartoonmove($(".content-one"),0.5);
                    this.cartoonmove($(".content-three"),0.5);
                    this.cartoonmove($(".content-four"),0.5);
                },
                //动画效果的复用函数封装
                cartoonmove: function(z,x){
                        var zero_one = z.find("dl:first>a"),
                            zero_t = z.find("dl:nth-child(2)>a"),
                            zero_w = z.find("dl:last>a");
                        //动画效果
                        z.find("dl:first>dt>img").mouseenter(function(){
                            zero_one.css('display', 'block');
                            zero_one.stop().animate({
                                opacity:x
                            },500);
                        });
                        z.find("dl:first>a").mouseenter(function(){
                            zero_one.stop().animate({
                                opacity:x
                            },10);
                            zero_one.css('display', 'block');
                        });
                        z.find("dl:first>a").mouseleave(function(){
                            zero_one.stop().animate({
                                opacity:0
                            },500);
                            zero_one.css('display', 'none');
                        });
                        z.find("dl:first>dt>img").mouseleave(function(){
                            zero_one.stop().animate({
                                opacity:0
                            },10);
                            zero_one.css('display', 'none');
                        });
                        //zero_t的动画效果
                        z.find("dl:nth-child(2)>dt>img").mouseenter(function(){
                            zero_t.css('display', 'block');
                            zero_t.stop().animate({
                                opacity:x
                            },500);
                        });
                        z.find("dl:nth-child(2)>a").mouseenter(function(){
                            zero_t.stop().animate({
                                opacity:x
                            },10);
                            zero_t.css('display', 'block');
                        });
                        z.find("dl:nth-child(2)>a").mouseleave(function(){
                            zero_t.css('display', 'none');
                            zero_t.stop().animate({
                                opacity:0
                            },500);
                        });
                        z.find("dl:nth-child(2)>dt>img").mouseleave(function(){
                            zero_t.stop().animate({
                                opacity:0
                            },10);
                            zero_t.css('display', 'none');
                        });
                        //zero_w的动画效果
                        z.find("dl:last>dt>img").mouseenter(function(){
                            zero_w.css('display', 'block');
                            zero_w.stop().animate({
                                opacity:x
                            },500);
                        });
                        z.find("dl:last>a").mouseenter(function(){
                            zero_w.stop().animate({
                                opacity:x
                            },10);
                            zero_w.css('display', 'block');
                        });
                        z.find("dl:last>a").mouseleave(function(){
                            zero_w.css('display', 'none');
                            zero_w.stop().animate({
                                opacity:0
                            },500);
                        });
                         z.find("dl:last>dt>img").mouseleave(function(){
                            zero_w.stop().animate({
                                opacity:0
                            },10);
                            zero_w.css('display', 'none');
                        });
                },
                //无缝切换
                cut: function(){
                    var lists = $(".designer-lists>li"),
                        len = lists.length,
                        ul = $(".designer-img>li>a>img")[0],
                        liWidth = -ul.offsetWidth;
                    $("#des1").mouseenter(function(){
                        $(".designer-img").css({left:0});
                    });
                    $("#des2").mouseenter(function(){
                        $(".designer-img").css({left:liWidth*1});
                    });
                    $("#des3").mouseenter(function(){
                        $(".designer-img").css({left:liWidth*2});
                    });
                    $("#des4").mouseenter(function(){
                        $(".designer-img").css({left:liWidth*3});
                    });
                    $("#des5").mouseenter(function(){
                        $(".designer-img").css({left:liWidth*4});
                    });
                    $("#des6").mouseenter(function(){
                        $(".designer-img").css({left:liWidth*5});
                    });
                    $("#des7").mouseenter(function(){
                        $(".designer-img").css({left:liWidth*6});
                    });
                    $("#des8").mouseenter(function(){
                        $(".designer-img").css({left:liWidth*7});
                    });
                    $("#des9").mouseenter(function(){
                        $(".designer-img").css({left:liWidth*8});
                    });
                },
                fashion: function(){
                    //获取api的数据
                    $.ajax("http://rap2api.taobao.org/app/mock/95025/api/fashion")
                    .done($.proxy(this.allFashion, this))
                },
                //allFashion的数据渲染及动态效果的交互
                allFashion: function(data){
                    this.fashionData(data);
                    this.fashionCartoon();
                },
                //allFashion数据渲染
                fashionData: function(data){
                    // 待渲染的数据
                    var data = {lists: data.res_body.lists};
                    var html = template("fa", data);
                    console.log(data);
                    $(".allFashion").html(html);
                },
                //allFishion的动态交互
                fashionCartoon: function(){
                    this.fashionCartoonVar($(".fa_one"),"rgba(116,217,225)");
                    this.fashionCartoonVar($(".fa_two"),"rgba(173,161,27)");
                    this.fashionCartoonVar($(".fa_three"),"rgba(121,42,100)");
                    this.fashionCartoonVar($(".fa_four"),"rgba(0,94,138)");
                    this.fashionCartoonVar($(".fa_five"),"rgba(0,0,0)");
                },
                //动画变量
                fashionCartoonVar: function(f,rgba){
                    f_top_one = f.find("div:first>a:nth-child(2)>dl>div:last"),
                    f_top_two = f.find("div:first>a:nth-child(3)>dl>div:last"),
                    f_bottom_one = f.find("div:nth-child(2)>a:nth-child(1)>dl>div:last"),
                    f_bottom_two = f.find("div:nth-child(2)>a:nth-child(2)>dl>div:last"),
                    f_bottom_three = f.find("div:nth-child(2)>a:nth-child(3)>dl>div:last");
                    this.fashionCartoonMain(f.find("div:first>a:nth-child(2)>dl>dt"),f_top_one,rgba);
                    this.fashionCartoonMain(f.find("div:first>a:nth-child(3)>dl>dt"),f_top_two,rgba);
                    this.fashionCartoonMain(f.find("div:nth-child(2)>a:nth-child(1)>dl>dt"),f_bottom_one,rgba);
                    this.fashionCartoonMain(f.find("div:nth-child(2)>a:nth-child(2)>dl>dt"),f_bottom_two,rgba);
                    this.fashionCartoonMain(f.find("div:nth-child(2)>a:nth-child(3)>dl>dt"),f_bottom_three,rgba);
                },
                //动画主体
                fashionCartoonMain: function(x,y,rgba){
                     //动画效果
                    x.mouseenter(function(){
                        y.css({background:rgba});
                        y.css({display:"block"});
                        y.stop().animate({
                            opacity:.5,
                        },400);
                    });
                    y.mouseenter(function(){
                        y.css({display:"block"});
                        y.stop().animate({
                            opacity:.5,
                        },10);
                    });
                    x.mouseleave(function(){
                        y.css({display:"none"});
                        y.stop().animate({
                            opacity:0,
                        },400);
                    });
                    y.mouseleave(function(){
                        y.css({display:"none"});
                        y.stop().animate({
                            opacity:0,
                        },10);
                    });
                }

    }
    new Index();
    });
});

