<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">所有应收账款</el-breadcrumb-item>
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
