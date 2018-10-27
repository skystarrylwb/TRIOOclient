//配置短名称
require.config({
    baseUrl: "/",
    paths:{
        "jquery":"lib/jquery/jquery-1.12.4.min",
        "header":"js/header",
        "template": "lib/art-template/template-web",
        "zoom": "lib/jquery-plugins/jquery.elevatezoom",
        "fly": "lib/jquery-plugins/jquery.fly",
        "cookie": "lib/jquery-plugins/jquery.cookie",
        "boot": "lib/bootstrap/js/bootstrap.min"
    },
    shim: {
        "zoom": { // 为放大镜插件指明依赖关系
            deps: ["jquery"]
        },
        "fly": {
            deps: ["jquery"]
        }
    }
});
