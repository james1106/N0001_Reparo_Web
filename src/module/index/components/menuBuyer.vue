<template>
  <div id="menu" style="position: fixed">
      <el-menu default-active="/shouye" class="el-menu-demo" mode="vertical" @select="" :router="true">
        <el-menu-item index="/" style="background-color: rgb( 242,246,248)">
          <img src="../assets/home.png" style="padding-right: 10px">首页
        </el-menu-item>
        <el-submenu index="/dingdan">
          <template slot="title"><i class="el-icon-menu"></i>订单管理</template>
          <el-menu-item index="/allOrder">所有订单</el-menu-item>
          <el-menu-item index="/launchOrder">发起订单</el-menu-item>
          <el-menu-item index="/orderForConfirm">待确认</el-menu-item>
          <el-menu-item index="/forDeliver">待发货</el-menu-item>
          <el-menu-item index="/forReceive">待收货</el-menu-item>
        </el-submenu>
        <el-submenu index="/yingshou">
          <template slot="title"><i class="el-icon-menu"></i>应收账款</template>
          <el-menu-item index="/allAccounts/all" v-on:click="setStatus('all')">我的应付账款</el-menu-item>
          <el-menu-item index="/allAccounts/accept" v-on:click="setStatus('accept')">承兑</el-menu-item>
          <el-menu-item index="/allAccounts/cash" v-on:click="setStatus('cash')">兑付</el-menu-item>
        </el-submenu>
        <el-submenu index="/yufu">
          <template slot="title"><i class="el-icon-menu"></i>预付款</template>
          <el-menu-item index="/yufu/qianfa">签发</el-menu-item>
          <el-menu-item index="/yufu/daichengdui">待承兑的账款</el-menu-item>
          <el-menu-item index="/yufu/yufutiexian">贴现</el-menu-item>
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
      setStatus: function (status) {
        Store.state.accountsStatus = status    }
    }
  }
</script>

<style scoped>
  .el-menu{background-color: transparent!important;}
  .el-menu-item, .el-submenu__title{width: 170px!important;}
</style>
