import 'babel-polyfill'
import Vue from 'vue'
import VueFetch, {$fetch} from './plugins/fetch'
import './global-components'
import router from './router'
import * as filters from './filters'
import state from './state'
import VueState from './plugins/state'
import AppLayout from './components/AppLayout.vue'

// 注册过滤器
for (const key in filters) {
  Vue.filter(key, filters[key])
}

Vue.use(VueFetch, {
  baseUrl: 'http://localhost:3000/',
})

Vue.use(VueState, state)

async function main () {
  // 获取用户信息
  try {
    state.user = await $fetch('user')
  } catch (e) {
    console.warn(e)
  }
  // 启动应用
  new Vue({
    el: '#app',
    data: state,
    // 将路由器提供给应用
    router,
    render: h => h(AppLayout),
  })
}

main()
