<template>
<div id="wrapper">
  <!--头部导航-->
  <header class="header" :class="[{'seller': state.isBuyer==='false', 'buyer': state.isBuyer==='true' ,'header-fixed':headerFixed}] ">
  <el-row>
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
        <template v-else>
          <span style="font-size: 14px" >物流中心</span>
        </template>
      </el-col>
      <el-col :span="2" v-if="companyType === 0">
        <el-button  class="changeButton" size="large" type="primary" v-bind:class="{borderBottom:state.isBuyer==='false'}" v-on:click="toSeller()">我是卖家</el-button>
      </el-col>
      <el-col :span="2" v-if="companyType === 0">
        <el-button  class="changeButton" size="large" type="primary" v-bind:class="{borderBottom:state.isBuyer==='true'}" v-on:click="toBuyer()">我是买家</el-button>
      </el-col>
      <el-col :span="14" class="userinfo" v-if="companyType === '0'">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link" style="cursor:pointer">user</span><span> | </span><span style="font-size: 12px;cursor:pointer" @click="logout">LOG OUT</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="14" class="userinfo" v-else="">
        <el-dropdown trigger="hover">
          <svg class="icon" aria-hidden="true">   <use xlink:href="#icon-user"></use> </svg>
          <span class="el-dropdown-link" style="cursor:pointer">user</span><span> | </span><span style="font-size: 12px;cursor:pointer" @click="logout">LOGIN OUT</span>
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
  <main>
    <aside class="main-left" id="main-left" v-if="companyType === 0">
      <menu-by v-if="state.isBuyer==='true'"></menu-by>
      <menu-sl v-else></menu-sl>
    </aside>
    <aside class="main-left" id="main-left" v-else-if="companyType === 2">
      <menu-wh></menu-wh>
    </aside>
    <aside class="main-left" id="main-left" v-else>
      <menu-lg></menu-lg>
    </aside>
    <div class="main-right">
    <transition name="fade" mode="out-in">
      <router-view v-loading="loading" element-loading-text="加载中" class="view"></router-view>
    </transition>
    </div>
  </main>
  <!--尾部信息-->
  <footer-a></footer-a>
  <el-dialog title="提示" v-model="dialogVisible" size="tiny">
    <span>{{msg}}</span>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
  </el-dialog>
</div>
</template>

<script>
  import FooterA from './footer.vue'
  import MenuBy from './menuBuyer.vue'
  import MenuSl from './menuSeller.vue'
  import MenuLg from './menuLogistics.vue'
  import MenuWh from './menuWarehousing.vue'
  import LocalStore from "../../../common/store.js"
  import Store from '../vuex/store.js'

  import Vue from 'vue'
  import resource from 'vue-resource'
  Vue.use(resource)

  window.onload=function(){
    var oDiv = document.getElementById("main-left");
    window.onscroll = function()
    {
      var s = document.body.scrollTop || document.documentElement.scrollTop;
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

    /*****  设置http拦截器 start  ******/
    let _this = this;
    Vue.http.interceptors.push(function(request, next) {
      //请求开始的时候
      _this.loading = true;
      next(function(response) {
        //请求响应完成后
        _this.loading = false;
        if(!response.ok){
            _this.dialogVisible = true;
            _this.msg = '服务异常，请稍后再试';
        }
        return response
      });
    });
    /*****  设置http拦截器 end  ******/
  },
  data () {
    return {
      loading:false,
      dialogVisible:false,
      msg:'',
      Buyer:'true',
      Seller:'false',
      msg: '',
      headerFixed : true,
      active:true,
      companyType:'1'  //1.融资企业 2.仓储公司 3.物流公司
    }
  },
    computed: {
      state () {
        return Store.state;
      }
    },
    components: {
      FooterA,MenuBy,MenuSl,MenuLg,MenuWh
    },
    methods:{
      toBuyer() {
        if(Store.state.isBuyer==='true'){
          return;
        }
        Store.commit('setIsBuyer',"true");
        this.$router.push('/true');

      },
      toSeller() {
        if(Store.state.isBuyer==="false"){
          return;
        }
        Store.commit('setIsBuyer',"false");
        this.$router.push('/false');

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
  /* 头部导航 */
  .seller{
    z-index: 1000;height:60px;min-width: 1200px;
    background:-webkit-gradient(linear, 50 bottom, right bottom, from(rgb(57,202,166)), to(rgb(133,211,44))); /*兼容Safari／Chrome*/
    background:-moz-linear-gradient(left, rgb(57,202,166), rgb(133,211,44)); /*兼容Firefox*/
    transition: all 0.5s ease;box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);}
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
  main{display: -webkit-box;display: -ms-flexbox;display: flex;  min-height: 800px;  border: solid 0px #E9ECF1;  background-color: #FCFCFC;  }
  .main-left{
      position:absolute;top:60px;left:0;
      width: 170px;
      text-align: left;
      -webkit-box-flex: 0;-ms-flex: 0 0 200px;flex: 0 0 170px;
      height: 100%;
      background-color: white;
      z-index: 999;
  }
  .main-right{
    margin-left: 170px;
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
