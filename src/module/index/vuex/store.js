import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
Vue.use(Vuex)

const state={
  checkId:'',//全部订单列表点击详情时记住Id  /也可能是应收账款编号
  commonData:{
    "account_name":'A员工',
    "company_name":"A企业",
    "phone":"13255556666",
    "role_code":0,
    "cert_type":"identifacation",
    "cert_no":"346734199577774356",
    "acct_id":"bankA",
    "svcr_class":"001",
    "acct_svcr":"44444",
    "acct_svcr_name":"农业银行",
  },
  accountsStatus:'all',  //应收账款中当前选中的状态
  isBuyer:"true",   //我是买家
  orderTab:"first",
  // accountStatusNo:0
}

/* 从本地存储读取数据 */
for(var item in state){
  localStorage.getItem(item)?
    state[item] = localStorage.getItem(item): false;
}

const mutations={
  setCheckId (state, id) {
    state.checkId=id;
    localStorage.setItem('checkId',id);
  },
  setAccountsStatus (state, status) {
    state.accountsStatus=status;
    localStorage.setItem('accountsStatus',status);
  },
  // setAccountsStatusNo (state, statusNo) {
  //   state.accountStatusNo=statusNo;
  //   localStorage.setItem('accountStatusNo',statusNo);
  // },
  setIsBuyer (state, buyer) {
    state.isBuyer=buyer;
    localStorage.setItem('isBuyer',buyer);
  },
  setCommonData (state,commonData) {
    Object.assign(state.commonData,commonData);
    localStorage.setItem('commonData',JSON.stringify(commonData));
  },
  setOrderTab (state,orderTab) {
    state.orderTab=orderTab;
    localStorage.setItem('orderTab',orderTab);
  }
}

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
