import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './components/Login.vue'
import Geoblog from './components/Geoblog.vue'
import NotFound from './components/NotFound.vue'
import store from './store'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: Geoblog, meta: { private: true } },
  { path: '/login', name: 'login', component: Login },
  { path: '*', component: NotFound },
]

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

// 导航守卫
router.beforeEach((to, from, next) => {
  console.log('to', to.name)
  const user = store.getters.user
  if (to.matched.some(r => r.meta.private) && !user) {
    next({
      name: 'login',
      params: {
        wantedRoute: to.fullPath,
      },
    })
    return
  }
  if (to.matched.some(r => r.meta.guest) && user) {
    next({ name: 'home' })
    return
  }
  next()
})

export default router
