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

/*企业物流*/
import logisticsIndex from './pages/logistics/index.vue'
import deliver from './pages/logistics/deliver.vue'
import myWaybill from './pages/logistics/myWaybill.vue'
import wayBillDetails from './pages/logistics/wayBillDetails.vue'

/*企业仓储*/
import warehousingIndex from './pages/warehousing/index.vue'
import repoIn from './pages/warehousing/repoIn.vue'
import repoOut from './pages/warehousing/repoOut.vue'
import myReceipts from './pages/warehousing/myReceipts.vue'
import repoDetails from './pages/warehousing/repoDetails.vue'
import receiptsDetails from './pages/warehousing/receiptsDetails.vue'

/*仓储公司*/
import warehousingCompanyIndex from './pages/warehousingCompany/index.vue'
import myRepo from './pages/warehousingCompany/myRepo.vue'
import repoDetail from './pages/warehousingCompany/repoDetails.vue'
import inResponse from './pages/warehousingCompany/inResponse.vue'
import outConfirm from './pages/warehousingCompany/outConfirm.vue'
import inConfirm from './pages/warehousingCompany/inConfirm.vue'
import myReceipt from './pages/warehousingCompany/myReceipt.vue'
import receiptsDetail from './pages/warehousingCompany/receiptsDetails.vue'

/*物流公司*/
import logisticsCompanyIndex from './pages/logisticsCompany/index.vue'
import companyAllBill from './pages/logisticsCompany/companyAllBill.vue'
import companyBillDetails from './pages/logisticsCompany/companyBillDetails.vue'
import sendConfirm from './pages/logisticsCompany/sendConfirm.vue'
import receiveConfirm from './pages/logisticsCompany/receiveConfirm.vue'

export default [
  {
    path: '/', component: HomePage,
  },
  /*订单路由*/
  {
    path: '/order', component: order,
    children: [
      {path: 'allOrder/:value', component: allOrder},
      {path: 'orderDetail', component: orderDetail},
      {path: 'createOrder', component: createOrder},
      {path: 'confirmOrder', component: confirmOrder},
    ]
  },

  //应收账款
  {
    path: '/allAccounts/:status', component: AllAccountsPage,
    children: [
      {path: '', component: AccountListPage},
      {path: 'signout', component: SignoutPage},
      {path: 'accept', component: AcceptPage},
      {path: 'cash', component: CashPage},
      {path: 'discount', component: DiscountPage},
      {path: 'detail', component: AccountsDetailPage}
    ]
  },

  /*企业物流*/
  {
    path:'/logistics',component:logisticsIndex,
    children:[
      {path:'deliver',component:deliver},
      {path:'myWaybill/:value',component:myWaybill},
      {path:'wayBillDetails',component:wayBillDetails},
    ]
  },

  /*企业仓储*/
  {
    path: '/warehousing', component: warehousingIndex,
    children: [
      {path: 'repoIn', component: repoIn},
      {path: 'repoOut', component: repoOut},
      {path: 'myReceipts', component: myReceipts},
      {path: 'repoDetails', component: repoDetails},
      {path: 'receiptsDetails', component: receiptsDetails},
    ]
  },

  // 仓储公司
  {
    path:'/warehousingCompany',component:warehousingCompanyIndex,
    children: [
      {path:'myRepo/:status',component:myRepo},
      {path:'repoDetails',component:repoDetail},
      {path:'outConfirm',component:outConfirm},
      {path:'inResponse',component:inResponse},
      {path:'inConfirm',component:inConfirm},
      {path:'myReceipt',component:myReceipt},
      {path:'receiptDetails',component:receiptsDetail}
  ]
  },

  //物流公司
  {
    path:'/logisticsCompany',component:logisticsCompanyIndex,
    children:[
      {path:'companyAllBill/:value',component:companyAllBill},
      {path:'companyBillDetails',component:companyBillDetails},
      {path:'sendConfirm',component:sendConfirm},
      {path:'receiveConfirm',component:receiveConfirm},
    ]
  }
]
