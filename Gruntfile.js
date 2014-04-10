var path = require('path');
var shell = require('shelljs');

module.exports = function(grunt) {

	/*************************************************************************/
    // Clean
    /*************************************************************************/
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.config('clean', [ 'public' ]);

	/*************************************************************************/
    // Less
    /*************************************************************************/
	grunt.loadNpmTasks('grunt-contrib-less');
	var lessRoot = 'src/client/less/';
    var lessPattern = '**/*.less';
    grunt.config('less', {
 	    all: {
 		   files: [{
 			   expand: true,
 			   cwd: lessRoot,
 			   src: [lessPattern],
 			   dest: 'public/css',
 			   ext: '.css'
 		    }],
 	    },
 	    options: {
 		    cleancss: true
 	    }
    });

    /*************************************************************************/
    // Js / Html / External client stuff
    /*************************************************************************/
    grunt.loadNpmTasks('grunt-contrib-copy');
    var jsRoot = 'src/client/js/';
    var jsPattern = '**/*.js';
    var htmlRoot = 'src/client/html/';
    var htmlPattern = '**/*.html';
    grunt.config('copy', {
    	html: {
    		expand: true,
    		cwd: 'src/client/html',
    		src: '**',
    		dest: 'public/html'
    	},
        ext: {
            expand: true,
            cwd: 'src/client/ext',
            src: '**',
            dest: 'public/ext'
        },
        cname: {
            expand: true,
            cwd: 'src',
            src: 'CNAME',
            dest: 'public/CNAME'
        }
    });

    /*************************************************************************/
    // Compile underscore templates
    /*************************************************************************/
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.config('jst', {
        compile: {
            options: {
                namespace: 'ChordGrids.Templates',
                processName: function(filename) {
                    return path.basename(filename, '.tmpl');
                },
                prettify: true,
                templateSettings: { variable: 'data' }
            },
            files: {
                "public/js/templates.js": ["src/client/templates/*.tmpl"]
            }
        }
    });

    /*************************************************************************/
    // Concat
    /*************************************************************************/    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.config('concat', {
        extless: {
            src: 'src/client/ext/bootstrap/css/bootstrap.min.css',
            dest: 'public/css/deps.css'
        },
        less: {
            src: 'public/css/*.css',
            dest: 'public/css/chordgrids.css'
        },
        extjs: {
            src: [ 'public/ext/js/jquery.min-1.10.2.js',
                   'public/ext/js/jquery.mousewheel.min.js',
                   'public/ext/bootstrap/js/bootstrap.min.js',
                   'public/ext/js/underscore-min-1.5.1.js',
                   'public/ext/js/backbone-min.js',
                   'public/ext/js/backbone.marionette.min.js',
                   'public/ext/js/Base64.js',
                   'public/ext/js/base64binary.js',
                   'public/ext/js/MIDI.min.js' ],
            dest: 'public/js/deps.js'
        },
        js: {
            src: ['public/js/templates.js', 'src/client/js/**/*.js'],
            dest: 'public/js/chordgrids.js',
            options: {
                banner: ';(function() {\n',
                separator: '\n})();\n(function() {\n',
                footer: '})();\n'
            }
        }
    });

    /*************************************************************************/
    // Restart node app
    /*************************************************************************/

    // TODO: can't store pid in zePid because it seems to get erased in between invocations
    // of grunt. Find a different way.

    var nodePid = null;
    grunt.registerTask('app', 'restart node app', function() {
        console.log("********** RESTARTING THE SERVER **********");
        if (nodePid) {
            console.log('killing old node process (nodePid ' + nodePid + ')');
            shell.exec('kill ' + nodePid);
        }
        var f = shell.exec('node app.js', { async: true });
        nodePid = f._handle.pid;
        console.log('new node process has pid ' + f._handle.pid);
        console.log("********** RESTARTED THE SERVER **********");
    });

    /*************************************************************************/
    // Watch
    /*************************************************************************/

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.config('watch', {
 		code: {
            files: ['src/client/**/*', 'Gruntfile.js'],
            tasks: ['default'],
            options: { atBegin: true }
        },
        ext: {
            files: [path.join('src/client/ext/**/*.*')],
            tasks: ['default'],
        },
        app: {
            files: 'app.js',
            tasks: ['app'],
            options: {
                atBegin: true,
                nospawn: true
            }
        }
    });

    /*************************************************************************/
    // Github Pages                                                           
    /*************************************************************************/

    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.config('gh-pages', {
        options: {
            base: 'public'
        },
        src: ['**']
    });

    grunt.registerTask('default', [ 'clean', 'less', 'copy', 'jst', 'concat' ]);
};
