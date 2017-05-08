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
  </div>
</template>

<script>
  import  "../../../framework/particles.js"
  import '../../../framework/iconfont.js'
  import Store from "../../../common/store.js"
  import dialogView from "../../../components/dialog.vue"
  import md5 from 'js-md5';
  import '../../../assets/css/loginStyle.css'

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
          accountName: '',
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
            var params = {
              accountName: this.loginInfo.accountName,
              password:md5(this.loginInfo.password)
            }
            this.$http.post('../v1/account/login',params,{emulateJSON:true}).then((res) => {
              this.loading = false;
              var data =  res.body.data;
              if(res.body.code != 0){
                this.$message.error(res.body.message);
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
