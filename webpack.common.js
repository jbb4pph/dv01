const path = require('path');
const webpack = require("webpack");
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  entry: [
    "./src",
  ],
  module: {
    rules: [
      /**
       * Transform ES6/JSX. All js/jsx files outside node_modules/ and
       * bower_components/ are processed via babel.
       **/
      {
        test: /\.([jt]s|[jt]sx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          //cacheDirectory: true,
          plugins: ["@babel/plugin-transform-runtime"],
          presets: [
            "@babel/env",
            "@babel/preset-react",
            "@babel/preset-typescript"
          ]
        }
      },
      /**
       * Process CSS.
       **/
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.csv$/,
        use: 'raw-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '.csv'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    })
  ]
};

