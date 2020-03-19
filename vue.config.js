const webpack = require('webpack')

module.exports = {
	publicPath:'./',//vue-cli3.3+新版本使用
	configureWebpack: {
		//关闭 webpack 的性能提示
		//  performance: {
		//     hints:false
		// },

		plugins: [
			new webpack.ProvidePlugin({
				$: "jquery",
				jQuery: "jquery",
				"windows.jQuery": "jquery"
			})
		]
	},
	pwa: {
		iconPaths: {
			favicon32: './logo.ico',
			favicon16: './logo.ico',
			appleTouchIcon: './logo.ico',
			maskIcon: './logo.ico',
			msTileImage: './logo.ico'
		}
	}
	
}
