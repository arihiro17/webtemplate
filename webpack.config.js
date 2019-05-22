const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const output = "dist";

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: {
    main: ["./src/js/main.js", "./src/scss/main.scss", "./src/html/index.html"]
  },
  output: {
    filename: "assets/js/[name].js",
    path: path.resolve(__dirname, output)
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    port: 8888
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["css/**/*", "js/**/*"]
    }),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].css",
      path: path.resolve(__dirname, output)
  }),
  new HtmlWebpackPlugin({
      template: "./src/html/index.html"
  })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer")({ grid: "no-autoplace" }),
                require("css-mqpacker"),
                require("cssnano")
              ]
            }
          },
          {
            loader: "sass-loader"
          }
        ]
    },
    {
        test: /\.html$/,
        loader: "html-loader"
    }
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".css", ".scss"],
    alias: {
      slick: path.resolve(__dirname, 'node_modules/slick-carousel/slick/'),
      waypoints: 'waypoints/lib/noframework.waypoints.min.js'
    },
  }
};
