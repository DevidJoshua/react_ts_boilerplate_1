const { merge } = require('webpack-merge');
const config = require('./webpack.config.ts');

module.exports = merge(config, {
  mode: 'production',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
    },
  },
});
