import '../semantic/dist/semantic.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './store/store.js'
// import semantic from '../semantic/dist/semantic.js'
import {router} from './router.js'

// import '../semantic/dist/semantic.min.css'

Vue.use(VueRouter)
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(require('./App.vue'))
})
