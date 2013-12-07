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
    	js: {
    		expand: true,
    		cwd: 'src/client/js',
    		src: jsPattern,
    		dest: 'public/js'
    	},
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
        less: {
            src: 'public/css/*.css',
            dest: 'public/chordgrids.css'
        },
        js: {
            src: ['public/js/templates.js', 'public/js/**/*.js'],
            dest: 'public/chordgrids.js',
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
            files: ['src/client/**/*'],
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

    grunt.registerTask('default', [ 'clean', 'less', 'copy', 'jst', 'concat' ]);
};