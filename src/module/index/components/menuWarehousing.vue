<template>
  <div id="warehousing_menu">
    <el-menu unique-opened=true default-active="/shouye" class="el-menu-demo" mode="vertical" @select="" :router="true">
      <el-menu-item index="/" style="background-color: rgb( 242,246,248)">
        <svg class="icon menuImag" aria-hidden="true" style="font-size: 16px">   <use xlink:href="#icon-home_G"></use> </svg>首页
      </el-menu-item>
      <div>
        <el-submenu index="/cangchu" ref="openMenu">
          <template slot="title"><svg class="icon menuImag" aria-hidden="true">   <use xlink:href="#icon-cc_H"></use> </svg>仓储管理</template>
          <el-menu-item index="/warehousingCompany/myRepo/all" @click="setTab('all')">我的仓储</el-menu-item>
          <el-menu-item index="/warehousingCompany/myRepo/inResponse" @click="setTab('inResponse')">入库响应</el-menu-item>
          <el-menu-item index="/warehousingCompany/myRepo/inConfirm" @click="setTab('inConfirm')">入库确认</el-menu-item>
          <el-menu-item index="/warehousingCompany/myRepo/outConfirm" @click="setTab('outConfirm')">出库确认</el-menu-item>
        </el-submenu>
        <el-submenu index="/cangdan">
        <template slot="title"><svg class="icon menuImag" aria-hidden="true">   <use xlink:href="#icon-order_H"></use> </svg>仓单管理</template>
          <el-menu-item index="/warehousingCompany/myReceipt">我的仓单</el-menu-item>
        </el-submenu>
      </div>
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
  mounted () {
    var evt = document.createEvent("MouseEvents");
    evt.initEvent("click", false, true);
    this.$refs.openMenu.$el.getElementsByClassName("el-submenu__title")[0].dispatchEvent(evt);
  },
  methods:{
      setTab(status){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        Store.commit('setRepoCompanyTab',status);
      }
  }
}
</script>
