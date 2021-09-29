const path = require("path");
const isDev = process.env.NODE_ENV !== "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin"); //不引入terser，单独引入css-minimizer会导致打包的js变大
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.[hash:8].js",
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader, //要使用minicss必须删除vue-style-loader
          "css-loader",
          "postcss-loader",
          "less-loader",
          {
            loader: "style-resources-loader",
            options: {
              patterns: path.resolve(__dirname, "./src/style/index.less"),
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|jpg|png)$/,
        use: [
          {
            loader: "url-loader",
          },
        ],
      },

      {
        test: /\.js$/,
        use: [{ loader: "babel-loader" }],

        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  resolve: {
    alias: {
      "@": path.resolve("src"),
      "@views": path.resolve("./src/views"),
    },
    extensions: [".vue", ".js"],
  },
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, "/src/"), //开发环境引入图片必须
    stats: "errors-only",
    overlay: true, //默认不启用
    compress: true,
    hot: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000/", //要写上http,不然报错
        pathRewrite: { "^/api": "" },
        changeOrigin: true, // target是域名的话，需要这个参数，
        secure: false, // 设置支持https协议的代理
      },
    },
  },
  // performance: {
  //   hints: false,
  //   maxEntrypointSize: 512000,
  //   maxAssetSize: 512000,
  // },
  // devtool: "eval-cheap-module-source-map",//加了这句会导致打包完的js超大
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "./src/style", to: path.resolve(__dirname, "./dist/style") },
      ],
    }),
  ],
};
