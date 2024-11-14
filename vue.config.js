const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  configureWebpack: {
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        vm: require.resolve('vm-browserify'),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
  },
  devServer: {
    historyApiFallback: true, // Add this line to handle client-side routing
  },
});