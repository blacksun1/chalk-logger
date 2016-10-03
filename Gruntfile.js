"use strict";

module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: "src/",
                    src: ["**/*.es6"],
                    dest: "dist",
                    ext: ".js"
                }]
            }
        },
        clean: {
            dist: ["dist"]
        },
        eslint: {
            target: [
                "Gruntfile.js",
                "src/**/*.es6",
                "test/**/*.js"
            ]
        }
    });

    grunt.registerTask("default", ["clean", "eslint", "babel"]);
};
