/**
 * Gulp packages
 */

// default
import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import watch from 'gulp-watch';
import flatten from 'gulp-flatten';

// Styles
import cssnano from 'gulp-cssnano';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import csscomb from 'gulp-csscomb';
import cssbeautify from 'gulp-cssbeautify';

// Scripts
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';

/**
 * Paths to project folders
 */

const paths = {
 	input: 'src/**/*',
 	output: 'dist/',
 	scripts: {
 		input: 'src/js/*.js',
 		output: 'dist/js/'
 	},
 	styles: {
 		input: 'src/sass/**/*.{scss,sass}',
 		output: 'dist/css/'
 	}
};

/**
 * Gulp Tasks
 */

// Minify and concatenate scripts
gulp.task('build;scripts', () => {
	gulp.src(paths.scripts.input)
		.pipe(babel())
		.pipe(gulp.dest(paths.scripts.output))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest(paths.scripts.output));
});

// Process and minify Sass files 
gulp.task('build:styles', () => {
	return gulp.src(paths.styles.input)
		// https://github.com/sass/node-sass
		.pipe(sass({
			outputStyle: 'expanded',
			sourceComments: true
		}))
		.pipe(flatten())
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(csscomb())
    .pipe(cssbeautify({indent: '  '}))
		.pipe(gulp.dest(paths.styles.output))
		.pipe(sourcemaps.init())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(cssnano())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.styles.output));
});

/**
 * Task Runners
 */

// Compile files
gulp.task('compile', 
	[
		'build;scripts',
		'build:styles'
	]
);

// Listen for file changes
gulp.task('watch', () => {
	gulp.watch(paths.input, ['default']);
});

// Compile files (default)
gulp.task('default',
	[
		'compile'
	]
);