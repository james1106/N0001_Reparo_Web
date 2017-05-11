import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from './components/layout'
import routerConfig from './router.config'
import resource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import constantData from "../../common/const"
import { Loading } from 'element-ui';
import { MessageBox } from 'element-ui';
import filters from '../../filters/filters'

Vue.use(VueRouter)
Vue.use(resource)
Vue.use(ElementUI)
Vue.config.productionTip = false

//定义路由
const router = new VueRouter({
  // mode:'history',
  routes: routerConfig
})

/*****  设置http拦截器 start  ******/
let loadingInstance;
Vue.http.interceptors.push(function(request, next) {
  //请求开始的时候
  loadingInstance = Loading.service({ fullscreen: true,text:'正玩命向区块链获取数据中...',lock:true });
  next(function(response) {
    //请求响应完成后
    loadingInstance.close();
    if(!response.ok){
      this.$alert('服务异常,请稍后再试！', '提示', {
        confirmButtonText: '确定',
        type: 'warning',
        callback: action => {
          //TODO
        }
    });
    }
    return response
  });
});
/*****  设置http拦截器 end  ******/

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  filters,
  template: '<Layout/>',
  components: { Layout }
})
