module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    less: {
      style: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2,
        },
        files: {
          'build/css/style.css': ['src/less/style.less']
        },
      }
    },

    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers: "last 2 versions"})
        ]
      },
      style: {
        src: "build/css/*.css"
      }
    },

    cmq: {
      style: {
        files: {
          'build/css/style.css': ['build/css/style.css']
        }
      }
    },

    cssmin: {
      style: {
        options: {
          keepSpecialComments: 0
        },
        files: [{
          expand: true,
          cwd: 'build/css',
          src: ['*.css', '!*.min.css'],
          dest: 'build/css',
          ext: '.min.css'
        }]
      }
    },

    includereplace: {
      html: {
        src: '*.html',
        dest: 'build/',
        expand: true,
        cwd: 'src/'
      }
    },

    concat: {
      start: {
        src: [
          'src/js/script.js'
        ],
        dest: 'build/js/script.js'
      }
    },

    uglify: {
      start: {
        files: {
          'build/js/script.min.js': ['build/js/script.js']
        }
      }
    },

    'gh-pages': {
      options: {
        base: 'build'
      },
      src: '**/*'
    },

    watch: {
      livereload: {
        options: { livereload: true },
        files: ['build/**/*'],
      },
      style: {
        files: ['src/less/**/*.less'],
        tasks: ['style'],
        options: {
          spawn: false,
        },
      },
      html: {
        files: ['src/*.html'],
        tasks: ['includereplace:html'],
        options: {
          spawn: false
        },
      },
      scripts: {
        files: ['src/js/script.js'],
        tasks: ['js'],
        options: {
          spawn: false
        },
      },
    },

    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'build/css/*.css',
            'build/js/*.js',
            'build/*.html',
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "build/",
          },
          ghostMode: {
            clicks: true,
            forms: true,
            scroll: false
          }
        }
      }
    }
  });

  grunt.registerTask('default', [
    'style',
    'js',
    'includereplace:html',
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('style', [
    'less',
    'postcss',
    'cmq',
    'cssmin',
  ]);

  grunt.registerTask('js', [
    'concat',
    'uglify',
  ]);

  grunt.registerTask('build', [
    'js',
    'includereplace:html',
    'style',
    'gh-pages',
  ]);

};