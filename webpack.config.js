const path = require("path")
const fs = require("fs")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const SvgSpriteHtmlWebpackPlugin = require("svg-sprite-html-webpack")

// Get a list of all pug files in the templates/pages directory
const pages = fs.readdirSync(path.resolve(__dirname, "src/template/pages"))

// Create a new HtmlWebpackPlugin for each page
const pagePlugins = pages.map(
  (page) =>
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, `src/template/pages/${page}`),
      filename: `${page.replace(".pug", ".html")}`,
    })
)

module.exports = {
  mode: "development",
  entry: "./src/js/index.js",
  output: {
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "style/css/[name].[contenthash][ext][query]",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    liveReload: true,
    port: 3000,
    hot: false,
    open: false,
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.pug$/,
        use: ["pug-loader"],
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp4)$/i,
        type: "asset/resource",
        generator: {
          filename: "./images/[name][ext][query]",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [],
    }),
    ...pagePlugins,
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/images", to: "images" },
        { from: "src/icons", to: "icons" },
        {
          from: "src/fonts",
          to: "fonts",
          // Custom condition function to check if fonts folder contains files
          filter: async (resourcePath) => {
            const fontsDir = path.resolve(__dirname, resourcePath)
            try {
              const files = await fs.promises.readdir(fontsDir)
              return files.length > 0 // Include folder if it contains files
            } catch (err) {
              console.error("Error reading fonts directory:", err)
              return false // Exclude folder on error
            }
          },
          noErrorOnMissing: true, // Prevent error if fonts folder is missing
        },
      ],
    }),
    new SvgSpriteHtmlWebpackPlugin({
      includeFiles: ["src/icons/*.svg"],
    }),
  ],
}
