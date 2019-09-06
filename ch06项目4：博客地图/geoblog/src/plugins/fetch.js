import router from '../router'
import store from '../store'

let baseUrl

export async function $fetch (url, options) {
  const finalOptions = Object.assign({}, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }, options)
  const response = await fetch(`${baseUrl}${url}`, finalOptions)
  if (response.ok) {
    const data = await response.json()
    return data
  } else if (response.status === 403) {
    // 如果会话不再有效
    // 我们登出
    store.dispatch('logout')
  } else {
    const message = await response.text()
    const error = new Error(message)
    error.response = response
    throw error
  }
}

export default {
  install (Vue, options) {
    console.log('Installed!', options)
    
    // 插件选项
    baseUrl = options.baseUrl

    Vue.prototype.$fetch = $fetch
  }
}
