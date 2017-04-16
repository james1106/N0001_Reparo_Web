<template>
  <div id="menu">
      <el-menu  default-active="/shouye" class="el-menu-demo" mode="vertical" @select="" :router="true">
        <el-menu-item>
          <i class="el-icon-date"></i>首页
        </el-menu-item>
        <el-submenu index="/cangchu">
          <template slot="title"><i class="el-icon-menu"></i>仓储管理</template>
          <el-menu-item index="/warehousingCompany/myRepo/all" @click="setTab('all')">我的仓储</el-menu-item>
          <el-menu-item index="/warehousingCompany/myRepo/inResponse" @click="setTab('inResponse')">入库响应</el-menu-item>
          <el-menu-item index="/warehousingCompany/myRepo/inConfirm" @click="setTab('inConfirm')">入库确认</el-menu-item>
          <el-menu-item index="/warehousingCompany/myRepo/outConfirm" @click="setTab('outConfirm')">出库确认</el-menu-item>
        </el-submenu>
        <el-submenu index="/cangdan">
        <template slot="title"><i class="el-icon-menu"></i>仓单管理</template>
          <el-menu-item index="/warehousingCompany/companyAllReceipts">我的仓单</el-menu-item>
          <el-menu-item index="/warehousingCompany/receiptApplyConfirm">仓单申请确认</el-menu-item>
        </el-submenu>
      </el-menu>
  </div>
</template>

<script>
  import Store from '../vuex/store.js'
export default {
  name: 'menu',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
      setTab(status){
        Store.commit('setRepoCompanyTab',status);
      }
  }
}
</script>

<style scoped>
</style>
