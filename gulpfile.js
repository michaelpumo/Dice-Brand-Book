import gulp from 'gulp'
import concat from 'gulp-concat'
import notify from 'gulp-notify'
import plumber from 'gulp-plumber'
import sass from 'gulp-sass'

const onError = err => {
  notify.onError({
    title: 'Gulp',
    subtitle: 'Failure!',
    message: 'Error: <%= error.message %>',
  })(err)

  this.emit('end')
}

// Compile css files from sass
gulp.task('sass', () => {
  return gulp
    .src('src/assets/css/sass/**/*.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('dist/assets/css'))
})

// Compile js files from plugins
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
  return gulp.src('index.html').pipe(gulp.dest('build'))
})

gulp.task('fonts', () => {
  return gulp.src('src/assets/webfonts/*').pipe(gulp.dest('dist/assets/webfonts'))
})

gulp.task('favicon', () => {
  return gulp.src('src/assets/favicon*').pipe(gulp.dest('dist/assets'))
})

exports.build = gulp.series('svg', 'images', 'videos', 'sass', 'scripts', 'fonts', 'favicon', 'html')
