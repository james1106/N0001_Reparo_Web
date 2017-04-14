<template>
  <div id="menu">

      <el-menu default-active="/shouye" class="el-menu-demo" mode="vertical" @select="" :router="true">
        <el-menu-item>
          <i class="el-icon-date"></i>首页
        </el-menu-item>
        <el-submenu index="/logisticsCompany">
          <template slot="title"><i class="el-icon-menu"></i>运单管理</template>
          <el-menu-item index="/logisticsCompany/companyAllBill">我的运单</el-menu-item>
          <el-menu-item index="/logisticsCompany/sendConfirm">发货确认</el-menu-item>
          <el-menu-item index="/logisticsCompany/receiveConfirm">收货确认</el-menu-item>
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
