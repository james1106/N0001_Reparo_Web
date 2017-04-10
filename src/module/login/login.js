import Vue from 'vue'
import Layout from './components/layout.vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import routerConfig from './router.config'
import resource from 'vue-resource'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI);
Vue.use(VueRouter)
Vue.use(resource)

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
});

