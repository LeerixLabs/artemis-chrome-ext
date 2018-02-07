require('./gulp/gulp-prep.js');
require('./gulp/gulp-dist.js');

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('prep', ['gulp-prep'], function() {
});

gulp.task('dist', ['gulp-dist'], function() {
});

gulp.task('default', function(cb) {
	runSequence(
		'prep',
		'dist',
		function() {
			cb();
		}
	);
});
