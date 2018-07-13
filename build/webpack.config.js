const path = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack')
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../src/index.js')
    ]
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      /* {
        enforce: 'pre',
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      }, */
      {
        test: /.js$/,
        use: ['happypack/loader?id=babel'],
        include: path.resolve(__dirname, '../src'),
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      },
      {
        test: /\.less|css$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              modifyVars: {
                'font-size-base': '14px'
              }
            } // compiles Less to CSS
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader'
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: '0.0.0.0',
    compress: true,
    port: '8081',
    contentBase: path.join(__dirname, '../'),
    hot: true,
    overlay: {
      errors: true
    },
    publicPath: '/',
    historyApiFallback: true,
    proxy: {
      '/book': {
        target: 'https://api.douban.com',
        pathRewrite: {'^/book': '/v2/book/1220562'},
        changeOrigin: true
      },
      '/pubapi': {
        target: 'http://192.168.32.106:28081',
        changeOrigin: true
      }
    }
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../src/index.html')
    }),
    new HappyPack({
      // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      id: 'babel',
      // 如何处理 .js 文件，用法和 Loader 配置中一样
      loaders: ['babel-loader?cacheDirectory']
      // ... 其它配置项
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
