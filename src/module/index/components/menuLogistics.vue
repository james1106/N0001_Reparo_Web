<template>
  <div id="menu">

      <el-menu default-active="/shouye" class="el-menu-demo" mode="vertical" @select="" :router="true">
        <el-menu-item>
          我的功能
        </el-menu-item>
        <el-submenu index="/dingdan">
          <template slot="title">运单管理</template>
          <el-menu-item index="/allOrder">我的运单</el-menu-item>
          <el-menu-item index="/launchOrder">发货确认</el-menu-item>
          <el-menu-item index="/orderForConfirm">收货确认</el-menu-item>
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
