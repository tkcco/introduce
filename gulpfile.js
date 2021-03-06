// sudo npm install gulp-ejs gulp-sass gulp-pleeease gulp-uglify gulp-rename browser-sync gulp-plumber gulp-notify       -save-dev   or   -D

var gulp = require('gulp');
var ejs = require('gulp-ejs');
var fs = require('fs');
var sass = require('gulp-sass');
var pleeease = require('gulp-pleeease');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var del = require('del');
var browserSync = require('browser-sync');

var dirs = {
  'src': '_dev/',
  'dest': 'myprofile/',
  'assetsSrc': '_dev/assets/',
  'assetsDest': 'myprofile/assets/'
};

var config = {
  'ejs': {
    'src': dirs.src + 'ejs/**/!(_)*.ejs',
    'dest': dirs.dest
  },
  'sass': {
    'src': dirs.assetsSrc + 'styles/**/!(_)*.scss',
    'dest': dirs.assetsDest + 'styles/'
  },
  'js': {
    'src': dirs.assetsSrc + 'scripts/**/*.js',
    'dest': dirs.assetsDest + 'scripts/'
  },
  'json': {
    'src': dirs.assetsSrc + 'json/**/*',
    'dest': dirs.assetsDest + 'json/'
  },
  'image': {
    'src': dirs.assetsSrc + 'images/**/*',
    'dest': dirs.assetsDest + 'images/'
  },
  'font': {
    'src': dirs.assetsSrc + 'fonts/**/*',
    'dest': dirs.assetsDest + 'fonts/'
  }
};

gulp.task('ejs', function(){
  var json = JSON.parse(fs.readFileSync("./package.json"));
  return gulp.src(config.ejs.src)
    .pipe(ejs(json, {"ext": ".html"}))
    .pipe(gulp.dest(config.ejs.dest))
    .pipe(browserSync.stream());
});

gulp.task('sass', function(){
  return gulp.src(config.sass.src)
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass())
    .pipe(pleeease({
      'autoprefixer': {
        'browsers': [
          'last 4 version',
          'ie >=9',
          'iOS 8',
          'Android >= 4.4',
          'last 2 ChromeAndroid versions'
        ]},
      minifier: false
    }))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(browserSync.stream());
});

gulp.task('js', function(){
  return gulp.src(config.js.src)
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(uglify({
      preserveComments: 'license' // ライセンスコメントを残しつつminify
    }))
    .pipe(gulp.dest(config.js.dest))
    .pipe(browserSync.stream());
});

gulp.task('imageCopy', function(){
  return gulp.src(config.image.src)
    .pipe(gulp.dest(config.image.dest))
    .pipe(browserSync.stream());
});

gulp.task('jsonCopy', function(){
  return gulp.src(config.json.src)
    .pipe(gulp.dest(config.json.dest))
    .pipe(browserSync.stream());
});

gulp.task('fontCopy', function(){
  return gulp.src(config.font.src)
    .pipe(gulp.dest(config.font.dest))
    .pipe(browserSync.stream());
});

gulp.task('browserSync', function(){
  return browserSync.init(null, {
    browser: 'Google Chrome',
    server: {
      baseDir: '../',
      index: 'introduce/myprofile/index.html'
    }
  });
});

gulp.task('clean', function(cd) {
  return del(dirs.dest, cd);
});

gulp.task('watch', function(){
  gulp.watch(dirs.src + '**/*.ejs', ['ejs']);
  gulp.watch(dirs.assetsSrc + '**/*.scss', ['sass']);
  gulp.watch(config.js.src, ['js']);
  gulp.watch(config.image.src, ['imageCopy']);
  gulp.watch(config.json.src, ['jsonCopy']);
  gulp.watch(config.font.src, ['fontCopy']);
});

gulp.task('default', ['ejs', 'sass', 'js', 'imageCopy', 'jsonCopy','fontCopy', 'browserSync', 'watch']);
gulp.task('build:task', ['ejs', 'sass', 'js', 'imageCopy', 'jsonCopy', 'fontCopy']);
gulp.task('build', ['clean'], function() {
  gulp.start('build:task');
});
