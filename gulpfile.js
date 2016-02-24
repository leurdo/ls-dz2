var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var sass        = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps')
var plumber = require('gulp-plumber');
var jade = require('gulp-jade');
var wiredep = require('wiredep').stream;
var spritesmith = require('gulp.spritesmith'); 

var jadePath = 'app/markups/*.jade';

gulp.task('wiredep', function() {
    gulp.src('app/*.html')
        .pipe(wiredep({
            ignorePath:/^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest('app'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sassGlob())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 5 versions']
        }))
        .pipe(plumber())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('jade', function() {
    var YOUR_LOCALS = {};

    gulp.src(jadePath)
        .pipe(plumber())
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty : '\t',
        }))
        .pipe(gulp.dest('app'))
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/**/*.scss", ['sass']);
    gulp.watch(jadePath, ['jade']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("app/js/*.js").on('change', browserSync.reload);

});

var spriteFolder = 'icons';
gulp.task('sprite', function () {
  var spriteData = gulp.src('app/images/'+spriteFolder+'/*.png').pipe(spritesmith({
    imgName: spriteFolder+'.png',
    cssName: spriteFolder+'.scss',
    imgPath: '../images/'+spriteFolder+'.png'
    
  }));
  spriteData.img.pipe(gulp.dest('app/images/')); // путь, куда сохраняем картинку
  spriteData.css.pipe(gulp.dest('app/scss/_layout/')); // путь, куда сохраняем стили
});

gulp.task('default', ['serve']);