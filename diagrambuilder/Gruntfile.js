
module.exports = function () {
    "use strict";

    var
        pastry  = require('pastry'),
        grunt   = require('grunt'),
        pkg     = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: pkg,

        less: {
            development: {
                files: {
                    'css/style.css': 'less/style.less',
                }
            }
        },

        watch: {
            less: {
                files: [
                    'less/*.less',
                ],
                tasks: [
                    'less'
                ]
            }
        }
    });

    pastry.each([
        'less',
        'watch'
    ], function(module) {
        grunt.loadNpmTasks('grunt-contrib-' + module);
    });

    grunt.registerTask('default', [ ]);
};
