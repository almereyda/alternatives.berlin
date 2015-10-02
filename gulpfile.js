var gulp = require('gulp');

build_path = '_public';

gulp.task('index', function() {
  return gulp.src([
      'index.html',
      'main.js',
      'scene.yaml'])
    .pipe(gulp.dest(build_path));
});

gulp.task('env', function() {
  return gulp.src([
      '.env',
      '.static'])
    .pipe(gulp.dest(build_path));
});

gulp.task('libs', function() {
  return gulp.src('lib/**')
    .pipe(gulp.dest(build_path + '/lib'));
});

gulp.task('tangram', function() {
  return gulp.src('node_modules/tangram/dist/tangram.min.js')
    .pipe(gulp.dest(build_path + '/lib'));
});

gulp.task('build', ['index', 'env', 'libs', 'tangram']);

gulp.task('default', ['build']);
