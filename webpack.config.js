// webpack.config.js
const path = require("path");
// (선택) clean-webpack-plugin을 유지할 거면 이렇게 import 하는 편이 일반적이에요.
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    shop: "./src/optimized/shop.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist", "assets", "scripts"),
    publicPath: "/assets/scripts/", // 절대경로 권장
    // (선택) webpack 5는 아래 옵션으로 dist 정리 가능 -> CleanWebpackPlugin 대체
    // clean: true,
  },
  devtool: "source-map", // ✅ webpack 5 규칙에 맞는 값
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    devMiddleware: {
      publicPath: "/assets/scripts/",
    },
    // 핵심 ↓↓↓
    allowedHosts: "all", // 모든 호스트 허용 (로컬 개발에 편함)
    host: "127.0.0.1", // 서버 바인딩
    port: 8080,
    client: {
      webSocketURL: "ws://127.0.0.1:8080/ws", // HMR 웹소켓 주소를 명시(프록시/터널일 때 유용)
      overlay: true,
      logging: "info",
    },
    hot: true,
    open: true,
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                { useBuiltIns: "usage", corejs: { version: 3 } },
              ],
            ],
          },
        },
      },
    ],
  },
  // plugins: [new CleanWebpackPlugin()], // clean: true를 쓰면 이 줄은 생략 가능
};
