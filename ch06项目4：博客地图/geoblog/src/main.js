import 'babel-polyfill'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import VueFetch, {$fetch} from './plugins/fetch'
import App from './components/App.vue'
import router from './router'
import * as filters from './filters'
import store from './store'

// 过滤器
for (const key in filters) {
  Vue.filter(key, filters[key])
}

Vue.use(VueFetch, {
  baseUrl: 'http://localhost:3000/',
})

sync(store, router)

async function main () {
  await store.dispatch('init')

  new Vue({
    ...App,
    el: '#app',
    router,
    // 注入store
    store,
  })
}

main()
