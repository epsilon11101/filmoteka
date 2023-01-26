const HtmlWebpackPlugin = require("html-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const loader = require("sass-loader");
module.exports = {
  entry: {
    index_js: "./src/scripts/index.js",
    user_js: "./src/scripts/user.js",
  },
  output: {
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     "style-loader",
      //     "css-loader",
      //     "sass-loader",
      //   ],
      // },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "./",
            },
          },
          "css-loader",
          // "sass-loader",
        ],
      },

      {
        test: /\.(jpe?g|png|svg|webp)$/i,
        use: ["file-loader?name=assets/[name].[ext]"],
        // loader: "file-loader",
        // options: {
        //   name: "[path][name].[ext]",
        // },
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/html/index.html",
      filename: "./index.html",
      chunks: ["index_js"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/user.html",
      filename: "./user.html",
      chunks: ["user_js"],
    }),
    new MiniCssExtractPlugin(),
  ],
};
