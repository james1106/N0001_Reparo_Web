import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state={
  checkId:'',//全部订单列表点击详情时记住Id
}

const mutations={
  setCheckId (state, id) {
    state.checkId=id;
  },
}

export default new Vuex.Store({
  state,
  mutations
})
