import Vue from 'vue'
import Vuex from 'vuex'

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
    userPicture: () => null,
  },
})

export default store
