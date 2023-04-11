"use strict";
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");

/*
*vue-cli的config文件中有一个proxyTable参数，用来设置地址映射表，可以添加到开发时配置（dev）中
即请求/api时就代表http://127.0.0.1:3000/api/(这里要写ip，不要写localhost)，
changeOrigin参数接收一个布尔值，如果为true，这样就不会有跨域问题了。
*/
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/", //打包的时候变成’./‘
    proxyTable: {
      "/api": {
        //即加上前缀,强制走代理,否则public里有的就不会走代理
        target: "http://127.0.0.1:3000/api/",
        changeOrigin: true, //用于控制请求头中的host值
        // ws:true,//用于支持websocket
        pathRewrite: {
          //路径重写
          "^/api": ""
        }
      }
    },

    // Various Dev Server settings
    host: "localhost", // can be overwritten by process.env.HOST
    port: 8082, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "cheap-module-eval-source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../dist/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    // 若放在cherish文件夹下,则为cherish
    // 见🔗
    assetsPublicPath: "/",

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
