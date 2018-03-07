//NOTE there are 3 folderpaths, 1 for each build: src, dev, dist
//src: build only sass to css, urls for local backend
//dev: build sass+js(uglified), urls for network backend
//dist: build sass+js(uglified), urls for prod backend
var path = require('path');
module.exports = function(grunt) {
	grunt.initConfig({
		ngtemplates:  {
			options: {
				htmlmin: {
					collapseBooleanAttributes:      true,
					collapseWhitespace:             true,
					removeAttributeQuotes:          true,
					removeComments:                 true, // Only if you don't use comment directives! 
					removeEmptyAttributes:          true,
					removeRedundantAttributes:      true,
					removeScriptTypeAttributes:     true,
					removeStyleLinkTypeAttributes:  true
				},
				prefix: '/App'
			},
			dev: {
				options: {
					module:'app'
				},
				cwd: 'src/app',
				src: '**/*.html',
				dest: 'dev/bundles/htmlAppBundle.min.js'
			},
			dist: {
				options: {
					module:'app'
				},
				cwd: 'src/app',
				src: '**/*.html',
				dest: 'dist/bundles/htmlAppBundle.min.js'
			},
			test: {
				options: {
					module:'app.test'
				},
				cwd: 'src/app',
				src: '**/*.html',
				dest: 'test/pages/htmlAppBundle.min.js'
			}
		},
		uglify: {
			options: {
				compress: true,
				mangle: true
			},
			appDevJS: {
				options: {
					sourceMap: true,
					sourceMapIncludeSources: true
				},
				files: [{
					src: [
						'src/environment/dev.js',
						'src/app/**/*module.js',
						'src/app/**/*providers.js',
						'src/app/**/*services.js',
						'src/app/**/*controllers.js',
						'src/app/**/*directive.js',
						'src/app/**/*component.js',
						'src/app/**/*filters.js'
					],
					dest: 'dev/bundles/jsAppBundle.min.js'
				}]
			},
			appProdJS: {
				files: [{
					src: [
						'src/environment/prod.js',
						'src/app/**/*module.js',
						'src/app/**/*providers.js',
						'src/app/**/*services.js',
						'src/app/**/*controllers.js',
						'src/app/**/*directive.js',
						'src/app/**/*component.js',
						'src/app/**/*filters.js'
					],
					dest: 'dist/bundles/jsAppBundle.min.js'
				}]
			}
		},

		sass: {
			appCSS: {
				options: {
					style: 'compressed',
					cacheLocation: '.sass-cache',
					sourcemap:'none'
				},
				files: [{
					expand: true, 
					cwd: 'src/app',
					src: [
						'**/*.scss'
					],
					dest: 'src/app/',
					ext: '.css' 
				}]
			}
		},

		concat: {
			angularDevJS: {
				src: [
					'node_modules/angular/angular.min.js',
					'node_modules/angular-animate/angular-animate.min.js',
					'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
				],
				dest: 'dev/bundles/jsAngularBundle.min.js'
			},
			angularProdJS: {
				src: [
					'node_modules/angular/angular.min.js',
					'node_modules/angular-animate/angular-animate.min.js',
					'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
				],
				dest: 'dist/bundles/jsAngularBundle.min.js'
			},
			appDevCSS: {
				src: [
					'src/app/**/*.css'
				],
				dest: 'dev/bundles/cssAppBundle.min.css'
			},
			appProdCSS: {
				src: [
					'src/app/**/*.css'
				],
				dest: 'dist/bundles/cssAppBundle.min.css'
			}
		},
		//note that the bundle files have to exist already or htmlbuild will replace with empty
		htmlbuild: {
				dev: {
					src: 'src/index.html',
					dest: 'dev/',
					options: {
						scripts: {
							jsAppBundle: 'dev/bundles/jsAppBundle.min.js',
							htmlAppBundle: 'dev/bundles/htmlAppBundle.min.js',
							jsAngularBundle: 'dev/bundles/jsAngularBundle.min.js',
						},
						styles: {
							cssAppBundle:  'dev/bundles/cssAppBundle.min.css',
						}
					}
				},
				dist: {
					src: 'src/index.html',
					dest: 'dist/',
					options: {
						scripts: {
							jsAppBundle: 'dist/bundles/jsAppBundle.min.js',
							htmlAppBundle: 'dist/bundles/htmlAppBundle.min.js',
							jsAngularBundle: 'dist/bundles/jsAngularBundle.min.js',
						},
						styles: {
							cssAppBundle:  'dist/bundles/cssAppBundle.min.css',
						}
					}
				}
		},

		copy: {
			angularSrcJS: {
				files:[{
					expand: true,// enables cwd
					flatten: true, //removes folder structure
					cwd: 'node_modules/',//start copy structure below this folder
					src: [
						'angular/angular.js',
						'angular-animate/angular-animate.js',
						'@uirouter/angularjs/release/angular-ui-router.js',
					],
					dest: 'src/Lib/'
				}]
			}
		},
		imagemin: {
			contentDev: {
					files: [{
					expand: true,// enables cwd and preserve folder structure (no flatten)
					cwd: 'src/Content',//start copy structure below this folder
					src: ['**/*.{png,jpg,gif}'],
					dest: 'dev/Content/',
				}]
			},
			contentDist: {
				files: [{
					expand: true,// enables cwd and preserve folder structure (no flatten)
					cwd: 'src/Content',//start copy structure below this folder
					src: ['**/*.{png,jpg,gif}'],
					dest: 'dist/Content/',
				}]
			},
		},
		connect: {
			options: {
				middleware: function(connect, options, middlewares) {
					var modRewrite = require('connect-modrewrite');
					// enable Angular's HTML5 mode
					middlewares.unshift(modRewrite(['!\\.html|\\.js|\\.map|\\.ico|\\.svg|\\.css|\\.png|\\.jpg|\\.gif$ /index.html [L]']));
					return middlewares;
				}
			},
			src: {
				options: {
					base: 'src/',
					port: 4444
				}
			},
			dev:{
				options: {
					hostname: 'localhost', // Most important!
					livereload: true,//note that keepalive is false and livereload is true for watch
					base: 'dev/',
					port: 4444
				}
			},
			test:{
				options: {
					base: 'dev/',
					port: 4444,
				}
			},
			dist:{
				options: {
					base: 'dist/',
					port: 4444
				}
			}
		},

		watch: {
			options : {
				livereload: 35729
			},
			src: {
				files: ['src/**/*.js','src/**/*.html','src/**/*.scss'],
				tasks: ['build-src']
			},
			dev: {
				files: ['src/**/*.js','src/**/*.html','src/**/*.scss'],
				tasks: ['build-dev']
			},
			dist: {
				files: ['src/**/*.js','src/**/*.html','src/**/*.scss'],
				tasks: ['build-dist']
			}
		},
		karma: {
			test: {
				configFile: 'test/unit/config/karma.conf.js',
				autoWatch: false,
				singleRun: true
			}
		},

		protractor: {
			test: {
				options: {
					keepAlive: true,
					configFile: 'test/e2e/config/protractor.spec.conf.js'
				}
			},
			video: {
				options: {
					keepAlive: true,
					configFile: 'test/e2e/config/protractor.video.conf.js'
				}
			},
			screenshot: {
				options: {
					keepAlive: true,
					configFile: 'test/e2e/config/protractor.screenshot.conf.js'
				}
			},
		}

	});

	/* load plugins */
	
	//https://github.com/gruntjs/grunt-contrib-imagemin
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	
	//grunt-html-build https://github.com/spatools/grunt-html-build
	grunt.loadNpmTasks('grunt-html-build');
	
	//grunt-angular-templates https://github.com/ericclemmons/grunt-angular-templates
	grunt.loadNpmTasks('grunt-angular-templates');
	
	// grunt-contrib-connect https://github.com/gruntjs/grunt-contrib-connect
	grunt.loadNpmTasks('grunt-contrib-connect');
	
	// grunt-contrib-uglify https://github.com/gruntjs/grunt-contrib-uglify
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	// grunt-contrib-concat https://github.com/gruntjs/grunt-contrib-concat
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	// grunt-contrib-copy https://github.com/gruntjs/grunt-contrib-copy
	grunt.loadNpmTasks('grunt-contrib-copy');
	
	// grunt-contrib-watch https://github.com/gruntjs/grunt-contrib-watch
	grunt.loadNpmTasks('grunt-contrib-watch');

	// grunt-contrib-sass https://github.com/gruntjs/grunt-contrib-sass
	grunt.loadNpmTasks('grunt-contrib-sass');
	
	// grunt-karma https://github.com/karma-runner/grunt-karma
	grunt.loadNpmTasks('grunt-karma');
	
	// grunt-protractor-runner https://github.com/teerapap/grunt-protractor-runner
	grunt.loadNpmTasks('grunt-protractor-runner');


	/* register "grunt <taskname>" commands*/
	
	// build scripts
	grunt.registerTask('build-src', ['copy:angularSrcJS','sass']);
	grunt.registerTask('build-dev', ['concat:angularDevJS','imagemin:contentDev','ngtemplates:dev','uglify:appDevJS','sass','concat:appDevCSS','htmlbuild:dev']);
	grunt.registerTask('build-dist', ['concat:angularProdJS','imagemin:contentDist','ngtemplates:dist','uglify:appProdJS','sass','concat:appProdCSS','htmlbuild:dist']);
	grunt.registerTask('build-test', ['copy:angularSrcJS','ngtemplates:test']);

	// launch a static server
	grunt.registerTask('start-src', ['build-src','connect:src', 'watch:src']);
	grunt.registerTask('start-dev', ['build-dev','connect:dev', 'watch:dev']);
	grunt.registerTask('start-dist', ['build-dist', 'connect:dist', 'watch:dist']);
	
	// test
	grunt.registerTask('test-unit', ['build-test', 'karma:test']);
	grunt.registerTask('test-e2e', ['build-dev', 'connect:test','protractor:test']);
	grunt.registerTask('test', ['test-unit', 'test-e2e']);
	grunt.registerTask('video', ['build-dev', 'connect:test','protractor:video']);
	grunt.registerTask('screenshot', ['build-dev', 'connect:test','protractor:screenshot']);

};