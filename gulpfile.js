'use strict';

// Load plugins
var gulp  = require('gulp'),
    concat = require('gulp-concat'),
    notify = require("gulp-notify"),
    plumber = require('gulp-plumber'),
    sass   = require('gulp-sass')
;

var onError = function(err) {
    notify.onError({
        title:    "Gulp",
        subtitle: "Failure!",
        message:  "Error: <%= error.message %>",
    })(err);

    this.emit('end');
};

// Compile css files from sass
gulp.task('sass', function() {
    return gulp.src('assets/css/sass/**/*.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('build/assets/css'));
});

// Compile js files from plugins
gulp.task('scripts', function() {
    return gulp.src('assets/js/plugins/*.js')
    .pipe(plumber({errorHandler: onError}))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build/assets/js'));
});

gulp.task('svg', function() {
    return gulp.src('assets/svg/*.svg')
    .pipe(gulp.dest('build/assets/svg'));
});

gulp.task('images', function() {
    return gulp.src('assets/images/*')
    .pipe(gulp.dest('build/assets/images'));
});

gulp.task('videos', function() {
    return gulp.src('assets/videos/*.mp4')
    .pipe(gulp.dest('build/assets/videos'));
});

gulp.task('html', function() {
    return gulp.src('index.html')
    .pipe(gulp.dest('build'));
});

gulp.task('fonts', function() {
    return gulp.src('assets/webfonts/*')
    .pipe(gulp.dest('build/assets/webfonts'));
})

gulp.task('favicon', function() {
    return gulp.src('assets/favicon*')
    .pipe(gulp.dest('build/assets'));
})

exports.build = gulp.series('svg', 'images', 'videos', 'sass', 'scripts', 'fonts', 'favicon', 'html');