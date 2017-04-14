<template>
  <div id="menu">
      <el-menu  default-active="/shouye" class="el-menu-demo" mode="vertical" @select="" :router="true">
        <el-menu-item>
          <i class="el-icon-date"></i>首页
        </el-menu-item>
        <el-submenu index="/warehousingCompany">
          <template slot="title"><i class="el-icon-menu"></i>仓储管理</template>
          <el-menu-item index="/warehousingCompany/companyAllReceipts">我的仓单</el-menu-item>
          <el-menu-item index="/warehousingCompany/inResponse">入库响应</el-menu-item>
          <el-menu-item index="/warehousingCompany/outConfirm">出库确认</el-menu-item>
          <el-menu-item index="/warehousingCompany/inConfirm">入库确认</el-menu-item>
          <el-menu-item index="/warehousingCompany/receiptApplyConfirm">仓单申请确认</el-menu-item>
        </el-submenu>
      </el-menu>
  </div>
</template>

<script>
export default {
  name: 'menu',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
</style>
