let gulp = require('gulp');
let rename = require('gulp-rename');
let zip = require('gulp-zip');
let runSequence = require('run-sequence');

gulp.task('gulp-dist-debug', function() {
	let i, items;
	items = [
		{
			src: 'src/chrome/**/*',
			dst: 'dist/chrome-extension/debug'
		},
		{
			src: 'node_modules/angular/angular.min.js',
			dst: 'dist/chrome-extension/debug/lib/angular'
		},
		{
			src: 'node_modules/artemis-core/dist/artemis.core.js',
			dst: 'dist/chrome-extension/debug/artemis/lib/artemis-core'
		}
	];
	for (i = 0; i< items.length; i++) {
		gulp.src(items[i].src).pipe(gulp.dest(items[i].dst, {prefix: 1}));
	}
});

gulp.task('gulp-dist-release-prepare', function(cb) {
	let i, items;
	items = [
		{
			src: 'src/chrome/**/*',
			dst: 'out/chrome-extension/release'
		},
		{
			src: 'node_modules/angular/angular.min.js',
			dst: 'out/chrome-extension/release/lib/angular'
		},
		{
			src: 'node_modules/artemis-core/dist/artemis.core.min.js',
			dst: 'out/chrome-extension/release/artemis/lib/artemis-core',
			ren: 'artemis.core.js'
		}
	];
	for (i = 0; i < items.length; i++) {
		if (items[i].ren) {
			gulp.src(items[i].src).pipe(rename(items[i].ren)).pipe(gulp.dest(items[i].dst, {prefix: 1}));
		} else {
			gulp.src(items[i].src).pipe(gulp.dest(items[i].dst, {prefix: 1}));
		}
	}
	cb();
});

gulp.task('gulp-dist-release-zip', function(cb) {
	gulp.src('out/chrome-extension/release/**/*').pipe(zip('nlt-chrome-ext.zip')).pipe(gulp.dest('dist/chrome-extension/release'));
	cb();
});

gulp.task('gulp-dist', function(cb) {
	runSequence(
		'gulp-dist-debug',
		'gulp-dist-release-prepare',
		'gulp-dist-release-zip',
		function() {
			cb();
		}
	);
});
