import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from './components/layout'
import routerConfig from './router.config'
import resource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import constantData from "../../common/const"
// import 'font-awesome/css/font-awesome.min.css'

Vue.use(VueRouter)
Vue.use(resource)
Vue.use(ElementUI)
Vue.config.productionTip = false

//定义路由
const router = new VueRouter({
  routes: routerConfig
})
/*订单交易状态*/
Vue.filter('transactionStatus',function(value){
  var readableStatus;
  switch(value){
    case constantData.UNCONFIRMED:readableStatus="订单待确认";break;
    case constantData.CONFIRMED:readableStatus="订单已确认";break;
    default:readableStatus="暂无";break;
  }
  return readableStatus;
})
/*应收装款状态*/
Vue.filter('receStatus',function(value){
  var readableStatus;
  switch(value){
    case constantData.FORISSUE:readableStatus="待签发";break;
    case constantData.FORACCEPT:readableStatus="承兑待签收";break;
    case constantData.ACCEPTED:readableStatus="承兑已签收";break;
    default:readableStatus="暂无";break;
  }
  return readableStatus;
})
/*运单状态*/
Vue.filter('wayBillStatus',function(value){
  var readableStatus;
  switch(value){
    case constantData.FORSEND:readableStatus="待发货";break;
    case constantData.SENDED:readableStatus="已发货";break;
    default:readableStatus="暂无";break;
  }
  return readableStatus;
})
/*仓储状态*/
Vue.filter('repoStatus',function(value){
  var readableStatus;
  switch(value){
    default:readableStatus="暂无";break;
  }
  return readableStatus;
})
Vue.filter('payingMethod',function(value){
  var readableStatus;
  switch(value){
    case 0:readableStatus="应收账款支付";break;
    case 1:readableStatus="其他支付方式";break;
    default:break;
  }
  return readableStatus;
})
Vue.filter('timeTransfer',function(value){
  return new Date(value).toLocaleString().replace(/\//g, "-");
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Layout/>',
  components: { Layout }
})


