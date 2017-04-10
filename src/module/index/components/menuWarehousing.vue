<template>
  <div id="menu">
      <el-menu  default-active="/shouye" class="el-menu-demo" mode="vertical" @select="" :router="true">
        <el-menu-item>
          <i class="el-icon-date"></i>首页
        </el-menu-item>
        <el-submenu index="/dingdan">
          <template slot="title"><i class="el-icon-menu"></i>仓储管理</template>
          <el-menu-item index="/allWarehousing">我的仓储</el-menu-item>
          <el-menu-item index="/receipts">我的仓单</el-menu-item>
          <el-menu-item index="/inboundResponse">入库响应</el-menu-item>
          <el-menu-item index="/inboundConfirm">入库确认</el-menu-item>
          <el-menu-item index="/outboundConfirm">出库确认</el-menu-item>
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
