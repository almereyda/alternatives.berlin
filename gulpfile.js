var gulp = require('gulp');
var bs = require('browser-sync').create();

var reload = bs.reload;
var build_path = '_public';


// include dokku environment
gulp.task('env', function() {
  gulp.src([
      '.env',
      '.static'])
    .pipe(gulp.dest(build_path));
});


// seperate tasks for core dependencies
gulp.task('index', function() {
  gulp.src([
      'index.html',
      'style.css'
    ])
    .pipe(gulp.dest(build_path));
});

gulp.task('res', function() {
  gulp.src([
      'res/favicon.ico',
      'res/circle.png',
      'res/jon30_512.png',
      'res/circus_blak.svg',
      'res/sbahn.svg',
      'res/s3.svg',
      'res/s47.svg',
      'res/zuwegung.geojson',
      'res/letsfetz.png'
    ])
    .pipe(gulp.dest(build_path));
});

gulp.task('single', function() {
  gulp.src([
      'lib/dat.gui.min.js',
      'node_modules/odyssey.js/dist/odyssey.js',
      'node_modules/tangram/dist/tangram.min.js',
      'node_modules/leaflet.ajax/dist/leaflet.ajax.min.js'
    ])
    .pipe(gulp.dest(build_path + '/lib'));
});

gulp.task('images', function() {
  gulp.src([
      'node_modules/odyssey.js/sandbox/img/navBtns.png'
    ])
    .pipe(gulp.dest(build_path + '/img'));
});


gulp.task('ionicons', function() {
  gulp.src([
      'lib/ionicons/css/ionicons.min.css',
      'lib/ionicons/fonts/**'
    ],{base: 'lib/ionicons/'})
    .pipe(gulp.dest(build_path + '/lib/ionicons'));
});

gulp.task('leaflet', function() {
  gulp.src([
      'lib/Leaflet/dist/leaflet.css',
      // leaflet.js needs to be built manually beforehand
      'lib/Leaflet/dist/leaflet.js',
      'lib/Leaflet/dist/images/**'
    ],{base: 'lib/Leaflet/dist/'})
    .pipe(gulp.dest(build_path + '/lib/Leaflet'));
});

gulp.task('leaflet-markers', function() {
  gulp.src([
      'lib/Leaflet.awesome-markers/dist/leaflet.awesome-markers.min.js',
      'lib/Leaflet.awesome-markers/dist/leaflet.awesome-markers.css',
      'lib/Leaflet.awesome-markers/dist/images/**'
    ],{base: 'lib/Leaflet.awesome-markers/dist/'})
    .pipe(gulp.dest(build_path + '/lib/leaflet.awesome-markers'));
});

gulp.task('setting', function() {
  gulp.src([
      'main.js',
      'scene.yaml'
    ])
    .pipe(gulp.dest(build_path));
});


// live-reload
gulp.task('server', function() {
  bs.init({
//   http://www.browsersync.io/docs/options/
    server: {
      baseDir: build_path,
    },
    files: [
//   reload once a build successfully completed
      'index.html',
      'main.js',
      'style.css',
      'scene.yaml'
    ],
    ghostMode: false,
    notify: false,
    online: false,
    open: false,
    ui: false
  });

// regenerate build
  gulp.watch(['main.js','scene.yaml'], ['setting']);
  gulp.watch(['index.html','style.css'], ['index']);
});


gulp.task('build', ['env', 'index', 'res', 'single', 'images', 'ionicons', 'leaflet', 'leaflet-markers', 'setting']);
gulp.task('dev', ['build', 'server']);
gulp.task('default', ['build']);
