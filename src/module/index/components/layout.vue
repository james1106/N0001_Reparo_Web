<template>
<div id="wrapper">
  <!--头部导航-->
  <header class="header" :class="[{'seller': state.isBuyer==='false', 'buyer': state.isBuyer==='true' ,'header-fixed':headerFixed}] ">
  <el-row style="width: 81%;
    margin: 0 auto;
    min-width: 1230px;">
    <el-col :span="24">
      <el-col :span="1" class="logo">
        <img src="../assets/logoWhiteCopy.png" style="margin-top: 8px">
			</el-col>
      <el-col :span="4" style="margin-left: 10px;margin-top: 20px;color: white">
        <span >趣链科技</span><span> | </span>
        <template v-if="companyType === 0">
          <span style="font-size: 14px" v-if="state.isBuyer === 'true'">买家中心</span>
          <span style="font-size: 14px" v-else >卖家中心</span>
        </template>
        <template v-else-if="companyType === 2">
          <span style="font-size: 14px" >仓储中心</span>
        </template>
        <template v-else-if="companyType === 1">
          <span style="font-size: 14px" >物流中心</span>
        </template>
        <template v-else>
          <span style="font-size: 14px" >金融机构</span>
        </template>
      </el-col>
      <el-col :span="2" v-if="companyType === 0">
        <el-button  class="changeButton" size="large" type="primary" v-bind:class="{borderBottom:state.isBuyer==='false'}" v-on:click="toSeller()">我是卖家</el-button>
      </el-col>
      <el-col :span="2" v-if="companyType === 0">
        <el-button  class="changeButton" size="large" type="primary" v-bind:class="{borderBottom:state.isBuyer==='true'}" v-on:click="toBuyer()">我是买家</el-button>
      </el-col>
      <el-col :span="14" class="userinfo" v-if="companyType === 0">
        <el-dropdown trigger="hover">
          <svg class="icon" aria-hidden="true">   <use xlink:href="#icon-user"></use> </svg>
          <span class="el-dropdown-link" style="cursor:pointer">{{userName}}</span><span> | </span><span style="font-size: 12px;cursor:pointer" @click="logout">LOGIN OUT</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="18" class="userinfo" v-else>
        <el-dropdown trigger="hover">
          <svg class="icon" aria-hidden="true">   <use xlink:href="#icon-user"></use> </svg>
          <span class="el-dropdown-link" style="cursor:pointer">{{userName}}</span><span> | </span><span style="font-size: 12px;cursor:pointer" @click="logout">LOGIN OUT</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
  </el-row>
  </header>
  <!--<div v-show="headerFixed" style="position: relative;height: 60px;width: 100%;"></div>-->
  <main :class="[{green_style:state.isBuyer==='false'},{blue_style:state.isBuyer==='true'}]">
    <aside class="main-left" id="main-left" v-if="companyType === 0">
      <menu-by v-if="state.isBuyer==='true'"></menu-by>
      <menu-sl v-else></menu-sl>
    </aside>
    <aside class="main-left" id="main-left" v-else-if="companyType === 2">
      <menu-wh></menu-wh>
    </aside>
    <aside class="main-left" id="main-left" v-else-if="companyType === 1">
      <menu-lg></menu-lg>
    </aside>
    <aside class="main-left" id="main-left" v-else>
      <menu-bank></menu-bank>
    </aside>
    <div class="main-right">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    </div>
  </main>
  <!--尾部信息-->
  <footer-a></footer-a>
</div>
</template>

<script>
  import FooterA from './footer.vue'
  import MenuBy from './menuBuyer.vue'
  import MenuSl from './menuSeller.vue'
  import MenuLg from './menuLogistics.vue'
  import MenuWh from './menuWarehousing.vue'
  import MenuBank from './menuBank.vue'
  import LocalStore from "../../../common/store.js"
  import Store from '../vuex/store.js'
  import Common from "../../../common/common.js"
  import '../../../assets/css/style.css'
  import '../../../assets/css/colorStyle.css'

  window.onload=function(){
    var oDiv = document.getElementById("main-left");
    window.onscroll = function()
    {
      var s = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if(s > 60) {
        oDiv.style = "position:fixed;top:0";
      } else {
        oDiv.style = "";
      }
    }
  }

