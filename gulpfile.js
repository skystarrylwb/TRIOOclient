const gulp = require("gulp"),
    minifyCss = require("gulp-clean-css"),
    uglify = require("gulp-uglify"),
    htmlmin = require("gulp-htmlmin"),
    babel = require("gulp-babel"),
    connect = require("gulp-connect"),
    sass = require("gulp-sass");
//定制任务:压缩css
gulp.task("css", ()=>{
    gulp.src("trioo/css/*.css")
        .pipe(minifyCss())
        .pipe(gulp.dest("trioo-glasses/css"))
        .pipe(connect.reload());
});
//制定任务：压缩html
gulp.task("html", ()=>{
    gulp.src("trioo/**/*.html")
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("trioo-glasses/html"))
        .pipe(connect.reload());
});
//制定任务：js的压缩
gulp.task("js", ()=>{
    gulp.src("trioo/js/*.js")
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest("trioo-glasses/js"))
        .pipe(connect.reload());
});
//制定任务：启动webserver服务器
gulp.task("conn", ()=>{
    connect.server({
        root:"trioo",
        livereload:true
    });
});
//制定任务：图片复制
gulp.task("copy-images",()=>{
    gulp.src("trioo/images/**/*.*")
        .pipe(gulp.dest("trioo-glasses/images"))
});
gulp.task("copy-lib", ()=>{
    gulp.src("trioo/lib/**/*.*")
        .pipe(gulp.dest("trioo-glasses/lib"));
})
gulp.task("copy",["copy-images", "copy-lib"]);
//制定任务：sass的转化
gulp.task("sass", ()=>{
    gulp.src("trioo/sass/*.scss")
        .pipe(sass({outputStyle:"expanded"}))
        .pipe(gulp.dest("trioo/css"))
});
//制定任务：监测文件的修改
gulp.task("watch", ()=>{
    gulp.watch("trioo/**/*.html",["html"]);
    gulp.watch("trioo/css/*.css", ["css"]);
    gulp.watch("trioo/js/*.js", ["js"]);
    gulp.watch("trioo/sass/*.scss", ["sass"]);
});
// //制定默认：default
gulp.task("default", ["css","html","copy-images","js","copy","watch","sass","conn"]);
