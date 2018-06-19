const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  entry: {
    app: path.join(__dirname, '../client/entry.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],

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
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
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
            loader: 'less-loader',
            options: {
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
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../client/index.html')
    })
  ]
}

if (isDev) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/entry.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0',
    compress: true,
    port: '8081',
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    overlay: {
      errors: true
    },
    publicPath: '/static/',
    historyApiFallback: {
      index: '/static/index.html'
    },
    proxy: {
      '/book': {
        target: 'https://api.douban.com',
        pathRewrite: {'^/book': '/v2/book/1220562'},
        changeOrigin: true
      }
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
