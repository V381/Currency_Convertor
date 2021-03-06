/*=============================================
=            Gulp Starter by @dope            =
=============================================*/

/**
*
* The packages we are using
* Not using gulp-load-plugins as it is nice to see whats here.
*
**/
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var prefix       = require('gulp-autoprefixer');
var plumber      = require('gulp-plumber');

function swallowError (error) {

  // If you want details of the error in the console
  console.log(error.toString())

  this.emit('end')
}

/**
*
* Styles
* - Compile
* - Compress/Minify
* - Catch errors (gulp-plumber)
* - Autoprefixer
*
**/
gulp.task('sass', function() {
  gulp.src('client/stylesheets/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .on('error', swallowError)
  .pipe(plumber())
  .pipe(gulp.dest('client/stylesheets')).on('error', (e) =>{console.log(e)});;
});

/**
*
* BrowserSync.io
* - Watch CSS, JS & HTML for changes
* - View project at: localhost:3000
*
**/
// gulp.task('browser-sync', function() {
//   browserSync.init(['stylesheets/*.css', 'javascript/**/*.js', 'index.html'], {
//     server: {
//       baseDir: './'
//     }
//   });
// });


/**
*
* Javascript
* - Uglify
*
**/
// gulp.task('scripts', function() {
//   gulp.src('js/*.js')
//   .pipe(uglify())
//   .pipe(rename({
//     dirname: "min",
//     suffix: ".min",
//   }))
//   .pipe(gulp.dest('js'))
// });

/**
*
* Images
* - Compress them!
*
**/
// gulp.task('images', function () {
//   return gulp.src('images/*')
//   .pipe(imagemin({
//     progressive: true,
//     svgoPlugins: [{removeViewBox: false}],
//     use: [pngquant()]
//   }))
//   .pipe(gulp.dest('images'));
// });


/**
*
* Default task
* - Runs sass, browser-sync, scripts and image tasks
* - Watchs for file changes for images, scripts and sass/css
*
**/
gulp.task('default', ['sass'], function () {
  gulp.watch('client/stylesheets/**/*.scss', ['sass']);
});
