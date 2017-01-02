// import '../semantic/dist/semantic.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import semantic from '../semantic/dist/semantic.js'
import {router} from './router.js'

// import '../semantic/dist/semantic.min.css'
axios.defaults.baseURL = '/api'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(require('./App.vue'))
})
