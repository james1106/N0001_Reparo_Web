<template>
  <div id="wrapper">
    <!--头部导航-->
    <header class="header" :class="{ 'header-fixed' : headerFixed }" >
      <el-row>
        <el-col :span="24">
          <el-col :span="10" class="logo">
            LOGO
       </el-col>
          <el-col :span="5" v-if="companyType === '0'">
            <el-button type="primary" v-on:click="toBuyer()">我是买家</el-button>
          </el-col>
          <el-col :span="5" v-if="companyType === '0'">
            <el-button type="primary" v-on:click="toSeller()">我是卖家</el-button>
          </el-col>
          <el-col :span="4" class="userinfo">
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
      <aside class="main-left" v-if="companyType === '0'">
        <menu-by v-if="state.isBuyer==='true'"></menu-by>
        <menu-sl v-else></menu-sl>
      </aside>
      <aside class="main-left" v-else-if="companyType === '2'">
        <menu-wh></menu-wh>
      </aside>
      <aside class="main-left" v-else>
        <menu-lg></menu-lg>
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
  import FooterA from './footer.vue'
  import MenuBy from './menuBuyer.vue'
  import MenuSl from './menuSeller.vue'
  import MenuLg from './menuLogistics.vue'
  import MenuWh from './menuWarehousing.vue'
  import LocalStore from "../../../common/store.js"
  import Store from '../vuex/store.js'

  export default {
    name: 'wrapper',
    created: function () {
        console.log("now state "+Store.state.isBuyer);
//    Store.state.isBuyer = this.isBuyer;
      var userInfo = LocalStore.fetchUserInfo();
      this.companyType = userInfo.roleCode;
      //后面判断 每个不同公司进去主页后的首页面
      //使用this.$router.push(...);
    },
    data () {
      return {
        msg: '',
        headerFixed : true,
        active:true,
        isBuyer:true,
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
      toBuyer: function () {
        /*if(this.isBuyer == true){
         return
         }
         this.isBuyer = !this.isBuyer
         this.$router.push('/');
         Store.state.isBuyer = this.isBuyer*/
        if(Store.state.isBuyer==='true'){
          return;
        }
        Store.commit('setIsBuyer',"true");
        this.$router.push('/');

      },
      toSeller: function () {
        /*if(!this.isBuyer){
         return
         }
         this.isBuyer = !this.isBuyer
         this.$router.push('/');
         Store.state.isBuyer = this.isBuyer*/

        if(Store.state.isBuyer==="false"){
          return;
        }
        Store.commit('setIsBuyer',"false");
        this.$router.push('/');

      }
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
  .main-right{-webkit-box-flex:1;-ms-flex:1;flex:1; background-color: #fff; padding: 50px 70px; overflow: scroll;}
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
