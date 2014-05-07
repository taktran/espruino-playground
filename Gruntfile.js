/*global require:true, module:false*/
module.exports = function (grunt) {
  'use strict';

  var appConfig = {
    root: "app",

    publicBase: "app/public",
    dist: "app/public/dist",
    js: "app/public/js",
    sassDir: "app/views/sass",

    port: grunt.option('port') || 7770,
    hostname: "0.0.0.0",
    liveReloadPort: grunt.option('lrp') || 35729
  };

  // For livereload
  function addLiveReloadMiddleware(connect, options) {
    var path = require('path'),
      lrSnippet = require('connect-livereload')({
        port: appConfig.liveReloadPort
      }),
      folderMount = function folderMount(connect, point) {
        return connect['static'](path.resolve(point));
      };

    return [lrSnippet, folderMount(connect, options.base)];
  }

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    app: appConfig,
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    connect: {
      livereload: {
        options: {
          hostname: '<%= app.hostname %>',
          port: '<%= app.port %>',
          base: '<%= app.publicBase %>',
          middleware: addLiveReloadMiddleware
        }
      }
    },

    sass: {
      dist: {
        files: {
          '<%= app.publicBase %>/css/main.css': '<%= app.sassDir %>/main.scss'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: ['Gruntfile.js']
      },
      karmaConfig: {
        src: ['config/karma.conf.js']
      },
      js: {
        src: [
          '<%= app.publicBase %>/js/*.js',
          '<%= app.publicBase %>/js/**/*.js'
        ]
      },
      test: {
        src: ['test/unit/*.js']
      }
    },

    karma: {
      unitTestFiles: [
        // Vendor code
        'app/public/vendor/jquery/jquery.min.js',

        // App code
        'app/public/js/*.js',

        // Test specs
        'test/unit/*.js',
        'test/unit/**/*.js'
      ],
      // Unit tests
      unit: {
        configFile: 'config/karma.conf.js',
        background: true,
        options: {
          basePath: '../',
          files: '<%= karma.unitTestFiles %>'
        }
      },
      // Unit tests for continuous integration
      unitCI: {
        configFile: 'config/karma.conf.js',
        singleRun: true,
        options: {
          basePath: '../',
          files: '<%= karma.unitTestFiles %>'
        }
      },
    },

    watch: {
      jshintrc: {
        files: '.jshintrc',
        tasks: ['jshint:jshintrc']
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile']
      },
      scripts: {
        files: [
          '<%= jshint.js.src %>',
          '<%= app.publicBase %>/vendor/**/*'
        ],
        tasks: [
          'jshint',
          'browserify'
        ]
      },
      karmaConfig: {
        files: '<%= jshint.karmaConfig.src %>',
        tasks: ['jshint:karmaConfig', 'karma:unit:run']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint', 'karma:unit:run']
      },
      css: {
        files: '<%= app.sassDir %>/*.scss',
        tasks: ['sass']
      },
      html: {
        files: [
          '<%= app.publicBase %>/*.html',
          '<%= app.publicBase %>/*.htm',
          '<%= app.publicBase %>/css/*.css'
        ],
        options: {
          livereload: '<%= app.liveReloadPort %>'
        }
      },
      dist: {
        files: [
          '<%= app.dist %>/js/*.js',
          '<%= app.dist %>/js/**/*.js'
        ],
        options: {
          livereload: '<%= app.liveReloadPort %>'
        }
      }
    },

    browserify: {
      js: {
        src: '<%= app.js %>/app.js',
        dest: '<%= app.dist %>/js/app.js'
      },
    },

    open: {
      all: {
        path: 'http://<%= app.hostname %>:<%= app.port %>'
      }
    }
  });

  grunt.registerTask('default', [
    'connect',
    'karma:unit',
    'watch'
  ]);

  // Run all tests for CI
  grunt.registerTask('ci:test', [
    'karma:unitCI',
  ]);

  // Run all tests
  grunt.registerTask('test', [
    'karma:unit:run'
  ]);

};
