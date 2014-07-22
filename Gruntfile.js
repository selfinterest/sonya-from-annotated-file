/**
 * Created by: Terrence C. Watson
 * Date: 6/30/14
 * Time: 9:34 PM
 */

module.exports = function(grunt){
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mochacli: {
            options: {
                ui: "bdd",
                reporter: 'spec',
                require: ['./tests/globals.js', 'chai'],
                assertion: 'chai',
                bail: true,
                inlineDiffs: true

            },


            all: ["./tests/server/*.js"]
        },
        jasmine_node: {
            options: {
                forceExit: true,
                extensions: 'js',
                match: '.',
                matchall: false,
                specNameMatcher: 'spec'
            },
            all: ['tests/server']
        },
        watch: {
            scripts: {
                files: ['lib/*.js', 'lib/**/*.js', 'tests/server/*.js'],
                tasks: ['mocha'],
                options: {
                    atBegin: true
                }
            }
        }
    });

    grunt.registerTask('default', ['mochacli']);
    grunt.registerTask('mocha', ['mochacli']);


    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-cli');
}
