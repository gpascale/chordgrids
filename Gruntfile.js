var path = require('path');
var shell = require('shelljs');

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-copy');

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
/*
    grunt.loadNpmTasks('grunt-develop');
    grunt.config('develop', {
        server: {
            file: 'app.js',
            cmd: 'node',
            options: { nospawn: true }
        }
    });
*/
    /*************************************************************************/
    // Watch
    /*************************************************************************/

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.config('watch', {
 		less: {
 	        files: [path.join(lessRoot, lessPattern)],
            tasks: ['less'],
            options: { atBegin: true }
 		},
 		js: {
 			files: [path.join(jsRoot, jsPattern)],
 			tasks: ['copy:js'],
            options: { atBegin: true }
 		},
 		html: {
 			files: [path.join(htmlRoot, htmlPattern)],
 			tasks: ['copy:html'],
            options: { atBegin: true }
 		},
        ext: {
            files: [path.join('src/client/ext/**/*.*')],
            tasks: ['copy:ext'],
            options: { atBegin: true }
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
};