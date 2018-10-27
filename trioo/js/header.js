// 复用头部和尾部
define(["jquery", "template"],function($, template){
    function Header(){
        this.load();
        this.renderList();
    }
    Header.prototype = {
        constructor:Header,
        //加载头部、尾部
        load : function(){
            //头部
            $.get("/html/include/header.html",$.proxy(this.headerHandler, this));
            //尾部
            $("footer").load("/html/include/footer.html");
        },
        //处理头部信息
        headerHandler: function(data){
            //将get获取的数据渲染到页面中
            $("header").html(data);
            //添加监听事件
            this.addListener();
        },
        //注册监听事件
        addListener: function(){
        //点击事件:将子元素上的事件为派给祖先元素
        $(".search>input:nth-child(2)").on("click", this.searchHandler); 
        //为“搜索”框添加绑定按键事件
        $(".search>input:first").keyup(this.searchHandlerListener);
        //为“suggest”孩子绑定点击事件
        $(".suggest").on("click", "div", this.suggestHandler);
        //鼠标移入移出
        this.remove();
        },
        remove: function(){
            $(".men-a,.woman-a,.last-a").mouseenter(this.navEnter);
            $(".men-a,.woman-a,.last-a").mouseleave(this.navLeave);
            $(".p_men").mouseenter(()=>{$(".p_men").stop().fadeIn(200)});
            $(".p_men").mouseleave(()=>{$(".p_men").stop().fadeOut(200)});
            $(".p_women").mouseenter(()=>{$(".p_women").stop().fadeIn(200)});
            $(".p_women").mouseleave(()=>{$(".p_women").stop().fadeOut(200)});
            $(".p_last").mouseenter(()=>{$(".p_last").stop().fadeIn(200)});
            $(".p_last").mouseleave(()=>{$(".p_last").stop().fadeOut(200)});
        },
        //鼠标移入导航
        navEnter: function(){
            $(this).next().stop().fadeIn();
        },
        //鼠标移出导航
        navLeave: function(){
            $(this).next().stop().fadeOut();
        },
        //点击图片显示输入框
        searchHandler: function(){
            $(".search").width(180);
            $(".search>input:first").width(150);
            $(".search>input:first").css('display','block');
        },
         //处理搜索框事件
        searchHandlerListener: function(){
            var word = $(this).val(),
            url = `https://suggest.taobao.com/sug?code=utf-8&q=${word}&callback=?`;
            $.getJSON(url, function(data){
                var html ="";
                data.result.forEach(function(curr){
                    html += `<div>${curr[0]}</div>`
                });
                $(".suggest").html(html);
            });
        },
        //点击提示
        suggestHandler: function(){
            $(".search>input:first").val($(this).text());
            $(".suggest").empty();
        },
        // 渲染列表数据
        renderList: function() {
            $.ajax("http://rap2api.taobao.org/app/mock/95025/api/header-list")
              .done(function(data) {
                //获取图片
                // 待渲染的数据
                var dataImg = {body: data.res_body};
                var data = {list: data.res_body.list};
                // 渲染
                var dataImgHtml = template("header_img_men", dataImg);
                var html = template("header_list", data);
                html += dataImgHtml;
                $(".p_men").html(html);
                dataImgHtml = template("header_img_women", dataImg);
                html = template("header_list", data);
                html += dataImgHtml;
                $(".p_women").html(html);
                dataImgHtml = template("header_img_last", dataImg);
                html = template("header_list", data);
                html += dataImgHtml;
                $(".p_last").html(html);
              });
        }
    }
    new Header();
});
