const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

var config = {
  entry: path.resolve('./src/index.tsx'),
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
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
  }

  if (argv.mode === 'production') {
    config.optimization = {
      minimizer: [
        new TerserPlugin()
      ]
    }
  }

  config.plugins.push(new webpack.DefinePlugin({
    STAGING_URL: argv.mode === 'production' 
      ? JSON.stringify(null) 
      : JSON.stringify('http://localhost:8080/api')
  }))

  // TODO: We can move the CSS extractor to this line

  return config
}