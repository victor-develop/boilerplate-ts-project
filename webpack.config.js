const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/public/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist','public')
  },
  module: {
    rules: [{
      test: /.css$/,
      use: [
        'style-loader',
        'css-loader',
      ]
    }]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/public/index.html', to: 'index.html' },
    ])
  ]
};
