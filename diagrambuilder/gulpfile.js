
var
    gulp   = require('gulp'),
    less   = require('gulp-less'),
    pastry = require('pastry'),

    files = {
        less: {
            all : 'less/*.less'
        }
    },

    paths = {
        less : 'less/',
        css  : 'css/'
    };

gulp.task('less', function () {
    gulp.src(files.less.all)
        .pipe(less())
        .pipe(gulp.dest(paths.css));
});

gulp.task('watch', function () {
    gulp.watch(files.less.all, ['less']);
    // gulp.watch(paths.less, ['less']);
});

