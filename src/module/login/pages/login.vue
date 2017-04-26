<template>
  <div id="login">
    <el-row>
      <img src="../assets/logo_login.png">
      <h3 style="color: #666666">登录</h3>
    </el-row>
    <el-form :model="loginInfo" :rules="rules" ref="loginInfo" label-position="left" label-width="0px" class="login-container" v-loading="loading" element-loading-text="正在玩命登录...">
      <el-form-item prop="accountName">
        <el-input v-model="loginInfo.accountName"  type="text"  auto-complete="off" placeholder="用户名"></el-input>    <!--v-model传值-->
      </el-form-item>
      <el-form-item prop="password" >
        <el-input v-model="loginInfo.password"  type="password"  auto-complete="off" placeholder="密码"></el-input>
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
          <el-button type="primary" id="loginBtn" style="margin-top: 15px" class="nextButton" @click="login('loginInfo')">登录</el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <span class="noAccount">没有账号？</span>
      </el-row>
    <el-row>
      <span><router-link to="/register" class="register">注册账号</router-link></span>
    </el-row>
    <el-dialog title="提示" v-model="dialogVisible" size="tiny">
      <span>{{msg}}</span>
      <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
  import  "../../../framework/particles.js"
  import '../../../framework/iconfont.js'
  import Store from "../../../common/store.js"
  import dialogView from "../../../components/dialog.vue"

  window.onload = function () {
    particlesJS('app', {
      particles: {
        color: '#ECEEEF',
        shape: 'circle', // "circle", "edge" or "triangle"
        opacity: 1,
        size: 10,  //圈圈大小
        size_random: true,
        nb: 70,  //数量
        line_linked: {
          enable_auto: true,
          distance: 150,
          color: '#ECEEEF',
          opacity: 1,
          width: 2,   //线条宽度
          condensed_mode: {
            enable: false,
            rotateX: 1000,
            rotateY: 1000
          }
        },
        anim: {
          enable: true,
          speed: 5   //速度
        }
      },
      interactivity: {
        enable: true,
        mouse: {
          distance: 250
        },
        detect_on: 'canvas', // "canvas" or "window"
        mode: 'grab',
        line_linked: {
          opacity: .5
        },
        events: {
          onclick: {
            enable: true,
            mode: 'push', // "push" or "remove" (particles)
            nb: 4
          }
        },
        loading:false
      },
      /* Retina Display Support */
      retina_detect: true
    });
  };
  export default {
    name: 'login',
    data(){
      return{
        dialogVisible:false,
        msg:'',
        loading:false,
        checked:true,
        loginInfo: {
          account_name: '',
          password: ''
        },
        rules: {
          accountName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },   //表单验证
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
      }
    },
    methods:{
      login(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$http.post('../v1/account/login',this.loginInfo,{emulateJSON:true}).then((res) => {
              console.log(res.body);
              this.loading = false;
              var code =  res.body.code;
              var data =  res.body.data;
              if(code != 0){
                this.dialogVisible = true;
                this.msg = res.body.message;
                return;
              }
              Store.saveUserInfo(data);
              window.location.href='main.html';
            },(err) => {
              this.loading = false;
              console.log(err);
            })
          } else {
            return false;
          }
        },(err) => {
          console.log(err);
        })
      },
      getCookie(name){/* 获取指定cookie */
        var strCookie = document.cookie;
        console.log(strCookie);
        var arrCookie = strCookie.split("; ");
        for (var i = 0; i < arrCookie.length; i++) {
          var arr = arrCookie[i].split("=");
          if (arr[0] == name)
            return arr[1];
        }
        return "";
      }
    },
    created () {
      if(this.getCookie('token')!==''){
          console.log("hello");
        window.location.href='main.html';
      }
    }
  }
//  enter键操作
  document.onkeydown=function(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    var x = document.getElementById('loginBtn');
    var y = document.getElementById('nextBtn');
    var z = document.getElementById('registerBtn');
    if (e && e.keyCode == 13) { // 按 enter
      if(x)
      x.click();
      else if(y)
      y.click();
      else
      z.click();
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
  html,body, canvas{
    height:140%!important;
    width: 100%!important;
    overflow:hidden;
  }
  body{
    margin: 0px!important;
    border-top:4px solid #38CAA6;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-top: 50px;
    width: 100%;
    height: 100%;
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
  .nextButton{
    width: 100%;
    /*margin-top: 15px!important;*/
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
