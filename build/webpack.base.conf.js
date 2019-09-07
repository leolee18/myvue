const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		mvue: [path.resolve(__dirname, '../src/js/Dep.js'),path.resolve(__dirname, '../src/js/Watcher.js'),path.resolve(__dirname, '../src/js/TemplateCompiler.js'),path.resolve(__dirname, '../src/js/Observer.js'),path.resolve(__dirname, '../src/js/MinVue.js')],
		bundle: path.resolve(__dirname, '../src/index.js')
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'js/[name].[hash].js',
		library: '[name]', // 指定类库名,主要用于直接引用的方式(比如使用script 标签)
		libraryExport: "default", // 对外暴露default属性，就可以直接调用default里的属性
		globalObject: 'this', // 定义全局变量,兼容node和浏览器运行，避免出现"window is not defined"的情况
		libraryTarget: 'umd' // 定义打包方式Universal Module Definition,同时支持在CommonJS、AMD和全局变量使用
	},
	resolve: {},
	module: {
		rules: [{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../index.html')
		}),
		new MiniCssExtractPlugin({
			filename: "css/[name].css",
			chunkFilename: "[id].css"
		}),
		new AutoDllPlugin({
			inject: true, // will inject the DLL bundle to index.html
			debug: true,
			filename: '[name]_[hash].js',
			path: './dll',
			entry: {
				vendor: []
			}
		}),
		new CopyPlugin([{
			from: path.resolve(__dirname, '../src/mVue2.js'),
			to: path.resolve(__dirname, '../dist/js/mVue2.js')
		}, ])
	]
};
