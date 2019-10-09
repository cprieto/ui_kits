const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

var config = {
  entry: path.resolve('./src/index.tsx'),
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        use: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src', 'index.html')
  })],
  devServer: {
      contentBase: path.join(__dirname, "src"),
      compress: true,
      historyApiFallback: true,
      port: 9000
  }
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map'
    config.module.rules.push({
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    })
  }

  if (argv.mode === 'production') {
    config.optimization = {
      minimizer: [
        new TerserPlugin()
      ]
    }
    config.module.rules.push({
      test: /\.css$/,
      use: [ {
        loader: MiniCssExtractPlugin.loader,
        options: {
          // you can specify a publicPath here
          // by default it uses publicPath in webpackOptions.output
          publicPath: '../',
          hmr: process.env.NODE_ENV === 'development',
        },
      },
      'css-loader', ]
    })
    config.plugins.push(new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: false
    }))
  }

  config.plugins.push(new webpack.DefinePlugin({
    STAGING_URL: argv.mode === 'production' 
      ? JSON.stringify(null) 
      : JSON.stringify('http://localhost:8080/api')
  }))

  return config
}