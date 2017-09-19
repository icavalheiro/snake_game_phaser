var gulp = require('gulp'),
	browserify = require('gulp-browserify'),
	rename = require('gulp-rename'),
	serve = require('gulp-serve');

gulp.task('build', () => {
	return gulp.src('src/main.js')
	.pipe(browserify({
		debug: true
	}))
	.pipe(rename('compiled_scripts.js'))
	.pipe(gulp.dest('scripts'));
});

var serveOption = {
	port: 7474,
	hostname: 'localhost'
};

gulp.task('watch', ['build'], () => {
	serve(serveOption)();
	return gulp.watch('src/**/*.*', ['build']);
});

gulp.task('serve', ['build'], serve(serveOption));

gulp.task('default', ['watch']);