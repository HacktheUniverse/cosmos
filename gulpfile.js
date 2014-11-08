var gulp       = require('gulp');
var browserify = require('gulp-browserify');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');

var entry_script = './index.js';
var paths = {
  scripts: [entry_script,'./app/**/*.js']
};

gulp.task('browserify', function() {
  gulp.src(entry_script)
    .pipe(browserify())
    .pipe(concat('./bundle.js'))
    //.pipe(uglify())
    .pipe(gulp.dest(''))
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['browserify']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch','browserify']);
