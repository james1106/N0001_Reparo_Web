<template>
<div id="wrapper">
  <!--头部导航-->
  <header class="header" :class="{ 'header-fixed' : headerFixed }" >
  <el-row>
    <el-col :span="24">
      <el-col :span="10" class="logo">
        LOGO
			</el-col>
      <el-col :span="10">
      </el-col>
      <el-col :span="4" class="userinfo">
        <!--<el-badge is-dot class="item">我的消息</el-badge>-->
        <!--<el-badge class="item">设置</el-badge>-->
        <!--<el-badge class="item">退出登录</el-badge>-->
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link">user</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
  </el-row>
  </header>
  <div v-show="headerFixed" style="position: relative;height: 60px;width: 100%;"></div>
  <main>
    <aside class="main-left">
      <el-menu default-active="/shouye" class="el-menu-demo" mode="vertical" @select="" :router="true">
        <el-menu-item>
          我的功能
        </el-menu-item>
        <el-submenu index="/dingdan">
          <template slot="title">订单管理</template>
          <el-menu-item index="/suoyoudingdan">所有订单</el-menu-item>
          <el-menu-item index="/faqidingdan">发起订单</el-menu-item>
          <el-menu-item index="/daiquerendingdan">待确认</el-menu-item>
          <el-menu-item index="/daifahuo">待发货</el-menu-item>
          <el-menu-item index="/daishouhuo">待收货</el-menu-item>
        </el-submenu>
        <el-submenu index="/yingshou">
          <template slot="title">应收账款</template>
          <el-menu-item index="/qianfa">签发</el-menu-item>
          <el-menu-item index="/daichengdui">待承兑的账款</el-menu-item>
          <el-menu-item index="/yingshoutiexian">贴现</el-menu-item>
          <el-menu-item index="/duifu">兑付</el-menu-item>
        </el-submenu>
        <el-submenu index="/yufu">
          <template slot="title">预付款</template>
          <el-menu-item index="/yufu/qianfa">签发</el-menu-item>
          <el-menu-item index="/yufu/daichengdui">待承兑的账款</el-menu-item>
          <el-menu-item index="yufu/yufutiexian">贴现</el-menu-item>
        </el-submenu>
        <el-submenu index="/cangchu">
          <template slot="title">仓储管理</template>
          <el-menu-item index="/rukushenqing">入库申请</el-menu-item>
          <el-menu-item index="/chukushenqing">出库申请</el-menu-item>
          <el-menu-item index="/cangdanshenqing">仓单申请</el-menu-item>
        </el-submenu>
      </el-menu>
    </aside>
    <div class="main-right">
    <transition name="fade">
      <router-view class="view"></router-view>
    </transition>
    </div>
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
  .logo { width:230px;height:60px;font-size: 22px;padding-left:20px;padding-right:20px;border-color: rgba(238,241,146,0.3);border-right-width: 1px;border-right-style: solid;}
  .userinfo {text-align: right;padding-right: 35px;float: right;}
  /* 主内容区 */
  main{display: -webkit-box;display: -ms-flexbox;display: flex;  min-height: 800px;  border: solid 40px #E9ECF1;  background-color: #FCFCFC;  }
  .main-left{text-align: center;-webkit-box-flex: 0;-ms-flex: 0 0 200px;flex: 0 0 200px;}
  .main-right{-webkit-box-flex:1;-ms-flex:1;flex:1; background-color: #fff; padding: 50px 70px; }
  .el-menu{background-color: transparent!important;}
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
  .item{
    margin-top: 10px;
    font-size: 10px;
    margin-right: 10px
  }
/*@import '../../../framework/avenxo/assets/fonts/font-awesome/css/font-awesome.min.css';
@import '../../../framework/avenxo/assets/fonts/themify-icons/themify-icons.css';
@import '../../../framework/avenxo/assets/css/styles.css';
@import 'http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400italic,600';*/

</style>
