import HomePage from './pages/homePage/homePage.vue'
/*订单相关*/
import order from './pages/order/index.vue'
import allOrder from './pages/order/allOrder.vue'
import orderDetail from './pages/order/orderDetail.vue'
import createOrder from './pages/order/createOrder.vue'
import confirmOrder from './pages/order/confirmOrder.vue'

/*应收账款*/
import AllAccountsPage from './pages/receivables/index.vue'
import AccountListPage from './pages/receivables/accountsList.vue'
import AcceptPage from './pages/receivables/accept.vue'
import CashPage from './pages/receivables/cash.vue'
import SignoutPage from './pages/receivables/signout.vue'
import DiscountPage from './pages/receivables/discount.vue'
import AccountsDetailPage from './pages/receivables/detail.vue'

/*企业仓储*/
import warehousingIndex from './pages/warehousing/index.vue'
import mywarehousingIndex from './pages/warehousing/myWarehousing/index.vue'
import myWarehousing from './pages/warehousing/myWarehousing/myWarehousing.vue'
import details from './pages/warehousing/myWarehousing/details.vue'
import receiptApplication from './pages/warehousing/receiptApplication.vue'
import myReceiptsIndex from './pages/warehousing/myReceipts/index.vue'
import myReceipts from './pages/warehousing/myReceipts/myReceipts.vue'
import myReceiptsDetails from './pages/warehousing/myReceipts/myReceiptsDetails.vue'

/*仓储公司*/
import warehousingCompanyIndex from './pages/warehousingCompany/index.vue'
import ReceiptsIndex from './pages/warehousingCompany/receipts/index.vue'
import Receipts from './pages/warehousingCompany/receipts/receipts.vue'
import ReceiptsDetails from './pages/warehousingCompany/receipts/receiptsDetails.vue'
import allWarehousingIndex from './pages/warehousingCompany/allWarehousing/index.vue'
import allWarehousing from './pages/warehousingCompany/allWarehousing/allWarehousing.vue'
import allWarehousingDetails from './pages/warehousingCompany/allWarehousing/allWarehousingDetails.vue'
import inboundConfirmIndex from './pages/warehousingCompany/inboundConfirm/index.vue'
import inboundConfirm from './pages/warehousingCompany/inboundConfirm/inboundConfirm.vue'
import inConfirmDetails from './pages/warehousingCompany/inboundConfirm/inConfirmDetails.vue'
import inboundResponseIndex from './pages/warehousingCompany/inboundResponse/index.vue'
import inboundResponse from './pages/warehousingCompany/inboundResponse/inboundResponse.vue'
import inResponseDetails from './pages/warehousingCompany/inboundResponse/inResponseDetails.vue'
import outboundConfirmIndex from './pages/warehousingCompany/outboundConfirm/index.vue'
import outboundConfirm from './pages/warehousingCompany/outboundConfirm/outboundConfirm.vue'
import outConfirmDetails from './pages/warehousingCompany/outboundConfirm/outConfirmDetails.vue'

/*物流公司*/
import logisticsIndex from './pages/logistics/index.vue'
import deliveryConfirmIndex from './pages/logistics/deliveryConfirm/index.vue'
import deliveryConfirm from './pages/logistics/deliveryConfirm/deliveryConfirm.vue'
import deliveryDetails from './pages/logistics/deliveryConfirm/deliveryDetails.vue'
import receiveConfirmIndex from './pages/logistics/receiveConfirm/index.vue'
import receiveConfirm from './pages/logistics/receiveConfirm/receiveConfirm.vue'
import receiveDetails from './pages/logistics/receiveConfirm/receiveDetails.vue'
import waybillIndex from './pages/logistics/waybill/index.vue'
import waybill from './pages/logistics/waybill/waybill.vue'
import waybillDetails from './pages/logistics/waybill/waybillDetails.vue'

export default [
  {
    path:'/',component:HomePage,
  },
  /*订单路由*/
  {
    path:'/order',component:order,
    children:[
      {path:'allOrder/:value',component:allOrder},
      {path:'orderDetail',component:orderDetail},
      {path:'createOrder',component:createOrder},
      {path:'confirmOrder',component:confirmOrder},
    ]
  },

  //应收账款
  {
    path:'/allAccounts/:status',component:AllAccountsPage,
    children:[
      {path:'',component:AccountListPage},
      {path:'signout',component:SignoutPage},
      {path:'accept',component:AcceptPage},
      {path:'cash',component:CashPage},
      {path:'discount',component:DiscountPage},
      {path:'detail',component:AccountsDetailPage}
    ]
  },

  /*仓储路由*/
  {
    path:'/warehousing',component:warehousingIndex,
  },
  {path:'/myWarehousing',component:mywarehousingIndex,
    children:[
      {path:'',component:myWarehousing},
      {path:'details',component:details}
    ]},
  {
    path:'/receiptApplication',component:receiptApplication
  },
  {
    path:'/myReceipts',component:myReceiptsIndex,
    children:[
      {path:'',component:myReceipts},
      {path:'myReceiptsDetails',component:myReceiptsDetails}
    ]
  },
  // 仓储公司
  {
    path:'/warehousingCompany',component:warehousingCompanyIndex,
  },
  {
    path:'/receipts',component:ReceiptsIndex,
    children:[
      {path:'',component:Receipts},
      {path:'ReceiptsDetails',component:ReceiptsDetails}
    ]
  },
  {
    path:'/allWarehousing',component:allWarehousingIndex,
    children:[
      {path:'',component:allWarehousing},
      {path:'allWarehousingDetails',component:allWarehousingDetails}
    ]
  },
  {
    path:'/inboundConfirm',component:inboundConfirmIndex,
    children:[
      {path:'',component:inboundConfirm},
      {path:'inConfirmDetails',component:inConfirmDetails}
    ]
  },
  {
    path:'/inboundResponse',component:inboundResponseIndex,
    children:[
      {path:'',component:inboundResponse},
      {path:'inResponseDetails',component:inResponseDetails}
    ]
  },
  {
    path:'/outboundConfirm',component:outboundConfirmIndex,
    children:[
      {path:'',component:outboundConfirm},
      {path:'outConfirmDetails',component:outConfirmDetails}
    ]
  },

  //物流公司
  {
    path:'/logistics',component:logisticsIndex
  },
  {
    path:'/deliveryConfirm',component:deliveryConfirmIndex,
    children:[
      {path:'',component:deliveryConfirm},
      {path:'deliveryDetails',component:deliveryDetails}
    ]
  },
  {
    path:'/receiveConfirm',component:receiveConfirmIndex,
    children:[
      {path:'',component:receiveConfirm},
      {path:'receiveDetails',component:receiveDetails}
    ]
  },
  {
    path:'/waybill',component:waybillIndex,
    children:[
      {path:'',component:waybill},
      {path:'waybillDetails',component:waybillDetails}
    ]
  },
]
