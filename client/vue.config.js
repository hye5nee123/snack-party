const { defineConfig } = require('@vue/cli-service')
var path = require('path');
const target = "http://localhost:3000";

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: path.resolve("../myserver/public"),
  devServer: {
    proxy: {
      '^/api': {
        target,
        changeOrigin: true,
        ws: false,
        pathRewrite: { '^/api': '/' }
      }
    }
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch');
  },
})
