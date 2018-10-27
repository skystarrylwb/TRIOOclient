//引入配置所需的模块
require(["config"],function(){
    require(["jquery", "template", "header"], function($, template){
        function List() {
            this.addListener();
        }
        List.prototype = {
            constructor: List,
            addListener:function(){
                $("dl").on("click",function(){
                    window.open("/html/contact.html");
                });
            }
        }
        new List();
    });
});
