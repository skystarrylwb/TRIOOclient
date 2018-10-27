//引入配置所需的模块
require(["config"],function(){
    require(["jquery", "template", "header"], function($, template){
        function Detail(){
            this.meno();
        }
        Detail.prototype = {
            constructor: Detail,
            //鼠标触发事件
            meno: function(){
                $(".detail_meno").find('li:first').mouseenter(()=>{
                    $(".detail_meno").nextAll().removeClass('detail_list');
                    $(".detail_meno").children().removeClass('active_meno');
                    $(".detail_meno").find('li:first').addClass('active_meno');
                    $(".detailBottom>ul:nth-child(3)").addClass('detail_list');
                });
                $(".detail_meno").find('li:nth-child(2)').mouseenter(()=>{
                    $(".detail_meno").nextAll().removeClass('detail_list');
                    $(".detail_meno").children().removeClass('active_meno');
                    $(".detail_meno").find('li:nth-child(2)').addClass('active_meno');
                    $(".detailBottom>ul:nth-child(4)").addClass('detail_list');
                });
                $(".detail_meno").find('li:nth-child(3)').mouseenter(()=>{
                    $(".detail_meno").nextAll().removeClass('detail_list');
                    $(".detail_meno").children().removeClass('active_meno');
                    $(".detail_meno").find('li:nth-child(3)').addClass('active_meno');
                    $(".detailBottom>ul:nth-child(5)").addClass('detail_list');
                });
                $(".detail_meno").find('li:nth-child(4)').mouseenter(()=>{
                    $(".detail_meno").nextAll().removeClass('detail_list');
                    $(".detail_meno").children().removeClass('active_meno');
                    $(".detail_meno").find('li:nth-child(4)').addClass('active_meno');
                    $(".detailBottom>ul:nth-child(6)").addClass('detail_list');
                });
                $(".detail_meno").find('li:nth-child(5)').mouseenter(()=>{
                    $(".detail_meno").nextAll().removeClass('detail_list');
                    $(".detail_meno").children().removeClass('active_meno');
                    $(".detail_meno").find('li:nth-child(5)').addClass('active_meno');
                    $(".detailBottom>ul:nth-child(7)").addClass('detail_list');
                });
                $(".detailBottom").find('input').on("click", $.proxy(this.selectD, this))
            },
            //判断是否被选中
            selectD: function(event){
                var status = $(event.target).prop("checked");
                if(status){
                    $(".detail-total").find("button").css({background: "url(/images/detail/goshopping-open.jpg) no-repeat center center"});
                    $.ajax("http://rap2api.taobao.org/app/mock/95025/api/price")
                    .done((data)=>{
                        data = data.res_body.price;
                        $("#detail_price").html(data);
                    });
                }else{
                     $(".detail-total").find("button").css({background: "url(/images/detail/goshopping-opping.jpg) no-repeat center center"});
                }
            }
        }
        new Detail();
    });
});
