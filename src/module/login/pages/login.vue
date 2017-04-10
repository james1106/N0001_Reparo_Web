<template>
  <div id="login">
    <img src="../assets/logo.png">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="70px" class="login-container">
      <el-form-item label="用户名" prop="account">
        <el-input v-model="ruleForm2.account"  type="text"  auto-complete="off" placeholder="用户名"></el-input>    <!--v-model传值-->
      </el-form-item>
      <el-form-item label="密码" prop="checkPass" >
        <el-input v-model="ruleForm2.checkPass"  type="password"  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>

      <el-row>
        <el-col :span="12"><router-link to="/pwdRetrieval">找回密码</router-link></el-col>
        <el-col :span="12"><router-link to="/register">注册业务</router-link></el-col>
      </el-row>
      <el-form-item style="width:100%;margin-left: -70px;">
        <el-button type="primary" style="width: 350px;" @click="login()">注册</el-button>
      </el-form-item>
    </el-form>
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
        this.$http.get('/api/login').then((res) => {
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
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 0 auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    /*border: 1px solid #eaeaea;*/
    /*box-shadow: 0 0 25px #cac6c6;*/
  }
  .el-form-item.is-required .el-form-item__label:before{
    content: initial !important;
  }
</style>
