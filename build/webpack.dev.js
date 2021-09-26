const portfinder = require('portfinder');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const apiMocker = require('mocker-api');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const common = require('./webpack.common.js');
const path = require('./path');

module.exports = () =>
  new Promise((resolve, reject) => {
    portfinder
      .getPortPromise({
        port: 3000, // minimum port
        stopPort: 3999, // maximum port
      })
      .then((port) => {
        resolve(
          merge(common, {
            mode: 'development',
            devtool: 'eval-source-map',
            devServer: {
              hot: true,
              port: port,
              host: '0.0.0.0',
              historyApiFallback: true, //任意的 404 响应都可能需要被替代为 index.html,history模式下
              client: {
                progress: true,
              },
              onBeforeSetupMiddleware({ app }) {
                //配置mock
                apiMocker(app, path.mock, {
                  changeHost: true,
                });
              },
              proxy: {
                '/api': {
                  target: `http://0.0.0.0:3000`,
                  changeOrigin: true,
                },
              },
            },
            output: {
              filename: 'app.[hash].js',
            },
            module: {
              rules: [
                {
                  test: /\.css$/,
                  use: [
                    {
                      loader: 'style-loader',
                    },
                    {
                      loader: 'css-loader',
                    },
                  ],
                },
                {
                  test: /\.less$/,
                  use: [
                    {
                      loader: 'style-loader',
                    },
                    {
                      loader: 'css-loader',
                    },
                    {
                      loader: 'less-loader',
                      options: {
                        lessOptions: {
                          javascriptEnabled: true,
                        },
                      },
                    },
                    {
                      loader: 'style-resources-loader',
                      options: {
                        patterns: path.lessVariables,
                        injector: 'append',
                      },
                    },
                  ],
                },
                {
                  test: /\.scss$/,
                  use: [
                    {
                      loader: 'style-loader',
                    },
                    {
                      loader: 'css-loader',
                    },
                    {
                      loader: 'sass-loader',
                    },
                  ],
                },
              ],
            },
            plugins: [new FriendlyErrorsWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });
