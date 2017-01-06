var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
//var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');


gulp.task('script', function(cb){
	// tarea script
	gulp.src('src/js/*.js')
		// verificar errores de JS
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		// unir todos los archivos
		.pipe(concat('script.min.js'))
		// enfearlo (minimizarlo)
		.pipe(uglify())
		// dejarlo en carpeta dist/js
		.pipe(gulp.dest('dist/js'));
});

gulp.task('style', function() {
	// tarea style
	gulp.src('src/sass/main.scss')
		// transformar los sass
		.pipe(sass().on('error', sass.logError))
		// minimizarlo
		.pipe(minifyCSS())
		// dejarlo en archivo de destino
		.pipe(concat('style.min.css'))
		// dejarlo en carpeta dist/css
		.pipe(gulp.dest('dist/css'));
});

gulp.task('sass:watch', function () {
	//tarea watch
	gulp.watch('./sass/**/*.scss', ['sass']);
});


gulp.task('images', function() {
	// tarea images
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});



gulp.task('default', ['images', 'style', 'script', 'sass:watch']);

