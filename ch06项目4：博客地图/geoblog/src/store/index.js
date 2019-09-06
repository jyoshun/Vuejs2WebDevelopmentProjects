import Vue from 'vue'
import Vuex from 'vuex'
import { $fetch } from '../plugins/fetch'
import router from '../router';

Vue.use(Vuex)

const store = new Vuex.Store({
  // 严格模式，避免在mutation中使用异步调用
  strict: process.env.NODE_ENV !== 'production',
  state () {
    return {
      user: null,
    }
  },

  mutations: {
    user: (state, user) => {
      state.user = user
    },
  },

  getters: {
    user: state => state.user,
    userPicture: (state, getters) => {
      const user = getters.user
      if (user) {
        const photos = user.profile.photos
        if (photos.length !== 0) {
          return photos[0].value
        }
      }
    },
  },

  actions: {
    async init ({ dispatch }) {
      await dispatch('login')
    },

    async login ({ commit }) {
      try {
        const user = await $fetch('user')
        commit('user', user)

        if (user) {
          // 重定向到对应的路由，或返回首页
          router.replace(router.currentRoute.params.wantedRoute || { name: 'home' })
        }
      } catch (e) {
        console.warn(e)
      }
    },

    logout ({ commit }) {
      commit('user', null)

      $fetch('logout')

      // 如果这个路由是私有的
      // 我们跳转到登录页面
      if (router.currentRoute.matched.some(r => r.meta.private)) {
        router.replace({ name: 'login', params: {
          wantedRoute: router.currentRoute.fullPath,
        }})
      }
    },
  },
})

export default store
