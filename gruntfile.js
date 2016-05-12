/*global require, module:false*/

module.exports = function (grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    //Task configuration.
    sass: {
      options: {
        sourceMap: false,
        sourceMapRoot: '/',
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          'src/css/screen.css': 'src/sass/screen.scss'
        }
      }
    },
    watch: {
      css: {
        files: ['sass/**/*.scss'],
        tasks: ['sass', 'postcss'],
        options: {
          livereload: 35729
        }
      }
    },
    postcss: {
      options: {
        map: false,
        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: ['last 2 versions', '> 1%', 'ie >= 9'] }), // add vendor prefixes https://github.com/ai/browserslist#queries
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'src/css/screen.css'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');

  // Default task.
  grunt.registerTask('default', ['sass', 'postcss']);
  grunt.registerTask('dev', ['default', 'watch']);
};
