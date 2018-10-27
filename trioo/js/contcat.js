//引入配置所需的模块
require(["config"], function() {
    require(["jquery", "template", "header", "zoom", "fly", "cookie"], function($, template) {
        function Detail() {
            this.render();
        }

        Detail.prototype = {
            constructor: Detail,
            // 渲染详情页面数据
            render: function() {
                $.ajax("http://rap2api.taobao.org/app/mock/95025/api/contcat")
                    .done($.proxy(this.handleData, this));
            },
            // 处理ajax获取到的数据
            handleData: function(data) {
                // 获取使用数据
                var data = {list: data.res_body.list};
                // 渲染
                var html = template("contact", data);
                $(".contact-main-left").prepend(html);
                // 放大镜
                this.zoom();
                // 注册事件监听
                this.addListener();
                //单选情况
                $(".contact-big>ul>li>input").on("click", $.proxy(this.optFor, this));
            },
            // 放大镜效果
            zoom: function() {
                $(".middle-zoom").elevateZoom({
                    gallery:'gal1', 
                    cursor: 'pointer',
                    galleryActiveClass: 'activeZoom'
                });
            },
            addListener: function() {
                //鼠标事件：选定商品类型的列表
                $(".lightGlas").mouseenter(()=>{
                    $(".contact-particulars-meno").find('li:first').nextAll().removeClass('active');
                    $(".contact-big").children().removeClass('contact_ul');
                    $(".lightGlas").addClass('active');
                    $(".contact-big").find("ul:first").addClass('contact_ul');
                });
                $(".blueGlas").mouseenter(()=>{
                    $(".contact-particulars-meno").find('li:first').nextAll().removeClass('active');
                    $(".contact-big").children().removeClass('contact_ul');
                    $(".blueGlas").addClass('active');
                    $(".contact-big").find("ul:nth-child(2)").addClass('contact_ul');
                });
                $(".changeGlas").mouseenter(()=>{
                    $(".contact-particulars-meno").find('li:first').nextAll().removeClass('active');
                    $(".contact-big").children().removeClass('contact_ul');
                    $(".changeGlas").addClass('active');
                    $(".contact-big").find("ul:nth-child(3)").addClass('contact_ul');
                });
                $(".dyeGlas").mouseenter(()=>{
                    $(".contact-particulars-meno").find('li:first').nextAll().removeClass('active');
                    $(".contact-big").children().removeClass('contact_ul');
                    $(".dyeGlas").addClass('active');
                    $(".contact-big").find("ul:nth-child(4)").addClass('contact_ul');
                });
                $(".polGlas").mouseenter(()=>{
                    $(".contact-particulars-meno").find('li:first').nextAll().removeClass('active');
                    $(".contact-big").children().removeClass('contact_ul');
                    $(".polGlas").addClass('active');
                    $(".contact-big").find("ul:last").addClass('contact_ul');
                });
            },
            //单选按钮选中
            optFor: function(event){
                var status = $(event.target).prop("checked");
                if(status){
                    $(".contact-particulars-right>a:last").css({background:"url(/images/contact/btn-buy.jpg)"});
                    $.ajax("http://rap2api.taobao.org/app/mock/95025/api/price")
                    .done((data)=>{
                        data = data.res_body.price;
                        $("#contact_price").html(data);
                    });
                }else{
                    $(".contact-particulars-right>a:last").css({background:"url(/images/contact/btn-buy-gray.jpg)"});
                }
            }
        }

        new Detail();
    });
});
