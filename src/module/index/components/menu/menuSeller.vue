<template>
  <div id="seller_menu" style="height: 100%">
      <el-menu unique-opened=true is-opened default-active="/shouye" class="el-menu-demo" mode="vertical" @select="" :router="true">
        <el-menu-item index="/" style="background-color: rgb(244,250,249);">
          <svg class="icon menuImag" aria-hidden="true" style="font-size: 16px">   <use xlink:href="#icon-home_G"></use> </svg>首页
        </el-menu-item>
        <div style="height:80%;overflow-y: scroll;overflow-x: hidden">
          <el-submenu index="/order" ref="openMenu">
            <template slot="title"><svg class="icon menuImag" aria-hidden="true">   <use xlink:href="#icon-order_H"></use> </svg>订单管理</template>
            <el-menu-item index="/order/allOrder/a" @click="confirmOrder">确认订单</el-menu-item>
            <el-menu-item index="/order/allOrder/b" @click="allOrder">我卖出的订单</el-menu-item>
          </el-submenu>
          <el-submenu index="/yingshou">
            <template slot="title"><svg class="icon menuImag" aria-hidden="true">   <use xlink:href="#icon-yszk_hui"></use> </svg>应收账款</template>
            <el-menu-item index="/allAccounts/all" v-on:click="setStatus('all')">我的应收账款</el-menu-item>
            <el-menu-item index="/allAccounts/signout" v-on:click="setStatus('signout')">签发</el-menu-item>
            <el-menu-item index="/allAccounts/discount" v-on:click="setStatus('discount')">贴现</el-menu-item>
          </el-submenu>
          <el-submenu index="/logistics">
            <template slot="title"><svg class="icon menuImag" aria-hidden="true">   <use xlink:href="#icon-wl_H"></use> </svg>物流管理</template>
            <el-menu-item index="/logistics/myWaybill/a" @click="sendGood">发货</el-menu-item>
            <el-menu-item index="/logistics/myWaybill/b" @click="myLogistics">我的物流</el-menu-item>
          </el-submenu>
          <el-submenu index="/warehousing">
            <template slot="title"><svg class="icon menuImag" aria-hidden="true">   <use xlink:href="#icon-cc_H"></use> </svg>仓储管理</template>
            <el-menu-item index="/warehousing/repoOut">出库管理</el-menu-item>
            <el-menu-item index="/warehousing/myReceipts">我的仓单</el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
  </div>
</template>

<script>
  import Store from '../../vuex/store.js'

  export default {
    name: 'seller_menu',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted () {
      var evt = document.createEvent("MouseEvents");
      evt.initEvent("click", false, true);
      this.$refs.openMenu.$el.getElementsByClassName("el-submenu__title")[0].dispatchEvent(evt);
    },
    methods:{
      setStatus: function (status) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        Store.commit('setAccountsStatus',status);
      },
      confirmOrder () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
         Store.commit('setOrderTab',"second");
         console.log(Store.state.orderTab);
//         this.$router.push("/order/allOrder");
      },
      allOrder () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
         Store.commit('setOrderTab',"first");
        console.log(Store.state.orderTab);
//        this.$router.push("/order/allOrder");
      },
      sendGood () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
         Store.commit('setLogisticsTab',"second");
      },
      myLogistics () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
         Store.commit('setLogisticsTab',"first");
      }

    }
  }
</script>
