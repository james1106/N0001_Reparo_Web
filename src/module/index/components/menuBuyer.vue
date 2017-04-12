<template>
  <div id="menu">

      <el-menu default-active="/shouye" class="el-menu-demo" mode="vertical" @select="" :router="true">
        <el-menu-item>
          我的功能
        </el-menu-item>
        <el-submenu index="/order">
          <template slot="title">订单管理</template>
          <el-menu-item index="/order/createOrder">发起订单</el-menu-item>
          <el-menu-item index="/order/allOrder/b">我买入的订单</el-menu-item>
        </el-submenu>
        <el-submenu index="/yingshou">
          <template slot="title">应付账款</template>
          <el-menu-item index="/allAccounts/all" v-on:click="setStatus('all')">我的应付账款</el-menu-item>
          <el-menu-item index="/allAccounts/accept" v-on:click="setStatus('accept')">承兑</el-menu-item>
          <el-menu-item index="/allAccounts/cash" v-on:click="setStatus('cash')">兑付</el-menu-item>
        </el-submenu>
        <el-submenu index="/warehousing">
          <template slot="title">仓储管理</template>
          <el-menu-item index="/myWarehousing">我的仓储</el-menu-item>
          <el-menu-item index="/myReceipts">我的仓单</el-menu-item>
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
</style>
