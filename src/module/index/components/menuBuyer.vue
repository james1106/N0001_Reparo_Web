<template>
  <div id="menu" style="position: fixed;background-color: white;z-index: 1">
      <el-menu default-active="/shouye" class="el-menu-demo" mode="vertical" @select="" :router="true">
        <el-menu-item index="/" style="background-color: rgb( 242,246,248)">
          <img src="../assets/home_b.png" style="padding-right: 10px">首页
        </el-menu-item>
        <el-submenu index="/order">
          <template slot="title"><img src="../assets/order_b.png" class="menuImag">订单管理</template>
          <el-menu-item index="/order/createOrder">发起订单</el-menu-item>
          <el-menu-item index="/order/allOrder/b">我买入的订单</el-menu-item>
        </el-submenu>
        <el-submenu index="/yingshou">
          <template slot="title"><img src="../assets/order_b.png" class="menuImag">应付账款</template>
          <el-menu-item index="/allAccounts/all" v-on:click="setStatus('all')">我的应付账款</el-menu-item>
          <el-menu-item index="/allAccounts/accept" v-on:click="setStatus('accept')">承兑</el-menu-item>
          <el-menu-item index="/allAccounts/cash" v-on:click="setStatus('cash')">兑付</el-menu-item>
        </el-submenu>
        <el-submenu index="/warehousing" >
          <template slot="title"><img src="../assets/cc_b.png" class="menuImag">仓储管理</template>
          <el-menu-item index="/warehousing/repoIn">入库管理</el-menu-item>
          <el-menu-item index="/warehousing/myReceipts">我的仓单</el-menu-item>
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
        Store.commit('setAccountsStatus',status);
      }
    }
  }
</script>

<style scoped>
  .el-menu{background-color: transparent!important;}
  .el-menu-item, .el-submenu__title{width: 170px!important;}
</style>
