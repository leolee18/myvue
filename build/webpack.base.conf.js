const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		bundle: path.resolve(__dirname, '../src/index.js')
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'js/[name].[hash].js'
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
