const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const WebpackManifestPlugin = require('webpack-manifest-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const PROD = process.env.NODE_ENV === 'production'
const srcPath = path.resolve(__dirname, 'src')

function getCSSLoader(lang) {
  let loaders = []
  if (PROD) {
    loaders = [MiniCSSExtractPlugin.loader]
  } else {
    loaders = [
      {
        loader: require.resolve('style-loader'),
      },
    ]
  }

  loaders = [
    ...loaders,
    {
      loader: 'css-loader',
      options: {
        importLoaders: lang === 'css' ? 1 : 2,
        sourceMap: true,
        modules: {
          localIdentName: PROD ? '[hash:base64]' : '[path][name]__[local]',
          exportLocalsConvention: 'camelCaseOnly',
          auto: true,
        },
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        postcssOptions: {
          config: true,
          map: true,
          plugins: [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              stage: 0,
            }),
            require('postcss-normalize')(),
          ],
        },
      },
    },
  ]
  if (lang === 'less') {
    loaders.push({
      loader: 'less-loader',
      options: {
        sourceMap: true,
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    })
  }
  return loaders
}

const config = {
  mode: PROD ? 'production' : 'development',
  entry: {
    app: PROD
      ? path.resolve(srcPath, 'index.tsx')
      : [
          require.resolve('react-dev-utils/webpackHotDevClient'), // for HMR
          path.resolve(srcPath, 'index.tsx'),
        ],
  },
  output: {
    publicPath: '/',
    path: __dirname + '/build',
    filename: 'bundle.js',
    chunkFilename: PROD ? '[id].[contenthash].js' : '[id].js',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.less'],
    mainFields: ['module', 'main'],
    alias: {
      '@': srcPath,
    },
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: srcPath,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /.css$/,
        use: getCSSLoader('css'),
      },
      {
        test: /.less$/,
        use: getCSSLoader('less'),
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new WebpackBar({
      minimal: true,
      compiledIn: true,
    }),
    // new webpack.WatchIgnorePlugin([/(css|less)\.d\.ts$/]),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ModuleNotFoundPlugin(),
    new WebpackManifestPlugin({
      fileName: 'asset-manifest.json',
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path
          return manifest
        }, seed)

        const entrypointFiles = []

        Object.entries(entrypoints).forEach(([key, files]) =>
          files.forEach((fileName) => {
            if (!fileName.endsWith('.map')) {
              entrypointFiles.push(fileName)
            }
          })
        )

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        }
      },
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: __dirname,
      },
    }),
  ],
  optimization: {
    minimize: PROD,
    minimizer: [
      // new TerserWebpackPlugin({
      //   cache: true,
      //   parallel: true,
      //   sourceMap: true,
      // }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: true,
  },
}

if (PROD) {
  config.plugins.push(
    new MiniCSSExtractPlugin({
      ignoreOrder: true,
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    })
  )
  config.plugins.push(
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      exclude: [/\.map$/, /asset-manifest\.json$/],
    })
  )
} else {
  config.devtool = 'eval-cheap-module-source-map'
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  config.plugins.push(new WatchMissingNodeModulesPlugin('./node_modules'))
  config.plugins.push(
    new ESLintPlugin({
      extensions: ['js', 'ts', 'jsx', 'tsx'],
      fix: true,
      lintDirtyModulesOnly: true,
    })
  )
}

if (fs.existsSync(path.resolve(srcPath, 'public'))) {
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '/',
          to: __dirname + '/build',
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['**/*.ejs', '**/*.md'],
          },
        },
      ],
    })
  )
}

module.exports = config
