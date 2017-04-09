import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from './components/layout'
import routerConfig from './router.config'
import resource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// import 'font-awesome/css/font-awesome.min.css'

Vue.use(VueRouter)
Vue.use(resource)
Vue.use(ElementUI)
Vue.config.productionTip = false

//定义路由
const router = new VueRouter({
  routes: routerConfig
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Layout/>',
  components: { Layout }
})
