var gulp = require('gulp');
var bs = require('browser-sync').create();

var reload = bs.reload;
var build_path = '_public';


gulp.task('env', function() {
  gulp.src([
      '.env',
      '.static'])
    .pipe(gulp.dest(build_path));
});


gulp.task('index', function() {
  gulp.src('index.html')
    .pipe(gulp.dest(build_path));
});

gulp.task('favicons', function() {
  gulp.src('res/favicon.ico')
    .pipe(gulp.dest(build_path));
});

gulp.task('libs', function() {
  gulp.src('lib/**')
    .pipe(gulp.dest(build_path + '/lib'));
});


gulp.task('tangram', function() {
  gulp.src('node_modules/tangram/dist/tangram.min.js')
    .pipe(gulp.dest(build_path + '/lib'));
});

gulp.task('setting', function() {
  gulp.src([
      'main.js',
      'scene.yaml'])
    .pipe(gulp.dest(build_path));
});


gulp.task('server', function() {
  bs.init({
    server: {
      baseDir: build_path,
    },
    files: [
      'index.html',
      'main.js',
      'scene.yaml'
    ],
    ghostMode: false,
    notify: false,
    online: false,
    open: false,
    ui: false
  });
  gulp.watch(['main.js','scene.yaml'], ['setting']);
  gulp.watch(['index.html'], ['index']);
});


gulp.task('build', ['env', 'index', 'favicons', 'libs', 'tangram', 'setting']);
gulp.task('dev', ['build', 'server']);
gulp.task('default', ['build']);
