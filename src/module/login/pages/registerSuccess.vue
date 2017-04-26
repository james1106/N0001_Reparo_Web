<template>
  <div id="register">
    <el-row>
      <img src="../assets/logo_login.png">
      <h3 style="color: #666666">注册成功</h3>
    </el-row>
    <el-form label-position="left" label-width="100px" class="login-container">
      <el-row style="margin: 40px auto;">
        <svg class="icon" aria-hidden="true" style="width: 90px;height: 90px">   <use xlink:href="#icon-success"></use> </svg>
      </el-row>
      <el-row style="margin: 20px auto">
        <el-button type="primary" class="successButton" @click="toHomePage()">进入后台</el-button>
      </el-row>
      <el-row style="margin: 20px auto">
        <span><router-link to="/" class="back">返回登录</router-link></span>
      </el-row>
    </el-form>
  </div>
</template>
<script>

  export default {
    name: 'register',
    data(){
      return{

      }
    },
    methods:{
      toHomePage(){
        window.location.href='main.html';
      }
    }
  }
</script>

<style>
.successButton{
  width: 70%;
  height: 40px;;
  border-color:#38CAA6!important;
  background-color: #38CAA6!important;
}
</style>
