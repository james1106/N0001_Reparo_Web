import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
Vue.use(Vuex)

const state={
  checkId:'',//全部订单列表点击详情时记住Id
  changeRole:'pyee',//pyee卖方，pyer买方
  commonData:{
    "payeeAccount":'B企业',
    "payerAccount":"A企业",
    "payerBank":"农业银行",
    "payerBankAccount":"123456",
    "payingMethod":0,
  }
}

const mutations={
  setCheckId (state, id) {
    state.checkId=id;
  },
}

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
