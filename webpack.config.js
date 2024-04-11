const path = require("path");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  mode: "development",
  entry: './src/index.js', // Ensure this points to your entry file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              process.env.NODE_ENV === 'development' && require.resolve('react-refresh/babel')
            ].filter(Boolean),
          },
        },
      },
      // Add this new rule for handling CSS files
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // Use DefinePlugin to inject environment variables
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_API_URL: JSON.stringify(process.env.REACT_APP_API_URL),
      },
    }),
    // Conditionally add ReactRefreshWebpackPlugin for development
    process.env.NODE_ENV === 'development' && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  devServer: {
    hot: true, // Enable hot reloading
    static: path.join(__dirname, 'dist'), // Serve files from the dist directory
    historyApiFallback: true, // This option is useful for Single Page Applications
    compress: true,
    port: 3000,
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Add '.jsx' to the resolve.extensions array
  },
};