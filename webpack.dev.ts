const { merge } = require('webpack-merge');
const config = require('./webpack.config.ts');

module.exports = merge(config, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 8001,
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    }
  },
});
