/*订单相关*/
import order from './pages/order/index.vue'
import allOrderIndex from './pages/order/allOrder/index.vue'
import allOrder from './pages/order/allOrder/allOrder.vue'
import orderDetail from './pages/order/allOrder/orderDetail.vue'
import launchOrder from './pages/order/launchOrder.vue'
import orderForConfirmIndex from './pages/order/orderForConfirm/index.vue'
import orderForConfirm from './pages/order/orderForConfirm/orderForConfirm.vue'
import orderConfirm from './pages/order/orderForConfirm/orderConfirm.vue'
import forDeliverIndex from './pages/order/forDeliver/index.vue'
import forDeliver from './pages/order/forDeliver/forDeliver.vue'
import deliver from './pages/order/forDeliver/deliver.vue'
import forReceive from './pages/order/forReceive.vue'


import huoquan from './pages/yufu/index.vue'
import shouye from './pages/cangchu/index.vue'
import yingshou from './pages/yingshou/index.vue'
import daichengdui from './pages/yingshou/daichengdui.vue'
import duifu from './pages/yingshou/duifu.vue'
import qianfa from './pages/yingshou/qianfa.vue'
import yingshoutiexian from './pages/yingshou/yingshoutiexian.vue'
import HomePage from './pages/homePage/homePage.vue'
import rukushenqing from './pages/cangchu/rukushenqing.vue'
import chukushenqing from './pages/cangchu/chukushenqing.vue'
import cangdanshenqing from './pages/cangchu/cangdanshenqing.vue'

export default [
  {
    path:'/',component:HomePage,
  },
  /*订单路由*/
  {
    path:'/order',component:order,
  },
  {
    path:'/allOrder',component:allOrderIndex,
    children:[
      {path:'',component:allOrder},
      {path:'orderDetail',component:orderDetail},
    ]
  },
  {
    path:'/launchOrder',component:launchOrder,
  },
  {
    path:'/orderForConfirm',component:orderForConfirmIndex,
    children:[
      {path:'',component:orderForConfirm},
      {path:'orderConfirm',component:orderConfirm},
    ]
  },
  {
    path:'/forDeliver',component:forDeliverIndex,
    children:[
      {path:'',component:forDeliver},
      {path:'deliver',component:deliver},
    ]
  },


  {
    path:'/yufu',component:huoquan,
  },
  {
    path:'/cangchu',component:shouye,
  },
  {
    path:'/yingshou',component:yingshou,
  },
  {path:'/daichengdui',component:daichengdui},
  {path:'/duifu',component:duifu},
  {path:'/qianfa',component:qianfa},
  {path:'/yingshoutiexian',component:yingshoutiexian},
  {
    path:'/cangchu',component:shouye,
  },
  {path:'/rukushenqing',component:rukushenqing},
  {path:'/chukushenqing',component:chukushenqing},
  {path:'/cangdanshenqing',component:cangdanshenqing},
]
