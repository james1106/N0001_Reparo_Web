<template>
  <div id="logistics_menu">
      <el-menu unique-opened=true default-active="/shouye" class="el-menu-demo" mode="vertical" @select="" :router="true">
        <el-menu-item index="/" style="background-color: rgb( 242,246,248)">
          <svg class="icon menuImag" aria-hidden="true" style="font-size: 16px">   <use xlink:href="#icon-home_G"></use> </svg>首页
        </el-menu-item>
        <el-submenu index="/logisticsCompany" ref="openMenu">
          <template slot="title"><svg class="icon menuImag" aria-hidden="true" style="font-size: 16px">   <use xlink:href="#icon-order_G"></use> </svg>运单管理</template>
          <el-menu-item index="/logisticsCompany/companyAllBill/a" @click="companyAllBill">我的运单</el-menu-item>
          <el-menu-item index="/logisticsCompany/companyAllBill/b" @click="sendConfirm">发货确认</el-menu-item>
          <el-menu-item index="/logisticsCompany/companyAllBill/c" @click="receiveConfirm">收货确认</el-menu-item>
        </el-submenu>
      </el-menu>
  </div>
</template>

<script>
  import store from '../vuex/store'
  import constantData from '../../../common/const'
export default {
  name: 'menu',
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
    companyAllBill () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
        store.commit('setLogisticsCompanyTab',"first");
    },
    sendConfirm () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
        store.commit('setLogisticsCompanyTab',"second");
    },
    receiveConfirm () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
        store.commit('setLogisticsCompanyTab',"third");
    },
  }
}
</script>

<style scoped>
</style>
