var gulp=require('gulp');
var notify=require('gulp-notify');
var plumber=require('gulp-plumber');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer=require('gulp-autoprefixer');
var csscomb=require('gulp-csscomb');

var csslint=require('gulp-csslint');
var csslintrc=require('./csslintrc.json');

var sass=require('gulp-sass');

//--------------------------
//COMMON CONFIG
//--------------------------
var path={
  "src":"src/",
  "build":"build/"
};
var ignore=[
  "!./node_modules/**",
  "!^_*",
  "!./src/ignore/**",
  "!./src/libs/**"
];

function setSrc(s){
  var ignore=[
  '!./node_modules/**',
  '!^_*',
  '!./src/ignore/**',
  '!./src/libs/**'
  ];
  ignore.push(s);
  return ignore;
}
var srcGlob={
  html:setSrc(path.src+'**/*.html'),
  css:setSrc(path.src+'**/*.css'),
  scss:setSrc(path.src+'**/*.scss')
};

var AUTOPREFIXER_BROWSERS = [
  'ie >= 7',
  'ie_mob >= 7',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];
//--------------------------
//基本
//--------------------------

//TASK----------------------

gulp.task('default',function(){
  console.log('Hello world!');
});

gulp.task('serve', ['styles'], function () {
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    server: {baseDir:path.src}
  });

  gulp.watch(srcGlob.html, reload);
  gulp.watch(srcGlob.scss, ['styles', reload]);
});

gulp.task('styles', function () {
  return gulp.src(srcGlob.scss)
    .pipe(sass())
    .pipe(csscomb())
    .pipe(csslint(csslintrc))
    .pipe(csslint.reporter())
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe(gulp.dest(path.src))
});