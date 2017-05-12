<template>
  <div id="wrapper">
    <!--头部导航-->
    <header class="header"
            :class="[{'seller': state.isBuyer==='false', 'buyer': state.isBuyer==='true' ,'header-fixed':headerFixed}] ">
      <el-row style="width: 81%;
    margin: 0 auto;
    min-width: 1230px;">
        <el-col :span="24">
          <el-col :span="1" class="logo">
            <img src="../assets/logoWhiteCopy.png" style="margin-top: 8px">
          </el-col>
          <el-col :span="4" style="margin-left: 10px;margin-top: 20px;color: white">
            <span>趣链科技</span><span> | </span>
            <template v-if="companyType === 0">
              <span style="font-size: 14px" v-if="state.isBuyer === 'true'">买家中心</span>
              <span style="font-size: 14px" v-else>卖家中心</span>
            </template>
            <template v-else-if="companyType === 2">
              <span style="font-size: 14px">仓储中心</span>
            </template>
            <template v-else-if="companyType === 1">
              <span style="font-size: 14px">物流中心</span>
            </template>
            <template v-else>
              <span style="font-size: 14px">金融机构</span>
            </template>
          </el-col>
          <el-col :span="2" v-if="companyType === 0">
            <el-button class="changeButton" size="large" type="primary"
                       v-bind:class="{borderBottom:state.isBuyer==='false'}" v-on:click="toSeller()">我是卖家
            </el-button>
          </el-col>
          <el-col :span="2" v-if="companyType === 0">
            <el-button class="changeButton" size="large" type="primary"
                       v-bind:class="{borderBottom:state.isBuyer==='true'}" v-on:click="toBuyer()">我是买家
            </el-button>
          </el-col>
          <el-col :span="14" class="userinfo" v-if="companyType === 0">
            <el-dropdown trigger="hover">
              <svg class="icon" aria-hidden="true"> 
                <use xlink:href="#icon-user"></use>
                 
              </svg>
              <span class="el-dropdown-link" style="cursor:pointer">{{userName}}</span><span> | </span><span
              style="font-size: 12px;cursor:pointer" @click="logout">LOGIN OUT</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="18" class="userinfo" v-else>
            <el-dropdown trigger="hover">
              <svg class="icon" aria-hidden="true"> 
                <use xlink:href="#icon-user"></use>
              </svg>
              <span class="el-dropdown-link" style="cursor:pointer">{{userName}}</span><span> | </span><span
              style="font-size: 12px;cursor:pointer" @click="logout">LOGIN OUT</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-col>
      </el-row>
    </header>
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
  import MenuBy from './menu/menuBuyer.vue'
  import MenuSl from './menu/menuSeller.vue'
  import MenuLg from './menu/menuLogistics.vue'
  import MenuWh from './menu/menuWarehousing.vue'
  import MenuBank from './menu/menuBank.vue'
  import LocalStore from "../../../common/store.js"
  import Store from '../vuex/store.js'
  import Common from "../../../common/common.js"
  import '../../../assets/css/style.css'
  import '../../../assets/css/colorStyle.css'

  export default {
    name: 'wrapper',
    created: function () {
      var userInfo = LocalStore.fetchUserInfo();
      this.companyType = userInfo.roleCode;
      this.userName = userInfo.company_name;
      if (this.companyType != '0') {
        Store.commit('setIsBuyer', "false");
      }
    },
    mounted(){
      this.fixedMenu();
    },
    data () {
      return {
        loading: false,
        dialogVisible: false,
        msg: '',
        headerFixed: true,
        active: true,
        companyType: 0,  //0.融资企业 1.仓储公司 2.物流公司
        userName: ''
      }
    },
    computed: {
      state () {
        return Store.state;
      }
    },
    components: {
      FooterA, MenuBy, MenuSl, MenuLg, MenuWh, MenuBank
    },
    methods: {
      toBuyer() {
        if (Store.state.isBuyer === 'true') {
          return;
        }
        Store.commit('setIsBuyer', "true");
        this.$router.push('/');
      },
      toSeller() {
        if (Store.state.isBuyer === "false") {
          return;
        }
        Store.commit('setIsBuyer', "false");
        this.$router.push('/');
      },
      //登出
      logout(){
        function delete_cookie(name) {
          //删除cookie，必须显示声明path
          document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }

        delete_cookie("token");
        window.location.href = 'login.html';
      },
      //在指定位置固定菜单
      fixedMenu(){
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
    }
  }
</script>
