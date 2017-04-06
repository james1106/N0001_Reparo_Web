<template>
<div id="wrapper">
  <!--头部导航-->
  <header class="header" :class="{ 'header-fixed' : headerFixed }" >
  <el-row>
    <el-col :span="24">
      <el-menu default-active="/shouye" class="el-menu-demo" mode="horizontal" @select="" :router="true">
        <el-menu-item index="/shouye">首页</el-menu-item>
        <el-menu-item index="/yingshou">应收账款融资</el-menu-item>
        <el-submenu index="/huoquan">
          <template slot="title">货权融资</template>
          <el-menu-item index="/huoquan/1">选项1</el-menu-item>
          <el-menu-item index="/huoquan/2">选项2</el-menu-item>
          <el-menu-item index="huoquan/3">选项3</el-menu-item>
        </el-submenu>
        <el-menu-item index="/baobiao">报表</el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
  </header>
  <div v-show="headerFixed" style="position: relative;height: 60px;width: 100%;"></div>
  <main>
    <transition name="fade">
      <router-view class="view"></router-view>
    </transition>
  </main>
  <!--尾部信息-->
  <footer-a></footer-a>
</div>
</template>


<script>
import FooterA from './footer'
import MenuA from './menu'

export default {
  name: 'wrapper',
  data () {
    return {
      msg: '',
      headerFixed : true,
      active:true
    }
  },
  components: {
      FooterA,MenuA
  }
}
</script>

<style scoped>
  /* 头部导航 */
  header{z-index: 1000;min-width: 1200px;transition: all 0.5s ease;  border-top: solid 4px #3091F2;  background-color: #fff;  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);  }
  header.header-fixed{position: fixed;top: 0;left: 0;right: 0;}
  header .el-menu-demo{padding-left: 300px!important;}

  /* 主内容区 */
  main{display: -webkit-box;display: -ms-flexbox;display: flex;  min-height: 800px;  border: solid 40px #E9ECF1;  background-color: #FCFCFC;  }

  /* 路由切换动效 */
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-active {
    opacity: 0;
    transform: translateY(30px);
  }
/*@import '../../../framework/avenxo/assets/fonts/font-awesome/css/font-awesome.min.css';
@import '../../../framework/avenxo/assets/fonts/themify-icons/themify-icons.css';
@import '../../../framework/avenxo/assets/css/styles.css';
@import 'http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400italic,600';*/

</style>
