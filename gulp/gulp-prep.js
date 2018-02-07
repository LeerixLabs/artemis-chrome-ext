let gulp = require('gulp');
let fs = require('fs');

gulp.task('gulp-prep', function (cb) {
	fs.readFile('./node_modules/artemis-core/dist/default-settings.json', 'utf8', function (err, data) {
		if (err) {
			return console.log(err);
		}
		let defaultSettings = JSON.parse(data);
		let fileText = 'angular.module(\'mainApp\').constant(\'artemisSettingsDefault\',\n' + JSON.stringify(defaultSettings, null, 2) + '\n);';
		fs.writeFile('./src/chrome/artemis/artemis-settings-default.js', fileText, 'utf8', function (err) {
			if (err) {
				return console.log(err);
			}
		});
	});
	cb();
});
