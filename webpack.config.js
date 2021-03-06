const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/app.jsx'],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'BenchTest'
    })
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.jsx', '.js', '.json']
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: [{
        loader: 'style-loader' 
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
        }
      }, {
        loader: 'less-loader'
      }],
    }, {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
          plugins: [
            ['transform-react-jsx', {
              'pragma': 'createElement',
            }],
            'transform-object-rest-spread',
          ]
        }
      }
    }],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};