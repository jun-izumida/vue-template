const MODE = "development";
const enabledSourceMap = MODE === "development";

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	entry: './src/js/app.js',
	output: {
		path: path.resolve(__dirname, 'dist/js'),
		filename: "bundle.js"
	},
	mode: MODE,
	devtool: 'source-map',
	module: {
    rules: [
		{
			test: /\.css$/,
			use: ["vue-style-loader", "css-loader"]
		},
		{
			test: /\.vue$/,
			loader: "vue-loader"
		},
		{
			test: /\.ts$/,
			use: "ts-loader"
		},
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel-loader",
			options: {
				presets: [
					"@babel/preset-env"
				]
			}
		}
	]
	},
	resolve: {
		alias: {
			vue$: "vue/dist/vue.esm.js"
		},
		extensions: ["*", ".js", ".vue", ".json", "ts"]
	},
	plugins: [
		new VueLoaderPlugin()
	],
	optimization: {
		minimizer: MODE === "production"
			? []
			: [
				new TerserPlugin({
					extractComments: 'all',
					terserOptions: {
						compress: { drop_console: true }
					},
				}),
			]
	},
	target: ["web", "es5"],
	devServer: {
		publicPath: '/dist/js/',
		watchContentBase: true,
		open: true,
		openPage: "index.html",
		host: "0.0.0.0"
	}
};