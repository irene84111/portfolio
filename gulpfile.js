var gulp         = require('gulp'),
    sass         = require('gulp-ruby-sass'),
    cleanCSS     = require('gulp-clean-css'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload,
    argv         = require('yargs').argv,
    del          = require('del');
    
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

gulp.task('styles', function() {  
  return sass('./src/stylesheets/**/*.{scss,sass}', { style: 'expanded' })
    .pipe($.plumber())
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe($.rename({suffix: '.min'}))
    .pipe(cleanCSS({
      compatibility: 'ie8',
      keepBreaks: true
    }))
    .pipe(gulp.dest('dist/stylesheets'));
});

gulp.task('templates', function() {
  return gulp.src('src/views/*.jade')
    .pipe($.plumber())
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('scripts', function() {  
  return gulp.src('src/scripts/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('images', function() {  
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('copyCSS', function() {
  return gulp.src(['src/stylesheets/**/*.css'])
    .pipe(gulp.dest('dist/stylesheets/'));
});

gulp.task('clean', function() {  
  return del(['dist/stylesheets/*.css', 'dist/scripts/*.js', 'dist/images']);
});

gulp.task('browser-sync', function() {
  browserSync({
    open: !!argv.open,
    notify: !!argv.notify,
    server: {
      baseDir: "./dist"
    }
  });
});

gulp.task('build', ['styles', 'templates', 'scripts', 'images', 'copyCSS']);

gulp.task('serve', ['clean', 'build', 'browser-sync'], function () {
  gulp.watch('src/stylesheets/**/*.{scss,sass}',['styles', reload]);
  gulp.watch('src/scripts/**/*.js',['scripts', reload]);
  gulp.watch('src/images/**/*',['images', reload]);
  gulp.watch('src/views/*.jade',['templates', reload]);
});

gulp.task('default', ['serve']);