var path =require('path')
var webpack=require('webpack')
var ExtractTextPlugin=require('extract-text-webpack-plugin')
var config={
	entry:{
		main:path.resolve(__dirname,'js/main.js'),
		vendor:['react','react-dom','react-router','object-assign']
	},
	output:{
		filename:'[name].bundle.js',
		path:path.resolve(__dirname,"dist"),
		publicPath:'/dist/'
	},
	module:{
		loaders:[
			{
	          test: /\.jsx?$/,
	          loader: 'react-hot!babel-loader',
	          include: path.join(__dirname, 'js'),
	       },{
	       	  test:/\.css$/,
        	  loader:ExtractTextPlugin.extract('style-loader', 'css-loader')
	       },{ 
			  test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,  
			  loader: 'url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[ext]' 
		   },{
	       	  test: /\.(png|jpg|jpeg|gif)$/,
	       	  loader:'url?limit=8192&name=img/[name].[ext]'
	       }
		]
	},
	resolve:{
	  	extensions:['','.js','.jsx','.css'],
	},
	plugins:[
	    new ExtractTextPlugin('admin.css'),
	    new webpack.optimize.CommonsChunkPlugin('vendor','vendor.js')
	]
}
module.exports=config
