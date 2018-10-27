//引入配置所需的模块
require(["config"],function(){
    require(["jquery", "template", "header"], function($, template){
        function Register(){
            this.reg();
        }
        Register.prototype = {
            constructor: Register,
            reg: function(){
                $("#admin_us").on("click",()=>{
                    $("#admin_us").css({background:"#edf4f7"});
                });
                $("#admin_ps").on("click",()=>{
                    $("#admin_ps").css({background:"#edf4f7"});
                });
                $("#admin_psr").on("click",()=>{
                    $("#admin_psr").css({background:"#edf4f7"});
                });
                $("#admin_us").on("blur", ()=>{
                    $("#admin_us").css({background:"white"});
                    $("#re_form").find('li').remove(".li_email");
                    var email = $("#admin_us").val(),
                        password = "";
                    if(email === ""){
                        $("#re_form").append($("<li>").text("请输入邮箱地址"));
                        $("#re_form").find('li:last-child').addClass('li_email');
                    }else{
                        var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
                        if(!regex.test(email)){
                            $("#re_form").find('li').remove(".li_email_dab");
                            $("#re_form").find('li').remove(".li_email_able");
                            $("#re_form").append($("<li>").text("输入的邮箱不合法"));
                            $("#re_form").find('li:last-child').addClass('li_email_dab');
                        }else{
                            $("#re_form").find('li').remove(".li_email_dab");
                            $("#re_form").find('li').remove(".li_email_able");
                            $.ajax({
                                url:"/api/register.php",
                                dataType:"json",
                                type:"POST",
                                data:{email,password},
                                success:function(data){
                                if(data.res_code === 0){
                                        $("#re_form").find('li').remove(".li_email_dable");
                                        $("#re_form").append($("<li>").text("邮箱已被占用"));
                                        $("#re_form").find('li:last-child').addClass('li_email_dable');
                                    }else if(data.res_code ===2){
                                        $("#re_form").find('li').remove(".li_email_able");
                                        $("#re_form").append($("<li>").text("邮箱可用"));
                                        $("#re_form").find('li:last-child').addClass('li_email_able');
                                    }
                                }
                                });
                        }
                    }
                });
                $("#admin_ps").on("blur", ()=>{
                    $("#admin_ps").css({background:"white"});
                    $(".re_li").text("");
                    var admin_ps = $("#admin_ps").val();
                    if(admin_ps === ""){
                        $(".re_li").text("此栏不能为空");
                        $(".re_li").addClass('li_ps');
                    }
                });
                $("#admin_psr").on("blur", ()=>{
                    $("#admin_psr").css({background:"white"});
                    $(".re_lis").text("");
                    var admin_ps = $("#admin_ps").val();
                    if(admin_ps === ""){
                        $(".re_lis").text("此栏不能为空");
                        $(".re_lis").addClass('li_rps');
                    }
                });
                $("#reg_btn").on("click", function(){
                    var email = $("#admin_us").val(),
                    password = $("#admin_ps").val(),
                    respassword = $("#admin_psr").val();
                    if(email===""||password===""||respassword===""){
                        alert("请输入用户信息");
                        return false;
                    }else if(!(password===respassword)){
                        alert("两次密码不一致");
                        return false;
                    }
                    $.ajax({
                    url:"/api/register.php",
                    dataType:"json",
                    type:"POST",
                    data:{email,password},
                    success:function(data){
                        if(data.res_code === 1){
                            alert("注册成功");
                            location.href = "../index.html";
                        }else if(data.res_code === -1){
                            alert("注册失败，请从新注册");
                            return false;
                        }else if(data.res_code === 0){
                            alert("用户已存在！");
                            return false;
                        }
                    }
                    });
                    return false;
                });
            }
        }
        new Register();
    });
});
