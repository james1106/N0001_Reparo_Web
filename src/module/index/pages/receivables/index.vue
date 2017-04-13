<template>
  <div>
    <el-breadcrumb separator=">" style="margin-bottom: 23px">
      <img src="../../assets/combinedShape.png" style="float: left;margin-right: 0.5%">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>应收账款</el-breadcrumb-item>
      <el-breadcrumb-item>我的应收账款</el-breadcrumb-item>
    </el-breadcrumb>
    <transition name="fade">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    name:'index',
//    created:function () {
////      this.$router.push('all/'+ this.$route.params.status)
//      this.toChildView()
//    },
//    watch: {
//      '$route' () {
//          this.toChildView()
//      }
//    },
    data () {
      return {}
    },
//    methods:{
//        toChildView: function () {
//          var path =  'list/' + this.$route.params.status;
//          this.$router.push(path)
//        }
//    }
  }
</script>
