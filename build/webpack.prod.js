const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const InlineManifestWebpackPlugin = require('./inline-manifest-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('./path');

const postcssConfig = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        [
          'postcss-preset-env',
          {
            // Options
          },
        ],
      ],
    },
  },
};

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'assets/[name].[chunkhash].js',
    chunkFilename: 'assets/[name].[chunkhash].chunk.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', postcssConfig],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          postcssConfig, //配置css兼容加前缀
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          postcssConfig,
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      // 用于优化js文件
      new TerserPlugin({
        terserOptions: {
          //drop_console：false默认，不移除console；drop_debugger：true默认移除debuger
          compress: { drop_console: true, drop_debugger: true },
        },
      }),
      // 用于优化css文件
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          // safe: true,
          autoprefixer: { disable: true },
          mergeLonghand: false,
          discardComments: {
            // 移除注释
            removeAll: true,
          },
        },
        canPrint: true,
      }),
    ],
    runtimeChunk: 'single',
    splitChunks: {
      // 缓存组
      cacheGroups: {
        vendor: {
          // 第三方依赖
          priority: 1, // 设置优先级，首先抽离第三方模块
          name: 'vendor',
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 1, // 最少引入了1次
        },
        common: {
          // 公共模块
          chunks: 'initial',
          name: 'common',
          minSize: 100, // 大小超过100个字节
          minChunks: 2, // 最少引入了3次
        },
      },
    },
  },
  plugins: [
    // 分析打包的结构
    // 抽离css样式为单独的.css文件
    new MiniCssExtractPlugin({
      filename: 'stylesheets/[name].[contenthash].css',
      chunkFilename: 'stylesheets/[id].[contenthash].css',
    }),
    // 拷贝静态资源
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.staticResources,
          to: path.outputStaticResources,
        },
      ],
    }),
    // 抽离runtime代码至html中
    new InlineManifestWebpackPlugin(),
    // 清空打包目录
    // new CleanWebpackPlugin(),
  ],
});
