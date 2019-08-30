import Vue from 'vue'
import VueRouter from 'vue-router'
import state from './state'
import Home from './components/Home.vue'
import FAQ from './components/FAQ.vue'
import Login from './components/Login.vue'
import TicketsLayout from './components/TicketsLayout.vue'
import Tickets from './components/Tickets.vue'
import NewTicket from './components/NewTicket.vue'
import Ticket from './components/Ticket.vue'
import NotFound from './components/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  // 路由将放在这里
  { path: '/', name: 'home', component: Home },
  { path: '/faq', name: 'faq', component: FAQ },
  { path: '/login', name: 'login', component: Login, meta: { guest: true } },
  // 路由元属性 meta
  // 嵌套路由 children
  { path: '/tickets', component: TicketsLayout, 
    meta: { private: true }, children: [
      { path: '', name: 'tickets', component: Tickets },
      { path: 'new', name: 'new-ticket', component: NewTicket },
      // 用props属性将所有路由参数作为prop传递给它
      { path: ':id', name: 'ticket', component: Ticket, props: route => ({ id: route.params.id }) },
    ]
  },
  { path: '*', component: NotFound },
]

const router = new VueRouter({
  routes,
  mode: 'history',
  // 滚动行为
  scrollBehavior (to, from, savedPosition) {
    // 如果有滚动位置，可以恢复该滚动位置
    if (savedPosition) {
      return savedPosition
    }
    // 检查路由是否有模仿浏览器行为的散列值
    if (to.hash) {
      return { selector: to.hash }
    }
    // 滚动到页面的顶部
    return { x: 0, y: 0 }
  },
})

// 路由器导航守卫
router.beforeEach((to, from, next) => {
  // 是否私有路由
  if (to.matched.some(r => r.meta.private) && !state.user) {
    // 重定向到登录
    next({
      name: 'login',
      params: {
        wantedRoute: to.fullPath, // 导航到期望的路由
      },
    })
    return // 不要忘记return！
  }
  // 是否访客路由。如果用户已登录，则重定向到主页
  if (to.matched.some(r => r.meta.guest) && state.user) {
    next({name: 'home'})
    return
  }
  next()
})

export default router
