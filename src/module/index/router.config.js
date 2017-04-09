import HomePage from './pages/homePage/homePage.vue'
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

/*应收账款*/
import yingshou from './pages/receivables/index.vue'
import AcceptIndexPage from './pages/receivables/accept/index.vue'
import AcceptPage from './pages/receivables/accept/accept.vue'
import AcceptListPage from './pages/receivables/accept/acceptList.vue'
import CashPage from './pages/receivables/cash.vue'
import SignoutIndexPage from './pages/receivables/signOut/index.vue'
import SignoutListPage from './pages/receivables/signOut/signoutList.vue'
import SignoutPage from './pages/receivables/signOut/signout.vue'
import DiscountPage from './pages/receivables/discount.vue'

/*仓储*/

import warehousing from './pages/warehousing/index.vue'
import warehousingIndex from './pages/warehousing/allWarehousing/index.vue'
import allWarehousing from './pages/warehousing/allWarehousing/allWarehousing.vue'
import details from './pages/warehousing/allWarehousing/details.vue'
import receiptApplication from './pages/warehousing/receiptApplication.vue'
import storage from './pages/warehousing/storage.vue'
import out from './pages/warehousing/out.vue'


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
  }, //应收账款
  {
    path:'/receivables',component:yingshou,
  },
  {
    path:'/accept',component:AcceptIndexPage,
    children:[
      {path:'',component:AcceptListPage},
      {path:'accept',component:AcceptPage}
    ]
  },
  {
    path:'/cash',component:CashPage
  },
  {
    path:'/signout',component:SignoutIndexPage,
    children:[
      {path:'',component:SignoutListPage},
      {path:'signout',component:SignoutPage}
    ]
  },
  {
    path:'/discount',component:DiscountPage
  },

  /*仓储路由*/
  {
    path:'/warehousing',component:warehousing,
  },
  {path:'/allWarehousing',component:warehousingIndex,
    children:[
      {path:'',component:allWarehousing},
      {path:'details',component:details}
    ]},
  {
    path:'/storage',component:storage
  },
  {
    path:'/out',component:out
  },
  {
    path:'/receiptApplication',component:receiptApplication
  },
  {
    path:'/allwarehousing',component:allWarehousing
  }
]
