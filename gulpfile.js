var gulp = require('gulp');
var clean = require('gulp-clean');
var less = require('gulp-less');
var cssmin = require('gulp-minify-css');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var rename = require('gulp-rename');
var velocity = require('gulp-velocity');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var md5 = require("gulp-md5-plus");
var fs = require('fs');
var argv = require('yargs').argv;
// var lineReader = require('line-reader');
// var getDirFile = require('./getDirFile.js');


var config = {
    'tpl_config': {
        "root": "./src/tpl/", // tpl root 
        "encoding": "utf-8",
        "macro": "./src/tpl/global-macro/macro.vm", //global macro defined file
        "globalMacroPath": "./src/tpl/global-macro",
        "dataPath": "./src/data/" // test data root path
    },
    'tmp_output': './src/dist_html/'
};

// vm-to-html
gulp.task('vm-to-html', function() {
    gulp.src(config.tpl_config.root + '**/*.vm')
        .pipe(plumber())
        .pipe(
            velocity(config.tpl_config)
            .on('error', gutil.log)
        )
        .pipe(rename({
            extname: ".html"
        }))
        .pipe(gulp.dest(config.tmp_output));
});
gulp.task('less-to-css', function() {
    //require('yargs').argv._[0] = "less-to-css"
    //console.log(require('yargs').argv._);
    gulp.src('mock/less/**/*.less')
        .pipe(less())
        .pipe(cssmin()) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(gulp.dest('static-web/css'))
        .pipe(reload({ stream: true }));
});
// gulp.task('default', ['less-to-css', 'browser-sync'], function(){
//  console.log("all is well...");
// });

//延迟 执行vm-to-html命令， 如果实时执行 html无法刷新
gulp.task('browserSync-watch', ['vm-to-html', 'less-to-css'], function() {
    setTimeout(function() {
        //console.log('browserSync reload!!');
        reload();
    }, 1000);
});

// 静态服务器 + 监听 less/html 文件
gulp.task('server', ['less-to-css', 'vm-to-html'], function() {
    //var mocks = require('./routeConfig').mocks;
    var middewareFun = require('./routeConfig').middleware;
    browserSync.init({
        server: "./",
        //files: "**/*",
        open: false,
        // middleware: function (req, res, next) {
        //     console.log(req);
        //     console.log("Hi from middleware");
        //     next();
        // }
        //middleware: redirect()
        middleware: middewareFun()
    });

    // gulp.watch("mock/**/*.less", ['less-to-css']);
    //gulp.watch("app/**/*.html").on('change', reload);
    //gulp.watch("src/tpl/**/*.vm").on('change', reload);
    gulp.watch([
        './src/tpl/**/*.vm',
        './mock/less/*.less'
    ], ['browserSync-watch']);
});

gulp.task('default', ['server']);

gulp.task('clean', function() {
    return gulp.src('static-web/css/*.css')
        .pipe(clean({ force: true }))
        .pipe(gulp.dest('static-web/temp'));
});

gulp.task('clean-dirfile', function() {
    return gulp.src('./dirfile/*.*')
        .pipe(clean({ force: true }));
    //.pipe(gulp.dest('static-web/temp'));
});


gulp.task('build-html', function() {
    return gulp.src('./webapp/WEB-INF/pages/**/*.vm')
        .pipe(gulp.dest('./output/vm'));
});

// var jsArray = [];
// var cssArray = [];
// lineReader.eachLine('./dirfile/file-js.txt', function(line, last) {
//     jsArray.push(line);
// });
// lineReader.eachLine('./dirfile/file-css.txt', function(line, last) {
//     cssArray.push(line);
// });


// gulp.task('build-js', ['build-html'], function() {
//     // gulp.src("./static-web/css/*.css")
//     //     .pipe(md5(5,'./src/tmp/hello.html'))
//     //     .pipe(gulp.dest("./build"));
//     for (var i = 0; i < jsArray.length; i++) {
//         gulp.src(jsArray[i])
//             .pipe(md5(10, './output/vm/**/*.vm', 'default'))
//             .pipe(gulp.dest("./output"));
//     }
//     // gulp.src("./static-web/images/**")//png or jpg
//     //     //.pipe(imagemin())
//     //     .pipe(md5(10 ,['./src/tmp/hello.html','./static-web/css/*.css','./static-web/js/*.js']))
//     //     .pipe(gulp.dest("./build/images"));
// });

// gulp.task('build-css', ['build-js'], function() {
//     for (var i = 0; i < cssArray.length; i++) {
//         gulp.src(cssArray[i]) //"./static-web/school/" + 
//             .pipe(md5(10, './output/vm/**/*.vm', 'default'))
//             .pipe(gulp.dest("./output"));
//     }
// });

// gulp.task('create-dirfile', ['clean-dirfile'], function() {
//     getDirFile.travel(__dirname + '/static-web/school/js', function(pathname) {
//         if (/\.js$/.test(pathname)) {
//             fs.appendFileSync('./dirfile/file-js.txt', pathname + '\n');
//         }
//     });
//     getDirFile.travel(__dirname + '/static-web/school/css', function(pathname) {
//         if (/\.css$/.test(pathname)) {
//             fs.appendFileSync('./dirfile/file-css.txt', pathname + '\n');
//         }
//     });
// });

// gulp.task('replace-dirfile', function() {
//     var jsresult = fs.readFileSync('./dirfile/file-js.txt', 'utf8').replace(/\\/g, '/').replace(/E\:\/studyCenter\/mrs\/gulp/g, '.');
//     fs.writeFileSync('./dirfile/file-js.txt', jsresult, 'utf8');
//     var cssresult = fs.readFileSync('./dirfile/file-css.txt', 'utf8').replace(/\\/g, '/').replace(/E\:\/studyCenter\/mrs\/gulp/g, '.');
//     fs.writeFileSync('./dirfile/file-css.txt', cssresult, 'utf8');
// });
