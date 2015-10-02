var gulp = require('gulp');

gulp.task('dist', function() {
  return gulp.src('node_modules/tangram/dist/tangram.min.js')
    .pipe(gulp.dest('lib'));
});

gulp.task('default', ['dist']);