export default {
  name: 'wrapper',
  created: function () {
    var userInfo = LocalStore.fetchUserInfo();
    this.companyType = userInfo.roleCode;
    this.userName = userInfo.company_name;

    if(this.companyType != '0'){
      Store.commit('setIsBuyer',"false");
    }
  },
  data () {
    return {
      loading:false,
      dialogVisible:false,
      msg: '',
      headerFixed : true,
      active:true,
      companyType:0,  //0.融资企业 1.仓储公司 2.物流公司
      userName:''
    }
  },
    computed: {
      state () {
        return Store.state;
      }
    },
    components: {
      FooterA,MenuBy,MenuSl,MenuLg,MenuWh,MenuBank
    },
    methods:{
      toBuyer() {
        if(Store.state.isBuyer==='true'){
          return;
        }
        Store.commit('setIsBuyer',"true");
        this.$router.push('/');
      },
      toSeller() {
        this.$message.error('错了哦，这是一条错误消息');
        if(Store.state.isBuyer==="false"){
          return;
        }
        Store.commit('setIsBuyer',"false");
        this.$router.push('/');
      },
      logout(){
        function delete_cookie(name) {
          document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'; //删除cookie，必须显示声明path
        }
        delete_cookie("token");
        window.location.href='login.html';
      }
    }
  }
</script>

<style>
  #wrapper{
    background: rgb(246,246,246);
  }
  /* 头部导航 */
  .seller{
    z-index: 1000;height:60px;min-width: 1200px;
    background:-webkit-gradient(linear, 50 bottom, right bottom, from(rgb(57,202,166)), to(rgb(133,211,44))); /*兼容Safari／Chrome*/
    background:-moz-linear-gradient(left, rgb(57,202,166), rgb(133,211,44)); /*兼容Firefox*/
    transition: all 0.5s ease;}
  .buyer{
    z-index: 1000;height:60px;min-width: 1200px;
    background:-webkit-gradient(linear, 0 bottom, right bottom, from(rgb(0,148,218)), to(rgb(0,176,182))); /*兼容Safari／Chrome*/
    background:-moz-linear-gradient(left, rgb(57,202,166), rgb(133,211,44)); /*兼容Firefox*/
    transition: all 0.5s ease;box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);}
  /*header.header-fixed{top: 0;left: 0;right: 0;}*/
  header .el-menu-demo{padding-left: 300px!important;}
  .logo { width:230px;height:60px;color:white;font-size: 22px;padding-left:20px;padding-right:20px;padding-top:5px;border:0px}
  .userinfo {
    text-align: right;
    padding-top: 20px;
  }
  .el-dropdown{
    color: white!important;
    font-size: 14px!important;
  }
  .changeButton{
    font-size: 14px!important;
    height: 60px;
    background-color: transparent!important;
    border: 0px!important;
    border-radius: 0%!important;
  }
  .borderBottom{
    border-top: 6px solid transparent!important;
    border-bottom: 6px solid white!important;
  }
  /* 主内容区 */
  main{
    display: -webkit-box;display: -ms-flexbox;display: flex;  min-height: 800px;  border: solid 0px #E9ECF1;  background-color: #FCFCFC;
    width: 80%;
    margin: 0 auto;
    min-width: 1230px;
  }
  .main-left{
      position:absolute;top:60px;
      width: 10.5%;
      min-width: 159.891px;
      text-align: left;
      -webkit-box-flex: 0;-ms-flex: 0 0 200px;flex: 0 0 170px;
      height: 100%;
      background-color: white;
      z-index: 999;
  }
  .main-right{
    margin-left: 13%;
    -webkit-box-flex:1;-ms-flex:1;flex:1; background-color: #fff; padding: 20px 30px; overflow: scroll;background-color: rgb(246,246,246);}
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
</style>
