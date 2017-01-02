var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');

//gulp.task('default', function () {
//    return gulp.src('./app/js/**/*.js')
//        .pipe(ngAnnotate())
//        .pipe(gulp.dest('dist'));
//});

var electron = require('gulp-electron');
var packageJson = require('./package.json');
 
gulp.task('electron', function() {
 
    gulp.src("")
    .pipe(electron({
        src: './app',
        packageJson: packageJson,
        release: 'release',
        cache: 'cache',
        version: 'v0.0.1',
        packaging: true,
        
        platforms: ['linux-x64'],
    }))
    .pipe(gulp.dest(""));
});