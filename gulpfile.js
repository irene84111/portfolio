var gulp         = require('gulp'),
    $            = require('gulp-load-plugins')(),
    sass         = require('gulp-ruby-sass'),
    minifycss    = require('gulp-minify-css'),
    jshint       = require('gulp-jshint'),
    uglify       = require('gulp-uglify'),
    imagemin     = require('gulp-imagemin'),
    rename       = require('gulp-rename'),
    concat       = require('gulp-concat'),
    notify       = require('gulp-notify'),
    cache        = require('gulp-cache'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload,
    argv         = require('yargs').argv,
    del          = require('del');

// 編譯Sass與縮小化
gulp.task('styles', function() {  
  return sass('./src/stylesheets/**/*.{scss,sass}', { style: 'expanded' })
    .pipe($.plumber())
    .pipe($.autoprefixer('last 2 version'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss({
        keepBreaks: true,
    }))
    .pipe(gulp.dest('dist/stylesheets'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// 編譯 Jade
gulp.task('templates', function() {
  return gulp.src('src/views/*.jade')
    .pipe($.plumber())
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(notify({ message: 'Templates task complete' }));
});

// JSHint、拼接及縮小化 JavaScript
gulp.task('scripts', function() {  
  return gulp.src('src/scripts/*.js')
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    // .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// 壓縮圖片
gulp.task('images', function() {  
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 1, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// 複製CSS
gulp.task('copyCSS', function() {
  return gulp.src(['src/stylesheets/**/*.css'])
    .pipe(gulp.dest('dist/stylesheets/'));
});

// 複製JS
// gulp.task('copyJS', function() {
//   return gulp.src(['src/scripts/**/*.js'])
//     .pipe(gulp.dest('dist/scripts'));
// });

// 複製PHP
gulp.task('copyPHP', function() {
  return gulp.src(['src/views/*.php'])
    .pipe(gulp.dest('dist'));
});

// 收拾
gulp.task('clean', function() {  
  return del(['dist/stylesheets/*.css', 'dist/scripts/*.js', 'dist/images']);
});

// 重整瀏覽器
gulp.task('browser-sync', function() {
  browserSync({
    open: !!argv.open,
    notify: !!argv.notify,
    server: {
      baseDir: "./dist"
    }
  });
});

gulp.task('build', ['styles', 'templates', 'scripts', 'images', 'copyCSS', 'copyPHP']);

gulp.task('serve', ['clean', 'build', 'browser-sync'], function () {
  gulp.watch('src/stylesheets/**/*.{scss,sass}',['styles', reload]);
  gulp.watch('src/scripts/**/*.js',['js', reload]);
  gulp.watch('src/images/**/*',['images', reload]);
  gulp.watch('src/views/*.jade',['templates', reload]);
});

gulp.task('default', ['serve']);