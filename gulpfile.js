var gulp          = require('gulp');
var plumber       = require('gulp-plumber');
var sass          = require('gulp-sass');
var uglify        = require('gulp-uglify');
var imagemin      = require('gulp-imagemin');
var pngcrush      = require('imagemin-pngcrush');
var include       = require('gulp-include');
var autoprefixer  = require('gulp-autoprefixer');
var notify        = require('gulp-notify');
var cleanCSS      = require('gulp-clean-css');
var sourcemaps    = require('gulp-sourcemaps');
var browserSync   = require("browser-sync").create();
var postcss       = require('gulp-postcss');
var sassLint      = require('gulp-sass-lint');

var themePath     = "out/";

var paths = {
	src: {
		styles:     themePath + 'src/scss/**/*.scss',
		scripts:    [themePath + 'src/js/**/*.js', themePath + 'src/js/**/*.js'],
		images:     [themePath + 'src/img/**/*', themePath + 'src/img/**/.*'],
		fonts:      [themePath + 'src/fonts/**/*', themePath + 'src/fonts/**/.*']
	},
	dist: {
		css:        themePath + 'src/css',
		scss:       themePath + 'dist/scss',
		scripts:    themePath + 'dist/js',
		images:     themePath + 'dist/img',
		fonts:      themePath + 'dist/fonts'
	},
	watch: {
		styles:     themePath + 'src/scss/**/*.scss',
		scripts:    themePath + 'src/js/**/*.js',
		images:     themePath + 'src/img/**/*',
		//templates:  'templates/**/*'
	}
};
const styles = function() {
	return gulp.src(paths.src.styles)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(sourcemaps.write('../maps'))
		.pipe(gulp.dest(paths.dist.css))
		.pipe(browserSync.stream({match: '**/*.css'}));
};

exports.styles = styles;
// nearly the same that ['styles'] does, but adding pixrem fallback and minify css via cleanCSS
const minifyCss = function() {
	return gulp.src(paths.src.styles)
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(cleanCSS())
		.pipe(gulp.dest(paths.dist.css));
};
exports.minify_css = minifyCss;

// read, combine and uglyify js
const scripts = function() {
	return gulp.src(paths.src.scripts)
		.pipe(include())
		.pipe(uglify())
		.pipe(gulp.dest(paths.dist.scripts));
};
exports.scripts = scripts;

// copy static files from src to dist
const copy = function() {
	return gulp.src(paths.src.fonts)
		.pipe(gulp.dest(paths.dist.fonts));
};
exports.copy = copy;

const reload = function() {
	browserSync.reload();
};

const watch = function(done) {
	gulp.watch(paths.watch.styles, gulp.series([styles]));
	gulp.watch(paths.watch.templates).on('change', reload);
	gulp.watch(paths.watch.scripts, gulp.series([scripts])).on('change', reload);
	done();
};

const serve = function(done) {
	browserSync.init({
		proxy: bsProxy,
		open: false,
		injectNotification: 'overlay'
	}, () => {
		done();
	});
};
exports.serve = serve;

exports.default = gulp.parallel([serve, watch]);
exports.deploy = gulp.series([minifyCss, scripts, copy]);

