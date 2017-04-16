<template>
  <div id="menu" style="position: fixed;overflow-y: scroll;">
      <el-menu is-opened default-active="/shouye" class="el-menu-demo" mode="vertical" @select="" :router="true">
        <el-menu-item index="/" style="background-color: rgb(244,250,249)">
          <img src="../assets/home_g.png" style="padding-right: 10px"><span>首页</span>
        </el-menu-item>
        <el-submenu index="/order">
          <template slot="title"><img src="../assets/order_g.png" class="menuImag">订单管理</template>
          <el-menu-item index="/order/allOrder/a" @click="confirmOrder">确认订单</el-menu-item>
          <el-menu-item index="/order/allOrder/b" @click="allOrder">我卖出的订单</el-menu-item>
        </el-submenu>
        <el-submenu index="/yingshou">
          <template slot="title"><img src="../assets/order_g.png" class="menuImag">应收账款</template>
          <el-menu-item index="/allAccounts/all" v-on:click="setStatus('all')">我的应收账款</el-menu-item>
          <el-menu-item index="/allAccounts/signout" v-on:click="setStatus('signout')">签发</el-menu-item>
          <el-menu-item index="/allAccounts/discount" v-on:click="setStatus('discount')">贴现</el-menu-item>
        </el-submenu>
        <el-submenu index="/logistics">
          <template slot="title"><img src="../assets/wl_g.png" class="menuImag">物流管理</template>
          <el-menu-item index="/logistics/myWaybill/a" @click="sendGood">发货</el-menu-item>
          <el-menu-item index="/logistics/myWaybill/b" @click="myLogistics">我的物流</el-menu-item>
        </el-submenu>
        <el-submenu index="/warehousing">
          <template slot="title"><img src="../assets/cc_g.png" class="menuImag">仓储管理</template>
          <el-menu-item index="/warehousing/repoOut">出库管理</el-menu-item>
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
      sendGood () {
         Store.commit('setLogisticsTab',"second");
      },
      myLogistics () {
         Store.commit('setLogisticsTab',"first");
      }

    }
  }
</script>

<style>
  .el-menu-item, .el-submenu__title{width: 170px!important;}
  .menuImag{padding-right: 15px}
</style>
