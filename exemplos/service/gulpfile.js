/********************************************
** MODULES
********************************************/
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    batch = require('gulp-batch'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    minifyHTML = require('gulp-minify-html'),
    livereload = require('gulp-livereload');

/********************************************
** CONFIGS
********************************************/
var config = {
    DIST_PATH: './dist/',
    INDEX_HTML: 'src/index.html',
    JS_FILES: [
        '../lib/angular-1.3.15/js/angular.min.js',
        'src/assets/js/*.js',
        'src/app/*.module.js',
        'src/app/components/**/*.service.js',
        'src/app/components/**/*.controller.js'
    ],
    CSS_FILES: [
        '../lib/bootstrap-3.3.5/css/bootstrap.min.css',
        '../lib/bootstrap-3.3.5/css/bootstrap-theme.min.css',
        'src/assets/css/**/*.css'
    ],
    VIEW_FILES: 'src/app/components/**/*.view.html'
};

/********************************************
** TASKS
********************************************/
// Default Task
gulp.task('default', ['js', 'css', 'html'], function() {
    gulp.start('watch');
});

// Deploy Task
gulp.task('deploy', ['js-dist', 'css-dist', 'html-dist']);

// Watch Task
gulp.task('watch', function() {
    livereload.listen();
    gulp.start(['watch-css', 'watch-js']);
});

// Watch JS Task
gulp.task('watch-js', function() {
    watch(config.JS_FILES, batch(function (events, done) {
        gulp.start('js', done);
    }));
});

// Watch CSS Task
gulp.task('watch-css', function() {
    watch(config.CSS_FILES, batch(function (events, done) {
        gulp.start('css', done);
    }));
})

// CSS Task
gulp.task('css', function() {
    return gulp.src(config.CSS_FILES)
        .pipe(concat('app.css'))
        .pipe(autoprefixer({
            compatibility: 'ie8',
            cascade: false
        }))
        .pipe(gulp.dest(config.DIST_PATH))
        .pipe(livereload());
});

gulp.task('css-dist', function() {
    return gulp.src(config.CSS_FILES)
        .pipe(concat('app.css'))
        .pipe(autoprefixer({
            compatibility: 'ie8',
            cascade: false
        }))
        .pipe(gulp.dest(config.DIST_PATH))
        .pipe(minifyCss({compatibility: 'ie8'}));
})

// JS Task
gulp.task('js', function() {
    return gulp.src(config.JS_FILES)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.DIST_PATH))
        .pipe(livereload());
});

gulp.task('js-dist', function() {
    return gulp.src(config.JS_FILES)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.DIST_PATH))
        .pipe(uglify());
});

// HTML Task
gulp.task('html', ['html-views'], function() {
    return gulp.src(config.INDEX_HTML).
        pipe(gulp.dest(config.DIST_PATH));
});

gulp.task('html-views', function() {
    return gulp.src([
        config.VIEW_FILES
    ])
    .pipe(gulp.dest(config.DIST_PATH + 'view/'));
});

gulp.task('html-dist', ['html-views-dist'], function() {
    return gulp.src(config.INDEX_HTML)
        .pipe(minifyHTML())
        .pipe(gulp.dest(config.DIST_PATH));
})

gulp.task('html-views-dist', function() {
    return gulp.src([
        config.VIEW_FILES
    ])
    .pipe(minifyHTML())
    .pipe(gulp.dest(config.DIST_PATH + 'view/'));
});