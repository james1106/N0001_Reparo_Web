<template>
  <div id="buyer_menu" class="buyer_menu" style="height: 100%">
    <el-menu :unique-opened=true default-active="/shouye" class="el-menu-demo" mode="vertical" @select=""
             :router="true">
      <el-menu-item index="/" style="background-color: rgb( 242,246,248)">
        <svg class="icon menuImag" aria-hidden="true" style="font-size: 16px"> 
          <use xlink:href="#icon-home_B"></use>
           
        </svg>
        首页
      </el-menu-item>
      <div style="height:80%;overflow-y: scroll;overflow-x: hidden">
        <el-submenu index="/order" ref="openMenu">
          <template slot="title">
            <svg class="icon menuImag" aria-hidden="true"> 
              <use xlink:href="#icon-order_H"></use>
               
            </svg>
            订单管理
          </template>
          <el-menu-item index="/order/createOrder">发起订单</el-menu-item>
          <el-menu-item index="/order/allOrder/b">我买入的订单</el-menu-item>
        </el-submenu>
        <el-submenu index="/yingshou">
          <template slot="title">
            <svg class="icon menuImag" aria-hidden="true"> 
              <use xlink:href="#icon-yszk_hui"></use>
               
            </svg>
            应付账款
          </template>
          <el-menu-item index="/allAccounts/all" v-on:click="setStatus('all')">我的应付账款</el-menu-item>
          <el-menu-item index="/allAccounts/accept" v-on:click="setStatus('accept')">承兑</el-menu-item>
          <el-menu-item index="/allAccounts/cash" v-on:click="setStatus('cash')">兑付</el-menu-item>
        </el-submenu>
        <el-submenu index="/warehousing">
          <template slot="title">
            <svg class="icon menuImag" aria-hidden="true"> 
              <use xlink:href="#icon-cc_H"></use>
               
            </svg>
            仓储管理
          </template>
          <el-menu-item index="/warehousing/repoIn">入库管理</el-menu-item>
          <el-menu-item index="/warehousing/myReceipts">我的仓单</el-menu-item>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>

<script>
  import Store from '../../vuex/store.js'

  export default {
    name: 'buyer_menu',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        elements: {}
      }
    },
    methods: {
      setStatus: function (status) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        Store.commit('setAccountsStatus', status);
      }
    },
    mounted () {
      this.openFirstItem();
    },
    methods: {
      openFirstItem(){
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", false, true);
        this.$refs.openMenu.$el.getElementsByClassName("el-submenu__title")[0].dispatchEvent(evt);
      }
    }
  }
</script>
