# Gulp Boilerplate

My boilerplate for creating web projects with Gulp.js. Inspired by [Chris Ferdinandi's gulp boilerplate](https://github.com/cferdinandi/gulp-boilerplate) and some various tutorials around the web.

**In this documentation**

1. Getting Started
2. File Structure
3. Working with source files
4. License

## Getting started

Make sure you have theses intalled on your computer first.

- [Node.js](https://nodejs.org/en/)
- [Gulp](http://gulpjs.com/) `sudo npm install -g gulp`

## Quick Start

1. Go to your project folder
2. Run `npm install` to install required files
3. You can now run one of these task runners:
    - `gulp` manually compiles files
    - `gulp watch` automatically compiles files

## File Structure

Add your files to the appropriate `src` subdirectories. Gulp will process and and compile them into `assets`.

```
gulp-boilerplate
|-- assets/
|   |-- css/
|   |   |-- # stylesheets from Sass files
|   |   |-- style.css
|   |   |-- style.min.css
|   |   |-- # stylesheets from Less files
|   |   |-- main.css
|   |   |-- main.min.css
|   |-- js/
|   |   |-- script.js
|   |   |-- script.min.js
|   |-- img/
|   |   |-- # image files
|-- src/
|   |-- sass/
|   |   |-- config/
|   |   |   |-- _include-media.scss
|   |   |   |-- _normalize.scss
|   |   |-- style.scss
|   |-- less/
|   |   |-- main.less
|   |-- js/
|   |   |-- script.js
|-- .babelrc
|-- gulpfile.babel.js
|-- package.json
```

## Changing file structure

You can edit the file structure in `gulpfile.js`. You will see a `paths` variable. Ajust the paths to suit your workflow.

```javascript
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
```

## Working with the source files

Do not forget to clean the unused files like `main.less`.

This gulpfile compiles both Sass and Less files. You can choose the one you want to use in your project.

### Sass

Sass files are located in `src/sass`. gulp generates minified and unminified CSS files in `assets/css`. It also includes autoprefixer, which adds vendor prefixes for you if required by the last two versions of a browser.

This boilerplate includes Normalize.css and Include-media.css.

### Less

Less files are located in `src/less`. gulp generates minified and unminified CSS files in `assets/css`. It also includes autoprefixer, which adds vendor prefixes for you if required by the last two versions of a browser.

### JS

JavaScript files are located in the `src/js` directory.

Files placed directly in the js folder will compile directly to `assets/js` as both minified and unminified files.

Gulp uses Babel for transpiling ES6 to ES5.

### Images

Image files are placed into `assets/img` folder.

## License

The code is available under the [MIT License](https://github.com/jlyw/gulp-boilerplate/blob/master/LICENSE).