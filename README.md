# gulp-html-map


## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-html-map`

## Usage

    var htmlMap = require('gulp-html-map');
    
    gulp.task('htmlMap', function() {
      return gulp.src('**/*.html')
        .pipe(htmlMap())
        .pipe(gulp.dest('dist'));
    });

## Options

- `filename`

Type: `string`

Default: `html.map.json`

- `prefix`

Type: `string`

Default: ``

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)





