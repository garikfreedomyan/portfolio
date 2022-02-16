const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin').WebpackManifestPlugin;

module.exports = (_env, argv) => {
  const isProd = argv.mode === 'production';
  const isDev = argv.mode === 'development';

  if (isProd) {
    return {
      mode: 'production',
      context: path.resolve(__dirname, 'src'),
      entry: './index.tsx',
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'static/js/main-[fullhash:7].js',
        publicPath: '/',
        clean: true,
      },

      resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
          'components': path.resolve(__dirname, 'src/components'),
          'constants': path.resolve(__dirname, 'src/constants'),
          'contexts': path.resolve(__dirname, 'src/contexts'),
          'hooks': path.resolve(__dirname, 'src/hooks'),
          'http': path.resolve(__dirname, 'src/http'),
          'img': path.resolve(__dirname, 'src/img'),
          'modules': path.resolve(__dirname, 'src/modules'),
          'pages': path.resolve(__dirname, 'src/pages'),
          'routes': path.resolve(__dirname, 'src/routes'),
          'services': path.resolve(__dirname, 'src/services'),
          'store': path.resolve(__dirname, 'src/store'),
          'styles': path.resolve(__dirname, 'src/styles'),
          'types': path.resolve(__dirname, 'src/types'),
          'utils': path.resolve(__dirname, 'src/utils'),
        },
      },

      module: {
        rules: [
          // scripts
          {
            test: /\.(js|ts)x?$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/,
            use: ['babel-loader'],
          },
          // css styles
          {
            test: /\.module\.css$/,
            include: path.resolve(__dirname, 'src'),
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: { localIdentName: '[local]_[hash:base64:5]' },
                },
              },
            ],
          },
          {
            test: /\.(css)$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /\.module\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
          // scss styles
          {
            test: /\.module\.s(a|c)ss$/,
            include: path.resolve(__dirname, 'src'),
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  modules: { localIdentName: '[local]_[hash:base64:5]' },
                },
              },
              'sass-loader',
            ],
          },
          {
            test: /\.s(a|c)ss$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /\.module\.s(a|c)ss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          },
          // images
          {
            test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  outputPath: 'static/img',
                  name: '[name]-[hash:7].[ext]',
                },
              },
            ],
          },
          // fonts
          {
            test: /\.(woff|woff2|ttf|otf|eot)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  outputPath: 'static/fonts',
                  name: '[name].[ext]',
                },
              },
            ],
          },
        ],
      },

      plugins: [
        new HtmlWebpackPlugin({
          title: 'Garik Freedomyan',
          template: 'index.html',
          minify: {
            collapseWhitespace: true,
          },
        }),
        new CopyWebpackPlugin({
          patterns: [{ from: 'img', to: 'static/img' }],
        }),
        new MiniCssExtractPlugin({
          filename: 'static/css/main-[fullhash:7].css',
        }),
        new WebpackManifestPlugin({
          fileName: 'asset-manifest.json',
          publicPath: '/',
          generate: (seed, files, entrypoints) => {
            const manifestFiles = files.reduce((manifest, file) => {
              manifest[file.name] = file.path;
              return manifest;
            }, seed);
            const entrypointFiles = entrypoints.main.filter((fileName) => !fileName.endsWith('.map'));

            return {
              files: manifestFiles,
              entrypoints: entrypointFiles,
            };
          },
        }),
      ],
    };
  }

  if (isDev) {
    return {
      mode: 'development',
      target: 'web',
      context: path.resolve(__dirname, 'src'),
      entry: './index.tsx',
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.js',
        publicPath: '/',
      },
      devtool: 'eval-source-map',

      resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
          'components': path.resolve(__dirname, 'src/components'),
          'constants': path.resolve(__dirname, 'src/constants'),
          'contexts': path.resolve(__dirname, 'src/contexts'),
          'hooks': path.resolve(__dirname, 'src/hooks'),
          'http': path.resolve(__dirname, 'src/http'),
          'img': path.resolve(__dirname, 'src/img'),
          'modules': path.resolve(__dirname, 'src/modules'),
          'pages': path.resolve(__dirname, 'src/pages'),
          'routes': path.resolve(__dirname, 'src/routes'),
          'services': path.resolve(__dirname, 'src/services'),
          'store': path.resolve(__dirname, 'src/store'),
          'styles': path.resolve(__dirname, 'src/styles'),
          'types': path.resolve(__dirname, 'src/types'),
          'utils': path.resolve(__dirname, 'src/utils'),
        },
      },

      module: {
        rules: [
          //-------------------- scripts --------------------
          {
            test: /\.(js|ts)x?$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/,
            use: ['babel-loader'],
          },
          //-------------------- css styles --------------------
          {
            test: /\.module\.css$/,
            include: path.resolve(__dirname, 'src'),
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: { localIdentName: '[local]_[hash:base64:5]' },
                  sourceMap: true,
                },
              },
            ],
          },
          {
            test: /\.(css)$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /\.module\.css$/,
            use: ['style-loader', { loader: 'css-loader', options: { sourceMap: true } }],
          },
          //-------------------- scss styles --------------------
          {
            test: /\.module\.s(a|c)ss$/,
            include: path.resolve(__dirname, 'src'),
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  modules: { localIdentName: '[local]_[hash:base64:5]' },
                  sourceMap: true,
                },
              },
              { loader: 'sass-loader', options: { sourceMap: true } },
            ],
          },
          {
            test: /\.s(a|c)ss$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /\.module\.s(a|c)ss$/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { sourceMap: true } },
              { loader: 'sass-loader', options: { sourceMap: true } },
            ],
          },
          //-------------------- images --------------------
          {
            test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  outputPath: 'static/img',
                  name: '[name]-[hash:7].[ext]',
                },
              },
            ],
          },
          //-------------------- fonts--------------------
          {
            test: /\.(woff|woff2|ttf|otf|eot)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  outputPath: 'static/fonts',
                  name: '[name].[ext]',
                },
              },
            ],
          },
        ],
      },

      plugins: [
        new HtmlWebpackPlugin({
          title: 'Garik Freedomyan',
          template: 'index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
      ],

      watchOptions: {
        ignored: /node_modules/,
      },

      devServer: {
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true,
      },
    };
  }
};
