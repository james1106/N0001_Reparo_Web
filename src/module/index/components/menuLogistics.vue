<template>
  <div id="menu">

      <el-menu default-active="/shouye" class="el-menu-demo" mode="vertical" @select="" :router="true">
        <el-menu-item>
          <i class="el-icon-date"></i>首页
        </el-menu-item>
        <el-submenu index="/logisticsCompany">
          <template slot="title"><i class="el-icon-menu"></i>运单管理</template>
          <el-menu-item index="/logisticsCompany/companyAllBill/a" @click="companyAllBill">我的运单</el-menu-item>
          <el-menu-item index="/logisticsCompany/companyAllBill/b" @click="sendConfirm">发货确认</el-menu-item>
          <el-menu-item index="/logisticsCompany/companyAllBill/c" @click="receiveConfirm">收货确认</el-menu-item>
        </el-submenu>
      </el-menu>
  </div>
</template>

<script>
  import store from '../vuex/store'
  import constantData from '../../../common/const'
export default {
  name: 'menu',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    companyAllBill () {
        store.commit('setLogisticsCompanyTab',"first");
    },
    sendConfirm () {
        store.commit('setLogisticsCompanyTab',"second");
    },
    receiveConfirm () {
        store.commit('setLogisticsCompanyTab',"third");
    },
  }
}
</script>

<style scoped>
</style>
