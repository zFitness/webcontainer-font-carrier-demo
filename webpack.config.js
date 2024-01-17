import webpack from 'webpack'
import { resolve } from 'path'
// const TerserPlugin = require('terser-webpack-plugin')
/** @typedef {import('webpack').Configuration} WebpackConfig **/
export default [
  {
    mode: 'production',
    target: 'node',
    entry: resolve(__dirname, './font-carrier.js'),
    output: {
      path: resolve(__dirname, './bin'),
      filename: 'index.js',
      libraryTarget: 'commonjs2',
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.json'],
    },
    externals: {
      //   fs: 'commonjs fs',
      //   path: 'commonjs path',
      //   typescript: 'commonjs typescript',
      //   nodegit: 'commonjs nodegit',
      //   '@babel/types': 'commonjs @babel/types',
      //   '@vue/compiler-sfc': 'commonjs @vue/compiler-sfc',
    },
    module: {
      rules: [
        {
          test: /\.(js|ts|tsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    devtool: false,
    // 在打包后的文件顶部添加注释，表示这是一个 node 可执行文件
    plugins: [
      //   new webpack.BannerPlugin({
      //     banner: '#!/usr/bin/env node',
      //     raw: true,
      //   }),
    ],
    optimization: {
      minimize: true,
      //   minimizer: [
      //     // 防止打包出一个 license.txt 文件
      //     new TerserPlugin({
      //       extractComments: false, //不将注释提取到单独的文件中
      //     }),
      //   ],
    },
  },
]
