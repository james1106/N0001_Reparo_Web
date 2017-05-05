<template>
  <div id="bank_menu" class="bank_menu" style="height: 100%">
      <el-menu :unique-opened=true default-active="/shouye" class="el-menu-demo" mode="vertical" @select="" :router="true">
        <el-menu-item index="/" style="background-color: rgb( 242,246,248)">
          <svg class="icon menuImag" aria-hidden="true" style="font-size: 16px">   <use xlink:href="#icon-home_G"></use> </svg>首页
        </el-menu-item>
        <div style="height:80%;overflow-y: scroll;overflow-x: hidden">
          <el-submenu index="/bank" ref="openMenu">
            <template slot="title"><svg class="icon menuImag" aria-hidden="true">   <use xlink:href="#icon-order_H"></use> </svg>订单管理</template>
            <el-menu-item index="/bank/bankAccountsList/all">我的应收账款</el-menu-item>
            <el-menu-item index="/bank/bankAccountsList/discount">贴现确认</el-menu-item>
            <el-menu-item index="/bank/modifyRate">利率修改</el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
  </div>
</template>

<script>
  import Store from '../vuex/store.js'

  export default {
    name: 'bank_menu',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        elements:{}
      }
    },
    methods:{
    },
    mounted () {
      var evt = document.createEvent("MouseEvents");
      evt.initEvent("click", false, true);
      this.$refs.openMenu.$el.getElementsByClassName("el-submenu__title")[0].dispatchEvent(evt);
    }
  }
</script>

<style>
  .el-menu{background-color: transparent!important;}
  .el-menu-item, .el-submenu__title{width: 170px!important;}
</style>
