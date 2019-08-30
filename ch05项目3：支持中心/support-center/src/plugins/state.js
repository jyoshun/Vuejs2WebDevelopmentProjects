export default {
  install (Vue, state) {
    // 在Vue原型上设置了一个getter, 每个组件都会继承
    Object.defineProperty(Vue.prototype, '$state', {
      get: () => state,
    })
  }
}
