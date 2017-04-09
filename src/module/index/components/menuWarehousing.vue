<template>
  <div id="menu">

      <el-menu default-active="/shouye" class="el-menu-demo" mode="vertical" @select="" :router="true">
        <el-menu-item>
          我的功能
        </el-menu-item>
        <el-submenu index="/dingdan">
          <template slot="title">仓储管理</template>
          <el-menu-item index="/allOrder">我的仓单</el-menu-item>
          <el-menu-item index="/launchOrder">入库响应</el-menu-item>
          <el-menu-item index="/orderForConfirm">入库确认</el-menu-item>
          <el-menu-item index="/forDeliver">仓单申请确认</el-menu-item>
          <el-menu-item index="/forReceive">出库确认</el-menu-item>
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
