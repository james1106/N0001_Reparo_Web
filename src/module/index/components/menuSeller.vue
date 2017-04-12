<template>
  <div id="menu">

      <el-menu default-active="/shouye" class="el-menu-demo" mode="vertical" @select="" :router="true">
        <el-menu-item>
          我的功能
        </el-menu-item>
        <el-submenu index="/order">
          <template slot="title">订单管理</template>
          <el-menu-item index="/order/allOrder/a" @click="confirmOrder">确认订单</el-menu-item>
          <el-menu-item index="/order/allOrder/b" @click="allOrder">我卖出的订单</el-menu-item>
        </el-submenu>
        <el-submenu index="/yingshou">
          <template slot="title">应收账款</template>
          <el-menu-item index="/allAccounts/all" v-on:click="setStatus('all')">我的应收账款</el-menu-item>
          <el-menu-item index="/allAccounts/signout" v-on:click="setStatus('signout')">签发</el-menu-item>
          <el-menu-item index="/allAccounts/discount" v-on:click="setStatus('discount')">贴现</el-menu-item>
        </el-submenu>
        <el-submenu index="/yufu">
          <template slot="title">物流管理</template>
          <el-menu-item index="/yufu/qianfa">发货</el-menu-item>
          <el-menu-item index="/yufu/daichengdui">我的物流</el-menu-item>
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
        Store.state.accountsStatus = status
      },
      confirmOrder () {
         Store.commit('setOrderTab',"second");
         console.log(Store.state.orderTab);
//         this.$router.push("/order/allOrder");
      },
      allOrder () {
         Store.commit('setOrderTab',"first");
        console.log(Store.state.orderTab);
//        this.$router.push("/order/allOrder");
      },

    }
  }
</script>

<style scoped>
</style>
