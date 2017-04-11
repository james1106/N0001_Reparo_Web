<template>
  <div id="login">
    <img src="../assets/logo_login.png">
    <h3 style="color: #666666">登录</h3>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="login-container">
      <el-form-item prop="account">
        <el-input v-model="ruleForm2.account"  type="text"  auto-complete="off" placeholder="用户名"></el-input>    <!--v-model传值-->
      </el-form-item>
      <el-form-item prop="checkPass" >
        <el-input v-model="ruleForm2.checkPass"  type="password"  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-checkbox size="small" v-model="checked" class="remember">5天内记住我</el-checkbox>
        </el-col>
        <el-col :span="16" style="padding-left: 100px">
          <router-link to="/pwdRetrieval" class="forgetPwd">忘记密码？</router-link>
        </el-col>
      </el-row>
      <el-form-item style="width:100%;">
        <el-button type="primary" class="loginButton" @click="login()">登录</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <span class="noAccount">没有账号？</span>
    </el-row>
    <el-row>
      <span><router-link to="/register" class="register">注册账号</router-link></span>
    </el-row>
  </div>
</template>

<script>

  import Store from "../../../common/store.js"

  export default {
    name: 'login',
//    components: {
//      Hello
//    }
    data(){
      return{
        params:{
          account_name:"admin",
          password:"admin"
        },
        checked:true,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入用户名', trigger: 'blur' },   //表单验证
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
      }
    },
    methods:{
      login() {
        this.$http.post('/v1/account/login',{account_name:"admin",password:"admin"},{emulateJSON:true}).then((res) => {
          console.log(res.body);
          var code =  res.body.code;
          var data =  res.body.data;
          if(code != 0){
            return;
          }
          Store.saveUserInfo(data);
          window.location.href='index.html';
        },(err) => {
          console.log(err);
        })
      }
    }

  }
</script>

<style>
  /*.element{*/
    /*width: 0px;*/
    /*height: 0px;*/
    /*border-top: 20px solid transparent;*/
    /*border-right: 20px solid transparent;*/
    /*border-bottom: 20px solid transparent;*/
    /*border-left: 20px solid darkkhaki;*/
  /*}*/
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    /*font-family: 'PingFangSC-Regular'!important;*/
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 100px;
  }
  .login-container {
    position: relative;
    box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-border-radius: 2px;
    background-clip: padding-box;
    margin: 0px auto 30px auto;
    width: 260px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    /*box-shadow: 0 0 25px #cac6c6;*/
  }
  /*做出边框小三角的样式*/
  .login-container:before {
    content: '';
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-bottom-color: #eaeaea;
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -8px;
  }
  .login-container:after {
    content: "";
    width: 0;
    height: 0;
    border: 7px solid transparent;
    border-bottom-color: #FFFFFF;
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -7px;
  }
  .el-form-item.is-required .el-form-item__label:before{
    content: initial !important;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner{
    background-color:rgb(56,202,166)!important;
    border-color:rgb(56,202,166)!important;
  }
  .el-checkbox__inner{
    width: 15px!important;
    height: 15px!important;
    position: initial!important;
  }
  .el-checkbox__inner:hover{
    border-color:rgb(56,202,166)!important;
  }
  .el-checkbox__label{
    font-size: 12px!important;
    padding-left: 8px!important;
  }
  .el-input__inner{
    border-color: rgb(221,221,221)!important;
  }
  /*el-input:-moz-placeholder {*/
    /*color: rgb(204,204,204)!important;*/
  /*}*/
  .remember{
    color: #999999!important;
    font-size: 12px;
  }
  .forgetPwd{
    text-decoration: none;
    color: #999999;
    font-size: 12px;
  }
  .loginButton{
    width: 100%;
    margin-top: 15px!important;
    border-color:#38CAA6!important;
    background-color: #38CAA6!important;
  }
  .noAccount{
    color: #999999;
    font-size: 12px;
  }
  .register{
    padding-right: 5px;
    text-decoration: none;
    color: #39CAA6;
    font-size: 16px;
  }
</style>
