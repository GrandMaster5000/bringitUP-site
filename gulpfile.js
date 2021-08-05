"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const cssmin = require('gulp-cssmin');
const concatCss = require('gulp-concat-css');

const dist = "./dist/";


gulp.task("copy-html", () => {
    return gulp.src("./src/*.html")
                .pipe(htmlmin({ collapseWhitespace: true }))
                .pipe(gulp.dest(dist))
                .pipe(browsersync.stream());
});

gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist))
                .on("end", browsersync.reload);
});

gulp.task('styles', function() {
  return gulp.src(['./src/assets/css/style.css', './node_modules/animate.css/animate.min.css', './src/assets/css/font.css'])
  .pipe(concatCss('style.css'))
  .pipe(cssmin())
    .pipe(gulp.dest('dist/assets/css/'));
});

gulp.task('fonts', function() {
  return gulp.src("src/assets/font/**/*")
      .pipe(gulp.dest("dist/assets/font"))
      .pipe(browsersync.stream());
});

gulp.task('images', function() {
  return gulp.src("src/assets/img/**/*")
      .pipe(imagemin())
      .pipe(gulp.dest("dist/assets/img"))
      .pipe(browsersync.stream());
});

gulp.task('server', function() {
  return gulp.src("src/assets/*.php")
      .pipe(gulp.dest("dist/assets"))
      .pipe(browsersync.stream());
});


gulp.task("watch", () => {
    browsersync.init({
        server: {
            baseDir: "./dist/",
            serveStaticOptions: {
                extensions: ["html"]
            }
        },
		port: 4000,
		notify: true
    });
    
    gulp.watch("./src/*.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/sass/*.*", gulp.parallel("styles"));
    gulp.watch("./src/assets/*.php", gulp.parallel("server"));
    gulp.watch("./src/assets/img/**/*", gulp.parallel("images"));
    gulp.watch("./src/assets/font/**/*", gulp.parallel("fonts"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("copy-html", "build-js", 'styles', 'fonts', 'server', 'images'));

gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));