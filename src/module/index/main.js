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

Vue.use(VueRouter)
Vue.use(resource)
Vue.use(ElementUI)
Vue.config.productionTip = false

//定义路由
const router = new VueRouter({
  // mode:'history',
  routes: routerConfig
})
/*订单交易状态*/
Vue.filter('transactionStatus',function(value){
  var readableStatus;
  switch(value){
    case constantData.UNCONFIRMED:readableStatus="订单待确认";break;
    case constantData.CONFIRMED:readableStatus="订单已确认";break;
    case constantData.FINISHED:readableStatus="订单已完成";break;
    default:readableStatus="暂无";break;
  }
  return readableStatus;
})
/*应收账款状态*/
Vue.filter('receStatus',function(value){
  var readableStatus;
  switch(value){
    case constantData.CONFIRMED:readableStatus="待签发";break;
    case constantData.FORACCEPT:readableStatus="承兑待签收";break;
    case constantData.ACCEPTED:readableStatus="承兑已签收";break;
    case constantData.DISCOUNTED:readableStatus="贴现待响应";break;
    case constantData.DISCOUNTRESPONSED:readableStatus="待兑付";break;
    case constantData.FINISH:readableStatus="已结清";break;
    default:readableStatus="暂无";break;
  }
  return readableStatus;
})

/*应收账款行为*/
Vue.filter('receAction',function(value){
  var readableStatus;
  switch(value){
    case constantData.CONFIRMED:readableStatus="待签发";break;
    case constantData.FORACCEPT:readableStatus="已签发";break;
    case constantData.ACCEPTED:readableStatus="已承兑";break;
    case constantData.DISCOUNTED:readableStatus="已贴现申请";break;
    case constantData.FINISH:readableStatus="已结清";break;
    default:readableStatus="暂无";break;
  }
  return readableStatus;
})

/*运单状态*/
Vue.filter('wayBillStatus',function(value){
  var readableStatus;
  switch(value){
    case constantData.FORSEND:readableStatus="待发货";break;
    case constantData.SENDFORRESPONSE:readableStatus="发货待响应";break;
    case constantData.SENDED:readableStatus="已发货";break;
    case constantData.ARRIVED:readableStatus="已送达";break;
    case constantData.REJECTED:readableStatus="发货被拒绝";break;
    default:readableStatus="暂无";break;
  }
  return readableStatus;
})
/*仓储状态*/
Vue.filter('repoStatus',function(value){
  var readableStatus;
  switch(value){
    case constantData.INFORRESPONSE:readableStatus="入库待响应";break;
    case constantData.FORIN:readableStatus="待入库";break;
    case constantData.ALREADYIN:readableStatus="已入库";break;
    case constantData.OUTFORRESPONSE:readableStatus="出库待响应";break;
    case constantData.FOROUT:readableStatus="待出库";break;
    case constantData.ALREADYOUT:readableStatus="已出库";break;
    default:readableStatus="暂无";break;
  }
  return readableStatus;
})
/*仓单状态*/
Vue.filter('repoCertStatus',function(value){
  var readableStatus;
  switch(value){
    case constantData.CANFLOW:readableStatus="可流转";break;
    case constantData.FROZEN:readableStatus="冻结中";break;
    case constantData.DISABLED:readableStatus="已失效";break;
    default:readableStatus="暂无";break;
  }
  return readableStatus;
})
/*支付方式*/
Vue.filter('payingMethod',function(value){
  var readableStatus;
  switch(value){
    case 0:readableStatus="应收账款支付";break;
    case 1:readableStatus="其他支付方式";break;
    default:break;
  }
  return readableStatus;
})
/*时间转化*/
Vue.filter('timeTransfer',function(value){
  console.log(value);
  if(value===''||value===0||value==='暂无'){
    return "暂无"
  }
  return new Date(value).toLocaleString('chinese',{hour12:false}).replace(/\//g, "-");
})
/*数据为空的情况统一处理*/
Vue.filter('nullSituation',function(value){
  if(value===''||value===0){
    return "暂无";
  }
  return value;
})

/*保留两位小数*/
Vue.filter('numTransfer',function(value){
  var value=Math.round(parseFloat(value)*100)/100;
  var xsd=value.toString().split(".");
  if(xsd.length==1){
    value=value.toString()+".00";
    return value;
  }
  if(xsd.length>1){
    if(xsd[1].length<2){
      value=value.toString()+"0";
    }
    return value;
  }
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
  template: '<Layout/>',
  components: { Layout }
})
