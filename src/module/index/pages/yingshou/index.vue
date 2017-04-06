<template>
  <div class="main">
  <!-- 左侧导航 -->
  <div class="main-left">
    <el-menu default-active="/yingshou/qianfa" class="el-menu-vertical-demo" :router="true">
      <el-menu-item index="/yingshou/qianfa" :class="{'isActive': active}">签发</el-menu-item>
      <el-menu-item index="/yingshou/chengdui" :class="{'isActive': !active}">承兑</el-menu-item>
      <el-menu-item index="/yingshou/zhuanrang" :class="{'isActive': !active}">转让</el-menu-item>
      <el-menu-item index="/yingshou/tiexian" :class="{'isActive': !active}">贴现</el-menu-item>
      <el-menu-item index="/yingshou/duifu" :class="{'isActive': !active}">兑付</el-menu-item>
      <el-menu-item index="/yingshou/xinxi" :class="{'isActive': !active}">我的信息</el-menu-item>
    </el-menu>
  </div>

  <!-- 右侧主内容区 -->
  <div  class="main-right" >
    <transition name="fade">
      <router-view class="view"></router-view>
    </transition>
  </div>
  </div>
</template>
<script>
  export default {
      name:'yingshou',
      data () {
          return {}
      }
  }
</script>
<style>
  .main {display: -webkit-box;display: -ms-flexbox;display: flex;width:100%}
   .main-left{text-align: center;-webkit-box-flex: 0;-ms-flex: 0 0 200px;flex: 0 0 200px;}
   .main-right{-webkit-box-flex:1;-ms-flex:1;flex:1; background-color: #fff; padding: 50px 70px; }
   .el-menu{background-color: transparent!important;}
</style>
