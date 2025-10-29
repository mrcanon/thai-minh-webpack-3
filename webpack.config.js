// Config path output => result then run build
const path = require('path');
const pathOutput = 'assets'
const pathOutputJs = `${pathOutput}/js/`
const pathOutputImg = `${pathOutput}/img/`
const pathOutputFonts = `${pathOutput}/fonts/`

// Config plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');

// Check mode development
const isProd = process.env.NODE_ENV === 'production';

const cssDev = [
  {
    loader: 'style-loader'
  },
  {
    loader: 'css-loader',
    options: {
      sourceMap: true
    }
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true
    }
  }
];

const cssProd = ExtractTextPlugin.extract({
  fallback: "style-loader",
  use: ['css-loader', 'sass-loader']
});

const cssConfig = isProd ? cssProd : cssDev;

// Config All
var config = {
  entry: {
    common: './src/assets/js/common.js'
  },

  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: `${pathOutputJs}[name].bundle.js`
  },

  devServer: {
    contentBase: path.join(__dirname, "docs"),
    compress: true,
    hot: true,
    inline: true,
    //port: 8080,
    //stats: "errors-only",
    open: true,
    openPage: '',
    //host: '172.16.110.117'
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        'babel-loader'
      ]
    },
    {
      test: /\.(css|scss)$/,
      use: cssConfig
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      loader: 'file-loader',
      options: {
        name: `${pathOutputImg}[name].[ext]`
      }
    },
    {
      test: /\.html$/,
      use: [
        {
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }
      ]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: `${pathOutputFonts}[name].[ext]`
          }
        }
      ]
    },
    {
      test: /\.pug/,
      use: [
        {
          loader: 'html-loader',
          options: {
            minimize: false
          }
        },
        {
          loader: 'pug-loader',
        },
        {
          loader: 'pug-html-loader',
          options: {
            pretty: true
          }
        }
      ]
    },
    {
      test: /\.jade$/,
      use: [
        {
          loader: 'html-loader',
          options: {
            minimize: false
          }
        },
        {
          loader: 'jade-html-loader',
          options: {
            pretty: true
          }
        }
      ]
    },
    {
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: [
          'es2017',
          'es2016',
          'es2015',
          'stage-0'
        ]
      }
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      filename: 'index.html',
      template: './src/index.html',
      minify: {
        removeComments: isProd
      },
      chunks: ['common']
    }),
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      filename: '01-home.html',
      template: './src/index.jade',
      minify: {
        removeComments: isProd
      },
      chunks: ['common']
    }),
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      filename: '02-about.html',
      template: './src/about.jade',
      minify: {
        removeComments: isProd
      },
      chunks: ['common']
    }),
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      filename: '03-project.html',
      template: './src/project.jade',
      minify: {
        removeComments: isProd
      },
      chunks: ['common']
    }),
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      title: 'Project Single',
      filename: '04-project-single.html',
      template: './src/project-single.jade',
      minify: {
        removeComments: isProd
      },
      chunks: ['common']
    }),
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      filename: '05-contact.html',
      template: './src/contact.jade',
      minify: {
        removeComments: isProd
      },
      chunks: ['common']
    }),
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      filename: '06-partner.html',
      template: './src/partner.jade',
      minify: {
        removeComments: isProd
      },
      chunks: ['common']
    }),
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      filename: '07-recruiment.html',
      template: './src/recruiment.jade',
      minify: {
        removeComments: isProd
      },
      chunks: ['common']
    }),
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      filename: '08-recruiment-single.html',
      template: './src/recruiment-single.jade',
      minify: {
        removeComments: isProd
      },
      chunks: ['common']
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
      disable: !isProd,
      allChunks: true
    }),
    // new PurifyCSSPlugin({
    //   paths: glob.sync(path.join(__dirname, 'src/*.jade')),
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new HtmlWebpackInlineSourcePlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'masonry': 'masonry-layout',
      'isotope': 'isotope-layout',
      'waypoints': 'waypoints/lib'
    }
  }
}

module.exports = config;
