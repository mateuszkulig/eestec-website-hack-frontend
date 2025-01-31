const merge = require('babel-merge')
const path = require('path')

module.exports = {
    css: {
		sourceMap: true,
	},

    chainWebpack: config => {
		config.module.rule('vue').
			use('vue-loader').
			loader('vue-loader').
			tap(options => {
				merge(options, {
					transformToRequire: {
						'img': 'src',
						'image': 'xlink:href',
						'b-img': 'src',
						'b-img-lazy': ['src', 'blank-src'],
						'b-card': 'img-src',
						'b-card-img': 'img-src',
						'b-carousel-slide': 'img-src',
						'b-embed': 'src',
					},
				})
			})
		
		const svgRule = config.module.rule('svg')
		
		svgRule.uses.clear()
		
		svgRule.use('vue-svg-loader').loader('vue-svg-loader')
	},

    publicPath: './',
    assetsDir: 'assets',

    pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'scss',
			patterns: [
				path.resolve(__dirname, './src/assets/sass/all.scss'),
				path.resolve(__dirname, './node_modules/bootstrap/scss/bootstrap.scss'),
        path.resolve(__dirname, './src/assets/sass/rwd.scss'),
				path.resolve(__dirname, './src/assets/sass/animations.scss'),
			],
		},
	}
}
