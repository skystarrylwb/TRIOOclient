//引入配置所需的模块
require(["config"],function(){
    require(["jquery", "template", "header"], function($, template){
        function Login() {
            this.load();
        }
        Login.prototype = {
            constructor: Login,
            load: function(){
                //判断email的可用性
                $("#email").on("blur", ()=>{
                    let email = $("#email").val();
                    console.log(email);
                    if(email===""){
                        $(".login_li").css({right:"-76px", display:"none"});
                        $(".login_li").text("请输入email");
                        $(".login_li").css({display:"block"});
                    }else{
                        var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
                        if(!regex.test(email)){
                            $(".login_li").css({right:"-105px", display:"block"});
                            $(".login_li").text("输入的邮箱不合法");
                        }else{
                            $(".login_li").css({display:"none"});
                            $(".login_li").text("");
                        }
                    }
                });
                //判断是否有密码输入
                $("#pw").on("blur", ()=>{
                    let ps = $("#pw").val();
                    $(".login_lis").css({display:"none"});
                    if(ps===""){
                        $(".login_lis").css({display:"block"});
                    }
                });
                //提交按钮的一系列业务
                $("#login_btn").on("click", function(){
                    let email = $("#email").val(),
                        ps = $("#pw").val();
                    if(email===""||ps===""){
                        alert("请输入email和密码");
                        return false;
                    }
                    $.ajax("/api/login.php")
                    .done(function(data){
                        if(res_code === 1){
                            alert("登录成功");
                        }
                    });
                });
            }
        }
        new Login();
    });
});
