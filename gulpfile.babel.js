/**
 * Gulp packages
 */

// default
import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import flatten from 'gulp-flatten';

// Styles
import cssnano from 'gulp-cssnano';
import sass from 'gulp-sass';
import less from 'gulp-less';
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
 	output: 'assets/',
 	scripts: {
 		input: 'src/js/*.js',
 		output: 'assets/js/'
 	},
 	styles: {
 		sass: {
		  input: 'src/sass/**/*.{scss,sass}',
		  output: 'assets/css/'
	  },
 		less: {
		  input: 'src/less/**/*.less',
		  output: 'assets/css/'
	  }
 	}
};

/**
 * Gulp Tasks
 */

// Minify and concatenate scripts
gulp.task('build:scripts', () => {
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
gulp.task('build:styles:sass', () => {
	gulp.src(paths.styles.sass.input)
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
		.pipe(gulp.dest(paths.styles.sass.output))
		.pipe(sourcemaps.init())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(cssnano())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.styles.sass.output));
});

// Process and minify Less files
gulp.task('build:styles:less', () => {
	gulp.src(paths.styles.less.input)
			.pipe(less())
			.pipe(flatten())
			.pipe(autoprefixer({
				browsers: ['last 2 versions']
			}))
			.pipe(csscomb())
			.pipe(cssbeautify({indent: '  '}))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(paths.styles.less.output))
			.pipe(sourcemaps.init())
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(cssnano())
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(paths.styles.less.output));
});

/**
 * Task Runners
 */

// Compile files
gulp.task('compile', 
	[
		'build;scripts',
		'build:styles:sass',
		'build:styles:less'
	]
);

// Listen for file changes
gulp.task('watch', () => {
	gulp.watch(paths.scripts.input, ['build:scripts']);
	gulp.watch(paths.styles.sass.input, ['build:styles:sass']);
	gulp.watch(paths.styles.less.input, ['build:styles:less']);
});

// Compile files (default)
gulp.task('default',
	[
		'compile'
	]
);