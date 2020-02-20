const gulp = require('gulp')
const concat = require('gulp-concat')
const notify = require('gulp-notify')
const plumber = require('gulp-plumber')
const sass = require('gulp-sass')

const onError = err => {
  notify.onError({
    title: 'Gulp',
    subtitle: 'Failure!',
    message: 'Error: <%= error.message %>',
  })(err)

  this.emit('end')
}

gulp.task('sass', () => {
  return gulp
    .src('src/assets/css/sass/**/*.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('dist/assets/css'))
})

gulp.task('scripts', () => {
  return gulp
    .src('src/assets/js/plugins/*.js')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/assets/js'))
})

gulp.task('svg', () => {
  return gulp.src('src/assets/svg/*.svg').pipe(gulp.dest('dist/assets/svg'))
})

gulp.task('images', () => {
  return gulp.src('src/assets/images/*').pipe(gulp.dest('dist/assets/images'))
})

gulp.task('videos', () => {
  return gulp.src('src/assets/videos/*.mp4').pipe(gulp.dest('dist/assets/videos'))
})

gulp.task('html', () => {
  return gulp.src('src/index.html').pipe(gulp.dest('dist'))
})

gulp.task('fonts', () => {
  return gulp.src('src/assets/webfonts/*').pipe(gulp.dest('dist/assets/webfonts'))
})

gulp.task('favicon', () => {
  return gulp.src('src/assets/favicon*').pipe(gulp.dest('dist/assets'))
})

exports.build = gulp.series('svg', 'images', 'videos', 'sass', 'scripts', 'fonts', 'favicon', 'html')
