import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state={
  checkId:'',//全部订单列表点击详情时记住Id
  accountsStatus:'all',  //应收账款中当前选中的状态
  isBuyer:true   //我是买家
}

const mutations={
  setCheckId (state, id) {
    state.checkId=id;
  },
  setAccountsStatus (state, status) {
    state.accountsStatus=status;
  },
  setIsBuyer (state, buyer) {
    state.isBuyer=buyer;
  }
}

export default new Vuex.Store({
  state,
  mutations
})
