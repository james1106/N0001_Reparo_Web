<template>
  <div id="menu">

      <el-menu default-active="/shouye" class="el-menu-demo" mode="vertical" @select="" :router="true">
        <el-menu-item>
          <img src="../assets/home.png" style="padding-right: 10px"><span>首页</span>
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
          <template slot="title"><i class="el-icon-menu"></i>应付账款</template>
          <el-menu-item index="/allAccounts/all" v-on:click="setStatus('all')">我的应收账款</el-menu-item>
          <el-menu-item index="/allAccounts/signout" v-on:click="setStatus('signout')">签发</el-menu-item>
          <el-menu-item index="/allAccounts/discount" v-on:click="setStatus('discount')">贴现</el-menu-item>
        </el-submenu>
        <el-submenu index="/yufu">
          <template slot="title"><i class="el-icon-menu"></i>预付款</template>
          <el-menu-item index="/yufu/qianfa">签发</el-menu-item>
          <el-menu-item index="/yufu/daichengdui">待承兑的账款</el-menu-item>
          <el-menu-item index="/yufu/yufutiexian">贴现</el-menu-item>
        </el-submenu>
        <el-submenu index="/warehousing">
          <template slot="title"><i class="el-icon-menu"></i>仓储管理</template>
          <el-menu-item index="/myWarehousing">我的仓储</el-menu-item>
          <el-menu-item index="/myReceipts">我的仓单</el-menu-item>
          <el-menu-item index="/receiptApplication">仓单申请</el-menu-item>
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
        Store.state.accountsStatus = status
      }
    }
  }
</script>

<style scoped>

</style>
