import 'babel-polyfill'
import Vue from 'vue'
// import Test from './Test.vue'
// import CSSLoader from './CSSLoader.vue'
import Movies from './Movies'

new Vue({
  el: '#app',
  // ...Test,
  // ...CSSLoader,
  ...Movies,
})

export default {
  render (h) {
    return <Movies/>
  }
}
