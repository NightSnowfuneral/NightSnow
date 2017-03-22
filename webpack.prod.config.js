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
		noParse:[path.resolve(__dirname,'node_modules/react/dist/react.min.js')],
		loaders:[
			{
	          test: /\.jsx?$/,
	          loader: 'react-hot!babel-loader',
	          include: path.join(__dirname, 'js'),
	       },{
	       	  test:/\.css$/,
	       	  exclude: /node_modules/,
        	  loader:ExtractTextPlugin.extract('style-loader', 'css-loader')
	       }
		]
	},
	resolve:{
	  extensions:['','.js','.jsx','.css'],
	  alias:{
	  	'react':path.resolve(__dirname,'node_modules/react/dist/react.min.js'),
	  	'react-dom':path.resolve(__dirname,'node_modules/react-dom/dist/react-dom.js'),
	  }
	},
	plugins:[
		new webpack.optimize.UglifyJsPlugin({
			output: {comments: false},
			compress:{warnings: false}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			}
		}),
	    new ExtractTextPlugin('app.css'),
	    new webpack.optimize.CommonsChunkPlugin('vendor','vendor.js')
	]
}
module.exports=config
