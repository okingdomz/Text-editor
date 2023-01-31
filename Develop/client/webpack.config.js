const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // change htmlwebpackplugin title
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE Text Editor'
      }),
      // Injects our custom service worker
      // when importing this service worker, i didnt try swSrc and swDest
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      // Creates a manifest.json file.
      // havent changed any parameters within webpack constructor
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'JATE Text Editor',
        short_name: 'JATE',
        description: 'Text editor for peps',
        // display: 'standalone',
        background_color: '#1e1e1e',
        theme_color: '#1e1e1e',
        start_url: '/',
        publicPath: '/',
        // fingerprints: false,
        // inject: true,

        // might delete icon insertion
        // copy and pasted icons tag
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],
// CSS loaderssss
    module: {
      rules: [
        // importing module from mini project to this module
        // css loader in dev
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // We use babel-loader in order to use ES6.
          use: {
            loader: 'babel-loader',
            options: {
              // added babl/transform-runtime
              presets: ['@babel/preset-env'],
              plugins: ['babel/transform-runtime', '@babel/plugin-proposal-object-rest-spread'],
            },
          },
        },
      ],
    },
  };
};
