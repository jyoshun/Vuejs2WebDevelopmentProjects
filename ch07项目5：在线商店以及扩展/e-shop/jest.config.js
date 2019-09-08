// 配置 Jest
module.exports = {
  // 定义 JavaScript 文件和 Vue 文件的处理器
  transform: {
    '.+\\.jsx?$': '<rootDir>/node_modules/babel-jest',
    '.+\\.vue$': '<rootDir>/node_modules/vue-jest',
  },
  // 使用 jest-serializer-vue 序列化组件快照
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-serializer-vue',
  ],
  // 启用源代码映射
  mapCoverage: true,
}