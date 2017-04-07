<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">所有订单</el-breadcrumb-item>
    </el-breadcrumb>
    <transition name="fade">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    name:'index',
    data () {
      return {}
    },
  }
</script>
