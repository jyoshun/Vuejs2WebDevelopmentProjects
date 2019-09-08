const merge = require('webpack-merge')
const common = require('./common')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(common, {
  entry: './src/entry-server',
  target: 'node',
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
  },
  // 对node_modules跳过Webpack处理
  externals: nodeExternals({
    // 从node_modules中强行引入CSS文件
    // 等待Webpack处理
    whitelist: /\.css$/,
  }),
  plugins: [
    // 生成服务器bundles文件
    new VueSSRServerPlugin(),
  ],
})
