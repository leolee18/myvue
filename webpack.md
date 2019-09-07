# webpack4
## 1. 全局安装
```
	npm install webpack -g
	npm install webpack-cli -g
```
## 2. 初始化项目
```
	npm init
```
## 3. 局部安装
```
	npm install --save-dev webpack
	npm install --save-dev webpack-cli
```
## 4. 打包
```
	webpack
	默认文件
	entry:src/index.js
	output:dist/main.js
```
## 5. 配置
```
	webpack.config.js
	
	  const path = require('path');
	  module.exports = {
	-   entry: './src/index.js',
	+   entry: {
	+     app: './src/index.js',
	+     print: './src/print.js'
	+   },
	    output: {
	-     filename: 'bundle.js',
	+     filename: '[name].bundle.js',
	      path: path.resolve(__dirname, 'dist')
	    }
	  };
	
```
## 6. webpack-dev-server
```
	npm install webpack-dev-server -D
	
	配置 webpack.config.js
	devServer: {
		contentBase: path.resolve(__dirname, '../dist'),
		open: true,
		hot: true
	},
	配置 package.json
	"scripts": {
	  "start": "webpack --mode devlopment",
	  "dev": "webpack-dev-server --inline"
	},
```
## 7. loader
```
	npm install --save-dev style-loader css-loader 
	配置
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader','css-loader']
			}
		]
	},
	
	npm install --save-dev file-loader
	配置
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
	}
```
## 8. 插件
```
	npm install --save-dev html-webpack-plugin 
	配置
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../index.html'),
			minify:{
				removeAttributeQuotes:true,//去除引号
				removeComments:true, // 去除注释
				removeEmptyAttributes:true,//去除空属性
				collapseWhitespace: true //是否去除空格
			}
		})
	]
	
```

## 9. 引入第三方库
```
	安装
	npm install jquery -s
	引入
	import $ from 'jquery';
	
```
## 10. babel
```
	安装
	npm install babel-loader babel-core babel-preset-env -D
	
	配置1
	{
		test: /\.js$/,
		use: {
			loader:'babel-loader',
			options:{
				pressets:['env']
			}
		},
		exclude: /node_modules/
	}
	
	配置2
	{
		test: /\.js$/,
		use: 'babel-loader',
		exclude: /node_modules/
	}
	新增 .babelrc 文件
	{
	  "presets": [
	    ["env", {
	      "modules": false,
	      "targets": {
	        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
	      }
	    }]
	  ]
	}
	
```
## 11. es6 Promise
```
	//基础，成功失败
	new Promise((resolve,reject)=>{
		if(true){
			resolve();
		}else{
			reject();
		}
	}).then(()=>{
		console.log('aa');
	}).catch(()=>{
		console.log('aa');
	})
	
	//链式调用，抛错捕获
	new Promise((resolve,reject)=>{
		resolve('1');
	}).then((e)=>{
		console.log(e);//1
		return '2';
	}).then((e)=>{
		console.log(e);//2
		return '3';
	}).then((e)=>{
		console.log(e);//3
		throw 'this is bug';//抛出问题
	}).catch((l)=>{
		console.log(l);//this is bug
	})
	
	new Promise((resolve,reject)=>{
		reject('1');
	}).then(()=>{
		
	}).catch((e)=>{
		console.log(e);//1
		return '3';
	}).then((e)=>{
		console.log(e);//3
	})
	
	//静态方法
	Promise.resolve('1').then((m)=>{
		console.log(m);//1
	});
	Promise.reject('2').then(()=>{
		
	}).catch((m)=>{
		console.log(m);//2
	})
	
	// race 竞赛 竞速
	Promise.race([
		new Promise((resolve,reject)=>{
			setTimeout(resolve,400,'one');
		}),new Promise((resolve,reject)=>{
			setTimeout(resolve,500,'two');
		}),new Promise((resolve,reject)=>{
			setTimeout(reject,300,'three');
		})
	]).then((m)=>{
		console.log(m);
	}).catch((m)=>{
		console.log(m);//three
	});
	
	//all 所有
	Promise.all([1,2,3]).then((m)=>{
		console.log(m);//[1,2,3]
	});
	Promise.all([
		Promise.resolve('abc'),
		Promise.reject('bcd'),
		3
	]).then((m)=>{
		console.log(m);
	}).catch((m)=>{
		console.log(m);//bcd
	});
```

