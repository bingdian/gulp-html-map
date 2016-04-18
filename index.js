var through = require('through2');
var File    = require('vinyl');

module.exports = function (opt) {
    opt = opt || {};

    var sourcemaps  = [];
    var titleRegExp = /<title>.*<\/title>/;
    var filename    = opt.filename || 'html.map.json';
    var prefix      = opt.prefix || '';

    return through.obj(function (file, encoding, callback) {
        if ( file.isNull() ) {
            return callback(null, file);
        }

        if ( file.isStream() ) {
            return callback(new gutil.PluginError('gulp-html-map', 'doesn\'t support Streams'));
        }

        var html = file.contents.toString();

        if ( !html ) {
            return callback(null, file);
        }

        var title = html.match(titleRegExp).toString().replace('<title>', '').replace('</title>', '');
        var path  = file.relative;

        sourcemaps.push({
            title : title,
            path : prefix + path
        });

        callback();
    }, function (callback) {
        var sourcemapFile = new File({
            path : process.cwd() + '/' + filename
        });

        sourcemapFile.contents = new Buffer(JSON.stringify(sourcemaps, null, 2));
        this.push(sourcemapFile);
        callback();
    });
};
